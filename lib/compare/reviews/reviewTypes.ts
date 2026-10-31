import type { ModelDirectoryRow } from "@/lib/compare/modelDirectory";

export type PriceTier = "budget" | "mid-priced" | "premium";
export type SourceLabel = "tested" | "independent" | "vendor-reported";

export type ScorecardPointId =
  | "accuracy"
  | "reasoning-maths"
  | "writing-instructions"
  | "coding-tools"
  | "long-documents"
  | "cost-per-task"
  | "privacy-limits";

export interface ScorecardPointDefinition {
  id: ScorecardPointId;
  title: string;
  fixedTest: string;
}

/** An illustrative per-task workload used to turn list prices into costs. */
export interface CostScenario {
  id: string;
  label: string;
  description: string;
  inputTokens: number;
  outputTokens: number;
}

export interface CostEstimate {
  scenario: CostScenario;
  costPerTask: number;
  costPerThousandTasks: number;
}

/** An illustrative monthly usage level. */
export interface MonthlyPlan {
  id: string;
  label: string;
  description: string;
  inputTokens: number;
  outputTokens: number;
}

export interface MonthlyCostEstimate {
  plan: MonthlyPlan;
  monthlyCost: number;
}

export interface ReviewNote {
  text: string;
  sourceUrl?: string;
}

export interface TestPointResult {
  /** Score out of SCORECARD_MAX_SCORE. */
  score: number;
  summary: string;
}

/** Our own test run. Dates use ISO format (YYYY-MM-DD). */
export interface ReviewTestRun {
  testedOn: string;
  modelVersion: string;
  effortSetting: string;
  results: Partial<Record<ScorecardPointId, TestPointResult>>;
}

/** One dated, sourced benchmark result. */
export interface EvidenceHighlight {
  label: string;
  value: string;
  context: string;
  source: SourceLabel;
  sourceName: string;
  sourceUrl: string;
  /** Free text: "2026-10-29" or "September 2026". */
  asOf: string;
}

export interface CategoryScore {
  category: string;
  score: number;
  rankLabel: string;
}

export interface ModelEvidence {
  highlights: readonly EvidenceHighlight[];
  categories?: readonly CategoryScore[];
}

export interface PricingExtras {
  cachedInputPerMillion?: number;
  batchDiscountPercent?: number;
  maxOutputLabel?: string;
  sourceUrl: string;
  asOf: string;
}

/** Hand-written content for one model, grounded in the evidence data. */
export interface ReviewEditorial {
  whatItDoes: string;
  bestFor: readonly string[];
  caveats: readonly string[];
  /** Shown as the verdict until a tested verdict exists. */
  interimVerdict: string;
  availability?: readonly ReviewNote[];
  pricingExtras?: PricingExtras;
  consumerPlanNote?: string;
  safetyNotes?: readonly ReviewNote[];
  limitsNotes?: readonly ReviewNote[];
  testRun?: ReviewTestRun;
  verdict?: string;
  supersededById?: string;
  hasAffiliateLinks?: boolean;
}

/** One model's row in the BenchLM overall table. */
export interface BenchLmSnapshotEntry {
  benchLmName: string;
  rank: number;
  score: number;
  evidence: "supported" | "estimated";
  sourceFamilies: number;
  licence: "proprietary" | "open-weight";
  listedOutputPricePerMillion: number | null;
  profilePath: string;
  companion?: { label: string; rank: number; score: number };
}

/** A highly ranked model that is not in our directory yet. */
export interface NotInDirectoryModel {
  name: string;
  maker: string;
  rank: number;
  score: number;
  outputPricePerMillion: number;
  note: string;
  profilePath: string;
}

export interface RankingFacts {
  entry: BenchLmSnapshotEntry | null;
  liveScore: number | null;
  directoryScore: number | null;
  scoreChange: number | null;
  liveRank: number | null;
  rankedModelCount: number;
  directoryRank: number | null;
  directoryScoredCount: number;
  gapToLeader: number | null;
  percentOfLeader: number | null;
  percentOfDirectoryBest: number | null;
  priceMismatch: string | null;
}

export interface ValueMetrics {
  blendedPrice: number;
  /** 1 = cheapest in the directory. */
  priceRank: number;
  costlierModelCount: number;
  topScorerName: string;
  costVsTopScorer: number;
  scorePerBlendedDollar: number | null;
  blendedPricePerScorePoint: number | null;
}

export interface PricePosition {
  status: "efficient" | "beaten" | "unscored";
  beatenBy: readonly string[];
}

export interface AlternativeSuggestion {
  row: ModelDirectoryRow;
  reason: string;
}

export interface ReviewAlternative extends AlternativeSuggestion {
  href: string;
}

export interface HeadToHeadEntry {
  rival: ModelDirectoryRow;
  href: string;
  scoreDelta: number | null;
  priceRatio: number;
  rivalCodingTaskCost: number;
}

export interface ReviewPageModel {
  row: ModelDirectoryRow;
  href: string;
  tier: PriceTier;
  isOpenWeight: boolean;
  ranking: RankingFacts;
  value: ValueMetrics;
  position: PricePosition;
  outrankedBy: readonly NotInDirectoryModel[];
  snapshotTakeaway: string;
  skipReasons: readonly string[];
  costEstimates: readonly CostEstimate[];
  monthlyCosts: readonly MonthlyCostEstimate[];
  alternatives: readonly ReviewAlternative[];
  headToHead: readonly HeadToHeadEntry[];
  evidence: ModelEvidence | null;
  editorial: ReviewEditorial;
  hasTestRun: boolean;
  successor: { name: string; href: string } | null;
}