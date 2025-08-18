// api/generate.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { product, audience, desc } = req.body;

  const prompt = `Create a marketing landing page text for "${product}" targeting "${audience}".
Include: headline, subheadline, 3 bullet benefits, call-to-action.
Return ONLY JSON with keys: headline, subheadline, benefits, cta.`;

  try {
    const ai = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://ai-landing-builder.vercel.app", // update after deploy
          "X-Title": "AI Landing Page Builder",
          "Content-Type": "application/json",
        },
      }
    );

    const content = ai.data?.choices?.[0]?.message?.content || "{}";

    res.status(200).json({ content });
  } catch (err) {
    console.error("OpenRouter error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate landing page content." });
  }
}
