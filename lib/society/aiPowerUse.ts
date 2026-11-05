import {
  AI_POWER_VERIFIED_ON,
  BILLION,
  DAYS_PER_YEAR,
  FULL_SHARE,
  HEAVY_TASK_MULTIPLIER,
  SHARE_FLOOR_PERCENT,
  TWH_ONE_DECIMAL_LIMIT,
  WH_PER_TWH,
} from "./aiPowerUseConstants";
import {
  CALCULATOR_PRESETS,
  CALCULATOR_VOLUMES,
  POWER_FIGURES,
  POWER_SOURCES,
  SERIES_DEFINITIONS,
  type PowerFigure,
  type SeriesDefinition,
} from "./aiPowerUseData";
import {
  buildFigureIndex,
  findUnledgeredNumbers,
  formatChange,
  formatFigure,
  formatNumber,
  formatValue,
  lookupFigure,
  numberTokens,
  roundOneDecimal,
  type FigureUnit,
  type HeadlineEntry,
} from "./figureRegistry";
import { PERCENT_SCALE } from "./societyConstants";

export type LedgerKind = "reported" | "arithmetic";

export interface LedgerRow {
  id: string;
  number: string;
  meaning: string;
  base: string;
  period: string;
  reportSection: string;
  source: string;
  kind: LedgerKind;
  status: string;
}

export interface SeriesPoint {
  label: string;
  figure: PowerFigure;
  isReference: boolean;
}

export interface SeriesStep {
  fromLabel: string;
  toLabel: string;
  /** Change between two reported figures, in the figure's own unit. Our arithmetic. */
  change: number;
  unit: FigureUnit;
}

export interface ResolvedSeries {
  id: string;
  label: string;
  caution?: string;
  points: SeriesPoint[];
  steps: SeriesStep[];
  max: number;
}

interface DerivedFigure {
  id: string;
  valueText: string;
  meaning: string;
  base: string;
  period: string;
  tokens: string[];
}

export interface EnergyEstimateInput {
  queriesPerDayBillions: number;
  whPerTextQuery: number;
  /** Share of queries treated as heavy, from 0 to 1. */
  heavyShare: number;
}

export interface EnergyEstimate {
  blendedWhPerQuery: number;
  annualTwh: number;
  shareOfDataCentresPercent: number;
}

export interface CalculatorOptions {
  presets: { id: string; label: string; whPerQuery: number }[];
  volumes: { id: string; label: string; queriesPerDayBillions: number }[];
  dataCentreTwh: number;
}

export interface DecodedFigure {
  id: string;
  valueText: string;
  measure: string;
  base: string;
  period: string;
  reportSection: string;
  source: string;
}

export interface DecodedHeadline extends HeadlineEntry {
  figures: DecodedFigure[];
}

export const LEDGER_KIND_LABELS: Record<LedgerKind, string> = {
  reported: "Reported in the source",
  arithmetic: "Our arithmetic",
};

const FIGURE_INDEX = buildFigureIndex(POWER_FIGURES, "power");

export function requireFigure(id: string): PowerFigure {
  return lookupFigure(FIGURE_INDEX, id, "power");
}

export function figureText(id: string): string {
  return formatFigure(requireFigure(id));
}

export function resolveSeries(definition: SeriesDefinition): ResolvedSeries {
  const points = definition.points.map((point) => ({
    label: point.label,
    figure: requireFigure(point.figureId),
    isReference: point.isReference ?? false,
  }));
  const dated = points.filter((point) => !point.isReference);
  const steps = definition.showSteps
    ? dated.slice(1).map((point, index) => ({
        fromLabel: dated[index].label,
        toLabel: point.label,
        change: roundOneDecimal(point.figure.value - dated[index].figure.value),
        unit: point.figure.unit,
      }))
    : [];
  return {
    id: definition.id,
    label: definition.label,
    caution: definition.caution,
    points,
    steps,
    max: Math.max(...points.map((point) => point.figure.valueTo ?? point.figure.value)),
  };
}

const SERIES: readonly ResolvedSeries[] = SERIES_DEFINITIONS.map(resolveSeries);

export function requireSeries(id: string): ResolvedSeries {
  const series = SERIES.find((candidate) => candidate.id === id);
  if (!series) throw new Error(`Unknown series id: ${id}`);
  return series;
}

function buildDerivedFigures(): DerivedFigure[] {
  const aiTwh = requireFigure("ai-2030").value;
  const totalTwh = requireFigure("dc-2030").value;
  const aiShare = Math.round((aiTwh / totalTwh) * PERCENT_SCALE);
  const queue = requireFigure("ercot-2026").value;
  const peak = requireFigure("ercot-peak").value;
  const rest = totalTwh - aiTwh;
  return [
    { id: "ai-share-2030", valueText: formatValue(aiShare, "percent"), meaning: "AI-focused data centres' share of projected 2030 data centre electricity use", base: "Projected data centre electricity use, 2030", period: "2030", tokens: numberTokens({ value: aiShare, unit: "percent" }) },
    { id: "other-2030", valueText: formatValue(rest, "twh"), meaning: "Projected 2030 electricity use of data centres other than AI-focused ones", base: "Projected data centre electricity use, 2030", period: "2030", tokens: numberTokens({ value: rest, unit: "twh" }) },
    { id: "queue-vs-peak", valueText: formatValue(roundOneDecimal(queue / peak), "times"), meaning: "Texas large-load queue as a multiple of the grid's all-time peak demand (at least, since the queue is over 230 GW)", base: "ERCOT, January 2026", period: "January 2026", tokens: [] },
  ];
}

function sourceStatus(figure: PowerFigure): string {
  const source = POWER_SOURCES[figure.sourceId];
  const base =
    source.readAs === "text"
      ? `Checked against the original text on ${AI_POWER_VERIFIED_ON}`
      : `Read from an extract of the IEA page on ${AI_POWER_VERIFIED_ON}, not the full text`;
  return figure.note ? `${base}. ${figure.note}` : base;
}

/** Every number on the page with its base, period, report section, source and check status. */
export function buildPowerLedger(): LedgerRow[] {
  const rows: LedgerRow[] = POWER_FIGURES.map((figure) => ({
    id: figure.id,
    number: formatFigure(figure),
    meaning: figure.measure,
    base: figure.base,
    period: figure.period,
    reportSection: figure.reportSection,
    source: POWER_SOURCES[figure.sourceId].label,
    kind: "reported",
    status: sourceStatus(figure),
  }));

  for (const series of SERIES) {
    for (const step of series.steps) {
      rows.push({
        id: `${series.id}-${step.fromLabel}-${step.toLabel}`,
        number: formatChange(step.change, step.unit),
        meaning: `Change in: ${series.label.toLowerCase()}`,
        base: "Our subtraction of two reported figures",
        period: `${step.fromLabel} to ${step.toLabel}`,
        reportSection: "Derived",
        source: "Our arithmetic",
        kind: "arithmetic",
        status: "Correct only if the reported figures are",
      });
    }
  }

  for (const derived of buildDerivedFigures()) {
    rows.push({
      id: derived.id,
      number: derived.valueText,
      meaning: derived.meaning,
      base: derived.base,
      period: derived.period,
      reportSection: "Derived",
      source: "Our arithmetic",
      kind: "arithmetic",
      status: "Correct only if the reported figures are",
    });
  }
  return rows;
}

export function countLedgerByKind(rows: readonly LedgerRow[]): Record<LedgerKind, number> {
  const counts: Record<LedgerKind, number> = { reported: 0, arithmetic: 0 };
  for (const row of rows) counts[row.kind] += 1;
  return counts;
}

/** Numbers with a unit in page copy that are not in the ledger. Run in a unit test over ALL_COPY_TEXTS. */
export function findUnledgeredCopyNumbers(texts: readonly string[]): string[] {
  const known = new Set<string>();
  for (const figure of POWER_FIGURES) for (const token of numberTokens(figure)) known.add(token);
  for (const derived of buildDerivedFigures()) for (const token of derived.tokens) known.add(token);
  return findUnledgeredNumbers(texts, known);
}

export function resolveCalculatorOptions(): CalculatorOptions {
  return {
    presets: CALCULATOR_PRESETS.map((preset) => ({ id: preset.id, label: `${preset.label} (${figureText(preset.figureId)})`, whPerQuery: requireFigure(preset.figureId).value })),
    volumes: CALCULATOR_VOLUMES.map((volume) => ({
      id: volume.id,
      label: `${volume.label} (${formatValue(requireFigure(volume.figureId).value * volume.multiplier, "billionPerDay")})`,
      queriesPerDayBillions: requireFigure(volume.figureId).value * volume.multiplier,
    })),
    dataCentreTwh: requireFigure("dc-2025").value,
  };
}

/**
 * Annual electricity if a given number of queries a day each use a given energy.
 * A share of queries is treated as heavy, at HEAVY_TASK_MULTIPLIER times a text query. Illustration only.
 */
export function estimateAnnualTwh(input: EnergyEstimateInput, dataCentreTwh: number): EnergyEstimate {
  const heavyShare = Math.min(Math.max(input.heavyShare, 0), FULL_SHARE);
  const blendedWhPerQuery = input.whPerTextQuery * (FULL_SHARE - heavyShare + heavyShare * HEAVY_TASK_MULTIPLIER);
  const annualTwh = (input.queriesPerDayBillions * BILLION * blendedWhPerQuery * DAYS_PER_YEAR) / WH_PER_TWH;
  return { blendedWhPerQuery, annualTwh, shareOfDataCentresPercent: (annualTwh / dataCentreTwh) * PERCENT_SCALE };
}

export function describeEstimate(estimate: EnergyEstimate, dataCentreTwh: number): { twhText: string; shareText: string; exceedsTotal: boolean } {
  const rounded = estimate.annualTwh < TWH_ONE_DECIMAL_LIMIT ? roundOneDecimal(estimate.annualTwh) : Math.round(estimate.annualTwh);
  const exceedsTotal = estimate.annualTwh > dataCentreTwh;
  let shareText: string;
  if (exceedsTotal) shareText = `more than all data centres used in 2025 (${formatValue(dataCentreTwh, "twh")})`;
  else if (estimate.shareOfDataCentresPercent < SHARE_FLOOR_PERCENT) shareText = `under ${SHARE_FLOOR_PERCENT}% of what data centres used in 2025`;
  else shareText = `${formatNumber(roundOneDecimal(estimate.shareOfDataCentresPercent))}% of what data centres used in 2025`;
  return { twhText: formatValue(rounded, "twh"), shareText, exceedsTotal };
}

export function decodeHeadline(entry: HeadlineEntry): DecodedHeadline {
  return {
    ...entry,
    figures: entry.figureIds.map((id) => {
      const figure = requireFigure(id);
      return {
        id,
        valueText: formatFigure(figure),
        measure: figure.measure,
        base: figure.base,
        period: figure.period,
        reportSection: figure.reportSection,
        source: POWER_SOURCES[figure.sourceId].label,
      };
    }),
  };
}