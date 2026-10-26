import type { LevelType } from "@/lib/shared/levels";

export interface GlossaryTerm {
  id?: string;
  term: string;
  /** Anchor used on the glossary page, for example "context-window". */
  slug: string;
  level: LevelType;
  /** One or two plain sentences. */
  definition: string;
  /** Other names people search for. */
  aliases: readonly string[];
  /** The guide that explains this term in depth. */
  guideHref?: string;
}

type GlossaryInput = Omit<GlossaryTerm, "slug">;

/** Lower-case, hyphenated anchor for a term. */
export function getGlossarySlug(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const TERM_INPUTS: readonly GlossaryInput[] = [
  // Level 1
  { term: "AI", level: "foundation", definition: "Software that does tasks that normally need human judgement, such as writing, spotting patterns or answering questions.", aliases: ["artificial intelligence", "machine learning", "generative ai"], guideHref: "/learn/foundations/what-is-ai" },
  { term: "model", level: "foundation", definition: "The trained system behind a chatbot. Different models have different strengths, prices and limits.", aliases: ["llm", "large language model", "ai model"], guideHref: "/learn/foundations/how-ai-chatbots-work" },
  { term: "chatbot", level: "foundation", definition: "An app you talk to in plain language. It sends your message to a model and shows the reply.", aliases: ["assistant", "chat app"], guideHref: "/learn/foundations/how-ai-chatbots-work" },
  { term: "prompt", level: "foundation", definition: "What you type or upload to tell an AI what you want.", aliases: ["instruction", "question", "prompting"], guideHref: "/learn/foundations/write-better-prompts" },
  { term: "token", level: "foundation", definition: "A small piece of text, often part of a word, that a model reads and writes. Prices and limits are counted in tokens.", aliases: ["tokens", "tokenization"], guideHref: "/learn/power-user/context-windows-tokens-memory" },
  { term: "context window", level: "foundation", definition: "How much text a model can consider at once, including your question, files and the earlier chat.", aliases: ["context length", "memory limit", "context size"], guideHref: "/learn/power-user/context-windows-tokens-memory" },
  { term: "hallucination", level: "foundation", definition: "When a model states something false with confidence, such as an invented fact or source.", aliases: ["made up answer", "false answer", "wrong answer", "bluffing"], guideHref: "/learn/foundations/how-ai-chatbots-work" },
  { term: "training data", level: "foundation", definition: "The text, images and other material a model learned from before you used it.", aliases: ["dataset", "training set"], guideHref: "/learn/foundations/what-is-ai" },
  { term: "free plan", level: "foundation", definition: "A no-cost tier with limited use. It may show ads and may allow your chats to be used for training.", aliases: ["free tier", "free version"], guideHref: "/learn/foundations/free-vs-paid-ai" },
  { term: "usage limit", level: "foundation", definition: "A cap on how much you can use a plan in a period, such as messages per day or per five hours.", aliases: ["rate limit", "message cap", "quota"], guideHref: "/learn/foundations/free-vs-paid-ai" },

  // Level 2
  { term: "deep research", level: "practitioner", definition: "A mode where the AI searches many sources, reads them and writes a longer report with citations.", aliases: ["research mode", "web research"], guideHref: "/learn/practitioner/deep-research-modes" },
  { term: "memory", level: "practitioner", definition: "A feature that lets a chatbot keep facts about you across chats. It is separate from the context window.", aliases: ["saved memory", "personalization"], guideHref: "/learn/power-user/context-windows-tokens-memory" },
  { term: "projects", level: "practitioner", definition: "A workspace that groups chats, files and instructions for one piece of work.", aliases: ["workspace", "custom assistant"], guideHref: "/learn/practitioner/summarize-pdf-with-ai" },
  { term: "multimodal", level: "practitioner", definition: "Able to work with more than text, such as images, audio, video or files.", aliases: ["images", "voice", "vision"] },
  { term: "citation", level: "practitioner", definition: "A link or reference showing where a claim came from. Check it: a model can cite a source that does not say that.", aliases: ["source", "reference", "footnote"], guideHref: "/learn/practitioner/fact-check-ai-answers" },
  { term: "system prompt", level: "practitioner", definition: "Hidden instructions that set a chatbot's role and rules before your message.", aliases: ["custom instructions", "hidden instructions"] },
  { term: "temperature", level: "practitioner", definition: "A setting that controls how varied the answers are. Low is steadier, high is more creative.", aliases: ["randomness", "creativity setting"] },
  { term: "file upload limits", level: "practitioner", definition: "The caps on file size, page count and number of files you can give a chatbot.", aliases: ["upload limit", "pdf size", "page limit"], guideHref: "/learn/practitioner/summarize-pdf-with-ai" },
  { term: "watermark", level: "practitioner", definition: "A hidden or visible mark showing content was made by AI.", aliases: ["ai label", "synthetic content label"], guideHref: "/learn/expert/eu-ai-act-for-everyday-users" },

  // Level 3
  { term: "reasoning model", level: "powerUser", definition: "A model that spends extra time thinking before it answers, which helps on hard problems.", aliases: ["thinking model", "chain of thought"], guideHref: "/learn/power-user/reasoning-models-effort-settings" },
  { term: "effort level", level: "powerUser", definition: "A setting for how much thinking a model may use. Higher effort costs more and takes longer.", aliases: ["effort setting", "thinking budget", "xhigh", "max effort"], guideHref: "/learn/power-user/reasoning-models-effort-settings" },
  { term: "RAG", level: "powerUser", definition: "Retrieval-augmented generation: the system looks up relevant passages from your documents and gives them to the model before it answers.", aliases: ["retrieval augmented generation", "chat with documents"], guideHref: "/learn/power-user/rag-explained" },
  { term: "embedding", level: "powerUser", definition: "A list of numbers that captures the meaning of a piece of text, used to find similar passages.", aliases: ["vector", "semantic search"], guideHref: "/learn/power-user/rag-explained" },
  { term: "tool use", level: "powerUser", definition: "When a model calls outside tools, such as search, a calculator or your files, instead of answering from memory.", aliases: ["function calling", "tool calling"], guideHref: "/learn/power-user/mcp-and-connectors" },
  { term: "MCP", level: "powerUser", definition: "Model Context Protocol: a standard way to connect AI apps to tools and data sources.", aliases: ["model context protocol", "connectors"], guideHref: "/learn/power-user/mcp-and-connectors" },
  { term: "agent", level: "powerUser", definition: "An AI system that plans steps and uses tools to finish a task with little supervision.", aliases: ["ai agent", "agentic", "autonomous"], guideHref: "/learn/power-user/ai-agents-explained" },
  { term: "computer use", level: "powerUser", definition: "An agent controlling a screen, mouse and keyboard the way a person would.", aliases: ["browser agent", "screen control"], guideHref: "/learn/power-user/ai-agents-explained" },
  { term: "API", level: "powerUser", definition: "A way for software to call a model directly and pay per token, separate from a chat subscription.", aliases: ["application programming interface", "developer access"], guideHref: "/learn/power-user/ai-api-pricing-for-non-engineers" },
  { term: "cached input", level: "powerUser", definition: "Repeated prompt text the provider has stored, billed at a lower price when reused.", aliases: ["prompt caching", "cache read", "cache hit"], guideHref: "/learn/power-user/ai-api-pricing-for-non-engineers" },
  { term: "batch pricing", level: "powerUser", definition: "A discount, often about half price, for work you submit now and accept later.", aliases: ["batch api", "batch discount"], guideHref: "/learn/power-user/ai-api-pricing-for-non-engineers" },
  { term: "cost per task", level: "powerUser", definition: "What one finished job costs including input, output and thinking tokens, not just the price per token.", aliases: ["task cost", "price per task"], guideHref: "/learn/power-user/ai-api-pricing-for-non-engineers" },

  // Level 4
  { term: "transformer", level: "expert", definition: "The neural network design behind most modern language models.", aliases: ["attention", "architecture"] },
  { term: "mixture-of-experts", level: "expert", definition: "A design that sends each token to a few specialist parts of the model instead of all of it.", aliases: ["moe", "sparse model"] },
  { term: "active parameters", level: "expert", definition: "The part of a model actually used for each token. In mixture-of-experts models it is smaller than the total.", aliases: ["total parameters", "model size"] },
  { term: "quantization", level: "expert", definition: "Storing a model's numbers with fewer bits so it needs less memory, with some loss of quality.", aliases: ["4-bit", "gguf", "compression"], guideHref: "/learn/expert/run-ai-on-your-own-computer" },
  { term: "fine-tuning", level: "expert", definition: "Training a model further on your own examples to change its behaviour or style.", aliases: ["fine tune", "custom model"] },
  { term: "LoRA", level: "expert", definition: "A cheap way to fine-tune by training small add-on layers instead of the whole model.", aliases: ["low rank adaptation", "adapter"] },
  { term: "open weights", level: "expert", definition: "A model whose trained numbers you can download and run, though the licence may limit use.", aliases: ["open source", "open weight", "self host", "local model"], guideHref: "/compare/open-vs-closed" },
  { term: "benchmark contamination", level: "expert", definition: "When test questions leaked into training data, so a score reflects memory rather than skill.", aliases: ["data leakage", "leaked test"], guideHref: "/learn/expert/how-to-read-ai-benchmark" },
  { term: "Elo rating", level: "expert", definition: "A score from head-to-head results, used by arenas where people vote on which answer is better.", aliases: ["arena score", "lmarena", "leaderboard rating"], guideHref: "/learn/expert/how-to-read-ai-benchmark" },
  { term: "system card", level: "expert", definition: "A maker's report on a model's abilities, risks and safety testing.", aliases: ["model card", "safety report"] },
  { term: "red teaming", level: "expert", definition: "Testers trying to make a model fail or misbehave so the problems can be fixed.", aliases: ["adversarial testing", "jailbreak testing"] },
  { term: "prompt injection", level: "expert", definition: "Hidden instructions in a web page or file that trick an AI into doing something you did not ask.", aliases: ["injection attack", "indirect injection"], guideHref: "/learn/expert/prompt-injection-agent-security" },
  { term: "alignment", level: "expert", definition: "Work to make a model's behaviour match human intentions and values.", aliases: ["ai safety", "values"] },
];

export const GLOSSARY_TERMS: readonly GlossaryTerm[] = TERM_INPUTS.map((input) => ({
  ...input,
  slug: getGlossarySlug(input.term),
}));

/** One learning level as the glossary page shows it. */
export interface GlossaryLevelInfo {
  /** Matches the `level` on each glossary term. */
  level: LevelType;
  /** Position in the learning path, 1 to 4. */
  number: 1 | 2 | 3 | 4;
  name: string;
  /** Who the level is for, written to follow "for" in a sentence. */
  audience: string;
  /** The level hub page. */
  hubHref: string;
}

/** The four learning levels, in order (Blueprint 1.3). */
export const GLOSSARY_LEVELS: readonly GlossaryLevelInfo[] = [
  { level: "foundation", number: 1, name: "Foundations", audience: "complete beginners, parents and students", hubHref: "/learn/foundations" },
  { level: "practitioner", number: 2, name: "Practitioner", audience: "students, office workers, job seekers and small business owners", hubHref: "/learn/practitioner" },
  { level: "powerUser", number: 3, name: "Power user and builder", audience: "freelancers, analysts, developers and team leads", hubHref: "/learn/power-user" },
  { level: "expert", number: 4, name: "Expert", audience: "developers, researchers, and IT or compliance leads", hubHref: "/learn/expert" },
];


export type GlossaryLevel = LevelType; // Added to fix missing export