"use client";

import Link from "next/link";
import { useState } from "react";
import { CopyButton } from "@/components/shared/CopyButton";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { TASK_LABELS, type PromptEntry } from "@/lib/tools/promptLibrary";
import { buildExampleValues, countUnfilledFields, fillPrompt } from "@/lib/tools/promptLibraryLogic";
import { ToolLevelBadges } from "./ToolLevelBadges";

interface PromptCardProps {
  prompt: PromptEntry;
}

/** One prompt: fill-in boxes, the live prompt text, a copy button and a tip for checking the answer. */
export function PromptCard({ prompt }: PromptCardProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const text = fillPrompt(prompt.template, prompt.fields, values);
  const unfilled = countUnfilledFields(prompt.fields, values);
  const titleId = `prompt-${prompt.id}`;

  function updateValue(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <article className={`${CARD_CLASS} flex h-full flex-col`} aria-labelledby={titleId}>
      <p className="m-0 flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
        <ToolLevelBadges levels={[prompt.level]} />
        <span>{TASK_LABELS[prompt.task]}</span>
      </p>
      <h3 id={titleId} className="mb-1 mt-3">{prompt.title}</h3>
      <p className="m-0 text-sm text-[var(--color-muted)]">{prompt.whenToUse}</p>

      <pre className="mb-0 mt-4 whitespace-pre-wrap break-words rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 font-sans text-sm leading-relaxed">
        {text}
      </pre>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <CopyButton text={text} label="Copy prompt" context={prompt.title} />
        {prompt.fields.length > 0 && (
          <span className="text-xs text-[var(--color-muted)]">
            {unfilled === 0
              ? "All blanks filled in."
              : `${unfilled} ${unfilled === 1 ? "blank" : "blanks"} left. Brackets show where.`}
          </span>
        )}
      </div>

      {prompt.fields.length > 0 && (
        <details className="mt-4 rounded-xl border border-[var(--color-border)] p-3">
          <summary className={`cursor-pointer text-sm font-semibold ${FOCUS_RING}`}>
            Fill in the blanks ({prompt.fields.length})
          </summary>
          <div className="mt-3 grid gap-3">
            {prompt.fields.map((field) => {
              const inputId = `${prompt.id}-${field.key}`;
              const sharedProps = {
                id: inputId,
                value: values[field.key] ?? "",
                placeholder: `For example: ${field.example}`,
                className: `${INPUT_CLASS} mt-1`,
              };
              return (
                <label key={field.key} htmlFor={inputId} className="text-sm">
                  <span className="text-[var(--color-muted)]">{field.label}</span>
                  {field.multiline ? (
                    <textarea
                      {...sharedProps}
                      rows={4}
                      onChange={(event) => updateValue(field.key, event.target.value)}
                    />
                  ) : (
                    <input
                      {...sharedProps}
                      type="text"
                      onChange={(event) => updateValue(field.key, event.target.value)}
                    />
                  )}
                </label>
              );
            })}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setValues(buildExampleValues(prompt.fields))}
                className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}
              >
                Try an example
              </button>
              <button
                type="button"
                onClick={() => setValues({})}
                className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}
              >
                Clear
              </button>
            </div>
          </div>
        </details>
      )}

      <p className="mb-0 mt-4 text-sm">
        <strong>Check the answer:</strong> {prompt.checkTip}
      </p>
      {prompt.guide && (
        <p className="mb-0 mt-2 text-sm">
          <Link href={prompt.guide.href}>{prompt.guide.label}</Link>
        </p>
      )}
    </article>
  );
}