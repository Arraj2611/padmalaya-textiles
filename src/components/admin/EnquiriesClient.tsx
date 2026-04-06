"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateEnquiryStatus } from "@/app/actions/enquiries";
import type { Enquiry } from "@/lib/supabase-types";

type Status = Enquiry["status"];

const STATUSES: Status[] = ["new", "contacted", "quoted", "closed"];

const statusColors: Record<Status, { bg: string; color: string }> = {
  new:       { bg: "rgba(184,149,92,.15)", color: "#7a5f32" },
  contacted: { bg: "rgba(45,74,66,.1)",   color: "#2d4a42" },
  quoted:    { bg: "rgba(30,77,63,.1)",   color: "#1e4d3f" },
  closed:    { bg: "#f3f4f6",            color: "#9ca3af" },
};

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: "24px 28px",
  boxShadow: "0 2px 12px rgba(13,40,31,.06)",
};

interface Props {
  enquiries: Enquiry[];
  total:     number;
  status:    string;
  page:      number;
}

export default function EnquiriesClient({ enquiries, total, status, page }: Props) {
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);
  const pageSize = 20;
  const totalPages = Math.ceil(total / pageSize);

  function setStatus(s: string) {
    router.push(`/admin/enquiries?status=${s}&page=1`);
  }

  function setPage(p: number) {
    router.push(`/admin/enquiries?status=${status}&page=${p}`);
  }

  async function handleStatusChange(id: string, newStatus: Status) {
    setUpdating(id);
    await updateEnquiryStatus(id, newStatus);
    router.refresh();
    setUpdating(null);
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 26, color: "#14221e", margin: 0 }}>Enquiries</h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{total} total</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            style={{
              padding: "7px 18px",
              borderRadius: 50,
              border: "none",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              background: status === s ? "#0d281f" : "#f0f2f1",
              color:      status === s ? "#fff"    : "#6b7280",
              textTransform: "capitalize",
              transition: "all 0.15s",
            }}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      <div style={card}>
        {enquiries.length === 0 ? (
          <p style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", padding: "40px 0" }}>
            No enquiries found.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                {["Name", "Email", "Product", "Date", "Status", ""].map((h, i) => (
                  <th key={i} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} style={{ borderBottom: "1px solid #f9f9f9" }}>
                  <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: "#14221e" }}>
                    <a href={`/admin/enquiries/${e.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {e.name}
                    </a>
                  </td>
                  <td style={{ padding: "12px 12px", fontSize: 12, color: "#6b7280" }}>{e.email}</td>
                  <td style={{ padding: "12px 12px", fontSize: 12, color: "#2d4a42" }}>{e.selected_products?.join(", ") || "—"}</td>
                  <td style={{ padding: "12px 12px", fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>
                    {new Date(e.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })}
                  </td>
                  <td style={{ padding: "12px 12px" }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                      ...statusColors[e.status],
                      padding: "3px 10px", borderRadius: 20, textTransform: "uppercase",
                    }}>
                      {e.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 12px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <a href={`/admin/enquiries/${e.id}`} style={{ fontSize: 11, fontWeight: 600, color: "#1e4d3f", textDecoration: "none", padding: "4px 10px", background: "#EEF3F1", borderRadius: 6 }}>
                        View
                      </a>
                      <select
                        value={e.status}
                        disabled={updating === e.id}
                        onChange={(ev) => handleStatusChange(e.id, ev.target.value as Status)}
                        style={{ fontSize: 11, borderRadius: 6, border: "1px solid #e5e7eb", padding: "4px 8px", color: "#6b7280", cursor: "pointer", background: "#fff" }}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", paddingTop: 20 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  width: 32, height: 32, borderRadius: 8, border: "none",
                  fontSize: 13, fontWeight: p === page ? 700 : 400,
                  background: p === page ? "#0d281f" : "#f0f2f1",
                  color:      p === page ? "#fff"    : "#6b7280",
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
