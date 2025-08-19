// api/generate.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { product, audience, desc } = req.body;

  const prompt = `Create a marketing landing page text for "${product}" targeting "${audience}".
Include: headline, subheadline, 3 bullet benefits, call-to-action.
Return JSON with keys: headline, subheadline, benefits, cta.`;

  try {
    const ai = await axios.post(
"https://openrouter.ai/api/v1/chat/completions"
,
      {
        model: "openai/gpt-3.5-turbo"
        ,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = ai.data?.choices?.[0]?.message?.content || "{}";
    res.status(200).json({ content });
  } catch (err) {
    console.error("OpenAI error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate landing page content." });
  }
}
