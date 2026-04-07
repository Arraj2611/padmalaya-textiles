"use client";

import Link from "next/link";
import { useState } from "react";
import ProductImage from "@/components/ui/ProductImage";
import { STATIC_PRODUCTS } from "@/lib/products";
import type { Product } from "@/lib/supabase-types";
import { capture } from "@/lib/analytics";

const neuIn = "inset 4px 4px 10px rgba(13,40,31,.07), inset -3px -3px 8px rgba(255,255,255,.75)";
const INITIAL_SHOW = 6;
const COLLAPSE_THRESHOLD = 9; // show "View all" button only if more than this many products

interface CollectionGridProps {
  products?: Product[];
}

export default function CollectionGrid({ products }: CollectionGridProps) {
  const allProducts = (products && products.length > 0 ? products : STATIC_PRODUCTS);
  const needsCollapse = allProducts.length > COLLAPSE_THRESHOLD;
  const [showAll, setShowAll] = useState(false);
  const displayProducts = needsCollapse && !showAll ? allProducts.slice(0, INITIAL_SHOW) : allProducts;

  return (
    <section id="collection" style={{ padding: "44px 40px 48px" }}>
      <style>{`
        .collection-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .collection-cta-card { grid-column: span 2; }
        @media (max-width: 900px) {
          .collection-grid { grid-template-columns: repeat(2, 1fr); }
          .collection-cta-card { grid-column: span 2; }
        }
        @media (max-width: 560px) {
          .collection-grid { grid-template-columns: 1fr; }
          .collection-cta-card { grid-column: span 1; }
        }
        .collection-card { transition: transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease; }
        .collection-card:hover { transform: translateY(-5px); box-shadow: 0 22px 50px rgba(13,40,31,.10) !important; }
        .view-all-btn { transition: transform 0.18s ease, background 0.2s; }
        .view-all-btn:hover { transform: scale(1.04); }
      `}</style>

      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
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

        {/* Grid */}
        <div className="collection-grid">
          {displayProducts.map((product) => {
            const slug =
              ("slug" in product ? (product as { slug?: string }).slug : null) ??
              STATIC_PRODUCTS.find((s) => s.id === product.id)?.slug ??
              "";
            return (
              <Link
                key={product.id}
                href={`/products/${slug}`}
                className="collection-card"
                style={{
                  background: "#F5F8F7",
                  boxShadow: neuIn,
                  borderRadius: 26,
                  padding: 9,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <div
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    height: 260,
                    boxShadow: "inset 0 0 0 1px rgba(36,61,54,.08)",
                  }}
                >
                  <ProductImage
                    src={product.image_url ?? ""}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", minHeight: 260 }}
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
              </Link>
            );
          })}

          {/* CTA card */}
          <div
            className="collection-cta-card"
            style={{
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

        {/* View all / collapse button */}
        {needsCollapse && (
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button
              onClick={() => {
                const next = !showAll;
                setShowAll(next);
                if (next) capture("collection_expanded", { total_products: allProducts.length });
              }}
              className="view-all-btn"
              style={{
                background: showAll ? "transparent" : "#0d281f",
                color: showAll ? "#0d281f" : "#fff",
                border: "2px solid #0d281f",
                padding: "13px 32px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {showAll ? "Show less" : `View all ${allProducts.length} products`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
