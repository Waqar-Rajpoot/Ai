import {
  ADOPTION_FROM_QUARTER,
  ADOPTION_GROUP,
  ADOPTION_ROWS,
  ADOPTION_SOURCE_LABEL,
  ADOPTION_TO_QUARTER,
  ADOPTION_VERIFIED_ON,
  percentagePointChange,
  type AdoptionRow,
} from "./adoptionData";
import {
  MIN_TICKS_CHECKABLE,
  MIN_TICKS_PARTLY_CHECKABLE,
  ONE_DECIMAL_FACTOR,
  QUARTERS_PER_YEAR,
} from "./adoptionExplainedConstants";
import { SECONDARY_FIGURES } from "./adoptionSurveysData";
import { PERCENT_SCALE } from "./societyConstants";

export type ClaimReading = "lead-only" | "partly-checkable" | "checkable";
export type LedgerKind = "tracker" | "arithmetic" | "secondary";

export interface SeriesStats {
  id: string;
  label: string;
  fromPercent: number;
  toPercent: number;
  pointChange: number;
  /** Whole-number percent growth relative to the starting share. */
  relativeChangePercent: number;
  /** Straight-line average, to one decimal. It is arithmetic, not the true path between quarters. */
  averagePointsPerQuarter: number | null;
}

/**
 * Splits of the overall share, assuming "overall" counts anyone who uses at work OR outside work.
 * That assumption is ours, so the page labels these as arithmetic.
 */
export interface OverlapEstimate {
  both: number;
  onlyWork: number;
  onlyOutsideWork: number;
  neither: number;
}

export interface LedgerRow {
  id: string;
  number: string;
  meaning: string;
  group: string;
  period: string;
  source: string;
  kind: LedgerKind;
  status: string;
}

export interface ClaimQuestion {
  id: string;
  question: string;
  whyItMatters: string;
}

const QUARTER_PATTERN = /^Q([1-4]) (\d{4})$/;

export const LEDGER_KIND_LABELS: Record<LedgerKind, string> = {
  tracker: "Reported by the tracker",
  arithmetic: "Our arithmetic",
  secondary: "Secondary summary",
};

function roundOneDecimal(value: number): number {
  return Math.round(value * ONE_DECIMAL_FACTOR) / ONE_DECIMAL_FACTOR;
}

function toQuarterIndex(label: string): number | null {
  const match = QUARTER_PATTERN.exec(label);
  if (!match) return null;
  return Number(match[2]) * QUARTERS_PER_YEAR + Number(match[1]);
}

/** Quarters from one label to a later one, such as "Q3 2024" to "Q2 2026" = 7. Null if a label is malformed. */
export function quartersBetween(fromLabel: string, toLabel: string): number | null {
  const from = toQuarterIndex(fromLabel);
  const to = toQuarterIndex(toLabel);
  if (from === null || to === null || to < from) return null;
  return to - from;
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function formatPoints(value: number): string {
  return `${value > 0 ? "+" : ""}${value} points`;
}

/** Change figures for each row, computed from the shared data so they cannot drift. */
export function getSeriesStats(
  rows: readonly AdoptionRow[] = ADOPTION_ROWS,
  fromQuarter: string = ADOPTION_FROM_QUARTER,
  toQuarter: string = ADOPTION_TO_QUARTER,
): SeriesStats[] {
  const quarters = quartersBetween(fromQuarter, toQuarter);
  return rows.map((row) => {
    const pointChange = percentagePointChange(row);
    return {
      id: row.id,
      label: row.label,
      fromPercent: row.fromPercent,
      toPercent: row.toPercent,
      pointChange,
      relativeChangePercent: row.fromPercent === 0 ? 0 : Math.round((pointChange / row.fromPercent) * PERCENT_SCALE),
      averagePointsPerQuarter: quarters && quarters > 0 ? roundOneDecimal(pointChange / quarters) : null,
    };
  });
}

export function findRow(id: string, rows: readonly AdoptionRow[] = ADOPTION_ROWS): AdoptionRow | undefined {
  return rows.find((row) => row.id === id);
}

/**
 * Overlap between work and outside-work use. Returns null when the three figures cannot fit together
 * under the "overall = work or outside work" assumption.
 */
export function estimateOverlap(overall: number, work: number, outsideWork: number): OverlapEstimate | null {
  const fits = overall >= Math.max(work, outsideWork) && overall <= work + outsideWork && overall <= PERCENT_SCALE;
  if (!fits) return null;
  return {
    both: roundOneDecimal(work + outsideWork - overall),
    onlyWork: roundOneDecimal(overall - outsideWork),
    onlyOutsideWork: roundOneDecimal(overall - work),
    neither: roundOneDecimal(PERCENT_SCALE - overall),
  };
}

/** Outside-work share minus work share, in points. Positive means outside work is higher. */
export function outsideMinusWorkGap(work: number, outsideWork: number): number {
  return roundOneDecimal(outsideWork - work);
}

/** Share of users (anyone using generative AI) who also use it at work, in percent. */
export function shareOfUsersAtWork(overall: number, work: number): number | null {
  if (overall <= 0) return null;
  return roundOneDecimal((work / overall) * PERCENT_SCALE);
}

/** How checkable a claim is, from how many of the six questions its source answers. */
export function rateClaim(tickedCount: number): ClaimReading {
  if (tickedCount >= MIN_TICKS_CHECKABLE) return "checkable";
  if (tickedCount >= MIN_TICKS_PARTLY_CHECKABLE) return "partly-checkable";
  return "lead-only";
}

function trackerStatus(): string {
  return ADOPTION_VERIFIED_ON ? `Verified on ${ADOPTION_VERIFIED_ON}` : "Not yet checked against the original";
}

/** Every number on the page with its source, group, period and check status. */
export function buildNumberLedger(): LedgerRow[] {
  const rows: LedgerRow[] = [];
  const stats = getSeriesStats();

  for (const row of ADOPTION_ROWS) {
    for (const [quarter, value] of [
      [ADOPTION_FROM_QUARTER, row.fromPercent],
      [ADOPTION_TO_QUARTER, row.toPercent],
    ] as const) {
      rows.push({
        id: `${row.id}-${quarter}`,
        number: formatPercent(value),
        meaning: row.label,
        group: ADOPTION_GROUP,
        period: quarter,
        source: ADOPTION_SOURCE_LABEL,
        kind: "tracker",
        status: trackerStatus(),
      });
    }
  }
  for (const stat of stats) {
    rows.push({
      id: `${stat.id}-change`,
      number: formatPoints(stat.pointChange),
      meaning: `Change in: ${stat.label.toLowerCase()}`,
      group: ADOPTION_GROUP,
      period: `${ADOPTION_FROM_QUARTER} to ${ADOPTION_TO_QUARTER}`,
      source: "Our subtraction of the two tracker figures",
      kind: "arithmetic",
      status: "Correct only if the tracker figures are",
    });
  }
  for (const figure of SECONDARY_FIGURES) {
    rows.push({
      id: figure.id,
      number: figure.valueText,
      meaning: figure.measure,
      group: figure.group ?? "Not confirmed",
      period: figure.period ?? "Not confirmed",
      source: figure.publisher,
      kind: "secondary",
      status: "Original not yet checked. Do not cite.",
    });
  }
  return rows;
}

export function countLedgerByKind(rows: readonly LedgerRow[]): Record<LedgerKind, number> {
  const counts: Record<LedgerKind, number> = { tracker: 0, arithmetic: 0, secondary: 0 };
  for (const row of rows) counts[row.kind] += 1;
  return counts;
}