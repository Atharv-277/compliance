// src/pages/Home.jsx
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import indiaVideo from "../components/india.mp4"; // ensure this path is correct

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      }
    }
  }, [location]);

  const steps = [
    {
      title: "Upload Documents",
      desc: "PAN, Aadhaar, Driver’s License, Passport.",
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 9h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Extract Data",
      desc: "OCR + AI extracts Name, DOB, Address, and Document Number.",
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Auto Verification",
      desc: "Face match, document validation, expiry check.",
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2l3 6 6 .5-4.5 4 1.5 6L12 16l-6 3.5 1.5-6L3 8.5 9 8 12 2z" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
    {
      title: "AML Screening",
      desc: "Risk scoring and suspicious pattern detection.",
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 12h6l3-8 3 16 3-6h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const features = [
    { title: "AI-powered OCR", desc: "Accurate text extraction from ID proofs.", badge: "OCR" },
    { title: "Face Verification", desc: "Liveness + selfie-to-ID matching.", badge: "Biometric" },
    { title: "Fraud Detection", desc: "Tamper & forgery detection.", badge: "Fraud" },
    { title: "AML Engine", desc: "Rule-based & ML-backed screening.", badge: "AML" },
    { title: "Audit Trails", desc: "Immutable logs & role-based access.", badge: "Audit" },
    { title: "Secure APIs", desc: "Drop-in integrations with webhooks.", badge: "API" },
  ];

  const faqs = [
    "Which KYC documents are supported?",
    "How accurate is OCR & face match?",
    "How fast is onboarding?",
    "How is data protected?",
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 text-gray-900 overflow-hidden">
      {/* HERO */}
      <header className="min-h-[80vh] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[rgba(124,58,237,0.06)] to-[rgba(14,165,233,0.03)] px-3 py-1 rounded-full text-sm">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--accent-2)" }}>
                  Enterprise-ready
                </span>
                <span className="text-xs text-muted">Audit logs • SOC2-style controls</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-tight" style={{ lineHeight: 1.03 }}>
                Automate KYC & AML for FinTechs — <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-violet-600">fast, accurate, compliant</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl">
                End-to-end verification pipeline: document capture, OCR, face match, tamper detection and AML screening — in one API-first, HIPAA/GDPR-conscious platform.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link to="/verify" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-600 to-violet-600 text-white rounded-lg shadow-lg transform transition hover:-translate-y-1">
                  Start Verification
                </Link>

                <Link to="/demo" className="inline-flex items-center px-5 py-3 border border-gray-200 rounded-lg hover:shadow-sm">
                  Request Demo
                </Link>

                <div className="ml-3 mt-2 sm:mt-0 text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">70% </span> reduction in manual KYC time
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="py-3 px-4 bg-white border rounded-lg shadow-sm text-sm w-40">
                  <div className="text-2xl font-bold">70%</div>
                  <div className="text-xs text-gray-500">Manual time saved</div>
                </div>

                <div className="py-3 px-4 bg-white border rounded-lg shadow-sm text-sm w-40">
                  <div className="text-2xl font-bold">99.2%</div>
                  <div className="text-xs text-gray-500">OCR accuracy</div>
                </div>

                <div className="py-3 px-4 bg-white border rounded-lg shadow-sm text-sm w-40">
                  <div className="text-2xl font-bold">Enterprise</div>
                  <div className="text-xs text-gray-500">Security & audit</div>
                </div>
              </div>

              {/* testimonial */}
              <blockquote className="mt-8 p-4 bg-white border-l-4 border-sky-100 rounded-md max-w-xl shadow-sm">
                <p className="text-sm text-gray-700">“We cut onboarding time by half and reduced manual reviews by 80%. Integration was straightforward.”</p>
                <footer className="mt-3 text-xs text-gray-500">— Head of Compliance, NeoBank</footer>
              </blockquote>
            </div>

            {/* RIGHT SIDE — LARGE VIDEO (glass panel) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-full h-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative transform transition-all hover:scale-[1.01]">
                <video
                  src={indiaVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

                
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">Simple, automated flow that integrates into your onboarding.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition transform hover:-translate-y-2 motion-reduce:transform-none"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-tr from-sky-100 to-violet-50 text-sky-600 mb-4">
                  {s.icon}
                </div>
                <h4 className="font-semibold text-gray-900">{s.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Key features</h2>
            <div className="text-sm text-gray-600">API-first • Scalable • Secure</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, idx) => (
              <div key={idx} className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full">{f.badge}</span>
                </div>
                <h3 className="text-lg font-semibold mt-3 text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* trusted by strip */}
          <div className="mt-12 flex items-center justify-center gap-8 py-6 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Trusted by</div>
            <div className="flex items-center gap-6 opacity-80">
              <div className="h-6 w-24 bg-gray-200 rounded-sm" />
              <div className="h-6 w-24 bg-gray-200 rounded-sm" />
              <div className="h-6 w-24 bg-gray-200 rounded-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold">Why choose Compliance Suite</h2>
              <ul className="mt-6 space-y-4 text-gray-700">
                <li>Reduce manual KYC time by up to 70%</li>
                <li>Enterprise-grade security and audit trails</li>
                <li>Plug-in APIs and fast integration</li>
              </ul>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-xl border border-gray-100 text-center">
                  <div className="text-2xl font-bold">70%</div>
                  <div className="text-sm text-gray-500">Time saved</div>
                </div>
                <div className="p-6 bg-white rounded-xl border border-gray-100 text-center">
                  <div className="text-2xl font-bold">99.2%</div>
                  <div className="text-sm text-gray-500">OCR accuracy</div>
                </div>
                <div className="p-6 bg-white rounded-xl border border-gray-100 text-center">
                  <div className="text-2xl font-bold">Enterprise</div>
                  <div className="text-sm text-gray-500">Security</div>
                </div>
                <div className="p-6 bg-white rounded-xl border border-gray-100 text-center">
                  <div className="text-2xl font-bold">API</div>
                  <div className="text-sm text-gray-500">Easy integration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((q, i) => (
              <details key={i} className="p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
                <summary className="cursor-pointer font-medium">{q}</summary>
                <p className="mt-2 text-sm text-gray-600">More details will be provided here for customers and integrators.</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-gray-100 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-lg font-semibold">Compliance Suite</h3>
            <p className="text-sm text-gray-700 mt-2">Automating KYC & AML for modern FinTech companies.</p>
          </div>

          <div className="flex gap-8 mt-6 md:mt-0">
            <div>
              <h4 className="font-medium">Links</h4>
              <ul className="text-sm text-gray-600 space-y-1 mt-2">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/api-docs">API Docs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium">Support</h4>
              <ul className="text-sm text-gray-600 space-y-1 mt-2">
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/demo">Request Demo</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* inline keyframes / small animations */}
      <style>{`
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }

        /* subtle fade-in for sections on first paint */
        .fade-in { animation: fadeInUp .6s ease both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
