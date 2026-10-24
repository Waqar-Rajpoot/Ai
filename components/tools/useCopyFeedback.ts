"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COPY_FEEDBACK_MS } from "@/lib/tools/cheatSheetConstants";

interface CopyResult {
  key: string;
  succeeded: boolean;
}

/** Copies text to the clipboard and reports the result for a short time, per button key. */
export function useCopyFeedback() {
  const [result, setResult] = useState<CopyResult | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = useCallback(async (key: string, text: string) => {
    let succeeded = false;
    try {
      await navigator.clipboard.writeText(text);
      succeeded = true;
    } catch {
      // Clipboard blocked: tell the reader to select the text instead.
    }
    setResult({ key, succeeded });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setResult(null), COPY_FEEDBACK_MS);
  }, []);

  const labelFor = useCallback(
    (key: string, idleLabel: string) => {
      if (result?.key !== key) return idleLabel;
      return result.succeeded ? "Copied" : "Copy failed: select the text instead";
    },
    [result],
  );

  return { copy, labelFor };
}