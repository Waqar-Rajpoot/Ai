import type { CorrectionFoundBy, CorrectionSeverity, CorrectionStatus } from "./correctionsPolicy";

/** One row of the public corrections log. Dates are written YYYY-MM-DD. */
export interface CorrectionEntry {
  /** Stable id, such as "2026-11-03-plan-table". Never reused. */
  id: string;
  reportedOn: string;
  /** Null while the entry is open, or when we declined to change the page. */
  fixedOn: string | null;
  pageTitle: string;
  pagePath: string;
  severity: CorrectionSeverity;
  status: CorrectionStatus;
  foundBy: CorrectionFoundBy;
  /** What the page said that was wrong, in one or two plain sentences. */
  whatWasWrong: string;
  /** What we changed, or why we declined. */
  whatChanged: string;
}


export const CORRECTIONS_LOG: readonly CorrectionEntry[] = [];