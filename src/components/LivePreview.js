import { useState } from "react";
import { exportLandingPage } from "../utils/exportHtml";

function LivePreview({ headline, subheadline, benefits, cta,data }) {
  const [showList, setShowList] = useState(false);

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6 inside-main">
        {/* Right: Live Preview */}
        <h2 className="text-xl mb-4">Live Preview</h2>
        <div className="border border-gray-200 p-4 text-center">
          {/* Headline */}
          <h3 className="text-2xl font-bold">{headline || "Your Headline"}</h3>

          {/* Subheadline */}
          <p className="text-gray-600 mt-2">
            {subheadline || "Your Subheadline"}
          </p>

          {/* Benefits */}
          <ul className="mt-4 space-y-2 text-left">
            {benefits && benefits.length > 0 ? (
              benefits.map((b, i) => <li key={i}>✅ {b}</li>)
            ) : (
              <li>✅ Your benefit goes here</li>
            )}
          </ul>

          {/* CTA Button */}
          {!showList ? (
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowList(true)}
            >
              Call to Action
            </button>
          ) : (
            <ul className="mt-4 space-y-2 text-left">
              {Array.isArray(cta) && cta.length > 0 ? (
                cta.map((item, i) => <li key={i}>{item}</li>)
              ) : (
                <>
                  <li>👉 Action One</li>
                  <li>👉 Action Two</li>
                  <li>👉 Action Three</li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Download HTML */}
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => exportLandingPage(data)}
      >
        Download HTML
      </button>
    </div>
  );
}

export default LivePreview;
