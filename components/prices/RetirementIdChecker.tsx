"use client";

import { useMemo, useState } from "react";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import {
  describeRetirementDate,
  findEarliestUpcoming,
  findRetirementsForIds,
  getDaysLeft,
  getRetirementStatus,
  parseModelIdList,
} from "@/lib/prices/retirementLogic";
import { RETIREMENTS } from "@/lib/prices/retirements";
import { RetirementStatusBadge } from "./RetirementStatusBadge";

const EXAMPLE_IDS = "gpt-4-0613\nclaude-sonnet-4-5-20250929\ngemini-2.5-flash\nclaude-opus-5-5";

/** Paste model IDs and see every retirement date that applies, on every platform. Runs in the browser. */
export function RetirementIdChecker() {
  const today = useToday();
  const [text, setText] = useState("");

  const results = useMemo(() => findRetirementsForIds(parseModelIdList(text), RETIREMENTS), [text]);
  const matchedCount = results.filter((result) => result.matches.length > 0).length;
  const earliest = useMemo(
    () => (today ? findEarliestUpcoming(results.flatMap((result) => result.matches), today) : undefined),
    [results, today],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <div className={`${CARD_CLASS} self-start`}>
        <label className="text-sm font-semibold" htmlFor="model-id-input">Your model IDs</label>
        <p className="mb-2 mt-1 text-sm text-[var(--color-muted)]">One per line, or separated by commas. Cloud prefixes such as us.anthropic. are removed for you.</p>
        <textarea
          id="model-id-input"
          rows={8}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={"gpt-4o-2024-08-06\nclaude-sonnet-4-5"}
          className={`${INPUT_CLASS} font-mono text-sm`}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => setText(EXAMPLE_IDS)} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Try an example</button>
          <button type="button" onClick={() => setText("")} className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}>Clear</button>
        </div>
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">Nothing leaves your browser. Matching is exact: no match does not prove a model is safe.</p>
      </div>

      <div>
        <p className="mt-0 text-sm" role="status" aria-live="polite">
          {results.length === 0 ? (
            "Paste some IDs to begin."
          ) : (
            <>
              <strong>{matchedCount}</strong> of {results.length} ID{results.length === 1 ? "" : "s"} matched.{" "}
              {earliest && (
                <>Soonest deadline: <strong>{describeRetirementDate(earliest)}</strong> ({earliest.platform}).</>
              )}
            </>
          )}
        </p>
        <ul className="m-0 grid list-none gap-3 p-0">
          {results.map((result) => (
            <li key={result.normalizedId} className={CARD_CLASS}>
              <p className="m-0 font-mono text-sm font-bold">{result.rawId}</p>
              {result.matches.length === 0 ? (
                <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
                  No retirement found for this ID in our list. Check your provider&apos;s own deprecations page before you rely on that.
                </p>
              ) : (
                <ul className="m-0 mt-2 grid list-none gap-2 p-0">
                  {result.matches.map((entry) => (
                    <li key={entry.id} className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] pt-2 text-sm">
                      <span>
                        <strong>{entry.platform}</strong>: {describeRetirementDate(entry)}
                        {entry.replacement ? <> · replace with {entry.replacement}</> : null}
                      </span>
                      <RetirementStatusBadge
                        status={today ? getRetirementStatus(entry, today) : null}
                        daysLeft={today ? getDaysLeft(entry, today) : null}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        {results.some((result) => result.matches.length > 1) && (
          <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">An ID with several rows runs on more than one platform. If you use both, the earlier date is your real deadline.</p>
        )}
      </div>
    </div>
  );
}