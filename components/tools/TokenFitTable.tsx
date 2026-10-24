import { BADGE_CLASS, CARD_CLASS } from "@/components/shared/pageStyles";
import {
  FIT_LABELS,
  formatApproxCount,
  formatCompactTokens,
  formatPercent,
  windowCapacity,
  type FitResult,
  type FitRow,
  type FitStatus,
} from "@/lib/tools/tokenEstimate";

const STATUS_STYLES: Record<FitStatus, string> = {
  comfortable: "border-emerald-500 text-emerald-600 dark:text-emerald-400",
  fits: "border-sky-500 text-sky-600 dark:text-sky-400",
  tight: "border-amber-500 text-amber-600 dark:text-amber-400",
  borderline: "border-amber-500 text-amber-600 dark:text-amber-400",
  "too-long": "border-red-500 text-red-600 dark:text-red-400",
  unknown: "border-dashed",
};

const BAR_STYLES: Record<FitStatus, string> = {
  comfortable: "bg-emerald-500",
  fits: "bg-sky-500",
  tight: "bg-amber-500",
  borderline: "bg-amber-500",
  "too-long": "bg-red-500",
  unknown: "bg-transparent",
};

const COLUMN_COUNT = 5;

function describeRoomLeft(fit: FitResult): string {
  if (fit.remainingTokens === null) return "—";
  if (fit.remainingTokens < 0) return `Over by about ${formatApproxCount(-fit.remainingTokens)} tokens`;
  const words = windowCapacity(fit.remainingTokens).words;
  return `About ${formatApproxCount(fit.remainingTokens)} tokens (${formatApproxCount(words)} words)`;
}

interface TokenFitTableProps {
  rows: readonly FitRow[];
}

/** Shows how the total compares with each model's context window. */
export function TokenFitTable({ rows }: TokenFitTableProps) {
  return (
    <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
      <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
        <caption className="sr-only">Estimated total compared with each model's context window</caption>
        <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
          <tr>
            <th scope="col" className="p-3">Model</th>
            <th scope="col" className="p-3">Window</th>
            <th scope="col" className="p-3">Used</th>
            <th scope="col" className="p-3">Room left</th>
            <th scope="col" className="p-3">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={COLUMN_COUNT} className="p-6 text-center text-[var(--color-muted)]">No models to compare.</td>
            </tr>
          )}
          {rows.map(({ entry, fit }) => (
            <tr key={entry.id} className="border-t border-[var(--color-border)]">
              <th scope="row" className="p-3 text-left align-top font-normal">
                <span className="font-semibold">{entry.model}</span>
                <span className="block text-xs text-[var(--color-muted)]">
                  {entry.maker}
                  {entry.note ? ` · ${entry.note}` : ""}
                </span>
              </th>
              <td className="p-3 align-top tabular-nums">
                {entry.contextTokens === null ? "Not confirmed" : formatCompactTokens(entry.contextTokens)}
              </td>
              <td className="p-3 align-top">
                {fit.usedRatio === null ? (
                  "—"
                ) : (
                  <>
                    <span className="tabular-nums">{formatPercent(fit.usedRatio)}</span>
                    <span aria-hidden="true" className="mt-1 block h-2 w-28 overflow-hidden rounded-full bg-[var(--color-border)]">
                      <span
                        className={`block h-full ${BAR_STYLES[fit.status]}`}
                        style={{ width: `${Math.min(100, fit.usedRatio * 100)}%` }}
                      />
                    </span>
                  </>
                )}
              </td>
              <td className="p-3 align-top">{describeRoomLeft(fit)}</td>
              <td className="p-3 align-top">
                <span className={`${BADGE_CLASS} ${STATUS_STYLES[fit.status]}`}>{FIT_LABELS[fit.status]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}