"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BUTTON_OUTLINE, CARD_CLASS, INPUT_CLASS } from "@/components/shared/pageStyles";
import { SourceConflictCard } from "@/components/news/SourceConflictBoard";
import { KIND_HELP, KIND_LABELS, KIND_ORDER, LAST_VISIT_STORAGE_KEY, SEARCH_PLACEHOLDER } from "@/lib/news/changelogConstants";
import {
  countByKind,
  countNewSince,
  describeDaysAgo,
  filterEntries,
  formatIsoLabel,
  groupByMonth,
  isIsoDate,
  isNewSince,
  toIsoDate,
} from "@/lib/news/changelogLogic";
import type { ChangeEntry, ChangeKind } from "@/lib/news/changelogTypes";

interface Props {
  /** Entries already sorted newest first. */
  entries: readonly ChangeEntry[];
}

/** Filterable changelog. Highlights what is new since the reader's last visit (stored only in their browser). */
export function ChangelogExplorer({ entries }: Props) {
  const [kind, setKind] = useState<ChangeKind | "all">("all");
  const [query, setQuery] = useState("");
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [todayIso, setTodayIso] = useState<string | null>(null);

  useEffect(() => {
    const today = toIsoDate(new Date());
    setTodayIso(today);
    try {
      const stored = window.localStorage.getItem(LAST_VISIT_STORAGE_KEY);
      if (stored && isIsoDate(stored)) setLastVisit(stored);
      window.localStorage.setItem(LAST_VISIT_STORAGE_KEY, today);
    } catch {
      // Storage can be blocked. The page works without it.
    }
  }, []);

  const counts = useMemo(() => countByKind(entries), [entries]);
  const visible = useMemo(() => filterEntries(entries, kind, query), [entries, kind, query]);
  const groups = useMemo(() => groupByMonth(visible), [visible]);
  const newCount = countNewSince(entries, lastVisit);

  return (
    <div>
      {newCount > 0 && (
        <div className={`${CARD_CLASS} mb-4`} role="status">
          <p className="m-0 text-sm">
            <strong>{newCount} new {newCount === 1 ? "entry" : "entries"}</strong> since your last visit
            {lastVisit ? ` on ${formatIsoLabel(lastVisit)}` : ""}.{" "}
            <button type="button" className={`${BUTTON_OUTLINE} !px-3 !py-1 text-sm`} onClick={() => setLastVisit(todayIso)}>
              Mark all as read
            </button>
          </p>
        </div>
      )}

      <div className={`${CARD_CLASS} mb-6`}>
        <label htmlFor="changelog-query" className="text-sm font-semibold">Looking for one thing?</label>
        <input
          id="changelog-query"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={SEARCH_PLACEHOLDER}
          className={`${INPUT_CLASS} mt-2`}
        />
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by kind of change">
          <button type="button" aria-pressed={kind === "all"} onClick={() => setKind("all")} className={`${BUTTON_OUTLINE} !px-3 !py-1 text-sm ${kind === "all" ? "font-bold" : ""}`}>
            All ({entries.length})
          </button>
          {KIND_ORDER.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={`${BUTTON_OUTLINE} !px-3 !py-1 text-sm ${kind === k ? "font-bold" : ""}`}
            >
              {KIND_LABELS[k]} ({counts[k]})
            </button>
          ))}
        </div>
        {kind !== "all" && <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">{KIND_HELP[kind]}</p>}
        <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
          Showing {visible.length} of {entries.length} entries.
        </p>
      </div>

      {visible.length === 0 && (
        <div className={CARD_CLASS}>
          <p className="m-0 text-sm text-[var(--color-muted)]">
            Nothing matches. If you saw a claim on this site that you think is wrong, tell us through the corrections page.
          </p>
        </div>
      )}

      {groups.map((group) => (
        <section key={group.monthKey} aria-labelledby={`month-${group.monthKey}`} className="mb-8">
          <h2 id={`month-${group.monthKey}`} className="mb-3">{group.label}</h2>
          <ol className="m-0 grid list-none gap-3 p-0">
            {group.entries.map((entry) => (
              <li key={entry.id} id={entry.id} className={`${CARD_CLASS} scroll-mt-24`}>
                <p className="m-0 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">
                  <time dateTime={entry.dateIso}>{formatIsoLabel(entry.dateIso)}</time>
                  {todayIso && <span className="font-normal normal-case text-[var(--color-muted)]">({describeDaysAgo(entry.dateIso, todayIso)})</span>}
                  <span>· {KIND_LABELS[entry.kind]}</span>
                  {isNewSince(entry, lastVisit) && <span className="rounded bg-[var(--color-accent)] px-1.5 py-0.5 text-white">New</span>}
                </p>
                <h3 className="mb-1 mt-2">{entry.title}</h3>
                <p className="m-0 text-sm">{entry.summary}</p>
                <p className="mb-0 mt-2 text-sm"><strong>Why it matters:</strong> {entry.whyItMatters}</p>

                {entry.numberChanges && entry.numberChanges.length > 0 && (
                  <ul className="mb-0 mt-3 list-none space-y-1 p-0 text-sm">
                    {entry.numberChanges.map((change) => (
                      <li key={change.label}>
                        <span className="text-[var(--color-muted)]">{change.label}:</span>{" "}
                        <span className="line-through decoration-[var(--color-muted)]">{change.from}</span> → <strong>{change.to}</strong>
                      </li>
                    ))}
                  </ul>
                )}

                {entry.conflict && <SourceConflictCard conflict={entry.conflict} />}

                {entry.pageHref && entry.pageLabel && (
                  <p className="mb-0 mt-3 text-sm">
                    Page: <Link href={entry.pageHref}>{entry.pageLabel}</Link>
                  </p>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}