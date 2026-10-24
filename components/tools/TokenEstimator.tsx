"use client";

import { useMemo, useState } from "react";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { CONTEXT_WINDOWS } from "@/lib/tools/contextWindows";
import {
  assessAllWindows,
  buildBudget,
  buildCustomWindowEntry,
  describeScale,
  estimateTokens,
  estimateTokensFromWords,
  formatApproxCount,
  formatCount,
  formatDuration,
  formatQuantity,
  parseAmount,
  type AmountInput,
  type InputMode,
} from "@/lib/tools/tokenEstimate";
import { DEFAULT_REPLY_WORDS, DEFAULT_WORD_COUNT, WORDS_PER_BOOK, WORDS_PER_PAGE } from "@/lib/tools/tokenEstimateConstants";
import { SIZE_PRESETS, type SizePreset } from "@/lib/tools/tokenEstimatorContent";
import {
  CONTENT_TYPES,
  DEFAULT_CONTENT_TYPE_ID,
  getContentType,
  isContentTypeId,
  type ContentTypeId,
} from "@/lib/tools/tokenProfiles";
import { TokenBudgetBar, type BudgetPart } from "./TokenBudgetBar";
import { TokenFitTable } from "./TokenFitTable";

const MODE_OPTIONS: readonly { id: InputMode; label: string }[] = [
  { id: "words", label: "Word count" },
  { id: "pages", label: "Pages" },
  { id: "text", label: "Paste text" },
  { id: "characters", label: "Characters" },
];

const AMOUNT_LABELS: Record<Exclude<InputMode, "text">, string> = {
  words: "Number of words",
  pages: `Number of pages (about ${WORDS_PER_PAGE} words each)`,
  characters: "Number of characters, including spaces",
};

/** Calculator: estimates tokens for some text and checks the total against each model's context window. */
export function TokenEstimator() {
  const [mode, setMode] = useState<InputMode>("words");
  const [text, setText] = useState("");
  const [amountRaw, setAmountRaw] = useState(String(DEFAULT_WORD_COUNT));
  const [contentTypeId, setContentTypeId] = useState<ContentTypeId>(DEFAULT_CONTENT_TYPE_ID);
  const [extraRaw, setExtraRaw] = useState("");
  const [replyWordsRaw, setReplyWordsRaw] = useState(String(DEFAULT_REPLY_WORDS));
  const [customWindowRaw, setCustomWindowRaw] = useState("");

  const profile = getContentType(contentTypeId);

  const analysis = useMemo(() => {
    const input: AmountInput = mode === "text" ? { mode, text } : { mode, amount: parseAmount(amountRaw) };
    const { measure, tokens: inputTokens } = estimateTokens(input, profile);
    const replyTokens = estimateTokensFromWords(parseAmount(replyWordsRaw), profile);
    const extraTokens = parseAmount(extraRaw);
    const budget = buildBudget(inputTokens, extraTokens, replyTokens);
    const customEntry = buildCustomWindowEntry(parseAmount(customWindowRaw));
    const windows = customEntry ? [customEntry, ...CONTEXT_WINDOWS] : CONTEXT_WINDOWS;
    return {
      measure,
      inputTokens,
      replyTokens,
      extraTokens,
      budget,
      rows: assessAllWindows(budget.total, windows),
      scale: describeScale(measure.words),
    };
  }, [mode, text, amountRaw, profile, extraRaw, replyWordsRaw, customWindowRaw]);

  function applyPreset(preset: SizePreset) {
    setMode("words");
    setAmountRaw(String(preset.words));
    setContentTypeId("english");
  }

  function resetAll() {
    setMode("words");
    setText("");
    setAmountRaw(String(DEFAULT_WORD_COUNT));
    setContentTypeId(DEFAULT_CONTENT_TYPE_ID);
    setExtraRaw("");
    setReplyWordsRaw(String(DEFAULT_REPLY_WORDS));
    setCustomWindowRaw("");
  }

  const isEmpty = analysis.measure.characters === 0;
  const showCharacterHint = profile.preferCharacters && (mode === "words" || mode === "pages");

  const budgetParts: readonly BudgetPart[] = [
    { id: "text", label: "Your text", tokens: analysis.inputTokens.typical, colorClass: "bg-[var(--color-accent)]" },
    { id: "extra", label: "Already in the chat or prompt", tokens: analysis.extraTokens, colorClass: "bg-sky-500" },
    { id: "reply", label: "Reply you asked for", tokens: analysis.replyTokens.typical, colorClass: "bg-amber-500" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[24rem_1fr]">
      <form className={`${CARD_CLASS} self-start`} onSubmit={(event) => event.preventDefault()}>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 p-0 text-sm font-semibold">How do you want to enter your text?</legend>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Input type">
            {MODE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={mode === option.id}
                onClick={() => setMode(option.id)}
                className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                  mode === option.id
                    ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-4">
          {mode === "text" ? (
            <>
              <label htmlFor="estimator-text" className="text-sm font-semibold">Paste your text</label>
              <textarea
                id="estimator-text"
                rows={8}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Paste an email, an article, some code..."
                className={`${INPUT_CLASS} mt-1`}
              />
              <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">
                {formatCount(analysis.measure.words)} words · {formatCount(analysis.measure.characters)} characters. Nothing leaves your browser.
              </p>
            </>
          ) : (
            <>
              <label htmlFor="estimator-amount" className="text-sm font-semibold">{AMOUNT_LABELS[mode]}</label>
              <input
                id="estimator-amount"
                type="text"
                inputMode="numeric"
                value={amountRaw}
                onChange={(event) => setAmountRaw(event.target.value)}
                className={`${INPUT_CLASS} mt-1`}
              />
              <div className="mt-3">
                <p className="m-0 text-xs text-[var(--color-muted)]">Or start from a typical size:</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {SIZE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold hover:border-[var(--color-accent)] ${FOCUS_RING}`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="estimator-type" className="text-sm font-semibold">What kind of text is it?</label>
          <select
            id="estimator-type"
            value={contentTypeId}
            onChange={(event) => {
              if (isContentTypeId(event.target.value)) setContentTypeId(event.target.value);
            }}
            className={`${INPUT_CLASS} mt-1`}
          >
            {CONTENT_TYPES.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
          <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">{profile.examples}. {profile.note}</p>
          {showCharacterHint && (
            <p className="mb-0 mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400" role="note">
              For this kind of text, pasting it or counting characters is more accurate than words or pages.
            </p>
          )}
        </div>

        <details className="mt-4 rounded-xl border border-[var(--color-border)] p-3">
          <summary className={`cursor-pointer text-sm font-semibold ${FOCUS_RING}`}>Add the reply and what is already there</summary>
          <div className="mt-3 grid gap-3">
            <div>
              <label htmlFor="estimator-reply" className="text-sm font-semibold">Length of the reply you want (words)</label>
              <input
                id="estimator-reply"
                type="text"
                inputMode="numeric"
                value={replyWordsRaw}
                onChange={(event) => setReplyWordsRaw(event.target.value)}
                className={`${INPUT_CLASS} mt-1`}
              />
            </div>
            <div>
              <label htmlFor="estimator-extra" className="text-sm font-semibold">Tokens already in the chat or prompt</label>
              <input
                id="estimator-extra"
                type="text"
                inputMode="numeric"
                value={extraRaw}
                onChange={(event) => setExtraRaw(event.target.value)}
                placeholder="0"
                className={`${INPUT_CLASS} mt-1`}
              />
              <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">Instructions, memory, earlier messages and tool definitions.</p>
            </div>
            <div>
              <label htmlFor="estimator-window" className="text-sm font-semibold">Your own window size in tokens (optional)</label>
              <input
                id="estimator-window"
                type="text"
                inputMode="numeric"
                value={customWindowRaw}
                onChange={(event) => setCustomWindowRaw(event.target.value)}
                placeholder="for example 32000"
                className={`${INPUT_CLASS} mt-1`}
              />
              <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">Useful for a model you run on your own computer.</p>
            </div>
          </div>
        </details>

        <div className="mt-4">
          <button type="button" onClick={resetAll} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Reset</button>
        </div>
      </form>

      <div className="grid gap-4">
        <div className={CARD_CLASS} role="status" aria-live="polite">
          {isEmpty ? (
            <p className="m-0 text-[var(--color-muted)]">Enter an amount or paste some text to see an estimate.</p>
          ) : (
            <>
              <p className="m-0 text-sm text-[var(--color-muted)]">Your text alone</p>
              <p className="m-0 text-3xl font-extrabold tabular-nums sm:text-4xl">
                About {formatApproxCount(analysis.inputTokens.typical)} tokens
              </p>
              <p className="mb-0 mt-1 text-sm">
                Likely between <strong className="tabular-nums">{formatApproxCount(analysis.inputTokens.low)}</strong> and{" "}
                <strong className="tabular-nums">{formatApproxCount(analysis.inputTokens.high)}</strong> tokens, depending on the model.
              </p>
              <dl className="m-0 mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-xs text-[var(--color-muted)]">Words</dt>
                  <dd className="m-0 font-bold tabular-nums">{formatCount(analysis.measure.words)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-muted)]">Pages ({WORDS_PER_PAGE} words)</dt>
                  <dd className="m-0 font-bold tabular-nums">{formatQuantity(analysis.scale.pages)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-muted)]">Reading time</dt>
                  <dd className="m-0 font-bold tabular-nums">{formatDuration(analysis.scale.readingMinutes)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-muted)]">Books ({formatCount(WORDS_PER_BOOK)} words)</dt>
                  <dd className="m-0 font-bold tabular-nums">{formatQuantity(analysis.scale.books)}</dd>
                </div>
              </dl>
            </>
          )}
        </div>

        {!isEmpty && (
          <div className={CARD_CLASS}>
            <h3 className="mt-0">What has to fit in the window</h3>
            <p className="mt-0 text-2xl font-extrabold tabular-nums">
              About {formatApproxCount(analysis.budget.total.typical)} tokens
            </p>
            <p className="mt-0 text-sm text-[var(--color-muted)]">
              Range {formatApproxCount(analysis.budget.total.low)} to {formatApproxCount(analysis.budget.total.high)}.
            </p>
            <TokenBudgetBar parts={budgetParts} />
          </div>
        )}

        {!isEmpty && <TokenFitTable rows={analysis.rows} />}

        <p className="m-0 rounded-xl border border-amber-500/60 p-3 text-sm">
          <strong>This is an estimate, not a count.</strong> Each model has its own tokenizer, so the exact number will differ. For anything close to a limit, count with the provider&apos;s own tool (linked in the sources below).
        </p>
      </div>
    </div>
  );
}