import type { PageKind, PageLevel } from "./sitemapTypes";

/**
 * Paths that are published. Add a path here the day its page goes live.
 * Everything else in the registry shows as "coming soon" and is left out of sitemap.xml.
 */
export const PUBLISHED_PATHS: ReadonlySet<string> = new Set([
  "/prices/free-limits",
  "/society/industries-changing-most",
  "/news/changelog",
  "/news/eu-ai-act",
  "/sitemap",
]);

/** Last meaningful update per published page (YYYY-MM-DD). Only published pages may appear here. */
export const UPDATED_ON: Readonly<Record<string, string>> = {
  "/prices/free-limits": "2026-10-21",
  "/society/industries-changing-most": "2026-10-25",
  "/news/changelog": "2026-10-25",
  "/news/eu-ai-act": "2026-10-25",
  "/sitemap": "2026-10-25",
};

export const RECENT_LIMIT = 5;

export const LEVEL_LABELS: Record<PageLevel, string> = {
  1: "Level 1 · Foundations",
  2: "Level 2 · Practitioner",
  3: "Level 3 · Power user",
  4: "Level 4 · Expert",
};

export const LEVEL_BLURBS: Record<PageLevel, string> = {
  1: "You have never used AI, or only played with it. Start here.",
  2: "You use AI at work or school and want better results.",
  3: "You care about settings, costs, tools and how things work.",
  4: "You build, test, secure or regulate AI.",
};

export const KIND_LABELS: Record<PageKind, string> = {
  hub: "Hub",
  article: "Guide",
  review: "Review",
  comparison: "Comparison",
  data: "Data table",
  tool: "Free tool",
  news: "News",
  trust: "Trust",
  legal: "Legal",
  utility: "Utility",
  money: "Support the site",
};

export const SEARCH_PLACEHOLDER = "Search all pages, for example prices, EU, coding, scams";
export const XML_SITEMAP_PATH = "/sitemap.xml";