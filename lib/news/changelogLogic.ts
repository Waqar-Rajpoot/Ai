import type { ChangeEntry, ChangeKind } from "./changelogTypes";

export interface MonthGroup {
  monthKey: string;
  label: string;
  entries: ChangeEntry[];
}

const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** True for a real calendar date written as YYYY-MM-DD. */
export function isIsoDate(value: string): boolean {
  if (!ISO_PATTERN.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/** The reader's local date as YYYY-MM-DD. */
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Whole days from one ISO date to another. Positive when `toIso` is later. */
export function daysBetweenIso(fromIso: string, toIso: string): number {
  const [fy, fm, fd] = fromIso.split("-").map(Number);
  const [ty, tm, td] = toIso.split("-").map(Number);
  return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86_400_000);
}

/** "October 25, 2026". Uses UTC so the day never shifts with the reader's time zone. */
export function formatIsoLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** "October 2026". */
export function formatMonthLabel(monthKey: string): string {
  const [y, m] = monthKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 1)));
}

/** "today", "yesterday" or "N days ago". Future dates read "in N days". */
export function describeDaysAgo(dateIso: string, todayIso: string): string {
  const days = daysBetweenIso(dateIso, todayIso);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days === -1) return "tomorrow";
  return days > 0 ? `${days} days ago` : `in ${-days} days`;
}

/** Newest first. Entries on the same day keep their written order. */
export function sortEntries(entries: readonly ChangeEntry[]): ChangeEntry[] {
  return entries
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => (a.entry.dateIso === b.entry.dateIso ? a.index - b.index : a.entry.dateIso < b.entry.dateIso ? 1 : -1))
    .map(({ entry }) => entry);
}

/** Groups already-sorted entries by calendar month, keeping order. */
export function groupByMonth(entries: readonly ChangeEntry[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  for (const entry of entries) {
    const monthKey = entry.dateIso.slice(0, 7);
    const last = groups[groups.length - 1];
    if (last && last.monthKey === monthKey) last.entries.push(entry);
    else groups.push({ monthKey, label: formatMonthLabel(monthKey), entries: [entry] });
  }
  return groups;
}

function searchText(entry: ChangeEntry): string {
  const conflict = entry.conflict;
  return [
    entry.title,
    entry.summary,
    entry.whyItMatters,
    entry.pageLabel ?? "",
    ...(entry.numberChanges ?? []).flatMap((n) => [n.label, n.from, n.to]),
    conflict ? [conflict.question, conflict.sideA.source, conflict.sideA.says, conflict.sideB.source, conflict.sideB.says, conflict.resolution].join(" ") : "",
  ]
    .join(" ")
    .toLowerCase();
}

/** Filters by kind and by every word in the query (all words must match). */
export function filterEntries(entries: readonly ChangeEntry[], kind: ChangeKind | "all", query: string): ChangeEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return entries.filter((entry) => (kind === "all" || entry.kind === kind) && words.every((word) => searchText(entry).includes(word)));
}

/** How many entries each kind has. Kinds with none are present with 0. */
export function countByKind(entries: readonly ChangeEntry[]): Record<ChangeKind, number> {
  const counts: Record<ChangeKind, number> = { "source-conflict": 0, "data-refresh": 0, update: 0, "new-page": 0, correction: 0 };
  for (const entry of entries) counts[entry.kind] += 1;
  return counts;
}

/** True when the entry is dated after the reader's last visit. False when there is no last visit. */
export function isNewSince(entry: ChangeEntry, lastVisitIso: string | null): boolean {
  return lastVisitIso !== null && entry.dateIso > lastVisitIso;
}

/** Count of entries newer than the last visit. */
export function countNewSince(entries: readonly ChangeEntry[], lastVisitIso: string | null): number {
  return entries.filter((entry) => isNewSince(entry, lastVisitIso)).length;
}

/** Source conflicts we have not settled. These need a reader's own check. */
export function getOpenConflicts(entries: readonly ChangeEntry[]): ChangeEntry[] {
  return entries.filter((entry) => entry.conflict?.status === "open");
}

/** The newest entry date, or null for an empty log. */
export function getLatestDate(entries: readonly ChangeEntry[]): string | null {
  return entries.reduce<string | null>((latest, entry) => (latest === null || entry.dateIso > latest ? entry.dateIso : latest), null);
}

/** Problems that would make the log misleading. Empty means valid. `todayIso` is the build date. */
export function validateChangelog(entries: readonly ChangeEntry[], todayIso: string): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const entry of entries) {
    const fail = (message: string) => errors.push(`${entry.id}: ${message}`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) fail("id must be lowercase words joined by hyphens");
    if (ids.has(entry.id)) fail("duplicate id");
    ids.add(entry.id);
    if (!isIsoDate(entry.dateIso)) fail("dateIso is not a real YYYY-MM-DD date");
    else if (entry.dateIso > todayIso) fail("dateIso is in the future");
    if (entry.title.trim() === "" || entry.summary.trim() === "" || entry.whyItMatters.trim() === "") fail("title, summary and whyItMatters are required");
    if (entry.pageHref !== undefined && !entry.pageHref.startsWith("/")) fail("pageHref must be a site path");
    if (entry.pageHref !== undefined && !entry.pageLabel) fail("pageHref needs a pageLabel");
    if (entry.kind === "source-conflict" && !entry.conflict) fail("a source-conflict entry needs a conflict");
    if (entry.kind !== "source-conflict" && entry.conflict) fail("only source-conflict entries may carry a conflict");
    if (entry.kind === "correction" && !entry.pageHref) fail("a correction must link to the corrected page");
    if (entry.conflict) {
      if (!isIsoDate(entry.conflict.checkedOnIso)) fail("conflict.checkedOnIso is not a real date");
      if (entry.conflict.status === "resolved" && entry.conflict.confidence === "unsure") fail("a resolved conflict cannot be 'unsure'");
      if (entry.conflict.nextStep.trim() === "") fail("conflict needs a nextStep");
    }
    for (const change of entry.numberChanges ?? []) {
      if (change.from === change.to) fail(`numberChange "${change.label}" did not change`);
    }
  }
  return errors;
}