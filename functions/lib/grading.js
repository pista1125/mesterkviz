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
exports.gradeAnswer = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const params_1 = require("firebase-functions/params");
const admin = __importStar(require("firebase-admin"));
const evaluate_1 = require("./evaluate");
/**
 * Szerveres pontozás.
 *
 * Minden új válasz-dokumentumnál lefut, és VÉGLEGESÍTI a helyességet és a pontszámot:
 *  - feleletválasztós / igaz-hamis: a kvíz alapján ellenőrzi a választott opciót,
 *  - párosítás: a beküldött párokból újraszámolja a helyes párokat,
 *  - szabad szöveg: szó szerinti / normalizált egyezés, különben AI (a diák nem vár rá),
 *  - válaszidő: a szerver-időbélyegekből (kérdés indulása → beküldés), így nem csalható,
 *  - késve beküldött válasz (határidő + 3 mp türelmi idő után): 0 pont.
 *
 * A kliens által írt ideiglenes értékeket felülírja, és `grading: 'server'`-re állítja.
 *
 * GRADER_MIN_INSTANCES: ha a functions/.env-ben 1-re állítod, mindig fut egy "meleg" példány
 * (nincs hidegindítási késés az órán; kb. néhány dollár/hó). Alapértelmezés: 0.
 */
const GRADER_MIN_INSTANCES = (0, params_1.defineInt)("GRADER_MIN_INSTANCES", { default: 0 });
const START_COUNTDOWN_MS = 4000;
const LATE_GRACE_MS = 3000;
// Kvíz gyorsítótár példányon belül (egy kvíz alatt sok válasz jön ugyanarra a kvízre)
const quizCache = new Map();
const getQuizCached = async (quizId) => {
    const hit = quizCache.get(quizId);
    if (hit && Date.now() - hit.at < 60000)
        return hit.quiz;
    const snap = await admin.firestore().doc(`quizzes/${quizId}`).get();
    const quiz = snap.exists ? snap.data() : null;
    quizCache.set(quizId, { quiz, at: Date.now() });
    return quiz;
};
const isUnlimited = (room) => room.time_limit_mode === "unlimited" || room.has_time_limit === false || room.time_limit_seconds === 0;
const effectiveLimitSec = (room, question) => {
    if (isUnlimited(room))
        return 0;
    if (room.time_limit_mode === "unified" && room.time_limit_seconds > 0)
        return room.time_limit_seconds;
    return question?.timeLimit || (room.time_limit_seconds > 0 ? room.time_limit_seconds : 15);
};
const calculateScore = (isCorrect, timeTakenMs, timeLimitMs) => {
    if (!isCorrect)
        return 0;
    if (!timeLimitMs || timeLimitMs <= 0)
        return 1000;
    const timeRatio = Math.max(0, 1 - timeTakenMs / timeLimitMs);
    return Math.round(100 + timeRatio * 900);
};
const tsMillis = (v) => v instanceof admin.firestore.Timestamp ? v.toMillis() : null;
exports.gradeAnswer = (0, firestore_1.onDocumentCreated)({
    document: "quiz_answers/{answerId}",
    region: "europe-west1",
    memory: "512MiB",
    cpu: 1,
    // Egy példány egyszerre sok választ is kiszolgálhat → 30 diák egyszerre ne indítson 30 példányt
    concurrency: 40,
    maxInstances: 10,
    timeoutSeconds: 60,
    minInstances: GRADER_MIN_INSTANCES,
}, async (event) => {
    const snap = event.data;
    if (!snap)
        return;
    const a = snap.data();
    if (a.grading === "server")
        return;
    try {
        const roomSnap = await admin.firestore().doc(`rooms/${a.room_id}`).get();
        const room = roomSnap.data();
        if (!room) {
            await snap.ref.update({ grading: "server", grading_error: "room-not-found" });
            return;
        }
        const quiz = await getQuizCached(room.quiz_id);
        const qIdx = typeof a.actual_question_index === "number" ? a.actual_question_index : a.question_index;
        const question = quiz?.questions?.[qIdx];
        if (!question || (a.question_id && question.id && a.question_id !== question.id)) {
            await snap.ref.update({ grading: "server", grading_error: "question-not-found" });
            return;
        }
        const ans = (a.answer || {});
        const isSubmarine = room.game_mode === "submarine";
        const limitMs = effectiveLimitSec(room, question) * 1000;
        // --- Válaszidő szerver-időbélyegekből ---
        const submittedMs = tsMillis(a.submitted_at) ?? Date.now();
        let timeTakenMs = null;
        let late = false;
        if (!isSubmarine) {
            const startTs = tsMillis(room.question_starts?.[String(a.question_index)]);
            if (startTs !== null && (room.session_number || 1) === (a.session_number || 1)) {
                const startMs = startTs + (a.question_index === 0 ? START_COUNTDOWN_MS : 0);
                timeTakenMs = Math.max(0, submittedMs - startMs);
                if (limitMs > 0 && timeTakenMs > limitMs + LATE_GRACE_MS)
                    late = true;
                if (limitMs > 0)
                    timeTakenMs = Math.min(timeTakenMs, limitMs);
            }
            else if (typeof a.time_taken_ms === "number") {
                // Régi szoba (nincs kérdésenkénti indulási idő): kliens adat, korlátok közé szorítva
                timeTakenMs = Math.max(0, limitMs > 0 ? Math.min(a.time_taken_ms, limitMs) : a.time_taken_ms);
            }
        }
        const timeForScore = timeTakenMs ?? limitMs; // ha nem tudjuk, a minimális (100) pontot kapja
        // --- Helyesség ---
        const updates = {};
        let isCorrect = false;
        let score = 0;
        if (ans.timeout) {
            isCorrect = false;
            score = 0;
        }
        else if (question.type === "multiple-choice" || question.type === "true-false") {
            const option = (question.options || []).find((o) => o.id === ans.selectedOptionId);
            isCorrect = !!option?.isCorrect;
            score = isSubmarine ? (isCorrect ? 1000 : 0) : calculateScore(isCorrect, timeForScore, limitMs);
        }
        else if (question.type === "text-input") {
            const text = String(ans.text || "").trim();
            const correct = String(question.correctAnswer || "");
            let source = "exact";
            let reason;
            if (text && text.toLowerCase() === correct.trim().toLowerCase()) {
                isCorrect = true;
                source = "exact";
            }
            else if ((0, evaluate_1.isNormalizedMatch)(text, correct)) {
                isCorrect = true;
                source = "normalized";
            }
            else if (text) {
                const ai = await (0, evaluate_1.evaluateWithAi)({
                    questionText: question.text,
                    studentAnswer: text,
                    correctAnswer: correct,
                    gradeLevel: quiz?.grade_level,
                });
                isCorrect = ai.isCorrect;
                source = "ai";
                reason = ai.reason;
                if (ai.failed)
                    updates.ai_failed = true; // a tanár utólag felülbírálhatja
            }
            updates.evaluation_source = source;
            if (reason)
                updates.ai_reason = reason;
            updates["answer.evaluation_source"] = source;
            score = isSubmarine ? (isCorrect ? 1000 : 0) : calculateScore(isCorrect, timeForScore, limitMs);
        }
        else if (question.type === "matching") {
            const validIds = new Set((question.pairs || []).map((p) => p.id));
            const seenLeft = new Set();
            const totalPairs = validIds.size;
            let correctPairs = 0;
            for (const p of (Array.isArray(ans.pairs) ? ans.pairs : [])) {
                if (!validIds.has(p.leftId) || seenLeft.has(p.leftId))
                    continue;
                seenLeft.add(p.leftId);
                if (p.leftId === p.rightId)
                    correctPairs++;
            }
            isCorrect = totalPairs > 0 && correctPairs === totalPairs;
            const ratio = totalPairs > 0 ? correctPairs / totalPairs : 0;
            score = correctPairs > 0
                ? Math.round((isSubmarine ? 1000 : calculateScore(true, timeForScore, limitMs)) * ratio)
                : 0;
            updates["answer.correctPairs"] = correctPairs;
            updates["answer.totalPairs"] = totalPairs;
        }
        if (late)
            score = 0;
        await snap.ref.update({
            ...updates,
            is_correct: isCorrect,
            score,
            time_taken_ms: timeTakenMs,
            late,
            grading: "server",
            graded_at: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
    catch (err) {
        console.error("gradeAnswer hiba:", err, { answerId: event.params.answerId });
        // Ne maradjon örökre "pending" állapotban a diák képernyője
        if (a.grading === "pending") {
            await snap.ref.update({
                grading: "server",
                is_correct: false,
                score: 0,
                ai_failed: true,
                ai_reason: "Hiba történt az ellenőrzés közben.",
            }).catch(() => undefined);
        }
    }
});
//# sourceMappingURL=grading.js.map