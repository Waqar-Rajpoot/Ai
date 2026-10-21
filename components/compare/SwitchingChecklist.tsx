"use client";

import Link from "next/link";
import { useState } from "react";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import { SWITCHING_CHECKLIST, SWITCHING_PHASES, summariseSwitchingProgress } from "@/lib/compare/switchingChecklist";

/** Tick off each step of a switch. Nothing is stored, so ticks reset when you leave the page. */
export function SwitchingChecklist() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const progress = summariseSwitchingProgress(checkedIds);

  function toggle(id: string) {
    setCheckedIds((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]));
  }

  return (
    <div>
      <div className={`${CARD_CLASS} mb-6`} role="status" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="m-0 text-lg font-bold">{progress.title}</p>
          <p className="m-0 text-sm text-[var(--color-muted)]">
            {progress.doneCount} of {progress.total} steps done
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="Switching checklist progress"
          aria-valuemin={0}
          aria-valuemax={progress.total}
          aria-valuenow={progress.doneCount}
          className="my-3 h-2 overflow-hidden rounded-full bg-[var(--color-border)]"
        >
          <div
            className="h-full bg-[image:var(--gradient-accent)] transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${progress.percentDone}%` }}
          />
        </div>
        <p className="m-0 text-sm text-[var(--color-muted)]">{progress.advice}</p>
        <button
          type="button"
          onClick={() => setCheckedIds([])}
          className={`mt-3 rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
        >
          Clear all
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {SWITCHING_PHASES.map((phase) => (
          <fieldset key={phase.id} className={`${CARD_CLASS} m-0`}>
            <legend className="px-1 font-bold">
              {phase.title}
              <span className="ml-2 text-xs font-normal text-[var(--color-muted)]">
                {progress.byPhase[phase.id].done} of {progress.byPhase[phase.id].total}
              </span>
            </legend>
            <p className="mb-3 mt-0 text-sm text-[var(--color-muted)]">{phase.intro}</p>
            <div className="grid gap-2">
              {SWITCHING_CHECKLIST.filter((item) => item.phase === phase.id).map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 transition hover:border-[var(--color-accent)] motion-reduce:transition-none"
                >
                  <input
                    type="checkbox"
                    checked={checkedIds.includes(item.id)}
                    onChange={() => toggle(item.id)}
                    className={`mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)] ${FOCUS_RING}`}
                  />
                  <span>
                    {item.label}
                    <span className="mt-0.5 block text-xs text-[var(--color-muted)]">
                      {item.hint}
                      {item.href && (
                        <>
                          {" "}
                          <Link href={item.href}>Open the guide</Link>
                        </>
                      )}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  );
}