"use client";

import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

interface EnquiryRow {
  id: string;
  name: string;
  email: string;
  product_interest: string;
  status: string;
  created_at: string;
}

interface Props {
  totalEnquiries:    number;
  newEnquiries:      number;
  totalProducts:     number;
  recentEnquiries:   EnquiryRow[];
  enquiriesOverTime: { created_at: string; product_interest: string }[];
}

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: "24px 28px",
  boxShadow: "0 2px 12px rgba(13,40,31,.06)",
};

const statusColors: Record<string, string> = {
  new:        "#b8955c",
  read:       "#2d4a42",
  responded:  "#1e4d3f",
  archived:   "#9ca3af",
};

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div style={card}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#9ca3af", marginBottom: 8, textTransform: "uppercase" }}>
        {label}
      </p>
      <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 36, fontWeight: 700, color: "#14221e", margin: 0 }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{sub}</p>}
    </div>
  );
}

function buildChartData(rows: { created_at: string }[]) {
  const counts: Record<string, number> = {};
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    counts[d.toISOString().slice(0, 10)] = 0;
  }
  for (const row of rows) {
    const day = row.created_at.slice(0, 10);
    if (day in counts) counts[day]++;
  }
  return Object.entries(counts).map(([date, count]) => ({ date: date.slice(5), count }));
}

function buildBarData(rows: { product_interest: string }[]) {
  const counts: Record<string, number> = {};
  for (const row of rows) {
    const p = row.product_interest ?? "Other";
    counts[p] = (counts[p] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([product, count]) => ({ product: product.split(" ").slice(0, 2).join(" "), count }));
}

export default function AdminDashboardClient({
  totalEnquiries, newEnquiries, totalProducts, recentEnquiries, enquiriesOverTime,
}: Props) {
  const lineData = buildChartData(enquiriesOverTime);
  const barData  = buildBarData(enquiriesOverTime);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 26, color: "#14221e", margin: 0 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>Overview · Padmalaya Textiles</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard label="Total enquiries" value={totalEnquiries} />
        <StatCard label="New (unread)"    value={newEnquiries}   sub="Awaiting response" />
        <StatCard label="Products"        value={totalProducts}  />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={card}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#14221e", marginBottom: 16 }}>Enquiries — last 30 days</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={6} />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#1e4d3f" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={card}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#14221e", marginBottom: 16 }}>By product</p>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} allowDecimals={false} />
                <YAxis type="category" dataKey="product" tick={{ fontSize: 10 }} width={90} />
                <Tooltip />
                <Bar dataKey="count" fill="#b8955c" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", paddingTop: 60 }}>No data yet</p>
          )}
        </div>
      </div>

      {/* Recent enquiries */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#14221e", margin: 0 }}>Recent enquiries</p>
          <a href="/admin/enquiries" style={{ fontSize: 12, color: "#1e4d3f", fontWeight: 600, textDecoration: "none" }}>View all →</a>
        </div>

        {recentEnquiries.length === 0 ? (
          <p style={{ fontSize: 13, color: "#9ca3af" }}>No enquiries yet</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                {["Name", "Email", "Product", "Status", "Date"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((e) => (
                <tr key={e.id} style={{ borderBottom: "1px solid #f9f9f9" }}>
                  <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, color: "#14221e" }}>{e.name}</td>
                  <td style={{ padding: "10px 12px", fontSize: 13, color: "#6b7280" }}>{e.email}</td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: "#2d4a42" }}>{e.product_interest}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: statusColors[e.status] ?? "#9ca3af", textTransform: "uppercase", background: "rgba(0,0,0,.04)", padding: "3px 8px", borderRadius: 20 }}>
                      {e.status}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", fontSize: 12, color: "#9ca3af" }}>
                    {new Date(e.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
