import type { Metadata } from "next";
import { BEST_FOR_ROUNDUPS } from "./roundups";
import { getModelsByIds, type DirectoryModel } from "./models";
import type { BestForRoundup, BestForSlug } from "./types";

export { BEST_FOR_SLUGS } from "./types";
export type { BestForSlug } from "./types";

/** Date the directory's BenchLM scores were read. */
export const SCORES_AS_OF = "October 17, 2026";
/** Date the directory's prices were checked. */
export const PRICES_VERIFIED_ON = "October 21, 2026";
/** Date the extra research on these pages was gathered. */
export const RESEARCHED_ON = "October 28, 2026";

export interface PageSection {
  readonly id: string;
  readonly label: string;
}

/** Returns the roundup content for a slug. */
export function getBestForRoundup(slug: BestForSlug): BestForRoundup {
  return BEST_FOR_ROUNDUPS[slug];
}

/** Returns the directory models used as starting points for a roundup. */
export function getStartingPointModels(slug: BestForSlug): DirectoryModel[] {
  return getModelsByIds(BEST_FOR_ROUNDUPS[slug].startingPointIds);
}

/** Builds Next.js metadata for a roundup page. */
export function getBestForMetadata(slug: BestForSlug): Metadata {
  const roundup = BEST_FOR_ROUNDUPS[slug];
  return {
    title: roundup.metaTitle,
    description: roundup.metaDescription,
    alternates: { canonical: `/compare/best/${slug}` },
  };
}

/** Lists the sections a page will show, in order, for the jump menu. */
export function getPageSections(slug: BestForSlug): PageSection[] {
  const roundup = BEST_FOR_ROUNDUPS[slug];
  const hasModels = roundup.startingPointIds.length > 0;
  const sections: PageSection[] = [{ id: "quick-answer", label: "Quick answer" }];

  if (roundup.whoItIsFor.length > 0) sections.push({ id: "who", label: "Who this is for" });
  sections.push({ id: "starting-points", label: "Starting points" });
  if (roundup.candidates.length > 0) sections.push({ id: "candidates", label: "Tools to test" });
  if (roundup.decisionGuide.length > 0) sections.push({ id: "decide", label: "How to decide" });
  if (roundup.reportedFigures.length > 0) sections.push({ id: "figures", label: "Reported numbers" });
  if (roundup.glossary.length > 0) sections.push({ id: "terms", label: "Terms explained" });
  sections.push({ id: "how-we-rank", label: "How we will rank" });
  if (hasModels) sections.push({ id: "cost", label: "Cost per task" });
  if (hasModels) sections.push({ id: "skip", label: "Who should skip each" });
  if (roundup.selfTest.length > 0) sections.push({ id: "self-test", label: "Test it yourself" });
  if (roundup.tips.length > 0 || roundup.commonMistakes.length > 0) {
    sections.push({ id: "tips", label: "Tips and mistakes" });
  }
  sections.push({ id: "keep-in-mind", label: "Keep in mind" });
  if (roundup.faq.length > 0) sections.push({ id: "faq", label: "FAQ" });
  if (roundup.sources.length > 0) sections.push({ id: "sources", label: "Sources" });
  return sections;
}