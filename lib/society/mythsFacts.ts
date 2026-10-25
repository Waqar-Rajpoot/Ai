export type MythTheme =
  | "how-ai-works"
  | "accuracy"
  | "privacy-safety"
  | "work-jobs"
  | "learning"
  | "energy"
  | "who-uses"
  | "society-rules";

export type MythVerdict = "myth" | "mostly-myth" | "depends" | "mostly-fact" | "fact";

export type EvidenceKind = "official-tracker" | "named-survey" | "analyst-forecast" | "company-report" | "research-paper";

/** How far we read the source: its own page, a reprint of it, or not at all (general knowledge). */
export type SourceCheck = "primary-read" | "secondary-read" | "not-checked";

export type GuessChoice = "myth" | "fact" | "depends";

export interface EvidenceSource {
  id: string;
  publisher: string;
  title: string;
  href: string;
  kind: EvidenceKind;
  /** The period the figures cover, and when they were published where that helps. */
  asOf: string;
  check: SourceCheck;
}

export interface MythFactItem {
  id: string;
  theme: MythTheme;
  /** The claim as people say it. For facts, the true claim. */
  statement: string;
  verdict: MythVerdict;
  plain: string;
  technical: string;
  whatToDo: string;
  /** Ids from EVIDENCE_SOURCES. Empty means established knowledge, not a single dated source. */
  evidenceIds: readonly string[];
  relatedLink?: { href: string; label: string };
}

export const THEME_ORDER: readonly MythTheme[] = [
  "how-ai-works",
  "accuracy",
  "privacy-safety",
  "work-jobs",
  "learning",
  "energy",
  "who-uses",
  "society-rules",
];

export const THEME_LABELS: Record<MythTheme, string> = {
  "how-ai-works": "How AI works",
  accuracy: "Accuracy and trust",
  "privacy-safety": "Privacy and safety",
  "work-jobs": "Work and jobs",
  learning: "School and learning",
  energy: "Energy",
  "who-uses": "Who uses AI",
  "society-rules": "Society, fairness and rules",
};

export const VERDICT_ORDER: readonly MythVerdict[] = ["myth", "mostly-myth", "depends", "mostly-fact", "fact"];

export const VERDICT_LABELS: Record<MythVerdict, string> = {
  myth: "Myth",
  "mostly-myth": "Mostly myth",
  depends: "It depends",
  "mostly-fact": "Mostly fact",
  fact: "Fact",
};

export const VERDICT_MEANINGS: Record<MythVerdict, string> = {
  myth: "The evidence points the other way.",
  "mostly-myth": "A grain of truth, but the claim as stated is misleading.",
  depends: "The answer changes with the situation, the definition or the person.",
  "mostly-fact": "True in the main, with a caveat worth knowing.",
  fact: "Well supported as stated.",
};

export const EVIDENCE_KIND_LABELS: Record<EvidenceKind, string> = {
  "official-tracker": "Official tracker",
  "named-survey": "Named survey",
  "analyst-forecast": "Analyst forecast",
  "company-report": "Company report",
  "research-paper": "Research paper",
};

export const SOURCE_CHECK_LABELS: Record<SourceCheck, string> = {
  "primary-read": "Read on the source's own page",
  "secondary-read": "Read through a reprint; confirm on the source",
  "not-checked": "Not checked",
};

export const GUESS_OPTIONS: readonly { id: GuessChoice; label: string }[] = [
  { id: "myth", label: "Myth" },
  { id: "fact", label: "Fact" },
  { id: "depends", label: "It depends" },
];

/** Every source the claims point to. Add the source here, then list its id on the claim. */
export const EVIDENCE_SOURCES: readonly EvidenceSource[] = [
  { id: "fred-overall", publisher: "Federal Reserve Bank of St. Louis (FRED)", title: "Generative AI adoption rate, overall, working-age adults", href: "https://fred.stlouisfed.org/series/RPSGENAIUSAGESHAREALL", kind: "official-tracker", asOf: "Q2 2026", check: "primary-read" },
  { id: "fred-nonwork", publisher: "Federal Reserve Bank of St. Louis (FRED)", title: "Generative AI adoption rate outside of work, working-age adults", href: "https://fred.stlouisfed.org/series/RPSGENAIUSAGESHARENONWORK", kind: "official-tracker", asOf: "Q2 2026", check: "primary-read" },
  { id: "fred-hours", publisher: "Federal Reserve Bank of St. Louis (FRED)", title: "Generative AI work hours assisted, employed adults", href: "https://fred.stlouisfed.org/series/RPSGENAIASSISTWRKHRSALL", kind: "official-tracker", asOf: "Q2 2026", check: "primary-read" },
  { id: "fred-blog-time", publisher: "Federal Reserve Bank of St. Louis (FRED Blog)", title: "Does generative AI save time at work?", href: "https://fred.stlouisfed.org/blog/2026/08/does-generative-ai-save-time-at-work/", kind: "official-tracker", asOf: "August 2026", check: "primary-read" },
  { id: "fred-occupation", publisher: "Federal Reserve Bank of St. Louis (FRED)", title: "Adoption rate for work: management occupations", href: "https://fred.stlouisfed.org/series/RPSGENAIUSAGESHAREOCC1", kind: "official-tracker", asOf: "Q2 2026", check: "primary-read" },
  { id: "fred-industry", publisher: "Federal Reserve Bank of St. Louis (FRED)", title: "Adoption rate for work: real estate and rental and leasing", href: "https://fred.stlouisfed.org/series/RPSGENAIUSAGESHAREIND11", kind: "official-tracker", asOf: "Q2 2026", check: "primary-read" },
  { id: "pew-2026", publisher: "Pew Research Center", title: "Americans and AI 2026: Chatbots, Smart Devices and Views on Impact", href: "https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/", kind: "named-survey", asOf: "Surveyed Feb 17 to 23, 2026; published June 17, 2026", check: "primary-read" },
  { id: "msft-q2", publisher: "Microsoft AI Economy Institute", title: "The continued state of global AI diffusion in 2026", href: "https://blogs.microsoft.com/on-the-issues/2026/09/21/the-continued-state-of-global-ai-diffusion-in-2026/", kind: "company-report", asOf: "June 2026 (Q2); published Sept 21, 2026", check: "primary-read" },
  { id: "msft-q1", publisher: "Microsoft AI Economy Institute", title: "Global AI Diffusion: Q1 2026 Trends and Insights", href: "https://www.microsoft.com/en-us/research/wp-content/uploads/2026/05/Microsoft-AI-Diffusion-Report-2026-Q1.pdf", kind: "company-report", asOf: "Q1 2026; published May 2026", check: "primary-read" },
  { id: "gartner-2026", publisher: "Gartner", title: "Gartner Says Data Center Electricity Consumption to Grow 26% in 2026", href: "https://www.gartner.com/en/newsroom/press-releases/2026-06-10-gartner-says-data-center-electricity-demand-to-grow-26-percent-in-2026", kind: "analyst-forecast", asOf: "Forecast published June 10, 2026", check: "primary-read" },
  { id: "sp-global-2026", publisher: "S&P Global", title: "The AI and labor landscape 2026", href: "https://spglobal.com/en/research-insights/special-reports/ai-impact-on-employment-2026", kind: "named-survey", asOf: "June 2026", check: "primary-read" },
  { id: "ism-june-2026", publisher: "Institute for Supply Management (ISM)", title: "June 2026 survey on AI and employment (read through a Staffing Industry Analysts reprint)", href: "https://staffingindustry.com/news/global-daily-news/only-modest-employment-expectations-for-remainder-of-the-year", kind: "named-survey", asOf: "June 2026", check: "secondary-read" },
  { id: "nber-firm-data", publisher: "National Bureau of Economic Research", title: "Firm Data on AI (working paper 34836)", href: "https://www.nber.org/papers/w34836", kind: "research-paper", asOf: "2026", check: "primary-read" },
];

/** The claims, grouped by theme in the order the page shows them. */
export const MYTH_FACTS: readonly MythFactItem[] = [
  // ---- How AI works ----
  {
    id: "chatbots-look-up-answers",
    theme: "how-ai-works",
    statement: "A chatbot looks up its answers in a giant database.",
    verdict: "myth",
    plain: "A chatbot writes each reply piece by piece from patterns it learned in training. It is not pulling a stored answer off a shelf, unless it is also using a search tool.",
    technical: "A language model predicts the next token from the tokens before it. What it knows sits in its weights, not in a table of answers. Search and retrieval (RAG) are extra tools that feed text into the prompt, and a chatbot may or may not use them.",
    whatToDo: "Check whether an answer came from live search or from the model alone, and verify anything that matters.",
    evidenceIds: [],
    relatedLink: { href: "/learn/foundations/how-ai-chatbots-work", label: "How AI chatbots work, without math" },
  },
  {
    id: "ai-understands-like-people",
    theme: "how-ai-works",
    statement: "AI understands things the way people do.",
    verdict: "depends",
    plain: "AI handles language and ideas well, but it has no body or life experience, and researchers disagree about whether \"understanding\" is the right word. A fluent answer is not proof that it grasped your situation.",
    technical: "Models can pass hard tests yet fail on small rewordings or unusual cases, so performance can be brittle. Whether that counts as understanding is a debate about definitions. For your purposes, reliability on your own tasks is what to measure.",
    whatToDo: "Judge it by whether it gets your tasks right, not by how human it sounds.",
    evidenceIds: [],
    relatedLink: { href: "/learn/power-user/build-your-own-ai-test-set", label: "Build your own AI test set" },
  },
  {
    id: "chatbots-have-feelings",
    theme: "how-ai-works",
    statement: "Today's chatbots have feelings and know they exist.",
    verdict: "mostly-myth",
    plain: "There is no accepted evidence that current chatbots feel anything. They sound emotional because they learned from human writing. Whether any machine could be conscious is still an open question.",
    technical: "Emotional language in a model's output is a learned pattern, not evidence of inner experience. Researchers disagree on whether machine consciousness is possible and how it could be tested, so the deeper question stays open.",
    whatToDo: "Enjoy the conversation, but do not let a chatbot's claims about itself steer big decisions.",
    evidenceIds: [],
  },
  {
    id: "chatbot-remembers-me",
    theme: "how-ai-works",
    statement: "A chatbot learns from me during our chat and remembers me forever.",
    verdict: "mostly-myth",
    plain: "During a chat it can use what you wrote earlier in that conversation. Some apps also have a memory feature that saves notes about you, which you can usually view or switch off. Whether your chats are used to train future models depends on the app, the plan and your settings.",
    technical: "A model's weights do not change while you chat. What looks like learning is the conversation fed back in as context, plus optional memory features that store text and add it to later prompts. Training use is a separate setting.",
    whatToDo: "Check the memory and data-sharing settings in your app and switch off what you do not want.",
    evidenceIds: [],
    relatedLink: { href: "/learn/power-user/context-windows-tokens-memory", label: "Context windows, tokens and memory explained" },
  },

  // ---- Accuracy and trust ----
  {
    id: "chatbots-make-things-up",
    theme: "accuracy",
    statement: "AI chatbots can state things that are not true.",
    verdict: "fact",
    plain: "Yes. A made-up or wrong answer is called a hallucination. Chatbots can produce one on any topic, in a calm and confident tone.",
    technical: "Language models generate likely text, not verified facts. Rates differ by model, task and whether search or documents are provided, but no current model is free of them.",
    whatToDo: "Verify anything that affects money, health, law or reputation.",
    evidenceIds: [],
    relatedLink: { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers" },
  },
  {
    id: "confident-means-right",
    theme: "accuracy",
    statement: "If an AI sounds confident, it is right.",
    verdict: "myth",
    plain: "Chatbots write in a confident, fluent style whether they are right or wrong. A made-up answer can read just like a correct one.",
    technical: "Models generate likely text, and by default they do not report how sure they are. Mistakes vary by model and task, and they are not zero. Checking against a primary source is the reliable fix.",
    whatToDo: "Check facts, quotes and numbers that matter against a source you trust.",
    evidenceIds: [],
    relatedLink: { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers" },
  },
  {
    id: "sources-mean-accurate",
    theme: "accuracy",
    statement: "If an AI shows sources, its answer must be accurate.",
    verdict: "myth",
    plain: "Links make an answer easier to check, not automatically correct. The answer may misstate what a source says, or the source itself may be weak.",
    technical: "Citations can be attached to claims they do not fully support, and search results include low-quality pages. Open the cited page and confirm that it contains the specific claim.",
    whatToDo: "Click through at least the sources behind the claims you will rely on.",
    evidenceIds: [],
    relatedLink: { href: "/learn/practitioner/deep-research-modes", label: "Deep research modes: check the sources" },
  },
  {
    id: "ai-detectors-reliable",
    theme: "accuracy",
    statement: "AI-writing detectors can reliably tell who wrote a text.",
    verdict: "myth",
    plain: "No detector is accurate enough to prove who wrote something. They can flag human writing as AI and miss AI writing, so using one as proof can wrongly accuse people.",
    technical: "Detectors estimate how statistically predictable text is, which is also true of much plain human writing, and light editing can change the score. Developers have withdrawn their own detectors for low accuracy, including OpenAI's classifier in 2023.",
    whatToDo: "Use drafts, version history and a conversation with the writer, not a detector score, when integrity matters.",
    evidenceIds: [],
    relatedLink: { href: "/learn/practitioner/use-ai-to-study-without-cheating", label: "How to use AI to study without cheating" },
  },
  {
    id: "new-version-better-everywhere",
    theme: "accuracy",
    statement: "Every new AI version is better at every task.",
    verdict: "mostly-myth",
    plain: "New versions usually improve on average, but some tasks get worse, slower or more expensive, and changes can break prompts that used to work.",
    technical: "Updates trade off capability, cost, speed, safety behaviour and style. Maker-reported gains come from chosen tests and settings. Re-run your own test set when a model changes.",
    whatToDo: "Re-test on your own tasks before you switch, and keep the old option until you have.",
    evidenceIds: [],
    relatedLink: { href: "/tools/benchmark-checklist", label: "Benchmark reading checklist" },
  },
  {
    id: "bigger-always-better",
    theme: "accuracy",
    statement: "The biggest model is always the best choice.",
    verdict: "mostly-myth",
    plain: "Larger models often score higher, but a smaller or newer one can beat them on your task, and it can be far cheaper and faster.",
    technical: "Parameter count is one factor beside training data, design, tuning and reasoning settings. Price per task can differ many times over for similar quality on simple work. Compare cost per task, not size.",
    whatToDo: "Shortlist two or three models and test them on your own tasks.",
    evidenceIds: [],
    relatedLink: { href: "/compare/models", label: "Model directory" },
  },

  // ---- Privacy and safety ----
  {
    id: "chats-may-be-stored",
    theme: "privacy-safety",
    statement: "What I type into a chatbot may be stored and, on some plans, used to improve the model.",
    verdict: "fact",
    plain: "Yes. Providers differ on how long they keep chats and whether they train on them, and the default can depend on your plan. Settings often let you switch training use off.",
    technical: "Retention, deletion and training terms are set per provider and per plan. Our privacy matrix tracks them and is refreshed quarterly.",
    whatToDo: "Read the data controls before you paste anything private.",
    evidenceIds: [],
    relatedLink: { href: "/prices/privacy", label: "Privacy matrix" },
  },
  {
    id: "free-chats-private",
    theme: "privacy-safety",
    statement: "My chats with a free AI app are private by default.",
    verdict: "mostly-myth",
    plain: "It depends on the app, the plan and your settings. Some services use chats to improve their models unless you opt out, and some free plans show ads. Treat anything you paste as something you are sharing with a company.",
    technical: "Providers differ on training use, retention, deletion and human review. Business and API plans often have stricter defaults than consumer plans, but terms vary. Read the data controls of the plan you use.",
    whatToDo: "Never paste passwords, ID numbers, health details or client data, and switch off data sharing where you can.",
    evidenceIds: [],
    relatedLink: { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What you should never share with an AI chatbot" },
  },
  {
    id: "deepfakes-easy-to-spot",
    theme: "privacy-safety",
    statement: "Fake voices and videos are easy to spot.",
    verdict: "myth",
    plain: "Cloned voices and fake videos can fool people, and the obvious glitches are shrinking. A scammer may need only a short clip of someone's voice. Careful people are targeted too.",
    technical: "Voice cloning can work from a short sample, and detection tools are unreliable on compressed or edited media. Verification should use a second channel, not how real the media looks or sounds.",
    whatToDo: "Agree a family code word, and call back on a number you already know before sending money.",
    evidenceIds: [],
    relatedLink: { href: "/learn/foundations/ai-scams-and-deepfakes", label: "AI scams and deepfakes: how to spot them" },
  },

  // ---- Work and jobs ----
  {
    id: "ai-took-most-jobs",
    theme: "work-jobs",
    statement: "AI has already taken most jobs.",
    verdict: "myth",
    plain: "Named surveys so far show limited effects. In a June 2026 ISM survey, about three quarters of US manufacturers and services firms said AI had not noticeably changed their hiring or layoff decisions. The picture is shifting, though: see the next claim.",
    technical: "ISM, June 2026: 76% of manufacturers and 73% of services firms report no noticeable effect on hiring or layoffs, and 5% and 9% plan layoffs after introducing AI. A four-country survey of executives (NBER working paper, 2026) found over 90% reporting no employment effect over the previous three years. Firm surveys record what firms say, not total jobs in the economy.",
    whatToDo: "Follow named surveys and official data, not viral job-loss totals.",
    evidenceIds: ["ism-june-2026", "nber-firm-data"],
    relatedLink: { href: "/society/is-ai-taking-jobs", label: "Is AI taking jobs?" },
  },
  {
    id: "ai-no-job-effect",
    theme: "work-jobs",
    statement: "AI will make no difference to jobs.",
    verdict: "myth",
    plain: "The effect is real but uneven. S&P Global's June 2026 survey found slightly more firms reporting AI-related job losses than gains, and large firms expect the biggest net losses.",
    technical: "S&P Global PMI special survey, June 2026: a global net employment effect of -5 percentage points over the past 12 months and -2 forecast for the year ahead. ISM, June 2026: 13% of manufacturers and 9% of services firms say they are not hiring because of AI, while 6% and 9% created new positions.",
    whatToDo: "Build skills that work alongside AI, and ask what your employer plans.",
    evidenceIds: ["sp-global-2026", "ism-june-2026"],
    relatedLink: { href: "/society/is-ai-taking-jobs", label: "Is AI taking jobs?" },
  },
  {
    id: "large-firms-net-job-losses",
    theme: "work-jobs",
    statement: "Large companies expect bigger net job losses from AI than small ones.",
    verdict: "mostly-fact",
    plain: "Yes, in S&P Global's June 2026 survey. Large firms forecast a net employment effect of -13 points for the year ahead, while small firms forecast +3.",
    technical: "Net effect is the share of firms expecting AI to raise headcount minus the share expecting it to cut it. These are managers' expectations, not measured job counts.",
    whatToDo: "Ask which size of firm a headline is about.",
    evidenceIds: ["sp-global-2026"],
    relatedLink: { href: "/society/is-ai-taking-jobs", label: "Is AI taking jobs?" },
  },
  {
    id: "ai-saves-most-of-day",
    theme: "work-jobs",
    statement: "AI saves most of the working day for people who use it.",
    verdict: "mostly-myth",
    plain: "On average the savings are modest. In the St. Louis Fed tracker, AI assisted about 6% of all work hours in 2026, and workers reported saving about 2% of them. Some tasks improve a lot; many barely change.",
    technical: "FRED series: the share of work hours assisted by generative AI was 6.3% in Q2 2026 (4.1% in Q3 2024), and the self-reported share of hours saved was 2.2% (1.6%). These are averages over all employed adults aged 18 to 64, including those who do not use AI, and they rest on self-reports.",
    whatToDo: "Time AI on your own repeat tasks before you plan around a saving.",
    evidenceIds: ["fred-hours", "fred-blog-time"],
    relatedLink: { href: "/learn/practitioner/where-ai-helps-and-fails", label: "Where AI helps and where it fails" },
  },
  {
    id: "only-tech-workers",
    theme: "work-jobs",
    statement: "Only tech workers use AI at work.",
    verdict: "myth",
    plain: "Use is spread across many jobs. In the St. Louis Fed tracker for Q2 2026, more than half of employed adults in real estate, and about seven in ten in management occupations, said they use generative AI for their job.",
    technical: "Industry and occupation series are noisier than the overall series because each has fewer respondents, so a single-quarter jump should not be over-read. The safer takeaway is the broad pattern of rising use across most groups.",
    whatToDo: "Do not wait for your industry to catch up. Try one task this week.",
    evidenceIds: ["fred-industry", "fred-occupation"],
  },

  // ---- School and learning ----
  {
    id: "study-with-ai-cheating",
    theme: "learning",
    statement: "Using AI to study is always cheating.",
    verdict: "depends",
    plain: "It depends on your school's and teacher's rules. Asking an AI to explain, quiz you or check your reasoning is different from handing in text it wrote. When in doubt, ask, and say how you used it.",
    technical: "Policies range from bans to required disclosure. Detectors cannot settle a dispute (see the detector claim), so evidence of process, such as drafts and notes, is more convincing than a score.",
    whatToDo: "Read the policy, ask when unsure, and cite or disclose AI help.",
    evidenceIds: [],
    relatedLink: { href: "/learn/practitioner/use-ai-to-study-without-cheating", label: "How to use AI to study without cheating" },
  },

  // ---- Energy ----
  {
    id: "ai-uses-most-datacentre-power",
    theme: "energy",
    statement: "AI uses most of the electricity that data centres consume.",
    verdict: "mostly-myth",
    plain: "Not yet. Gartner forecasts that AI-optimized servers will use about 31% of data-centre electricity in 2026. Conventional servers and cooling use most of the rest. But AI is the fastest-growing part.",
    technical: "Gartner, June 2026: data-centre electricity of 565 TWh in 2026, up 26% from 447 TWh. AI-optimized servers 175 TWh, conventional servers 195 TWh, cooling and other infrastructure 195 TWh. Gartner expects AI-optimized servers to overtake conventional ones in 2027. These are forecasts.",
    whatToDo: "Look at energy per task and grid impact, not only totals.",
    evidenceIds: ["gartner-2026"],
    relatedLink: { href: "/society/ai-power-use", label: "How much power does AI use?" },
  },
  {
    id: "ai-drives-datacentre-growth",
    theme: "energy",
    statement: "Most of the growth in data-centre electricity use comes from AI servers.",
    verdict: "mostly-fact",
    plain: "Mostly yes. Gartner's figures put AI-optimized servers behind roughly two thirds of the 2026 increase, with cooling and other infrastructure adding most of the rest.",
    technical: "From Gartner's June 2026 table: total 447 to 565 TWh (+118 TWh); AI-optimized servers 95 to 175 TWh (+80 TWh); cooling and other infrastructure 159 to 195 TWh (+36 TWh); conventional servers 193 to 195 TWh. The shares are our arithmetic on a forecast.",
    whatToDo: "Treat the numbers as a forecast, and ask about energy per task.",
    evidenceIds: ["gartner-2026"],
    relatedLink: { href: "/society/ai-power-use", label: "How much power does AI use?" },
  },
  {
    id: "ai-energy-small",
    theme: "energy",
    statement: "AI's energy use is too small to matter.",
    verdict: "myth",
    plain: "Data-centre electricity use is growing fast. Gartner forecasts global data-centre use above 1,200 TWh by 2030 and warns that grid supply may not keep pace. It ties the growth mainly to AI.",
    technical: "Gartner expects data-centre power demand of 132 GW in 2026 and 290 GW by 2030, and electricity use above 1,200 TWh by 2030. Other forecasters publish different figures, so treat any single number as part of a range.",
    whatToDo: "Ask for energy per task and the source of the power, not only totals.",
    evidenceIds: ["gartner-2026"],
    relatedLink: { href: "/society/ai-power-use", label: "How much power does AI use?" },
  },

  // ---- Who uses AI ----
  {
    id: "ai-use-grew-fast",
    theme: "who-uses",
    statement: "Use of AI has grown fast in just two years.",
    verdict: "fact",
    plain: "Yes. The St. Louis Fed tracker has US adults aged 18 to 64 using generative AI rising from 44.6% in Q3 2024 to 61.8% in Q2 2026. Pew's chatbot figure for US adults rose from 33% to 49% between 2024 and 2026.",
    technical: "The two series measure different things: any generative AI use among adults 18 to 64 for the Fed, and chatbot use among all adults for Pew. Both rise, so the direction is more reliable than any single level.",
    whatToDo: "Quote the direction confidently and the level carefully.",
    evidenceIds: ["fred-overall", "pew-2026"],
    relatedLink: { href: "/society/ai-adoption-data", label: "How fast is AI spreading?" },
  },
  {
    id: "hardly-anyone-uses",
    theme: "who-uses",
    statement: "Hardly anyone uses AI chatbots.",
    verdict: "myth",
    plain: "Pew found that 49% of US adults use AI chatbots in a February 2026 survey. The St. Louis Fed tracker, which counts any generative AI use, puts US adults aged 18 to 64 at 61.8% in Q2 2026.",
    technical: "The numbers differ because the questions differ. Pew asks about chatbots among all adults. The Fed's Real-Time Population Survey counts any generative AI use by adults 18 to 64. Microsoft's telemetry-based measure covers ages 15 to 64 and was 31.3% for the US in Q1 2026.",
    whatToDo: "Compare surveys only when they measure the same thing in the same group.",
    evidenceIds: ["pew-2026", "fred-overall", "msft-q1"],
    relatedLink: { href: "/society/ai-adoption-data", label: "How fast is AI spreading?" },
  },
  {
    id: "everyone-uses-daily",
    theme: "who-uses",
    statement: "Most people use AI every day.",
    verdict: "myth",
    plain: "Use is wide but not constant. Pew found that about one in four US adults use chatbots daily, including 12% who use them several times a day.",
    technical: "Pew, survey of 5,119 US adults, February 17 to 23, 2026: 24% use chatbots daily, of whom 12% several times a day and 4% almost constantly. Ever-use (49%) is roughly double daily use.",
    whatToDo: "Be careful with headlines that blur \"has tried it\" and \"uses it daily\".",
    evidenceIds: ["pew-2026"],
    relatedLink: { href: "/society/ai-adoption-data", label: "How fast is AI spreading?" },
  },
  {
    id: "ai-evenly-worldwide",
    theme: "who-uses",
    statement: "AI use is spread evenly around the world.",
    verdict: "myth",
    plain: "Microsoft estimates that 18.8% of the world's working-age population used generative AI in June 2026: 28.8% in the Global North against 16.2% in the Global South.",
    technical: "Microsoft's measure uses aggregated, anonymised telemetry adjusted for operating-system share, internet access and population, for ages 15 to 64. Its Q1 2026 report ranked the UAE first at 70.1% and the United States 21st at 31.3%. Telemetry from one company's products is an estimate, not a census.",
    whatToDo: "Treat country rankings as estimates and check the method.",
    evidenceIds: ["msft-q2", "msft-q1"],
  },

  // ---- Society, fairness and rules ----
  {
    id: "experts-agree-timeline",
    theme: "society-rules",
    statement: "Experts agree on when AI will become smarter than people.",
    verdict: "myth",
    plain: "They do not. Forecasts range from soon to never, and many are educated guesses. Treat any date with caution and look for the reasons behind it.",
    technical: "Forecasts depend on assumptions about progress in models, computing power, energy and rules. Our future-of-AI page treats scenarios as frameworks, not predictions.",
    whatToDo: "Ask what would have to be true for the forecast to hold.",
    evidenceIds: [],
    relatedLink: { href: "/society/future-of-ai", label: "The future of AI: six forces to watch" },
  },
  {
    id: "ai-is-neutral",
    theme: "society-rules",
    statement: "AI is neutral because it is a machine.",
    verdict: "myth",
    plain: "AI learns from human data and design choices, so it can repeat or amplify bias. It can also be tested and improved, which is why checks matter, especially for hiring and credit.",
    technical: "Bias can enter through training data, labels, objectives and how outputs are used. The EU AI Act treats systems used in areas such as hiring, education and credit as high-risk, with duties on testing and oversight.",
    whatToDo: "For decisions about people, ask how the system was tested for fairness and who can appeal.",
    evidenceIds: [],
    relatedLink: { href: "/society/ai-in-banking-and-finance", label: "AI in banking and finance" },
  },
  {
    id: "no-ai-laws",
    theme: "society-rules",
    statement: "There are no laws about AI yet.",
    verdict: "myth",
    plain: "Some places already have AI rules. The EU's AI Act has applied in stages since February 2025. Rules differ widely by country and change often.",
    technical: "The EU AI Act began with bans on some practices and an AI-literacy duty in February 2025, then rules for providers of general-purpose models in August 2025. Later dates have been revised, so see our timeline for the current schedule. This is not legal advice.",
    whatToDo: "Check the rules that apply where you live and work.",
    evidenceIds: [],
    relatedLink: { href: "/news/eu-ai-act", label: "EU AI Act timeline" },
  },
];