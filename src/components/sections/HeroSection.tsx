"use client";

import { motion } from "framer-motion";
import { glass, neu, goldGradient } from "@/lib/design-tokens";

export default function HeroSection() {
  return (
    <section id="hero" style={{ padding: "36px 28px 24px", position: "relative" }}>
      {/* Gold accent bar */}
      <div
        style={{
          position: "absolute",
          left: "max(28px, 6%)",
          top: 140,
          width: 4,
          height: 128,
          borderRadius: 4,
          background: goldGradient,
          opacity: 0.88,
          pointerEvents: "none",
        }}
      />

      {/* Glass hero card */}
      <div
        className="hero-reveal"
        style={{
          maxWidth: 860,
          margin: "0 auto 0 max(0px, 5%)",
          borderRadius: "132px 132px 40px 40px",
          position: "relative",
          ...glass(24),
          overflow: "visible",
          padding: 0,
        }}
      >
        {/* Inner shimmer overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "132px 132px 40px 40px",
            overflow: "hidden",
            pointerEvents: "none",
            background:
              "linear-gradient(122deg, rgba(255,255,255,.28) 0%, transparent 42%, rgba(30,77,63,.035) 100%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, padding: "52px 48px 58px" }}>
          {/* Location badge */}
          <div
            className="hero-reveal hero-d1"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-start",
              marginBottom: 16,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div
              style={{
                ...glass(10),
                borderRadius: 50,
                padding: "12px 22px 13px",
                lineHeight: 1.45,
                maxWidth: "100%",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#1e4d3f", display: "block", whiteSpace: "nowrap" }}>
                Solapur, India
              </span>
              <span style={{ fontSize: 10, color: "#2d4a42", fontWeight: 500, display: "block", marginTop: 2 }}>
                Mill · export desk
              </span>
            </div>
          </div>

          {/* Label */}
          <p
            className="hero-reveal hero-d2"
            style={{ fontSize: 10, letterSpacing: 4.5, color: "#1e4d3f", fontWeight: 800, marginBottom: 18 }}
          >
            PORCELAIN CANOPY
          </p>

          {/* Heading */}
          <h1
            className="hero-reveal hero-d3"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              color: "#14221e",
              textShadow: "1px 1px 0 rgba(255,255,255,.75), 0 3px 28px rgba(30,77,63,.06)",
              marginBottom: 20,
              maxWidth: 540,
            }}
          >
            Terry, suspended in
            <br />
            <span
              style={{
                fontStyle: "italic",
                background: goldGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 100%",
                animation: "silkSheen 7s linear infinite",
              }}
            >
              quiet light
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-reveal hero-d4"
            style={{ fontSize: 16, color: "#2d4a42", lineHeight: 1.72, maxWidth: 460, marginBottom: 30, fontWeight: 400 }}
          >
            Indian cotton, hotel-grade construction — folds first, frost second, facts where buyers
            expect them.
          </p>

          {/* CTAs */}
          <div className="hero-reveal hero-d5" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="#collection"
              className="focus-ring"
              style={{
                background: goldGradient,
                color: "#14221e",
                padding: "16px 34px",
                borderRadius: 50,
                fontWeight: 800,
                animation: "breatheG 3.5s ease infinite",
                fontSize: 14,
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              View range
            </a>
            <motion.a
              href="#contact"
              className="focus-ring"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{
                background: "#F5F8F7",
                boxShadow: neu,
                padding: "16px 34px",
                borderRadius: 50,
                fontWeight: 700,
                color: "#0d281f",
                fontSize: 14,
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              Book a call
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
