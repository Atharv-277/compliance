// src/pages/Features/FaceMatch.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function FaceMatch() {
  const mock = {
    faceLeft: null,
    faceRight: null,
    matchScore: 0.86,
    liveness: "passed",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Face Match</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back to dashboard</Link>
      </div>

      <div className="bg-[#070707] p-4 rounded border border-red-500/10 text-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <div className="text-sm text-gray-400 mb-2">Document face / Selfie comparison</div>

            <div className="flex gap-4 items-center">
              <div className="w-36 h-36 bg-[#0b0b0b] rounded overflow-hidden flex items-center justify-center text-gray-500">
                {mock.faceLeft ? <img src={mock.faceLeft} alt="doc face" className="object-cover w-full h-full" /> : "doc face"}
              </div>

              <div className="w-36 h-36 bg-[#0b0b0b] rounded overflow-hidden flex items-center justify-center text-gray-500">
                {mock.faceRight ? <img src={mock.faceRight} alt="selfie" className="object-cover w-full h-full" /> : "selfie"}
              </div>

              <div className="ml-4">
                <div className="text-sm text-gray-400">Face match score</div>
                <div className="text-2xl font-bold">{Math.round(mock.matchScore * 100)}%</div>
                <div className={`text-sm mt-1 ${mock.matchScore > 0.8 ? "text-green-500" : mock.matchScore > 0.5 ? "text-amber-500" : "text-red-500"}`}>
                  {mock.matchScore > 0.8 ? "Good match" : mock.matchScore > 0.5 ? "Possible" : "Poor match"}
                </div>

                <div className="mt-3 text-sm">
                  Liveness: <span className={mock.liveness === "passed" ? "text-green-500" : "text-red-500"}>{mock.liveness}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0b0b0b] p-3 rounded text-sm text-gray-300 border border-red-500/5">
            <div className="font-medium mb-2">Notes</div>
            <ul className="list-disc pl-4 space-y-1">
              <li>Face match uses internal model (mocked here).</li>
              <li>Show face crops, confidence and liveness evidence (video frames / selfie metadata).</li>
              <li>Allow admin override on low-confidence matches.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
