"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  API_MODELS,
  filterAndSortModels,
  getBatchRates,
  TIER_LABELS,
  type ApiModel,
  type SortKey,
  type TierFilter,
} from "@/lib/prices/apiCostTable";
import { formatIsoDate, formatRate, formatTokens } from "@/lib/prices/formatPrice";
import { daysUntil } from "@/lib/tools/apiCost";

const TIER_OPTIONS: readonly { id: TierFilter; label: string }[] = [
  { id: "all", label: "All models" },
  { id: "flagship", label: "Flagship" },
  { id: "workhorse", label: "Workhorse" },
  { id: "budget", label: "Budget" },
];

const SORT_OPTIONS: readonly { id: SortKey; label: string }[] = [
  { id: "input", label: "Input price (low to high)" },
  { id: "output", label: "Output price (low to high)" },
  { id: "context", label: "Context window (largest first)" },
  { id: "name", label: "Name (A to Z)" },
];

const COLUMN_COUNT = 7;

function describeDaysLeft(days: number): string {
  if (days < 0) return "ended";
  if (days === 0) return "ends today";
  return `${days} day${days === 1 ? "" : "s"} left`;
}

function RowBadges({ model, today }: { model: ApiModel; today: Date | null }) {
  const alternate = model.alternateRate;
  const daysLeft = today && alternate?.endsOn ? daysUntil(alternate.endsOn, today) : null;

  return (
    <div className="flex flex-wrap gap-1">
      {alternate?.kind === "after-intro" && alternate.endsOn && (
        <span className={`${BADGE_CLASS} border-amber-500 text-amber-600 dark:text-amber-400`}>
          Intro rate to {formatIsoDate(alternate.endsOn)}
          {daysLeft !== null ? ` · ${describeDaysLeft(daysLeft)}` : ""}
        </span>
      )}
      {alternate?.kind === "peak-hours" && (
        <span className={`${BADGE_CLASS} border-amber-500 text-amber-600 dark:text-amber-400`}>
          Peak hours cost {Number((alternate.rates.inputPer1M / model.rates.inputPer1M).toFixed(1))}×
        </span>
      )}
      {model.longPrompt && (
        <span className={BADGE_CLASS}>Higher rate above {formatTokens(model.longPrompt.thresholdTokens)} input</span>
      )}
      {model.batchDiscount === null && <span className={BADGE_CLASS}>No batch discount listed</span>}
      {model.verification === "secondary" && <span className={BADGE_CLASS}>Secondary source</span>}
    </div>
  );
}

function RowDetails({ model }: { model: ApiModel }) {
  const alternate = model.alternateRate;
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2">
      <div>
        <h4 className="m-0 mb-1 text-sm font-semibold">Best for</h4>
        <p className="m-0 text-sm text-[var(--color-muted)]">{model.bestFor}</p>
        {alternate && (
          <>
            <h4 className="m-0 mb-1 mt-3 text-sm font-semibold">{alternate.label}</h4>
            <p className="m-0 text-sm text-[var(--color-muted)]">
              {formatRate(alternate.rates.inputPer1M)} in · {formatRate(alternate.rates.outputPer1M)} out ·{" "}
              {formatRate(alternate.rates.cachedInputPer1M)} cached
            </p>
          </>
        )}
        {model.longPrompt && (
          <>
            <h4 className="m-0 mb-1 mt-3 text-sm font-semibold">Long-prompt rule</h4>
            <p className="m-0 text-sm text-[var(--color-muted)]">
              {model.longPrompt.description} Rates then: {formatRate(model.longPrompt.rates.inputPer1M)} in ·{" "}
              {formatRate(model.longPrompt.rates.outputPer1M)} out.
            </p>
          </>
        )}
      </div>
      <div>
        <h4 className="m-0 mb-1 text-sm font-semibold">Things to know</h4>
        <ul className="m-0 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
          {model.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="mb-0 mt-3 text-sm">
          {model.verification === "provider" ? "Base price read on the provider's own announcement." : "Base price cross-checked on price trackers."}{" "}
          {model.providerPageUrl && (
            <a href={model.providerPageUrl} target="_blank" rel="noopener noreferrer">
              Provider page
            </a>
          )}
        </p>
      </div>
    </div>
  );
}

/** Sortable, filterable price table with expandable details for each model. */
export function ApiCostTable() {
  const [tier, setTier] = useState<TierFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("input");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Set after mount so the server HTML and the first client render match.
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const rows = useMemo(() => filterAndSortModels(API_MODELS, tier, sortKey), [tier, sortKey]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tier">
          {TIER_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={tier === option.id}
              onClick={() => setTier(option.id)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                tier === option.id
                  ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <label className="text-sm">
          <span className="mr-2 text-[var(--color-muted)]">Sort by</span>
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
            className={`rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1.5 ${FOCUS_RING}`}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
        <table className="w-full min-w-[58rem] border-collapse text-left text-sm">
          <caption className="sr-only">API prices per million tokens in US dollars</caption>
          <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
            <tr>
              <th scope="col" className="p-3">Model</th>
              <th scope="col" className="p-3">Input</th>
              <th scope="col" className="p-3">Output</th>
              <th scope="col" className="p-3">Cached input</th>
              <th scope="col" className="p-3">Batch (in / out)</th>
              <th scope="col" className="p-3">Context</th>
              <th scope="col" className="p-3">Watch for</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((model) => {
              const batch = getBatchRates(model);
              const isOpen = expandedId === model.id;
              return (
                <Fragment key={model.id}>
                  <tr className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 align-top font-normal">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`details-${model.id}`}
                        onClick={() => setExpandedId(isOpen ? null : model.id)}
                        className={`flex items-center gap-2 text-left font-semibold ${FOCUS_RING}`}
                      >
                        <span aria-hidden="true" className="text-[var(--color-accent)]">{isOpen ? "▾" : "▸"}</span>
                        {model.name}
                      </button>
                      <span className="ml-5 block text-xs text-[var(--color-muted)]">
                        {model.maker} · {TIER_LABELS[model.tier]}
                      </span>
                    </th>
                    <td className="p-3 align-top tabular-nums">{formatRate(model.rates.inputPer1M)}</td>
                    <td className="p-3 align-top tabular-nums">{formatRate(model.rates.outputPer1M)}</td>
                    <td className="p-3 align-top tabular-nums">{formatRate(model.rates.cachedInputPer1M)}</td>
                    <td className="p-3 align-top tabular-nums">
                      {batch ? `${formatRate(batch.inputPer1M)} / ${formatRate(batch.outputPer1M)}` : "—"}
                    </td>
                    <td className="p-3 align-top tabular-nums">{formatTokens(model.contextTokens)}</td>
                    <td className="p-3 align-top">
                      <RowBadges model={model} today={today} />
                    </td>
                  </tr>
                  {isOpen && (
                    <tr id={`details-${model.id}`} className="bg-[var(--color-bg)]">
                      <td colSpan={COLUMN_COUNT} className="p-0">
                        <RowDetails model={model} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
        US dollars per million tokens, standard processing. Select a model name to see its notes, price steps and source.
      </p>
    </div>
  );
}