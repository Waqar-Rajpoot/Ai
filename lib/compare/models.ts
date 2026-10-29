/**
 * Model directory data used by the best-for roundups.
 * Source: /compare/models (BenchLM scores read October 17, 2026; prices verified October 21, 2026).
 * Highlights were researched October 28, 2026 and carry their own labels.
 * Nothing here is fetched live.
 */

export type PriceTier = "Budget" | "Mid-priced" | "Premium";

export interface DirectoryModel {
  /** Stable id, also the future review slug (/compare/reviews/<id>). */
  readonly id: string;
  readonly name: string;
  readonly maker: string;
  readonly inputPricePerMillion: number;
  readonly outputPricePerMillion: number;
  readonly priceTier: PriceTier;
  readonly contextLabel: string;
  readonly benchScore: number | null;
  readonly benchScoreIsEstimate: boolean;
  readonly bestFor: string;
  readonly priceNote: string | null;
  /** Release date as reported, or null when not confirmed. */
  readonly released: string | null;
  /** Licence or access terms, as reported. */
  readonly license: string;
  readonly openWeights: boolean;
  /** Dated facts with their label in brackets. */
  readonly highlights: readonly string[];
  readonly skipIf: string;
}

export const DIRECTORY_MODELS: readonly DirectoryModel[] = [
  {
    id: "claude-opus-5-5",
    name: "Claude Opus 5.5",
    maker: "Anthropic",
    inputPricePerMillion: 4,
    outputPricePerMillion: 20,
    priceTier: "Mid-priced",
    contextLabel: "1M",
    benchScore: 86.6,
    benchScoreIsEstimate: false,
    bestFor: "All-round flagship",
    priceNote: null,
    released: "Sep 22, 2026",
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "128K output tokens. Cache reads are $0.20 per million (third-party roundup, Sep 25, 2026).",
      "Default effort is medium. At maximum effort it can use far more tokens, so cost per task can rise (Artificial Analysis, via roundup).",
      "SWE-bench Pro 89.9% and Terminal-Bench 4.0 66.4% (vendor-reported).",
      "Terminal-Bench 4.0 model-level runs: 59.6% (Artificial Analysis, tied with GPT-6 Astra) and 61.6% (Vals AI) (independent).",
    ],
    skipIf:
      "Skip it if cost per task matters more than the top score. Claude Sonnet 5.5 and GPT-6.1 Sol list at half the price per token.",
  },
  {
    id: "gpt-6-1-sol",
    name: "GPT-6.1 Sol",
    maker: "OpenAI",
    inputPricePerMillion: 2,
    outputPricePerMillion: 10,
    priceTier: "Mid-priced",
    contextLabel: "1.05M",
    benchScore: 84.1,
    benchScoreIsEstimate: false,
    bestFor: "Best value near the frontier",
    priceNote: null,
    released: "Sep 22, 2026",
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "Sits in the price slot GPT-6 Terra used to fill (third-party roundup, Sep 25, 2026).",
      "68.8% on DeepSWE 1.1 on OpenAI's own chart (vendor-reported).",
    ],
    skipIf:
      "Skip it if you want the highest score in the directory. Claude Opus 5.5 scores 2.5 points higher.",
  },
  {
    id: "gpt-6-astra",
    name: "GPT-6 Astra",
    maker: "OpenAI",
    inputPricePerMillion: 10,
    outputPricePerMillion: 50,
    priceTier: "Premium",
    contextLabel: "1.05M",
    benchScore: 83.9,
    benchScoreIsEstimate: false,
    bestFor: "Maths, science, research",
    priceNote: null,
    released: "Sep 3, 2026",
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "128K output tokens and an April 30, 2026 knowledge cutoff (OpenAI model page, via roundup).",
      "Cached input is $1 per million, a tenth of the base input price.",
      "First on the tbench.ai Terminal-Bench 4.0 agent leaderboard at 58.2% (independent leaderboard, Sep 25, 2026).",
      "Some security-related prompts are gated because of OpenAI's preparedness tier (vendor statement).",
    ],
    skipIf:
      "Skip it for everyday work. It is in the premium price tier and scores below Claude Opus 5.5 in this snapshot.",
  },
  {
    id: "claude-fable-5-1",
    name: "Claude Fable 5.1",
    maker: "Anthropic",
    inputPricePerMillion: 10,
    outputPricePerMillion: 50,
    priceTier: "Premium",
    contextLabel: "1M",
    benchScore: 83.2,
    benchScoreIsEstimate: false,
    bestFor: "Hardest agentic coding",
    priceNote: null,
    released: "Sep 1, 2026",
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "Same underlying model as Claude Mythos 5.1, with extra safeguards (Anthropic).",
      "SWE-bench Pro 81.2% and Terminal-Bench 4.0 55.8% (vendor-reported).",
      "Terminal-Bench 2.1: 91.4% at maximum effort, the top score on that board (Artificial Analysis, independent).",
      "Cache reads are $0.25 per million after a 75% cut.",
    ],
    skipIf:
      "Skip it for routine tasks. It is in the premium price tier, and cheaper models score close to it.",
  },
  {
    id: "claude-sonnet-5-5",
    name: "Claude Sonnet 5.5",
    maker: "Anthropic",
    inputPricePerMillion: 2,
    outputPricePerMillion: 10,
    priceTier: "Mid-priced",
    contextLabel: "1M",
    benchScore: 82.2,
    benchScoreIsEstimate: false,
    bestFor: "Everyday coding and knowledge work",
    priceNote: null,
    released: null,
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "Cache-read price cut in half on Oct 7, 2026, so heavy cached workloads cost less (our price-change note).",
    ],
    skipIf:
      "Skip it if you need the hardest multi-step agentic coding. The directory lists Claude Fable 5.1 for that.",
  },
  {
    id: "gemini-4-argon",
    name: "Gemini 4 Argon",
    maker: "Google",
    inputPricePerMillion: 2,
    outputPricePerMillion: 10,
    priceTier: "Mid-priced",
    contextLabel: "1M",
    benchScore: 81.0,
    benchScoreIsEstimate: false,
    bestFor: "Complex reasoning",
    priceNote: "Intro rate to Nov 30",
    released: "Oct 13, 2026",
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "Public on Oct 13, 2026 across the Gemini API, AI Studio and the Gemini app, and leads the Arena text chart (our release post).",
      "Independent tests show it writing far more output tokens per task than some rivals, which raises real cost (our release post).",
    ],
    skipIf:
      "Skip it if you need a stable price. The introductory rate ends on November 30, so check the new price first.",
  },
  {
    id: "mimo-v2-6-pro",
    name: "MiMo-V2.6-Pro",
    maker: "Xiaomi",
    inputPricePerMillion: 0.435,
    outputPricePerMillion: 0.87,
    priceTier: "Budget",
    contextLabel: "1M",
    benchScore: 73.6,
    benchScoreIsEstimate: true,
    bestFor: "Top open-weight; MIT licence",
    priceNote: null,
    released: null,
    license: "MIT",
    openWeights: true,
    highlights: [
      "Listed as the top open-weight model in the directory under an MIT licence.",
      "The 73.6 score is an estimate, not a published figure.",
    ],
    skipIf:
      "Skip it if you need a confirmed score. The 73.6 shown is an estimate.",
  },
  {
    id: "claude-haiku-5-5",
    name: "Claude Haiku 5.5",
    maker: "Anthropic",
    inputPricePerMillion: 0.1,
    outputPricePerMillion: 0.5,
    priceTier: "Budget",
    contextLabel: "1M",
    benchScore: 70.0,
    benchScoreIsEstimate: false,
    bestFor: "High-volume, low-cost",
    priceNote: null,
    released: "Oct 7, 2026",
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "Launched Oct 7, 2026 with a price step above 100K tokens (our weekly roundup, Oct 23, 2026). Check the higher rate for long prompts.",
    ],
    skipIf:
      "Skip it when quality matters more than cost. Its score of 70.0 sits well below the flagships.",
  },
  {
    id: "kimi-k3",
    name: "Kimi K3",
    maker: "Moonshot AI",
    inputPricePerMillion: 3,
    outputPricePerMillion: 15,
    priceTier: "Mid-priced",
    contextLabel: "1.05M",
    benchScore: 69.9,
    benchScoreIsEstimate: false,
    bestFor: "Open-weight coding and agents",
    priceNote: null,
    released: "Jul 2026",
    license: "Kimi K3 License (custom, read before commercial use)",
    openWeights: true,
    highlights: [
      "2.8 trillion parameters with 104B active per token, so it needs datacenter hardware to self-host (Hugging Face card, via roundup).",
      "Terminal-Bench 2.1: 88.3% in Moonshot's own Kimi Code harness (vendor-reported, not like-for-like with other boards).",
    ],
    skipIf:
      "Skip it if budget is tight. It costs more per token than Claude Sonnet 5.5 and scores lower (69.9 against 82.2).",
  },
  {
    id: "qwen3-8-max-27b",
    name: "Qwen3.8 Max / 27B",
    maker: "Alibaba",
    inputPricePerMillion: 2,
    outputPricePerMillion: 6,
    priceTier: "Mid-priced",
    contextLabel: "1M / 262K",
    benchScore: 69.7,
    benchScoreIsEstimate: false,
    bestFor: "27B: best single-GPU local",
    priceNote: "Max API price. 27B is free to self-host",
    released: "Aug 2026 (27B)",
    license: "Apache 2.0 (27B)",
    openWeights: true,
    highlights: [
      "27B is a dense model. The common UD-Q4_K_M build is a single 16.5 GB file that leaves room for a 32K context on a 24 GB GPU (Unsloth GGUF, via roundup).",
      "Terminal-Bench 2.1 73.0% and LiveCodeBench v6 90.3% (vendor-reported).",
      "SWE-bench Pro 61.7% on Qwen's own corrected task set, so treat cross-lab comparisons as directional (vendor-reported).",
    ],
    skipIf:
      "Skip the 27B version if you need the full 1M context. It has 262K, and the score shown is for Max.",
  },
  {
    id: "gemini-3-8-flash",
    name: "Gemini 3.8 Flash",
    maker: "Google",
    inputPricePerMillion: 0.75,
    outputPricePerMillion: 3.75,
    priceTier: "Budget",
    contextLabel: "1M",
    benchScore: 69.3,
    benchScoreIsEstimate: false,
    bestFor: "Fast, cheap multimodal",
    priceNote: "Intro rate to Dec 31",
    released: "Sep 2, 2026",
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "Price rises to $1.50 in / $7.50 out per million from Jan 1, 2027 (Google pricing page, via roundup).",
      "1M input and 64K output tokens, with native image input.",
      "Terminal-Bench 2.1 89.4% (vendor-reported), but only 19.1% on the harder Terminal-Bench 4.0.",
    ],
    skipIf:
      "Skip it for long-term builds until you check the price after December 31, when the introductory rate ends.",
  },
  {
    id: "deepseek-v4-1-flash",
    name: "DeepSeek V4.1 Flash",
    maker: "DeepSeek",
    inputPricePerMillion: 0.15,
    outputPricePerMillion: 0.6,
    priceTier: "Budget",
    contextLabel: "1M",
    benchScore: null,
    benchScoreIsEstimate: false,
    bestFor: "Cheapest capable API",
    priceNote: "Off-peak price",
    released: "Sep 10, 2026",
    license: "MIT",
    openWeights: true,
    highlights: [
      "Off-peak price is $0.15 in / $0.60 out. Peak hours (weekdays 01:00 to 04:00 and 06:00 to 10:00 UTC) double it (DeepSeek pricing page, via roundup).",
      "Weights are about 510 GB, so self-hosting means a multi-GPU server.",
      "Terminal-Bench 2.1: 90.6% vendor-reported but 74.5% in Vals AI's run (independent).",
    ],
    skipIf:
      "Skip it if you need a ranked score. It is not in the top 25, and the price shown is the off-peak price.",
  },
  {
    id: "gpt-6-luna",
    name: "GPT-6 Luna",
    maker: "OpenAI",
    inputPricePerMillion: 0.1,
    outputPricePerMillion: 0.5,
    priceTier: "Budget",
    contextLabel: "Not confirmed",
    benchScore: null,
    benchScoreIsEstimate: false,
    bestFor: "Cheapest bulk work",
    priceNote: null,
    released: "Sep 22, 2026",
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "Announced alongside GPT-6 Sol. Cheaper per token than most rivals, but with lower agentic scores (third-party roundup, Sep 25, 2026).",
      "The directory has not confirmed its context size.",
    ],
    skipIf:
      "Skip it if context size matters. The directory has not confirmed it, and the model is not in the top 25.",
  },
  {
    id: "grok-4-7",
    name: "Grok 4.7",
    maker: "xAI",
    inputPricePerMillion: 2,
    outputPricePerMillion: 6,
    priceTier: "Mid-priced",
    contextLabel: "500K",
    benchScore: null,
    benchScoreIsEstimate: false,
    bestFor: "Low output price; live web",
    priceNote: "Higher above 200K tokens",
    released: null,
    license: "Closed (API and apps)",
    openWeights: false,
    highlights: [
      "Output price of $6 per million is the lowest among the mid-priced models in the directory.",
      "Price rises above 200K tokens, and context stops at 500K.",
    ],
    skipIf:
      "Skip it for very long documents. The price rises above 200K tokens, and context stops at 500K.",
  },
];

/** Looks up directory models by id, in the order given. Unknown ids are dropped. */
export function getModelsByIds(ids: readonly string[]): DirectoryModel[] {
  return ids
    .map((id) => DIRECTORY_MODELS.find((model) => model.id === id))
    .filter((model): model is DirectoryModel => model !== undefined);
}