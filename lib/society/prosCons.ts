import type { GuideLink } from "./tenPlaces";

export type ThemeId =
  | "time-productivity"
  | "learning-access"
  | "accuracy"
  | "privacy"
  | "fairness"
  | "jobs"
  | "trust-safety"
  | "environment"
  | "skills-dependence";

/** An editorial judgement of the net picture today. It is not a measurement. */
export type BalanceLabel = "helps-when-checked" | "mixed" | "needs-care" | "too-early";
export type EvidenceLevel = "well-supported" | "mixed" | "early";
export type BalanceFilter = BalanceLabel | "all";
export type AnchorFigureId = "electricity" | "jobs";

export interface ProsConsTheme {
  id: ThemeId;
  title: string;
  question: string;
  balance: BalanceLabel;
  evidence: EvidenceLevel;
  evidenceNote: string;
  pros: readonly string[];
  cons: readonly string[];
  mostAffected: string;
  whatYouCanDo: string;
  /** The "go deeper" layer, shown when the reader switches to Technical. */
  technicalNote: string;
  anchorFigureId?: AnchorFigureId;
  guide?: GuideLink;
}

export interface BalanceFilterOption {
  id: BalanceFilter;
  label: string;
  count: number;
}

export const BALANCE_ORDER: readonly BalanceLabel[] = ["helps-when-checked", "mixed", "needs-care", "too-early"];

export const BALANCE_LABELS: Record<BalanceLabel, string> = {
  "helps-when-checked": "Helps when you check it",
  mixed: "Mixed",
  "needs-care": "Needs care",
  "too-early": "Too early to say",
};

export const BALANCE_MEANINGS: Record<BalanceLabel, string> = {
  "helps-when-checked": "Clear gains for most people, as long as you review the output.",
  mixed: "Real gains and real costs of similar weight, and it depends on how and where it is used.",
  "needs-care": "Real benefits exist, but the risks are well documented and need active habits or rules.",
  "too-early": "Named evidence is thin, early or points in different directions.",
};

export const EVIDENCE_LABELS: Record<EvidenceLevel, string> = {
  "well-supported": "Well supported",
  mixed: "Mixed evidence",
  early: "Early evidence",
};

/** Themes with this balance. "all" returns every theme. Returns a new array. */
export function filterThemes(themes: readonly ProsConsTheme[], filter: BalanceFilter): ProsConsTheme[] {
  if (filter === "all") return [...themes];
  return themes.filter((theme) => theme.balance === filter);
}

export function countByBalance(themes: readonly ProsConsTheme[]): Record<BalanceLabel, number> {
  const counts: Record<BalanceLabel, number> = { "helps-when-checked": 0, mixed: 0, "needs-care": 0, "too-early": 0 };
  for (const theme of themes) counts[theme.balance] += 1;
  return counts;
}

/** Filter buttons: "All" first, then each balance label that has at least one theme. */
export function buildBalanceFilterOptions(themes: readonly ProsConsTheme[]): BalanceFilterOption[] {
  const counts = countByBalance(themes);
  const options: BalanceFilterOption[] = [{ id: "all", label: "All themes", count: themes.length }];
  for (const balance of BALANCE_ORDER) {
    if (counts[balance] > 0) options.push({ id: balance, label: BALANCE_LABELS[balance], count: counts[balance] });
  }
  return options;
}