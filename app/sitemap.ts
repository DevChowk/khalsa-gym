import type { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS } from "@/lib/data";

const BASE = "https://www.khalsa.co.in";

/**
 * Generated, HTTPS-only, and free of the junk in the legacy sitemap — which
 * declared 385 raw flipbook JPGs, three `tel:` URLs, and listed every entry
 * on http:// while the site served https://.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/recognition`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/quote`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ...CATEGORIES.map((c) => ({
      url: `${BASE}/products/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${BASE}/products/${p.category}/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
