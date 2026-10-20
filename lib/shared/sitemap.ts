import type { MetadataRoute } from "next";
import {
  SITEMAP_CHANGE_FREQUENCY,
  SITEMAP_PRIORITY_DEFAULT,
  SITEMAP_PRIORITY_HOME,
} from "@/lib/config/thresholds";

export function buildSitemapEntries(
  baseUrl: string,
  routes: readonly string[],
  lastModified: Date,
): MetadataRoute.Sitemap {
  const origin = baseUrl.replace(/\/+$/, "");
  return routes.map((route) => ({
    url: route === "/" ? `${origin}/` : `${origin}${route}`,
    lastModified,
    changeFrequency: SITEMAP_CHANGE_FREQUENCY,
    priority: route === "/" ? SITEMAP_PRIORITY_HOME : SITEMAP_PRIORITY_DEFAULT,
  }));
}
