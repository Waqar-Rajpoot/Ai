"use client";

import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { POPULAR_QUERIES, SEARCH_TIPS } from "@/lib/search/searchContent";
import { SITE_SEARCH_INDEX } from "@/lib/search/siteSearchIndex";
import { countEntriesBySection, SECTION_DESCRIPTIONS, SECTION_LABELS, SECTION_ORDER, type SearchSection } from "@/lib/shared/search";

interface SearchStartProps {
  recent: readonly string[];
  onPickQuery: (query: string) => void;
  onClearRecent: () => void;
  onBrowseSection: (section: SearchSection) => void;
}

const SECTION_TOTALS = countEntriesBySection(SITE_SEARCH_INDEX);

/** Shown before anything is typed: recent and popular searches, and a way into each section. */
export function SearchStart({ recent, onPickQuery, onClearRecent, onBrowseSection }: SearchStartProps) {
  return (
    <div className="grid gap-8">
      <div className="grid gap-6 md:grid-cols-2">
        {recent.length > 0 && (
          <section aria-labelledby="recent-searches">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 id="recent-searches" className="m-0 text-lg">Recent searches</h2>
              <button type="button" onClick={onClearRecent} className={`text-sm underline ${FOCUS_RING}`}>Clear</button>
            </div>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {recent.map((query) => (
                <li key={query}>
                  <button type="button" onClick={() => onPickQuery(query)} className={`${BADGE_CLASS} cursor-pointer hover:border-[var(--color-accent)] ${FOCUS_RING}`}>{query}</button>
                </li>
              ))}
            </ul>
            <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">Saved in this browser only.</p>
          </section>
        )}
        <section aria-labelledby="popular-searches">
          <h2 id="popular-searches" className="mb-2 mt-0 text-lg">Popular searches</h2>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {POPULAR_QUERIES.map((query) => (
              <li key={query}>
                <button type="button" onClick={() => onPickQuery(query)} className={`${BADGE_CLASS} cursor-pointer hover:border-[var(--color-accent)] ${FOCUS_RING}`}>{query}</button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="browse-sections">
        <h2 id="browse-sections" className="mb-3 mt-0 text-lg">Browse by section</h2>
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {SECTION_ORDER.map((section) => (
            <li key={section}>
              <button
                type="button"
                onClick={() => onBrowseSection(section)}
                className={`${CARD_CLASS} block h-full w-full text-left transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
              >
                <span className="block font-semibold">{SECTION_LABELS[section]} <span className="font-normal text-[var(--color-muted)]">({SECTION_TOTALS[section]})</span></span>
                <span className="mt-1 block text-sm text-[var(--color-muted)]">{SECTION_DESCRIPTIONS[section]}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="search-tips" className={CARD_CLASS}>
        <h2 id="search-tips" className="mt-0 text-lg">Search tips</h2>
        <ul className="m-0 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
          {SEARCH_TIPS.map((tip) => <li key={tip}>{tip}</li>)}
        </ul>
      </section>
    </div>
  );
}