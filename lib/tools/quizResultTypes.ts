import type { GuideLink } from "@/lib/shared/contentTypes";

export type ResultTypeId =
  | "free-assistant"
  | "budget-plan"
  | "standard-plan"
  | "heavy-plan"
  | "business-plan"
  | "api-pay-per-use"
  | "local-open-weight";

export interface PlanLine {
  provider: string;
  plan: string;
  price: string;
  note: string;
}

export interface ResultType {
  id: ResultTypeId;
  /** Short label for tables and chips. */
  shortName: string;
  title: string;
  tagline: string;
  fits: string;
  costSummary: string;
  whatYouGet: readonly string[];
  watchOut: readonly string[];
  plans: readonly PlanLine[];
  /** Explains how to read the model list for this type. */
  picksNote: string | null;
  nextSteps: readonly GuideLink[];
}

const CHAT_PICKS_NOTE =
  "On a chat plan you choose the app, and the plan decides which model you get. Confirm on the provider's page before you pay.";

/** Plan prices are US monthly figures from Blueprint 6.8, as reported Oct 2026 through secondary sources. */
export const RESULT_TYPES: Record<ResultTypeId, ResultType> = {
  "free-assistant": {
    id: "free-assistant",
    shortName: "Free plan",
    title: "A free chatbot plan",
    tagline: "Start free, learn what you actually need, and upgrade only when a limit gets in your way.",
    fits: "Occasional use, learning the basics, or finding out whether AI helps you at all.",
    costSummary: "$0",
    whatYouGet: [
      "Limited use of a mainstream chatbot at no cost.",
      "A safe place to practise prompts and check answers.",
      "No subscription to cancel, so no surprise renewal.",
    ],
    watchOut: [
      "Usage limits: free plans cap what you can do, and each one stops in a different place.",
      "ChatGPT's US free tier has shown ads since Feb 2026.",
      "Check the training and data-sharing setting before you type anything personal.",
    ],
    plans: [
      { provider: "ChatGPT", plan: "Free", price: "$0", note: "Limited use; ads in the US free tier since Feb 2026" },
      { provider: "Claude", plan: "Free", price: "$0", note: "Limited usage" },
      { provider: "Gemini", plan: "Free", price: "$0", note: "Limited Pro model access" },
    ],
    picksNote: CHAT_PICKS_NOTE,
    nextSteps: [
      { href: "/learn/foundations/free-vs-paid-ai", label: "Free vs paid AI: what you actually get" },
      { href: "/prices/free-limits", label: "Free-plan limits compared" },
      { href: "/learn/foundations/write-better-prompts", label: "How to write better prompts" },
      { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What never to share with a chatbot" },
    ],
  },
  "budget-plan": {
    id: "budget-plan",
    shortName: "Low-cost plan",
    title: "A low-cost paid plan",
    tagline: "A small monthly step up when the free limits start to get in the way.",
    fits: "People who keep hitting free limits, or want extras such as storage, without paying a full $20.",
    costSummary: "About $5 to $8 a month",
    whatYouGet: [
      "A paid step above free, for roughly the price of a coffee.",
      "Google AI Plus adds 400 GB of storage.",
      "A cheap way to test whether paying is worth it before you move to a $20 plan.",
    ],
    watchOut: [
      "ChatGPT Go may include ads.",
      "In our plan table only two providers have a plan in this range. Claude's cheapest paid plan there is Pro at $20.",
      "Older articles quote $7.99 for Google AI Plus. Our table says $4.99, so confirm on Google's page.",
    ],
    plans: [
      { provider: "ChatGPT", plan: "Go", price: "$8 / month", note: "Budget step up; may include ads" },
      { provider: "Google", plan: "Google AI Plus", price: "$4.99 / month", note: "400 GB storage; older articles quote $7.99" },
    ],
    picksNote: CHAT_PICKS_NOTE,
    nextSteps: [
      { href: "/prices/plans", label: "Consumer plan table" },
      { href: "/tools/subscription-cost-calculator", label: "Subscription cost calculator" },
      { href: "/learn/practitioner/is-ai-worth-paying-for", label: "Is AI worth paying for?" },
    ],
  },
  "standard-plan": {
    id: "standard-plan",
    shortName: "$20 plan",
    title: "A standard paid plan (about $20 a month)",
    tagline: "The usual paid choice for people who use AI most days.",
    fits: "Students, office workers, job seekers and anyone who uses AI daily for real tasks.",
    costSummary: "About $20 a month",
    whatYouGet: [
      "The mainstream paid plan from each of the three big providers.",
      "ChatGPT Plus is the default paid plan, Claude Pro adds Claude Code access and more usage, and Google AI Pro includes 5 TB of storage.",
      "Annual billing lowers the price on some plans, for example Claude Pro at $17 a month.",
    ],
    watchOut: [
      "Start with one plan. Compare the free versions of the others before you add a second subscription.",
      "Annual billing renews on its own, so note the renewal date.",
      "A chat subscription is not an API. They are separate products with separate bills.",
    ],
    plans: [
      { provider: "ChatGPT", plan: "Plus", price: "$20 / month", note: "Default paid plan" },
      { provider: "Claude", plan: "Pro", price: "$20 / month ($17 annual)", note: "Adds Claude Code access and more usage" },
      { provider: "Google", plan: "Google AI Pro", price: "$19.99 / month", note: "5 TB storage; mainstream paid plan" },
    ],
    picksNote: CHAT_PICKS_NOTE,
    nextSteps: [
      { href: "/prices/plans", label: "Consumer plan table" },
      { href: "/compare/apps", label: "ChatGPT vs Claude vs Gemini vs Grok" },
      { href: "/learn/practitioner/is-ai-worth-paying-for", label: "Is AI worth paying for?" },
      { href: "/learn/foundations/free-vs-paid-ai", label: "Avoiding surprise renewals" },
    ],
  },
  "heavy-plan": {
    id: "heavy-plan",
    shortName: "Heavy-use plan",
    title: "A heavy-use plan ($100 a month or more)",
    tagline: "For daily coding, long agent runs, or work where the $20 plans keep running out.",
    fits: "People who hit the limits of a $20 plan most weeks and rely on AI for paid work.",
    costSummary: "$100 to $500 a month",
    whatYouGet: [
      "Much higher usage limits: Claude Max and Google AI Ultra come in 5x and 20x levels.",
      "ChatGPT Pro has three tiers with rising usage.",
      "The most room for long coding sessions and agent tasks.",
    ],
    watchOut: [
      "Try a $20 plan first and upgrade only after you hit a limit that blocks real work.",
      "Compare with pay-per-use. Depending on how you work, an API can cost less than a $100 plan.",
      "Cancel or step down when your usage drops.",
    ],
    plans: [
      { provider: "ChatGPT", plan: "Pro", price: "$100, $200 or $500 / month", note: "Three tiers with rising usage" },
      { provider: "Claude", plan: "Max", price: "$100 (5x) or $200 (20x) / month", note: "Heavy daily or coding use" },
      { provider: "Google", plan: "Google AI Ultra", price: "From $99.99 (5x), $199.99 (20x)", note: "Highest limits" },
    ],
    picksNote: CHAT_PICKS_NOTE,
    nextSteps: [
      { href: "/prices/plans", label: "Consumer plan table" },
      { href: "/tools/api-cost-calculator", label: "API cost calculator" },
      { href: "/learn/power-user/ai-api-pricing-for-non-engineers", label: "AI API pricing for non-engineers" },
    ],
  },
  "business-plan": {
    id: "business-plan",
    shortName: "Business plan",
    title: "A business or team plan",
    tagline: "For work or client information, where you need account controls and data terms you can read.",
    fits: "Anyone handling client, staff, health, legal or financial information through an employer or their own business.",
    costSummary: "About $20 to $125 per seat a month",
    whatYouGet: [
      "Plans aimed at organisations, with an admin and shared billing.",
      "Data terms written for businesses. Read them for training, retention and deletion before you rely on them.",
      "Standard and premium seats on some plans.",
    ],
    watchOut: [
      "A business plan does not make it safe to paste anything. Passwords and ID numbers still stay out.",
      "Ask whoever handles IT or compliance before you move client data into any AI tool.",
      "ChatGPT Business has a two-seat minimum.",
    ],
    plans: [
      { provider: "ChatGPT", plan: "Business", price: "$25 per seat ($20 annual); Premium $125 ($100 annual)", note: "Two-seat minimum" },
      { provider: "Claude", plan: "Team", price: "$25 or $125 per seat ($20 or $100 annual)", note: "Standard and premium seats" },
      { provider: "Google", plan: "Business plans", price: "Not in our table yet", note: "Check Google's own page" },
    ],
    picksNote: CHAT_PICKS_NOTE,
    nextSteps: [
      { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What never to share with a chatbot" },
      { href: "/prices/privacy", label: "Privacy matrix" },
      { href: "/tools/ai-safety-checklist", label: "AI safety checklist for small businesses" },
      { href: "/learn/expert/eu-ai-act-for-everyday-users", label: "The EU AI Act for small businesses" },
    ],
  },
  "api-pay-per-use": {
    id: "api-pay-per-use",
    shortName: "API (pay per use)",
    title: "Pay per use through an API",
    tagline: "Pay for the tokens you use instead of a monthly subscription.",
    fits: "People with repeated tasks or automations, who can use code, a no-code tool, or an app that takes an API key.",
    costSummary: "Varies with use. Input prices in our directory run from $0.10 to $10 per million tokens",
    whatYouGet: [
      "Cost that follows use: light months cost little and heavy months cost more.",
      "Cheap models for bulk work, some under $1 per million tokens.",
      "The freedom to use a cheap model for sorting and a stronger one for hard questions.",
    ],
    watchOut: [
      "A chat subscription is not an API. They are separate products with separate bills.",
      "Judge cost per task, not price per token. Output tokens cost more than input tokens on every row of our directory.",
      "Introductory prices end: Gemini 4 Argon on Nov 30 and Gemini 3.8 Flash on Dec 31, 2026.",
      "Models are retired on a schedule, so keep the model name in settings, not scattered through code.",
    ],
    plans: [],
    picksNote: null,
    nextSteps: [
      { href: "/learn/power-user/ai-api-pricing-for-non-engineers", label: "AI API pricing for non-engineers" },
      { href: "/tools/api-cost-calculator", label: "API cost calculator" },
      { href: "/prices/api", label: "API prices and cost per task" },
      { href: "/prices/retirements", label: "Model retirements tracker" },
    ],
  },
  "local-open-weight": {
    id: "local-open-weight",
    shortName: "Local model",
    title: "An open-weight model on your own computer",
    tagline: "Your prompts stay on your machine, and you pay for hardware instead of per message.",
    fits: "People with sensitive material who are comfortable installing software and have a computer with enough memory.",
    costSummary: "No per-message fee. You pay for the computer",
    whatYouGet: [
      "Prompts and files processed on your own computer, as long as the tool you run does not send them elsewhere.",
      "No per-message fee. Qwen3.8 27B is free to self-host.",
      "A rough memory guide: a 27B model at 4-bit needs about 16 GB.",
    ],
    watchOut: [
      "Check the memory a model needs before you download it.",
      "Local models trade some capability for privacy. Test on your own tasks.",
      "Privacy gains have limits: files you save, sync or share can still leak.",
      "Read each model's licence. Open weights are not always open source.",
    ],
    plans: [],
    picksNote: "Check each model's memory needs and licence before you download.",
    nextSteps: [
      { href: "/learn/expert/run-ai-on-your-own-computer", label: "Run an AI model on your own computer" },
      { href: "/tools/local-model-memory", label: "Local model memory estimator" },
      { href: "/compare/open-vs-closed", label: "Open-weight vs closed models" },
      { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What never to share with a chatbot" },
    ],
  },
};

/** Cheapest first, then the two special cases. Used wherever all results are listed. */
export const RESULT_TYPE_ORDER: readonly ResultTypeId[] = [
  "free-assistant",
  "budget-plan",
  "standard-plan",
  "heavy-plan",
  "business-plan",
  "api-pay-per-use",
  "local-open-weight",
];