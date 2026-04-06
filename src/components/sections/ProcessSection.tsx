"use client";

import { neuIn } from "@/lib/design-tokens";

const steps = [
  { step: "01", title: "Spin & dye",    body: "Cotton lots matched to your GSM and colour standard." },
  { step: "02", title: "Weave terry",   body: "Double-loop construction for absorbency and hand feel." },
  { step: "03", title: "Finish & pack", body: "Inspection, folding, and export-ready cartons." },
];

export default function ProcessSection() {
  return (
    <section id="process" style={{ padding: "52px 28px 60px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 10, letterSpacing: 3, fontWeight: 800, color: "#7a5f32", marginBottom: 10 }}>
          PROCESS
        </p>
        <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 28, color: "#243D36", marginBottom: 36 }}>
          From yarn to carton
        </h2>

        <div className="grid-process" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {steps.map((s) => (
            <div
              key={s.step}
              style={{ background: "#F5F8F7", boxShadow: neuIn, borderRadius: 24, padding: "28px 22px", textAlign: "left" }}
            >
              <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 36, color: "#b8955c", opacity: 0.85, display: "block" }}>
                {s.step}
              </span>
              <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 20, margin: "10px 0 12px", color: "#14221e" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 13, color: "#2d4a42", lineHeight: 1.65 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
