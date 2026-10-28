import type { GuideCardData, GuideRecord } from "../guideTypes";
import { toGuideCard } from "../guideHelpers";
import { euAiActForEverydayUsers } from "./guides/euAiActForEverydayUsers";
import { howToReadAiBenchmark } from "./guides/howToReadAiBenchmark";
import { promptInjectionAndAgentSecurity } from "./guides/promptInjectionAndAgentSecurity";
import { runAiModelOnYourComputer } from "./guides/runAiModelOnYourComputer";

/**
 * Every Level 4 guide, in blueprint order (articles 26 to 29).
 * The linked open-versus-closed explainer (25) lives under /compare and is built from
 * `lib/compare/guides/openVsClosed.ts`.
 * To add a guide: create a record in ./guides, add it here, then run
 * `npx tsx scripts/checkGuides.ts`. Set `published: false` to hide one.
 */
export const EXPERT_GUIDES: readonly GuideRecord[] = [
  runAiModelOnYourComputer,
  howToReadAiBenchmark,
  promptInjectionAndAgentSecurity,
  euAiActForEverydayUsers,
];

/**
 * Card data for the Level 4 hub. Derived from the records, so a card's link,
 * read time and "Coming soon" badge cannot disagree with the article itself.
 */
export const EXPERT_GUIDE_CARDS: readonly GuideCardData[] = EXPERT_GUIDES.map(toGuideCard);
