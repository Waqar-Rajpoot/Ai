import type { VerificationLevel } from "./apiCostTable";

export type RetirementKind = "model" | "chat-app" | "feature";

/** "firm" is an announced date. "earliest" and "floor" are the soonest a retirement could happen. */
export type DateType = "firm" | "earliest" | "floor";

export type OnTheDay = "fails" | "redirects" | "depends" | "not-stated";

export type RetirementStatus =
  | "retired"
  | "this-week"
  | "this-month"
  | "next-90-days"
  | "later"
  | "floor-only";

export interface RetirementEntry {
  id: string;
  name: string;
  maker: string;
  kind: RetirementKind;
  /** Where the date applies: a provider API, a cloud platform, or a consumer app. */
  platform: string;
  /** Exact API model IDs, used by the ID checker. Empty for apps, features and unnamed groups. */
  modelIds: readonly string[];
  /** ISO date the retirement was announced, when known. */
  announcedOn: string | null;
  /** ISO date (YYYY-MM-DD), read as UTC. */
  retiresOn: string;
  dateType: DateType;
  replacement: string | null;
  onTheDay: OnTheDay;
  note: string;
  verification: VerificationLevel;
  sourceUrl: string;
}

export const KIND_LABELS: Record<RetirementKind, string> = {
  model: "Model",
  "chat-app": "Chat app",
  feature: "Feature",
};

export const STATUS_LABELS: Record<RetirementStatus, string> = {
  retired: "Retired",
  "this-week": "Within 7 days",
  "this-month": "Within 30 days",
  "next-90-days": "Within 90 days",
  later: "Later",
  "floor-only": "No retirement announced",
};

export const ON_THE_DAY_LABELS: Record<OnTheDay, string> = {
  fails: "Requests fail",
  redirects: "Old name redirects to a new model",
  depends: "Depends on the deployment",
  "not-stated": "Not stated",
};

export const DATE_TYPE_PREFIX: Record<DateType, string> = {
  firm: "",
  earliest: "Earliest ",
  floor: "Not sooner than ",
};

const SOURCE = {
  anthropic: "https://platform.claude.com/docs/en/about-claude/model-deprecations",
  openaiApi: "https://developers.openai.com/api/docs/deprecations",
  chatgptRetiring: "https://help.openai.com/en/articles/20001051",
  chatgptNotes: "https://help.openai.com/en/articles/9624314-model-release-notes",
  geminiApi: "https://ai.google.dev/gemini-api/docs/deprecations",
  vertex: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions",
  vertexOpen: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/deprecations/open-models",
  foundry: "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule",
  bedrock: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html",
  xaiMay: "https://docs.x.ai/developers/migration/may-15-retirement",
  xaiImagine: "https://docs.x.ai/developers/migration/imagine-image-quality-nov-2",
  deepseek: "https://api-docs.deepseek.com/updates/",
  xiaomi: "https://kingy.ai/blog/mimo-v2-6-pro-free-access-pricing-setup/",
} as const;

/** All entries. Add new ones here; order does not matter because the page sorts by date. */
export const RETIREMENTS: readonly RetirementEntry[] = [
  // ---- Already retired ----
  { id: "claude-sonnet-4-api", name: "Claude Sonnet 4", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: ["claude-sonnet-4-20250514"], announcedOn: "2026-04-14", retiresOn: "2026-06-15", dateType: "firm", replacement: "claude-sonnet-4-6", onTheDay: "fails", note: "Anthropic says requests to retired models fail.", verification: "provider", sourceUrl: SOURCE.anthropic },
  { id: "claude-opus-4-api", name: "Claude Opus 4", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: ["claude-opus-4-20250514"], announcedOn: "2026-04-14", retiresOn: "2026-06-15", dateType: "firm", replacement: "claude-opus-4-8", onTheDay: "fails", note: "Announced together with Sonnet 4.", verification: "provider", sourceUrl: SOURCE.anthropic },
  { id: "claude-opus-4-1-api", name: "Claude Opus 4.1", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: ["claude-opus-4-1-20250805", "claude-opus-4-1"], announcedOn: "2026-06-05", retiresOn: "2026-08-05", dateType: "firm", replacement: "claude-opus-4-8", onTheDay: "fails", note: "Anthropic announced it on June 5. The August 5 date comes from a tracker. Still callable on Amazon Bedrock until Jan 8, 2027.", verification: "secondary", sourceUrl: SOURCE.anthropic },
  { id: "chatgpt-feb-2026", name: "GPT-4o, GPT-4.1, GPT-4.1 mini, o4-mini and GPT-5 (Instant and Thinking)", maker: "OpenAI", kind: "chat-app", platform: "ChatGPT app", modelIds: [], announcedOn: "2026-01-29", retiresOn: "2026-02-13", dateType: "firm", replacement: "GPT-5.3 Instant and GPT-5.4 Thinking (GPTs move automatically)", onTheDay: "not-stated", note: "Removed from ChatGPT only. The API kept these models at the time. Voice and Images were not changed.", verification: "provider", sourceUrl: SOURCE.chatgptRetiring },
  { id: "chatgpt-gpt-5-1", name: "GPT-5.1 (Instant, Thinking and Pro)", maker: "OpenAI", kind: "chat-app", platform: "ChatGPT app", modelIds: [], announcedOn: null, retiresOn: "2026-03-11", dateType: "firm", replacement: "Newer GPT-5 models", onTheDay: "not-stated", note: "Removed from normal chats and GPTs. Still in the API at the time.", verification: "provider", sourceUrl: SOURCE.chatgptRetiring },
  { id: "chatgpt-gpt-4-5", name: "GPT-4.5", maker: "OpenAI", kind: "chat-app", platform: "ChatGPT app", modelIds: [], announcedOn: "2026-05-28", retiresOn: "2026-06-27", dateType: "firm", replacement: null, onTheDay: "not-stated", note: "30-day sunset period.", verification: "provider", sourceUrl: SOURCE.chatgptNotes },
  { id: "chatgpt-o3", name: "OpenAI o3", maker: "OpenAI", kind: "chat-app", platform: "ChatGPT app", modelIds: [], announcedOn: "2026-05-28", retiresOn: "2026-08-26", dateType: "firm", replacement: null, onTheDay: "not-stated", note: "90-day sunset period.", verification: "provider", sourceUrl: SOURCE.chatgptNotes },
  { id: "xai-slugs-may-15", name: "Eight xAI model names", maker: "xAI", kind: "model", platform: "xAI API", modelIds: [], announcedOn: null, retiresOn: "2026-05-15", dateType: "firm", replacement: "grok-4.3", onTheDay: "redirects", note: "Old names keep answering from grok-4.3 and are billed at $1.25 in / $2.50 out per million tokens.", verification: "secondary", sourceUrl: SOURCE.xaiMay },
  { id: "gemini-2-0-flash", name: "Gemini 2.0 Flash", maker: "Google", kind: "model", platform: "Gemini API", modelIds: ["gemini-2.0-flash"], announcedOn: null, retiresOn: "2026-06-01", dateType: "earliest", replacement: "gemini-3.6-flash", onTheDay: "not-stated", note: "Google lists earliest possible dates. Confirm the actual date on Google's page.", verification: "secondary", sourceUrl: SOURCE.geminiApi },
  { id: "deepseek-chat-reasoner", name: "deepseek-chat and deepseek-reasoner", maker: "DeepSeek", kind: "model", platform: "DeepSeek API", modelIds: ["deepseek-chat", "deepseek-reasoner"], announcedOn: "2026-04-24", retiresOn: "2026-07-24", dateType: "firm", replacement: "deepseek-v4-flash", onTheDay: "redirects", note: "Both names already pointed at deepseek-v4-flash before the cut-off.", verification: "secondary", sourceUrl: SOURCE.deepseek },
  { id: "openai-jul-23-wave", name: "OpenAI snapshots shut down July 23 (including gpt-5-codex)", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-5-chat-latest", "gpt-5-codex", "gpt-5.1-codex", "gpt-5.2-codex"], announcedOn: "2026-04-22", retiresOn: "2026-07-23", dateType: "firm", replacement: "Per model, see OpenAI's page", onTheDay: "fails", note: "OpenAI's email listed 18 shutdowns for the day while its page showed 15 rows, so check your own email.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "openai-assistants-api", name: "Assistants API", maker: "OpenAI", kind: "feature", platform: "OpenAI API", modelIds: [], announcedOn: "2025-08-26", retiresOn: "2026-08-26", dateType: "firm", replacement: "Responses API and Conversations API", onTheDay: "fails", note: "An API migration, not a model swap: threads, runs and tools need new code.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "openai-sora-videos-api", name: "Sora 2 and the Videos API", maker: "OpenAI", kind: "feature", platform: "OpenAI API", modelIds: [], announcedOn: "2026-03-24", retiresOn: "2026-09-24", dateType: "firm", replacement: null, onTheDay: "fails", note: "OpenAI's page names no replacement.", verification: "provider", sourceUrl: SOURCE.openaiApi },
  { id: "vertex-gemini-2-5", name: "Gemini 2.5 Pro, Flash and Flash-Lite", maker: "Google", kind: "model", platform: "Vertex AI", modelIds: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.5-flash-lite"], announcedOn: null, retiresOn: "2026-10-20", dateType: "firm", replacement: "gemini-3.8-flash, gemini-3.5-flash or lighter models, per model", onTheDay: "fails", note: "Vertex AI only. The Gemini API had announced no date for these models on Oct 18.", verification: "secondary", sourceUrl: SOURCE.vertex },
  { id: "vertex-open-models", name: "16 open models served by Vertex AI (DeepSeek, GLM, Kimi, Llama, Qwen and others)", maker: "Several makers", kind: "model", platform: "Vertex AI", modelIds: ["deepseek-ocr-maas", "deepseek-r1-0528-maas", "deepseek-v3.1-maas", "deepseek-v3.2-maas", "glm-4.7-maas", "glm-5-maas", "gpt-oss-20b-maas", "kimi-k2-thinking-maas", "llama-3.3-70b-instruct-maas", "minimax-m2-maas", "multilingual-e5-large-instruct-maas", "multilingual-e5-small-maas", "qwen3-235b-a22b-instruct-2507-maas", "qwen3-coder-480b-a35b-instruct-maas", "qwen3-next-80b-a3b-instruct-maas", "qwen3-next-80b-a3b-thinking-maas"], announcedOn: null, retiresOn: "2026-10-21", dateType: "firm", replacement: null, onTheDay: "fails", note: "Google names no hosted replacement. Its page points to self-deploying the same weights from Model Garden.", verification: "secondary", sourceUrl: SOURCE.vertexOpen },
  { id: "xiaomi-mimo-v2-5", name: "MiMo V2.5 models", maker: "Xiaomi", kind: "model", platform: "Xiaomi API", modelIds: [], announcedOn: null, retiresOn: "2026-10-21", dateType: "firm", replacement: "MiMo V2.6 (same prices)", onTheDay: "not-stated", note: "Old model names stop working. Read through a tracker, not Xiaomi's own page.", verification: "secondary", sourceUrl: SOURCE.xiaomi },

  // ---- Upcoming ----
  { id: "gemini-api-oct-22", name: "Veo 3.1 previews and Gemini Omni Flash preview", maker: "Google", kind: "model", platform: "Gemini API", modelIds: ["veo-3.1-generate-preview", "veo-3.1-fast-generate-preview", "veo-3.1-lite-generate-preview", "gemini-omni-flash-preview"], announcedOn: null, retiresOn: "2026-10-22", dateType: "firm", replacement: "gemini-omni-1.1-flash (for the Omni preview)", onTheDay: "fails", note: "Preview models retire on short notice.", verification: "secondary", sourceUrl: SOURCE.geminiApi },
  { id: "openai-gpt-4-family-oct-23", name: "GPT-4 family and GPT-4o (May 2024 snapshot)", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-4", "gpt-4-0613", "gpt-4-turbo", "gpt-4-turbo-2024-04-09", "gpt-4-1106-preview", "gpt-4o-2024-05-13"], announcedOn: "2026-04-22", retiresOn: "2026-10-23", dateType: "firm", replacement: "gpt-5.6-sol", onTheDay: "fails", note: "Part of OpenAI's largest legacy wave. Requests return an error once the date passes.", verification: "provider", sourceUrl: SOURCE.openaiApi },
  { id: "openai-o-series-oct-23", name: "o1, o1-pro and o3-mini", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["o1", "o1-2024-12-17", "o1-pro", "o1-pro-2025-03-19", "o3-mini", "o3-mini-2025-01-31"], announcedOn: "2026-04-22", retiresOn: "2026-10-23", dateType: "firm", replacement: "gpt-5.6-sol (o1-pro: set reasoning.mode to pro)", onTheDay: "fails", note: "Same date as the GPT-4 family.", verification: "provider", sourceUrl: SOURCE.openaiApi },
  { id: "openai-small-legacy-oct-23", name: "GPT-3.5 Turbo and o4-mini", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-3.5-turbo", "gpt-3.5-turbo-0125", "o4-mini", "o4-mini-2025-04-16"], announcedOn: "2026-04-22", retiresOn: "2026-10-23", dateType: "firm", replacement: "gpt-5.6-terra", onTheDay: "fails", note: "o4-mini left ChatGPT on Feb 13, 2026 but stayed in the API until now.", verification: "provider", sourceUrl: SOURCE.openaiApi },
  { id: "openai-gpt-4-1-nano-oct-23", name: "GPT-4.1 nano", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-4.1-nano", "gpt-4.1-nano-2025-04-14"], announcedOn: "2026-04-22", retiresOn: "2026-10-23", dateType: "firm", replacement: "gpt-5.6-luna", onTheDay: "fails", note: "Other GPT-4.1 sizes retire later (see Jan 14, 2027).", verification: "provider", sourceUrl: SOURCE.openaiApi },
  { id: "openai-gpt-image-1-oct-23", name: "gpt-image-1", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-image-1"], announcedOn: "2026-04-22", retiresOn: "2026-10-23", dateType: "firm", replacement: "gpt-image-2", onTheDay: "fails", note: "One tracker lists gpt-image-2.5 models as the replacement instead. Check OpenAI's page.", verification: "provider", sourceUrl: SOURCE.openaiApi },
  { id: "openai-fine-tunes-oct-23", name: "Fine-tuned GPT-3.5, GPT-4, GPT-4.1 nano, o4-mini, babbage and davinci", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["ft-gpt-3.5-turbo", "ft-gpt-4", "ft-gpt-4.1-nano-2025-04-14", "ft-o4-mini-2025-04-16", "ft-babbage-002", "ft-davinci-002"], announcedOn: "2026-04-22", retiresOn: "2026-10-23", dateType: "firm", replacement: "Matching GPT-5.6 tier (terra, sol or luna)", onTheDay: "fails", note: "Fine-tunes follow their base model. You will need to retrain on the replacement.", verification: "provider", sourceUrl: SOURCE.openaiApi },
  { id: "xai-imagine-nov-2", name: "grok-imagine-image-quality", maker: "xAI", kind: "model", platform: "xAI API", modelIds: ["grok-imagine-image-quality"], announcedOn: null, retiresOn: "2026-11-02", dateType: "firm", replacement: "grok-imagine-image-2.0 (quality set to low)", onTheDay: "redirects", note: "Requests redirect and are billed at the new model's rate, which xAI says is $0.01 per image lower.", verification: "secondary", sourceUrl: SOURCE.xaiImagine },
  { id: "bedrock-claude-3-nov-13", name: "Claude 3 Haiku, 3 Sonnet, 3.5 Sonnet (v1, v2) and 3.7 Sonnet", maker: "Anthropic", kind: "model", platform: "Amazon Bedrock", modelIds: [], announcedOn: null, retiresOn: "2026-11-13", dateType: "firm", replacement: null, onTheDay: "fails", note: "Only in some Regions, for example Seoul, Mumbai, Singapore, London, Zurich, São Paulo and Canada Central. Check modelLifecycle in each Region you use.", verification: "secondary", sourceUrl: SOURCE.bedrock },
  { id: "foundry-haiku-4-5", name: "Claude Haiku 4.5", maker: "Anthropic", kind: "model", platform: "Microsoft Foundry", modelIds: ["claude-haiku-4-5", "claude-haiku-4-5-20251001"], announcedOn: null, retiresOn: "2026-11-15", dateType: "firm", replacement: null, onTheDay: "depends", note: "Still active on the Claude API, where no retirement is announced.", verification: "secondary", sourceUrl: SOURCE.foundry },
  { id: "gemini-api-nov-17", name: "Gemini live, native-audio and text-to-speech previews", maker: "Google", kind: "model", platform: "Gemini API", modelIds: ["gemini-3.1-flash-live-preview", "gemini-2.5-flash-native-audio-preview-12-2025", "gemini-3.1-flash-tts-preview", "gemini-2.5-flash-preview-tts", "gemini-2.5-pro-preview-tts"], announcedOn: null, retiresOn: "2026-11-17", dateType: "firm", replacement: "gemini-3.8-live or gemini-3.8-flash-tts", onTheDay: "fails", note: "Voice apps need new model IDs and a quality check.", verification: "secondary", sourceUrl: SOURCE.geminiApi },
  { id: "foundry-o-series-nov-19", name: "o1, o1-pro, o3, o3-pro, o3-mini and o4-mini", maker: "OpenAI", kind: "model", platform: "Microsoft Foundry", modelIds: ["o1", "o1-pro", "o3", "o3-pro", "o3-mini", "o4-mini"], announcedOn: null, retiresOn: "2026-11-19", dateType: "firm", replacement: "gpt-5.6-sol (o3-mini and o4-mini: gpt-5.6-terra)", onTheDay: "depends", note: "Standard deployments can auto-upgrade instead of failing, depending on the upgrade setting.", verification: "secondary", sourceUrl: SOURCE.foundry },
  { id: "foundry-opus-4-5", name: "Claude Opus 4.5", maker: "Anthropic", kind: "model", platform: "Microsoft Foundry", modelIds: ["claude-opus-4-5", "claude-opus-4-5-20251101"], announcedOn: null, retiresOn: "2026-11-24", dateType: "firm", replacement: null, onTheDay: "depends", note: "On the Claude API the same date is only a floor.", verification: "secondary", sourceUrl: SOURCE.foundry },
  { id: "claude-sonnet-4-5-api", name: "Claude Sonnet 4.5", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: ["claude-sonnet-4-5", "claude-sonnet-4-5-20250929"], announcedOn: null, retiresOn: "2026-11-30", dateType: "firm", replacement: "claude-sonnet-5-5", onTheDay: "fails", note: "Microsoft Foundry retires it the same day. An older tracker showed only a floor, so this date is recent.", verification: "secondary", sourceUrl: SOURCE.anthropic },
  { id: "openai-platform-nov-30", name: "OpenAI Evals, reusable prompts API and Agent Builder", maker: "OpenAI", kind: "feature", platform: "OpenAI API", modelIds: [], announcedOn: null, retiresOn: "2026-11-30", dateType: "firm", replacement: null, onTheDay: "fails", note: "Evals become read-only on Oct 31. Export your data first.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "openai-images-dec-1", name: "gpt-image-1-mini, gpt-image-1.5 and chatgpt-image-latest", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-image-1-mini", "gpt-image-1.5", "chatgpt-image-latest"], announcedOn: "2026-06-02", retiresOn: "2026-12-01", dateType: "firm", replacement: "gpt-image-2.5 models (named by one tracker)", onTheDay: "fails", note: "The removal date is on OpenAI's page. The replacement names come from a tracker.", verification: "provider", sourceUrl: SOURCE.openaiApi },
  { id: "openai-gpt-5-dec-11", name: "GPT-5 family and o3 snapshots", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-5", "gpt-5-2025-08-07", "gpt-5-mini", "gpt-5-mini-2025-08-07", "gpt-5-nano", "gpt-5-nano-2025-08-07", "gpt-5-pro", "gpt-5-pro-2025-10-06", "o3", "o3-2025-04-16", "o3-pro", "o3-pro-2025-06-10"], announcedOn: "2026-06-11", retiresOn: "2026-12-11", dateType: "firm", replacement: "gpt-5.6-sol, terra or luna by size (Pro models: sol with reasoning.mode set to pro)", onTheDay: "fails", note: "Six months' notice, as OpenAI promises for generally available models.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "openai-tts-jan-6", name: "tts-1, tts-1-hd and gpt-4o-mini-tts snapshots", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["tts-1", "tts-1-hd", "gpt-4o-mini-tts-2025-03-20", "gpt-4o-mini-tts-2025-12-15"], announcedOn: null, retiresOn: "2027-01-06", dateType: "firm", replacement: "gpt-realtime-2.1-mini", onTheDay: "fails", note: "The replacement is a realtime model, so the API shape changes too.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "openai-fine-tuning-new-jobs", name: "New fine-tuning jobs for existing OpenAI customers", maker: "OpenAI", kind: "feature", platform: "OpenAI API", modelIds: [], announcedOn: null, retiresOn: "2027-01-06", dateType: "firm", replacement: null, onTheDay: "not-stated", note: "Existing fine-tuned models keep running until their base model retires.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "bedrock-opus-4-1", name: "Claude Opus 4.1", maker: "Anthropic", kind: "model", platform: "Amazon Bedrock", modelIds: ["claude-opus-4-1-20250805", "claude-opus-4-1"], announcedOn: null, retiresOn: "2027-01-08", dateType: "firm", replacement: null, onTheDay: "fails", note: "Three US Regions. It already retired on the Claude API on Aug 5, 2026. Bedrock's extended-access pricing can differ.", verification: "secondary", sourceUrl: SOURCE.bedrock },
  { id: "openai-jan-14", name: "GPT-4o and GPT-4.1 snapshots, GPT-4o mini", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-4o-2024-08-06", "gpt-4o-2024-11-20", "gpt-4o-mini-2024-07-18", "gpt-4.1-2025-04-14", "gpt-4.1-mini-2025-04-14"], announcedOn: "2026-10-14", retiresOn: "2027-01-14", dateType: "firm", replacement: "gpt-6-luna", onTheDay: "fails", note: "Only three months' notice. Check whether your plain gpt-4o or gpt-4.1 alias points at one of these.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "foundry-opus-5-5-fast", name: "Claude Opus 5.5 fast", maker: "Anthropic", kind: "model", platform: "Microsoft Foundry", modelIds: ["claude-opus-5-5-fast"], announcedOn: null, retiresOn: "2027-01-15", dateType: "firm", replacement: null, onTheDay: "depends", note: "The fast variant on Foundry only. No retirement date was found for standard Opus 5.5.", verification: "secondary", sourceUrl: SOURCE.foundry },
  { id: "openai-realtime-jan-20", name: "Realtime and audio models (gpt-realtime, gpt-audio and mini versions)", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-realtime", "gpt-4o-realtime", "gpt-realtime-mini", "gpt-4o-mini-realtime", "gpt-audio", "gpt-audio-mini", "gpt-4o-audio", "gpt-4o-mini-audio"], announcedOn: "2026-07-20", retiresOn: "2027-01-20", dateType: "firm", replacement: "gpt-realtime-2.1, gpt-realtime-2.1-mini or gpt-audio-1.5", onTheDay: "fails", note: "Voice agents need a latency and voice-quality check on the new models.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "openai-whisper-feb-26", name: "whisper-1 and the GPT-4o transcribe models", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["whisper-1", "gpt-4o-transcribe", "gpt-4o-mini-transcribe", "gpt-4o-transcribe-diarize"], announcedOn: null, retiresOn: "2027-02-26", dateType: "firm", replacement: "gpt-transcribe or gpt-live-transcribe", onTheDay: "fails", note: "File translation moves to a realtime translations endpoint. Check timestamps and speaker labels still work.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "bedrock-open-weight-mar-30", name: "26 open-weight models on Bedrock (Llama, Qwen, DeepSeek, Gemma, Mistral and others)", maker: "Several makers", kind: "model", platform: "Amazon Bedrock", modelIds: [], announcedOn: null, retiresOn: "2027-03-30", dateType: "firm", replacement: null, onTheDay: "fails", note: "A large wave. Check modelLifecycle per Region for the exact list.", verification: "secondary", sourceUrl: SOURCE.bedrock },
  { id: "openai-apr-1", name: "GPT-5.1, GPT-5.3-Codex and GPT-5.4 nano", maker: "OpenAI", kind: "model", platform: "OpenAI API", modelIds: ["gpt-5.1", "gpt-5.3-codex", "gpt-5.4-nano"], announcedOn: "2026-10-01", retiresOn: "2027-04-01", dateType: "firm", replacement: "gpt-6-sol (GPT-5.1, GPT-5.3-Codex) or gpt-6-luna (GPT-5.4 nano)", onTheDay: "fails", note: "Six months' notice.", verification: "secondary", sourceUrl: SOURCE.openaiApi },
  { id: "vertex-embeddings-apr-1", name: "Vertex AI text and multimodal embedding models", maker: "Google", kind: "model", platform: "Vertex AI", modelIds: ["text-embedding-004", "text-embedding-005", "text-multilingual-embedding-002", "multimodalembedding@001"], announcedOn: null, retiresOn: "2027-04-01", dateType: "firm", replacement: null, onTheDay: "fails", note: "A new embedding model makes different vectors, so you must re-index your documents, not just change a name.", verification: "secondary", sourceUrl: SOURCE.vertex },

  // ---- Floors: active models with a "not sooner than" date ----
  { id: "claude-haiku-4-5-floor", name: "Claude Haiku 4.5", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: [], announcedOn: null, retiresOn: "2026-10-15", dateType: "floor", replacement: null, onTheDay: "fails", note: "This floor has passed and the model is still active. A real retirement needs at least 60 days' notice first.", verification: "secondary", sourceUrl: SOURCE.anthropic },
  { id: "claude-opus-4-5-floor", name: "Claude Opus 4.5", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: [], announcedOn: null, retiresOn: "2026-11-24", dateType: "floor", replacement: null, onTheDay: "fails", note: "Foundry retires it on this date.", verification: "secondary", sourceUrl: SOURCE.anthropic },
  { id: "claude-opus-4-6-floor", name: "Claude Opus 4.6", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: ["claude-opus-4-6"], announcedOn: null, retiresOn: "2027-02-05", dateType: "floor", replacement: null, onTheDay: "fails", note: "Foundry retires it on Feb 2, 2027, three days earlier.", verification: "secondary", sourceUrl: SOURCE.anthropic },
  { id: "claude-sonnet-4-6-floor", name: "Claude Sonnet 4.6", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: ["claude-sonnet-4-6"], announcedOn: null, retiresOn: "2027-02-17", dateType: "floor", replacement: null, onTheDay: "fails", note: "Foundry retires it on Feb 10, 2027, a week earlier.", verification: "secondary", sourceUrl: SOURCE.anthropic },
  { id: "claude-opus-4-7-floor", name: "Claude Opus 4.7", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: ["claude-opus-4-7"], announcedOn: null, retiresOn: "2027-04-16", dateType: "floor", replacement: null, onTheDay: "fails", note: "Foundry retires it on Apr 6, 2027, ten days earlier.", verification: "secondary", sourceUrl: SOURCE.anthropic },
  { id: "claude-opus-4-8-floor", name: "Claude Opus 4.8", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: ["claude-opus-4-8"], announcedOn: null, retiresOn: "2027-05-28", dateType: "floor", replacement: null, onTheDay: "fails", note: "Named as the replacement for several retired Opus models.", verification: "secondary", sourceUrl: SOURCE.anthropic },
  { id: "claude-sonnet-5-floor", name: "Claude Sonnet 5", maker: "Anthropic", kind: "model", platform: "Claude API", modelIds: ["claude-sonnet-5"], announcedOn: null, retiresOn: "2027-06-30", dateType: "floor", replacement: null, onTheDay: "fails", note: "Foundry also lists Jun 30, 2027 as a retirement date.", verification: "secondary", sourceUrl: SOURCE.anthropic },
];