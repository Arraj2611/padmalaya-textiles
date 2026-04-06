"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { glass, neuIn } from "@/lib/design-tokens";

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="contact" ref={ref} style={{ padding: "0 28px 48px" }}>
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.98 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{
          maxWidth: 920,
          margin: "0 auto",
          ...glass(16),
          borderRadius: 28,
          padding: "40px 36px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontSize: 26,
              marginBottom: 10,
              color: "#14221e",
            }}
          >
            Request a quote
          </h2>
          <p style={{ fontSize: 14, color: "#2d4a42", lineHeight: 1.65, maxWidth: 400 }}>
            Share SKU interest, volumes, and destination — we respond with pricing bands and lead
            times.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <span
            style={{
              background: "#F5F8F7",
              boxShadow: neuIn,
              padding: "14px 20px",
              borderRadius: 14,
              fontSize: 14,
              color: "#2d4a42",
            }}
          >
            exports@padmalaya.example
          </span>
          <motion.a
            href="mailto:exports@padmalaya.example"
            className="focus-ring"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              background: "#0d281f",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Email us
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
