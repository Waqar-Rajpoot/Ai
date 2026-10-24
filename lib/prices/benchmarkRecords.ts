import type { EvidenceLabel, IndependentScore, IndependentSource, VendorTable } from "./benchmarkTypes";
import { oldestVerifiedOnAll } from "./verification";

const BENCHLM_URL = "https://benchlm.ai/";
const ARENA_URL = "https://arena.ai/leaderboard";
const ARTIFICIAL_ANALYSIS_URL = "https://artificialanalysis.ai/";
const OPENAI_GPT_6_1_SOL_URL = "https://openai.com/index/introducing-gpt-6-1-sol/";
const GOOGLE_GEMINI_URL = "https://deepmind.google/models/gemini/";

export const INDEPENDENT_SOURCES: readonly IndependentSource[] = [
  {
    id: "benchlm-overall",
    name: "BenchLM overall score",
    publisher: "BenchLM",
    scoreLabel: "Score (0 to 100)",
    scale: "0 to 100, higher is better.",
    method: "A composite of many independent benchmark results. Each score carries an evidence label (Supported or Estimated) and an interval. BenchLM calls its score \"BenchAlign\" and versions it (v5.8 when we read it).",
    marginNote: "A 90% interval, shown as ± half its width.",
    versionNote: "BenchAlign v5.8",
    officialUrl: BENCHLM_URL,
    caveats: [
      "Overlapping intervals mean a tie, not a win.",
      "Estimated scores rest on less independent evidence than Supported ones.",
      "Rows can come from different snapshot days. Check the date on each row.",
    ],
  },
  {
    id: "arena-text",
    name: "Arena text rating",
    publisher: "Arena (formerly LMArena)",
    scoreLabel: "Rating",
    scale: "Elo-style points, higher is better. There is no fixed maximum.",
    method: "People compare two anonymous answers and vote for the one they prefer. The votes become a rating with a margin.",
    marginNote: "The margin Arena publishes, shown as ±.",
    versionNote: null,
    officialUrl: ARENA_URL,
    caveats: [
      "It measures which answer people prefer, not which is correct.",
      "A rating can be preliminary while votes are still arriving.",
      "The effort setting (High, Max) is part of the entry.",
    ],
  },
  {
    id: "arena-creative",
    name: "Arena creative-writing rating",
    publisher: "Arena (formerly LMArena)",
    scoreLabel: "Rating",
    scale: "Elo-style points, higher is better. There is no fixed maximum.",
    method: "The same blind voting as the text rating, using only creative-writing prompts.",
    marginNote: "The margin Arena publishes, shown as ±.",
    versionNote: null,
    officialUrl: ARENA_URL,
    caveats: [
      "Creative-writing categories have fewer votes, so their margins are wider.",
      "Taste varies. A top rating here says little about accuracy.",
    ],
  },
  {
    id: "aa-index",
    name: "Artificial Analysis Intelligence Index",
    publisher: "Artificial Analysis",
    scoreLabel: "Index (0 to 100)",
    scale: "0 to 100, higher is better.",
    method: "Combines ten evaluations that Artificial Analysis runs itself, from coding in a terminal to scientific reasoning and agentic office work.",
    marginNote: null,
    versionNote: "Index v4.3.2",
    officialUrl: ARTIFICIAL_ANALYSIS_URL,
    caveats: [
      "A score belongs to one effort setting. Higher settings can score more and cost more.",
      "The index has been rebuilt several times since August, so a score quoted without its version is close to useless.",
      "It publishes no margin, so close scores cannot be called.",
    ],
  },
];

interface RowInput {
  sourceId: string;
  modelName: string;
  maker: string;
  setting?: string;
  score: number | null;
  margin?: number;
  evidence?: EvidenceLabel;
  asOf: string;
  note?: string;
}

function slug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function row(input: RowInput): IndependentScore {
  return {
    id: `${input.sourceId}-${slug(input.modelName)}`,
    sourceId: input.sourceId,
    modelName: input.modelName,
    maker: input.maker,
    setting: input.setting ?? null,
    score: input.score,
    margin: input.margin ?? null,
    evidence: input.evidence ?? null,
    asOf: input.asOf,
    note: input.note ?? "",
    verifiedOn: null,
  };
}

const LAUNCH_NOTE = "From the launch snapshot of Oct 17. Refresh at the next weekly check.";
const NOT_RANKED_NOTE = "Not in BenchLM's top 25 on Oct 17.";

/**
 * Independent scores. Every `verifiedOn` is null: these numbers were read through third-party reports of each
 * source. Open `officialUrl`, confirm each row against the source, then set `verifiedOn` to that day (YYYY-MM-DD).
 */
export const INDEPENDENT_SCORES: readonly IndependentScore[] = [
  // BenchLM overall
  row({ sourceId: "benchlm-overall", modelName: "Claude Opus 5.5", maker: "Anthropic", score: 86.69, margin: 4.9, evidence: "supported", asOf: "2026-10-20" }),
  row({ sourceId: "benchlm-overall", modelName: "GPT-6.1 Sol", maker: "OpenAI", score: 84.19, margin: 4, evidence: "supported", asOf: "2026-10-20" }),
  row({ sourceId: "benchlm-overall", modelName: "GPT-6 Astra", maker: "OpenAI", score: 84.03, evidence: "supported", asOf: "2026-10-20" }),
  row({ sourceId: "benchlm-overall", modelName: "Claude Fable 5.1", maker: "Anthropic", score: 83.25, evidence: "supported", asOf: "2026-10-20" }),
  row({ sourceId: "benchlm-overall", modelName: "Gemini 4 Argon", maker: "Google", score: 82.93, evidence: "supported", asOf: "2026-10-20" }),
  row({ sourceId: "benchlm-overall", modelName: "Claude Sonnet 5.5", maker: "Anthropic", score: 82.2, asOf: "2026-10-17", note: LAUNCH_NOTE }),
  row({ sourceId: "benchlm-overall", modelName: "MiMo-V2.6-Pro", maker: "Xiaomi", score: 73.6, evidence: "estimated", asOf: "2026-10-17", note: LAUNCH_NOTE }),
  row({ sourceId: "benchlm-overall", modelName: "Claude Haiku 5.5", maker: "Anthropic", score: 70, asOf: "2026-10-17", note: LAUNCH_NOTE }),
  row({ sourceId: "benchlm-overall", modelName: "Kimi K3", maker: "Moonshot AI", score: 69.9, asOf: "2026-10-17", note: LAUNCH_NOTE }),
  row({ sourceId: "benchlm-overall", modelName: "Qwen3.8 Max", maker: "Alibaba", score: 69.7, asOf: "2026-10-17", note: LAUNCH_NOTE }),
  row({ sourceId: "benchlm-overall", modelName: "Gemini 3.8 Flash", maker: "Google", score: 69.3, asOf: "2026-10-17", note: LAUNCH_NOTE }),
  row({ sourceId: "benchlm-overall", modelName: "GPT-6 Luna", maker: "OpenAI", score: null, asOf: "2026-10-17", note: NOT_RANKED_NOTE }),
  row({ sourceId: "benchlm-overall", modelName: "Grok 4.7", maker: "xAI", score: null, asOf: "2026-10-17", note: NOT_RANKED_NOTE }),
  row({ sourceId: "benchlm-overall", modelName: "DeepSeek V4.1 Flash", maker: "DeepSeek", score: null, asOf: "2026-10-17", note: NOT_RANKED_NOTE }),

  // Arena text (snapshot of Oct 12, read through BenchLM's Arena table)
  row({ sourceId: "arena-text", modelName: "Gemini 4 Argon", maker: "Google", setting: "High effort", score: 1525, margin: 9, asOf: "2026-10-12", note: "Rating can still be preliminary." }),
  row({ sourceId: "arena-text", modelName: "Claude Opus 5.5", maker: "Anthropic", setting: "High effort", score: 1507, margin: 8, asOf: "2026-10-12" }),
  row({ sourceId: "arena-text", modelName: "GPT-6.1 Sol", maker: "OpenAI", setting: "Max effort", score: 1484, margin: 9, asOf: "2026-10-12" }),

  // Arena creative writing (same snapshot)
  row({ sourceId: "arena-creative", modelName: "Gemini 4 Argon", maker: "Google", setting: "High effort", score: 1519, margin: 20, asOf: "2026-10-12" }),
  row({ sourceId: "arena-creative", modelName: "Claude Opus 5.5", maker: "Anthropic", setting: "High effort", score: 1517, margin: 17, asOf: "2026-10-12" }),
  row({ sourceId: "arena-creative", modelName: "GPT-6.1 Sol", maker: "OpenAI", setting: "Max effort", score: 1462, margin: 20, asOf: "2026-10-12" }),

  // Artificial Analysis Intelligence Index v4.3.2 (snapshots of Oct 14 to 16)
  row({ sourceId: "aa-index", modelName: "Claude Opus 5.5", maker: "Anthropic", setting: "Max effort, with fallback", score: 57.6, asOf: "2026-10-16" }),
  row({ sourceId: "aa-index", modelName: "Claude Sonnet 5.5", maker: "Anthropic", score: 56, asOf: "2026-10-16" }),
  row({ sourceId: "aa-index", modelName: "Claude Fable 5.1", maker: "Anthropic", score: 53.4, asOf: "2026-10-16" }),
  row({ sourceId: "aa-index", modelName: "GPT-6 Astra", maker: "OpenAI", setting: "Max effort", score: 52.7, asOf: "2026-10-16" }),
  row({ sourceId: "aa-index", modelName: "Gemini 4 Argon", maker: "Google", setting: "High effort", score: 52.6, asOf: "2026-10-16" }),
  row({ sourceId: "aa-index", modelName: "GPT-6.1 Sol", maker: "OpenAI", setting: "Max effort", score: 51.8, asOf: "2026-10-16" }),
];

/**
 * Vendor-reported tables. Each is a maker's own numbers, kept apart from the independent scores above.
 * The OpenAI table was read on OpenAI's own page; Google's was read through third-party reports of its announcement.
 */
export const VENDOR_TABLES: readonly VendorTable[] = [
  {
    id: "google-gemini-4-argon",
    title: "Google's table for Gemini 4 Argon",
    vendor: "Google",
    announcement: "Gemini 4 Argon announcement (September 30, 2026)",
    columns: ["Gemini 4 Argon", "GPT-6 Astra", "Claude Fable 5.1", "Claude Opus 5.5"],
    rows: [
      { id: "terminal-bench-4", benchmark: "Terminal-Bench 4.0", measures: "Working through tasks in a command-line terminal.", direction: "higher", values: ["57.4%", "58.2%", "57.9%", "66.4%"], note: "The Opus 5.5 figure is Anthropic's own, copied into Google's table." },
      { id: "terminal-bench-science", benchmark: "Terminal-Bench Science 0.1", measures: "Scientific workflows such as data analysis, simulation and theorem proving.", direction: "higher", values: ["57.6%", "68.1%", "52.6%", "63.3%"], note: "Google ran Argon itself with a longer verifier timeout." },
      { id: "agents-last-exam", benchmark: "Agent's Last Exam", measures: "Computer-use tasks, as a pass rate.", direction: "higher", values: ["39.5%", "34.2%", null, "38.2%"], note: "No score is listed for Fable 5.1." },
      { id: "cwe-bench", benchmark: "CWE-bench v1", measures: "Fixing known classes of security vulnerabilities.", direction: "higher", values: ["68.0%", "68.0%", "58.0%", "67.0%"], note: null },
      { id: "deepswe", benchmark: "DeepSWE v1.1", measures: "Complex software-engineering tasks in real codebases.", direction: "higher", values: ["77.9%", null, null, "74.2%"], note: null },
    ],
    caveat: "Google chose the benchmarks and ran its own model. Rival figures were copied from other makers' reports or public leaderboards, so setups can differ.",
    readThrough: "third-party",
    sourceUrl: GOOGLE_GEMINI_URL,
    retrievedOn: "2026-10-23",
    verifiedOn: null,
  },
  {
    id: "openai-gpt-6-1-sol",
    title: "OpenAI's figures in the GPT-6.1 Sol announcement",
    vendor: "OpenAI",
    announcement: "Introducing GPT-6.1 Sol",
    columns: ["GPT-6 Astra", "GPT-6.1 Sol", "GPT-6 Sol (previous version)", "GPT-6 Luna"],
    rows: [
      { id: "terminal-bench-science", benchmark: "Terminal-Bench Science 0.1", measures: "Scientific workflows such as data analysis, simulation and theorem proving.", direction: "higher", values: ["68.1%", null, null, null], note: "OpenAI says this is the highest score among the models it tested. It states no exact figure for the others." },
      { id: "factual-errors", benchmark: "Answers with a factual error, low effort", measures: "Share of answers with at least one factual error, on conversations where users had flagged an earlier model's mistake.", direction: "lower", values: [null, "7.7%", "11.4%", null], note: "OpenAI says these prompts are deliberately hard and not typical use." },
      { id: "broken-search", benchmark: "Fails to say its search tool is broken", measures: "Share of tasks where the model does not tell the user the search tool failed. Tasks are chosen to cause failures. Maximum effort.", direction: "lower", values: ["1.5%", "2.1%", "4.9%", "28.7%"], note: "OpenAI says these tasks do not show typical failure rates." },
    ],
    caveat: "OpenAI ran its own models and took competitor results from public reports. Most of its comparisons are stated as percentage-point gaps, not full scores.",
    readThrough: "vendor-page",
    sourceUrl: OPENAI_GPT_6_1_SOL_URL,
    retrievedOn: "2026-10-23",
    verifiedOn: "2026-10-23",
  },
];

/** Oldest check date when every record on the page is verified, otherwise null. Feeds the hub and the indexing rule. */
export const BENCHMARKS_VERIFIED_ON: string | null = oldestVerifiedOnAll([...INDEPENDENT_SCORES, ...VENDOR_TABLES]);