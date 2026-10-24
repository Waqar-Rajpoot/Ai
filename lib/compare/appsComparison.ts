import {
  filterPlansByBudget,
  formatPlanDollars,
  getLowestPaidPlan,
  type AppId,
  type ConsumerPlan,
  type PlanBudgetFilter,
} from "../prices/planTable";
import type { ModelDirectoryRow } from "./modelDirectory";
import type { StatItem } from "./modelStats";

export interface AppInfo {
  id: AppId;
  name: string;
  /** Maker name exactly as it appears in the model directory. */
  maker: string;
}

export type AppFeatureId = "voice" | "images" | "video" | "file-upload" | "web-search" | "agents" | "memory";

export interface AppFeature {
  id: AppFeatureId;
  label: string;
  whatItIs: string;
  whyItMatters: string;
  whatToCheck: readonly string[];
  guide?: { label: string; href: string };
}

export type FeatureSupport =
  | { status: "unverified" }
  | { status: "verified"; summary: string; /** ISO date the provider's own page was opened. */ verifiedOn: string };

export interface ApiSnapshot {
  modelCount: number;
  lowestInputPrice: number | null;
  highestInputPrice: number | null;
  modelNames: string[];
}

export interface BudgetFit {
  matches: ConsumerPlan[];
  /** Apps that have plan data but nothing at or under the budget. */
  appsWithoutMatch: AppInfo[];
  /** Apps whose plans have not been collected. */
  appsWithoutPlanData: AppInfo[];
}

export const APPS: readonly AppInfo[] = [
  { id: "chatgpt", name: "ChatGPT", maker: "OpenAI" },
  { id: "claude", name: "Claude", maker: "Anthropic" },
  { id: "gemini", name: "Gemini", maker: "Google" },
  { id: "grok", name: "Grok", maker: "xAI" },
];

/** The seven features from Blueprint 5.3 and 5.4, in that order. */
export const APP_FEATURES: readonly AppFeature[] = [
  {
    id: "voice", label: "Voice",
    whatItIs: "Talk to the app and hear spoken replies.",
    whyItMatters: "Useful hands-free, for language practice or when typing is awkward. Allowances, if any, are set by plan.",
    whatToCheck: ["Is voice included in the free plan?", "Is there a daily or monthly time limit?", "Can you choose a voice or a language?"],
  },
  {
    id: "images", label: "Images",
    whatItIs: "Create or edit pictures from a text prompt, or ask questions about a picture you upload.",
    whyItMatters: "Apps differ on whether they can make images, read images or both, and on how many you can make.",
    whatToCheck: ["Can it create images, read images, or both?", "How many images per day or month on each plan?", "What are the rules on commercial use, labelling or watermarks?"],
    guide: { label: "AI scams and deepfakes", href: "/learn/foundations/ai-scams-and-deepfakes" },
  },
  {
    id: "video", label: "Video",
    whatItIs: "Create short clips from a prompt, or analyze a video you provide.",
    whyItMatters: "Video is often the most limited feature and may sit only on higher tiers.",
    whatToCheck: ["Does the app make video, read it, or both?", "What clip length and monthly allowance apply?", "Which plan tier includes it?", "Are clips watermarked or labelled?"],
  },
  {
    id: "file-upload", label: "File upload",
    whatItIs: "Give the app documents, spreadsheets, PDFs or images to work on.",
    whyItMatters: "Size, page and file-type limits decide whether it can handle your real documents.",
    whatToCheck: ["Maximum file size and page count", "Which file types are accepted", "How scans, tables and charts are handled", "How many files per chat"],
    guide: { label: "Summarize a PDF with AI", href: "/learn/practitioner/summarize-pdf-with-ai" },
  },
  {
    id: "web-search", label: "Web search",
    whatItIs: "Look things up on the web while answering, and show where the answer came from.",
    whyItMatters: "Without it, an app answers from what it learned in training, which can be out of date.",
    whatToCheck: ["Is it on by default, or do you switch it on?", "Are sources shown and clickable?", "Is a deeper research mode included, and what are its limits?"],
    guide: { label: "Deep research modes", href: "/learn/practitioner/deep-research-modes" },
  },
  {
    id: "agents", label: "Agents",
    whatItIs: "Carry out multi-step tasks, such as browsing, working in files or using connected apps, with less step-by-step prompting.",
    whyItMatters: "More freedom saves time, and it also means more ways to fail. Permissions matter.",
    whatToCheck: ["What can it do without asking you first?", "Which plan includes it, and what are its limits?", "Which apps and accounts can it connect to?"],
    guide: { label: "AI agents explained", href: "/learn/power-user/ai-agents-explained" },
  },
  {
    id: "memory", label: "Memory",
    whatItIs: "Keep details about you between chats, such as your preferences.",
    whyItMatters: "It saves repeating yourself, and it also means more of your information is stored.",
    whatToCheck: ["Is memory on by default?", "Can you see, edit and delete what is stored?", "Does a temporary chat skip memory?", "Do team plans share or separate memory?"],
    guide: { label: "Context windows, tokens and memory", href: "/learn/power-user/context-windows-tokens-memory" },
  },
];

const NOT_VERIFIED: FeatureSupport = { status: "unverified" };

function unverifiedFeatures(): Record<AppFeatureId, FeatureSupport> {
  return {
    voice: NOT_VERIFIED,
    images: NOT_VERIFIED,
    video: NOT_VERIFIED,
    "file-upload": NOT_VERIFIED,
    "web-search": NOT_VERIFIED,
    agents: NOT_VERIFIED,
    memory: NOT_VERIFIED,
  };
}

/**
 * The Blueprint gives no per-app feature data. A cell stays "unverified" until you open the provider's own page,
 * then set it to { status: "verified", summary, verifiedOn }.
 */
export const FEATURE_SUPPORT: Record<AppId, Record<AppFeatureId, FeatureSupport>> = {
  chatgpt: unverifiedFeatures(),
  claude: unverifiedFeatures(),
  gemini: unverifiedFeatures(),
  grok: unverifiedFeatures(),
};

/** How many feature cells exist and how many have been verified. */
export function countFeatureCells(): { verified: number; total: number } {
  const cells = APPS.flatMap((app) => APP_FEATURES.map((feature) => FEATURE_SUPPORT[app.id][feature.id]));
  return { verified: cells.filter((cell) => cell.status === "verified").length, total: cells.length };
}

/** Model count and input price range for one maker, from the model directory. */
export function getApiSnapshot(rows: readonly ModelDirectoryRow[], maker: string): ApiSnapshot {
  const makerRows = rows.filter((row) => row.maker === maker);
  const inputPrices = makerRows.map((row) => row.inputPricePerMillion);
  return {
    modelCount: makerRows.length,
    lowestInputPrice: inputPrices.length > 0 ? Math.min(...inputPrices) : null,
    highestInputPrice: inputPrices.length > 0 ? Math.max(...inputPrices) : null,
    modelNames: makerRows.map((row) => row.name),
  };
}

/** Plans at or under a budget, plus which apps have nothing that cheap and which have no plan data. */
export function summarizeBudgetFit(
  plans: readonly ConsumerPlan[],
  apps: readonly AppInfo[],
  filter: PlanBudgetFilter,
): BudgetFit {
  const matches = filterPlansByBudget(plans, filter);
  const appsWithPlans = apps.filter((app) => plans.some((plan) => plan.appId === app.id));
  return {
    matches,
    appsWithoutMatch: appsWithPlans.filter((app) => !matches.some((plan) => plan.appId === app.id)),
    appsWithoutPlanData: apps.filter((app) => !plans.some((plan) => plan.appId === app.id)),
  };
}

/** Four headline numbers for the hero. */
export function getAppsStatItems(plans: readonly ConsumerPlan[], apps: readonly AppInfo[]): StatItem[] {
  const lowestPaid = getLowestPaidPlan(plans);
  const cells = countFeatureCells();
  return [
    { value: String(apps.length), label: "apps compared" },
    { value: String(plans.length), label: "plans in our snapshot" },
    { value: lowestPaid ? formatPlanDollars(lowestPaid.monthlyDollars) : "n/a", label: "lowest paid plan per month" },
    { value: `${cells.verified} of ${cells.total}`, label: "feature cells verified" },
  ];
}