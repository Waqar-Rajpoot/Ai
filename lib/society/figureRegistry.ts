import { ONE_DECIMAL_FACTOR } from "./adoptionExplainedConstants";
import { PERCENT_SCALE } from "./societyConstants";

export type FigureUnit =
  | "percent" | "count" | "twh" | "gw" | "mw" | "wh" | "mt" | "ej" | "km"
  | "times" | "years" | "year" | "points" | "usdBillion" | "usdTrillion" | "billionPerDay";

/** One sourced number. Pages read figures from a list of these, so a number is typed once. */
export interface RegistryFigure {
  id: string;
  value: number;
  /** Upper end when the source gives a range, such as 20 to 30%. */
  valueTo?: number;
  unit: FigureUnit;
  measure: string;
  /** What the number is a share of, or what it covers. */
  base: string;
  period: string;
  reportSection: string;
  sourceId: string;
  /** A known wrinkle in the original, such as a rounded or bounded figure. */
  note?: string;
}

/** A common headline claim, decoded into what it measures and what it does not. */
export interface HeadlineEntry {
  id: string;
  headline: string;
  figureIds: readonly string[];
  measures: string;
  notClaim: string;
  technical: string;
}

interface UnitFormat {
  prefix: string;
  suffix: string;
}

const UNIT_FORMATS: Record<FigureUnit, UnitFormat> = {
  percent: { prefix: "", suffix: "%" },
  count: { prefix: "", suffix: "" },
  twh: { prefix: "", suffix: " TWh" },
  gw: { prefix: "", suffix: " GW" },
  mw: { prefix: "", suffix: " MW" },
  wh: { prefix: "", suffix: " Wh" },
  mt: { prefix: "", suffix: " million tonnes" },
  ej: { prefix: "", suffix: " EJ" },
  km: { prefix: "", suffix: " km" },
  times: { prefix: "", suffix: "×" },
  years: { prefix: "", suffix: " years" },
  year: { prefix: "", suffix: "" },
  points: { prefix: "", suffix: " percentage points" },
  usdBillion: { prefix: "USD ", suffix: " billion" },
  usdTrillion: { prefix: "USD ", suffix: " trillion" },
  billionPerDay: { prefix: "", suffix: " billion a day" },
};

const NUMBER_FORMATTER = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });
const TOKEN_UNITS: readonly FigureUnit[] = ["percent", "twh", "gw", "mw", "wh"];
const NUMBER_TOKEN_PATTERN = /(\d[\d,]*(?:\.\d+)?)\s?(%|TWh|GW|MW|Wh)/g;
const RANGE_SEPARATOR = "–";

export function formatNumber(value: number): string {
  return NUMBER_FORMATTER.format(value);
}

export function roundOneDecimal(value: number): number {
  return Math.round(value * ONE_DECIMAL_FACTOR) / ONE_DECIMAL_FACTOR;
}

export function formatValue(value: number, unit: FigureUnit, valueTo?: number): string {
  const { prefix, suffix } = UNIT_FORMATS[unit];
  const render = (amount: number) => (unit === "year" ? String(amount) : formatNumber(amount));
  const body = valueTo === undefined ? render(value) : `${render(value)}${RANGE_SEPARATOR}${render(valueTo)}`;
  return `${prefix}${body}${suffix}`;
}

export function formatFigure(figure: Pick<RegistryFigure, "value" | "valueTo" | "unit">): string {
  return formatValue(figure.value, figure.unit, figure.valueTo);
}

/** A signed change in the figure's own unit, such as "+70 TWh". */
export function formatChange(change: number, unit: FigureUnit): string {
  const { prefix, suffix } = UNIT_FORMATS[unit];
  return `${change > 0 ? "+" : change < 0 ? "-" : ""}${prefix}${formatNumber(Math.abs(change))}${suffix}`;
}

/** Bar width as a percentage of the largest value, kept inside 0 to 100. */
export function barWidthPercent(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(Math.max((value / max) * PERCENT_SCALE, 0), PERCENT_SCALE);
}

/** Indexes figures by id. Throws on a duplicate, so a repeated id fails the build. */
export function buildFigureIndex<T extends { id: string }>(figures: readonly T[], label: string): ReadonlyMap<string, T> {
  const index = new Map<string, T>();
  for (const figure of figures) {
    if (index.has(figure.id)) throw new Error(`Duplicate ${label} figure id: ${figure.id}`);
    index.set(figure.id, figure);
  }
  return index;
}

/** Looks up a figure by id. Throws on a typo, so a bad id fails the build rather than showing a blank. */
export function lookupFigure<T>(index: ReadonlyMap<string, T>, id: string, label: string): T {
  const figure = index.get(id);
  if (!figure) throw new Error(`Unknown ${label} figure id: ${id}`);
  return figure;
}

/** The "485TWh" style tokens a figure can appear as in prose, including both ends of a range. */
export function numberTokens(figure: Pick<RegistryFigure, "value" | "valueTo" | "unit">): string[] {
  if (!TOKEN_UNITS.includes(figure.unit)) return [];
  const suffix = UNIT_FORMATS[figure.unit].suffix.trim();
  const endpoints = figure.valueTo === undefined ? [figure.value] : [figure.value, figure.valueTo];
  return endpoints.map((amount) => `${formatNumber(amount)}${suffix}`);
}

/** Numbers with a unit in page copy that are not in the known set. Run it in a unit test over all copy. */
export function findUnledgeredNumbers(texts: readonly string[], knownTokens: ReadonlySet<string>): string[] {
  const missing = new Set<string>();
  for (const text of texts) {
    for (const match of text.matchAll(NUMBER_TOKEN_PATTERN)) {
      const token = `${match[1]}${match[2]}`;
      if (!knownTokens.has(token)) missing.add(token);
    }
  }
  return Array.from(missing);
}