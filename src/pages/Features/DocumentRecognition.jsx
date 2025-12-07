// src/pages/Features/DocumentRecognition.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function DocumentRecognition() {
  const mock = {
    detected: [
      { type: "Aadhaar", confidence: 0.97 },
      { type: "PAN", confidence: 0.12 },
    ],
    imagePreview: null,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Document Recognition</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back to dashboard</Link>
      </div>

      <div className="bg-[#070707] p-4 rounded border border-red-500/10 text-white shadow-sm">
        <div className="mb-4">
          <div className="text-sm text-gray-400">Uploaded document preview</div>
          <div className="mt-3 w-full md:w-1/2 h-40 bg-[#0b0b0b] rounded flex items-center justify-center text-gray-500">
            {mock.imagePreview ? (
              <img src={mock.imagePreview} alt="doc preview" className="h-full object-contain" />
            ) : (
              <span>no preview (placeholder)</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Detected document types</h3>

          <div className="space-y-2">
            {mock.detected.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-2 border rounded border-red-500/5">
                <div>
                  <div className="font-medium">{d.type}</div>
                  <div className="text-xs text-gray-400">confidence</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">{Math.round(d.confidence * 100)}%</div>
                  <div className={`text-xs ${d.confidence > 0.8 ? "text-green-500" : d.confidence > 0.4 ? "text-amber-500" : "text-red-500"}`}>
                    {d.confidence > 0.8 ? "High" : d.confidence > 0.4 ? "Medium" : "Low"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <div><strong>Note:</strong> Replace mock detection with API response when backend is ready.</div>
        </div>
      </div>
    </div>
  );
}
