import { FREE_TOOLS, LATEST_STORIES, PRICE_HUB_PAGES } from "@/lib/home/homeContent";
import { GLOSSARY_TERMS } from "@/lib/learn/glossaryTerms";
import { API_PRICE_ROWS, TIER_LABELS } from "@/lib/prices/apiCostTable";
import { getLevelByNumber, type LevelType } from "@/lib/shared/levels";
import { createSearchIndex, type SearchEntry, type SearchSection } from "@/lib/shared/search";

function makeEntry(
  section: SearchSection,
  kind: string,
  title: string,
  href: string,
  description: string,
  keywords: readonly string[] = [],
  level: LevelType | null = null,
): SearchEntry {
  return { id: `${section}:${href}`, section, kind, title, href, description, keywords, level };
}

function levelFromLabel(label: string): LevelType | null {
  const match = /^Level (\d)$/.exec(label);
  return match ? (getLevelByNumber(Number(match[1])) ?? null) : null;
}

/**
 * Hand-listed articles (Blueprint 7.1). Replace this list with the output of lib/content/loadArticles.ts
 * once the MDX files exist, so new articles are searchable without editing this file.
 */
const GUIDE_ENTRIES: readonly SearchEntry[] = [
  makeEntry("guides", "Level hub", "Learn: choose your level", "/learn", "Four levels from Foundations to Expert, with a self-check on each.", ["learn", "levels", "start here", "beginner", "expert"]),
  makeEntry("guides", "Level hub", "Level 1: Foundations", "/learn/foundations", "What AI is, how a chatbot works, prompts, key terms, free versus paid and privacy basics.", ["beginner", "basics", "start"], "foundation"),
  makeEntry("guides", "Level hub", "Level 2: Practitioner", "/learn/practitioner", "Use AI for real tasks with files and web search, choose a plan and verify results.", ["tasks", "work", "study"], "practitioner"),
  makeEntry("guides", "Level hub", "Level 3: Power user and builder", "/learn/power-user", "Pick a model per task, control cost, build automations and run your own tests.", ["builder", "automation", "api"], "powerUser"),
  makeEntry("guides", "Level hub", "Level 4: Expert", "/learn/expert", "Read benchmarks critically, self-host open-weight models, assess safety and map legal duties.", ["advanced", "research"], "expert"),

  makeEntry("guides", "Guide", "What is AI? A plain-English guide", "/learn/foundations/what-is-ai", "Machine learning, generative AI, chatbots and where you already meet AI, without jargon.", ["artificial intelligence", "machine learning", "generative ai", "chatbot", "beginner", "myths"], "foundation"),
  makeEntry("guides", "Guide", "How AI chatbots work, without math", "/learn/foundations/how-ai-chatbots-work", "Learning from examples, predicting the next word, and why chatbots sound sure but get things wrong.", ["next word", "token", "context window", "hallucination", "language model"], "foundation"),
  makeEntry("guides", "Guide", "How to write better prompts (20 examples)", "/learn/foundations/write-better-prompts", "The five-part formula of role, task, context, format and limits, with copy-ready examples.", ["prompt formula", "examples", "role task context format limits", "study", "work"], "foundation"),
  makeEntry("guides", "Guide", "Free vs paid AI: what you actually get", "/learn/foundations/free-vs-paid-ai", "What free plans give, who needs to upgrade, ads in free tiers and how to avoid surprise renewals.", ["free plan", "paid plan", "upgrade", "ads", "subscription", "renewal"], "foundation"),
  makeEntry("guides", "Safety", "What you should never share with an AI chatbot", "/learn/foundations/never-share-with-ai-chatbot", "Passwords, IDs, health and money details and client data, and how to turn off data sharing.", ["privacy", "passwords", "personal data", "health", "confidential", "safety"], "foundation"),
  makeEntry("guides", "Safety", "AI scams and deepfakes: how to spot them", "/learn/foundations/ai-scams-and-deepfakes", "Cloned voices, fake videos, fake reviews and AI-written phishing, plus a family code word.", ["voice cloning", "deepfake", "phishing", "fraud", "fake reviews", "safe word"], "foundation"),

  makeEntry("guides", "Guide", "How to fact-check AI answers", "/learn/practitioner/fact-check-ai-answers", "A five-step routine, checking sources and quotes, and extra care for health, legal and money.", ["verify", "check sources", "citations", "hallucination", "accuracy"], "practitioner"),
  makeEntry("guides", "Guide", "How to use AI to study without cheating", "/learn/practitioner/use-ai-to-study-without-cheating", "Ask for steps and quizzes, follow school policies, and cite or disclose AI use.", ["students", "homework", "school", "academic integrity", "plagiarism", "essay"], "practitioner"),
  makeEntry("guides", "Guide", "How to summarize a PDF or long document with AI", "/learn/practitioner/summarize-pdf-with-ai", "Length limits, scans, tables and charts, and asking about a distant page.", ["pdf", "summary", "long document", "upload", "file", "report"], "practitioner"),
  makeEntry("guides", "Guide", "How to use AI for email and writing at work", "/learn/practitioner/ai-for-email-and-writing-at-work", "Drafting and tone, fixed formats, keeping client data private and disclosure at work.", ["email", "writing", "office", "tone", "workplace", "drafts"], "practitioner"),
  makeEntry("guides", "Guide", "How to write a resume and prepare for interviews with AI", "/learn/practitioner/ai-resume-and-interview-prep", "A resume prompt template, tailoring to a job post and mock interview prompts.", ["resume", "cv", "cover letter", "interview", "job", "career"], "practitioner"),
  makeEntry("guides", "Guide", "Deep research modes: how to use them and check the sources", "/learn/practitioner/deep-research-modes", "What deep research does, how to write a brief, and how to check the sources it gives.", ["research", "report", "sources", "web search", "citations"], "practitioner"),
  makeEntry("guides", "Opinion", "Is AI worth paying for? Our honest answer", "/learn/practitioner/is-ai-worth-paying-for", "Who should stay free, who should pay, which tier and how a subscription differs from the API.", ["subscription", "plus", "pro", "price", "worth it", "upgrade"], "practitioner"),
  makeEntry("guides", "Opinion", "Where AI helps and where it fails (our testing)", "/learn/practitioner/where-ai-helps-and-fails", "Our test tasks, where AI helped, where it failed, and the test date and settings.", ["testing", "limits", "failures", "strengths", "weaknesses"], "practitioner"),

  makeEntry("guides", "Explainer", "Context windows, tokens and memory explained", "/learn/power-user/context-windows-tokens-memory", "Tokens versus words, what a context window holds, and how memory differs from context.", ["token", "context window", "memory", "context length", "words to tokens"], "powerUser"),
  makeEntry("guides", "Explainer", "Reasoning models and effort settings: when thinking longer helps", "/learn/power-user/reasoning-models-effort-settings", "What reasoning models do, when more effort helps and when it only costs more.", ["reasoning", "thinking", "effort", "xhigh", "max", "chain of thought"], "powerUser"),
  makeEntry("guides", "Explainer", "RAG explained: making AI answer from your documents", "/learn/power-user/rag-explained", "Retrieval in plain English, embeddings, when RAG beats a long prompt and how it fails.", ["rag", "retrieval", "embeddings", "documents", "knowledge base", "vector"], "powerUser"),
  makeEntry("guides", "Explainer", "AI agents explained: what they can do and how they fail", "/learn/power-user/ai-agents-explained", "Coding and computer-use agents, long-running tasks, how agents fail and a permissions checklist.", ["agent", "agentic", "automation", "computer use", "autonomous"], "powerUser"),
  makeEntry("guides", "Explainer", "MCP and connectors: giving AI access to your tools safely", "/learn/power-user/mcp-and-connectors", "What MCP is, connectors in practice, permissions and risks, and a safe setup checklist.", ["mcp", "connectors", "model context protocol", "tools", "permissions", "integrations"], "powerUser"),
  makeEntry("guides", "Guide", "AI API pricing for non-engineers: cost per task, not per token", "/learn/power-user/ai-api-pricing-for-non-engineers", "Input and output tokens, caching and batch pricing, and a worked cost-per-task example.", ["api", "pricing", "cost per task", "tokens", "caching", "batch", "bill"], "powerUser"),
  makeEntry("guides", "Guide", "Build your own AI test set in one afternoon", "/learn/power-user/build-your-own-ai-test-set", "Pick ten real tasks, make a scoring sheet, run and record, and set a re-test schedule.", ["evaluation", "testing", "benchmark", "compare models", "scoring sheet"], "powerUser"),

  makeEntry("guides", "Guide", "Run an AI model on your own computer", "/learn/expert/run-ai-on-your-own-computer", "Hardware and memory, quantization, choosing a local model, and the privacy gains and limits.", ["local", "self host", "open weights", "gpu", "ollama", "quantization", "offline"], "expert"),
  makeEntry("guides", "Explainer", "How to read an AI benchmark: what the numbers hide", "/learn/expert/how-to-read-ai-benchmark", "What benchmarks measure, vendor-reported versus independent scores, arenas, contamination and margins.", ["benchmark", "leaderboard", "arena", "score", "margin", "contamination", "elo"], "expert"),
  makeEntry("guides", "Safety", "Prompt injection and agent security for everyday teams", "/learn/expert/prompt-injection-agent-security", "What prompt injection is, data leakage, agent permissions and containment steps.", ["prompt injection", "security", "agents", "data leakage", "permissions", "attack"], "expert"),
  makeEntry("guides", "Explainer", "The EU AI Act for everyday users and small businesses", "/learn/expert/eu-ai-act-for-everyday-users", "Who it applies to, the dates that matter, AI literacy and transparency duties. Not legal advice.", ["eu ai act", "regulation", "law", "compliance", "transparency", "europe", "watermark"], "expert"),
];

const COMPARE_ENTRIES: readonly SearchEntry[] = [
  makeEntry("compare", "Hub", "Compare AI models", "/compare", "Start with the model directory, then reviews, best-for lists, head-to-heads and alternatives.", ["compare", "models", "reviews"]),
  makeEntry("compare", "Directory", "Model directory", "/compare/models", "Every model we cover with maker, API price, context window, score and best use.", ["models", "table", "directory", "prices", "context window", "benchlm"]),
  makeEntry("compare", "Index", "Model reviews", "/compare/reviews", "Tested reviews with a seven-point scorecard, filterable by maker and price tier.", ["reviews", "scorecard", "verdict"]),
  makeEntry("compare", "Comparison", "ChatGPT vs Claude vs Gemini vs Grok", "/compare/apps", "The four main chat apps compared on plans, limits, features and privacy.", ["chatgpt", "claude", "gemini", "grok", "apps", "which app", "plans"], "practitioner"),
  makeEntry("compare", "Roundup", "Best AI model right now, by job", "/compare/best/by-job", "The best pick for writing, coding, research, images and more, ranked by use.", ["best", "by job", "which model", "recommendation"], "practitioner"),
  makeEntry("compare", "Roundup", "Best AI tools for students", "/compare/best/students", "Study-friendly tools and models, with price and what each one gives up.", ["students", "study", "homework", "school", "cheap"], "practitioner"),
  makeEntry("compare", "Head-to-head", "Claude Opus 5.5 vs GPT-6.1 Sol: ten everyday tasks", "/compare/vs/claude-opus-5-5-vs-gpt-6-1-sol", "Two models, the same ten tasks on one test day, with cost per task and a verdict.", ["opus", "sol", "claude", "gpt", "head to head", "test"], "powerUser"),
  makeEntry("compare", "Explainer", "Open-weight vs closed models", "/compare/open-vs-closed", "Cost, privacy, licences and hardware for open-weight and hosted models.", ["open weights", "closed", "open source", "local", "licence", "hosted"], "expert"),
  makeEntry("compare", "Hub", "Best AI models by use case", "/compare/best", "Roundups ranked by use so they age better, each with a test date.", ["best", "roundups", "ranked"]),
  makeEntry("compare", "Roundup", "Best AI model overall", "/compare/best/overall", "Our overall pick, runner-up and budget pick, with what changed since the last review.", ["best", "overall", "top"]),
  makeEntry("compare", "Roundup", "Best AI for coding", "/compare/best/coding", "The models we rank first for software work, with cost per task.", ["coding", "programming", "developer", "software"]),
  makeEntry("compare", "Roundup", "Best AI for writing", "/compare/best/writing", "Models ranked for drafting, editing and tone.", ["writing", "essays", "editing", "creative"]),
  makeEntry("compare", "Roundup", "Best AI agents", "/compare/best/agents", "Which models handle long, tool-using tasks best.", ["agents", "automation", "tool use"]),
  makeEntry("compare", "Roundup", "Best value AI model", "/compare/best/value", "The most capability for the least money.", ["value", "cheap", "budget", "price"]),
  makeEntry("compare", "Roundup", "Best cheap and fast AI models", "/compare/best/cheap-and-fast", "Low-cost, quick models for high-volume work.", ["cheap", "fast", "low cost", "bulk", "speed"]),
  makeEntry("compare", "Roundup", "Best open-weight AI models", "/compare/best/open-weights", "The strongest models whose weights you can download.", ["open weights", "open source", "download"]),
  makeEntry("compare", "Roundup", "Best AI models to run locally", "/compare/best/local", "Models that fit on one computer, with memory needs.", ["local", "offline", "self host", "gpu", "laptop"]),
  makeEntry("compare", "Roundup", "Best AI for small business", "/compare/best/small-business", "Plans and models that suit small teams and budgets.", ["small business", "team", "company", "owner"]),
  makeEntry("compare", "Roundup", "Best AI for images", "/compare/best/image", "Image generators ranked by quality and price.", ["images", "pictures", "art", "design"]),
  makeEntry("compare", "Roundup", "Best AI for video", "/compare/best/video", "Video generators ranked by quality and price.", ["video", "clips", "film"]),
  makeEntry("compare", "Hub", "Head-to-head tests", "/compare/vs", "Two models, one test day, a direct answer.", ["vs", "head to head", "matchup", "versus"]),
  makeEntry("compare", "Hub", "Alternatives to popular AI tools", "/compare/alternatives", "Why people switch, the options and what you give up.", ["alternatives", "switch", "replace", "instead of"]),
];

const REVIEW_ENTRIES: readonly SearchEntry[] = API_PRICE_ROWS.map((row) =>
  makeEntry(
    "reviews",
    "Review",
    `${row.model} review`,
    `/compare/reviews/${row.id}`,
    `Tested results, scorecard and verdict for ${row.model} from ${row.maker}. Best for: ${row.bestFor.toLowerCase()}.`,
    [row.maker, TIER_LABELS[row.tier], row.access === "open-weight" ? "open weights" : "closed", "review", "scorecard", "verdict"],
  ),
);

const PRICE_KEYWORDS: Readonly<Record<string, readonly string[]>> = {
  "/prices/plans": ["chatgpt plus", "claude pro", "google ai pro", "subscription", "monthly price", "plans"],
  "/prices/api": ["token price", "cost per task", "per million tokens", "api bill", "cached", "batch"],
  "/prices/free-limits": ["free tier", "message limit", "usage cap", "free chatgpt", "free claude"],
  "/prices/features": ["voice", "images", "video", "file upload", "web search", "agents", "memory"],
  "/prices/privacy": ["training", "opt out", "retention", "deletion", "data location", "delete chats", "incognito"],
  "/prices/retirements": ["deprecated", "shutdown", "sunset", "successor", "model id", "end of life", "migration"],
  "/prices/benchmarks": ["arena", "leaderboard", "vals", "artificial analysis", "vendor reported", "independent scores"],
};

const PRICE_ENTRIES: readonly SearchEntry[] = [
  makeEntry("prices", "Hub", "Prices and data", "/prices", "Plans, API costs, limits, features, privacy, retirements and benchmarks, each dated and sourced.", ["prices", "data", "tables", "verified"]),
  ...PRICE_HUB_PAGES.map((page) =>
    makeEntry("prices", "Data page", page.title, page.href, page.summary, PRICE_KEYWORDS[page.href] ?? [], levelFromLabel(page.levelLabel)),
  ),
];

const TOOL_ENTRIES: readonly SearchEntry[] = [
  makeEntry("tools", "Hub", "Free AI tools", "/tools", "Nine free tools that run in your browser, so your data stays with you.", ["tools", "calculators", "quiz", "checklists", "free"]),
  ...FREE_TOOLS.map((tool) =>
    makeEntry("tools", "Tool", tool.title, tool.href, tool.description, [tool.id.replace(/-/g, " ")], levelFromLabel(tool.levelLabel)),
  ),
];

const GLOSSARY_ENTRIES: readonly SearchEntry[] = [
  makeEntry("glossary", "Page", "Glossary", "/learn/glossary", "About 80 plain-English definitions, each tagged with its level and linked to the guide that explains it.", ["glossary", "definitions", "terms", "dictionary", "a to z"]),
  ...GLOSSARY_TERMS.map((term) =>
    makeEntry("glossary", "Glossary term", term.term, `/learn/glossary#${term.slug}`, term.definition, term.aliases, term.level),
  ),
];

const SOCIETY_ENTRIES: readonly SearchEntry[] = [
  makeEntry("society", "Hub", "AI & Society", "/society", "How AI is changing daily life, work and the economy, with both sides and dated sources.", ["society", "impact", "future", "jobs"]),
  makeEntry("society", "Explainer", "Ten places you meet AI in a normal day", "/society/ten-places-you-meet-ai", "A morning-to-night list of where AI shows up.", ["daily life", "everyday", "examples"]),
  makeEntry("society", "Explainer", "The role of AI in our lives: home, school and work", "/society/role-of-ai-in-our-lives", "Adoption snapshot and where people meet AI today.", ["adoption", "home", "school", "work", "survey"]),
  makeEntry("society", "Explainer", "Pros and cons of AI: an honest scorecard", "/society/pros-and-cons-of-ai", "Time, learning, accuracy, privacy, fairness, jobs, trust, environment and skills.", ["pros and cons", "benefits", "risks", "balance"]),
  makeEntry("society", "Data explainer", "Is AI taking jobs? What current surveys actually say", "/society/is-ai-taking-jobs", "What named surveys say about layoffs, entry-level work and routine tasks.", ["jobs", "layoffs", "employment", "work", "survey"]),
  makeEntry("society", "Explainer", "Which industries are changing most, and which are next", "/society/industries-changing-most", "Industry cards with evidence and what to watch next.", ["industries", "healthcare", "finance", "education", "legal"]),
  makeEntry("society", "Explainer", "The future of AI: six forces to watch to 2030", "/society/future-of-ai", "Model progress, adoption, energy, work, rules and autonomy, with three scenarios.", ["future", "forecast", "scenarios", "2030", "trends"]),
  makeEntry("society", "Data explainer", "How much power does AI use?", "/society/ai-power-use", "Data-centre electricity figures, grid limits and what efficient use looks like.", ["energy", "electricity", "power", "environment", "data centre"]),
  makeEntry("society", "Explainer", "AI in healthcare: what it can and cannot do", "/society/ai-in-healthcare", "Where it helps, accuracy limits, privacy and medical-device rules.", ["health", "medical", "doctor", "hospital"]),
  makeEntry("society", "Explainer", "AI in education: tutor, teacher aid or shortcut?", "/society/ai-in-education", "Tutoring, teacher time, integrity and assessment.", ["education", "school", "teachers", "students", "tutoring"]),
  makeEntry("society", "Explainer", "AI in banking and finance", "/society/ai-in-banking-and-finance", "Fraud detection, customer service, credit decisions and explainability rules.", ["banking", "finance", "credit", "fraud", "loans"]),
  makeEntry("society", "Data explainer", "How fast is AI spreading? The adoption data explained", "/society/ai-adoption-data", "The adoption tracker series, work versus outside work, and why surveys differ.", ["adoption", "statistics", "usage", "survey", "data"]),
  makeEntry("society", "Explainer", "AI myths and facts", "/society/ai-myths-and-facts", "A myth-or-fact list with evidence links.", ["myths", "facts", "misconceptions", "true or false"]),
  makeEntry("society", "Tool", "How much AI is in your day? Quiz", "/society/day-quiz", "A short quiz with a shareable result card.", ["quiz", "day", "everyday"]),
  makeEntry("society", "Tool", "Pros and cons weigh-up", "/society/weigh-up", "Tick what matters to you for a balanced summary.", ["weigh up", "decide", "pros cons"]),
  makeEntry("society", "Tool", "Industry explorer", "/society/industry-explorer", "Filter industry cards by figure, source and date.", ["industry", "explorer", "figures"]),
  makeEntry("society", "Tool", "Myth-or-fact flip cards", "/society/myth-or-fact", "Flip cards with an evidence link on each.", ["flashcards", "myths", "facts"]),
];

const NEWS_ENTRIES: readonly SearchEntry[] = [
  makeEntry("news", "Hub", "News and explainers", "/news", "Release posts, price-change notes, weekly roundups and explainers.", ["news", "latest", "updates"]),
  makeEntry("news", "Archive", "Weekly roundup archive", "/news/weekly", "Every weekly roundup: releases, price changes, safety and policy, and next week.", ["weekly", "roundup", "newsletter", "archive"]),
  makeEntry("news", "Timeline", "EU AI Act timeline", "/news/eu-ai-act", "The dates that apply, a plain-English summary and what it means for readers. Not legal advice.", ["eu ai act", "regulation", "dates", "law", "europe"], "expert"),
  makeEntry("news", "Log", "Changelog", "/news/changelog", "A dated list of every change to the site and how source conflicts were resolved.", ["changelog", "updates", "changes", "corrections"]),
  ...LATEST_STORIES.filter((story) => story.href.startsWith("/news/")).map((story) =>
    makeEntry("news", story.kind, story.title, story.href, story.summary, [story.kind]),
  ),
];

const ABOUT_ENTRIES: readonly SearchEntry[] = [
  makeEntry("about", "About", "About us", "/about", "Who runs the site, what we cover and how we stay current.", ["about", "who we are", "team"]),
  makeEntry("about", "Policy", "Editorial standards", "/about/editorial-standards", "How topics are chosen, how pages are checked, which AI tools drafted content, and what the level badges mean.", ["editorial", "standards", "writers", "ai disclosure"]),
  makeEntry("about", "Method", "How we test", "/about/how-we-test", "The test battery, scorecard weights, settings and test dates, and result labels.", ["testing", "method", "scorecard", "battery", "seven point"]),
  makeEntry("about", "Policy", "Source policy", "/about/source-policy", "The source hierarchy, vendor-reported numbers and how we resolve conflicts.", ["sources", "citations", "vendor reported", "independent"]),
  makeEntry("about", "Policy", "Independence and disclosure", "/about/independence", "Affiliate links, sponsors, conflicts of interest and our promise that payment never changes a score.", ["affiliate", "sponsor", "independence", "disclosure", "ads"]),
  makeEntry("about", "Log", "Corrections policy and log", "/about/corrections", "How to report an error, our response time and every correction made.", ["corrections", "errors", "report", "mistake"]),
  makeEntry("about", "Help", "Contact", "/contact", "General questions, reporting an error, press and partnerships.", ["contact", "email", "press", "feedback"]),
  makeEntry("about", "Legal", "Privacy policy", "/privacy-policy", "What we collect, how we use it and your choices.", ["privacy", "cookies", "analytics", "data"]),
  makeEntry("about", "Legal", "Terms of use", "/terms", "Using the site, no professional or legal advice, and affiliate and sponsor notice.", ["terms", "legal", "conditions"]),
  makeEntry("about", "Help", "Sitemap", "/sitemap", "Every section of the site in one list.", ["sitemap", "all pages", "index"]),
  makeEntry("about", "Page", "Newsletter", "/newsletter", "The weekly roundup by email, what you get and past issues.", ["newsletter", "email", "subscribe", "weekly"]),
  makeEntry("about", "Page", "Courses", "/courses", "Planned courses for teachers, job seekers and builders, with a waitlist.", ["courses", "teachers", "job seekers", "builders", "waitlist"]),
  makeEntry("about", "Page", "Shop: prompt packs, templates and checklists", "/shop", "Digital products with external checkout.", ["shop", "prompt pack", "templates", "digital products"]),
  makeEntry("about", "Page", "Sponsored content", "/sponsored", "Content labelled Sponsored and kept apart from reviews.", ["sponsored", "advertising", "partners"]),
];

export const SITE_SEARCH_ENTRIES: readonly SearchEntry[] = [
  ...GUIDE_ENTRIES,
  ...GLOSSARY_ENTRIES,
  ...REVIEW_ENTRIES,
  ...TOOL_ENTRIES,
  ...COMPARE_ENTRIES,
  ...PRICE_ENTRIES,
  ...SOCIETY_ENTRIES,
  ...NEWS_ENTRIES,
  ...ABOUT_ENTRIES,
];

/** The prepared index. Built once when the module loads. */
export const SITE_SEARCH_INDEX = createSearchIndex(SITE_SEARCH_ENTRIES);