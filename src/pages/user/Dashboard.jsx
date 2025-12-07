// src/pages/user/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Link to="/user/kyc/new" className="px-4 py-2 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700 transition">
            New KYC
          </Link>
          <Link to="/features/ocr" className="text-sm text-gray-300">Run Feature</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#070707] text-white rounded-2xl border border-red-500/20 shadow-sm">
          <div className="text-sm text-gray-300">Verifications Today</div>
          <div className="text-2xl font-bold mt-2">24</div>
        </div>

        <div className="p-6 bg-[#070707] text-white rounded-2xl border border-red-500/20 shadow-sm">
          <div className="text-sm text-gray-300">Suspicious Cases</div>
          <div className="text-2xl font-bold mt-2 text-red-600">3</div>
        </div>

        <div className="p-6 bg-[#070707] text-white rounded-2xl border border-red-500/20 shadow-sm">
          <div className="text-sm text-gray-300">Pending Reviews</div>
          <div className="text-2xl font-bold mt-2">6</div>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Verifications</h2>
        <div className="space-y-3">
          {[1,2,3].map((i) => (
            <div key={i} className="p-4 bg-[#070707] text-white rounded-md flex items-center justify-between border border-red-500/10">
              <div>
                <div className="font-medium">Case #{1000 + i}</div>
                <div className="text-xs text-gray-400">User: demo.user{ i }@example.com</div>
              </div>
              <div className="flex items-center gap-3">
                <Link to={`/user/kyc/${1000 + i}`} className="text-sm text-red-600">Open</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
