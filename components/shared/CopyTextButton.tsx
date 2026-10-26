"use client";

import { useState } from "react";
import { BUTTON_OUTLINE } from "./pageStyles";

interface CopyTextButtonProps {
  text: string;
  label: string;
  disabled?: boolean;
}

interface CopyResult {
  status: "copied" | "failed";
  text: string;
}

/** Copies text to the clipboard. The status clears itself if the text changes afterwards. */
export function CopyTextButton({ text, label, disabled = false }: CopyTextButtonProps) {
  const [result, setResult] = useState<CopyResult | null>(null);
  const status = result && result.text === text ? result.status : null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setResult({ status: "copied", text });
    } catch {
      setResult({ status: "failed", text });
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <button type="button" disabled={disabled} onClick={copy} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm disabled:opacity-50`}>
        {label}
      </button>
      <span className="text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        {status === "copied" && "Copied."}
        {status === "failed" && "Could not copy. Select the text and copy it yourself."}
      </span>
    </span>
  );
}