import { sortModels, type ModelDirectoryRow } from "./modelDirectory";
import type { StatItem } from "./modelStats";

export type RoundupGroupId = "start" | "task" | "budget" | "setup" | "reader" | "media";

/** Where a roundup's starting-point models come from. None of these is a final ranking. */
export type CandidateSource =
  /** The highest BenchLM scores in the directory snapshot, so the list never goes stale. */
  | { kind: "top-score"; count: number }
  /** Models whose "best for" label in the directory fits this use. */
  | { kind: "listed"; modelIds: readonly string[] }
  /** No fair starting point exists yet. The reason is shown on the page. */
  | { kind: "after-testing"; reason: string };

export interface Roundup {
  /** Slug used for the route: /compare/best/[id]. */
  id: string;
  title: string;
  group: RoundupGroupId;
  /** The reader's question, in their words. */
  question: string;
  summary: string;
  /** Level badge text, from Blueprint 5.3 ("Levels 2-3"). */
  levelLabel: string;
  /** Launch article number, when the roundup is one of the first 42 articles. */
  articleNumber?: number;
  candidates: CandidateSource;
  /** False until the roundup page is written. */
  isPublished: boolean;
}

export interface RoundupGroup {
  id: RoundupGroupId;
  title: string;
  intro: string;
}

export interface RoundupGroupWithItems {
  group: RoundupGroup;
  roundups: Roundup[];
}

export const ROUNDUP_GROUPS: readonly RoundupGroup[] = [
  { id: "start", title: "Start here", intro: "Two roundups for readers who want a quick answer before narrowing down." },
  { id: "task", title: "By task", intro: "For the job you want AI to do every day." },
  { id: "budget", title: "By budget", intro: "For readers who care most about what a task costs." },
  { id: "setup", title: "By setup", intro: "For readers who want to download a model or keep data on their own machine." },
  { id: "reader", title: "By reader", intro: "For people with a particular situation rather than a particular task." },
  { id: "media", title: "Image and video", intro: "For readers who want to make pictures or clips instead of text." },
];

const LEVELS_2_TO_3 = "Levels 2-3";
const LEVEL_2 = "Level 2";

/** The 13 roundups from Blueprint 5.3. Routes match the content file names in Blueprint 4.5. */
export const ROUNDUPS: readonly Roundup[] = [
  {
    id: "overall", title: "Best overall", group: "start", levelLabel: LEVELS_2_TO_3,
    question: "If I could only try one model, which should it be?",
    summary: "The strongest all-round models right now, with a runner-up and a budget pick.",
    candidates: { kind: "top-score", count: 3 }, isPublished: false,
  },
  {
    id: "by-job", title: "Best AI model right now, by job", group: "start", levelLabel: LEVEL_2, articleNumber: 14,
    question: "Which model should I use for the job in front of me?",
    summary: "One pick per everyday job, such as writing, studying, spreadsheets and research, with the reason for each.",
    candidates: { kind: "after-testing", reason: "Picks per job come from our own test battery, so none is shown until the tests are run." }, isPublished: false,
  },
  {
    id: "coding", title: "Coding", group: "task", levelLabel: LEVELS_2_TO_3,
    question: "Which model writes and fixes code best?",
    summary: "Models ranked for everyday coding and for hard, multi-step coding work, with the cost of a small task.",
    candidates: { kind: "listed", modelIds: ["claude-sonnet-5-5", "claude-fable-5-1", "kimi-k3"] }, isPublished: false,
  },
  {
    id: "writing", title: "Writing", group: "task", levelLabel: LEVELS_2_TO_3,
    question: "Which model writes the best drafts and follows format limits?",
    summary: "Models ranked on drafts with strict length and format rules, the third point of the scorecard.",
    candidates: { kind: "after-testing", reason: "The directory's labels do not cover writing, so this ranking comes from our writing tests." }, isPublished: false,
  },
  {
    id: "agents", title: "Agents", group: "task", levelLabel: LEVELS_2_TO_3,
    question: "Which model can carry out longer tasks with tools?",
    summary: "Models ranked for tool use and long-running tasks, with notes on where agents fail and which permissions to limit.",
    candidates: { kind: "listed", modelIds: ["claude-fable-5-1", "kimi-k3"] }, isPublished: false,
  },
  {
    id: "value", title: "Value", group: "budget", levelLabel: LEVELS_2_TO_3,
    question: "Which model gives the most for the least money?",
    summary: "Models ranked by quality per dollar, using cost per task rather than price per token.",
    candidates: { kind: "listed", modelIds: ["gpt-6-1-sol", "claude-sonnet-5-5"] }, isPublished: false,
  },
  {
    id: "cheap-and-fast", title: "Cheap and fast", group: "budget", levelLabel: LEVELS_2_TO_3,
    question: "Which model suits high-volume or bulk work?",
    summary: "Low-cost models for work where speed and price matter more than the last few points of quality.",
    candidates: { kind: "listed", modelIds: ["claude-haiku-5-5", "gemini-3-8-flash", "gpt-6-luna", "deepseek-v4-1-flash"] }, isPublished: false,
  },
  {
    id: "open-weights", title: "Open weights", group: "setup", levelLabel: LEVELS_2_TO_3,
    question: "Which open-weight models are worth downloading?",
    summary: "Models whose weights you can download, with licence terms noted so you can check what you are allowed to do.",
    candidates: { kind: "listed", modelIds: ["mimo-v2-6-pro", "kimi-k3", "qwen3-8-max-27b"] }, isPublished: false,
  },
  {
    id: "local", title: "Local", group: "setup", levelLabel: LEVELS_2_TO_3,
    question: "Which model can I run on my own computer?",
    summary: "Models that fit on a single graphics card, with the memory each one needs and what you gain in privacy.",
    candidates: { kind: "listed", modelIds: ["qwen3-8-max-27b"] }, isPublished: false,
  },
  {
    id: "students", title: "Students", group: "reader", levelLabel: LEVEL_2, articleNumber: 15,
    question: "Which AI tool helps me study without doing the work for me?",
    summary: "Tools and plans ranked on study tasks, with school-policy and honesty notes.",
    candidates: { kind: "after-testing", reason: "Student picks depend on study tasks and plan prices, which we test and check before ranking." }, isPublished: false,
  },
  {
    id: "small-business", title: "Small business", group: "reader", levelLabel: LEVELS_2_TO_3,
    question: "Which model suits a small team with client data to protect?",
    summary: "Models and plans ranked for everyday office work, with privacy settings and costs per seat.",
    candidates: { kind: "after-testing", reason: "This ranking depends on plan prices and privacy settings, which we check on the provider's own pages first." }, isPublished: false,
  },
  {
    id: "image", title: "Image", group: "media", levelLabel: LEVELS_2_TO_3,
    question: "Which tool makes the best images for what I need?",
    summary: "Image tools compared on the same prompts, with notes on licences and labelling.",
    candidates: { kind: "after-testing", reason: "The directory covers text models. Image tools need their own tests and are not in it yet." }, isPublished: false,
  },
  {
    id: "video", title: "Video", group: "media", levelLabel: LEVELS_2_TO_3,
    question: "Which tool makes the best short video clips?",
    summary: "Video tools compared on the same prompts, with limits, costs and labelling notes.",
    candidates: { kind: "after-testing", reason: "The directory covers text models. Video tools need their own tests and are not in it yet." }, isPublished: false,
  },
];

/** Route for a roundup page. */
export function getRoundupHref(roundup: Roundup): string {
  return `/compare/best/${roundup.id}`;
}

/** Turns a roundup's candidate source into directory rows. Returns an empty list when testing is still needed. */
export function getRoundupCandidates(rows: readonly ModelDirectoryRow[], source: CandidateSource): ModelDirectoryRow[] {
  switch (source.kind) {
    case "top-score":
      return sortModels(
        rows.filter((row) => row.benchLm.status !== "unranked"),
        "score",
      ).slice(0, source.count);
    case "listed":
      return source.modelIds.flatMap((modelId) => rows.filter((row) => row.id === modelId));
    case "after-testing":
      return [];
  }
}

/** One line saying why these starting points are shown, or why none are. */
export function getCandidateCaption(source: CandidateSource): string {
  switch (source.kind) {
    case "top-score":
      return `Highest ${source.count} BenchLM scores in the directory. A starting point, not a final ranking.`;
    case "listed":
      return "Listed for this use in the model directory. A starting point, not a final ranking.";
    case "after-testing":
      return source.reason;
  }
}

/** Groups roundups in group order and leaves out groups that have none. */
export function getRoundupsByGroup(
  roundups: readonly Roundup[],
  groups: readonly RoundupGroup[],
): RoundupGroupWithItems[] {
  return groups
    .map((group) => ({ group, roundups: roundups.filter((roundup) => roundup.group === group.id) }))
    .filter((entry) => entry.roundups.length > 0);
}

/** Four headline numbers for the hero. */
export function getBestForStatItems(roundups: readonly Roundup[], rows: readonly ModelDirectoryRow[]): StatItem[] {
  return [
    { value: String(roundups.length), label: "roundups planned" },
    { value: String(roundups.filter((roundup) => roundup.isPublished).length), label: "roundups published" },
    { value: String(new Set(roundups.map((roundup) => roundup.group)).size), label: "groups" },
    { value: String(rows.length), label: "models in the directory" },
  ];
}