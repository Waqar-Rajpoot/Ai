import type { LinkItem, SourceLink } from "@/types";

export type ExplainerTopic = "safety" | "privacy" | "policy";

/** Blueprint reading levels: 1 Foundations, 2 Practitioner, 3 Power user, 4 Expert. */
export type ExplainerLevel = 1 | 2 | 3 | 4;

/** One row of the "what changed" table. */
export interface ChangeRow {
  aspect: string;
  before: string;
  now: string;
}

export interface TimelineEntry {
  /** ISO date, YYYY-MM-DD. */
  isoDate: string;
  label: string;
  text: string;
  /** Optional caveat about this date, such as "secondary source". */
  sourceNote?: string;
}

/** What the news means at one reading level. */
export interface LevelImpact {
  level: ExplainerLevel;
  headline: string;
  points: readonly string[];
}

export interface ExplainerAction {
  id: string;
  text: string;
  level: ExplainerLevel;
}

export interface Misreading {
  claim: string;
  fact: string;
}

export interface ExplainerFaq {
  question: string;
  answer: string;
}

export interface RelatedGuide extends LinkItem {
  level: ExplainerLevel;
}

/** Everything one explainer page shows. Add a new one by creating a file in lib/news/explainerData. */
export interface Explainer {
  slug: string;
  title: string;
  /** One sentence, used for the page description. */
  description: string;
  topic: ExplainerTopic;
  /** Levels this explainer covers. Each must have exactly one entry in `impacts`. */
  levels: readonly ExplainerLevel[];
  publishedIso: string;
  updatedIso: string;
  /** Plain label for when the event happened, such as "In force Jul 27, 2026". */
  eventLabel: string;
  /** Two to four bullets for readers in a hurry. */
  quickTake: readonly string[];
  whatHappened: readonly string[];
  whatChanged: readonly ChangeRow[];
  timeline: readonly TimelineEntry[];
  impacts: readonly LevelImpact[];
  actions: readonly ExplainerAction[];
  misreadings: readonly Misreading[];
  /** What we could not confirm. Never empty: an honest explainer always has some. */
  unknowns: readonly string[];
  /** Required on policy explainers, such as "Not legal advice." */
  notice?: string;
  related: readonly RelatedGuide[];
  faq: readonly ExplainerFaq[];
  sources: readonly SourceLink[];
}