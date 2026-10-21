import type { DefinitionItem, FaqItem } from "./compareStandards";

export interface UseCaseLink {
  id: string;
  label: string;
  href: string;
}

/** The 13 roundups from Blueprint 5.3. */
export const USE_CASE_LINKS: readonly UseCaseLink[] = [
  { id: "overall", label: "Best overall", href: "/compare/best/overall" },
  { id: "by-job", label: "Best model right now, by job", href: "/compare/best/by-job" },
  { id: "coding", label: "Coding", href: "/compare/best/coding" },
  { id: "writing", label: "Writing", href: "/compare/best/writing" },
  { id: "agents", label: "Agents", href: "/compare/best/agents" },
  { id: "value", label: "Value", href: "/compare/best/value" },
  { id: "cheap-and-fast", label: "Cheap and fast", href: "/compare/best/cheap-and-fast" },
  { id: "open-weights", label: "Open weights", href: "/compare/best/open-weights" },
  { id: "local", label: "Local", href: "/compare/best/local" },
  { id: "students", label: "Students", href: "/compare/best/students" },
  { id: "small-business", label: "Small business", href: "/compare/best/small-business" },
  { id: "image", label: "Image", href: "/compare/best/image" },
  { id: "video", label: "Video", href: "/compare/best/video" },
];

export const REVIEW_LAYOUT_SECTIONS: readonly DefinitionItem[] = [
  { id: "summary", term: "Summary box", description: "What it does, who it is for and a one-line verdict, at the top." },
  { id: "skip", term: "Who should skip it", description: "A plain statement of who is better served by something else." },
  { id: "price", term: "Price and context", description: "API price in and out, the context window and the consumer plan." },
  { id: "results", term: "Our test results", description: "Accuracy, reasoning and maths, writing and instruction following, coding and tool use, long documents, cost per task, privacy and limits." },
  { id: "scorecard", term: "Scorecard", description: "The seven-point scorecard, so models can be compared like for like." },
  { id: "safety", term: "Safety and limits", description: "Published safety documentation, restricted domains and the privacy terms for the plan." },
  { id: "alternatives", term: "Alternatives", description: "Other models worth considering, with links." },
  { id: "verdict", term: "Verdict", description: "Our conclusion, written after the tests." },
  { id: "dates", term: "Dates and labels", description: "Tested on, Verified on, and whether each number is tested by us, independent or vendor-reported." },
  { id: "affiliate", term: "Affiliate disclosure", description: "Shown whenever the page has affiliate links." },
];

/** Blueprint 6.6. */
export const SCORECARD_POINTS: readonly DefinitionItem[] = [
  { id: "accuracy", term: "1. Accuracy", description: "Factual questions, with sources checked by hand." },
  { id: "reasoning", term: "2. Reasoning and maths", description: "A fixed set of problems." },
  { id: "writing", term: "3. Writing and instruction following", description: "Drafts with strict format limits." },
  { id: "coding", term: "4. Coding and tool use", description: "A small repository task, with each model's recommended settings." },
  { id: "long-documents", term: "5. Long documents", description: "A PDF summary and a question about a distant page." },
  { id: "cost", term: "6. Cost per task", description: "The cost of finishing the task, not only the price per token." },
  { id: "privacy", term: "7. Privacy and limits", description: "Training settings, data retention and free-plan caps." },
];

export const REVIEW_FRESHNESS_RULES: readonly DefinitionItem[] = [
  { id: "launch", term: "New frontier or popular model", description: "A short 'What changed and should you care?' post and a directory row within 48 hours." },
  { id: "review", term: "After our own test run", description: "A full review with scorecard and test date within 7 days." },
  { id: "price", term: "Price, plan or limit change", description: "A price-change note within 24 hours, then the tables are updated." },
  { id: "quarter", term: "Every quarter", description: "The full test battery is re-run and the privacy matrix is refreshed." },
];

export const HOW_TO_READ_A_REVIEW: readonly DefinitionItem[] = [
  { id: "summary", term: "Start with the summary box", description: "It gives the answer in a few lines, so you can decide whether to read on." },
  { id: "skip", term: "Read 'Who should skip it'", description: "It is often the quickest way to rule a model out." },
  { id: "dates", term: "Check the dates and settings", description: "A result is one test on one day, with a stated model version and effort setting." },
  { id: "scorecard", term: "Compare scorecards, not single numbers", description: "A model can lead on one point and trail on another that matters more to you." },
  { id: "price", term: "Confirm the price", description: "Prices change. Check the provider's own page before you buy." },
  { id: "alternatives", term: "Follow the alternatives", description: "Each review links to models worth comparing against it." },
];

export const REVIEWS_FAQ: readonly FaqItem[] = [
  { id: "coming", question: "Why do the reviews say 'Review coming'?", answer: "A review is published only after our own test run. Until then the site shows independent scores, which you can see in the model directory.", link: { label: "Open the model directory", href: "/compare/models" } },
  { id: "pick", question: "How do you choose which models to review?", answer: "New frontier or popular models first. A short post goes out within 48 hours of a release, and the full review follows once the tests are done." },
  { id: "makers", question: "Do makers see a review before it is published?", answer: "No. Makers get no pre-publication access.", link: { label: "Independence and disclosure", href: "/about/independence" } },
  { id: "affiliate", question: "Do affiliate links or sponsors change a score?", answer: "No. Affiliate or sponsor status is never a scoring input, and sponsored content is kept apart from reviews." },
  { id: "drafting", question: "Do AI tools help write the reviews?", answer: "The editorial standards page lists which AI tools were used for drafting, what they did and what a person edited.", link: { label: "Editorial standards", href: "/about/editorial-standards" } },
  { id: "stale", question: "What if a review is out of date?", answer: "Every review shows its test date. When a model is replaced, the review is marked 'Superseded' and links to its successor instead of being deleted." },
  { id: "vendor-numbers", question: "A maker's numbers disagree with your results. Which should I trust?", answer: "Vendor-reported numbers are labelled and kept apart from independent and tested results. Treat them as a lead to check.", link: { label: "How to read an AI benchmark", href: "/learn/expert/how-to-read-ai-benchmark" } },
  { id: "error", question: "How do I report an error?", answer: "Use the corrections page. Reports are logged with the date reported and the date fixed.", link: { label: "Corrections log", href: "/about/corrections" } },
];