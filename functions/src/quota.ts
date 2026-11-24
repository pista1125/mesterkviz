import * as admin from "firebase-admin";
import { onCall, HttpsError, CallableRequest } from "firebase-functions/v2/https";
import type { Request } from "firebase-functions/v2/https";

// ---------------------------------------------------------------------------
// AI-generálási keret (tanáronként havi limit) + admin felület kiszolgálása
//
// Kollekciók (csak a szerver írja, lásd firestore.rules):
//   aiUsage/{uid}_{YYYY-MM}  – havi felhasználás és költség
//   aiQuota/{uid}            – egyéni keret (monthlyLimit, bonus[hónap])
//   aiLog/{autoId}           – hívásonkénti napló
// ---------------------------------------------------------------------------

export const DEFAULT_MONTHLY_LIMIT = 100;
export const MAX_QUESTIONS_PER_CALL = 50;

// Becsült árak USD / 1M token (gpt-4o). Ha változik a modell vagy az ár, itt kell frissíteni.
const PRICE_INPUT_PER_M = 2.5;
const PRICE_OUTPUT_PER_M = 10;

const REGION = "europe-west1";

const db = () => admin.firestore();

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Aktuális hónap kulcsa magyar idő szerint, pl. "2026-11". */
export function monthKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  return `${y}-${m}`;
}

function isValidMonth(m: unknown): m is string {
  return typeof m === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(m);
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminToken(token: admin.auth.DecodedIdToken | undefined | null): boolean {
  if (!token?.email || token.email_verified !== true) return false;
  return adminEmails().includes(token.email.toLowerCase());
}

function isAnonymous(token: admin.auth.DecodedIdToken): boolean {
  return token.firebase?.sign_in_provider === "anonymous";
}

/** onRequest függvényhez: Bearer token ellenőrzése, csak tanár (nem névtelen) mehet tovább. */
export async function requireTeacher(req: Request): Promise<admin.auth.DecodedIdToken> {
  const header = req.get("Authorization") || "";
  const match = header.match(/^Bearer (.+)$/);
  if (!match) throw new HttpError(401, "Bejelentkezés szükséges az AI generáláshoz.");
  let token: admin.auth.DecodedIdToken;
  try {
    token = await admin.auth().verifyIdToken(match[1]);
  } catch {
    throw new HttpError(401, "Lejárt vagy érvénytelen bejelentkezés, jelentkezz be újra.");
  }
  if (isAnonymous(token)) throw new HttpError(403, "Az AI generálás csak tanári fiókkal érhető el.");
  return token;
}

interface QuotaDoc {
  monthlyLimit?: number;
  bonus?: Record<string, number>;
  note?: string;
}

function effectiveLimit(q: QuotaDoc | undefined, month: string): number {
  const base = typeof q?.monthlyLimit === "number" ? q.monthlyLimit : DEFAULT_MONTHLY_LIMIT;
  const bonus = typeof q?.bonus?.[month] === "number" ? q.bonus[month] : 0;
  return Math.max(0, base + bonus);
}

function nextMonthLabel(): string {
  const [y, m] = monthKey().split("-").map(Number);
  const ny = m === 12 ? y + 1 : y;
  const nm = m === 12 ? 1 : m + 1;
  return `${ny}. ${String(nm).padStart(2, "0")}. 01.`;
}

/**
 * Lefoglal egy generálást a keretből (tranzakcióban, így párhuzamos kérésekkel sem
 * lehet túllépni). Ha elfogyott, 429-es HttpError-t dob.
 */
export async function reserveQuota(token: admin.auth.DecodedIdToken): Promise<{ month: string; used: number; limit: number }> {
  const uid = token.uid;
  const month = monthKey();
  const usageRef = db().doc(`aiUsage/${uid}_${month}`);
  const quotaRef = db().doc(`aiQuota/${uid}`);

  return db().runTransaction(async (tx) => {
    const [usageSnap, quotaSnap] = await Promise.all([tx.get(usageRef), tx.get(quotaRef)]);
    const used = (usageSnap.data()?.count as number) || 0;
    const limit = effectiveLimit(quotaSnap.data() as QuotaDoc | undefined, month);
    if (used >= limit) {
      throw new HttpError(
        429,
        `Elfogyott a havi AI keret (${used}/${limit}). Kérj bővítést az adminisztrátortól, vagy a keret ${nextMonthLabel()}-jén újraindul.`
      );
    }
    tx.set(
      usageRef,
      {
        uid,
        email: token.email || null,
        month,
        count: used + 1,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return { month, used: used + 1, limit };
  });
}

export interface OpenAiUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
}

export function estimateCostUsd(usage: OpenAiUsage | undefined): number {
  const pin = usage?.prompt_tokens || 0;
  const pout = usage?.completion_tokens || 0;
  return (pin * PRICE_INPUT_PER_M + pout * PRICE_OUTPUT_PER_M) / 1_000_000;
}

/**
 * A hívás eredményének rögzítése: tokenek + költség az aiUsage-be, egy sor az aiLog-ba.
 * Sikertelen hívásnál a lefoglalt generálást visszaadja (a költséget – ha volt – rögzíti).
 */
export async function recordResult(opts: {
  token: admin.auth.DecodedIdToken;
  month: string;
  success: boolean;
  usage?: OpenAiUsage;
  topic?: string;
  subject?: string;
  numQuestions?: number;
  error?: string;
}): Promise<void> {
  const { token, month, success, usage } = opts;
  const costUsd = estimateCostUsd(usage);
  const inc = admin.firestore.FieldValue.increment;
  try {
    const batch = db().batch();
    batch.set(
      db().doc(`aiUsage/${token.uid}_${month}`),
      {
        promptTokens: inc(usage?.prompt_tokens || 0),
        completionTokens: inc(usage?.completion_tokens || 0),
        costUsd: inc(costUsd),
        failed: inc(success ? 0 : 1),
        ...(success ? {} : { count: inc(-1) }),
        lastUsedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    batch.set(db().collection("aiLog").doc(), {
      uid: token.uid,
      email: token.email || null,
      month,
      success,
      subject: opts.subject || null,
      topic: (opts.topic || "").slice(0, 200),
      numQuestions: opts.numQuestions || 0,
      promptTokens: usage?.prompt_tokens || 0,
      completionTokens: usage?.completion_tokens || 0,
      costUsd,
      error: opts.error ? opts.error.slice(0, 500) : null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    await batch.commit();
  } catch (e) {
    console.error("recordResult failed:", e);
  }
}

// ---------------------------------------------------------------------------
// Callable függvények
// ---------------------------------------------------------------------------

function requireSignedInTeacher(request: CallableRequest): admin.auth.DecodedIdToken {
  const token = request.auth?.token as admin.auth.DecodedIdToken | undefined;
  if (!request.auth || !token) throw new HttpsError("unauthenticated", "Bejelentkezés szükséges.");
  if (isAnonymous(token)) throw new HttpsError("permission-denied", "Csak tanári fiókkal érhető el.");
  return { ...token, uid: request.auth.uid };
}

function requireAdmin(request: CallableRequest): admin.auth.DecodedIdToken {
  const token = requireSignedInTeacher(request);
  if (!isAdminToken(token)) throw new HttpsError("permission-denied", "Nincs adminisztrátori jogosultságod.");
  return token;
}

/** A tanár saját havi kerete + hogy admin-e (a vezérlőpult gombjához). */
export const getAiQuota = onCall({ region: REGION, cors: true }, async (request) => {
  const token = requireSignedInTeacher(request);
  const month = monthKey();
  const [usageSnap, quotaSnap] = await Promise.all([
    db().doc(`aiUsage/${token.uid}_${month}`).get(),
    db().doc(`aiQuota/${token.uid}`).get(),
  ]);
  const used = (usageSnap.data()?.count as number) || 0;
  const limit = effectiveLimit(quotaSnap.data() as QuotaDoc | undefined, month);
  const emailMatchesAdmin = !!token.email && adminEmails().includes(token.email.toLowerCase());
  return {
    month,
    used,
    limit,
    remaining: Math.max(0, limit - used),
    isAdmin: isAdminToken(token),
    // Admin e-mail, de még nincs megerősítve → a felület felajánlja a megerősítő levelet.
    adminNeedsVerification: emailMatchesAdmin && token.email_verified !== true,
  };
});

/** Admin: összes tanár havi felhasználása és költsége. */
export const adminListUsage = onCall({ region: REGION, cors: true }, async (request) => {
  requireAdmin(request);
  const month = isValidMonth(request.data?.month) ? request.data.month : monthKey();

  // Tanárok az Auth-ból (névtelen diákok nélkül)
  const users: admin.auth.UserRecord[] = [];
  let pageToken: string | undefined;
  do {
    const page = await admin.auth().listUsers(1000, pageToken);
    users.push(...page.users.filter((u) => u.providerData.length > 0));
    pageToken = page.pageToken;
  } while (pageToken);

  const [usageSnap, quotaSnap] = await Promise.all([
    db().collection("aiUsage").where("month", "==", month).get(),
    db().collection("aiQuota").get(),
  ]);
  const usageByUid = new Map(usageSnap.docs.map((d) => [d.data().uid as string, d.data()]));
  const quotaByUid = new Map(quotaSnap.docs.map((d) => [d.id, d.data() as QuotaDoc]));

  const rows = users.map((u) => {
    const usage = usageByUid.get(u.uid);
    const quota = quotaByUid.get(u.uid);
    return {
      uid: u.uid,
      email: u.email || null,
      displayName: u.displayName || null,
      createdAt: u.metadata.creationTime || null,
      used: (usage?.count as number) || 0,
      failed: (usage?.failed as number) || 0,
      limit: effectiveLimit(quota, month),
      monthlyLimit: typeof quota?.monthlyLimit === "number" ? quota.monthlyLimit : DEFAULT_MONTHLY_LIMIT,
      bonus: quota?.bonus?.[month] || 0,
      note: quota?.note || "",
      promptTokens: (usage?.promptTokens as number) || 0,
      completionTokens: (usage?.completionTokens as number) || 0,
      costUsd: (usage?.costUsd as number) || 0,
      lastUsedAt: usage?.lastUsedAt?.toDate?.().toISOString() || null,
    };
  });

  rows.sort((a, b) => b.used - a.used || b.costUsd - a.costUsd || (a.email || "").localeCompare(b.email || ""));

  const totals = rows.reduce(
    (acc, r) => {
      acc.calls += r.used;
      acc.costUsd += r.costUsd;
      acc.tokens += r.promptTokens + r.completionTokens;
      if (r.used > 0) acc.activeTeachers += 1;
      return acc;
    },
    { calls: 0, costUsd: 0, tokens: 0, activeTeachers: 0 }
  );

  return { month, defaultLimit: DEFAULT_MONTHLY_LIMIT, rows, totals };
});

/** Admin: egy tanár keretének módosítása (havi bónusz és/vagy tartós limit). */
export const adminSetQuota = onCall({ region: REGION, cors: true }, async (request) => {
  const adminToken = requireAdmin(request);
  const { uid, bonusThisMonth, monthlyLimit, note } = request.data || {};
  if (typeof uid !== "string" || !uid) throw new HttpsError("invalid-argument", "Hiányzó felhasználó.");

  const month = monthKey();
  const update: Record<string, unknown> = {
    updatedBy: adminToken.email || adminToken.uid,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (bonusThisMonth !== undefined && bonusThisMonth !== null) {
    const n = Number(bonusThisMonth);
    if (!Number.isInteger(n) || n < 0 || n > 10000) throw new HttpsError("invalid-argument", "Érvénytelen bónusz.");
    update.bonus = { [month]: n };
  }
  if (monthlyLimit !== undefined && monthlyLimit !== null) {
    const n = Number(monthlyLimit);
    if (!Number.isInteger(n) || n < 0 || n > 10000) throw new HttpsError("invalid-argument", "Érvénytelen havi keret.");
    update.monthlyLimit = n;
  }
  if (typeof note === "string") update.note = note.slice(0, 300);

  await db().doc(`aiQuota/${uid}`).set(update, { merge: true });
  return { ok: true };
});

/** Admin: egy tanár adott havi generálásainak naplója. */
export const adminListLogs = onCall({ region: REGION, cors: true }, async (request) => {
  requireAdmin(request);
  const { uid } = request.data || {};
  if (typeof uid !== "string" || !uid) throw new HttpsError("invalid-argument", "Hiányzó felhasználó.");
  const month = isValidMonth(request.data?.month) ? request.data.month : monthKey();

  // Csak egyenlőségi szűrők → nem kell összetett index; rendezés memóriában.
  const snap = await db().collection("aiLog").where("uid", "==", uid).where("month", "==", month).get();
  const logs = snap.docs
    .map((d) => {
      const x = d.data();
      return {
        id: d.id,
        success: !!x.success,
        subject: x.subject || null,
        topic: x.topic || "",
        numQuestions: x.numQuestions || 0,
        promptTokens: x.promptTokens || 0,
        completionTokens: x.completionTokens || 0,
        costUsd: x.costUsd || 0,
        error: x.error || null,
        createdAt: x.createdAt?.toDate?.().toISOString() || null,
      };
    })
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, 200);
  return { month, logs };
});
