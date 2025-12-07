import React, { useState } from "react";

export default function Home() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;
    setRotation({ x, y });
  };

  return (
    <div className="w-full bg-black text-white select-none">

      {/* =========================== */}
      {/* HERO SECTION */}
      {/* =========================== */}
      <div className="min-h-screen w-full flex items-center justify-center px-16">

        {/* LEFT TEXT */}
        <div className="flex-1 flex flex-col items-start space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-widest leading-tight">
            VERIFYX COMPLIANCE
          </h1>

          <p className="text-lg md:text-xl max-w-xl opacity-90">
            AI-POWERED KYC & AML AUTOMATION FOR FINTECH COMPANIES.
          </p>

          <button className="mt-4 bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-md text-sm font-medium">
            Start Verification
          </button>
        </div>

        {/* RIGHT IMAGE (3D) */}
        <div
          className="flex-1 flex items-center justify-center"
          onMouseMove={handleMouseMove}
        >
          <img
            src="https://i.postimg.cc/XYwvXN8D/img-4.png"
            alt="3D Blob"
            className="w-[420px] md:w-[520px] transition-transform duration-150 ease-out"
            draggable="false"
            style={{
              transform: `
                perspective(900px)
                rotateX(${rotation.y}deg)
                rotateY(${-rotation.x}deg)
                scale(1.05)
              `,
            }}
          />
        </div>

      </div>

      {/* =========================== */}
      {/* FEATURES SECTION */}
      {/* =========================== */}
      <section className="w-full py-24 px-10 bg-black text-white">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide">
            Compliance Features
          </h2>
          <p className="text-lg opacity-70 mt-4 max-w-2xl mx-auto">
            Automating identity verification, fraud detection, and risk scoring with advanced AI.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="border border-red-500/40 rounded-2xl p-6 hover:border-red-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-pink-400 text-3xl">🧾</span>
              <span className="bg-red-600 text-xs px-3 py-1 rounded-full">KYC</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">KYC Document Verification</h3>
            <p className="opacity-70">
              Upload PAN, Aadhaar, or license—auto-check format, expiry, and document validity.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="border border-red-500/40 rounded-2xl p-6 hover:border-red-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-yellow-400 text-3xl">🔍</span>
              <span className="bg-red-600 text-xs px-3 py-1 rounded-full">OCR</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">OCR + Field Extraction</h3>
            <p className="opacity-70">
              Extract text using OCR (Tesseract/PaddleOCR) and parse fields using Regex + NER.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="border border-red-500/40 rounded-2xl p-6 hover:border-red-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-blue-400 text-3xl">🧑‍💼</span>
              <span className="bg-red-600 text-xs px-3 py-1 rounded-full">Biometric</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Face Match</h3>
            <p className="opacity-70">
              DeepFace / FaceNet-based selfie-to-ID facial comparison for identity confirmation.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="border border-red-500/40 rounded-2xl p-6 hover:border-red-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-orange-400 text-3xl">⚠️</span>
              <span className="bg-red-600 text-xs px-3 py-1 rounded-full">AML</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AML Suspicious Activity</h3>
            <p className="opacity-70">
              Detect unusual fund movements using Isolation Forest & Autoencoders.
            </p>
          </div>

          {/* CARD 5 */}
          <div className="border border-red-500/40 rounded-2xl p-6 hover:border-red-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gray-300 text-3xl">📊</span>
              <span className="bg-red-600 text-xs px-3 py-1 rounded-full">Clustering</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transaction Clustering</h3>
            <p className="opacity-70">
              Group transactions with KMeans/DBSCAN to identify hidden network patterns.
            </p>
          </div>

          {/* CARD 6 */}
          <div className="border border-red-500/40 rounded-2xl p-6 hover:border-red-500 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-red-400 text-3xl">🎯</span>
              <span className="bg-red-600 text-xs px-3 py-1 rounded-full">Risk</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Risk Scoring</h3>
            <p className="opacity-70">
              Generate user + transaction risk scores using XGBoost / Random Forest.
            </p>
          </div>

        </div>
      </section>

      {/* =========================== */}
      {/* DASHBOARD / WORKFLOW SECTION */}
      {/* =========================== */}
      <section className="w-full py-20 px-6 lg:px-20 bg-black text-white">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-center">Verification Workflow</h2>
        <p className="text-md opacity-80 mt-3 max-w-3xl mx-auto text-center">Submit → Auto-scan → Human review → Verified. Full audit trail and role-based access control for compliance teams.
        </p>

        <div className="mt-12 flex flex-col md:flex-row items-start justify-center gap-8">
          <div className="max-w-xs p-6 border border-red-500/40 rounded-xl">
            <h4 className="font-semibold mb-2">Submission</h4>
            <p className="text-sm opacity-75">User uploads documents and transaction history for review.</p>
          </div>
          <div className="max-w-xs p-6 border border-red-500/40 rounded-xl">
            <h4 className="font-semibold mb-2">Automated Scan</h4>
            <p className="text-sm opacity-75">OCR, face-match, and basic validation rules run automatically.</p>
          </div>
          <div className="max-w-xs p-6 border border-red-500/40 rounded-xl">
            <h4 className="font-semibold mb-2">Human Review</h4>
            <p className="text-sm opacity-75">Compliance officers review flagged cases and approve or reject with comments.</p>
          </div>
        </div>
      </section>

      {/* =========================== */}
      {/* FAQ SECTION */}
      {/* =========================== */}
      <section className="w-full py-24 px-10 bg-black text-white">

        <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-center">
          Frequently Asked Questions
        </h2>

        <p className="text-lg opacity-70 mt-4 max-w-3xl mx-auto text-center">
          Answers related to identity verification, fraud detection, and system integration.
        </p>

        <div className="max-w-3xl mx-auto mt-16 space-y-6">

          {[
            "Which KYC documents are supported?",
            "How accurate is the OCR & face match system?",
            "Can VerifyX detect complex fraud patterns?",
            "How is user data stored & encrypted?",
            "Can VerifyX integrate with core banking systems?",
          ].map((q, i) => (
            <div key={i} className="border-b border-red-500/20 pb-4 cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="text-lg">{q}</p>
                <span className="text-xl opacity-70">⌄</span>
              </div>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}
