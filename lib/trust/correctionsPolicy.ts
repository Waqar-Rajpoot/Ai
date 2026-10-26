import { FIX_TARGET_DAYS_HIGH, FIX_TARGET_DAYS_MINOR, FIX_TARGET_DAYS_STANDARD } from "./correctionsConstants";

export type CorrectionSeverity = "high" | "standard" | "minor";
export type CorrectionStatus = "fixed" | "declined" | "open";
export type CorrectionFoundBy = "reader" | "our-review" | "company";

export interface SeverityLevel {
  id: CorrectionSeverity;
  label: string;
  meaning: string;
  examples: readonly string[];
  fixTargetDays: number;
}

/** Ordered from most to least urgent. */
export const SEVERITY_LEVELS: readonly SeverityLevel[] = [
  {
    id: "high",
    label: "High",
    meaning: "Could lead a reader to lose money, expose private data or come to harm.",
    examples: [
      "A wrong price, limit or renewal date that could cost someone money",
      "Advice that weakens privacy or safety, such as in the AI safety checklist",
      "A claim that wrongly accuses a person or company",
    ],
    fixTargetDays: FIX_TARGET_DAYS_HIGH,
  },
  {
    id: "standard",
    label: "Standard",
    meaning: "A wrong fact, number, date, label, score or recommendation.",
    examples: [
      "A figure that does not match its source",
      "A vendor-reported number shown as independent",
      "A model or plan shown as current after it was replaced",
    ],
    fixTargetDays: FIX_TARGET_DAYS_STANDARD,
  },
  {
    id: "minor",
    label: "Minor",
    meaning: "Unclear, awkward or broken, but no one is misled about a fact.",
    examples: [
      "A broken link",
      "A confusing sentence",
      "A table that is hard to read on a phone",
    ],
    fixTargetDays: FIX_TARGET_DAYS_MINOR,
  },
];

export const SEVERITY_LABELS: Record<CorrectionSeverity, string> = {
  high: "High",
  standard: "Standard",
  minor: "Minor",
};

export const STATUS_LABELS: Record<CorrectionStatus, string> = {
  fixed: "Fixed",
  declined: "Declined, with reasons",
  open: "Open",
};

export const FOUND_BY_LABELS: Record<CorrectionFoundBy, string> = {
  reader: "Reader report",
  "our-review": "Our own review",
  company: "Company named on the site",
};

export function isCorrectionSeverity(value: string): value is CorrectionSeverity {
  return value === "high" || value === "standard" || value === "minor";
}

export function isCorrectionStatus(value: string): value is CorrectionStatus {
  return value === "fixed" || value === "declined" || value === "open";
}

/** Days we aim to take to fix an error of the given severity. */
export function fixTargetDaysFor(severity: CorrectionSeverity): number {
  switch (severity) {
    case "high":
      return FIX_TARGET_DAYS_HIGH;
    case "standard":
      return FIX_TARGET_DAYS_STANDARD;
    case "minor":
      return FIX_TARGET_DAYS_MINOR;
  }
}