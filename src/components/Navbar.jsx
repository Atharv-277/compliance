// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Navbar component
 *
 * - Reads current user from localStorage (key: "user") safely.
 * - Shows Dashboard / Logout when user exists, otherwise shows Login.
 * - Provides mobile menu and smooth scroll-to-section support.
 * - Logout clears "user" and "token" (if present) from localStorage and navigates home.
 *
 * Replace localStorage key names if your app stores them differently.
 */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // safe parse helper
  const parseUser = () => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      // malformed JSON
      return null;
    }
  };

  useEffect(() => {
    // initial load
    setUser(parseUser());

    // update when localStorage changes in other tabs
    const onStorage = (e) => {
      if (e.key === "user") setUser(parseUser());
    };
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // update user when location changes (useful if login happened and you redirected)
  useEffect(() => {
    setUser(parseUser());
  }, [location.pathname]);

  const logout = () => {
    // clear auth-related keys (adjust if your keys differ)
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const scrollToSection = (id) => {
    // If you want to navigate to home and then scroll, you might handle anchors in the Home page.
    if (location.pathname !== "/") {
      // navigate to root with hash — your Home route should handle scrolling from hash if needed
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

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <motion.div key={l.name} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              {l.type === "link" ? (
                <NavLink
                  to={l.to}
                  end
                  className={({ isActive }) =>
                    `${navItem} ${navBase} ${isActive ? "text-gray-900" : ""} before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-blue-600 before:transition-all before:duration-200 hover:before:w-full`
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

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <NavLink
                to="/user/dashboard"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                  navigate("/");
                }}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700"
              >
                Logout
              </button>

              <span className="text-sm text-gray-600">
                Hi, {user.name || user.phone || "User"}
              </span>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg transform transition-all duration-200 hover:-translate-y-0.5"
            >
              Login
            </NavLink>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

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
                {user ? (
                  <div className="space-y-2">
                    <NavLink
                      to="/user/dashboard"
                      onClick={() => setOpen(false)}
                      className="block w-full text-center px-4 py-3 text-sm text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Dashboard
                    </NavLink>

                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                        navigate("/");
                      }}
                      className="block w-full text-center px-4 py-3 text-sm bg-gray-100 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center px-4 py-3 text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
