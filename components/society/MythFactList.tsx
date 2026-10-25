"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, INPUT_CLASS } from "@/components/shared/pageStyles";
import { filterMythFacts, getEvidenceForItem, groupByTheme, type MythFactFilters } from "@/lib/society/mythFactLogic";
import { ALL_FILTER_VALUE } from "@/lib/society/mythsFactsConstants";
import {
  EVIDENCE_KIND_LABELS,
  MYTH_FACTS,
  SOURCE_CHECK_LABELS,
  THEME_LABELS,
  THEME_ORDER,
  VERDICT_LABELS,
  VERDICT_ORDER,
} from "@/lib/society/mythsFacts";
import { PlainTechnicalToggle, type ReadingMode } from "./PlainTechnicalToggle";
import { VERDICT_BORDER_CLASSES, VerdictBadge } from "./VerdictBadge";

const INITIAL_FILTERS: MythFactFilters = { query: "", theme: ALL_FILTER_VALUE, verdict: ALL_FILTER_VALUE };

/** Searchable list of every claim, with a Plain/Technical toggle and the evidence for each. */
export function MythFactList() {
  const [filters, setFilters] = useState<MythFactFilters>(INITIAL_FILTERS);
  const [mode, setMode] = useState<ReadingMode>("plain");

  const visibleItems = useMemo(() => filterMythFacts(MYTH_FACTS, filters), [filters]);
  const groups = useMemo(() => groupByTheme(visibleItems), [visibleItems]);

  function updateFilter<Key extends keyof MythFactFilters>(key: Key, value: MythFactFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div>
      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_14rem_12rem]">
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Search a claim or a word</span>
          <input
            type="search"
            value={filters.query}
            onChange={(event) => updateFilter("query", event.target.value)}
            placeholder="for example jobs, energy or detector"
            className={`${INPUT_CLASS} mt-1`}
          />
        </label>
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Theme</span>
          <select value={filters.theme} onChange={(event) => updateFilter("theme", event.target.value)} className={`${INPUT_CLASS} mt-1`}>
            <option value={ALL_FILTER_VALUE}>All themes</option>
            {THEME_ORDER.map((theme) => (
              <option key={theme} value={theme}>{THEME_LABELS[theme]}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="text-[var(--color-muted)]">Verdict</span>
          <select value={filters.verdict} onChange={(event) => updateFilter("verdict", event.target.value)} className={`${INPUT_CLASS} mt-1`}>
            <option value={ALL_FILTER_VALUE}>All verdicts</option>
            {VERDICT_ORDER.map((verdict) => (
              <option key={verdict} value={verdict}>{VERDICT_LABELS[verdict]}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
          Showing {visibleItems.length} of {MYTH_FACTS.length} claims.
        </p>
        <PlainTechnicalToggle mode={mode} onChange={setMode} />
      </div>

      {groups.length === 0 && (
        <p className={`${CARD_CLASS} text-center text-[var(--color-muted)]`}>Nothing matches these filters.</p>
      )}

      <div className="grid gap-8">
        {groups.map((group) => (
          <section key={group.theme} aria-labelledby={`theme-${group.theme}`}>
            <h3 id={`theme-${group.theme}`} className="mt-0">
              {group.label} <span className="text-sm font-normal text-[var(--color-muted)]">({group.items.length})</span>
            </h3>
            <div className="grid gap-4">
              {group.items.map((item) => {
                const evidence = getEvidenceForItem(item);
                return (
                  <article key={item.id} id={item.id} className={`${CARD_CLASS} ${VERDICT_BORDER_CLASSES[item.verdict]} scroll-mt-24`}>
                    <p className="m-0"><VerdictBadge verdict={item.verdict} /></p>
                    <h4 className="mb-2 mt-2">&ldquo;{item.statement}&rdquo;</h4>
                    <p className="m-0">{item.plain}</p>
                    {mode === "technical" && (
                      <p className="mb-0 mt-3 rounded-lg bg-[var(--color-bg)] p-3 text-sm text-[var(--color-muted)]">
                        <strong className="text-[var(--color-text)]">Technical layer:</strong> {item.technical}
                      </p>
                    )}
                    <p className="mb-0 mt-3 text-sm"><strong>What to do:</strong> {item.whatToDo}</p>

                    <div className="mt-3 border-t border-[var(--color-border)] pt-3 text-sm">
                      <p className="m-0 font-semibold">Evidence</p>
                      {evidence.length > 0 ? (
                        <ul className="mb-0 mt-2 grid list-none gap-2 p-0">
                          {evidence.map((source) => (
                            <li key={source.id}>
                              <span className={`${BADGE_CLASS} mr-2`}>{EVIDENCE_KIND_LABELS[source.kind]}</span>
                              <a href={source.href} target="_blank" rel="noopener noreferrer">{source.publisher}: {source.title}</a>
                              <span className="block text-xs text-[var(--color-muted)]">
                                {source.asOf} · {SOURCE_CHECK_LABELS[source.check]}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-0 mt-1 text-[var(--color-muted)]">Established general knowledge, not a single dated source.</p>
                      )}
                      {item.relatedLink && (
                        <p className="mb-0 mt-3"><Link href={item.relatedLink.href}>{item.relatedLink.label}</Link></p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}