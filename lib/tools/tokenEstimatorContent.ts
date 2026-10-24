import type { FitStatus } from "./tokenEstimate";
import {
  FIT_COMFORTABLE_RATIO,
  FIT_TIGHT_RATIO,
  READING_WORDS_PER_MINUTE,
  WORDS_PER_BOOK,
  WORDS_PER_PAGE,
} from "./tokenEstimateConstants";
import type { ContentTypeId } from "./tokenProfiles";

const COMFORTABLE_PERCENT = Math.round(FIT_COMFORTABLE_RATIO * 100);
const TIGHT_PERCENT = Math.round(FIT_TIGHT_RATIO * 100);

export interface PointEntry {
  lead: string;
  text: string;
}

export interface FitAdvice {
  meaning: string;
  action: string;
}

export interface ReaderPath {
  id: string;
  title: string;
  who: string;
  points: readonly string[];
  link: { href: string; label: string };
}

export interface SizePreset {
  id: string;
  label: string;
  words: number;
}

export interface WorkedExample {
  id: string;
  label: string;
  detail: string;
  mode: "words" | "characters";
  amount: number;
  contentTypeId: ContentTypeId;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface SourceLink {
  publisher: string;
  title: string;
  href: string;
  supports: string;
}

export const SHORT_ANSWER_POINTS: readonly PointEntry[] = [
  { lead: "A token is a small chunk of text.", text: "It can be a short word, part of a longer word, a number or a punctuation mark. AI models read and write tokens, not words." },
  { lead: "In English, 1 token is about 4 characters.", text: "That is about three-quarters of a word, so 1,000 words is roughly 1,300 tokens." },
  { lead: "Other languages, code and data use more.", text: "The same amount of text can take twice as many tokens, or more, depending on what it is." },
  { lead: "Your text and the reply share one window.", text: "Always leave room for the answer, not just for what you paste in." },
];

export const HOW_TO_READ: readonly PointEntry[] = [
  { lead: "The headline number", text: "is the tokens in your text alone, rounded so it does not look more exact than it is." },
  { lead: "The range", text: "shows how far real counts can drift between tokenizers. Plan around the high end for anything close to a limit." },
  { lead: "The total", text: "adds the text, anything already in the chat or prompt, and the reply you want. This is what has to fit in the window." },
  { lead: "The verdict", text: "compares that total with each model's context window. See the five verdicts below." },
];

export const FIT_ADVICE: Record<FitStatus, FitAdvice> = {
  comfortable: {
    meaning: `Uses ${COMFORTABLE_PERCENT}% of the window or less.`,
    action: "No action needed. You have room for follow-up questions in the same chat.",
  },
  fits: {
    meaning: `Uses ${COMFORTABLE_PERCENT}% to ${TIGHT_PERCENT}% of the window.`,
    action: "Fine for one job. Long chats will fill the rest, so start a new chat for a new task.",
  },
  tight: {
    meaning: `Uses more than ${TIGHT_PERCENT}% of the window, though even the high estimate still fits.`,
    action: "Trim what you paste, or ask for a shorter reply. Details buried deep in very long inputs are easier to miss, so spot-check the answer.",
  },
  borderline: {
    meaning: "The typical estimate fits, but the high end does not.",
    action: "Get an exact count from the provider's tool before you rely on it, or shorten the input to be safe.",
  },
  "too-long": {
    meaning: "The typical estimate is already over the window.",
    action: "Split the text into parts, summarize in stages, or let a tool search your documents instead of pasting them in full.",
  },
  unknown: {
    meaning: "The maker has not confirmed this window.",
    action: "Check the provider's page, or type your own window size into the form.",
  },
};

export const TERMS: readonly PointEntry[] = [
  { lead: "Token", text: "The unit a model reads and writes. Roughly a short word or a piece of a long one." },
  { lead: "Context window", text: "The most tokens a model can hold in view at once, counting your input and its reply together." },
  { lead: "Input and output tokens", text: "Input is what you send, output is what the model writes. APIs usually price them separately." },
  { lead: "Tokenizer", text: "The part that splits text into tokens. Each model family has its own, which is why counts differ." },
  { lead: "Prompt", text: "Everything you send for one request: your message, pasted text, instructions and chat history." },
  { lead: "Reasoning tokens", text: "Hidden \"thinking\" some models do before they answer. They take space and are billed as output, though you do not see them." },
];

export const WHAT_COUNTS_IN_WINDOW: readonly PointEntry[] = [
  { lead: "Your message", text: "Whatever you type, including long pasted passages." },
  { lead: "Files and attachments", text: "Document text, plus images, audio and video turned into tokens in ways that vary by provider." },
  { lead: "The earlier conversation", text: "Past messages usually stay in view until they are trimmed or summarized, so a long chat uses more space each turn." },
  { lead: "Instructions and memory", text: "System prompts, custom instructions, saved memory and project files all take room before you type a word." },
  { lead: "Search and tool results", text: "Web pages, connector results and other tool output that the model reads while it works." },
  { lead: "The reply", text: "The model's answer shares the same window as your input." },
  { lead: "Hidden thinking", text: "On reasoning models, thinking tokens count toward output and can be large on hard problems." },
];

export const WHY_ESTIMATES_DIFFER: readonly PointEntry[] = [
  { lead: "Every provider has its own tokenizer.", text: "OpenAI says tokens are not standardized across models or providers. Anthropic's documentation says the tokenizer introduced with Claude Opus 4.7 and used by later models produces about 30% more tokens than earlier models for the same text." },
  { lead: "Language and script matter.", text: "Tokenizers are usually built around English first, so other languages and scripts often need more tokens for the same meaning." },
  { lead: "Code and data are expensive.", text: "Brackets, indentation, IDs and numbers split into many small tokens." },
  { lead: "Spelling and surroundings change the split.", text: "OpenAI notes a word can be split differently depending on its spelling, capitalization and the text around it." },
  { lead: "A real request is more than your text.", text: "Message roles, tool definitions, schemas, images and files add tokens that a plain-text count leaves out." },
  { lead: "Images, audio and video are counted differently.", text: "Google lists about 263 tokens per second of video and 32 per second of audio for Gemini. This tool covers text only." },
];

export const SAVE_TOKENS_TIPS: readonly PointEntry[] = [
  { lead: "Paste only what you need.", text: "Send the relevant section, not the whole file." },
  { lead: "Start a new chat for a new task.", text: "Old messages keep using space and can distract the model." },
  { lead: "Summarize in stages.", text: "Split a long document into parts, summarize each, then combine the summaries." },
  { lead: "Ask for a length.", text: "\"In 200 words\" caps the reply and leaves room for follow-ups." },
  { lead: "Cut boilerplate.", text: "Remove signatures, repeated headers and long quoted email threads before pasting." },
  { lead: "Search instead of pasting.", text: "For big document sets, retrieval tools find the relevant passages so you do not paste everything in." },
  { lead: "For code, send what matters.", text: "The failing file and the error message beat the whole repository." },
  { lead: "Count exactly before a big job.", text: "Use the provider's own counter when a limit or a bill is at stake." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "This is an estimate. The real count can be higher or lower, and the range shows how much.",
  "A model that fits your text may still answer badly if the input is very long. Always spot-check long-document answers.",
  "Chat apps can have a smaller window than the same model's API, and it can depend on your plan.",
  "Context sizes come from our model directory and can change. Confirm on the provider's page.",
  "Images, scanned pages, audio and video are not counted here, and they can use many tokens.",
  "A big window does not mean a big reply. Makers can set a separate cap on how long one answer may be.",
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "chat-users",
    title: "I use chat apps",
    who: "ChatGPT, Claude, Gemini or Grok in a browser or phone app",
    points: [
      "You rarely see token counts, but long chats and big files can hit the limit and the app may cut things off or ask you to start again.",
      "Use this tool to check whether a document is likely to fit before you upload it.",
      "Your plan can change the window and the number of messages you get. Check the provider's plan page.",
      "If a chat starts forgetting early details, start a new one and paste a short summary.",
    ],
    link: { href: "/learn/practitioner/summarize-pdf-with-ai", label: "Read: summarize a long document with AI" },
  },
  {
    id: "builders",
    title: "I build with an API",
    who: "Developers, analysts and anyone with a model call in code or an automation",
    points: [
      "Use this tool for planning, and the provider's counting tool for the exact figure before launch.",
      "Budget for the reply and for hidden thinking on reasoning models, not just the input.",
      "Add the system prompt, tool definitions and chat history to the extra-tokens box.",
      "Turn tokens per task into a monthly cost with the API cost calculator.",
    ],
    link: { href: "/tools/api-cost-calculator", label: "Open the API cost calculator" },
  },
  {
    id: "planners",
    title: "I plan work or a budget",
    who: "Team leads, small business owners, teachers and researchers",
    points: [
      "Start from word counts you already know: pages in a report, length of a typical email.",
      "Compare windows to decide whether a job needs one pass or several.",
      "Remember that cost depends on tokens per task times tasks per month.",
      "Run the example sizes below to build a feel for what is small, medium and large.",
    ],
    link: { href: "/learn/power-user/ai-api-pricing-for-non-engineers", label: "Read: AI API pricing for non-engineers" },
  },
];

export const SIZE_PRESETS: readonly SizePreset[] = [
  { id: "email", label: "Short email", words: 150 },
  { id: "resume", label: "Résumé", words: 600 },
  { id: "article", label: "News article", words: 1_200 },
  { id: "essay", label: "Long essay", words: 3_000 },
  { id: "paper", label: "Research paper", words: 8_000 },
  { id: "report", label: "100-page report", words: 100 * WORDS_PER_PAGE },
  { id: "novel", label: "Average novel", words: WORDS_PER_BOOK },
];

export const WORKED_EXAMPLES: readonly WorkedExample[] = [
  { id: "email", label: "A short email", detail: "About 150 words of English.", mode: "words", amount: 150, contentTypeId: "english" },
  { id: "resume-job", label: "A résumé plus a job post", detail: "About 600 words each.", mode: "words", amount: 1_200, contentTypeId: "english" },
  { id: "report", label: "A 40-page report (text only)", detail: `${WORDS_PER_PAGE} words per page. Charts and scanned pages would add more.`, mode: "words", amount: 40 * WORDS_PER_PAGE, contentTypeId: "english" },
  { id: "novel", label: "An average novel", detail: "About 90,000 words of English.", mode: "words", amount: WORDS_PER_BOOK, contentTypeId: "english" },
  { id: "code", label: "A small code project", detail: "20 files of about 200 lines, at about 35 characters per line.", mode: "characters", amount: 20 * 200 * 35, contentTypeId: "code" },
  { id: "chinese", label: "A Chinese article", detail: "3,000 characters.", mode: "characters", amount: 3_000, contentTypeId: "cjk" },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Is this the same count my AI will use?", answer: "No. It is an estimate from published rules of thumb. Each model family uses its own tokenizer, so exact counts differ. Use the provider's counting tool when you need the exact number." },
  { question: "How do I get an exact count?", answer: "OpenAI provides a tokenizer tool, Anthropic provides a token-counting endpoint, and Google provides a count-tokens call in the Gemini API. They are linked in the sources below. Chat apps usually do not show counts." },
  { question: "Do spaces and punctuation count?", answer: "Yes. Everything in the text is tokenized, and a space usually attaches to the word that follows it. That is why the estimate uses characters, not just letters." },
  { question: "Why does my non-English text give a bigger number?", answer: "Tokenizers tend to be most efficient on English. Other languages, and scripts such as Chinese, Japanese and Korean, often need more tokens for the same meaning." },
  { question: "Do images and PDFs count?", answer: "Yes, in provider-specific ways. This tool covers text only. A scanned PDF or a page full of charts can use far more tokens than its text suggests." },
  { question: "Is the context window the same as memory?", answer: "No. The context window is what the model can see right now. Memory features save notes between chats and then put some of them back into the window when needed." },
  { question: "If a model has a 1M window, can I paste 1M tokens?", answer: "Not safely. The reply also needs room, apps can set smaller limits than the API, and answers about details deep inside very long inputs can be less reliable. Leave headroom and test." },
  { question: "Does the reply count against the window?", answer: "Usually yes: input and output share the window. Some makers also cap the length of a single reply separately, so check the provider's documentation." },
  { question: "Does my text leave my browser?", answer: "No. The estimate is calculated on this page and nothing you paste is sent or saved." },
  { question: "Why does the API cost calculator ask for tokens per task?", answer: "API prices are quoted per million tokens, so cost depends on how many tokens a task uses. This tool gives you that figure to carry over." },
];

export const PROVIDER_SOURCES: readonly SourceLink[] = [
  {
    publisher: "OpenAI",
    title: "What are tokens and how to count them",
    href: "https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them",
    supports: "The 4-characters and three-quarters-of-a-word rules, and that tokens are not standardized across providers.",
  },
  {
    publisher: "Anthropic",
    title: "Token counting",
    href: "https://platform.claude.com/docs/build-with-claude/token-counting",
    supports: "The free counting endpoint, that its count is an estimate, and the tokenizer change since Claude Opus 4.7.",
  },
  {
    publisher: "Google",
    title: "Understand and count tokens (Gemini API)",
    href: "https://ai.google.dev/gemini-api/docs/tokens",
    supports: "That all inputs are tokenized, and the token rates for video and audio.",
  },
];

export const READING_ASSUMPTIONS: readonly string[] = [
  `A page is ${WORDS_PER_PAGE} words (single-spaced).`,
  `A book is ${WORDS_PER_BOOK.toLocaleString("en-US")} words.`,
  `Reading speed is ${READING_WORDS_PER_MINUTE} words per minute.`,
];