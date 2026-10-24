import type { DefinitionItem, FaqItem } from "./compareStandards";

export interface ReaderPath {
  id: string;
  question: string;
  pageLabel: string;
  href: string;
  description: string;
}

/** Helps any reader pick the right kind of Compare page. */
export const READER_PATHS: readonly ReaderPath[] = [
  { id: "not-sure", question: "I do not know which model to try", pageLabel: "Best-for roundups", href: "/compare/best", description: "Start with the job you want done, such as coding or writing, and get a shortlist." },
  { id: "two-finalists", question: "I have it down to two models", pageLabel: "Head-to-head (this page)", href: "#matchups", description: "Both models get the same ten tasks on the same day, with a winner per task and a cost per task." },
  { id: "one-model", question: "I want the full picture of one model", pageLabel: "Model reviews", href: "/compare/reviews", description: "One fixed layout with a scorecard, who should skip it, safety notes and a verdict." },
  { id: "numbers", question: "I only want prices, context and scores", pageLabel: "Model directory", href: "/compare/models", description: "Every named model in one table, with filters and a cost-per-task comparison." },
  { id: "switching", question: "I want to leave a tool I use now", pageLabel: "Alternatives", href: "/compare/alternatives", description: "Why people switch, the best options, what you give up and a switching checklist." },
  { id: "hosting", question: "I am weighing hosted against open-weight models", pageLabel: "Open vs closed", href: "/compare/open-vs-closed", description: "Cost, privacy, licences and hardware for downloadable models." },
];

/** Blueprint 5.3: the sections of every matchup page. */
export const MATCHUP_SECTIONS: readonly DefinitionItem[] = [
  { id: "summary", term: "Summary box", description: "The winner overall and the winner on cost, so you get the answer before you scroll." },
  { id: "tasks", term: "The same ten tasks", description: "A table with the task, the winner and the reason, one row per task." },
  { id: "cost", term: "Cost per task", description: "What each model costs to finish the tasks, not only the price per token." },
  { id: "settings", term: "Settings and test date", description: "The model version, the effort setting and the day the tests ran." },
  { id: "verdict", term: "Verdict", description: "Our conclusion, written after the tests, including who should pick which model." },
  { id: "alternatives", term: "Alternatives", description: "Other models worth testing against, with links to their reviews." },
];

/** What makes a head-to-head fair. Based on Blueprint 5.3 and 6.6; the wording is ours. */
export const HOW_WE_RUN: readonly DefinitionItem[] = [
  { id: "same-tasks", term: "Same ten tasks", description: "Both models get exactly the same tasks, so neither can win by being given an easier job." },
  { id: "same-day", term: "One test day", description: "Both models are tested on the same day, so a change to one of them in between cannot tilt the result." },
  { id: "settings", term: "Settings recorded", description: "The model version and the effort setting are written down for each model, and each model uses its maker's recommended settings." },
  { id: "labels", term: "Labelled results", description: "Every result is marked tested by us, independent third party or vendor-reported. Vendor numbers never sit in the same column as ours." },
  { id: "cost", term: "Cost per task", description: "A model with a cheap token price can still cost more per task if it needs more tokens to finish." },
  { id: "scorecard", term: "Same scorecard", description: "Tasks come from the same areas as the seven-point scorecard used in the reviews, so the results line up with each review." },
];

/** The ten tasks are drawn from the seven scorecard areas (Blueprint 6.6). The exact list is published on each matchup. */
export const TASK_AREAS: readonly DefinitionItem[] = [
  { id: "accuracy", term: "Accuracy", description: "Factual questions, with the sources checked by hand." },
  { id: "reasoning", term: "Reasoning and maths", description: "A fixed set of problems." },
  { id: "writing", term: "Writing and instruction following", description: "Drafts with strict format limits." },
  { id: "coding", term: "Coding and tool use", description: "A small repository task." },
  { id: "long-documents", term: "Long documents", description: "A PDF summary and a question about a distant page." },
  { id: "cost-privacy", term: "Cost and privacy checks", description: "What the task costs, plus training settings, data retention and plan limits." },
];

export const HOW_WINNERS_ARE_PICKED: readonly DefinitionItem[] = [
  { id: "per-task", term: "A winner per task", description: "Each of the ten tasks has its own winner and a one-line reason, so you can see where each model is strong." },
  { id: "overall", term: "Winner overall", description: "The model that wins more of the tasks, with the reasons written out. Where it is close, the verdict says so." },
  { id: "cost", term: "Winner on cost", description: "Named separately, because the best answer and the cheapest answer are often different models." },
  { id: "ties", term: "Ties are allowed", description: "If two answers are equally good, the row says so instead of forcing a winner." },
  { id: "scope", term: "A winner for that day", description: "A result describes these tasks, on that day, with those settings. It is not a ranking for every use." },
];

export const HOW_TO_READ_A_MATCHUP: readonly DefinitionItem[] = [
  { id: "summary", term: "Start with the summary box", description: "It gives the two winners, overall and on cost, so you can decide whether to read on." },
  { id: "rows", term: "Scan the task rows for your own work", description: "If you write code all day, the coding row matters more than the overall winner." },
  { id: "margins", term: "Look at how close it was", description: "A win by a small margin on a few tasks is nearly a tie." },
  { id: "cost", term: "Compare cost per task", description: "Multiply the cost of one task by how many you will do in a month." },
  { id: "dates", term: "Check the test date and settings", description: "Models and prices change. An old matchup is a lead, not a current answer." },
  { id: "own-test", term: "Repeat it with your own tasks", description: "Ten of your own tasks beat any general test for your own decision." },
];

export const WHEN_NOT_TO_USE: readonly string[] = [
  "You have not yet narrowed the field. Start with a best-for roundup instead.",
  "You need a full safety, privacy and limits picture of one model. Read its review.",
  "You are choosing between a hosted model and one you run yourself. See open vs closed.",
  "You need image or video tools. The directory and these matchups cover text models.",
  "You want to compare plans, not models. Use the consumer plan table.",
];

export const MATCHUP_LIMITS: readonly string[] = [
  "A matchup is a set of ten tasks on one day. A different set could favour the other model.",
  "The two models are tested at the settings recorded on the page. Other effort settings can change the result.",
  "Prices are list prices on the date shown. Introductory and off-peak rates are noted where they apply.",
  "The on-paper comparison on this page uses independent scores and list prices. It is not a test result.",
];

export const IDEA_SELECTION_RULES: readonly string[] = [
  "Both models are in the model directory, and from different makers.",
  "Both have the same input and output list price, so the question is quality, not price.",
  "Introductory rates and price notes are shown, because they can change the comparison after a date.",
];

/** Blueprint 6.4: how often matchups are touched. */
export const MATCHUP_UPDATE_RULES: readonly DefinitionItem[] = [
  { id: "launch", term: "A new model launches", description: "Matchups the model could affect are re-read. A replaced model is marked Superseded and links to its successor." },
  { id: "price", term: "A price, plan or limit changes", description: "A price-change note goes out within 24 hours, then the cost per task is updated." },
  { id: "quarter", term: "Every quarter", description: "The full test battery is re-run, so matchups rest on fresh results." },
  { id: "dates", term: "Every matchup shows its dates", description: "Tested on and Verified on appear at the top of the page." },
];

export const REQUEST_CHECKLIST: readonly string[] = [
  "The two models you want compared, with their versions if you know them",
  "What you will use them for, for example writing, coding or studying",
  "Why this pair matters to you, for example a price or a plan you are considering",
  "Anything the test must include, such as long documents or a certain file type",
];

export const HEAD_TO_HEAD_FAQ: readonly FaqItem[] = [
  { id: "why-one", question: "Why is there only one matchup at launch?", answer: "Each matchup needs a full test day on two models. We start with the pair readers ask about most, Claude Opus 5.5 and GPT-6.1 Sol, and add more after launch." },
  { id: "on-paper", question: "Is the on-paper comparison a test result?", answer: "No. It compares list prices, the cost of an example task and the independent BenchLM score from the model directory. It helps you choose a pair to test, and a full matchup replaces it once published.", link: { label: "Open the model directory", href: "/compare/models" } },
  { id: "ten-tasks", question: "What are the ten tasks?", answer: "Everyday tasks drawn from the same areas as the seven-point scorecard: accuracy, reasoning, writing, coding, long documents, cost and privacy. The exact list is on each matchup page.", link: { label: "How we test", href: "/about/how-we-test" } },
  { id: "who-wins", question: "How do you decide who wins?", answer: "Each task has its own winner and a one-line reason. The overall winner is the model that wins more tasks, and the winner on cost is named separately." },
  { id: "same-price", question: "Why suggest pairs with the same price?", answer: "When two models cost the same, the only question left is quality. That makes the result easy to act on. Pairs with different prices are still worth testing, and the cost per task shows the trade-off." },
  { id: "request", question: "Can I ask for a matchup?", answer: "Yes. Use the contact page and include the two models and what you use them for. We cannot promise every request, but each one helps us choose.", link: { label: "Contact us", href: "/contact" } },
  { id: "pay", question: "Can a maker pay to be matched against a rival?", answer: "No. Payment never changes a score or verdict, and makers get no pre-publication access.", link: { label: "Independence and disclosure", href: "/about/independence" } },
  { id: "stale", question: "What if a matchup is out of date?", answer: "Every matchup shows its test date. When a model is replaced it is marked Superseded and links to its successor, instead of being deleted." },
];