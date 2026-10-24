import type { ChecklistAnswer, EvidenceTier } from "./checklists";
import type { MarginFormValues, GapVerdict } from "./benchmarkMargin";

export interface AnswerOption {
  id: Exclude<ChecklistAnswer, "unanswered">;
  label: string;
}

export interface TierCopy {
  label: string;
  message: string;
}

export interface BenchmarkExample {
  id: string;
  title: string;
  description: string;
  answers: Record<string, ChecklistAnswer>;
}

export interface MarginExample {
  id: string;
  title: string;
  values: MarginFormValues;
}

export interface GapVerdictCopy {
  heading: string;
  body: string;
}

export const ANSWER_OPTIONS: readonly AnswerOption[] = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "unsure", label: "Not sure" },
];

/** Ten questions. Weights sum to 24. Critical questions: who ran it, like for like, margin versus gap. */
export const BENCHMARK_QUESTIONS: any = [
  {
    id: "who-ran-it",
    number: 1,
    shortTitle: "Who ran the test?",
    question: "Was the score produced by someone other than the company that made the model?",
    weight: 3,
    isCritical: true,
    whyItMatters: "Makers choose which tests to show, which settings to use and which results to leave out. An independent evaluator has less reason to flatter a model, and many publish their method.",
    goodSign: "An independent evaluator, a university or a community arena published the number on its own page.",
    redFlag: "The only source is the maker's launch post, chart or slide, or a site repeating it.",
    whereToLook: "The footnote under the chart, the evaluator's own site and the launch page. Check that the number appears on the evaluator's page, not just in a quote of it.",
    ifUnsure: "Look for the evaluator's own page. If you find none, treat the number as vendor-reported and as a lead only.",
  },
  {
    id: "method-published",
    number: 2,
    shortTitle: "Is the method published?",
    question: "Is the method described well enough that someone else could repeat it?",
    weight: 2,
    isCritical: false,
    whyItMatters: "Without the prompt, the scoring rule and the number of attempts, you cannot tell what a score means.",
    goodSign: "Prompts or a test harness, the scoring rule, the number of attempts and the tools allowed are described or linked.",
    redFlag: "A single number with no footnote, or a note such as \"internal evaluation\".",
    whereToLook: "A methodology page, a technical report, a code repository and the chart footnotes.",
    ifUnsure: "Search the page for \"methodology\" or \"evaluation details\". If nothing explains the setup, answer No.",
  },
  {
    id: "like-for-like",
    number: 3,
    shortTitle: "Same conditions for every model?",
    question: "Were all the models in the comparison tested under the same conditions?",
    weight: 3,
    isCritical: true,
    whyItMatters: "Thinking effort, tools, repeated attempts and tailored prompts can lift a score without making the model better.",
    goodSign: "The same prompts, effort setting, tools and number of attempts for every model in the chart.",
    redFlag: "One model carries notes such as \"with tools\" or \"best of 8\" and the others do not, or settings are not stated.",
    whereToLook: "Footnotes, appendix tables and the evaluator's settings column.",
    ifUnsure: "Assume it is not like for like until the footnotes say otherwise.",
  },
  {
    id: "exact-model",
    number: 4,
    shortTitle: "Exact model and setting?",
    question: "Does the score name the exact model version and setting you would actually use?",
    weight: 2,
    isCritical: false,
    whyItMatters: "A model can come in several tiers and effort levels. A score for the top setting may not match the plan you pay for.",
    goodSign: "The version, the effort or thinking level and the access tier are named, and you can buy or run them.",
    redFlag: "A family name only, a preview or internal version, or a setting you cannot access.",
    whereToLook: "The chart legend, the footnotes and the provider's own model page.",
    ifUnsure: "Compare the version name with the provider's model page, and note the effort setting.",
    relatedLink: { href: "/learn/power-user/reasoning-models-effort-settings", label: "How effort settings change results" },
  },
  {
    id: "margin-vs-gap",
    number: 5,
    shortTitle: "Gap bigger than the margin?",
    question: "Is the gap between the models bigger than the margin of error?",
    weight: 3,
    isCritical: true,
    whyItMatters: "Scores come from a limited number of questions or votes, and runs vary. Two models one point apart are often tied.",
    goodSign: "The gap is several times the stated margin, or the source publishes confidence intervals or vote counts that support it.",
    redFlag: "A one-point lead presented as a ranking, with no margin, few questions or few votes.",
    whereToLook: "Error bars, confidence intervals, vote counts and the number of questions.",
    ifUnsure: "Find how many questions or votes were used, then run the margin check on this page.",
    relatedLink: { href: "#margin-check", label: "Use the margin check" },
  },
  {
    id: "contamination",
    number: 6,
    shortTitle: "Could the questions have leaked?",
    question: "Is it unlikely that the test questions leaked into the model's training data?",
    weight: 2,
    isCritical: false,
    whyItMatters: "If the model saw the questions or answers in training, the score measures memory, not skill. Tests that have been public for years are the most exposed.",
    goodSign: "A private or regularly refreshed test set, questions written after the model's training cut-off, or contamination checks described.",
    redFlag: "A long-public test with no mention of leakage, or a model that scores far higher on old questions than on fresh ones.",
    whereToLook: "The benchmark's notes on held-out, live or refreshed questions, and the contamination section of the technical report.",
    ifUnsure: "Prefer tests that publish a refresh date or keep part of the set private.",
  },
  {
    id: "how-graded",
    number: 7,
    shortTitle: "How was it graded?",
    question: "Do you know how the answers were graded, and is that method fair?",
    weight: 2,
    isCritical: false,
    whyItMatters: "Answer matching is objective but narrow. Human votes can reward style and length. AI judges can favour longer answers or models from their own maker.",
    goodSign: "Automatic checks against known answers, such as tests that pass, or humans or judges with bias controls described.",
    redFlag: "An AI judge from the same company as one of the models, no rubric, or style-driven votes with no controls.",
    whereToLook: "The grading section, any \"style control\" note and the name of the judge model.",
    ifUnsure: "Look for the words \"judge\", \"rubric\", \"style control\" or \"pass rate\".",
  },
  {
    id: "matches-your-task",
    number: 8,
    shortTitle: "Does it look like your work?",
    question: "Does the test look like the work you want the model to do?",
    weight: 3,
    isCritical: false,
    whyItMatters: "A strong maths score says little about drafting emails. A coding score on short puzzles says little about editing a large codebase.",
    goodSign: "The tasks, length, language and tools resemble yours.",
    redFlag: "A headline average across unrelated tests, or a task type you never do.",
    whereToLook: "The benchmark description, sample questions and per-category scores.",
    ifUnsure: "Read five sample questions. If they do not look like your work, treat the score as background only.",
    relatedLink: { href: "/learn/power-user/build-your-own-ai-test-set", label: "Build your own test set" },
  },
  {
    id: "still-separates",
    number: 9,
    shortTitle: "Can it still tell models apart?",
    question: "Can the test still tell good models apart?",
    weight: 2,
    isCritical: false,
    whyItMatters: "When the best models all score 95 to 99 out of 100, small gaps are noise and the test has stopped being useful.",
    goodSign: "The top models sit well below the ceiling and are spread out.",
    redFlag: "Most leading models bunch near the maximum.",
    whereToLook: "The top ten of the leaderboard and the benchmark's own notes on saturation.",
    ifUnsure: "Look at the top five scores. If they sit within a few points of the ceiling, give them little weight.",
  },
  {
    id: "dated-and-confirmed",
    number: 10,
    shortTitle: "Dated, and confirmed elsewhere?",
    question: "Is the score recent and dated, and does a second source agree?",
    weight: 2,
    isCritical: false,
    whyItMatters: "Models get updated and tests change. An undated score may describe an older version, and a single source can be wrong.",
    goodSign: "A date, a model version, and a second source with a similar number.",
    redFlag: "No date, or two sources that disagree with no explanation.",
    whereToLook: "The evaluator's \"last updated\" line, our model directory and other evaluators.",
    ifUnsure: "Check the date, then look for one more independent source.",
    relatedLink: { href: "/compare/models", label: "See dated scores in the model directory" },
  },
];

export const TIER_COPY: Record<EvidenceTier | "incomplete", TierCopy> = {
  incomplete: {
    label: "Not enough answers yet",
    message: "Answer at least six of the ten questions to get a rating. \"Not sure\" counts as an answer.",
  },
  strong: {
    label: "Strong evidence",
    message: "This score is well supported. It is still a shortlist, not a verdict: check it on your own tasks before you commit.",
  },
  moderate: {
    label: "A lead, not proof",
    message: "Useful for building a shortlist. Chase the open questions below before you rely on it for a decision.",
  },
  weak: {
    label: "Weak evidence",
    message: "Do not base a decision on this score alone. Find an independent source or run your own test.",
  },
};

/** Illustrative patterns, not real benchmarks. */
export const BENCHMARK_EXAMPLES: readonly BenchmarkExample[] = [
  {
    id: "vendor-chart",
    title: "A vendor launch chart",
    description: "A bar chart in a model launch post, with a short footnote.",
    answers: {
      "who-ran-it": "no",
      "method-published": "no",
      "like-for-like": "unsure",
      "exact-model": "yes",
      "margin-vs-gap": "no",
      contamination: "unsure",
      "how-graded": "unsure",
      "matches-your-task": "unsure",
      "still-separates": "unsure",
      "dated-and-confirmed": "no",
    },
  },
  {
    id: "independent-leaderboard",
    title: "An independent leaderboard",
    description: "An evaluator that publishes its method, with a refreshed test set.",
    answers: {
      "who-ran-it": "yes",
      "method-published": "yes",
      "like-for-like": "yes",
      "exact-model": "yes",
      "margin-vs-gap": "unsure",
      contamination: "yes",
      "how-graded": "yes",
      "matches-your-task": "unsure",
      "still-separates": "yes",
      "dated-and-confirmed": "yes",
    },
  },
  {
    id: "human-arena",
    title: "A human-preference arena",
    description: "A ranking built from blind votes, with vote counts and margins shown.",
    answers: {
      "who-ran-it": "yes",
      "method-published": "yes",
      "like-for-like": "yes",
      "exact-model": "yes",
      "margin-vs-gap": "yes",
      contamination: "yes",
      "how-graded": "unsure",
      "matches-your-task": "unsure",
      "still-separates": "yes",
      "dated-and-confirmed": "yes",
    },
  },
];

export const MARGIN_EXAMPLES: readonly MarginExample[] = [
  { id: "close-small", title: "Close scores, small test", values: { scoreAText: "78", scoreBText: "80", sampleSizeText: "500" } },
  { id: "wide-large", title: "Wider gap, bigger test", values: { scoreAText: "80", scoreBText: "85", sampleSizeText: "2000" } },
  { id: "near-ceiling", title: "Near the ceiling", values: { scoreAText: "96.5", scoreBText: "97.4", sampleSizeText: "1000" } },
];

export const GAP_VERDICT_COPY: Record<GapVerdict, GapVerdictCopy> = {
  clear: {
    heading: "The gap is clearly bigger than the noise",
    body: "On this test, the difference is unlikely to be down to chance in which questions or votes were sampled. That says nothing yet about your own tasks.",
  },
  narrow: {
    heading: "The gap is bigger than the noise, but only just",
    body: "A real difference is likely on this test, but small changes in settings or grading could erase it. Look for a second source.",
  },
  noise: {
    heading: "The gap is within the noise",
    body: "These two scores cannot be told apart on this evidence. Treat the models as tied on this test, and do not rank them by it.",
  },
};