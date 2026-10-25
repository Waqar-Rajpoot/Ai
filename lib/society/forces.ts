export type ForceId = "model-progress" | "adoption" | "energy" | "work" | "rules" | "autonomy";
export type ScenarioId = "gradual" | "rapid" | "constrained";
export type EvidenceKind = "Measured" | "Projected" | "Estimate" | "In law";

export interface ForceFact {
  text: string;
  kind: EvidenceKind;
  source: string;
  date: string;
}

export interface ForceSignal {
  name: string;
  source: string;
  cadence: string;
  href?: string;
}

export interface Force {
  id: ForceId;
  number: number;
  title: string;
  question: string;
  summary: string;
  facts: readonly ForceFact[];
  unknowns: readonly string[];
  upside: string;
  risk: string;
  signals: readonly ForceSignal[];
  /** The technical layer, shown inside a "Go deeper" disclosure. */
  deeper: readonly string[];
  readMore: { label: string; href: string };
}

export interface Scenario {
  id: ScenarioId;
  title: string;
  oneLiner: string;
  story: string;
  forces: Record<ForceId, string>;
  /** Today's evidence that fits this scenario. */
  fits: readonly string[];
  /** Today's evidence that does not fit this scenario. */
  doesNotFit: readonly string[];
  /** Signals that would make this scenario more likely. */
  watch: readonly string[];
  /** A habit that helps if this scenario plays out. */
  doNow: string;
}

export const FORCES: readonly Force[] = [
  {
    id: "model-progress",
    number: 1,
    title: "Model progress",
    question: "How much more capable will AI models become, and how fast?",
    summary:
      "Progress shows up in what models can do, how long they can work on a task, and what they cost. It is the hardest force to measure, because every test eventually becomes too easy.",
    facts: [
      { text: "METR measures the length of software tasks that AI agents finish with 50% reliability. That length doubled about every 7 months over 2019 to 2025.", kind: "Estimate", source: "METR", date: "March 2025" },
      { text: "In January 2026 METR updated its method and put the doubling time since 2023 at about 131 days, roughly 4 months, faster than the long-run trend.", kind: "Estimate", source: "METR, Time Horizon 1.1", date: "January 2026" },
      { text: "METR says even its updated task suite has few tasks the latest models cannot do, so estimates for the newest models carry wide uncertainty.", kind: "Estimate", source: "METR, Time Horizon 1.1", date: "January 2026" },
    ],
    unknowns: [
      "Whether the doubling continues, slows or speeds up",
      "Whether results on test tasks match results on messy real work",
      "How reliable models are at higher success rates than 50%",
      "How much the cost per task falls",
    ],
    upside: "More capable assistants for research, coding, tutoring and analysis, at a lower cost per task.",
    risk: "Capabilities may outrun our ability to test them, and mistakes made at scale cost more.",
    signals: [
      { name: "Task length agents can finish", source: "METR time horizons", cadence: "When METR publishes new model results", href: "https://metr.org/blog/2026-01-29-time-horizon-1-1/" },
      { name: "Independent benchmark scores", source: "Our benchmark digest", cadence: "Weekly", href: "/prices/benchmarks" },
      { name: "API price per task", source: "Our API price table", cadence: "Monthly, or on a price change", href: "/prices/api" },
      { name: "Maker safety documentation", source: "System cards (vendor-reported)", cadence: "At each major release", href: "/learn/expert#safety" },
    ],
    deeper: [
      "The 50% time horizon is the task length, measured by how long skilled humans take, at which a model succeeds about half the time. The 80% horizon is shorter, because reliability gets harder as tasks get longer.",
      "A trend line is an estimate fitted to a small number of models. METR's own number moved from about 7 months to about 131 days when its method and task set changed, so treat any single doubling time as a range.",
      "Benchmarks saturate: when top models score near the maximum, a test stops telling them apart. Keep vendor-reported and independent scores in separate columns.",
    ],
    readMore: { label: "How to read an AI benchmark", href: "/learn/expert/how-to-read-ai-benchmark" },
  },
  {
    id: "adoption",
    number: 2,
    title: "Adoption",
    question: "How many people and organizations will use AI, and how deeply?",
    summary:
      "Adoption is the force you can count most directly: surveys ask people and firms whether they use it. The counts differ depending on who is asked and how.",
    facts: [
      { text: "The share of US adults aged 18 to 64 using generative AI rose from 44.6% in Q3 2024 to 61.8% in Q2 2026.", kind: "Measured", source: "Real-Time Population Survey, via FRED", date: "Q2 2026" },
      { text: "At work, use rose from 33.3% to 45.2%. Outside work, it rose from 36.0% to 54.8%.", kind: "Measured", source: "Real-Time Population Survey, via FRED", date: "Q2 2026" },
      { text: "About 17% to 20% of US businesses reported using AI between December 2025 and May 2026. The share was 37% among firms with at least 250 employees and under 20% among firms with four or fewer.", kind: "Measured", source: "Census Bureau, Business Trends and Outlook Survey", date: "December 2025 to May 2026" },
      { text: "Census changed the question in November 2025, from AI used 'in producing goods or services' to AI used 'in any business function', so figures before and after are not directly comparable.", kind: "Measured", source: "Census Bureau", date: "May 2026" },
    ],
    unknowns: [
      "How many occasional users become daily, deeper users",
      "How much firm use is routine and how much is experimental",
      "Whether small firms catch up with large ones",
      "How much of the gap between people (about six in ten) and firms (about one in five) is a difference in definition",
    ],
    upside: "Wider access to tools for learning, writing and analysis.",
    risk: "Uneven access, over-reliance, and errors repeated at scale. Small firms and some groups may fall behind.",
    signals: [
      { name: "Share of adults using generative AI", source: "Real-Time Population Survey, via FRED", cadence: "Quarterly", href: "https://fred.stlouisfed.org/series/RPSGENAIUSAGESHAREALL" },
      { name: "Share of firms using AI", source: "Census Bureau BTOS", cadence: "Every two weeks", href: "https://census.gov/library/stories/2026/05/ai-use-businesses.html" },
      { name: "The adoption data explained", source: "Our article 41", cadence: "As data updates", href: "/society/ai-adoption-data" },
    ],
    deeper: [
      "The Real-Time Population Survey counts anyone aged 18 to 64 who says they use generative AI for work, personal use or both. The Business Trends and Outlook Survey asks an employer business whether it used AI in the last two weeks. They measure different things in different populations.",
      "Both are surveys, so they carry sampling error and wording effects. The November 2025 wording change is a visible break in the business series.",
      "Treat 'share of people' and 'share of firms' as separate gauges. Neither says how well the tool is used.",
    ],
    readMore: { label: "How fast is AI spreading? The adoption data explained", href: "/society/ai-adoption-data" },
  },
  {
    id: "energy",
    number: 3,
    title: "Energy",
    question: "Can power, chips and grids keep up with the demand for computing?",
    summary:
      "AI runs in data centres, and data centres run on electricity. Energy is where forecasts from different named sources differ most.",
    facts: [
      { text: "Gartner forecasts global data-centre electricity use of 565 TWh in 2026, up 26% from 447 TWh in 2025, rising to 702 TWh in 2027 and passing 1,200 TWh by 2030.", kind: "Projected", source: "Gartner", date: "June 2026" },
      { text: "Gartner estimates AI-optimized servers use 31% of data-centre power in 2026, up from about 20% a year earlier, and expects them to pass conventional servers in 2027.", kind: "Projected", source: "Gartner", date: "June 2026" },
      { text: "The IEA estimated data centres used about 415 TWh in 2024, around 1.5% of world electricity, and projects about 945 TWh in 2030 in its base case.", kind: "Projected", source: "International Energy Agency", date: "April 2025" },
      { text: "The IEA's cases for 2035 span 700 to 1,700 TWh, with a base case of about 1,200 TWh.", kind: "Projected", source: "International Energy Agency", date: "April 2025" },
    ],
    unknowns: [
      "How much efficiency gains in chips and models offset growth in demand",
      "Whether grids, equipment and permits allow the build-out on time",
      "How much of the new supply is clean",
      "Why the two named forecasts differ: dates, scope and assumptions",
    ],
    upside: "Efficiency improves, and new generation built for data centres can add clean supply. The IEA's base case has renewables meeting about half of the growth.",
    risk: "Strain on local grids, higher emissions where supply is fossil-based, and power shortages that limit growth for everyone who uses data centres.",
    signals: [
      { name: "Data-centre electricity forecasts", source: "Gartner", cadence: "At each new forecast", href: "https://www.gartner.com/en/newsroom/press-releases/2026-06-10-gartner-says-data-center-electricity-demand-to-grow-26-percent-in-2026" },
      { name: "Energy and AI outlook", source: "International Energy Agency", cadence: "When the IEA updates it", href: "https://www.iea.org/reports/energy-and-ai/executive-summary" },
      { name: "How much power does AI use?", source: "Our article 37", cadence: "As data updates", href: "/society/ai-power-use" },
    ],
    deeper: [
      "TWh measures energy used over a year. GW measures capacity, the maximum rate of power. Gartner pairs 565 TWh in 2026 with 132 GW of demand, rising to 290 GW by 2030. A site can need a lot of capacity even when its average use is lower.",
      "A forecast is only as good as its inputs: chip shipments, how busy the machines are, efficiency and demand for models. Forecasts made a year apart by different organizations will not match.",
      "Gartner expects conventional server electricity use to be nearly flat, so most of the growth comes from AI-optimized servers.",
    ],
    readMore: { label: "How much power does AI use?", href: "/society/ai-power-use" },
  },
  {
    id: "work",
    number: 4,
    title: "Work",
    question: "How will AI change jobs, hiring and the way work gets done?",
    summary:
      "Evidence on work comes from surveys of managers and workers. So far the measured effects are modest and uneven, and they are hard to separate from other causes.",
    facts: [
      { text: "In S&P Global's PMI special survey, the net employment effect of AI was −5 percentage points over the past 12 months (more firms reporting job losses than gains) and −2 points expected for the next year. Large firms expected −13 and small firms +3.", kind: "Measured", source: "S&P Global PMI special survey", date: "June 2026" },
      { text: "In ISM's June 2026 survey, 5% of manufacturers and 9% of services firms were planning layoffs after introducing AI. Another 13% and 9% were not hiring because of AI, and 6% and 9% had created new positions. 76% and 73% saw no noticeable effect on hiring or layoffs so far.", kind: "Measured", source: "ISM, as reported by Staffing Industry Analysts", date: "June 2026" },
      { text: "Employed adults who used generative AI at work reported saving about 2.2% of total work hours in Q2 2026, up from about 1.6% in Q1 2025.", kind: "Measured", source: "Real-Time Population Survey, via FRED", date: "Q2 2026" },
      { text: "S&P Global notes that its survey contributors rarely mention AI replacing staff, and cite costs and weak confidence more often as reasons for weak hiring.", kind: "Measured", source: "S&P Global PMI commentary", date: "June 2026" },
    ],
    unknowns: [
      "Whether net effects turn more negative as firms redesign work",
      "How routine and entry-level roles fare compared with others",
      "How to separate AI from interest rates, costs and demand",
      "Whether time saved becomes more output, shorter hours or fewer hires",
    ],
    upside: "Time saved on routine work, new tasks and roles, and faster learning on the job.",
    risk: "Slower hiring or displacement in some roles, uneven effects by firm size and occupation, and a skills gap for people who do not get training.",
    signals: [
      { name: "Hiring and layoff plans after AI", source: "ISM surveys (via Staffing Industry Analysts)", cadence: "When ISM repeats the question", href: "https://www.staffingindustry.com/news/global-daily-news/only-modest-employment-expectations-for-remainder-of-the-year" },
      { name: "Net employment effect of AI", source: "S&P Global PMI", cadence: "Periodic special surveys and monthly commentary", href: "https://www.spglobal.com/en/research-insights/special-reports/ai-impact-on-employment-2026" },
      { name: "Work hours saved by AI", source: "Real-Time Population Survey, via FRED", cadence: "Quarterly", href: "https://fred.stlouisfed.org/data/RPSGENAITSALL" },
      { name: "Is AI taking jobs?", source: "Our article 34", cadence: "As data updates", href: "/society/is-ai-taking-jobs" },
    ],
    deeper: [
      "A 'net balance' subtracts the share of firms reporting a decrease from the share reporting an increase. A figure of −5 does not mean 5% of jobs were lost. It means slightly more firms reported falling than rising employment because of AI.",
      "These are surveys of managers, not payroll records. They show what firms say they are doing and expecting, and they can lag or lead real hiring.",
      "Time saved per worker and jobs changed are different measures. Time saved can show up as more output, shorter hours or fewer hires.",
    ],
    readMore: { label: "Is AI taking jobs? What current surveys actually say", href: "/society/is-ai-taking-jobs" },
  },
  {
    id: "rules",
    number: 5,
    title: "Rules",
    question: "What will governments require, and when?",
    summary:
      "Rules decide where and how AI can be used. The EU has the most complete timeline, and it has already moved once. This page covers the EU only, and other countries differ.",
    facts: [
      { text: "Regulation (EU) 2026/1744, the Digital Omnibus on AI, entered into force on July 27, 2026.", kind: "In law", source: "Summaries of the Official Journal text", date: "July 2026" },
      { text: "Transparency duties under Article 50, which cover telling people when they deal with an AI and labelling AI-generated content, have applied since August 2, 2026. Machine-readable marking for systems already on the market is allowed until December 2, 2026.", kind: "In law", source: "Summaries of the Official Journal text", date: "July 2026" },
      { text: "High-risk rules for stand-alone systems, such as hiring, education and credit, moved from August 2, 2026 to December 2, 2027. Rules for AI built into regulated products moved to August 2, 2028.", kind: "In law", source: "Summaries of the Official Journal text", date: "July 2026" },
      { text: "Bans on certain practices and the AI literacy duty have applied since February 2, 2025. Duties for providers of general-purpose AI models have applied since August 2, 2025.", kind: "In law", source: "Summaries of the Official Journal text", date: "July 2026" },
    ],
    unknowns: [
      "How strictly national authorities enforce the rules",
      "Whether other regions follow the EU approach",
      "Whether the dates move again",
      "How the rules treat AI agents that act on their own",
    ],
    upside: "Clear duties and labels can build trust and make AI use easier to check.",
    risk: "Compliance cost, uneven rules across countries, and dates that slip and leave gaps.",
    signals: [
      { name: "European Commission AI Act pages", source: "European Commission", cadence: "As it publishes", href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai" },
      { name: "EU AI Act timeline", source: "Our timeline page", cadence: "On each change", href: "/news/eu-ai-act" },
      { name: "Next dates to watch: December 2, 2026 and December 2, 2027", source: "Regulation (EU) 2026/1744", cadence: "On those dates" },
    ],
    deeper: [
      "'Annex III' lists stand-alone high-risk uses such as employment, education and credit. 'Annex I' covers AI built into products that already have safety rules.",
      "Providers make AI systems and models. Deployers use them. Many duties differ by role, and a business can be both.",
      "This is general information, not legal advice. Check the official text or ask a qualified adviser.",
    ],
    readMore: { label: "The EU AI Act for everyday users and small businesses", href: "/learn/expert/eu-ai-act-for-everyday-users" },
  },
  {
    id: "autonomy",
    number: 6,
    title: "Autonomy",
    question: "How much will AI do on its own, and who stays in charge?",
    summary:
      "Autonomy means AI that plans and acts over many steps with tools, with less human checking. It combines model progress with permissions, security and rules. Public measures of it are thin, so much of the evidence is documentation from the makers.",
    facts: [
      { text: "METR's task-length measure is the closest public gauge: the longer the tasks agents can finish, the more work can be handed over at once. Force 1 gives the figures.", kind: "Estimate", source: "METR", date: "January 2026" },
      { text: "METR reports two reliability levels: tasks finished 50% of the time and tasks finished 80% of the time. The 80% horizon is shorter than the 50% one.", kind: "Estimate", source: "METR", date: "January 2026" },
    ],
    unknowns: [
      "How often agents fail on long tasks outside test conditions",
      "How much oversight products keep by default",
      "Who is responsible when an agent takes an action",
      "Whether defences against hidden instructions in content keep up",
    ],
    upside: "Longer tasks done in the background, such as research, coding and admin.",
    risk: "Errors that compound over many steps, actions that are hard to undo, attacks that hide instructions in content, and unclear accountability.",
    signals: [
      { name: "Task length agents can finish", source: "METR time horizons", cadence: "When METR publishes new model results", href: "https://metr.org/blog/2026-01-29-time-horizon-1-1/" },
      { name: "Maker safety documentation", source: "System cards (vendor-reported)", cadence: "At each major release", href: "/learn/expert#safety" },
      { name: "Permission and approval defaults in the tools you use", source: "Your own settings and the maker's documentation", cadence: "Whenever a tool updates" },
    ],
    deeper: [
      "A time horizon is how long a task takes a skilled human, not how long an AI runs. An agent can finish a 'two-hour task' in minutes, or fail at it.",
      "Illustration, not data: if each step succeeds 95% of the time, a 20-step task succeeds only about 36% of the time (0.95 to the power of 20). That is why long tasks are harder than short ones, and why checkpoints help.",
      "Permissions are the main safety lever: give least access, require approval for actions that cannot be undone, and keep logs.",
    ],
    readMore: { label: "AI agents explained: what they can do and how they fail", href: "/learn/power-user/ai-agents-explained" },
  },
];

export const SCENARIOS: readonly Scenario[] = [
  {
    id: "gradual",
    title: "Gradual integration",
    oneLiner: "AI keeps improving and spreading, at a pace that institutions, workers and power grids can mostly absorb.",
    story:
      "Progress continues without a sudden break. Firms add AI to more tasks over years, hiring slows in exposed roles rather than collapsing, rules phase in on or near schedule, and agents handle bounded tasks while a person checks the result.",
    forces: {
      "model-progress": "Steady gains. New models are better, but there is no sudden leap.",
      adoption: "Use keeps rising and deepens inside firms over several years.",
      energy: "Demand grows, and efficiency and new supply largely keep up.",
      work: "Tasks shift, hiring slows in exposed roles, and new roles appear.",
      rules: "Rules phase in on or near schedule, and firms adapt.",
      autonomy: "Agents handle bounded tasks while people check the results.",
    },
    fits: [
      "In ISM's June 2026 survey, 76% of manufacturers and 73% of services firms saw no noticeable effect of AI on hiring or layoffs so far.",
      "S&P Global's net employment effect was −5 points over the past 12 months, a minor figure.",
      "Firm adoption stayed within about 17% to 20% from December 2025 to May 2026.",
    ],
    doesNotFit: [
      "Individual use rose from 44.6% to 61.8% in under two years, which is fast.",
      "METR's post-2023 doubling time of about 131 days is quicker than a slow path implies.",
    ],
    watch: [
      "Firm adoption rising steadily, without a jump",
      "Task length doubling at about its current pace",
      "The net employment balance staying close to zero",
      "The EU dates holding",
    ],
    doNow: "Build skills one step at a time, and measure your own gains.",
  },
  {
    id: "rapid",
    title: "Rapid disruption",
    oneLiner: "Capabilities and adoption move faster than rules, workers and institutions can adapt.",
    story:
      "Agents take on much longer tasks, firms rebuild workflows around them within a few years, some occupations change sharply, and power supply and policy scramble to catch up.",
    forces: {
      "model-progress": "Large jumps. Agents handle multi-day work reliably.",
      adoption: "Firms rebuild workflows around AI within a few years.",
      energy: "Demand rises sharply and drives a rush to build power and data centres.",
      work: "Some occupations change sharply within a few years.",
      rules: "Rules lag capabilities, then tighten after visible incidents.",
      autonomy: "Agents run long tasks with limited oversight.",
    },
    fits: [
      "METR's post-2023 doubling time of about 131 days is faster than its 2019 to 2025 trend of about 7 months.",
      "Individual adoption rose by about 17 percentage points in under two years.",
      "Gartner projects data-centre electricity use to pass 1,200 TWh by 2030, which implies a fast build-out.",
    ],
    doesNotFit: [
      "Fewer than one in five US businesses used AI in Census data through May 2026.",
      "Most firms in ISM's June 2026 survey saw no noticeable hiring effect.",
      "METR says its suite has few tasks the latest models cannot do, so the top of the trend is uncertain.",
    ],
    watch: [
      "Task-length doubling getting faster",
      "Firm adoption jumping, beyond any change in definition",
      "The net employment balance moving well below −5",
      "Mainstream tools letting agents act without approval",
    ],
    doNow: "Learn to supervise and check AI work, keep your skills portable, and review the signals more often.",
  },
  {
    id: "constrained",
    title: "Constrained growth",
    oneLiner: "Growth slows because something becomes a bottleneck: power, chips, cost, trust, rules or reliability.",
    story:
      "Demand for computing outruns power and equipment, or incidents and rules slow deployment, or tools prove less reliable than hoped on long tasks. Spread is real, but slower than the optimists expected.",
    forces: {
      "model-progress": "Progress slows or becomes costly as compute, data and power limits bite.",
      adoption: "Use plateaus where cost, trust or reliability fall short.",
      energy: "Power, equipment and permits limit how fast capacity can grow.",
      work: "Effects stay small, and AI remains mostly an assistant.",
      rules: "Rules and incidents slow deployment in sensitive uses.",
      autonomy: "Reliability and security keep people in the loop.",
    },
    fits: [
      "Gartner says AI capacity is increasingly limited by power availability, and warns that grid supply may fall short once demand passes 1,200 TWh.",
      "ISM's June 2026 report said every commodity in short supply was one needed for data-centre construction (reported by Axios).",
      "The EU moved its high-risk rules back by about 16 months.",
    ],
    doesNotFit: [
      "Adoption has risen for two years running, with no sign of a plateau in the survey data.",
      "Both Gartner and the IEA project electricity demand to keep growing, not level off.",
    ],
    watch: [
      "Forecasts for data-centre power being cut",
      "Delays to planned data-centre capacity",
      "Adoption growth flattening in the population and business surveys",
      "More rule delays, or tighter rules after incidents",
    ],
    doNow: "Prefer tools you can swap, and budget for price and limit changes.",
  },
];