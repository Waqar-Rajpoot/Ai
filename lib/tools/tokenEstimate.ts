import type { ContextWindowEntry } from "./contextWindows";
import {
  COMMON_WINDOW_TOKENS,
  FIT_COMFORTABLE_RATIO,
  FIT_TIGHT_RATIO,
  MAX_INPUT_AMOUNT,
  READING_WORDS_PER_MINUTE,
  SIGNIFICANT_DIGITS,
  WORDS_PER_BOOK,
  WORDS_PER_PAGE,
  WORDS_PER_THOUSAND,
} from "./tokenEstimateConstants";
import { getContentType, type ContentTypeProfile } from "./tokenProfiles";

export type InputMode = "text" | "words" | "pages" | "characters";

/** What the reader typed: pasted text, or a single number in the chosen unit. */
export type AmountInput =
  | { mode: "text"; text: string }
  | { mode: "words" | "pages" | "characters"; amount: number };

export interface InputMeasure {
  words: number;
  characters: number;
}

/** An estimate with a low and a high end, because tokenizers differ. */
export interface TokenRange {
  low: number;
  typical: number;
  high: number;
}

export interface TokenBudget {
  inputText: TokenRange;
  extraTokens: number;
  reply: TokenRange;
  total: TokenRange;
}

export type FitStatus = "comfortable" | "fits" | "tight" | "borderline" | "too-long" | "unknown";

export interface FitResult {
  status: FitStatus;
  /** Typical total divided by the window, or null when the window is unknown. */
  usedRatio: number | null;
  /** Window minus typical total. Negative when over. Null when the window is unknown. */
  remainingTokens: number | null;
}

export interface FitRow {
  entry: ContextWindowEntry;
  fit: FitResult;
}

export interface ScaleEquivalents {
  pages: number;
  readingMinutes: number;
  books: number;
}

export const FIT_LABELS: Record<FitStatus, string> = {
  comfortable: "Plenty of room",
  fits: "Fits",
  tight: "Tight",
  borderline: "Borderline",
  "too-long": "Too long",
  unknown: "Window not confirmed",
};

/** Reads a typed number such as "12,000". Anything invalid becomes 0. Decimals are dropped. */
export function parseAmount(raw: string): number {
  const value = Number(raw.replace(/[,\s_]/g, ""));
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(Math.floor(value), MAX_INPUT_AMOUNT);
}

/** Counts words (split on spaces and line breaks) and characters (including spaces). */
export function countText(text: string): InputMeasure {
  const trimmed = text.trim();
  return {
    words: trimmed === "" ? 0 : trimmed.split(/\s+/).length,
    characters: Array.from(text).length,
  };
}

/** Turns any input mode into a word count and a character count for the chosen content type. */
export function measureInput(input: AmountInput, profile: ContentTypeProfile): InputMeasure {
  switch (input.mode) {
    case "text": {
      const counted = countText(input.text);
      // Chinese, Japanese and Korean text has no spaces, so a space-based word count would be far too low.
      if (profile.id === "cjk") {
        return { words: Math.round(counted.characters / profile.charactersPerWord), characters: counted.characters };
      }
      return counted;
    }
    case "words":
      return { words: input.amount, characters: Math.round(input.amount * profile.charactersPerWord) };
    case "pages": {
      const words = input.amount * WORDS_PER_PAGE;
      return { words, characters: Math.round(words * profile.charactersPerWord) };
    }
    case "characters":
      return { words: Math.round(input.amount / profile.charactersPerWord), characters: input.amount };
  }
}

export function estimateTokensFromCharacters(characters: number, profile: ContentTypeProfile): TokenRange {
  const perToken = profile.charactersPerToken;
  return {
    low: Math.round(characters / perToken.high),
    typical: Math.round(characters / perToken.typical),
    high: Math.round(characters / perToken.low),
  };
}

export function estimateTokensFromWords(words: number, profile: ContentTypeProfile): TokenRange {
  return estimateTokensFromCharacters(words * profile.charactersPerWord, profile);
}

export function estimateTokens(
  input: AmountInput,
  profile: ContentTypeProfile,
): { measure: InputMeasure; tokens: TokenRange } {
  const measure = measureInput(input, profile);
  return { measure, tokens: estimateTokensFromCharacters(measure.characters, profile) };
}

/** Adds the text, anything already in the conversation, and the reply into one total. */
export function buildBudget(inputText: TokenRange, extraTokens: number, reply: TokenRange): TokenBudget {
  return {
    inputText,
    extraTokens,
    reply,
    total: {
      low: inputText.low + extraTokens + reply.low,
      typical: inputText.typical + extraTokens + reply.typical,
      high: inputText.high + extraTokens + reply.high,
    },
  };
}

/**
 * Compares the total with one window. "Too long" uses the typical estimate. "Borderline" means the
 * typical estimate fits but the high end does not, so the real count could go either way.
 */
export function assessFit(total: TokenRange, windowTokens: number | null): FitResult {
  if (windowTokens === null || windowTokens <= 0) {
    return { status: "unknown", usedRatio: null, remainingTokens: null };
  }
  const usedRatio = total.typical / windowTokens;
  const remainingTokens = windowTokens - total.typical;
  let status: FitStatus;
  if (total.typical > windowTokens) status = "too-long";
  else if (total.high > windowTokens) status = "borderline";
  else if (usedRatio <= FIT_COMFORTABLE_RATIO) status = "comfortable";
  else if (usedRatio <= FIT_TIGHT_RATIO) status = "fits";
  else status = "tight";
  return { status, usedRatio, remainingTokens };
}

export function assessAllWindows(total: TokenRange, entries: readonly ContextWindowEntry[]): FitRow[] {
  return entries.map((entry) => ({ entry, fit: assessFit(total, entry.contextTokens) }));
}

/** A row for a window the reader types in, such as a local model. Null when the box is empty. */
export function buildCustomWindowEntry(tokens: number): ContextWindowEntry | null {
  if (tokens <= 0) return null;
  return { id: "custom", model: "Your own window", maker: "You entered it", contextTokens: tokens };
}

/** Reading time, pages and books for a word count. */
export function describeScale(words: number): ScaleEquivalents {
  return {
    pages: words / WORDS_PER_PAGE,
    readingMinutes: words / READING_WORDS_PER_MINUTE,
    books: words / WORDS_PER_BOOK,
  };
}

/** How much English text a window holds, using the typical English ratio. */
export function windowCapacity(windowTokens: number): { words: number; pages: number; books: number } {
  const english = getContentType("english");
  const words = Math.round((windowTokens * english.charactersPerToken.typical) / english.charactersPerWord);
  return { words, pages: words / WORDS_PER_PAGE, books: words / WORDS_PER_BOOK };
}

/** The smallest common window that holds the given tokens, or null if none does. */
export function smallestWindowHolding(tokens: number): number | null {
  return COMMON_WINDOW_TOKENS.find((windowTokens) => windowTokens >= tokens) ?? null;
}

/** Estimated tokens in 1,000 words of this content type, as a range. */
export function tokensPerThousandWords(profile: ContentTypeProfile): TokenRange {
  return estimateTokensFromWords(WORDS_PER_THOUSAND, profile);
}

/** 1234.5 becomes "1,235". */
export function formatCount(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

/** Rounds to a few significant digits, so an estimate is not shown as if it were exact. */
export function roundForDisplay(value: number): number {
  if (value < 10 ** SIGNIFICANT_DIGITS) return Math.round(value);
  const magnitude = 10 ** (Math.floor(Math.log10(value)) - (SIGNIFICANT_DIGITS - 1));
  return Math.round(value / magnitude) * magnitude;
}

export function formatApproxCount(value: number): string {
  return formatCount(roundForDisplay(value));
}

/** 1,050,000 becomes "1.05M" and 262,000 becomes "262K". */
export function formatCompactTokens(value: number): string {
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(2))}M`;
  if (value >= 1_000) return `${Number((value / 1_000).toFixed(1))}K`;
  return String(value);
}

/** For pages and books: "under 0.1", "3.4" or "1,509". */
export function formatQuantity(value: number): string {
  if (value <= 0) return "0";
  if (value < 0.1) return "under 0.1";
  if (value < 10) return value.toFixed(1);
  return formatCount(value);
}

export function formatDuration(minutes: number): string {
  if (minutes < 1) return "under a minute";
  const rounded = Math.round(minutes);
  if (rounded < 60) return `${rounded} min`;
  const hours = Math.floor(rounded / 60);
  const rest = rounded % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

/** 0.4321 becomes "43%". Very small and very large values are capped. */
export function formatPercent(ratio: number): string {
  const percent = ratio * 100;
  if (percent > 0 && percent < 1) return "under 1%";
  if (percent > 999) return "over 999%";
  return `${Math.round(percent)}%`;
}