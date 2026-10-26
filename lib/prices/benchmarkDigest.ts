import type { VerificationLevel } from "./apiCostTable";

export type IndependentSourceId = "aa-index" | "arena-text" | "arena-webdev" | "vals-index" | "benchlm";

export interface IndependentSource {
  id: IndependentSourceId;
  name: string;
  operator: string;
  method: string;
  scaleLabel: string;
  /** Top of a fixed scale (for example 100), or null for open-ended ratings. */
  scaleMax: number | null;
  /** ISO date of the snapshot. */
  asOf: string;
  sourceUrl: string;
  caveat: string;
}

export interface IndependentScore {
  sourceId: IndependentSourceId;
  /** Directory name where the model is in our directory. */
  model: string;
  /** Null when the source lists the model without a number (for example "not in top 25"). */
  score: number | null;
  display: string;
  /** Published margin (plus or minus), when the source gives one. */
  margin: number | null;
  votes: number | null;
  /** ISO date this particular score was read. */
  asOf: string;
  note: string;
  verification: VerificationLevel;
}

/** A number from the maker's own announcement. Never mixed with independent scores. */
export interface VendorScore {
  id: string;
  benchmark: string;
  model: string;
  display: string;
  reportedBy: string;
  setup: string;
  announcedOn: string;
}

/** One benchmark where we have both a vendor number and an independent run. */
export interface SameTestRow {
  id: string;
  benchmark: string;
  model: string;
  vendorValue: number;
  vendorDisplay: string;
  vendorBy: string;
  independentValue: number;
  independentDisplay: string;
  independentBy: string;
  note: string;
}

export interface LeaderSummary {
  leader: IndependentScore;
  runnerUp: IndependentScore | null;
  gap: number | null;
  /** True when the two are within their published margins, null when margins are unknown. */
  withinMargin: boolean | null;
}

/** The 14 models in the Compare directory (Blueprint 6.7). Names match the directory. */
export const DIRECTORY_MODELS: readonly string[] = [
  "Claude Opus 5.5",
  "GPT-6.1 Sol",
  "GPT-6 Astra",
  "Claude Fable 5.1",
  "Claude Sonnet 5.5",
  "Gemini 4 Argon",
  "Gemini 3.8 Flash",
  "Claude Haiku 5.5",
  "GPT-6 Luna",
  "Grok 4.7",
  "MiMo-V2.6-Pro",
  "Kimi K3",
  "Qwen3.8 Max / 27B",
  "DeepSeek V4.1 Flash",
];

export const INDEPENDENT_SOURCES: readonly IndependentSource[] = [
  {
    id: "aa-index",
    name: "Artificial Analysis Intelligence Index",
    operator: "Artificial Analysis",
    method: "A composite of standardized capability tests that Artificial Analysis runs itself, at each model's highest listed effort setting.",
    scaleLabel: "Index points, 0 to 100",
    scaleMax: 100,
    asOf: "2026-10-21",
    sourceUrl: "https://emergent.sh/learn/gemini-4-argon-benchmarks",
    caveat: "Index versions differ between rows (v4.3 and v4.3.2). Read through trackers, not the operator's own page.",
  },
  {
    id: "arena-text",
    name: "Arena text leaderboard",
    operator: "Arena (formerly LMArena)",
    method: "Anonymous side-by-side votes from the public, converted into an Elo-style rating. It measures human preference, not correctness.",
    scaleLabel: "Rating points (open-ended)",
    scaleMax: null,
    asOf: "2026-10-19",
    sourceUrl: "https://arena.ai/leaderboard",
    caveat: "New models have few votes. A lead of 15 to 20 points on about 5,000 votes can disappear as votes arrive.",
  },
  {
    id: "arena-webdev",
    name: "Code Arena: WebDev",
    operator: "Arena (formerly LMArena)",
    method: "Public votes on which model builds the better web page or app from the same request, converted into a rating.",
    scaleLabel: "Rating points (open-ended)",
    scaleMax: null,
    asOf: "2026-10-23",
    sourceUrl: "https://arena.ai/leaderboard",
    caveat: "Some entries were marked preliminary. Scores are for a specific effort setting, such as Max or High.",
  },
  {
    id: "vals-index",
    name: "Vals Index",
    operator: "Vals AI",
    method: "An index across professional-task tests such as finance, legal and tax work, run by Vals, with standard errors published for most models.",
    scaleLabel: "Percent, 0 to 100",
    scaleMax: 100,
    asOf: "2026-10-23",
    sourceUrl: "https://www.vals.ai/comparisons/anthropic_claude-opus-5-5-vs-openai_gpt-6-sol",
    caveat: "The comparison page shows GPT-6 Sol, not GPT-6.1 Sol. Different benchmark versions can appear for different models.",
  },
  {
    id: "benchlm",
    name: "BenchLM composite",
    operator: "BenchLM",
    method: "A composite across many benchmarks. Some scores are estimates with wide intervals, and BenchLM labels them as such.",
    scaleLabel: "Composite points, 0 to 100",
    scaleMax: 100,
    asOf: "2026-10-17",
    sourceUrl: "https://benchlm.ai/llm-leaderboard-history",
    caveat: "Launch snapshot from the Blueprint (6.7). BenchLM's own comparison pages show different estimates for some models, so re-check before publishing.",
  },
];

export const INDEPENDENT_SCORES: readonly IndependentScore[] = [
  // Artificial Analysis Intelligence Index
  { sourceId: "aa-index", model: "Claude Opus 5.5", score: 58, display: "58", margin: null, votes: null, asOf: "2026-10-21", note: "Top of the index.", verification: "secondary" },
  { sourceId: "aa-index", model: "Claude Sonnet 5.5", score: 56, display: "56", margin: null, votes: null, asOf: "2026-09-29", note: "Index v4.3.", verification: "secondary" },
  { sourceId: "aa-index", model: "GPT-6 Astra", score: 53, display: "53", margin: null, votes: null, asOf: "2026-10-21", note: "", verification: "secondary" },
  { sourceId: "aa-index", model: "Claude Fable 5.1", score: 53, display: "53", margin: null, votes: null, asOf: "2026-10-21", note: "", verification: "secondary" },
  { sourceId: "aa-index", model: "Gemini 4 Argon", score: 53, display: "53", margin: null, votes: null, asOf: "2026-10-21", note: "Ranked 8th of 223 models on index v4.3.2.", verification: "secondary" },
  { sourceId: "aa-index", model: "GPT-6.1 Sol", score: 52, display: "52", margin: null, votes: null, asOf: "2026-10-21", note: "", verification: "secondary" },
  { sourceId: "aa-index", model: "Gemini 3.8 Flash", score: 40.9, display: "40.9", margin: null, votes: null, asOf: "2026-09-29", note: "Index v4.3, an older run.", verification: "secondary" },
  { sourceId: "aa-index", model: "GPT-6 Luna", score: 37.3, display: "37.3", margin: null, votes: null, asOf: "2026-09-29", note: "Index v4.3, an older run.", verification: "secondary" },

  // Arena text
  { sourceId: "arena-text", model: "Gemini 4 Argon", score: 1532, display: "1,532", margin: null, votes: 4904, asOf: "2026-10-19", note: "Was 1,525 with a margin of ±9 on launch day.", verification: "secondary" },
  { sourceId: "arena-text", model: "Claude Opus 5.5", score: 1516, display: "1,516", margin: null, votes: 8300, asOf: "2026-10-19", note: "Was 1,509 ±12 on 2,307 votes in late September.", verification: "secondary" },
  { sourceId: "arena-text", model: "Gemini 3.8 Flash", score: 1492, display: "1,492", margin: null, votes: null, asOf: "2026-09-25", note: "Older snapshot. Not comparable with rows dated Oct 19.", verification: "secondary" },
  { sourceId: "arena-text", model: "GPT-6 Astra", score: 1478, display: "1,478", margin: null, votes: null, asOf: "2026-09-25", note: "Older snapshot. Not comparable with rows dated Oct 19.", verification: "secondary" },

  // Arena Code Arena: WebDev
  { sourceId: "arena-webdev", model: "Claude Opus 5.5", score: 1807, display: "1,807", margin: 13, votes: null, asOf: "2026-10-23", note: "Max effort. Ranked 1st.", verification: "secondary" },
  { sourceId: "arena-webdev", model: "GPT-6.1 Sol", score: 1749, display: "1,749", margin: 12, votes: null, asOf: "2026-10-23", note: "Max effort. Ranked 4th.", verification: "secondary" },
  { sourceId: "arena-webdev", model: "Gemini 4 Argon", score: 1679, display: "1,679", margin: null, votes: null, asOf: "2026-09-30", note: "High effort. Launch-day score, ranked 8th at the time.", verification: "secondary" },

  // Vals Index
  { sourceId: "vals-index", model: "Gemini 4 Argon", score: 68.9, display: "68.9%", margin: null, votes: null, asOf: "2026-10-21", note: "First on the index. Standard error not read.", verification: "secondary" },
  { sourceId: "vals-index", model: "Claude Opus 5.5", score: 66.97, display: "66.97%", margin: 0.89, votes: null, asOf: "2026-10-23", note: "Read on Vals's comparison page.", verification: "provider" },
  { sourceId: "vals-index", model: "GPT-6 Sol", score: 57.54, display: "57.54%", margin: 1.01, votes: null, asOf: "2026-10-23", note: "GPT-6 Sol, not GPT-6.1 Sol, so it is not in our directory.", verification: "provider" },

  // BenchLM composite (Blueprint 6.7)
  { sourceId: "benchlm", model: "Claude Opus 5.5", score: 86.6, display: "86.6", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "GPT-6.1 Sol", score: 84.1, display: "84.1", margin: null, votes: null, asOf: "2026-10-17", note: "BenchLM's comparison pages show a much lower estimate. Re-check.", verification: "secondary" },
  { sourceId: "benchlm", model: "GPT-6 Astra", score: 83.9, display: "83.9", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "Claude Fable 5.1", score: 83.2, display: "83.2", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "Claude Sonnet 5.5", score: 82.2, display: "82.2", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "Gemini 4 Argon", score: 81.0, display: "81.0", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "MiMo-V2.6-Pro", score: 73.6, display: "73.6 (est.)", margin: null, votes: null, asOf: "2026-10-17", note: "BenchLM marks this as an estimate.", verification: "secondary" },
  { sourceId: "benchlm", model: "Claude Haiku 5.5", score: 70.0, display: "70.0", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "Kimi K3", score: 69.9, display: "69.9", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "Qwen3.8 Max / 27B", score: 69.7, display: "69.7", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "Gemini 3.8 Flash", score: 69.3, display: "69.3", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "GPT-6 Luna", score: null, display: "Not in top 25", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "Grok 4.7", score: null, display: "Not in top 25", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
  { sourceId: "benchlm", model: "DeepSeek V4.1 Flash", score: null, display: "Not in top 25", margin: null, votes: null, asOf: "2026-10-17", note: "", verification: "secondary" },
];

/** Vendor-reported numbers: the maker's own tables. Shown only in the vendor section. */
export const VENDOR_SCORES: readonly VendorScore[] = [
  { id: "tb4-opus", benchmark: "Terminal-Bench 4.0", model: "Claude Opus 5.5", display: "66.4%", reportedBy: "Anthropic", setup: "xhigh effort; standard error about ±2.6", announcedOn: "2026-09-22" },
  { id: "tb4-astra", benchmark: "Terminal-Bench 4.0", model: "GPT-6 Astra", display: "57.9%", reportedBy: "OpenAI (shown in Anthropic's table)", setup: "High effort", announcedOn: "2026-09-22" },
  { id: "tb4-fable", benchmark: "Terminal-Bench 4.0", model: "Claude Fable 5.1", display: "55.8%", reportedBy: "Anthropic", setup: "Anthropic's table", announcedOn: "2026-09-22" },
  { id: "tb4-argon", benchmark: "Terminal-Bench 4.0", model: "Gemini 4 Argon", display: "57.4%", reportedBy: "Google", setup: "Google's comparison table", announcedOn: "2026-09-30" },
  { id: "tbs-astra", benchmark: "Terminal-Bench-Science 0.1", model: "GPT-6 Astra", display: "64.6%", reportedBy: "OpenAI (shown in Anthropic's table)", setup: "Max effort. Early benchmark version", announcedOn: "2026-09-22" },
  { id: "tbs-opus", benchmark: "Terminal-Bench-Science 0.1", model: "Claude Opus 5.5", display: "58.7%", reportedBy: "Anthropic", setup: "Standard errors of ±3.5 to 5 points per model", announcedOn: "2026-09-22" },
  { id: "swepro-opus", benchmark: "SWE-bench Pro", model: "Claude Opus 5.5", display: "89.9%", reportedBy: "Anthropic", setup: "Adaptive thinking, max effort", announcedOn: "2026-09-22" },
  { id: "swepro-fable", benchmark: "SWE-bench Pro", model: "Claude Fable 5.1", display: "81.2%", reportedBy: "Anthropic", setup: "Anthropic's table", announcedOn: "2026-09-22" },
  { id: "gdpval-opus", benchmark: "GDPval-AA v2.1 (Elo)", model: "Claude Opus 5.5", display: "1,846", reportedBy: "Anthropic", setup: "Anthropic's table", announcedOn: "2026-09-22" },
  { id: "gdpval-astra", benchmark: "GDPval-AA v2.1 (Elo)", model: "GPT-6 Astra", display: "1,542", reportedBy: "Anthropic's table", setup: "Anthropic ran or compiled this figure", announcedOn: "2026-09-22" },
  { id: "fswe-astra", benchmark: "FrontierSWE v2", model: "GPT-6 Astra", display: "65.5%", reportedBy: "Google (its comparison table)", setup: "Google's table for Gemini 4", announcedOn: "2026-09-30" },
  { id: "fswe-argon", benchmark: "FrontierSWE v2", model: "Gemini 4 Argon", display: "55.0%", reportedBy: "Google", setup: "Google's comparison table", announcedOn: "2026-09-30" },
  { id: "deepswe-argon", benchmark: "DeepSWE", model: "Gemini 4 Argon", display: "77.9%", reportedBy: "Google", setup: "Google's comparison table", announcedOn: "2026-09-30" },
];

export const SAME_TEST_ROWS: readonly SameTestRow[] = [
  {
    id: "tb4-opus-gap",
    benchmark: "Terminal-Bench 4.0",
    model: "Claude Opus 5.5",
    vendorValue: 66.4,
    vendorDisplay: "66.4%",
    vendorBy: "Anthropic (xhigh effort)",
    independentValue: 59.6,
    independentDisplay: "59.6%",
    independentBy: "Artificial Analysis harness",
    note: "On the independent run it ties GPT-6 Astra instead of leading it by about 8 points.",
  },
  {
    id: "tb4-argon-gap",
    benchmark: "Terminal-Bench 4.0",
    model: "Gemini 4 Argon",
    vendorValue: 57.4,
    vendorDisplay: "57.4%",
    vendorBy: "Google",
    independentValue: 57,
    independentDisplay: "57%",
    independentBy: "Artificial Analysis run",
    note: "Here the two agree closely. Not every vendor number shrinks.",
  },
];

/** Vendor minus independent, in points. Positive means the vendor number is higher. */
export function describeVendorGap(row: SameTestRow): string {
  const gap = Number((row.vendorValue - row.independentValue).toFixed(1));
  if (gap === 0) return "No gap";
  return gap > 0 ? `Vendor is ${gap} points higher` : `Vendor is ${Math.abs(gap)} points lower`;
}

export function getSourceById(sourceId: IndependentSourceId): IndependentSource | undefined {
  return INDEPENDENT_SOURCES.find((source) => source.id === sourceId);
}

/** Scores for one source, highest first. Entries without a number go last. */
export function getSourceRows(sourceId: IndependentSourceId): IndependentScore[] {
  return INDEPENDENT_SCORES.filter((row) => row.sourceId === sourceId).sort((a, b) => {
    if (a.score === null && b.score === null) return a.model.localeCompare(b.model);
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score || a.model.localeCompare(b.model);
  });
}

/** One model's row in one source, or undefined when the source does not list it. */
export function getModelScore(sourceId: IndependentSourceId, model: string): IndependentScore | undefined {
  return INDEPENDENT_SCORES.find((row) => row.sourceId === sourceId && row.model === model);
}

/**
 * Whether two scores are within their combined published margins.
 * Returns null when either margin is unknown, because then we cannot say.
 */
export function intervalsOverlap(a: IndependentScore, b: IndependentScore): boolean | null {
  if (a.score === null || b.score === null || a.margin === null || b.margin === null) return null;
  return Math.abs(a.score - b.score) <= a.margin + b.margin;
}

/** Points between two scored rows, rounded to avoid floating-point noise. */
export function gapBetween(higher: IndependentScore, lower: IndependentScore): number | null {
  if (higher.score === null || lower.score === null) return null;
  return Number((higher.score - lower.score).toFixed(2));
}

/** Leader and runner-up for a source, or undefined when nothing is scored. */
export function getLeaderSummary(sourceId: IndependentSourceId): LeaderSummary | undefined {
  const scored = getSourceRows(sourceId).filter((row) => row.score !== null);
  const [leader, runnerUp] = scored;
  if (!leader) return undefined;
  return {
    leader,
    runnerUp: runnerUp ?? null,
    gap: runnerUp ? gapBetween(leader, runnerUp) : null,
    withinMargin: runnerUp ? intervalsOverlap(leader, runnerUp) : null,
  };
}