export const MIN_QUERY_LENGTH = 2;
export const MAX_QUERY_LENGTH = 120;
export const MAX_QUERY_TOKENS = 8;

export const RESULTS_PAGE_SIZE = 12;
/** How many results each section shows before "Show all". */
export const GROUP_PREVIEW_SIZE = 4;
export const URL_UPDATE_DELAY_MS = 300;

export const MAX_RECENT_SEARCHES = 6;
export const RECENT_SEARCHES_STORAGE_KEY = "search:recent";

/** Words this short must match a whole word, so "6" does not match every number. */
export const SHORT_TOKEN_MAX_LENGTH = 2;
/** Words this long may match inside another word. */
export const SUBSTRING_MIN_TOKEN_LENGTH = 4;
/** Shorter highlight terms are matched as whole words. */
export const HIGHLIGHT_PLAIN_MIN_LENGTH = 3;

export const FUZZY_MIN_TOKEN_LENGTH = 5;
export const FUZZY_LONG_TOKEN_LENGTH = 9;
export const SUGGESTION_MIN_TOKEN_LENGTH = 4;
export const SUGGESTION_MIN_WORD_LENGTH = 3;

/** 0 = no match, 1 = inside a word, 2 = start of a word, 3 = whole word. */
export type MatchLevel = 0 | 1 | 2 | 3;
export const TITLE_WEIGHTS: readonly number[] = [0, 4, 7, 10];
export const KEYWORD_WEIGHTS: readonly number[] = [0, 2, 4, 6];
export const DESCRIPTION_WEIGHTS: readonly number[] = [0, 1, 2, 3];
export const LABEL_WEIGHT = 1;
export const FUZZY_TITLE_WEIGHT = 4;
export const FUZZY_KEYWORD_WEIGHT = 3;
export const PHRASE_BONUS = { exactTitle: 30, titleStartsWith: 12, titleContains: 8, keywordExact: 6 } as const;

/** Ignored in queries, so "how to write prompts" ranks like "write prompts". */
export const STOP_WORDS: ReadonlySet<string> = new Set([
  "a", "an", "the", "of", "to", "is", "are", "and", "or", "in", "on", "for", "with",
  "how", "what", "do", "does", "can", "i", "my", "me", "it",
]);