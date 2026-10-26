export interface HelpLink {
  href: string;
  label: string;
}

/** Example searches shown before anything is typed. */
export const POPULAR_QUERIES: readonly string[] = [
  "prompts",
  "hallucination",
  "GPT-6.1 Sol",
  "privacy",
  "API price",
  "retirements",
  "EU AI Act",
  "best coding model",
  "free plan",
  "token",
];

/** Links offered when a search finds nothing (Blueprint 5.1: Learn hub, glossary, model directory). */
export const HELP_LINKS: readonly HelpLink[] = [
  { href: "/learn", label: "Learn hub" },
  { href: "/learn/glossary", label: "Glossary" },
  { href: "/compare/models", label: "Model directory" },
  { href: "/prices", label: "Prices and data" },
  { href: "/tools", label: "Free tools" },
  { href: "/sitemap", label: "Sitemap" },
];

export const SEARCH_TIPS: readonly string[] = [
  "Use two or three key words. Extra words make results narrower.",
  "Try a model name such as GPT-6 or Claude, or a term such as token or RAG.",
  "Pick a level to hide pages above or below your depth.",
  "Press / on any page to jump to the search box.",
];

export const NO_RESULTS_TIPS: readonly string[] = [
  "Use fewer words, or a more general word.",
  "Check the spelling, or try a different word for the same idea.",
  "Remove any filters you added.",
  "Browse a hub instead, using the links below.",
];