"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { FOCUS_RING } from "@/components/learn/learnStyles";

export type DepthMode = "plain" | "technical";

interface DepthContextValue {
  mode: DepthMode;
  setMode: (mode: DepthMode) => void;
}

const DepthContext = createContext<DepthContextValue>({ mode: "plain", setMode: () => undefined });

const OPTIONS: readonly { value: DepthMode; label: string }[] = [
  { value: "plain", label: "Plain" },
  { value: "technical", label: "Technical" },
];

/** Holds the reading depth for everything inside it. Nothing is stored, so it resets on a new visit. */
export function DepthProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<DepthMode>("plain");
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <DepthContext.Provider value={value}>{children}</DepthContext.Provider>;
}

/** The Plain / Technical switch. */
export function PlainTechnicalToggle() {
  const { mode, setMode } = useContext(DepthContext);

  return (
    <div>
      <div role="group" aria-label="Reading depth" className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] p-1">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={mode === option.value}
            onClick={() => setMode(option.value)}
            className={`rounded-full px-4 py-1.5 text-sm transition motion-reduce:transition-none ${FOCUS_RING} ${
              mode === option.value ? "bg-[image:var(--gradient-accent)] font-semibold text-white" : "text-[var(--color-text)]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">Plain: everyday language. Technical: adds survey names, definitions and units.</p>
    </div>
  );
}

/** Always shows the plain text, and adds the technical detail when the reader switches to Technical. */
export function DepthText({ plain, technical }: { plain: string; technical: string }) {
  const { mode } = useContext(DepthContext);
  return (
    <>
      {plain}
      {mode === "technical" && <span className="mt-1 block text-xs">{technical}</span>}
    </>
  );
}