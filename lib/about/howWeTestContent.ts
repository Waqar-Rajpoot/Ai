import type {
  FaqEntry,
  GlossaryEntry,
  PointEntry,
  RelatedLink,
  SourceEntry,
} from "@/lib/society/societyContentTypes";

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "Every review uses the same seven tests.", detail: "Accuracy, reasoning, writing, coding, long documents, cost per task, and privacy and limits." },
  { headline: "Every test has a date and a setup.", detail: "We record the model version, the effort setting and the test day, so you can judge how old and how comparable a result is." },
  { headline: "Every number has a label.", detail: "Tested by us, independent third party or vendor-reported. Vendor numbers never share a column with independent ones." },
  { headline: "A score is a shortlist, not a verdict.", detail: "We tell you what a result can and cannot show, and you should still test on your own tasks." },
];

export const WEIGHT_STATUS_NOTE =
  "We have not published a weighting for the seven points yet. We would rather say so than show numbers we have not decided. Below, you can see what would push each weight up or down, and set your own.";

export const WEIGHT_PUBLISHED_NOTE =
  "These are the weights we use to combine the seven results, and the reason for each. A different reader may weigh them differently, so you can set your own below.";

export const WEIGHTER_NOTE =
  "This is a thinking aid. Weights and scores run from 0 to 10, and the result is a weighted average of the points you scored. Everything starts equal, which is a neutral starting point and not our published weighting. Nothing you type leaves your browser.";

export const COST_NOTE =
  "These numbers are hypothetical and describe no real model or plan. Real figures use the provider's price on the test day, and are shown in each review and on the API page.";

export const VENDOR_SPLIT_NOTE =
  "A vendor-reported number can only appear in its own, labelled table. This is how a score block is laid out. The cells hold no real values.";

export const FAQ: readonly FaqEntry[] = [
  { question: "Why do you not show weights for the seven points?", answer: "They are not decided yet, and we will not invent them. The page says so, explains what would move each weight, and lets you set your own. Once they are set, they will appear here with a reason for each." },
  { question: "Do you test every model?", answer: "We review the models in our directory. A new frontier or popular model gets a release post within 48 hours, and a full review with the scorecard follows within 7 days of our own test run. Models we have not tested show independent scores only." },
  { question: "Why are some numbers vendor-reported?", answer: "Makers publish their own results at launch, before anyone else can test. We show them, label them, and keep them in a separate table until we test or an independent source confirms them." },
  { question: "Can a maker pay for a better score?", answer: "No. Payment never changes a score or a verdict, affiliate and sponsor status is never a scoring input, and makers get no pre-publication access." },
  { question: "Why record the effort setting?", answer: "Higher thinking effort can raise both quality and cost. Two results are only comparable at the same setting, so we write it down." },
  { question: "How old is too old for a review?", answer: "That limit is still being decided, and the editorial standards page shows its status and has a tool to check a test date. Meanwhile, the quarterly re-run of the full battery is the main guard against old results." },
  { question: "Do you re-test models?", answer: "Yes, we re-run the full test battery every quarter on fixed dates, and we mark older reviews stale or Superseded." },
  { question: "What if I disagree with a result?", answer: "Tell us on the corrections page. Include the review and what you found, and we will log what we checked and what changed." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Scorecard", meaning: "The seven results for a model, shown together in a review." },
  { term: "Weight", meaning: "How much one test point counts when results are combined." },
  { term: "Effort setting", meaning: "A setting that controls how much thinking a model does before it answers." },
  { term: "Test day", meaning: "The calendar day our test run happened." },
  { term: "Vendor-reported", meaning: "A number that comes from the maker's own announcement." },
  { term: "Independent third party", meaning: "An outside evaluator that publishes its method and is not paid by the maker." },
  { term: "Cost per task", meaning: "What a typical task costs in total, including retries, not just the price per token." },
  { term: "Superseded", meaning: "Replaced by a newer model or plan. The page stays, with a link to the successor." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "The weights, the scoring scale and the number of tasks per point are not decided yet. Treat any combined score as incomplete until they are published.",
  "A test is a snapshot. Providers update models, so a result can age even when the name stays the same.",
  "Answers can vary between runs, so a single score may not repeat exactly.",
  "A test of one small task cannot predict how a model does on your own work.",
  "This page is general information, not legal, financial or investment advice.",
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "This site", title: "Source policy", href: "/about/source-policy", use: "The source hierarchy and how conflicts are settled" },
  { publisher: "This site", title: "Editorial standards", href: "/about/editorial-standards", use: "Stale-review rule, review checklist and AI use" },
  { publisher: "This site", title: "Independence and disclosure", href: "/about/independence", use: "Why payment never changes a score" },
  { publisher: "This site", title: "Corrections policy and log", href: "/about/corrections", use: "How to report an error" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/compare/models", label: "Model directory", note: "Prices, context and independent scores" },
  { href: "/compare/reviews", label: "Model reviews", note: "The scorecard in use" },
  { href: "/compare/vs", label: "Head-to-head tests", note: "Same ten tasks, one test day" },
  { href: "/learn/expert/how-to-read-ai-benchmark", label: "How to read an AI benchmark", note: "Level 4 explainer" },
  { href: "/tools/benchmark-checklist", label: "Benchmark reading checklist", note: "Ten questions before you trust a score" },
  { href: "/news/changelog", label: "Changelog", note: "Every change to the site, with dates" },
];