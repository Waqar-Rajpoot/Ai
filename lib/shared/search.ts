import { getLevelFromSlug, LEVEL_DEFINITIONS, LEVEL_ORDER, type LevelType } from "./levels";
import {
  DESCRIPTION_WEIGHTS,
  FUZZY_KEYWORD_WEIGHT,
  FUZZY_LONG_TOKEN_LENGTH,
  FUZZY_MIN_TOKEN_LENGTH,
  FUZZY_TITLE_WEIGHT,
  HIGHLIGHT_PLAIN_MIN_LENGTH,
  KEYWORD_WEIGHTS,
  LABEL_WEIGHT,
  MAX_QUERY_LENGTH,
  MAX_QUERY_TOKENS,
  PHRASE_BONUS,
  SHORT_TOKEN_MAX_LENGTH,
  STOP_WORDS,
  SUBSTRING_MIN_TOKEN_LENGTH,
  SUGGESTION_MIN_TOKEN_LENGTH,
  SUGGESTION_MIN_WORD_LENGTH,
  TITLE_WEIGHTS,
  type MatchLevel,
} from "./searchConstants";

export type SearchSection =
  | "guides" | "glossary" | "reviews" | "tools" | "compare" | "prices" | "society" | "news" | "about";

/** Display order of sections. Guides, glossary, reviews and tools come first (Blueprint 5.1). */
export const SECTION_ORDER: readonly SearchSection[] = [
  "guides", "glossary", "reviews", "tools", "compare", "prices", "society", "news", "about",
];

export const SECTION_LABELS: Record<SearchSection, string> = {
  guides: "Guides",
  glossary: "Glossary",
  reviews: "Reviews",
  tools: "Tools",
  compare: "Compare",
  prices: "Prices and data",
  society: "AI & Society",
  news: "News",
  about: "About and help",
};

export const SECTION_DESCRIPTIONS: Record<SearchSection, string> = {
  guides: "Step-by-step guides in four levels",
  glossary: "Plain-English definitions",
  reviews: "Tested reviews of 14 models",
  tools: "Calculators, quizzes and checklists",
  compare: "Directory, roundups and head-to-heads",
  prices: "Plans, API costs, limits and benchmarks",
  society: "How AI is changing life and work",
  news: "Releases, roundups and the EU AI Act",
  about: "How we work, contact and legal pages",
};

export interface SearchEntry {
  id: string;
  title: string;
  description: string;
  /** Route, optionally with a #anchor. */
  href: string;
  section: SearchSection;
  /** Short type label shown on the result, such as "Guide" or "Glossary term". */
  kind: string;
  /** Null for pages that apply to every level. They are hidden when a level filter is on. */
  level: LevelType | null;
  keywords: readonly string[];
}

export type SectionFilter = SearchSection | "all";
export type LevelFilter = LevelType | "all";
export type SearchSort = "relevance" | "title";

export interface SearchState {
  query: string;
  section: SectionFilter;
  level: LevelFilter;
  sort: SearchSort;
}

export const DEFAULT_SEARCH_STATE: SearchState = { query: "", section: "all", level: "all", sort: "relevance" };

/**
 * browse: no words typed. all-words: every word matched. some-words: only some did.
 * similar-spelling: matched only after allowing a typo. none: nothing matched.
 */
export type MatchMode = "browse" | "all-words" | "some-words" | "similar-spelling" | "none";

export interface SearchHit {
  entry: SearchEntry;
  score: number;
  matchedTokens: number;
}

export interface SearchOutcome {
  mode: MatchMode;
  /** Query words after stop words are removed. Used for highlighting. */
  tokens: string[];
  /** Hits after the section and level filters. */
  hits: SearchHit[];
  /** Hits before any filter. */
  totalBeforeFilters: number;
  /** Counts per section, with the level filter applied. */
  sectionCounts: Record<SectionFilter, number>;
  /** Counts per level, with the section filter applied. */
  levelCounts: Record<LevelFilter, number>;
  /** A corrected query, when the words look misspelled. */
  suggestion: string | null;
}

export interface HighlightSegment {
  text: string;
  isMatch: boolean;
}

interface PreparedEntry {
  entry: SearchEntry;
  title: string;
  titleWords: string[];
  keywordPhrases: string[];
  keywordWords: string[];
  descriptionWords: string[];
  labelWords: string[];
}

export interface SearchIndex {
  entries: readonly SearchEntry[];
  prepared: readonly PreparedEntry[];
  /** Distinct title and keyword words, used to suggest corrections. */
  vocabulary: readonly string[];
}

/** Lower-cases, removes accents, and turns every run of punctuation into one space. */
export function normalizeText(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function toWords(text: string): string[] {
  return normalizeText(text).split(" ").filter(Boolean);
}

/** Query words without stop words. If only stop words were typed, they are kept. */
export function getSearchTokens(query: string): string[] {
  const words = toWords(query.slice(0, MAX_QUERY_LENGTH));
  const meaningful = words.filter((word) => !STOP_WORDS.has(word));
  return [...new Set(meaningful.length > 0 ? meaningful : words)].slice(0, MAX_QUERY_TOKENS);
}

/** Number of single-character edits (insert, delete, replace) between two words. */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const previous = Array.from({ length: b.length + 1 }, (_, column) => column);
  for (let row = 1; row <= a.length; row += 1) {
    let diagonal = previous[0];
    previous[0] = row;
    for (let column = 1; column <= b.length; column += 1) {
      const above = previous[column];
      const cost = a[row - 1] === b[column - 1] ? 0 : 1;
      previous[column] = Math.min(previous[column] + 1, previous[column - 1] + 1, diagonal + cost);
      diagonal = above;
    }
  }
  return previous[b.length];
}

function maxEditDistance(token: string): number {
  return token.length >= FUZZY_LONG_TOKEN_LENGTH ? 2 : 1;
}

function hasFuzzyWord(token: string, words: readonly string[]): boolean {
  if (token.length < FUZZY_MIN_TOKEN_LENGTH) return false;
  const limit = maxEditDistance(token);
  return words.some((word) => Math.abs(word.length - token.length) <= limit && editDistance(token, word) <= limit);
}

function wordMatchLevel(token: string, word: string): MatchLevel {
  if (word === token) return 3;
  if (token.length > SHORT_TOKEN_MAX_LENGTH && word.startsWith(token)) return 2;
  if (token.length >= SUBSTRING_MIN_TOKEN_LENGTH && word.includes(token)) return 1;
  return 0;
}

function bestMatchLevel(token: string, words: readonly string[]): MatchLevel {
  let best: MatchLevel = 0;
  for (const word of words) {
    const level = wordMatchLevel(token, word);
    if (level > best) best = level;
    if (best === 3) break;
  }
  return best;
}

function prepareEntry(entry: SearchEntry): PreparedEntry {
  const keywordPhrases = entry.keywords.map(normalizeText).filter(Boolean);
  return {
    entry,
    title: normalizeText(entry.title),
    titleWords: toWords(entry.title),
    keywordPhrases,
    keywordWords: keywordPhrases.flatMap((phrase) => phrase.split(" ")),
    descriptionWords: toWords(entry.description),
    labelWords: toWords(`${entry.kind} ${SECTION_LABELS[entry.section]}`),
  };
}

/** Prepares entries once, so each keystroke only does scoring. */
export function createSearchIndex(entries: readonly SearchEntry[]): SearchIndex {
  const prepared = entries.map(prepareEntry);
  const words = new Set<string>();
  for (const item of prepared) {
    for (const word of [...item.titleWords, ...item.keywordWords]) {
      if (word.length >= SUGGESTION_MIN_WORD_LENGTH && !/^\d+$/.test(word)) words.add(word);
    }
  }
  return { entries, prepared, vocabulary: [...words] };
}

function scoreToken(token: string, item: PreparedEntry, allowFuzzy: boolean): number {
  let score =
    TITLE_WEIGHTS[bestMatchLevel(token, item.titleWords)] +
    KEYWORD_WEIGHTS[bestMatchLevel(token, item.keywordWords)] +
    DESCRIPTION_WEIGHTS[bestMatchLevel(token, item.descriptionWords)];
  if (item.labelWords.some((word) => word === token || (token.length > SHORT_TOKEN_MAX_LENGTH && word.startsWith(token)))) {
    score += LABEL_WEIGHT;
  }
  if (score === 0 && allowFuzzy) {
    if (hasFuzzyWord(token, item.titleWords)) score = FUZZY_TITLE_WEIGHT;
    else if (hasFuzzyWord(token, item.keywordWords)) score = FUZZY_KEYWORD_WEIGHT;
  }
  return score;
}

function phraseBonus(item: PreparedEntry, normalizedQuery: string): number {
  if (normalizedQuery.length === 0) return 0;
  if (item.title === normalizedQuery) return PHRASE_BONUS.exactTitle;
  if (item.title.startsWith(normalizedQuery)) return PHRASE_BONUS.titleStartsWith;
  if (item.title.includes(normalizedQuery)) return PHRASE_BONUS.titleContains;
  if (item.keywordPhrases.includes(normalizedQuery)) return PHRASE_BONUS.keywordExact;
  return 0;
}

function scoreEntries(
  prepared: readonly PreparedEntry[],
  tokens: readonly string[],
  normalizedQuery: string,
  allowFuzzy: boolean,
): SearchHit[] {
  return prepared.map((item) => {
    let total = 0;
    let matchedTokens = 0;
    for (const token of tokens) {
      const score = scoreToken(token, item, allowFuzzy);
      if (score > 0) {
        matchedTokens += 1;
        total += score;
      }
    }
    return { entry: item.entry, score: total > 0 ? total + phraseBonus(item, normalizedQuery) : 0, matchedTokens };
  });
}

/** A corrected query when a word looks misspelled, or null when nothing needs fixing. */
export function suggestQuery(tokens: readonly string[], vocabulary: readonly string[]): string | null {
  let changed = false;
  const corrected = tokens.map((token) => {
    if (token.length < SUGGESTION_MIN_TOKEN_LENGTH) return token;
    if (vocabulary.some((word) => word.startsWith(token))) return token;
    const limit = maxEditDistance(token);
    let best: { word: string; distance: number } | null = null;
    for (const word of vocabulary) {
      if (Math.abs(word.length - token.length) > limit) continue;
      const distance = editDistance(token, word);
      if (distance > limit) continue;
      if (!best || distance < best.distance || (distance === best.distance && word < best.word)) best = { word, distance };
    }
    if (!best) return token;
    changed = true;
    return best.word;
  });
  return changed ? corrected.join(" ") : null;
}

function matchesFilters(entry: SearchEntry, section: SectionFilter, level: LevelFilter): boolean {
  return (section === "all" || entry.section === section) && (level === "all" || entry.level === level);
}

function sortHits(hits: SearchHit[], sort: SearchSort, hasQuery: boolean): SearchHit[] {
  const byTitle = (a: SearchHit, b: SearchHit) => a.entry.title.localeCompare(b.entry.title);
  return [...hits].sort(hasQuery && sort === "relevance" ? (a, b) => b.score - a.score || byTitle(a, b) : byTitle);
}

/**
 * Runs a search. Order of attempts: every word matches, then some words match, then a near-spelling match.
 * Counts for the section tabs and level menu are calculated here so they always agree with the results.
 */
export function runSearch(index: SearchIndex, state: SearchState): SearchOutcome {
  const tokens = getSearchTokens(state.query);
  const normalizedQuery = normalizeText(state.query.slice(0, MAX_QUERY_LENGTH));

  let mode: MatchMode = "browse";
  let allHits: SearchHit[];

  if (tokens.length === 0) {
    allHits = index.prepared.map((item) => ({ entry: item.entry, score: 0, matchedTokens: 0 }));
  } else {
    const strict = scoreEntries(index.prepared, tokens, normalizedQuery, false);
    const everyWord = strict.filter((hit) => hit.matchedTokens === tokens.length);
    const someWord = strict.filter((hit) => hit.matchedTokens > 0);
    if (everyWord.length > 0) {
      mode = "all-words";
      allHits = everyWord;
    } else if (someWord.length > 0) {
      mode = "some-words";
      allHits = someWord;
    } else {
      const fuzzy = scoreEntries(index.prepared, tokens, normalizedQuery, true).filter((hit) => hit.matchedTokens > 0);
      mode = fuzzy.length > 0 ? "similar-spelling" : "none";
      allHits = fuzzy;
    }
  }

  const sectionCounts = { all: 0 } as Record<SectionFilter, number>;
  for (const section of SECTION_ORDER) sectionCounts[section] = 0;
  const levelCounts = { all: 0 } as Record<LevelFilter, number>;
  for (const level of LEVEL_ORDER) levelCounts[level] = 0;

  for (const hit of allHits) {
    if (matchesFilters(hit.entry, "all", state.level)) {
      sectionCounts.all += 1;
      sectionCounts[hit.entry.section] += 1;
    }
    if (matchesFilters(hit.entry, state.section, "all")) {
      levelCounts.all += 1;
      if (hit.entry.level) levelCounts[hit.entry.level] += 1;
    }
  }

  const visible = allHits.filter((hit) => matchesFilters(hit.entry, state.section, state.level));
  const suggestion = mode === "browse" || mode === "all-words" ? null : suggestQuery(tokens, index.vocabulary);

  return {
    mode,
    tokens,
    hits: sortHits(visible, state.sort, tokens.length > 0),
    totalBeforeFilters: allHits.length,
    sectionCounts,
    levelCounts,
    suggestion,
  };
}

/** How many entries each section holds, for the start screen. */
export function countEntriesBySection(index: SearchIndex): Record<SearchSection, number> {
  const counts = {} as Record<SearchSection, number>;
  for (const section of SECTION_ORDER) counts[section] = 0;
  for (const entry of index.entries) counts[entry.section] += 1;
  return counts;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Splits text into plain and matching parts so the page can wrap matches in <mark>. */
export function getHighlightSegments(text: string, tokens: readonly string[]): HighlightSegment[] {
  const usable = tokens.filter((token) => token.length > 0);
  if (usable.length === 0 || text.length === 0) return [{ text, isMatch: false }];

  const parts = [...usable]
    .sort((a, b) => b.length - a.length)
    .map((token) => (token.length < HIGHLIGHT_PLAIN_MIN_LENGTH ? `\\b${escapeRegExp(token)}\\b` : escapeRegExp(token)));
  const pattern = new RegExp(`(${parts.join("|")})`, "gi");

  const segments: HighlightSegment[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > lastIndex) segments.push({ text: text.slice(lastIndex, start), isMatch: false });
    segments.push({ text: match[0], isMatch: true });
    lastIndex = start + match[0].length;
  }
  if (lastIndex < text.length) segments.push({ text: text.slice(lastIndex), isMatch: false });
  return segments;
}

function isSection(value: string | null): value is SearchSection {
  return value !== null && (SECTION_ORDER as readonly string[]).includes(value);
}

/** Reads search state from URL parameters. Unknown or invalid values fall back to the defaults. */
export function readSearchState(read: (key: string) => string | null): SearchState {
  const section = read("section");
  const levelSlug = read("level");
  const sort = read("sort");
  return {
    query: (read("q") ?? "").slice(0, MAX_QUERY_LENGTH),
    section: isSection(section) ? section : "all",
    level: (levelSlug ? getLevelFromSlug(levelSlug) : undefined) ?? "all",
    sort: sort === "title" ? "title" : "relevance",
  };
}

/** The query string for a state, without the "?". Defaults are left out so URLs stay short. */
export function buildSearchQueryString(state: SearchState): string {
  const params = new URLSearchParams();
  const query = state.query.trim();
  if (query) params.set("q", query);
  if (state.section !== "all") params.set("section", state.section);
  if (state.level !== "all") params.set("level", LEVEL_DEFINITIONS[state.level].slug);
  if (state.sort !== "relevance") params.set("sort", state.sort);
  return params.toString();
}

export function isDefaultSearchState(state: SearchState): boolean {
  return state.query.trim() === "" && state.section === "all" && state.level === "all" && state.sort === "relevance";
}