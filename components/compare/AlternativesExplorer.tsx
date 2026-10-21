"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  ALTERNATIVE_ENTRIES,
  alternativeHref,
  filterAlternatives,
  KIND_FILTER_OPTIONS,
  KIND_LABELS,
  type AlternativeKindFilter,
} from "@/lib/compare/alternativesIndex";

/** Search and filter the list of 'Alternatives to…' pages. */
export function AlternativesExplorer() {
  const [kind, setKind] = useState<AlternativeKindFilter>("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => filterAlternatives(ALTERNATIVE_ENTRIES, kind, query), [kind, query]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div className="grow sm:max-w-sm">
          <label htmlFor="alternatives-search" className="mb-1 block text-sm font-semibold">
            Search by tool or maker
          </label>
          <input
            id="alternatives-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="For example: Gemini"
            className={`w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`}
          />
        </div>
        <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
          {KIND_FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={kind === option.value}
              onClick={() => setKind(option.value)}
              className={`rounded-full border px-4 py-2 text-sm transition motion-reduce:transition-none ${FOCUS_RING} ${
                kind === option.value ? "border-[var(--color-accent)] bg-[var(--color-surface)] font-semibold" : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mb-4 mt-0 text-sm text-[var(--color-muted)]">
        Showing {results.length} of {ALTERNATIVE_ENTRIES.length} pages.
      </p>

      {results.length > 0 ? (
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((entry) => (
            <li key={entry.slug} className={`${CARD_CLASS} flex flex-col`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs">{KIND_LABELS[entry.kind]}</span>
                <span className="text-xs text-[var(--color-muted)]">{entry.maker}</span>
              </div>
              <strong className="mt-2 text-lg">Alternatives to {entry.name}</strong>
              <p className="mb-0 mt-1 grow text-sm text-[var(--color-muted)]">{entry.summary}</p>
              <div className="mt-4">
                {entry.isPublished ? (
                  <Link href={alternativeHref(entry)} className={BUTTON_PRIMARY}>
                    Read the guide
                  </Link>
                ) : (
                  <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold">Coming soon</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
          No page matches that search. <Link href="/contact">Tell us which tool you are leaving</Link>, or try the <Link href="/compare/models">model directory</Link>.
        </p>
      )}
    </div>
  );
}