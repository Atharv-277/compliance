// src/pages/Features/NetworkFraud.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NetworkFraud() {
  const mock = {
    topNodes: [
      { id: "acct_101", score: 0.92, role: "beneficiary" },
      { id: "acct_202", score: 0.78, role: "intermediary" },
      { id: "acct_309", score: 0.55, role: "sender" },
    ],
    topEdges: [
      { from: "acct_101", to: "acct_202", weight: 12 },
      { from: "acct_202", to: "acct_309", weight: 5 },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Network Fraud Detection</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back to dashboard</Link>
      </div>

      <div className="bg-[#070707] p-4 rounded border border-red-500/10 text-white shadow-sm">
        <p className="text-sm text-gray-400 mb-4">Suspicious network nodes and relationships (mock). Replace with graph visualization later.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Top suspicious nodes</h3>
            <div className="space-y-2">
              {mock.topNodes.map((n) => (
                <div key={n.id} className="p-3 border rounded flex justify-between items-center border-red-500/5">
                  <div>
                    <div className="font-medium">{n.id}</div>
                    <div className="text-xs text-gray-400">role: {n.role}</div>
                  </div>
                  <div className={`font-semibold ${n.score > 0.8 ? "text-red-500" : n.score > 0.6 ? "text-amber-500" : "text-green-500"}`}>
                    {Math.round(n.score * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Top relationships</h3>
            <div className="space-y-2">
              {mock.topEdges.map((e, i) => (
                <div key={i} className="p-3 border rounded border-red-500/5">
                  <div className="text-sm font-medium">{e.from} → {e.to}</div>
                  <div className="text-xs text-gray-400">weight: {e.weight}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <strong>Note:</strong> Use a graphing library (visx/cytoscape) for interactive visuals in production.
        </div>
      </div>
    </div>
  );
}
