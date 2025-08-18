// src/utils/openai.js
import axios from "axios";

export async function generateLandingContent(product, audience, desc) {
  const prompt = `Create a marketing landing page text for a ${product} targeting ${audience}.
  Include: headline, subheadline, 3 bullet benefits, call-to-action.
  Return JSON with keys: headline, subheadline, benefits, cta.`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openchat/openchat-7b:free", // model selection
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Landing Page Builder",
          "Content-Type": "application/json"
        }
      }
    );

    console.log("API Raw Response:", response.data);

    // Safely access the response
    const rawContent = response.data?.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("No content returned from API.");
    }

    // Try parsing JSON
    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (err) {
      console.warn("Could not parse JSON, returning raw text instead.");
      parsed = {
        headline: "Default Headline",
        subheadline: rawContent,
        benefits: ["Benefit one", "Benefit two", "Benefit three"],
        cta: "Get Started"
      };
    }

    return parsed;
  } catch (error) {
    console.error("OpenRouter API Error:", error.response?.data || error.message);
    throw new Error("Failed to generate landing page content.");
  }
}
