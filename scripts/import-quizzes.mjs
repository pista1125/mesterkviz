#!/usr/bin/env node
/**
 * Kész kvízek feltöltése JSON fájlokból a Firestore `quizzes` gyűjteményébe (admin SDK).
 *
 * Használat:
 *   node scripts/import-quizzes.mjs --owner-email <tanár e-mail> [--dry-run] [--unpublished] <fájl.json> [...]
 *
 * Hitelesítés (az első, ami elérhető):
 *   1. GOOGLE_APPLICATION_CREDENTIALS szolgáltatásfiók-kulcs
 *   2. a Firebase CLI bejelentkezése (~/.config/configstore/firebase-tools.json)
 *
 * A dokumentum-azonosítók determinisztikusak (`<idPrefix>-<slug>`), így az újrafuttatás
 * frissíti a meglévő kvízt, nem hoz létre duplikátumot. A `created_at` megmarad.
 *
 * JSON formátum (lásd content/grade-8/*.json):
 *   { idPrefix, topic, grade_level, subject, quizzes: [{ slug, title, description, questions: [...] }] }
 *   kérdés: { type: "mc"|"tf"|"text"|"match", text, time, options?, answer?, pairs?, svg? }
 *     mc:    options: string[], answer: a helyes opció indexe (a sorrendet a szkript keveri)
 *     tf:    answer: true | false
 *     text:  answer: string (alternatívák "/" jellel elválasztva)
 *     match: pairs: [bal, jobb][]
 *     svg:   a JSON melletti svg/<név>.svg fájl neve → a kérdés képe lesz
 */
import { createRequire } from 'node:module';
import { readFileSync, existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { homedir, tmpdir } from 'node:os';

const require = createRequire(join(process.cwd(), 'functions', 'package.json'));
const admin = require('firebase-admin');

const PROJECT_ID = 'mesterkviz-f52ce';
// A Firebase CLI nyilvános OAuth kliense (a firebase-tools forráskódjában is szerepel).
const FIREBASE_CLI_CLIENT_ID = '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com';
const FIREBASE_CLI_CLIENT_SECRET = 'j9iVZfS8kkCEFUPaAeJV0sAi';

// ---------------------------------------------------------------- argumentumok
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const dryRun = flag('--dry-run');
const unpublished = flag('--unpublished');
const ownerEmail = option('--owner-email');
const files = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--owner-email');

if (files.length === 0 || (!dryRun && !ownerEmail)) {
  console.error('Használat: node scripts/import-quizzes.mjs --owner-email <e-mail> [--dry-run] [--unpublished] <fájl.json> [...]');
  process.exit(1);
}

// ---------------------------------------------------------------- segédek
const hash = (s) => createHash('sha256').update(s).digest();

/** Determinisztikus keverés: ugyanarra a kérdésre mindig ugyanaz a sorrend. */
const seededShuffle = (items, seed) => {
  const h = hash(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = h[i % h.length] % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const svgToDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

const fail = (where, msg) => {
  throw new Error(`${where}: ${msg}`);
};

const buildQuestion = (q, qid, baseDir, where) => {
  if (!q.text || typeof q.text !== 'string') fail(where, 'hiányzó kérdésszöveg');
  // A szövegek innerHTML-ként jelennek meg: a "<betű" HTML-címkének számítana.
  const allTexts = [q.text, ...(q.options || []), ...(q.pairs || []).flat()];
  // Elcsúszott escape (pl. "\frac" → lapdobás, "\text" → tabulátor) vezérlőkaraktert hagy a szövegben.
  if (allTexts.some((t) => /[\u0000-\u001f]/.test(String(t)))) {
    fail(where, 'vezérlőkarakter a szövegben – valószínűleg hiányzik egy backslash (\\\\frac, \\\\text)');
  }
  if (allTexts.some((t) => /<[A-Za-z!/]/.test(String(t)))) {
    fail(where, 'a szövegben "<" áll közvetlenül betű előtt – használj \\lt jelet');
  }
  let imageUrl = '';
  if (q.svg) {
    const p = join(baseDir, 'svg', `${q.svg}.svg`);
    if (!existsSync(p)) fail(where, `nem található SVG: ${p}`);
    imageUrl = svgToDataUri(readFileSync(p, 'utf8'));
  }
  const base = {
    id: qid,
    text: q.text,
    imageUrl,
    options: [],
    correctAnswer: '',
    pairs: [],
    timeLimit: Number(q.time) || 20,
  };

  switch (q.type) {
    case 'mc': {
      if (!Array.isArray(q.options) || q.options.length < 2) fail(where, 'legalább 2 opció kell');
      if (new Set(q.options).size !== q.options.length) fail(where, 'ismétlődő opció');
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) fail(where, 'hibás answer index');
      const opts = q.options.map((text, i) => ({ id: `${qid}-o${i + 1}`, text, isCorrect: i === q.answer }));
      return { ...base, type: 'multiple-choice', options: seededShuffle(opts, qid) };
    }
    case 'tf': {
      if (typeof q.answer !== 'boolean') fail(where, 'igaz/hamis kérdésnél az answer true vagy false');
      return {
        ...base,
        type: 'true-false',
        options: [
          { id: `${qid}-igaz`, text: 'Igaz', isCorrect: q.answer === true },
          { id: `${qid}-hamis`, text: 'Hamis', isCorrect: q.answer === false },
        ],
        correctAnswer: q.answer ? 'Igaz' : 'Hamis',
      };
    }
    case 'text': {
      if (!q.answer || typeof q.answer !== 'string') fail(where, 'szöveges kérdésnél kell answer');
      return { ...base, type: 'text-input', correctAnswer: q.answer };
    }
    case 'match': {
      if (!Array.isArray(q.pairs) || q.pairs.length < 2) fail(where, 'legalább 2 pár kell');
      const lefts = q.pairs.map((p) => p[0]);
      const rights = q.pairs.map((p) => p[1]);
      if (new Set(lefts).size !== lefts.length || new Set(rights).size !== rights.length) fail(where, 'ismétlődő pár');
      return {
        ...base,
        type: 'matching',
        pairs: q.pairs.map(([left, right], i) => ({ id: `${qid}-p${i + 1}`, left, right })),
      };
    }
    default:
      fail(where, `ismeretlen típus: ${q.type}`);
  }
};

const buildQuizzes = (file) => {
  const path = resolve(file);
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const baseDir = dirname(path);
  for (const k of ['idPrefix', 'topic', 'grade_level', 'subject']) {
    if (!data[k]) fail(file, `hiányzó mező: ${k}`);
  }
  return data.quizzes.map((quiz) => {
    const id = `${data.idPrefix}-${quiz.slug}`;
    const questions = quiz.questions.map((q, i) =>
      buildQuestion(q, `${id}-q${String(i + 1).padStart(2, '0')}`, baseDir, `${id} #${i + 1}`)
    );
    return {
      id,
      title: quiz.title,
      description: quiz.description || '',
      subject: data.subject,
      grade_level: data.grade_level,
      topic: data.topic,
      questions,
    };
  });
};

// ---------------------------------------------------------------- hitelesítés
const getCredential = () => {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) return admin.credential.applicationDefault();
  const cfgPath = join(homedir(), '.config', 'configstore', 'firebase-tools.json');
  if (!existsSync(cfgPath)) throw new Error('Nincs hitelesítés: futtasd a `npx firebase-tools login` parancsot.');
  const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
  const refreshToken = cfg.tokens?.refresh_token;
  if (!refreshToken) throw new Error('A Firebase CLI bejelentkezése nem tartalmaz refresh tokent.');
  // A Firestore kliens csak "application default" hitelesítést fogad el, ezért
  // ideiglenes ADC fájlt írunk, amit a futás végén törlünk.
  const tmpDir = mkdtempSync(join(tmpdir(), 'kvizimport-'));
  const adcPath = join(tmpDir, 'adc.json');
  writeFileSync(adcPath, JSON.stringify({
    type: 'authorized_user',
    client_id: FIREBASE_CLI_CLIENT_ID,
    client_secret: FIREBASE_CLI_CLIENT_SECRET,
    refresh_token: refreshToken,
    quota_project_id: PROJECT_ID,
  }), { mode: 0o600 });
  process.on('exit', () => rmSync(tmpDir, { recursive: true, force: true }));
  process.env.GOOGLE_APPLICATION_CREDENTIALS = adcPath;
  process.env.GOOGLE_CLOUD_QUOTA_PROJECT = PROJECT_ID;
  return admin.credential.applicationDefault();
};

// ---------------------------------------------------------------- fő program
const quizzes = files.flatMap(buildQuizzes);
const qCount = quizzes.reduce((n, q) => n + q.questions.length, 0);
console.log(`${quizzes.length} kvíz, ${qCount} kérdés beolvasva.`);
for (const q of quizzes) {
  const types = q.questions.reduce((m, x) => ((m[x.type] = (m[x.type] || 0) + 1), m), {});
  console.log(`  ${q.id}  „${q.title}”  ${q.questions.length} kérdés  ${JSON.stringify(types)}`);
}

if (dryRun) {
  console.log('\n--dry-run: semmi nem került feltöltésre.');
  process.exit(0);
}

admin.initializeApp({ credential: getCredential(), projectId: PROJECT_ID });
const db = admin.firestore();

const owner = await admin.auth().getUserByEmail(ownerEmail);
console.log(`\nTulajdonos: ${owner.uid}`);

const now = new Date().toISOString();
const batch = db.batch();
let created = 0;
let updated = 0;
for (const quiz of quizzes) {
  const ref = db.collection('quizzes').doc(quiz.id);
  const existing = await ref.get();
  const prev = existing.exists ? existing.data() : null;
  const published = !unpublished;
  batch.set(ref, {
    ...quiz,
    teacher_id: owner.uid,
    is_published: published,
    published_at: published ? prev?.published_at || now : null,
    created_at: prev?.created_at || now,
    updated_at: now,
  });
  existing.exists ? updated++ : created++;
}
await batch.commit();
console.log(`Kész: ${created} új, ${updated} frissített kvíz.`);
process.exit(0);
