"use client";

import { useState } from "react";
import { GUIDE_LAYOUT_LABELS } from "@/lib/learn/guideConfig";

interface CopyPromptButtonProps {
  /** The exact prompt text to place on the clipboard. */
  readonly text: string;
  /** Short name of the prompt, used for the accessible label. */
  readonly promptTitle: string;
}

type CopyState = "idle" | "copied" | "failed";

/**
 * Copies one prompt to the clipboard. Runs entirely in the browser, with no network request.
 * If the clipboard is unavailable, it tells the reader to select and copy the text instead.
 */
export function CopyPromptButton({ text, promptTitle }: CopyPromptButtonProps) {
  const [state, setState] = useState<CopyState>("idle");

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2500);
  }

  const label =
    state === "copied"
      ? GUIDE_LAYOUT_LABELS.copied
      : state === "failed"
        ? GUIDE_LAYOUT_LABELS.copyFailed
        : GUIDE_LAYOUT_LABELS.copy;

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`${GUIDE_LAYOUT_LABELS.copy}: ${promptTitle}`}
      className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
    >
      <span aria-live="polite">{label}</span>
    </button>
  );
}
