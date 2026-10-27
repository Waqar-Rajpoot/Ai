import type { GuideKind, GuideLevel, SourceKind } from "./guideTypes";

/** Route prefix for each learning level. */
export const LEVEL_BASE_PATHS: Record<GuideLevel, string> = {
  foundations: "/learn/foundations",
  practitioner: "/learn/practitioner",
  "power-user": "/learn/power-user",
  expert: "/learn/expert",
};

/** Reading speed used to estimate "N min read". */
export const WORDS_PER_MINUTE = 200;

/**
 * Byline shown under each title. Replace with the real author or team name
 * (author and last-reviewed date are required on every guide).
 */
export const GUIDE_AUTHOR_LABEL = "AI Tools for Everyday People editorial team";

/** Standard line shown on pages that mention plans or features. */
export const PRICE_NOTICE_TEXT =
  "Prices and features change. Confirm on the provider's website before buying.";

/** Label shown on cards for guides that are not published yet. */
export const COMING_SOON_LABEL = "Coming soon";

/** Reader-facing labels for guide kinds. */
export const GUIDE_KIND_LABELS: Record<GuideKind, string> = {
  guide: "Guide",
  safety: "Safety",
};

/** Reader-facing labels for source kinds, so vendor claims are always visible as such. */
export const SOURCE_KIND_LABELS: Record<SourceKind, string> = {
  government: "Government",
  intergovernmental: "Intergovernmental",
  "vendor-reported": "Vendor-reported",
  research: "Research",
};

/** Heading and wording for the fixed boxes in the guide layout. */
export const GUIDE_LAYOUT_LABELS = {
  summary: "In short",
  prompts: "Copy-ready prompts",
  promptsHint:
    "Replace the [brackets] with general details. Never put passwords, account numbers or other people's private details in a prompt.",
  whatCanGoWrong: "What can go wrong",
  limits: "Limits of this guide",
  sources: "Sources and labels",
  related: "Related",
  copy: "Copy prompt",
  copied: "Copied",
  copyFailed: "Select the text and copy it",
} as const;

/** Content rules enforced by the checker script. Update here, not in the checker. */
export const GUIDE_RULES = {
  minSummaryPoints: 2,
  maxSummaryPoints: 4,
  minSections: 3,
  minSources: 2,
  minWrongItems: 2,
  metaDescriptionMin: 90,
  metaDescriptionMax: 160,
} as const;
