import type { GuideRecord } from "../guideTypes";
import { aiScamsAndDeepfakes } from "./guides/aiScamsAndDeepfakes";
import { freeVsPaidAi } from "./guides/freeVsPaidAi";
import { howAiChatbotsWork } from "./guides/howAiChatbotsWork";
import { neverShareWithAiChatbot } from "./guides/neverShareWithAiChatbot";
import { whatIsAi } from "./guides/whatIsAi";
import { writeBetterPrompts } from "./guides/writeBetterPrompts";

/**
 * Every Level 1 guide, in blueprint order (articles 1 to 6).
 * To add a guide: create a record in ./guides, add it here, run `npm run check:guides`.
 * To hide a guide, set `published: false`. Its card then shows "Coming soon" and its route 404s.
 */
export const FOUNDATIONS_GUIDES: readonly GuideRecord[] = [
  whatIsAi,
  howAiChatbotsWork,
  writeBetterPrompts,
  freeVsPaidAi,
  neverShareWithAiChatbot,
  aiScamsAndDeepfakes,
];
