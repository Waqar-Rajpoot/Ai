"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BADGE_CLASS, BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import {
  EVIDENCE_LABELS,
  INDUSTRIES,
  STAGE_HINTS,
  STAGE_LABELS,
  type EvidenceLevel,
  type Industry,
  type IndustryId,
  type Stage,
} from "@/lib/society/industries";
import { NO_FILTER, countByEvidence, filterIndustries, type IndustryFilter } from "@/lib/society/industriesLogic";

const STAGES: readonly Stage[] = ["now", "next", "later"];
const EVIDENCE: readonly EvidenceLevel[] = ["named-survey", "directional"];
const EVIDENCE_COUNTS = countByEvidence();

function pillClass(active: boolean): string {
  const base = `rounded-full border px-3 py-1 text-sm transition motion-reduce:transition-none ${FOCUS_RING}`;
  return active
    ? `${base} border-[var(--color-accent)] bg-[var(--color-accent)] text-white`
    : `${base} border-[var(--color-border)] bg-transparent text-[var(--color-text)]`;
}

function IndustryCard({ industry }: { industry: Industry }) {
  const directional = industry.evidence === "directional";
  return (
    <article className={CARD_CLASS}>
      <p className="m-0 flex flex-wrap gap-2">
        <span className={BADGE_CLASS}>{STAGE_LABELS[industry.stage]}</span>
        <span className={`${BADGE_CLASS} ${directional ? "border-dashed border-amber-500 text-amber-700 dark:text-amber-400" : "border-emerald-500 text-emerald-700 dark:text-emerald-400"}`}>
          {EVIDENCE_LABELS[industry.evidence]}
        </span>
      </p>
      <h3 className="mb-1 mt-3">{industry.name}</h3>
      <p className="m-0 font-semibold">{industry.headline}</p>
      <p className="mb-0 mt-2 text-sm">{industry.whatChanges}</p>
      <p className="mb-0 mt-2 text-sm"><strong>Who feels it:</strong> {industry.whoFeelsIt}</p>
      <p className="mb-0 mt-2 text-sm"><strong>Watch:</strong> {industry.watch}</p>

      {industry.figures.length > 0 && (
        <dl className="mb-0 mt-4 grid gap-3 border-t border-[var(--color-border)] pt-3 text-sm">
          {industry.figures.map((figure) => (
            <div key={figure.label}>
              <dt className="text-[var(--color-muted)]">{figure.label}</dt>
              <dd className="m-0">
                <span className="text-lg font-extrabold tabular-nums">{figure.value}</span>
                <span className="block text-xs text-[var(--color-muted)]">
                  {figure.source} · {figure.period} ·{" "}
                  <a href={figure.url} target="_blank" rel="noopener noreferrer">
                    {figure.verification === "provider" ? "Agency page" : "Secondary: confirm"}
                  </a>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {industry.directionalNote && (
        <p className="mb-0 mt-4 rounded-lg border border-dashed border-amber-500 p-3 text-xs">{industry.directionalNote}</p>
      )}

      {industry.deeperHref && (
        <p className="mb-0 mt-4 text-sm"><Link href={industry.deeperHref}>{industry.deeperLabel ?? "Read more"}</Link></p>
      )}
    </article>
  );
}

/** Stage, evidence and single-industry filters over the eight cards. Works with plain buttons and a select. */
export function IndustryFilterCards() {
  const [filter, setFilter] = useState<IndustryFilter>(NO_FILTER);
  const rows = useMemo(() => filterIndustries(filter), [filter]);
  const isFiltered = filter.stage !== "all" || filter.evidence !== "all" || filter.industryId !== "all";

  return (
    <div>
      <div className={`${CARD_CLASS} mb-6 grid gap-4`}>
        <div>
          <label htmlFor="industry-select" className="text-sm font-semibold">Find my industry</label>
          <select
            id="industry-select"
            value={filter.industryId}
            onChange={(event) => setFilter({ ...filter, industryId: event.target.value as IndustryId | "all" })}
            className={`${INPUT_CLASS} mt-2`}
          >
            <option value="all">All eight industries</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry.id} value={industry.id}>{industry.name}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="m-0 text-sm font-semibold">Timing</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" aria-pressed={filter.stage === "all"} onClick={() => setFilter({ ...filter, stage: "all" })} className={pillClass(filter.stage === "all")}>All</button>
            {STAGES.map((stage) => (
              <button key={stage} type="button" aria-pressed={filter.stage === stage} title={STAGE_HINTS[stage]} onClick={() => setFilter({ ...filter, stage })} className={pillClass(filter.stage === stage)}>
                {STAGE_LABELS[stage]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="m-0 text-sm font-semibold">Evidence</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" aria-pressed={filter.evidence === "all"} onClick={() => setFilter({ ...filter, evidence: "all" })} className={pillClass(filter.evidence === "all")}>All</button>
            {EVIDENCE.map((evidence) => (
              <button key={evidence} type="button" aria-pressed={filter.evidence === evidence} onClick={() => setFilter({ ...filter, evidence })} className={pillClass(filter.evidence === evidence)}>
                {EVIDENCE_LABELS[evidence]} ({EVIDENCE_COUNTS[evidence]})
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <p className="m-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
            Showing {rows.length} of {INDUSTRIES.length} industries.
          </p>
          {isFiltered && (
            <button type="button" onClick={() => setFilter(NO_FILTER)} className={`${BUTTON_OUTLINE} !px-3 !py-1 text-sm`}>Clear filters</button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rows.length === 0 && (
          <p className={`${CARD_CLASS} m-0 text-sm text-[var(--color-muted)] md:col-span-2`}>
            No industry matches that combination. Clear the filters to see all eight.
          </p>
        )}
        {rows.map((industry) => (
          <IndustryCard key={industry.id} industry={industry} />
        ))}
      </div>
    </div>
  );
}