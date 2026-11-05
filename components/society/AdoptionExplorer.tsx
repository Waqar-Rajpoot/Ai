"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  ADOPTION_FROM_QUARTER,
  ADOPTION_GROUP,
  ADOPTION_ROWS,
  ADOPTION_TO_QUARTER,
} from "@/lib/society/adoptionData";
import { formatPercent, formatPoints, getSeriesStats } from "@/lib/society/adoptionExplained";
import { METRIC_NOTES } from "@/lib/society/adoptionSurveysData";
import { PlainTechnicalToggle } from "./PlainTechnicalToggle";

const STATS = getSeriesStats();

/** Pick overall, work or outside-work use and see the two quarters and the change. */
export function AdoptionExplorer() {
  const [activeId, setActiveId] = useState(ADOPTION_ROWS[0].id);
  const [isTechnical, setIsTechnical] = useState(false);

  const active = useMemo(() => STATS.find((stat) => stat.id === activeId) ?? STATS[0], [activeId]);
  const note = METRIC_NOTES[active.id];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Choose a measure" className="flex flex-wrap gap-2">
          {STATS.map((stat) => (
            <button
              key={stat.id}
              type="button"
              aria-pressed={activeId === stat.id}
              onClick={() => setActiveId(stat.id)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                activeId === stat.id
                  ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {stat.label}
            </button>
          ))}
        </div>
        <PlainTechnicalToggle isTechnical={isTechnical} onChange={setIsTechnical} />
      </div>

      <article className={CARD_CLASS} aria-live="polite">
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">{ADOPTION_GROUP}</p>
        <h3 className="mb-1 mt-1">{active.label}</h3>
        <p className="m-0 text-sm text-[var(--color-muted)]">{note?.plain}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="m-0 text-xs text-[var(--color-muted)]">{ADOPTION_FROM_QUARTER}</p>
            <p className="m-0 text-3xl font-extrabold tabular-nums">{formatPercent(active.fromPercent)}</p>
          </div>
          <div>
            <p className="m-0 text-xs text-[var(--color-muted)]">{ADOPTION_TO_QUARTER}</p>
            <p className="m-0 text-3xl font-extrabold tabular-nums">{formatPercent(active.toPercent)}</p>
          </div>
          <div>
            <p className="m-0 text-xs text-[var(--color-muted)]">Change</p>
            <p className="m-0 text-3xl font-extrabold tabular-nums">{formatPoints(active.pointChange)}</p>
            <p className="m-0 text-xs text-[var(--color-muted)]">about {active.relativeChangePercent}% more than at the start</p>
          </div>
        </div>

        <div
          className="relative mt-5 h-4 overflow-hidden rounded-full bg-[var(--color-border)]"
          role="img"
          aria-label={`${active.label}: ${active.fromPercent} percent in ${ADOPTION_FROM_QUARTER}, ${active.toPercent} percent in ${ADOPTION_TO_QUARTER}, on a scale of 0 to 100 percent`}
        >
          <div className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent)] opacity-40" style={{ width: `${active.fromPercent}%` }} />
          <div className="absolute inset-y-0 left-0 rounded-full bg-[image:var(--gradient-accent)]" style={{ width: `${active.toPercent}%` }} />
        </div>
        <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">Scale 0 to 100%. Pale bar: {ADOPTION_FROM_QUARTER}. Solid bar: {ADOPTION_TO_QUARTER}.</p>

        {active.averagePointsPerQuarter !== null && (
          <p className="mb-0 mt-3 text-sm">
            <span className={BADGE_CLASS}>Arithmetic, not data</span>{" "}
            Spread evenly, that is about {active.averagePointsPerQuarter} points a quarter. The real path between the two dates could be faster, slower or uneven, and we do not show it.
          </p>
        )}

        {isTechnical && (
          <div className="mt-4 rounded-xl border border-dashed border-[var(--color-accent)] bg-[var(--color-bg)] p-4">
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Go deeper</p>
            <p className="mb-0 mt-1 text-sm">{note?.technical}</p>
          </div>
        )}
      </article>

      <div className={`${CARD_CLASS} mt-4 overflow-x-auto p-0`}>
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <caption className="sr-only">All three measures side by side</caption>
          <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
            <tr>
              <th scope="col" className="p-3">Measure</th>
              <th scope="col" className="p-3">{ADOPTION_FROM_QUARTER}</th>
              <th scope="col" className="p-3">{ADOPTION_TO_QUARTER}</th>
              <th scope="col" className="p-3">Change</th>
            </tr>
          </thead>
          <tbody>
            {STATS.map((stat) => (
              <tr key={stat.id} className="border-t border-[var(--color-border)]">
                <th scope="row" className="p-3 text-left font-semibold">{stat.label}</th>
                <td className="p-3 tabular-nums">{formatPercent(stat.fromPercent)}</td>
                <td className="p-3 tabular-nums">{formatPercent(stat.toPercent)}</td>
                <td className="p-3 tabular-nums">{formatPoints(stat.pointChange)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}