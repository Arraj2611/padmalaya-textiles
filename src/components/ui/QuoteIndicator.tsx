"use client";

import { useState } from "react";
import { useQuote } from "@/context/QuoteContext";

export default function QuoteIndicator() {
  const { items, removeFromQuote, clearQuote } = useQuote();
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes quoteSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .quote-indicator {
          animation: quoteSlideIn 0.3s ease forwards;
        }
        @media (max-width: 600px) {
          .quote-indicator {
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            border-radius: 16px 16px 0 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div
        className="quote-indicator"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 400,
          maxWidth: 340,
          width: "calc(100% - 48px)",
          background: "rgba(243,246,244,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.65)",
          borderRadius: 20,
          boxShadow: "8px 8px 32px rgba(13,40,31,.14), -4px -4px 16px rgba(255,255,255,.6)",
          overflow: "hidden",
        }}
      >
        {/* Header bar — always visible */}
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            background: "none",
            border: "none",
            cursor: "pointer",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* List icon */}
            <span style={{ fontSize: 18, lineHeight: 1 }}>🧾</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#14221e" }}>
              {items.length} {items.length === 1 ? "product" : "products"} selected
            </span>
          </div>
          <span style={{ fontSize: 11, color: "#2d4a42", fontWeight: 600, transition: "transform 0.2s", display: "inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
            ▲
          </span>
        </button>

        {/* Expandable product list */}
        {expanded && (
          <div style={{ borderTop: "1px solid rgba(36,61,54,.08)", padding: "12px 18px 16px" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((item) => (
                <li
                  key={item.productId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "#2d4a42",
                    background: "rgba(30,77,63,0.06)",
                    borderRadius: 8,
                    padding: "6px 10px",
                    gap: 8,
                  }}
                >
                  <span style={{ flex: 1 }}>{item.productName}</span>
                  <button
                    onClick={() => removeFromQuote(item.productId)}
                    aria-label={`Remove ${item.productName}`}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 14,
                      color: "#7a5f32",
                      padding: "0 2px",
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <a
                href="#contact"
                onClick={() => setExpanded(false)}
                style={{
                  flex: 1,
                  background: "#0d281f",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: 50,
                  padding: "10px 16px",
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: "center",
                  display: "block",
                  transition: "transform 0.18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Go to Quote Form
              </a>
              <button
                onClick={clearQuote}
                style={{
                  background: "rgba(122,95,50,0.1)",
                  border: "none",
                  borderRadius: 50,
                  padding: "10px 14px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#7a5f32",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(122,95,50,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(122,95,50,0.1)")}
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
