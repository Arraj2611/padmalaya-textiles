"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { neuIn } from "@/lib/design-tokens";

const steps = [
  { step: "01", title: "Spin & dye",    body: "Cotton lots matched to your GSM and colour standard." },
  { step: "02", title: "Weave terry",   body: "Double-loop construction for absorbency and hand feel." },
  { step: "03", title: "Finish & pack", body: "Inspection, folding, and export-ready cartons." },
];

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number];

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="process" ref={ref} style={{ padding: "52px 28px 60px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{ fontSize: 10, letterSpacing: 3, fontWeight: 800, color: "#7a5f32", marginBottom: 10 }}
        >
          PROCESS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease }}
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontSize: 28,
            color: "#243D36",
            marginBottom: 36,
          }}
        >
          From yarn to carton
        </motion.h2>

        <div
          className="grid-process"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease }}
              style={{
                background: "#F5F8F7",
                boxShadow: neuIn,
                borderRadius: 24,
                padding: "28px 22px",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: 36,
                  color: "#b8955c",
                  opacity: 0.85,
                  display: "block",
                }}
              >
                {s.step}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: 20,
                  margin: "10px 0 12px",
                  color: "#14221e",
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: 13, color: "#2d4a42", lineHeight: 1.65 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
