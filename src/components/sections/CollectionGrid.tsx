"use client";

import ProductImage from "@/components/ui/ProductImage";
import { STATIC_PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/supabase-types";

const neuIn = "inset 4px 4px 10px rgba(13,40,31,.07), inset -3px -3px 8px rgba(255,255,255,.75)";

const masonryMeta = [
  { col: "span 2", clip: "none",                                                       h: 232 },
  { col: "span 1", clip: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 16%)",          h: 292 },
  { col: "span 1", clip: "circle(50% at 50% 48%)",                                    h: 292 },
  { col: "span 1", clip: "none",                                                       h: 268 },
  { col: "span 1", clip: "polygon(0 0, 100% 0, 100% 92%, 88% 100%, 0 100%)",          h: 268 },
  { col: "span 1", clip: "none",                                                       h: 268 },
];

interface CollectionGridProps {
  products?: Product[];
}

export default function CollectionGrid({ products }: CollectionGridProps) {
  // Merge live Supabase products with static enriched data for slugs
  const displayProducts = (products && products.length > 0 ? products : STATIC_PRODUCTS).slice(0, 6);

  return (
    <section id="collection" style={{ padding: "44px 40px 48px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 22,
          }}
        >
          <h2 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 30, color: "#243D36", letterSpacing: -0.5 }}>
            Our range
          </h2>
          <p style={{ fontSize: 13, color: "#2d4a42", maxWidth: 380, lineHeight: 1.55 }}>
            Click any product to view specs, features, and add to your quote.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          className="collection-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, gridAutoFlow: "row" }}
        >
          {displayProducts.map((product, i) => {
            const meta = masonryMeta[i] ?? masonryMeta[0];
            const slug = ("slug" in product ? product.slug : null) ?? STATIC_PRODUCTS[i]?.slug ?? "";
            return (
              <a
                key={product.id}
                href={`/products/${slug}`}
                className="hover-lift"
                style={{
                  gridColumn: meta.col,
                  background: "#F5F8F7",
                  boxShadow: neuIn,
                  borderRadius: 26,
                  padding: 9,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 22px 50px rgba(13,40,31,.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = neuIn;
                }}
              >
                <div
                  className="card-media"
                  style={{
                    borderRadius: meta.clip === "none" ? 20 : 0,
                    overflow: "hidden",
                    clipPath: meta.clip === "none" ? undefined : meta.clip,
                    height: meta.h,
                    boxShadow: "inset 0 0 0 1px rgba(36,61,54,.08)",
                  }}
                >
                  <ProductImage
                    src={product.image_url ?? ""}
                    alt={product.name}
                    style={{ minHeight: meta.h, width: "100%", height: "100%" }}
                  />
                </div>

                <div style={{ padding: "18px 16px 20px" }}>
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.2, color: "#7a5f32", textTransform: "uppercase" }}>
                    {product.tag}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 18, margin: "8px 0 6px", color: "#14221e", lineHeight: 1.2 }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: 12, color: "#2d4a42", lineHeight: 1.55, marginBottom: 10 }}>
                    {(product.description ?? "").slice(0, 78)}…
                  </p>
                  <span style={{ fontSize: 11, color: "#1e4d3f", fontWeight: 600 }}>
                    {product.size} · {product.weight}
                  </span>
                </div>
              </a>
            );
          })}

          {/* CTA card */}
          <div
            style={{
              gridColumn: "span 2",
              background: "#F5F8F7",
              boxShadow: neuIn,
              borderRadius: 26,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              minHeight: 268,
            }}
          >
            <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, marginBottom: 10, color: "#14221e" }}>
              Need a custom program?
            </p>
            <p style={{ fontSize: 13, color: "#2d4a42", lineHeight: 1.6, marginBottom: 18 }}>
              Private label, dye lots, and GSM specs — talk to the export desk.
            </p>
            <a
              href="#contact"
              style={{
                background: "#0d281f",
                color: "#fff",
                padding: "12px 26px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                display: "inline-block",
                transition: "transform 0.18s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
