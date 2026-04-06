import type { MetadataRoute } from "next";
import { STATIC_PRODUCTS } from "@/lib/products";

const SITE_URL = "https://padmalayatextiles.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = STATIC_PRODUCTS.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...productUrls,
  ];
}
