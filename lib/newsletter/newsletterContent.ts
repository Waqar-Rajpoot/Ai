/** Text and data for the newsletter page. Kept free of React so it can be tested and reused. */

export const NEWSLETTER_TITLE = "The weekly AI roundup";
export const NEWSLETTER_DESCRIPTION =
  "One short plain-English roundup a week: new models, price changes, retirements and policy news, each dated and sourced. Read every issue free online.";
export const NEWSLETTER_LAST_REVIEWED = "1 November 2026";

export const HERO = {
  eyebrow: "Weekly roundup",
  heading: "AI news you can check, once a week",
  lead: "New models, price changes, retirements and safety news in plain English. Every number is dated and sourced.",
  primaryHref: "/news/weekly",
  primaryLabel: "Read the latest issue",
  secondaryHref: "/prices/retirements",
  secondaryLabel: "See retirement dates",
  chips: ["Published weekly", "Every number dated", "Payment never changes a score"],
} as const;

/** Shown in place of a signup form. Edit this if email delivery is added later. */
export const ROUNDUP_NOTICE =
  "Email delivery is not available yet. Every issue is published on the site, so you can read the latest and past ones any time.";

export interface NavSection {
  readonly id: string;
  readonly label: string;
}

export const NEWSLETTER_NAV: readonly NavSection[] = [
  { id: "audience", label: "Who it is for" },
  { id: "inside", label: "What is inside" },
  { id: "preview", label: "Sample issue" },
  { id: "dates", label: "Dates to watch" },
  { id: "promises", label: "Promises" },
  { id: "faq", label: "Questions" },
];

/* ------------------------------ Audience ------------------------------ */

export interface AudienceProfile {
  readonly id: string;
  readonly label: string;
  readonly headline: string;
  readonly watchFor: readonly string[];
  readonly exampleHeadline: string;
}

export const AUDIENCE_PROFILES: readonly AudienceProfile[] = [
  {
    id: "everyday",
    label: "Everyday user",
    headline: "Know when your plan, limit or feature changes before it affects you.",
    watchFor: [
      "Free-plan limits that shrink or grow",
      "Plan price changes",
      "Features moving between free and paid",
    ],
    exampleHeadline: "A free plan gets a lower daily message cap",
  },
  {
    id: "student-parent",
    label: "Student or parent",
    headline: "Stay current on privacy settings, age rules and school-relevant tools.",
    watchFor: [
      "Which chatbots train on your chats",
      "Age and consent rules",
      "Safety and scam warnings",
    ],
    exampleHeadline: "A chatbot changes how it handles chat history",
  },
  {
    id: "business",
    label: "Small business",
    headline: "Spot price changes and retirements that could raise a bill or break a workflow.",
    watchFor: [
      "Model retirements and their replacements",
      "API and subscription price moves",
      "Rules that apply to your use, such as the EU AI Act",
    ],
    exampleHeadline: "A model you rely on has a shutdown date",
  },
  {
    id: "builder",
    label: "Freelancer or builder",
    headline: "See releases, API prices and retirement dates in one short read.",
    watchFor: [
      "New model releases and independent test scores",
      "Per-token price steps and cache pricing",
      "Deprecated model IDs to migrate",
    ],
    exampleHeadline: "Cache-read prices are cut for a popular model",
  },
];

/* ------------------------------ What is inside ------------------------------ */

export interface InsideItem {
  readonly title: string;
  readonly description: string;
}

export const WHATS_INSIDE: readonly InsideItem[] = [
  {
    title: "New models and releases",
    description: "What launched this week and what actually changed, with the release date.",
  },
  {
    title: "Price changes",
    description: "Plans and API costs that moved, with the date we verified each number.",
  },
  {
    title: "Retirements",
    description: "Models and features being switched off, their dates and the replacements named.",
  },
  {
    title: "Policy and safety",
    description: "Privacy changes, safety findings and rules such as the EU AI Act timeline.",
  },
  {
    title: "What to do about it",
    description: "A short note on who should care and what, if anything, to change.",
  },
];

/* ------------------------------ Sample issue ------------------------------ */

export type IssueCategory = "release" | "price" | "retirement" | "policy";

export interface IssueCategoryOption {
  readonly id: IssueCategory;
  readonly label: string;
}

export const ISSUE_CATEGORIES: readonly IssueCategoryOption[] = [
  { id: "release", label: "Releases" },
  { id: "price", label: "Prices" },
  { id: "retirement", label: "Retirements" },
  { id: "policy", label: "Policy" },
];

export interface IssueItem {
  readonly id: string;
  readonly category: IssueCategory;
  /** ISO date, yyyy-mm-dd. */
  readonly date: string;
  readonly text: string;
}

/** Abridged from items on the home page and the 23 October 2026 roundup. Refresh when a newer issue is a better example. */
export const SAMPLE_ISSUE = {
  heading: "Preview an issue",
  intro: "Filter a real week's items by topic. This is abridged from the roundup published on 23 October 2026.",
  href: "/news/weekly/2026-10-23",
  hrefLabel: "Read the full issue",
  items: [
    {
      id: "gemini-4-argon",
      category: "release",
      date: "2026-10-13",
      text: "Gemini 4 Argon became public. It leads the Arena text chart, but its introductory price ends on 30 November.",
    },
    {
      id: "haiku-5-5-launch",
      category: "price",
      date: "2026-10-07",
      text: "Claude Haiku 5.5 launched with a price step above 100K tokens.",
    },
    {
      id: "sonnet-cache-cut",
      category: "price",
      date: "2026-10-07",
      text: "Claude Sonnet 5.5 cache reads were cut in half, so heavy cached workloads cost less.",
    },
    {
      id: "openai-legacy",
      category: "retirement",
      date: "2026-10-23",
      text: "OpenAI's biggest legacy shutdown landed, with GPT-4 and o1 retired.",
    },
    {
      id: "privacy-matrix",
      category: "policy",
      date: "2026-10-23",
      text: "A new matrix compares training, retention, deletion and data location for eleven services, with steps to turn off sharing.",
    },
  ] as readonly IssueItem[],
} as const;

/* ------------------------------ Dates to watch ------------------------------ */

export interface Deadline {
  readonly id: string;
  /** ISO date, yyyy-mm-dd. */
  readonly isoDate: string;
  readonly provider: string;
  readonly what: string;
  /** The replacement named by the provider, or null if none was named. */
  readonly replacement: string | null;
}

/** Copied from the retirements tracker as listed on the home page. Recheck against the tracker before relying on it. */
export const DEADLINES_DATA = {
  heading: "Dates to watch",
  intro: "Upcoming retirements, with a live countdown. Filter by provider.",
  verifiedOn: "1 November 2026",
  trackerHref: "/prices/retirements",
  trackerLabel: "Open the full retirements tracker",
  items: [
    {
      id: "grok-imagine-image-quality",
      isoDate: "2026-11-02",
      provider: "xAI",
      what: "grok-imagine-image-quality",
      replacement: "grok-imagine-image-2.0 (quality set to low)",
    },
    {
      id: "claude-3-family",
      isoDate: "2026-11-13",
      provider: "Anthropic",
      what: "Claude 3 Haiku, 3 Sonnet, 3.5 Sonnet (v1, v2) and 3.7 Sonnet",
      replacement: null,
    },
    {
      id: "claude-haiku-4-5",
      isoDate: "2026-11-15",
      provider: "Anthropic",
      what: "Claude Haiku 4.5",
      replacement: null,
    },
    {
      id: "gemini-live-previews",
      isoDate: "2026-11-17",
      provider: "Google",
      what: "Gemini live, native-audio and text-to-speech previews",
      replacement: "gemini-3.8-live or gemini-3.8-flash-tts",
    },
    {
      id: "openai-o-series",
      isoDate: "2026-11-19",
      provider: "OpenAI",
      what: "o1, o1-pro, o3, o3-pro, o3-mini and o4-mini",
      replacement: "gpt-5.6-sol (o3-mini and o4-mini: gpt-5.6-terra)",
    },
  ] as readonly Deadline[],
} as const;

/* ------------------------------ Promises, sponsors, FAQ ------------------------------ */

export const PROMISES: readonly { readonly title: string; readonly text: string }[] = [
  { title: "Same day, every week", text: "One roundup a week, published on the same day." },
  { title: "Dated and sourced", text: "Every price, score and rule is dated and linked to its source." },
  { title: "Clear sponsor slot", text: "At most one sponsor slot per issue, labelled and kept apart from reviews." },
  { title: "Not for sale", text: "Payment never changes a score or a verdict." },
];

export const SPONSOR_TEXT =
  "Some issues may include one sponsor slot. It is always labelled as sponsored, sits apart from the news, and never changes how we score or review anything. Affiliate links are disclosed on the page where they appear.";

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const NEWSLETTER_FAQ: readonly FaqItem[] = [
  {
    id: "free",
    question: "Is the weekly roundup free?",
    answer: "Yes. It is free to read on the site. Some issues may carry one clearly labelled sponsor slot.",
  },
  {
    id: "frequency",
    question: "How often is it published?",
    answer: "Once a week, on the same day each week.",
  },
  {
    id: "email",
    question: "Can I get it by email?",
    answer: "Not yet. For now, read each issue on the site through the weekly roundup page.",
  },
  {
    id: "archive",
    question: "Can I read old issues?",
    answer: "Yes. Past roundups are listed in the weekly roundup archive.",
  },
  {
    id: "changes",
    question: "How do I spot something that changed since I last read?",
    answer: "The changelog lists what changed on this site, which sources disagreed, and what is still unconfirmed.",
  },
];

export interface RelatedLink {
  readonly href: string;
  readonly label: string;
  readonly description: string;
}

export const NEWSLETTER_RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/news/weekly", label: "Weekly roundup archive", description: "Every issue, newest first." },
  { href: "/news/changelog", label: "Changelog", description: "What changed on this site." },
  { href: "/about/independence", label: "Independence", description: "How we stay independent." },
];