import type { Metadata } from "next";
import { getModelsByIds, type DirectoryModel } from "./models";
export const SCORES_AS_OF = "October 17, 2026";
export const PRICES_VERIFIED_ON = "October 21, 2026";
export const RESEARCHED_ON = "October 28, 2026";

export const BEST_FOR_SLUGS = [
  "overall",
  "coding",
  "writing",
  "agents",
  "value",
  "cheap-and-fast",
  "open-weights",
  "local",
  "students",
  "small-business",
  "image",
  "video",
] as const;

export type BestForSlug = (typeof BEST_FOR_SLUGS)[number];

export interface RelatedLink {
  readonly href: string;
  readonly label: string;
}

/** One section entry in a page's jump menu. */
export interface PageSection {
  readonly id: string;
  readonly label: string;
}

/** A tool or model worth testing, with a short note on why. */
export interface RoundupCandidate {
  readonly name: string;
  readonly note: string;
}

/** One "if X, choose Y" rule in a decision guide. */
export interface DecisionRule {
  readonly if: string;
  readonly then: string;
}

/** A number reported by a provider or third party, with where it came from. */
export interface ReportedFigure {
  readonly label: string;
  readonly value: string;
  readonly source: string;
}

/** A plain-English definition of a term used on the page. */
export interface GlossaryEntry {
  readonly term: string;
  readonly definition: string;
}

/** A question and answer pair for the FAQ section. */
export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

/** A cited source. */
export interface SourceLink {
  readonly href: string;
  readonly label: string;
}

export interface BestForRoundup {
  readonly slug: BestForSlug;
  /** Short name used in breadcrumbs and headings. */
  readonly label: string;
  readonly level: string;
  /** The one question this roundup answers. */
  readonly question: string;
  /** Plain-English promise of what the finished roundup ranks. */
  readonly description: string;
  readonly metaTitle: string;
  readonly metaDescription: string;
  /** Directory model ids used as starting points. Empty when the directory has no fair basis. */
  readonly startingPointIds: readonly string[];
  /** Why these starting points were chosen, or why there are none yet. */
  readonly startingPointsNote: string;
  /** What our test run will measure before a final ranking is published. */
  readonly howWeWillRank: readonly string[];
  /** Cautions a reader should keep in mind for this use case. */
  readonly keepInMind: readonly string[];
  readonly related: readonly RelatedLink[];

  /** Optional extra sections. A missing or empty list hides the section. */
  readonly whoItIsFor?: readonly string[];
  readonly candidates?: readonly RoundupCandidate[];
  readonly decisionGuide?: readonly DecisionRule[];
  readonly reportedFigures?: readonly ReportedFigure[];
  readonly glossary?: readonly GlossaryEntry[];
  readonly selfTest?: readonly string[];
  readonly tips?: readonly string[];
  readonly commonMistakes?: readonly string[];
  readonly faq?: readonly FaqEntry[];
  readonly sources?: readonly SourceLink[];
}

const DIRECTORY_LINK: RelatedLink = {
  href: "/compare/models",
  label: "Open the model directory",
};
const HOW_WE_TEST_LINK: RelatedLink = {
  href: "/about/how-we-test",
  label: "How we test",
};

export const BEST_FOR_ROUNDUPS: Readonly<Record<BestForSlug, BestForRoundup>> = {
  overall: {
    slug: "overall",
    label: "Overall",
    level: "Levels 2-3",
    question: "If I could only try one model, which should it be?",
    description:
      "The strongest all-round models right now, with a runner-up and a budget pick.",
    metaTitle: "Best AI model overall",
    metaDescription:
      "The strongest all-round AI models, with API prices and independent scores. Starting points now, a ranked list after our test run.",
    startingPointIds: ["claude-opus-5-5", "gpt-6-1-sol", "gpt-6-astra"],
    startingPointsNote:
      "These are the three highest BenchLM scores in the directory. A starting point, not a final ranking.",
    howWeWillRank: [
      "The same seven-point scorecard for every model, so none wins by facing easier tasks.",
      "Cost per finished task, not price per token.",
      "Model version, effort setting and test day recorded next to every result.",
    ],
    keepInMind: [
      "A composite score is a shortlist. A model with a lower total can be better at the one job you care about.",
      "The two highest-scoring models are not the two cheapest. Compare price before you commit.",
    ],
    related: [
      { href: "/compare/best/value", label: "Best value" },
      { href: "/compare/vs", label: "Head-to-head tests" },
      DIRECTORY_LINK,
    ],
  },
  coding: {
    slug: "coding",
    label: "Coding",
    level: "Levels 2-3",
    question: "Which model writes and fixes code best?",
    description:
      "Models ranked for everyday coding and for hard, multi-step coding work, with the cost of a small task.",
    metaTitle: "Best AI model for coding",
    metaDescription:
      "AI models listed for coding, with API prices and scores. Starting points now, a ranked list after our test run.",
    startingPointIds: ["claude-sonnet-5-5", "claude-fable-5-1", "kimi-k3"],
    startingPointsNote:
      "Listed for coding in the model directory. A starting point, not a final ranking.",
    howWeWillRank: [
      "Everyday tasks, such as fixing a bug or writing a small function, scored separately from hard multi-step work.",
      "Whether the code runs, not only whether it looks right.",
      "The cost of one small coding task on each model.",
    ],
    keepInMind: [
      "Review and run any generated code before you rely on it.",
      "Never paste secrets, keys or private customer data into a chat.",
    ],
    related: [
      { href: "/compare/best/agents", label: "Best for agents" },
      { href: "/tools/api-cost-calculator", label: "API cost calculator" },
      DIRECTORY_LINK,
    ],
  },
  writing: {
    slug: "writing",
    label: "Writing",
    level: "Levels 2-3",
    question: "Which model writes the best drafts and follows format limits?",
    description:
      "Models ranked on drafts with strict length and format rules, the third point of the scorecard.",
    metaTitle: "Best AI model for writing",
    metaDescription:
      "How we will rank AI models for writing drafts and following format limits. Picks follow our own writing tests.",
    startingPointIds: [],
    startingPointsNote:
      "The directory's labels do not cover writing, so this ranking comes from our writing tests and no pick is shown yet.",
    howWeWillRank: [
      "The same brief given to every model, such as an email, a summary and a short article.",
      "Whether the draft keeps to a stated length, tone and format.",
      "How much editing each draft needs before you could send it.",
    ],
    keepInMind: [
      "Read every draft yourself. AI can state wrong facts in smooth sentences.",
      "Check quotes, names and numbers against the source.",
    ],
    related: [
      {
        href: "/learn/foundations/write-better-prompts",
        label: "How to write better prompts",
      },
      {
        href: "/learn/practitioner/fact-check-ai-answers",
        label: "How to fact-check AI answers",
      },
      HOW_WE_TEST_LINK,
    ],
  },
  agents: {
    slug: "agents",
    label: "Agents",
    level: "Levels 2-3",
    question: "Which model can carry out longer tasks with tools?",
    description:
      "Models ranked for tool use and long-running tasks, with notes on where agents fail and which permissions to limit.",
    metaTitle: "Best AI model for agents",
    metaDescription:
      "AI models listed for agentic work and tool use, with prices and scores. Starting points now, a ranked list after our test run.",
    startingPointIds: ["claude-fable-5-1", "kimi-k3"],
    startingPointsNote:
      "Listed for agents in the model directory. A starting point, not a final ranking.",
    howWeWillRank: [
      "Long tasks that need several tool calls in a row.",
      "Whether the model stops, asks or recovers when a step fails.",
      "Total cost of a finished task, including retries.",
    ],
    keepInMind: [
      "Give an agent the fewest permissions it needs. Do not let it spend money or delete files without a check.",
      "Long tasks can use many tokens, so cost per task can be far above one chat reply.",
    ],
    related: [
      { href: "/compare/best/coding", label: "Best for coding" },
      {
        href: "/learn/power-user/ai-api-pricing-for-non-engineers",
        label: "AI API pricing for non-engineers",
      },
      DIRECTORY_LINK,
    ],
  },
  value: {
    slug: "value",
    label: "Value",
    level: "Levels 2-3",
    question: "Which model gives the most for the least money?",
    description:
      "Models ranked by quality per dollar, using cost per task rather than price per token.",
    metaTitle: "Best value AI model",
    metaDescription:
      "AI models with the best quality for the price, using API prices and independent scores. Ranked list follows our test run.",
    startingPointIds: ["gpt-6-1-sol", "claude-sonnet-5-5"],
    startingPointsNote:
      "Listed for value in the model directory. A starting point, not a final ranking.",
    howWeWillRank: [
      "Quality score divided by what one finished task costs.",
      "A model that needs more tokens to finish is charged for them.",
      "Introductory prices flagged, with the price after they end.",
    ],
    keepInMind: [
      "A cheap token price can still cost more per task if a model writes long answers.",
      "Prices here are API prices. A chat subscription is a separate flat price.",
    ],
    related: [
      { href: "/prices/api", label: "API costs" },
      { href: "/prices/plans", label: "Consumer plans" },
      DIRECTORY_LINK,
    ],
  },
  "cheap-and-fast": {
    slug: "cheap-and-fast",
    label: "Cheap and fast",
    level: "Levels 2-3",
    question: "Which model suits high-volume or bulk work?",
    description:
      "Low-cost models for work where speed and price matter more than the last few points of quality.",
    metaTitle: "Best cheap and fast AI models",
    metaDescription:
      "Low-cost AI models for high-volume work, with API prices and scores. Starting points now, a ranked list after our test run.",
    startingPointIds: [
      "claude-haiku-5-5",
      "gemini-3-8-flash",
      "gpt-6-luna",
      "deepseek-v4-1-flash",
    ],
    startingPointsNote:
      "Listed for high-volume, low-cost work in the model directory. A starting point, not a final ranking.",
    howWeWillRank: [
      "The same bulk tasks on every model, such as sorting, tagging and short summaries.",
      "Error rate, since a cheap wrong answer still has to be fixed.",
      "Cost per thousand tasks.",
    ],
    keepInMind: [
      "Two of these models are not in the BenchLM top 25. That is not a judgement on them, so test them on your own tasks.",
      "Off-peak and introductory prices can change the real cost.",
    ],
    related: [
      { href: "/tools/api-cost-calculator", label: "API cost calculator" },
      { href: "/compare/best/value", label: "Best value" },
      DIRECTORY_LINK,
    ],
  },
  "open-weights": {
    slug: "open-weights",
    label: "Open weights",
    level: "Levels 2-3",
    question: "Which open-weight models are worth downloading?",
    description:
      "Models whose weights you can download, with licence terms noted so you can check what you are allowed to do.",
    metaTitle: "Best open-weight AI models",
    metaDescription:
      "Open-weight AI models you can download, with licence notes, prices and scores. Ranked list follows our test run.",
    startingPointIds: ["mimo-v2-6-pro", "kimi-k3", "qwen3-8-max-27b"],
    startingPointsNote:
      "Listed as open-weight in the model directory. A starting point, not a final ranking.",
    howWeWillRank: [
      "Licence terms read and summarised, so you know what commercial use is allowed.",
      "Quality on the same battery as closed models.",
      "The hardware needed to run each one yourself.",
    ],
    keepInMind: [
      "Open weights do not always mean an open licence. Read the licence before you build on a model.",
      "The MiMo score is an estimate, not a published figure.",
    ],
    related: [
      { href: "/compare/open-vs-closed", label: "Open vs closed models" },
      { href: "/compare/best/local", label: "Best for local use" },
      DIRECTORY_LINK,
    ],
  },
  local: {
    slug: "local",
    label: "Local",
    level: "Levels 2-3",
    question: "Which model can I run on my own computer?",
    description:
      "Models that fit on a single graphics card, with the memory each one needs and what you gain in privacy.",
    metaTitle: "Best AI models to run locally",
    metaDescription:
      "AI models you can run on your own computer, with memory needs and privacy notes. Ranked list follows our test run.",
    startingPointIds: ["qwen3-8-max-27b"],
    startingPointsNote:
      "The 27B version is listed as the best single-GPU local model in the directory, and it is free to self-host. A starting point, not a final ranking.",
    howWeWillRank: [
      "Memory needed at common settings, checked against real graphics cards.",
      "Speed on a single consumer card.",
      "Quality compared with the same family's hosted model.",
    ],
    keepInMind: [
      "Running locally keeps your text on your machine, but you give up the hosted model's size and speed.",
      "The directory's score and price are for Qwen3.8 Max. The 27B version has a 262K context.",
    ],
    related: [
      { href: "/tools/local-model-memory", label: "Local model memory estimator" },
      { href: "/compare/best/open-weights", label: "Best open-weight models" },
      DIRECTORY_LINK,
    ],
  },
  students: {
    slug: "students",
    label: "Students",
    level: "Level 2",
    question: "Which AI tool helps me study without doing the work for me?",
    description:
      "Tools and plans ranked on study tasks, with school-policy and honesty notes.",
    metaTitle: "Best AI tools for students",
    metaDescription:
      "How we will rank AI tools for studying, with school-policy and honesty notes. Picks follow our study tests and plan checks.",
    startingPointIds: [],
    startingPointsNote:
      "Student picks depend on study tasks and plan prices, which we test and check before ranking. No pick is shown yet.",
    howWeWillRank: [
      "Study tasks such as explaining a topic, making practice questions and checking an answer.",
      "Whether the tool teaches the idea or only hands over the answer.",
      "Free-plan limits and the price of paid plans.",
    ],
    keepInMind: [
      "Check your school's AI policy before you use any tool for graded work.",
      "AI can be wrong. Check facts against your course material.",
    ],
    related: [
      {
        href: "/learn/practitioner/use-ai-to-study-without-cheating",
        label: "How to use AI to study without cheating",
      },
      {
        href: "/learn/practitioner/fact-check-ai-answers",
        label: "How to fact-check AI answers",
      },
      { href: "/prices/free-limits", label: "Free-plan limits" },
    ],
  },
  "small-business": {
    slug: "small-business",
    label: "Small business",
    level: "Levels 2-3",
    question: "Which model suits a small team with client data to protect?",
    description:
      "Models and plans ranked for everyday office work, with privacy settings and costs per seat.",
    metaTitle: "Best AI model for small business",
    metaDescription:
      "How we will rank AI models and plans for small teams, with privacy settings and cost per seat. Picks follow our checks.",
    startingPointIds: [],
    startingPointsNote:
      "This ranking depends on plan prices and privacy settings, which we check on the provider's own pages first. No pick is shown yet.",
    howWeWillRank: [
      "Whether chats are used for training, and how to switch that off.",
      "Cost per seat and cost per task for common office work.",
      "Admin controls, data location and retention.",
    ],
    keepInMind: [
      "Do not put client data into a tool until you have read its privacy terms.",
      "Rules such as the EU AI Act may apply to how you use AI at work.",
    ],
    related: [
      { href: "/prices/privacy", label: "Privacy matrix" },
      { href: "/prices/plans", label: "Consumer plans" },
      {
        href: "/learn/expert/eu-ai-act-for-everyday-users",
        label: "The EU AI Act for small businesses",
      },
    ],
  },
  image: {
    slug: "image",
    label: "Image",
    level: "Levels 2-3",
    question: "Which tool makes the best images for what I need?",
    description:
      "Image tools compared on the same prompts, with notes on licences and labelling.",
    metaTitle: "Best AI image tools",
    metaDescription:
      "How we will compare AI image tools on the same prompts, with licence and labelling notes. Picks follow our tests.",
    startingPointIds: [],
    startingPointsNote:
      "The directory covers text models. Image tools need their own tests and are not in it yet, so no pick is shown.",
    howWeWillRank: [
      "The same prompts for every tool, including text inside the image and people's hands.",
      "How closely the result matches the prompt on the first try.",
      "Licence terms for commercial use and any labelling rules.",
    ],
    keepInMind: [
      "Check the tool's licence before you use an image in a product or advert.",
      "Realistic images can mislead. Label AI images when you share them.",
    ],
    related: [
      {
        href: "/learn/foundations/ai-scams-and-deepfakes",
        label: "AI scams and deepfakes",
      },
      { href: "/compare/best/video", label: "Best AI video tools" },
      HOW_WE_TEST_LINK,
    ],
  },
  video: {
    slug: "video",
    label: "Video",
    level: "Levels 2-3",
    question: "Which tool makes the best short video clips?",
    description:
      "Video tools compared on the same prompts, with limits, costs and labelling notes.",
    metaTitle: "Best AI video tools",
    metaDescription:
      "How we will compare AI video tools on the same prompts, with limits, costs and labelling notes. Picks follow our tests.",
    startingPointIds: [],
    startingPointsNote:
      "The directory covers text models. Video tools need their own tests and are not in it yet, so no pick is shown.",
    howWeWillRank: [
      "The same prompts for every tool, judged on motion, consistency and prompt match.",
      "Clip length, resolution and daily limits on each plan.",
      "Cost per usable clip, since some attempts will fail.",
    ],
    keepInMind: [
      "Video generation can be slow and costly, so check limits before you pay.",
      "Label AI video clearly. Fake clips are a common scam tool.",
    ],
    related: [
      {
        href: "/learn/foundations/ai-scams-and-deepfakes",
        label: "AI scams and deepfakes",
      },
      { href: "/compare/best/image", label: "Best AI image tools" },
      HOW_WE_TEST_LINK,
    ],
  },
};

/** Returns the roundup content for a slug. */
export function getBestForRoundup(slug: BestForSlug): BestForRoundup {
  return BEST_FOR_ROUNDUPS[slug];
}

/** Returns the directory models used as starting points for a roundup. */
export function getStartingPointModels(slug: BestForSlug): DirectoryModel[] {
  return getModelsByIds(BEST_FOR_ROUNDUPS[slug].startingPointIds);
}

/** Builds Next.js metadata for a roundup page. */
export function getBestForMetadata(slug: BestForSlug): Metadata {
  const roundup = BEST_FOR_ROUNDUPS[slug];
  return {
    title: roundup.metaTitle,
    description: roundup.metaDescription,
    alternates: { canonical: `/compare/best/${slug}` },
  };
}

export function getPageSections(slug: BestForSlug): PageSection[] {
  const roundup = BEST_FOR_ROUNDUPS[slug];
  const hasModels = roundup.startingPointIds.length > 0;
  const hasContent = (items?: readonly unknown[]): boolean =>
    items !== undefined && items.length > 0;

  const sections: PageSection[] = [{ id: "quick-answer", label: "Quick answer" }];

  if (hasContent(roundup.whoItIsFor)) sections.push({ id: "who", label: "Who this is for" });
  sections.push({ id: "starting-points", label: "Starting points" });
  if (hasContent(roundup.candidates)) sections.push({ id: "candidates", label: "Tools to test" });
  if (hasContent(roundup.decisionGuide)) sections.push({ id: "decide", label: "How to decide" });
  if (hasContent(roundup.reportedFigures)) sections.push({ id: "figures", label: "Reported numbers" });
  if (hasContent(roundup.glossary)) sections.push({ id: "terms", label: "Terms explained" });
  sections.push({ id: "how-we-rank", label: "How we will rank" });
  if (hasModels) sections.push({ id: "cost", label: "Cost per task" });
  if (hasModels) sections.push({ id: "skip", label: "Who should skip each" });
  if (hasContent(roundup.selfTest)) sections.push({ id: "self-test", label: "Test it yourself" });
  if (hasContent(roundup.tips) || hasContent(roundup.commonMistakes)) {
    sections.push({ id: "tips", label: "Tips and mistakes" });
  }
  sections.push({ id: "keep-in-mind", label: "Keep in mind" });
  if (hasContent(roundup.faq)) sections.push({ id: "faq", label: "FAQ" });
  if (hasContent(roundup.sources)) sections.push({ id: "sources", label: "Sources" });
  return sections;
}



/** A themed group of roundups shown as one section on the best-for hub. */
export interface RoundupGroup {
  readonly id: string;
  readonly title: string;
  readonly intro: string;
  readonly slugs: readonly BestForSlug[];
}

/** One group together with the roundups it contains, in display order. */
export interface RoundupGroupEntry {
  readonly group: RoundupGroup;
  readonly roundups: readonly BestForRoundup[];
}

/** One figure in the hub's stat strip. */
export interface BestForStatItem {
  readonly label: string;
  readonly value: string;
}

/** Every best-for roundup, in the order of `BEST_FOR_SLUGS`. */
export const ROUNDUPS: readonly BestForRoundup[] = BEST_FOR_SLUGS.map(
  (slug) => BEST_FOR_ROUNDUPS[slug],
);

/** Hub sections. Each slug belongs to exactly one group; the "start" id is the hub's hero link target. */
export const ROUNDUP_GROUPS: readonly RoundupGroup[] = [
  {
    id: "start",
    title: "Quick answers",
    intro: "The broadest questions: the best all-rounder, the best value and the cheapest bulk option.",
    slugs: ["overall", "value", "cheap-and-fast"],
  },
  {
    id: "work",
    title: "By type of work",
    intro: "Pick the model that suits the job you do most.",
    slugs: ["coding", "writing", "agents"],
  },
  {
    id: "control",
    title: "Open and local",
    intro: "Models you can download, and models you can run on your own computer.",
    slugs: ["open-weights", "local"],
  },
  {
    id: "people",
    title: "By who you are",
    intro: "Study and small-team needs come with extra rules about honesty and data.",
    slugs: ["students", "small-business"],
  },
  {
    id: "media",
    title: "Images and video",
    intro: "Creative tools that need their own tests.",
    slugs: ["image", "video"],
  },
];

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function getRoundupsByGroup(
  roundups: readonly BestForRoundup[],
  groups: readonly RoundupGroup[],
): RoundupGroupEntry[] {
  return groups
    .map((group) => ({
      group,
      roundups: group.slugs
        .map((slug) => roundups.find((roundup) => roundup.slug === slug))
        .filter(isDefined),
    }))
    .filter((entry) => entry.roundups.length > 0);
}

export function getBestForStatItems(
  roundups: readonly BestForRoundup[],
  modelRows: readonly unknown[],
): BestForStatItem[] {
  const withStartingPoints = roundups.filter(
    (roundup) => roundup.startingPointIds.length > 0,
  ).length;

  return [
    { label: "Roundups", value: String(roundups.length) },
    { label: "With starting points", value: String(withStartingPoints) },
    { label: "Models in the directory", value: String(modelRows.length) },
  ];
}


export function getRoundupHref(slug: BestForSlug): string {
  return `/compare/best/${slug}`;
}

export type Roundup = (typeof ROUNDUPS)[number];
export type FigureLabel = "Vendor-reported" | "Independent" | "Our test";

export interface ReportedFigure {
  readonly subject: string;
  readonly measure: string;
  readonly value: string;
  readonly label: string;
  readonly source: string;
  readonly asOf: string;
}

export function getRoundupCandidates<Row extends { id: string }>(
  rows: readonly Row[],
  candidateIds: readonly string[] | undefined,
): Row[] {
  if (!candidateIds) {
    return [];
  }
  const rowsById = new Map(rows.map((row) => [row.id, row] as const));
  return candidateIds.flatMap((candidateId) => {
    const row = rowsById.get(candidateId);
    return row ? [row] : [];
  });
}

export function getCandidateCaption(candidateIds: readonly string[] | undefined): string {
  if (!candidateIds || candidateIds.length === 0) {
    return "No starting-point models selected yet.";
  }
  const noun = candidateIds.length === 1 ? "model" : "models";
  return `${candidateIds.length} ${noun} to start from. This is a shortlist, not a final ranking.`;
}


// ADD to lib/compare/bestFor.ts (skip any type that already exists there).

/** One dated change shown in a "what changed" list. */
export interface ChangeNote {
  /** ISO date, YYYY-MM-DD. */
  isoDate: string;
  title: string;
  detail: string;
}

/** A typical job used to turn per-token prices into a cost per task. */
export interface CostScenario {
  id: string;
  label: string;
  description: string;
  /** Number of requests in the job. */
  requests: number;
  /** Input tokens in each request. */
  inputPerRequest: number;
  /** Output tokens in each request. */
  outputPerRequest: number;
  /** Share of all input tokens read from cache, 0 to 100. */
  cachedSharePercent: number;
}

/** A labelled internal link. */
export interface RoundupLink {
  href: string;
  label: string;
}

/** Who published a source, which decides how much weight it gets. */
export type RoundupSourceKind = "Operator or maker page" | "Tracker (secondary)";

/** One cited source on a roundup page. */
export interface RoundupSource {
  publisher: string;
  title: string;
  href: string;
  kind: RoundupSourceKind;
}
