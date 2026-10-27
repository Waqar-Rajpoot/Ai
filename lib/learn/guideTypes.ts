/**
 * Shared types for guide articles. Guides are content (data), not code:
 * every article is one typed record, rendered by the same layout.
 */

/** Learning level a guide belongs to. Extend as later levels are published. */
export type GuideLevel = "foundations" | "practitioner" | "power-user" | "expert";

/** Label shown on cards and at the top of the page. "opinion" guides also show an opinion note. */
export type GuideKind = "guide" | "safety" | "opinion";

/** Who published the source. Vendor-reported claims are labelled as such on the page. */
export type SourceKind =
  | "government"
  | "intergovernmental"
  | "vendor-reported"
  | "research"
  | "university-guide";

/** One official source behind a claim. Every source carries a verification date. */
export interface GuideSource {
  readonly id: string;
  readonly title: string;
  readonly publisher: string;
  readonly url: string;
  readonly kind: SourceKind;
  /** ISO date (YYYY-MM-DD) when a person last opened the page and confirmed the claims that cite it. */
  readonly verifiedOn: string;
}

/** One numbered step in a how-to section. */
export interface GuideStep {
  readonly title: string;
  readonly detail: string;
}

/** A small comparison table. Keep it to three or four columns so it reads on a phone. */
export interface GuideTable {
  readonly caption: string;
  readonly columns: readonly string[];
  readonly rows: readonly (readonly string[])[];
}

/** One section of an article. Every field except `id` and `heading` is optional. */
export interface GuideSection {
  readonly id: string;
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly string[];
  readonly steps?: readonly GuideStep[];
  readonly table?: GuideTable;
  /** Ids from the guide's `sources` list that support this section. */
  readonly sourceIds?: readonly string[];
}

/** A prompt readers can copy. It must never ask the reader to paste private information. */
export interface CopyPrompt {
  readonly id: string;
  /** Optional heading used to group prompts, for example "Study" or "Work". */
  readonly group?: string;
  readonly title: string;
  readonly whenToUse: string;
  readonly text: string;
}

/** A link to an existing page on this site. */
export interface GuideLink {
  readonly label: string;
  readonly href: string;
}

/** One complete article. */
export interface GuideRecord {
  readonly slug: string;
  /** Position in the 30-article blueprint. */
  readonly number: number;
  readonly level: GuideLevel;
  readonly kind: GuideKind;
  readonly title: string;
  /** Meta description, 90 to 160 characters (see `GUIDE_RULES`). */
  readonly metaDescription: string;
  /** One sentence shown on hub cards. */
  readonly cardSummary: string;
  /** Two to four short points shown in the summary box. */
  readonly summaryPoints: readonly string[];
  readonly sections: readonly GuideSection[];
  readonly prompts: readonly CopyPrompt[];
  /** The "what can go wrong" box. */
  readonly whatCanGoWrong: readonly string[];
  /** Plain-language limits note for health, money, legal or privacy topics. */
  readonly limitsNote?: string;
  /** Show the standard "prices and features change" line. */
  readonly showPriceNotice?: boolean;
  readonly sources: readonly GuideSource[];
  /** Slugs of other guides to list under "Related". */
  readonly relatedSlugs: readonly string[];
  /** Links to tables, tools or hubs elsewhere on the site. */
  readonly relatedLinks: readonly GuideLink[];
  /** ISO date (YYYY-MM-DD) of the last editorial review. */
  readonly lastReviewed: string;
  /** Only published guides get a page and a live card. Unpublished ones show "Coming soon". */
  readonly published: boolean;
}

/** The small subset of a guide that hub cards need. */
export interface GuideCardData {
  readonly slug: string;
  readonly href: string;
  readonly title: string;
  readonly summary: string;
  readonly kind: GuideKind;
  readonly readMinutes: number;
  readonly published: boolean;
}
