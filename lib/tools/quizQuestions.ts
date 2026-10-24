export type TaskId =
  | "everyday"
  | "writing"
  | "study"
  | "documents"
  | "research"
  | "coding"
  | "media"
  | "bulk";

export type BudgetId = "free" | "low" | "standard" | "high" | "pay-per-use";

export type PrivacyId = "relaxed" | "careful" | "strict";

export interface QuizAnswers {
  task: TaskId;
  budget: BudgetId;
  privacy: PrivacyId;
}

export type PartialQuizAnswers = Partial<QuizAnswers>;

export interface QuizOption<Id extends string> {
  id: Id;
  label: string;
  hint: string;
  /** Shown in the result under "Why this fits you". */
  reason: string;
}

export interface QuizQuestion<Id extends string> {
  key: keyof QuizAnswers;
  title: string;
  help: string;
  options: readonly QuizOption<Id>[];
}

export const TASK_QUESTION: QuizQuestion<TaskId> = {
  key: "task",
  title: "What do you want to use AI for most?",
  help: "Pick the one that matters most. You can retake the quiz for a second use.",
  options: [
    { id: "everyday", label: "A bit of everything", hint: "Questions, planning, ideas, quick explanations", reason: "You want a general-purpose assistant, so the list favours all-round models." },
    { id: "writing", label: "Writing and email", hint: "Drafts, rewrites, tone, tidying your own text", reason: "We have no writing-only ranking yet, so the list uses all-round scores." },
    { id: "study", label: "Studying and learning", hint: "Explanations, practice questions, step-by-step help", reason: "Studying is everyday use, so the list favours all-round value." },
    { id: "documents", label: "Long documents and files", hint: "PDFs, reports, contracts, spreadsheets, scans", reason: "Long files need a large context window, and every model on this list reports 1M tokens or more." },
    { id: "research", label: "Research, maths and science", hint: "Hard questions, sources, calculations", reason: "Hard reasoning questions favour the models with the strongest maths, science and reasoning labels in our directory." },
    { id: "coding", label: "Coding and building", hint: "Code, debugging, automations, agents", reason: "Coding and agent work needs tool use and long runs, so the list leans on coding-focused models." },
    { id: "media", label: "Images, audio or video", hint: "Create or edit pictures, voice and clips", reason: "Media tools are judged by eye and our directory does not rank them yet, so we point you to the roundups." },
    { id: "bulk", label: "Lots of small repeated jobs", hint: "Sort, label or summarize hundreds of items", reason: "Bulk work is about cost per task, so cheap models matter most." },
  ],
};

export const BUDGET_QUESTION: QuizQuestion<BudgetId> = {
  key: "budget",
  title: "What can you spend?",
  help: "Think about what you would pay each month, then pick the closest.",
  options: [
    { id: "free", label: "Nothing", hint: "Free plans only", reason: "You want to pay nothing, so free plans come first." },
    { id: "low", label: "Up to about $10 a month", hint: "A small step up from free", reason: "Your budget fits the low-cost paid plans." },
    { id: "standard", label: "About $20 a month", hint: "The usual paid plan", reason: "Your budget fits the standard $20 plans." },
    { id: "high", label: "$100 a month or more", hint: "Heavy daily use", reason: "Your budget fits the heavy-use plans." },
    { id: "pay-per-use", label: "Only what I use", hint: "An API, for people who can use code or automations", reason: "You prefer paying per use, which is how API pricing works." },
  ],
};

export const PRIVACY_QUESTION: QuizQuestion<PrivacyId> = {
  key: "privacy",
  title: "How private is what you will type or upload?",
  help: "Be honest here. It changes the answer more than anything else.",
  options: [
    { id: "relaxed", label: "Nothing sensitive", hint: "Public topics, hobbies, general questions", reason: "You are not sharing sensitive information, so privacy does not narrow the choice." },
    { id: "careful", label: "Some personal or work details", hint: "Nothing secret, but I want data sharing switched off", reason: "You want control over data sharing, so check the training and retention settings on any plan." },
    { id: "strict", label: "Confidential or regulated information", hint: "Client, health, legal, financial or staff records", reason: "Confidential information needs data terms you can read, or a model that never leaves your computer." },
  ],
};

/** Looks up an option. A missing id is a bug in this file, so it throws. */
export function getOption<Id extends string>(question: QuizQuestion<Id>, id: Id): QuizOption<Id> {
  const option = question.options.find((candidate) => candidate.id === id);
  if (!option) throw new Error(`Unknown option "${id}" for question "${question.key}"`);
  return option;
}