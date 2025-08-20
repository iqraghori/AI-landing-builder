function LivePreview({ headline, subheadline, benefits, cta }) {
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
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            <ul className="mt-4 space-y-2 text-left">
              {cta && cta.length > 0 ? (
                cta.map((b, i) => <li key={i}>✅ {b}</li>)
              ) : (
                <li>Call to Action</li>
              )}
            </ul>

            {cta || "Call to Action"}
          </button>
        </div>
      </div>

      {/* Download HTML button */}
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Download HTML
      </button>
    </div>
  );
}

export default LivePreview;
