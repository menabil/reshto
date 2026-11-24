import { siteConfig } from "@/constants/site";

/**
 * Generates dynamic sitemap for search engines
 * @returns {import('next').MetadataRoute.Sitemap}
 */
const LAST_MODIFIED = "2026-01-01";

export default function sitemap() {
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/order", priority: 0.9 },
    { path: "/checkout", priority: 0.8 },
    { path: "/order-tracking", priority: 0.8 },
    { path: "/reservation", priority: 0.8 },
    { path: "/chefs", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: route.priority,
  }));

  return routes;
}
