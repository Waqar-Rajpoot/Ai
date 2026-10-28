import type { GuideSource } from "../guideTypes";

/**
 * Sources for the Expert guides (articles 26 to 29) and the linked open-versus-closed page (25).
 * One record per source, so a re-check updates every guide that cites it.
 * `verifiedOn` is the day each page was opened and the claims made from it were confirmed.
 * Sources shared with Level 3 (OWASP, MCP security, Anthropic agents) stay in
 * `powerUserSources.ts` and are imported by the guides that need them.
 */
const VERIFIED_ON = "2026-10-27";

export const EXPERT_SOURCES = {
  ollamaReadme: {
    id: "ollama-readme",
    title: "Ollama README",
    publisher: "Ollama (GitHub)",
    url: "https://github.com/ollama/ollama/blob/main/README.md",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  huggingFaceGguf: {
    id: "huggingface-gguf",
    title: "GGUF",
    publisher: "Hugging Face Hub documentation",
    url: "https://www.huggingface.co/docs/hub/en/gguf",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  chatbotArena: {
    id: "chatbot-arena",
    title: "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference",
    publisher: "arXiv (Chiang and others, 2024)",
    url: "https://arxiv.org/abs/2403.04132v1",
    kind: "research",
    verifiedOn: VERIFIED_ON,
  },
  promptFormatSensitivity: {
    id: "prompt-format-sensitivity",
    title: "Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design (preprint)",
    publisher: "arXiv (Sclar and others, 2023)",
    url: "https://arxiv.org/abs/2310.11324v1",
    kind: "research",
    verifiedOn: VERIFIED_ON,
  },
  benchmarkContamination: {
    id: "benchmark-contamination",
    title: "Benchmark Data Contamination of Large Language Models: A Survey (preprint)",
    publisher: "arXiv (2024)",
    url: "https://arxiv.org/abs/2406.04244v1",
    kind: "research",
    verifiedOn: VERIFIED_ON,
  },
  ncscPromptInjection: {
    id: "ncsc-prompt-injection",
    title: "Prompt injection is not SQL injection (it may be worse)",
    publisher: "UK National Cyber Security Centre",
    url: "https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection",
    kind: "government",
    verifiedOn: VERIFIED_ON,
  },
  euAiActTimeline: {
    id: "eu-ai-act-timeline",
    title: "Timeline for the Implementation of the EU AI Act",
    publisher: "European Commission, AI Act Service Desk",
    url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act",
    kind: "government",
    verifiedOn: VERIFIED_ON,
  },
  euAiActOverview: {
    id: "eu-ai-act-overview",
    title: "AI Act",
    publisher: "European Commission, Shaping Europe's digital future",
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    kind: "government",
    verifiedOn: VERIFIED_ON,
  },
  euAiActFaq: {
    id: "eu-ai-act-faq",
    title: "Navigating the AI Act (FAQ)",
    publisher: "European Commission, Shaping Europe's digital future",
    url: "https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act",
    kind: "government",
    verifiedOn: VERIFIED_ON,
  },
  osaid: {
    id: "osaid",
    title: "The Open Source AI Definition",
    publisher: "Open Source Initiative",
    url: "https://opensource.org/ai/open-source-ai-definition",
    kind: "research",
    verifiedOn: VERIFIED_ON,
  },
  osiOpenWeights: {
    id: "osi-open-weights",
    title: "Open Weights Are Good. Open Source Is Better.",
    publisher: "Open Source Initiative",
    url: "https://opensource.org/blog/open-weights-are-good-open-source-is-better",
    kind: "research",
    verifiedOn: VERIFIED_ON,
  },
} as const satisfies Record<string, GuideSource>;
