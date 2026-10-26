"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, INPUT_CLASS } from "@/components/shared/pageStyles";
import {
  DEFAULT_FILTERS,
  daysToFix,
  filterCorrections,
  formatDays,
  formatLogDate,
  sortNewestFirst,
  summarizeCorrections,
  wasFixedWithinTarget,
  type CorrectionFilters,
} from "@/lib/trust/corrections";
import type { CorrectionEntry } from "@/lib/trust/correctionsLog";
import {
  FOUND_BY_LABELS,
  SEVERITY_LABELS,
  STATUS_LABELS,
  isCorrectionSeverity,
  isCorrectionStatus,
  type CorrectionSeverity,
  type CorrectionStatus,
} from "@/lib/trust/correctionsPolicy";

const STATUS_OPTIONS: readonly CorrectionStatus[] = ["fixed", "declined", "open"];
const SEVERITY_OPTIONS: readonly CorrectionSeverity[] = ["high", "standard", "minor"];

const STATUS_STYLES: Record<CorrectionStatus, string> = {
  fixed: "border-emerald-500 text-emerald-600 dark:text-emerald-400",
  declined: "border-slate-500 text-slate-600 dark:text-slate-300",
  open: "border-amber-500 text-amber-600 dark:text-amber-400",
};

const COLUMN_COUNT = 7;

interface CorrectionsLogProps {
  entries: readonly CorrectionEntry[];
}

/** The public corrections log: summary figures, two filters and the table of entries. */
export function CorrectionsLog({ entries }: CorrectionsLogProps) {
  const [filters, setFilters] = useState<CorrectionFilters>(DEFAULT_FILTERS);

  const summary = useMemo(() => summarizeCorrections(entries), [entries]);
  const visibleEntries = useMemo(() => sortNewestFirst(filterCorrections(entries, filters)), [entries, filters]);

  const hasNoEntries = entries.length === 0;
  const tiles: readonly { id: string; label: string; value: string }[] = [
    { id: "total", label: "Corrections logged", value: String(summary.total) },
    { id: "fixed", label: "Fixed", value: String(summary.fixed) },
    { id: "open", label: "Open now", value: String(summary.open) },
    { id: "median", label: "Median time to fix", value: summary.medianDaysToFix === null ? "Not yet" : formatDays(summary.medianDaysToFix) },
    { id: "target", label: "Fixed within our target", value: summary.fixedWithinTargetPercent === null ? "Not yet" : `${Math.round(summary.fixedWithinTargetPercent)}%` },
  ];

  return (
    <div className="grid gap-4">
      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
        {tiles.map((tile) => (
          <li key={tile.id} className={CARD_CLASS}>
            <p className="m-0 text-2xl font-extrabold tabular-nums">{tile.value}</p>
            <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{tile.label}</p>
          </li>
        ))}
      </ul>

      <form className="flex flex-wrap items-end gap-4" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label htmlFor="log-status" className="text-sm font-semibold">Status</label>
          <select
            id="log-status"
            value={filters.status}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "all" || isCorrectionStatus(value)) setFilters((current) => ({ ...current, status: value }));
            }}
            className={`${INPUT_CLASS} mt-1`}
          >
            <option value="all">All</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>{STATUS_LABELS[status]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="log-severity" className="text-sm font-semibold">Severity</label>
          <select
            id="log-severity"
            value={filters.severity}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "all" || isCorrectionSeverity(value)) setFilters((current) => ({ ...current, severity: value }));
            }}
            className={`${INPUT_CLASS} mt-1`}
          >
            <option value="all">All</option>
            {SEVERITY_OPTIONS.map((severity) => (
              <option key={severity} value={severity}>{SEVERITY_LABELS[severity]}</option>
            ))}
          </select>
        </div>
        <p role="status" aria-live="polite" className="m-0 pb-2 text-sm text-[var(--color-muted)]">
          Showing {visibleEntries.length} of {entries.length}
        </p>
      </form>

      <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
        <table className="w-full min-w-[60rem] border-collapse text-left text-sm">
          <caption className="sr-only">Public log of corrections: date reported, date fixed, page, what was wrong and what changed</caption>
          <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
            <tr>
              <th scope="col" className="p-3">Date reported</th>
              <th scope="col" className="p-3">Date fixed</th>
              <th scope="col" className="p-3">Page</th>
              <th scope="col" className="p-3">What was wrong</th>
              <th scope="col" className="p-3">What changed</th>
              <th scope="col" className="p-3">Severity</th>
              <th scope="col" className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleEntries.length === 0 && (
              <tr>
                <td colSpan={COLUMN_COUNT} className="p-6 text-center text-[var(--color-muted)]">
                  {hasNoEntries
                    ? "No corrections have been logged yet. Rows appear here, newest first, as substantive corrections are made."
                    : "No entries match these filters."}
                </td>
              </tr>
            )}
            {visibleEntries.map((entry) => {
              const days = daysToFix(entry);
              const withinTarget = wasFixedWithinTarget(entry);
              return (
                <tr key={entry.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 text-left align-top font-semibold tabular-nums">{formatLogDate(entry.reportedOn)}</th>
                  <td className="p-3 align-top tabular-nums">
                    {entry.fixedOn === null ? "—" : formatLogDate(entry.fixedOn)}
                    {days !== null && (
                      <span className="block text-xs text-[var(--color-muted)]">
                        {formatDays(days)}, {withinTarget ? "within target" : "over target"}
                      </span>
                    )}
                  </td>
                  <td className="p-3 align-top">
                    <Link href={entry.pagePath}>{entry.pageTitle}</Link>
                    <span className="block text-xs text-[var(--color-muted)]">{FOUND_BY_LABELS[entry.foundBy]}</span>
                  </td>
                  <td className="p-3 align-top">{entry.whatWasWrong}</td>
                  <td className="p-3 align-top">{entry.whatChanged}</td>
                  <td className="p-3 align-top">{SEVERITY_LABELS[entry.severity]}</td>
                  <td className="p-3 align-top">
                    <span className={`${BADGE_CLASS} whitespace-nowrap ${STATUS_STYLES[entry.status]}`}>{STATUS_LABELS[entry.status]}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}