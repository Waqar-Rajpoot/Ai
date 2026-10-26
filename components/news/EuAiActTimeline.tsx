"use client";

import { useEffect, useMemo, useState } from "react";
import { BUTTON_OUTLINE, CARD_CLASS } from "@/components/shared/pageStyles";
import { describeDistance, getMilestoneStatus, getNextMilestone, visibleMilestones } from "@/lib/news/euAiActLogic";
import { formatIsoLabel, toIsoDate } from "@/lib/news/changelogLogic";
import type { EuSource, Milestone, MilestoneStatus } from "@/lib/news/euAiActTypes";

interface Props {
  milestones: readonly Milestone[];
  sources: readonly EuSource[];
}

const STATUS_TEXT: Record<MilestoneStatus, string> = {
  passed: "Already applies",
  today: "Starts today",
  upcoming: "Still to come",
};

/** The dates table, the "next date" banner and one detail card per date. Status is computed in the browser. */
export function EuAiActTimeline({ milestones, sources }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [todayIso, setTodayIso] = useState<string | null>(null);

  useEffect(() => {
    setTodayIso(toIsoDate(new Date()));
  }, []);

  const rows = useMemo(() => visibleMilestones(milestones, showAll), [milestones, showAll]);
  const next = todayIso ? getNextMilestone(milestones, todayIso) : null;
  const sourceLabel = (id: string) => sources.find((s) => s.id === id)?.label ?? id;

  return (
    <div>
      {next && todayIso && (
        <div className={`${CARD_CLASS} mb-4`} role="status">
          <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">Next date on the calendar</p>
          <p className="mb-0 mt-1 text-lg font-semibold">
            {formatIsoLabel(next.dateIso)} ({describeDistance(next.dateIso, todayIso)})
          </p>
          <p className="mb-0 mt-1 text-sm">{next.title}</p>
        </div>
      )}

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={showAll}
          onClick={() => setShowAll((value) => !value)}
          className={`${BUTTON_OUTLINE} !px-3 !py-1 text-sm`}
        >
          {showAll ? "Show the five main dates only" : "Also show 3 more dates that matter"}
        </button>
        <span className="text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
          Showing {rows.length} dates.
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">EU AI Act dates, what starts on each, and whether it already applies</caption>
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th scope="col" className="py-2 pr-3">Date</th>
              <th scope="col" className="py-2 pr-3">What starts</th>
              <th scope="col" className="py-2 pr-3">Status</th>
              <th scope="col" className="py-2">Plain English</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => {
              const status = todayIso ? getMilestoneStatus(m, todayIso) : null;
              return (
                <tr key={m.id} className="border-b border-[var(--color-border)] align-top">
                  <th scope="row" className="whitespace-nowrap py-3 pr-3 font-semibold">
                    <time dateTime={m.dateIso}>{formatIsoLabel(m.dateIso)}</time>
                    {m.change && <div className="text-xs font-normal text-[var(--color-muted)]">moved</div>}
                  </th>
                  <td className="py-3 pr-3">
                    <a href={`#${m.id}`}>{m.title}</a>
                  </td>
                  <td className="whitespace-nowrap py-3 pr-3">
                    {status ? (
                      <>
                        <strong>{STATUS_TEXT[status]}</strong>
                        {todayIso && <div className="text-xs text-[var(--color-muted)]">{describeDistance(m.dateIso, todayIso)}</div>}
                      </>
                    ) : (
                      <span className="text-[var(--color-muted)]">…</span>
                    )}
                  </td>
                  <td className="py-3">{m.plainEnglish}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ol className="m-0 mt-8 grid list-none gap-4 p-0">
        {rows.map((m) => (
          <li key={m.id} id={m.id} className={`${CARD_CLASS} scroll-mt-24`}>
            <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">
              <time dateTime={m.dateIso}>{formatIsoLabel(m.dateIso)}</time> · {m.legalNote}
            </p>
            <h3 className="mb-2 mt-1">{m.title}</h3>
            {m.change && (
              <p className="mb-2 mt-0 text-sm">
                <span className="text-[var(--color-muted)]">Changed by the 2026 omnibus:</span>{" "}
                <span className="line-through decoration-[var(--color-muted)]">{m.change.was}</span> → <strong>{m.change.now}</strong>
              </p>
            )}
            <p className="m-0 text-sm"><strong>Who it affects:</strong> {m.whoItAffects}</p>
            <p className="mb-0 mt-2 text-sm"><strong>What it means for you:</strong> {m.forYou}</p>
            <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
              Sources: {m.sourceIds.map(sourceLabel).join(" · ")}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}