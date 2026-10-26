export type SourceTypeId =
  | "provider-page"
  | "original-publisher"
  | "independent-evaluator"
  | "own-test"
  | "secondary-blog"
  | "evaluator-no-method"
  | "social-or-forum"
  | "ai-answer"
  | "unsourced-total";

export type ClaimTypeId =
  | "price-plan-limit"
  | "date-retirement"
  | "benchmark-score"
  | "privacy-safety-terms"
  | "statistic"
  | "law-or-rule";

/**
 * primary: can be the main source. supporting: backs a claim next to a primary source.
 * lead-only: helps find the primary source, never cited alone. not-used: not relied on at all.
 */
export type SourceUse = "primary" | "supporting" | "lead-only" | "not-used";

export interface SourceType {
  id: SourceTypeId;
  label: string;
  description: string;
  /** Level in the hierarchy (1 to 4), or null when the source sits outside it. */
  rank: number | null;
  /** True when "I opened the original page" matters. False for our own test runs. */
  requiresOpenedOriginal: boolean;
}

export interface ClaimType {
  id: ClaimTypeId;
  label: string;
  /** What to check before relying on a source for this kind of claim. */
  checks: readonly string[];
  /** Where to look next when the source in hand cannot answer the claim. */
  primaryPointer: string;
}

export interface UseCopy {
  headline: string;
  meaning: string;
}

export interface CheckerExample {
  id: string;
  title: string;
  sourceTypeId: SourceTypeId;
  claimTypeId: ClaimTypeId;
  isDated: boolean;
  openedOriginal: boolean;
}

/** Ordered from highest level to outside the hierarchy. */
export const SOURCE_TYPES: readonly SourceType[] = [
  { id: "provider-page", label: "The provider's own page", description: "A maker's pricing, model or documentation page, or its launch post.", rank: 1, requiresOpenedOriginal: true },
  { id: "original-publisher", label: "The original publisher of a statistic or rule", description: "An official tracker, a named survey's own page, or the official text of a law.", rank: 1, requiresOpenedOriginal: true },
  { id: "independent-evaluator", label: "An independent evaluator that publishes its method", description: "A benchmark aggregator or human-preference arena that shows how it tests.", rank: 2, requiresOpenedOriginal: true },
  { id: "own-test", label: "Our own test run", description: "Our test battery, with the date, model version and settings recorded.", rank: 3, requiresOpenedOriginal: false },
  { id: "secondary-blog", label: "A blog, roundup or news article", description: "A page that reports someone else's number.", rank: 4, requiresOpenedOriginal: true },
  { id: "evaluator-no-method", label: "A score site that does not show its method", description: "A leaderboard or ranking with no description of how it tests.", rank: null, requiresOpenedOriginal: true },
  { id: "social-or-forum", label: "A social post, forum thread or video", description: "Informal posts, including screenshots shared there.", rank: null, requiresOpenedOriginal: true },
  { id: "ai-answer", label: "An AI chatbot's answer or an AI-written summary", description: "Text a model produced, with or without links.", rank: null, requiresOpenedOriginal: true },
  { id: "unsourced-total", label: "A statistic with no named publisher, date or method", description: "A figure repeated widely with no origin.", rank: null, requiresOpenedOriginal: true },
];

export const CLAIM_TYPES: readonly ClaimType[] = [
  {
    id: "price-plan-limit",
    label: "A price, plan or usage limit",
    checks: ["Which plan, country and billing period it applies to.", "The date you opened the page.", "Whether the price is an introductory rate with an end date."],
    primaryPointer: "the provider's pricing page for that plan and country",
  },
  {
    id: "date-retirement",
    label: "A date, release or retirement",
    checks: ["Which platform the date applies to: the maker's API, an app or a cloud platform.", "Whether the date is firm, earliest or a floor.", "The date you opened the page."],
    primaryPointer: "the provider's deprecations or release page, or the cloud platform's own page",
  },
  {
    id: "benchmark-score",
    label: "A benchmark score",
    checks: ["The exact model version and effort setting.", "How many questions or votes lie behind the score, and any margin.", "Who produced it, so the right label is shown. Vendor and independent numbers never share a column."],
    primaryPointer: "the evaluator's own page, or a clearly labelled vendor announcement",
  },
  {
    id: "privacy-safety-terms",
    label: "Privacy, data or safety terms",
    checks: ["Which plan tier the terms apply to: terms differ by plan.", "The date of the policy you read.", "Whether settings, such as turning off training use, are described."],
    primaryPointer: "the provider's privacy and data-controls page for your plan",
  },
  {
    id: "statistic",
    label: "An adoption, jobs or energy statistic",
    checks: ["Who was counted, over what period and where.", "Whether it is a measurement or a forecast.", "The original publisher and the date of the release."],
    primaryPointer: "the original survey, tracker or report",
  },
  {
    id: "law-or-rule",
    label: "A law or rule",
    checks: ["The official text, not a summary.", "The date each part applies, and whether dates were revised.", "That a summary is not legal advice."],
    primaryPointer: "the official text of the law or the regulator's own page",
  },
];

const ALL_CLAIM_IDS: readonly ClaimTypeId[] = CLAIM_TYPES.map((claimType) => claimType.id);

function sameForAllClaims(use: SourceUse): Record<ClaimTypeId, SourceUse> {
  return Object.fromEntries(ALL_CLAIM_IDS.map((claimId) => [claimId, use])) as Record<ClaimTypeId, SourceUse>;
}

/** How each kind of source may be used for each kind of claim. Our reading of the source hierarchy. */
export const SOURCE_USE_MATRIX: Record<SourceTypeId, Record<ClaimTypeId, SourceUse>> = {
  "provider-page": {
    "price-plan-limit": "primary",
    "date-retirement": "primary",
    "benchmark-score": "primary",
    "privacy-safety-terms": "primary",
    statistic: "supporting",
    "law-or-rule": "supporting",
  },
  "original-publisher": {
    "price-plan-limit": "lead-only",
    "date-retirement": "lead-only",
    "benchmark-score": "lead-only",
    "privacy-safety-terms": "supporting",
    statistic: "primary",
    "law-or-rule": "primary",
  },
  "independent-evaluator": {
    "price-plan-limit": "lead-only",
    "date-retirement": "lead-only",
    "benchmark-score": "primary",
    "privacy-safety-terms": "lead-only",
    statistic: "lead-only",
    "law-or-rule": "lead-only",
  },
  "own-test": {
    "price-plan-limit": "lead-only",
    "date-retirement": "lead-only",
    "benchmark-score": "primary",
    "privacy-safety-terms": "supporting",
    statistic: "lead-only",
    "law-or-rule": "lead-only",
  },
  "secondary-blog": sameForAllClaims("lead-only"),
  "evaluator-no-method": sameForAllClaims("lead-only"),
  "social-or-forum": sameForAllClaims("lead-only"),
  "ai-answer": sameForAllClaims("not-used"),
  "unsourced-total": sameForAllClaims("not-used"),
};

/** The result label a score carries, by who produced it. */
export const SCORE_LABEL_BY_SOURCE: Partial<Record<SourceTypeId, string>> = {
  "provider-page": "Vendor-reported",
  "independent-evaluator": "Independent third party",
  "own-test": "Tested by us",
};

export const USE_COPY: Record<SourceUse, UseCopy> = {
  primary: { headline: "Can be the main source", meaning: "This source can stand alone for this kind of claim, as long as it is dated." },
  supporting: { headline: "Can support the claim", meaning: "Useful, but we would pair it with a primary source before publishing." },
  "lead-only": { headline: "A lead, not a source", meaning: "Use it to find the primary source. It is never the only source of a number." },
  "not-used": { headline: "We would not use it", meaning: "We do not rely on this, even as a lead, without independent confirmation." },
};

export const CHECKER_EXAMPLES: readonly CheckerExample[] = [
  { id: "blog-price", title: "A blog quoting a price", sourceTypeId: "secondary-blog", claimTypeId: "price-plan-limit", isDated: true, openedOriginal: true },
  { id: "pricing-page", title: "A provider's pricing page, opened today", sourceTypeId: "provider-page", claimTypeId: "price-plan-limit", isDated: true, openedOriginal: true },
  { id: "launch-chart", title: "A launch-post benchmark chart", sourceTypeId: "provider-page", claimTypeId: "benchmark-score", isDated: true, openedOriginal: true },
  { id: "chatbot-date", title: "A chatbot's answer about a date", sourceTypeId: "ai-answer", claimTypeId: "date-retirement", isDated: false, openedOriginal: true },
  { id: "survey-stat", title: "A named survey's own page", sourceTypeId: "original-publisher", claimTypeId: "statistic", isDated: true, openedOriginal: true },
];