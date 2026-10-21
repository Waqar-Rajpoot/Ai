export type DataSensitivity = "public" | "private" | "restricted";
export type UsageVolume = "occasional" | "steady" | "heavy";
export type TechnicalSkill = "beginner" | "comfortable" | "engineer";
export type HardwareAccess = "none" | "computer" | "server";
export type QualityNeed = "good" | "best";

export interface ChooserAnswers {
  dataSensitivity: DataSensitivity;
  volume: UsageVolume;
  skill: TechnicalSkill;
  hardware: HardwareAccess;
  qualityNeed: QualityNeed;
}

type QuestionFor<K extends keyof ChooserAnswers> = {
  id: K;
  prompt: string;
  hint: string;
  options: readonly { value: ChooserAnswers[K]; label: string }[];
};

export type ChooserQuestion = { [K in keyof ChooserAnswers]: QuestionFor<K> }[keyof ChooserAnswers];

export type ModelTypeOutcomeId = "hosted" | "hosted-business" | "open-via-host" | "run-open-yourself" | "hybrid";

export interface NextStep {
  label: string;
  href: string;
}

export interface ModelTypeAdvice {
  outcome: ModelTypeOutcomeId;
  title: string;
  summary: string;
  reasons: readonly string[];
  nextSteps: readonly NextStep[];
  watchOut: string;
}

export const CHOOSER_QUESTIONS: readonly ChooserQuestion[] = [
  {
    id: "dataSensitivity",
    prompt: "What kind of material will you put in?",
    hint: "Think about the most sensitive thing you might paste.",
    options: [
      { value: "public", label: "Public or low-stakes material" },
      { value: "private", label: "Private work or personal material" },
      { value: "restricted", label: "Client, health, legal or regulated data" },
    ],
  },
  {
    id: "volume",
    prompt: "How much will you use it?",
    hint: "Volume decides whether per-token prices or owning hardware matters.",
    options: [
      { value: "occasional", label: "A few times a week" },
      { value: "steady", label: "Daily, a moderate amount" },
      { value: "heavy", label: "Heavy, automated or business-scale" },
    ],
  },
  {
    id: "skill",
    prompt: "How comfortable are you installing and running software?",
    hint: "Be honest. Running a model yourself takes some setup and upkeep.",
    options: [
      { value: "beginner", label: "I would rather use an app" },
      { value: "comfortable", label: "I can follow technical guides" },
      { value: "engineer", label: "I run servers or write code for a living" },
    ],
  },
  {
    id: "hardware",
    prompt: "What hardware could you use?",
    hint: "Memory matters most. The estimator on this page shows how much a model needs.",
    options: [
      { value: "none", label: "A phone or an ordinary laptop" },
      { value: "computer", label: "A recent computer with plenty of memory, or a gaming-class graphics card" },
      { value: "server", label: "A GPU server, or a budget to rent one" },
    ],
  },
  {
    id: "qualityNeed",
    prompt: "How demanding are your tasks?",
    hint: "Everyday writing and summaries are easier than hard reasoning or complex code.",
    options: [
      { value: "good", label: "Everyday tasks, where good is enough" },
      { value: "best", label: "Hard tasks, where the best result matters" },
    ],
  },
];

const OUTCOMES: Record<ModelTypeOutcomeId, Omit<ModelTypeAdvice, "outcome" | "reasons">> = {
  hosted: {
    title: "Start with a hosted model",
    summary:
      "Use a major provider's app or API. It is the quickest way to good results, and you can look at open weights later if a clear reason appears.",
    nextSteps: [
      { label: "Best AI model right now, by job", href: "/compare/best/by-job" },
      { label: "Compare plans and prices", href: "/prices/plans" },
      { label: "Check privacy settings", href: "/prices/privacy" },
    ],
    watchOut: "Check the plan's data and training settings before you paste anything private.",
  },
  "hosted-business": {
    title: "Use a hosted service with business data terms, or an approved tool",
    summary:
      "Pick a business-grade plan or the tool your organization has approved, and confirm how it stores and uses your data. If the data must stay on your own machines, ask for help setting up a local model.",
    nextSteps: [
      { label: "Privacy matrix", href: "/prices/privacy" },
      { label: "What you should never share with an AI chatbot", href: "/learn/foundations/never-share-with-ai-chatbot" },
      { label: "The EU AI Act for everyday users", href: "/learn/expert/eu-ai-act-for-everyday-users" },
    ],
    watchOut:
      "Business terms differ from consumer terms. Read the retention and training terms, and ask your IT or legal team where rules apply.",
  },
  "open-via-host": {
    title: "Try an open-weight model through a hosting provider",
    summary:
      "A host runs the model and charges per token, so you get open-weight options without buying hardware. You can move to your own hardware later if volume keeps growing.",
    nextSteps: [
      { label: "API prices", href: "/prices/api" },
      { label: "API cost calculator", href: "/tools/api-cost-calculator" },
      { label: "Best open-weight models", href: "/compare/best/open-weights" },
    ],
    watchOut: "The host sees your prompts, so its privacy terms apply. It may also add limits on top of the model's licence.",
  },
  "run-open-yourself": {
    title: "Run an open-weight model yourself",
    summary:
      "Download a model that fits your memory, run it on your own computer or server, and keep control of the data and the version.",
    nextSteps: [
      { label: "Local model memory estimator", href: "/tools/local-model-memory" },
      { label: "Run an AI model on your own computer", href: "/learn/expert/run-ai-on-your-own-computer" },
      { label: "Best models to run locally", href: "/compare/best/local" },
    ],
    watchOut: "You are responsible for security, updates and quality checks. Read the licence before you use a model for work.",
  },
  hybrid: {
    title: "Use both: hosted for hard tasks, open-weight for private or routine ones",
    summary:
      "Send difficult or high-stakes work to a strong hosted model. Keep private or repetitive work on a smaller open-weight model that you run or host.",
    nextSteps: [
      { label: "Automations and routing", href: "/learn/power-user#automations" },
      { label: "Build your own test set", href: "/learn/power-user#test-set" },
      { label: "Best AI model right now, by job", href: "/compare/best/by-job" },
    ],
    watchOut: "Test the cheaper route on your own tasks before you rely on it, and keep private data out of the hosted path.",
  },
};

/** True once every question has an answer. */
export function isChooserComplete(answers: Partial<ChooserAnswers>): answers is ChooserAnswers {
  return CHOOSER_QUESTIONS.every((question) => answers[question.id] !== undefined);
}

/** Returns a copy of the answers with one question answered. */
export function setChooserAnswer<K extends keyof ChooserAnswers>(
  answers: Partial<ChooserAnswers>,
  id: K,
  value: ChooserAnswers[K],
): Partial<ChooserAnswers> {
  return { ...answers, [id]: value };
}

/**
 * Hand-written rules, checked in order. A thinking aid, not a verdict.
 * Sensitive data comes first, then skill, then volume, then quality needs.
 */
export function adviseModelType(answers: ChooserAnswers): ModelTypeAdvice {
  const { dataSensitivity, volume, skill, hardware, qualityNeed } = answers;
  const canRunLocally = skill !== "beginner" && hardware !== "none";
  const canOperateServer = skill === "engineer" && hardware === "server";

  const reasons: string[] = [];
  let outcome: ModelTypeOutcomeId;

  if (dataSensitivity === "restricted") {
    reasons.push("Client, health, legal or regulated data should stay inside tools you are allowed to use.");
    if (canRunLocally) {
      outcome = "run-open-yourself";
      reasons.push("You have the skills and hardware to keep the data on your own machines.");
    } else {
      outcome = "hosted-business";
      reasons.push("Without the skills or hardware to run a model yourself, an approved business-grade service is the safer route.");
    }
  } else if (skill === "beginner") {
    outcome = "hosted";
    reasons.push("A hosted app needs no setup, and you can switch later.");
  } else if (volume === "heavy") {
    if (canOperateServer) {
      outcome = "run-open-yourself";
      reasons.push("Heavy, steady use is where owning hardware can pay off, and you have the skills and a server.");
    } else {
      outcome = "open-via-host";
      reasons.push("Heavy use makes the price per task matter. A host lets you try open-weight models without buying hardware.");
    }
  } else if (qualityNeed === "best") {
    if (dataSensitivity === "private" && canRunLocally) {
      outcome = "hybrid";
      reasons.push("Hard tasks suit the strongest hosted models, while your private material can stay on a model you run yourself.");
    } else {
      outcome = "hosted";
      reasons.push("For hard tasks, check the benchmark digest first. So far the top independent scores have mostly gone to hosted models.");
    }
  } else if (dataSensitivity === "private" && canRunLocally) {
    outcome = "hybrid";
    reasons.push("Everyday tasks can run on a smaller open-weight model, and you keep private material off hosted services.");
  } else {
    outcome = "hosted";
    reasons.push("Light or moderate use is cheapest and simplest on a hosted plan.");
  }

  return { outcome, ...OUTCOMES[outcome], reasons };
}