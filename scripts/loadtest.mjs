#!/usr/bin/env node
/**
 * KvízMester terhelési teszt – N szimulált diák egy valódi szobában.
 *
 * Használat:
 *   1. A tanár létrehoz egy szobát (lehetőleg egy TESZT kvízzel), és nyitva tartja a
 *      Vezérlő vagy a Kivetítő oldalt.
 *   2. node scripts/loadtest.mjs <szobakód> [diákok száma=30]
 *   3. A tanár elindítja a kvízt és lépteti a kérdéseket, ahogy órán.
 *   4. Ctrl+C → összesítő (írási késleltetés, hibák, szerveres pontozás ideje).
 *
 * Minden szimulált diák saját névtelen Firebase-felhasználó (külön app-példány),
 * ugyanazt az adatszerkezetet és ugyanazokat a szabályokat használja, mint a valódi kliens.
 * Feltétel: a Firebase konzolban be kell legyen kapcsolva az Anonymous bejelentkezés.
 *
 * A szimulált diákok "LT-" előtagú nevet kapnak; a teszt után a szoba újraindításával
 * vagy törlésével eltávolíthatók.
 */
import { readFileSync } from 'node:fs';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import {
  getFirestore, collection, query, where, limit, getDocs, getDoc, doc, setDoc, updateDoc,
  onSnapshot, serverTimestamp, Timestamp,
} from 'firebase/firestore';

const [code, countArg] = process.argv.slice(2);
if (!code || !/^\d{6}$/.test(code)) {
  console.error('Használat: node scripts/loadtest.mjs <6 jegyű szobakód> [diákok száma]');
  process.exit(1);
}
const STUDENTS = Math.max(1, Math.min(200, parseInt(countArg || '30', 10)));

// --- Firebase konfiguráció: környezeti változóból vagy a frontend config.ts-ből ---
const loadConfig = () => {
  const src = readFileSync(new URL('../src/integrations/firebase/config.ts', import.meta.url), 'utf8');
  const pick = (key, envName) => {
    if (process.env[envName]) return process.env[envName];
    const m = src.match(new RegExp(`${key}:[^\\n]*decode\\('([^']+)'\\)`));
    return m ? Buffer.from(m[1], 'base64').toString('utf8') : undefined;
  };
  return {
    apiKey: pick('apiKey', 'VITE_FIREBASE_API_KEY'),
    authDomain: pick('authDomain', 'VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: pick('projectId', 'VITE_FIREBASE_PROJECT_ID'),
    appId: pick('appId', 'VITE_FIREBASE_APP_ID'),
  };
};
const config = loadConfig();

// --- Statisztika ---
const stats = {
  joined: 0,
  joinErrors: 0,
  answers: 0,
  answerErrors: [],
  writeLatency: [],      // setDoc → szerver visszaigazolás (ms)
  questionSeenLag: [],   // kérdés szerveres indulása → diák észleli (ms)
  gradingLatency: [],    // beküldés → szerveres pontozás megérkezik (ms)
  ungraded: 0,
};
const pct = (arr, p) => {
  if (!arr.length) return '-';
  const s = [...arr].sort((a, b) => a - b);
  return Math.round(s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))]);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);

const printSummary = () => {
  console.log('\n================ ÖSSZESÍTŐ ================');
  console.log(`Csatlakozott diák:        ${stats.joined}/${STUDENTS} (hiba: ${stats.joinErrors})`);
  console.log(`Beküldött válasz:         ${stats.answers} (hiba: ${stats.answerErrors.length})`);
  console.log(`Írás késleltetés (ms):    p50=${pct(stats.writeLatency, 50)}  p95=${pct(stats.writeLatency, 95)}  max=${pct(stats.writeLatency, 100)}`);
  console.log(`Kérdés észlelése (ms):    p50=${pct(stats.questionSeenLag, 50)}  p95=${pct(stats.questionSeenLag, 95)}`);
  console.log(`Szerveres pontozás (ms):  p50=${pct(stats.gradingLatency, 50)}  p95=${pct(stats.gradingLatency, 95)}  (pontozatlan: ${stats.ungraded})`);
  if (stats.answerErrors.length) {
    console.log('Hibák (első 5):');
    stats.answerErrors.slice(0, 5).forEach((e) => console.log('  -', e));
  }
  console.log('===========================================');
};

// --- Egy szimulált diák ---
const runStudent = async (i, room, quiz) => {
  const app = initializeApp(config, `student-${i}`);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const cred = await signInAnonymously(auth);
  const uid = cred.user.uid;
  const pid = `${room.id}_${uid}`;
  await setDoc(doc(db, 'room_participants', pid), {
    id: pid,
    room_id: room.id,
    uid,
    student_name: `LT-${String(i + 1).padStart(2, '0')}`,
    student_session_id: uid,
    joined_at: new Date().toISOString(),
    is_active: true,
    kicked: false,
    avatar: { character: '🤖', accessory: 'none' },
    last_seen: serverTimestamp(),
  });
  stats.joined++;

  const heartbeat = setInterval(() => {
    updateDoc(doc(db, 'room_participants', pid), { last_seen: serverTimestamp() }).catch(() => {});
  }, 25000);

  let answeredKey = null;
  const unsub = onSnapshot(doc(db, 'rooms', room.id), async (snap) => {
    const r = snap.data();
    if (!r || r.status !== 'active' || r.game_mode === 'submarine') return;
    const qIdx = r.current_question_index;
    const session = r.session_number || 1;
    const key = `${session}:${qIdx}`;
    if (answeredKey === key) return;
    answeredKey = key;

    const startedAt = r.question_started_at instanceof Timestamp ? r.question_started_at.toMillis() : null;
    if (startedAt) stats.questionSeenLag.push(Math.max(0, Date.now() - startedAt - (r.question_start_delay_ms || 0)));

    const q = quiz.questions[qIdx];
    if (!q) return;
    // Emberi gondolkodási idő: 1,5–9 mp (+ visszaszámlálás az 1. kérdésnél)
    await sleep(rand(1500, 9000) + (qIdx === 0 ? r.question_start_delay_ms || 0 : 0));

    let answer = {};
    let isCorrect = false;
    let grading = 'client';
    if (q.type === 'multiple-choice' || q.type === 'true-false') {
      const opt = q.options[Math.floor(Math.random() * q.options.length)];
      answer = { selectedOptionId: opt.id, selectedOptionText: opt.text };
      isCorrect = !!opt.isCorrect;
    } else if (q.type === 'text-input') {
      const good = Math.random() < 0.5;
      answer = { text: good ? q.correctAnswer : `rossz válasz ${i}` };
      isCorrect = good ? true : null;
      grading = good ? 'client' : 'pending'; // a rosszak az AI-hoz mennek (valós terhelés)
    } else if (q.type === 'matching') {
      const pairs = (q.pairs || []).map((p) => ({ leftId: p.id, rightId: Math.random() < 0.7 ? p.id : 'x', isCorrect: false }));
      answer = { pairs, correctPairs: pairs.filter((p) => p.leftId === p.rightId).length, totalPairs: pairs.length };
    }

    const id = `${room.id}_s${session}_${pid}_q${qIdx}`;
    const t0 = Date.now();
    try {
      await setDoc(doc(db, 'quiz_answers', id), {
        id,
        room_id: room.id,
        participant_id: pid,
        question_index: qIdx,
        actual_question_index: qIdx,
        question_id: q.id,
        answer: { ...answer, actualQuestionIndex: qIdx, questionId: q.id },
        is_correct: isCorrect,
        time_taken_ms: null,
        score: 0,
        session_number: session,
        grading,
        answered_at: new Date().toISOString(),
        submitted_at: serverTimestamp(),
      });
      stats.writeLatency.push(Date.now() - t0);
      stats.answers++;

      // Szerveres pontozás megérkezésének mérése (max. 30 mp)
      const tGrade = Date.now();
      let graded = false;
      for (let k = 0; k < 30 && !graded; k++) {
        await sleep(1000);
        const a = (await getDoc(doc(db, 'quiz_answers', id))).data();
        if (a?.grading === 'server') {
          graded = true;
          stats.gradingLatency.push(Date.now() - tGrade);
        }
      }
      if (!graded) stats.ungraded++;
    } catch (e) {
      stats.answerErrors.push(`${e.code || ''} ${e.message}`.trim());
    }
  }, (err) => stats.answerErrors.push(`listener: ${err.code || err.message}`));

  return () => {
    clearInterval(heartbeat);
    unsub();
  };
};

// --- Fő program ---
const main = async () => {
  const adminApp = initializeApp(config, 'lookup');
  await signInAnonymously(getAuth(adminApp));
  const db = getFirestore(adminApp);
  const snap = await getDocs(query(collection(db, 'rooms'), where('code', '==', code), where('status', 'in', ['waiting', 'active']), limit(1)));
  if (snap.empty) {
    console.error('Nincs ilyen aktív/várakozó szoba:', code);
    process.exit(1);
  }
  const room = { id: snap.docs[0].id, ...snap.docs[0].data() };
  const quiz = (await getDoc(doc(db, 'quizzes', room.quiz_id))).data();
  console.log(`Szoba: ${room.id} – kvíz: "${quiz?.title}" (${quiz?.questions?.length} kérdés). ${STUDENTS} diák csatlakozik…`);

  const cleanups = [];
  // Fokozatos csatlakozás (mint egy osztályban: kb. 10 diák/mp)
  await Promise.all(Array.from({ length: STUDENTS }, async (_, i) => {
    await sleep(i * 100);
    try {
      cleanups.push(await runStudent(i, room, quiz));
    } catch (e) {
      stats.joinErrors++;
      console.error(`Diák #${i + 1} csatlakozási hiba:`, e.code || e.message);
    }
  }));
  console.log(`${stats.joined} diák csatlakozott. Indítsd el a kvízt a tanári oldalon! (Kilépés: Ctrl+C)`);

  const progress = setInterval(() => {
    console.log(`[${new Date().toLocaleTimeString()}] válaszok: ${stats.answers}, hibák: ${stats.answerErrors.length}, írás p95: ${pct(stats.writeLatency, 95)} ms, pontozás p95: ${pct(stats.gradingLatency, 95)} ms`);
  }, 10000);

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearInterval(progress);
    cleanups.forEach((c) => c());
    printSummary();
    process.exit(0);
  };
  process.on('SIGINT', finish);

  // Automatikus befejezés: ha a tanár befejezi a kvízt (35 mp-et még várunk a
  // szerveres pontozásra), vagy legkésőbb 20 perc után.
  onSnapshot(doc(db, 'rooms', room.id), (s) => {
    if (s.data()?.status === 'completed') {
      console.log('A kvíz befejeződött – várakozás a szerveres pontozásra (35 mp)…');
      setTimeout(finish, 35000);
    }
  });
  setTimeout(finish, 20 * 60 * 1000);
};

main().catch((e) => {
  console.error('Végzetes hiba:', e);
  process.exit(1);
});
