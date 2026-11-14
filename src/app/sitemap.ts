import type { MetadataRoute } from "next";
import { ROUTES, abs } from "@/lib/seo";

// Карта сайту: /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: abs(ROUTES.home), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: abs(ROUTES.bas), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: abs(ROUTES.kbs), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: abs(ROUTES.cloud), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: abs(ROUTES.about), lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
