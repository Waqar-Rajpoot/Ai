export interface ContextWindowEntry {
  id: string;
  model: string;
  maker: string;
  /** Context window in tokens, or null when the maker has not confirmed it. */
  contextTokens: number | null;
  note?: string;
}

/**
 * Launch data copied from the model directory snapshot (Blueprint 6.7). Same list and order as the
 * directory. Update this file whenever the directory changes, then confirm each size on the provider's page.
 */
export const CONTEXT_WINDOWS: readonly ContextWindowEntry[] = [
  { id: "claude-opus-5-5", model: "Claude Opus 5.5", maker: "Anthropic", contextTokens: 1_000_000 },
  { id: "gpt-6-1-sol", model: "GPT-6.1 Sol", maker: "OpenAI", contextTokens: 1_050_000 },
  { id: "gpt-6-astra", model: "GPT-6 Astra", maker: "OpenAI", contextTokens: 1_050_000 },
  { id: "claude-fable-5-1", model: "Claude Fable 5.1", maker: "Anthropic", contextTokens: 1_000_000 },
  { id: "claude-sonnet-5-5", model: "Claude Sonnet 5.5", maker: "Anthropic", contextTokens: 1_000_000 },
  { id: "gemini-4-argon", model: "Gemini 4 Argon", maker: "Google", contextTokens: 1_000_000 },
  { id: "gemini-3-8-flash", model: "Gemini 3.8 Flash", maker: "Google", contextTokens: 1_000_000 },
  { id: "claude-haiku-5-5", model: "Claude Haiku 5.5", maker: "Anthropic", contextTokens: 1_000_000 },
  { id: "gpt-6-luna", model: "GPT-6 Luna", maker: "OpenAI", contextTokens: null, note: "Window not confirmed" },
  { id: "grok-4-7", model: "Grok 4.7", maker: "xAI", contextTokens: 500_000, note: "API price rises above 200K tokens" },
  { id: "mimo-v2-6-pro", model: "MiMo-V2.6-Pro", maker: "Xiaomi", contextTokens: 1_000_000 },
  { id: "kimi-k3", model: "Kimi K3", maker: "Moonshot AI", contextTokens: 1_050_000 },
  { id: "qwen3-8-max", model: "Qwen3.8 Max", maker: "Alibaba", contextTokens: 1_000_000 },
  { id: "qwen3-8-27b", model: "Qwen3.8 27B", maker: "Alibaba", contextTokens: 262_000, note: "Runs on your own computer" },
  { id: "deepseek-v4-1-flash", model: "DeepSeek V4.1 Flash", maker: "DeepSeek", contextTokens: 1_000_000 },
];