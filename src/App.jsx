import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

// pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About";

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

// admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import KycList from "./pages/admin/KycList";
import KycReview from "./pages/admin/KycReview";
import AMLAlerts from "./pages/admin/AMLAlerts";
import Rules from "./pages/admin/Rules";
import Reports from "./pages/admin/Reports";
import AuditLogs from "./pages/admin/AuditLogs";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="pt-24 px-6 lg:px-12 pb-12">
        <Routes>

          {/* general */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* user */}
          <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/kyc/new" element={<KycUpload />} />
          <Route path="/user/kyc/local-draft" element={<KycDetail />} />
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

          {/* admin */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/kyc" element={<KycList />} />
          <Route path="/admin/kyc/:id" element={<KycReview />} />
          <Route path="/admin/aml" element={<AMLAlerts />} />
          <Route path="/admin/rules" element={<Rules />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/audit" element={<AuditLogs />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>
    </div>
  );
}
