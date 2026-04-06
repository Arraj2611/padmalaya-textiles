"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { glass, neuIn } from "@/lib/design-tokens";

const stats = [
  { k: "25+",      v: "Years weaving",   blur: 8  },
  { k: "500+",     v: "Hotel programs",  blur: 14 },
  { k: "OEKO-TEX", v: "Certified yarns", blur: 18 },
  { k: "MOQ",      v: "From 500 pcs",    blur: 11 },
];

const gradientBorder = "linear-gradient(130deg, rgba(184,149,92,.22), rgba(30,77,63,.12))";
const ease = [0.23, 1, 0.32, 1] as [number, number, number, number];

export default function ProofStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="proof" ref={ref} style={{ padding: "20px 28px 12px" }}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        style={{
          fontSize: 10,
          letterSpacing: 3,
          fontWeight: 800,
          color: "#7a5f32",
          textAlign: "center",
          marginBottom: 14,
        }}
      >
        PROOF STRIP
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        style={{
          maxWidth: 920,
          margin: "0 auto",
          background: "#F5F8F7",
          boxShadow: neuIn,
          borderRadius: 26,
          padding: 14,
        }}
      >
        {/* 4-column bento grid — staggered */}
        <div
          className="proof-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            alignItems: "stretch",
          }}
        >
          {stats.map((b, i) => (
            <motion.div
              key={b.k}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease }}
              style={{
                borderRadius: 18,
                padding: 2,
                background: gradientBorder,
                display: "flex",
              }}
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
                <p
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#14221e",
                    lineHeight: 1.1,
                  }}
                >
                  {b.k}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "#2d4a42",
                    marginTop: 10,
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {b.v}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Export lead time bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.65, ease }}
          style={{
            marginTop: 10,
            borderRadius: 18,
            padding: 2,
            background: gradientBorder,
          }}
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
            <span style={{ fontSize: 13, fontWeight: 700, color: "#243D36" }}>
              Export lead time
            </span>
            <span style={{ fontSize: 14, color: "#2d4a42" }}>
              4–6 weeks · FOB / CIF programs
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
