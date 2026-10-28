import type { GuideSource } from "../guideTypes";

/**
 * Sources for the Power user guides (articles 17 to 23) and the head-to-head page (24).
 * One record per source, so a re-check updates every guide that cites it.
 * `verifiedOn` is the day each page was opened and the claims made from it were confirmed.
 * Sources shared with Level 2 (for example the "Lost in the Middle" preprint) stay in
 * `practitionerSources.ts` and are imported by the guides that need them.
 */
const VERIFIED_ON = "2026-10-27";

export const POWER_USER_SOURCES = {
  openaiTokens: {
    id: "openai-tokens",
    title: "What are tokens and how to count them?",
    publisher: "OpenAI Help Center",
    url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  anthropicContextWindows: {
    id: "anthropic-context-windows",
    title: "Context windows",
    publisher: "Claude Platform Docs (Anthropic)",
    url: "https://platform.claude.com/docs/en/build-with-claude/context-windows",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  openaiReasoning: {
    id: "openai-reasoning",
    title: "Reasoning models",
    publisher: "OpenAI API documentation",
    url: "https://developers.openai.com/api/docs/guides/reasoning",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  anthropicExtendedThinking: {
    id: "anthropic-extended-thinking",
    title: "Building with extended thinking",
    publisher: "Claude Platform Docs (Anthropic)",
    url: "https://platform.claude.com/docs/build-with-claude/extended-thinking",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  lewisRag: {
    id: "lewis-rag",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (preprint and NeurIPS 2020 paper)",
    publisher: "arXiv (Lewis and others)",
    url: "https://arxiv.org/abs/2005.11401v4",
    kind: "research",
    verifiedOn: VERIFIED_ON,
  },
  anthropicContextualRetrieval: {
    id: "anthropic-contextual-retrieval",
    title: "Introducing Contextual Retrieval",
    publisher: "Anthropic",
    url: "https://anthropic.com/news/contextual-retrieval",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  anthropicBuildingAgents: {
    id: "anthropic-building-agents",
    title: "Building effective agents",
    publisher: "Anthropic Engineering",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  owaspPromptInjection: {
    id: "owasp-prompt-injection",
    title: "LLM01:2025 Prompt Injection",
    publisher: "OWASP Gen AI Security Project",
    url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
    kind: "research",
    verifiedOn: VERIFIED_ON,
  },
  mcpIntroduction: {
    id: "mcp-introduction",
    title: "What is the Model Context Protocol (MCP)?",
    publisher: "Model Context Protocol project",
    url: "https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  mcpSecurity: {
    id: "mcp-security",
    title: "Security Best Practices",
    publisher: "Model Context Protocol project",
    url: "https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices.md",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  anthropicPromptCaching: {
    id: "anthropic-prompt-caching",
    title: "Prompt caching",
    publisher: "Claude Platform Docs (Anthropic)",
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  anthropicBatches: {
    id: "anthropic-batches",
    title: "Batch processing",
    publisher: "Claude Platform Docs (Anthropic)",
    url: "https://platform.claude.com/docs/en/build-with-claude/message-batches",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  anthropicEvals: {
    id: "anthropic-evals",
    title: "Define success criteria and build evaluations",
    publisher: "Claude Platform Docs (Anthropic)",
    url: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
} as const satisfies Record<string, GuideSource>;
