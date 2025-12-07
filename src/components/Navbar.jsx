// src/components/Navbar.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(180deg,#ef4444,#b91c1c)" }}>
            <span className="text-white font-extrabold">V</span>
          </div>

          <div className="hidden sm:flex flex-col leading-none">
            <div className="text-white font-bold tracking-wide">VerifyX</div>
            <div className="text-xs text-gray-300 -mt-1">Compliance Automation</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium ${isActive ? "bg-white text-black" : "text-gray-200 hover:text-white/90"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/features/ocr"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium ${isActive ? "bg-white text-black" : "text-gray-200 hover:text-white/90"}`
            }
          >
            Features
          </NavLink>

          <NavLink
            to="/user/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium ${isActive ? "bg-white text-black" : "text-gray-200 hover:text-white/90"}`
            }
          >
            User
          </NavLink>

          <NavLink
            to="/user/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium ${isActive ? "bg-white text-black" : "text-gray-200 hover:text-white/90"}`
            }
          >
            Dashboard
          </NavLink>
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md font-medium text-sm bg-red-600 hover:bg-red-700 transition text-white"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <details className="relative">
            <summary className="px-3 py-2 rounded-md bg-white/5 cursor-pointer">Menu</summary>
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-black border border-gray-800 shadow-lg overflow-hidden">
              <NavLink to="/" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Home</NavLink>
              <NavLink to="/features/ocr" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Features</NavLink>
              <NavLink to="/user/dashboard" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5">User</NavLink>
              <NavLink to="/user/dashboard" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Dashboard</NavLink>
              <Link to="/login" className="block px-4 py-2 text-sm text-white bg-red-600">Login</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
