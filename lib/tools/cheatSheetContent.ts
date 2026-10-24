import type { SheetId } from "./cheatSheets";

export interface ReaderRow {
  reader: string;
  sheetId: SheetId;
  why: string;
}

export interface TipEntry {
  title: string;
  detail: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface GlossaryEntry {
  term: string;
  meaning: string;
}

export interface RelatedLink {
  href: string;
  label: string;
  note: string;
}

export const READER_ROWS: readonly ReaderRow[] = [
  { reader: "New to AI and want better answers", sheetId: "prompt-formula", why: "Five parts that fix most weak prompts." },
  { reader: "Student or office worker", sheetId: "prompt-formula", why: "Use the fill-in prompt and the follow-up phrases for study and writing." },
  { reader: "Job seeker", sheetId: "resume-prompt", why: "Three templates that keep your resume honest." },
  { reader: "Choosing an AI model or deciding whether to pay", sheetId: "model-choice", why: "Match the task to a model type and test before you spend." },
  { reader: "Setting up an agent, connector or automation", sheetId: "agent-permissions", why: "Decide what it may read, change and send." },
  { reader: "Team lead or small business owner", sheetId: "agent-permissions", why: "Share it with whoever owns each AI tool." },
];

export const TIPS: readonly TipEntry[] = [
  { title: "Edit the template, do not worship it", detail: "The wording is a starting point. Change it to fit your task and your voice." },
  { title: "Keep a prompt notebook", detail: "When a prompt works, save it. A short list of your own tested prompts beats any generic list." },
  { title: "Fill in real context", detail: "The biggest gain usually comes from the context box, not a clever role." },
  { title: "Change one thing at a time", detail: "If an answer is poor, adjust one part of the prompt and compare." },
  { title: "Share the sheets", detail: "Download or print a sheet for a family member, a classmate or your team." },
  { title: "Re-check every few months", detail: "Models, plans and tools change. The structure of a good prompt lasts longer than the model names." },
];

export const COMMON_MISTAKES: readonly TipEntry[] = [
  { title: "Pasting private data into the template", detail: "The fill-in boxes are for your own convenience. Keep passwords, ID numbers and client data out of them, and out of the chat." },
  { title: "Trusting the first answer", detail: "A good prompt makes a good answer more likely. It does not make it correct." },
  { title: "Choosing a model by its score alone", detail: "A score is a shortlist, not a verdict. Test on your own tasks." },
  { title: "Giving an agent more access than it needs", detail: "Broad access turns a small mistake into a large one." },
  { title: "Letting AI invent your achievements", detail: "A resume claim you cannot explain is a liability." },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Are these sheets free?", answer: "Yes. You can copy, print or download every sheet as a plain text file." },
  { question: "Why text files and not PDFs?", answer: "Text files open anywhere, paste straight into a chat and are easy to edit. Use the print button for a paper or PDF copy: most browsers offer Save as PDF." },
  { question: "Do the templates work with every chatbot?", answer: "Yes. They are plain text, so they work with any chatbot. Results vary by model, so test the prompt on yours." },
  { question: "Is what I type into the fill-in boxes sent anywhere?", answer: "No. The boxes work in your browser and nothing is sent to us. When you paste the finished prompt into a chatbot, that chatbot receives it, so keep private data out." },
  { question: "Why does the model-choice sheet list model names?", answer: "The picks table is a snapshot of our model directory. The task-to-model-type table is built to last longer, because types age more slowly than names." },
  { question: "Will the agent checklist keep my ticks?", answer: "Yes, in this browser on this device. A new device or cleared browser data starts fresh." },
  { question: "Does the resume template guarantee I pass a screening tool?", answer: "No. Nothing here promises that. The aim is an honest, clear resume that fits the job post." },
  { question: "How often are the sheets updated?", answer: "Every few months, and sooner when a tool or rule changes in a way that affects a sheet. The reviewed date is at the top of the page." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Prompt", meaning: "The text you give an AI to tell it what you want." },
  { term: "Context window", meaning: "How much text a model can consider at once. Long documents need a large one." },
  { term: "Agent", meaning: "An AI that takes steps and uses tools on its own, such as reading files or sending messages." },
  { term: "Connector (MCP)", meaning: "A link that lets an AI use another app or data source, such as your email or files." },
  { term: "Prompt injection", meaning: "Hidden instructions in a page, email or file that trick an AI into doing something you did not ask for." },
  { term: "Least privilege", meaning: "Giving a tool only the access it needs for the job and nothing more." },
  { term: "Open-weight model", meaning: "A model whose files you can download and run yourself. It can offer more privacy and needs suitable hardware." },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/learn/foundations/write-better-prompts", label: "How to write better prompts (20 examples)", note: "Level 1 guide" },
  { href: "/learn/practitioner/ai-resume-and-interview-prep", label: "Resume and interview prep with AI", note: "Level 2 guide" },
  { href: "/learn/power-user/ai-agents-explained", label: "AI agents explained", note: "Level 3 explainer" },
  { href: "/learn/power-user/mcp-and-connectors", label: "MCP and connectors", note: "Level 3 explainer" },
  { href: "/learn/expert/prompt-injection-agent-security", label: "Prompt injection and agent security", note: "Level 4 guide" },
  { href: "/compare/models", label: "Model directory", note: "Prices, context and scores" },
  { href: "/tools/prompt-library", label: "Prompt library", note: "More copy-ready prompts" },
  { href: "/tools/ai-safety-checklist", label: "AI safety checklist", note: "For individuals, schools and businesses" },
];