import { clampPercent } from "@/lib/society/bankingFinance";

interface PercentBarProps {
  percent: number;
  /** A longer, paler bar behind the main one, such as "including planned use". */
  outerPercent?: number;
}

/** Decorative bar on a 0 to 100 scale. The number is always written next to it, so the bar is hidden from screen readers. */
export function PercentBar({ percent, outerPercent }: PercentBarProps) {
  return (
    <div aria-hidden="true" className="relative h-3 overflow-hidden rounded-full bg-[var(--color-border)]">
      {outerPercent !== undefined && (
        <div className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent)] opacity-40" style={{ width: `${clampPercent(outerPercent)}%` }} />
      )}
      <div className="absolute inset-y-0 left-0 rounded-full bg-[image:var(--gradient-accent)]" style={{ width: `${clampPercent(percent)}%` }} />
    </div>
  );
}