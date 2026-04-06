"use client";

import { motion } from "framer-motion";
import ProductImage from "@/components/ui/ProductImage";
import { neuIn, neuSm } from "@/lib/design-tokens";
import type { Product } from "@/lib/supabase-types";

const U = "https://images.unsplash.com";
const Q = "auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3";

const staticProducts: Product[] = [
  {
    id: "1",
    name: "Classic Terry Bath Towel",
    slug: "classic-terry-bath-towel",
    size: "70×140 cm",
    weight: "500 GSM",
    tag: "Bestseller",
    description: "Plush, absorbent, and built to last through hundreds of washes — our signature weave.",
    image_url: `${U}/photo-1584622650111-993a426fbf0a?${Q}`,
    is_featured: true,
    display_order: 0,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    name: "Premium Face Towel Set",
    slug: "premium-face-towel-set",
    size: "30×30 cm",
    weight: "450 GSM",
    tag: "New",
    description: "Ultra-soft face towels, gentle on skin. Ideal for hotels and spa settings.",
    image_url: `${U}/photo-1563291074-2bf8677ac8e5?${Q}`,
    is_featured: false,
    display_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    name: "Luxury Hand Towel",
    slug: "luxury-hand-towel",
    size: "40×70 cm",
    weight: "550 GSM",
    tag: "Premium",
    description: "Double-loop terry for maximum absorbency and a velvety hand feel.",
    image_url: `${U}/photo-1556228453-efd6c1ff04f6?${Q}`,
    is_featured: false,
    display_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    name: "Hotel Bath Sheet",
    slug: "hotel-bath-sheet",
    size: "90×180 cm",
    weight: "600 GSM",
    tag: "Bulk",
    description: "Oversized bath sheets for 5-star hospitality. Private labeling available.",
    image_url: `${U}/photo-1600585154340-be6161a56a0c?${Q}`,
    is_featured: true,
    display_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "5",
    name: "Terry Kitchen Napkin",
    slug: "terry-kitchen-napkin",
    size: "45×65 cm",
    weight: "350 GSM",
    tag: "Popular",
    description: "Lint-free, quick-dry cotton for professional kitchens.",
    image_url: `${U}/photo-1556910103-1c02745aae4d?${Q}`,
    is_featured: false,
    display_order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: "6",
    name: "Spa Wrap Towel",
    slug: "spa-wrap-towel",
    size: "80×150 cm",
    weight: "480 GSM",
    tag: "Luxury",
    description: "Full-body spa wraps with secure tuck closure. Available in 22 colours.",
    image_url: `${U}/photo-1507652313519-d4e9174996dd?${Q}`,
    is_featured: false,
    display_order: 5,
    created_at: "",
    updated_at: "",
  },
];

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

export default function CollectionGrid({ products = staticProducts }: CollectionGridProps) {
  const displayProducts = products.length > 0 ? products : staticProducts;

  return (
    <section id="collection" style={{ padding: "44px 28px 48px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
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
          <h2
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontSize: 30,
              color: "#243D36",
              letterSpacing: -0.5,
            }}
          >
            Our range
          </h2>
          <p style={{ fontSize: 13, color: "#2d4a42", maxWidth: 380, lineHeight: 1.55 }}>
            Every SKU includes photography. Mixed clips; packed rows — no empty column.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          className="collection-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
            gridAutoFlow: "row",
          }}
        >
          {/* Product cards */}
          {displayProducts.slice(0, 6).map((product, i) => {
            const meta = masonryMeta[i] ?? masonryMeta[0];
            return (
              <div
                key={product.id}
                className="hover-lift"
                style={{
                  gridColumn: meta.col,
                  background: "#F5F8F7",
                  boxShadow: neuIn,
                  borderRadius: 26,
                  padding: 9,
                  overflow: "hidden",
                }}
              >
                {/* Image with clip-path */}
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

                {/* Card body */}
                <div style={{ padding: "18px 16px 20px" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: 1.2,
                      color: "#7a5f32",
                      textTransform: "uppercase",
                    }}
                  >
                    {product.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontSize: 18,
                      margin: "8px 0 6px",
                      color: "#14221e",
                      lineHeight: 1.2,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#2d4a42",
                      lineHeight: 1.55,
                      marginBottom: 10,
                    }}
                  >
                    {(product.description ?? "").slice(0, 78)}…
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span style={{ fontSize: 11, color: "#1e4d3f", fontWeight: 600 }}>
                      {product.size} · {product.weight}
                    </span>
                    <motion.a
                      href="#contact"
                      className="focus-ring"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        background: "#F0F4F2",
                        boxShadow: neuSm,
                        padding: "8px 16px",
                        borderRadius: 40,
                        fontWeight: 700,
                        fontSize: 11,
                        color: "#0d281f",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      Enquire
                    </motion.a>
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA card */}
          <div
            className="hover-lift"
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
            <p
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontSize: 22,
                marginBottom: 10,
                color: "#14221e",
              }}
            >
              Need a custom program?
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#2d4a42",
                lineHeight: 1.6,
                marginBottom: 18,
              }}
            >
              Private label, dye lots, and GSM specs — talk to the export desk.
            </p>
            <motion.a
              href="#contact"
              className="focus-ring"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{
                background: "#0d281f",
                color: "#fff",
                padding: "12px 26px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Contact
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
