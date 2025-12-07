// src/pages/user/KycUpload.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function KycUpload() {
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (f) setFileName(f.name);
  }

  function submitMock() {
    const mockId = Math.floor(Math.random() * 9000) + 1000;
    navigate(`/user/kyc/${mockId}`);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Upload KYC Document</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back</Link>
      </div>

      <div className="bg-[#070707] text-white p-6 rounded-2xl border border-red-500/20 shadow-sm">
        <p className="text-sm text-gray-300 mb-4">Upload a PAN / Aadhaar / License image to run the verification demo.</p>

        <div className="space-y-4">
          <label className="block">
            <div className="text-xs text-gray-400 mb-2">Choose file</div>
            <input type="file" accept="image/*,application/pdf" onChange={handleFile} className="block text-white" />
            {fileName && <div className="text-sm mt-2 text-gray-300">Selected: {fileName}</div>}
          </label>

          <div className="flex items-center gap-3">
            <button onClick={submitMock} className="px-4 py-2 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700 transition">
              Submit & Run
            </button>
            <button onClick={() => setFileName("")} className="px-3 py-2 rounded-md border border-red-500/10 text-gray-300">Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}
