import {
  AFTERNOON_START_MINUTES,
  EVENING_START_MINUTES,
  HOURS_ON_CLOCK,
  HOURS_PER_DAY,
  MINUTES_PER_HOUR,
} from "./tenPlacesConstants";

/** The four jobs AI does in these places. */
export type AiKind = "recognition" | "ranking" | "prediction" | "generation";
export type Visibility = "obvious" | "sometimes" | "hidden";
export type ControlLevel = "easy" | "some" | "little";
export type PartOfDay = "morning" | "afternoon" | "evening";
export type KindFilter = AiKind | "all";

export interface GuideLink {
  href: string;
  label: string;
}

export interface DayPlace {
  id: string;
  /** Time of the moment, in minutes after midnight. */
  minutesSinceMidnight: number;
  title: string;
  whereYouMeetIt: string;
  whatItDoes: string;
  kinds: readonly AiKind[];
  visibility: Visibility;
  control: ControlLevel;
  benefit: string;
  watchOut: string;
  whatYouCanDo: string;
  /** The "go deeper" layer, shown when the reader switches to Technical. */
  technicalNote: string;
  guide?: GuideLink;
}

export interface DayPart {
  part: PartOfDay;
  label: string;
  places: DayPlace[];
}

export const AI_KINDS: readonly AiKind[] = ["recognition", "ranking", "prediction", "generation"];

export const KIND_LABELS: Record<AiKind, string> = {
  recognition: "Recognising",
  ranking: "Ranking",
  prediction: "Predicting and sorting",
  generation: "Generating",
};

export const VISIBILITY_LABELS: Record<Visibility, string> = {
  obvious: "You usually notice it",
  sometimes: "You sometimes notice it",
  hidden: "Mostly hidden",
};

export const CONTROL_LABELS: Record<ControlLevel, string> = {
  easy: "Easy to limit",
  some: "Some control",
  little: "Little control",
};

export const PART_LABELS: Record<PartOfDay, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening and night",
};

const PART_ORDER: readonly PartOfDay[] = ["morning", "afternoon", "evening"];

/** 390 becomes "6:30 am"; 765 becomes "12:45 pm". */
export function formatClockTime(minutesSinceMidnight: number): string {
  const hours24 = Math.floor(minutesSinceMidnight / MINUTES_PER_HOUR) % HOURS_PER_DAY;
  const minutes = minutesSinceMidnight % MINUTES_PER_HOUR;
  const suffix = hours24 < HOURS_ON_CLOCK ? "am" : "pm";
  const hours12 = hours24 % HOURS_ON_CLOCK === 0 ? HOURS_ON_CLOCK : hours24 % HOURS_ON_CLOCK;
  return `${hours12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function getPartOfDay(minutesSinceMidnight: number): PartOfDay {
  if (minutesSinceMidnight >= EVENING_START_MINUTES) return "evening";
  if (minutesSinceMidnight >= AFTERNOON_START_MINUTES) return "afternoon";
  return "morning";
}

/** Groups places by part of day, in time order. Empty parts are left out. */
export function groupByPartOfDay(places: readonly DayPlace[]): DayPart[] {
  const sorted = [...places].sort((a, b) => a.minutesSinceMidnight - b.minutesSinceMidnight);
  return PART_ORDER.map((part) => ({
    part,
    label: PART_LABELS[part],
    places: sorted.filter((place) => getPartOfDay(place.minutesSinceMidnight) === part),
  })).filter((group) => group.places.length > 0);
}

/** Places that use a kind of AI. "all" returns every place. Returns a new array. */
export function filterByKind(places: readonly DayPlace[], kind: KindFilter): DayPlace[] {
  if (kind === "all") return [...places];
  return places.filter((place) => place.kinds.includes(kind));
}

/** How many places use each kind. A place with two kinds counts once for each. */
export function countByKind(places: readonly DayPlace[]): Record<AiKind, number> {
  const counts: Record<AiKind, number> = { recognition: 0, ranking: 0, prediction: 0, generation: 0 };
  for (const place of places) {
    for (const kind of place.kinds) counts[kind] += 1;
  }
  return counts;
}

/** "Ranking and generating" style list for tables and badges. */
export function describeKinds(kinds: readonly AiKind[]): string {
  return kinds.map((kind) => KIND_LABELS[kind].toLowerCase()).join(", ");
}