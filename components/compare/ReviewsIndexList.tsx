"use client";

import Link from "next/link";
import { formatBenchLm, formatMonthDay, formatPricePair, getReviewHref } from "@/lib/compare/modelDirectory";
import { getPriceTier, isOpenWeightOrLocal, PRICE_TIER_LABELS } from "@/lib/compare/modelFilters";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";
import { ModelFilterControls } from "./ModelFilterControls";
import { useFilteredModels } from "./useFilteredModels";

const TAG_CLASS = "rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-muted)]";

/** Review cards with search, maker, price tier, model type and sort controls. */
export function ReviewsIndexList() {
  const { filters, setFilters, sortKey, setSortKey, rows, resetFilters, totalCount } = useFilteredModels();

  return (
    <div className="grid gap-4">
      <ModelFilterControls
        filters={filters}
        onFiltersChange={setFilters}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        visibleCount={rows.length}
        totalCount={totalCount}
        onReset={resetFilters}
      />

      {rows.length === 0 ? (
        <div className={`${CARD_CLASS} text-center`}>
          <p className="m-0 font-semibold">No models match these filters.</p>
          <p className="mb-4 mt-1 text-sm text-[var(--color-muted)]">Try a different combination, or clear the filters.</p>
          <button type="button" onClick={resetFilters} className={BUTTON_OUTLINE}>Clear filters</button>
        </div>
      ) : (
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => (
            <li key={row.id} id={`review-${row.id}`} className="scroll-mt-24">
              <article className={`${CARD_CLASS} flex h-full flex-col`}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="m-0 text-lg">{row.name}</h3>
                  <span className={TAG_CLASS}>{row.isReviewPublished ? "Review published" : "Review planned"}</span>
                </div>
                <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{row.maker}</p>
                <p className="mb-0 mt-3">{row.bestFor}</p>
                <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
                  <li className={TAG_CLASS}>{PRICE_TIER_LABELS[getPriceTier(row)]}</li>
                  {isOpenWeightOrLocal(row) && <li className={TAG_CLASS}>Open-weight or local</li>}
                  {row.introRateEndsOn && <li className={TAG_CLASS}>Intro rate to {formatMonthDay(row.introRateEndsOn)}</li>}
                </ul>
                <dl className="mb-0 mt-4 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">API price, in / out</dt>
                    <dd className="m-0">{formatPricePair(row)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">Context</dt>
                    <dd className="m-0">{row.contextLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[var(--color-muted)]">BenchLM</dt>
                    <dd className="m-0">{formatBenchLm(row.benchLm)}</dd>
                  </div>
                </dl>
                {row.priceNote && <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">{row.priceNote}</p>}
                <p className="mb-0 mt-auto pt-4 text-sm">
                  {row.isReviewPublished ? (
                    <Link href={getReviewHref(row)} className={FOCUS_RING}>Read the review</Link>
                  ) : (
                    <span className="text-[var(--color-muted)]">Review coming after our test run</span>
                  )}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}