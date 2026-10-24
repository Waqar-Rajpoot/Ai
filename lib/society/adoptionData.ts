import { PERCENT_DECIMALS_FACTOR } from "./tenPlacesConstants";

export interface AdoptionRow {
  id: string;
  label: string;
  /** Share of the group, in percent, at the first quarter. */
  fromPercent: number;
  /** Share of the group, in percent, at the latest quarter. */
  toPercent: number;
}

export const ADOPTION_GROUP = "US adults aged 18 to 64";
export const ADOPTION_FROM_QUARTER = "Q3 2024";
export const ADOPTION_TO_QUARTER = "Q2 2026";
export const ADOPTION_SOURCE_LABEL = "Fed-hosted adoption tracker";

/** Link to the tracker's own page. Fill in once the original has been opened and checked. */
export const ADOPTION_SOURCE_URL: string | null = null;

/** Date the figures were checked against the tracker's own page. Null until that check is done. */
export const ADOPTION_VERIFIED_ON: string | null = null;

/** Share of the group using generative AI (Blueprint 6.10). Shared by articles 31, 32 and 41. */
export const ADOPTION_ROWS: readonly AdoptionRow[] = [
  { id: "overall", label: "Any use of generative AI", fromPercent: 44.6, toPercent: 61.8 },
  { id: "work", label: "Use at work", fromPercent: 33.3, toPercent: 45.2 },
  { id: "outside-work", label: "Use outside work", fromPercent: 36.0, toPercent: 54.8 },
];

/** Change in percentage points, to one decimal place. */
export function percentagePointChange(row: AdoptionRow): number {
  return Math.round((row.toPercent - row.fromPercent) * PERCENT_DECIMALS_FACTOR) / PERCENT_DECIMALS_FACTOR;
}