"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { MODEL_DIRECTORY_ROWS, getReviewHref } from "@/lib/compare/modelDirectory";
import { TASK_PRESETS } from "@/lib/compare/modelCost";
import {
  comparePair,
  describeEdge,
  findMatchupForPair,
  getMatchupHref,
  LAUNCH_MATCHUP,
  MATCHUPS,
  summarizePair,
} from "@/lib/compare/matchups";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

const FIELD_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

/** Compare any two directory models on paper: list prices, one example task and the BenchLM score. */
export function PairCompare() {
  const firstId = useId();
  const secondId = useId();
  const presetId = useId();
  const [firstModelId, setFirstModelId] = useState<string>(LAUNCH_MATCHUP.modelIds[0]);
  const [secondModelId, setSecondModelId] = useState<string>(LAUNCH_MATCHUP.modelIds[1]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(TASK_PRESETS[0].id);

  const first = MODEL_DIRECTORY_ROWS.find((row) => row.id === firstModelId);
  const second = MODEL_DIRECTORY_ROWS.find((row) => row.id === secondModelId);
  const preset = TASK_PRESETS.find((candidate) => candidate.id === selectedPresetId) ?? TASK_PRESETS[0];

  const comparison = first && second && first.id !== second.id ? comparePair(first, second, preset) : null;
  const matchup = first && second ? findMatchupForPair(MATCHUPS, first.id, second.id) : undefined;

  return (
    <div className="grid gap-4">
      <div className={`${CARD_CLASS} grid gap-4 md:grid-cols-3`}>
        <div>
          <label htmlFor={firstId} className="mb-1 block text-sm font-semibold">First model</label>
          <select id={firstId} value={firstModelId} onChange={(event) => setFirstModelId(event.target.value)} className={FIELD_CLASS}>
            {MODEL_DIRECTORY_ROWS.map((row) => (
              <option key={row.id} value={row.id} disabled={row.id === secondModelId}>{row.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={secondId} className="mb-1 block text-sm font-semibold">Second model</label>
          <select id={secondId} value={secondModelId} onChange={(event) => setSecondModelId(event.target.value)} className={FIELD_CLASS}>
            {MODEL_DIRECTORY_ROWS.map((row) => (
              <option key={row.id} value={row.id} disabled={row.id === firstModelId}>{row.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={presetId} className="mb-1 block text-sm font-semibold">Example task for the cost line</label>
          <select id={presetId} value={selectedPresetId} onChange={(event) => setSelectedPresetId(event.target.value)} className={FIELD_CLASS}>
            {TASK_PRESETS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div role="status" aria-live="polite">
        {comparison ? (
          <div className="grid gap-4">
            <div className={`${CARD_CLASS} border-amber-500/60`}>
              <p className="m-0 font-semibold">On paper only, not a test result</p>
              <p className="mb-0 mt-1 text-sm">{summarizePair(comparison)}</p>
              {matchup && (
                <p className="mb-0 mt-2 text-sm">
                  {matchup.isPublished ? (
                    <Link href={getMatchupHref(matchup)} className={FOCUS_RING}>Read our full matchup</Link>
                  ) : (
                    <span className="text-[var(--color-muted)]">A full matchup for this pair is planned, and will replace this comparison.</span>
                  )}
                </p>
              )}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
              <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  {comparison.first.name} compared with {comparison.second.name} on list price, example task cost, BenchLM score and context
                </caption>
                <thead className="bg-[var(--color-surface)]">
                  <tr>
                    <th scope="col" className="p-3">Measure</th>
                    <th scope="col" className="p-3">{comparison.first.name}</th>
                    <th scope="col" className="p-3">{comparison.second.name}</th>
                    <th scope="col" className="p-3">Edge on paper</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.lines.map((line) => (
                    <tr key={line.id} className="border-t border-[var(--color-border)]">
                      <th scope="row" className="p-3 align-top">{line.label}</th>
                      <td className="p-3 align-top">{line.firstValue}</td>
                      <td className="p-3 align-top">{line.secondValue}</td>
                      <td className="p-3 align-top text-[var(--color-muted)]">{describeEdge(line, comparison)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="m-0 text-sm text-[var(--color-muted)]">
              Review links:{" "}
              {[comparison.first, comparison.second].map((row, index) => (
                <span key={row.id}>
                  {index > 0 && " · "}
                  {row.isReviewPublished ? <Link href={getReviewHref(row)} className={FOCUS_RING}>{row.name}</Link> : `${row.name} (review coming)`}
                </span>
              ))}
              . For your own token counts, use the <Link href="/compare/models#task-cost">cost-per-task table</Link>.
            </p>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Choose two different models to compare.
          </p>
        )}
      </div>
    </div>
  );
}