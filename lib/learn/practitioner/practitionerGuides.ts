import type { GuideRecord } from "../guideTypes";
import { aiForEmailAndWritingAtWork } from "./guides/aiForEmailAndWritingAtWork";
import { deepResearchModes } from "./guides/deepResearchModes";
import { factCheckAiAnswers } from "./guides/factCheckAiAnswers";
import { isAiWorthPayingFor } from "./guides/isAiWorthPayingFor";
import { resumeAndInterviewsWithAi } from "./guides/resumeAndInterviewsWithAi";
import { studyWithAiWithoutCheating } from "./guides/studyWithAiWithoutCheating";
import { summarizePdfWithAi } from "./guides/summarizePdfWithAi";
import { whereAiHelpsAndFails } from "./guides/whereAiHelpsAndFails";

/**
 * Every Level 2 guide, in blueprint order (articles 7 to 12, 16 and 30).
 * The linked comparison and roundup pages (13 to 15) are not guides. They are
 * linked from these guides through `LINKED_PAGES` in `guideConfig.ts`.
 * To add a guide: create a record in ./guides, add it here, then run
 * `npx tsx scripts/checkGuides.ts`. Set `published: false` to hide one.
 */
export const PRACTITIONER_GUIDES: readonly GuideRecord[] = [
  factCheckAiAnswers,
  studyWithAiWithoutCheating,
  summarizePdfWithAi,
  aiForEmailAndWritingAtWork,
  resumeAndInterviewsWithAi,
  deepResearchModes,
  isAiWorthPayingFor,
  whereAiHelpsAndFails,
];
