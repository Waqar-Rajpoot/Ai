"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import {
  filterGlossaryTerms,
  groupTermsByLetter,
  groupTermsByLevel,
  type GlossaryLevelFilter,
} from "@/lib/learn/glossaryFilter";
import { GLOSSARY_LEVELS, GLOSSARY_TERMS, type GlossaryTerm } from "@/lib/learn/glossaryTerms";
import { GlossaryTermCard } from "./GlossaryTermCard";
import { LearnSection as Section } from "./LearnSection";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "./learnStyles";

type GlossaryViewMode = "level" | "alphabet";

const VIEW_MODES: readonly { id: GlossaryViewMode; label: string }[] = [
  { id: "level", label: "By level" },
  { id: "alphabet", label: "A to Z" },
];

const LEVEL_FILTERS: readonly { id: GlossaryLevelFilter; label: string }[] = [
  { id: "all", label: "All levels" },
  ...GLOSSARY_LEVELS.map((info: any) => ({ id: info.level, label: `Level ${info.level}` })),
];

const INPUT_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

function chipClass(isActive: boolean): string {
  const base = `rounded-full border px-3 py-1 text-sm transition motion-reduce:transition-none ${FOCUS_RING}`;
  return isActive
    ? `${base} border-[var(--color-accent)] bg-[var(--color-accent)] font-semibold text-white`
    : `${base} border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]`;
}

function TermGrid({ terms }: { terms: readonly GlossaryTerm[] }) {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
      {terms.map((entry: any) => (
        <li key={entry.id}>
          <GlossaryTermCard term={entry} />
        </li>
      ))}
    </ul>
  );
}

/** Glossary hub: search, level filter, and a by-level or A-to-Z listing. */
export function GlossaryView() {
  const searchInputId = useId();
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<GlossaryLevelFilter>("all");
  const [viewMode, setViewMode] = useState<GlossaryViewMode>("level");

  const visibleTerms = useMemo(
    () => filterGlossaryTerms(GLOSSARY_TERMS, { query, level: levelFilter }),
    [query, levelFilter],
  );
  const levelGroups = useMemo(() => groupTermsByLevel(visibleTerms, GLOSSARY_LEVELS), [visibleTerms]);
  const letterGroups = useMemo(() => groupTermsByLetter(visibleTerms), [visibleTerms]);

  function resetFilters() {
    setQuery("");
    setLevelFilter("all");
  }

  return (
    <div className="mx-auto w-[min(100%-2.5rem,var(--site-width))] pb-16 pt-8">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[image:var(--gradient-accent)] opacity-20 blur-3xl" />
        <p className="relative m-0 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          All levels · Glossary
        </p>
        <h1 className="relative mb-3 mt-4 max-w-3xl">AI terms in plain English</h1>
        <p className="relative m-0 max-w-2xl text-lg text-[var(--color-muted)]">
          {GLOSSARY_TERMS.length} short definitions, each tagged with the level where you will meet it and linked to the guide that explains it.
        </p>
        <p className="relative mb-0 mt-6 text-sm text-[var(--color-muted)]">
          New to this? Start with <Link href="/learn/foundations">Level 1: Foundations</Link>.
        </p>
      </header>

      {/* Search and filters */}
      <div className={`${CARD_CLASS} mt-6 grid gap-5`}>
        <div>
          <label htmlFor={searchInputId} className="mb-1 block text-sm font-semibold">
            Search terms
          </label>
          <input
            id={searchInputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="For example: token, RAG, agent"
            className={INPUT_CLASS}
          />
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2 text-sm font-semibold">Level</legend>
            <div className="flex flex-wrap gap-2">
              {LEVEL_FILTERS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={levelFilter === option.id}
                  onClick={() => setLevelFilter(option.id)}
                  className={chipClass(levelFilter === option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2 text-sm font-semibold">View</legend>
            <div className="flex flex-wrap gap-2">
              {VIEW_MODES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={viewMode === option.id}
                  onClick={() => setViewMode(option.id)}
                  className={chipClass(viewMode === option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <p role="status" aria-live="polite" className="m-0 text-sm text-[var(--color-muted)]">
          Showing {visibleTerms.length} of {GLOSSARY_TERMS.length} terms
        </p>
      </div>

      {viewMode === "alphabet" && letterGroups.length > 0 && (
        <nav aria-label="Jump to letter" className="mt-6 flex flex-wrap gap-2">
          {letterGroups.map((group) => (
            <a
              key={group.letter}
              href={`#letter-${group.letter}`}
              className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-semibold text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
            >
              {group.letter}
            </a>
          ))}
        </nav>
      )}

      {/* Results */}
      {visibleTerms.length === 0 ? (
        <div className={`${CARD_CLASS} mt-8 text-center`}>
          <p className="m-0 font-semibold">No terms match your search.</p>
          <p className="mb-4 mt-1 text-sm text-[var(--color-muted)]">Try a shorter word, or clear the filters.</p>
          <button type="button" onClick={resetFilters} className={BUTTON_OUTLINE}>
            Clear search and filters
          </button>
        </div>
      ) : viewMode === "level" ? (
        levelGroups.map((group) => (
          <Section
            key={group.info.level}
            id={`level-${group.info.level}`}
            title={`Level ${group.info.level} terms`}
            intro={`${group.info.name}, for ${group.info.audience}.`}
          >
            <TermGrid terms={group.terms} />
            <p className="mb-0 mt-4 text-sm">
              <Link href={group.info.hubHref}>Open the Level {group.info.level} hub</Link>
            </p>
          </Section>
        ))
      ) : (
        letterGroups.map((group) => (
          <Section key={group.letter} id={`letter-${group.letter}`} title={group.letter}>
            <TermGrid terms={group.terms} />
          </Section>
        ))
      )}

      {/* Next steps */}
      <footer className={`${CARD_CLASS} mt-4 flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Missing a term?</p>
          <p className="m-0 font-semibold">Tell us, or go back to the guides</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/learn" className={BUTTON_OUTLINE}>Back to Learn</Link>
          <Link href="/contact" className={BUTTON_PRIMARY}>Suggest a term</Link>
        </div>
      </footer>
    </div>
  );
}