import type { GuideCardData, GuideRecord } from "../guideTypes";
import { toGuideCard } from "../guideHelpers";
import { aiAgentsExplained } from "./guides/aiAgentsExplained";
import { aiApiPricingForNonEngineers } from "./guides/aiApiPricingForNonEngineers";
import { buildYourOwnAiTestSet } from "./guides/buildYourOwnAiTestSet";
import { contextWindowsTokensMemory } from "./guides/contextWindowsTokensMemory";
import { mcpAndConnectors } from "./guides/mcpAndConnectors";
import { ragExplained } from "./guides/ragExplained";
import { reasoningModelsEffortSettings } from "./guides/reasoningModelsEffortSettings";

/**
 * Every Level 3 guide, in blueprint order (articles 17 to 23).
 * The linked head-to-head page (24) lives under /compare/vs and is built from
 * `lib/compare/headToHeadGuides.ts`.
 * To add a guide: create a record in ./guides, add it here, then run
 * `npx tsx scripts/checkGuides.ts`. Set `published: false` to hide one.
 */
export const POWER_USER_GUIDES: readonly GuideRecord[] = [
  contextWindowsTokensMemory,
  reasoningModelsEffortSettings,
  ragExplained,
  aiAgentsExplained,
  mcpAndConnectors,
  aiApiPricingForNonEngineers,
  buildYourOwnAiTestSet,
];

/**
 * Card data for the Level 3 hub. Derived from the records, so a card's link,
 * read time and "Coming soon" badge cannot disagree with the article itself.
 */
export const POWER_USER_GUIDE_CARDS: readonly GuideCardData[] = POWER_USER_GUIDES.map(toGuideCard);
