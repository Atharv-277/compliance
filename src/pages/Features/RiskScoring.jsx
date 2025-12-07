// src/pages/Features/RiskScoring.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function RiskScoring() {
  const mock = {
    overall: 0.71,
    contributions: [
      { name: "Document Risk (OCR/tamper)", value: 0.25 },
      { name: "Behavioral (txn patterns)", value: 0.30 },
      { name: "Network Risk (graph)", value: 0.10 },
      { name: "Manual Flags", value: 0.06 },
    ],
    notes: "Combined model (ensemble) score. Thresholds: <40% low, 40–70% medium, >70% high.",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Risk Scoring</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back to dashboard</Link>
      </div>

      <div className="bg-[#070707] p-4 rounded border border-red-500/10 text-white shadow-sm">
        <div className="mb-4">
          <div className="text-sm text-gray-400">Overall risk score</div>
          <div className="mt-2 flex items-center gap-4">
            <div className="text-3xl font-bold" style={{ color: mock.overall > 0.7 ? "#dc2626" : mock.overall > 0.4 ? "#d97706" : "#15803d" }}>
              {Math.round(mock.overall * 100)}%
            </div>
            <div className="text-sm text-gray-300">{mock.notes}</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Model contribution breakdown</h3>
          <div className="space-y-3">
            {mock.contributions.map((c) => (
              <div key={c.name} className="p-3 border rounded flex items-center justify-between border-red-500/5">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-gray-400">Relative weight in final score</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{Math.round(c.value * 100)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <strong>Note:</strong> Fetch breakdown from risk API and show explainability (SHAP/LIME) in production.
        </div>
      </div>
    </div>
  );
}
