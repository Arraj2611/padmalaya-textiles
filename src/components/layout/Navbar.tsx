"use client";

import { neuIn } from "@/lib/design-tokens";
import { glass } from "@/lib/design-tokens";

// Clerk auth components — only rendered when real keys are present
let UserButton: React.ComponentType<{ afterSignOutUrl?: string }> | null = null;
let SignInButton: React.ComponentType<{ children?: React.ReactNode; mode?: string }> | null = null;
let useAuth: (() => { isSignedIn?: boolean; isLoaded?: boolean }) | null = null;

const hasClerkKeys =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

if (hasClerkKeys) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const clerk = require("@clerk/nextjs");
    UserButton = clerk.UserButton;
    SignInButton = clerk.SignInButton;
    useAuth = clerk.useAuth;
  } catch {
    // Clerk not available — degrade gracefully
  }
}

const navLinks = [
  { label: "Home",     href: "#hero"       },
  { label: "Products", href: "#collection" },
  { label: "About",    href: "#mill"       },
  { label: "Process",  href: "#process"    },
  { label: "Contact",  href: "#contact"    },
];

function AuthControls() {
  const auth = useAuth ? useAuth() : { isSignedIn: false, isLoaded: true };

  if (!hasClerkKeys) return null;
  if (!auth.isLoaded) return null;

  if (auth.isSignedIn && UserButton) {
    return (
      <UserButton afterSignOutUrl="/" />
    );
  }

  if (SignInButton) {
    return (
      <SignInButton mode="modal">
        <button
          style={{
            background: "transparent",
            color: "#0d281f",
            padding: "11px 22px",
            borderRadius: 50,
            fontWeight: 700,
            fontSize: 13,
            border: "2px solid rgba(13,40,31,0.3)",
            cursor: "pointer",
            transition: "border-color 0.2s, transform 0.18s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#0d281f";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(13,40,31,0.3)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Sign In
        </button>
      </SignInButton>
    );
  }

  return null;
}

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

        {/* Right side: auth + quote CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <AuthControls />

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
      </div>
    </header>
  );
}
