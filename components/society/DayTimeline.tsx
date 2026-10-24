"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  AI_KINDS,
  CONTROL_LABELS,
  KIND_LABELS,
  VISIBILITY_LABELS,
  countByKind,
  filterByKind,
  formatClockTime,
  groupByPartOfDay,
  type KindFilter,
} from "@/lib/society/tenPlaces";
import { TEN_PLACES } from "@/lib/society/tenPlacesData";
import { PlainTechnicalToggle } from "./PlainTechnicalToggle";

const NUMBER_BY_ID = new Map(TEN_PLACES.map((place, index) => [place.id, index + 1]));

const LABEL_CLASS = "m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]";

/** The ten places in time order, with a kind-of-AI filter and a Plain / Technical toggle. */
export function DayTimeline() {
  const [isTechnical, setIsTechnical] = useState(false);
  const [kindFilter, setKindFilter] = useState<KindFilter>("all");

  const counts = useMemo(() => countByKind(TEN_PLACES), []);
  const visiblePlaces = useMemo(() => filterByKind(TEN_PLACES, kindFilter), [kindFilter]);
  const parts = useMemo(() => groupByPartOfDay(visiblePlaces), [visiblePlaces]);

  const filters: readonly { id: KindFilter; label: string }[] = [
    { id: "all", label: `All ${TEN_PLACES.length}` },
    ...AI_KINDS.map((kind) => ({ id: kind, label: `${KIND_LABELS[kind]} (${counts[kind]})` })),
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by kind of AI" className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={kindFilter === filter.id}
              onClick={() => setKindFilter(filter.id)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                kindFilter === filter.id
                  ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <PlainTechnicalToggle isTechnical={isTechnical} onChange={setIsTechnical} />
      </div>

      <p className="mb-6 mt-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        Showing {visiblePlaces.length} of {TEN_PLACES.length} places.{" "}
        {isTechnical ? "The technical layer is on." : "Switch to Technical for how each one works."}
      </p>

      {parts.map((group) => (
        <section key={group.part} aria-labelledby={`part-${group.part}`} className="mb-8">
          <h3 id={`part-${group.part}`} className="mb-3 mt-0">{group.label}</h3>
          <div className="grid gap-4">
            {group.places.map((place) => (
              <article key={place.id} id={place.id} className={`${CARD_CLASS} scroll-mt-24`}>
                <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="m-0 text-sm font-bold tabular-nums text-[var(--color-accent)]">
                      {formatClockTime(place.minutesSinceMidnight)}
                    </p>
                    <h4 className="mb-0 mt-1 text-lg">
                      {NUMBER_BY_ID.get(place.id)}. {place.title}
                    </h4>
                  </div>
                  <ul className="m-0 flex list-none flex-wrap gap-1 p-0">
                    {place.kinds.map((kind) => (
                      <li key={kind} className={BADGE_CLASS}>{KIND_LABELS[kind]}</li>
                    ))}
                  </ul>
                </header>

                <p className="m-0 text-sm text-[var(--color-muted)]">{place.whereYouMeetIt}</p>
                <p className="mb-0 mt-3 text-sm"><strong>What the AI does:</strong> {place.whatItDoes}</p>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className={LABEL_CLASS}>Helps</p>
                    <p className="mb-0 mt-1 text-sm">{place.benefit}</p>
                  </div>
                  <div>
                    <p className={LABEL_CLASS}>Watch out</p>
                    <p className="mb-0 mt-1 text-sm">{place.watchOut}</p>
                  </div>
                  <div>
                    <p className={LABEL_CLASS}>What you can do</p>
                    <p className="mb-0 mt-1 text-sm">{place.whatYouCanDo}</p>
                  </div>
                </div>

                <p className="mb-0 mt-4 flex flex-wrap gap-2 text-xs">
                  <span className={BADGE_CLASS}>{VISIBILITY_LABELS[place.visibility]}</span>
                  <span className={BADGE_CLASS}>{CONTROL_LABELS[place.control]}</span>
                </p>

                {isTechnical && (
                  <div className="mt-4 rounded-xl border border-dashed border-[var(--color-accent)] bg-[var(--color-bg)] p-4">
                    <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Go deeper</p>
                    <p className="mb-0 mt-1 text-sm">{place.technicalNote}</p>
                  </div>
                )}

                {place.guide && (
                  <p className="mb-0 mt-3 text-sm"><a href={place.guide.href}>{place.guide.label}</a></p>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}