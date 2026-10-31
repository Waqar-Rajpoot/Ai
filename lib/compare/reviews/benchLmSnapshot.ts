import type { BenchLmSnapshotEntry, NotInDirectoryModel } from "./reviewTypes";

/** Date of BenchLM's overall table used below. */
export const BENCHLM_SNAPSHOT_DATE = "2026-10-29";
export const BENCHLM_URL = "https://benchlm.ai/";
export const BENCHLM_RANKED_MODEL_COUNT = 216;

/** Rank 1 on the snapshot date. Not in our directory yet. */
export const BENCHLM_LEADER: NotInDirectoryModel = {
  name: "Gemini 4 Carbon",
  maker: "Google",
  rank: 1,
  score: 88.38,
  outputPricePerMillion: 10,
  note: "Released October 28, 2026. First by point estimate, with the score estimated from 2 source families.",
  profilePath: "/models/gemini-4-carbon",
};

/** Overall BenchLM table, 29 October 2026, keyed by directory model id. */
export const BENCHLM_SNAPSHOT: Readonly<Record<string, BenchLmSnapshotEntry | undefined>> = {
  "claude-opus-5-5": {
    benchLmName: "Claude Opus 5.5", rank: 2, score: 86.29, evidence: "supported", sourceFamilies: 3,
    licence: "proprietary", listedOutputPricePerMillion: 20, profilePath: "/models/claude-opus-5-5",
  },
  "gpt-6-astra": {
    benchLmName: "GPT-6 Astra", rank: 3, score: 86.07, evidence: "supported", sourceFamilies: 3,
    licence: "proprietary", listedOutputPricePerMillion: 50, profilePath: "/models/gpt-6-astra",
  },
  "gpt-6-1-sol": {
    benchLmName: "GPT-6.1 Sol", rank: 4, score: 85.27, evidence: "supported", sourceFamilies: 3,
    licence: "proprietary", listedOutputPricePerMillion: 10, profilePath: "/models/gpt-6-1-sol",
  },
  "gemini-4-argon": {
    benchLmName: "Gemini 4 Argon", rank: 5, score: 82.28, evidence: "supported", sourceFamilies: 3,
    licence: "proprietary", listedOutputPricePerMillion: 10, profilePath: "/models/gemini-4-argon",
  },
  "claude-sonnet-5-5": {
    benchLmName: "Claude Sonnet 5.5", rank: 6, score: 81.84, evidence: "supported", sourceFamilies: 3,
    licence: "proprietary", listedOutputPricePerMillion: 10, profilePath: "/models/claude-sonnet-5-5",
  },
  "claude-fable-5-1": {
    benchLmName: "Claude Fable 5.1", rank: 7, score: 81.08, evidence: "supported", sourceFamilies: 3,
    licence: "proprietary", listedOutputPricePerMillion: 50, profilePath: "/models/claude-fable-5-1",
  },
  "kimi-k3": {
    benchLmName: "Kimi K3", rank: 17, score: 69.34, evidence: "supported", sourceFamilies: 3,
    licence: "open-weight", listedOutputPricePerMillion: 15, profilePath: "/models/kimi-k3",
  },
  "claude-haiku-5-5": {
    benchLmName: "Claude Haiku 5.5", rank: 24, score: 66.42, evidence: "supported", sourceFamilies: 2,
    licence: "proprietary", listedOutputPricePerMillion: 0.5, profilePath: "/models/claude-haiku-5-5",
  },
  "gemini-3-8-flash": {
    benchLmName: "Gemini 3.8 Flash", rank: 27, score: 66.22, evidence: "supported", sourceFamilies: 3,
    licence: "proprietary", listedOutputPricePerMillion: 3.75, profilePath: "/models/gemini-3-8-flash",
  },
  "deepseek-v4-1-flash": {
    benchLmName: "DeepSeek V4.1 Flash 1017", rank: 30, score: 65.22, evidence: "supported", sourceFamilies: 3,
    licence: "open-weight", listedOutputPricePerMillion: 1.2, profilePath: "/models/deepseek-v4-1-flash",
  },
  "qwen3-8-max-27b": {
    benchLmName: "Qwen3.8 Max", rank: 33, score: 64.86, evidence: "supported", sourceFamilies: 3,
    licence: "open-weight", listedOutputPricePerMillion: null, profilePath: "/models/qwen3-8-max",
    companion: { label: "Qwen3.8-27B (self-hosted)", rank: 80, score: 54.26 },
  },
  "gpt-6-luna": {
    benchLmName: "GPT-6 Luna", rank: 46, score: 62.14, evidence: "supported", sourceFamilies: 3,
    licence: "proprietary", listedOutputPricePerMillion: 0.5, profilePath: "/models/gpt-6-luna",
  },
  "mimo-v2-6-pro": {
    benchLmName: "MiMo-V2.6-Pro", rank: 59, score: 56.44, evidence: "estimated", sourceFamilies: 2,
    licence: "open-weight", listedOutputPricePerMillion: 0.87, profilePath: "/models/mimo-v2-6-pro",
  },
  // "grok-4-7" has no entry: it is absent from the ranked table.
};

/** Notable ranked models that our directory does not include yet. */
export const NOT_IN_DIRECTORY_MODELS: readonly NotInDirectoryModel[] = [
  BENCHLM_LEADER,
  {
    name: "Claude Fable 5", maker: "Anthropic", rank: 8, score: 80.78, outputPricePerMillion: 50,
    note: "Predecessor of Fable 5.1.", profilePath: "/models/claude-fable",
  },
  {
    name: "GPT-6.1 Terra", maker: "OpenAI", rank: 9, score: 80.46, outputPricePerMillion: 5,
    note: "BenchLM's near-frontier value pick. Score is estimated from 1 source family.", profilePath: "/models/gpt-6-1-terra",
  },
  {
    name: "Kimi K3.1 Pro", maker: "Moonshot AI", rank: 13, score: 74.61, outputPricePerMillion: 10,
    note: "Newer than Kimi K3. Score is estimated from 1 source family.", profilePath: "/models/kimi-3-1-pro",
  },
];