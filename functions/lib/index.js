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
exports.generateQuiz = void 0;
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
admin.initializeApp();
exports.generateQuiz = (0, https_1.onRequest)({
    cors: true,
    region: "europe-west1",
    timeoutSeconds: 120,
    memory: "256MiB",
}, async (req, res) => {
    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
    }
    try {
        const { subject, topic, numQuestions: rawNumQuestions, gradeLevel, selectedTypes: rawSelectedTypes } = req.body || {};
        const numQuestions = parseInt(rawNumQuestions, 10) || 5;
        const selectedTypes = Array.isArray(rawSelectedTypes) && rawSelectedTypes.length > 0
            ? rawSelectedTypes
            : ["multiple-choice", "true-false", "text-input", "matching"];
        const rawKey = process.env.OPENAI_API_KEY || "";
        const OPENAI_API_KEY = rawKey.replace(/[^\x20-\x7E]/g, "").trim();
        if (!OPENAI_API_KEY) {
            res.status(500).json({ error: "OPENAI_API_KEY is not configured in Firebase environment (functions/.env)" });
            return;
        }
        const systemPrompt = `Te egy oktatási kvíz generátor AI vagy. A felhasználó megadja a tantárgyat, témakört, évfolyamot és a kérdések számát. Generálj egy kvízt a megadott paraméterek alapján.

FONTOS SZABÁLYOK:
- Minden kérdés legyen egyértelmű és kornak megfelelő.
- Magyar nyelven generálj mindent.
- Az id mezőkhöz használj UUID v4 formátumot.
- MEGENGEDETT KÉRDÉSTÍPUSOK: ${selectedTypes.join(", ")}. CSAK ezeket használd!
- FIXÁLT HELYES VÁLASZ: Multiple-choice esetén a helyes választ (isCorrect: true) MINDIG az első helyre tedd az options tömbben! (A frontend fogja összekeverni).
- PONTOS SZÁM: Pontosan annyi kérdést generálj, amennyi a "numQuestions" paraméterben szerepel.
- True-false típusnál az options mezőben pontosan két elem legyen: "Igaz" és "Hamis" szöveggel.
- Text-input típusnál az options mező legyen üres tömb [], és a correctAnswer mező tartalmazza a helyes választ.
- Matching típusnál a "pairs" mezőben adj meg 3-5 párt (left, right szövegekkel és UUID id-kkal).
- Illusztrációk: Csak ha tényleg releváns, adj imageUrl-t (Wikimedia Commons, Unsplash).`;
        const userPrompt = `Generálj egy kvízt ${numQuestions} kérdéssel.
Tantárgy: ${subject}
Témakör: ${topic}
Évfolyam: ${gradeLevel || "általános"}

Tartsd be a kért kérdésszámot (${numQuestions}) és ha a témakörben speciális típusmegosztás szerepel, azt is.`;
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                tools: [
                    {
                        type: "function",
                        function: {
                            name: "create_quiz",
                            description: "Create a quiz with the given title, description, and questions",
                            parameters: {
                                type: "object",
                                properties: {
                                    title: { type: "string", description: "Quiz title in Hungarian" },
                                    description: { type: "string", description: "Short quiz description in Hungarian" },
                                    questions: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                id: { type: "string", description: "Unique UUID for the question" },
                                                type: { type: "string", enum: ["multiple-choice", "text-input", "true-false", "matching"] },
                                                text: { type: "string", description: "The question text" },
                                                imageUrl: { type: "string", description: "Optional URL to an illustrative image for this question. Only include if truly relevant." },
                                                timeLimit: { type: "number", description: "Time limit in seconds (10-30)" },
                                                options: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            id: { type: "string", description: "Unique UUID for the option" },
                                                            text: { type: "string" },
                                                            isCorrect: { type: "boolean" },
                                                        },
                                                        required: ["id", "text", "isCorrect"],
                                                    },
                                                },
                                                correctAnswer: { type: "string", description: "For text-input type only" },
                                                pairs: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            id: { type: "string" },
                                                            left: { type: "string" },
                                                            right: { type: "string" },
                                                        },
                                                        required: ["id", "left", "right"],
                                                    },
                                                    description: "For matching type only",
                                                },
                                            },
                                            required: ["id", "type", "text", "timeLimit", "options"],
                                        },
                                    },
                                },
                                required: ["title", "description", "questions"],
                            },
                        },
                    },
                ],
                tool_choice: { type: "function", function: { name: "create_quiz" } },
            }),
        });
        if (!response.ok) {
            if (response.status === 429) {
                res.status(429).json({ error: "Túl sok kérés, próbáld újra később." });
                return;
            }
            const t = await response.text();
            console.error("OpenAI API error:", response.status, t);
            res.status(500).json({ error: `AI hiba történt: ${response.status}` });
            return;
        }
        const data = await response.json();
        const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
        if (!toolCall) {
            res.status(500).json({ error: "Az AI nem tudott kvízt generálni" });
            return;
        }
        const quizData = JSON.parse(toolCall.function.arguments);
        res.status(200).json(quizData);
    }
    catch (e) {
        console.error("generateQuiz error:", e);
        res.status(500).json({ error: e instanceof Error ? e.message : "Ismeretlen hiba" });
    }
});
//# sourceMappingURL=index.js.map