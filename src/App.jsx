// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

// pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import About from "./pages/About";   // FIXED: correct import

// user pages
import UserDashboard from "./pages/user/Dashboard";
import KycUpload from "./pages/user/KycUpload";
import KycDetail from "./pages/user/KycDetail";

// features
import DocumentRecognition from "./pages/Features/DocumentRecognition";
import OCR from "./pages/Features/OCR";
import TextFieldExtraction from "./pages/Features/TextFieldExtraction";
import FaceMatch from "./pages/Features/FaceMatch";
import AMLAnomaly from "./pages/Features/AMLAnomaly";
import TxnClustering from "./pages/Features/TxnClustering";
import NetworkFraud from "./pages/Features/NetworkFraud";
import RiskScoring from "./pages/Features/RiskScoring";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="pt-24 px-6 lg:px-12 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* FIXED ABOUT PAGE ROUTE */}
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />

          {/* user */}
          <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/kyc/new" element={<KycUpload />} />
          <Route path="/user/kyc/:id" element={<KycDetail />} />

          {/* features */}
          <Route path="/features/document-recognition" element={<DocumentRecognition />} />
          <Route path="/features/ocr" element={<OCR />} />
          <Route path="/features/text-extraction" element={<TextFieldExtraction />} />
          <Route path="/features/face-match" element={<FaceMatch />} />
          <Route path="/features/aml-anomaly" element={<AMLAnomaly />} />
          <Route path="/features/txn-clustering" element={<TxnClustering />} />
          <Route path="/features/network-fraud" element={<NetworkFraud />} />
          <Route path="/features/risk-scoring" element={<RiskScoring />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
