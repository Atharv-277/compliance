// src/pages/Features/TextFieldExtraction.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TextFieldExtraction() {
  const [fields, setFields] = useState({
    name: "Demo User",
    dob: "1990-01-01",
    idNumber: "1234 5678",
    address: "123 Demo Street, City",
  });

  const [editing, setEditing] = useState({
    name: false,
    dob: false,
    idNumber: false,
    address: false,
  });

  function startEdit(key) {
    setEditing((e) => ({ ...e, [key]: true }));
  }

  function saveEdit(key, value) {
    setFields((f) => ({ ...f, [key]: value }));
    setEditing((e) => ({ ...e, [key]: false }));
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Text Field Extraction</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back to dashboard</Link>
      </div>

      <div className="bg-[#070707] p-4 rounded border border-red-500/10 text-white shadow-sm">
        <p className="text-sm text-gray-400 mb-4">Parsed fields extracted from OCR. Click Edit to correct, then Save.</p>

        <div className="space-y-3">
          {Object.entries(fields).map(([key, value]) => (
            <div key={key} className="p-3 border rounded flex items-start justify-between border-red-500/5">
              <div>
                <div className="text-xs text-gray-400">{key}</div>

                {!editing[key] ? (
                  <div className="font-medium mt-1">{value}</div>
                ) : (
                  <input
                    defaultValue={value}
                    className="mt-1 border border-gray-800 px-2 py-1 rounded w-full bg-black text-white"
                    onBlur={(e) => saveEdit(key, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(key, e.target.value);
                    }}
                    autoFocus
                  />
                )}
              </div>

              <div className="ml-4">
                {!editing[key] ? (
                  <button
                    type="button"
                    onClick={() => startEdit(key)}
                    className="text-sm px-3 py-1 rounded bg-red-600 text-white"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditing((e) => ({ ...e, [key]: false }))}
                    className="text-sm px-3 py-1 border rounded text-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <strong>Note:</strong> In production, submit corrected fields back to the server for persistence.
        </div>
      </div>
    </div>
  );
}
