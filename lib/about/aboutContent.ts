import type {
  FaqEntry,
  GlossaryEntry,
  PointEntry,
  RelatedLink,
  SourceEntry,
} from "@/lib/society/societyContentTypes";
import type { NavLink } from "./about";

export interface PromiseEntry {
  title: string;
  detail: string;
  link: NavLink;
}

export interface ReaderStart {
  reader: string;
  start: NavLink;
  why: string;
}

export interface ContactRoute {
  title: string;
  detail: string;
  link: NavLink;
}

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "A publisher, a school and a review desk for AI models.", detail: "We teach readers from first steps to expert topics, compare named models with dated tests, and keep every price, score and rule sourced and dated." },
  { headline: "Three jobs, one layer of trust underneath.", detail: "Learn, Compare and Stay current sit on top of the pages that explain how we work: standards, testing, sources, independence and corrections." },
  { headline: "Written by hand, and static by design.", detail: "Nothing is fetched live. A figure changes only when a person checks it and edits the page, and the change is logged." },
  { headline: "Payment never changes a score or a verdict.", detail: "Any money the site earns is disclosed, labelled and kept apart from the editorial parts." },
];

export const WHY_THE_SITE_EXISTS: readonly PointEntry[] = [
  { headline: "AI advice goes stale quickly.", detail: "Prices, plans and model names change every few weeks. A page without a date is a page you cannot judge, so ours always say when the facts were checked." },
  { headline: "Most people need a plain answer, not a leaderboard.", detail: "Readers ask which plan to pay for, how to keep private data safe and whether an answer can be trusted. We write for those questions first." },
  { headline: "Comparisons should show their working.", detail: "A score is a shortlist, not a verdict. We say what was tested, on which day, with which settings, and who reported each number." },
  { headline: "Learning should be a path, not a pile.", detail: "Every guide carries a level badge and links back to the page that explains its prerequisite, so you always know what to read next." },
];

export const SCORECARD_POINTS: readonly string[] = [
  "Accuracy on factual questions, with sources checked by hand",
  "Reasoning and maths on a fixed set of problems",
  "Writing and instruction following, with strict format limits",
  "Coding and tool use on a small repository task",
  "Long documents: a summary and a question about a distant page",
  "Cost per task, not only price per token",
  "Privacy and limits: training settings, retention and free-plan caps",
];

export const PROMISES: readonly PromiseEntry[] = [
  { title: "Every page is dated.", detail: "A verified-on date says when we checked the facts. A tested-on date says when our own test run happened.", link: { label: "How we stay current", href: "#current" } },
  { title: "Every number has a source.", detail: "We use the first source that answers the question: the provider's own page, then independent evaluators, then our own tests. Blogs are leads only.", link: { label: "Source policy", href: "/about/source-policy" } },
  { title: "Every claim is labelled.", detail: "Tested by us, independent third party or vendor-reported. Vendor numbers never share a column with independent ones.", link: { label: "How we test", href: "/about/how-we-test" } },
  { title: "Money does not buy a score.", detail: "Affiliate and sponsor status is never a scoring input, and paid content is labelled and kept apart.", link: { label: "Independence and disclosure", href: "/about/independence" } },
  { title: "Pages say how they are written.", detail: "How topics are chosen, who reviews, when a review counts as stale, and which AI tools helped draft.", link: { label: "Editorial standards", href: "/about/editorial-standards" } },
  { title: "Mistakes are fixed in public.", detail: "We log what was wrong, when it was reported, when it was fixed and what changed.", link: { label: "Corrections log", href: "/about/corrections" } },
];

export const WE_DO_NOT: readonly string[] = [
  "Publish a number we cannot trace to a named source and a date.",
  "Give makers early access to a review before we publish it.",
  "Let affiliate or sponsor status change a score, a ranking or a verdict.",
  "Fetch live data. Every figure on the site was read, checked and typed in by a person.",
  "Give legal, medical, financial or investment advice. Our pages are general information.",
  "Delete a replaced model or plan. We mark it Superseded and link to its successor.",
];

export const AI_DRAFTING_POINTS: readonly PointEntry[] = [
  { headline: "AI tools may help draft.", detail: "A site about AI should say how it uses AI. Which tools helped, and what they did, is listed on the editorial standards page." },
  { headline: "A person edits everything.", detail: "Nothing is published without a human edit and a check of its claims against the sources." },
  { headline: "Conflicts are disclosed.", detail: "Some models we review may also help draft content. Our independence page explains the rule that keeps that from affecting a review." },
];

export const CURRENT_CHECK: readonly PointEntry[] = [
  { headline: "Find the date.", detail: "Look for “Verified on” near the top of the page, and “Tested on” on a review." },
  { headline: "Read the label.", detail: "Tested by us, independent or vendor-reported. A maker's own claim is weaker evidence." },
  { headline: "Look for Superseded.", detail: "A Superseded label means the model or plan was replaced, and the page links to its successor." },
  { headline: "Check the changelog.", detail: "It lists every change to the site, including source conflicts we resolved." },
  { headline: "Open the provider's own page before you pay.", detail: "When in doubt, the provider's page wins. If it disagrees with us, tell us." },
];

export const READER_STARTS: readonly ReaderStart[] = [
  { reader: "Students", start: { label: "Use AI to study without cheating", href: "/learn/practitioner/use-ai-to-study-without-cheating" }, why: "Learn what helps, what your school may forbid and how to cite AI use." },
  { reader: "Parents and teachers", start: { label: "AI safety checklist", href: "/tools/ai-safety-checklist" }, why: "A tickable list for homes and schools, with plain reasons for each item." },
  { reader: "Job seekers", start: { label: "Cheat sheets and resume prompts", href: "/tools/cheat-sheets" }, why: "Fill-in prompts that keep a resume honest." },
  { reader: "Office workers and freelancers", start: { label: "AI for email and writing at work", href: "/learn/practitioner/ai-for-email-and-writing-at-work" }, why: "Drafting, tone and keeping client data private." },
  { reader: "Small business owners", start: { label: "AI safety checklist for businesses", href: "/tools/ai-safety-checklist#businesses" }, why: "Rules, data and agent access for small teams." },
  { reader: "Complete beginners", start: { label: "What is AI? A plain-English guide", href: "/learn/foundations/what-is-ai" }, why: "The simplest place to begin, with no jargon." },
];

export const CONTACT_ROUTES: readonly ContactRoute[] = [
  { title: "General questions", detail: "A question about a page, a tool or how we work.", link: { label: "Open the contact page", href: "/contact" } },
  { title: "Report an error", detail: "A wrong price, a dead link or a claim that does not match the provider's page. We log every correction.", link: { label: "Corrections policy and log", href: "/about/corrections" } },
  { title: "Press and partnerships", detail: "Interview requests, research collaborations and partnership ideas. Sponsorship does not buy coverage.", link: { label: "Open the contact page", href: "/contact" } },
];

export const BEFORE_YOU_WRITE: readonly string[] = [
  "Say which page you mean, and paste its address.",
  "For a wrong figure, include the provider's page where you saw the right one.",
  "Never send passwords, ID numbers, card details or client data.",
  "We cannot give personal legal, medical, financial or career advice.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Who is behind this site?", answer: "The people named in the “Who runs the site” section: an author who writes and tests, and an editor who reviews. Each role lists what it is responsible for. If a name is not yet shown, it will be published before the site launches." },
  { question: "Is the site independent?", answer: "Yes. Payment never changes a score or a verdict, affiliate and sponsor status is never a scoring input, and makers get no pre-publication access. Details are on the independence page." },
  { question: "How do you make money?", answer: "Possibly through disclosed affiliate links, clearly marked display ads once traffic is steady, one labelled newsletter sponsor slot, labelled sponsored content, and digital products and courses. Each has a rule in the funding table above." },
  { question: "Do you use AI to write the site?", answer: "AI tools may help draft, and a person edits and checks every page. The editorial standards page lists which models helped and what they did." },
  { question: "How often is the site updated?", answer: "On the targets in the cadence table: price changes within 24 hours, releases within 48 hours, a weekly roundup, a monthly review of roundups and a quarterly re-run of our tests. These are targets, not guarantees." },
  { question: "Why is there no live data?", answer: "The site is fully static on purpose. Every figure is read, checked and entered by a person, then dated. That keeps pages fast and makes each number traceable." },
  { question: "A page is wrong. What do I do?", answer: "Use the corrections page. We log the date reported, the date fixed and what changed." },
  { question: "Can I trust your scores?", answer: "Treat a score as a shortlist, not a verdict. Each says who produced it and on which day, so you can judge it, and you should test on your own tasks." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Verified on", meaning: "The date we checked prices and facts on the provider's own page." },
  { term: "Tested on", meaning: "The date our own test run happened, with the model version and effort setting." },
  { term: "Vendor-reported", meaning: "A number that comes from the maker's own announcement." },
  { term: "Independent third party", meaning: "A result from an evaluator that publishes its method and is not paid by the maker." },
  { term: "Superseded", meaning: "Replaced by a newer model or plan. The page stays, with a link to the successor." },
  { term: "Affiliate link", meaning: "A link that may pay us a commission if you buy. It is always disclosed and never changes a score." },
  { term: "Static site", meaning: "A site whose pages are built in advance and change only when we edit them." },
  { term: "Stale-review rule", meaning: "A rule for how long a review may sit before its test date is considered too old." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "Pages are accurate as of their verified-on date. Prices, plans and rules can change afterwards, so confirm on the provider's own page.",
  "Our publishing times are targets. A change can reach the site later than we aim for.",
  "Names for the author and editor roles, and the stale-review rule, are being finalised. Until they are shown, treat those parts of this page as incomplete.",
  "This site gives general information, not legal, medical, financial, investment or career advice.",
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "This site", title: "Editorial standards", href: "/about/editorial-standards", use: "How topics are chosen, who reviews and which AI tools helped draft" },
  { publisher: "This site", title: "How we test", href: "/about/how-we-test", use: "The seven-point scorecard, weights, test dates and result labels" },
  { publisher: "This site", title: "Source policy", href: "/about/source-policy", use: "The source hierarchy and how conflicts are settled" },
  { publisher: "This site", title: "Independence and disclosure", href: "/about/independence", use: "Affiliates, sponsors and the conflict-of-interest rule" },
  { publisher: "This site", title: "Corrections policy and log", href: "/about/corrections", use: "How to report an error and what we changed" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/news/changelog", label: "Changelog", note: "Every change to the site, with dates" },
  { href: "/contact", label: "Contact", note: "General questions, errors, press and partnerships" },
  { href: "/privacy-policy", label: "Privacy policy", note: "What we collect and why" },
  { href: "/terms", label: "Terms of use", note: "Using the site, and what it is not" },
  { href: "/sitemap", label: "Sitemap", note: "Every page in one list" },
  { href: "/news", label: "News hub", note: "Latest posts and upcoming dates" },
];