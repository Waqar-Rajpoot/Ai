"use client";

import { useMemo, useState } from "react";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import { ALL_MAKERS, filterScores, listMakers, sortScores } from "@/lib/prices/benchmarkLogic";
import { SORT_OPTIONS } from "@/lib/prices/benchmarkPageContent";
import { INDEPENDENT_SCORES, INDEPENDENT_SOURCES } from "@/lib/prices/benchmarkRecords";
import type { ScoreSortKey } from "@/lib/prices/benchmarkTypes";
import { IndependentScoreTable } from "./IndependentScoreTable";

const FIELD_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;
const MAKERS = listMakers(INDEPENDENT_SCORES);

/** Filter and sort the independent scores. Each source keeps its own table: scores are never combined. */
export function IndependentScoresExplorer({ todayIso }: { todayIso: string }) {
  const [maker, setMaker] = useState(ALL_MAKERS);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<ScoreSortKey>("score");

  const tables = useMemo(
    () =>
      INDEPENDENT_SOURCES.map((source) => ({
        source,
        scores: sortScores(
          filterScores(INDEPENDENT_SCORES.filter((entry) => entry.sourceId === source.id), { maker, query }),
          sortKey,
        ),
      })).filter((table) => table.scores.length > 0),
    [maker, query, sortKey],
  );

  function resetFilters() {
    setMaker(ALL_MAKERS);
    setQuery("");
    setSortKey("score");
  }

  return (
    <div>
      <div className={`${CARD_CLASS} grid gap-4 sm:grid-cols-3`}>
        <div>
          <label htmlFor="benchmark-search" className="mb-1 block text-sm font-semibold">Search a model</label>
          <input id="benchmark-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="for example Opus" className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor="benchmark-maker" className="mb-1 block text-sm font-semibold">Maker</label>
          <select id="benchmark-maker" value={maker} onChange={(event) => setMaker(event.target.value)} className={FIELD_CLASS}>
            <option value={ALL_MAKERS}>All makers</option>
            {MAKERS.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="benchmark-sort" className="mb-1 block text-sm font-semibold">Order</label>
          <select
            id="benchmark-sort"
            value={sortKey}
            onChange={(event) => {
              const option = SORT_OPTIONS.find((item) => item.id === event.target.value);
              if (option) setSortKey(option.id);
            }}
            className={FIELD_CLASS}
          >
            {SORT_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </div>
      </div>

      <p className="mb-4 mt-4 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
        Showing {tables.length} of {INDEPENDENT_SOURCES.length} tables. Scores from different sources are on different scales, so never add or compare them across tables.
      </p>

      {tables.length === 0 ? (
        <div className={`${CARD_CLASS} text-center`}>
          <p className="mt-0 font-semibold">No scores match these filters.</p>
          <button type="button" onClick={resetFilters} className={`inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-5 py-2.5 font-semibold ${FOCUS_RING}`}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-10">
          {tables.map(({ source, scores }) => (
            <IndependentScoreTable key={source.id} source={source} scores={scores} todayIso={todayIso} />
          ))}
        </div>
      )}
    </div>
  );
}