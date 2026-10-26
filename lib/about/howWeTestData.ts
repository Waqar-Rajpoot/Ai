import type { CostExample, LabelDetail, OpenDecision, RecordField, TestPoint } from "./howWeTest";

/**
 * The seven-point scorecard (Blueprint 6.6). Weights are null on purpose: Blueprint 5.1 lists
 * "Scorecard weights: weight per point, why" but gives no values. Set `weight` and `whyThisWeight`
 * on every point once decided, and the page, the share table and the tests switch over together.
 */
export const TEST_POINTS: readonly TestPoint[] = [
  {
    id: "accuracy",
    number: 1,
    name: "Accuracy on factual questions",
    whatWeTest: "Whether the model's answers to factual questions are correct, with the sources behind them checked by hand.",
    howWeRunIt: [
      "Ask a fixed set of factual questions with known answers.",
      "Open every source or link the model gives and check that it exists and says what is claimed.",
      "Mark an invented source as a failure, however fluent the answer is.",
    ],
    whatItShows: "How often the model states checkable facts correctly, and whether it invents sources.",
    whatItCannotShow: "Accuracy on your own subject, or on events after the model's knowledge ends.",
    weight: null,
    whyThisWeight: null,
    weightConsiderations: [
      "Wrong answers cost more in health, legal, money and school work, which argues for a higher weight.",
      "Many readers can check a fact quickly, which argues against the top weight.",
    ],
    relatedLinks: [{ label: "How to fact-check AI answers", href: "/learn/practitioner/fact-check-ai-answers" }],
  },
  {
    id: "reasoning",
    number: 2,
    name: "Reasoning and maths",
    whatWeTest: "Whether the model works through multi-step problems correctly.",
    howWeRunIt: [
      "Use a fixed set of problems with known answers.",
      "Score the final answer, and note whether the working holds up.",
      "Record the effort setting used, since more thinking effort can change the result and the cost.",
    ],
    whatItShows: "How well the model handles problems that need several steps.",
    whatItCannotShow: "How it performs on messy real-world tasks, or whether extra effort is worth its cost for you.",
    weight: null,
    whyThisWeight: null,
    weightConsiderations: [
      "Study, research and analysis use this heavily, which argues for a higher weight.",
      "Everyday writing and summarising use it rarely, which argues for a lower one.",
    ],
    relatedLinks: [{ label: "Reasoning models and effort settings", href: "/learn/power-user/reasoning-models-effort-settings" }],
  },
  {
    id: "writing",
    number: 3,
    name: "Writing and instruction following",
    whatWeTest: "Whether the model produces a good draft and obeys strict format limits.",
    howWeRunIt: [
      "Ask for drafts with hard limits, such as a word count, a fixed layout or a banned topic.",
      "Check each limit by hand. A draft that reads well but ignores a limit loses points.",
    ],
    whatItShows: "Whether the model does what it is told, and writes in a usable style.",
    whatItCannotShow: "Your personal taste, or how well it matches your own voice.",
    weight: null,
    whyThisWeight: null,
    weightConsiderations: [
      "Most everyday use is writing, which argues for a higher weight.",
      "Style is partly personal, which limits how much one score can say.",
    ],
    relatedLinks: [{ label: "How to write better prompts", href: "/learn/foundations/write-better-prompts" }],
  },
  {
    id: "coding",
    number: 4,
    name: "Coding and tool use",
    whatWeTest: "Whether the model completes a small repository task and uses tools correctly.",
    howWeRunIt: [
      "Give every model the same small repository task.",
      "Use each model's recommended settings, so no model is handicapped by a setting that was not meant for it.",
      "Check that the result works, not only that it looks right.",
    ],
    whatItShows: "How well the model handles a small, well-defined coding job with tools.",
    whatItCannotShow: "Performance on your language, your codebase or large multi-day agent work.",
    weight: null,
    whyThisWeight: null,
    weightConsiderations: [
      "Builders and developers weigh this heavily, and most other readers hardly use it.",
      "A single small task is a thin sample, which argues against a very high weight.",
    ],
    relatedLinks: [{ label: "AI agents explained", href: "/learn/power-user/ai-agents-explained" }],
  },
  {
    id: "long-documents",
    number: 5,
    name: "Long documents",
    whatWeTest: "Whether the model summarises a long file and answers a question about a distant page.",
    howWeRunIt: [
      "Give each model a PDF and ask for a summary.",
      "Ask a question whose answer sits on a page far from the start, and check it against the file.",
      "Note the file size limits and any pages the model skipped.",
    ],
    whatItShows: "Whether a large context window actually helps, or the model loses track of the middle.",
    whatItCannotShow: "How it handles scans, tables and charts unless the test file includes them.",
    weight: null,
    whyThisWeight: null,
    weightConsiderations: [
      "Students, researchers and office workers use this often, which argues for a higher weight.",
      "A short-answer reader may never use it, which argues for a lower one.",
    ],
    relatedLinks: [{ label: "How to summarize a PDF with AI", href: "/learn/practitioner/summarize-pdf-with-ai" }],
  },
  {
    id: "cost",
    number: 6,
    name: "Cost per task",
    whatWeTest: "What a typical task costs, not only the price per token.",
    howWeRunIt: [
      "Count the input and output tokens each model uses on the same tasks.",
      "Multiply by the provider's price, read on its own page on the day.",
      "Add the cost of retries when a task needed more than one go.",
    ],
    whatItShows: "Which model is cheaper in practice, which can differ from the price list.",
    whatItCannotShow: "Your own usage, or any introductory price that has since ended.",
    weight: null,
    whyThisWeight: null,
    weightConsiderations: [
      "Bulk and API users weigh cost heavily, since it multiplies across many tasks.",
      "A reader on a flat monthly plan sees no per-task cost, which argues for a lower weight.",
    ],
    relatedLinks: [
      { label: "API costs", href: "/prices/api" },
      { label: "API cost calculator", href: "/tools/api-cost-calculator" },
    ],
  },
  {
    id: "privacy",
    number: 7,
    name: "Privacy and limits",
    whatWeTest: "What the plan does with your data, and what its limits are.",
    howWeRunIt: [
      "Read the provider's own terms for training settings, data retention and deletion.",
      "Record free-plan caps and where each plan stops.",
      "Mark anything we could not confirm on the provider's page.",
    ],
    whatItShows: "How a plan treats your data and how far a free plan goes.",
    whatItCannotShow: "How a provider behaves beyond what its terms say. Terms change, so the privacy matrix is refreshed every quarter.",
    weight: null,
    whyThisWeight: null,
    weightConsiderations: [
      "Schools, clinics, firms and anyone with client data weigh this heavily.",
      "A reader asking only general questions may weigh it less.",
    ],
    relatedLinks: [
      { label: "Privacy matrix", href: "/prices/privacy" },
      { label: "Free-plan limits", href: "/prices/free-limits" },
    ],
  },
];

/** The three result labels (Blueprint 5.1 and 6.6). Vendor numbers never share a column with independent ones. */
export const LABEL_DETAILS: readonly LabelDetail[] = [
  {
    label: "tested",
    meaning: "We ran the test ourselves, on a recorded day, with a recorded model version and effort setting.",
    whoProduced: "Our own test run.",
    strength: "Strongest for the tasks we ran, because you can see exactly how it was done. It is still a limited sample.",
    howShown: "Shown with a tested-on date, the model version and the effort setting.",
  },
  {
    label: "independent",
    meaning: "The result comes from an outside evaluator that publishes its method and is not paid by the maker.",
    whoProduced: "A benchmark aggregator or a human-preference arena.",
    strength: "Strong when the method and sample size are published. We note vote counts and margins on arenas.",
    howShown: "Shown with the evaluator's name and the date we read it.",
  },
  {
    label: "vendor-reported",
    meaning: "The number comes from the maker's own announcement.",
    whoProduced: "The company that built the model.",
    strength: "Weakest. The source has an interest in the result, and we usually cannot see how it was run.",
    howShown: "Always labelled, and kept in a separate table, never in the same column as independent numbers.",
  },
];

export const RECORD_FIELDS: readonly RecordField[] = [
  {
    id: "modelVersion",
    label: "Model version",
    whatItIs: "The exact model name or snapshot we tested, as the provider writes it.",
    whyItMatters: "Providers update models under the same name. A review of one version says little about the next.",
    formatHint: "The provider's exact name or ID",
  },
  {
    id: "effortSetting",
    label: "Effort setting",
    whatItIs: "How much thinking effort the model was set to use, or “not applicable” if the model has no such setting.",
    whyItMatters: "Higher effort can raise quality and cost together, so two results are only comparable at the same setting.",
    formatHint: "For example low, medium or high",
  },
  {
    id: "testedOn",
    label: "Test day",
    whatItIs: "The calendar day the test run happened. In a head-to-head, both models are tested on the same day.",
    whyItMatters: "It lets you judge how old the result is. Age is not accuracy, but an old test may describe a different model.",
    formatHint: "YYYY-MM-DD",
  },
];

export const TEST_DAY_STEPS: readonly { title: string; detail: string }[] = [
  { title: "Fix the tasks first", detail: "The tasks for each point are chosen before any model is run, so a model cannot shape the test." },
  { title: "Record the setup", detail: "Write down the model version, effort setting and test day before the first answer is read." },
  { title: "Run every model the same way", detail: "Same tasks, each model's recommended settings, one test day. A head-to-head uses the same ten tasks for both models." },
  { title: "Score by hand", detail: "A person checks each answer against the known result or the source. Facts, limits and working are checked, not just tone." },
  { title: "Price it on the day", detail: "Open the provider's own pricing page, record the price and the date, and work out cost per task." },
  { title: "Label and publish", detail: "Every result gets a label, a review is published within 7 days of the test run, and a line goes in the changelog." },
  { title: "Re-run on schedule", detail: "The full battery is re-run every quarter, and an older review is marked stale or Superseded." },
];

export const FAIRNESS_RULES: readonly { title: string; detail: string }[] = [
  { title: "Same tasks for every model.", detail: "A comparison only counts when models face identical tasks." },
  { title: "Each model's recommended settings.", detail: "We do not handicap a model with settings it was not built for." },
  { title: "One test day for a head-to-head.", detail: "Both models are run on the same day, so a model update cannot sneak between them." },
  { title: "No early access for makers.", detail: "A maker does not see a review before it is published." },
  { title: "Money is not an input.", detail: "Affiliate and sponsor status never changes a score or a verdict." },
  { title: "A model never scores itself.", detail: "If a model helped draft a review, a person checks the result against our recorded test results." },
];

export const CAN_TELL_YOU: readonly string[] = [
  "How a model did on the same recorded tasks, on a recorded day.",
  "Which model is likely a better shortlist pick for a kind of task.",
  "Where a model is clearly weak, or clearly expensive for what it gives.",
];

export const CANNOT_TELL_YOU: readonly string[] = [
  "How it will do on your own work. Run a few of your real tasks before you pay.",
  "How it will behave after the provider updates the model.",
  "Whether a small score gap matters. A score is a shortlist, not a verdict.",
];

/** Hypothetical numbers for the worked example. They describe no real model or plan. */
export const COST_EXAMPLE: CostExample = {
  inputTokens: 2000,
  outputTokens: 500,
  inputPricePerMillion: 2,
  outputPricePerMillion: 10,
};

export const OPEN_DECISIONS: readonly OpenDecision[] = [
  {
    id: "weights",
    question: "What weight does each of the seven points carry?",
    whyItMatters: "A published weighting turns seven results into one comparable summary, and shows what we think matters most.",
    whatThePageDoesMeanwhile: "Shows no weights, explains what would move each one, and lets you set your own.",
  },
  {
    id: "scale",
    question: "What scale does each point use?",
    whyItMatters: "A score only means something once the range and what a top score requires are written down.",
    whatThePageDoesMeanwhile: "Gives no scale. The reader tool uses 0 to 10 for your own judgement and is not our scale.",
  },
  {
    id: "task-counts",
    question: "How many tasks make up each point, and how many runs per task?",
    whyItMatters: "Answers can vary from run to run, so the sample size decides how far a score can be trusted.",
    whatThePageDoesMeanwhile: "Says a fixed set is used and gives no counts. Treat a single score as a snapshot.",
  },
  {
    id: "stale-limit",
    question: "How old may a test date be before a review is marked stale?",
    whyItMatters: "It decides when a review must be re-tested or labelled.",
    whatThePageDoesMeanwhile: "Points to the editorial standards page, where this rule and its age checker live.",
  },
];