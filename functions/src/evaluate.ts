/**
 * Szabad szöveges válaszok kiértékelése: szó szerinti / normalizált egyezés, majd AI.
 * A normalizálás a frontend src/lib/textNormalization.ts logikájának másolata –
 * ha ott változik, itt is módosítani kell.
 */

const ACCENT_MAP: Record<string, string> = {
  á: "a", é: "e", í: "i", ó: "o", ö: "o", ő: "o", ú: "u", ü: "u", ű: "u",
};

export const normalizeText = (text: string | null | undefined): string => {
  if (!text) return "";
  let normalized = text.toLowerCase().trim();
  normalized = normalized.replace(/(\d),(\d)/g, "$1.$2");
  normalized = normalized.replace(/[áéíóöőúüű]/g, (char) => ACCENT_MAP[char] || char);
  normalized = normalized.normalize("NFD").replace(/[̀-ͯ]/g, "");
  normalized = normalized.replace(/^[\s.,!?;:()[\]{}"'„”«»]+|[\s.,!?;:()[\]{}"'„”«»]+$/g, "");
  normalized = normalized.replace(/\s+/g, "");
  return normalized;
};

export const isNormalizedMatch = (
  studentAnswer: string | null | undefined,
  correctAnswer: string | null | undefined
): boolean => {
  if (!studentAnswer || !correctAnswer) return false;
  const normStudent = normalizeText(studentAnswer);
  if (!normStudent) return false;
  if (normStudent === normalizeText(correctAnswer)) return true;
  if (correctAnswer.includes("/") || correctAnswer.includes(";")) {
    const alternatives = correctAnswer.split(/[/;]/).map((p) => normalizeText(p)).filter(Boolean);
    if (alternatives.includes(normStudent)) return true;
  }
  return false;
};

const SYSTEM_PROMPT = `Te egy szigorú, de igazságos magyar oktatási AI tanársegéd vagy, aki diákok szabad szöveges válaszait értékeli ki egy iskolai kvízben.

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

export interface AiEvaluation {
  isCorrect: boolean;
  reason: string;
  /** true, ha az AI nem volt elérhető (a döntés nem AI-tól származik) */
  failed?: boolean;
}

const getOpenAiKey = () => (process.env.OPENAI_API_KEY || "").replace(/[^\x20-\x7E]/g, "").trim();

/** OpenAI-alapú kiértékelés, időkorláttal és egy újrapróbálással. */
export const evaluateWithAi = async (params: {
  questionText?: string;
  studentAnswer: string;
  correctAnswer: string;
  gradeLevel?: string;
}): Promise<AiEvaluation> => {
  const { questionText, studentAnswer, correctAnswer, gradeLevel } = params;
  if (!studentAnswer || !correctAnswer) {
    return { isCorrect: false, reason: "Hiányzó diákválasz vagy megoldókulcs." };
  }
  const key = getOpenAiKey();
  if (!key) {
    console.error("OPENAI_API_KEY hiányzik a functions/.env fájlból");
    return { isCorrect: false, reason: "AI szolgáltatás nincs konfigurálva.", failed: true };
  }

  const userPrompt = `Kérdés: ${questionText || "Nincs külön megadva"}
Hivatalos megoldás: ${correctAnswer}
Diák válasza: ${studentAnswer}
${gradeLevel ? `Évfolyam/korosztály: ${gradeLevel}` : ""}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.1,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      });
      if (!response.ok) {
        console.error("OpenAI API hiba a válasz ellenőrzésekor:", response.status);
        if (response.status >= 500 || response.status === 429) continue;
        return { isCorrect: false, reason: "AI kiértékelési hiba (OpenAI nem elérhető).", failed: true };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) continue;
      const result = JSON.parse(content);
      return {
        isCorrect: Boolean(result.isCorrect),
        reason: result.reason || (result.isCorrect ? "AI által elfogadva" : "AI által elutasítva"),
      };
    } catch (e) {
      console.error(`evaluateWithAi hiba (${attempt + 1}. próba):`, e);
    } finally {
      clearTimeout(timeout);
    }
  }
  return { isCorrect: false, reason: "Hiba történt az AI ellenőrzés közben.", failed: true };
};
