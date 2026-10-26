export interface ReaderPath {
  id: string;
  title: string;
  who: string;
  points: readonly string[];
  link: { href: string; label: string };
}

export interface HierarchyLevel {
  rank: number;
  title: string;
  whatCounts: string;
  howWeUse: readonly string[];
  limits: readonly string[];
  label: string;
}

export interface LabelEntry {
  label: string;
  meaning: string;
  whereSeen: string;
}

export interface LabelGroup {
  id: string;
  title: string;
  intro: string;
  entries: readonly LabelEntry[];
}

export interface SourceLinePart {
  part: string;
  example: string;
  meaning: string;
}

export interface StepEntry {
  title: string;
  detail: string;
}

export interface ConflictExample {
  pattern: string;
  whatWeDo: string;
  link: { href: string; label: string };
}

export interface PageSourceRow {
  page: string;
  href: string;
  primarySource: string;
  updated: string;
}

export interface CadenceRow {
  trigger: string;
  published: string;
  deadline: string;
}

export interface TermEntry {
  term: string;
  meaning: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface LinkEntry {
  title: string;
  href: string;
  note: string;
}

export const SHORT_ANSWER: readonly string[] = [
  "Every price, date, score and statistic on this site comes from a named source that we opened and dated, and the page says which.",
  "We use the first source that answers the question: the provider's own page, then independent evaluators that publish their method, then our own tests. Blogs and roundups are leads, never the only source of a number.",
  "Vendor-reported numbers and independent numbers are always labelled, and they never share a column.",
  "When sources disagree, the provider's own page decides facts about its own products. We note the conflict on the page and in the changelog.",
  "A chatbot's answer, an unsourced total or a social post is never a source, and neither is an AI tool that helps us draft.",
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "check",
    title: "I want to know if a number here is reliable",
    who: "Any reader",
    points: [
      "Look at the source line under the table or claim: it names the publisher, the date and how we read it.",
      "Check the label on any score: tested by us, independent third party or vendor-reported.",
      "Try the source checker to see how we would treat a source you have found yourself.",
      "A number marked as a lead has not been confirmed on the source's own page.",
    ],
    link: { href: "#checker", label: "Open the source checker" },
  },
  {
    id: "cite",
    title: "I want to cite or reuse a figure",
    who: "Students, writers, analysts and teachers",
    points: [
      "Quote the figure with its source, its verified-on date and its label.",
      "Cite the original publisher where our page names one.",
      "Never put a vendor number beside an independent one without the labels.",
      "Check the verified-on date: figures change.",
    ],
    link: { href: "#source-line", label: "See how to read a source line" },
  },
  {
    id: "report",
    title: "I think a number is wrong, or I represent a provider or evaluator",
    who: "Readers, makers and evaluators",
    points: [
      "Report the page, the figure and the source you checked on the corrections page.",
      "Makers and evaluators can point us to their own page. We confirm against it.",
      "Payment never changes a score, a verdict or which source we use.",
      "Corrections are logged with the date reported and the date fixed.",
    ],
    link: { href: "/about/corrections", label: "Report an error" },
  },
];

export const HIERARCHY_LEVELS: readonly HierarchyLevel[] = [
  {
    rank: 1,
    title: "Provider page",
    whatCounts: "The maker's own pricing, model or documentation page, opened on the day.",
    howWeUse: [
      "The main source for prices, plan limits, features, dates and terms of the provider's own products.",
      "Cloud platforms such as Amazon Bedrock, Microsoft Foundry and Google Vertex AI count as the provider for what they sell. Their own page decides for their platform.",
      "A maker's performance claims are shown, labelled Vendor-reported.",
    ],
    limits: [
      "A page can change without notice or disagree with another page by the same maker.",
      "Authoritative about its own product does not mean always right or complete.",
    ],
    label: "Read on the source's own page",
  },
  {
    rank: 2,
    title: "Independent evaluators",
    whatCounts: "Evaluators that publish their method: benchmark aggregators and human-preference arenas.",
    howWeUse: [
      "The main source for performance scores in our directory and benchmark digest.",
      "Labelled Independent third party, with vote counts and margins shown where the evaluator publishes them.",
      "Always read as a shortlist, not a verdict.",
    ],
    limits: [
      "Methods, weights and dates differ between evaluators, so scores differ.",
      "A composite score can hide trade-offs between tasks.",
    ],
    label: "Independent third party",
  },
  {
    rank: 3,
    title: "Our tests",
    whatCounts: "Our own test battery, with the date, the model version and the effort setting recorded.",
    howWeUse: [
      "The source for our reviews and head-to-head comparisons.",
      "Labelled Tested by us, with a Tested on date.",
      "Re-run on a schedule, so a result does not outlive its model.",
    ],
    limits: [
      "A small set of tasks on one day cannot cover every use.",
      "Settings matter, so a result belongs to one version and one setting.",
    ],
    label: "Tested by us",
  },
  {
    rank: 4,
    title: "Secondary blogs and roundups",
    whatCounts: "Blogs, roundups and news reports that repeat someone else's number.",
    howWeUse: [
      "Leads only: they help us find the primary source.",
      "Never the sole source of a number.",
    ],
    limits: [
      "Copy errors, stale figures and affiliate motives are common.",
      "A quote of a source is not the source.",
    ],
    label: "Read through a reprint or tracker",
  },
];

export const SOCIETY_NOTE =
  "For society and policy topics such as adoption, jobs, energy and law, the original publisher plays the part of the provider page: the official tracker, the named survey's own page or the official text of a rule.";

export const LABEL_GROUPS: readonly LabelGroup[] = [
  {
    id: "result",
    title: "Result labels",
    intro: "Who produced a score. Vendor numbers never share a column with independent ones.",
    entries: [
      { label: "Tested by us", meaning: "Our own test run, with the date, model version and effort setting recorded.", whereSeen: "Reviews and head-to-head comparisons" },
      { label: "Independent third party", meaning: "An evaluator that publishes its method, such as a benchmark aggregator or a human-preference arena.", whereSeen: "Model directory and benchmark digest" },
      { label: "Vendor-reported", meaning: "The number comes from the maker's own announcement.", whereSeen: "Benchmark digest, in its own table" },
    ],
  },
  {
    id: "freshness",
    title: "Freshness labels",
    intro: "How current something is.",
    entries: [
      { label: "Verified on", meaning: "The date we checked the prices and facts against the source.", whereSeen: "Data pages, reviews and articles" },
      { label: "Tested on", meaning: "The date our own test run happened, with the model version and effort setting.", whereSeen: "Reviews and comparisons" },
      { label: "Superseded", meaning: "The model or plan has been replaced. The page links to its successor instead of being deleted.", whereSeen: "Reviews, roundups and the retirements tracker" },
    ],
  },
  {
    id: "source-check",
    title: "Source-check badges",
    intro: "How closely we read the source behind a figure.",
    entries: [
      { label: "Read on the source's own page", meaning: "We opened the original page on the date shown and confirmed the figure.", whereSeen: "Next to a figure or in an evidence table" },
      { label: "Read through a reprint or tracker", meaning: "We saw the figure second-hand. It is a lead until confirmed on the source.", whereSeen: "Next to a figure or in an evidence table" },
      { label: "Not checked", meaning: "General knowledge. No figure rests on it.", whereSeen: "Claims with no single dated source" },
    ],
  },
];

export const SOURCE_LINE_EXAMPLE =
  "Source: Provider, \u201CPlans and pricing\u201D \u00B7 Verified on October 25, 2026 \u00B7 Read on the source's own page";

export const SOURCE_LINE_PARTS: readonly SourceLinePart[] = [
  { part: "Publisher and page", example: "Provider, \u201CPlans and pricing\u201D", meaning: "Who published it and which page we opened. The link goes to that page." },
  { part: "Verified on", example: "Verified on October 25, 2026", meaning: "The day we opened the page and confirmed the figure." },
  { part: "Source-check badge", example: "Read on the source's own page", meaning: "How closely we read it: on the original, through a reprint, or not at all." },
  { part: "Result label", example: "Independent third party", meaning: "Only on scores: who produced the number." },
];

export const CITE_US_FORMAT =
  "AI Tools for Everyday People, \u201C[page title]\u201D, verified on [date], [page address]. Original source: [publisher and title].";

export const VENDOR_RULES: readonly string[] = [
  "Every vendor-reported number carries the label Vendor-reported next to it.",
  "Vendor numbers sit in their own table or column, never mixed with independent numbers.",
  "We never average, rank or colour-code vendor and independent numbers together.",
  "If an independent evaluator later publishes a score for the same model, it goes in the independent column. The vendor number stays, labelled.",
  "Where the maker publishes the conditions behind a number, such as settings, attempts or tools, we show them.",
];

export const RESOLUTION_STEPS: readonly StepEntry[] = [
  { title: "Spot the conflict", detail: "Two sources give different values for the same thing, date or version." },
  { title: "Check they describe the same thing", detail: "Same plan, country, billing period, model version, platform and date. Many conflicts are really two different questions." },
  { title: "Go to the provider", detail: "Provider-level resolution: for a fact about a provider's own product, its page decides. For a cloud platform, that platform's own page decides for that platform." },
  { title: "If the provider is unclear", detail: "Use its most recent dated statement. If there is none, we do not publish the figure as fact. We may show it clearly marked as an unconfirmed lead." },
  { title: "Show the conflict", detail: "A note on the entry says what differs and which source we used." },
  { title: "Record it", detail: "The changelog gets a dated line: what changed, the sources, and the one we followed." },
];

export const CONFLICT_EXAMPLES: readonly ConflictExample[] = [
  {
    pattern: "A blog and the provider's pricing page show different prices.",
    whatWeDo: "We use the provider's page, add the verified-on date, and note the older figure in the changelog.",
    link: { href: "/prices/plans", label: "Consumer plan table" },
  },
  {
    pattern: "Two cloud platforms list different retirement dates for the same model.",
    whatWeDo: "Each platform's own page decides for that platform. We show one row per platform, not one blended date.",
    link: { href: "/prices/retirements", label: "Retirements tracker" },
  },
  {
    pattern: "A launch post claims a benchmark lead and an independent evaluator shows a smaller gap.",
    whatWeDo: "We show both, in separate tables, with their labels. We do not average them or pick the more flattering one.",
    link: { href: "/prices/benchmarks", label: "Benchmark digest" },
  },
  {
    pattern: "Two independent evaluators rank the same models differently.",
    whatWeDo: "We show both with their method notes and explain the differences, such as tests, dates and settings. A score is a shortlist, not a verdict.",
    link: { href: "/tools/benchmark-checklist", label: "Benchmark reading checklist" },
  },
  {
    pattern: "The only source we can find for a number is a secondary roundup.",
    whatWeDo: "We treat it as a lead and look for the primary page. Until we reach it, the number is not presented as fact and may appear only marked as an unconfirmed lead.",
    link: { href: "/news/changelog", label: "Changelog" },
  },
];

export const NOT_USED: readonly string[] = [
  "Chatbot answers and AI-written summaries. They can be wrong and sound sure.",
  "Statistics with no named publisher, date or method.",
  "Social posts, forum threads and videos as a sole source. They can alert us to something, and we then look for the original.",
  "Screenshots and quotes we cannot trace to the original page.",
  "Sponsor or affiliate claims as evidence. Payment never changes a score, a verdict or which source we use.",
  "Our own notes or memory. A number is re-checked against its source before it is published.",
];

export const EVALUATOR_CRITERIA: readonly string[] = [
  "It publishes its method: the tests, the scoring rule and the settings.",
  "It names the model versions and effort settings it tested.",
  "It dates its results and says when they were last updated.",
  "It states sample sizes, vote counts or margins where they apply.",
  "It does not make or sell a model that it ranks.",
];

export const PAGE_SOURCE_MAP: readonly PageSourceRow[] = [
  { page: "Model directory", href: "/compare/models", primarySource: "Provider pages for price and context; an independent composite for scores", updated: "Any model launch or price change" },
  { page: "Consumer plan table", href: "/prices/plans", primarySource: "Providers' own pricing pages", updated: "Any plan change" },
  { page: "API prices and cost per task", href: "/prices/api", primarySource: "Providers' own pricing pages", updated: "Monthly, or on a price change" },
  { page: "Free-plan limits", href: "/prices/free-limits", primarySource: "Providers' own pages", updated: "Monthly" },
  { page: "Feature matrix", href: "/prices/features", primarySource: "Providers' own pages", updated: "Monthly" },
  { page: "Privacy matrix", href: "/prices/privacy", primarySource: "Providers' privacy and data-control pages", updated: "Quarterly" },
  { page: "Retirements tracker", href: "/prices/retirements", primarySource: "Maker deprecation pages, and each cloud platform's own page", updated: "Weekly" },
  { page: "Benchmark digest", href: "/prices/benchmarks", primarySource: "Independent evaluators, with vendor-reported scores in a separate table", updated: "Weekly" },
  { page: "Model reviews", href: "/compare/reviews", primarySource: "Our own tests, plus provider pages for price and limits", updated: "Within 7 days of our test run" },
  { page: "AI & Society articles", href: "/society", primarySource: "Named surveys and official trackers", updated: "Dated on each article" },
  { page: "EU AI Act timeline", href: "/news/eu-ai-act", primarySource: "The official text. Not legal advice.", updated: "When the rules or dates change" },
  { page: "Changelog", href: "/news/changelog", primarySource: "Our own record of every change", updated: "Every update" },
];

export const UPDATE_CADENCE: readonly CadenceRow[] = [
  { trigger: "A new frontier or popular model is released", published: "A \"what changed and should you care?\" post (300 to 500 words) and a directory row", deadline: "Within 48 hours" },
  { trigger: "The same model, after our own test run", published: "A full review with scorecard and test date", deadline: "Within 7 days" },
  { trigger: "A price, plan or limit change", published: "A price-change note, then the plan and cost tables", deadline: "Within 24 hours" },
  { trigger: "Safety, privacy or policy news", published: "A short explainer linked to the relevant guide", deadline: "Within 3 days" },
  { trigger: "Every week", published: "The weekly roundup, also sent as the newsletter", deadline: "Fixed weekday" },
  { trigger: "Every month", published: "A review of every best-for page and the free-limits table", deadline: "First week" },
  { trigger: "Every quarter", published: "The full test battery re-run and the privacy matrix refreshed", deadline: "Fixed dates" },
];

export const GOTCHAS: readonly string[] = [
  "A source can change after we check it. Always read the verified-on date.",
  "A provider's page is authoritative about its own product, not always right or complete.",
  "Independent means someone else ran it and showed how. It does not mean error-free or unbiased.",
  "Labels simplify. Open the source for the detail.",
  "Prices, features and plan names differ by country and plan.",
  "We can miss a source or a change. Tell us on the corrections page.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Why does the provider's page come first?", answer: "For facts about its own product, such as price, plan limits, dates and terms, the maker is the authority. For performance, the maker's numbers are shown but labelled Vendor-reported, and independent evaluators and our tests carry the weight." },
  { question: "What does \"verified on\" mean?", answer: "The day we opened the source and confirmed the figure. If the date is old, check the source again." },
  { question: "What if the provider's page looks wrong?", answer: "We still use it, because it decides facts about its own product. If it conflicts with another page by the same maker, we note the conflict. We do not swap in a blog." },
  { question: "Do you use AI to find sources?", answer: "We may use AI tools to help find and summarise material. An AI answer is never a source: every figure links to the page we opened." },
  { question: "Why are vendor and independent numbers in different columns?", answer: "Makers choose which tests, settings and results to show. Keeping their numbers apart stops them being read as independent evidence." },
  { question: "Do sponsors or affiliates affect which sources you use?", answer: "No. Payment never changes a score, a verdict or which source we use. See Independence and disclosure." },
  { question: "What is a lead?", answer: "A pointer to where the primary source probably is. It helps us look, and it is never the only source of a number." },
  { question: "How do I cite a figure from this site?", answer: "Use the format shown under the source line, and cite the original publisher where our page names one." },
  { question: "How often are sources re-checked?", answer: "It depends on the page. The cadence table shows deadlines for each trigger, and the changelog records every update." },
  { question: "Can a provider send you a correction?", answer: "Yes. Send it through the corrections page with a link to their page. We confirm against it before we change anything." },
];

export const GLOSSARY: readonly TermEntry[] = [
  { term: "Provider", meaning: "The company that makes or sells a model, plan or platform." },
  { term: "Primary source", meaning: "The original page or document where a figure is first published." },
  { term: "Secondary source", meaning: "A page that reports someone else's figure, such as a blog or news article." },
  { term: "Lead", meaning: "A secondary pointer that helps us find the primary source." },
  { term: "Independent evaluator", meaning: "A third party that runs tests or collects votes and publishes how." },
  { term: "Benchmark aggregator", meaning: "A site that collects or combines scores from several tests into one view." },
  { term: "Human-preference arena", meaning: "A site that ranks models from people's blind votes between answers." },
  { term: "Vendor-reported", meaning: "A number published by the model's maker." },
  { term: "Verified on", meaning: "The date we last checked a figure against its source." },
  { term: "Superseded", meaning: "Replaced by a newer model or plan. Kept, with a link to its successor." },
  { term: "Provider-level resolution", meaning: "Settling a conflict by going to the provider's own page for that product or platform." },
  { term: "Changelog", meaning: "Our dated list of what changed on the site and why." },
];

export const METHOD_NOTES: readonly string[] = [
  "This policy applies to every page on the site. A page that departs from it says so.",
  "The four-level hierarchy is applied to the question being asked: facts about a product go to the provider, performance goes to independent evaluators and our tests.",
  "The source checker applies the same rules in a simplified form. It is a guide, not a ruling.",
  "Nothing you choose in the source checker is sent or saved.",
  "We update this page when the policy changes, and note the change in the changelog.",
];

export const RELATED_LINKS: readonly LinkEntry[] = [
  { title: "About us", href: "/about", note: "Who runs the site and why." },
  { title: "Editorial standards", href: "/about/editorial-standards", note: "How pages are written and checked." },
  { title: "How we test", href: "/about/how-we-test", note: "The test battery and result labels." },
  { title: "Independence and disclosure", href: "/about/independence", note: "Affiliates, sponsors and our promise." },
  { title: "Corrections policy and log", href: "/about/corrections", note: "Report an error and see what changed." },
  { title: "Changelog", href: "/news/changelog", note: "Every update, with sources." },
  { title: "Benchmark reading checklist", href: "/tools/benchmark-checklist", note: "Ten questions before you trust a score." },
  { title: "AI myths and facts", href: "/society/ai-myths-and-facts", note: "Claims checked against named sources." },
];