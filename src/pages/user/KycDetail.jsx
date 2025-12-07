// src/pages/user/KycDetail.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function KycDetail() {
  const { id } = useParams();

  const mock = {
    id,
    name: "Demo User",
    document: "Aadhaar",
    status: "Pending",
    risk: 0.37,
    notes: "No immediate flags. Manual review recommended for address mismatch.",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">KYC Case #{mock.id}</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back to dashboard</Link>
      </div>

      <div className="bg-[#070707] text-white p-6 rounded-2xl border border-red-500/20 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-gray-400">Name</div>
            <div className="font-medium">{mock.name}</div>

            <div className="mt-4 text-xs text-gray-400">Document</div>
            <div className="font-medium">{mock.document}</div>

            <div className="mt-4 text-xs text-gray-400">Status</div>
            <div className={mock.status === "Pending" ? "text-amber-600 font-semibold" : "text-green-600 font-semibold"}>{mock.status}</div>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs text-gray-400">Risk Score</div>
            <div className="text-2xl font-bold" style={{ color: mock.risk > 0.7 ? "#dc2626" : mock.risk > 0.4 ? "#d97706" : "#15803d" }}>
              {Math.round(mock.risk * 100)}%
            </div>

            <div className="mt-6">
              <div className="text-xs text-gray-400">Notes</div>
              <div className="mt-2 text-sm text-gray-300">{mock.notes}</div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button className="px-4 py-2 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 transition">
                Approve
              </button>
              <button className="px-4 py-2 rounded-md border border-red-500/10 text-gray-300">Request Info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
