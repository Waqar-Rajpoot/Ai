"use client";

import Link from "next/link";
import { useState } from "react";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import {
  adviseModelType,
  CHOOSER_QUESTIONS,
  isChooserComplete,
  setChooserAnswer,
  type ChooserAnswers,
} from "@/lib/compare/modelTypeChoice";

/** Five questions in, one recommendation out. Hand-written rules, nothing stored. */
export function ModelTypeChooser() {
  const [answers, setAnswers] = useState<Partial<ChooserAnswers>>({});

  const advice = isChooserComplete(answers) ? adviseModelType(answers) : null;
  const answeredCount = CHOOSER_QUESTIONS.filter((question) => answers[question.id] !== undefined).length;

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <div className="grid content-start gap-5">
        {CHOOSER_QUESTIONS.map((question) => (
          <fieldset key={question.id} className="m-0 border-0 p-0">
            <legend className="font-semibold">{question.prompt}</legend>
            <p className="mb-2 mt-0 text-xs text-[var(--color-muted)]">{question.hint}</p>
            <div className="grid gap-2">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 transition hover:border-[var(--color-accent)] motion-reduce:transition-none"
                >
                  <input
                    type="radio"
                    name={`chooser-${question.id}`}
                    checked={answers[question.id] === option.value}
                    onChange={() => setAnswers((previous) => setChooserAnswer(previous, question.id, option.value))}
                    className={`mt-1 h-4 w-4 accent-[var(--color-accent)] ${FOCUS_RING}`}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <button
          type="button"
          onClick={() => setAnswers({})}
          className={`justify-self-start rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`}
        >
          Start again
        </button>
      </div>

      <div role="status" aria-live="polite" className="self-start">
        {advice ? (
          <div className="rounded-2xl border border-[var(--color-accent)] p-5">
            <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Where to start</p>
            <h3 className="mb-2 mt-1 text-xl">{advice.title}</h3>
            <p className="mt-0">{advice.summary}</p>

            <p className="mb-1 mt-4 text-sm font-semibold">Why</p>
            <ul className="m-0 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
              {advice.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>

            <p className="mb-1 mt-4 text-sm font-semibold">Next steps</p>
            <ul className="m-0 grid gap-1 pl-5 text-sm">
              {advice.nextSteps.map((step) => (
                <li key={step.href}>
                  <Link href={step.href}>{step.label}</Link>
                </li>
              ))}
            </ul>

            <p className="mb-0 mt-4 rounded-xl bg-[var(--color-surface)] p-3 text-sm">
              <strong>Watch out:</strong> {advice.watchOut}
            </p>
            <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
              A thinking aid built from simple rules, not a verdict. Prices and features change. Confirm on the provider&apos;s website before buying.
            </p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Answer all {CHOOSER_QUESTIONS.length} questions to see where to start ({answeredCount} of {CHOOSER_QUESTIONS.length} done).
          </p>
        )}
      </div>
    </div>
  );
}