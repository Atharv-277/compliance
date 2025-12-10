// src/pages/admin/AdminDashboard.jsx
// Self-contained Admin Dashboard (no external chart libraries).
// - Uses mock data
// - Single sticky right column with internal scrolling (smooth)
// - Tailwind classes (assumes Tailwind is configured)
// - Drop this file in place of your current AdminDashboard.jsx

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* ----------------------
   Mock data (replace with API calls)
   ---------------------- */
const mockData = {
  totals: {
    totalSubmissions: 1240,
    pending: 32,
    approved: 1080,
    rejected: 128,
    highRisk: 24,
    openAmlAlerts: 7,
  },
  submissionsOverTime: Array.from({ length: 30 }).map((_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    count: Math.floor(12 + Math.sin(i / 2) * 6 + Math.random() * 6),
  })),
  riskDistribution: [
    { name: "Low", value: 80, key: "low" },
    { name: "Medium", value: 40, key: "medium" },
    { name: "High", value: 24, key: "high" },
  ],
  topPendingCases: [
    { id: "KYC001", name: "Ravi Kumar", submittedAt: "18h ago", risk: 78 },
    { id: "KYC002", name: "Sarah Chen", submittedAt: "16h ago", risk: 45 },
    { id: "KYC003", name: "Alex Johnson", submittedAt: "19h ago", risk: 82 },
    { id: "KYC004", name: "Maria Garcia", submittedAt: "19h ago", risk: 22 },
    { id: "KYC005", name: "James Wilson", submittedAt: "1d ago", risk: 61 },
  ],
  recentCases: [
    { id: "KYC001", name: "Ravi Kumar", time: "Dec 9, 03:30 PM", risk: 78 },
    { id: "KYC002", name: "Sarah Chen", time: "Dec 9, 05:00 PM", risk: 45 },
    { id: "KYC003", name: "Alex Johnson", time: "Dec 9, 02:45 PM", risk: 82 },
    { id: "KYC004", name: "Maria Garcia", time: "Dec 9, 02:15 PM", risk: 22 },
    { id: "KYC005", name: "James Wilson", time: "Dec 8, 09:50 PM", risk: 61 },
    { id: "KYC006", name: "Priya Sharma", time: "Dec 8, 07:30 PM", risk: 88 },
    { id: "KYC007", name: "David Lee", time: "Dec 8, 06:00 PM", risk: 35 },
    { id: "KYC008", name: "Emma Brown", time: "Dec 8, 03:45 PM", risk: 71 },
  ],
  topAlerts: [
    { id: "AML001", severity: "high", related: 3 },
    { id: "AML002", severity: "medium", related: 1 },
    { id: "AML003", severity: "high", related: 5 },
    { id: "AML004", severity: "low", related: 2 },
  ],
  recentAudits: [
    { admin: "Alice", action: "Approved", target: "KYC001", time: "Dec 9, 05:30 PM", reason: "Documents verified" },
    { admin: "Bob", action: "Rejected", target: "KYC002", time: "Dec 9, 05:00 PM", reason: "Failed face match" },
    { admin: "Charlie", action: "Reviewed", target: "KYC003", time: "Dec 9, 04:30 PM", reason: "" },
    { admin: "Diana", action: "Flagged", target: "KYC004", time: "Dec 9, 03:45 PM", reason: "High risk score" },
    { admin: "Alice", action: "Approved", target: "KYC005", time: "Dec 9, 03:15 PM", reason: "" },
  ],
};

/* ----------------------
   Helpers for small inline SVG charts (no libs)
   ---------------------- */

function LineSpark({ data = [], width = 560, height = 260, stroke = "#2563eb" }) {
  if (!data || data.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No data</div>;
  }

  const counts = data.map((d) => d.count);
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  const pad = 8;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const points = counts
    .map((v, i) => {
      const x = pad + (innerW * i) / (counts.length - 1);
      const y = pad + innerH - ((v - min) / (max - min || 1)) * innerH;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <rect x="0" y="0" width={width} height={height} rx="8" fill="transparent" />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* optional dots */}
      {counts.map((v, i) => {
        const x = pad + (innerW * i) / (counts.length - 1);
        const y = pad + innerH - ((v - min) / (max - min || 1)) * innerH;
        return <circle key={i} cx={x} cy={y} r="1.6" fill={stroke} />;
      })}
    </svg>
  );
}

function Donut({ slices = [], size = 200, inner = 60 }) {
  // slices: [{ value, color }]
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  let angle = 0;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;
  const ring = [];

  slices.forEach((s, idx) => {
    const sliceAngle = (s.value / total) * 360;
    const startAngle = angle;
    const endAngle = angle + sliceAngle;
    const large = sliceAngle > 180 ? 1 : 0;

    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);

    const d = [
      `M ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`,
      `L ${cx} ${cy}`,
      "Z",
    ].join(" ");

    ring.push(
      <path key={idx} d={d} fill={s.color} stroke="none" opacity="1" />
    );

    angle += sliceAngle;
  });

  // white hole
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      {ring}
      <circle cx={cx} cy={cy} r={inner} fill="#ffffff" />
    </svg>
  );
}
function polarToCartesian(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/* ----------------------
   Small presentational subcomponents
   ---------------------- */
function StatCard({ title, value }) {
  return (
    <div className="p-4 rounded-xl shadow-sm border bg-white cursor-pointer hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function RiskBadge({ risk }) {
  const cls =
    risk >= 75 ? "bg-red-100 text-red-700" : risk >= 50 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700";
  return <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${cls}`}>Risk: {risk}</span>;
}

function RecentCaseItem({ item, onReview }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg border p-3 mb-3">
      <div>
        <div className="text-sm font-medium">{item.id} • {item.name}</div>
        <div className="text-xs text-gray-500">{item.time}</div>
      </div>
      <div className="flex items-center gap-3">
        <RiskBadge risk={item.risk} />
        <button onClick={() => onReview(item)} className="px-3 py-1 rounded-md border text-sm hover:bg-gray-50">Review</button>
      </div>
    </div>
  );
}

function AlertItem({ alert, onView }) {
  const cls = alert.severity === "high" ? "text-red-600" : alert.severity === "medium" ? "text-amber-600" : "text-green-600";
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border mb-3">
      <div>
        <div className="text-sm font-medium">{alert.id}</div>
        <div className="text-xs text-gray-500">{alert.related} related</div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-2 py-1 rounded text-sm font-medium ${cls}`}>{alert.severity}</span>
        <button onClick={() => onView(alert)} className="px-3 py-1 rounded-md border text-sm">View</button>
      </div>
    </div>
  );
}

/* ----------------------
   Main component
   ---------------------- */
export default function AdminDashboard() {
  const navigate = useNavigate ? useNavigate() : null;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Replace with real API call
    const fetchData = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 200));
      setData(mockData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const submissions = useMemo(() => data?.submissionsOverTime || [], [data]);
  const riskDist = useMemo(() => data?.riskDistribution || [], [data]);
  const recentCases = useMemo(() => {
    if (!data) return [];
    if (filter === "all") return data.recentCases;
    if (filter === "pending") return data.recentCases.filter((c) => c.risk >= 50);
    if (filter === "high") return data.recentCases.filter((c) => c.risk >= 75);
    if (filter === "today") return data.recentCases.slice(0, 5);
    return data.recentCases;
  }, [data, filter]);

  const onReview = (item) => { if (navigate) navigate(`/admin/kyc/${item.id}`); };
  const onViewAlert = (alert) => { if (navigate) navigate(`/admin/aml/${alert.id}`); };

  if (loading || !data) {
    return (
      <div className="p-6">
        <div className="text-2xl font-bold mb-4">Admin Dashboard</div>
        <div className="space-y-4">
          <div className="h-12 rounded-lg bg-gray-100 w-1/3" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 rounded-lg bg-gray-100" />
            <div className="h-24 rounded-lg bg-gray-100" />
            <div className="h-24 rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  /* Prepare donut colors */
  const donut = [
    { value: riskDist[0]?.value || 0, color: "#10b981" }, // low
    { value: riskDist[1]?.value || 0, color: "#f59e0b" }, // medium
    { value: riskDist[2]?.value || 0, color: "#ef4444" }, // high
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4 w-1/3">
          <input type="search" placeholder="Search by name / case id" className="flex-1 border rounded-lg px-4 py-2 shadow-sm" />
          <div className="p-2 rounded-full border">⚙️</div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">AD</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <StatCard title="Total Submissions" value={data.totals.totalSubmissions} />
        <StatCard title="Pending" value={data.totals.pending} />
        <StatCard title="Approved" value={data.totals.approved} />
        <StatCard title="Rejected" value={data.totals.rejected} />
        <StatCard title="High Risk" value={data.totals.highRisk} />
        <StatCard title="Open AML Alerts" value={data.totals.openAmlAlerts} />
      </div>

      {/* Main area */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left column */}
        <div className="col-span-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border p-4 shadow-sm">
              <div className="mb-3 font-semibold">Submissions (Last 30 Days)</div>
              <div style={{ height: 260 }}>
                <LineSpark data={submissions} />
              </div>
            </div>

            <div className="bg-white rounded-xl border p-4 shadow-sm flex flex-col">
              <div className="mb-3 font-semibold">Risk Distribution</div>
              <div className="flex-1 flex items-center justify-center" style={{ height: 220 }}>
                <div style={{ width: 220, height: 220 }}>
                  <Donut slices={donut} size={220} inner={60} />
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-6 text-sm text-gray-600">
                {riskDist.map((r) => {
                  const color = r.key === "low" ? "#10b981" : r.key === "medium" ? "#f59e0b" : "#ef4444";
                  return (
                    <div key={r.name} className="flex items-center gap-2">
                      <span style={{ width: 10, height: 10, borderRadius: 5, background: color }} />
                      <span>{r.name}: {r.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">Recent Cases</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded-md ${filter === "all" ? "bg-blue-600 text-white" : "border"}`}>All</button>
                <button onClick={() => setFilter("pending")} className={`px-3 py-1 rounded-md ${filter === "pending" ? "bg-blue-600 text-white" : "border"}`}>Pending</button>
                <button onClick={() => setFilter("high")} className={`px-3 py-1 rounded-md ${filter === "high" ? "bg-blue-600 text-white" : "border"}`}>High-Risk</button>
                <button onClick={() => setFilter("today")} className={`px-3 py-1 rounded-md ${filter === "today" ? "bg-blue-600 text-white" : "border"}`}>Today</button>
              </div>
            </div>

            <div>
              {recentCases.map((c) => <RecentCaseItem key={c.id} item={c} onReview={onReview} />)}
            </div>
          </div>
        </div>

        {/* Right column: single sticky container with internal scroll */}
        <div className="col-span-4">
          <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-2 space-y-6 scroll-smooth" style={{ WebkitOverflowScrolling: "touch" }}>
            <div className="bg-white rounded-xl border p-4 shadow-sm">
              <div className="font-semibold mb-3">Top 5 Pending KYC</div>
              <div>
                {data.topPendingCases.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg mb-3">
                    <div>
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.submittedAt}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${p.risk >= 75 ? "bg-red-100 text-red-700" : p.risk >= 50 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{p.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <Link to="/admin/kyc" className="block text-center px-3 py-2 border rounded-md">View All</Link>
              </div>
            </div>

            <div className="bg-white rounded-xl border p-4 shadow-sm">
              <div className="font-semibold mb-3">Top AML Alerts</div>
              <div>
                {data.topAlerts.map((a) => <AlertItem key={a.id} alert={a} onView={onViewAlert} />)}
              </div>
              <div className="mt-2">
                <Link to="/admin/aml" className="block text-center px-3 py-2 border rounded-md">View All</Link>
              </div>
            </div>

            <div className="bg-white rounded-xl border p-4 shadow-sm">
              <div className="font-semibold mb-3">Quick Actions</div>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 border rounded-md">Refresh Data</button>
                <button className="w-full text-left px-3 py-2 border rounded-md">Export CSV</button>
                <button className="w-full text-left px-3 py-2 border rounded-md">Create Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit log */}
      <div className="mt-8 bg-white rounded-xl border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Recent Audit Log</div>
          <button className="px-3 py-1 border rounded-md">Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500">
                <th className="py-2 pr-6">Admin</th>
                <th className="py-2 pr-6">Action</th>
                <th className="py-2 pr-6">Target</th>
                <th className="py-2 pr-6">Time</th>
                <th className="py-2 pr-6">Reason</th>
              </tr>
            </thead>
            <tbody>
              {data.recentAudits.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="py-3">{r.admin}</td>
                  <td className="py-3"><span className="px-2 py-1 text-sm bg-gray-100 rounded">{r.action}</span></td>
                  <td className="py-3">{r.target}</td>
                  <td className="py-3">{r.time}</td>
                  <td className="py-3 text-gray-500">{r.reason || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
