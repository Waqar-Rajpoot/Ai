import type { EvidenceHighlight, ModelEvidence, SourceLabel } from "./reviewTypes";

interface EvidenceSource {
  sourceName: string;
  sourceUrl: string;
  asOf: string;
}

const OPUS_PAGE: EvidenceSource = {
  sourceName: "BenchLM profile: Claude Opus 5.5",
  sourceUrl: "https://benchlm.ai/models/claude-opus-5-5",
  asOf: "2026-10-29",
};
const SOL_PAGE: EvidenceSource = {
  sourceName: "BenchLM profile: GPT-6.1 Sol",
  sourceUrl: "https://benchlm.ai/models/gpt-6-1-sol",
  asOf: "2026-10-28",
};
const LEADERBOARD_ARTICLE: EvidenceSource = {
  sourceName: "worldngayon.com leaderboard roundup (reports LiveBench and vendor figures)",
  sourceUrl: "https://worldngayon.com/llm-leaderboard-2026/",
  asOf: "2026-10-21",
};
const TECH_INSIDER: EvidenceSource = {
  sourceName: "Tech Insider leaderboard snapshot",
  sourceUrl: "https://tech-insider.org/llm-leaderboard-claude-opus-5-5-gpt-6-1-sol-gemini-4-argon-2026/",
  asOf: "2026-10-21",
};
const GRADUALLY: EvidenceSource = {
  sourceName: "gradually.ai AI leaderboard",
  sourceUrl: "https://www.gradually.ai/en/ai-leaderboard/",
  asOf: "2026-10",
};
const DATALEARNER: EvidenceSource = {
  sourceName: "DataLearner: Claude Sonnet 5.5 benchmark details",
  sourceUrl: "https://www.datalearner.com/en/ai-models/pretrained-models/claude-sonnet-5-5/analysis",
  asOf: "2026-10",
};
const SONNET_COMPARE: EvidenceSource = {
  sourceName: "BenchLM: Claude Sonnet 5 vs Sonnet 5.5",
  sourceUrl: "https://benchlm.ai/md/compare/claude-sonnet-5-vs-claude-sonnet-5-5.md",
  asOf: "2026-09-28",
};
const PRICE_PER_TOKEN: EvidenceSource = {
  sourceName: "pricepertoken.com: Claude Sonnet 5.5",
  sourceUrl: "https://pricepertoken.com/pricing-page/model/anthropic-claude-sonnet-5.5",
  asOf: "2026-10-22",
};
const BENCHLM_KNOWLEDGE: EvidenceSource = {
  sourceName: "BenchLM knowledge leaderboard",
  sourceUrl: "https://benchlm.ai/md/knowledge.md",
  asOf: "September 2026",
};
const BENCHLM_AGENTIC: EvidenceSource = {
  sourceName: "BenchLM agentic leaderboard",
  sourceUrl: "https://benchlm.ai/md/agentic.md",
  asOf: "2026-09-10",
};
const BENCHLM_BOARD: EvidenceSource = {
  sourceName: "BenchLM overall leaderboard (earlier snapshot)",
  sourceUrl: "https://benchlm.ai/",
  asOf: "2026-09-04",
};
const PROTOCOL_PAPER: EvidenceSource = {
  sourceName: "BenchBench-Protocol paper (arXiv 2608.23898)",
  sourceUrl: "https://arxiv.org/pdf/2608.23898",
  asOf: "2026-08",
};

function row(
  source: SourceLabel,
  from: EvidenceSource,
  label: string,
  value: string,
  context: string,
): EvidenceHighlight {
  return { label, value, context, source, ...from };
}

/** Dated, sourced results per model id. Only rows we actually retrieved are listed. */
export const REVIEW_EVIDENCE: Readonly<Record<string, ModelEvidence>> = {
  "claude-opus-5-5": {
    categories: [
      { category: "Agentic", score: 90.1, rankLabel: "#1 of 135" },
      { category: "Coding", score: 82.9, rankLabel: "#1 of 156" },
      { category: "Reasoning", score: 86.1, rankLabel: "#4 of 26" },
      { category: "Multimodal", score: 91.8, rankLabel: "#3 of 58" },
      { category: "Knowledge", score: 89.5, rankLabel: "#1 of 179" },
      { category: "Math", score: 97.3, rankLabel: "Not ranked" },
    ],
    highlights: [
      row("independent", OPUS_PAGE, "ARC-AGI-2", "91.7%", "ARC Prize semi-private result. 3.3 points behind the best verified row (GPT-6 Astra, 95%)."),
      row("independent", OPUS_PAGE, "FrontierMath v2, Tiers 1–3", "91.2%", "Epoch AI leaderboard. 2.5 points behind GPT-6 Astra (93.7%)."),
      row("independent", OPUS_PAGE, "FrontierMath v2, Tier 4", "95.0%", "Epoch AI leaderboard. 5 points behind GPT-6.1 Sol (100%)."),
      row("independent", OPUS_PAGE, "CursorBench 4.0", "57.8%", "Cursor's own leaderboard. Best verified row."),
      row("independent", OPUS_PAGE, "Hermes Bench", "76.7%", "Nous Research, 150 agent tasks. Best verified row. Hermes Index is also best, at 63.3%."),
      row("independent", OPUS_PAGE, "FrontierCode 2.0", "45.5%", "Cognition. Best verified row."),
      row("independent", OPUS_PAGE, "ParseBench", "78.89%", "LlamaIndex leaderboard. Best verified row."),
      row("independent", OPUS_PAGE, "ExtractBench", "86.06%", "LlamaIndex leaderboard. 9.3 points behind GPT-6.1 Sol (95.31%)."),
      row("vendor-reported", OPUS_PAGE, "SWE-bench Pro", "89.9%", "Anthropic system card. Best verified row in BenchLM's catalog."),
      row("vendor-reported", OPUS_PAGE, "Terminal-Bench 4.0", "66.4%", "Anthropic launch page, xhigh effort. 4.2 points behind Claude Sonnet 5.5 (70.6%)."),
      row("vendor-reported", OPUS_PAGE, "OSWorld 2.0", "48.7%", "Anthropic system card, strict pass rate. 30.9 points behind Kimi K3.1 Pro (79.6%): a weak spot."),
      row("vendor-reported", OPUS_PAGE, "GraphWalks BFS, 256K–1M", "66.8%", "Google's launch chart. 29.4 points behind Gemini 4 Carbon (96.2%): a long-context weak spot."),
    ],
  },
  "gpt-6-1-sol": {
    highlights: [
      row("independent", SOL_PAGE, "ExtractBench", "95.31%", "LlamaIndex leaderboard. Best verified row in BenchLM's catalog."),
      row("independent", OPUS_PAGE, "FrontierMath v2, Tier 4", "100%", "Epoch AI leaderboard. Best verified row."),
      row("independent", SOL_PAGE, "Hermes Bench", "73.9%", "Nous Research. 2.8 points behind Claude Opus 5.5 (76.7%)."),
      row("independent", SOL_PAGE, "Hermes Index", "57.1%", "Nous Research. 6.2 points behind Claude Opus 5.5 (63.3%)."),
      row("independent", SOL_PAGE, "ParseBench", "69.70%", "LlamaIndex leaderboard. 9.2 points behind the best verified row (Claude Opus 5.5)."),
      row("independent", LEADERBOARD_ARTICLE, "LiveBench overall", "85.4", "Reported as close behind GPT-6 Astra (86.1) and Claude Fable 5.1 (88.0)."),
      row("vendor-reported", LEADERBOARD_ARTICLE, "Cost per task", "$5.47", "OpenAI's own estimate, against $23.21 for Claude Opus 5.5. Check it on your workload."),
    ],
  },
  "gpt-6-astra": {
    highlights: [
      row("independent", OPUS_PAGE, "ARC-AGI-2", "95%", "ARC Prize semi-private result. Best verified row."),
      row("independent", OPUS_PAGE, "FrontierMath v2, Tiers 1–3", "93.7%", "Epoch AI leaderboard. Best verified row."),
      row("independent", OPUS_PAGE, "FrontierSWE v2", "65.5%", "Proximal leaderboard. Best verified row."),
      row("independent", OPUS_PAGE, "STEMBench120", "2.81", "Ulam audit, October 28, 2026. Best verified row."),
      row("independent", OPUS_PAGE, "ExtractBench Pro", "58%", "LlamaIndex leaderboard. Best verified row."),
      row("independent", OPUS_PAGE, "MazeBench", "23%", "Visual spatial reasoning. Best verified row."),
      row("vendor-reported", OPUS_PAGE, "Terminal-Bench-Science 0.1", "64.6%", "OpenAI's report. Best verified row."),
      row("vendor-reported", OPUS_PAGE, "FrontierCode 1.1 Extended", "64.5%", "OpenAI's report. Best verified row."),
      row("independent", LEADERBOARD_ARTICLE, "LiveBench overall", "86.1", "Second overall, with sub-scores of 92.7 in coding and 93.7 in browser use."),
    ],
  },
  "claude-fable-5-1": {
    highlights: [
      row("independent", LEADERBOARD_ARTICLE, "LiveBench overall", "88.0", "First overall on October 21, ahead of GPT-6 Astra (86.1)."),
      row("independent", BENCHLM_KNOWLEDGE, "BenchLM knowledge score", "86.7", "First place on that leaderboard in September."),
      row("independent", BENCHLM_AGENTIC, "BenchLM agentic score", "80.2", "First place, weighted score, in September."),
      row("independent", BENCHLM_BOARD, "BenchLM overall, September 4", "82.95", "It led the whole table then. On October 29 it is seventh, at 81.08."),
    ],
  },
  "claude-sonnet-5-5": {
    highlights: [
      row("vendor-reported", OPUS_PAGE, "Terminal-Bench 4.0", "70.6%", "Anthropic's report. First of 97 models, and ahead of Claude Opus 5.5 (66.4%)."),
      row("independent", DATALEARNER, "CursorBench 4.0", "55.5%", "Second of 47 models on Cursor's leaderboard."),
      row("independent", OPUS_PAGE, "Bug Hunt Bench", "51.3 fixes", "Best verified row. Claude Opus 5.5 managed 41.7."),
      row("vendor-reported", OPUS_PAGE, "Chartography, with tools", "90.2%", "Anthropic's report. Best verified row."),
      row("vendor-reported", OPUS_PAGE, "HealthBench, raw", "69.4%", "Anthropic's report. Best verified row."),
      row("independent", SONNET_COMPARE, "BenchLM: Sonnet 5.5 vs Sonnet 5", "80.49 vs 66.98", "September 28 comparison. The coding average rose from 59.8 to 79.6."),
      row("independent", PRICE_PER_TOKEN, "Output speed", "140 tok/s", "Median. Anthropic says it is more than 30% faster than Sonnet 5."),
    ],
  },
  "gemini-4-argon": {
    highlights: [
      row("independent", TECH_INSIDER, "BenchLeader overall", "71.0", "Second on October 21, behind Claude Opus 5.5 (72.7). BenchLM ranks it fifth, so the order depends on the test."),
      row("independent", GRADUALLY, "gradually.ai reasoning ranking", "Level with Sol", "Statistically level with GPT-6.1 Sol and GPT-5.6 Sol."),
      row("vendor-reported", TECH_INSIDER, "Release and price", "Oct 13 · $2 / $10", "Global release October 13, 2026. The $2 / $10 rate runs through November 30, 2026."),
    ],
  },
  "gemini-3-8-flash": {
    highlights: [
      row("independent", BENCHLM_BOARD, "BenchLM note, September 4", "95% of leader", "Then kept 95% of the leading score at 93% lower output price. Out of date: on October 29 it keeps about 75% of the leader's score."),
    ],
  },
  "kimi-k3": {
    highlights: [
      row("independent", PROTOCOL_PAPER, "Wet-lab protocol benchmark, 1 attempt", "Level with GPT-5.6 Sol", "Statistically indistinguishable from GPT-5.6 Sol on a single attempt."),
      row("independent", PROTOCOL_PAPER, "Same benchmark, 10 attempts", "31.5% of headroom", "Pulled ahead of GPT-5.6 Sol. Claude Opus 5 captured 39.5%."),
    ],
  },
  "deepseek-v4-1-flash": {
    highlights: [
      row("independent", LEADERBOARD_ARTICLE, "Release", "Oct 17 update", "DeepSeek shipped a Flash update on October 17. Older leaderboard tables describe earlier checkpoints."),
    ],
  },
};