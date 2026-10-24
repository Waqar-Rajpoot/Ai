"use client";

import { useMemo, useState } from "react";
import { CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import {
  CATEGORY_LABELS,
  LEVEL_NAMES,
  TOOLS,
  TOOL_LEVELS,
  type ToolCategory,
} from "@/lib/tools/toolCatalog";
import {
  ALL_OPTION,
  filterTools,
  type CategoryFilter,
  type LevelFilter,
  type ToolFilters,
} from "@/lib/tools/toolCatalogLogic";
import { ToolCard } from "./ToolCard";

const CATEGORY_IDS = Object.keys(CATEGORY_LABELS) as ToolCategory[];

const LEVEL_OPTIONS: readonly { id: LevelFilter; label: string }[] = [
  { id: ALL_OPTION, label: "All levels" },
  ...TOOL_LEVELS.map((level) => ({ id: level, label: `Level ${level}: ${LEVEL_NAMES[level]}` })),
];

const INITIAL_FILTERS: ToolFilters = { query: "", level: ALL_OPTION, category: ALL_OPTION };

/** The tool grid with level, group and search filters. All cards are in the HTML before filtering, so it works without JavaScript. */
export function ToolCatalogBrowser() {
  const [filters, setFilters] = useState<ToolFilters>(INITIAL_FILTERS);
  const visibleTools = useMemo(() => filterTools(TOOLS, filters), [filters]);

  function updateFilter<Key extends keyof ToolFilters>(key: Key, value: ToolFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div>
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_14rem]">
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Search by task or word</span>
          <input
            type="search"
            value={filters.query}
            onChange={(event) => updateFilter("query", event.target.value)}
            placeholder="for example cost, prompt or privacy"
            className={`${INPUT_CLASS} mt-1`}
          />
        </label>
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Group</span>
          <select
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value as CategoryFilter)}
            className={`${INPUT_CLASS} mt-1`}
          >
            <option value={ALL_OPTION}>All groups</option>
            {CATEGORY_IDS.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Level">
        {LEVEL_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={filters.level === option.id}
            onClick={() => updateFilter("level", option.id)}
            className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
              filters.level === option.id
                ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        Showing {visibleTools.length} of {TOOLS.length} tools.
      </p>

      {visibleTools.length === 0 ? (
        <div className={`${CARD_CLASS} text-center`}>
          <p className="m-0 font-semibold">No tool matches these filters.</p>
          <p className="mb-3 mt-1 text-sm text-[var(--color-muted)]">Try a shorter search, or show every level and group.</p>
          <button
            type="button"
            onClick={() => setFilters(INITIAL_FILTERS)}
            className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
          {visibleTools.map((tool) => (
            <li key={tool.id}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}