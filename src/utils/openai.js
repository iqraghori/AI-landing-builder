// src/utils/openai.js
import axios from "axios";

export async function generateLandingContent(product, audience, desc) {
  const prompt = `You are an API that only returns valid JSON.
  Create a marketing landing page text for a ${product} targeting ${audience}.
  Description: ${desc}
  Include: headline, subheadline, 3 bullet benefits, and 3 call-to-action options.
  Return strictly in JSON format with keys: headline, subheadline, benefits, cta.
  
  Example format:
  {
    "headline": "Your Amazing Product",
    "subheadline": "Perfect solution for your needs",
    "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
    "cta": ["Action One", "Action Two", "Action Three"]
  }`;


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
          // Fix 1: Use REACT_APP_ prefix for environment variables in React
          Authorization: `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
          // Fix 2: Update referer for production
          "HTTP-Referer": process.env.NODE_ENV === 'production' 
            ? window.location.origin 
            : "http://localhost:3000",
          "X-Title": "AI Landing Page Builder",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Raw Response:", response.data);

    const rawContent = response.data?.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("No content returned from API.");
    }

    // Clean markdown fences if GPT adds them
    let cleaned = rawContent.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/```json|```/g, "").trim();
    }

    // Try parsing
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
      
      // Fix 3: Validate required fields
      if (!parsed.headline || !parsed.subheadline || !parsed.benefits || !parsed.cta) {
        throw new Error("Missing required fields in API response");
      }
      
      // Fix 4: Ensure benefits is an array
      if (!Array.isArray(parsed.benefits)) {
        parsed.benefits = ["Benefit 1", "Benefit 2", "Benefit 3"];
      }
      
    } catch (err) {
      console.warn("JSON parse failed, returning fallback:", err.message);
      console.warn("Raw content was:", cleaned);
      
      // Better fallback with actual data
      parsed = {
        headline: `Amazing ${product} for ${audience}`,
        subheadline: `Transform your experience with our premium ${product} designed specifically for ${audience}.`,
        benefits: [
          `Perfect solution for ${audience}`,
          "High quality and reliable",
          "Easy to use and effective"
        ],
        cta: "Get Started Today",
      };
    }

    return parsed;
    
  } catch (error) {
    console.error("OpenRouter API Error Details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    // Fix 5: More specific error messages
    if (error.response?.status === 401) {
      throw new Error("API key is invalid or missing. Please check your environment variables.");
    } else if (error.response?.status === 429) {
      throw new Error("API rate limit exceeded. Please try again later.");
    } else if (error.response?.status >= 500) {
      throw new Error("OpenRouter server error. Please try again later.");
    } else {
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  }
}