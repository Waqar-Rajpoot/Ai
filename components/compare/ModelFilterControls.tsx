"use client";

import { useId } from "react";
import {
  ALL_MAKERS,
  getMakers,
  MODEL_DIRECTORY_ROWS,
  SORT_OPTIONS,
  type DirectorySortKey,
} from "@/lib/compare/modelDirectory";
import {
  ACCESS_FILTERS,
  hasActiveFilters,
  PRICE_TIER_FILTERS,
  type ModelFilters,
} from "@/lib/compare/modelFilters";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

const FIELD_CLASS = `rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;
const MAKERS = getMakers(MODEL_DIRECTORY_ROWS);

function chipClass(isActive: boolean): string {
  const base = `rounded-full border px-3 py-1 text-sm transition motion-reduce:transition-none ${FOCUS_RING}`;
  return isActive
    ? `${base} border-[var(--color-accent)] bg-[var(--color-accent)] font-semibold text-white`
    : `${base} border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)]`;
}

interface ModelFilterControlsProps {
  filters: ModelFilters;
  onFiltersChange: (next: ModelFilters) => void;
  sortKey: DirectorySortKey;
  onSortKeyChange: (next: DirectorySortKey) => void;
  visibleCount: number;
  totalCount: number;
  onReset: () => void;
}

/** Search, maker, price tier, model type and sort controls shared by the directory and the reviews index. */
export function ModelFilterControls({
  filters,
  onFiltersChange,
  sortKey,
  onSortKeyChange,
  visibleCount,
  totalCount,
  onReset,
}: ModelFilterControlsProps) {
  const searchId = useId();
  const makerId = useId();
  const sortId = useId();

  function update(partial: Partial<ModelFilters>) {
    onFiltersChange({ ...filters, ...partial });
  }

  return (
    <div className={`${CARD_CLASS} grid gap-5`}>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor={searchId} className="mb-1 block text-sm font-semibold">Search</label>
          <input
            id={searchId}
            type="search"
            value={filters.query}
            onChange={(event) => update({ query: event.target.value })}
            placeholder="Name, maker or use, for example coding"
            className={`w-full ${FIELD_CLASS}`}
          />
        </div>
        <div>
          <label htmlFor={makerId} className="mb-1 block text-sm font-semibold">Maker</label>
          <select id={makerId} value={filters.maker} onChange={(event) => update({ maker: event.target.value })} className={`w-full ${FIELD_CLASS}`}>
            <option value={ALL_MAKERS}>All makers</option>
            {MAKERS.map((makerName) => (
              <option key={makerName} value={makerName}>{makerName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={sortId} className="mb-1 block text-sm font-semibold">Sort by</label>
          <select id={sortId} value={sortKey} onChange={(event) => onSortKeyChange(event.target.value as DirectorySortKey)} className={`w-full ${FIELD_CLASS}`}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 text-sm font-semibold">Price tier</legend>
          <div className="flex flex-wrap gap-2">
            {PRICE_TIER_FILTERS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={filters.priceTier === option.id}
                title={option.description || undefined}
                onClick={() => update({ priceTier: option.id })}
                className={chipClass(filters.priceTier === option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 text-sm font-semibold">Model type</legend>
          <div className="flex flex-wrap gap-2">
            {ACCESS_FILTERS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={filters.access === option.id}
                onClick={() => update({ access: option.id })}
                className={chipClass(filters.access === option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="m-0 text-sm text-[var(--color-muted)]">
          Showing {visibleCount} of {totalCount} models
        </p>
        {hasActiveFilters(filters) && (
          <button type="button" onClick={onReset} className={BUTTON_OUTLINE}>Clear filters</button>
        )}
      </div>
    </div>
  );
}