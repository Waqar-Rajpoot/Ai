import { barWidthPercent } from "@/lib/society/figureRegistry";

interface ValueBarProps {
  value: number;
  max: number;
  /** A fixed comparison line, drawn in a muted colour. */
  isReference?: boolean;
}

/** Decorative bar on a 0-to-max scale. The number is always written beside it, so the bar is hidden from screen readers. */
export function ValueBar({ value, max, isReference = false }: ValueBarProps) {
  return (
    <div aria-hidden="true" className="relative h-3 overflow-hidden rounded-full bg-[var(--color-border)]">
      <div
        className={`absolute inset-y-0 left-0 rounded-full ${isReference ? "bg-[var(--color-muted)]" : "bg-[image:var(--gradient-accent)]"}`}
        style={{ width: `${barWidthPercent(value, max)}%` }}
      />
    </div>
  );
}