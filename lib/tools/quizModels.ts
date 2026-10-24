import type { GuideLink } from "@/lib/shared/contentTypes";
import type { TaskId } from "./quizQuestions";

/** Same as the review slug: /compare/reviews/[id]. */
export type QuizModelId =
  | "claude-opus-5-5"
  | "gpt-6-1-sol"
  | "gpt-6-astra"
  | "claude-fable-5-1"
  | "claude-sonnet-5-5"
  | "gemini-4-argon"
  | "gemini-3-8-flash"
  | "claude-haiku-5-5"
  | "gpt-6-luna"
  | "mimo-v2-6-pro"
  | "kimi-k3"
  | "qwen3-8-max-27b"
  | "deepseek-v4-1-flash";

export interface QuizModel {
  id: QuizModelId;
  name: string;
  maker: string;
  /** US dollars per million tokens, input / output (Blueprint 6.7). */
  apiPrice: string;
  context: string;
  /** Independent BenchLM composite, as text because some rows are estimates or unranked. */
  benchLm: string;
  bestFor: string;
  openWeight: boolean;
  note: string | null;
}

export interface PickRule {
  modelId: QuizModelId;
  role: string;
}

export interface ModelPick {
  model: QuizModel;
  role: string;
}

/** Directory snapshot from Blueprint 6.7. Re-check against the model directory before publishing. */
export const QUIZ_MODELS: Record<QuizModelId, QuizModel> = {
  "claude-opus-5-5": { id: "claude-opus-5-5", name: "Claude Opus 5.5", maker: "Anthropic", apiPrice: "$4 / $20", context: "1M", benchLm: "86.6", bestFor: "All-round flagship", openWeight: false, note: null },
  "gpt-6-1-sol": { id: "gpt-6-1-sol", name: "GPT-6.1 Sol", maker: "OpenAI", apiPrice: "$2 / $10", context: "1.05M", benchLm: "84.1", bestFor: "Best value near the frontier", openWeight: false, note: null },
  "gpt-6-astra": { id: "gpt-6-astra", name: "GPT-6 Astra", maker: "OpenAI", apiPrice: "$10 / $50", context: "1.05M", benchLm: "83.9", bestFor: "Maths, science, research", openWeight: false, note: null },
  "claude-fable-5-1": { id: "claude-fable-5-1", name: "Claude Fable 5.1", maker: "Anthropic", apiPrice: "$10 / $50", context: "1M", benchLm: "83.2", bestFor: "Hardest agentic coding", openWeight: false, note: null },
  "claude-sonnet-5-5": { id: "claude-sonnet-5-5", name: "Claude Sonnet 5.5", maker: "Anthropic", apiPrice: "$2 / $10", context: "1M", benchLm: "82.2", bestFor: "Everyday coding and knowledge work", openWeight: false, note: null },
  "gemini-4-argon": { id: "gemini-4-argon", name: "Gemini 4 Argon", maker: "Google", apiPrice: "$2 / $10", context: "1M", benchLm: "81.0", bestFor: "Complex reasoning", openWeight: false, note: "Introductory price until Nov 30, 2026." },
  "gemini-3-8-flash": { id: "gemini-3-8-flash", name: "Gemini 3.8 Flash", maker: "Google", apiPrice: "$0.75 / $3.75", context: "1M", benchLm: "69.3", bestFor: "Fast, cheap multimodal", openWeight: false, note: "Introductory price until Dec 31, 2026." },
  "claude-haiku-5-5": { id: "claude-haiku-5-5", name: "Claude Haiku 5.5", maker: "Anthropic", apiPrice: "$0.10 / $0.50", context: "1M", benchLm: "70.0", bestFor: "High-volume, low-cost", openWeight: false, note: null },
  "gpt-6-luna": { id: "gpt-6-luna", name: "GPT-6 Luna", maker: "OpenAI", apiPrice: "$0.10 / $0.50", context: "Not confirmed", benchLm: "Not in top 25", bestFor: "Cheapest bulk work", openWeight: false, note: "Context size not confirmed yet." },
  "mimo-v2-6-pro": { id: "mimo-v2-6-pro", name: "MiMo-V2.6-Pro", maker: "Xiaomi", apiPrice: "$0.435 / $0.87", context: "1M", benchLm: "73.6 (estimate)", bestFor: "Top open-weight; MIT licence", openWeight: true, note: null },
  "kimi-k3": { id: "kimi-k3", name: "Kimi K3", maker: "Moonshot AI", apiPrice: "$3 / $15", context: "1.05M", benchLm: "69.9", bestFor: "Open-weight coding and agents", openWeight: true, note: null },
  "qwen3-8-max-27b": { id: "qwen3-8-max-27b", name: "Qwen3.8 Max / 27B", maker: "Alibaba", apiPrice: "Max $2 / $6; 27B free to self-host", context: "1M / 262K (Max / 27B)", benchLm: "69.7 (Max)", bestFor: "27B: best single-GPU local", openWeight: true, note: null },
  "deepseek-v4-1-flash": { id: "deepseek-v4-1-flash", name: "DeepSeek V4.1 Flash", maker: "DeepSeek", apiPrice: "$0.15 / $0.60", context: "1M", benchLm: "Not in top 25", bestFor: "Cheapest capable API", openWeight: false, note: "Listed price applies off-peak." },
};

/** Ordered by fit. Picks come from directory "best for" labels and BenchLM scores, not from our own tests. */
export const TASK_PICKS: Record<TaskId, readonly PickRule[]> = {
  everyday: [
    { modelId: "claude-opus-5-5", role: "Best all-round" },
    { modelId: "gpt-6-1-sol", role: "Best value" },
    { modelId: "gemini-3-8-flash", role: "Fast and cheap" },
  ],
  writing: [
    { modelId: "claude-opus-5-5", role: "Best all-round" },
    { modelId: "gpt-6-1-sol", role: "Best value" },
    { modelId: "claude-sonnet-5-5", role: "Everyday knowledge work" },
  ],
  study: [
    { modelId: "gpt-6-1-sol", role: "Best value" },
    { modelId: "claude-sonnet-5-5", role: "Everyday knowledge work" },
    { modelId: "gemini-3-8-flash", role: "Fast and cheap" },
  ],
  documents: [
    { modelId: "claude-sonnet-5-5", role: "Everyday knowledge work" },
    { modelId: "gemini-3-8-flash", role: "Cheap and multimodal" },
    { modelId: "gpt-6-1-sol", role: "Best value" },
  ],
  research: [
    { modelId: "gpt-6-astra", role: "Maths, science, research" },
    { modelId: "gemini-4-argon", role: "Complex reasoning" },
    { modelId: "claude-opus-5-5", role: "Best all-round" },
  ],
  coding: [
    { modelId: "claude-sonnet-5-5", role: "Everyday coding" },
    { modelId: "claude-fable-5-1", role: "Hardest agentic coding" },
    { modelId: "kimi-k3", role: "Open-weight coding" },
  ],
  media: [],
  bulk: [
    { modelId: "gpt-6-luna", role: "Cheapest bulk work" },
    { modelId: "claude-haiku-5-5", role: "High volume, low cost" },
    { modelId: "deepseek-v4-1-flash", role: "Cheapest capable API" },
  ],
};

export const LOCAL_PICKS_DEFAULT: readonly PickRule[] = [
  { modelId: "qwen3-8-max-27b", role: "Best single-GPU local" },
  { modelId: "mimo-v2-6-pro", role: "Top open-weight" },
  { modelId: "kimi-k3", role: "Open-weight coding and agents" },
];

export const LOCAL_PICKS_CODING: readonly PickRule[] = [
  { modelId: "kimi-k3", role: "Open-weight coding and agents" },
  { modelId: "qwen3-8-max-27b", role: "Best single-GPU local" },
  { modelId: "mimo-v2-6-pro", role: "Top open-weight" },
];

/** Best-for roundups linked from each task. */
export const ROUNDUP_BY_TASK: Record<TaskId, readonly GuideLink[]> = {
  everyday: [
    { href: "/compare/best/overall", label: "Best AI model overall" },
    { href: "/compare/best/by-job", label: "Best AI model by job" },
  ],
  writing: [
    { href: "/compare/best/writing", label: "Best AI for writing" },
    { href: "/compare/best/overall", label: "Best AI model overall" },
  ],
  study: [
    { href: "/compare/best/students", label: "Best AI tools for students" },
    { href: "/compare/best/overall", label: "Best AI model overall" },
  ],
  documents: [
    { href: "/compare/best/overall", label: "Best AI model overall" },
    { href: "/compare/best/by-job", label: "Best AI model by job" },
  ],
  research: [
    { href: "/compare/best/by-job", label: "Best AI model by job" },
    { href: "/compare/best/overall", label: "Best AI model overall" },
  ],
  coding: [
    { href: "/compare/best/coding", label: "Best AI for coding" },
    { href: "/compare/best/agents", label: "Best AI for agents" },
  ],
  media: [
    { href: "/compare/best/image", label: "Best AI for images" },
    { href: "/compare/best/video", label: "Best AI for video" },
  ],
  bulk: [
    { href: "/compare/best/cheap-and-fast", label: "Best cheap and fast models" },
    { href: "/compare/best/value", label: "Best value models" },
  ],
};

export const LOCAL_ROUNDUPS: readonly GuideLink[] = [
  { href: "/compare/best/local", label: "Best local models" },
  { href: "/compare/best/open-weights", label: "Best open-weight models" },
];