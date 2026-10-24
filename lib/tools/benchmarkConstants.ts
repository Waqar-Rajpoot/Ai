export const PERCENT = 100;

/** Share of weighted evidence needed for each rating (see lib/tools/checklists.ts). */
export const STRONG_EVIDENCE_PERCENT = 80;
export const MODERATE_EVIDENCE_PERCENT = 55;
/** Questions that must be answered before a rating is shown. */
export const MIN_ANSWERED_FOR_RATING = 6;
export const MAX_SUBJECT_LENGTH = 120;

/** Margin check: two-sided 95% confidence on a difference of two scores. */
export const Z_SCORE_95_PERCENT = 1.96;
export const MIN_SCORE_PERCENT = 0;
export const MAX_SCORE_PERCENT = 100;
export const MIN_SAMPLE_SIZE = 1;
export const MAX_SAMPLE_SIZE = 10_000_000;
/** At or above this score, a test is close to its ceiling and separates models poorly. */
export const NEAR_CEILING_PERCENT = 95;
/** A gap at least this many times the margin is called clear. */
export const CLEAR_GAP_RATIO = 2;

export const DEFAULT_SCORE_A_TEXT = "78";
export const DEFAULT_SCORE_B_TEXT = "80";
export const DEFAULT_SAMPLE_SIZE_TEXT = "500";