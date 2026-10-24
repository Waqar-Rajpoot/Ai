"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import type { SelfCheckQuestion } from "@/lib/learn/foundationsContent";
import { scoreSelfCheck, type SelfCheckMessages } from "@/lib/learn/selfCheck";
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "./learnStyles";

interface SelfCheckProps {
  questions: readonly SelfCheckQuestion[];
  messages: SelfCheckMessages;
}

/** One-question-at-a-time quiz with instant feedback and a result screen. Used by every level hub. */
export function SelfCheck({ questions, messages }: SelfCheckProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const result = useMemo(() => scoreSelfCheck(questions, answers, messages), [questions, answers, messages]);

  const totalQuestions = questions.length;
  if (totalQuestions === 0) return null;

  const question = questions[currentIndex];
  const chosenId = answers[question.id];
  const hasAnswered = chosenId !== undefined;
  const isCorrectAnswer = chosenId === question.correctOptionId;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const answeredCount = Object.keys(answers).length;

  function chooseOption(optionId: string) {
    if (hasAnswered) return;
    setAnswers((previous) => ({ ...previous, [question.id]: optionId }));
  }

  function goNext() {
    if (!hasAnswered) return;
    if (isLastQuestion) setIsFinished(true);
    else setCurrentIndex((index) => index + 1);
  }

  function goPrevious() {
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  function restart() {
    setAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  }

  // Keyboard: 1-4 pick an option, arrows move between questions.
  // Attached to the card, so it only fires while focus is inside it.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    const optionIndex = Number(event.key) - 1;
    if (Number.isInteger(optionIndex) && optionIndex >= 0 && optionIndex < question.options.length) {
      chooseOption(question.options[optionIndex].id);
    } else if (event.key === "ArrowRight") {
      goNext();
    } else if (event.key === "ArrowLeft") {
      goPrevious();
    }
  }

  if (isFinished) {
    return (
      <div className={`${CARD_CLASS} border-[var(--color-accent)] text-center`} role="status">
        <p className="m-0 text-sm font-semibold text-[var(--color-accent)]">Your score</p>
        <p className="my-2 text-5xl font-extrabold">
          {result.correct}
          <span className="text-2xl text-[var(--color-muted)]"> / {result.total}</span>
        </p>
        <h3 className="mb-1 mt-0 text-xl">{result.headline}</h3>
        <p className="mx-auto mb-5 mt-0 max-w-md text-[var(--color-muted)]">{result.advice}</p>

        <ul className="m-0 mb-5 flex list-none flex-wrap justify-center gap-2 p-0" aria-label="Results by question">
          {questions.map((item, index) => {
            const isRight = answers[item.id] === item.correctOptionId;
            return (
              <li
                key={item.id}
                className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-bold ${
                  isRight ? "border-emerald-500 bg-emerald-500/10" : "border-rose-500 bg-rose-500/10"
                }`}
                aria-label={`Question ${index + 1}: ${isRight ? "correct" : "incorrect"}`}
              >
                {index + 1}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={restart} className={BUTTON_OUTLINE}>
            Try again
          </button>
          <a href="#guides" className={BUTTON_PRIMARY}>
            Go to the guides
          </a>
        </div>
      </div>
    );
  }

  return (
    <div role="group" aria-label="Self-check question" onKeyDown={handleKeyDown} className={`${CARD_CLASS} mx-auto max-w-6xl`}>
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-semibold text-[var(--color-accent)]">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span className="text-[var(--color-muted)]">{answeredCount} answered</span>
      </div>
      <div
        role="progressbar"
        aria-label="Self-check progress"
        aria-valuemin={0}
        aria-valuemax={totalQuestions}
        aria-valuenow={answeredCount}
        className="mb-5 h-2 overflow-hidden rounded-full bg-[var(--color-border)]"
      >
        <div
          className="h-full bg-[image:var(--gradient-accent)] transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
        />
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 text-lg font-semibold leading-snug">{question.prompt}</legend>

        <div className="grid gap-2">
          {question.options.map((option, optionIndex) => {
            const isChosen = chosenId === option.id;
            const isCorrect = option.id === question.correctOptionId;
            let stateClass = "border-[var(--color-border)] hover:border-[var(--color-accent)]";
            if (hasAnswered && isCorrect) stateClass = "border-emerald-500 bg-emerald-500/10";
            else if (hasAnswered && isChosen) stateClass = "border-rose-500 bg-rose-500/10";
            else if (hasAnswered) stateClass = "border-[var(--color-border)] opacity-60";

            return (
              <button
                key={option.id}
                type="button"
                aria-disabled={hasAnswered}
                aria-pressed={isChosen}
                onClick={() => chooseOption(option.id)}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition motion-reduce:transition-none ${
                  hasAnswered ? "cursor-default" : ""
                } ${stateClass} ${FOCUS_RING}`}
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-[var(--color-border)] text-xs font-bold">
                  {optionIndex + 1}
                </span>
                <span className="flex-1">{option.label}</span>
                {hasAnswered && isCorrect && <span aria-label="Correct answer">✓</span>}
                {hasAnswered && isChosen && !isCorrect && <span aria-label="Your answer, incorrect">✗</span>}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Feedback area keeps its height reserved so the card does not jump. */}
      <div className="mt-4 min-h-[5.5rem]" role="status" aria-live="polite">
        {hasAnswered && (
          <p className="m-0 text-sm text-[var(--color-muted)]">
            <strong className={isCorrectAnswer ? "text-emerald-500" : "text-rose-500"}>
              {isCorrectAnswer ? "Correct. " : "Not quite. "}
            </strong>
            {question.explanation}
          </p>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrevious}
          disabled={currentIndex === 0}
          className={`${BUTTON_OUTLINE} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!hasAnswered}
          className={`${BUTTON_PRIMARY} disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isLastQuestion ? "See result" : "Next →"}
        </button>
      </div>

      <p className="mb-0 mt-4 text-center text-xs text-[var(--color-muted)]">
        Tip: press 1 to {question.options.length} to answer, and use the arrow keys to move.
      </p>
    </div>
  );
}