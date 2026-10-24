export interface PointEntry {
  headline: string;
  detail: string;
}

export interface ClaimPair {
  id: string;
  boldClaim: string;
  alarmedClaim: string;
  closerToTheEvidence: string;
}

export interface DisagreementEntry {
  topic: string;
  oneView: string;
  otherView: string;
  whatWouldHelp: string;
}

export interface ReaderActions {
  reader: string;
  actions: readonly string[];
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface GlossaryEntry {
  term: string;
  meaning: string;
}

export interface SourceEntry {
  publisher: string;
  title: string;
  href: string | null;
  use: string;
}

export interface RelatedLink {
  href: string;
  label: string;
  note: string;
}

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "There is no single score for AI.", detail: "It is very good at some things and risky at others, so we score nine themes one at a time." },
  { headline: "Most benefits need checking.", detail: "Time saved is real, and so are confident wrong answers. The gain depends on how you use it." },
  { headline: "Some risks are well documented, others are early.", detail: "Privacy, accuracy and scams are well supported. Effects on jobs and skills are still being measured." },
  { headline: "Your choices matter in most themes.", detail: "Settings, habits and rules change the outcome for you, even where the big picture is out of your hands." },
];

export const METHOD_POINTS: readonly PointEntry[] = [
  { headline: "Two sides on every theme.", detail: "Every theme lists benefits and costs, so no page here argues only one side." },
  { headline: "A label, not a number.", detail: "The balance label is our editorial judgement of the net picture today. It is not a measurement, so we do not show a score out of ten." },
  { headline: "Evidence is rated separately.", detail: "A separate label says how strong the evidence is: well supported, mixed or early." },
  { headline: "Named sources only.", detail: "Where we show a figure it comes from a named survey or tracker, with a date. Where we have none, we say so." },
  { headline: "Forecasts are labelled.", detail: "Anything about the future is marked as a forecast and carries uncertainty." },
];

export const CLAIM_PAIRS: readonly ClaimPair[] = [
  { id: "replace", boldClaim: "“AI will replace most jobs soon.”", alarmedClaim: "“AI will create more jobs than it removes, so nobody should worry.”", closerToTheEvidence: "Named surveys so far show modest and mixed effects, and plans for layoffs in a minority of firms. Both claims go further than that evidence, and effects differ by field and by career stage." },
  { id: "truth", boldClaim: "“AI is as reliable as an expert.”", alarmedClaim: "“AI just makes things up.”", closerToTheEvidence: "It is often right and sometimes confidently wrong. How often depends on the task, so check anything that matters." },
  { id: "energy", boldClaim: "“AI's energy use is a rounding error.”", alarmedClaim: "“AI is about to wreck the grid.”", closerToTheEvidence: "Data-centre electricity is rising fast in analyst forecasts, and the share due to AI is uncertain. Efficiency gains and total demand can both be true." },
  { id: "privacy", boldClaim: "“It's private, it's just a chat.”", alarmedClaim: "“AI companies read everything you type.”", closerToTheEvidence: "What is stored, reviewed or used for training depends on the provider, the plan and your settings. Read the provider's own terms." },
  { id: "learning", boldClaim: "“AI makes everyone a better learner.”", alarmedClaim: "“AI makes students lazy.”", closerToTheEvidence: "It can support learning when you try first and ask for feedback, and it can replace learning when you copy answers. Long-term evidence is still thin." },
];

export const DISAGREEMENTS: readonly DisagreementEntry[] = [
  { topic: "How fast AI will improve", oneView: "Progress will continue at pace, with large effects within a few years.", otherView: "Progress will slow as easy gains run out and costs rise.", whatWouldHelp: "Independent benchmarks that are re-run on fresh tasks over time." },
  { topic: "Jobs", oneView: "AI will mainly change tasks and lift productivity, with new roles appearing.", otherView: "Entry-level and routine work will shrink faster than new work appears.", whatWouldHelp: "Measured employment data by occupation and age, not only manager surveys." },
  { topic: "Energy", oneView: "Efficiency gains will offset much of the growth in demand.", otherView: "Total demand will outrun efficiency and strain grids.", whatWouldHelp: "Separate reporting of AI and non-AI data-centre use." },
  { topic: "Regulation", oneView: "Clear rules build trust and protect people.", otherView: "Heavy rules slow useful tools and favour large firms.", whatWouldHelp: "Comparing outcomes across places with different rules." },
];

export const HEADLINE_QUESTIONS: readonly PointEntry[] = [
  { headline: "Who measured it?", detail: "A named survey or tracker with a method beats an unnamed “study” or a screenshot." },
  { headline: "When?", detail: "AI changes quickly. A number from two years ago may describe different tools." },
  { headline: "What exactly was counted?", detail: "“Uses AI”, “has tried AI” and “relies on AI daily” are different claims." },
  { headline: "Who was asked?", detail: "Managers, workers, adults and teenagers answer differently, and so do different countries." },
  { headline: "Is it a measurement or a forecast?", detail: "Forecasts carry uncertainty. Treat a single confident number about 2030 with care." },
  { headline: "Who gains if you believe it?", detail: "Vendors, campaigners and advertisers all have reasons to pick a number." },
];

export const READER_ACTIONS: readonly ReaderActions[] = [
  { reader: "Everyone", actions: ["Keep passwords, IDs and private details out of chats.", "Check facts, numbers and quotes that matter.", "Agree a family code word for emergency calls.", "Choose your data settings on purpose."] },
  { reader: "Students and parents", actions: ["Try first, then use AI for feedback.", "Follow the school's AI rules and cite your use.", "Set up children's tools together and talk about what not to share."] },
  { reader: "Workers and job seekers", actions: ["Learn the tools used in your field.", "Keep building skills that need judgement and people.", "Never paste client or employer data into a personal account."] },
  { reader: "Small business owners", actions: ["Name one person responsible for AI use.", "Write a one-page rule on what staff may paste where.", "Have a person review anything AI-written before it reaches a customer."] },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "So is AI good or bad?", answer: "Neither on its own. The honest answer is theme by theme: clear gains in some, well-documented risks in others, and several areas where it is too early to say." },
  { question: "Why no score out of ten?", answer: "A single number would suggest precision we do not have. A balance label plus a separate evidence label is easier to defend and easier to update." },
  { question: "Who decides the balance labels?", answer: "Our editorial team, based on the evidence and the size of what is at stake. They are judgements, they are dated, and they can change when evidence changes." },
  { question: "Does this page take a side on regulation or politics?", answer: "No. We describe benefits, costs and where experts disagree, and we avoid recommending a policy position." },
  { question: "Where do the numbers come from?", answer: "Only from named surveys and trackers, shown with their publisher and date. The Gartner, S&P Global, ISM and adoption figures are listed under sources." },
  { question: "Why is the environment label “mixed”?", answer: "Total data-centre electricity is forecast to rise, which is a real cost. Efficiency per task is improving, and the AI share of the total is uncertain, so we avoid a stronger label." },
  { question: "Can AI help the environment as well as harm it?", answer: "Both can be true. AI may help optimise some energy systems, and it also adds demand. The net effect depends on efficiency, total use and what it is used for." },
  { question: "How often is this page updated?", answer: "Every few months, and sooner when a named source releases new figures. The reviewed date is at the top of the page." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Hallucination", meaning: "An answer that sounds right but is invented or wrong." },
  { term: "Bias", meaning: "A pattern where a system works worse or treats people differently by group, often inherited from its data." },
  { term: "Training data", meaning: "The material a model learns from." },
  { term: "Inference", meaning: "Running a trained model to answer a request. It happens every time you use it." },
  { term: "Terawatt-hour (TWh)", meaning: "A unit of electricity: one trillion watt-hours." },
  { term: "Net employment effect", meaning: "The overall change in jobs after counting both those lost and those created." },
  { term: "Prompt injection", meaning: "Hidden instructions in a web page, email or file that trick an AI into doing something you did not ask for." },
  { term: "Forecast", meaning: "A statement about the future. It carries uncertainty and can be wrong." },
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "Gartner", title: "Data-centre electricity forecast, June 2026", href: null, use: "Electricity figures: 447 TWh (2025), 565 TWh (2026), forecast above 1,200 TWh by 2030" },
  { publisher: "S&P Global", title: "Survey of managers on AI and employment, June 2026", href: null, use: "Modestly negative net employment effect among surveyed managers" },
  { publisher: "ISM", title: "Survey of manufacturers and services firms, June 2026", href: null, use: "5% of manufacturers and 9% of services firms plan layoffs after introducing AI" },
  { publisher: "Fed-hosted adoption tracker", title: "US generative AI adoption, adults aged 18 to 64", href: null, use: "Share of adults using generative AI, Q3 2024 and Q2 2026" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/society/weigh-up", label: "Pros and cons weigh-up", note: "Interactive: tick what matters to you" },
  { href: "/society/is-ai-taking-jobs", label: "Is AI taking jobs? What current surveys actually say", note: "Article 34" },
  { href: "/society/ai-power-use", label: "How much power does AI use?", note: "Article 37" },
  { href: "/society/ten-places-you-meet-ai", label: "Ten places you meet AI in a normal day", note: "Article 31" },
  { href: "/society/ai-myths-and-facts", label: "AI myths and facts", note: "Article 42" },
  { href: "/learn/practitioner/fact-check-ai-answers", label: "How to fact-check AI answers", note: "Level 2 guide" },
  { href: "/learn/foundations/ai-scams-and-deepfakes", label: "AI scams and deepfakes", note: "Level 1 safety" },
  { href: "/tools/ai-safety-checklist", label: "AI safety checklist", note: "For individuals, schools and businesses" },
];