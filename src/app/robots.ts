import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// /robots.txt. Тестові збірки на Vercel (preview) закриті від індексації,
// щоб у пошук не потрапляли копії сайту
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
