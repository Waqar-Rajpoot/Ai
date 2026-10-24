import type { GuideCard, SelfCheckQuestion, SourceEntry, TopicCard } from "./foundationsContent";
import type { SelfCheckMessages } from "./selfCheck";

export type PowerUserGuideCard = Omit<GuideCard, "kind"> & { kind: "Explainer" | "Guide" | "Head-to-head" };

export interface Prerequisite {
  id: string;
  title: string;
  reason: string;
  href: string;
}

export interface RoutingRow {
  task: string;
  route: string;
  why: string;
}

export interface CopyTemplate {
  id: string;
  title: string;
  text: string;
}

export const POWER_USER_SELF_CHECK_QUESTIONS: readonly SelfCheckQuestion[] = [
  {
    id: "context-window",
    prompt: "What is a context window?",
    options: [
      { id: "a", label: "The number of people who can use a chatbot at once" },
      { id: "b", label: "How much text the model can consider in one go: your chat, files and its reply" },
      { id: "c", label: "The date its training data ends" },
      { id: "d", label: "The size of the chat window on your screen" },
    ],
    correctOptionId: "b",
    explanation: "Everything the model reads and writes in a request has to fit in the window. Very long chats can push early details out.",
  },
  {
    id: "cost-per-task",
    prompt: "A model has a low price per token. Why might a task still cost more than you expected?",
    options: [
      { id: "a", label: "Cheaper models charge a hidden monthly fee" },
      { id: "b", label: "Tokens are only counted for the answer, never the question" },
      { id: "c", label: "Input and output tokens are priced separately, and long files or long reasoning use many tokens" },
      { id: "d", label: "The price changes every time you press enter" },
    ],
    correctOptionId: "c",
    explanation: "Cost per task depends on how many tokens you send and receive, not only on the price per million.",
  },
  {
    id: "rag",
    prompt: "What does retrieval-augmented generation (RAG) do?",
    options: [
      { id: "a", label: "Finds relevant passages in your documents and gives them to the model with your question" },
      { id: "b", label: "Retrains the model on your files overnight" },
      { id: "c", label: "Makes any model faster" },
      { id: "d", label: "Removes hallucinations completely" },
    ],
    correctOptionId: "a",
    explanation: "RAG retrieves first, then answers. It can still retrieve the wrong passage, so the answer still needs checking.",
  },
  {
    id: "effort",
    prompt: "When is a higher reasoning effort most likely to help?",
    options: [
      { id: "a", label: "Fixing the spacing in a list" },
      { id: "b", label: "Rewording a friendly sentence" },
      { id: "c", label: "Saying hello" },
      { id: "d", label: "A multi-step problem with several constraints" },
    ],
    correctOptionId: "d",
    explanation: "Extra effort suits problems with many steps. For simple tasks it mostly adds time and cost.",
  },
  {
    id: "agent-access",
    prompt: "You connect an AI agent to your email for the first time. What is the safest starting setup?",
    options: [
      { id: "a", label: "Full access, to save time" },
      { id: "b", label: "Read-only access, with your approval needed before it sends or deletes anything" },
      { id: "c", label: "Admin access on a shared work account" },
      { id: "d", label: "Your password, so it can log in whenever it needs to" },
    ],
    correctOptionId: "b",
    explanation: "Give an agent only the access the job needs, and keep a human check on actions that are hard to undo.",
  },
  {
    id: "own-tests",
    prompt: "Why build your own test set instead of trusting a public score?",
    options: [
      { id: "a", label: "Public scores are always fake" },
      { id: "b", label: "Providers require it" },
      { id: "c", label: "Your tasks, data and standards may differ from what a benchmark measures" },
      { id: "d", label: "Test sets make models cheaper" },
    ],
    correctOptionId: "c",
    explanation: "A score is a shortlist, not a verdict. Ten of your own tasks tell you what works for you.",
  },
];

export const POWER_USER_RESULT_MESSAGES: SelfCheckMessages = {
  ready: { headline: "You are ready for Level 4", advice: "Skim the guides below, then move on to the Expert level." },
  goodStart: { headline: "A solid base", advice: "Read the guides for the questions you missed, then try again." },
  startOver: { headline: "Revisit Level 2 first", advice: "Practitioner covers files, research and fact-checking. Come back when it feels familiar." },
};

export const POWER_USER_PREREQUISITES: readonly Prerequisite[] = [
  { id: "key-terms", title: "Tokens, context window and hallucination", reason: "Level 3 uses these terms constantly.", href: "/learn/foundations#key-terms" },
  { id: "files", title: "Files and long documents", reason: "Context engineering and RAG build on how files are read.", href: "/learn/practitioner#files" },
  { id: "fact-checking", title: "Fact-checking routine", reason: "Agents and automations still need a human check.", href: "/learn/practitioner#fact-checking" },
  { id: "choosing-model", title: "Choosing a model by task", reason: "Routing builds on what to look for in a model.", href: "/learn/practitioner#choosing-model" },
];

export const POWER_USER_ABILITIES: readonly string[] = [
  "Explain how a model is trained, and why that limits what it knows",
  "Decide when a higher reasoning effort is worth the extra cost",
  "Decide what to put in a prompt, what to retrieve and what to leave out",
  "Explain RAG, tool use and MCP, and where each can fail",
  "Give an agent only the permissions it needs",
  "Work out the cost of a task, not just a price per token",
  "Build a personal test set and route tasks to the right model",
];

export const POWER_USER_TOPICS: readonly TopicCard[] = [
  { id: "training", title: "How models are trained", summary: "Pre-training, tuning and what they mean for what a model knows." },
  { id: "reasoning", title: "Reasoning models and effort settings", summary: "When thinking longer helps, and when it only costs more." },
  { id: "context", title: "Context engineering", summary: "What to put in, what to retrieve and what to leave out." },
  { id: "rag", title: "RAG", summary: "Answering from your own documents, and how it fails." },
  { id: "tools-mcp", title: "Tool use and MCP", summary: "Letting a model act, and connecting it to your tools safely." },
  { id: "agents", title: "Agents", summary: "What they can do, how they fail, and what to allow them." },
  { id: "api-pricing", title: "API for non-engineers", summary: "Tokens, caching, batch pricing and cost per task." },
  { id: "test-set", title: "Personal test set", summary: "Ten real tasks, scored the same way every time." },
  { id: "automations", title: "Automations and routing", summary: "Sending cheap tasks to cheap models, with a human checkpoint." },
];

export const TRAINING_STEPS: readonly TopicCard[] = [
  { id: "pretraining", title: "Pre-training", summary: "The model reads a very large amount of text and learns patterns in language. Most of its general knowledge comes from this stage." },
  { id: "tuning", title: "Tuning", summary: "Further training teaches it to follow instructions and avoid unsafe answers, so it behaves like an assistant." },
  { id: "limits", title: "What that means for you", summary: "It knows only what was in its training data up to a cutoff date, and it can still be wrong. Search or your own documents fill the gap." },
];

export const EFFORT_INTRO =
  "Reasoning models spend extra computation working through a problem before they answer. Many tools let you set how much. Names and settings differ by provider.";

export const EFFORT_HELPS: readonly string[] = [
  "Multi-step maths or logic",
  "Planning with several constraints",
  "Debugging tricky code",
  "Comparing options against a set of rules",
];

export const EFFORT_COSTS_MORE: readonly string[] = [
  "Rewording or formatting text",
  "Simple lookups",
  "Short summaries",
  "Casual chat",
];

export const EFFORT_NOTE =
  "Higher effort can mean slower answers and more tokens used, so it can cost more. Treat this as a rule of thumb and test it on your own tasks.";

export const CONTEXT_CARDS: readonly TopicCard[] = [
  { id: "put", title: "Put in the prompt", summary: "Instructions, the facts the task needs every time, and the format you want." },
  { id: "retrieve", title: "Retrieve when needed", summary: "Large documents, notes and policies, pulled in only for the question being asked." },
  { id: "leave-out", title: "Leave out", summary: "Private data, irrelevant chat history, and anything you would not show a stranger." },
];

export const RAG_STEPS: readonly TopicCard[] = [
  { id: "chunk", title: "Split", summary: "Your documents are cut into short passages, called chunks." },
  { id: "embed", title: "Embed", summary: "Each chunk becomes a list of numbers, an embedding, that captures its meaning." },
  { id: "find", title: "Find", summary: "Your question is turned into numbers too, and the closest chunks are retrieved." },
  { id: "answer", title: "Answer", summary: "The model gets your question plus those chunks, and writes an answer from them." },
];

export const RAG_WINS_WHEN: readonly string[] = [
  "Your documents are too big to fit in one prompt",
  "You ask many different questions over the same documents",
  "You want each answer tied to a source passage",
];

export const RAG_LONG_PROMPT_ENOUGH: readonly string[] = [
  "You have one or two documents that fit",
  "The model needs to see everything at once, for example to compare two contracts",
];

export const RAG_FAILURES: readonly string[] = [
  "It retrieves the wrong passage, and the answer sounds sure anyway",
  "The answer is not in your documents, and the model guesses",
  "The documents are out of date",
  "A chunk is cut so that the key sentence is missing",
];

export const TOOL_CARDS: readonly TopicCard[] = [
  { id: "tool-use", title: "Tool use", summary: "The model asks for an action, such as a search, a calculation or a file lookup, and the app carries it out and returns the result." },
  { id: "mcp", title: "MCP", summary: "The Model Context Protocol is an open standard for connecting AI apps to tools and data, so each tool does not need its own custom link." },
  { id: "connectors", title: "Connectors", summary: "Ready-made connections to services such as email, calendars and files. Names and availability differ by provider." },
];

export const MCP_SAFE_SETUP: readonly string[] = [
  "Start read-only.",
  "Connect one service at a time.",
  "Use an account with limited access.",
  "Read what the connection asks permission to do.",
  "Remove connections you stop using.",
];

export const AGENT_CARDS: readonly TopicCard[] = [
  { id: "coding", title: "Coding agents", summary: "Read a codebase, make changes and run tests with little supervision." },
  { id: "computer-use", title: "Computer-use agents", summary: "Operate a browser or desktop, clicking and typing as a person would." },
  { id: "long-running", title: "Long-running tasks", summary: "Work for many steps or hours, which is also where small errors pile up." },
];

export const AGENT_FAILURES: readonly string[] = [
  "Misread the goal and carry on with confidence",
  "Get stuck in loops that burn time and money",
  "Take actions that are hard to undo",
  "Follow instructions hidden in web pages or files, known as prompt injection",
  "Drift over a long task and forget earlier limits",
];

export const API_CARDS: readonly TopicCard[] = [
  { id: "input", title: "Input tokens", summary: "What you send: instructions, files and chat history." },
  { id: "output", title: "Output tokens", summary: "What the model writes back. Input and output are priced separately." },
  { id: "caching", title: "Caching", summary: "Some providers charge less for input you repeat. Check whether yours does." },
  { id: "batch", title: "Batch pricing", summary: "Some providers offer lower prices for work that can wait. Check the provider's pricing page." },
  { id: "per-task", title: "Cost per task", summary: "The number that matters: tokens in and out for one job, times the prices." },
];

export const COST_FORMULA =
  "Cost per task = (input tokens ÷ 1,000,000 × input price) + (output tokens ÷ 1,000,000 × output price)";

export const SUBSCRIPTION_VS_API_NOTE =
  "A chatbot subscription is not an API. A subscription charges a flat monthly fee with usage limits, while an API charges for the tokens you use.";

export const TEST_SET_STEPS: readonly TopicCard[] = [
  { id: "pick", title: "Pick 10 real tasks", summary: "Use jobs you actually do, with private details removed." },
  { id: "define", title: "Define good", summary: "Write what a good answer looks like before you run anything." },
  { id: "run", title: "Run each one", summary: "Use the same settings for every model you compare." },
  { id: "score", title: "Score and record", summary: "Note the score, the model version, the settings and the date." },
  { id: "retest", title: "Re-test on a schedule", summary: "Models and plans change, so repeat the test now and then." },
];

export const TEST_SET_TEMPLATE: CopyTemplate = {
  id: "scoring-sheet",
  title: "Scoring sheet columns",
  text: "Task | What a good answer looks like | Model and settings | Score (1 to 5) | Notes | Test date",
};

export const AUTOMATION_CARDS: readonly TopicCard[] = [
  { id: "repeat", title: "Automate what repeats", summary: "Pick jobs that are frequent, predictable and easy to check." },
  { id: "checkpoint", title: "Keep a human checkpoint", summary: "Review before anything is sent, published or deleted." },
  { id: "route", title: "Route by difficulty", summary: "Send simple, high-volume work to cheaper models and hard work to stronger ones." },
  { id: "retest", title: "Test the route", summary: "Run your test set through the cheaper path before you rely on it." },
];

export const ROUTING_ROWS: readonly RoutingRow[] = [
  { task: "Simple, high-volume work such as tagging or short rewrites", route: "A cheaper, faster model", why: "Cost adds up with volume, and the task is easy to check." },
  { task: "Hard reasoning or high-stakes drafts", route: "A stronger model, with a human check", why: "Mistakes cost more than the extra tokens." },
  { task: "Private or client material", route: "A tool your organisation approves, or a local model", why: "Where the data goes matters more than the price." },
];

export const POWER_USER_GUIDES: readonly PowerUserGuideCard[] = [
  { number: 17, title: "Context windows, tokens and memory explained", summary: "Tokens versus words, what a window holds, and memory versus context.", href: "/learn/power-user/context-windows-tokens-memory", kind: "Explainer", minutes: 7, isPublished: false },
  { number: 18, title: "Reasoning models and effort settings: when thinking longer helps", summary: "What reasoning models do, when more effort helps, and when it only costs more.", href: "/learn/power-user/reasoning-models-effort-settings", kind: "Explainer", minutes: 7, isPublished: false },
  { number: 19, title: "RAG explained: making AI answer from your documents", summary: "Retrieval in plain English, embeddings, when RAG beats a long prompt, and failure modes.", href: "/learn/power-user/rag-explained", kind: "Explainer", minutes: 8, isPublished: false },
  { number: 20, title: "AI agents explained: what they can do and how they fail", summary: "Coding and computer-use agents, long-running tasks and how agents fail.", href: "/learn/power-user/ai-agents-explained", kind: "Explainer", minutes: 8, isPublished: false },
  { number: 21, title: "MCP and connectors: giving AI access to your tools safely", summary: "What MCP is, connectors in practice, permissions and a safe setup checklist.", href: "/learn/power-user/mcp-and-connectors", kind: "Explainer", minutes: 7, isPublished: false },
  { number: 22, title: "AI API pricing for non-engineers: cost per task, not per token", summary: "Input and output tokens, caching, batch pricing and a worked example.", href: "/learn/power-user/ai-api-pricing-for-non-engineers", kind: "Guide", minutes: 8, isPublished: false },
  { number: 23, title: "Build your own AI test set in one afternoon", summary: "Pick 10 tasks, build a scoring sheet, run and record, and plan re-tests.", href: "/learn/power-user/build-your-own-ai-test-set", kind: "Guide", minutes: 8, isPublished: false },
];

/** Article 24 is built under Compare and linked here so no page exists twice. */
export const POWER_USER_LINKED_HEAD_TO_HEAD: readonly PowerUserGuideCard[] = [
  { number: 24, title: "Claude Opus 5.5 vs GPT-6.1 Sol: ten everyday tasks", summary: "Two models, the same ten tasks, one test day, and cost per task.", href: "/compare/vs/claude-opus-5-5-vs-gpt-6-1-sol", kind: "Head-to-head", minutes: 10, isPublished: false },
];

export const POWER_USER_SOURCES: readonly SourceEntry[] = [
  { publisher: "Model Context Protocol", title: "Official site: what MCP is and how it works", href: "https://modelcontextprotocol.io/", type: "Vendor-reported" },
];