// src/utils/openai.js
import axios from "axios";

export async function generateLandingContent(product, audience, desc) {
  const prompt = `You are an API that only returns valid JSON.
  Create a marketing landing page text for a ${product} targeting ${audience}.
  Include: headline, subheadline, 3 bullet benefits, call-to-action.
  Return strictly in JSON format with keys: headline, subheadline, benefits, cta.`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Landing Page Builder",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Raw Response:", response.data);

    const rawContent = response.data?.choices?.[0]?.message?.content;

    if (!rawContent) throw new Error("No content returned from API.");

    // Clean markdown fences if GPT adds them
    let cleaned = rawContent.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/```json|```/g, "").trim();
    }

    // Try parsing
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.warn("JSON parse failed, returning fallback.");
      parsed = {
        headline: "Default Headline",
        subheadline: cleaned,
        benefits: ["Benefit one", "Benefit two", "Benefit three"],
        cta: "Get Started",
      };
    }

    return parsed;
  } catch (error) {
    console.error("OpenRouter API Error:", error.response?.data || error.message);
    throw new Error("Failed to generate landing page content.");
  }
}
