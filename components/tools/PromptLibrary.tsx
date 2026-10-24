"use client";

import { useMemo, useState } from "react";
import { CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { PROMPTS, PROMPT_LEVELS, TASK_LABELS, TASK_ORDER } from "@/lib/tools/promptLibrary";
import {
  countPromptsByTask,
  filterPrompts,
  hasActiveFilters,
  type PromptFilters,
} from "@/lib/tools/promptLibraryLogic";
import { LEVEL_NAMES } from "@/lib/tools/toolCatalog";
import { ALL_OPTION } from "@/lib/tools/toolCatalogLogic";
import { PromptCard } from "./PromptCard";

const COUNTS_BY_TASK = countPromptsByTask(PROMPTS);
const INITIAL_FILTERS: PromptFilters = { query: "", task: ALL_OPTION, level: ALL_OPTION };

interface FilterPillProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

function FilterPill({ isActive, label, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
        isActive
          ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
          : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
      }`}
    >
      {label}
    </button>
  );
}

/** Search box, task and level filters, and the grid of prompt cards. All cards are in the HTML before filtering. */
export function PromptLibrary() {
  const [filters, setFilters] = useState<PromptFilters>(INITIAL_FILTERS);
  const visiblePrompts = useMemo(() => filterPrompts(PROMPTS, filters), [filters]);

  function updateFilter<Key extends keyof PromptFilters>(key: Key, value: PromptFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div>
      <label className="mb-4 block text-sm">
        <span className="text-[var(--color-muted)]">Search by task or word</span>
        <input
          type="search"
          value={filters.query}
          onChange={(event) => updateFilter("query", event.target.value)}
          placeholder="for example email, resume or budget"
          className={`${INPUT_CLASS} mt-1`}
        />
      </label>

      <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label="Task">
        <span className="mr-1 text-sm text-[var(--color-muted)]">By task</span>
        <FilterPill isActive={filters.task === ALL_OPTION} label={`All tasks (${PROMPTS.length})`} onClick={() => updateFilter("task", ALL_OPTION)} />
        {TASK_ORDER.map((task) => (
          <FilterPill
            key={task}
            isActive={filters.task === task}
            label={`${TASK_LABELS[task]} (${COUNTS_BY_TASK[task]})`}
            onClick={() => updateFilter("task", task)}
          />
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Level">
        <span className="mr-1 text-sm text-[var(--color-muted)]">By level</span>
        <FilterPill isActive={filters.level === ALL_OPTION} label="All levels" onClick={() => updateFilter("level", ALL_OPTION)} />
        {PROMPT_LEVELS.map((level) => (
          <FilterPill
            key={level}
            isActive={filters.level === level}
            label={`Level ${level}: ${LEVEL_NAMES[level]}`}
            onClick={() => updateFilter("level", level)}
          />
        ))}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <p className="m-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
          Showing {visiblePrompts.length} of {PROMPTS.length} prompts.
        </p>
        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={() => setFilters(INITIAL_FILTERS)}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-semibold ${FOCUS_RING}`}
          >
            Clear filters
          </button>
        )}
      </div>

      {visiblePrompts.length === 0 ? (
        <div className={`${CARD_CLASS} text-center`}>
          <p className="m-0 font-semibold">No prompt matches these filters.</p>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">Try a shorter search, or clear the filters to see every prompt.</p>
        </div>
      ) : (
        <ul className="m-0 grid list-none gap-4 p-0 lg:grid-cols-2">
          {visiblePrompts.map((prompt) => (
            <li key={prompt.id}>
              <PromptCard prompt={prompt} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}