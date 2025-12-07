// src/pages/Features/OCR.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function OCR() {
  const [ocrText, setOcrText] = useState(
    `Name: Demo User
DOB: 1990-01-01
ID: 1234 5678

This is sample OCR output. Replace with real OCR text from backend when available.`
  );
  const [running, setRunning] = useState(false);

  async function rerunOCR() {
    setRunning(true);
    await new Promise((r) => setTimeout(r, 900));
    setOcrText((s) => s + `\n\n[Re-run completed at ${new Date().toLocaleTimeString()}]`);
    setRunning(false);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">OCR</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back to dashboard</Link>
      </div>

      <div className="bg-[#070707] p-4 rounded border border-red-500/10 text-white shadow-sm">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Raw OCR output</div>
            <button
              onClick={rerunOCR}
              disabled={running}
              className="text-sm px-3 py-1 rounded bg-red-600 text-white"
            >
              {running ? "Running..." : "Re-run OCR"}
            </button>
          </div>

          <pre className="mt-3 p-3 bg-[#0b0b0b] rounded text-sm text-gray-300 whitespace-pre-wrap border border-red-500/5">
            {ocrText}
          </pre>
        </div>

        <div className="text-sm text-gray-400">
          <strong>Note:</strong> Replace mock content with real OCR results from backend.
        </div>
      </div>
    </div>
  );
}
