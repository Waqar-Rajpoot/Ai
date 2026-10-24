"use client";

import { Fragment, useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  AUDIENCE_LABELS,
  filterPrivacyRows,
  getTopicText,
  PRIVACY_ROWS,
  TOPIC_LABELS,
  TRAINING_LABELS,
  type AudienceFilter,
  type PrivacyTopic,
  type TrainingLevel,
} from "@/lib/prices/privacyMatrix";

const AUDIENCE_OPTIONS: readonly { id: AudienceFilter; label: string }[] = [
  { id: "all", label: "All services" },
  { id: "personal", label: AUDIENCE_LABELS.personal },
  { id: "work", label: AUDIENCE_LABELS.work },
  { id: "api", label: AUDIENCE_LABELS.api },
];

const TOPIC_ORDER: readonly PrivacyTopic[] = ["training", "retention", "deletion", "location"];
const COLUMN_COUNT = 3;

const TRAINING_STYLES: Record<TrainingLevel, string> = {
  "trains-by-default": "border-amber-500 text-amber-600 dark:text-amber-400",
  "your-choice": "border-sky-500 text-sky-600 dark:text-sky-400",
  "no-training": "border-emerald-500 text-emerald-600 dark:text-emerald-400",
  unclear: "border-dashed",
};

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
        active
          ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
          : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
      }`}
    >
      {children}
    </button>
  );
}

/** Privacy matrix with an audience filter, topic tabs and expandable details per service. */
export function PrivacyMatrixTable() {
  const [audience, setAudience] = useState<AudienceFilter>("all");
  const [topic, setTopic] = useState<PrivacyTopic>("training");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const rows = useMemo(() => filterPrivacyRows(PRIVACY_ROWS, audience), [audience]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter by who it is for">
        {AUDIENCE_OPTIONS.map((option) => (
          <FilterChip key={option.id} active={audience === option.id} onClick={() => setAudience(option.id)}>
            {option.label}
          </FilterChip>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Choose what to compare">
        {TOPIC_ORDER.map((id) => (
          <FilterChip key={id} active={topic === id} onClick={() => setTopic(id)}>
            {TOPIC_LABELS[id]}
          </FilterChip>
        ))}
      </div>

      <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
        <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
          <caption className="sr-only">Privacy practices of AI services: {TOPIC_LABELS[topic]}</caption>
          <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
            <tr>
              <th scope="col" className="p-3">Service</th>
              <th scope="col" className="p-3">Who it is for</th>
              <th scope="col" className="p-3">{TOPIC_LABELS[topic]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isOpen = expandedId === row.id;
              return (
                <Fragment key={row.id}>
                  <tr className="border-t border-[var(--color-border)]">
                    <th scope="row" className="p-3 align-top font-normal">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`privacy-${row.id}`}
                        onClick={() => setExpandedId(isOpen ? null : row.id)}
                        className={`flex items-start gap-2 text-left font-semibold ${FOCUS_RING}`}
                      >
                        <span aria-hidden="true" className="text-[var(--color-accent)]">{isOpen ? "▾" : "▸"}</span>
                        {row.name}
                      </button>
                      <span className="ml-5 block text-xs text-[var(--color-muted)]">{row.maker} · {row.plans}</span>
                    </th>
                    <td className="p-3 align-top">{AUDIENCE_LABELS[row.audience]}</td>
                    <td className="p-3 align-top">
                      {topic === "training" && (
                        <span className={`${BADGE_CLASS} mb-1 ${TRAINING_STYLES[row.training.level]}`}>
                          {TRAINING_LABELS[row.training.level]}
                        </span>
                      )}
                      <span className="block">{getTopicText(row, topic)}</span>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr id={`privacy-${row.id}`} className="bg-[var(--color-bg)]">
                      <td colSpan={COLUMN_COUNT} className="p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          {TOPIC_ORDER.map((id) => (
                            <div key={id}>
                              <h4 className="m-0 mb-1 text-sm font-semibold">{TOPIC_LABELS[id]}</h4>
                              <p className="m-0 text-sm text-[var(--color-muted)]">{getTopicText(row, id)}</p>
                            </div>
                          ))}
                        </div>
                        <h4 className="mb-1 mt-4 text-sm font-semibold">Watch for</h4>
                        <ul className="m-0 grid gap-1 pl-5 text-sm text-[var(--color-muted)]">
                          {row.watchFor.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                        <p className="mb-0 mt-4 text-sm">
                          {row.verification === "provider"
                            ? "Read on the provider's own pages."
                            : "Partly read through trackers. Confirm on the provider's pages."}
                        </p>
                        <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-sm">
                          {row.sources.map((source) => (
                            <li key={source.href}>
                              <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
        Select a service name for every topic, warnings and sources. &quot;Trains by default&quot; means you must opt out. Practices change, so confirm on the provider&apos;s page.
      </p>
    </div>
  );
}