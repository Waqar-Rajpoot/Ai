"use client";

import { useState } from "react";
import { BADGE_CLASS, BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { CLAUSE_GROUP_LABELS, type TermsMode } from "@/lib/legal/terms";
import { TERMS_IS_DRAFT } from "@/lib/legal/termsConstants";
import { TERMS_CLAUSES } from "@/lib/legal/termsData";

const MODES: readonly { id: TermsMode; label: string }[] = [
  { id: "plain", label: "Plain English" },
  { id: "full", label: "Full wording" },
];

/** The clauses, with a plain-English / full-wording toggle and a print button. */
export function TermsDocument() {
  const [mode, setMode] = useState<TermsMode>("plain");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div role="group" aria-label="Reading mode" className="inline-flex rounded-full border border-[var(--color-border)] p-1">
          {MODES.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={mode === option.id}
              onClick={() => setMode(option.id)}
              className={`rounded-full px-4 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                mode === option.id ? "bg-[image:var(--gradient-accent)] text-white" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => window.print()} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Print</button>
      </div>
      <p className="mb-4 mt-0 text-sm text-[var(--color-muted)] print:hidden" role="status" aria-live="polite">
        {mode === "plain" ? "Showing the plain-English summary. Switch to Full wording for the complete clauses." : "Showing the full wording of each clause."}
      </p>

      <ol className="m-0 grid list-none gap-4 p-0">
        {TERMS_CLAUSES.map((clause, index) => (
          <li key={clause.id} id={clause.id} className={`${CARD_CLASS} scroll-mt-24 break-inside-avoid`}>
            <header className="mb-2 flex flex-wrap items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-sm font-bold text-white">{index + 1}</span>
              <h3 className="m-0">{clause.title}</h3>
              <span className={BADGE_CLASS}>{CLAUSE_GROUP_LABELS[clause.group]}</span>
              {TERMS_IS_DRAFT && clause.needsLegalReview && <span className={`${BADGE_CLASS} border-amber-500`}>Awaiting legal review</span>}
            </header>
            {mode === "plain" ? (
              <>
                <p className="m-0 text-sm font-semibold">{clause.plain}</p>
                <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
                  {clause.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </>
            ) : (
              <div className="grid gap-2 text-sm">
                {clause.full.map((paragraph) => <p key={paragraph} className="m-0">{paragraph}</p>)}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}