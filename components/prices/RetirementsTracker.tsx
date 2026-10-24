"use client";

import { Fragment, useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import { formatIsoDate } from "@/lib/prices/formatPrice";
import {
  ALL_OPTION,
  countByStatus,
  describeRetirementDate,
  filterRetirements,
  getDaysLeft,
  getRetirementStatus,
  sortByRetirementDate,
  uniqueSorted,
  type RetirementFilters,
  type ShowFilter,
} from "@/lib/prices/retirementLogic";
import { KIND_LABELS, ON_THE_DAY_LABELS, RETIREMENTS } from "@/lib/prices/retirements";
import { RetirementStatusBadge } from "./RetirementStatusBadge";

const MODEL_ENTRIES = sortByRetirementDate(RETIREMENTS.filter((entry) => entry.kind !== "feature"));
const MAKERS = uniqueSorted(MODEL_ENTRIES.map((entry) => entry.maker));
const PLATFORMS = uniqueSorted(MODEL_ENTRIES.map((entry) => entry.platform));
const COLUMN_COUNT = 5;

const SHOW_OPTIONS: readonly { id: ShowFilter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "upcoming", label: "Upcoming" },
  { id: "retired", label: "Already retired" },
];

const INITIAL_FILTERS: RetirementFilters = { query: "", maker: ALL_OPTION, platform: ALL_OPTION, show: "all" };

/** Filterable tracker of model retirements, with live status once the browser knows today's date. */
export function RetirementsTracker() {
  const today = useToday();
  const [filters, setFilters] = useState<RetirementFilters>(INITIAL_FILTERS);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const rows = useMemo(() => filterRetirements(MODEL_ENTRIES, filters, today), [filters, today]);
  const counts = useMemo(() => (today ? countByStatus(MODEL_ENTRIES, today) : null), [today]);

  function updateFilter<Key extends keyof RetirementFilters>(key: Key, value: RetirementFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  const stats: readonly { label: string; value: number | null }[] = [
    { label: "Within 30 days", value: counts ? counts["this-week"] + counts["this-month"] : null },
    { label: "31 to 90 days", value: counts ? counts["next-90-days"] : null },
    { label: "Later", value: counts ? counts.later : null },
    { label: "Already retired", value: counts ? counts.retired : null },
  ];

  return (
    <div>
      <dl className="m-0 mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${CARD_CLASS} py-3`}>
            <dt className="text-xs text-[var(--color-muted)]">{stat.label}</dt>
            <dd className="m-0 text-2xl font-extrabold tabular-nums">{stat.value ?? "—"}</dd>
          </div>
        ))}
      </dl>

      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_12rem_12rem]">
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Search a name, model ID or replacement</span>
          <input
            type="search"
            value={filters.query}
            onChange={(event) => updateFilter("query", event.target.value)}
            placeholder="for example gpt-4o or sonnet"
            className={`${INPUT_CLASS} mt-1`}
          />
        </label>
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Maker</span>
          <select value={filters.maker} onChange={(event) => updateFilter("maker", event.target.value)} className={`${INPUT_CLASS} mt-1`}>
            <option value={ALL_OPTION}>All makers</option>
            {MAKERS.map((maker) => (
              <option key={maker} value={maker}>{maker}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Platform</span>
          <select value={filters.platform} onChange={(event) => updateFilter("platform", event.target.value)} className={`${INPUT_CLASS} mt-1`}>
            <option value={ALL_OPTION}>All platforms</option>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Show">
        {SHOW_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={filters.show === option.id}
            onClick={() => updateFilter("show", option.id)}
            className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
              filters.show === option.id
                ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="mb-2 mt-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        Showing {rows.length} of {MODEL_ENTRIES.length} entries, soonest first.
      </p>

      <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
        <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
          <caption className="sr-only">AI models and chat-app models being retired, with dates and replacements</caption>
          <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
            <tr>
              <th scope="col" className="p-3">Model</th>
              <th scope="col" className="p-3">Where</th>
              <th scope="col" className="p-3">Date</th>
              <th scope="col" className="p-3">Status</th>
              <th scope="col" className="p-3">Replacement</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={COLUMN_COUNT} className="p-6 text-center text-[var(--color-muted)]">
                  Nothing matches these filters.
                </td>
              </tr>
            )}
            {rows.map((entry) => {
              const isOpen = expandedId === entry.id;
              const status = today ? getRetirementStatus(entry, today) : null;
              const daysLeft = today ? getDaysLeft(entry, today) : null;
              return (
                <Fragment key={entry.id}>
                  <tr className={`border-t border-[var(--color-border)] ${status === "retired" ? "opacity-70" : ""}`}>
                    <th scope="row" className="p-3 align-top font-normal">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`retirement-${entry.id}`}
                        onClick={() => setExpandedId(isOpen ? null : entry.id)}
                        className={`flex items-start gap-2 text-left font-semibold ${FOCUS_RING}`}
                      >
                        <span aria-hidden="true" className="text-[var(--color-accent)]">{isOpen ? "▾" : "▸"}</span>
                        {entry.name}
                      </button>
                      <span className="ml-5 block text-xs text-[var(--color-muted)]">
                        {entry.maker} · {KIND_LABELS[entry.kind]}
                      </span>
                    </th>
                    <td className="p-3 align-top">{entry.platform}</td>
                    <td className="p-3 align-top tabular-nums">{describeRetirementDate(entry)}</td>
                    <td className="p-3 align-top"><RetirementStatusBadge status={status} daysLeft={daysLeft} /></td>
                    <td className="p-3 align-top">{entry.replacement ?? <span className="text-[var(--color-muted)]">None named</span>}</td>
                  </tr>
                  {isOpen && (
                    <tr id={`retirement-${entry.id}`} className="bg-[var(--color-bg)]">
                      <td colSpan={COLUMN_COUNT} className="p-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <h4 className="m-0 mb-1 text-sm font-semibold">What to know</h4>
                            <p className="m-0 text-sm text-[var(--color-muted)]">{entry.note}</p>
                            <p className="mb-0 mt-3 text-sm">
                              <strong>On the day:</strong> {ON_THE_DAY_LABELS[entry.onTheDay]}
                            </p>
                            {entry.announcedOn && (
                              <p className="mb-0 mt-1 text-sm"><strong>Announced:</strong> {formatIsoDate(entry.announcedOn)}</p>
                            )}
                          </div>
                          <div>
                            <h4 className="m-0 mb-1 text-sm font-semibold">Model IDs</h4>
                            {entry.modelIds.length > 0 ? (
                              <ul className="m-0 flex list-none flex-wrap gap-1 p-0">
                                {entry.modelIds.map((modelId) => (
                                  <li key={modelId}><code className={`${BADGE_CLASS} font-mono`}>{modelId}</code></li>
                                ))}
                              </ul>
                            ) : (
                              <p className="m-0 text-sm text-[var(--color-muted)]">No exact IDs listed for this entry.</p>
                            )}
                            <p className="mb-0 mt-3 text-sm">
                              {entry.verification === "provider" ? "Date read on the provider's own page." : "Date read through a tracker. Confirm on the provider's page."}{" "}
                              <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer">Provider page</a>
                            </p>
                          </div>
                        </div>
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
        Dates are read as UTC. Select a model name for IDs, notes and the source. A dashed badge means the date is only a floor, not a retirement.
      </p>
    </div>
  );
}