export interface ReaderPath {
  id: string;
  title: string;
  who: string;
  points: readonly string[];
  link: { href: string; label: string };
}

export interface StepEntry {
  title: string;
  detail: string;
}

export interface BenchmarkType {
  type: string;
  measures: string;
  strength: string;
  watchOut: string;
  examples: string;
}

export interface ChartTrick {
  pattern: string;
  check: string;
}

export interface LabelEntry {
  label: string;
  meaning: string;
}

export interface TermEntry {
  term: string;
  meaning: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface LinkEntry {
  title: string;
  href: string;
  note: string;
}

export const SHORT_ANSWER: readonly string[] = [
  "A benchmark score is a measurement of one test, run one way, on one day. It is a shortlist tool, not a verdict on which model is best.",
  "Before you trust a score, check who ran it, how, and whether the gap between models is bigger than the noise. This page turns that into ten questions.",
  "Scores from the maker are leads. Scores from independent evaluators that publish their method carry more weight, and scores from your own tasks carry the most.",
  "Small gaps are usually noise. Two models one or two points apart on a few hundred questions are often tied.",
  "The checklist rates the evidence behind a number. It does not rate the model.",
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "first-look",
    title: "I saw a chart in a launch post",
    who: "No technical background, curious whether the new model is really better",
    points: [
      "Run the 60-second routine below before you change tools.",
      "Look for the footnote under the chart and ask: who ran this?",
      "Do not switch because of a gap of a point or two.",
      "Use the examples to see how a vendor chart rates next to an independent leaderboard.",
    ],
    link: { href: "/compare/best", label: "See our best-for roundups" },
  },
  {
    id: "chooser",
    title: "I am choosing a model for work or a product",
    who: "Freelancers, analysts, developers and team leads",
    points: [
      "Run the checklist for every score that your decision leans on.",
      "Answer question 8 honestly: does the test look like your work?",
      "Compare cost per task, not only scores.",
      "Finish with ten of your own tasks. They beat any public number.",
    ],
    link: { href: "/learn/power-user/build-your-own-ai-test-set", label: "Build your own test set" },
  },
  {
    id: "explainer",
    title: "I explain or sign off on AI claims",
    who: "Journalists, managers, procurement and compliance leads",
    points: [
      "Print the checklist and attach it to the decision record.",
      "Quote a score with its source, date, model version and settings.",
      "Never put a vendor number next to an independent one without a label.",
      "Treat \"not sure\" as an open task, not as a pass.",
    ],
    link: { href: "/about/source-policy", label: "Read our source policy" },
  },
];

export const SIXTY_SECOND_ROUTINE: readonly StepEntry[] = [
  { title: "Find the footnote", detail: "Small print under a chart often says which model version, which settings and how many attempts. No footnote is itself a signal." },
  { title: "Ask who ran it", detail: "The maker, or someone else? If the maker, call it a lead and look for an independent source." },
  { title: "Look for a margin", detail: "Error bars, vote counts or a number of questions. Without them, a small gap should not move you." },
  { title: "Check the conditions", detail: "Were tools, extra thinking or several attempts used for one model and not the others?" },
  { title: "Ask whether it is your task", detail: "A score on something you will never do is background, not evidence." },
];

export const BENCHMARK_TYPES: readonly BenchmarkType[] = [
  { type: "Exam-style question sets", measures: "Knowledge and reasoning across many subjects, usually multiple choice.", strength: "Cheap, repeatable and objective.", watchOut: "Old public sets may have leaked into training, and top models bunch near the ceiling.", examples: "General-knowledge and graduate-level science sets" },
  { type: "Maths problem sets", measures: "Solving problems that have one checkable answer.", strength: "Easy to grade with no judge needed.", watchOut: "Tells you little about everyday writing or planning, and public problems can leak.", examples: "Competition-style and school-level sets" },
  { type: "Coding tasks with tests", measures: "Writing or fixing code that must pass tests.", strength: "Passing tests is an objective check.", watchOut: "Results depend heavily on the agent setup, the tools and the number of attempts.", examples: "Real repository issue sets, programming contests" },
  { type: "Agent and tool-use tasks", measures: "Multi-step work with tools, such as browsing or editing files.", strength: "Closer to real work than single questions.", watchOut: "Sensitive to the harness and tool set, and costly to repeat, so few runs.", examples: "Web, computer-use and workplace task suites" },
  { type: "Long-context tests", measures: "Finding or reasoning over very long inputs.", strength: "Checks the advertised context size.", watchOut: "Simple find-the-fact tests are easy. Real documents are harder.", examples: "Needle-in-a-haystack and long-document question sets" },
  { type: "Human-preference arenas", measures: "Which answer people prefer in blind side-by-side votes.", strength: "Broad, fresh prompts from real users.", watchOut: "Votes can favour style and length, and the voters are not like you. Look for vote counts and margins.", examples: "Public chat arenas" },
  { type: "Composite scores", measures: "Many tests combined into one number.", strength: "Easy to scan and sort.", watchOut: "The weights hide trade-offs. Use as a shortlist, not a verdict.", examples: "Aggregator scores and indexes" },
];

export const CHART_TRICKS: readonly ChartTrick[] = [
  { pattern: "Bars that start above zero make small gaps look huge.", check: "Read the axis numbers, not the bar lengths." },
  { pattern: "One model gets several attempts and the score keeps the best.", check: "Look for \"best of N\" or \"pass@k\" next to some models and not others." },
  { pattern: "One model has tools or extra thinking switched on.", check: "Compare the notes for each bar. They should match." },
  { pattern: "The new model is compared with an older version of a rival.", check: "Check that rival versions are the current ones." },
  { pattern: "Only the tests where the model wins are shown.", check: "Look for the full results table, and ask which tests are missing." },
  { pattern: "\"20% better\" is a relative gain on a small base.", check: "Find the raw scores. Going from 2.0 to 2.4 is 20% and 0.4 points." },
  { pattern: "A custom prompt is used for one model.", check: "Look for the prompt and whether it was applied to all models." },
  { pattern: "The effort or compute budget is not stated.", check: "Ask what setting produced the number and whether you can buy it." },
  { pattern: "An average across unrelated tests hides weak spots.", check: "Open the per-test breakdown for the one that matches your task." },
];

export const SITE_LABELS: readonly LabelEntry[] = [
  { label: "Tested by us", meaning: "Our own test run. We record the date, the model version and the effort setting." },
  { label: "Independent third party", meaning: "An evaluator that publishes its method, such as a benchmark aggregator or a human-preference arena." },
  { label: "Vendor-reported", meaning: "The number comes from the maker's own announcement. It never shares a column with independent numbers." },
];

export const SOURCE_HIERARCHY: readonly string[] = [
  "The provider's own pricing, model or documentation page, opened on the day.",
  "Independent evaluators that publish their method.",
  "Our own tests, with the date and settings recorded.",
  "Secondary blogs and roundups: leads only, never the sole source of a number.",
];

export const BEYOND_CHECKLIST: readonly LinkEntry[] = [
  { title: "Cost per task", href: "/prices/api", note: "A model that wins by two points and costs five times as much per task may not be the better buy." },
  { title: "API cost calculator", href: "/tools/api-cost-calculator", note: "Turn a price per million tokens into a monthly estimate for your own workload." },
  { title: "Build your own test set", href: "/learn/power-user/build-your-own-ai-test-set", note: "Ten real tasks, a scoring sheet and a re-test schedule." },
  { title: "Fact-check what a model tells you", href: "/learn/practitioner/fact-check-ai-answers", note: "The routine for checking answers, which also helps with claims about models." },
];

export const GOTCHAS: readonly string[] = [
  "A high rating means the evidence is good, not that the model is right for you.",
  "\"Not sure\" earns no credit. That is deliberate: unknown is not the same as fine.",
  "Question weights and rating thresholds are editorial judgements, not a standard.",
  "Even a well-run test measures one slice of ability. Models can score well and still fail your tasks.",
  "Scores go stale. A strong rating today may not hold after the next model update.",
  "The margin check assumes simple sampling. Real uncertainty is usually larger.",
];

export const GLOSSARY: readonly TermEntry[] = [
  { term: "Benchmark", meaning: "A fixed set of tasks used to compare models." },
  { term: "Vendor-reported", meaning: "A score published by the model's maker rather than by an outside evaluator." },
  { term: "Independent evaluator", meaning: "A third party that runs the tests and publishes how." },
  { term: "Harness", meaning: "The code and prompts that run a model through a test and score the result." },
  { term: "Pass@1", meaning: "The share of tasks solved on the first attempt." },
  { term: "Best-of-N", meaning: "A score that keeps the best of several attempts. It is higher than a first-attempt score." },
  { term: "Contamination", meaning: "Test questions or answers that appeared in training data, which inflates the score." },
  { term: "Held-out set", meaning: "Test questions kept private or refreshed so models cannot have seen them." },
  { term: "Saturation", meaning: "When top models score near the maximum and the test stops separating them." },
  { term: "Margin of error", meaning: "The range within which a score could fall by chance, often shown as a confidence interval." },
  { term: "Elo rating", meaning: "A ranking number built from head-to-head results, used by human-preference arenas." },
  { term: "Judge model", meaning: "An AI model that grades other models' answers." },
  { term: "Style control", meaning: "An adjustment that reduces the effect of answer length and formatting on votes." },
  { term: "Effort setting", meaning: "How much thinking a model is allowed. Higher effort usually raises scores and cost." },
  { term: "System card", meaning: "A maker-written document that describes a model's tests, limits and safety results." },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Can I trust a score from the model's maker?", answer: "Treat it as a lead. It is usually accurate about what it shows, but makers choose which tests and settings to show. Look for an independent source before you act on it." },
  { question: "Does a high score mean it is best for me?", answer: "No. A score is a shortlist tool. The best model for you is the one that does your tasks well at a price you accept." },
  { question: "How big a gap is meaningful?", answer: "It depends on how many questions or votes were used. At 50% accuracy, one score has a margin of about 10 points on 100 questions and about 3 points on 1,000. A gap between two models needs to be larger than that. Use the margin check above." },
  { question: "Why do leaderboards disagree?", answer: "They use different tests, weights, dates, settings and graders. A disagreement is a prompt to ask which one matches your task." },
  { question: "How can I tell whether a test has leaked?", answer: "You usually cannot be sure. Prefer tests with private or refreshed questions, and be wary of a model that does far better on old public questions than on fresh ones." },
  { question: "Are human-preference arenas reliable?", answer: "They measure what voters prefer. Large vote counts reduce random noise, but not style bias. Check vote counts, margins and whether style control is applied. They suit chat feel better than specialist work." },
  { question: "Is it a problem if an AI grades the answers?", answer: "It can be. Judge models can favour longer answers or models from their own maker. Check which judge was used and whether bias controls are described." },
  { question: "How many questions are enough?", answer: "For two scores in the middle range, hundreds of questions detect gaps of several points and thousands detect gaps of one or two. The margin check shows the number for your gap." },
  { question: "What should I do instead of trusting benchmarks?", answer: "Run ten of your own tasks through each shortlisted model and score them the same way. Re-run when models change." },
  { question: "How does this site handle benchmark numbers?", answer: "Every number carries a label (tested by us, independent third party or vendor-reported), a date and a source. Vendor and independent numbers never share a column." },
];

export const METHOD_NOTES: readonly string[] = [
  "This checklist rates the evidence behind a number. It does not rate a model.",
  "Question weights and rating thresholds are our editorial judgement, not an industry standard.",
  "The three examples describe typical patterns, not real benchmarks.",
  "The margin check uses a normal approximation for the difference between two scores on independent questions, at 95% confidence. It ignores run-to-run variation and grader noise, so real uncertainty is usually larger. If both models answered the same questions, the noise from question choice can be smaller.",
  "Benchmark families named in the types table are examples. Names and versions change.",
  "Nothing you enter on this page is sent or saved.",
];

export const RELATED_LINKS: readonly LinkEntry[] = [
  { title: "How to read an AI benchmark", href: "/learn/expert/how-to-read-ai-benchmark", note: "The Level 4 guide behind this checklist." },
  { title: "Benchmark digest", href: "/prices/benchmarks", note: "Independent and vendor-reported scores, in separate tables." },
  { title: "Model directory", href: "/compare/models", note: "Scores with verified-on dates." },
  { title: "How we test", href: "/about/how-we-test", note: "Our own test battery and labels." },
  { title: "Source policy", href: "/about/source-policy", note: "How we rank sources and resolve conflicts." },
  { title: "Glossary", href: "/learn/glossary", note: "Plain-English definitions at every level." },
];