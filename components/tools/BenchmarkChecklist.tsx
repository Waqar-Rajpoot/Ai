"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BADGE_CLASS, BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { useCopyFeedback } from "@/components/shared/useCopyFeedback";
import {
  ANSWER_OPTIONS,
  BENCHMARK_EXAMPLES,
  BENCHMARK_QUESTIONS,
  TIER_COPY,
  type BenchmarkExample,
} from "@/lib/tools/benchmarkChecklistData";
import {
  buildBenchmarkSummary,
  createBlankBenchmarkAnswers,
  findBenchmarkQuestion,
  getOpenQuestions,
  scoreBenchmarkChecklist,
  trimSubject,
} from "@/lib/tools/benchmarkChecklist";
import { MAX_SUBJECT_LENGTH } from "@/lib/tools/benchmarkConstants";
import { getAnswer, type ChecklistAnswer, type ChecklistAnswers, type EvidenceTier } from "@/lib/tools/checklists";

const TIER_BORDERS: Record<EvidenceTier | "incomplete", string> = {
  incomplete: "border-[var(--color-border)]",
  strong: "border-emerald-500",
  moderate: "border-amber-500",
  weak: "border-red-500",
};

function describeAnswer(answer: ChecklistAnswer): string {
  return ANSWER_OPTIONS.find((option) => option.id === answer)?.label ?? "Not answered";
}

/** The ten-question checklist and its rating. All scoring lives in lib/tools. Nothing is saved or sent. */
export function BenchmarkChecklist() {
  const [subject, setSubject] = useState("");
  const [answers, setAnswers] = useState<ChecklistAnswers>(createBlankBenchmarkAnswers);
  const { copyState, copyText } = useCopyFeedback();

  const score:any = useMemo(() => scoreBenchmarkChecklist(answers), [answers]);
  const openQuestions = useMemo(() => getOpenQuestions(answers), [answers]);
  const redFlagQuestions = score.criticalNoIds.flatMap((questionId: string) => {
    const question = findBenchmarkQuestion(questionId);
    return question ? [question] : [];
  });
  const tierKey: EvidenceTier | "incomplete" = score.tier ?? "incomplete";
  const tierCopy = TIER_COPY[tierKey];

  function setAnswer(questionId: string, answer: ChecklistAnswer) {
    setAnswers((current) => ({ ...current, [questionId]: answer }));
  }

  function applyExample(example: BenchmarkExample) {
    setSubject(example.title);
    setAnswers({ ...createBlankBenchmarkAnswers(), ...example.answers });
  }

  function reset() {
    setSubject("");
    setAnswers(createBlankBenchmarkAnswers());
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="grid gap-4">
        <div className={`${CARD_CLASS} grid gap-4 print:hidden`}>
          <div className="grid gap-1">
            <label htmlFor="benchmark-subject" className="text-sm font-semibold">What are you checking? (optional)</label>
            <input
              id="benchmark-subject"
              type="text"
              maxLength={MAX_SUBJECT_LENGTH}
              value={subject}
              onChange={(event) => setSubject(trimSubject(event.target.value))}
              placeholder="for example: Model X coding score from its launch post"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <p className="m-0 mb-2 text-sm font-semibold">Or try an example pattern</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Example patterns">
              {BENCHMARK_EXAMPLES.map((example) => (
                <button
                  key={example.id}
                  type="button"
                  onClick={() => applyExample(example)}
                  title={example.description}
                  className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-semibold hover:border-[var(--color-accent)] ${FOCUS_RING}`}
                >
                  {example.title}
                </button>
              ))}
            </div>
            <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">Examples describe typical patterns, not real benchmarks.</p>
          </div>
        </div>

        <p className="m-0 hidden text-sm font-semibold print:block">Checking: {subject.trim() || "(not named)"}</p>

        {BENCHMARK_QUESTIONS.map((question:any) => {
          const answer = getAnswer(answers, question.id);
          return (
            <fieldset key={question.id} className={`${CARD_CLASS} m-0 grid gap-3`}>
              <legend className="px-1 text-sm font-bold text-[var(--color-accent)]">
                Question {question.number} of {BENCHMARK_QUESTIONS.length} · {question.shortTitle}
                {question.isCritical && <span className={`${BADGE_CLASS} ml-2`}>Key question</span>}
              </legend>
              <p className="m-0 font-semibold">{question.question}</p>
              <div className="flex flex-wrap gap-2 print:hidden">
                {ANSWER_OPTIONS.map((option) => {
                  const inputId = `${question.id}-${option.id}`;
                  const isSelected = answer === option.id;
                  return (
                    <label
                      key={option.id}
                      htmlFor={inputId}
                      className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold transition focus-within:ring-2 focus-within:ring-[var(--color-accent)] motion-reduce:transition-none ${
                        isSelected
                          ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                          : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
                      }`}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name={question.id}
                        value={option.id}
                        checked={isSelected}
                        onChange={() => setAnswer(question.id, option.id)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
              <p className="m-0 hidden text-sm print:block">Answer: {describeAnswer(answer)}</p>
              <details className="print:hidden">
                <summary className={`cursor-pointer text-sm font-semibold ${FOCUS_RING}`}>Why it matters and where to look</summary>
                <div className="mt-3 grid gap-2 text-sm">
                  <p className="m-0"><strong>Why it matters:</strong> {question.whyItMatters}</p>
                  <p className="m-0"><strong>A good sign:</strong> {question.goodSign}</p>
                  <p className="m-0"><strong>A red flag:</strong> {question.redFlag}</p>
                  <p className="m-0"><strong>Where to look:</strong> {question.whereToLook}</p>
                  <p className="m-0"><strong>If you cannot tell:</strong> {question.ifUnsure}</p>
                  {question.relatedLink && (
                    <p className="m-0"><Link href={question.relatedLink.href}>{question.relatedLink.label}</Link></p>
                  )}
                </div>
              </details>
            </fieldset>
          );
        })}
      </div>

      <aside aria-label="Your rating" className="grid gap-4 self-start lg:sticky lg:top-4">
        <section className={`${CARD_CLASS} border-2 ${TIER_BORDERS[tierKey]}`} aria-live="polite">
          <p className="m-0 text-sm text-[var(--color-muted)]">
            {score.answeredCount} of {score.totalCount} answered
          </p>
          <div
            role="progressbar"
            aria-label="Questions answered"
            aria-valuemin={0}
            aria-valuemax={score.totalCount}
            aria-valuenow={score.answeredCount}
            className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]"
          >
            <div
              className="h-full bg-[image:var(--gradient-accent)]"
              style={{ width: `${(score.answeredCount / score.totalCount) * 100}%` }}
            />
          </div>
          <h3 className="mb-1 mt-4 text-2xl font-extrabold">{tierCopy.label}</h3>
          <p className="m-0 text-sm">{tierCopy.message}</p>
          {score.tier !== null && (
            <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
              Weighted evidence {Math.round(score.percent)}% · {score.yesCount} yes · {score.noCount} no · {score.unsureCount} not sure
            </p>
          )}
        </section>

        {redFlagQuestions.length > 0 && (
          <section className={`${CARD_CLASS} border-red-500/60`} aria-labelledby="benchmark-flags-heading">
            <h3 id="benchmark-flags-heading" className="m-0">Red flags</h3>
            <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
              {redFlagQuestions.map((question: any) => (
                <li key={question.id}>{question.shortTitle} {question.redFlag}</li>
              ))}
            </ul>
          </section>
        )}

        {openQuestions.length > 0 && (
          <section className={CARD_CLASS} aria-labelledby="benchmark-open-heading">
            <h3 id="benchmark-open-heading" className="m-0">Open questions to chase</h3>
            <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">Most important first.</p>
            <ul className="mb-0 mt-2 grid gap-2 pl-5 text-sm">
              {openQuestions.map((question: any) => (
                <li key={question.id}><strong>{question.shortTitle}</strong> {question.ifUnsure}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <button type="button" onClick={() => copyText(buildBenchmarkSummary(subject, answers, score))} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>
            Copy summary
          </button>
          <button type="button" onClick={() => window.print()} className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}>
            Print
          </button>
          <button type="button" onClick={reset} className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}>
            Start again
          </button>
          <span role="status" aria-live="polite" className="text-sm text-[var(--color-muted)]">
            {copyState === "copied" && "Copied."}
            {copyState === "failed" && "Could not copy."}
          </span>
        </div>
        <p className="m-0 text-xs text-[var(--color-muted)] print:hidden">Your answers stay in your browser. Nothing is sent or saved.</p>
      </aside>
    </div>
  );
}