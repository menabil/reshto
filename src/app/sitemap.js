import { siteConfig } from "@/constants/site";

/**
 * Generates dynamic sitemap for search engines
 * @returns {import('next').MetadataRoute.Sitemap}
 */
export default function sitemap() {
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/menu", priority: 0.9 },
    { path: "/gallery", priority: 0.7 },
    { path: "/order", priority: 0.9 },
    { path: "/reservation", priority: 0.8 },
    { path: "/chefs", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    changeFrequency: "weekly",
    priority: route.priority,
  }));

  return routes;
}
