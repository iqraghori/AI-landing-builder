import { useState } from "react";
import InputForm from "./InputForm";
import LivePreview from "./LivePreview";

function App() {
  const [previewData, setPreviewData] = useState({
    headline: "Your Headline Here",
    subheadline: "Your subheadline here.",
    benefits: ["Benefit one", "Benefit two", "Benefit three"],
    cta: "Call to Action",
  });
  return (
    <div class="main">
      <h1 className="text-3xl font-bold text-center mb-6 ">
        AI Landing Page Builder
      </h1>
      <h2 className="text-xl font-bold text-center mb-10">
        <em>AI Landing Page Builder – Generate your website in seconds</em>
      </h2>

      <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-6 main ">
        <InputForm setPreviewData={setPreviewData} />
        <LivePreview data={previewData} />
      </div>
    </div>
  );
}
console.log("API KEY loaded?", process.env.REACT_APP_OPENROUTER_KEY ? "YES" : "NO");

export default App;
