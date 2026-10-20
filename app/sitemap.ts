import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { PART_A_ROUTES } from "@/lib/pages/staticPages";
import { buildSitemapEntries } from "@/lib/shared/sitemap";

// Required so `output: "export"` can write sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries(SITE_CONFIG.url, PART_A_ROUTES, new Date());
}
