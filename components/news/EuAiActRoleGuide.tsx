"use client";

import { useEffect, useMemo, useState } from "react";
import { CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { describeDistance, findGuide } from "@/lib/news/euAiActLogic";
import { formatIsoLabel, toIsoDate } from "@/lib/news/changelogLogic";
import type { RoleGuide } from "@/lib/news/euAiActTypes";

/** Pick who you are. See what applies now, what is coming, and what to do this month. */
export function EuAiActRoleGuide({ guides }: { guides: readonly RoleGuide[] }) {
  const [selectedId, setSelectedId] = useState<string>(guides[0].id);
  const [todayIso, setTodayIso] = useState<string | null>(null);

  useEffect(() => {
    setTodayIso(toIsoDate(new Date()));
  }, []);

  const guide = useMemo(() => findGuide(guides, selectedId) ?? guides[0], [guides, selectedId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
      <fieldset className={`${CARD_CLASS} m-0 self-start`}>
        <legend className="px-1 text-sm font-semibold">Which sounds most like you?</legend>
        <div className="mt-2 grid gap-2">
          {guides.map((option) => (
            <label key={option.id} className="flex cursor-pointer items-start gap-2 text-sm">
              <input
                type="radio"
                name="eu-ai-act-role"
                value={option.id}
                checked={selectedId === option.id}
                onChange={() => setSelectedId(option.id)}
                className={`mt-1 ${FOCUS_RING}`}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={CARD_CLASS} role="status" aria-live="polite">
        <h3 className="mt-0">Already applies to you</h3>
        <ul className="mb-4 space-y-1 pl-5 text-sm">
          {guide.nowApplies.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h3 className="mt-0">Coming up</h3>
        <ul className="mb-4 list-none space-y-2 p-0 text-sm">
          {guide.comingUp.map((note) => (
            <li key={note.dateIso}>
              <strong>{formatIsoLabel(note.dateIso)}</strong>
              {todayIso && <span className="text-[var(--color-muted)]"> ({describeDistance(note.dateIso, todayIso)})</span>}: {note.text}
            </li>
          ))}
        </ul>

        <h3 className="mt-0">Do this month</h3>
        <ol className="mb-4 space-y-1 pl-5 text-sm">
          {guide.doThisMonth.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>

        <p className="mb-0 text-sm"><strong>Watch out:</strong> {guide.watchOut}</p>
      </div>
    </div>
  );
}