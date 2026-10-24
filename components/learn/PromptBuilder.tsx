"use client";

import { useEffect, useMemo, useState } from "react";
import { COPY_CONFIRMATION_MS } from "@/lib/learn/learnConstants";
import {
  assemblePrompt,
  countCompleteParts,
  EMPTY_DRAFT,
  findMissingParts,
  PROMPT_PARTS,
  PROMPT_PRESETS,
  type PromptDraft,
  type PromptPartId,
} from "@/lib/learn/promptFormula";
import { BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "./learnStyles";

/** Fill in the five parts, watch the prompt assemble, then copy it. */
export function PromptBuilder() {
  const [draft, setDraft] = useState<PromptDraft>(PROMPT_PRESETS[0].draft);
  const [activePresetId, setActivePresetId] = useState<string | null>(PROMPT_PRESETS[0].id);
  const [hasCopied, setHasCopied] = useState(false);

  const prompt = useMemo(() => assemblePrompt(draft), [draft]);
  const completeCount = countCompleteParts(draft);
  const missingParts = findMissingParts(draft);

  useEffect(() => {
    if (!hasCopied) return;
    const timer = window.setTimeout(() => setHasCopied(false), COPY_CONFIRMATION_MS);
    return () => window.clearTimeout(timer);
  }, [hasCopied]);

  function updatePart(id: PromptPartId, value: string) {
    setDraft((previous) => ({ ...previous, [id]: value }));
    setActivePresetId(null);
  }

  async function copyPrompt() {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setHasCopied(true);
    } catch {
      // Clipboard blocked: the prompt stays visible and selectable.
    }
  }

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Example prompts">
          <span className="text-sm text-[var(--color-muted)]">Start from:</span>
          {PROMPT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-pressed={activePresetId === preset.id}
              onClick={() => {
                setDraft(preset.draft);
                setActivePresetId(preset.id);
              }}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                activePresetId === preset.id
                  ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                  : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setDraft(EMPTY_DRAFT);
              setActivePresetId(null);
            }}
            className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm ${FOCUS_RING}`}
          >
            Clear
          </button>
        </div>

        <div className="grid gap-3">
          {PROMPT_PARTS.map((part, index) => (
            <div key={part.id}>
              <label htmlFor={`prompt-${part.id}`} className="mb-1 block text-sm font-semibold">
                {index + 1}. {part.label}
                <span className="ml-2 font-normal text-[var(--color-muted)]">{part.hint}</span>
              </label>
              <textarea
                id={`prompt-${part.id}`}
                rows={2}
                value={draft[part.id]}
                placeholder={part.placeholder}
                onChange={(event) => updatePart(part.id, event.target.value)}
                className={`w-full resize-y rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold">Your prompt</span>
          <span className="text-[var(--color-muted)]">{completeCount} of {PROMPT_PARTS.length} parts</span>
        </div>
        <div
          role="progressbar"
          aria-label="Prompt parts completed"
          aria-valuemin={0}
          aria-valuemax={PROMPT_PARTS.length}
          aria-valuenow={completeCount}
          className="mb-3 h-2 overflow-hidden rounded-full bg-[var(--color-border)]"
        >
          <div
            className="h-full bg-[image:var(--gradient-accent)] transition-[width] motion-reduce:transition-none"
            style={{ width: `${(completeCount / PROMPT_PARTS.length) * 100}%` }}
          />
        </div>

        <pre className="m-0 min-h-40 flex-1 whitespace-pre-wrap break-words rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 font-sans text-[0.95rem]">
          {prompt || "Fill in a part on the left and your prompt appears here."}
        </pre>

        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]" role="status">
          {missingParts.length === 0
            ? "All five parts are filled in."
            : `Still missing: ${missingParts.map((part) => part.label.toLowerCase()).join(", ")}.`}
        </p>

        <button type="button" onClick={copyPrompt} disabled={!prompt} className={`${BUTTON_PRIMARY} mt-3 self-start disabled:opacity-50`}>
          {hasCopied ? "Copied" : "Copy prompt"}
        </button>
      </div>
    </div>
  );
}