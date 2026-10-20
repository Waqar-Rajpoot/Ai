"use client";

import { useEffect, useState } from "react";
import { COPY_CONFIRMATION_MS } from "@/lib/learn/learnConstants";
import { BUTTON_PRIMARY } from "./learnStyles";

interface CopyablePromptProps {
  /** Text to show and copy. Empty text disables the copy button. */
  text: string;
  /** Shown instead of the text while it is empty. */
  emptyMessage?: string;
}

/** A read-only prompt box with a copy button and a short "Copied" confirmation. */
export function CopyablePrompt({ text, emptyMessage = "Nothing to copy yet." }: CopyablePromptProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (!hasCopied) return;
    const timer = window.setTimeout(() => setHasCopied(false), COPY_CONFIRMATION_MS);
    return () => window.clearTimeout(timer);
  }, [hasCopied]);

  async function copyText() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
    } catch {
      // Clipboard blocked: the text stays visible and selectable.
    }
  }

  return (
    <div className="flex flex-col">
      <pre className="m-0 min-h-24 whitespace-pre-wrap break-words rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 font-sans text-[0.95rem]">
        {text || emptyMessage}
      </pre>
      <button type="button" onClick={copyText} disabled={!text} className={`${BUTTON_PRIMARY} mt-3 self-start disabled:opacity-50`}>
        {hasCopied ? "Copied" : "Copy"}
      </button>
      <span role="status" className="sr-only">{hasCopied ? "Copied to clipboard" : ""}</span>
    </div>
  );
}