"use client";

import { useState } from "react";
import { CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { listSettingsGuideRows, PRIVACY_ROWS } from "@/lib/prices/privacyMatrix";

const GUIDE_ROWS = listSettingsGuideRows(PRIVACY_ROWS);

/** Step-by-step list for turning off data sharing, one service at a time. */
export function PrivacySettingsGuide() {
  const [selectedId, setSelectedId] = useState(GUIDE_ROWS[0]?.id ?? "");
  const selected = GUIDE_ROWS.find((row) => row.id === selectedId) ?? GUIDE_ROWS[0];

  if (!selected) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div className="grid gap-2 self-start" role="group" aria-label="Choose a service">
        {GUIDE_ROWS.map((row) => (
          <button
            key={row.id}
            type="button"
            aria-pressed={selected.id === row.id}
            onClick={() => setSelectedId(row.id)}
            className={`rounded-xl border px-3 py-2 text-left text-sm transition motion-reduce:transition-none ${FOCUS_RING} ${
              selected.id === row.id
                ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)]"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            <strong className="block">{row.name}</strong>
            <span className="text-[var(--color-muted)]">{row.plans}</span>
          </button>
        ))}
      </div>

      <div className={CARD_CLASS} aria-live="polite">
        <h3 className="mt-0">{selected.name}</h3>
        <ol className="m-0 grid gap-3 pl-5 text-sm">
          {selected.turnOffSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <p className="mb-0 mt-4 rounded-xl border border-[var(--color-border)] p-3 text-sm">{selected.turnOffNote}</p>
        {selected.settingsUrl && (
          <p className="mb-0 mt-3 text-sm">
            <a href={selected.settingsUrl} target="_blank" rel="noopener noreferrer">Open the settings page</a>
          </p>
        )}
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
          Menu names change. If a step does not match what you see, search the provider&apos;s help centre for the setting name.
        </p>
      </div>
    </div>
  );
}