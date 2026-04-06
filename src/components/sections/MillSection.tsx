"use client";

import ProductImage from "@/components/ui/ProductImage";
import { glass, neu } from "@/lib/design-tokens";

const millImg =
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3";

export default function MillSection() {
  return (
    <section
      id="mill"
      style={{ padding: "52px 28px", background: "linear-gradient(180deg, #EEF3F1 0%, #F3F6F4 100%)" }}
    >
      <div
        className="grid-mill"
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)",
          gap: 32,
          alignItems: "center",
        }}
      >
        {/* Mill image */}
        <div
          className="reveal card-media"
          style={{ borderRadius: 28, minHeight: 320, boxShadow: neu, overflow: "hidden" }}
        >
          <ProductImage src={millImg} alt="Terry towels in production context" style={{ minHeight: 320 }} />
        </div>

        {/* Text */}
        <div className="reveal reveal-d1">
          <p style={{ fontSize: 10, letterSpacing: 3, fontWeight: 800, color: "#7a5f32", marginBottom: 12 }}>
            THE MILL
          </p>
          <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 32, lineHeight: 1.15, color: "#14221e", marginBottom: 18 }}>
            Woven in Solapur,<br />shipped with discipline.
          </h2>
          <p style={{ fontSize: 15, color: "#2d4a42", lineHeight: 1.75, marginBottom: 16 }}>
            Padmalaya supplies terry towelling for hospitality, retail, and export — from face
            cloths to bath sheets, with consistent GSM control and lot traceability.
          </p>
          <p style={{ fontSize: 15, color: "#2d4a42", lineHeight: 1.75, marginBottom: 22 }}>
            Our team works with procurement specs daily: bulk MOQs, packaging marks, and compliance
            documentation.
          </p>
          <div
            className="reveal reveal-d2"
            style={{ ...glass(14), borderRadius: 20, padding: "20px 22px", display: "inline-block" }}
          >
            <p style={{ fontSize: 12, fontWeight: 700, color: "#1e4d3f" }}>
              ISO-aligned · OEKO-TEX yarn classes · India export
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
