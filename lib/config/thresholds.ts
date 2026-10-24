/** Named constants so no magic numbers live in logic files (Blueprint 4.6). */

/** How often search engines should re-crawl a page, as listed in sitemap.xml. */
export const SITEMAP_CHANGE_FREQUENCY = "weekly" as const;

/** Sitemap priority of the home page. */
export const SITEMAP_PRIORITY_HOME = 1;

/** Sitemap priority of every other page. */
export const SITEMAP_PRIORITY_DEFAULT = 0.7;
