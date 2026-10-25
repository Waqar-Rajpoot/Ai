import type { NewsLevel } from "./news";

/** Blueprint 5.0 result labels. Vendor numbers are never presented as ours. */
export type ClaimLabel = "tested" | "independent" | "vendor-reported";
export type ReviewStatus = "none" | "test-scheduled" | "review-published";

export const CLAIM_LABEL_TEXT: Record<ClaimLabel, string> = {
  tested: "Tested by us",
  independent: "Independent third party",
  "vendor-reported": "Vendor-reported",
};

export const REVIEW_STATUS_TEXT: Record<ReviewStatus, string> = {
  none: "No review planned yet",
  "test-scheduled": "Our test is scheduled",
  "review-published": "Review published",
};

export interface RoundupRelease {
  id: string;
  model: string;
  maker: string;
  /** What changed, in one short paragraph. */
  summary: string;
  claimLabel: ClaimLabel;
  /** Price and the date it was verified, or null if no price is stated. */
  priceNote: string | null;
  contextNote: string | null;
  forBeginners: string;
  forPowerUsers: string;
  reviewStatus: ReviewStatus;
  releasePostHref: string | null;
  /** Blueprint: every release links to its directory row. */
  directoryHref: string | null;
  reviewHref: string | null;
}

export interface RoundupPriceChange {
  id: string;
  provider: string;
  subject: string;
  before: string;
  after: string;
  /** ISO date (YYYY-MM-DD). */
  effectiveOn: string;
  /** The provider's own page, or null if none was opened. */
  sourceUrl: string | null;
  /** ISO date the provider's page was checked. */
  verifiedOn: string;
  whatItMeans: string;
}

export interface RoundupPolicyItem {
  id: string;
  title: string;
  whatHappened: string;
  whatItMeans: string;
  /** ISO date of the event. */
  occurredOn: string;
  sourceName: string;
  sourceUrl: string | null;
  guideHref: string;
  guideLabel: string;
}

export interface RoundupDateNote {
  id: string;
  /** ISO date (YYYY-MM-DD), read as UTC. */
  isoDate: string;
  title: string;
  detail: string;
  href: string;
}

export interface RoundupSponsor {
  name: string;
  message: string;
  url: string | null;
}

export interface RoundupCorrection {
  /** ISO date the correction was made. */
  onDate: string;
  text: string;
}

export interface WeeklyRoundup {
  /** URL slug, lowercase words joined by hyphens. */
  slug: string;
  title: string;
  /** ISO date. */
  publishedOn: string;
  /** ISO date the facts were checked. Must not be after publishedOn. */
  verifiedOn: string;
  /** Null shows the site's default author label. */
  author: string | null;
  levels: readonly NewsLevel[];
  /** One or two sentences for the summary box. */
  summary: string;
  highlights: readonly string[];
  releases: readonly RoundupRelease[];
  priceChanges: readonly RoundupPriceChange[];
  policyItems: readonly RoundupPolicyItem[];
  /** A snapshot. Paste literal values for real roundups so history never shifts. */
  nextWeek: readonly RoundupDateNote[];
  sponsor: RoundupSponsor | null;
  hasAffiliateLinks: boolean;
  corrections: readonly RoundupCorrection[];
  /** Sample layouts are noindexed and never listed in the archive. */
  isSample: boolean;
}