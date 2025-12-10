import React, { useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";

/*
  Dashboard.jsx
  Single-file React + Tailwind dashboard for a KYC/AML compliance app.
  Usage: drop into routes inside a Router and pass optional `user` prop.
*/

export default function Dashboard({ user = null }) {
  const navigate = useNavigate();

  // default/mock profile (replace with real API call)
  const profile = user || {
    name: "Atharv",
    lastLogin: "December 9, 2025 17:30",
    kycStatus: "Not Submitted", // Not Submitted | Pending | Verified | Rejected
    riskScore: 42,
    riskCategory: "Medium",
    activities: [
      { id: 1, activity: "PAN Verified", status: "Completed", date: "Nov 23, 2025" },
      { id: 2, activity: "AML Screening", status: "Completed", date: "Nov 23, 2025" },
      { id: 3, activity: "Aadhaar Upload", status: "Pending", date: "Nov 22, 2025" }
    ],
    documents: []
  };

  useEffect(() => {
    // fetch profile and set local state if needed
  }, []);

  function navigateTo(path) {
    navigate(path);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header profile={profile} onUploadClick={() => navigateTo("/user/kyc/new")} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-7 space-y-6">
            <KYCCard
              profile={profile}
              onUploadClick={() => navigateTo("/user/kyc/new")}
              onViewDetails={() => navigateTo("/user/kyc/1")}
            />
            <VerificationTimeline status={profile.kycStatus} />
            <Notifications />
            <ActivitiesTable activities={profile.activities} />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <AMLCard score={profile.riskScore} category={profile.riskCategory} />
            <DocumentLocker documents={profile.documents} onUpload={() => navigateTo("/user/kyc/new")} />
            <ComplianceScore score={profile.riskScore} />
            <QuickActions onUpload={() => navigateTo("/user/kyc/new")} />
            <SupportCard />
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small UI primitives ---------- */

function Card({ children, className = "" }) {
  return <section className={`bg-white p-6 rounded-2xl shadow ${className}`}>{children}</section>;
}

function Badge({ children, variant = "neutral" }) {
  const classes =
    variant === "success"
      ? "bg-green-100 text-green-700"
      : variant === "danger"
      ? "bg-red-100 text-red-700"
      : variant === "warning"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-700";

  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${classes}`}>{children}</span>;
}

/* ---------- Header ---------- */

function Header({ profile, onUploadClick }) {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 rounded-2xl shadow">
      <div className="w-full md:w-auto">
        <h1 className="text-2xl font-semibold leading-snug">Welcome, {profile.name}</h1>
        <p className="text-sm text-gray-500 mt-1">Here is your compliance overview</p>
        <p className="mt-2 text-xs text-gray-400">Last login: {profile.lastLogin}</p>
      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-4">
        <div className="text-right">
          <div className="text-xs text-gray-500">KYC</div>
          <div className="mt-1">
            <KycStatusBadge status={profile.kycStatus} />
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-gray-500">Risk Score</div>
          <div className="mt-1 text-lg font-semibold">{profile.riskScore}/100</div>
          <div className="text-xs text-gray-400">{profile.riskCategory}</div>
        </div>

        <button
          onClick={onUploadClick}
          className="ml-2 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
          aria-label="Upload KYC"
        >
          Upload KYC
        </button>
      </div>
    </header>
  );
}

function KycStatusBadge({ status }) {
  if (status === "Verified") return <Badge variant="success">Verified</Badge>;
  if (status === "Rejected") return <Badge variant="danger">Rejected</Badge>;
  if (status === "Pending") return <Badge variant="warning">Pending</Badge>;
  return <Badge variant="neutral">Not Submitted</Badge>;
}

/* ---------- KYC Card ---------- */

function KYCCard({ profile, onUploadClick, onViewDetails }) {
  const notSubmitted = profile.kycStatus === "Not Submitted";
  const pending = profile.kycStatus === "Pending";
  const rejected = profile.kycStatus === "Rejected";

  return (
    <Card>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold">KYC Status</h2>
          <p className="text-sm text-gray-500 mt-1">Document submission and verification status</p>

          <div className="mt-4 flex flex-wrap gap-6">
            <div>
              <div className="text-xs text-gray-400">Submission</div>
              <div className="mt-1 font-medium">{profile.documents.length ? "Documents Uploaded" : "No documents"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-400">Verification</div>
              <div className="mt-1 font-medium">{profile.kycStatus}</div>
            </div>

            {rejected && <div className="text-xs text-red-600 self-center">Rejection reason: Image blur / wrong PAN</div>}
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-3">
          {notSubmitted ? (
            <button
              onClick={onUploadClick}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Upload Documents
            </button>
          ) : (
            <>
              <button onClick={onViewDetails} className="px-4 py-2 border border-gray-200 rounded-lg">
                View Details
              </button>

              {(pending || rejected) && (
                <button
                  onClick={onUploadClick}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  Reupload
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ---------- Verification Timeline ---------- */

function VerificationTimeline({ status }) {
  const steps = [
    "Documents Uploaded",
    "Identity Validation",
    "OCR & Extraction",
    "Face Match",
    "Manual Review",
    "Completed"
  ];

  // map statuses to a completed index (tweak to match your backend process)
  const completedIndex = status === "Not Submitted" ? -1 : status === "Verified" ? steps.length - 1 : 2;

  return (
    <Card>
      <h3 className="text-lg font-semibold">Verification Timeline</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((s, i) => {
          const done = i <= completedIndex;
          const inProgress = i === completedIndex + 1;
          return (
            <div key={s} className="flex items-start gap-3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                aria-hidden
              >
                {done ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="text-sm">{i + 1}</span>
                )}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{s}</div>
                <div className="text-xs text-gray-400">{done ? "Done" : inProgress ? "In progress" : "Pending"}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* ---------- AML Card ---------- */

function AMLCard({ score = 0, category = "Unknown" }) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-50">
          <Donut percent={score} size={80} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold">AML Risk & Activity</h3>
          <div className="mt-2 text-sm text-gray-500">Risk Score</div>
          <div className="text-2xl font-semibold">{score}/100</div>
          <div className="text-xs text-gray-400 mt-1">Category: {category}</div>
          <div className="mt-3 text-xs text-gray-500">Recent flags: 2</div>
          <div className="mt-3 text-xs text-indigo-600">Recommended: Update Address Proof</div>
        </div>
      </div>
    </Card>
  );
}

/* ---------- Activities Table ---------- */

function ActivitiesTable({ activities = [] }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">Recent Compliance Activities</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-gray-400 uppercase">
            <tr>
              <th className="py-2 pr-6">Activity</th>
              <th className="py-2 pr-6">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {activities.map((a) => (
              <tr key={a.id}>
                <td className="py-3 pr-6">{a.activity}</td>
                <td className="py-3 pr-6">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      a.status === "Completed" ? "bg-green-100 text-green-700" : a.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="py-3 text-gray-500">{a.date}</td>
              </tr>
            ))}
            {activities.length === 0 && (
              <tr>
                <td className="py-6 text-center text-gray-400" colSpan="3">No recent activities</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ---------- Notifications ---------- */

function Notifications() {
  const notes = [
    { id: 1, text: "Your KYC was verified", tone: "success" },
    { id: 2, text: "Additional documents required", tone: "warn" },
    { id: 3, text: "High-risk transaction flagged", tone: "danger" }
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold">Notifications</h3>
      <ul className="mt-3 space-y-2">
        {notes.map((n) => (
          <li key={n.id} className="flex items-center justify-between">
            <div className="text-sm">{n.text}</div>
            <div
              className={`text-xs px-2 py-1 rounded ${
                n.tone === "success" ? "bg-green-100 text-green-700" : n.tone === "warn" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-700"
              }`}
            >
              {n.tone}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------- Document Locker ---------- */

function DocumentLocker({ documents = [], onUpload }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">Document Locker</h3>

      {documents.length ? (
        <div className="space-y-3">
          {documents.map((d, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-gray-400">{d.type}</div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border rounded">View</button>
                <button className="px-3 py-1 border rounded">Reupload</button>
              </div>
            </div>
          ))} 
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">No documents uploaded yet</p>
          <button onClick={onUpload} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300">
            Upload KYC Documents
          </button>
        </div>
      )}
    </Card>
  );
}

/* ---------- Compliance Score ---------- */

function ComplianceScore({ score = 75 }) {
  const identity = Math.round(score * 0.55);
  const validity = Math.round(score * 0.3);
  const fraud = Math.round(Math.max(0, 100 - Math.round(score * 0.15)));

  return (
    <Card>
      <h3 className="text-lg font-semibold">Compliance Score</h3>
      <div className="mt-4 flex items-center gap-4">
        <div className="w-20 h-20 flex items-center justify-center">
          <Donut percent={score} size={80} />
        </div>

        <div>
          <div className="text-sm text-gray-500">Overall</div>
          <div className="text-xl font-semibold">{score}/100</div>
          <div className="mt-3 text-xs text-gray-500">Identity: {identity} • Validity: {validity} • Fraud: {fraud}</div>
        </div>
      </div>
    </Card>
  );
}

/* ---------- Quick Actions ---------- */

function QuickActions({ onUpload }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="px-3 py-2 border rounded">Update Profile</button>
        <button onClick={onUpload} className="px-3 py-2 bg-indigo-600 text-white rounded">Upload New Document</button>
        <button className="px-3 py-2 border rounded">Download Report</button>
        <button className="px-3 py-2 border rounded">View AML Flags</button>
      </div>
    </Card>
  );
}

/* ---------- Support Card ---------- */

function SupportCard() {
  return (
    <Card>
      <h3 className="text-lg font-semibold">Support & Helpdesk</h3>
      <div className="mt-3 text-sm text-gray-500">Live chat, tickets, and help articles to resolve KYC or AML issues.</div>

      <div className="mt-4 flex gap-3">
        <button className="px-3 py-2 border rounded">Open Ticket</button>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded">Start Live Chat</button>
        <button className="px-3 py-2 border rounded">Help Articles</button>
      </div>
    </Card>
  );
}

/* ---------- Donut (SVG) ---------- */

function Donut({ percent = 65, size = 64 }) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const id = useId(); // unique id for gradient

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Progress ${percent} percent`}>
      <defs>
        <linearGradient id={`g1-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={radius} cx="0" cy="0" fill="none" stroke="#EEF2FF" strokeWidth={stroke} />
        <circle
          r={radius}
          cx="0"
          cy="0"
          fill="none"
          stroke={`url(#g1-${id})`}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90)"
        />
        <text x="0" y="6" textAnchor="middle" fontSize="12" fontWeight="600" fill="#111827">
          {percent}
        </text>
      </g>
    </svg>
  );
}
