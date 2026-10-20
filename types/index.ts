/** Learning level carried by every guide, review and tool. */
export type Level = 1 | 2 | 3 | 4;

/** Badge in a page header: a learning level or a page-kind label. */
export type PageBadge = Level | "all-levels" | "trust" | "legal" | "utility";

/** Kind of content a page holds (Blueprint section 7.1). */
export type ContentType =
  | "guide"
  | "safety"
  | "opinion"
  | "explainer"
  | "comparison"
  | "roundup"
  | "head-to-head"
  | "review"
  | "news"
  | "tool"
  | "data";

/** Freshness labels shown beside dates and numbers (Blueprint 6.2). */
export type FreshnessLabel =
  | "verified-on"
  | "tested-on"
  | "vendor-reported"
  | "superseded";

/** A navigation or footer link, optionally with dropdown children. */
export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly children?: readonly NavLink[];
}

/** A titled group of footer links. */
export interface FooterGroup {
  readonly title: string;
  readonly links: readonly NavLink[];
}

/** One step in the breadcrumb trail. */
export interface BreadcrumbItem {
  readonly label: string;
  readonly href: string;
}

/** A link with an optional one-line description, shown in link lists. */
export interface LinkItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
}

/** An H2 heading with the H3 sub-headings that sit under it. */
export interface PageSection {
  readonly heading: string;
  readonly subheadings?: readonly string[];
}

/** Outline of a hand-built page (trust, legal and utility pages). */
export interface StaticPageDefinition {
  readonly title: string;
  readonly route: string;
  readonly description: string;
  readonly badge: PageBadge;
  readonly sections: readonly PageSection[];
  /** Show the contact email from site config under the sections. */
  readonly showContactEmail?: boolean;
}
