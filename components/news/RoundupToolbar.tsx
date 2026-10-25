"use client";

import { BUTTON_OUTLINE } from "@/components/shared/pageStyles";
import { useCopyFeedback } from "@/components/tools/useCopyFeedback";

const SMALL_BUTTON = `${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`;

/** Copy the roundup as plain text, copy its link, or print it. */
export function RoundupToolbar({ plainText }: { plainText: string }) {
  const { copy, labelFor } = useCopyFeedback();
  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <button type="button" onClick={() => copy("roundup-text", plainText)} className={SMALL_BUTTON}>
        {labelFor("roundup-text", "Copy as text")}
      </button>
      <button type="button" onClick={() => copy("roundup-link", window.location.href)} className={SMALL_BUTTON}>
        {labelFor("roundup-link", "Copy link")}
      </button>
      <button type="button" onClick={() => window.print()} className={SMALL_BUTTON}>Print</button>
    </div>
  );
}