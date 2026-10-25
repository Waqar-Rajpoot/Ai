import { formatIsoDate } from "@/lib/prices/formatPrice";
import { calendarDaysUntil } from "@/lib/shared/dates";
import type { NewsPost } from "./news";
import { MAX_HIGHLIGHTS, MAX_SUMMARY_LENGTH, NEXT_WEEK_WINDOW_DAYS } from "./roundupConstants";
import { sortDateNotes } from "./roundupDates";
import { ROUNDUPS } from "./roundupData";
import { CLAIM_LABEL_TEXT, REVIEW_STATUS_TEXT, type WeeklyRoundup } from "./roundupTypes";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface AdjacentRoundups {
  older: WeeklyRoundup | null;
  newer: WeeklyRoundup | null;
}

export interface RoundupCounts {
  releases: number;
  priceChanges: number;
  policyItems: number;
  dates: number;
}

/** Real roundups only (samples excluded), newest first. Returns a new array. */
export function getPublishedRoundups(roundups: readonly WeeklyRoundup[] = ROUNDUPS): WeeklyRoundup[] {
  return roundups
    .filter((roundup) => !roundup.isSample)
    .sort((a, b) => b.publishedOn.localeCompare(a.publishedOn) || a.slug.localeCompare(b.slug));
}

export function findRoundupBySlug(slug: string, roundups: readonly WeeklyRoundup[] = ROUNDUPS): WeeklyRoundup | undefined {
  return roundups.find((roundup) => roundup.slug === slug);
}

/** Every slug, samples included, so a static build always has at least one page. */
export function listRoundupSlugs(roundups: readonly WeeklyRoundup[] = ROUNDUPS): string[] {
  return roundups.map((roundup) => roundup.slug);
}

/** The roundups just before and after this one. Samples have none. */
export function getAdjacentRoundups(slug: string, roundups: readonly WeeklyRoundup[] = ROUNDUPS): AdjacentRoundups {
  const published = getPublishedRoundups(roundups);
  const index = published.findIndex((roundup) => roundup.slug === slug);
  if (index === -1) return { older: null, newer: null };
  return { older: published[index + 1] ?? null, newer: published[index - 1] ?? null };
}

export function countRoundupItems(roundup: WeeklyRoundup): RoundupCounts {
  return {
    releases: roundup.releases.length,
    priceChanges: roundup.priceChanges.length,
    policyItems: roundup.policyItems.length,
    dates: roundup.nextWeek.length,
  };
}

/** The archive and hub list entry for a roundup, so a post is written once. */
export function roundupToNewsPost(roundup: WeeklyRoundup): NewsPost {
  return {
    id: `weekly-${roundup.slug}`,
    type: "weekly",
    title: roundup.title,
    summary: roundup.summary,
    publishedOn: roundup.publishedOn,
    href: `/news/weekly/${roundup.slug}`,
    levels: roundup.levels,
    verifiedOn: roundup.verifiedOn,
  };
}

function daysBetween(fromIso: string, toIso: string): number {
  return calendarDaysUntil(toIso, new Date(`${fromIso}T00:00:00Z`));
}

/** Problems that make a roundup unfit to publish. An empty list means it is fine. */
export function findRoundupIssues(roundup: WeeklyRoundup): string[] {
  const issues: string[] = [];
  const name = `Roundup "${roundup.slug}"`;

  if (!SLUG_PATTERN.test(roundup.slug)) issues.push(`${name}: slug must be lowercase words joined by hyphens.`);
  if (roundup.title.trim() === "") issues.push(`${name}: title is empty.`);
  if (roundup.levels.length === 0) issues.push(`${name}: choose at least one level.`);

  const hasValidPublished = ISO_DATE_PATTERN.test(roundup.publishedOn);
  if (!hasValidPublished) issues.push(`${name}: publishedOn must look like 2026-10-26.`);
  if (!ISO_DATE_PATTERN.test(roundup.verifiedOn)) issues.push(`${name}: verifiedOn must look like 2026-10-26.`);
  else if (hasValidPublished && roundup.verifiedOn > roundup.publishedOn) {
    issues.push(`${name}: facts cannot be verified after the roundup was published.`);
  }

  const summaryLength = roundup.summary.trim().length;
  if (summaryLength === 0) issues.push(`${name}: summary is empty.`);
  if (summaryLength > MAX_SUMMARY_LENGTH) issues.push(`${name}: summary is over ${MAX_SUMMARY_LENGTH} characters.`);
  if (roundup.highlights.length === 0) issues.push(`${name}: add at least one highlight.`);
  if (roundup.highlights.length > MAX_HIGHLIGHTS) issues.push(`${name}: keep highlights to ${MAX_HIGHLIGHTS} or fewer.`);

  for (const release of roundup.releases) {
    if (!release.directoryHref) issues.push(`${name}: release "${release.model}" has no model directory link.`);
  }
  for (const change of roundup.priceChanges) {
    if (!ISO_DATE_PATTERN.test(change.verifiedOn)) issues.push(`${name}: price change "${change.subject}" needs a verifiedOn date.`);
    if (!change.sourceUrl) issues.push(`${name}: price change "${change.subject}" has no provider page link.`);
  }
  if (hasValidPublished) {
    for (const note of roundup.nextWeek) {
      const days = ISO_DATE_PATTERN.test(note.isoDate) ? daysBetween(roundup.publishedOn, note.isoDate) : -1;
      if (days < 0 || days > NEXT_WEEK_WINDOW_DAYS) {
        issues.push(`${name}: next-week date "${note.title}" is outside the ${NEXT_WEEK_WINDOW_DAYS} days after publishing.`);
      }
    }
  }
  if (roundup.sponsor && roundup.sponsor.message.trim() === "") issues.push(`${name}: sponsor message is empty.`);
  for (const correction of roundup.corrections) {
    if (!ISO_DATE_PATTERN.test(correction.onDate)) issues.push(`${name}: a correction needs an ISO date.`);
  }
  return issues;
}

/** Fails the build when a real roundup is incomplete, so a half-finished post cannot ship. Samples are skipped. */
export function assertPublishedRoundupsValid(roundups: readonly WeeklyRoundup[] = ROUNDUPS): void {
  const issues = getPublishedRoundups(roundups).flatMap(findRoundupIssues);
  if (issues.length > 0) throw new Error(`Weekly roundup data has problems:\n- ${issues.join("\n- ")}`);
}

/** Plain-text version for the copy button. */
export function roundupToPlainText(roundup: WeeklyRoundup): string {
  const lines: string[] = [
    roundup.title,
    `Published ${formatIsoDate(roundup.publishedOn)} · Verified on ${formatIsoDate(roundup.verifiedOn)}`,
    "",
    roundup.summary,
    ...roundup.highlights.map((point) => `- ${point}`),
  ];

  if (roundup.releases.length > 0) {
    lines.push("", "NEW MODELS AND RELEASES");
    for (const release of roundup.releases) {
      lines.push(`- ${release.model} (${release.maker}): ${release.summary} [${CLAIM_LABEL_TEXT[release.claimLabel]}; ${REVIEW_STATUS_TEXT[release.reviewStatus]}]`);
    }
  }
  if (roundup.priceChanges.length > 0) {
    lines.push("", "PRICE AND PLAN CHANGES");
    for (const change of roundup.priceChanges) {
      lines.push(`- ${change.provider}, ${change.subject}: ${change.before} to ${change.after}, from ${formatIsoDate(change.effectiveOn)} (verified ${formatIsoDate(change.verifiedOn)})`);
    }
  }
  if (roundup.policyItems.length > 0) {
    lines.push("", "SAFETY, PRIVACY AND POLICY");
    for (const item of roundup.policyItems) lines.push(`- ${item.title}: ${item.whatItMeans} (${item.sourceName})`);
  }
  if (roundup.nextWeek.length > 0) {
    lines.push("", "NEXT WEEK");
    for (const note of sortDateNotes(roundup.nextWeek)) lines.push(`- ${formatIsoDate(note.isoDate)}: ${note.title}`);
  }
  lines.push("", "Prices and features change. Confirm on the provider's website before buying.");
  return lines.join("\n");
}