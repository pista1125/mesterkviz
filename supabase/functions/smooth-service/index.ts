import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { subject, topic, numQuestions, gradeLevel } = await req.json();

        if (!subject || !topic || !numQuestions) {
            return new Response(
                JSON.stringify({ error: "Hiányzó paraméterek" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
        if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY nincs beállítva a Supabase titkok között.");
        }

        const systemPrompt = `
Te egy oktatási kvíz generátor AI vagy.
Magyar nyelven generálj STRICT JSON választ.
Ne adj vissza magyarázatot, csak tiszta JSON-t.
`;

        const userPrompt = `
Generálj egy kvízt:

Tantárgy: ${subject}
Témakör: ${topic}
Évfolyam: ${gradeLevel || "általános"}
Kérdések száma: ${numQuestions}

Szabályok:
- 4 válasz multiple-choice esetén
- pontosan 1 helyes válasz
- UUID v4 id-k
- imageUrl csak ha tényleg releváns
- timeLimit 10–30 között
`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                temperature: 0.7,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                response_format: { type: "json_object" }, // stabilabb mint json_schema
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI error:", errorText);
            return new Response(
                JSON.stringify({ error: "OpenAI API hiba történt" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        const data = await response.json();

        if (!data.choices?.length) {
            return new Response(
                JSON.stringify({ error: "Az AI nem adott választ" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        let content = data.choices[0].message?.content;

        if (!content) {
            return new Response(
                JSON.stringify({ error: "Üres AI válasz" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // 🧠 Ha ```json blokkban jön vissza
        content = content.replace(/```json/g, "").replace(/```/g, "").trim();

        let quizData;

        try {
            quizData = JSON.parse(content);
        } catch (parseError) {
            console.error("JSON parse error:", parseError);
            return new Response(
                JSON.stringify({ error: "AI válasz nem volt valid JSON" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // 🔎 Minimális validáció
        if (!quizData.title || !quizData.questions) {
            return new Response(
                JSON.stringify({ error: "Hiányos AI válasz struktúra" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        return new Response(JSON.stringify(quizData), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Edge function error:", error);

        return new Response(
            JSON.stringify({
                error: error instanceof Error ? error.message : "Ismeretlen hiba",
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
});
