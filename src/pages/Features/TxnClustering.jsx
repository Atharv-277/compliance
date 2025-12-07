// src/pages/Features/TxnClustering.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function TxnClustering() {
  const clusters = [
    { id: 1, size: 5, reason: "Shared beneficiary accounts", score: 0.88, members: ["txn_101","txn_102","txn_103"] },
    { id: 2, size: 3, reason: "Rapid successive transactions", score: 0.63, members: ["txn_210","txn_211"] },
    { id: 3, size: 2, reason: "High-value linked txns", score: 0.45, members: ["txn_320"] },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Transaction Clustering</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back to dashboard</Link>
      </div>

      <div className="bg-[#070707] p-4 rounded border border-red-500/10 text-white shadow-sm">
        <p className="text-sm text-gray-400 mb-4">Clusters of related transactions identified by the clustering model (mock data).</p>

        <div className="space-y-3">
          {clusters.map((c) => (
            <div key={c.id} className="p-3 border rounded border-red-500/5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">Cluster #{c.id} — {c.reason}</div>
                  <div className="text-xs text-gray-400">Members: {c.members.join(", ")}</div>
                </div>

                <div className="text-right">
                  <div className={`font-semibold ${c.score > 0.7 ? "text-red-500" : c.score > 0.45 ? "text-amber-500" : "text-green-500"}`}>
                    {Math.round(c.score * 100)}%
                  </div>
                  <div className="text-xs text-gray-400">Size: {c.size}</div>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-400">
                <strong>Note:</strong> Click a member id to view the transaction timeline (not implemented in mock).
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
