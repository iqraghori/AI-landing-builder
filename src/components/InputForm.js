import { useState } from "react";
import { generateLandingContent } from "../utils/openai";

function InputForm({ setPreviewData }) {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await generateLandingContent(product, audience, description);
      setPreviewData(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6 inside-main">
        <h2 className="text-xl mb-4">Enter Details</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium">Business Name</label>
            <input
              type="text"
              placeholder="Business Name"
              className="w-full border rounded p-2"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium">Target Audience</label>
            <input
              type="text"
              placeholder="Target Audience"
              className="w-full border rounded p-2"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              placeholder="Description"
              className="w-full border rounded p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-teal-800 text-white py-2 rounded"
            onClick={handleGenerate}
            disabled={loading}
          >
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            {loading ? "Generating..." : "Generate Landing Page"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputForm;
