import { notFound } from "next/navigation";
import Link from "next/link";
import { STATIC_PRODUCTS, getProductBySlug } from "@/lib/products";
import ProductGallery from "@/components/ui/ProductGallery";
import AddToQuoteButton from "@/components/ui/AddToQuoteButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export function generateStaticParams() {
  return STATIC_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — Padmalaya Textiles`,
    description: product.description.slice(0, 160),
  };
}

const COLOR_SWATCHES: Record<string, string> = {
  White: "#FAFAFA", Ivory: "#F8F4E8", Charcoal: "#3a3a3a", Sage: "#8fa889",
  Navy: "#1a2a4a", Blush: "#f0c4b8", Stone: "#b0a898", Teal: "#2d7b7b",
  Burgundy: "#7a1f2e", "Red Stripe": "#c03030", "Blue Stripe": "#2d5a9e",
  Black: "#1a1a1a",
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const neuIn = "inset 4px 4px 10px rgba(13,40,31,.07), inset -3px -3px 8px rgba(255,255,255,.75)";

  return (
    <div style={{ backgroundColor: "#F3F6F4", fontFamily: "var(--font-outfit), sans-serif", color: "#14221e", minHeight: "100vh" }}>
      <Navbar />

      <style>{`
        .product-back-link { transition: color 0.2s; color: #2d4a42; }
        .product-back-link:hover { color: #14221e; }
        .product-sample-btn { transition: border-color 0.2s, transform 0.18s; }
        .product-sample-btn:hover { border-color: #0d281f !important; transform: scale(1.03); }
        @media (max-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 40px 80px" }}>
        {/* Back link */}
        <Link
          href="/#collection"
          className="product-back-link"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: 32,
          }}
        >
          ← Back to Collection
        </Link>

        {/* Two-column layout */}
        <div
          className="product-detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* LEFT: Gallery */}
          <ProductGallery images={product.images} alt={product.name} />

          {/* RIGHT: Info */}
          <div
            style={{
              background: "rgba(255,255,255,0.44)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderRadius: 28,
              padding: "36px 36px 40px",
            }}
          >
            {/* Tag */}
            <span
              style={{
                display: "inline-block",
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 1.4,
                color: "#7a5f32",
                background: "rgba(184,149,92,0.12)",
                border: "1px solid rgba(184,149,92,0.28)",
                borderRadius: 50,
                padding: "4px 12px",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              {product.tag}
            </span>

            {/* Name */}
            <h1
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#14221e",
                marginBottom: 16,
              }}
            >
              {product.name}
            </h1>

            {/* Specs */}
            <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
              {[product.size, product.weight].map((spec) => (
                <span
                  key={spec}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1e4d3f",
                    background: "rgba(30,77,63,0.08)",
                    borderRadius: 50,
                    padding: "5px 14px",
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Description */}
            <p style={{ fontSize: 14, color: "#2d4a42", lineHeight: 1.75, marginBottom: 24 }}>
              {product.description}
            </p>

            {/* Features */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#7a5f32", marginBottom: 12, textTransform: "uppercase" }}>
                Features
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {product.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#2d4a42" }}>
                    <span style={{ color: "#b8955c", flexShrink: 0, marginTop: 1 }}>✦</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Colours */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: "#7a5f32", marginBottom: 12, textTransform: "uppercase" }}>
                Available Colours
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {product.colors.map((c) => (
                  <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <div
                      title={c}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: COLOR_SWATCHES[c] ?? "#ccc",
                        boxShadow: neuIn,
                        border: "1px solid rgba(255,255,255,0.7)",
                      }}
                    />
                    <span style={{ fontSize: 9, color: "#2d4a42", fontWeight: 600, textAlign: "center", maxWidth: 44, lineHeight: 1.2 }}>
                      {c}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <AddToQuoteButton product={{ productId: product.id, productName: product.name, slug: product.slug }} />
              <a
                href="#contact"
                className="product-sample-btn"
                style={{
                  padding: "15px 28px",
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#0d281f",
                  border: "2px solid rgba(13,40,31,0.2)",
                  background: "transparent",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Request Sample
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
