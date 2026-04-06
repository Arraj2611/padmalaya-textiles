"use client";

import { useState, useEffect } from "react";
import { useQuote, type QuoteItem } from "@/context/QuoteContext";

interface AddToQuoteButtonProps {
  product: QuoteItem;
}

export default function AddToQuoteButton({ product }: AddToQuoteButtonProps) {
  const { addToQuote, removeFromQuote, isInQuote } = useQuote();
  const [toast, setToast] = useState(false);
  const inQuote = isInQuote(product.productId);

  function handleClick() {
    if (inQuote) {
      removeFromQuote(product.productId);
    } else {
      addToQuote(product);
      setToast(true);
    }
  }

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={handleClick}
        style={{
          background: inQuote ? "#1e4d3f" : "#0d281f",
          color: "#fff",
          border: "none",
          padding: "15px 36px",
          borderRadius: 50,
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          transition: "background 0.2s, transform 0.18s",
          opacity: inQuote ? 0.85 : 1,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {inQuote ? "✓ Added to Quote" : "Add to Quote"}
      </button>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#14221e",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: 50,
            whiteSpace: "nowrap",
            animation: "quoteToastIn 0.25s ease, quoteToastOut 0.25s ease 1.75s forwards",
            pointerEvents: "none",
          }}
        >
          <style>{`
            @keyframes quoteToastIn  { from { opacity:0; transform:translateX(-50%) translateY(6px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
            @keyframes quoteToastOut { from { opacity:1; } to { opacity:0; } }
          `}</style>
          Added to your quote
        </div>
      )}
    </div>
  );
}
