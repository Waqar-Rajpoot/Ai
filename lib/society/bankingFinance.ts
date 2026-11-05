import { ONE_DECIMAL_FACTOR } from "./adoptionExplainedConstants";
import { BANKING_FINANCE_VERIFIED_ON, SCORE_DECIMALS } from "./bankingFinanceConstants";
import {
  COMPARISON_DEFINITIONS,
  OUTLOOK_ROWS,
  SURVEY_FIGURES,
  type ComparisonDefinition,
  type FigureUnit,
  type HeadlineEntry,
  type SurveyFigure,
} from "./bankingFinanceData";
import { PERCENT_SCALE } from "./societyConstants";

export type LedgerKind = "reported" | "arithmetic";

export interface LedgerRow {
  id: string;
  number: string;
  meaning: string;
  base: string;
  period: string;
  reportSection: string;
  kind: LedgerKind;
  status: string;
}

export interface ComparisonPoint {
  year: string;
  figure: SurveyFigure;
}

export interface ComparisonStep {
  fromYear: string;
  toYear: string;
  /** Percentage-point change between two reported figures. Our arithmetic. */
  change: number;
}

export interface ResolvedComparison {
  id: string;
  label: string;
  caution?: string;
  points: ComparisonPoint[];
  steps: ComparisonStep[];
}

export interface ResolvedOutlookRow {
  id: string;
  label: string;
  scaleNote: string;
  today: string;
  future: string;
}

export interface DecodedFigure {
  id: string;
  valueText: string;
  measure: string;
  base: string;
  period: string;
  reportSection: string;
}

export interface DecodedHeadline extends HeadlineEntry {
  figures: DecodedFigure[];
}

export const LEDGER_KIND_LABELS: Record<LedgerKind, string> = {
  reported: "Reported by the survey",
  arithmetic: "Our arithmetic",
};

const PERCENT_PATTERN = /(\d+(?:\.\d+)?)%/g;
const INVESTMENT_SECTOR_ID = "investment";

function buildFigureIndex(figures: readonly SurveyFigure[]): ReadonlyMap<string, SurveyFigure> {
  const index = new Map<string, SurveyFigure>();
  for (const figure of figures) {
    if (index.has(figure.id)) throw new Error(`Duplicate survey figure id: ${figure.id}`);
    index.set(figure.id, figure);
  }
  return index;
}

const FIGURE_INDEX = buildFigureIndex(SURVEY_FIGURES);

function roundOneDecimal(value: number): number {
  return Math.round(value * ONE_DECIMAL_FACTOR) / ONE_DECIMAL_FACTOR;
}

/** Looks up a figure by id. Throws on a typo, so a bad id fails the build rather than showing a blank. */
export function requireFigure(id: string): SurveyFigure {
  const figure = FIGURE_INDEX.get(id);
  if (!figure) throw new Error(`Unknown survey figure id: ${id}`);
  return figure;
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function formatPointChange(value: number): string {
  return `${value > 0 ? "+" : ""}${value} points`;
}

export function formatValue(value: number, unit: FigureUnit): string {
  if (unit === "percent") return formatPercent(value);
  if (unit === "score") return value.toFixed(SCORE_DECIMALS);
  return String(value);
}

export function formatFigureValue(figure: SurveyFigure): string {
  return formatValue(figure.value, figure.unit);
}

/** Keeps a bar width inside 0 to 100 percent. */
export function clampPercent(value: number): number {
  return Math.min(Math.max(value, 0), PERCENT_SCALE);
}

export function resolveComparison(definition: ComparisonDefinition): ResolvedComparison {
  const points = definition.points.map((point) => ({ year: point.year, figure: requireFigure(point.figureId) }));
  const steps = points.slice(1).map((point, index) => ({
    fromYear: points[index].year,
    toYear: point.year,
    change: roundOneDecimal(point.figure.value - points[index].figure.value),
  }));
  return { id: definition.id, label: definition.label, caution: definition.caution, points, steps };
}

const COMPARISONS: readonly ResolvedComparison[] = COMPARISON_DEFINITIONS.map(resolveComparison);

export function getComparisons(): readonly ResolvedComparison[] {
  return COMPARISONS;
}

export function requireComparison(id: string): ResolvedComparison {
  const comparison = COMPARISONS.find((candidate) => candidate.id === id);
  if (!comparison) throw new Error(`Unknown comparison id: ${id}`);
  return comparison;
}

export function resolveOutlookRows(): ResolvedOutlookRow[] {
  return OUTLOOK_ROWS.map((row) => ({
    id: row.id,
    label: row.label,
    scaleNote: row.scaleNote,
    today: formatValue(row.today, row.unit),
    future: formatValue(row.future, row.unit),
  }));
}

/** Investment and capital-markets firms as a whole-number share of all responders. Our arithmetic. */
export function investmentShareOfRespondents(): number {
  const investment = requireFigure(`sector-${INVESTMENT_SECTOR_ID}-count`);
  const total = requireFigure("respondents-total");
  return Math.round((investment.value / total.value) * PERCENT_SCALE);
}

/** Every number on the page with its base, period, report section and check status. */
export function buildBankingLedger(): LedgerRow[] {
  const reportedStatus = `Checked against the original on ${BANKING_FINANCE_VERIFIED_ON}`;
  const rows: LedgerRow[] = SURVEY_FIGURES.map((figure) => ({
    id: figure.id,
    number: formatFigureValue(figure),
    meaning: figure.measure,
    base: figure.base,
    period: figure.period,
    reportSection: figure.reportSection,
    kind: "reported",
    status: figure.note ? `${reportedStatus}. ${figure.note}` : reportedStatus,
  }));

  for (const comparison of COMPARISONS) {
    for (const step of comparison.steps) {
      rows.push({
        id: `${comparison.id}-${step.fromYear}-${step.toYear}`,
        number: formatPointChange(step.change),
        meaning: `Change in: ${comparison.label.toLowerCase()}`,
        base: "Our subtraction of two reported figures",
        period: `${step.fromYear} to ${step.toYear}`,
        reportSection: "Derived",
        kind: "arithmetic",
        status: "Correct only if the reported figures are",
      });
    }
  }

  rows.push({
    id: "investment-share-of-responders",
    number: formatPercent(investmentShareOfRespondents()),
    meaning: "Investment and capital-markets firms as a share of responders",
    base: requireFigure("respondents-total").base,
    period: requireFigure("respondents-total").period,
    reportSection: "Derived from Chart 1",
    kind: "arithmetic",
    status: "Correct only if the reported counts are",
  });

  return rows;
}

export function countLedgerByKind(rows: readonly LedgerRow[]): Record<LedgerKind, number> {
  const counts: Record<LedgerKind, number> = { reported: 0, arithmetic: 0 };
  for (const row of rows) counts[row.kind] += 1;
  return counts;
}

/**
 * Percentages written into page copy that do not appear in the ledger. Run it in a unit test
 * with all copy strings, so a number cannot be typed into the prose without being sourced.
 */
export function findUnledgeredPercentages(texts: readonly string[], ledger: readonly LedgerRow[]): string[] {
  const known = new Set(ledger.map((row) => row.number));
  const missing = new Set<string>();
  for (const text of texts) {
    for (const match of text.matchAll(PERCENT_PATTERN)) {
      const token = `${match[1]}%`;
      if (!known.has(token)) missing.add(token);
    }
  }
  return Array.from(missing);
}

export function decodeHeadline(entry: HeadlineEntry): DecodedHeadline {
  return {
    ...entry,
    figures: entry.figureIds.map((id) => {
      const figure = requireFigure(id);
      return {
        id,
        valueText: formatFigureValue(figure),
        measure: figure.measure,
        base: figure.base,
        period: figure.period,
        reportSection: figure.reportSection,
      };
    }),
  };
}