export type ContentTypeId = "english" | "european" | "code" | "data" | "cjk";

/** Characters per token: "low" gives the most tokens (worst case), "high" the fewest. */
export interface CharactersPerToken {
  low: number;
  typical: number;
  high: number;
}

export interface ContentTypeProfile {
  id: ContentTypeId;
  label: string;
  examples: string;
  /** Average characters per word including the following space. Converts word counts to characters. */
  charactersPerWord: number;
  charactersPerToken: CharactersPerToken;
  /** True when "words" is a poor unit, so the form nudges people to paste text or count characters. */
  preferCharacters: boolean;
  note: string;
}

/**
 * Rules of thumb, not measurements. English follows the provider guidance of about 4 characters
 * (three-quarters of a word) per token. The other rows are rounded planning values with wide ranges,
 * because every provider uses its own tokenizer.
 */
const PROFILES: Record<ContentTypeId, ContentTypeProfile> = {
  english: {
    id: "english",
    label: "English prose",
    examples: "Emails, articles, essays, reports, chat messages",
    charactersPerWord: 5.3,
    charactersPerToken: { low: 3.5, typical: 4, high: 4.5 },
    preferCharacters: false,
    note: "The best-known rule: 1 token is about 4 characters or three-quarters of a word.",
  },
  european: {
    id: "european",
    label: "Spanish, French, German and similar",
    examples: "Text in other Latin-script languages, with accents and longer words",
    charactersPerWord: 5.8,
    charactersPerToken: { low: 3.2, typical: 3.6, high: 4 },
    preferCharacters: false,
    note: "Usually a little more tokens than English for the same meaning.",
  },
  code: {
    id: "code",
    label: "Source code",
    examples: "Python, JavaScript, HTML, config files",
    charactersPerWord: 6.5,
    charactersPerToken: { low: 2.7, typical: 3.2, high: 3.7 },
    preferCharacters: true,
    note: "Symbols, brackets and indentation split into many small tokens. Paste the code or count characters.",
  },
  data: {
    id: "data",
    label: "Data and tables",
    examples: "JSON, CSV, logs, spreadsheets pasted as text",
    charactersPerWord: 9,
    charactersPerToken: { low: 2.2, typical: 2.8, high: 3.4 },
    preferCharacters: true,
    note: "Numbers, IDs and punctuation cost a lot of tokens. Paste the data or count characters.",
  },
  cjk: {
    id: "cjk",
    label: "Chinese, Japanese or Korean",
    examples: "Text written without spaces between words",
    charactersPerWord: 2,
    charactersPerToken: { low: 1, typical: 1.5, high: 2 },
    preferCharacters: true,
    note: "Often about one token per character or two. Paste the text or count characters.",
  },
};

export const DEFAULT_CONTENT_TYPE_ID: ContentTypeId = "english";

/** Profiles in the order shown in the form and the reference table. */
export const CONTENT_TYPES: readonly ContentTypeProfile[] = [
  PROFILES.english,
  PROFILES.european,
  PROFILES.code,
  PROFILES.data,
  PROFILES.cjk,
];

export function getContentType(id: ContentTypeId): ContentTypeProfile {
  return PROFILES[id];
}

/** Narrows a form value (a plain string) to a known content type. */
export function isContentTypeId(value: string): value is ContentTypeId {
  return Object.prototype.hasOwnProperty.call(PROFILES, value);
}