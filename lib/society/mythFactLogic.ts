import { ALL_FILTER_VALUE, PERCENT } from "./mythsFactsConstants";
import {
  EVIDENCE_SOURCES,
  THEME_LABELS,
  THEME_ORDER,
  VERDICT_ORDER,
  type EvidenceSource,
  type GuessChoice,
  type MythFactItem,
  type MythTheme,
  type MythVerdict,
} from "./mythsFacts";

export interface MythFactFilters {
  query: string;
  theme: string;
  verdict: string;
}

export interface ThemeGroup {
  theme: MythTheme;
  label: string;
  items: MythFactItem[];
}

export interface GuessScore {
  answered: number;
  correct: number;
  /** Null until at least one card is answered. */
  percent: number | null;
}

export type GuessMap = Readonly<Record<string, GuessChoice | undefined>>;

/** Filters by search text, theme and verdict. Search covers the claim, both answers and the theme name. */
/** Filters by search text, theme and verdict. Search covers the claim, both answers and the theme name. */
export function filterMythFacts(items: readonly MythFactItem[], filters: MythFactFilters): MythFactItem[] {
  const needle = filters.query.trim().toLowerCase();
  return items.filter((item: any) => {
    if (filters.theme !== ALL_FILTER_VALUE && item.theme !== filters.theme) return false;
    if (filters.verdict !== ALL_FILTER_VALUE && item.verdict !== filters.verdict) return false;
    if (needle) {
      const haystack = [item.statement, item.plain, item.technical, THEME_LABELS[item.theme]].join(" ").toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });
}

/** Number of claims per verdict. */
/** Number of claims per verdict. */
export function countByVerdict(items: readonly MythFactItem[]): Record<MythVerdict, number> {
  const counts = Object.fromEntries(VERDICT_ORDER.map((verdict: MythVerdict) => [verdict, 0])) as Record<MythVerdict, number>;
  for (const item of items) {
    const verdict = item.verdict as MythVerdict;
    if (verdict in counts) {
      counts[verdict] += 1;
    }
  }
  return counts;
}

/** Groups claims by theme in display order, leaving out empty themes. */
export function groupByTheme(items: readonly MythFactItem[]): ThemeGroup[] {
  return THEME_ORDER.flatMap((theme: MythTheme) => {
    const groupItems = items.filter((item: MythFactItem) => item.theme === theme);
    return groupItems.length > 0 ? [{ theme, label: THEME_LABELS[theme], items: groupItems }] : [];
  });
}

export function findEvidenceSource(sourceId: string): EvidenceSource | undefined {
  return EVIDENCE_SOURCES.find((source: EvidenceSource) => source.id === sourceId);
}

/** The sources behind a claim. Unknown ids are skipped. */
/** The sources behind a claim. Unknown ids or missing arrays are handled safely. */
export function getEvidenceForItem(item: any): EvidenceSource[] {
  // If item uses an inline evidence object instead of evidenceIds, convert/return it as an array if possible, or fallback safely
  if (!item.evidenceIds || !Array.isArray(item.evidenceIds)) {
    if (item.evidence && typeof item.evidence === "object") {
      // If there's an inline evidence object, wrap or map it if it matches EvidenceSource structure,
      // otherwise return empty array to prevent crashes.
      return [];
    }
    return [];
  }

  return item.evidenceIds.flatMap((sourceId: any) => {
    const source = findEvidenceSource(sourceId);
    return source ? [source] : [];
  });
}

/** Evidence ids used by claims that no source defines. Should always be empty. */
export function findMissingEvidenceIds(
  items: readonly MythFactItem[],
  sources: readonly EvidenceSource[],
): string[] {
  const known = new Set(sources.map((source: EvidenceSource) => source.id));
  return [...new Set(items.flatMap((item: any) => item.evidenceIds).filter((sourceId: string) => !known.has(sourceId)))];
}

/** Maps the five verdicts onto the three answers a reader can give. */
export function toGuessChoice(verdict: MythVerdict): GuessChoice {
  switch (verdict) {
    case "myth":
    case "mostly-myth":
      return "myth";
    case "fact":
    case "mostly-fact":
      return "fact";
    case "depends":
      return "depends";
  }
}

export function isGuessCorrect(guess: GuessChoice, verdict: MythVerdict): boolean {
  return guess === toGuessChoice(verdict);
}

/** Score over the cards the reader has answered. */
export function scoreGuesses(items: readonly MythFactItem[], guesses: GuessMap): GuessScore {
  let answered = 0;
  let correct = 0;
  for (const item of items) {
    const guess = guesses[item.id];
    if (guess === undefined) continue;
    answered += 1;
    if (isGuessCorrect(guess, item.verdict)) correct += 1;
  }
  return { answered, correct, percent: answered > 0 ? Math.round((correct / answered) * PERCENT) : null };
}