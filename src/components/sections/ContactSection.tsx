"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitEnquiry } from "@/app/actions/enquiry";
import { useQuote } from "@/context/QuoteContext";
import { capture } from "@/lib/analytics";

// ClerkUserReader is only mounted when real Clerk keys are present.
// Using next/dynamic so the @clerk/nextjs import stays out of the bundle
// when Clerk is not configured.
const hasClerkKeys =
  typeof process !== "undefined" &&
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

const ClerkUserReader = hasClerkKeys
  ? dynamic(() => import("@/components/ui/ClerkUserReader"), { ssr: false })
  : null;

const schema = z.object({
  name:    z.string().min(2, "At least 2 characters"),
  email:   z.email("Invalid email"),
  company: z.string().optional(),
  message: z.string().min(10, "At least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const glass16: React.CSSProperties = {
  background: "rgba(255,255,255,0.42)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.58)",
};

const neuIn = "inset 4px 4px 10px rgba(13,40,31,.07), inset -3px -3px 8px rgba(255,255,255,.75)";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid rgba(36,61,54,.14)",
  background: "#F5F8F7",
  boxShadow: "inset 3px 3px 8px rgba(13,40,31,.06), inset -2px -2px 6px rgba(255,255,255,.7)",
  fontSize: 14,
  color: "#14221e",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const errorStyle: React.CSSProperties = { fontSize: 11, color: "#c0392b", marginTop: 4, display: "block" };

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 1,
  color: "#2d4a42",
  marginBottom: 6,
  textTransform: "uppercase" as const,
};

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [clerkUser, setClerkUser] = useState<{ name: string; email: string } | null>(null);
  const { items, removeFromQuote } = useQuote();

  const handleClerkUser = useCallback((name: string, email: string) => {
    setClerkUser(name || email ? { name, email } : null);
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setStatus("sending");
    try {
      const productNames = items.map((i) => i.productName).join(", ");
      const enrichedMessage = items.length > 0
        ? `Selected products: ${productNames}\n\n${data.message}`
        : data.message;

      // When signed in via Clerk, use the autofilled identity
      const name  = clerkUser?.name  || data.name;
      const email = clerkUser?.email || data.email;

      const result = await submitEnquiry({
        ...data,
        name,
        email,
        company: data.company ?? "",
        phone: "",
        product_interest: productNames || "General enquiry",
        message: enrichedMessage,
      });
      if (result.success) {
        capture("quote_form_submitted", {
          product_count: items.length,
          products: items.map((i) => i.productName),
        });
        setStatus("success");
        reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" style={{ padding: "0 40px 64px" }}>
      {/* Mount Clerk user reader when Clerk is active — passes autofill data up */}
      {ClerkUserReader && <ClerkUserReader onUser={handleClerkUser} />}

      <div style={{ maxWidth: 1100, margin: "0 auto", ...glass16, borderRadius: 32, padding: "48px 48px 40px" }}>
        {/* Heading */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 10, letterSpacing: 3, fontWeight: 800, color: "#7a5f32", marginBottom: 10 }}>
            GET IN TOUCH
          </p>
          <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 28, color: "#14221e", marginBottom: 10, lineHeight: 1.15 }}>
            Request a quote
          </h2>
          <p style={{ fontSize: 14, color: "#2d4a42", lineHeight: 1.65, maxWidth: 560 }}>
            Share your requirements and destination — we respond with pricing bands and lead times within 24 hours.
          </p>
        </div>

        {/* Selected Products chips */}
        <div
          style={{
            background: "rgba(30,77,63,0.05)",
            borderRadius: 16,
            padding: "18px 20px",
            marginBottom: 28,
            border: "1px solid rgba(30,77,63,0.10)",
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#7a5f32", textTransform: "uppercase", marginBottom: 12 }}>
            Selected Products {items.length > 0 ? `(${items.length})` : ""}
          </p>
          {items.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {items.map((item) => (
                <span
                  key={item.productId}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: "rgba(30,77,63,0.08)",
                    border: "1px solid rgba(30,77,63,0.16)",
                    borderRadius: 50,
                    padding: "6px 14px",
                    fontSize: 12,
                    color: "#14221e",
                    fontWeight: 600,
                  }}
                >
                  {item.productName}
                  <button
                    onClick={() => removeFromQuote(item.productId)}
                    aria-label={`Remove ${item.productName}`}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#7a5f32",
                      fontSize: 13,
                      padding: 0,
                      lineHeight: 1,
                      display: "flex",
                    }}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: "#2d4a42" }}>
              No products selected.{" "}
              <a href="#collection" style={{ color: "#1e4d3f", fontWeight: 600, textDecoration: "underline" }}>
                Browse our collection
              </a>{" "}
              to add products to your quote.
            </p>
          )}
        </div>

        {status === "success" ? (
          <div style={{ background: "#F0F4F2", boxShadow: neuIn, borderRadius: 20, padding: "40px 32px", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>✓</div>
            <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, color: "#14221e", marginBottom: 10 }}>
              Quote request received!
            </h3>
            <p style={{ fontSize: 14, color: "#2d4a42", lineHeight: 1.65, marginBottom: 24 }}>
              We'll respond with pricing bands and lead times within 24 business hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              style={{ background: "#0d281f", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 50, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
            >
              Send another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Row 1: Name + Email (or signed-in banner) */}
            {clerkUser ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(30,77,63,0.06)",
                  border: "1px solid rgba(30,77,63,0.14)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  marginBottom: 16,
                  fontSize: 13,
                  color: "#1e4d3f",
                  fontWeight: 600,
                }}
              >
                <span style={{ fontSize: 16 }}>✓</span>
                Signed in as {clerkUser.name ? `${clerkUser.name} (${clerkUser.email})` : clerkUser.email}
                {/* Pass values to RHF via hidden inputs so validation still works */}
                <input type="hidden" {...register("name")} value={clerkUser.name || clerkUser.email} />
                <input type="hidden" {...register("email")} value={clerkUser.email} />
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input {...register("name")} style={inputStyle} placeholder="Your full name" />
                  {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input {...register("email")} type="email" style={inputStyle} placeholder="you@company.com" />
                  {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
                </div>
              </div>
            )}

            {/* Company */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Company / Organisation</label>
              <input {...register("company")} style={inputStyle} placeholder="Optional" />
            </div>

            {/* Message */}
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Message / Requirements *</label>
              <textarea
                {...register("message")}
                rows={5}
                style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                placeholder="GSM requirements, MOQ, destination, timeline, packaging needs…"
              />
              {errors.message && <span style={errorStyle}>{errors.message.message}</span>}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: status === "sending" ? "#2d4a42" : "#0d281f",
                  color: "#fff",
                  border: "none",
                  padding: "15px 36px",
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "background 0.2s, transform 0.18s",
                }}
                onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {status === "sending" ? "Sending…" : "Send Quote Request"}
              </button>
              {status === "error" && (
                <p style={{ fontSize: 13, color: "#c0392b" }}>
                  Something went wrong — please email us directly at exports@padmalaya.example
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
