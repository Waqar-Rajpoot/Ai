"use client";

import Link from "next/link";
import {
  formatBenchLm,
  formatMonthDay,
  formatPricePair,
  getReviewHref,
} from "@/lib/compare/modelDirectory";
import { getPriceTier, PRICE_TIER_LABELS } from "@/lib/compare/modelFilters";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";
import { ModelFilterControls } from "./ModelFilterControls";
import { useFilteredModels } from "./useFilteredModels";

/** The directory table with search, maker, price tier, model type and sort controls. */
export function ModelDirectoryTable() {
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
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              AI models with maker, API price per million tokens (input and output), price tier, context size, BenchLM score, best use and review link
            </caption>
            <thead className="bg-[var(--color-surface)]">
              <tr>
                <th scope="col" className="p-3">Model</th>
                <th scope="col" className="p-3">Maker</th>
                <th scope="col" className="p-3">API price, in / out per 1M tokens</th>
                <th scope="col" className="p-3">Price tier</th>
                <th scope="col" className="p-3">Context</th>
                <th scope="col" className="p-3">BenchLM score</th>
                <th scope="col" className="p-3">Best for</th>
                <th scope="col" className="p-3">Review</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top">{row.name}</th>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.maker}</td>
                  <td className="p-3 align-top">
                    {formatPricePair(row)}
                    {row.introRateEndsOn && (
                      <span className="mt-0.5 block text-xs text-[var(--color-muted)]">Intro rate to {formatMonthDay(row.introRateEndsOn)}</span>
                    )}
                    {row.priceNote && <span className="mt-0.5 block text-xs text-[var(--color-muted)]">{row.priceNote}</span>}
                  </td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{PRICE_TIER_LABELS[getPriceTier(row)]}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.contextLabel}</td>
                  <td className="p-3 align-top">{formatBenchLm(row.benchLm)}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{row.bestFor}</td>
                  <td className="p-3 align-top">
                    {row.isReviewPublished ? (
                      <Link href={getReviewHref(row)} className={FOCUS_RING}>Read review</Link>
                    ) : (
                      <span className="text-[var(--color-muted)]">Review coming</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}