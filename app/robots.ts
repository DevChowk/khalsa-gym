import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.khalsa.co.in/sitemap.xml",
    host: "https://www.khalsa.co.in",
  };
}
