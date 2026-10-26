import type {
  FaqEntry,
  GlossaryEntry,
  PointEntry,
  RelatedLink,
  SourceEntry,
} from "@/lib/society/societyContentTypes";
import type { ReviewAgeStatus } from "./editorial";

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "Topics come from readers, search and the news.", detail: "We write what people ask, in the order they need it, and we do not write for sponsors." },
  { headline: "Every page has a writer and a reviewer.", detail: "A second person checks the claims, labels and dates before a page goes live." },
  { headline: "We say how we use AI.", detail: "AI tools may help draft. A person checks every fact, and no AI writes a price, a score or a test result." },
  { headline: "Pages carry badges so you can judge them.", detail: "Level, content type, verified-on, tested-on and result labels appear on every page where they apply." },
];

export const STALE_RULE_STATUS: readonly PointEntry[] = [
  { headline: "Already fixed: a quarterly re-test.", detail: "The full test battery is re-run every quarter, on fixed dates, and the privacy matrix is refreshed." },
  { headline: "Already fixed: a monthly review.", detail: "Every best-for page and the free-limits table are reviewed in the first week of each month." },
  { headline: "Already fixed: Superseded, not deleted.", detail: "A replaced model or plan stays on the site, labelled, with a link to its successor." },
  { headline: "Still being decided: the maximum age.", detail: "How long a review may sit before its test date counts as stale is not set yet. When it is, it will be shown here and applied by the tool above." },
];

export const REVIEW_AGE_COPY: Record<ReviewAgeStatus, { label: string; message: string }> = {
  invalid: { label: "Enter a valid date", message: "Use the date shown after “Tested on”, written as a calendar date." },
  future: { label: "That date is in the future", message: "A test date cannot be later than today. Check the date on the page." },
  recent: { label: "Within a quarter", message: "The test date is recent enough to fall inside the quarterly re-test cycle. Age is not a guarantee of accuracy, so still check the provider's page for prices." },
  "past-quarter": { label: "Older than a quarter", message: "The quarterly re-run of the test battery should have happened since this test. Look for a newer tested-on date, or treat the result as dated." },
  stale: { label: "Stale under our rule", message: "This test date is older than our stale-review limit. A stale review should be re-tested, or carry a stale label." },
};

export const AI_PLACEHOLDER_NOTE =
  "The list of AI tools used for drafting has not been published yet. It will name each model, say what it did, and describe the human edit. Until it appears, treat this part of the page as incomplete.";

export const AI_CONFLICT_NOTE =
  "Some models we review may also help draft content. Our rule: a model never scores itself, and makers get no pre-publication access. The independence page explains it in full.";

export const FAQ: readonly FaqEntry[] = [
  { question: "Who decides what you write about?", answer: "The editorial team, using reader questions, search demand and news triggers. Sponsors and affiliates do not choose topics or conclusions." },
  { question: "Do you use AI to write the site?", answer: "AI tools may help draft. A person reads and edits every page and checks every fact on its source. The AI section lists the rules, and the list of tools will name them." },
  { question: "Can an AI tool write a price or a score?", answer: "No. Prices come from provider pages opened by a person, and scores come from our own recorded tests or a named independent evaluator." },
  { question: "What is the stale-review rule?", answer: "A rule for how long a review's test date may age before the review is marked stale. The quarterly re-test and monthly reviews already exist, and the maximum age is still being decided." },
  { question: "What happens to old reviews?", answer: "They stay, with their test date, and are marked Superseded when a model is replaced, with a link to the successor. We do not delete them." },
  { question: "How do I know a page was reviewed?", answer: "Every page goes through a reviewer who is not its writer, and dates and labels show what was checked and when. Report a page that breaks these rules." },
  { question: "Can I suggest a topic?", answer: "Yes. Use the contact page, or request a head-to-head matchup. Repeated questions turn into pages." },
  { question: "What do the level badges mean?", answer: "Level 1 is Foundations, 2 is Practitioner, 3 is Power user and builder, 4 is Expert. A page may span a range of levels." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Editorial standards", meaning: "The rules we follow when choosing, writing, checking and updating pages." },
  { term: "Reviewer", meaning: "The person who checks a page's claims and labels before publication. Not the writer." },
  { term: "Stale-review rule", meaning: "The limit on how old a review's test date may be before the review is marked stale." },
  { term: "Level badge", meaning: "A label from 1 to 4 that shows who a page is for." },
  { term: "Content type", meaning: "What kind of page it is, such as guide, explainer, comparison or roundup." },
  { term: "Verified on", meaning: "The date we checked the facts on the provider's own page." },
  { term: "Tested on", meaning: "The date our own test run happened, with model version and effort setting." },
  { term: "Superseded", meaning: "Replaced by a newer model or plan. The page stays, with a link to the successor." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "Two decisions are still open: who the named writer and reviewer are, and the maximum age before a review is stale. Treat those parts as incomplete.",
  "The list of AI tools used for drafting is not published yet. We will not describe what a tool did until a person confirms it.",
  "Rules on paper do not prevent mistakes. If a page breaks them, tell us and we will log the correction.",
  "Targets for publishing times are targets, not guarantees. The date on each page shows what actually happened.",
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "This site", title: "About us", href: "/about", use: "Who runs the site and how it is funded" },
  { publisher: "This site", title: "How we test", href: "/about/how-we-test", use: "The seven-point scorecard, weights and result labels" },
  { publisher: "This site", title: "Source policy", href: "/about/source-policy", use: "The source hierarchy and how conflicts are settled" },
  { publisher: "This site", title: "Independence and disclosure", href: "/about/independence", use: "Affiliates, sponsors and the conflict-of-interest rule" },
  { publisher: "This site", title: "Corrections policy and log", href: "/about/corrections", use: "How to report an error and what changed" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/news/changelog", label: "Changelog", note: "Every change to the site, with dates" },
  { href: "/learn", label: "Learn: guides by level", note: "See the badges in use" },
  { href: "/compare/reviews", label: "Model reviews", note: "See the scorecard and dates in use" },
  { href: "/contact", label: "Contact", note: "Suggest a topic or report an error" },
];