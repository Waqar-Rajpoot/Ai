export type AlternativeKind = "app" | "model";
export type AlternativeKindFilter = "all" | AlternativeKind;

export interface AlternativeEntry {
  /** Route segment under /compare/alternatives. */
  slug: string;
  name: string;
  maker: string;
  kind: AlternativeKind;
  summary: string;
  /** Set to true when the matching /compare/alternatives/[tool] page is live. */
  isPublished: boolean;
}

export const ALTERNATIVES_ROUTE = "/compare/alternatives";

export const KIND_LABELS: Record<AlternativeKind, string> = { app: "App", model: "Model" };

export const KIND_FILTER_OPTIONS: readonly { value: AlternativeKindFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "app", label: "Apps" },
  { value: "model", label: "Models" },
];

/** Launch entries: the four apps in the app comparison and four flagship models from the directory. */
export const ALTERNATIVE_ENTRIES: readonly AlternativeEntry[] = [
  { slug: "chatgpt", name: "ChatGPT", maker: "OpenAI", kind: "app", summary: "Other chat apps to consider if ChatGPT's plans, limits or settings do not suit you, and what you would give up by moving.", isPublished: false },
  { slug: "claude", name: "Claude", maker: "Anthropic", kind: "app", summary: "Other chat apps to consider if Claude's plans, usage limits or features do not suit you, and what you would give up by moving.", isPublished: false },
  { slug: "gemini", name: "Gemini", maker: "Google", kind: "app", summary: "Other chat apps to consider if Gemini's plans, limits or features do not suit you, and what you would give up by moving.", isPublished: false },
  { slug: "grok", name: "Grok", maker: "xAI", kind: "app", summary: "Other chat apps to consider if Grok's plans, limits or features do not suit you, and what you would give up by moving.", isPublished: false },
  { slug: "claude-opus-5-5", name: "Claude Opus 5.5", maker: "Anthropic", kind: "model", summary: "Other models to consider if Claude Opus 5.5 does not fit your budget, speed or privacy needs, compared on price and tested tasks.", isPublished: false },
  { slug: "gpt-6-1-sol", name: "GPT-6.1 Sol", maker: "OpenAI", kind: "model", summary: "Other models to consider if GPT-6.1 Sol does not fit your budget, speed or privacy needs, compared on price and tested tasks.", isPublished: false },
  { slug: "gemini-4-argon", name: "Gemini 4 Argon", maker: "Google", kind: "model", summary: "Other models to consider if Gemini 4 Argon does not fit your budget, speed or privacy needs, compared on price and tested tasks.", isPublished: false },
  { slug: "grok-4-7", name: "Grok 4.7", maker: "xAI", kind: "model", summary: "Other models to consider if Grok 4.7 does not fit your budget, speed or privacy needs, compared on price and tested tasks.", isPublished: false },
];

/** Route to one alternatives page. */
export function alternativeHref(entry: AlternativeEntry): string {
  return `${ALTERNATIVES_ROUTE}/${entry.slug}`;
}

/** Filters entries by kind and by a text search over name, maker and summary. */
export function filterAlternatives(
  entries: readonly AlternativeEntry[],
  kind: AlternativeKindFilter,
  query: string,
): AlternativeEntry[] {
  const normalizedQuery = query.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesKind = kind === "all" || entry.kind === kind;
    const matchesQuery =
      normalizedQuery === "" || [entry.name, entry.maker, entry.summary].some((text) => text.toLowerCase().includes(normalizedQuery));
    return matchesKind && matchesQuery;
  });
}
