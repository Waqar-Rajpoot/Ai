/** Whether the page is published. Planned pages are shown as text with a "coming soon" tag. */
export type PageStatus = "live" | "soon";

export type PageKind =
  | "hub"
  | "article"
  | "review"
  | "comparison"
  | "data"
  | "tool"
  | "news"
  | "trust"
  | "legal"
  | "utility"
  | "money";

/** Reading level of a Learn page: 1 foundations, 2 practitioner, 3 power user, 4 expert. */
export type PageLevel = 1 | 2 | 3 | 4;

/** One page on the site. */
export interface SitePage {
  path: string;
  title: string;
  description: string;
  kind: PageKind;
  level?: PageLevel;
}

/** A named cluster of pages inside a section. */
export interface PageGroup {
  id: string;
  title: string;
  note?: string;
  pages: SitePage[];
}

/** One of the seven areas of the site. */
export interface SiteSection {
  id: string;
  title: string;
  hubPath: string;
  summary: string;
  groups: PageGroup[];
}

/** "I want to ..." shortcut to one page. */
export interface Intent {
  id: string;
  label: string;
  path: string;
  why: string;
}

/** A section as shown after filtering. */
export interface FilteredSection {
  section: SiteSection;
  groups: PageGroup[];
}

export type StatusFilter = "all" | PageStatus;