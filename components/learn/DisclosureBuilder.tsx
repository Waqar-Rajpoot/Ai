"use client";

import { useMemo, useState } from "react";
import { buildDisclosure, DISCLOSURE_PROBLEM_MESSAGES, DISCLOSURE_USES } from "@/lib/learn/disclosure";
import { MAX_TOOL_NAME_LENGTH } from "@/lib/learn/learnConstants";
import { CopyablePrompt } from "./CopyablePrompt";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

/** Build a one-sentence AI-use disclosure to paste into an assignment or document. */
export function DisclosureBuilder() {
  const [toolName, setToolName] = useState("");
  const [useIds, setUseIds] = useState<string[]>([]);
  const [wasReviewed, setWasReviewed] = useState(true);

  const result = useMemo(() => buildDisclosure({ toolName, useIds, wasReviewed }), [toolName, useIds, wasReviewed]);

  function toggleUse(id: string) {
    setUseIds((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]));
  }

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <div className="grid content-start gap-3">
        <div>
          <label htmlFor="disclosure-tool" className="mb-1 block text-sm font-semibold">AI tool you used</label>
          <input
            id="disclosure-tool"
            type="text"
            value={toolName}
            maxLength={MAX_TOOL_NAME_LENGTH}
            onChange={(event) => setToolName(event.target.value)}
            className={`w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`}
          />
        </div>
        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-2 text-sm font-semibold">What you used it for</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {DISCLOSURE_USES.map((use) => (
              <label key={use.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 transition hover:border-[var(--color-accent)] motion-reduce:transition-none">
                <input type="checkbox" checked={useIds.includes(use.id)} onChange={() => toggleUse(use.id)} className={`h-4 w-4 accent-[var(--color-accent)] ${FOCUS_RING}`} />
                <span>{use.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={wasReviewed} onChange={(event) => setWasReviewed(event.target.checked)} className={`h-4 w-4 accent-[var(--color-accent)] ${FOCUS_RING}`} />
          <span>I checked the facts and edited the result myself</span>
        </label>
      </div>

      <div>
        <p className="mb-2 mt-0 text-sm font-semibold">Your disclosure</p>
        <CopyablePrompt text={result.ok ? result.text : ""} emptyMessage={result.ok ? "" : DISCLOSURE_PROBLEM_MESSAGES[result.reason]} />
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
          A starting sentence only. If your school, employer or publisher requires specific wording, use theirs.
        </p>
      </div>
    </div>
  );
}