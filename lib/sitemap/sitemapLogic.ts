import { PUBLISHED_PATHS, RECENT_LIMIT, UPDATED_ON } from "./sitemapConstants";
import type { FilteredSection, Intent, PageGroup, PageStatus, SitePage, SiteSection, StatusFilter } from "./sitemapTypes";

const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** True for a real calendar date written as YYYY-MM-DD. */
function isIsoDate(value: string): boolean {
  if (!ISO_PATTERN.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/** Whether a page is published, using the one list of live paths. */
export function getPageStatus(path: string, published: ReadonlySet<string> = PUBLISHED_PATHS): PageStatus {
  return published.has(path) ? "live" : "soon";
}

/** Every page in the registry, home first, in reading order. */
export function flattenPages(home: SitePage, sections: readonly SiteSection[]): SitePage[] {
  return [home, ...sections.flatMap((section) => section.groups.flatMap((group) => group.pages))];
}

export interface SitemapCounts {
  total: number;
  live: number;
  soon: number;
  sections: number;
}

/** Totals for the stat tiles. */
export function countPages(home: SitePage, sections: readonly SiteSection[], published: ReadonlySet<string> = PUBLISHED_PATHS): SitemapCounts {
  const pages = flattenPages(home, sections);
  const live = pages.filter((page) => published.has(page.path)).length;
  return { total: pages.length, live, soon: pages.length - live, sections: sections.length };
}

function pageSearchText(page: SitePage, group: PageGroup, section: SiteSection): string {
  return [page.title, page.description, page.path, group.title, section.title].join(" ").toLowerCase();
}

/**
 * Filters sections by search words (every word must match) and by status.
 * Groups and sections with nothing left are dropped.
 */
export function filterSections(
  sections: readonly SiteSection[],
  query: string,
  status: StatusFilter,
  published: ReadonlySet<string> = PUBLISHED_PATHS,
): FilteredSection[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const result: FilteredSection[] = [];
  for (const section of sections) {
    const groups: PageGroup[] = [];
    for (const group of section.groups) {
      const pages = group.pages.filter(
        (page) =>
          (status === "all" || getPageStatus(page.path, published) === status) &&
          words.every((word) => pageSearchText(page, group, section).includes(word)),
      );
      if (pages.length > 0) groups.push({ ...group, pages });
    }
    if (groups.length > 0) result.push({ section, groups });
  }
  return result;
}

/** Number of pages in a filtered result. */
export function countFiltered(filtered: readonly FilteredSection[]): number {
  return filtered.reduce((sum, entry) => sum + entry.groups.reduce((inner, group) => inner + group.pages.length, 0), 0);
}

export interface RecentPage {
  page: SitePage;
  updatedIso: string;
}

/** Published pages with an update date, newest first. */
export function getRecentlyUpdated(
  pages: readonly SitePage[],
  updatedOn: Readonly<Record<string, string>> = UPDATED_ON,
  limit: number = RECENT_LIMIT,
): RecentPage[] {
  return pages
    .filter((page) => updatedOn[page.path] !== undefined)
    .map((page) => ({ page, updatedIso: updatedOn[page.path] }))
    .sort((a, b) => (a.updatedIso < b.updatedIso ? 1 : a.updatedIso > b.updatedIso ? -1 : a.page.title.localeCompare(b.page.title)))
    .slice(0, limit);
}

/** Looks up an intent by id. */
export function findIntent(intents: readonly Intent[], id: string): Intent | undefined {
  return intents.find((intent) => intent.id === id);
}

/** Looks up a page by path. */
export function findPage(pages: readonly SitePage[], path: string): SitePage | undefined {
  return pages.find((page) => page.path === path);
}

/** Entries for sitemap.xml: published pages only. */
export function getXmlEntries(
  pages: readonly SitePage[],
  published: ReadonlySet<string> = PUBLISHED_PATHS,
  updatedOn: Readonly<Record<string, string>> = UPDATED_ON,
): { path: string; lastModifiedIso?: string }[] {
  return pages.filter((page) => published.has(page.path)).map((page) => ({ path: page.path, lastModifiedIso: updatedOn[page.path] }));
}

/** Problems that would break the page or lie to a reader. Empty means valid. */
export function validateSitemap(
  home: SitePage,
  sections: readonly SiteSection[],
  intents: readonly Intent[],
  published: ReadonlySet<string> = PUBLISHED_PATHS,
  updatedOn: Readonly<Record<string, string>> = UPDATED_ON,
): string[] {
  const errors: string[] = [];
  const pages = flattenPages(home, sections);
  const paths = new Set<string>();

  for (const page of pages) {
    if (paths.has(page.path)) errors.push(`${page.path}: listed twice`);
    paths.add(page.path);
    if (page.path !== "/" && (!page.path.startsWith("/") || page.path.endsWith("/"))) errors.push(`${page.path}: must start with / and not end with /`);
    if (page.title.trim() === "" || page.description.trim() === "") errors.push(`${page.path}: title and description are required`);
    if (page.level !== undefined && page.path.startsWith("/learn/")) {
      const folder = ["foundations", "practitioner", "power-user", "expert"][page.level - 1];
      if (page.path.split("/")[2] !== folder) errors.push(`${page.path}: level ${page.level} does not match its folder`);
    }
  }
  for (const section of sections) {
    if (!paths.has(section.hubPath)) errors.push(`${section.id}: hub ${section.hubPath} is not in the registry`);
  }
  for (const path of published) {
    if (!paths.has(path)) errors.push(`${path}: marked published but not in the registry`);
  }
  for (const [path, date] of Object.entries(updatedOn)) {
    if (!published.has(path)) errors.push(`${path}: has an update date but is not published`);
    if (!isIsoDate(date)) errors.push(`${path}: update date is not real`);
  }
  const intentIds = new Set<string>();
  for (const intent of intents) {
    if (intentIds.has(intent.id)) errors.push(`${intent.id}: duplicate intent`);
    intentIds.add(intent.id);
    if (!paths.has(intent.path)) errors.push(`${intent.id}: points to ${intent.path}, which is not in the registry`);
  }
  return errors;
}