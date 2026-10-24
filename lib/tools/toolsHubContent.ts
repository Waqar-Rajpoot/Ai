/** Date the hub copy and tool list were last reviewed (Blueprint 6.2 "Verified on"). */
export const TOOLS_HUB_REVIEWED_ON = "October 23, 2026";import type { ToolLevel } from "./toolCatalog";

export interface GoalEntry {
  id: string;
  goal: string;
  toolId: string;
  tip: string;
}

export interface ToolReaderPath {
  id: string;
  title: string;
  who: string;
  toolIds: readonly string[];
  why: string;
}

export interface LevelPath {
  level: ToolLevel;
  title: string;
  toolIds: readonly string[];
  note: string;
  hubHref: string;
}

export interface ReadResultRow {
  toolId: string;
  tellsYou: string;
  doesNotTellYou: string;
  checkBy: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface RelatedLink {
  href: string;
  title: string;
  detail: string;
}

/** The two tools suggested to anyone who is not sure where to begin. */
export const START_HERE_IDS: readonly string[] = ["ai-safety-checklist", "which-ai-fits-me"];

export const GOALS: readonly GoalEntry[] = [
  { id: "paid-plan", goal: "Find out whether a paid plan is worth the money", toolId: "subscription-cost-calculator", tip: "Add up every plan you pay for, then compare the total with how often you really use AI." },
  { id: "model-type", goal: "Find the kind of AI that fits my task", toolId: "which-ai-fits-me", tip: "Answer three questions about your task, budget and privacy needs." },
  { id: "better-answers", goal: "Get better answers from a chatbot", toolId: "prompt-library", tip: "Copy a prompt, fill in the blanks and ask for a fixed output format." },
  { id: "stay-safe", goal: "Use AI without risking my privacy", toolId: "ai-safety-checklist", tip: "Go through the list once, then print it for your family, class or team." },
  { id: "document-length", goal: "Check whether a long document will fit", toolId: "token-estimator", tip: "Type a word count, then compare the token estimate with the model's context size in the model directory." },
  { id: "api-bill", goal: "Estimate what an AI API will cost each month", toolId: "api-cost-calculator", tip: "Estimate tokens per task first, then set tasks per month and pick a price row." },
  { id: "run-locally", goal: "See whether my computer can run a model", toolId: "local-model-memory", tip: "Enter the model size and precision, then compare the answer with your computer's memory." },
  { id: "judge-score", goal: "Judge a benchmark score I saw in a headline", toolId: "benchmark-checklist", tip: "Run the score through the ten questions before you repeat it." },
  { id: "keep-copy", goal: "Download something I can print or share", toolId: "cheat-sheets", tip: "Pick the prompt formula, model-choice sheet, resume prompt template or agent permission checklist." },
];

export const READER_PATHS: readonly ToolReaderPath[] = [
  { id: "students", title: "Students", who: "School, college and self-study", toolIds: ["prompt-library", "token-estimator", "ai-safety-checklist", "which-ai-fits-me"], why: "Prompts that ask for steps and quizzes, a way to check how long a reading is, and the school list for honest use." },
  { id: "parents-teachers", title: "Parents and teachers", who: "Families, classrooms and school staff", toolIds: ["ai-safety-checklist", "cheat-sheets", "prompt-library"], why: "A printable school and family list, plus a one-page prompt formula to hand out." },
  { id: "job-seekers", title: "Job seekers", who: "Anyone writing a resume or preparing for interviews", toolIds: ["cheat-sheets", "prompt-library", "subscription-cost-calculator"], why: "The resume prompt template, practice prompts, and a check that a paid plan is worth it for a short job search." },
  { id: "office-freelance", title: "Office workers and freelancers", who: "Email, reports, documents and client work", toolIds: ["prompt-library", "token-estimator", "subscription-cost-calculator", "which-ai-fits-me"], why: "Work prompts, a way to size long documents, and a clear view of what your AI plans cost." },
  { id: "small-business", title: "Small business owners", who: "Teams that handle customer and client data", toolIds: ["ai-safety-checklist", "subscription-cost-calculator", "api-cost-calculator", "which-ai-fits-me"], why: "The small-business safety list, plan costs per seat, and an API estimate if you automate a task." },
  { id: "beginners", title: "Beginners", who: "New to AI and unsure where to begin", toolIds: ["which-ai-fits-me", "cheat-sheets", "ai-safety-checklist"], why: "A model type to start with, the five-part prompt formula on one page, and the habits that keep you safe." },
  { id: "builders", title: "Builders and researchers", who: "Developers, analysts, IT and compliance leads", toolIds: ["api-cost-calculator", "token-estimator", "local-model-memory", "benchmark-checklist"], why: "Cost per task, context sizing, memory for local models and a way to read benchmark claims." },
];

export const LEVEL_PATHS: readonly LevelPath[] = [
  { level: 1, title: "Start safe, then pick and price", toolIds: ["ai-safety-checklist", "which-ai-fits-me", "subscription-cost-calculator", "cheat-sheets"], note: "Read the safety list first, find a model type, check what a plan costs, then keep the prompt formula nearby.", hubHref: "/learn/foundations" },
  { level: 2, title: "Work with real tasks", toolIds: ["prompt-library", "token-estimator", "cheat-sheets"], note: "Use library prompts for real work, size long documents before you paste them, and download the resume template if you need it.", hubHref: "/learn/practitioner" },
  { level: 3, title: "Control cost and choose per task", toolIds: ["token-estimator", "api-cost-calculator", "prompt-library"], note: "Estimate tokens, turn them into a monthly cost, and keep a set of prompts you reuse across models.", hubHref: "/learn/power-user" },
  { level: 4, title: "Test claims and plan hardware", toolIds: ["benchmark-checklist", "local-model-memory"], note: "Question the numbers vendors publish, then check whether the model you want fits your machine.", hubHref: "/learn/expert" },
];

export const READ_RESULT_ROWS: readonly ReadResultRow[] = [
  { toolId: "which-ai-fits-me", tellsYou: "A type of model worth shortlisting for your task, budget and privacy needs.", doesNotTellYou: "A verdict, or a ranking of products. The rules point to a type, not a winner.", checkBy: "Open the linked reviews and compare current prices and limits." },
  { toolId: "subscription-cost-calculator", tellsYou: "What you spend per month and per year if you keep every plan you listed.", doesNotTellYou: "Future price changes, taxes, or what an annual plan saves.", checkBy: "Confirm each price on the provider's own page." },
  { toolId: "prompt-library", tellsYou: "A good starting prompt you can edit for your own task.", doesNotTellYou: "That the answer will be right. Chatbots can sound sure and still be wrong.", checkBy: "Fact-check anything that matters, using the routine in our guide." },
  { toolId: "token-estimator", tellsYou: "A ballpark token count for ordinary English text.", doesNotTellYou: "The exact count a model will use. Code, numbers and other languages can use more.", checkBy: "Use the provider's own token counter when exact numbers matter." },
  { toolId: "api-cost-calculator", tellsYou: "A rough monthly bill for the usage you typed in, using a dated price row.", doesNotTellYou: "A quote. Real bills move with retries, long outputs, caching and price changes.", checkBy: "Add a margin, and re-check introductory-rate end dates in the price table." },
  { toolId: "local-model-memory", tellsYou: "About how much memory the model's weights need.", doesNotTellYou: "Everything your computer needs. Context, the software that runs the model and your system use memory too.", checkBy: "Leave headroom above the estimate and test on your own machine." },
  { toolId: "benchmark-checklist", tellsYou: "Ten questions that separate a solid result from a weak one.", doesNotTellYou: "A score of its own. It helps you judge someone else's number.", checkBy: "If you cannot answer several questions, treat the number as a lead only." },
  { toolId: "ai-safety-checklist", tellsYou: "A short set of habits for your situation.", doesNotTellYou: "That you are secure or compliant. It is not legal or professional advice.", checkBy: "Follow your school's or employer's own policy first." },
  { toolId: "cheat-sheets", tellsYou: "A one-page summary you can keep next to your desk.", doesNotTellYou: "That the sheet is current forever. Models, plans and rules change.", checkBy: "Check the review date on this site before you print again." },
];

export const BROWSER_POINTS: readonly string[] = [
  "Calculators run in the page, on the numbers you type in.",
  "You do not need an account to use any tool.",
  "What you type into a tool is not sent to us.",
  "The quiz does not call an AI service. Its result comes from hand-written rules.",
  "Print and download buttons make files on your own device.",
];

export const LIMIT_POINTS: readonly string[] = [
  "Do not type passwords, ID numbers, health or money details, or client data into any box, ours included.",
  "Normal visit data, such as page views, and cookies are covered in the privacy policy.",
  "Clearing the page or closing the tab clears what you typed.",
];

export const CURRENT_POINTS: readonly string[] = [
  "Price rows in the calculators come from our dated tables and show the verified-on date of the row you use.",
  "When a price, plan or limit changes, we update the tables within 24 hours, and the calculators read the same data.",
  "Introductory rates show their end date, so an estimate does not quietly go stale.",
  "The quiz rules are checked whenever our best-for pages change.",
  "Every change to a tool or table is logged in the changelog.",
];

export const WRONG_POINTS: readonly string[] = [
  "A calculator gives an estimate, not a quote. Treat the result as a range to plan with.",
  "Prices and features change. Confirm on the provider's website before buying.",
  "A suggested model type is a place to start looking, not a final choice.",
  "A prompt can still produce a wrong answer. Check facts that matter.",
  "Checklists are general guidance, not legal, medical or professional advice.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Are the tools free?", answer: "Yes. Every tool is free to use and needs no account. Paid prompt packs, templates and courses are separate products in the shop." },
  { question: "Do you save what I type?", answer: "No. The tools run in your browser on what you type in, and we do not receive it. Normal visit data and cookies are described in the privacy policy." },
  { question: "Do the tools use AI?", answer: "No. The calculators are simple arithmetic and the quiz uses hand-written rules. Some articles on this site are drafted with AI tools and edited by a person. The editorial standards page explains which tools and what they did." },
  { question: "How accurate are the cost numbers?", answer: "They are estimates built on dated prices. Real bills depend on how you use a model, so add a margin and confirm the price on the provider's page." },
  { question: "Which tool should I start with?", answer: "If you are not sure, begin with the AI safety checklist and then the Which AI fits me quiz. Both are Level 1 and take a few minutes." },
  { question: "What do the level badges mean?", answer: "Level 1 is Foundations, Level 2 is Practitioner, Level 3 is Power user and builder, and Level 4 is Expert. A tool can suit several levels. The Learn hub has a short self-check for each one." },
  { question: "Can I use the tools on my phone?", answer: "Yes. Pages are built to work on small screens, and wide tables scroll sideways." },
  { question: "A number or result looks wrong. What do I do?", answer: "Tell us on the corrections page. We log the date it was reported, the date it was fixed and what changed." },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/learn", title: "Learn", detail: "Guides from first steps to expert topics, with a self-check at each level." },
  { href: "/compare/models", title: "Model directory", detail: "Prices, context sizes and independent scores for the models we track." },
  { href: "/prices", title: "Prices", detail: "Plans, API costs, free limits and more, each with a verified-on date." },
  { href: "/about/how-we-test", title: "How we test", detail: "The seven-point scorecard and how we label results." },
];