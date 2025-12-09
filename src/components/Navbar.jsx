// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Optional: Add this to index.css for better font
// @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/#" + id);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const links = [
    { name: "Home", to: "/", type: "link" },
    { name: "Features", id: "features", type: "scroll" },
    { name: "How It Works", id: "how-it-works", type: "scroll" },
    { name: "About", to: "/about", type: "link" },
  ];

  const navItem = "px-3 py-2 rounded-md font-medium transition-all duration-200 relative";
  const navBase = "text-gray-700 hover:text-gray-900 hover:scale-[1.03]";

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { when: "beforeChildren", staggerChildren: 0.04 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 group">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 shadow-md"
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, #2563eb, #06b6d4, #7c3aed)",
              backgroundSize: "200% 200%",
              animation: "bgShift 6s ease infinite",
            }}
          >
            <span className="text-white font-extrabold text-lg tracking-tight">C</span>
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-gray-900 font-semibold tracking-tight text-base">
              Compliance Suite
            </span>
            <span className="text-xs text-gray-500">KYC & AML Automation</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <motion.div key={l.name} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              {l.type === "link" ? (
                <NavLink
                  to={l.to}
                  end
                  className={({ isActive }) =>
                    `${navItem} ${navBase} ${
                      isActive ? "text-gray-900" : ""
                    } before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-blue-600 before:transition-all before:duration-200 hover:before:w-full`
                  }
                  onClick={() => setOpen(false)}
                >
                  {l.name}
                </NavLink>
              ) : (
                <button
                  onClick={() => {
                    scrollToSection(l.id);
                    setOpen(false);
                  }}
                  className={`${navItem} ${navBase} before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-blue-600 before:transition-all before:duration-200 hover:before:w-full`}
                >
                  {l.name}
                </button>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Login Button */}
        <div className="hidden md:flex">
          <NavLink
            to="/login"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg
            transform transition-all duration-200 hover:-translate-y-0.5"
          >
            Login
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden px-4 pb-4"
            style={{ overflow: "hidden" }}
          >
            <motion.div className="mt-2 rounded-md bg-white border border-gray-200 shadow-sm p-2">
              {links.map((l) => (
                <motion.div key={l.name} variants={itemVariants}>
                  {l.type === "link" ? (
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      {l.name}
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => {
                        scrollToSection(l.id);
                        setOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      {l.name}
                    </button>
                  )}
                </motion.div>
              ))}

              <div className="border-t border-gray-200 mt-2 pt-2">
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-3 text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow"
                >
                  Login
                </NavLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moving gradient keyframes */}
      <style>{`
        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </header>
  );
}
