import { collectUniqueSources } from "@/lib/shared/sources";
import type { LinkItem, SourceLink, TableRow } from "@/types";

/** Day every fact on the feature-matrix page was last checked against its source. */
export const FEATURE_MATRIX_VERIFIED_ON = "2026-10-21";

/** Page metadata for /prices/features. */
export const FEATURE_MATRIX_PAGE = {
  title: "Feature matrix",
  route: "/prices/features",
  description:
    "Voice, images, video, file upload, web search, agents and memory on ChatGPT, Claude and Gemini: what the free plan includes and what paying adds.",
} as const;

// ---- Sources ---------------------------------------------------------------
// Provider pages come first in the source hierarchy. Secondary reports are
// leads only, and every claim that rests on one says so in the text.

const CHATGPT_PRICING: SourceLink = {
  label: "ChatGPT plans and pricing",
  publisher: "OpenAI",
  url: "https://chatgpt.com/pricing/",
  kind: "provider",
};
const CHATGPT_WORK: SourceLink = {
  label: "ChatGPT Work for every team",
  publisher: "OpenAI",
  url: "https://openai.com/chatgpt-work/",
  kind: "provider",
};
const CHATGPT_WORK_LAUNCH: SourceLink = {
  label: "ChatGPT is now a partner for your most ambitious work",
  publisher: "OpenAI",
  url: "https://openai.com/index/chatgpt-for-your-most-ambitious-work/",
  kind: "provider",
};
const CHATGPT_RELEASE_NOTES: SourceLink = {
  label: "ChatGPT release notes",
  publisher: "OpenAI Help Center",
  url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
  kind: "provider",
};
const CHATGPT_UPLOADS: SourceLink = {
  label: "Uploading files and audio to ChatGPT",
  publisher: "OpenAI Help Center",
  url: "https://help.openai.com/en/articles/8555545-uploading-files-and-audio-to-chatgpt",
  kind: "provider",
};
const CLAUDE_PRICING: SourceLink = {
  label: "Claude plans and pricing",
  publisher: "Anthropic",
  url: "https://claude.com/pricing",
  kind: "provider",
};
const CLAUDE_WHAT_IS: SourceLink = {
  label: "What is Claude?",
  publisher: "Claude Help Center",
  url: "https://support.claude.com/en/articles/8114491",
  kind: "provider",
};
const GEMINI_FEATURES: SourceLink = {
  label: "Gemini Apps limits and feature availability",
  publisher: "Gemini Apps Help (Google)",
  url: "https://support.google.com/gemini/answer/16275805",
  kind: "provider",
};
const GEMINI_SUBSCRIPTIONS: SourceLink = {
  label: "Google AI plans for Gemini",
  publisher: "Google",
  url: "https://gemini.google/subscriptions/",
  kind: "provider",
};
const GEMINI_SAVED_INFO: SourceLink = {
  label: "Save info and reference past chats in Gemini Apps",
  publisher: "Gemini Apps Help (Google)",
  url: "https://support.google.com/gemini/answer/16413516",
  kind: "provider",
};

const SORA_STAGES_REPORT: SourceLink = {
  label: "OpenAI sets two-stage Sora shutdown with app closing April 2026 and API following in September",
  publisher: "The Decoder",
  url: "https://the-decoder.com/openai-sets-two-stage-sora-shutdown-with-app-closing-april-2026-and-api-following-in-september/",
  kind: "secondary",
};
const SORA_ANNOUNCEMENT_REPORT: SourceLink = {
  label: "What happened to Sora? OpenAI shuts down its AI video app",
  publisher: "Pasquale Pillitteri",
  url: "https://pasqualepillitteri.it/en/news/4453/what-happened-to-sora-openai-shutdown",
  kind: "secondary",
};
const CHATGPT_VOICE_REPORT: SourceLink = {
  label: "ChatGPT Free vs Plus: what $20 really gets you",
  publisher: "HowToAI, Sep 2026",
  url: "https://howtoai.com/chatgpt-free-vs-plus/",
  kind: "secondary",
};
const CLAUDE_MEMORY_REPORT: SourceLink = {
  label: "Is Claude AI free? Pricing guide",
  publisher: "AItomation Academy, Oct 2026",
  url: "https://www.aitomationacademy.com/blog/is-claude-ai-free-pricing-guide",
  kind: "secondary",
};
const CLAUDE_UPLOADS_REPORT: SourceLink = {
  label: "Using Claude for free: features, limits and alternatives",
  publisher: "Bakedwith",
  url: "https://www.bakedwith.com/en/blog/using-claude-for-free-features-limits-alternatives",
  kind: "secondary",
};
const GEMINI_PAST_CHATS_REPORT: SourceLink = {
  label: "Gemini app rolling out Past Chats personalization to free users",
  publisher: "9to5Google",
  url: "https://9to5google.com/?p=706175",
  kind: "secondary",
};
const GEMINI_SEARCH_REPORT: SourceLink = {
  label: "Can Gemini search the web? How Google grounding works",
  publisher: "FixAEO, Aug 2026",
  url: "https://fixaeo.com/blogs/can-gemini-search-the-web/",
  kind: "secondary",
};
const GEMINI_AGENT_REPORT: SourceLink = {
  label: "Google AI plans with cloud storage",
  publisher: "Google One",
  url: "https://one.google.com/about/google-ai-plans/",
  kind: "secondary",
};

// ---- Tables -------------------------------------------------------------------

/** Provider columns, in the same order in every table on the page. */
export const PROVIDER_COLUMN_HEADERS: readonly string[] = ["ChatGPT", "Claude", "Gemini"];

/** Identifier of a feature section, used for anchors. */
export type FeatureId =
  | "voice"
  | "images"
  | "video"
  | "file-upload"
  | "web-search"
  | "agents"
  | "memory"
  | "deep-research";

/** One feature explained: what it is, the details per provider, and what to watch for. */
export interface FeatureSection {
  readonly id: FeatureId;
  readonly title: string;
  readonly intro: string;
  readonly rows: readonly TableRow[];
  readonly watchFor: readonly string[];
}

export const FEATURE_SECTIONS: readonly FeatureSection[] = [
  {
    id: "voice",
    title: "Voice",
    intro:
      "Voice lets you talk to the assistant and hear it answer. Some plans add video, so the assistant can also see what your camera sees.",
    rows: [
      {
        label: "Free plan",
        cells: [
          "Voice chats, with a limit. No voice with video.",
          "Voice mode is included. Anthropic publishes no voice limit.",
          "Gemini Live is included.",
        ],
      },
      {
        label: "Paid plans",
        cells: [
          "Go and Plus expand voice, and voice with video starts at Go. Pro is unlimited, subject to abuse guardrails.",
          "The same voice mode on every plan. Paid plans give more usage.",
          "Paid plans raise your usage limits. Google lists no separate voice tier.",
        ],
      },
      {
        label: "Published numbers",
        cells: [
          "OpenAI says only expanded or unlimited. One report puts Plus at up to 3 hours a day on the full voice model. (Secondary report.)",
          "None.",
          "None.",
        ],
      },
    ],
    watchFor: [
      "Voice limits are the least published of any feature. Test it before you rely on it.",
      "A voice chat may be stored and used like text chats. See the Privacy page.",
    ],
  },
  {
    id: "images",
    title: "Images",
    intro:
      "This row is about making new pictures from a prompt. Reading a picture you upload is a different feature, usually counted under file upload.",
    rows: [
      {
        label: "Free plan",
        cells: [
          "Yes, limited and slower.",
          "No image generator is listed. Claude Design, Slides and Docs are included.",
          "Yes, with Nano Banana 2.",
        ],
      },
      {
        label: "Paid plans",
        cells: [
          "Go gives more images. Plus adds image creation with Thinking for more complex, accurate images. Pro is unlimited and faster, subject to abuse guardrails.",
          "Nothing to add.",
          "Plus and above add redo images with Nano Banana Pro.",
        ],
      },
      {
        label: "Published numbers",
        cells: [
          "OpenAI does not publish an image count.",
          "Not applicable.",
          "None. Media generation uses more of your allowance than text.",
        ],
      },
    ],
    watchFor: [
      "Generated images can contain errors and can mislead. Never present one as a real photo.",
      "Read the scams and deepfakes guide before you share generated images of real people.",
    ],
  },
  {
    id: "video",
    title: "Video",
    intro: "Video generation turns a prompt, or a picture plus a prompt, into a short clip.",
    rows: [
      {
        label: "Free plan",
        cells: [
          "No. OpenAI shut the Sora app on Apr 26, 2026.",
          "No video generator is listed.",
          "No. Video generation starts at Google AI Plus.",
        ],
      },
      {
        label: "Paid plans",
        cells: [
          "No video feature on the plan pages we checked.",
          "None listed. A beta called Claude Motion appears only for Team and Enterprise plans. We have not checked what it makes.",
          "Plus, Pro and Ultra include video generation.",
        ],
      },
      {
        label: "Published numbers",
        cells: [
          "Not applicable.",
          "Not applicable.",
          "None. Google says video generally uses the most of your allowance.",
        ],
      },
    ],
    watchFor: [
      "OpenAI's Sora API was scheduled to close on Sep 24, 2026. Tools built on it have stopped or will stop. (Secondary report.)",
      "Video uses far more of your allowance than text. One clip can use a large share of a free allowance.",
    ],
  },
  {
    id: "file-upload",
    title: "File upload",
    intro:
      "File upload lets you give the assistant a document, spreadsheet or image to read. How much it can read at once depends on its context window.",
    rows: [
      {
        label: "Free plan",
        cells: [
          "Limited: 3 uploads a day. Input of about 12 pages of text per OpenAI's plan page.",
          "Files can be uploaded and created, and code can run on them. Uploads count toward your usage. (Upload detail: secondary report.)",
          "Upload and analyse files. The free context window is 32k tokens, so very long files may not be fully read.",
        ],
      },
      {
        label: "Paid plans",
        cells: [
          "Go and above lift the limited label. Plus input is about 40 pages of text per OpenAI's plan page. Audio uploads need a paid plan.",
          "More usage. Context up to 1M tokens, varying by model, on every plan.",
          "Plus has a 128k-token window. Pro and Ultra have 1 million tokens, which Google says is about 1,500 pages.",
        ],
      },
      {
        label: "Published numbers",
        cells: [
          "3 uploads a day on Free. Text and document files up to 2 million tokens each.",
          "Context window only, not an upload count.",
          "Context window by plan.",
        ],
      },
    ],
    watchFor: [
      "A bigger context window helps, but a model can still miss details in a long file.",
      "Do not upload files with passwords, IDs or client data. See the guide on what never to share.",
    ],
  },
  {
    id: "web-search",
    title: "Web search",
    intro:
      "With web search, the assistant can look things up online and cite pages, instead of answering from memory alone.",
    rows: [
      {
        label: "Free plan",
        cells: [
          "Yes.",
          "Yes.",
          "Yes, through Google Search. Google notes that not every answer includes sources. (Secondary report.)",
        ],
      },
      {
        label: "Paid plans",
        cells: [
          "The same feature, with more usage.",
          "The same feature, with more usage. Claude's Research mode, which runs many searches, is separate.",
          "The same feature, with higher limits.",
        ],
      },
      {
        label: "Published numbers",
        cells: ["None.", "None.", "None."],
      },
    ],
    watchFor: [
      "Search does not make answers true. Open the sources and check them.",
      "Use the fact-checking routine for health, legal and money questions.",
    ],
  },
  {
    id: "agents",
    title: "Agents",
    intro:
      "An agent does multi-step work for you, such as browsing, filling in forms, working on files or running code. It can take real actions, so permissions matter.",
    rows: [
      {
        label: "Free plan",
        cells: [
          "ChatGPT Work in the desktop app for Mac and Windows, with limited use.",
          "No agent products. Claude Code, Claude in Chrome, and hand off and schedule tasks start at Pro.",
          "Screen automation is listed for every plan. Gemini Agent is a higher-tier feature.",
        ],
      },
      {
        label: "Paid plans",
        cells: [
          "Plus and above add Work on web and mobile, agent mode, Tasks and Codex. Pro gets the most.",
          "Pro adds Claude Code, Claude in Chrome, Microsoft 365 add-ins, and hand off and schedule tasks. Max adds usage.",
          "Plus adds scheduled actions and Daily brief. Pro adds Tasks in Gemini. Ultra gets first access to Gemini Agent, listed as US and English only. (Secondary report.)",
        ],
      },
      {
        label: "Published numbers",
        cells: [
          "Free and Go use is described as limited.",
          "Agents draw on the same usage pool as chat.",
          "None.",
        ],
      },
    ],
    watchFor: [
      "Give an agent the least access it needs. Read its permission prompts.",
      "Agents can be tricked by text on a web page. See the guide on prompt injection and agent security.",
    ],
  },
  {
    id: "memory",
    title: "Memory",
    intro:
      "Memory lets the assistant keep facts about you, such as your job or tone, and bring them into later chats. It also means it stores personal details.",
    rows: [
      {
        label: "Free plan",
        cells: [
          "Limited memory, including memory from past chats. Memory sources are shown.",
          "Memory across conversations is included. Reported as on by default. (Secondary report.)",
          "Past chats and saved info, under Personal context. Rolled out to free users worldwide, with Europe later. (Secondary report.) Not for under-18s.",
        ],
      },
      {
        label: "Paid plans",
        cells: [
          "Go removes the limited label. Plus and Pro expand memory.",
          "The same memory on every individual plan.",
          "Google's feature table does not split memory by plan.",
        ],
      },
      {
        label: "Where to turn it off",
        cells: [
          "In ChatGPT's settings.",
          "In Claude's settings.",
          "Settings and help, then Personal context.",
        ],
      },
      {
        label: "Switching tools",
        cells: [
          "Not checked.",
          "Free, Pro and Max users can import memory from other AI providers.",
          "A help page covers importing from other AI platforms.",
        ],
      },
    ],
    watchFor: [
      "Memory can carry an old or wrong fact into new chats. Review what is stored.",
      "Use a temporary or incognito chat when you do not want a chat remembered.",
    ],
  },
  {
    id: "deep-research",
    title: "Deep research",
    intro:
      "Deep research runs many searches and reasoning steps and returns a long, cited report. It is slow, and it uses a lot of your allowance.",
    rows: [
      {
        label: "Free plan",
        cells: [
          "Limited.",
          "No. Research is Pro and above.",
          "Yes, but it may be unavailable at busy times for accounts without a plan.",
        ],
      },
      {
        label: "Paid plans",
        cells: [
          "Go is limited. Plus has full access, and Pro the most.",
          "Pro and above get Research: multi-source reports with citations.",
          "More runs on every paid plan, using a high share of your allowance.",
        ],
      },
      {
        label: "Published numbers",
        cells: [
          "OpenAI shows a counter in the app.",
          "None.",
          "None on Google's help page.",
        ],
      },
    ],
    watchFor: [
      "Check the sources the report cites. Reports can still contain errors.",
      "See the deep research guide for how to write a research brief.",
    ],
  },
];

/** The free plan, one row per feature. Labels match the section titles. */
export const FREE_PLAN_ROWS: readonly TableRow[] = [
  {
    label: "Voice",
    cells: ["Yes, limited. No voice with video.", "Yes", "Yes (Gemini Live)"],
  },
  {
    label: "Images",
    cells: ["Yes, limited and slower", "No image generator listed", "Yes (Nano Banana 2)"],
  },
  {
    label: "Video",
    cells: ["No (Sora closed Apr 26, 2026)", "No video generator listed", "No (starts at Google AI Plus)"],
  },
  {
    label: "File upload",
    cells: ["Limited: 3 a day", "Yes, counts toward usage", "Yes, 32k-token window"],
  },
  {
    label: "Web search",
    cells: ["Yes", "Yes", "Yes, via Google Search"],
  },
  {
    label: "Agents",
    cells: [
      "Limited: ChatGPT Work on desktop",
      "No",
      "Screen automation listed; Gemini Agent is higher tier",
    ],
  },
  {
    label: "Memory",
    cells: ["Limited", "Yes", "Yes (past chats and saved info)"],
  },
  {
    label: "Deep research",
    cells: ["Limited", "No", "Yes, if capacity allows"],
  },
];

/** What the first paid steps add, one row per feature. Labels match the section titles. */
export const PAID_PLAN_ROWS: readonly TableRow[] = [
  {
    label: "Voice",
    cells: [
      "Go and Plus expand it; voice with video from Go",
      "Same feature, more usage",
      "Higher limits",
    ],
  },
  {
    label: "Images",
    cells: [
      "Go: more. Plus: image creation with Thinking",
      "Nothing to add",
      "Plus and above: redo with Nano Banana Pro",
    ],
  },
  {
    label: "Video",
    cells: ["Not offered", "Not offered", "Google AI Plus and above"],
  },
  {
    label: "File upload",
    cells: [
      "Go and above lift the limited label",
      "More usage; Projects beyond five on Pro",
      "Plus 128k tokens; Pro and Ultra 1M tokens",
    ],
  },
  {
    label: "Web search",
    cells: ["No change", "No change", "No change"],
  },
  {
    label: "Agents",
    cells: [
      "Plus: Work on web and mobile, agent mode, Tasks",
      "Pro: Claude Code, Claude in Chrome, hand off tasks",
      "Plus: scheduled actions. Pro: Tasks. Ultra: Gemini Agent",
    ],
  },
  {
    label: "Memory",
    cells: ["Go: full. Plus and Pro: expanded", "No change", "Not split by plan"],
  },
  {
    label: "Deep research",
    cells: ["Plus: full access", "Pro: Research", "More runs on paid plans"],
  },
];

// ---- Choosing by need ---------------------------------------------------------------

export const NEED_COLUMN_HEADERS: readonly string[] = ["Look first at", "Why"];

export const NEED_ROWS: readonly TableRow[] = [
  {
    label: "Make images",
    cells: [
      "Gemini or ChatGPT",
      "Both include image generation on the free plan, with limits. Anthropic lists no image generator for Claude.",
    ],
  },
  {
    label: "Make short video clips",
    cells: [
      "Gemini, from Google AI Plus",
      "OpenAI closed the Sora app and Claude lists no video generator.",
    ],
  },
  {
    label: "Hand off a multi-step job",
    cells: [
      "ChatGPT Work or Claude on Pro",
      "ChatGPT Work has a limited desktop version on Free. Claude's agent products start at Pro.",
    ],
  },
  {
    label: "Get a cited research report",
    cells: [
      "Gemini Deep Research, ChatGPT, or Claude Research",
      "Gemini includes it on Free when capacity allows. ChatGPT limits it on Free. Claude needs Pro.",
    ],
  },
  {
    label: "Read a very long document",
    cells: [
      "A plan with a large context window",
      "Gemini Pro and Ultra have 1 million tokens. Claude lists up to 1M, varying by model. Free ChatGPT reads about 12 pages and Free Gemini 32k tokens.",
    ],
  },
  {
    label: "Have it remember you",
    cells: [
      "Any of the three",
      "All three have memory. Check the settings, and the Privacy page, before you switch it on.",
    ],
  },
];

// ---- Recent changes ------------------------------------------------------------------

export interface FeatureChange {
  /** Used for ordering; the exact day is not always published. */
  readonly sortDate: string;
  readonly dateLabel: string;
  readonly text: string;
  readonly source: SourceLink;
}

export const FEATURE_CHANGES: readonly FeatureChange[] = [
  {
    sortDate: "2026-03-01",
    dateLabel: "Mar 2026",
    text: "Claude memory reaches all plans, including Free. (Secondary report.)",
    source: CLAUDE_MEMORY_REPORT,
  },
  {
    sortDate: "2026-03-24",
    dateLabel: "Mar 24, 2026",
    text: "OpenAI says it will shut down Sora, its video app and API.",
    source: SORA_ANNOUNCEMENT_REPORT,
  },
  {
    sortDate: "2026-04-26",
    dateLabel: "Apr 26, 2026",
    text: "The Sora app closes. ChatGPT's image generator stays.",
    source: SORA_STAGES_REPORT,
  },
  {
    sortDate: "2026-07-09",
    dateLabel: "Jul 2026",
    text: "OpenAI launches ChatGPT Work, an agent in ChatGPT. The desktop app has it on every plan, and web and mobile follow on paid plans.",
    source: CHATGPT_WORK_LAUNCH,
  },
  {
    sortDate: "2026-09-24",
    dateLabel: "Sep 24, 2026",
    text: "Scheduled end date of the Sora API.",
    source: SORA_STAGES_REPORT,
  },
];

// ---- Questions ---------------------------------------------------------------------------

export interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

export const FEATURE_FAQ: readonly FaqEntry[] = [
  {
    question: "Which free plan has the most features?",
    answer:
      "It depends on what you need. Gemini Free lists the most creation tools: images, music and Deep Research. ChatGPT Free covers voice, images, search and files, each with limits. Claude Free adds memory, file creation, code and Design, Slides and Docs, but no image generator.",
  },
  {
    question: "What does limited mean?",
    answer:
      "The provider caps the feature and, in most cases, does not say where. The Free-plan limits page explains what each provider publishes.",
  },
  {
    question: "Do features differ by country or app?",
    answer:
      "Yes. Gemini's past-chats memory reached Europe later, Google AI Plus and Pro are listed by country, and some Gemini Agent features are US and English only. ChatGPT Work is on the desktop app for every plan but on web and mobile only for paid plans.",
  },
  {
    question: "Is a paid app plan the same as the API?",
    answer:
      "No. Apps and the API are separate products with separate billing. A feature on a Plus, Pro or AI Pro plan is not automatically in the API.",
  },
  {
    question: "Can I bring my memory when I switch tools?",
    answer:
      "Claude says Free, Pro and Max users can import memory from other AI providers, and Gemini has a help page on importing from other AI platforms. We have not checked ChatGPT's import options.",
  },
  {
    question: "Why are only three providers listed?",
    answer:
      "This page covers the providers on the Plans page. Others may be added later.",
  },
];

/** Things that can make this page wrong, shown in the "What can go wrong" box. */
export const FEATURE_RISKS: readonly string[] = [
  "Features roll out in stages by plan, country and app. This page shows what providers list, not what your account shows.",
  "Yes does not mean unlimited. Check the Free-plan limits page.",
  "Providers rename and move features. Claude Cowork became part of Claude, and ChatGPT added Work. Check the name in the app.",
  "A feature on a paid plan can move to another plan with little notice.",
  "We have not tested these features ourselves. Every row comes from provider pages or the reports marked secondary.",
];

/** Pages a reader may want next. */
export const FEATURE_RELATED_LINKS: readonly LinkItem[] = [
  { label: "Free-plan limits", href: "/prices/free-limits", description: "How far each free plan goes." },
  { label: "Consumer plans", href: "/prices/plans", description: "Prices of the plans that add these features." },
  { label: "Privacy matrix", href: "/prices/privacy", description: "Training, retention and deletion settings." },
  { label: "AI agents explained", href: "/learn/power-user/ai-agents-explained", description: "What agents can do and how they fail." },
  { label: "Cheat sheets", href: "/tools/cheat-sheets", description: "Includes the agent permission checklist." },
];

/** Every source cited on the page, each URL once. */
export const FEATURE_SOURCES: readonly SourceLink[] = collectUniqueSources([
  [
    CHATGPT_PRICING,
    CHATGPT_WORK,
    CHATGPT_WORK_LAUNCH,
    CHATGPT_RELEASE_NOTES,
    CHATGPT_UPLOADS,
    CLAUDE_PRICING,
    CLAUDE_WHAT_IS,
    GEMINI_FEATURES,
    GEMINI_SUBSCRIPTIONS,
    GEMINI_SAVED_INFO,
    CHATGPT_VOICE_REPORT,
    CLAUDE_UPLOADS_REPORT,
    GEMINI_PAST_CHATS_REPORT,
    GEMINI_SEARCH_REPORT,
    GEMINI_AGENT_REPORT,
  ],
  FEATURE_CHANGES.map((change) => change.source),
]);
