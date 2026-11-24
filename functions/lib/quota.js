"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminListLogs = exports.adminSetQuota = exports.adminListUsage = exports.getAiQuota = exports.HttpError = exports.MAX_QUESTIONS_PER_CALL = exports.DEFAULT_MONTHLY_LIMIT = void 0;
exports.monthKey = monthKey;
exports.isAdminToken = isAdminToken;
exports.requireTeacher = requireTeacher;
exports.reserveQuota = reserveQuota;
exports.estimateCostUsd = estimateCostUsd;
exports.recordResult = recordResult;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
// ---------------------------------------------------------------------------
// AI-generálási keret (tanáronként havi limit) + admin felület kiszolgálása
//
// Kollekciók (csak a szerver írja, lásd firestore.rules):
//   aiUsage/{uid}_{YYYY-MM}  – havi felhasználás és költség
//   aiQuota/{uid}            – egyéni keret (monthlyLimit, bonus[hónap])
//   aiLog/{autoId}           – hívásonkénti napló
// ---------------------------------------------------------------------------
exports.DEFAULT_MONTHLY_LIMIT = 100;
exports.MAX_QUESTIONS_PER_CALL = 50;
// Becsült árak USD / 1M token (gpt-5.5; a reasoning tokenek a kimenetben számítanak). Ha változik a modell vagy az ár, itt kell frissíteni.
const PRICE_INPUT_PER_M = 5;
const PRICE_OUTPUT_PER_M = 30;
const REGION = "europe-west1";
const db = () => admin.firestore();
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.HttpError = HttpError;
/** Aktuális hónap kulcsa magyar idő szerint, pl. "2026-11". */
function monthKey(date = new Date()) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Budapest",
        year: "numeric",
        month: "2-digit",
    }).formatToParts(date);
    const y = parts.find((p) => p.type === "year")?.value;
    const m = parts.find((p) => p.type === "month")?.value;
    return `${y}-${m}`;
}
function isValidMonth(m) {
    return typeof m === "string" && /^\d{4}-(0[1-9]|1[0-2])$/.test(m);
}
function adminEmails() {
    return (process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
}
function isAdminToken(token) {
    if (!token?.email || token.email_verified !== true)
        return false;
    return adminEmails().includes(token.email.toLowerCase());
}
function isAnonymous(token) {
    return token.firebase?.sign_in_provider === "anonymous";
}
/** onRequest függvényhez: Bearer token ellenőrzése, csak tanár (nem névtelen) mehet tovább. */
async function requireTeacher(req) {
    const header = req.get("Authorization") || "";
    const match = header.match(/^Bearer (.+)$/);
    if (!match)
        throw new HttpError(401, "Bejelentkezés szükséges az AI generáláshoz.");
    let token;
    try {
        token = await admin.auth().verifyIdToken(match[1]);
    }
    catch {
        throw new HttpError(401, "Lejárt vagy érvénytelen bejelentkezés, jelentkezz be újra.");
    }
    if (isAnonymous(token))
        throw new HttpError(403, "Az AI generálás csak tanári fiókkal érhető el.");
    return token;
}
function effectiveLimit(q, month) {
    const base = typeof q?.monthlyLimit === "number" ? q.monthlyLimit : exports.DEFAULT_MONTHLY_LIMIT;
    const bonus = typeof q?.bonus?.[month] === "number" ? q.bonus[month] : 0;
    return Math.max(0, base + bonus);
}
function nextMonthLabel() {
    const [y, m] = monthKey().split("-").map(Number);
    const ny = m === 12 ? y + 1 : y;
    const nm = m === 12 ? 1 : m + 1;
    return `${ny}. ${String(nm).padStart(2, "0")}. 01.`;
}
/**
 * Lefoglal egy generálást a keretből (tranzakcióban, így párhuzamos kérésekkel sem
 * lehet túllépni). Ha elfogyott, 429-es HttpError-t dob.
 */
async function reserveQuota(token) {
    const uid = token.uid;
    const month = monthKey();
    const usageRef = db().doc(`aiUsage/${uid}_${month}`);
    const quotaRef = db().doc(`aiQuota/${uid}`);
    return db().runTransaction(async (tx) => {
        const [usageSnap, quotaSnap] = await Promise.all([tx.get(usageRef), tx.get(quotaRef)]);
        const used = usageSnap.data()?.count || 0;
        const limit = effectiveLimit(quotaSnap.data(), month);
        if (used >= limit) {
            throw new HttpError(429, `Elfogyott a havi AI keret (${used}/${limit}). Kérj bővítést az adminisztrátortól, vagy a keret ${nextMonthLabel()}-jén újraindul.`);
        }
        tx.set(usageRef, {
            uid,
            email: token.email || null,
            month,
            count: used + 1,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        return { month, used: used + 1, limit };
    });
}
function estimateCostUsd(usage) {
    const pin = usage?.prompt_tokens || 0;
    const pout = usage?.completion_tokens || 0;
    return (pin * PRICE_INPUT_PER_M + pout * PRICE_OUTPUT_PER_M) / 1_000_000;
}
/**
 * A hívás eredményének rögzítése: tokenek + költség az aiUsage-be, egy sor az aiLog-ba.
 * Sikertelen hívásnál a lefoglalt generálást visszaadja (a költséget – ha volt – rögzíti).
 */
async function recordResult(opts) {
    const { token, month, success, usage } = opts;
    const costUsd = estimateCostUsd(usage);
    const inc = admin.firestore.FieldValue.increment;
    try {
        const batch = db().batch();
        batch.set(db().doc(`aiUsage/${token.uid}_${month}`), {
            promptTokens: inc(usage?.prompt_tokens || 0),
            completionTokens: inc(usage?.completion_tokens || 0),
            costUsd: inc(costUsd),
            failed: inc(success ? 0 : 1),
            ...(success ? {} : { count: inc(-1) }),
            lastUsedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
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
    }
    catch (e) {
        console.error("recordResult failed:", e);
    }
}
// ---------------------------------------------------------------------------
// Callable függvények
// ---------------------------------------------------------------------------
function requireSignedInTeacher(request) {
    const token = request.auth?.token;
    if (!request.auth || !token)
        throw new https_1.HttpsError("unauthenticated", "Bejelentkezés szükséges.");
    if (isAnonymous(token))
        throw new https_1.HttpsError("permission-denied", "Csak tanári fiókkal érhető el.");
    return { ...token, uid: request.auth.uid };
}
function requireAdmin(request) {
    const token = requireSignedInTeacher(request);
    if (!isAdminToken(token))
        throw new https_1.HttpsError("permission-denied", "Nincs adminisztrátori jogosultságod.");
    return token;
}
/** A tanár saját havi kerete + hogy admin-e (a vezérlőpult gombjához). */
exports.getAiQuota = (0, https_1.onCall)({ region: REGION, cors: true }, async (request) => {
    const token = requireSignedInTeacher(request);
    const month = monthKey();
    const [usageSnap, quotaSnap] = await Promise.all([
        db().doc(`aiUsage/${token.uid}_${month}`).get(),
        db().doc(`aiQuota/${token.uid}`).get(),
    ]);
    const used = usageSnap.data()?.count || 0;
    const limit = effectiveLimit(quotaSnap.data(), month);
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
exports.adminListUsage = (0, https_1.onCall)({ region: REGION, cors: true }, async (request) => {
    requireAdmin(request);
    const month = isValidMonth(request.data?.month) ? request.data.month : monthKey();
    // Tanárok az Auth-ból (névtelen diákok nélkül)
    const users = [];
    let pageToken;
    do {
        const page = await admin.auth().listUsers(1000, pageToken);
        users.push(...page.users.filter((u) => u.providerData.length > 0));
        pageToken = page.pageToken;
    } while (pageToken);
    const [usageSnap, quotaSnap] = await Promise.all([
        db().collection("aiUsage").where("month", "==", month).get(),
        db().collection("aiQuota").get(),
    ]);
    const usageByUid = new Map(usageSnap.docs.map((d) => [d.data().uid, d.data()]));
    const quotaByUid = new Map(quotaSnap.docs.map((d) => [d.id, d.data()]));
    const rows = users.map((u) => {
        const usage = usageByUid.get(u.uid);
        const quota = quotaByUid.get(u.uid);
        return {
            uid: u.uid,
            email: u.email || null,
            displayName: u.displayName || null,
            createdAt: u.metadata.creationTime || null,
            used: usage?.count || 0,
            failed: usage?.failed || 0,
            limit: effectiveLimit(quota, month),
            monthlyLimit: typeof quota?.monthlyLimit === "number" ? quota.monthlyLimit : exports.DEFAULT_MONTHLY_LIMIT,
            bonus: quota?.bonus?.[month] || 0,
            note: quota?.note || "",
            promptTokens: usage?.promptTokens || 0,
            completionTokens: usage?.completionTokens || 0,
            costUsd: usage?.costUsd || 0,
            lastUsedAt: usage?.lastUsedAt?.toDate?.().toISOString() || null,
        };
    });
    rows.sort((a, b) => b.used - a.used || b.costUsd - a.costUsd || (a.email || "").localeCompare(b.email || ""));
    const totals = rows.reduce((acc, r) => {
        acc.calls += r.used;
        acc.costUsd += r.costUsd;
        acc.tokens += r.promptTokens + r.completionTokens;
        if (r.used > 0)
            acc.activeTeachers += 1;
        return acc;
    }, { calls: 0, costUsd: 0, tokens: 0, activeTeachers: 0 });
    return { month, defaultLimit: exports.DEFAULT_MONTHLY_LIMIT, rows, totals };
});
/** Admin: egy tanár keretének módosítása (havi bónusz és/vagy tartós limit). */
exports.adminSetQuota = (0, https_1.onCall)({ region: REGION, cors: true }, async (request) => {
    const adminToken = requireAdmin(request);
    const { uid, bonusThisMonth, monthlyLimit, note } = request.data || {};
    if (typeof uid !== "string" || !uid)
        throw new https_1.HttpsError("invalid-argument", "Hiányzó felhasználó.");
    const month = monthKey();
    const update = {
        updatedBy: adminToken.email || adminToken.uid,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    if (bonusThisMonth !== undefined && bonusThisMonth !== null) {
        const n = Number(bonusThisMonth);
        if (!Number.isInteger(n) || n < 0 || n > 10000)
            throw new https_1.HttpsError("invalid-argument", "Érvénytelen bónusz.");
        update.bonus = { [month]: n };
    }
    if (monthlyLimit !== undefined && monthlyLimit !== null) {
        const n = Number(monthlyLimit);
        if (!Number.isInteger(n) || n < 0 || n > 10000)
            throw new https_1.HttpsError("invalid-argument", "Érvénytelen havi keret.");
        update.monthlyLimit = n;
    }
    if (typeof note === "string")
        update.note = note.slice(0, 300);
    await db().doc(`aiQuota/${uid}`).set(update, { merge: true });
    return { ok: true };
});
/** Admin: egy tanár adott havi generálásainak naplója. */
exports.adminListLogs = (0, https_1.onCall)({ region: REGION, cors: true }, async (request) => {
    requireAdmin(request);
    const { uid } = request.data || {};
    if (typeof uid !== "string" || !uid)
        throw new https_1.HttpsError("invalid-argument", "Hiányzó felhasználó.");
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
//# sourceMappingURL=quota.js.map