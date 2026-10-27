import { GUIDE_RULES, LEVEL_BASE_PATHS, WORDS_PER_MINUTE } from "./guideConfig";
import type { CopyPrompt, GuideCardData, GuideRecord } from "./guideTypes";

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Prices belong in the data tables, never in article text. */
const PRICE_PATTERN =
  /[$€£]\s?\d|\b\d[\d,.]*\s?(?:USD|EUR|GBP|dollars?|euros?|pounds?)\b|per month|\/month|\/year/i;

/** Pushy language is not allowed anywhere on the site. */
const URGENCY_PATTERN =
  /\b(?:act now|limited time|hurry|don't miss|last chance|today only|top pick|must-have|unbeatable)\b/i;

/** Prompts must never ask readers to hand over private information. */
const PRIVATE_ASK_PATTERN =
  /\b(?:my|our)\s+(?:password|passcode|pin|card number|bank account|passport|social security|medical records?|test results)\b/i;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/**
 * Formats an ISO date (YYYY-MM-DD) as "26 October 2026".
 * Parsed by hand so the result never shifts with the reader's time zone.
 * @param isoDate Date in YYYY-MM-DD form.
 * @returns A readable date, or the input unchanged if it is not a valid ISO date.
 */
export function formatIsoDate(isoDate: string): string {
  if (!ISO_DATE_PATTERN.test(isoDate)) return isoDate;
  const [year, month, day] = isoDate.split("-").map(Number);
  const monthName = MONTH_NAMES[month - 1];
  if (!monthName || day < 1 || day > 31) return isoDate;
  return `${day} ${monthName} ${year}`;
}

/**
 * Builds the page path for a guide.
 * @param guide Any guide record (only `level` and `slug` are used).
 */
export function guideHref(guide: Pick<GuideRecord, "level" | "slug">): string {
  return `${LEVEL_BASE_PATHS[guide.level]}/${guide.slug}`;
}

/** Collects every reader-facing string in a guide, excluding source metadata. */
function collectReadableText(guide: GuideRecord): string[] {
  const texts: string[] = [guide.title, ...guide.summaryPoints, ...guide.whatCanGoWrong];
  if (guide.limitsNote) texts.push(guide.limitsNote);
  for (const section of guide.sections) {
    texts.push(section.heading);
    texts.push(...(section.paragraphs ?? []), ...(section.bullets ?? []));
    for (const step of section.steps ?? []) texts.push(step.title, step.detail);
    if (section.table) {
      texts.push(section.table.caption, ...section.table.columns);
      for (const row of section.table.rows) texts.push(...row);
    }
  }
  for (const prompt of guide.prompts) {
    texts.push(prompt.title, prompt.whenToUse, prompt.text);
  }
  return texts;
}

/**
 * Estimates reading time so the "N min read" label can never drift from the text.
 * @returns Whole minutes, never less than 1.
 */
export function estimateReadMinutes(guide: GuideRecord): number {
  const wordCount = collectReadableText(guide)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

/** Returns published guides only, in blueprint order. */
export function getPublishedGuides(guides: readonly GuideRecord[]): GuideRecord[] {
  return guides.filter((guide) => guide.published).sort((a, b) => a.number - b.number);
}

/** Finds a published guide by slug. Unpublished guides return undefined so their route 404s. */
export function findPublishedGuide(
  guides: readonly GuideRecord[],
  slug: string,
): GuideRecord | undefined {
  return guides.find((guide) => guide.slug === slug && guide.published);
}

/** Resolves a guide's `relatedSlugs` to published guides, skipping any that are not live. */
export function resolveRelatedGuides(
  guides: readonly GuideRecord[],
  guide: GuideRecord,
): GuideRecord[] {
  return guide.relatedSlugs
    .map((slug) => findPublishedGuide(guides, slug))
    .filter((related): related is GuideRecord => related !== undefined);
}

/**
 * Converts a guide to the data a hub card needs. The "Coming soon" badge
 * comes from `published`, so it cannot disagree with whether the page exists.
 */
export function toGuideCard(guide: GuideRecord): GuideCardData {
  return {
    slug: guide.slug,
    href: guideHref(guide),
    title: guide.title,
    summary: guide.cardSummary,
    kind: guide.kind,
    readMinutes: estimateReadMinutes(guide),
    published: guide.published,
  };
}

/**
 * Checks one guide against the site's content rules.
 * @param guide The guide to check.
 * @param knownSlugs Every guide slug that exists, used to catch broken related links.
 * @returns A list of problems. An empty list means the guide passes.
 */
export function findGuideIssues(
  guide: GuideRecord,
  knownSlugs: ReadonlySet<string>,
): string[] {
  const issues: string[] = [];
  const label = guide.slug;

  if (!SLUG_PATTERN.test(guide.slug)) issues.push(`${label}: slug must be lowercase-with-hyphens`);
  if (!ISO_DATE_PATTERN.test(guide.lastReviewed)) issues.push(`${label}: lastReviewed must be YYYY-MM-DD`);

  const descriptionLength = guide.metaDescription.length;
  if (
    descriptionLength < GUIDE_RULES.metaDescriptionMin ||
    descriptionLength > GUIDE_RULES.metaDescriptionMax
  ) {
    issues.push(
      `${label}: metaDescription is ${descriptionLength} characters (allowed ${GUIDE_RULES.metaDescriptionMin} to ${GUIDE_RULES.metaDescriptionMax})`,
    );
  }

  const summaryCount = guide.summaryPoints.length;
  if (summaryCount < GUIDE_RULES.minSummaryPoints || summaryCount > GUIDE_RULES.maxSummaryPoints) {
    issues.push(`${label}: summary box needs ${GUIDE_RULES.minSummaryPoints} to ${GUIDE_RULES.maxSummaryPoints} points`);
  }
  if (guide.sections.length < GUIDE_RULES.minSections) issues.push(`${label}: needs at least ${GUIDE_RULES.minSections} sections`);
  if (guide.whatCanGoWrong.length < GUIDE_RULES.minWrongItems) issues.push(`${label}: "what can go wrong" needs at least ${GUIDE_RULES.minWrongItems} items`);
  if (guide.prompts.length === 0) issues.push(`${label}: needs at least one copy-ready prompt`);

  // Sources: every one dated, https, and actually used by a section.
  if (guide.sources.length < GUIDE_RULES.minSources) issues.push(`${label}: needs at least ${GUIDE_RULES.minSources} sources`);
  const sourceIds = new Set(guide.sources.map((source) => source.id));
  for (const source of guide.sources) {
    if (!source.url.startsWith("https://")) issues.push(`${label}: source "${source.id}" must use https`);
    if (!ISO_DATE_PATTERN.test(source.verifiedOn)) issues.push(`${label}: source "${source.id}" needs a verifiedOn date`);
  }
  const usedSourceIds = new Set<string>();
  for (const section of guide.sections) {
    for (const sourceId of section.sourceIds ?? []) {
      usedSourceIds.add(sourceId);
      if (!sourceIds.has(sourceId)) issues.push(`${label}: section "${section.id}" cites unknown source "${sourceId}"`);
    }
  }
  for (const sourceId of sourceIds) {
    if (!usedSourceIds.has(sourceId)) issues.push(`${label}: source "${sourceId}" is listed but no section cites it`);
  }

  for (const related of guide.relatedSlugs) {
    if (!knownSlugs.has(related)) issues.push(`${label}: related slug "${related}" does not exist`);
  }
  for (const link of guide.relatedLinks) {
    if (!link.href.startsWith("/")) issues.push(`${label}: related link "${link.label}" must be a site path`);
  }

  // Tone and money rules apply to everything a reader sees.
  for (const text of collectReadableText(guide)) {
    if (PRICE_PATTERN.test(text)) issues.push(`${label}: price-like text, move it to the data tables: "${text.slice(0, 60)}"`);
    if (URGENCY_PATTERN.test(text)) issues.push(`${label}: pushy wording: "${text.slice(0, 60)}"`);
  }
  for (const prompt of guide.prompts) {
    if (PRIVATE_ASK_PATTERN.test(prompt.text)) issues.push(`${label}: prompt "${prompt.id}" asks for private information`);
  }

  return issues;
}

/** A run of prompts that share a heading. `heading` is null for ungrouped prompts. */
export interface PromptGroup {
  readonly heading: string | null;
  readonly prompts: readonly CopyPrompt[];
}

/**
 * Groups prompts by their `group` label, keeping the order they first appear in.
 * @param prompts The guide's prompts.
 * @returns One group per label. Prompts with no label share a single group with a null heading.
 */
export function groupPrompts(prompts: readonly CopyPrompt[]): PromptGroup[] {
  const groups = new Map<string | null, CopyPrompt[]>();
  for (const prompt of prompts) {
    const key = prompt.group ?? null;
    const existing = groups.get(key);
    if (existing) existing.push(prompt);
    else groups.set(key, [prompt]);
  }
  return Array.from(groups, ([heading, items]) => ({ heading, prompts: items }));
}
