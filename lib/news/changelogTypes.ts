/** What kind of change an entry records. */
export type ChangeKind = "new-page" | "update" | "data-refresh" | "source-conflict" | "correction";

/** A conflict is resolved when we picked a number and can say why. Open means readers should check. */
export type ConflictStatus = "resolved" | "open";

/** How sure we are of the pick. */
export type Confidence = "confirmed" | "leaning" | "unsure";

/** One side of a disagreement between sources. */
export interface ConflictSide {
  source: string;
  says: string;
}

/** Two sources that disagree, and what the site shows instead. */
export interface SourceConflict {
  question: string;
  sideA: ConflictSide;
  sideB: ConflictSide;
  resolution: string;
  status: ConflictStatus;
  confidence: Confidence;
  checkedOnIso: string;
  nextStep: string;
}

/** A number or label that changed on a page. */
export interface NumberChange {
  label: string;
  from: string;
  to: string;
}

/** One dated line in the changelog. */
export interface ChangeEntry {
  id: string;
  dateIso: string;
  kind: ChangeKind;
  title: string;
  summary: string;
  whyItMatters: string;
  pageHref?: string;
  pageLabel?: string;
  numberChanges?: NumberChange[];
  conflict?: SourceConflict;
}