"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const neuIn = "inset 4px 4px 10px rgba(13,40,31,.07), inset -3px -3px 8px rgba(255,255,255,.75)";
const neu    = "8px 8px 24px rgba(13,40,31,.10), -4px -4px 16px rgba(255,255,255,.7)";

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Main image */}
      <div
        style={{
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: neu,
          background: "#EEF3F1",
          aspectRatio: "4/3",
          position: "relative",
        }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} — view ${i + 1}`}
            loading="eager"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === active ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            style={{
              flexShrink: 0,
              width: 76,
              height: 60,
              borderRadius: 12,
              overflow: "hidden",
              cursor: "pointer",
              border: "none",
              padding: 3,
              background: "#F5F8F7",
              boxShadow: i === active
                ? `0 0 0 2px #b8955c, ${neuIn}`
                : neuIn,
              transition: "box-shadow 0.2s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              if (i !== active) e.currentTarget.style.boxShadow = `0 0 0 2px rgba(184,149,92,0.4), ${neuIn}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = i === active ? `0 0 0 2px #b8955c, ${neuIn}` : neuIn;
            }}
          >
            <img
              src={src}
              alt=""
              loading="eager"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10, display: "block" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
