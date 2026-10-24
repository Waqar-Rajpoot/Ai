/** Content shapes shared by every AI & Society article. */

export interface PointEntry {
  headline: string;
  detail: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface GlossaryEntry {
  term: string;
  meaning: string;
}

export interface SourceEntry {
  publisher: string;
  title: string;
  /** Null until the original page has been opened and checked. */
  href: string | null;
  use: string;
}

export interface RelatedLink {
  href: string;
  label: string;
  note: string;
}

export interface DisagreementEntry {
  topic: string;
  oneView: string;
  otherView: string;
  whatWouldHelp: string;
}

export interface ReaderActions {
  reader: string;
  actions: readonly string[];
}