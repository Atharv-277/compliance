// src/pages/Features/AMLAnomaly.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AMLAnomaly() {
  const mock = {
    riskScore: 0.72,
    topFlags: [
      { ruleId: "TXN_LARGE", desc: "Large incoming transfers", severity: "HIGH", evidence: ["txn_2345"] },
      { ruleId: "RAPID_MOVEMENT", desc: "Rapid fund movement", severity: "MEDIUM", evidence: ["txn_2346","txn_2347"] },
    ],
    recentTxns: [
      { id: "txn_2345", amt: 80000, ts: "2025-12-01T10:00:00Z", flagged: true },
      { id: "txn_2346", amt: 5000, ts: "2025-12-02T12:30:00Z", flagged: false },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">AML Anomaly Detection</h1>
        <Link to="/user/dashboard" className="text-sm text-gray-300">← Back to dashboard</Link>
      </div>

      <div className="bg-[#070707] p-4 rounded shadow-sm border border-red-500/10 text-white">
        <div className="mb-4">
          <div className="text-sm text-gray-400">Overall AML risk score</div>
          <div className="mt-2 flex items-center gap-4">
            <div className="text-3xl font-bold" style={{ color: mock.riskScore > 0.7 ? "#dc2626" : mock.riskScore > 0.4 ? "#d97706" : "#15803d" }}>
              {Math.round(mock.riskScore * 100)}%
            </div>
            <div className="text-sm text-gray-300">Higher = more suspicious</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Top Flags</h3>
          <div className="space-y-2">
            {mock.topFlags.map((f) => (
              <div key={f.ruleId} className="p-3 border rounded flex items-start justify-between border-red-500/5">
                <div>
                  <div className="font-medium">{f.desc}</div>
                  <div className="text-xs text-gray-400 mt-1">Rule: {f.ruleId} • Severity: <span className={f.severity==="HIGH" ? "text-red-500" : f.severity==="MEDIUM" ? "text-amber-500" : "text-green-500"}>{f.severity}</span></div>
                </div>
                <div className="text-sm text-gray-300">
                  Evidence: {f.evidence.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Recent Transactions (sample)</h4>
          <div className="space-y-2">
            {mock.recentTxns.map((t) => (
              <div key={t.id} className="p-3 border rounded flex justify-between items-center border-red-500/5">
                <div>
                  <div className="font-medium">{t.id}</div>
                  <div className="text-xs text-gray-400">{new Date(t.ts).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{t.amt}</div>
                  {t.flagged && <div className="text-xs text-red-500 mt-1">Flagged</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <strong>Note:</strong> This page displays mock AML flags and transactions. Integrate API to fetch real evidence and timestamps.
        </div>
      </div>
    </div>
  );
}
