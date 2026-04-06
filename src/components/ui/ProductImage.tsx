"use client";

import { useState } from "react";

const U = "https://images.unsplash.com";
const Q = "auto=format&fit=crop&w=960&h=720&q=85&ixlib=rb-4.0.3";
export const FALLBACK_IMG = `${U}/photo-1620799140408-ed5341c52bec?${Q}`;

interface ProductImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function ProductImage({ src, alt, style, className }: ProductImageProps) {
  const [url, setUrl] = useState(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      className={className ?? "img-cover"}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
      loading="eager"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setUrl((u) => (u === FALLBACK_IMG ? u : FALLBACK_IMG))}
    />
  );
}
