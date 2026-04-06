export default function Footer() {
  return (
    <footer
      style={{
        padding: "32px 28px 40px",
        borderTop: "1px solid rgba(13,40,31,.05)",
        background: "transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 20,
          alignItems: "center",
        }}
      >
        <p style={{ fontWeight: 600, color: "#2d4a42", fontSize: 14 }}>
          © 2026 Padmalaya Textiles · Solapur, India
        </p>
        <nav
          className="site-nav"
          style={{ display: "flex", gap: 20, fontSize: 13, fontWeight: 600, color: "#1e4d3f" }}
        >
          <a href="#collection" style={{ color: "inherit", textDecoration: "none" }}>Products</a>
          <a href="#mill" style={{ color: "inherit", textDecoration: "none" }}>About</a>
          <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
        </nav>
      </div>
    </footer>
  );
}
