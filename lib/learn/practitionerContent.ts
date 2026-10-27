import {
  SOURCES,
  type GuideCard,
  type SelfCheckQuestion,
  type SourceEntry,
  type TopicCard,
} from "./foundationsContent";
import type { SelfCheckMessages } from "./selfCheck";

export interface TechniqueCard extends TopicCard {
  example: string;
}

export interface CopyReadyPrompt {
  id: string;
  title: string;
  text: string;
}

export interface TaskFitRow {
  task: string;
  lookFor: string;
  checkLabel: string;
  checkHref: string;
}

/** Reuses the Foundations card shape and adds the labelled content types Level 2 needs. */
export type PractitionerGuideCard = Omit<GuideCard, "kind"> & {
  kind: GuideCard["kind"] | "Opinion" | "Comparison" | "Roundup";
};

export const PRACTITIONER_SELF_CHECK_QUESTIONS: readonly SelfCheckQuestion[] = [
  {
    id: "fixed-format",
    prompt: "You want a comparison you can paste into a spreadsheet. Which prompt is most likely to work?",
    options: [
      { id: "a", label: "Compare these two phones." },
      { id: "b", label: "Tell me everything about both phones." },
      { id: "c", label: "Compare these two phones in a table with columns for price, battery and weight, one row per phone." },
      { id: "d", label: "Make it look good." },
    ],
    correctOptionId: "c",
    explanation: "Naming the format, the columns and the layout leaves the model little to guess.",
  },
  {
    id: "examples",
    prompt: "What does putting an example inside your prompt do?",
    options: [
      { id: "a", label: "It makes the answer slower" },
      { id: "b", label: "It shows the model the pattern or style you want it to follow" },
      { id: "c", label: "It guarantees the facts are correct" },
      { id: "d", label: "It is required in every prompt" },
    ],
    correctOptionId: "b",
    explanation: "Vendor guides recommend including examples. An example shows the style and format. It does not check facts.",
  },
  {
    id: "check-source",
    prompt: "An AI answer gives a source with a link. What is the safest next step?",
    options: [
      { id: "a", label: "Trust it, because a link is shown" },
      { id: "b", label: "Ask the chatbot if the link is real and accept its reply" },
      { id: "c", label: "Read only the title of the source" },
      { id: "d", label: "Open the source and check that it really says what the answer claims" },
    ],
    correctOptionId: "d",
    explanation: "A source can be missing, wrong or misdescribed. Only reading it tells you.",
  },
  {
    id: "long-file",
    prompt: "You upload a long report and ask about one detail deep inside it. What should you do with the answer?",
    options: [
      { id: "a", label: "Ask where the detail appears, then check that page in the original" },
      { id: "b", label: "Accept it, because the file was uploaded" },
      { id: "c", label: "Assume longer documents give more accurate answers" },
      { id: "d", label: "Delete the file and try again without checking" },
    ],
    correctOptionId: "a",
    explanation: "Ask for the page and the exact wording, then read that page yourself.",
  },
  {
    id: "high-stakes",
    prompt: "Which task needs the most careful checking before you act on the answer?",
    options: [
      { id: "a", label: "Brainstorming party themes" },
      { id: "b", label: "Rewording a friendly email" },
      { id: "c", label: "A medicine dose or a legal deadline" },
      { id: "d", label: "Suggesting a name for a pet" },
    ],
    correctOptionId: "c",
    explanation: "Health, legal and money answers can cause real harm if they are wrong. Confirm them with official sources or a qualified professional.",
  },
  {
    id: "policy",
    prompt: "Your course allows AI for brainstorming only, but you used it to write a paragraph. What should you do?",
    options: [
      { id: "a", label: "Submit it without mentioning it" },
      { id: "b", label: "Tell your teacher what you did and ask what is allowed" },
      { id: "c", label: "Assume the rule does not apply to short paragraphs" },
      { id: "d", label: "Delete the chat so nobody can see it" },
    ],
    correctOptionId: "b",
    explanation: "Rules differ by school and employer. The one that applies is yours, so be open about what you did.",
  },
];

export const PRACTITIONER_RESULT_MESSAGES: SelfCheckMessages = {
  ready: { headline: "You are ready for Level 3", advice: "Skim the guides below, then move on to the Power user level." },
  goodStart: { headline: "A solid base", advice: "Read the guides for the questions you missed, then try again." },
  startOver: { headline: "Revisit Level 1 first", advice: "Foundations covers prompts, wrong answers and privacy. Come back when it feels familiar." },
};

export const PRACTITIONER_ABILITIES: readonly string[] = [
  "Ask for a fixed output format and get it",
  "Put an example in your prompt so the answer matches your style",
  "Summarise and question long files, and know where that goes wrong",
  "Use web search and deep research, then check the sources",
  "Run a fact-checking routine, with extra care for health, legal and money",
  "Choose a plan by what you actually need",
  "Follow school and workplace rules, and disclose AI use clearly",
];

export const PRACTITIONER_TOPICS: readonly TopicCard[] = [
  { id: "prompting-techniques", title: "Prompting techniques", summary: "Examples in the prompt, fixed formats and follow-ups that fix weak answers." },
  { id: "files", title: "Files and long documents", summary: "Length, scans and tables, and how to ask about a distant page." },
  { id: "research", title: "Web search and deep research", summary: "What each does, how to write a brief, and how to check the sources." },
  { id: "projects-memory", title: "Projects, memory and custom assistants", summary: "Keeping a job together, and controlling what the AI remembers." },
  { id: "media", title: "Images, audio and video", summary: "Useful jobs, labelling and the risks of fakes." },
  { id: "fact-checking", title: "Fact-checking routine", summary: "A five-step routine and how much checking each situation needs." },
  { id: "choosing-model", title: "Choosing a model by task", summary: "What to look for, and where to check it, without brand hype." },
  { id: "policies", title: "School and workplace policies", summary: "Finding the rule that applies, and disclosing AI use." },
];

export const TECHNIQUES: readonly TechniqueCard[] = [
  { id: "example", title: "Give an example", summary: "Show one sample of the output you want. The model copies the pattern.", example: "Write product notes like this one: “Soft cotton tee. Runs small. Machine washable.”" },
  { id: "format", title: "Fix the format", summary: "Name the layout, the length and the order.", example: "Answer in a table with three columns and no more than five rows." },
  { id: "steps", title: "Ask for steps", summary: "For multi-part problems, ask it to work in order so you can check each step.", example: "Solve this one step at a time and show your working." },
  { id: "questions", title: "Let it ask you", summary: "Stop it guessing missing details.", example: "Ask me up to three questions before you start." },
  { id: "split", title: "Split big jobs", summary: "Several small prompts usually beat one huge one.", example: "First outline the report. Then we will write one section at a time." },
  { id: "doubts", title: "Ask for its doubts", summary: "Make it point to the weak spots for you to check.", example: "List the parts of your answer you are least sure about." },
];

export const FILE_LIMITS: readonly TopicCard[] = [
  { id: "length", title: "Length", summary: "Every tool has a limit on how much it can read at once, and the limit depends on the plan." },
  { id: "scans", title: "Scans", summary: "A photo of a page has to be read as an image, so errors creep in." },
  { id: "tables", title: "Tables and charts", summary: "Numbers can end up in the wrong row or column. Check them." },
];

export const DOCUMENT_PROMPTS: readonly CopyReadyPrompt[] = [
  { id: "summary-pages", title: "Summary with page numbers", text: "Summarise this document in five bullet points. After each bullet, give the page number where it appears." },
  { id: "find-quote", title: "Find a detail", text: "Find the part of this document that discusses [topic]. Quote it exactly and tell me the page number." },
];

export const RESEARCH_CARDS: readonly TopicCard[] = [
  { id: "search", title: "Web search", summary: "The chatbot looks up current pages and uses them in its answer. Useful for recent events and for facts it would otherwise guess." },
  { id: "deep", title: "Deep research", summary: "A longer, multi-step mode that reads many pages and writes a report with sources. It takes more time, and limits depend on the plan." },
  { id: "proof", title: "Neither is proof", summary: "Both can miss good sources, misread a page or cite something that does not say what the answer claims." },
];

export const RESEARCH_BRIEF_TEMPLATE: CopyReadyPrompt = {
  id: "research-brief",
  title: "Research brief template",
  text: [
    "I need a short research report on: [topic].",
    "Audience: [who will read it].",
    "Time frame: [for example, the last two years].",
    "Prefer official, government or primary sources. Avoid forums and anonymous posts.",
    "Format: a one-page summary, then a list of sources with links.",
    "Mark anything you could not confirm.",
  ].join("\n"),
};

export const SOURCE_CHECKS: readonly string[] = [
  "Open the link. Does the page exist, and does it say what the answer claims?",
  "Check the date. Is it recent enough for your question?",
  "Find the original. Prefer official, government or primary sources over summaries.",
  "Look for a second, independent source for anything important.",
  "Watch for sources that only repeat each other.",
];

export const PROJECT_CARDS: readonly TopicCard[] = [
  { id: "projects", title: "Projects", summary: "A workspace that keeps chats, files and instructions for one job together, such as a thesis or a job search." },
  { id: "memory", title: "Memory", summary: "Some chatbots remember details between chats. That saves repeating yourself, and it can store things you did not mean to keep." },
  { id: "assistants", title: "Custom assistants", summary: "Saved instructions that set the role, tone and format for a task you repeat." },
];

export const MEMORY_RULES: readonly string[] = [
  "Review what is stored, and delete what you do not want kept.",
  "Never store passwords, IDs, health details or client data.",
  "Use a separate project for each job, so details do not mix.",
  "Names and availability of these features differ by provider and plan. Check the provider's help page.",
];

export const MEDIA_CARDS: readonly TopicCard[] = [
  { id: "images", title: "Images", summary: "Good for drafts, mock-ups and ideas. Check the result for odd details and garbled text." },
  { id: "audio", title: "Audio", summary: "Transcripts and summaries of recordings you have the right to use. Get consent before using other people's voices." },
  { id: "video", title: "Video", summary: "Short clips and summaries. Fakes are easy to make, so a clip is not proof." },
];

export const MEDIA_RULES: readonly string[] = [
  "Label AI-made images, audio and video when you share them.",
  "Do not upload photos of other people without their permission.",
  "Check the tool's terms before using its output for commercial work.",
  "Copyright rules for AI-made content differ by country and are changing. This is not legal advice.",
];

export const FACT_CHECK_STEPS: readonly TopicCard[] = [
  { id: "mark", title: "Mark the claims that matter", summary: "Names, numbers, dates, quotes and advice you plan to use." },
  { id: "ask", title: "Ask for sources, or search yourself", summary: "A list of sources is a starting point. Some may be wrong or invented." },
  { id: "open", title: "Open each source", summary: "Check it exists, is recent enough and says what the answer claims." },
  { id: "cross", title: "Cross-check the important ones", summary: "Find one more independent source, ideally an official one." },
  { id: "decide", title: "Decide, then record", summary: "Keep what you confirmed, drop what you could not, and note where it came from." },
];

export const FACT_CHECK_PROMPTS: readonly CopyReadyPrompt[] = [
  { id: "list-claims", title: "List the claims", text: "List every factual claim in your last answer as a numbered list. Label each one as a figure, a date, a name, a quote or advice." },
  { id: "confidence", title: "Ask how sure it is", text: "For each claim, say how sure you are and what kind of source would confirm it. If you are guessing, say so." },
  { id: "out-of-date", title: "Spot what may be out of date", text: "Which parts of your answer might be out of date? Tell me what to check on an official website." },
];

export const TASK_FIT_ROWS: readonly TaskFitRow[] = [
  { task: "Everyday writing and email", lookFor: "Start with a free plan and see whether its limits get in your way.", checkLabel: "Free-plan limits", checkHref: "/prices/free-limits" },
  { task: "Long documents and reports", lookFor: "File upload support and a large context window. Test with a document you know well.", checkLabel: "Feature matrix", checkHref: "/prices/features" },
  { task: "Research with sources", lookFor: "Web search or a deep research mode that shows sources you can open.", checkLabel: "Feature matrix", checkHref: "/prices/features" },
  { task: "Images, audio or video", lookFor: "Which of these the plan includes, and its limits.", checkLabel: "Feature matrix", checkHref: "/prices/features" },
  { task: "Private or work material", lookFor: "A training setting you can turn off, and a tool your employer approves.", checkLabel: "Privacy matrix", checkHref: "/prices/privacy" },
  { task: "Hard problems or code", lookFor: "Test the same task on two options before you pay.", checkLabel: "Best-for roundups", checkHref: "/compare/best" },
];

export const POLICY_CARDS: readonly TopicCard[] = [
  { id: "school", title: "School and college", summary: "Read the syllabus or honour code. Rules differ by course and by task: brainstorming may be fine where drafting is not." },
  { id: "work", title: "Work", summary: "Read your employer's AI policy. Use approved tools for work material, and never paste client data into an unapproved one." },
  { id: "publishing", title: "Publishing and competitions", summary: "Some publishers, platforms and competitions ask for AI use to be disclosed or labelled. Check before you submit." },
  { id: "citing", title: "Citing AI", summary: "If you must cite AI, follow the style your school or publisher names. If none is named, ask." },
];

export const PRACTITIONER_GUIDES: readonly PractitionerGuideCard[] = [
  { number: 7, title: "How to fact-check AI answers", summary: "A five-step routine, checking sources and quotes, and extra care for health, legal and money.", href: "/learn/practitioner/fact-check-ai-answers", kind: "Guide", minutes: 7, isPublished: true },
  { number: 8, title: "How to use AI to study without cheating", summary: "Ask for steps and quizzes, not finished answers. School policies and how to disclose.", href: "/learn/practitioner/use-ai-to-study-without-cheating", kind: "Guide", minutes: 6, isPublished: true },
  { number: 9, title: "How to summarize a PDF or long document with AI", summary: "Length limits, scans, tables and charts, and asking about a distant page.", href: "/learn/practitioner/summarize-pdf-with-ai", kind: "Guide", minutes: 6, isPublished: true },
  { number: 10, title: "How to use AI for email and writing at work", summary: "Drafting and tone, fixed formats, keeping client data private and disclosure at work.", href: "/learn/practitioner/ai-for-email-and-writing-at-work", kind: "Guide", minutes: 6, isPublished: true },
  { number: 11, title: "How to write a resume and prepare for interviews with AI", summary: "A resume prompt template, tailoring to a job post and mock interview prompts.", href: "/learn/practitioner/ai-resume-and-interview-prep", kind: "Guide", minutes: 8, isPublished: true },
  { number: 12, title: "Deep research modes: how to use them and check the sources", summary: "Writing a research brief, checking the sources it gives, and cost and limits.", href: "/learn/practitioner/deep-research-modes", kind: "Guide", minutes: 7, isPublished: true },
  { number: 16, title: "Is AI worth paying for? Our honest answer", summary: "Who should stay free, who should pay, and subscription versus API.", href: "/learn/practitioner/is-ai-worth-paying-for", kind: "Opinion", minutes: 6, isPublished: true },
  { number: 30, title: "Where AI helps and where it fails (our testing)", summary: "Our test tasks, where it helped, where it failed, with test date and settings.", href: "/learn/practitioner/where-ai-helps-and-fails", kind: "Opinion", minutes: 8, isPublished: true },
];

/** Articles 13 to 15 are built under Compare and linked here so no page exists twice. */
export const PRACTITIONER_LINKED_COMPARISONS: readonly PractitionerGuideCard[] = [
  { number: 13, title: "ChatGPT vs Claude vs Gemini vs Grok", summary: "The four consumer apps side by side: plans, limits, features and privacy.", href: "/compare/apps", kind: "Comparison", minutes: 8, isPublished: true },
  { number: 14, title: "Best AI model right now, by job", summary: "Ranked by task, with the test date and the reasoning shown.", href: "/compare/best-ai-model-by-job", kind: "Roundup", minutes: 6, isPublished: true },
  { number: 15, title: "Best AI tools for students", summary: "Study-focused picks, with who should skip each.", href: "/compare/best-ai-tools-for-students", kind: "Roundup", minutes: 6, isPublished: true },
];

/** Sources already vetted on the Foundations page that also back Level 2 claims. */
const SHARED_SOURCE_HREFS: readonly string[] = [
  "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
  "https://openai.com/index/why-language-models-hallucinate/",
];

export const PRACTITIONER_SOURCES: readonly SourceEntry[] = SOURCES.filter((source) =>
  SHARED_SOURCE_HREFS.includes(source.href),
);