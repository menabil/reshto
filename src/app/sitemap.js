import { siteConfig } from "@/constants/site";

/**
 * Generates dynamic sitemap for search engines
 * @returns {import('next').MetadataRoute.Sitemap}
 */
const LAST_MODIFIED = "2026-01-01";

export default function sitemap() {
  const routes = ["", "/about", "/order"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : route === "/order" ? 0.9 : 0.8,
  }));

  return routes;
}
