import type { GuideRecord } from "../learn/guideTypes";
import { bestModelByJob } from "./guides/bestModelByJob";
import { bestToolsForStudents } from "./guides/bestToolsForStudents";
import { chatbotComparison } from "./guides/chatbotComparison";

/**
 * The three linked comparison pages (blueprint articles 13 to 15). They live
 * once under /compare. To hide one, set `published: false`.
 */
export const COMPARE_GUIDES: readonly GuideRecord[] = [
  chatbotComparison,
  bestModelByJob,
  bestToolsForStudents,
];
