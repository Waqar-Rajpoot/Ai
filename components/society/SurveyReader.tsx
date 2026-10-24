"use client";

import { useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { barWidthPercent } from "@/lib/society/anchorFigures";
import { getSurveyStats, type StatLine } from "@/lib/society/jobs";
import { SURVEY_PROFILES } from "@/lib/society/jobsData";
import { PERCENT_SCALE } from "@/lib/society/societyConstants";
import { PlainTechnicalToggle } from "./PlainTechnicalToggle";

const LABEL_CLASS = "m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]";

function StatBar({ stat }: { stat: StatLine }) {
  if (stat.barPercent === undefined) return null;
  return (
    <div
      className="relative mt-1 h-2 overflow-hidden rounded-full bg-[var(--color-border)]"
      role="img"
      aria-label={`${stat.label}: ${stat.value}, on a scale of 0 to 100 percent`}
    >
      {stat.barFromPercent !== undefined && (
        <div className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent)] opacity-40" style={{ width: `${barWidthPercent(stat.barFromPercent, PERCENT_SCALE)}%` }} />
      )}
      <div className="absolute inset-y-0 left-0 min-w-1 rounded-full bg-[image:var(--gradient-accent)]" style={{ width: `${barWidthPercent(stat.barPercent, PERCENT_SCALE)}%` }} />
    </div>
  );
}

/** The three named sources side by side: what each counted, what it can and cannot tell you. */
export function SurveyReader() {
  const [isTechnical, setIsTechnical] = useState(false);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
          {isTechnical ? "The technical layer is on." : "Switch to Technical for what each measurement hides."}
        </p>
        <PlainTechnicalToggle isTechnical={isTechnical} onChange={setIsTechnical} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {SURVEY_PROFILES.map((profile) => (
          <article key={profile.id} id={`survey-${profile.id}`} className={`${CARD_CLASS} scroll-mt-24`}>
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">{profile.kindLabel}</p>
            <h3 className="mb-1 mt-1">{profile.publisher}</h3>
            <p className="m-0 text-sm text-[var(--color-muted)]">{profile.title}</p>
            <p className="mb-0 mt-2"><span className={BADGE_CLASS}>{profile.published}</span></p>

            <ul className="m-0 mt-4 grid list-none gap-3 p-0">
              {getSurveyStats(profile.id).map((stat) => (
                <li key={stat.label}>
                  <p className="m-0 text-xs text-[var(--color-muted)]">{stat.label}</p>
                  <p className="m-0 text-lg font-extrabold tabular-nums">{stat.value}</p>
                  {stat.note && <p className="m-0 text-xs text-[var(--color-muted)]">{stat.note}</p>}
                  <StatBar stat={stat} />
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-3 text-sm">
              <p className="m-0"><strong>Who answered:</strong> {profile.whoAnswered}</p>
              <p className="m-0"><strong>What was counted:</strong> {profile.whatWasCounted}</p>
              <p className="m-0"><strong>Kind of evidence:</strong> {profile.evidenceKind}</p>
            </div>

            <div className="mt-4">
              <p className={LABEL_CLASS}>It can tell you</p>
              <ul className="mb-0 mt-1 grid gap-1 pl-5 text-sm">
                {profile.canTellYou.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </div>
            <div className="mt-4">
              <p className={LABEL_CLASS}>It cannot tell you</p>
              <ul className="mb-0 mt-1 grid gap-1 pl-5 text-sm">
                {profile.cannotTellYou.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </div>

            <details className="mt-4 text-sm">
              <summary className={`cursor-pointer font-semibold ${FOCUS_RING}`}>Check in the original</summary>
              <ul className="mb-0 mt-2 grid gap-1 pl-5">
                {profile.checkInOriginal.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </details>

            {isTechnical && (
              <div className="mt-4 rounded-xl border border-dashed border-[var(--color-accent)] bg-[var(--color-bg)] p-4">
                <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Go deeper</p>
                <p className="mb-0 mt-1 text-sm">{profile.technicalNote}</p>
              </div>
            )}
          </article>
        ))}
      </div>
      <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">Bars run from 0 to 100%. Where two bars show, the pale one is the earlier quarter.</p>
    </div>
  );
}