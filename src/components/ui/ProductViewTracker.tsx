"use client";

import { useEffect } from "react";
import { capture } from "@/lib/analytics";

interface Props {
  productName: string;
  slug: string;
}

/** Fires a product_viewed analytics event once on mount. */
export default function ProductViewTracker({ productName, slug }: Props) {
  useEffect(() => {
    capture("product_viewed", { product_name: productName, slug });
  }, [productName, slug]);

  return null;
}
