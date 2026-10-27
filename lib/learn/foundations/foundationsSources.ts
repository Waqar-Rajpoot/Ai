import type { GuideSource } from "../guideTypes";

/**
 * Official sources shared by the Foundations guides. One record per source, so a
 * re-check updates every guide that cites it. `verifiedOn` is the day a person
 * last opened the page and confirmed the claims made from it.
 */
const VERIFIED_ON = "2026-10-26";

export const FOUNDATIONS_SOURCES = {
  oecdDefinition: {
    id: "oecd-definition",
    title: "Updates to the OECD's definition of an AI system explained",
    publisher: "OECD.AI",
    url: "https://oecd.ai/en/wonk/ai-system-definition-update",
    kind: "intergovernmental",
    verifiedOn: VERIFIED_ON,
  },
  openaiHallucinate: {
    id: "openai-hallucinate",
    title: "Why language models hallucinate",
    publisher: "OpenAI",
    url: "https://openai.com/index/why-language-models-hallucinate/",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  openaiTokens: {
    id: "openai-tokens",
    title: "What are tokens and how to count them?",
    publisher: "OpenAI Help Center",
    url: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  anthropicClearDirect: {
    id: "anthropic-clear-direct",
    title: "Be clear, direct, and detailed",
    publisher: "Anthropic",
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/be-clear-and-direct",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  openaiAdsHelp: {
    id: "openai-ads-help",
    title: "Ads in ChatGPT",
    publisher: "OpenAI Help Center",
    url: "https://help.openai.com/en/articles/20001047",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  openaiAdsAnnouncement: {
    id: "openai-ads-announcement",
    title: "Our approach to advertising and expanding access to ChatGPT",
    publisher: "OpenAI",
    url: "https://openai.com/index/our-approach-to-advertising-and-expanding-access/",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  anthropicAdFree: {
    id: "anthropic-ad-free",
    title: "Claude is a space to think",
    publisher: "Anthropic",
    url: "https://www.anthropic.com/news/claude-is-a-space-to-think",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  openaiDataUse: {
    id: "openai-data-use",
    title: "How your data is used to improve model performance",
    publisher: "OpenAI Help Center",
    url: "https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  openaiDataControls: {
    id: "openai-data-controls",
    title: "Data Controls FAQ",
    publisher: "OpenAI Help Center",
    url: "https://help.openai.com/en/articles/7730893-data-controls-faq",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  anthropicPrivacySetting: {
    id: "anthropic-privacy-setting",
    title: "How do I change my model improvement privacy settings?",
    publisher: "Anthropic Privacy Center",
    url: "https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  googleGeminiPrivacy: {
    id: "google-gemini-privacy",
    title: "Gemini Apps Privacy Notice",
    publisher: "Google Help",
    url: "https://support.google.com/gemini/answer/13594961",
    kind: "vendor-reported",
    verifiedOn: VERIFIED_ON,
  },
  ncscChatbots: {
    id: "ncsc-chatbots",
    title: "ChatGPT and large language models: what's the risk? (March 2023)",
    publisher: "UK National Cyber Security Centre",
    url: "https://www.ncsc.gov.uk/blog-post/chatgpt-and-large-language-models-whats-the-risk",
    kind: "government",
    verifiedOn: VERIFIED_ON,
  },
  fbiGenerativeAiFraud: {
    id: "fbi-generative-ai-fraud",
    title: "Criminals Use Generative Artificial Intelligence to Facilitate Financial Fraud (December 2024)",
    publisher: "FBI Internet Crime Complaint Center",
    url: "https://www.ic3.gov/psa/2024/PSA241203",
    kind: "government",
    verifiedOn: VERIFIED_ON,
  },
  ftcFamilyEmergency: {
    id: "ftc-family-emergency",
    title: "Family emergency scams",
    publisher: "US Federal Trade Commission",
    url: "https://consumer.ftc.gov/articles/0204-family-emergency-scams",
    kind: "government",
    verifiedOn: VERIFIED_ON,
  },
} as const satisfies Record<string, GuideSource>;
