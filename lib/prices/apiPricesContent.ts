export interface PricingWord {
  term: string;
  meaning: string;
}

export interface UpcomingChange {
  isoDate: string;
  text: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  story: string;
  tasksPerMonth: number;
  inputTokens: number;
  outputTokens: number;
  cachedSharePercent: number;
  useBatch: boolean;
  modelIds: readonly string[];
  takeaway: string;
}

export interface MeasuredTokenUse {
  model: string;
  finding: string;
  source: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface PriceSource {
  publisher: string;
  title: string;
  href: string;
  kind: "Provider announcement" | "Provider pricing page" | "Price tracker (secondary)";
}

export const PRICING_WORDS: readonly PricingWord[] = [
  { term: "Token", meaning: "A small piece of text the model reads or writes. In English, 1,000 tokens is about 750 words, but counts vary by model and language." },
  { term: "Input tokens", meaning: "Everything you send: your question, files, instructions and earlier chat history." },
  { term: "Output tokens", meaning: "Everything the model writes back. On reasoning models this includes hidden thinking, which is billed as output." },
  { term: "Cached input", meaning: "Text the provider has seen recently, such as the same instructions sent again. Reading it from cache costs a fraction of normal input. Some providers charge extra to store it the first time." },
  { term: "Batch", meaning: "Work submitted to run later instead of instantly. Several providers charge about half price for it." },
  { term: "Long-prompt rate", meaning: "A higher price that applies to the whole request once the input passes a set size." },
  { term: "Introductory rate", meaning: "A launch price with an end date. It can double when the date passes." },
  { term: "Peak hours", meaning: "Times of day when a provider charges more. DeepSeek charges twice as much at peak." },
];

export const UPCOMING_CHANGES: readonly UpcomingChange[] = [
  { isoDate: "2026-10-21", text: "Xiaomi retires its MiMo V2.5 models today. V2.6 keeps the same prices, but old model names stop working." },
  { isoDate: "2026-11-30", text: "Last day of Gemini 4 Argon's $2 / $10 introductory rate. From December 1 it is $4 / $20, with cached input at $0.20." },
  { isoDate: "2026-12-31", text: "Last day of Gemini 3.8 Flash's $0.75 / $3.75 introductory rate. One tracker lists $1.50 / $7.50 afterwards. Confirm with Google." },
];

export const MEASURED_TOKEN_USE: readonly MeasuredTokenUse[] = [
  {
    model: "Gemini 4 Argon",
    finding: "Wrote about 2.3 times as many output tokens as some rivals. At the introductory price its cost per task came out around 60% of GPT-6 Astra's, but about 1.2 times Astra's at the December price.",
    source: "Artificial Analysis, as reported by AIHubMix",
  },
  {
    model: "Kimi K3",
    finding: "Used roughly twice the average number of output tokens in one index run (about 130 million against a 63 million average), because its thinking is always on.",
    source: "Artificial Analysis, as reported by Verdent",
  },
  {
    model: "Qwen3.8 Max",
    finding: "Took about 64 turns per agentic task, compared with 14 for its predecessor, which raises cost per task even at low per-token prices.",
    source: "Artificial Analysis, as reported by NYU Shanghai RITS",
  },
];

export const SAVING_TIPS: readonly string[] = [
  "Route by difficulty. Send simple jobs such as sorting, extracting and short replies to a budget model, and keep a flagship for the hard 10%.",
  "Cache what repeats. If every request starts with the same instructions or document, cached reads cost a small fraction of fresh input.",
  "Use batch when you can wait. Reports, tagging and nightly jobs rarely need an instant answer.",
  "Keep prompts under the price steps. Haiku 5.5, GPT-6 and Grok 4.7 charge more for the whole request once the input passes a set size.",
  "Cap the answer length. Output costs two to five times more than input, so ask for the format and length you need and set a maximum.",
  "Turn thinking down on easy tasks. Reasoning tokens are billed as output. Use a lower effort setting where the model offers one.",
  "Test on ten real tasks first. Compare cost per finished task, not price per token.",
  "Set spending limits and alerts in the provider's console before you ship anything.",
];

export const WORKED_EXAMPLES: readonly WorkedExample[] = [
  {
    id: "study",
    title: "A student asking 20 questions a day",
    story: "600 short questions a month, no files, no caching.",
    tasksPerMonth: 600,
    inputTokens: 500,
    outputTokens: 400,
    cachedSharePercent: 0,
    useBatch: false,
    modelIds: ["claude-haiku-5-5", "claude-sonnet-5-5", "claude-opus-5-5"],
    takeaway: "At chat sizes, heavy personal use costs pennies to a few dollars a month on any of these. A subscription is usually simpler for one person.",
  },
  {
    id: "support",
    title: "A small shop's support assistant",
    story: "2,000 customer messages a month, each with a help article attached. We assume 75% of the input repeats and is cached.",
    tasksPerMonth: 2000,
    inputTokens: 4000,
    outputTokens: 350,
    cachedSharePercent: 75,
    useBatch: false,
    modelIds: ["gpt-6-luna", "deepseek-v4-1-flash", "gemini-3-8-flash", "claude-sonnet-5-5"],
    takeaway: "At volume the model tier matters most. Budget models plus caching keep a busy assistant affordable, while a workhorse multiplies the bill by roughly the price ratio.",
  },
  {
    id: "reports",
    title: "Summarizing 100 long reports a month",
    story: "Each report is about 100 pages. Results can wait, so we use the batch option where it exists.",
    tasksPerMonth: 100,
    inputTokens: 66_667,
    outputTokens: 1200,
    cachedSharePercent: 0,
    useBatch: true,
    modelIds: ["claude-haiku-5-5", "claude-sonnet-5-5", "gpt-6-1-sol", "kimi-k3"],
    takeaway: "Batch takes about half off where it is offered. Kimi K3 has no batch option listed, so it keeps full price.",
  },
  {
    id: "codebase",
    title: "Reviewing a big codebase in one go",
    story: "20 very long requests a month. The input is large enough to cross several price thresholds.",
    tasksPerMonth: 20,
    inputTokens: 300_000,
    outputTokens: 8000,
    cachedSharePercent: 0,
    useBatch: false,
    modelIds: ["claude-haiku-5-5", "gpt-6-luna", "gpt-6-1-sol", "claude-sonnet-5-5"],
    takeaway: "Long-prompt rates apply to the whole request, so one extra token can jump the price. Split the work or trim the input to stay under the step.",
  },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Is the API the same as my ChatGPT, Claude or Gemini subscription?", answer: "No. Subscriptions are flat monthly fees for the apps. The API is billed separately by the token. Paying for one does not cover the other." },
  { question: "What is a token, in plain words?", answer: "A chunk of text, often part of a word. In English, 1,000 tokens is about 750 words. The same text can count differently on different models, and non-English text usually costs more tokens." },
  { question: "Why does output cost more than input?", answer: "Writing is more work for the model than reading. In this table, output is two to five times the input price." },
  { question: "Do thinking tokens cost money?", answer: "Yes. Reasoning models count their hidden thinking as output tokens, so a short visible answer can hide a large bill. Claude, Grok and Kimi all bill it this way." },
  { question: "What does prompt caching save?", answer: "When part of your prompt repeats, reading it from cache costs a fraction of normal input. In this table cached input ranges from about 1% to 25% of the standard input price. Some providers charge extra the first time a prompt is stored." },
  { question: "Is batch worth using?", answer: "If the work can wait, yes. Several providers take about half off. Check the table: Grok 4.7, Kimi K3, Qwen3.8 Max and DeepSeek list no batch discount." },
  { question: "Are prices the same everywhere?", answer: "Not always. Cloud resellers and regions can charge differently. Alibaba, for example, says pricing differs by region. This page shows each maker's own international list price." },
  { question: "Do these prices include tax?", answer: "No. At least Moonshot adds taxes at checkout. Your total depends on where you live." },
  { question: "How do I avoid a surprise bill?", answer: "Set a monthly spending limit, turn on usage alerts, cap the maximum output length, and test with a small batch before running thousands of requests." },
];

export const PROVIDER_PAGES: readonly PriceSource[] = [
  { publisher: "OpenAI", title: "Introducing GPT-6.1 Sol (lists Astra, Sol and Luna prices)", href: "https://openai.com/index/introducing-gpt-6-1-sol/", kind: "Provider announcement" },
  { publisher: "OpenAI", title: "API pricing", href: "https://developers.openai.com/api/docs/pricing", kind: "Provider pricing page" },
  { publisher: "xAI", title: "Models and pricing", href: "https://docs.x.ai/docs/models", kind: "Provider pricing page" },
  { publisher: "Moonshot AI", title: "Kimi API pricing", href: "https://platform.kimi.com/docs/pricing/chat", kind: "Provider pricing page" },
  { publisher: "Alibaba Cloud", title: "Model Studio pricing", href: "https://www.alibabacloud.com/help/en/model-studio/pricing", kind: "Provider pricing page" },
  { publisher: "Google Cloud", title: "Vertex AI generative AI pricing", href: "https://cloud.google.com/vertex-ai/generative-ai/pricing", kind: "Provider pricing page" },
];

export const TRACKER_SOURCES: readonly PriceSource[] = [
  { publisher: "Finout", title: "Anthropic API pricing in 2026", href: "https://www.finout.io/blog/anthropic-api-pricing", kind: "Price tracker (secondary)" },
  { publisher: "DEV Community", title: "Claude API pricing per million tokens (Oct 2026)", href: "https://dev.to/scorpion4ik26lang/claude-api-pricing-per-million-tokens-all-models-oct-2026-2am2", kind: "Price tracker (secondary)" },
  { publisher: "BenchLM", title: "OpenAI API pricing (October 2026)", href: "https://benchlm.ai/openai/api-pricing", kind: "Price tracker (secondary)" },
  { publisher: "api.foo", title: "OpenAI API pricing (October 2026)", href: "https://api.foo/docs/en/openai-api-pricing/", kind: "Price tracker (secondary)" },
  { publisher: "AIHubMix", title: "Gemini 4 Argon pricing: cheap per token, not per task", href: "https://aihubmix.com/blog/gemini-4-argon-pricing-cheap-per-token-not-per-task", kind: "Price tracker (secondary)" },
  { publisher: "Puter", title: "Gemini API pricing (Oct 2026)", href: "https://developer.puter.com/tutorials/gemini-api-pricing/", kind: "Price tracker (secondary)" },
  { publisher: "Yotta Labs", title: "DeepSeek V4.1 Flash pricing and specs", href: "https://www.yottalabs.ai/post/deepseek-v4-1-flash-pricing-specs-v4-pro-routing-2026", kind: "Price tracker (secondary)" },
  { publisher: "Kingy AI", title: "MiMo-V2.6-Pro pricing", href: "https://kingy.ai/blog/mimo-v2-6-pro-free-access-pricing-setup/", kind: "Price tracker (secondary)" },
];