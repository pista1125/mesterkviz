import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

export const generateQuiz = onRequest(
  {
    cors: true,
    region: "europe-west1",
    timeoutSeconds: 120,
    memory: "256MiB",
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    try {
      const { subject, topic, numQuestions: rawNumQuestions, gradeLevel, selectedTypes: rawSelectedTypes, generateSvg } = req.body || {};
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
        if (response.status === 429) {
          res.status(429).json({ error: "Túl sok kérés, próbáld újra később." });
          return;
        }
        const t = await response.text();
        console.error("OpenAI API error:", response.status, t);
        res.status(500).json({ error: `AI hiba történt: ${response.status}` });
        return;
      }

      const data: any = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) {
        res.status(500).json({ error: "Az AI nem tudott kvízt generálni" });
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
      res.status(200).json(quizData);
    } catch (e: any) {
      console.error("generateQuiz error:", e);
      res.status(500).json({ error: e instanceof Error ? e.message : "Ismeretlen hiba" });
    }
  }
);


export const evaluateAnswer = onRequest(
  {
    cors: true,
    region: "europe-west1",
    timeoutSeconds: 30,
    memory: "256MiB",
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    try {
      const { questionText, studentAnswer, correctAnswer, gradeLevel } = req.body || {};

      if (!studentAnswer || !correctAnswer) {
        res.status(200).json({
          isCorrect: false,
          reason: "Hiányzó diákválasz vagy megoldókulcs.",
        });
        return;
      }

      const rawKey = process.env.OPENAI_API_KEY || "";
      const OPENAI_API_KEY = rawKey.replace(/[^\x20-\x7E]/g, "").trim();

      if (!OPENAI_API_KEY) {
        console.error("OPENAI_API_KEY hiányzik a functions/.env fájlból");
        res.status(200).json({
          isCorrect: false,
          reason: "AI szolgáltatás nincs konfigurálva.",
        });
        return;
      }

      const systemPrompt = `Te egy szigorú, de igazságos magyar oktatási AI tanársegéd vagy, aki diákok szabad szöveges válaszait értékeli ki egy iskolai kvízben.

FELADAT:
Döntsd el, hogy a diák által megadott válasz (studentAnswer) helyesnek vagy elfogadhatónak tekinthető-e a kérdés (questionText) és a hivatalos megoldókulcs (correctAnswer) alapján.

SZABÁLYOK:
1. SZINONIMÁK ÉS KIFEJEZÉSEK: Fogadd el a szinonimákat, rokon értelmű szavakat és köznyelvi alakokat (pl. "autó" = "kocsi" = "gépkocsi", "kerékpár" = "bicikli").
2. MÉRTÉKEGYSÉGEK ÉS ÁTVÁLTÁSOK: Fogadd el a matematikailag vagy fizikailag egyenértékű kifejezéseket (pl. "20 dm" = "2 m" = "200 cm", "0.5 kg" = "500 g", "fél liter" = "0.5 l" = "5 dl").
3. KISEBB ELÍRÁSOK: 1-2 betűs elütést, ha a szó egyértelműen beazonosítható és nem téveszthető össze más szakmai fogalommal, fogadj el (pl. "fotoszintesis" -> "fotoszintézis").
4. SZEMÉLYNEVEK ÉS TÖRTÉNELMI FOGALMAK: Ha a diák válasza egyértelműen azonosítja a keresett személyt, fogalmat vagy eseményt (pl. "Petőfi" a "Petőfi Sándor"-ra, "II. vh" a "második világháború"-ra), fogadd el, hacsak a kérdés nem kér kifejezetten teljes nevet.
5. FORMÁTUMOK: Fogadd el az eltérő írásmódokat, dátumformátumokat és központozást (pl. "1945. május 8." = "1945 május 8").
6. TARTALMI HIBÁK: Ha a diák válasza tartalmilag hibás, téves tényt állít vagy más fogalmat jelöl, az isCorrect értéke MINDIG false legyen!

KIMENETI FORMÁTUM (Kizárólag érvényes JSON):
{
  "isCorrect": true,
  "reason": "1 mondatos rövid magyar magyarázat a döntésről."
}`;

      const userPrompt = `Kérdés: ${questionText || "Nincs külön megadva"}
Hivatalos megoldás: ${correctAnswer}
Diák válasza: ${studentAnswer}
${gradeLevel ? `Évfolyam/korosztály: ${gradeLevel}` : ""}`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.1,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        console.error("OpenAI API hiba a válasz ellenőrzésekor:", response.status);
        res.status(200).json({
          isCorrect: false,
          reason: "AI kiértékelési hiba (OpenAI nem elérhető).",
        });
        return;
      }

      const data: any = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        res.status(200).json({
          isCorrect: false,
          reason: "Az AI nem adott választ.",
        });
        return;
      }

      const result = JSON.parse(content);
      res.status(200).json({
        isCorrect: Boolean(result.isCorrect),
        reason: result.reason || (result.isCorrect ? "AI által elfogadva" : "AI által elutasítva"),
      });
    } catch (e: any) {
      console.error("evaluateAnswer hiba:", e);
      res.status(200).json({
        isCorrect: false,
        reason: "Hiba történt az AI ellenőrzés közben.",
      });
    }
  }
);
