import type { ToolLevel } from "./toolCatalog";

export interface QuickStep {
  title: string;
  detail: string;
}

export interface FormulaPart {
  part: string;
  question: string;
  example: string;
  whyItHelps: string;
}

export interface FollowUp {
  label: string;
  text: string;
}

export interface LevelNote {
  level: ToolLevel;
  looksLike: string;
  youNeed: string;
  hubHref: string;
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

export const QUICK_STEPS: readonly QuickStep[] = [
  { title: "Pick a prompt", detail: "Search, or filter by task and level, then choose the one closest to what you need." },
  { title: "Fill in the brackets", detail: "Use the fill-in boxes, or replace each [bracket] by hand. The more specific you are, the better the answer." },
  { title: "Copy, paste and check", detail: "Paste it into your chatbot, then check any fact that matters before you rely on it." },
];

export const FORMULA_PARTS: readonly FormulaPart[] = [
  { part: "Role", question: "Who should the AI act as?", example: "You are a patient tutor.", whyItHelps: "It sets the voice and the level of detail." },
  { part: "Task", question: "What exactly should it do?", example: "Explain how a monthly budget works.", whyItHelps: "One clear job beats a vague topic." },
  { part: "Context", question: "What does it need to know about you or the situation?", example: "I am a student with a part-time job and no savings.", whyItHelps: "Without it, the answer is written for nobody in particular." },
  { part: "Format", question: "What should the answer look like?", example: "A five-step list under 150 words.", whyItHelps: "A fixed format is easier to read, compare and reuse." },
  { part: "Limits", question: "What should it avoid, or when should it stop?", example: "Say so if you are unsure. Do not recommend products.", whyItHelps: "Limits cut guessing, invented sources and padding." },
];

export const WEAK_PROMPT = "Tell me about budgeting.";

export const STRONG_PROMPT =
  "You are a friendly money coach. Explain how to start a monthly budget. I am a student with a part-time job and no savings. Give me a five-step list under 150 words. Say so if you are unsure, and do not recommend specific products.";

export const FOLLOW_UPS: readonly FollowUp[] = [
  { label: "Ask me questions first", text: "Before you answer, ask me up to three questions that would make your answer better." },
  { label: "Make it shorter", text: "Make that half as long without losing any facts." },
  { label: "Explain it more simply", text: "Explain that again for a 12-year-old, with one example." },
  { label: "Give me options", text: "Give me three different versions and say who each one suits." },
  { label: "Show your sources", text: "Give the source for each claim and tell me which ones you could not confirm." },
  { label: "Check yourself", text: "Re-read your answer and list anything that might be wrong or out of date." },
  { label: "Say what is missing", text: "What important point have I not asked about that I should know?" },
];

export const ADAPT_TIPS: readonly string[] = [
  "No file upload? Paste a short excerpt and say it is an excerpt, not the whole document.",
  "No web search? Delete the lines about sources and links, and check facts yourself.",
  "Memory or projects switched on? Say whether the chatbot should use earlier chats or ignore them.",
  "Answer cut off or too long? Ask it to continue, or split the task into smaller parts.",
  "Different chatbots answer differently. Re-run your best prompts when you switch.",
];

export const NEVER_PASTE: readonly string[] = [
  "Passwords and security codes",
  "ID, passport, tax and bank numbers",
  "Health and money details about you or anyone else",
  "Client or employer data you are not allowed to share",
  "Private messages that include names",
];

export const SAFER_WAY =
  "Replace real names with labels such as Client A, round your numbers, and delete anything the chatbot does not need.";

export const CHECK_STEPS: readonly string[] = [
  "Ask for sources, then open them and check that they say what the answer claims.",
  "Check names, dates, quotes and numbers by hand. These are the most common slips.",
  "Ask the chatbot to list its assumptions and what it could not check.",
  "Compare one key point with a second source you trust.",
  "For health, legal and money questions, use the answer to prepare questions for a qualified person.",
];

export const LEVEL_NOTES: readonly LevelNote[] = [
  { level: 1, looksLike: "Plain tasks with a clear role, task and format.", youNeed: "Any chatbot. No files or web search.", hubHref: "/learn/foundations" },
  { level: 2, looksLike: "Fixed formats, attached files, web search and a routine for checking sources.", youNeed: "A chatbot that can read a file or search the web for some prompts.", hubHref: "/learn/practitioner" },
  { level: 3, looksLike: "Test sets, system prompts, cost per task and agent permissions.", youNeed: "Comfort with tokens and APIs, and a place to run the result.", hubHref: "/learn/power-user" },
];

export const WRONG_POINTS: readonly string[] = [
  "A good prompt does not guarantee a right answer. Chatbots can sound sure and still be wrong.",
  "Asking for sources can produce sources that do not exist. Open every link.",
  "The same prompt can give different answers on different models, settings and days.",
  "Anything you paste may be handled under your chatbot's data rules. Keep private details out.",
  "Prompts here are general. They are not medical, legal, financial or professional advice.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Do these prompts work in every chatbot?", answer: "They work in any chatbot that takes text. A few lines, such as attached files or web search, need those features. Delete the lines your chatbot cannot follow." },
  { question: "Why are there brackets in the prompts?", answer: "A bracket marks a blank. Type your own words in the fill-in boxes, or replace each bracket by hand after you paste." },
  { question: "Does this page save what I type?", answer: "No. The boxes and the copy button work on your device, and what you type is not sent to us or saved. You should still keep passwords, IDs and private details out of any prompt." },
  { question: "Will a prompt give the same answer every time?", answer: "No. Answers change with the model, its settings and the wording. When a prompt works well for you, keep a copy of it." },
  { question: "Is using these for schoolwork cheating?", answer: "That depends on your school's rules. The study prompts ask for explanations, quizzes and feedback, not finished answers. Check your policy and say how you used AI." },
  { question: "Can AI write my resume?", answer: "It can help you phrase facts you give it. The resume prompts tell the chatbot not to invent anything, and you are responsible for every line." },
  { question: "What do the level badges mean?", answer: "Level 1 prompts are plain tasks for any chatbot. Level 2 adds formats, files, web search and checking. Level 3 is for builders." },
  { question: "Can I suggest a prompt?", answer: "Yes. Send it through the contact page and tell us which task it helps with. We cannot promise to add every one." },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/learn/foundations/write-better-prompts", title: "How to write better prompts", detail: "The five-part formula and 20 examples, explained step by step." },
  { href: "/tools/cheat-sheets", title: "Cheat sheets and templates", detail: "The prompt formula and a resume prompt template as printable one-pagers." },
  { href: "/tools/ai-safety-checklist", title: "AI safety checklist", detail: "Short lists for individuals, schools and small businesses." },
  { href: "/learn/practitioner/fact-check-ai-answers", title: "How to fact-check AI answers", detail: "A routine you can run on any answer." },
];