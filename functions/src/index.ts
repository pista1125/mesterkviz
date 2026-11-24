import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { evaluateWithAi } from "./evaluate";
import {
  HttpError,
  MAX_QUESTIONS_PER_CALL,
  requireTeacher,
  reserveQuota,
  recordResult,
  OpenAiUsage,
} from "./quota";

admin.initializeApp();

// A kvízgeneráló modell (felülírható a functions/.env OPENAI_QUIZ_MODEL változójával).
const QUIZ_MODEL = (process.env.OPENAI_QUIZ_MODEL || "gpt-5.5").trim();

export const generateQuiz = onRequest(
  {
    cors: true,
    region: "europe-west1",
    timeoutSeconds: 300,
    memory: "256MiB",
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    let token: Awaited<ReturnType<typeof requireTeacher>> | null = null;
    let reservation: { month: string; used: number; limit: number } | null = null;
    let recorded = false;
    const { subject, topic, numQuestions: rawNumQuestions, gradeLevel, selectedTypes: rawSelectedTypes, generateSvg } = req.body || {};
    const numQuestions = Math.min(Math.max(parseInt(rawNumQuestions, 10) || 5, 1), MAX_QUESTIONS_PER_CALL);

    // Sikertelen hívás: naplózás + a lefoglalt generálás visszaadása a keretbe.
    const fail = async (status: number, error: string, usage?: OpenAiUsage) => {
      if (token && reservation && !recorded) {
        recorded = true;
        await recordResult({ token, month: reservation.month, success: false, usage, subject, topic, numQuestions, error });
      }
      res.status(status).json({ error });
    };

    try {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Csak POST kérés engedélyezett." });
        return;
      }

      // 1) Azonosítás (csak bejelentkezett, nem névtelen tanár)
      token = await requireTeacher(req);

      const selectedTypes = Array.isArray(rawSelectedTypes) && rawSelectedTypes.length > 0
        ? rawSelectedTypes
        : ["multiple-choice", "true-false", "text-input", "matching"];

      const rawKey = process.env.OPENAI_API_KEY || "";
      const OPENAI_API_KEY = rawKey.replace(/[^\x20-\x7E]/g, "").trim();

      if (!OPENAI_API_KEY) {
        res.status(500).json({ error: "OPENAI_API_KEY is not configured in Firebase environment (functions/.env)" });
        return;
      }

      // 2) Havi keret lefoglalása (429, ha elfogyott)
      reservation = await reserveQuota(token);

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
${generateSvg
  ? `- SZEMLÉLTETŐ ÁBRÁK (SVG): A felhasználó kérte ábrák generálását! Azoknál a kérdéseknél, ahol a szemléltetés segíti a megértést (különösen geometria, derékszögű háromszög, alakzatok, koordináták, grafikonok, törtek, folyamatok, diagramok):
  * Generálj egy tiszta, modern, érvényes SVG vektorgrafikát az "imageUrl" mezőbe!
  * Az SVG kód önálló és teljes legyen: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">...</svg>
  * Mindig tartalmazzon egy fehér/világos lekerekített hátteret (<rect width="100%" height="100%" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>), hogy sötét felületen is élesen és tisztán látszódjon az ábra!
  * Használj modern színeket, jó kontrasztot és tiszta sötét szövegeket (<text> elemek font-family="sans-serif", fill="#0f172a").
  * Csak ott készíts ábrát, ahol van pedagógiai értelme (ne erőltesd minden kérdésre, ha felesleges!).
  * Ahol nincs szükség ábrára, az imageUrl mező legyen üres string ("").`
  : `- Illusztrációk: Ne adj meg imageUrl-t, az imageUrl mező maradjon üres string ("").`}`;

      const userPrompt = `Generálj egy kvízt ${numQuestions} kérdéssel.
Tantárgy: ${subject}
Témakör: ${topic}
Évfolyam: ${gradeLevel || "általános"}

Tartsd be a kért kérdésszámot (${numQuestions}) és ha a témakörben speciális típusmegosztás szerepel, azt is.${generateSvg ? ' Ahol hasznos és releváns a feladathoz, rajzolj szemléltető SVG ábrát az imageUrl mezőbe!' : ''}`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: QUIZ_MODEL,
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
                          imageUrl: { type: "string", description: "Optional raw SVG markup (<svg ... </svg>) or Data URI illustrating this question, or empty string." },
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
        const t = await response.text();
        console.error("OpenAI API error:", response.status, t);
        if (response.status === 429) {
          await fail(503, "Az AI szolgáltatás most túlterhelt, próbáld újra később.");
          return;
        }
        await fail(500, `AI hiba történt: ${response.status}`);
        return;
      }

      const data: any = await response.json();
      const usage: OpenAiUsage | undefined = data.usage;
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) {
        await fail(500, "Az AI nem tudott kvízt generálni", usage);
        return;
      }

      const quizData = JSON.parse(toolCall.function.arguments);

      // Post-process SVG / imageUrl to ensure safe and universal rendering in <img>
      if (Array.isArray(quizData.questions)) {
        quizData.questions.forEach((q: any) => {
          if (q.imageUrl && typeof q.imageUrl === "string") {
            const trimmed = q.imageUrl.trim();
            if (trimmed.includes("<svg") && trimmed.includes("</svg>")) {
              const svgMatch = trimmed.match(/<svg[\s\S]*<\/svg>/i);
              if (svgMatch) {
                let svgCode = svgMatch[0];
                if (svgCode.includes('width="100%"')) {
                  svgCode = svgCode.replace('width="100%"', 'width="400"').replace('height="100%"', 'height="300"');
                } else if (!svgCode.includes('width=')) {
                  svgCode = svgCode.replace('<svg', '<svg width="400" height="300"');
                }
                const base64 = Buffer.from(svgCode, "utf8").toString("base64");
                q.imageUrl = `data:image/svg+xml;base64,${base64}`;
              } else {
                q.imageUrl = "";
              }
            } else if (trimmed.startsWith("data:image/")) {
              q.imageUrl = trimmed;
            } else if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
              q.imageUrl = "";
            }
          } else {
            q.imageUrl = "";
          }
        });
      }
      // 3) Sikeres generálás rögzítése (tokenek, költség, napló)
      recorded = true;
      await recordResult({ token, month: reservation.month, success: true, usage, subject, topic, numQuestions });

      res.status(200).json({
        ...quizData,
        quota: { used: reservation.used, limit: reservation.limit, remaining: Math.max(0, reservation.limit - reservation.used) },
      });
    } catch (e: any) {
      if (e instanceof HttpError) {
        res.status(e.status).json({ error: e.message });
        return;
      }
      console.error("generateQuiz error:", e);
      await fail(500, e instanceof Error ? e.message : "Ismeretlen hiba");
    }
  }
);


export const evaluateAnswer = onRequest(
  {
    cors: true,
    region: "europe-west1",
    timeoutSeconds: 30,
    memory: "512MiB",
    cpu: 1,
    concurrency: 40,
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    const { questionText, studentAnswer, correctAnswer, gradeLevel } = req.body || {};
    const result = await evaluateWithAi({ questionText, studentAnswer, correctAnswer, gradeLevel });
    res.status(200).json({ isCorrect: result.isCorrect, reason: result.reason });
  }
);

// Szerveres pontozás (Firestore trigger) – lásd grading.ts
export { gradeAnswer } from "./grading";

// AI keret lekérdezése + admin felület – lásd quota.ts
export { getAiQuota, adminListUsage, adminSetQuota, adminListLogs } from "./quota";
