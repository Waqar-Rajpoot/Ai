import { formatApproxCount } from "@/lib/tools/tokenEstimate";

export interface BudgetPart {
  id: string;
  label: string;
  tokens: number;
  /** Tailwind background class for this slice. */
  colorClass: string;
}

interface TokenBudgetBarProps {
  parts: readonly BudgetPart[];
}

/** Stacked bar of what fills the window. The legend repeats every number, so colour is never the only signal. */
export function TokenBudgetBar({ parts }: TokenBudgetBarProps) {
  const total = parts.reduce((sum, part) => sum + part.tokens, 0);
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-[var(--color-border)]" aria-hidden="true">
        {total > 0 &&
          parts.map((part) =>
            part.tokens > 0 ? (
              <div key={part.id} className={part.colorClass} style={{ width: `${(part.tokens / total) * 100}%` }} />
            ) : null,
          )}
      </div>
      <ul className="m-0 mt-3 grid list-none gap-1 p-0 text-sm">
        {parts.map((part) => (
          <li key={part.id} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className={`inline-block h-3 w-3 rounded-sm ${part.colorClass}`} />
              {part.label}
            </span>
            <span className="tabular-nums">
              {formatApproxCount(part.tokens)} ({total > 0 ? Math.round((part.tokens / total) * 100) : 0}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}