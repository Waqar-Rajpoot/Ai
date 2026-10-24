import { PERCENT_SCALE } from "./prosConsConstants";

/** Date these figures were checked against each publisher's own page. Null until that check is done. */
export const ANCHOR_FIGURES_VERIFIED_ON: string | null = null;

export interface ElectricityFigures {
  publisher: string;
  published: string;
  scope: string;
  twh2025: number;
  twh2026: number;
  /** A forecast, not a measurement: expected to pass this level. */
  twh2030Forecast: number;
}

/** Gartner data-centre electricity figures (Blueprint 6.10). Covers all data centres, not only AI. */
export const DATA_CENTRE_ELECTRICITY: ElectricityFigures = {
  publisher: "Gartner",
  published: "June 2026",
  scope: "Worldwide data-centre electricity use, all workloads",
  twh2025: 447,
  twh2026: 565,
  twh2030Forecast: 1200,
};

export interface LayoffRow {
  id: string;
  label: string;
  /** Share of surveyed firms, in percent. */
  percent: number;
}

export interface JobsFindings {
  surveyorNet: { publisher: string; published: string; finding: string };
  ism: { publisher: string; published: string; statement: string; rows: readonly LayoffRow[] };
}

/** Jobs findings from named surveys (Blueprint 6.10). */
export const JOBS_FINDINGS: JobsFindings = {
  surveyorNet: {
    publisher: "S&P Global",
    published: "June 2026",
    finding: "Surveyed managers reported a modestly negative net effect of AI on employment.",
  },
  ism: {
    publisher: "ISM",
    published: "June 2026",
    statement: "Share of surveyed firms that say they plan layoffs after introducing AI.",
    rows: [
      { id: "manufacturers", label: "Manufacturers", percent: 5 },
      { id: "services", label: "Services firms", percent: 9 },
    ],
  },
};

/** Whole-number percent change from one value to another. */
export function percentChange(from: number, to: number): number {
  if (from === 0) return 0;
  return Math.round(((to - from) / from) * PERCENT_SCALE);
}

/** Width of a bar as a percent of the scale maximum, clamped to 0..100. */
export function barWidthPercent(value: number, scaleMax: number): number {
  if (scaleMax <= 0) return 0;
  return Math.min(PERCENT_SCALE, Math.max(0, Math.round((value / scaleMax) * PERCENT_SCALE)));
}

/** Terawatt-hours added between 2025 and 2026. */
export function electricityAddedTwh(figures: ElectricityFigures): number {
  return figures.twh2026 - figures.twh2025;
}