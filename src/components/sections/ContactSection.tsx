"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { glass, neuIn } from "@/lib/design-tokens";
import { submitEnquiry } from "@/app/actions/enquiry";

const schema = z.object({
  name:             z.string().min(2, "At least 2 characters"),
  email:            z.email("Invalid email"),
  company:          z.string().optional(),
  phone:            z.string().optional(),
  product_interest: z.string().min(1, "Please select a product"),
  message:          z.string().min(10, "At least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const products = [
  "Classic Terry Bath Towel",
  "Premium Face Towel Set",
  "Luxury Hand Towel",
  "Hotel Bath Sheet",
  "Terry Kitchen Napkin",
  "Spa Wrap Towel",
  "Custom / Private Label",
  "Other",
];

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number];

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

const errorStyle: React.CSSProperties = {
  fontSize: 11,
  color: "#c0392b",
  marginTop: 4,
  display: "block",
};

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("sending");
    try {
      const result = await submitEnquiry(data);
      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" style={{ padding: "0 28px 64px" }}>
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          ...glass(16),
          borderRadius: 32,
          padding: "48px 48px 40px",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 10, letterSpacing: 3, fontWeight: 800, color: "#7a5f32", marginBottom: 10 }}>
            GET IN TOUCH
          </p>
          <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 28, color: "#14221e", marginBottom: 10, lineHeight: 1.15 }}>
            Request a quote
          </h2>
          <p style={{ fontSize: 14, color: "#2d4a42", lineHeight: 1.65, maxWidth: 480 }}>
            Share your SKU interest, volumes, and destination — we respond with pricing bands and
            lead times within 24 hours.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: "#F0F4F2",
                boxShadow: neuIn,
                borderRadius: 20,
                padding: "40px 32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>✓</div>
              <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, color: "#14221e", marginBottom: 10 }}>
                Enquiry received!
              </h3>
              <p style={{ fontSize: 14, color: "#2d4a42", lineHeight: 1.65, marginBottom: 24 }}>
                We'll respond with pricing bands and lead times within 24 business hours.
                Check your inbox for a confirmation email.
              </p>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  background: "#0d281f",
                  color: "#fff",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Send another enquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* Row 1: Name + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
                   className="form-row">
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

              {/* Row 2: Company + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
                   className="form-row">
                <div>
                  <label style={labelStyle}>Company</label>
                  <input {...register("company")} style={inputStyle} placeholder="Optional" />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input {...register("phone")} style={inputStyle} placeholder="Optional" />
                </div>
              </div>

              {/* Product interest */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Product interest *</label>
                <select
                  {...register("product_interest")}
                  style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%232d4a42'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                >
                  <option value="">Select a product…</option>
                  {products.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.product_interest && <span style={errorStyle}>{errors.product_interest.message}</span>}
              </div>

              {/* Message */}
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Message *</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  placeholder="Share your GSM requirements, MOQ, destination, timeline…"
                />
                {errors.message && <span style={errorStyle}>{errors.message.message}</span>}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: status === "sending" ? 1 : 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    background: status === "sending" ? "#2d4a42" : "#0d281f",
                    color: "#fff",
                    border: "none",
                    padding: "15px 36px",
                    borderRadius: 50,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </motion.button>
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ fontSize: 13, color: "#c0392b" }}
                  >
                    Something went wrong — please email us directly at exports@padmalaya.example
                  </motion.p>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
