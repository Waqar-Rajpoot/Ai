import type { ChangeKind, Confidence } from "./changelogTypes";

export const CORRECTIONS_HREF = "/about/corrections";
export const SOURCE_POLICY_HREF = "/about/source-policy";

/** Browser storage key holding the last day the reader opened the changelog. */
export const LAST_VISIT_STORAGE_KEY = "changelog:lastVisitIso";

/** Entries newer than this many days get a "recent" feel in the stats. */
export const RECENT_DAYS = 14;

/** Order of the filter chips. */
export const KIND_ORDER: readonly ChangeKind[] = ["source-conflict", "data-refresh", "update", "new-page", "correction"];

export const KIND_LABELS: Record<ChangeKind, string> = {
  "source-conflict": "Source conflict",
  "data-refresh": "Numbers refreshed",
  update: "Page updated",
  "new-page": "New page",
  correction: "Correction",
};

export const KIND_HELP: Record<ChangeKind, string> = {
  "source-conflict": "Two sources disagreed. We say which one we used and how sure we are.",
  "data-refresh": "A figure was checked again and changed or confirmed.",
  update: "Wording, structure or advice on a page changed.",
  "new-page": "A page was added.",
  correction: "We got something wrong and fixed it. Every one is in the corrections log.",
};

export const CONFIDENCE_LABELS: Record<Confidence, string> = {
  confirmed: "Confirmed",
  leaning: "Leaning, not confirmed",
  unsure: "Unsure",
};

export const SEARCH_PLACEHOLDER = "Search, for example Gemini, EU, Luna";