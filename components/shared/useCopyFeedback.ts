import { useCallback, useEffect, useState } from "react";
import { COPY_FEEDBACK_MILLISECONDS } from "@/lib/shared/timing";

export type CopyState = "idle" | "copied" | "failed";

/** Copies text to the clipboard, reports "copied" or "failed" for a moment, then resets. */
export function useCopyFeedback(): { copyState: CopyState; copyText: (text: string) => Promise<void> } {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  useEffect(() => {
    if (copyState === "idle") return undefined;
    const timer = window.setTimeout(() => setCopyState("idle"), COPY_FEEDBACK_MILLISECONDS);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const copyText = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }, []);

  return { copyState, copyText };
}