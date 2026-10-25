"use client";

import { useState } from "react";
import { CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { LEVEL_BLURBS, LEVEL_LABELS } from "@/lib/news/explainerConstants";
import { impactsForSelection, type LevelSelection } from "@/lib/news/explainerLogic";
import type { ExplainerLevel, LevelImpact } from "@/lib/news/explainerTypes";

interface LevelImpactPickerProps {
  levels: readonly ExplainerLevel[];
  impacts: readonly LevelImpact[];
}

function pillClass(active: boolean): string {
  const base = `rounded-full border px-3 py-1 text-sm transition motion-reduce:transition-none ${FOCUS_RING}`;
  return active
    ? `${base} border-[var(--color-accent)] bg-[var(--color-accent)] text-white`
    : `${base} border-[var(--color-border)] bg-transparent text-[var(--color-text)]`;
}

/** Choose a reading level to see what the news means for you. Starts at the lowest level this explainer covers. */
export function LevelImpactPicker({ levels, impacts }: LevelImpactPickerProps) {
  const [selection, setSelection] = useState<LevelSelection>(levels[0]);
  const shown = impactsForSelection(impacts, selection);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Choose your level">
        {levels.map((level) => (
          <button key={level} type="button" aria-pressed={selection === level} onClick={() => setSelection(level)} className={pillClass(selection === level)}>
            {level}. {LEVEL_LABELS[level]}
          </button>
        ))}
        <button type="button" aria-pressed={selection === "all"} onClick={() => setSelection("all")} className={pillClass(selection === "all")}>
          Show all
        </button>
      </div>

      <div className="grid gap-4" role="region" aria-live="polite" aria-label="What this means at your level">
        {shown.map((impact) => (
          <article key={impact.level} className={CARD_CLASS}>
            <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">
              Level {impact.level} · {LEVEL_LABELS[impact.level]}
            </p>
            <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">{LEVEL_BLURBS[impact.level]}</p>
            <h3 className="mb-2 mt-3">{impact.headline}</h3>
            <ul className="m-0 grid gap-2 pl-5 text-sm">
              {impact.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}