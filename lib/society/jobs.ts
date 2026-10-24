import {
  ADOPTION_FROM_QUARTER,
  ADOPTION_ROWS,
  ADOPTION_TO_QUARTER,
  percentagePointChange,
} from "./adoptionData";
import { JOBS_FINDINGS } from "./anchorFigures";
import { MIN_TRAITS_FOR_READING, ONE_SIDED_RATIO } from "./jobsConstants";

export type SurveyId = "net-effect" | "layoff-plans" | "adoption";
export type TraitDirection = "more-change" | "less-change";
export type ProfileReading = "need-more" | "many-tasks-may-change" | "mixed" | "tasks-mostly-human";

/** One headline figure or finding from a source, ready to show. */
export interface StatLine {
  label: string;
  value: string;
  note?: string;
  /** Latest value for a 0 to 100 bar. */
  barPercent?: number;
  /** Earlier value, drawn as a paler bar. */
  barFromPercent?: number;
}

export interface SurveyProfile {
  id: SurveyId;
  publisher: string;
  title: string;
  kindLabel: string;
  published: string;
  whoAnswered: string;
  whatWasCounted: string;
  /** "Opinion", "Plan" or "Behaviour": the kind of evidence it is. */
  evidenceKind: string;
  closenessToOutcomes: string;
  canTellYou: readonly string[];
  cannotTellYou: readonly string[];
  checkInOriginal: readonly string[];
  /** The "go deeper" layer, shown when the reader switches to Technical. */
  technicalNote: string;
}

export interface WorkTrait {
  id: string;
  text: string;
  direction: TraitDirection;
  why: string;
}

export interface ProfileResult {
  ticked: number;
  moreChange: number;
  lessChange: number;
  reading: ProfileReading;
}

const ADOPTION_ROW_IDS_SHOWN: readonly string[] = ["overall", "work"];

/** Headline figures for a source. Numbers come from the shared data modules, so they cannot drift. */
export function getSurveyStats(id: SurveyId): StatLine[] {
  switch (id) {
    case "net-effect":
      return [{ label: "Reported finding", value: JOBS_FINDINGS.surveyorNet.finding }];
    case "layoff-plans":
      return JOBS_FINDINGS.ism.rows.map((row) => ({
        label: `${row.label}: share reporting layoff plans after introducing AI`,
        value: `${row.percent}%`,
        barPercent: row.percent,
      }));
    case "adoption":
      return ADOPTION_ROWS.filter((row) => ADOPTION_ROW_IDS_SHOWN.includes(row.id)).map((row) => ({
        label: row.label,
        value: `${row.fromPercent}% to ${row.toPercent}%`,
        note: `${ADOPTION_FROM_QUARTER} to ${ADOPTION_TO_QUARTER}, +${percentagePointChange(row)} points`,
        barPercent: row.toPercent,
        barFromPercent: row.fromPercent,
      }));
  }
}

/**
 * Counts ticked statements by direction and gives a cautious reading.
 * It describes which kinds of task dominate. It does not predict anyone's job.
 */
export function assessWorkProfile(
  traits: readonly WorkTrait[],
  selectedIds: ReadonlySet<string>,
): ProfileResult {
  let moreChange = 0;
  let lessChange = 0;
  for (const trait of traits) {
    if (!selectedIds.has(trait.id)) continue;
    if (trait.direction === "more-change") moreChange += 1;
    else lessChange += 1;
  }
  const ticked = moreChange + lessChange;
  if (ticked < MIN_TRAITS_FOR_READING) return { ticked, moreChange, lessChange, reading: "need-more" };

  let reading: ProfileReading = "mixed";
  if (moreChange / ticked >= ONE_SIDED_RATIO) reading = "many-tasks-may-change";
  else if (lessChange / ticked >= ONE_SIDED_RATIO) reading = "tasks-mostly-human";
  return { ticked, moreChange, lessChange, reading };
}