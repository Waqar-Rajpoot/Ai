"use client";

import { FOCUS_RING } from "@/components/shared/pageStyles";
import { LEVEL_DEFINITIONS, LEVEL_ORDER } from "@/lib/shared/levels";
import {
  SECTION_LABELS,
  SECTION_ORDER,
  type LevelFilter,
  type SearchOutcome,
  type SearchSort,
  type SearchState,
  type SectionFilter,
} from "@/lib/shared/search";

interface SearchFiltersProps {
  state: SearchState;
  outcome: SearchOutcome;
  onSectionChange: (section: SectionFilter) => void;
  onLevelChange: (level: LevelFilter) => void;
  onSortChange: (sort: SearchSort) => void;
  onReset: () => void;
}

const SELECT_CLASS = `rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 text-sm ${FOCUS_RING}`;

/** Section tabs with live counts, a level menu and a sort menu. */
export function SearchFilters({ state, outcome, onSectionChange, onLevelChange, onSortChange, onReset }: SearchFiltersProps) {
  const sections: SectionFilter[] = ["all", ...SECTION_ORDER];
  const hasFilters = state.section !== "all" || state.level !== "all";

  return (
    <div className="mb-6 grid gap-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by section">
        {sections.map((section) => {
          const count = outcome.sectionCounts[section];
          const isActive = state.section === section;
          if (count === 0 && !isActive) return null;
          return (
            <button
              key={section}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSectionChange(section)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                isActive
                  ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {section === "all" ? "All" : SECTION_LABELS[section]} <span className="tabular-nums opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label>
          <span className="mr-2 text-[var(--color-muted)]">Level</span>
          <select value={state.level} onChange={(event) => onLevelChange(event.target.value as LevelFilter)} className={SELECT_CLASS}>
            <option value="all">All levels ({outcome.levelCounts.all})</option>
            {LEVEL_ORDER.map((level) => (
              <option key={level} value={level}>
                Level {LEVEL_DEFINITIONS[level].number}: {LEVEL_DEFINITIONS[level].badgeLabel} ({outcome.levelCounts[level]})
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mr-2 text-[var(--color-muted)]">Sort by</span>
          <select value={state.sort} onChange={(event) => onSortChange(event.target.value as SearchSort)} className={SELECT_CLASS}>
            <option value="relevance">Best match</option>
            <option value="title">Title (A to Z)</option>
          </select>
        </label>
        {hasFilters && (
          <button type="button" onClick={onReset} className={`rounded-full border border-[var(--color-border)] px-3 py-1 font-semibold ${FOCUS_RING}`}>
            Clear filters
          </button>
        )}
        {state.level !== "all" && (
          <span className="text-xs text-[var(--color-muted)]">Pages that apply to every level are hidden while a level is chosen.</span>
        )}
      </div>
    </div>
  );
}