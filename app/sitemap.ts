import type { MetadataRoute } from "next";
import { PUBLISHED_ROUTES } from "@/lib/config/publishedRoutes";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { buildSitemapEntries } from "@/lib/shared/sitemap";

// Required so `output: "export"` can write sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(SITE_CONFIG.url, PUBLISHED_ROUTES, new Date());
}