"use client";

import { useMemo, useState } from "react";
import { buildFormattedPrompt, FORMAT_OPTIONS, type FormatId } from "@/lib/learn/promptFormats";
import { CopyablePrompt } from "./CopyablePrompt";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

const FIELD_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

/** Pick a task and a fixed output format, optionally add an example, then copy the prompt. */
export function FormatPromptBuilder() {
  const [task, setTask] = useState("Compare two budget laptops for a student.");
  const [formatId, setFormatId] = useState<FormatId>("table");
  const [formatDetail, setFormatDetail] = useState("");
  const [example, setExample] = useState("");

  const selectedFormat = FORMAT_OPTIONS.find((option) => option.id === formatId) ?? FORMAT_OPTIONS[0];
  const result = useMemo(
    () => buildFormattedPrompt({ task, formatId, formatDetail, example }),
    [task, formatId, formatDetail, example],
  );

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <div className="grid content-start gap-3">
        <div>
          <label htmlFor="format-task" className="mb-1 block text-sm font-semibold">What should the AI do?</label>
          <textarea id="format-task" rows={2} value={task} onChange={(event) => setTask(event.target.value)} className={`${FIELD_CLASS} resize-y`} />
        </div>
        <div>
          <label htmlFor="format-choice" className="mb-1 block text-sm font-semibold">Output format</label>
          <select
            id="format-choice"
            value={formatId}
            onChange={(event) => {
              const option = FORMAT_OPTIONS.find((item) => item.id === event.target.value);
              if (option) setFormatId(option.id);
            }}
            className={FIELD_CLASS}
          >
            {FORMAT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="format-detail" className="mb-1 block text-sm font-semibold">
            Extra detail <span className="font-normal text-[var(--color-muted)]">(optional)</span>
          </label>
          <input id="format-detail" type="text" value={formatDetail} placeholder={selectedFormat.detailHint} onChange={(event) => setFormatDetail(event.target.value)} className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor="format-example" className="mb-1 block text-sm font-semibold">
            Example of the style you want <span className="font-normal text-[var(--color-muted)]">(optional)</span>
          </label>
          <textarea id="format-example" rows={2} value={example} onChange={(event) => setExample(event.target.value)} className={`${FIELD_CLASS} resize-y`} />
          <p className="mb-0 mt-1 text-xs text-[var(--color-muted)]">Do not put private information in your example.</p>
        </div>
      </div>

      <div>
        <p className="mb-2 mt-0 text-sm font-semibold">Your prompt</p>
        <CopyablePrompt text={result.ok ? result.prompt : ""} emptyMessage="Type what you want done and your prompt appears here." />
      </div>
    </div>
  );
}