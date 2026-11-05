import type { PageKind, PageLevel } from "./sitemapTypes";

/**
 * Paths that are published. Add a path here the day its page goes live.
 * Everything else in the registry shows as "coming soon" and is left out of sitemap.xml.
 */
export const PUBLISHED_PATHS: ReadonlySet<string> = new Set([
  "/",
  // Learn
  "/learn",
  "/learn/glossary",
  "/learn/foundations",
  "/learn/foundations/what-is-ai",
  "/learn/foundations/how-ai-chatbots-work",
  "/learn/foundations/write-better-prompts",
  "/learn/foundations/free-vs-paid-ai",
  "/learn/foundations/never-share-with-ai-chatbot",
  "/learn/foundations/ai-scams-and-deepfakes",
  "/learn/practitioner",
  "/learn/practitioner/fact-check-ai-answers",
  "/learn/practitioner/use-ai-to-study-without-cheating",
  "/learn/practitioner/summarize-pdf-with-ai",
  "/learn/practitioner/ai-for-email-and-writing-at-work",
  "/learn/practitioner/ai-resume-and-interview-prep",
  "/learn/practitioner/deep-research-modes",
  "/learn/practitioner/is-ai-worth-paying-for",
  "/learn/practitioner/where-ai-helps-and-fails",
  "/learn/power-user",
  "/learn/power-user/context-windows-tokens-memory",
  "/learn/power-user/reasoning-models-effort-settings",
  "/learn/power-user/rag-explained",
  "/learn/power-user/ai-agents-explained",
  "/learn/power-user/mcp-and-connectors",
  "/learn/power-user/ai-api-pricing-for-non-engineers",
  "/learn/power-user/build-your-own-ai-test-set",
  "/learn/expert",
  "/learn/expert/run-ai-on-your-own-computer",
  "/learn/expert/how-to-read-ai-benchmark",
  "/learn/expert/prompt-injection-agent-security",
  "/learn/expert/eu-ai-act-for-everyday-users",
  // Compare
  "/compare",
  "/compare/models",
  "/compare/apps",
  "/compare/open-vs-closed",
  "/compare/alternatives",
  "/compare/reviews",
  "/compare/reviews/claude-opus-5-5",
  "/compare/reviews/gpt-6-1-sol",
  "/compare/reviews/gpt-6-astra",
  "/compare/reviews/claude-fable-5-1",
  "/compare/reviews/claude-sonnet-5-5",
  "/compare/reviews/gemini-4-argon",
  "/compare/reviews/gemini-3-8-flash",
  "/compare/reviews/claude-haiku-5-5",
  "/compare/reviews/gpt-6-luna",
  "/compare/reviews/grok-4-7",
  "/compare/reviews/mimo-v2-6-pro",
  "/compare/reviews/kimi-k3",
  "/compare/reviews/qwen3-8-max-27b",
  "/compare/reviews/deepseek-v4-1-flash",
  "/compare/best",
  "/compare/best/overall",
  "/compare/best/by-job",
  "/compare/best/coding",
  "/compare/best/writing",
  "/compare/best/agents",
  "/compare/best/value",
  "/compare/best/cheap-and-fast",
  "/compare/best/open-weights",
  "/compare/best/local",
  "/compare/best/students",
  "/compare/best/small-business",
  "/compare/best/image",
  "/compare/best/video",
  "/compare/vs",
  "/compare/vs/claude-opus-5-5-vs-gpt-6-1-sol",
  // Prices
  "/prices",
  "/prices/plans",
  "/prices/api",
  "/prices/free-limits",
  "/prices/features",
  "/prices/privacy",
  "/prices/retirements",
  "/prices/benchmarks",
  // Tools
  "/tools",
  "/tools/which-ai-fits-me",
  "/tools/subscription-cost-calculator",
  "/tools/api-cost-calculator",
  "/tools/token-estimator",
  "/tools/local-model-memory",
  "/tools/prompt-library",
  "/tools/benchmark-checklist",
  "/tools/ai-safety-checklist",
  "/tools/cheat-sheets",
  // Society
  "/society",
  "/society/ten-places-you-meet-ai",
  "/society/role-of-ai-in-our-lives",
  "/society/pros-and-cons-of-ai",
  "/society/is-ai-taking-jobs",
  "/society/industries-changing-most",
  "/society/future-of-ai",
  "/society/ai-power-use",
  "/society/ai-in-education",
  "/society/ai-in-banking-and-finance",
  "/society/ai-adoption-data",
  "/society/ai-myths-and-facts",
  // News
  "/news",
  "/news/weekly",
  "/news/eu-ai-act",
  "/news/changelog",
  // About, newsletter and legal
  "/about",
  "/about/editorial-standards",
  "/about/how-we-test",
  "/about/source-policy",
  "/about/independence",
  "/about/corrections",
  "/newsletter",
  "/sponsored",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/search",
  "/sitemap",
]);

/** Published pages that stay out of sitemap.xml. Search has no content of its own to index. */
export const XML_EXCLUDED_PATHS: ReadonlySet<string> = new Set(["/search"]);

/** Last meaningful update per published page (YYYY-MM-DD). Only published pages may appear here. */
export const UPDATED_ON: Readonly<Record<string, string>> = {
  "/prices/free-limits": "2026-10-21",
  "/society/industries-changing-most": "2026-10-25",
  "/news/changelog": "2026-10-25",
  "/news/eu-ai-act": "2026-10-25",
  "/sitemap": "2026-10-25",
};

export const RECENT_LIMIT = 5;

export const LEVEL_LABELS: Record<PageLevel, string> = {
  1: "Level 1 · Foundations",
  2: "Level 2 · Practitioner",
  3: "Level 3 · Power user",
  4: "Level 4 · Expert",
};

export const LEVEL_BLURBS: Record<PageLevel, string> = {
  1: "You have never used AI, or only played with it. Start here.",
  2: "You use AI at work or school and want better results.",
  3: "You care about settings, costs, tools and how things work.",
  4: "You build, test, secure or regulate AI.",
};

export const KIND_LABELS: Record<PageKind, string> = {
  hub: "Hub",
  article: "Guide",
  review: "Review",
  comparison: "Comparison",
  data: "Data table",
  tool: "Free tool",
  news: "News",
  trust: "Trust",
  legal: "Legal",
  utility: "Utility",
  money: "Support the site",
};

export const SEARCH_PLACEHOLDER = "Search all pages, for example prices, EU, coding, scams";
export const XML_SITEMAP_PATH = "/sitemap.xml";