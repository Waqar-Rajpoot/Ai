export type GlossaryLevel = 1 | 2 | 3 | 4;

export interface GlossaryGuideLink {
  title: string;
  href: string;
}

export interface GlossaryTerm {
  /** URL-safe id, also used as the anchor, for example /learn/glossary#hallucination. */
  id: string;
  term: string;
  level: GlossaryLevel;
  /** One or two plain-English sentences. */
  definition: string;
  /** The page that explains the term in full. */
  guide: GlossaryGuideLink;
}

export interface GlossaryLevelInfo {
  level: GlossaryLevel;
  name: string;
  /** Who the level is for (Blueprint 1.3). */
  audience: string;
  hubHref: string;
}

export const GLOSSARY_LEVELS: readonly GlossaryLevelInfo[] = [
  { level: 1, name: "Foundations", audience: "complete beginners, parents and students", hubHref: "/learn/foundations" },
  { level: 2, name: "Practitioner", audience: "students, office workers, job seekers and small business owners", hubHref: "/learn/practitioner" },
  { level: 3, name: "Power user and builder", audience: "freelancers, analysts, developers and team leads", hubHref: "/learn/power-user" },
  { level: 4, name: "Expert", audience: "developers, researchers, and IT or compliance leads", hubHref: "/learn/expert" },
];

/** Guide links used by more than one term, so each route is written once. */
const GUIDES = {
  whatIsAi: { title: "What is AI? A plain-English guide", href: "/learn/foundations/what-is-ai" },
  howChatbotsWork: { title: "How AI chatbots work, without math", href: "/learn/foundations/how-ai-chatbots-work" },
  betterPrompts: { title: "How to write better prompts", href: "/learn/foundations/write-better-prompts" },
  freeVsPaid: { title: "Free vs paid AI: what you actually get", href: "/learn/foundations/free-vs-paid-ai" },
  deepResearch: { title: "Deep research modes", href: "/learn/practitioner/deep-research-modes" },
  factCheck: { title: "How to fact-check AI answers", href: "/learn/practitioner/fact-check-ai-answers" },
  summarizePdf: { title: "How to summarize a PDF or long document with AI", href: "/learn/practitioner/summarize-pdf-with-ai" },
  practitionerHub: { title: "Level 2: Practitioner", href: "/learn/practitioner" },
  contextMemory: { title: "Context windows, tokens and memory explained", href: "/learn/power-user/context-windows-tokens-memory" },
  reasoning: { title: "Reasoning models and effort settings", href: "/learn/power-user/reasoning-models-effort-settings" },
  rag: { title: "RAG explained", href: "/learn/power-user/rag-explained" },
  agents: { title: "AI agents explained", href: "/learn/power-user/ai-agents-explained" },
  mcp: { title: "MCP and connectors", href: "/learn/power-user/mcp-and-connectors" },
  apiPricing: { title: "AI API pricing for non-engineers", href: "/learn/power-user/ai-api-pricing-for-non-engineers" },
  architectures: { title: "Level 4: Architectures", href: "/learn/expert#architectures" },
  fineTuning: { title: "Level 4: Fine-tuning and adapters", href: "/learn/expert#fine-tuning" },
  safety: { title: "Level 4: Safety and system cards", href: "/learn/expert#safety" },
  localModels: { title: "Run an AI model on your own computer", href: "/learn/expert/run-ai-on-your-own-computer" },
  readBenchmark: { title: "How to read an AI benchmark", href: "/learn/expert/how-to-read-ai-benchmark" },
  promptInjection: { title: "Prompt injection and agent security", href: "/learn/expert/prompt-injection-agent-security" },
  euAiAct: { title: "The EU AI Act for everyday users", href: "/learn/expert/eu-ai-act-for-everyday-users" },
  openVsClosed: { title: "Open-weight vs closed models", href: "/compare/open-vs-closed" },
} as const satisfies Record<string, GlossaryGuideLink>;

export const GLOSSARY_TERMS: readonly GlossaryTerm[] = [
  // Level 1: Foundations
  { id: "ai", term: "AI", level: 1, guide: GUIDES.whatIsAi, definition: "Software that does tasks that normally need human judgment, such as writing, recognizing speech or spotting patterns. Today's chat tools are one kind, called generative AI because they produce new text, images or audio." },
  { id: "model", term: "Model", level: 1, guide: GUIDES.howChatbotsWork, definition: "The trained program at the core of an AI tool. Models from the same maker can differ in speed, price and skill, so an app may let you pick one." },
  { id: "chatbot", term: "Chatbot", level: 1, guide: GUIDES.howChatbotsWork, definition: "An app you talk to in everyday language. It runs on a model, but the app adds the chat window, settings, plan limits and sometimes tools such as web search." },
  { id: "prompt", term: "Prompt", level: 1, guide: GUIDES.betterPrompts, definition: "What you type or upload to tell an AI what to do. A clear prompt states the role, task, context, format and limits." },
  { id: "token", term: "Token", level: 1, guide: GUIDES.howChatbotsWork, definition: "A small piece of text, often a word or part of a word, that a model reads and writes. Limits and prices are usually counted in tokens." },
  { id: "context-window", term: "Context window", level: 1, guide: GUIDES.howChatbotsWork, definition: "How much text a model can take in at once: your messages, any files and its own replies. When a chat grows past it, earlier parts may be dropped." },
  { id: "hallucination", term: "Hallucination", level: 1, guide: GUIDES.howChatbotsWork, definition: "When an AI states something false or made up in a confident tone, such as an invented quote or source. Check any fact that matters." },
  { id: "training-data", term: "Training data", level: 1, guide: GUIDES.howChatbotsWork, definition: "The text, images and other examples a model learned from before you used it. It shapes what the model knows and where it is weak or biased." },
  { id: "free-plan", term: "Free plan", level: 1, guide: GUIDES.freeVsPaid, definition: "The no-cost tier of an AI app. It usually has lower limits and fewer features, and some free tiers show ads." },
  { id: "usage-limit", term: "Usage limit", level: 1, guide: GUIDES.freeVsPaid, definition: "A cap on how much you can use a plan in a set time, such as messages per day. Hitting it can mean waiting or paying for more." },

  // Level 2: Practitioner
  { id: "deep-research", term: "Deep research", level: 2, guide: GUIDES.deepResearch, definition: "A mode where the AI searches many sources over several minutes and writes a longer, cited report. Check the sources it lists before you rely on it." },
  { id: "memory", term: "Memory", level: 2, guide: GUIDES.contextMemory, definition: "A feature that lets an AI keep details about you between chats, such as preferences. It differs from the context window, which covers only the current chat. Check what is stored and how to delete it." },
  { id: "projects", term: "Projects", level: 2, guide: GUIDES.practitionerHub, definition: "A way to group chats, files and instructions in one workspace so the AI starts each chat with the same background. Names and features differ by app." },
  { id: "multimodal", term: "Multimodal", level: 2, guide: GUIDES.practitionerHub, definition: "A model that works with more than text, such as images, audio or video, as input, output or both." },
  { id: "citation", term: "Citation", level: 2, guide: GUIDES.factCheck, definition: "A pointer to the source of a claim. AI citations can be wrong or may not support the claim, so open the link and check." },
  { id: "system-prompt", term: "System prompt", level: 2, guide: GUIDES.practitionerHub, definition: "Instructions from an app's maker or builder that set the AI's role and rules before your first message. You usually cannot see them." },
  { id: "temperature", term: "Temperature", level: 2, guide: GUIDES.practitionerHub, definition: "A setting that controls how varied the answers are. Lower values give steadier, more predictable replies, and higher values give more varied ones. Not every app lets you change it." },
  { id: "file-upload-limits", term: "File upload limits", level: 2, guide: GUIDES.summarizePdf, definition: "Caps on the files you can give an AI, such as size, page count, file type or number of files. They differ by plan and app, and scans, tables and charts may be read less accurately." },
  { id: "watermark", term: "Watermark", level: 2, guide: GUIDES.euAiAct, definition: "A visible or hidden mark added to AI-generated content so it can be identified later. Methods and rules vary, and a missing mark does not prove something is human-made." },

  // Level 3: Power user and builder
  { id: "reasoning-model", term: "Reasoning model", level: 3, guide: GUIDES.reasoning, definition: "A model built to work through a problem step by step before it answers. It is often better at maths, logic and coding, but slower and sometimes costlier." },
  { id: "effort-level", term: "Effort level", level: 3, guide: GUIDES.reasoning, definition: "A setting on some reasoning models that controls how much thinking happens before the answer. Higher effort can help on hard problems and usually costs more and takes longer." },
  { id: "rag", term: "RAG", level: 3, guide: GUIDES.rag, definition: "Retrieval-augmented generation. The system looks up relevant passages from your documents first, then gives them to the model so its answer is based on them." },
  { id: "embedding", term: "Embedding", level: 3, guide: GUIDES.rag, definition: "A list of numbers that represents the meaning of a piece of text, so a system can find passages with similar meaning. RAG systems use them for search." },
  { id: "tool-use", term: "Tool use", level: 3, guide: GUIDES.agents, definition: "When a model calls an outside tool, such as a search, a calculator or a database, and uses the result in its answer." },
  { id: "mcp", term: "MCP", level: 3, guide: GUIDES.mcp, definition: "Model Context Protocol. An open standard for connecting AI apps to outside tools and data, often shown as connectors. Each connection adds permissions you should review." },
  { id: "agent", term: "Agent", level: 3, guide: GUIDES.agents, definition: "An AI system that works toward a goal over several steps, deciding what to do next and using tools along the way. More freedom means more ways to fail, so set permissions carefully." },
  { id: "computer-use", term: "Computer use", level: 3, guide: GUIDES.agents, definition: "An agent ability to look at a screen and click, type and scroll as a person would, to operate software." },
  { id: "api", term: "API", level: 3, guide: GUIDES.apiPricing, definition: "A way for software to talk to an AI model directly instead of through a chat app. It is usually billed per token, separately from a chat subscription." },
  { id: "cached-input", term: "Cached input", level: 3, guide: GUIDES.apiPricing, definition: "Input text that repeats across requests and that the provider has already processed, often charged at a lower rate. Whether it is offered, and how it is priced, differs by provider." },
  { id: "batch-pricing", term: "Batch pricing", level: 3, guide: GUIDES.apiPricing, definition: "A lower price some providers offer when you send many requests to be processed later instead of right away. Check each provider's terms." },
  { id: "cost-per-task", term: "Cost per task", level: 3, guide: GUIDES.apiPricing, definition: "What it costs to finish one job, worked out from the tokens in and out, not from the price per million tokens alone." },

  // Level 4: Expert
  { id: "transformer", term: "Transformer", level: 4, guide: GUIDES.architectures, definition: "The design behind most current language models. It lets the model weigh each part of the input against the others when it predicts the next token." },
  { id: "mixture-of-experts", term: "Mixture-of-experts", level: 4, guide: GUIDES.architectures, definition: "A model split into many expert blocks, with a router that picks a few for each token. Only the chosen experts do work for that token, though all of them must be stored." },
  { id: "active-parameters", term: "Active parameters", level: 4, guide: GUIDES.architectures, definition: "In a mixture-of-experts model, the parameters used to process each token. Total parameters, not active ones, set the memory the model needs." },
  { id: "quantization", term: "Quantization", level: 4, guide: GUIDES.localModels, definition: "Storing a model's weights with fewer bits, such as 8-bit or 4-bit, so it needs less memory and often runs faster. Some quality can be lost, depending on the model and method." },
  { id: "fine-tuning", term: "Fine-tuning", level: 4, guide: GUIDES.fineTuning, definition: "Training a model further on your own examples to shape its style, format or a narrow task. Try clearer prompts, examples and retrieval first." },
  { id: "lora", term: "LoRA", level: 4, guide: GUIDES.fineTuning, definition: "Low-rank adaptation. A common way to fine-tune by training a small add-on called an adapter instead of changing every weight. It costs less, and the adapter can be switched on or off." },
  { id: "open-weights", term: "Open weights", level: 4, guide: GUIDES.openVsClosed, definition: "A model whose trained parameters can be downloaded and run by you. The licence may still limit use, and the training data and code may not be shared, so it is not the same as open source." },
  { id: "benchmark-contamination", term: "Benchmark contamination", level: 4, guide: GUIDES.readBenchmark, definition: "When a test's questions leaked into a model's training data, so the model may have seen them and the score overstates what it can do on new problems." },
  { id: "elo-rating", term: "Elo rating", level: 4, guide: GUIDES.readBenchmark, definition: "A scoring method built from head-to-head results. Human-preference arenas use Elo-style ratings from votes, so check the vote counts: a rating based on few votes is shaky." },
  { id: "system-card", term: "System card", level: 4, guide: GUIDES.safety, definition: "A document from a model's maker describing what it can do, how it was tested and what risks were found. Read it as the maker's own account." },
  { id: "red-teaming", term: "Red teaming", level: 4, guide: GUIDES.safety, definition: "People, or other models, deliberately try to make a system fail or misbehave, so weaknesses are found before users find them." },
  { id: "prompt-injection", term: "Prompt injection", level: 4, guide: GUIDES.promptInjection, definition: "Instructions typed or hidden in content an AI reads that make it act against its owner's intent. No setup removes the risk completely, so limit what an agent can do." },
  { id: "alignment", term: "Alignment", level: 4, guide: GUIDES.safety, definition: "Work to make a model's behavior match what its users and makers intend." },
];