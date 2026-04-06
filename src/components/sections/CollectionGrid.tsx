import ProductImage from "@/components/ui/ProductImage";
import { neuIn, neuSm } from "@/lib/design-tokens";

const U = "https://images.unsplash.com";
const Q = "auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3";

const products = [
  {
    name: "Classic Terry Bath Towel",
    size: "70×140 cm",
    weight: "500 GSM",
    tag: "Bestseller",
    desc: "Plush, absorbent, and built to last through hundreds of washes — our signature weave.",
    img: `${U}/photo-1584622650111-993a426fbf0a?${Q}`,
  },
  {
    name: "Premium Face Towel Set",
    size: "30×30 cm",
    weight: "450 GSM",
    tag: "New",
    desc: "Ultra-soft face towels, gentle on skin. Ideal for hotels and spa settings.",
    img: `${U}/photo-1563291074-2bf8677ac8e5?${Q}`,
  },
  {
    name: "Luxury Hand Towel",
    size: "40×70 cm",
    weight: "550 GSM",
    tag: "Premium",
    desc: "Double-loop terry for maximum absorbency and a velvety hand feel.",
    img: `${U}/photo-1556228453-efd6c1ff04f6?${Q}`,
  },
  {
    name: "Hotel Bath Sheet",
    size: "90×180 cm",
    weight: "600 GSM",
    tag: "Bulk",
    desc: "Oversized bath sheets for 5-star hospitality. Private labeling available.",
    img: `${U}/photo-1600585154340-be6161a56a0c?${Q}`,
  },
  {
    name: "Terry Kitchen Napkin",
    size: "45×65 cm",
    weight: "350 GSM",
    tag: "Popular",
    desc: "Lint-free, quick-dry cotton for professional kitchens.",
    img: `${U}/photo-1556910103-1c02745aae4d?${Q}`,
  },
  {
    name: "Spa Wrap Towel",
    size: "80×150 cm",
    weight: "480 GSM",
    tag: "Luxury",
    desc: "Full-body spa wraps with secure tuck closure. Available in 22 colours.",
    img: `${U}/photo-1507652313519-d4e9174996dd?${Q}`,
  },
];

const masonryLayout = [
  { col: "span 2", clip: "none",                                                       h: 232, p: products[0] },
  { col: "span 1", clip: "polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 16%)",          h: 292, p: products[1] },
  { col: "span 1", clip: "circle(50% at 50% 48%)",                                    h: 292, p: products[2] },
  { col: "span 1", clip: "none",                                                       h: 268, p: products[3] },
  { col: "span 1", clip: "polygon(0 0, 100% 0, 100% 92%, 88% 100%, 0 100%)",          h: 268, p: products[4] },
  { col: "span 1", clip: "none",                                                       h: 268, p: products[5] },
  { col: "span 2", clip: "none",                                                       h: 268, p: null, cta: true },
];

export default function CollectionGrid() {
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
            Masonry range
          </h2>
          <p style={{ fontSize: 13, color: "#2d4a42", maxWidth: 380, lineHeight: 1.55 }}>
            Packed rows — no empty column. Mixed clips; every SKU includes photography.
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
          {masonryLayout.map((m, i) => {
            if (m.cta) {
              return (
                <div
                  key="cta"
                  className="hover-lift"
                  style={{
                    gridColumn: m.col,
                    background: "#F5F8F7",
                    boxShadow: neuIn,
                    borderRadius: 26,
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    minHeight: m.h,
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
                  <a
                    href="#contact"
                    className="focus-ring"
                    style={{
                      background: "#0d281f",
                      color: "#fff",
                      padding: "12px 26px",
                      borderRadius: 50,
                      fontWeight: 700,
                      fontSize: 13,
                      textDecoration: "none",
                    }}
                  >
                    Contact
                  </a>
                </div>
              );
            }

            const product = m.p!;
            return (
              <div
                key={product.name + i}
                className="hover-lift"
                style={{
                  gridColumn: m.col,
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
                    borderRadius: m.clip === "none" ? 20 : 0,
                    overflow: "hidden",
                    clipPath: m.clip === "none" ? undefined : m.clip,
                    height: m.h,
                    boxShadow: "inset 0 0 0 1px rgba(36,61,54,.08)",
                  }}
                >
                  <ProductImage
                    src={product.img}
                    alt={product.name}
                    style={{ minHeight: m.h, width: "100%", height: "100%" }}
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
                    {product.desc.slice(0, 78)}…
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
                    <a
                      href="#contact"
                      className="focus-ring"
                      style={{
                        background: "#F0F4F2",
                        boxShadow: neuSm,
                        padding: "8px 16px",
                        borderRadius: 40,
                        fontWeight: 700,
                        fontSize: 11,
                        color: "#0d281f",
                        textDecoration: "none",
                      }}
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
