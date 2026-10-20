"use client";

import { useState } from "react";
import { adviceForTraits, FILE_ADVICE_FALLBACK, FILE_TRAITS, type FileAdviceSeverity } from "@/lib/learn/fileCheck";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

const SEVERITY_STYLES: Record<FileAdviceSeverity, { box: string; label: string }> = {
  stop: { box: "border-rose-500 bg-rose-500/10", label: "Stop" },
  check: { box: "border-amber-500 bg-amber-500/10", label: "Check" },
  tip: { box: "border-emerald-500 bg-emerald-500/10", label: "Tip" },
};

/** Tick what is true about your file and get advice, most serious first. */
export function FileChecker() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const advice = adviceForTraits(selectedIds);

  function toggle(id: string) {
    setSelectedIds((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]));
  }

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 font-semibold">My file…</legend>
        <div className="grid gap-2">
          {FILE_TRAITS.map((trait) => (
            <label key={trait.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 transition hover:border-[var(--color-accent)] motion-reduce:transition-none">
              <input type="checkbox" checked={selectedIds.includes(trait.id)} onChange={() => toggle(trait.id)} className={`h-4 w-4 accent-[var(--color-accent)] ${FOCUS_RING}`} />
              <span>{trait.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div role="status" aria-live="polite" className="grid content-start gap-3">
        {advice.length === 0 ? (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Tick anything that applies to see advice. Nothing is uploaded: this checker runs in your browser.
          </p>
        ) : (
          advice.map((item) => (
            <div key={item.id} className={`rounded-2xl border p-4 ${SEVERITY_STYLES[item.severity].box}`}>
              <p className="m-0 text-sm font-bold uppercase tracking-wide">{SEVERITY_STYLES[item.severity].label}</p>
              <p className="mb-0 mt-1">{item.advice}</p>
            </div>
          ))
        )}
        <p className="m-0 text-sm text-[var(--color-muted)]">{FILE_ADVICE_FALLBACK}</p>
      </div>
    </div>
  );
}