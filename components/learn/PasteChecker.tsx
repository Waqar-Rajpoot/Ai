"use client";

import { useState } from "react";
import { PASTE_ITEMS, VERDICT_MESSAGES, worstVerdict, type PasteVerdict } from "@/lib/learn/pasteCheck";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

const VERDICT_STYLES: Record<PasteVerdict, { box: string; icon: string }> = {
  never: { box: "border-rose-500 bg-rose-500/10", icon: "✗" },
  think: { box: "border-amber-500 bg-amber-500/10", icon: "!" },
  ok: { box: "border-emerald-500 bg-emerald-500/10", icon: "✓" },
};

/** Tick what you are about to paste and get the most cautious verdict. */
export function PasteChecker() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const verdict = worstVerdict(selectedIds);

  function toggle(id: string) {
    setSelectedIds((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]));
  }

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 font-semibold">I am about to paste…</legend>
        <div className="grid gap-2">
          {PASTE_ITEMS.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 transition hover:border-[var(--color-accent)] motion-reduce:transition-none"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggle(item.id)}
                className={`h-4 w-4 accent-[var(--color-accent)] ${FOCUS_RING}`}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div role="status" aria-live="polite" className="self-start">
        {verdict ? (
          <div className={`rounded-2xl border p-5 ${VERDICT_STYLES[verdict].box}`}>
            <p className="m-0 flex items-center gap-2 text-lg font-bold">
              <span aria-hidden="true">{VERDICT_STYLES[verdict].icon}</span>
              {VERDICT_MESSAGES[verdict].title}
            </p>
            <p className="mb-0 mt-2">{VERDICT_MESSAGES[verdict].advice}</p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Tick one or more items to see the verdict. Your choices stay in your browser.
          </p>
        )}
      </div>
    </div>
  );
}