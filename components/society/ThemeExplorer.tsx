"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  BALANCE_LABELS,
  EVIDENCE_LABELS,
  buildBalanceFilterOptions,
  filterThemes,
  type BalanceFilter,
} from "@/lib/society/prosCons";
import { PROS_CONS_THEMES } from "@/lib/society/prosConsData";
import { PlainTechnicalToggle } from "./PlainTechnicalToggle";

const NUMBER_BY_ID = new Map(PROS_CONS_THEMES.map((theme, index) => [theme.id, index + 1]));
const LABEL_CLASS = "m-0 text-xs font-bold uppercase tracking-wider";

/** The nine themes with benefits and costs side by side, a balance filter and a Plain / Technical toggle. */
export function ThemeExplorer() {
  const [isTechnical, setIsTechnical] = useState(false);
  const [filter, setFilter] = useState<BalanceFilter>("all");

  const options = useMemo(() => buildBalanceFilterOptions(PROS_CONS_THEMES), []);
  const visibleThemes = useMemo(() => filterThemes(PROS_CONS_THEMES, filter), [filter]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by balance" className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                filter === option.id
                  ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
        <PlainTechnicalToggle isTechnical={isTechnical} onChange={setIsTechnical} />
      </div>

      <p className="mb-6 mt-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        Showing {visibleThemes.length} of {PROS_CONS_THEMES.length} themes.{" "}
        {isTechnical ? "The technical layer is on." : "Switch to Technical for how each one works."}
      </p>

      <div className="grid gap-4">
        {visibleThemes.map((theme) => (
          <article key={theme.id} id={theme.id} className={`${CARD_CLASS} scroll-mt-24`}>
            <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="m-0 text-sm font-bold text-[var(--color-accent)]">Theme {NUMBER_BY_ID.get(theme.id)}</p>
                <h3 className="mb-0 mt-1">{theme.title}</h3>
                <p className="m-0 text-sm text-[var(--color-muted)]">{theme.question}</p>
              </div>
              <ul className="m-0 flex list-none flex-wrap gap-1 p-0">
                <li className={`${BADGE_CLASS} border-[var(--color-accent)]`}>{BALANCE_LABELS[theme.balance]}</li>
                <li className={BADGE_CLASS}>{EVIDENCE_LABELS[theme.evidence]}</li>
              </ul>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className={`${LABEL_CLASS} text-[var(--color-accent)]`}>What helps</p>
                <ul className="mb-0 mt-2 grid gap-2 pl-5 text-sm">
                  {theme.pros.map((pro) => <li key={pro}>{pro}</li>)}
                </ul>
              </div>
              <div>
                <p className={`${LABEL_CLASS} text-[var(--color-muted)]`}>What it costs</p>
                <ul className="mb-0 mt-2 grid gap-2 pl-5 text-sm">
                  {theme.cons.map((con) => <li key={con}>{con}</li>)}
                </ul>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className={`${LABEL_CLASS} text-[var(--color-muted)]`}>Evidence</p>
                <p className="mb-0 mt-1 text-sm">{theme.evidenceNote}</p>
              </div>
              <div>
                <p className={`${LABEL_CLASS} text-[var(--color-muted)]`}>Most affected</p>
                <p className="mb-0 mt-1 text-sm">{theme.mostAffected}</p>
              </div>
            </div>

            <p className="mb-0 mt-4 text-sm"><strong>What you can do:</strong> {theme.whatYouCanDo}</p>

            {isTechnical && (
              <div className="mt-4 rounded-xl border border-dashed border-[var(--color-accent)] bg-[var(--color-bg)] p-4">
                <p className={`${LABEL_CLASS} text-[var(--color-accent)]`}>Go deeper</p>
                <p className="mb-0 mt-1 text-sm">{theme.technicalNote}</p>
              </div>
            )}

            <p className="mb-0 mt-3 flex flex-wrap gap-4 text-sm">
              {theme.anchorFigureId && <a href="#figures">See the figures</a>}
              {theme.guide && <a href={theme.guide.href}>{theme.guide.label}</a>}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}