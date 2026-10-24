"use client";

import { useMemo, useRef, useState } from "react";
import { BUTTON_OUTLINE, FOCUS_RING } from "@/components/shared/pageStyles";
import { QUESTION_COUNT } from "@/lib/tools/quizConstants";
import {
  BUDGET_QUESTION,
  PRIVACY_QUESTION,
  TASK_QUESTION,
  type PartialQuizAnswers,
  type QuizAnswers,
} from "@/lib/tools/quizQuestions";
import { buildQuizResult, buildSummaryText, countAnswered, isComplete } from "@/lib/tools/quizRules";
import { QuizQuestionGroup } from "./QuizQuestionGroup";
import { QuizResultPanel } from "./QuizResultPanel";

type CopyState = "idle" | "copied" | "failed";

/** The three-question quiz. Answers stay in memory only: nothing is sent or saved. */
export function WhichAiQuiz() {
  const [answers, setAnswers] = useState<PartialQuizAnswers>({});
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const topRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const answeredCount = countAnswered(answers);
  const completeAnswers = isComplete(answers) ? answers : null;
  const result = useMemo(() => (completeAnswers ? buildQuizResult(completeAnswers) : null), [completeAnswers]);

  function updateAnswer<Key extends keyof QuizAnswers>(key: Key, value: QuizAnswers[Key]) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setCopyState("idle");
  }

  function startOver() {
    setAnswers({});
    setCopyState("idle");
    topRef.current?.focus();
  }

  async function copySummary() {
    if (!completeAnswers || !result) return;
    try {
      await navigator.clipboard.writeText(buildSummaryText(completeAnswers, result));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div ref={topRef} tabIndex={-1} className="outline-none">
      <div className="mb-6">
        <p className="m-0 mb-2 text-sm" role="status" aria-live="polite">
          {completeAnswers ? (
            <>
              All {QUESTION_COUNT} answered. Your result is below.{" "}
              <button type="button" onClick={() => resultRef.current?.focus()} className={`font-semibold underline ${FOCUS_RING}`}>
                Jump to my result
              </button>
            </>
          ) : (
            `${answeredCount} of ${QUESTION_COUNT} answered`
          )}
        </p>
        <div aria-hidden="true" className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full bg-[image:var(--gradient-accent)] transition-all motion-reduce:transition-none"
            style={{ width: `${(answeredCount / QUESTION_COUNT) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-8">
        <QuizQuestionGroup number={1} question={TASK_QUESTION} value={answers.task} onChange={(id) => updateAnswer("task", id)} />
        <QuizQuestionGroup number={2} question={BUDGET_QUESTION} value={answers.budget} onChange={(id) => updateAnswer("budget", id)} />
        <QuizQuestionGroup number={3} question={PRIVACY_QUESTION} value={answers.privacy} onChange={(id) => updateAnswer("privacy", id)} />
      </div>

      {completeAnswers && result && (
        <div ref={resultRef} tabIndex={-1} className="mt-10 scroll-mt-24 outline-none">
          <QuizResultPanel result={result} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" onClick={copySummary} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>
              Copy my result
            </button>
            <button type="button" onClick={startOver} className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}>
              Start over
            </button>
            <span className="text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
              {copyState === "copied" && "Copied."}
              {copyState === "failed" && "Could not copy. Select the text and copy it yourself."}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}