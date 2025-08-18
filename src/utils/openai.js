import axios from "axios";

export async function generateLandingContent(product, audience, desc) {
  const r = await axios.post("/api/generate", {
    product,
    audience,
    desc,
  });

  const content = r.data?.content || "{}";
  let data;
  try {
    data = JSON.parse(content);
  } catch {
    throw new Error("AI did not return valid JSON");
  }
  return {
    headline: data.headline || "Your Headline Here",
    subheadline: data.subheadline || "Your subheadline here.",
    benefits: Array.isArray(data.benefits) ? data.benefits : [],
    cta: data.cta || "Call to Action",
  };
}
