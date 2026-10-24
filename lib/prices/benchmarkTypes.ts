import type { VerifiableRecord } from "./verification";

/** BenchLM's label for how much independent evidence sits behind a score. */
export type EvidenceLabel = "supported" | "estimated";
export type ScoreDirection = "higher" | "lower";
/** Whether we opened the maker's own page, or read the maker's table through a third-party report. */
export type ReadThrough = "vendor-page" | "third-party";

export interface IndependentSource {
  id: string;
  name: string;
  publisher: string;
  /** Heading of the score column, for example "Rating". */
  scoreLabel: string;
  scale: string;
  method: string;
  /** What the "±" means for this source, or null if it publishes no margin. */
  marginNote: string | null;
  /** Version of the benchmark, when scores from different versions do not compare. */
  versionNote: string | null;
  officialUrl: string;
  caveats: readonly string[];
}

export interface IndependentScore extends VerifiableRecord {
  id: string;
  sourceId: string;
  modelName: string;
  maker: string;
  /** Effort or reasoning setting the score was measured at, or null if not stated. */
  setting: string | null;
  /** Null when the model has no score in this source (for example "not in the top 25"). */
  score: number | null;
  /** Half-width of the published margin or interval, or null if not published. */
  margin: number | null;
  evidence: EvidenceLabel | null;
  /** ISO date of the snapshot this number comes from. */
  asOf: string;
  note: string;
}

export interface VendorRow {
  id: string;
  benchmark: string;
  measures: string;
  direction: ScoreDirection;
  /** One entry per table column, shown as published. Null means the maker did not state a value. */
  values: readonly (string | null)[];
  note: string | null;
}

export interface VendorTable extends VerifiableRecord {
  id: string;
  title: string;
  vendor: string;
  announcement: string;
  columns: readonly string[];
  rows: readonly VendorRow[];
  caveat: string;
  readThrough: ReadThrough;
  sourceUrl: string;
  /** ISO date we read the table. */
  retrievedOn: string;
}

export interface ScoreFilters {
  /** Maker name, or "all". */
  maker: string;
  /** Free text matched against the model name. */
  query: string;
}

export type ScoreSortKey = "score" | "name";

export interface ScoreGapInput {
  scoreA: number;
  /** Null means no margin was published. */
  marginA: number | null;
  scoreB: number;
  marginB: number | null;
}

export type ScoreGapProblem = "not-a-number" | "negative-margin";
export type ScoreGapVerdict = "separated" | "overlap" | "unknown-margin";

export type ScoreGapResult =
  | { ok: true; gap: number; leader: "a" | "b" | "none"; verdict: ScoreGapVerdict; combinedMargin: number | null }
  | { ok: false; reason: ScoreGapProblem };

export type CoverageStatus = "scored" | "not-ranked" | "not-captured";

export interface CoverageRow {
  modelName: string;
  cells: { sourceId: string; status: CoverageStatus }[];
}