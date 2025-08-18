function LivePreview(data) {
  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6 inside-main">
        {/* Right: Live Preview */}
        <h2 className="text-xl mb-4">Live Preview</h2>
        <div className="border border-gray-200 p-4 text-center">
          <h3 className="text-2xl font-bold">{data.headline}</h3>
          <p className="text-gray-600 mt-2">{data.subheadline}</p>
          <ul className="mt-4 space-y-2 text-left">
          {data.data.benefits.map((b, i) => (
            <li key={i}>✅ {b}</li>
          ))}
        </ul>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          {data.cta || "Call to Action" }
        </button>
        </div>
      </div>
    </div>
  );
}
export default LivePreview;
