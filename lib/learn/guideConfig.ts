import type { GuideKind, GuideLevel, GuideLink, SourceKind } from "./guideTypes";

/** Route prefix for each learning level. */
export const LEVEL_BASE_PATHS: Record<GuideLevel, string> = {
  foundations: "/learn/foundations",
  practitioner: "/learn/practitioner",
  "power-user": "/learn/power-user",
  expert: "/learn/expert",
};

/** Reader-facing name of each learning level. */
export const LEVEL_LABELS: Record<GuideLevel, string> = {
  foundations: "Foundations",
  practitioner: "Practitioner",
  "power-user": "Power user",
  expert: "Expert",
};

/** Position of each level in the learning path, shown as "Level N". */
export const LEVEL_NUMBERS: Record<GuideLevel, number> = {
  foundations: 1,
  practitioner: 2,
  "power-user": 3,
  expert: 4,
};

/**
 * Site pages that guides link to but that are not guides. Change a path here
 * once and every guide follows. Paths for the comparison and roundup pages are
 * assumptions: set them to the real routes when those pages exist.
 */
export const LINKED_PAGES = {
  chatbotComparison: { label: "ChatGPT vs Claude vs Gemini vs Grok", href: "/compare/chatgpt-vs-claude-vs-gemini-vs-grok" },
  bestModelByJob: { label: "Best AI model right now, by job", href: "/best/ai-model-by-job" },
  bestToolsForStudents: { label: "Best AI tools for students", href: "/best/ai-tools-for-students" },
  consumerPlans: { label: "Consumer plan table", href: "/prices/plans" },
  freePlanLimits: { label: "Free-plan limits", href: "/prices/free-limits" },
  costCalculator: { label: "Subscription cost calculator", href: "/tools/subscription-cost-calculator" },
  safetyChecklist: { label: "AI safety checklist", href: "/tools/ai-safety-checklist" },
  promptLibrary: { label: "Prompt library", href: "/tools/prompt-library" },
  privacyMatrix: { label: "Privacy matrix", href: "/prices/privacy" },
} as const satisfies Record<string, GuideLink>;

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
  opinion: "Opinion",
};

/** Shown on opinion guides so readers can tell a judgement from a fact. */
export const OPINION_NOTE_TEXT =
  "This guide is our opinion, based on the sources listed below. We have not run our own benchmark tests, and we say so wherever a claim comes from a published study.";

/** Reader-facing labels for source kinds, so vendor claims are always visible as such. */
export const SOURCE_KIND_LABELS: Record<SourceKind, string> = {
  government: "Government",
  intergovernmental: "Intergovernmental",
  "vendor-reported": "Vendor-reported",
  research: "Research",
  "university-guide": "University library guide",
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
