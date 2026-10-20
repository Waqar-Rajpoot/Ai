"use client";

import { useState } from "react";
import { assessBenchmarkChecklist, BENCHMARK_QUESTIONS, type BenchmarkTrust } from "@/lib/tools/checklists";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

const TRUST_STYLES: Record<BenchmarkTrust, string> = {
  "lead-only": "border-rose-500 bg-rose-500/10",
  "partly-checked": "border-amber-500 bg-amber-500/10",
  "well-documented": "border-emerald-500 bg-emerald-500/10",
};

/** Ten questions to ask before trusting a benchmark score. Tick the ones you can answer yes to. */
export function BenchmarkChecklist() {
  const [yesIds, setYesIds] = useState<string[]>([]);
  const assessment = assessBenchmarkChecklist(yesIds);

  function toggle(id: string) {
    setYesIds((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]));
  }

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 font-semibold">For the score you are reading, tick each question you can answer yes to.</legend>
        <div className="grid gap-2">
          {BENCHMARK_QUESTIONS.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 transition hover:border-[var(--color-accent)] motion-reduce:transition-none"
            >
              <input
                type="checkbox"
                checked={yesIds.includes(item.id)}
                onChange={() => toggle(item.id)}
                className={`mt-1 h-4 w-4 accent-[var(--color-accent)] ${FOCUS_RING}`}
              />
              <span>
                {item.question}
                <span className="mt-0.5 block text-xs text-[var(--color-muted)]">{item.why}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div role="status" aria-live="polite" className="self-start">
        {assessment ? (
          <div className={`rounded-2xl border p-5 ${TRUST_STYLES[assessment.trust]}`}>
            <p className="m-0 text-sm font-semibold">
              {assessment.yesCount} of {assessment.total} answered yes
            </p>
            <p className="my-1 text-lg font-bold">{assessment.title}</p>
            <p className="m-0 text-sm">{assessment.advice}</p>
            <p className="mb-0 mt-4 text-xs text-[var(--color-muted)]">A thinking aid, not a verdict. A well-documented score can still be the wrong test for your task.</p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Tick the questions you can answer yes to. A score nobody can document should stay a lead.
          </p>
        )}
      </div>
    </div>
  );
}