import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/siteConfig";
import { HOME_PAGE, SECTIONS } from "@/lib/sitemap/sitemapData";
import { flattenPages, getXmlEntries } from "@/lib/sitemap/sitemapLogic";

export const dynamic = "force-static";

/** sitemap.xml: published pages only, with their last update date when known. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  return getXmlEntries(flattenPages(HOME_PAGE, SECTIONS)).map((entry) => ({
    url: `${base}${entry.path === "/" ? "" : entry.path}`,
    lastModified: entry.lastModifiedIso,
  }));
}