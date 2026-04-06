"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateEnquiryStatus } from "@/app/actions/enquiries";
import type { Enquiry } from "@/lib/supabase-types";

type Status = Enquiry["status"];

const statusColors: Record<Status, { bg: string; color: string }> = {
  new:       { bg: "rgba(184,149,92,.15)", color: "#7a5f32" },
  contacted: { bg: "rgba(45,74,66,.1)",   color: "#2d4a42" },
  quoted:    { bg: "rgba(30,77,63,.1)",   color: "#1e4d3f" },
  closed:    { bg: "#f3f4f6",            color: "#9ca3af" },
};

const STATUSES: Status[] = ["new", "contacted", "quoted", "closed"];

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: "28px 32px",
  boxShadow: "0 2px 12px rgba(13,40,31,.06)",
  marginBottom: 16,
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 12, alignItems: "flex-start" }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", width: 120, flexShrink: 0, paddingTop: 2, letterSpacing: 0.5, textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ fontSize: 14, color: "#14221e" }}>{value}</span>
    </div>
  );
}

export default function EnquiryDetailClient({ enquiry }: { enquiry: Enquiry }) {
  const router = useRouter();
  const [status, setStatusState] = useState<Status>(enquiry.status);
  const [updating, setUpdating] = useState(false);

  async function handleStatusChange(s: Status) {
    setUpdating(true);
    setStatusState(s);
    await updateEnquiryStatus(enquiry.id, s);
    router.refresh();
    setUpdating(false);
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <a href="/admin/enquiries" style={{ fontSize: 12, color: "#6b7280", textDecoration: "none" }}>← Enquiries</a>
          <h1 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 24, color: "#14221e", margin: "8px 0 0" }}>
            Enquiry from {enquiry.name}
          </h1>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
          ...statusColors[status],
          padding: "6px 14px", borderRadius: 20,
        }}>
          {status}
        </span>
      </div>

      {/* Contact details */}
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#9ca3af", marginBottom: 16, textTransform: "uppercase" }}>Contact</p>
        <Row label="Name"    value={enquiry.name} />
        <Row label="Email"   value={enquiry.email} />
        {enquiry.company && <Row label="Company" value={enquiry.company} />}
        {enquiry.clerk_user_id && <Row label="Clerk ID" value={enquiry.clerk_user_id} />}
        <Row label="Products" value={enquiry.selected_products?.join(", ") || "—"} />
        <Row label="Date"    value={new Date(enquiry.created_at).toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" })} />
      </div>

      {/* Message */}
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#9ca3af", marginBottom: 12, textTransform: "uppercase" }}>Message</p>
        <p style={{ fontSize: 14, color: "#14221e", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{enquiry.message}</p>
      </div>

      {/* Actions */}
      <div style={card}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#9ca3af", marginBottom: 16, textTransform: "uppercase" }}>Update status</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              disabled={updating || status === s}
              style={{
                padding: "9px 20px", borderRadius: 50, border: "none",
                fontSize: 12, fontWeight: 700, cursor: status === s ? "default" : "pointer",
                background: status === s ? "#0d281f" : "#f0f2f1",
                color:      status === s ? "#fff"    : "#6b7280",
                textTransform: "capitalize",
                opacity: updating ? 0.6 : 1,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <a
            href={`mailto:${enquiry.email}?subject=Re: Enquiry about ${encodeURIComponent(enquiry.selected_products?.join(", ") || "your enquiry")}`}
            style={{
              display: "inline-block", padding: "12px 28px",
              background: "#1e4d3f", color: "#fff",
              borderRadius: 50, fontWeight: 700, fontSize: 13, textDecoration: "none",
            }}
          >
            Reply via email
          </a>
        </div>
      </div>
    </div>
  );
}
