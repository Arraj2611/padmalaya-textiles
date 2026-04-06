"use client";

import { neuIn } from "@/lib/design-tokens";
import { glass } from "@/lib/design-tokens";

const navLinks = [
  { label: "Home",     href: "#hero"       },
  { label: "Products", href: "#collection" },
  { label: "About",    href: "#mill"       },
  { label: "Process",  href: "#process"    },
  { label: "Contact",  href: "#contact"    },
];

export default function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 300,
        background: "transparent",
        borderBottom: "1px solid rgba(13,40,31,.045)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "14px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 14,
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            ...glass(8),
            padding: "10px 22px",
            borderRadius: 60,
            fontFamily: "var(--font-fraunces), serif",
            fontSize: 17,
            letterSpacing: 3,
            color: "#0d281f",
            display: "inline-block",
            textDecoration: "none",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          PADMALAYA
        </a>

        {/* Nav pill */}
        <nav
          style={{
            display: "flex",
            gap: 4,
            background: "rgba(255,255,255,.35)",
            boxShadow: neuIn,
            padding: "6px 8px",
            borderRadius: 50,
            flexWrap: "wrap",
            WebkitBackdropFilter: "blur(8px)",
            backdropFilter: "blur(8px)",
          }}
        >
          {navLinks.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="nav-link"
              style={{
                padding: "8px 14px",
                fontSize: 11,
                fontWeight: 600,
                color: "#2d4a42",
                borderRadius: 40,
                textDecoration: "none",
                transition: "color 0.2s, background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1e4d3f";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#2d4a42";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Quote CTA */}
        <a
          href="#contact"
          className="focus-ring"
          style={{
            background: "#0d281f",
            color: "#fff",
            padding: "11px 26px",
            borderRadius: 50,
            fontWeight: 700,
            fontSize: 13,
            display: "inline-block",
            textDecoration: "none",
            transition: "transform 0.18s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        >
          Quote
        </a>
      </div>
    </header>
  );
}
