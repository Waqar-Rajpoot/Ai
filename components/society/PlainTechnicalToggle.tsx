"use client";

import { FOCUS_RING } from "@/components/shared/pageStyles";

export type ReadingMode = "plain" | "technical";

const OPTIONS: readonly { id: ReadingMode; label: string }[] = [
  { id: "plain", label: "Plain" },
  { id: "technical", label: "Technical" },
];

interface PlainTechnicalToggleProps {
  mode: ReadingMode;
  onChange: (mode: ReadingMode) => void;
}

/** Switches a page between plain-English and technical detail. Controlled, so any page can own the state. */
export function PlainTechnicalToggle({ mode, onChange }: PlainTechnicalToggleProps) {
  return (
    <div role="group" aria-label="Reading level" className="inline-flex rounded-full border border-[var(--color-border)] p-0.5">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={mode === option.id}
          onClick={() => onChange(option.id)}
          className={`rounded-full px-4 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
            mode === option.id ? "bg-[image:var(--gradient-accent)] text-white" : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}