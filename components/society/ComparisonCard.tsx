import { BADGE_CLASS, CARD_CLASS } from "@/components/shared/pageStyles";
import { formatFigureValue, formatPointChange, type ResolvedComparison } from "@/lib/society/bankingFinance";
import { PercentBar } from "./PercentBar";

interface ComparisonCardProps {
  comparison: ResolvedComparison;
}

/** One measure across survey years, with the change between reported figures labelled as arithmetic. */
export function ComparisonCard({ comparison }: ComparisonCardProps) {
  return (
    <article className={CARD_CLASS}>
      <h3 className="mb-3 mt-0 text-base">{comparison.label}</h3>
      <ul className="m-0 grid list-none gap-3 p-0">
        {comparison.points.map((point) => (
          <li key={point.year}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-[var(--color-muted)]">{point.year}</span>
              <span className="font-semibold tabular-nums">{formatFigureValue(point.figure)}</span>
            </div>
            <PercentBar percent={point.figure.value} />
          </li>
        ))}
      </ul>
      <p className="mb-0 mt-3 text-sm">
        <span className={BADGE_CLASS}>Arithmetic, not data</span>{" "}
        {comparison.steps.map((step) => `${formatPointChange(step.change)}, ${step.fromYear} to ${step.toYear}`).join("; ")}.
      </p>
      {comparison.caution && <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">{comparison.caution}</p>}
    </article>
  );
}