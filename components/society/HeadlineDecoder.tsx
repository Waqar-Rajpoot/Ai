"use client";

import { useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { decodeHeadline } from "@/lib/society/bankingFinance";
import { HEADLINES } from "@/lib/society/bankingFinanceContent";
import { PlainTechnicalToggle } from "./PlainTechnicalToggle";

const DECODED_HEADLINES = HEADLINES.map(decodeHeadline);

/** Pick a common headline and see what it measures, what it does not claim, and its source figures. */
export function HeadlineDecoder() {
  const [activeId, setActiveId] = useState(DECODED_HEADLINES[0].id);
  const [isTechnical, setIsTechnical] = useState(false);
  const active = DECODED_HEADLINES.find((entry) => entry.id === activeId) ?? DECODED_HEADLINES[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
      <div role="group" aria-label="Choose a headline" className="grid content-start gap-2">
        {DECODED_HEADLINES.map((entry) => (
          <button
            key={entry.id}
            type="button"
            aria-pressed={activeId === entry.id}
            onClick={() => setActiveId(entry.id)}
            className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
              activeId === entry.id
                ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            {entry.headline}
          </button>
        ))}
      </div>

      <article className={CARD_CLASS} aria-live="polite">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h3 className="m-0">{active.headline}</h3>
          <PlainTechnicalToggle isTechnical={isTechnical} onChange={setIsTechnical} />
        </div>
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">What it measures</p>
        <p className="mb-3 mt-1 text-sm">{active.measures}</p>
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">What it does not say</p>
        <p className="mb-3 mt-1 text-sm">{active.notClaim}</p>

        {isTechnical && (
          <div className="mb-3 rounded-xl border border-dashed border-[var(--color-accent)] bg-[var(--color-bg)] p-4">
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Go deeper</p>
            <p className="mb-0 mt-1 text-sm">{active.technical}</p>
          </div>
        )}

        <ul className="m-0 grid list-none gap-2 p-0">
          {active.figures.map((figure) => (
            <li key={figure.id} className="rounded-xl border border-[var(--color-border)] p-3 text-sm">
              <span className="mr-2 text-lg font-extrabold tabular-nums">{figure.valueText}</span>
              {figure.measure}
              <span className="mt-1 block text-xs text-[var(--color-muted)]">
                Base: {figure.base}. {figure.period}. Report section {figure.reportSection}.
              </span>
            </li>
          ))}
        </ul>
        <p className="mb-0 mt-3"><span className={BADGE_CLASS}>Source: the 2026 survey, every figure in the ledger below</span></p>
      </article>
    </div>
  );
}