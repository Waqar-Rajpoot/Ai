"use client";

import Link from "next/link";
import { useState } from "react";
import { BADGE_CLASS, BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { HELP_LINKS, NO_RESULTS_TIPS } from "@/lib/search/searchContent";
import { LEVEL_DEFINITIONS } from "@/lib/shared/levels";
import {
  getHighlightSegments,
  SECTION_LABELS,
  SECTION_ORDER,
  type SearchHit,
  type SearchOutcome,
  type SearchSection,
  type SearchState,
  type SectionFilter,
} from "@/lib/shared/search";
import { GROUP_PREVIEW_SIZE, RESULTS_PAGE_SIZE } from "@/lib/shared/searchConstants";

interface SearchResultsProps {
  state: SearchState;
  outcome: SearchOutcome;
  onSectionChange: (section: SectionFilter) => void;
  onApplySuggestion: (query: string) => void;
  onResetFilters: () => void;
  /** Called when a result is opened, so the query can be remembered. */
  onNavigate: () => void;
}

function Highlight({ text, tokens }: { text: string; tokens: readonly string[] }) {
  return (
    <>
      {getHighlightSegments(text, tokens).map((segment, index) =>
        segment.isMatch ? (
          <mark key={index} className="rounded bg-[color-mix(in_srgb,var(--color-accent)_25%,transparent)] px-0.5 text-inherit">
            {segment.text}
          </mark>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </>
  );
}

function ResultCard({ hit, tokens, onNavigate }: { hit: SearchHit; tokens: readonly string[]; onNavigate: () => void }) {
  const { entry } = hit;
  return (
    <li className={`${CARD_CLASS} py-4`}>
      <p className="m-0 flex flex-wrap items-center gap-2 text-xs">
        <span className={BADGE_CLASS}>{entry.kind}</span>
        {entry.level && <span className={BADGE_CLASS}>Level {LEVEL_DEFINITIONS[entry.level].number}</span>}
        <span className="text-[var(--color-muted)]">{SECTION_LABELS[entry.section]}</span>
      </p>
      <h3 className="mb-1 mt-2 text-lg">
        <Link href={entry.href} onClick={onNavigate} className={`text-[var(--color-text)] no-underline hover:underline ${FOCUS_RING}`}>
          <Highlight text={entry.title} tokens={tokens} />
        </Link>
      </h3>
      <p className="m-0 text-sm text-[var(--color-muted)]">
        <Highlight text={entry.description} tokens={tokens} />
      </p>
      <p className="mb-0 mt-1 break-all text-xs text-[var(--color-muted)]">{entry.href}</p>
    </li>
  );
}

function describeMode(outcome: SearchOutcome): string | null {
  if (outcome.mode === "some-words") return "No page matched every word, so these match some of them.";
  if (outcome.mode === "similar-spelling") return "No exact matches, so these are the closest by spelling.";
  return null;
}

function NoResultsHelp({ state, outcome, onApplySuggestion, onResetFilters }: Omit<SearchResultsProps, "onSectionChange" | "onNavigate">) {
  const hasFilters = state.section !== "all" || state.level !== "all";
  const hiddenByFilters = outcome.totalBeforeFilters > 0 && hasFilters;

  return (
    <div className={CARD_CLASS}>
      <h2 className="mt-0 text-xl">No results help</h2>
      {outcome.suggestion && (
        <p className="mt-0">
          Did you mean{" "}
          <button type="button" onClick={() => onApplySuggestion(outcome.suggestion ?? "")} className={`font-semibold underline ${FOCUS_RING}`}>
            {outcome.suggestion}
          </button>
          ?
        </p>
      )}
      {hiddenByFilters && (
        <p className="mt-0">
          {outcome.totalBeforeFilters} result{outcome.totalBeforeFilters === 1 ? "" : "s"} {outcome.totalBeforeFilters === 1 ? "is" : "are"} hidden by your filters.{" "}
          <button type="button" onClick={onResetFilters} className={`font-semibold underline ${FOCUS_RING}`}>Clear filters</button>
        </p>
      )}
      <ul className="m-0 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
        {NO_RESULTS_TIPS.map((tip) => <li key={tip}>{tip}</li>)}
      </ul>
      <p className="mb-2 mt-4 text-sm font-semibold">Browse instead</p>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {HELP_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`${BADGE_CLASS} text-[var(--color-text)] no-underline hover:border-[var(--color-accent)] ${FOCUS_RING}`}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <p className="mb-0 mt-4 text-sm">Cannot find a page you expected? <Link href="/contact">Tell us</Link> and we will add it.</p>
    </div>
  );
}

/** Results, grouped by section on "All", or one long list when a section is chosen. */
export function SearchResults({ state, outcome, onSectionChange, onApplySuggestion, onResetFilters, onNavigate }: SearchResultsProps) {
  const [visibleCount, setVisibleCount] = useState(RESULTS_PAGE_SIZE);
  const { hits, tokens, mode } = outcome;
  const modeNote = describeMode(outcome);
  const isGrouped = state.section === "all" && mode !== "browse";

  const summary =
    hits.length === 0
      ? "No results"
      : mode === "browse"
        ? `${hits.length} page${hits.length === 1 ? "" : "s"}`
        : `${hits.length} result${hits.length === 1 ? "" : "s"} for “${state.query.trim()}”`;

  if (hits.length === 0) {
    return (
      <div>
        <p className="mt-0 font-semibold" role="status" aria-live="polite">{summary}</p>
        <NoResultsHelp state={state} outcome={outcome} onApplySuggestion={onApplySuggestion} onResetFilters={onResetFilters} />
      </div>
    );
  }

  const groups: { section: SearchSection; hits: SearchHit[] }[] = isGrouped
    ? SECTION_ORDER.map((section) => ({ section, hits: hits.filter((hit) => hit.entry.section === section) })).filter((group) => group.hits.length > 0)
    : [];

  return (
    <div>
      <p className="mb-1 mt-0 font-semibold" role="status" aria-live="polite">{summary}</p>
      {modeNote && <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">{modeNote}</p>}
      {outcome.suggestion && (
        <p className="mb-3 mt-0 text-sm">
          Did you mean{" "}
          <button type="button" onClick={() => onApplySuggestion(outcome.suggestion ?? "")} className={`font-semibold underline ${FOCUS_RING}`}>{outcome.suggestion}</button>?
        </p>
      )}

      {isGrouped ? (
        <div className="grid gap-8">
          {groups.map((group) => (
            <section key={group.section} aria-labelledby={`results-${group.section}`}>
              <h2 id={`results-${group.section}`} className="mb-3 mt-0 text-xl">
                {SECTION_LABELS[group.section]} <span className="text-sm font-normal text-[var(--color-muted)]">({group.hits.length})</span>
              </h2>
              <ul className="m-0 grid list-none gap-3 p-0">
                {group.hits.slice(0, GROUP_PREVIEW_SIZE).map((hit) => (
                  <ResultCard key={hit.entry.id} hit={hit} tokens={tokens} onNavigate={onNavigate} />
                ))}
              </ul>
              {group.hits.length > GROUP_PREVIEW_SIZE && (
                <p className="mb-0 mt-3">
                  <button type="button" onClick={() => onSectionChange(group.section)} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>
                    Show all {group.hits.length} in {SECTION_LABELS[group.section]}
                  </button>
                </p>
              )}
            </section>
          ))}
        </div>
      ) : (
        <>
          <ul className="m-0 grid list-none gap-3 p-0">
            {hits.slice(0, visibleCount).map((hit) => (
              <ResultCard key={hit.entry.id} hit={hit} tokens={tokens} onNavigate={onNavigate} />
            ))}
          </ul>
          {hits.length > visibleCount && (
            <p className="mb-0 mt-4">
              <button type="button" onClick={() => setVisibleCount((count) => count + RESULTS_PAGE_SIZE)} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>
                Show more ({hits.length - visibleCount} left)
              </button>
            </p>
          )}
        </>
      )}
    </div>
  );
}