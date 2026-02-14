import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: {
                headers: {
                    Authorization: req.headers.get("Authorization") ?? "",
                },
            },
        });

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const { subject, topic, numQuestions, gradeLevel } = await req.json();

        if (!subject || !topic || !numQuestions) {
            return new Response(JSON.stringify({ error: "Hiányzó paraméterek" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
        if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY nincs beállítva a Supabase titkok között.");
        }

        const systemPrompt = `Te egy oktatási kvíz generátor AI vagy. A felhasználó megadja a tantárgyat, témakört, évfolyamot és a kérdések számát. Generálj egy kvízt a megadott paraméterek alapján.

FONTOS SZABÁLYOK:
- Minden kérdés legyen egyértelmű és kornak megfelelő.
- A helyes válasz mindig pontosan egy legyen multiple-choice esetén.
- A válaszlehetőségek legyenek hasonlóak, hogy ne legyen nyilvánvaló a helyes válasz.
- Magyar nyelven generálj mindent.
- Az id mezőkhöz használj egyedi azonosítókat (UUID v4 javasolt).
- Ha egy kérdéshez jól illeszkedne egy illusztráció (pl. térkép, ábra, történelmi esemény), adj meg egy releváns imageUrl-t. Használj publikus, ingyenes képforrásokat.
- NE adj minden kérdéshez képet - csak akkor, ha a kép tényleg segít vagy vizuálisan releváns.
- Ha nem találsz megfelelő képet, hagyd üresen az imageUrl mezőt.`;

        const userPrompt = `Generálj egy kvízt az alábbi paraméterekkel:
- Tantárgy: ${subject}
- Témakör: ${topic}
- Évfolyam: ${gradeLevel || "általános"}
- Kérdések száma: ${numQuestions}

Minden kérdéshez 4 válaszlehetőséget adj meg.`;

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
                response_format: {
                    type: "json_schema",
                    json_schema: {
                        name: "quiz_schema",
                        strict: true,
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                description: { type: "string" },
                                questions: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string" },
                                            type: { type: "string", enum: ["multiple-choice", "text-input"] },
                                            text: { type: "string" },
                                            imageUrl: { type: "string" },
                                            timeLimit: { type: "number" },
                                            options: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        id: { type: "string" },
                                                        text: { type: "string" },
                                                        isCorrect: { type: "boolean" },
                                                    },
                                                    required: ["id", "text", "isCorrect"],
                                                    additionalProperties: false,
                                                },
                                            },
                                            correctAnswer: { type: "string" },
                                        },
                                        required: ["id", "type", "text", "imageUrl", "timeLimit", "options", "correctAnswer"],
                                        additionalProperties: false,
                                    },
                                },
                            },
                            required: ["title", "description", "questions"],
                            additionalProperties: false,
                        },
                    },
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI error:", errorText);
            return new Response(JSON.stringify({ error: "OpenAI API hiba történt" }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const data = await response.json();
        const quizData = JSON.parse(data.choices[0].message.content);

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
