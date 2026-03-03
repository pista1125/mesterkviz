import { corsHeaders } from "../_shared/cors.ts";


Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { subject, topic, numQuestions, gradeLevel } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");

    const systemPrompt = `Te egy oktatási kvíz generátor AI vagy. A felhasználó megadja a tantárgyat, témakört, évfolyamot és a kérdések számát. Generálj egy kvízt a megadott paraméterek alapján.

FONTOS SZABÁLYOK:
- Minden kérdés legyen egyértelmű és kornak megfelelő.
- Magyar nyelven generálj mindent.
- Az id mezőkhöz használj UUID v4 formátumot.
- Kérdéstípusok: "multiple-choice", "true-false", "text-input".
- RANDOMIZÁLÁS: Multiple-choice esetén a helyes választ (isCorrect: true) véletlenszerű helyre tedd az options tömbben, NE mindig az első helyre!
- PONTOS SZÁM: Pontosan annyi kérdést generálj, amennyi a "numQuestions" paraméterben szerepel.
- HA a témakör leírásában konkrét kérések vannak a kérdések típusára vagy eloszlására vonatkozóan (pl. "2 igaz-hamis, 3 feleletválasztós"), akkor azt szigorúan tartsd be!
- True-false típusnál az options mezőben pontosan két elem legyen: "Igaz" és "Hamis" szöveggel.
- Text-input típusnál az options mező legyen üres tömb [], és a correctAnswer mező tartalmazza a helyes választ.
- Illusztrációk: Csak ha tényleg releváns, adj imageUrl-t (Wikimedia Commons, Unsplash).`;

    const userPrompt = `Generálj egy kvízt ${numQuestions} kérdéssel.
Tantárgy: ${subject}
Témakör: ${topic}
Évfolyam: ${gradeLevel || "általános"}

Tartsd be a kért kérdésszámot (${numQuestions}) és ha a témakörben speciális típusmegosztás szerepel, azt is.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
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
                        type: { type: "string", enum: ["multiple-choice", "text-input"] },
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
        return new Response(JSON.stringify({ error: "Túl sok kérés, próbáld újra később." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Fizetés szükséges, töltsd fel az egyenleged." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("OpenAI API error:", response.status, t);
      return new Response(JSON.stringify({ error: "OpenAI hiba történt" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const choices = data.choices;
    if (!choices || choices.length === 0) {
      return new Response(JSON.stringify({ error: "Az AI nem adott választ" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const message = choices[0].message;
    const toolCall = message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "Az AI nem tudott kvízt generálni" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const quizData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(quizData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-quiz error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Ismeretlen hiba" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
