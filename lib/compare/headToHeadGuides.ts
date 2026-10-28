import type { GuideCardData, GuideRecord } from "../learn/guideTypes";
import { toGuideCard } from "../learn/guideHelpers";
import { claudeOpus55VsGpt61Sol } from "./headToHead/claudeOpus55VsGpt61Sol";

/**
 * Head-to-head pages (blueprint article 24). They live once under /compare/vs and are
 * linked from the Level 3 hub. To add one: create a record in ./headToHead, add it here,
 * then run `npx tsx scripts/checkGuides.ts`. Set `published: false` to hide one.
 */
export const HEAD_TO_HEAD_GUIDES: readonly GuideRecord[] = [claudeOpus55VsGpt61Sol];

/** Card data for hubs that link to head-to-head pages, derived from the records. */
export const HEAD_TO_HEAD_GUIDE_CARDS: readonly GuideCardData[] = HEAD_TO_HEAD_GUIDES.map(toGuideCard);
