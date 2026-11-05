import { BADGE_CLASS, CARD_CLASS } from "@/components/shared/pageStyles";
import type { ResolvedSeries } from "@/lib/society/aiPowerUse";
import { formatChange, formatFigure } from "@/lib/society/figureRegistry";
import { ValueBar } from "./ValueBar";

interface SeriesCardProps {
  series: ResolvedSeries;
}

/** One measure across dates or scenarios, with changes between reported figures labelled as arithmetic. */
export function SeriesCard({ series }: SeriesCardProps) {
  return (
    <article className={CARD_CLASS}>
      <h3 className="mb-3 mt-0 text-base">{series.label}</h3>
      <ul className="m-0 grid list-none gap-3 p-0">
        {series.points.map((point) => (
          <li key={point.label}>
            <div className="mb-1 flex justify-between gap-3 text-sm">
              <span className="text-[var(--color-muted)]">{point.label}</span>
              <span className="font-semibold tabular-nums">{formatFigure(point.figure)}</span>
            </div>
            <ValueBar value={point.figure.valueTo ?? point.figure.value} max={series.max} isReference={point.isReference} />
          </li>
        ))}
      </ul>
      {series.steps.length > 0 && (
        <p className="mb-0 mt-3 text-sm">
          <span className={BADGE_CLASS}>Arithmetic, not data</span>{" "}
          {series.steps.map((step) => `${formatChange(step.change, step.unit)}, ${step.fromLabel} to ${step.toLabel}`).join("; ")}.
        </p>
      )}
      {series.caution && <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">{series.caution}</p>}
    </article>
  );
}