import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

/*
  KycDetail.jsx
  - Handles both client-side preview (location.state.draft) and server-backed detail by :id
  - Keep your mockFetchKyc for local testing; replace with real API calls when ready.
*/

export default function KycDetail({ kycId = "mock-kyc-123", isAdmin = false }) {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const resolvedId = params.id || kycId;

  const [loading, setLoading] = useState(true);
  const [kyc, setKyc] = useState(null);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [viewerSrc, setViewerSrc] = useState(null); // simple image viewer modal

  // ---------- Mock fetch - replace with real API ----------
  async function mockFetchKyc(id) {
    await new Promise((r) => setTimeout(r, 300));
    return {
      id,
      userName: "Aman Sharma",
      submittedAt: "2025-12-08T11:24:00.000Z",
      status: "Pending", // Pending | Verified | Rejected
      updatedAt: "2025-12-08T11:24:00.000Z",
      documents: {
        frontUrl: "/assets/id-front-sample.jpg",
        backUrl: "/assets/id-back-sample.jpg",
        selfieUrl: "/assets/selfie-sample.jpg",
      },
      extracted: {
        name: "AMAN SHARMA",
        dob: "1995-05-23",
        idNumber: "ABCDE1234F",
        address: "Flat 12, Silver Apartments, Pune",
        rawOcrText:
          "AMAN SHARMA\nDOB: 23/05/1995\nID: ABCDE1234F\nADDRESS: Flat 12, Silver Apartments, Pune\n...",
      },
      faceMatch: { score: 0.92, verdict: "Match" },
      riskScore: 28,
      adminComment: "",
      history: [
        { ts: "2025-12-08T11:24:00Z", by: "user", note: "Uploaded documents" },
      ],
    };
  }
  // --------------------------------------------------------

  useEffect(() => {
    // If draft is present in location.state, use it (client-side preview)
    const draft = location.state?.draft;
    if (draft) {
      console.log("[KycDetail] using client-side draft", draft);
      setKyc({
        id: "local-draft",
        userName: draft.userName || "You",
        submittedAt: draft.meta?.createdAt || new Date().toISOString(),
        status: draft.status || "Draft",
        updatedAt: new Date().toISOString(),
        documents: {
          frontUrl: draft.documents.frontUrl,
          backUrl: draft.documents.backUrl,
          selfieUrl: draft.documents.selfieUrl,
        },
        extracted: draft.extracted || { name: "", dob: "", idNumber: "", address: "", rawOcrText: "" },
        faceMatch: { score: 0, verdict: "Not run" },
        riskScore: 0,
        adminComment: "",
        history: [{ ts: new Date().toISOString(), by: "user", note: "Preview (local draft)" }],
      });
      setLoading(false);
      return;
    }

    // Otherwise fetch from server (or mock)
    setLoading(true);
    setError("");
    mockFetchKyc(resolvedId)
      .then((data) => {
        setKyc(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load KYC details.");
        setLoading(false);
      });
  }, [location.state, resolvedId]);

  const formatDate = (s) => {
    try {
      return new Date(s).toLocaleString();
    } catch {
      return s;
    }
  };

  async function handleApprove() {
    if (!window.confirm("Approve this KYC?")) return;
    setActionLoading(true);
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 400));
    setKyc((p) => ({
      ...p,
      status: "Verified",
      adminComment: "",
      history: [
        ...p.history,
        { ts: new Date().toISOString(), by: "admin", note: "Approved" },
      ],
      updatedAt: new Date().toISOString(),
    }));
    setActionLoading(false);
  }

  async function handleReject() {
    if (!rejectReason.trim()) {
      alert("Enter a rejection reason.");
      return;
    }
    if (!window.confirm("Reject this KYC with the provided reason?")) return;
    setActionLoading(true);
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 400));
    setKyc((p) => ({
      ...p,
      status: "Rejected",
      adminComment: rejectReason,
      history: [
        ...p.history,
        { ts: new Date().toISOString(), by: "admin", note: `Rejected: ${rejectReason}` },
      ],
      updatedAt: new Date().toISOString(),
    }));
    setShowRejectBox(false);
    setRejectReason("");
    setActionLoading(false);
  }

  function handleResubmit() {
    // navigate to upload route in your app (we use the route /user/kyc/new)
    if (!window.confirm("Open KYC upload to resubmit documents?")) return;
    navigate("/user/kyc/new");
  }

  function openViewer(src) {
    setViewerSrc(src);
    document.body.style.overflow = "hidden";
  }
  function closeViewer() {
    setViewerSrc(null);
    document.body.style.overflow = "";
  }

  if (loading)
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-72 bg-gray-200 rounded" />
          <div className="h-6 w-40 bg-gray-200 rounded" />
          <div className="h-80 bg-gray-100 rounded" />
        </div>
      </div>
    );

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-800">{kyc.userName}</h1>
          <p className="mt-1 text-slate-500">
            KYC ID: {kyc.id} • Submitted: {formatDate(kyc.submittedAt)}
          </p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT: scrollable main column */}
          <main className="col-span-12 lg:col-span-8">
            <div className="h-[calc(100vh-6rem)] overflow-auto pr-4">
              {/* Documents */}
              <section className="rounded-xl shadow-sm p-6 mb-6 border-l-4 border-sky-500 bg-white/95 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-medium text-slate-800">Uploaded documents</h2>
                    <p className="text-sm text-slate-500 mt-1">Click an image to view full size</p>
                  </div>
                  <div className="text-sm text-gray-500">Status: {kyc.status}</div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <DocThumb title="ID - Front" src={kyc.documents.frontUrl} onView={openViewer} />
                  <DocThumb title="ID - Back" src={kyc.documents.backUrl} onView={openViewer} />
                  <DocThumb title="Selfie" src={kyc.documents.selfieUrl} onView={openViewer} />
                </div>
              </section>

              {/* Extracted fields */}
              <section className="rounded-xl shadow-sm p-6 mb-6 border-l-4 border-emerald-400 bg-white/95 backdrop-blur-sm">
                <h2 className="text-xl font-medium text-slate-800 mb-3">Extracted fields</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name" value={kyc.extracted.name} />
                  <Field label="Date of birth" value={kyc.extracted.dob} />
                  <Field label="ID number" value={kyc.extracted.idNumber} />
                  <Field label="Address" value={kyc.extracted.address} />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Raw OCR text</label>
                  <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded text-sm text-gray-700 border">{kyc.extracted.rawOcrText}</pre>
                </div>
              </section>

              {/* Biometric & risk */}
              <section className="rounded-xl shadow-sm p-6 mb-6 border-l-4 border-yellow-400 bg-white/95 backdrop-blur-sm">
                <h2 className="text-xl font-medium text-slate-800 mb-3">Biometric & risk</h2>

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Face match score</div>
                    <div className="text-2xl font-semibold">{Math.round(kyc.faceMatch.score * 100)}%</div>
                    <div className="text-sm text-gray-500 mt-1">{kyc.faceMatch.verdict}</div>
                  </div>

                  <div className="flex-1">
                    <div className="text-sm text-gray-500">Risk score</div>
                    <div className="text-2xl font-semibold">{kyc.riskScore}/100</div>
                    <div className="w-full h-3 bg-gray-200 rounded mt-2 overflow-hidden">
                      <div
                        style={{ width: `${kyc.riskScore}%` }}
                        className={`h-full ${kyc.riskScore > 60 ? "bg-red-500" : kyc.riskScore > 30 ? "bg-yellow-400" : "bg-green-500"}`}
                      />
                    </div>
                  </div>
                </div>

                {kyc.adminComment && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-slate-700">Admin comment</div>
                    <div className="mt-2 text-sm text-gray-800 bg-gray-50 p-3 rounded">{kyc.adminComment}</div>
                  </div>
                )}
              </section>

              {/* History */}
              <section className="rounded-xl shadow-sm p-6 mb-6 border-l-4 border-sky-600 bg-white/95 backdrop-blur-sm">
                <h2 className="text-xl font-medium text-slate-800 mb-3">History</h2>
                <ul className="space-y-3">
                  {kyc.history.map((h, i) => (
                    <li key={i} className="text-sm">
                      <div className="text-gray-700">{formatDate(h.ts)} — <span className="font-medium">{h.by}</span></div>
                      <div className="text-gray-500">{h.note}</div>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="flex items-center justify-between mt-4 mb-8">
                <button
                  type="button"
                  onClick={() => alert("Download audit log (placeholder)")}
                  className="px-4 py-2 rounded-md border bg-white text-slate-700 hover:bg-slate-50"
                >
                  Download audit
                </button>

                {kyc.status !== "Verified" && !isAdmin ? (
                  <button type="button" onClick={handleResubmit} className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-600 to-teal-500 text-white shadow">
                    Resubmit documents
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </main>

          {/* RIGHT: sticky summary / admin controls */}
          <aside className="hidden lg:block col-span-12 lg:col-span-4">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-xl shadow-sm p-6 border border-slate-100 bg-gradient-to-tr from-white to-sky-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg text-slate-800">Summary</h3>
                    <div className="text-sm text-gray-600 mt-1">Quick glance of extracted info</div>
                  </div>
                  <div className={`text-sm px-2 py-1 rounded-full ${kyc.status === "Verified" ? "bg-green-100 text-green-800" : kyc.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {kyc.status}
                  </div>
                </div>

                <div className="mt-4 text-sm text-slate-700 space-y-2">
                  <div><span className="font-medium">Name:</span> {kyc.extracted.name}</div>
                  <div><span className="font-medium">DOB:</span> {kyc.extracted.dob}</div>
                  <div><span className="font-medium">ID:</span> {kyc.extracted.idNumber}</div>
                  <div><span className="font-medium">Risk:</span> {kyc.riskScore}/100</div>
                </div>

                <div className="mt-4 flex gap-2">
                  <a href={kyc.documents.frontUrl} target="_blank" rel="noreferrer" className="flex-1 px-3 py-2 rounded border text-sm inline-flex items-center justify-center">
                    Download docs
                  </a>
                  {!isAdmin && kyc.status !== "Verified" && (
                    <button onClick={handleResubmit} className="px-3 py-2 rounded bg-indigo-600 text-white text-sm">Resubmit</button>
                  )}
                </div>
              </div>

              <div className="rounded-xl shadow-sm p-6 border border-slate-100 bg-gradient-to-tr from-white to-emerald-50">
                <h4 className="font-medium text-lg text-slate-800 mb-3">Verification</h4>

                <div className="text-sm text-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Face match</div>
                      <div className="font-medium">{Math.round(kyc.faceMatch.score * 100)}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Risk</div>
                      <div className="font-medium">{kyc.riskScore}</div>
                    </div>
                  </div>
                </div>

                {isAdmin ? (
                  <div className="mt-4 space-y-2">
                    <button disabled={actionLoading} onClick={handleApprove} className="w-full px-3 py-2 rounded bg-green-600 text-white text-sm">
                      {actionLoading ? "Processing..." : "Approve"}
                    </button>

                    {!showRejectBox ? (
                      <button disabled={actionLoading} onClick={() => setShowRejectBox(true)} className="w-full px-3 py-2 rounded border text-sm">
                        Reject
                      </button>
                    ) : (
                      <>
                        <textarea
                          rows="3"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Enter rejection reason (shown to user)"
                          className="w-full mt-2 p-2 border rounded text-sm"
                        />
                        <div className="flex gap-2">
                          <button disabled={actionLoading} onClick={handleReject} className="flex-1 px-3 py-2 rounded bg-red-600 text-white text-sm">
                            {actionLoading ? "Rejecting..." : "Confirm reject"}
                          </button>
                          <button disabled={actionLoading} onClick={() => { setShowRejectBox(false); setRejectReason(""); }} className="px-3 py-2 rounded border text-sm">
                            Cancel
                          </button>
                        </div>
                      </>
                    )}

                    <button onClick={() => alert("Trigger OCR re-run (placeholder)")} className="w-full px-3 py-2 rounded border text-sm">
                      Re-run OCR
                    </button>

                    <button onClick={() => alert("Flag for AML (placeholder)")} className="w-full px-3 py-2 rounded border text-sm">
                      Flag for AML
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 text-sm text-gray-500">
                    This is your submitted information. If rejected, update documents and resubmit.
                  </div>
                )}
              </div>

              <div className="rounded-xl shadow-sm p-4 text-sm text-gray-600 bg-white">
                <div className="font-medium mb-1">Notes</div>
                <div>{kyc.adminComment || "No admin comments yet."}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* simple image viewer modal */}
      {viewerSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={closeViewer}>
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-2 border-b">
              <div className="text-sm font-medium">Document preview</div>
              <button onClick={closeViewer} className="px-3 py-1 rounded border text-sm">Close</button>
            </div>
            <div className="p-4 flex items-center justify-center">
              <img src={viewerSrc} alt="preview" className="max-h-[80vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* small helper components */

function DocThumb({ title, src, onView }) {
  return (
    <div className="border rounded overflow-hidden bg-white">
      <div className="p-2 bg-gray-50 border-b text-sm font-medium">{title}</div>
      <div className="h-40 flex items-center justify-center bg-gray-100 cursor-pointer" onClick={() => src && onView(src)}>
        {src ? (
          <img src={src} alt={title} className="max-h-full object-contain" />
        ) : (
          <div className="text-gray-400">No file</div>
        )}
      </div>
      <div className="p-2 flex gap-2">
        <a href={src || "#"} target="_blank" rel="noreferrer" className="flex-1 text-xs text-center py-1 border rounded">
          Open
        </a>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-gray-800 font-medium">{value || <span className="text-gray-400">—</span>}</div>
    </div>
  );
}
