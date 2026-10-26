import type { Intent, PageGroup, PageLevel, SitePage, SiteSection } from "./sitemapTypes";

const guide = (level: PageLevel, folder: string, slug: string, title: string, description: string): SitePage => ({
  path: `/learn/${folder}/${slug}`,
  title,
  description,
  kind: "article",
  level,
});

const review = (slug: string, name: string, note: string): SitePage => ({
  path: `/compare/reviews/${slug}`,
  title: name,
  description: `Our review of ${name}: scores, price, who should skip it. ${note}`,
  kind: "review",
});

const best = (slug: string, title: string, description: string): SitePage => ({
  path: `/compare/best/${slug}`,
  title,
  description,
  kind: "comparison",
});

const society = (slug: string, title: string, description: string): SitePage => ({
  path: `/society/${slug}`,
  title,
  description,
  kind: "article",
});

export const HOME_PAGE: SitePage = {
  path: "/",
  title: "Home",
  description: "Start by who you are or how much you already know, and see the latest and the model snapshot.",
  kind: "hub",
};

const LEARN: SiteSection = {
  id: "learn",
  title: "Learn",
  hubPath: "/learn",
  summary: "Plain-English guides in four levels, from your first chat to security and regulation.",
  groups: [
    {
      id: "learn-start",
      title: "Start here",
      pages: [
        { path: "/learn", title: "Choose your level", description: "Answer a few questions and land on the level that fits you.", kind: "hub" },
        { path: "/learn/glossary", title: "Glossary", description: "Every AI word in this site, explained without jargon.", kind: "utility" },
      ],
    },
    {
      id: "learn-1",
      title: "Level 1 · Foundations",
      note: "No experience needed.",
      pages: [
        { path: "/learn/foundations", title: "Foundations hub", description: "All beginner guides and a self-check.", kind: "hub", level: 1 },
        guide(1, "foundations", "what-is-ai", "What is AI, really?", "What AI is, what it is not, and where you already meet it.") ,
        guide(1, "foundations", "how-ai-chatbots-work", "How AI chatbots work", "Why a chatbot sounds sure of itself and still gets things wrong."),
        guide(1, "foundations", "write-better-prompts", "Write better prompts", "A simple recipe for asking so the answer is useful the first time."),
        guide(1, "foundations", "free-vs-paid-ai", "Free or paid AI: what you get", "What a subscription changes, and who does not need one."),
        guide(1, "foundations", "never-share-with-ai-chatbot", "What never to share with an AI chatbot", "The details you should keep out of any chat box."),
        guide(1, "foundations", "ai-scams-and-deepfakes", "AI scams and deepfakes", "How cloned voices and fake videos fool people, and how to check."),
      ],
    },
    {
      id: "learn-2",
      title: "Level 2 · Practitioner",
      note: "You already use AI and want to get more from it.",
      pages: [
        { path: "/learn/practitioner", title: "Practitioner hub", description: "Guides for work and study, plus a self-check.", kind: "hub", level: 2 },
        guide(2, "practitioner", "fact-check-ai-answers", "Fact-check AI answers", "A short routine to catch invented facts and fake sources."),
        guide(2, "practitioner", "use-ai-to-study-without-cheating", "Use AI to study without cheating", "Ways to learn faster that your school will accept."),
        guide(2, "practitioner", "summarize-pdf-with-ai", "Summarize a PDF with AI", "Get a reliable summary of a long document and check it."),
        guide(2, "practitioner", "ai-for-email-and-writing-at-work", "AI for email and writing at work", "Draft faster without sounding like a robot."),
        guide(2, "practitioner", "ai-resume-and-interview-prep", "AI for your resume and interview prep", "What helps, what backfires, and what to tell employers."),
        guide(2, "practitioner", "deep-research-modes", "Deep research modes", "When the long-running research option is worth waiting for."),
        guide(2, "practitioner", "is-ai-worth-paying-for", "Is AI worth paying for?", "A simple test to decide if a plan will pay for itself."),
        guide(2, "practitioner", "where-ai-helps-and-fails", "Where AI helps and where it fails", "Tasks it handles well, tasks it gets wrong, and the warning signs."),
      ],
    },
    {
      id: "learn-3",
      title: "Level 3 · Power user",
      note: "You care about settings, cost and how things work.",
      pages: [
        { path: "/learn/power-user", title: "Power user hub", description: "Guides on context, agents, costs and testing.", kind: "hub", level: 3 },
        guide(3, "power-user", "context-windows-tokens-memory", "Context windows, tokens and memory", "Why long chats drift, and what tokens cost you."),
        guide(3, "power-user", "reasoning-models-effort-settings", "Reasoning models and effort settings", "When thinking harder helps and when it only costs more."),
        guide(3, "power-user", "rag-explained", "RAG explained", "How an AI looks things up in your documents."),
        guide(3, "power-user", "ai-agents-explained", "AI agents explained", "What an agent can do on its own, and where it needs you."),
        guide(3, "power-user", "mcp-and-connectors", "MCP and connectors", "How AI reaches your apps, and what you are giving access to."),
        guide(3, "power-user", "ai-api-pricing-for-non-engineers", "AI API pricing for non-engineers", "Read a price per million tokens and work out your monthly bill."),
        guide(3, "power-user", "build-your-own-ai-test-set", "Build your own AI test set", "Test models on your own tasks instead of trusting a leaderboard."),
      ],
    },
    {
      id: "learn-4",
      title: "Level 4 · Expert",
      note: "You build, secure or regulate AI.",
      pages: [
        { path: "/learn/expert", title: "Expert hub", description: "Local models, benchmarks, security and the EU AI Act.", kind: "hub", level: 4 },
        guide(4, "expert", "run-ai-on-your-own-computer", "Run AI on your own computer", "What hardware you need and what you give up."),
        guide(4, "expert", "how-to-read-ai-benchmark", "How to read an AI benchmark", "What a score means, and what it hides."),
        guide(4, "expert", "prompt-injection-agent-security", "Prompt injection and agent security", "How hidden instructions hijack agents, and how to limit the damage."),
        guide(4, "expert", "eu-ai-act-for-everyday-users", "The EU AI Act for everyday users", "The rules in depth, written for people who are not lawyers."),
      ],
    },
  ],
};

const COMPARE: SiteSection = {
  id: "compare",
  title: "Compare",
  hubPath: "/compare",
  summary: "Models, reviews, best-for lists and head-to-heads, with dates on every score.",
  groups: [
    {
      id: "compare-core",
      title: "Start here",
      pages: [
        { path: "/compare", title: "Compare hub", description: "Pick the kind of comparison you need.", kind: "hub" },
        { path: "/compare/models", title: "Model directory", description: "Every major model in one table: maker, price, context, status.", kind: "comparison" },
        { path: "/compare/apps", title: "AI apps compared", description: "ChatGPT, Claude, Gemini and others as apps, not just models.", kind: "comparison" },
        { path: "/compare/open-vs-closed", title: "Open vs closed models", description: "What open weights give you, and what they cost in effort.", kind: "comparison" },
      ],
    },
    {
      id: "compare-reviews",
      title: "Reviews",
      note: "Each review shows when we tested it and who should skip it.",
      pages: [
        { path: "/compare/reviews", title: "All reviews", description: "Scores side by side, with test dates.", kind: "hub" },
        review("claude-opus-5-5", "Claude Opus 5.5", "Anthropic's top Opus model."),
        review("gpt-6-1-sol", "GPT-6.1 Sol", "OpenAI's mid-priced model."),
        review("gpt-6-astra", "GPT-6 Astra", "OpenAI's top-end model."),
        review("claude-fable-5-1", "Claude Fable 5.1", "Anthropic's most capable public model."),
        review("claude-sonnet-5-5", "Claude Sonnet 5.5", "Anthropic's everyday model."),
        review("gemini-4-argon", "Gemini 4 Argon", "Google's newest large model."),
        review("gemini-3-8-flash", "Gemini 3.8 Flash", "Google's fast, cheap model."),
        review("claude-haiku-5-5", "Claude Haiku 5.5", "Anthropic's small, fast model."),
        review("gpt-6-luna", "GPT-6 Luna", "OpenAI's smallest, cheapest model."),
        review("grok-4-7", "Grok 4.7", "xAI's model."),
        review("mimo-v2-6-pro", "MiMo V2.6 Pro", "An open-weights contender."),
        review("kimi-k3", "Kimi K3", "Moonshot's model."),
        review("qwen3-8-max-27b", "Qwen3.8 Max 27B", "A model small enough to run locally."),
        review("deepseek-v4-1-flash", "DeepSeek V4.1 Flash", "A low-cost open-weights model."),
      ],
    },
    {
      id: "compare-best",
      title: "Best for",
      note: "Ranked lists for one job at a time.",
      pages: [
        { path: "/compare/best", title: "Best for: all lists", description: "Choose your job and see the ranked list.", kind: "hub" },
        best("overall", "Best overall", "The models we would pick first, and why."),
        best("by-job", "Best by job", "Writing, studying, coding, research: one pick per job."),
        best("coding", "Best for coding", "Which models write and fix code most reliably."),
        best("writing", "Best for writing", "Drafting, editing and tone."),
        best("agents", "Best for agents", "Models that finish multi-step tasks without constant help."),
        best("value", "Best value", "The most useful per dollar."),
        best("cheap-and-fast", "Cheapest and fastest", "When price and speed matter more than polish."),
        best("open-weights", "Best open-weights models", "Models you can download and run yourself."),
        best("local", "Best for running locally", "What fits on a laptop or a gaming PC."),
        best("students", "Best for students", "Study help that stays honest."),
        best("small-business", "Best for small business", "Practical picks for owners with no IT team."),
        best("image", "Best for images", "Picture tools compared."),
        best("video", "Best for video", "Video tools compared."),
      ],
    },
    {
      id: "compare-vs",
      title: "Head-to-head and alternatives",
      pages: [
        { path: "/compare/vs", title: "Head-to-head hub", description: "Two models, ten everyday tasks, one winner per task.", kind: "hub" },
        { path: "/compare/vs/claude-opus-5-5-vs-gpt-6-1-sol", title: "Claude Opus 5.5 vs GPT-6.1 Sol", description: "Ten everyday tasks, scored side by side.", kind: "comparison" },
        { path: "/compare/alternatives", title: "Alternatives hub", description: "Looking to leave a tool? Find what to switch to.", kind: "hub" },
      ],
    },
  ],
};

const PRICES: SiteSection = {
  id: "prices",
  title: "Prices",
  hubPath: "/prices",
  summary: "Plans, API costs and limits, each with the date we last checked it.",
  groups: [
    {
      id: "prices-all",
      title: "Price pages",
      pages: [
        { path: "/prices", title: "Prices hub", description: "Where to look for plans, API costs, limits and more.", kind: "hub" },
        { path: "/prices/plans", title: "Plans and subscriptions", description: "What each paid plan costs and adds.", kind: "data" },
        { path: "/prices/api", title: "API costs", description: "Price per million tokens for every major model.", kind: "data" },
        { path: "/prices/free-limits", title: "Free-plan limits", description: "What ChatGPT, Claude, Gemini and Grok give you for free, and which online numbers are out of date.", kind: "data" },
        { path: "/prices/features", title: "Feature matrix", description: "Which plan includes voice, files, agents and image tools.", kind: "data" },
        { path: "/prices/privacy", title: "Privacy by plan", description: "What each company keeps and whether it trains on your chats.", kind: "data" },
        { path: "/prices/retirements", title: "Retirements", description: "Which models are being switched off, and when.", kind: "data" },
        { path: "/prices/benchmarks", title: "Benchmark digest", description: "Independent scores in one table, with who reported each.", kind: "data" },
      ],
    },
  ],
};

const TOOLS: SiteSection = {
  id: "tools",
  title: "Tools",
  hubPath: "/tools",
  summary: "Nine free tools. They run in your browser and do not send what you type anywhere.",
  groups: [
    {
      id: "tools-all",
      title: "Free tools",
      pages: [
        { path: "/tools", title: "Tools hub", description: "All nine tools in one place.", kind: "hub" },
        { path: "/tools/which-ai-fits-me", title: "Which AI fits me?", description: "A short quiz that ends with a recommendation and a reason.", kind: "tool" },
        { path: "/tools/subscription-cost-calculator", title: "Subscription cost calculator", description: "What your AI plans cost per year, and what you could drop.", kind: "tool" },
        { path: "/tools/api-cost-calculator", title: "API cost calculator", description: "Estimate a monthly bill from your own usage.", kind: "tool" },
        { path: "/tools/token-estimator", title: "Token estimator", description: "Paste text and see roughly how many tokens it is.", kind: "tool" },
        { path: "/tools/local-model-memory", title: "Local model memory estimator", description: "Will this model fit on your computer?", kind: "tool" },
        { path: "/tools/prompt-library", title: "Prompt library", description: "Prompts you can copy for work, study and daily life.", kind: "tool" },
        { path: "/tools/benchmark-checklist", title: "Benchmark checklist", description: "Questions to ask before you trust a leaderboard score.", kind: "tool" },
        { path: "/tools/ai-safety-checklist", title: "AI safety checklist", description: "A checklist for safer use at home and at work.", kind: "tool" },
        { path: "/tools/cheat-sheets", title: "Cheat sheets", description: "One-page references you can print.", kind: "tool" },
      ],
    },
  ],
};

const SOCIETY: SiteSection = {
  id: "society",
  title: "AI and society",
  hubPath: "/society",
  summary: "Jobs, health, schools, money and myths, with a named source for every number.",
  groups: [
    {
      id: "society-articles",
      title: "Articles",
      pages: [
        { path: "/society", title: "AI and society hub", description: "Where AI shows up in life, and what is true about it.", kind: "hub" },
        society("ten-places-you-meet-ai", "Ten places you meet AI", "The everyday places AI is already at work."),
        society("role-of-ai-in-our-lives", "The role of AI in our lives", "What AI does for you, and what it quietly decides."),
        society("pros-and-cons-of-ai", "Pros and cons of AI", "A fair list, with who gains and who loses."),
        society("is-ai-taking-jobs", "Is AI taking jobs?", "What the data shows about work, and what it does not."),
        society("industries-changing-most", "Which industries are changing most", "Which industries show real change and which are next, with named surveys."),
        society("future-of-ai", "The future of AI", "Forces, scenarios and warning signs to watch."),
        society("ai-power-use", "AI and power use", "Energy, data centers and what they mean for bills and climate."),
        society("ai-in-healthcare", "AI in healthcare", "Where it helps doctors, and where to be careful."),
        society("ai-in-education", "AI in education", "What students and teachers actually do with it."),
        society("ai-in-banking-and-finance", "AI in banking and finance", "Fraud checks, credit decisions and your rights."),
        society("ai-adoption-data", "How many people use AI", "Four numbers that are all correct, and why."),
        society("ai-myths-and-facts", "AI myths and facts", "Common claims, checked."),
      ],
    },
    {
      id: "society-interactive",
      title: "Interactive",
      pages: [
        { path: "/society/day-quiz", title: "A day with AI quiz", description: "Walk through a day and count how often AI was involved.", kind: "tool" },
        { path: "/society/weigh-up", title: "Weigh it up", description: "Balance the pros and cons for your own situation.", kind: "tool" },
        { path: "/society/industry-explorer", title: "Industry explorer", description: "Pick an industry and see what is changing and what is next.", kind: "tool" },
        { path: "/society/myth-or-fact", title: "Myth or fact?", description: "Test what you believe about AI.", kind: "tool" },
      ],
    },
  ],
};

const NEWS: SiteSection = {
  id: "news",
  title: "News",
  hubPath: "/news",
  summary: "What changed in AI, what it means for you, and what changed on this site.",
  groups: [
    {
      id: "news-all",
      title: "News pages",
      note: "Individual weekly roundups, release posts and explainers are listed on their hub pages.",
      pages: [
        { path: "/news", title: "News hub", description: "The latest roundups, release posts and explainers.", kind: "hub" },
        { path: "/news/weekly", title: "Weekly roundup", description: "The week's changes that matter, short and dated.", kind: "news" },
        { path: "/news/eu-ai-act", title: "EU AI Act timeline", description: "Every date from February 2025 to 2028, what already applies, and what moved. Not legal advice.", kind: "news" },
        { path: "/news/changelog", title: "Changelog", description: "What changed on this site, which sources disagreed, and what is still unconfirmed.", kind: "trust" },
      ],
    },
  ],
};

const ABOUT: SiteSection = {
  id: "about",
  title: "About and legal",
  hubPath: "/about",
  summary: "Who runs this site, how we test and who pays us, plus the usual legal pages.",
  groups: [
    {
      id: "about-trust",
      title: "Trust",
      pages: [
        { path: "/about", title: "About", description: "Who runs the site and which AI tools helped draft it.", kind: "trust" },
        { path: "/about/editorial-standards", title: "Editorial standards", description: "What we publish, and what we refuse to.", kind: "trust" },
        { path: "/about/how-we-test", title: "How we test", description: "The test battery and how scores are weighted.", kind: "trust" },
        { path: "/about/source-policy", title: "Source policy", description: "Which sources win when they disagree.", kind: "trust" },
        { path: "/about/independence", title: "Independence and disclosure", description: "How affiliate links work, and why payment never changes a score.", kind: "trust" },
        { path: "/about/corrections", title: "Corrections log", description: "Every mistake we have fixed, and how to report one.", kind: "trust" },
      ],
    },
    {
      id: "about-support",
      title: "Courses, shop and newsletter",
      pages: [
        { path: "/courses", title: "Courses", description: "Longer, structured courses.", kind: "money" },
        { path: "/shop", title: "Shop", description: "Digital products.", kind: "money" },
        { path: "/newsletter", title: "Newsletter", description: "One email a week, what changed and what to do.", kind: "money" },
        { path: "/sponsored", title: "Sponsored content", description: "How sponsorship works here, and how it is labeled.", kind: "money" },
      ],
    },
    {
      id: "about-legal",
      title: "Legal and utility",
      pages: [
        { path: "/contact", title: "Contact", description: "Reach us, including press and partnerships.", kind: "utility" },
        { path: "/privacy-policy", title: "Privacy policy", description: "What we collect, how we use it, and your choices.", kind: "legal" },
        { path: "/terms", title: "Terms of use", description: "Using the site, affiliate notice, not professional advice.", kind: "legal" },
        { path: "/search", title: "Search", description: "Search guides, glossary, reviews and tools.", kind: "utility" },
        { path: "/sitemap", title: "Sitemap", description: "This page: every page on the site.", kind: "utility" },
      ],
    },
  ],
};

export const SECTIONS: readonly SiteSection[] = [LEARN, COMPARE, PRICES, TOOLS, SOCIETY, NEWS, ABOUT];

export const INTENTS: readonly Intent[] = [
  { id: "free-enough", label: "Find out if a free AI plan is enough", path: "/prices/free-limits", why: "Limits for ChatGPT, Claude, Gemini and Grok, with the numbers that are out of date." },
  { id: "eu-rules", label: "Understand the EU AI rules and their dates", path: "/news/eu-ai-act", why: "Every date in one table, what already applies, and what to do about it." },
  { id: "my-job", label: "See whether AI is taking jobs", path: "/society/is-ai-taking-jobs", why: "What the data shows, with the survey named for each number." },
  { id: "industries", label: "See which industries are changing most", path: "/society/industries-changing-most", why: "Cards for each industry, with numbers only where a named survey supports them." },
  { id: "scams", label: "Stay safe from AI scams", path: "/learn/foundations/ai-scams-and-deepfakes", why: "How cloned voices and fake videos work, and the checks that stop them." },
  { id: "fact-check", label: "Check whether an AI answer is true", path: "/learn/practitioner/fact-check-ai-answers", why: "A short routine for invented facts and fake sources." },
  { id: "coding", label: "Pick an AI for coding", path: "/compare/best/coding", why: "A ranked list with test dates." },
  { id: "bill", label: "Work out what the API will cost me", path: "/tools/api-cost-calculator", why: "Enter your usage and see the monthly bill." },
  { id: "local", label: "Run an AI on my own computer", path: "/tools/local-model-memory", why: "Check whether a model will fit before you download it." },
  { id: "what-changed", label: "See what changed on this site", path: "/news/changelog", why: "Dated changes, source conflicts and what is still unconfirmed." },
  { id: "error", label: "Report a mistake", path: "/about/corrections", why: "How to tell us, and every correction we have made." },
  { id: "who-pays", label: "Know who pays for this site", path: "/about/independence", why: "How affiliate links work and why payment never changes a score." },
];