/** Date the rules of thumb on the estimator page were last checked against provider pages (Blueprint 6.2 "Verified on"). */
export const TOKEN_RULES_CHECKED_ON = "October 23, 2026";

/** Date of the model-directory snapshot the context-window sizes come from (Blueprint 6.7). Re-check before publishing. */
export const CONTEXT_DATA_AS_OF = "October 19, 2026";

/** A typical single-spaced page. A double-spaced page holds about half. */
export const WORDS_PER_PAGE = 500;

/** A typical adult novel. */
export const WORDS_PER_BOOK = 90_000;

/** Typical adult silent reading speed for non-fiction. */
export const READING_WORDS_PER_MINUTE = 240;

/** Starting values shown when the page first loads. */
export const DEFAULT_WORD_COUNT = 1_500;
export const DEFAULT_REPLY_WORDS = 500;

/** Largest number accepted in any input box, so extra zeros cannot break the layout. */
export const MAX_INPUT_AMOUNT = 1_000_000_000;

/** Share of the window used at or below which the verdict is "Plenty of room". */
export const FIT_COMFORTABLE_RATIO = 0.5;

/** Share of the window used above which the verdict is "Tight". */
export const FIT_TIGHT_RATIO = 0.8;

/** Window sizes, in tokens, used on the reference tables. */
export const COMMON_WINDOW_TOKENS: readonly number[] = [8_000, 32_000, 128_000, 500_000, 1_000_000];

/** Words used when showing "tokens per 1,000 words". */
export const WORDS_PER_THOUSAND = 1_000;

/** Headline numbers are rounded to this many significant digits to avoid false precision. */
export const SIGNIFICANT_DIGITS = 2;