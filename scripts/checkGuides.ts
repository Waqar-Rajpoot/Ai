/**
 * Content check for guide articles. Run before every deploy:
 *   npx tsx scripts/checkGuides.ts
 * Exits with code 1 if any guide breaks a content rule.
 */
import { FOUNDATIONS_GUIDES } from "../lib/learn/foundations/foundationsGuides";
import { estimateReadMinutes, findGuideIssues } from "../lib/learn/guideHelpers";

const knownSlugs = new Set(FOUNDATIONS_GUIDES.map((guide) => guide.slug));
const allIssues: string[] = [];

const duplicateSlugs = FOUNDATIONS_GUIDES.length - knownSlugs.size;
if (duplicateSlugs > 0) allIssues.push("Two guides share the same slug");

for (const guide of FOUNDATIONS_GUIDES) {
  const issues = findGuideIssues(guide, knownSlugs);
  allIssues.push(...issues);
  console.log(
    `${issues.length === 0 ? "ok  " : "FAIL"} ${String(guide.number).padStart(2)}  ${guide.slug}  (${estimateReadMinutes(guide)} min, ${guide.sources.length} sources, ${guide.prompts.length} prompts)`,
  );
}

if (allIssues.length > 0) {
  console.error(`\n${allIssues.length} problem(s):`);
  for (const issue of allIssues) console.error(` - ${issue}`);
  process.exit(1);
}
console.log("\nAll guides pass.");
