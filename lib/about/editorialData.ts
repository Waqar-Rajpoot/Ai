import type {
  AiToolUse,
  ContentBadge,
  FirstTenEntry,
  NewsTrigger,
  PreCheck,
  PublishingStage,
  ReviewRule,
  RuleLine,
  TopicSource,
} from "./editorial";
import { APPROX_QUARTER_DAYS, STALE_REVIEW_DAYS } from "./editorialConstants";

export const REVIEW_RULE: ReviewRule = {
  quarterDays: APPROX_QUARTER_DAYS,
  staleAfterDays: STALE_REVIEW_DAYS,
};

export const TOPIC_SOURCES: readonly TopicSource[] = [
  {
    id: "reader-questions",
    name: "Reader questions",
    whereItComes: [
      "Messages sent through the contact page",
      "Matchup requests on the head-to-head hub",
      "Error reports that show a page left a question unanswered",
      "Questions readers ask about a guide, which tell us what the guide missed",
    ],
    whatWeDo: "We group similar questions and write one page for the group. A question that comes up repeatedly gets a page, and a one-off gets a reply.",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Head-to-head hub", href: "/compare/vs" },
    ],
  },
  {
    id: "search-demand",
    name: "Search demand",
    whereItComes: [
      "What people type into search engines when they look for the topic",
      "What readers search for on this site (search covers guides, glossary and reviews)",
      "Questions that buying-intent searches imply, such as “best AI for coding”",
    ],
    whatWeDo: "We write the plain answer to the question people are asking, and we choose page titles to match it. Demand decides whether a page is worth making. It never decides what a page concludes.",
    links: [{ label: "Best-for roundups", href: "/compare/best" }],
  },
  {
    id: "news-triggers",
    name: "News triggers",
    whereItComes: [
      "A frontier or popular model is released",
      "A price, plan or limit changes",
      "Safety, privacy or policy news that affects readers",
      "A model or feature is retired",
    ],
    whatWeDo: "News triggers start the clock on a publishing target. A release post, a price-change note or an explainer goes out, and the guide or table it affects is updated.",
    links: [
      { label: "News hub", href: "/news" },
      { label: "Retirements tracker", href: "/prices/retirements" },
    ],
  },
];

/** Blueprint 6.4. These are targets, not guarantees. */
export const NEWS_TRIGGERS: readonly NewsTrigger[] = [
  { trigger: "A frontier or popular model is released", whatWePublish: "“What changed and should you care?” post (300 to 500 words) and a directory row", target: "Within 48 hours" },
  { trigger: "A price, plan or limit changes", whatWePublish: "A price-change note, then the plan and cost tables are updated", target: "Within 24 hours" },
  { trigger: "Safety, privacy or policy news", whatWePublish: "A short explainer linked to the relevant guide", target: "Within 3 days" },
];

export const TOPIC_QUESTIONS: readonly RuleLine[] = [
  { title: "Is there a real reader question?", detail: "A topic without a question behind it is a topic we are writing for ourselves." },
  { title: "Can we source it?", detail: "We need a provider page, an independent evaluator or our own test. If we cannot trace the key numbers, we do not publish them." },
  { title: "Can we keep it current?", detail: "A page we cannot maintain at its cadence will mislead later, so we would rather not publish it." },
  { title: "Which level is it for?", detail: "Every page gets a level, and Level 3 and 4 pages link back to the Level 1 or 2 page that explains the prerequisite." },
  { title: "Does it show both sides?", detail: "On AI & Society pages, benefits and risks appear together, and forecasts are labelled." },
  { title: "Does money touch it?", detail: "If a page has affiliate links, they are disclosed, and affiliate status never affects the content." },
];

export const NOT_COVERED: readonly string[] = [
  "Personal legal, medical, financial, investment or career advice. Our pages are general information.",
  "Numbers that only appear in an unnamed “study”, a screenshot or a second-hand summary.",
  "Rumours about models that have not been released. A release post follows the release.",
  "Pages we would write only because a vendor or sponsor asked, with sponsored content labelled and kept apart.",
];

/** Blueprint 7.1 and 7.2: the first ten articles to write. */
export const FIRST_TEN: readonly FirstTenEntry[] = [
  { number: 1, title: "What is AI? A plain-English guide", href: "/learn/foundations/what-is-ai" },
  { number: 3, title: "How to write better prompts (20 examples)", href: "/learn/foundations/write-better-prompts" },
  { number: 5, title: "What you should never share with an AI chatbot", href: "/learn/foundations/never-share-with-ai-chatbot" },
  { number: 7, title: "How to fact-check AI answers", href: "/learn/practitioner/fact-check-ai-answers" },
  { number: 13, title: "ChatGPT vs Claude vs Gemini vs Grok", href: "/compare/apps" },
  { number: 14, title: "Best AI model right now, by job", href: "/compare/best/by-job" },
  { number: 17, title: "Context windows, tokens and memory explained", href: "/learn/power-user/context-windows-tokens-memory" },
  { number: 18, title: "Reasoning models and effort settings", href: "/learn/power-user/reasoning-models-effort-settings" },
  { number: 22, title: "AI API pricing for non-engineers", href: "/learn/power-user/ai-api-pricing-for-non-engineers" },
  { number: 24, title: "Claude Opus 5.5 vs GPT-6.1 Sol: ten everyday tasks", href: "/compare/vs/claude-opus-5-5-vs-gpt-6-1-sol" },
];

export const FIRST_TEN_REASONS: readonly string[] = [
  "They cover the largest beginner searches.",
  "They cover the main model-comparison queries.",
  "Two of them set the site's tone: honest testing and clear cost reasoning.",
];

export const PUBLISHING_STAGES: readonly PublishingStage[] = [
  { id: "choose", title: "Choose the topic and the level", owner: "both", what: "Check the topic against the six questions above, and give the page a level and a content type.", readerSees: "A level badge and a content-type badge at the top of the page." },
  { id: "draft", title: "Write the draft", owner: "writer", what: "Write in plain English for the chosen level. AI tools may help draft, and the AI section below says how.", readerSees: "Short sections, copy-ready examples and a “What can go wrong” box." },
  { id: "source", title: "Check every fact on its source", owner: "writer", what: "Open the provider's own page for prices and features, and record the day. Use the first source in the hierarchy that answers the question.", readerSees: "A verified-on date and a source line." },
  { id: "test", title: "Run our own test (reviews only)", owner: "writer", what: "Run the seven-point scorecard with each model's recommended settings, and record the model version, effort setting and test day.", readerSees: "A tested-on date, settings and the scorecard." },
  { id: "label", title: "Label every claim", owner: "writer", what: "Mark each number as tested by us, independent third party or vendor-reported. Vendor numbers go in a separate table.", readerSees: "A result label on every number." },
  { id: "review", title: "Review", owner: "reviewer", what: "A second person reads the page, checks claims against sources, applies the checklist below and decides if the page is ready.", readerSees: "A page that has been checked by someone other than its writer." },
  { id: "publish", title: "Publish with its dates", owner: "both", what: "Publish the page with its dates, disclosures and links, and add a line to the changelog.", readerSees: "The page, and a dated entry in the changelog." },
  { id: "maintain", title: "Keep it current", owner: "both", what: "Follow the cadence: a weekly roundup, a monthly review of every best-for page and the free-limits table, a quarterly re-run of the test battery.", readerSees: "Fresh verified-on and tested-on dates, or a stale or Superseded label." },
  { id: "retire", title: "Supersede, do not delete", owner: "both", what: "When a model or plan is replaced, mark the page Superseded and link to its successor.", readerSees: "A Superseded label and a link to what replaced it." },
];

export const PRE_CHECKS: readonly PreCheck[] = [
  { id: "check-level", scope: "all", text: "The page has a level badge and, for Level 3 and 4, a link to its prerequisite.", why: "Readers must know if a page is right for them and what to read first." },
  { id: "check-summary", scope: "all", text: "A short summary box gives the answer in a few lines.", why: "Most readers want the answer first." },
  { id: "check-dates", scope: "all", text: "The author, verified-on and, if relevant, tested-on dates are shown.", why: "A page without a date cannot be judged." },
  { id: "check-wrong", scope: "all", text: "A “What can go wrong” box is present and specific to the page.", why: "Honesty about limits is part of the product." },
  { id: "check-sources", scope: "all", text: "Every figure traces to a named source, and the source line says which kind.", why: "A number we cannot trace is a number we do not publish." },
  { id: "check-links", scope: "all", text: "Related articles, previous and next level, and breadcrumbs are in place.", why: "Pages should lead somewhere." },
  { id: "check-price-source", scope: "prices", text: "Each price was read on the provider's own page on the day, and the date is recorded.", why: "Provider pages are first in the source hierarchy." },
  { id: "check-price-disclaimer", scope: "prices", text: "The line “Prices and features change. Confirm on the provider's website before buying.” appears.", why: "Prices move, and readers should know to check." },
  { id: "check-intro-rates", scope: "prices", text: "Introductory rates show their end date in the same cell.", why: "A price that ends is not the price you will pay." },
  { id: "check-scorecard", scope: "reviews", text: "The seven-point scorecard is complete, with test date, model version and effort setting.", why: "Reviews must be comparable." },
  { id: "check-skip", scope: "reviews", text: "A “Who should skip it” section is present.", why: "A review that cannot say who should avoid a product is not balanced." },
  { id: "check-vendor-split", scope: "reviews", text: "Vendor-reported numbers sit in their own table or column, labelled.", why: "Vendor claims are weaker evidence than independent ones." },
  { id: "check-affiliate", scope: "affiliate", text: "The affiliate disclosure appears on the page, and affiliate status was not a scoring input.", why: "Payment never changes a score or a verdict." },
];

/**
 * AI tools that helped draft content. EMPTY ON PURPOSE: Blueprint 5.1 requires this list, and only you
 * know which tools were used. Add one entry per tool, with what it did and how a person edited the result.
 */
export const AI_TOOLS_USED: readonly AiToolUse[] = [];

export const AI_ALLOWED: readonly RuleLine[] = [
  { title: "Structure and first drafts", detail: "Outlines, rough explanations and rewrites, always followed by a person's edit." },
  { title: "Readability", detail: "Suggesting simpler wording, shorter sentences and clearer headings." },
  { title: "Questions and examples", detail: "Suggesting FAQ questions, glossary entries and worked examples, which a person checks." },
];

export const AI_NOT_ALLOWED: readonly RuleLine[] = [
  { title: "Prices, dates, scores and quotes", detail: "No figure goes in unless a person checked it on its source. A model's recollection is not a source." },
  { title: "Our test results", detail: "Scorecards come from our own test runs, recorded by a person, never written by a model." },
  { title: "A model scoring itself", detail: "If a model that helped draft is also under review, a person checks that review against our test results." },
  { title: "Invented sources", detail: "Every link and citation is opened by a person before publication." },
];

export const HUMAN_EDIT_STEPS: readonly RuleLine[] = [
  { title: "A person reads every line.", detail: "Nothing published is unread by a person." },
  { title: "A person checks every claim.", detail: "Each claim is matched to a source, and unmatched claims are cut." },
  { title: "A second person reviews.", detail: "The reviewer is not the writer, so a mistake has two chances to be caught." },
  { title: "A person decides.", detail: "A person decides whether the page is published, and is responsible for it." },
];

export const LEVEL_BADGE_RULES: readonly RuleLine[] = [
  { title: "Every guide, review and tool carries a level badge.", detail: "It tells you whether a page is for you before you read it." },
  { title: "Each level hub opens with a self-check.", detail: "A few questions to see if you already know the level's basics." },
  { title: "Level 3 and 4 pages link back to a prerequisite.", detail: "The link goes to the Level 1 or 2 page that explains the idea you need." },
  { title: "Some pages span levels.", detail: "A hub or a tool may show a range, such as Levels 2 to 4, when it serves several readers." },
  { title: "A comparison appears once.", detail: "Comparisons and roundups live under Compare and are linked from the level hubs, so no page exists twice." },
];

export const CONTENT_BADGES: readonly ContentBadge[] = [
  { type: "Guide", meaning: "Teaches you how to do something, step by step.", exampleLabel: "What is AI?", exampleHref: "/learn/foundations/what-is-ai" },
  { type: "Explainer", meaning: "Explains an idea or a rule without assuming background.", exampleLabel: "Context windows, tokens and memory", exampleHref: "/learn/power-user/context-windows-tokens-memory" },
  { type: "Safety", meaning: "Helps you avoid a risk, such as sharing private data or falling for a scam.", exampleLabel: "What you should never share", exampleHref: "/learn/foundations/never-share-with-ai-chatbot" },
  { type: "Comparison", meaning: "Compares products or models on the same criteria.", exampleLabel: "ChatGPT vs Claude vs Gemini vs Grok", exampleHref: "/compare/apps" },
  { type: "Roundup", meaning: "Ranks options for a use case, with dates so it ages well.", exampleLabel: "Best AI model, by job", exampleHref: "/compare/best/by-job" },
  { type: "Head-to-head", meaning: "Two models, the same ten tasks, one test day.", exampleLabel: "Opus 5.5 vs GPT-6.1 Sol", exampleHref: "/compare/vs/claude-opus-5-5-vs-gpt-6-1-sol" },
  { type: "Opinion", meaning: "Our judgement, clearly labelled as such, with our testing behind it.", exampleLabel: "Is AI worth paying for?", exampleHref: "/learn/practitioner/is-ai-worth-paying-for" },
  { type: "Data explainer", meaning: "Reads a named survey or tracker, with source and date for every number.", exampleLabel: "Is AI taking jobs?", exampleHref: "/society/is-ai-taking-jobs" },
];