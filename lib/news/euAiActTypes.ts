/** Where a milestone sits relative to the reader's today. */
export type MilestoneStatus = "passed" | "today" | "upcoming";

/** What the omnibus changed about a date. */
export interface DateChange {
  was: string;
  now: string;
}

/** One date on the EU AI Act calendar. */
export interface Milestone {
  id: string;
  dateIso: string;
  /** True for the five dates the table always shows. Others sit behind "show more". */
  core: boolean;
  title: string;
  plainEnglish: string;
  /** Short legal label and article numbers, for people who want to look it up. */
  legalNote: string;
  whoItAffects: string;
  forYou: string;
  change?: DateChange;
  sourceIds: string[];
}

export interface EuSource {
  id: string;
  label: string;
  url: string;
  /** Provider = EU institution. Secondary = law-firm, trade or news write-up. */
  kind: "provider" | "secondary";
  note: string;
}

/** A date or claim still circulating that is no longer right. */
export interface StaleClaim {
  id: string;
  claim: string;
  seenIn: string;
  today: string;
}

export interface FineTier {
  id: string;
  breach: string;
  max: string;
}

export interface UpcomingNote {
  dateIso: string;
  text: string;
}

/** Advice for one kind of reader. */
export interface RoleGuide {
  id: string;
  label: string;
  nowApplies: string[];
  comingUp: UpcomingNote[];
  doThisMonth: string[];
  watchOut: string;
}