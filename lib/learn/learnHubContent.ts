import {
  GLOSSARY_LEVELS,
  GLOSSARY_TERMS,
  type GlossaryLevel,
  type GlossaryLevelInfo,
  type GlossaryTerm,
} from "./glossaryTerms";

export interface LevelHubDetails {
  /** What the reader can do after this level (Blueprint 1.3). */
  outcome: string;
  /** Topics covered, in Blueprint 5.2 order. */
  topics: readonly string[];
  /** Questions from the level hub's self-check. */
  selfCheckPrompts: readonly string[];
  /** Guides written for this level. */
  guideCount: number;
  /** Comparison pages built under Compare and linked from this level. */
  linkedCount: number;
}

export interface LevelCard extends GlossaryLevelInfo, LevelHubDetails {}

export interface HowLevelsWorkItem {
  id: string;
  title: string;
  description: string;
}

export interface PopularGuide {
  number: number;
  title: string;
  href: string;
  level: GlossaryLevel;
}

export interface StartHereHint {
  id: string;
  situation: string;
  level: GlossaryLevel;
}

const LEVEL_DETAILS: Record<GlossaryLevel, LevelHubDetails> = {
  1: {
    outcome: "Explain what AI is, write a clear prompt, spot a wrong answer and keep private data out of chats.",
    topics: [
      "What AI is",
      "How a chatbot works without math",
      "Prompts and the five-part formula",
      "Key terms",
      "What AI does well and badly",
      "Free vs paid plans",
      "Privacy basics",
    ],
    selfCheckPrompts: ["Can you explain what AI is?", "Can you spot a wrong answer?"],
    guideCount: 6,
    linkedCount: 0,
  },
  2: {
    outcome: "Use AI for real tasks with files and web search, choose the right plan and verify the results.",
    topics: [
      "Prompting techniques",
      "Files and long documents",
      "Web search and deep research",
      "Projects, memory and custom assistants",
      "Images, audio and video",
      "Fact-checking routine",
      "Choosing a model by task",
      "School and workplace policies",
    ],
    selfCheckPrompts: ["Can you ask for a fixed output format?", "Can you check a source?"],
    guideCount: 8,
    linkedCount: 3,
  },
  3: {
    outcome: "Pick a model per task, control cost per task, build automations and agents, and run your own tests.",
    topics: [
      "How models are trained",
      "Reasoning models and effort settings",
      "Context engineering",
      "RAG",
      "Tool use and MCP",
      "Agents",
      "API for non-engineers",
      "Personal test set",
      "Automations and routing",
    ],
    selfCheckPrompts: ["Can you explain what a context window is?", "Can you estimate cost per task?"],
    guideCount: 7,
    linkedCount: 1,
  },
  4: {
    outcome: "Read benchmarks critically, self-host open-weight models, assess safety reports and map legal duties.",
    topics: [
      "Architectures",
      "Inference and cost",
      "Open weight vs open source",
      "Fine-tuning and adapters",
      "Evaluation",
      "Safety and system cards",
      "Security",
      "Governance and the EU AI Act",
    ],
    selfCheckPrompts: [
      "Can you tell vendor-reported from independent results?",
      "Do you know total vs active parameters?",
    ],
    guideCount: 4,
    linkedCount: 1,
  },
};

/** The four level cards: shared level names and audiences plus the hub details above. */
export const LEVEL_CARDS: readonly LevelCard[] = GLOSSARY_LEVELS.map((info) => ({
  ...info,
  ...LEVEL_DETAILS[info.level],
}));

export const START_HERE_HINTS: readonly StartHereHint[] = [
  { id: "new", situation: "AI is new to you, or you only want the basics", level: 1 },
  { id: "tasks", situation: "You use AI already and want it to do real work, reliably", level: 2 },
  { id: "builders", situation: "You compare models, watch costs or build automations", level: 3 },
  { id: "experts", situation: "You read benchmarks, run models yourself or handle risk and compliance", level: 4 },
];

export const HOW_LEVELS_WORK: readonly HowLevelsWorkItem[] = [
  {
    id: "badges",
    title: "Level badges",
    description: "Every guide, review and tool carries a badge, so you can see at a glance whether a page is for you.",
  },
  {
    id: "prerequisites",
    title: "Prerequisite links",
    description: "Every Level 3 and Level 4 page links back to the Level 1 or 2 page that explains what it assumes.",
  },
  {
    id: "self-check",
    title: "Self-check",
    description: "Each level hub opens with a short self-check, so you can tell whether to start there or one level earlier.",
  },
];

/** The first ten articles to publish (Blueprint 7.2). This is launch priority, not traffic data. */
export const POPULAR_GUIDES: readonly PopularGuide[] = [
  { number: 1, title: "What is AI? A plain-English guide", href: "/learn/foundations/what-is-ai", level: 1 },
  { number: 3, title: "How to write better prompts (20 examples)", href: "/learn/foundations/write-better-prompts", level: 1 },
  { number: 5, title: "What you should never share with an AI chatbot", href: "/learn/foundations/never-share-with-ai-chatbot", level: 1 },
  { number: 7, title: "How to fact-check AI answers", href: "/learn/practitioner/fact-check-ai-answers", level: 2 },
  { number: 13, title: "ChatGPT vs Claude vs Gemini vs Grok", href: "/compare/apps", level: 2 },
  { number: 14, title: "Best AI model right now, by job", href: "/compare/best/by-job", level: 2 },
  { number: 17, title: "Context windows, tokens and memory explained", href: "/learn/power-user/context-windows-tokens-memory", level: 3 },
  { number: 18, title: "Reasoning models and effort settings", href: "/learn/power-user/reasoning-models-effort-settings", level: 3 },
  { number: 22, title: "AI API pricing for non-engineers", href: "/learn/power-user/ai-api-pricing-for-non-engineers", level: 3 },
  { number: 24, title: "Claude Opus 5.5 vs GPT-6.1 Sol: ten everyday tasks", href: "/compare/vs/claude-opus-5-5-vs-gpt-6-1-sol", level: 3 },
];

/** Example terms shown on the glossary shortcut. */
const GLOSSARY_SHORTCUT_TERM_IDS: readonly string[] = ["token", "hallucination", "rag", "agent", "mixture-of-experts"];

export const GLOSSARY_TERM_COUNT = GLOSSARY_TERMS.length;

/** Looks up the shortcut terms by id and skips any id that no longer exists. */
export function getGlossaryShortcutTerms(): GlossaryTerm[] {
  return GLOSSARY_SHORTCUT_TERM_IDS.flatMap((id) => GLOSSARY_TERMS.filter((entry) => entry.id === id));
}