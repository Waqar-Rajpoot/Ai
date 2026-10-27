/**
 * Content check for guide articles. Run before every deploy:
 *   npx tsx scripts/checkGuides.ts
 * Exits with code 1 if any guide breaks a content rule.
 */
import { ALL_GUIDES } from "../lib/learn/allGuides";
import { estimateReadMinutes, findGuideIssues } from "../lib/learn/guideHelpers";

const knownSlugs = new Set(ALL_GUIDES.map((guide) => guide.slug));
const knownNumbers = new Set(ALL_GUIDES.map((guide) => guide.number));
const allIssues: string[] = [];

if (knownSlugs.size !== ALL_GUIDES.length) allIssues.push("Two guides share the same slug");
if (knownNumbers.size !== ALL_GUIDES.length) allIssues.push("Two guides share the same blueprint number");

for (const guide of ALL_GUIDES) {
  const issues = findGuideIssues(guide, knownSlugs);
  allIssues.push(...issues);
  console.log(
    `${issues.length === 0 ? "ok  " : "FAIL"} L:${guide.level.padEnd(12)} ${String(guide.number).padStart(2)}  ${guide.slug}  (${estimateReadMinutes(guide)} min, ${guide.sources.length} sources, ${guide.prompts.length} prompts)`,
  );
}

if (allIssues.length > 0) {
  console.error(`\n${allIssues.length} problem(s):`);
  for (const issue of allIssues) console.error(` - ${issue}`);
  process.exit(1);
}
console.log("\nAll guides pass.");
