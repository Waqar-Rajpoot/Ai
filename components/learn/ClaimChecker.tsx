"use client";

import { useState } from "react";
import { CHECK_CONTEXTS, getCheckGuidance, type CheckLevel } from "@/lib/learn/factCheck";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

const LEVEL_STYLES: Record<CheckLevel, string> = {
  light: "border-emerald-500 bg-emerald-500/10",
  standard: "border-amber-500 bg-amber-500/10",
  extra: "border-rose-500 bg-rose-500/10",
};

/** Choose what the answer is for and see how closely to check it. */
export function ClaimChecker() {
  const [contextId, setContextId] = useState<string | null>(null);
  const guidance = getCheckGuidance(contextId);

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 font-semibold">I will use this answer for…</legend>
        <div className="grid gap-2">
          {CHECK_CONTEXTS.map((context) => (
            <label key={context.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 transition hover:border-[var(--color-accent)] motion-reduce:transition-none">
              <input type="radio" name="check-context" checked={contextId === context.id} onChange={() => setContextId(context.id)} className={`h-4 w-4 accent-[var(--color-accent)] ${FOCUS_RING}`} />
              <span>{context.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div role="status" aria-live="polite" className="self-start">
        {guidance ? (
          <div className={`rounded-2xl border p-5 ${LEVEL_STYLES[guidance.level]}`}>
            <p className="m-0 text-lg font-bold">{guidance.title}</p>
            <ul className="mb-0 mt-2 grid gap-1 pl-5">
              {guidance.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
            {guidance.limitsNote && <p className="mb-0 mt-3 text-sm font-semibold">{guidance.limitsNote}</p>}
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Pick a situation to see how much checking it needs.
          </p>
        )}
      </div>
    </div>
  );
}