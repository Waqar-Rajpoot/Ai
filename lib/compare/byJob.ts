import type { ChangeNote, CostScenario, FaqEntry, RoundupLink, RoundupSource } from "./bestFor";

export type EvidenceStrength = "strong" | "moderate" | "thin";

export interface JobPick {
  /** Matches an id in API_PRICE_ROWS. */
  modelId: string;
  reason: string;
}

export interface JobRow {
  id: string;
  job: string;
  forWhom: string;
  top: JobPick;
  runnerUp: JobPick | null;
  budget: JobPick | null;
  strength: EvidenceStrength;
  evidence: readonly string[];
  caveat: string;
  links: readonly RoundupLink[];
}

/** A model we have seen evidence for that is not in the model directory yet. */
export interface Newcomer {
  id: string;
  name: string;
  maker: string;
  /** ISO date. */
  announced: string;
  access: string;
  price: string;
  whatWeKnow: readonly string[];
  caution: string;
}

export interface ByJobPage {
  title: string;
  pageTitle: string;
  description: string;
  checkedOn: string;
  summary: { hardWork: JobPick; everyday: JobPick; budget: JobPick };
  howToChoose: readonly { question: string; answer: string }[];
  jobs: readonly JobRow[];
  notRankedYet: readonly string[];
  newcomers: readonly Newcomer[];
  costScenarios: readonly CostScenario[];
  costModelIds: readonly string[];
  changes: readonly ChangeNote[];
  retiringIds: readonly string[];
  faq: readonly FaqEntry[];
  sources: readonly RoundupSource[];
  related: readonly RoundupLink[];
}

export const STRENGTH_LABELS: Record<EvidenceStrength, string> = {
  strong: "Strong evidence",
  moderate: "Moderate evidence",
  thin: "Thin evidence",
};

export const STRENGTH_MEANINGS: Record<EvidenceStrength, string> = {
  strong: "Several independent sources agree, and the gap is larger than the noise.",
  moderate: "Independent evidence points one way, but the gap is small or the sources are few.",
  thin: "One kind of test, or no direct test. The pick leans on price, context window or a maker's claims.",
};

export const BY_JOB_PAGE: ByJobPage = {
  title: "Best AI model right now, by job",
  pageTitle: "Best AI model right now, by job (November 2026)",
  description:
    "Which AI model to use for coding, writing, professional work, science, agents, long documents, high-volume jobs and open weights, with the evidence, cost per task and the newest models that are not public yet.",
  checkedOn: "November 1, 2026",
  summary: {
    hardWork: { modelId: "claude-opus-5-5", reason: "First on our overall, agent and coding evidence, and the strongest for long, hard jobs." },
    everyday: { modelId: "gpt-6-1-sol", reason: "Close to the leaders on the overall index at a fifth of the flagship price." },
    budget: { modelId: "claude-haiku-5-5", reason: "Very low price for bulk edits and short prompts, with a price step above 100K tokens." },
  },
  howToChoose: [
    { question: "Is the job hard and costly to get wrong?", answer: "Start with Claude Opus 5.5, and check GPT-6 Astra for science-heavy work." },
    { question: "Do you do this job many times a day?", answer: "Start with GPT-6.1 Sol or Claude Sonnet 5.5, then try a cheaper model on the same ten tasks." },
    { question: "Is the work private, or must it stay on your own hardware?", answer: "Choose the plan first (see the privacy matrix), then look at open-weight models." },
  ],
  jobs: [
    {
      id: "overall",
      job: "Best overall",
      forWhom: "You want one model for most things and can pay for it.",
      top: { modelId: "claude-opus-5-5", reason: "Highest directory score on the newest Artificial Analysis index, and first on Arena's agent leaderboard." },
      runnerUp: { modelId: "gpt-6-astra", reason: "Second among directory models on the same index, at 2.5 times Opus 5.5's token price." },
      budget: { modelId: "gpt-6-1-sol", reason: "Within three points of Opus 5.5 on the index at $2 in / $10 out." },
      strength: "moderate",
      evidence: [
        "Artificial Analysis Intelligence Index v5.0 (Oct 28, via trackers): Claude Opus 5.5 58, GPT-6 Astra 57, GPT-6.1 Sol 55, Claude Fable 5.1 49. Gemini 4 Carbon, which the public cannot use yet, scored 59.",
        "BenchLM's composite (Oct 17 snapshot): Opus 5.5 86.6, Sol 84.1, Astra 83.9.",
        "Arena's agent leaderboard has Opus 5.5 first.",
      ],
      caveat: "Index v5.0 is not comparable with earlier versions, so older Artificial Analysis numbers elsewhere on this site use a different scale. Sonnet 5.5 has no v5.0 score in the sources we read.",
      links: [{ href: "/compare/best/overall", label: "Best overall" }, { href: "/prices/benchmarks", label: "Benchmark digest" }],
    },
    {
      id: "chat-writing",
      job: "Everyday chat and writing",
      forWhom: "Emails, drafts, explanations and brainstorming.",
      top: { modelId: "gemini-4-argon", reason: "Top of Arena's text leaderboard, though the lead over Opus 5.5 is small." },
      runnerUp: { modelId: "claude-opus-5-5", reason: "Second on Arena text and first on Arena creative writing in early October." },
      budget: { modelId: "gemini-3-8-flash", reason: "1,492 on Arena text in late September at $0.75 in / $3.75 out." },
      strength: "moderate",
      evidence: [
        "Arena text (Oct 19, via BenchLM's copy): Gemini 4 Argon 1,532, Claude Opus 5.5 1,516, with no margins published. Earlier in October Argon led by about 9 points.",
        "Arena creative writing (early October, via a tracker): Opus 5.5 1,519 first, Argon 1,515.6 second.",
        "Arena counts which answer people prefer in blind votes. It does not check which answer is correct.",
      ],
      caveat: "Gaps this small are likely ties. Argon needs Google AI Pro or higher in the Gemini app, and its API price doubles on December 1.",
      links: [{ href: "/compare/best/writing", label: "Best for writing" }, { href: "/compare/apps", label: "ChatGPT vs Claude vs Gemini vs Grok" }],
    },
    {
      id: "professional",
      job: "Professional work: finance, legal, tax and analysis",
      forWhom: "Reports, contracts, spreadsheets and research for work.",
      top: { modelId: "gemini-4-argon", reason: "First on the Vals Index when last read, ahead of Opus 5.5 by about two points." },
      runnerUp: { modelId: "claude-opus-5-5", reason: "66.97% (±0.89) on the Vals Index, and first on GDPval-AA v2.1 according to a tracker." },
      budget: null,
      strength: "moderate",
      evidence: [
        "Vals Index: Gemini 4 Argon 68.9% (Oct 21, via a tracker), Claude Opus 5.5 66.97% ±0.89 (Oct 23, Vals's own page).",
        "Gemini 4 Carbon, not publicly available, scores 70.36% and ranks second of 29 on the same index, and first on its Legal Research Bench.",
        "On GDPval-AA v2.1, a tracker lists Opus 5.5 first at 1,866.",
      ],
      caveat: "The two Vals figures were read on different dates. Check Vals before you quote them. No budget pick: we found no professional-task score for a cheaper model.",
      links: [{ href: "/prices/benchmarks", label: "Benchmark digest" }],
    },
    {
      id: "science",
      job: "Hard reasoning, maths and science",
      forWhom: "Research code, simulations and problems with a verifiable answer.",
      top: { modelId: "gpt-6-astra", reason: "Ahead of Opus 5.5 on the science terminal tasks in the independent run we read." },
      runnerUp: { modelId: "claude-opus-5-5", reason: "Close behind on the same run, and ahead of Astra on most coding rows." },
      budget: { modelId: "gpt-6-1-sol", reason: "The cheaper OpenAI route for the same family of tasks." },
      strength: "thin",
      evidence: [
        "Terminal-Bench-Science 0.1, Artificial Analysis run (via a tracker): GPT-6 Astra 63.3%, Claude Opus 5.5 59.0%.",
        "Vendor numbers for the same test: OpenAI reports 64.6% for Astra, Anthropic reports 58.7% for Opus 5.5.",
        "On Artificial Analysis's HLE-Diamond (Oct 29), Gemini 4 Carbon scored 69.1% and GPT-6.1 Terra 35.4%. Neither is in our directory.",
      ],
      caveat: "One benchmark family, in an early version. Treat this pick as a lead to test, not a verdict.",
      links: [],
    },
    {
      id: "coding",
      job: "Coding",
      forWhom: "Writing, fixing and reviewing code.",
      top: { modelId: "claude-opus-5-5", reason: "First on Arena WebDev, the public Terminal-Bench 4.0 board and BenchLM's coding category." },
      runnerUp: { modelId: "claude-sonnet-5-5", reason: "Second on the same charts at half the price." },
      budget: { modelId: "claude-haiku-5-5", reason: "$0.10 in / $0.50 out for prompts up to 100K tokens." },
      strength: "strong",
      evidence: [
        "Several independent sources agree. See the full ranking, evidence and cost per task on the coding page.",
      ],
      caveat: "Scores differ by harness and effort setting, which the coding page explains.",
      links: [{ href: "/compare/best/coding", label: "Best AI for coding" }],
    },
    {
      id: "agents",
      job: "AI agents and long tasks",
      forWhom: "Tools that plan steps, use apps and run for a long time.",
      top: { modelId: "claude-opus-5-5", reason: "First on Arena's agent leaderboard by a wide margin, at the highest cost per task of the leaders." },
      runnerUp: { modelId: "claude-sonnet-5-5", reason: "Third on the same leaderboard, behind Gemini 4 Carbon." },
      budget: { modelId: "gpt-6-1-sol", reason: "About $0.93 per task on Arena's agent cost chart, against $6.82 for Opus 5.5." },
      strength: "moderate",
      evidence: [
        "Arena agent leaderboard (read Nov 1, via the Arena page): Claude Opus 5.5 20.94%, Gemini 4 Carbon 16.04%, Claude Sonnet 5.5 13.84%, Claude Fable 5.1 13.35%, GPT-6 Astra 12.96%, GPT-6.1 Sol 12.47%.",
        "Arena's cost chart: Opus 5.5 $6.82 per task, Gemini 4 Carbon $1.75, GPT-6.1 Sol $0.93, GPT-6.1 Terra $0.78.",
        "Public Terminal-Bench 4.0 board (Oct 6, via a tracker): Opus 5.5 64.8%, Sonnet 5.5 61.8%, GPT-6.1 Sol 58.2%.",
      ],
      caveat: "The page we read does not define what the percentage measures, so use the order and the cost per task, not the exact figure.",
      links: [{ href: "/compare/best/agents", label: "Best AI agents" }],
    },
    {
      id: "long-documents",
      job: "Long documents and large files",
      forWhom: "Contracts, reports, transcripts and big codebases.",
      top: { modelId: "claude-sonnet-5-5", reason: "A 1M-token window with no surcharge for long prompts." },
      runnerUp: { modelId: "claude-opus-5-5", reason: "The same window with no surcharge, and stronger on hard analysis." },
      budget: { modelId: "deepseek-v4-1-flash", reason: "A 1M-token window at $0.15 in / $0.60 out off-peak." },
      strength: "thin",
      evidence: [
        "Context windows in our data: about 1M tokens for most models, 1.05M for GPT-6.1 Sol and GPT-6 Astra, 500K for Grok 4.7.",
        "OpenAI's GPT-6 models and Grok 4.7 raise the price of the whole request above a set prompt size, and Claude Haiku 5.5 does so above 100K tokens.",
        "One tracker says Gemini 4 Argon's 1M-token limit is shared by input and output, so a very long input leaves less room for the answer.",
      ],
      caveat: "We have not collected an independent long-context recall test, so these picks follow price rules and window size, not tested quality. Test a document you know well.",
      links: [{ href: "/learn/practitioner/summarize-pdf-with-ai", label: "Summarize a PDF with AI" }],
    },
    {
      id: "high-volume",
      job: "High-volume, low-cost work",
      forWhom: "Sorting, extracting, tagging and short replies at scale.",
      top: { modelId: "claude-haiku-5-5", reason: "$0.10 in / $0.50 out, and 70.0 on BenchLM's composite." },
      runnerUp: { modelId: "gpt-6-luna", reason: "The same list price, built by OpenAI for focused, high-volume jobs." },
      budget: { modelId: "deepseek-v4-1-flash", reason: "The lowest-priced capable option, with off-peak prices that double at peak hours." },
      strength: "thin",
      evidence: [
        "BenchLM composite (Oct 17): Claude Haiku 5.5 70.0, Gemini 3.8 Flash 69.3. GPT-6 Luna, Grok 4.7 and DeepSeek V4.1 Flash were not in its top 25.",
        "GPT-6.1 Terra, released Oct 26, lists at $1 in / $5 out and scored 51 on Artificial Analysis's v5.0 index. It is not in our directory yet.",
      ],
      caveat: "Cheap models differ most on edge cases. Run ten of your own examples before you commit, and mind Haiku 5.5's price step above 100K tokens.",
      links: [{ href: "/compare/best/cheap-and-fast", label: "Best cheap and fast models" }],
    },
    {
      id: "value",
      job: "Best value near the frontier",
      forWhom: "You want strong results without paying flagship prices.",
      top: { modelId: "gpt-6-1-sol", reason: "55 on the v5.0 index at $2 in / $10 out, and $0.93 per task on Arena's agent chart." },
      runnerUp: { modelId: "claude-sonnet-5-5", reason: "Close to Opus 5.5 on coding and agent charts at the same list price." },
      budget: { modelId: "gemini-4-argon", reason: "$2 in / $10 out until November 30. It doubles on December 1, so plan for the new price." },
      strength: "moderate",
      evidence: [
        "Artificial Analysis v5.0: Sol 55 against Opus 5.5's 58, at half the token price.",
        "Arena agent cost chart: GPT-6.1 Sol $0.93 per task, Claude Opus 5.5 $6.82.",
      ],
      caveat: "Cost per task depends on how many steps and thinking tokens a model uses, so compare finished tasks, not token prices.",
      links: [{ href: "/compare/best/value", label: "Best value" }, { href: "/prices/api", label: "API costs" }],
    },
    {
      id: "open-weights",
      job: "Open weights and running it yourself",
      forWhom: "You need to host a model, or keep data on your own machines.",
      top: { modelId: "kimi-k3", reason: "Moonshot's open-weight coding-agent model. Its newer K3.1 Pro has promised weights by Nov 4." },
      runnerUp: { modelId: "deepseek-v4-1-flash", reason: "BenchLM names it the highest-ranked open-weight coding model." },
      budget: { modelId: "mimo-v2-6-pro", reason: "MIT licence at $0.435 in / $0.87 out." },
      strength: "thin",
      evidence: [
        "Kimi K3.1 Pro led Artificial Analysis's Terminal-Bench 4.0 run at 67.2% (Oct 23, via a tracker). It is not in our directory yet, and its weights were not confirmed public when we checked.",
        "The full Kimi model is very large, so hosting it means a cluster. For one computer, our memory estimator puts a 27B model at about 16 GB at 4-bit.",
      ],
      caveat: "Open weights come with licences and hardware needs. See our open-weight and local roundups before you choose.",
      links: [
        { href: "/compare/best/open-weights", label: "Best open-weight models" },
        { href: "/compare/best/local", label: "Best models to run locally" },
        { href: "/tools/local-model-memory", label: "Local model memory estimator" },
      ],
    },
  ],
  notRankedYet: [
    "Images and video: we have no image or video tests yet.",
    "Voice, transcription and translation.",
    "Search with citations. Arena runs a search leaderboard, but we have not read it.",
    "Study and homework help. See our guide on using AI to study without cheating.",
  ],
  newcomers: [
    {
      id: "gemini-4-carbon",
      name: "Gemini 4 Carbon",
      maker: "Google",
      announced: "2026-10-28",
      access: "Limited to selected cyber defenders in Google's Fairwind Program. No public date.",
      price: "$2 in / $10 out at launch, then $4 / $20 after an introductory period Google has not dated.",
      whatWeKnow: [
        "Artificial Analysis v5.0 index: 59, one point above Claude Opus 5.5 in Google's own comparison table.",
        "Vals Index: 70.36%, second of 29 models.",
        "One tracker called the API on Oct 29 and got an error, with no public model ID yet.",
      ],
      caution: "You cannot buy or use it, so it is not ranked. Plan around Gemini 4 Argon and revisit when Google opens access.",
    },
    {
      id: "gpt-6-1-terra",
      name: "GPT-6.1 Terra",
      maker: "OpenAI",
      announced: "2026-10-26",
      access: "Generally available through OpenAI's API.",
      price: "$1 in / $5 out per million tokens, cached input $0.05.",
      whatWeKnow: [
        "OpenAI pitches it for fast, high-volume professional work, image analysis and computer use.",
        "Artificial Analysis v5.0 index: 51, and 41.9% on its Terminal-Bench run.",
        "On Arena's agent cost chart: about $0.78 per task.",
      ],
      caution: "It sits below GPT-6.1 Sol on the index. We will add it to the directory and to the high-volume row once we have more than a few days of evidence.",
    },
    {
      id: "kimi-k3-1-pro",
      name: "Kimi K3.1 Pro",
      maker: "Moonshot AI",
      announced: "2026-10-23",
      access: "Moonshot's API. Weights are promised by November 4, 2026.",
      price: "$2 in / $10 out per million tokens.",
      whatWeKnow: [
        "Moonshot reports 65.7% on Terminal-Bench 4.0, and Artificial Analysis's run put it first at 67.2%, according to one tracker.",
        "Ranked 9th in Arena WebDev when Arena listed it as a new release.",
      ],
      caution: "Very new, and the weights are not confirmed public. Treat the open-weight pick as provisional.",
    },
  ],
  costScenarios: [
    { id: "quick-chat", label: "Quick answer", description: "One short question and a short reply.", requests: 1, inputPerRequest: 500, outputPerRequest: 400, cachedSharePercent: 0 },
    { id: "report", label: "Summarize a 100-page report", description: "One long document in, a two-page summary out.", requests: 1, inputPerRequest: 66667, outputPerRequest: 1200, cachedSharePercent: 0 },
    { id: "research", label: "A research session", description: "About 10 requests that re-read the same sources, 50% served from cache.", requests: 10, inputPerRequest: 20000, outputPerRequest: 1500, cachedSharePercent: 50 },
  ],
  costModelIds: [
    "claude-opus-5-5",
    "claude-sonnet-5-5",
    "gpt-6-1-sol",
    "gpt-6-astra",
    "gemini-4-argon",
    "kimi-k3",
    "deepseek-v4-1-flash",
    "claude-haiku-5-5",
    "gpt-6-luna",
  ],
  changes: [
    { isoDate: "2026-10-29", title: "Artificial Analysis moves to index v5.0", detail: "Scores rebased on Oct 28. Opus 5.5 is 58, GPT-6 Astra 57, GPT-6.1 Sol 55, Fable 5.1 49. Older numbers are not comparable." },
    { isoDate: "2026-10-28", title: "Google announces Gemini 4 Carbon", detail: "Restricted to selected cyber defenders. It leads the new index at 59 but cannot be bought yet." },
    { isoDate: "2026-10-26", title: "OpenAI releases GPT-6.1 Terra", detail: "A lower-cost model at $1 in / $5 out, aimed at fast, high-volume work." },
    { isoDate: "2026-10-23", title: "Kimi K3.1 Pro launches, and OpenAI retires the GPT-4 family", detail: "K3.1 Pro lists at $2 / $10, and the GPT-4, o1 and GPT-3.5 shutdowns land the same day." },
    { isoDate: "2026-10-13", title: "Gemini 4 Argon becomes generally available", detail: "Available in the Gemini app on AI Pro and Ultra, and in the paid API. The $2 / $10 price ends Nov 30." },
    { isoDate: "2026-10-07", title: "Claude Haiku 5.5 launches", detail: "$0.10 in / $0.50 out up to 100K tokens. Sonnet 5.5's cache reads were halved the same day." },
  ],
  retiringIds: [
    "claude-sonnet-4-5-api",
    "foundry-o-series-nov-19",
    "openai-gpt-5-dec-11",
    "openai-gpt-4-family-oct-23",
  ],
  faq: [
    { question: "What is the best AI model right now?", answer: "It depends on the job. Claude Opus 5.5 leads our overall, agent and coding evidence, Gemini 4 Argon leads the text-chat vote, and GPT-6.1 Sol is the value pick. The gaps are small on several charts, so test your own tasks." },
    { question: "Why is Gemini 4 Carbon not ranked?", answer: "It scores highest on the newest index, but only selected cyber defenders can use it, and Google has not set a public date. We rank models you can actually use." },
    { question: "Why do the numbers differ from other pages on this site?", answer: "Artificial Analysis rebased its index on October 28. Scores on the new scale are not comparable with the old one, so we label which version each number comes from." },
    { question: "Why is there no image or video pick?", answer: "We have no verified image or video tests yet. We would rather leave a job out than rank it on guesses." },
    { question: "Does a higher score mean better for me?", answer: "Not necessarily. Leaderboards test specific tasks, and a close gap is often a tie. Run ten of your own tasks on your top two or three, and compare cost per finished task." },
    { question: "Is my data safe with the top models?", answer: "That depends on your plan, not the model. Free and personal plans can use your chats for training unless you opt out. See our privacy matrix." },
    { question: "How often is this page updated?", answer: "Weekly, and sooner when a major model launches or a price changes. The verified-on date at the top shows the last check." },
  ],
  sources: [
    { publisher: "Arena", title: "Leaderboards (agent and cost charts)", href: "https://arena.ai/leaderboard", kind: "Operator or maker page" },
    { publisher: "Vals AI", title: "Gemini 4 Carbon on the Vals Index", href: "https://www.vals.ai/models/google_gemini-4-carbon", kind: "Operator or maker page" },
    { publisher: "Vals AI", title: "Claude Opus 5.5 vs GPT-6 Sol", href: "https://www.vals.ai/comparisons/anthropic_claude-opus-5-5-vs-openai_gpt-6-sol", kind: "Operator or maker page" },
    { publisher: "Google", title: "Introducing Gemini 4 Carbon", href: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/", kind: "Operator or maker page" },
    { publisher: "Capital and Compute", title: "Gemini 4 Carbon: pricing, benchmarks, access", href: "https://capitalandcompute.net/md/gemini-4-carbon-pricing-benchmarks.md", kind: "Tracker (secondary)" },
    { publisher: "The AI Rankings", title: "Gemini 4 Carbon", href: "https://theairankings.com/google/gemini-4-carbon/", kind: "Tracker (secondary)" },
    { publisher: "SmartScope", title: "Gemini 4 Carbon: availability and differences from Argon", href: "https://smartscope.blog/en/blog/gemini-4-carbon-availability-release-date-differences-argon-2026/", kind: "Tracker (secondary)" },
    { publisher: "Gradually", title: "GPT-6.1 Terra vs Gemini 4 Carbon", href: "https://www.gradually.ai/en/llm-comparison/gpt-6.1-terra-vs-gemini-4-carbon/", kind: "Tracker (secondary)" },
    { publisher: "Teamday", title: "Best AI models, November 2026", href: "https://www.teamday.ai/blog/best-ai-models-2026", kind: "Tracker (secondary)" },
    { publisher: "Fello AI", title: "Best AI models in October 2026", href: "https://felloai.com/best-ai-models/", kind: "Tracker (secondary)" },
    { publisher: "Tosea", title: "Claude Sonnet 5.5: benchmarks and cost per task", href: "https://tosea.ai/blog/claude-sonnet-5-5-complete-guide", kind: "Tracker (secondary)" },
    { publisher: "BenchLM", title: "LLM leaderboard history", href: "https://benchlm.ai/llm-leaderboard-history", kind: "Tracker (secondary)" },
    { publisher: "Mean CEO", title: "New AI model releases, November 2026", href: "https://blog.mean.ceo/new-ai-model-releases-news-november-2026/", kind: "Tracker (secondary)" },
  ],
  related: [
    { href: "/compare/best", label: "All best-for roundups" },
    { href: "/compare/best/coding", label: "Best AI for coding" },
    { href: "/compare/models", label: "Model directory" },
    { href: "/prices/api", label: "API costs" },
    { href: "/prices/benchmarks", label: "Benchmark digest" },
    { href: "/prices/privacy", label: "Privacy matrix" },
    { href: "/prices/retirements", label: "Retirements" },
    { href: "/compare/apps", label: "ChatGPT vs Claude vs Gemini vs Grok" },
  ],
};
