import type { GlossaryLevel, GlossaryLevelInfo, GlossaryTerm } from "./glossaryTerms";

export type GlossaryLevelFilter = GlossaryLevel | "all";

export interface GlossaryFilters {
  query: string;
  level: GlossaryLevelFilter;
}

export interface GlossaryLetterGroup {
  letter: string;
  terms: GlossaryTerm[];
}

export interface GlossaryLevelGroup {
  info: GlossaryLevelInfo;
  terms: GlossaryTerm[];
}

function compareByTerm(first: GlossaryTerm, second: GlossaryTerm): number {
  return first.term.localeCompare(second.term, "en", { sensitivity: "base" });
}

/** Keeps terms that match the level and whose name or definition contains the query. Result is A to Z. */
export function filterGlossaryTerms(terms: readonly GlossaryTerm[], filters: GlossaryFilters): GlossaryTerm[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return terms
    .filter((entry) => filters.level === "all" || entry.level === filters.level)
    .filter(
      (entry) =>
        normalizedQuery === "" ||
        entry.term.toLowerCase().includes(normalizedQuery) ||
        entry.definition.toLowerCase().includes(normalizedQuery),
    )
    .sort(compareByTerm);
}

/** Groups terms by first letter, in alphabetical order. Letters with no terms are left out. */
export function groupTermsByLetter(terms: readonly GlossaryTerm[]): GlossaryLetterGroup[] {
  const groupsByLetter = new Map<string, GlossaryTerm[]>();

  for (const entry of [...terms].sort(compareByTerm)) {
    const letter = entry.term.charAt(0).toUpperCase();
    groupsByLetter.set(letter, [...(groupsByLetter.get(letter) ?? []), entry]);
  }

  return [...groupsByLetter.entries()].map(([letter, groupedTerms]) => ({ letter, terms: groupedTerms }));
}

/** Groups terms by level, in level order, with each group's terms A to Z. Empty levels are left out. */
export function groupTermsByLevel(terms: readonly GlossaryTerm[], levels: readonly GlossaryLevelInfo[]): GlossaryLevelGroup[] {
  return levels
    .map((info) => ({ info, terms: terms.filter((entry) => entry.level === info.level).sort(compareByTerm) }))
    .filter((group) => group.terms.length > 0);
}