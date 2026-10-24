"use client";

import { useEffect, useRef, useState } from "react";
import { FOCUS_RING } from "./pageStyles";

const RESET_AFTER_MS = 2000;

type CopyState = "idle" | "copied" | "failed";

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  /** Extra words for screen readers, such as which prompt this button copies. */
  context?: string;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Copies text to the clipboard and says whether it worked. Needs https or localhost. */
export function CopyButton({ text, label = "Copy", copiedLabel = "Copied", context }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    const worked = await copyText(text);
    setState(worked ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), RESET_AFTER_MS);
  }

  const visibleLabel = state === "copied" ? copiedLabel : state === "failed" ? "Copy failed, select the text" : label;

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
      >
        {visibleLabel}
        {context ? <span className="sr-only">: {context}</span> : null}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Copy failed" : ""}
      </span>
    </>
  );
}