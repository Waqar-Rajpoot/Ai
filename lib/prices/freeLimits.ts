import { collectUniqueSources } from "@/lib/shared/sources";
import type { LinkItem, SourceLink, TableRow } from "@/types";

/** Day every fact on the free-limits page was last checked against its source. */
export const FREE_LIMITS_VERIFIED_ON = "2026-10-21";

/** Page metadata for /prices/free-limits. */
export const FREE_LIMITS_PAGE = {
  title: "Free-plan limits",
  route: "/prices/free-limits",
  description:
    "What the free versions of ChatGPT, Claude and Gemini include, where each one stops, and which ones show ads.",
} as const;

// ---- Sources ---------------------------------------------------------------
// Provider pages come first in the source hierarchy. Secondary reports are
// leads only, and every claim that rests on one is marked on the page.

const OPENAI_FREE_FAQ: SourceLink = {
  label: "ChatGPT Free Tier FAQ",
  publisher: "OpenAI Help Center",
  url: "https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq",
  kind: "provider",
};
const OPENAI_MODELS: SourceLink = {
  label: "GPT-6 and other models in ChatGPT",
  publisher: "OpenAI Help Center",
  url: "https://help.openai.com/en/articles/20001354-gpt-6-and-other-models-in-chatgpt",
  kind: "provider",
};
const OPENAI_UPLOADS: SourceLink = {
  label: "Uploading files and audio to ChatGPT",
  publisher: "OpenAI Help Center",
  url: "https://help.openai.com/en/articles/8555545-uploading-files-and-audio-to-chatgpt",
  kind: "provider",
};
const CLAUDE_FREE_USAGE: SourceLink = {
  label: "About Free Claude Usage",
  publisher: "Claude Help Center",
  url: "https://support.claude.com/en/articles/8602283-about-free-claude-usage",
  kind: "provider",
};
const CLAUDE_INCREASE_LIMITS: SourceLink = {
  label: "How do I increase my usage limits?",
  publisher: "Claude Help Center",
  url: "https://support.claude.com/en/articles/8241175-how-do-i-increase-my-usage-limits",
  kind: "provider",
};
const CLAUDE_PRO_USAGE: SourceLink = {
  label: "About Claude's Pro Plan Usage",
  publisher: "Claude Help Center",
  url: "https://support.claude.com/en/articles/8324991-about-claude-s-pro-plan-usage",
  kind: "provider",
};
const ANTHROPIC_AD_FREE: SourceLink = {
  label: "Claude is a space to think",
  publisher: "Anthropic",
  url: "https://anthropic.com/news/claude-is-a-space-to-think",
  kind: "provider",
};
const GEMINI_LIMITS: SourceLink = {
  label: "Usage limits for Gemini Apps",
  publisher: "Gemini Apps Help (Google)",
  url: "https://support.google.com/gemini/answer/17004136",
  kind: "provider",
};

const PCWORLD_TEXT_CAP: SourceLink = {
  label: "OpenAI is finally killing ChatGPT's text chat limits for free users",
  publisher: "PCWorld, Aug 7, 2026",
  url: "https://www.pcworld.com/article/3208588/openai-is-finally-killing-chatgpts-text-chat-limits-for-free-users.html",
  kind: "secondary",
};
const NOTEBOOKCHECK_ADS: SourceLink = {
  label: "ChatGPT ads: where they run now and how to switch them off",
  publisher: "Notebookcheck",
  url: "https://www.notebookcheck.net/ChatGPT-ads-where-they-run-now-and-how-to-switch-them-off.1361301.0.html",
  kind: "secondary",
};
const MLQ_ADS: SourceLink = {
  label: "OpenAI expands ChatGPT ad test to five more countries",
  publisher: "MLQ.ai, Aug 2026",
  url: "https://mlq.ai/news/openai-expands-chatgpt-ad-test-to-five-more-countries/",
  kind: "secondary",
};
const TECHCRUNCH_INDIA_ADS: SourceLink = {
  label: "OpenAI to start showing ads on ChatGPT's free and Go tiers in India",
  publisher: "TechCrunch, Aug 27, 2026",
  url: "https://techcrunch.com/2026/08/27/openai-to-start-showing-ads-on-chatgpts-free-and-go-tiers-in-india/",
  kind: "secondary",
};
const GOOGLE_NO_ADS_REPORT: SourceLink = {
  label: "Google says there are 'no plans' to put ads in the Gemini app",
  publisher: "9to5Google, Dec 8, 2025",
  url: "https://9to5google.com/2025/12/08/google-gemini-no-ads/",
  kind: "secondary",
};
const THURROTT_GEMINI_QUOTA: SourceLink = {
  label: "Gemini usage limit changes after user feedback",
  publisher: "Thurrott, May 2026",
  url: "https://www.thurrott.com/?p=336722",
  kind: "secondary",
};
const BAKEDWITH_CLAUDE_FREE: SourceLink = {
  label: "Using Claude for free: features, limits and alternatives",
  publisher: "Bakedwith",
  url: "https://www.bakedwith.com/en/blog/using-claude-for-free-features-limits-alternatives",
  kind: "secondary",
};
const FELLO_GEMINI_FREE: SourceLink = {
  label: "Is Google Gemini free?",
  publisher: "Fello AI",
  url: "https://felloai.com/is-gemini-free/",
  kind: "secondary",
};

// ---- Plan profiles -----------------------------------------------------------

/** Identifier of a provider covered on the page. */
export type ProviderId = "chatgpt" | "claude" | "gemini";

/** Everything the page says about one free plan. */
export interface FreePlanProfile {
  readonly id: ProviderId;
  readonly product: string;
  readonly includes: readonly string[];
  readonly notIncluded: readonly string[];
  readonly stops: readonly string[];
  readonly ads: {
    readonly hasAds: boolean;
    readonly headline: string;
    readonly details: readonly string[];
  };
  readonly sources: readonly SourceLink[];
}

export const FREE_PLAN_PROFILES: readonly FreePlanProfile[] = [
  {
    id: "chatgpt",
    product: "ChatGPT",
    includes: [
      "Everyday text chat on GPT-5.6 Luna, the lightest model in OpenAI's GPT-5.6 line.",
      "Web search and data analysis.",
      "Uploading images and files to a chat.",
      "Image creation, and voice, each with its own limit.",
      "Discovering and using GPTs.",
      "A Library with 500 MB of storage.",
    ],
    notIncluded: [
      "GPT-5.6 Sol, the larger model, which is not offered on Free or Go.",
      "Audio file uploads, which need a paid plan.",
    ],
    stops: [
      "Text chat has no message cap on everyday chats, subject to abuse-prevention safeguards.",
      "File uploads are limited to 3 a day on Free, and OpenAI may lower that at peak hours. Text and document files can hold up to 2 million tokens each.",
      "Image creation, voice and data analysis have separate limits. OpenAI does not publish those numbers.",
      "When you reach a tool's limit, that tool pauses until it resets. ChatGPT shows the reset time in the app.",
    ],
    ads: {
      hasAds: true,
      headline: "Ads on Free and Go",
      details: [
        "Ads can appear for adults on the Free and Go plans. Plus, Pro, Business, Enterprise and Education plans are ad-free.",
        "Each ad is labelled as sponsored and sits below the answer. OpenAI says ads do not influence the answers.",
        "Ads began in the US on Feb 9, 2026. They have since reached other markets, including the UK, Mexico, Brazil, Japan, South Korea and Europe, and OpenAI announced them for India on Aug 27, 2026. The rollout is gradual, so some free users still see none.",
        "Free users can choose an ad-free option in return for lower usage limits and fewer features. OpenAI does not say how much lower.",
      ],
    },
    sources: [
      OPENAI_FREE_FAQ,
      OPENAI_MODELS,
      OPENAI_UPLOADS,
      PCWORLD_TEXT_CAP,
      NOTEBOOKCHECK_ADS,
      MLQ_ADS,
      TECHCRUNCH_INDIA_ADS,
    ],
  },
  {
    id: "claude",
    product: "Claude",
    includes: [
      "Chat with the Sonnet and Haiku models. (Secondary report.)",
      "Web search, file uploads and memory across chats. (Secondary report.)",
      "Up to five Projects. (Secondary report.)",
    ],
    notIncluded: [
      "Opus models and Claude Code, which come with paid plans. (Secondary report.)",
    ],
    stops: [
      "One session-based limit that resets every five hours.",
      "How many messages fit varies with demand, and Anthropic may add other limits to keep access fair.",
      "Claude tells you when you reach the limit, or when a prompt is longer than the available context window. The context window can also vary with demand.",
      "Anthropic publishes no message count. Its paid Pro plan gives at least five times Free's usage per session at peak hours.",
      "Anthropic describes its Pro limits as depending on conversation length, the number of messages, and the model or feature used. Free uses the same five-hour session design, so expect long chats and heavy features to use the allowance faster.",
    ],
    ads: {
      hasAds: false,
      headline: "No ads",
      details: [
        "Anthropic says Claude will stay ad-free. It rules out ads that sit beside the conversation as well as ads that change answers.",
        "The commitment was published on Feb 4, 2026. It is a policy, not a technical guarantee, so we re-check it each month.",
      ],
    },
    sources: [
      CLAUDE_FREE_USAGE,
      CLAUDE_INCREASE_LIMITS,
      CLAUDE_PRO_USAGE,
      ANTHROPIC_AD_FREE,
      BAKEDWITH_CLAUDE_FREE,
    ],
  },
  {
    id: "gemini",
    product: "Gemini",
    includes: [
      "Everyday chat on Google's Flash models. (Secondary report.)",
      "Limited access to the Pro model, which uses more of your allowance than Flash.",
      "Heavier features such as image, video and music generation, Deep Research and extended thinking count more against your allowance. Which of them a free account can open depends on region and account, so check in the app.",
    ],
    notIncluded: [
      "Higher limits: Google AI Plus, Pro and Ultra raise them. See the Plans page for prices.",
    ],
    stops: [
      "A compute-based allowance that refreshes every five hours until you reach a weekly limit.",
      "Your usage depends on the complexity of the prompt, the features you use and the length of the chat.",
      "The Pro model, media generation, Deep Research, extended thinking and Deep Think use more of the allowance.",
      "Accounts without a Google AI plan get the standard limits. AI Plus is 2x that, AI Pro 4x, and AI Ultra 5x or 20x the Pro limit. Google publishes no baseline number.",
      "Google's Josh Woodward said in May 2026 that Flash-Lite prompts and failed requests do not count against your quota. (Secondary report.)",
      "Google says the May 2026 change did not apply to accounts under 18.",
    ],
    ads: {
      hasAds: false,
      headline: "No ads in the Gemini app",
      details: [
        "On Dec 8, 2025 Google said there are no ads in the Gemini app and no current plans to change that. (Secondary report of Google's statement.)",
        "Google does show ads in other AI features: AI Overviews in Search, and tests in AI Mode. Those are not the Gemini app.",
        "No current plans can change, so we re-check on every update.",
      ],
    },
    sources: [
      GEMINI_LIMITS,
      GOOGLE_NO_ADS_REPORT,
      THURROTT_GEMINI_QUOTA,
      FELLO_GEMINI_FREE,
    ],
  },
];

// ---- At-a-glance table ---------------------------------------------------------

export const COMPARISON_COLUMN_HEADERS: readonly string[] = [
  "ChatGPT Free",
  "Claude Free",
  "Gemini Free",
];

export const COMPARISON_ROWS: readonly TableRow[] = [
  {
    label: "Everyday text chat",
    cells: [
      "No message cap, subject to abuse-prevention safeguards",
      "Usage-based limit; how many messages fit varies with demand",
      "Compute-based limit; depends on prompt, features and chat length",
    ],
  },
  {
    label: "How the limit resets",
    cells: [
      "Each tool resets on its own timer; the app shows the time",
      "Every five hours (session window)",
      "Every five hours, inside a weekly limit",
    ],
  },
  {
    label: "Numbers published",
    cells: [
      "3 file uploads a day; other tool limits not published",
      "No message count",
      "Multipliers only (Plus 2x, Pro 4x); no baseline number",
    ],
  },
  {
    label: "What uses your allowance fastest",
    cells: [
      "Files, images, voice and data analysis, each capped separately",
      "Long chats, many messages, heavier models and features",
      "Media generation, Deep Research, the Pro model, extended thinking",
    ],
  },
  {
    label: "Models on the free plan",
    cells: [
      "GPT-5.6 Luna (not GPT-5.6 Sol)",
      "Sonnet and Haiku (not Opus)",
      "Flash models, with limited access to the Pro model",
    ],
  },
  {
    label: "Ads",
    cells: [
      "Yes, in a growing list of countries",
      "No (Anthropic's stated policy)",
      "No ads in the Gemini app (Google's statement, Dec 2025)",
    ],
  },
  {
    label: "Step up to paid",
    cells: [
      "Paid plans raise the tool limits; see Plans",
      "Pro: at least 5x Free per session at peak hours",
      "AI Plus 2x, AI Pro 4x, AI Ultra 5x or 20x of Pro",
    ],
  },
  {
    label: "Where to see your usage",
    cells: [
      "A notice in ChatGPT with the reset time",
      "A notice in Claude when you reach the limit",
      "The usage limits page in Gemini's settings",
    ],
  },
];

// ---- Explainers ------------------------------------------------------------------

export interface ExplainerBlock {
  readonly title: string;
  readonly text: string;
}

export const HOW_LIMITS_WORK: readonly ExplainerBlock[] = [
  {
    title: "Message counts are being replaced by usage",
    text: "Early free plans said things like 10 messages every 5 hours. Claude and Gemini now measure how much work your chats cost rather than how many messages you send, and ChatGPT stopped counting text messages on its free plan in August 2026.",
  },
  {
    title: "A usage window refills on a timer",
    text: "Claude and Gemini give you an allowance that refills every five hours. A short question uses very little. A long chat, a large attachment or a research task uses much more, because longer conversations cost more to process.",
  },
  {
    title: "Gemini adds a weekly ceiling",
    text: "Google says Gemini's allowance refreshes every five hours until you reach a weekly limit. Once the weekly limit is used up, waiting five hours is not enough.",
  },
  {
    title: "ChatGPT caps tools, not text",
    text: "OpenAI keeps everyday text chat open and sets separate limits on file uploads, image creation, voice and data analysis. Only the file upload limit, 3 a day on Free, is published.",
  },
  {
    title: "Limits move with demand",
    text: "Anthropic says the number of messages varies with demand. OpenAI says it may lower upload limits at peak hours. The limit you get today can differ from the one you got last week.",
  },
];

export const STRETCH_TIPS: readonly ExplainerBlock[] = [
  {
    title: "Keep one job per chat",
    text: "Anthropic and Google both say chat length counts toward your limit. Start a new chat when the topic changes.",
  },
  {
    title: "Ask clearly the first time",
    text: "One well-written request costs less than five rounds of corrections. The five-part prompt formula in the prompting guide helps.",
  },
  {
    title: "Save heavy features for when they matter",
    text: "Images, video, deep research, and the Pro or thinking modes draw down your allowance faster than plain chat.",
  },
  {
    title: "Use the lighter model for easy tasks",
    text: "Quick rewrites, definitions and brainstorming rarely need the biggest model. Reported May 2026: Gemini Flash-Lite prompts do not count against your quota.",
  },
  {
    title: "Spread work across the day",
    text: "Claude and Gemini refill every five hours. A morning session and an afternoon session get two allowances.",
  },
  {
    title: "Have a second tool ready",
    text: "The three plans limit different things. If one runs out, another may not. Keep private data out of any tool you have not checked on the Privacy page.",
  },
];

// ---- Which plan fits --------------------------------------------------------------

export const WHICH_FITS_COLUMN_HEADERS: readonly string[] = ["Start with", "Why"];

export const WHICH_FITS_ROWS: readonly TableRow[] = [
  {
    label: "You ask lots of quick questions",
    cells: [
      "ChatGPT Free",
      "Text chat has no message cap, so quick questions rarely run out. Check the ads and privacy settings first.",
    ],
  },
  {
    label: "You work through long documents or drafts",
    cells: [
      "Claude Free or Gemini Free",
      "Both give one allowance that refills every five hours. Long chats and attachments use it fastest, so split big jobs into sessions.",
    ],
  },
  {
    label: "You already live in Google apps",
    cells: [
      "Gemini Free",
      "It signs in with your Google account and has its own usage limits page.",
    ],
  },
  {
    label: "You do not want ads",
    cells: [
      "Claude Free or Gemini Free",
      "Neither shows ads in its app today. ChatGPT Free can show ads, or you can choose its ad-free option with lower limits.",
    ],
  },
  {
    label: "You handle private, school or client data",
    cells: [
      "Read the Privacy page first",
      "Free plans differ on training and retention settings. Check them before pasting anything sensitive.",
    ],
  },
];

// ---- Recent changes ------------------------------------------------------------------

export interface FreeLimitsChange {
  /** Used for ordering; the exact day is not always published. */
  readonly sortDate: string;
  readonly dateLabel: string;
  readonly text: string;
  readonly source: SourceLink;
}

export const RECENT_CHANGES: readonly FreeLimitsChange[] = [
  {
    sortDate: "2026-02-04",
    dateLabel: "Feb 4, 2026",
    text: "Anthropic says Claude will stay ad-free.",
    source: ANTHROPIC_AD_FREE,
  },
  {
    sortDate: "2026-02-09",
    dateLabel: "Feb 9, 2026",
    text: "OpenAI starts testing ads on ChatGPT Free and Go in the US.",
    source: NOTEBOOKCHECK_ADS,
  },
  {
    sortDate: "2026-05-17",
    dateLabel: "May 17, 2026",
    text: "Gemini moves from daily prompt counts to compute-based limits that refresh every five hours inside a weekly limit.",
    source: GEMINI_LIMITS,
  },
  {
    sortDate: "2026-08-06",
    dateLabel: "Aug 2026",
    text: "OpenAI removes the text-message cap for ChatGPT Free and Go. GPT-5.6 Luna becomes the default model. File uploads, images, voice and data analysis keep their own limits.",
    source: OPENAI_FREE_FAQ,
  },
  {
    sortDate: "2026-08-11",
    dateLabel: "Aug 11, 2026",
    text: "ChatGPT ads launch in the UK, Mexico, Brazil, Japan and South Korea. Europe and India follow later in the month.",
    source: MLQ_ADS,
  },
];

// ---- Questions ---------------------------------------------------------------------------

export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

export const FREE_LIMITS_FAQ: readonly FaqEntry[] = [
  {
    question: "Will the free plans stay free?",
    answer:
      "We found no announced end date for any of the three. But OpenAI says the default model and limits can change over time, and all three providers have changed their free limits this year. Check this page's verified-on date.",
  },
  {
    question: "Why can't I find an exact number of messages?",
    answer:
      "Claude and Gemini measure usage, not messages, and neither publishes a message count. Blog posts that quote one are estimates, and many are out of date.",
  },
  {
    question: "What should I do when I hit a limit in the middle of a task?",
    answer:
      "Save your work. Each app tells you when you have reached a limit. Wait for the reset, move to a paid plan, or carry on in another tool. Before pasting private material into a tool you have not used, read the Privacy page.",
  },
  {
    question: "Is a free chat plan the same as the API?",
    answer:
      "No. Chat apps and the API are separate products with separate billing. The API charges per token, and any free API tier has its own limits. See the API costs page.",
  },
  {
    question: "Do the limits depend on my age or country?",
    answer:
      "Sometimes. Google says its May 2026 Gemini limits change did not apply to under-18 accounts. ChatGPT ads depend on country. Anthropic says you must be in a supported location to use Claude.",
  },
  {
    question: "Do free plans use my chats for training?",
    answer:
      "It depends on the provider and your settings. See the Privacy page for training, retention and deletion settings.",
  },
];

/** Things that can make this page wrong, shown in the "What can go wrong" box. */
export const FREE_LIMITS_RISKS: readonly string[] = [
  "Limits change without notice. Check the verified-on date.",
  "Numbers on blogs, such as 30 messages every 3 hours, are often estimates or out of date.",
  "The model on a free plan changes. The one you get today may differ from the one named here.",
  "Ads are labelled, but they appear near answers. Do not treat a sponsored card as advice.",
  "A free chat plan does not include API access.",
];

/** Pages a reader may want next. */
export const FREE_LIMITS_RELATED_LINKS: readonly LinkItem[] = [
  { label: "Consumer plans", href: "/prices/plans", description: "Prices for the paid plans that raise these limits." },
  { label: "Feature matrix", href: "/prices/features", description: "Voice, images, video, file upload, search, agents and memory." },
  { label: "Privacy matrix", href: "/prices/privacy", description: "Training, retention and deletion settings." },
  { label: "Free vs paid AI", href: "/learn/foundations/free-vs-paid-ai", description: "A plain-English guide to what you actually get." },
];

/** Every source cited on the page, each URL once. */
export const FREE_LIMITS_SOURCES: readonly SourceLink[] = collectUniqueSources([
  ...FREE_PLAN_PROFILES.map((profile) => profile.sources),
  RECENT_CHANGES.map((change) => change.source),
]);