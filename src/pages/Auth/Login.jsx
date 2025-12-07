// src/pages/Auth/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function demoLogin(e) {
    e.preventDefault();
    navigate("/user/dashboard");
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-[#070707] text-white p-6 rounded-2xl border border-red-500/20 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={demoLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-300 mb-1">Email</label>
            <input type="email" required className="w-full bg-black border border-gray-800 px-3 py-2 rounded text-white" />
          </div>
          <div>
            <label className="block text-xs text-gray-300 mb-1">Password</label>
            <input type="password" required className="w-full bg-black border border-gray-800 px-3 py-2 rounded text-white" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition">Login</button>
            <button type="button" onClick={() => navigate("/")} className="text-sm text-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
