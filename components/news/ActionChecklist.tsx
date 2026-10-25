"use client";

import { useState } from "react";
import { BADGE_CLASS, BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { LEVEL_LABELS } from "@/lib/news/explainerConstants";
import { sortActions } from "@/lib/news/explainerLogic";
import type { ExplainerAction } from "@/lib/news/explainerTypes";

/** Tick-off list. Progress lives in memory only and resets on reload. */
export function ActionChecklist({ actions }: { actions: readonly ExplainerAction[] }) {
  const [done, setDone] = useState<ReadonlySet<string>>(new Set());
  const sorted = sortActions(actions);

  function toggle(id: string) {
    setDone((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className={CARD_CLASS}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-sm font-semibold" role="status" aria-live="polite">
          {done.size} of {sorted.length} done
        </p>
        {done.size > 0 && (
          <button type="button" onClick={() => setDone(new Set())} className={`${BUTTON_OUTLINE} !px-3 !py-1 text-sm`}>Reset</button>
        )}
      </div>
      <ul className="m-0 grid list-none gap-3 p-0">
        {sorted.map((action) => (
          <li key={action.id}>
            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input type="checkbox" checked={done.has(action.id)} onChange={() => toggle(action.id)} className={`mt-1 ${FOCUS_RING}`} />
              <span className={done.has(action.id) ? "text-[var(--color-muted)] line-through" : ""}>
                {action.text}{" "}
                <span className={BADGE_CLASS}>Level {action.level} · {LEVEL_LABELS[action.level]}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}