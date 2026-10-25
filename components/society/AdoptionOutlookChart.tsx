import { CARD_CLASS } from "@/components/shared/pageStyles";
import { ADOPTION_POINTS } from "@/lib/society/industries";
import { barPercent, expectedGain, sortByExpectedGain } from "@/lib/society/industriesLogic";

const ROWS = sortByExpectedGain(ADOPTION_POINTS);

/** Current versus expected firm AI use. Every value is also written as text, so the bars never carry meaning alone. */
export function AdoptionOutlookChart() {
  return (
    <figure className={`${CARD_CLASS} m-0`}>
      <figcaption className="mb-4 text-sm text-[var(--color-muted)]">
        Share of US firms using AI in the past two weeks (solid) and the share expecting to use it within six months (striped). Census BTOS, wave ending May 3, 2026. Sorted by expected rise.
      </figcaption>
      <ul className="m-0 grid list-none gap-5 p-0">
        {ROWS.map((point) => (
          <li key={point.id}>
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-sm">
              <strong>{point.label}</strong>
              <span className="tabular-nums">
                Now {point.current}% · Expect {point.expectedText} · Rise of about {expectedGain(point)} points
              </span>
            </div>
            <div aria-hidden="true" className="relative h-4 overflow-hidden rounded-full bg-[var(--color-bg)]">
              <div
                className="absolute inset-y-0 left-0 rounded-full opacity-60"
                style={{
                  width: `${barPercent(point.expectedHigh)}%`,
                  backgroundImage: "repeating-linear-gradient(45deg, var(--color-accent) 0 4px, transparent 4px 8px)",
                }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent)]"
                style={{ width: `${barPercent(point.current)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mb-0 mt-4 text-xs text-[var(--color-muted)]">
        Census found no statistically significant change in the Information or Finance and Insurance figures since December. Expected use is what firms said, not what happened.
      </p>
    </figure>
  );
}