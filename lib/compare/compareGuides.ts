import type { GuideRecord } from "../learn/guideTypes";
import { bestModelByJob } from "./guides/bestModelByJob";
import { bestToolsForStudents } from "./guides/bestToolsForStudents";
import { chatbotComparison } from "./guides/chatbotComparison";
import { openVsClosed } from "./guides/openVsClosed";

/**
 * The linked comparison pages (blueprint articles 13 to 15, and 25 open-versus-closed). They live
 * once under /compare. To hide one, set `published: false`.
 */
export const COMPARE_GUIDES: readonly GuideRecord[] = [
  chatbotComparison,
  bestModelByJob,
  bestToolsForStudents,
  openVsClosed,
];
