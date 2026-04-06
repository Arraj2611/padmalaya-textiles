"use client";

import { motion } from "framer-motion";
import { glass, neuIn } from "@/lib/design-tokens";

const stats = [
  { k: "25+",      v: "Years weaving",   blur: 8  },
  { k: "500+",     v: "Hotel programs",  blur: 14 },
  { k: "OEKO-TEX", v: "Certified yarns", blur: 18 },
  { k: "MOQ",      v: "From 500 pcs",    blur: 11 },
];

const gradientBorder = "linear-gradient(130deg, rgba(184,149,92,.22), rgba(30,77,63,.12))";

export default function ProofStrip() {
  return (
    <section id="proof" style={{ padding: "20px 28px 12px" }}>
      <p className="reveal" style={{ fontSize: 10, letterSpacing: 3, fontWeight: 800, color: "#7a5f32", textAlign: "center", marginBottom: 14 }}>
        PROOF STRIP
      </p>

      <div
        className="reveal reveal-d1"
        style={{ maxWidth: 920, margin: "0 auto", background: "#F5F8F7", boxShadow: neuIn, borderRadius: 26, padding: 14 }}
      >
        {/* 4-column bento */}
        <div
          className="proof-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, alignItems: "stretch" }}
        >
          {stats.map((b, i) => (
            <div
              key={b.k}
              className={`reveal reveal-d${i + 1}`}
              style={{ borderRadius: 18, padding: 2, background: gradientBorder, display: "flex" }}
            >
              <div
                style={{
                  ...glass(b.blur),
                  borderRadius: 16,
                  padding: "22px 18px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: 118,
                }}
              >
                <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 26, fontWeight: 700, color: "#14221e", lineHeight: 1.1 }}>
                  {b.k}
                </p>
                <p style={{ fontSize: 12, color: "#2d4a42", marginTop: 10, fontWeight: 500, lineHeight: 1.4 }}>
                  {b.v}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Export lead time bar */}
        <div
          className="reveal reveal-d5"
          style={{ marginTop: 10, borderRadius: 18, padding: 2, background: gradientBorder }}
        >
          <div
            style={{
              ...glass(20),
              borderRadius: 16,
              padding: "20px 22px",
              minHeight: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "#243D36" }}>Export lead time</span>
            <span style={{ fontSize: 14, color: "#2d4a42" }}>4–6 weeks · FOB / CIF programs</span>
          </div>
        </div>
      </div>
    </section>
  );
}
