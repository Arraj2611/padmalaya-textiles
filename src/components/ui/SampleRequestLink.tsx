"use client";

import { capture } from "@/lib/analytics";

interface Props {
  productName: string;
  slug: string;
}

export default function SampleRequestLink({ productName, slug }: Props) {
  return (
    <a
      href="#contact"
      className="product-sample-btn"
      onClick={() => capture("sample_requested", { product_name: productName, slug })}
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
  );
}
