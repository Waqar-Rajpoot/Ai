"use client";

import { useState } from "react";
import { BUTTON_OUTLINE } from "@/components/shared/pageStyles";

type CopyStatus = "idle" | "copied" | "failed";

interface CopyTemplateButtonProps {
  text: string;
  label: string;
}

/** Copies a block of text to the clipboard. Reports success or failure in words, for screen readers too. */
export function CopyTemplateButton({ text, label }: CopyTemplateButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      // Clipboard access can be blocked by the browser or the page context, so say so instead of failing silently.
      setStatus("failed");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={copyText} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>
        {label}
      </button>
      <span role="status" aria-live="polite" className="text-sm text-[var(--color-muted)]">
        {status === "copied" && "Copied."}
        {status === "failed" && "Could not copy. Select the text and copy it by hand."}
      </span>
    </div>
  );
}