// import { collectUniqueSources } from "@/lib/shared/sources";
// import type { LinkItem, SourceLink, TableRow } from "@/types";

// /** Day every fact on the free-limits page was last checked against its source. */
// export const FREE_LIMITS_VERIFIED_ON = "2026-10-21";

// /** Page metadata for /prices/free-limits. */
// export const FREE_LIMITS_PAGE = {
//   title: "Free-plan limits",
//   route: "/prices/free-limits",
//   description:
//     "What the free versions of ChatGPT, Claude and Gemini include, where each one stops, and which ones show ads.",
// } as const;

// // ---- Sources ---------------------------------------------------------------
// // Provider pages come first in the source hierarchy. Secondary reports are
// // leads only, and every claim that rests on one is marked on the page.

// const OPENAI_FREE_FAQ: SourceLink = {
//   label: "ChatGPT Free Tier FAQ",
//   publisher: "OpenAI Help Center",
//   url: "https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq",
//   kind: "provider",
// };
// const OPENAI_MODELS: SourceLink = {
//   label: "GPT-6 and other models in ChatGPT",
//   publisher: "OpenAI Help Center",
//   url: "https://help.openai.com/en/articles/20001354-gpt-6-and-other-models-in-chatgpt",
//   kind: "provider",
// };
// const OPENAI_UPLOADS: SourceLink = {
//   label: "Uploading files and audio to ChatGPT",
//   publisher: "OpenAI Help Center",
//   url: "https://help.openai.com/en/articles/8555545-uploading-files-and-audio-to-chatgpt",
//   kind: "provider",
// };
// const CLAUDE_FREE_USAGE: SourceLink = {
//   label: "About Free Claude Usage",
//   publisher: "Claude Help Center",
//   url: "https://support.claude.com/en/articles/8602283-about-free-claude-usage",
//   kind: "provider",
// };
// const CLAUDE_INCREASE_LIMITS: SourceLink = {
//   label: "How do I increase my usage limits?",
//   publisher: "Claude Help Center",
//   url: "https://support.claude.com/en/articles/8241175-how-do-i-increase-my-usage-limits",
//   kind: "provider",
// };
// const CLAUDE_PRO_USAGE: SourceLink = {
//   label: "About Claude's Pro Plan Usage",
//   publisher: "Claude Help Center",
//   url: "https://support.claude.com/en/articles/8324991-about-claude-s-pro-plan-usage",
//   kind: "provider",
// };
// const ANTHROPIC_AD_FREE: SourceLink = {
//   label: "Claude is a space to think",
//   publisher: "Anthropic",
//   url: "https://anthropic.com/news/claude-is-a-space-to-think",
//   kind: "provider",
// };
// const GEMINI_LIMITS: SourceLink = {
//   label: "Usage limits for Gemini Apps",
//   publisher: "Gemini Apps Help (Google)",
//   url: "https://support.google.com/gemini/answer/17004136",
//   kind: "provider",
// };

// const PCWORLD_TEXT_CAP: SourceLink = {
//   label: "OpenAI is finally killing ChatGPT's text chat limits for free users",
//   publisher: "PCWorld, Aug 7, 2026",
//   url: "https://www.pcworld.com/article/3208588/openai-is-finally-killing-chatgpts-text-chat-limits-for-free-users.html",
//   kind: "secondary",
// };
// const NOTEBOOKCHECK_ADS: SourceLink = {
//   label: "ChatGPT ads: where they run now and how to switch them off",
//   publisher: "Notebookcheck",
//   url: "https://www.notebookcheck.net/ChatGPT-ads-where-they-run-now-and-how-to-switch-them-off.1361301.0.html",
//   kind: "secondary",
// };
// const MLQ_ADS: SourceLink = {
//   label: "OpenAI expands ChatGPT ad test to five more countries",
//   publisher: "MLQ.ai, Aug 2026",
//   url: "https://mlq.ai/news/openai-expands-chatgpt-ad-test-to-five-more-countries/",
//   kind: "secondary",
// };
// const TECHCRUNCH_INDIA_ADS: SourceLink = {
//   label: "OpenAI to start showing ads on ChatGPT's free and Go tiers in India",
//   publisher: "TechCrunch, Aug 27, 2026",
//   url: "https://techcrunch.com/2026/08/27/openai-to-start-showing-ads-on-chatgpts-free-and-go-tiers-in-india/",
//   kind: "secondary",
// };
// const GOOGLE_NO_ADS_REPORT: SourceLink = {
//   label: "Google says there are 'no plans' to put ads in the Gemini app",
//   publisher: "9to5Google, Dec 8, 2025",
//   url: "https://9to5google.com/2025/12/08/google-gemini-no-ads/",
//   kind: "secondary",
// };
// const THURROTT_GEMINI_QUOTA: SourceLink = {
//   label: "Gemini usage limit changes after user feedback",
//   publisher: "Thurrott, May 2026",
//   url: "https://www.thurrott.com/?p=336722",
//   kind: "secondary",
// };
// const BAKEDWITH_CLAUDE_FREE: SourceLink = {
//   label: "Using Claude for free: features, limits and alternatives",
//   publisher: "Bakedwith",
//   url: "https://www.bakedwith.com/en/blog/using-claude-for-free-features-limits-alternatives",
//   kind: "secondary",
// };
// const FELLO_GEMINI_FREE: SourceLink = {
//   label: "Is Google Gemini free?",
//   publisher: "Fello AI",
//   url: "https://felloai.com/is-gemini-free/",
//   kind: "secondary",
// };
// const MLQ_GEMINI_FLASH_LITE: SourceLink = {
//   label: "Google limits free Gemini users to Flash-Lite starting October 9",
//   publisher: "MLQ.ai, Oct 2026",
//   url: "https://mlq.ai/news/google-limits-free-gemini-users-to-flash-lite-starting-october-9/",
//   kind: "secondary",
// };
// const AITOOLBOX_GEMINI_LIMITS: SourceLink = {
//   label: "Gemini usage limits 2026: Free, Plus, Pro and Ultra",
//   publisher: "AI Toolbox, Oct 2026",
//   url: "https://www.ai-toolbox.co/gemini-management-and-productivity/gemini-usage-limits-2026",
//   kind: "secondary",
// };
// const AICAREERLAB_CHATGPT_PLANS: SourceLink = {
//   label: "ChatGPT Go vs Plus vs Pro (Oct 2026)",
//   publisher: "The AI Career Lab, Oct 2026",
//   url: "https://theaicareerlab.com/blog/chatgpt-pricing-plans-explained",
//   kind: "secondary",
// };
// const MCKELVEY_CHATGPT_LIMITS: SourceLink = {
//   label: "ChatGPT usage limits (2026): what Plus, Pro and Business actually get",
//   publisher: "Justin McKelvey, Oct 2026",
//   url: "https://justinmckelvey.com/blog/chatgpt-usage-limits",
//   kind: "secondary",
// };
// const DECODER_ADS: SourceLink = {
//   label: "ChatGPT now shows ads to free and Go users, with opt-out cutting daily message limits",
//   publisher: "The Decoder",
//   url: "https://the-decoder.com/chatgpt-now-shows-ads-to-free-and-go-users-with-opt-out-cutting-daily-message-limits/",
//   kind: "secondary",
// };
// const OMID_CLAUDE_FREE: SourceLink = {
//   label: "Is Claude free? Claude pricing and limits (2026)",
//   publisher: "Omid Saffari, Oct 2026",
//   url: "https://omidsaffari.com/blog/is-claude-free",
//   kind: "secondary",
// };
// const DATASTUDIOS_CLAUDE: SourceLink = {
//   label: "Claude Free limits in 2026",
//   publisher: "Data Studios",
//   url: "https://www.datastudios.org/post/claude-free-limits-updated-usage-restrictions-message-caps-and-file-upload-rules",
//   kind: "secondary",
// };
// const SSDNODES_CLAUDE: SourceLink = {
//   label: "Claude free tier: what the limits actually are",
//   publisher: "SSD Nodes, Oct 2026",
//   url: "https://www.ssdnodes.com/learn/claude-free-tier-limits",
//   kind: "secondary",
// };

// // ---- Plan profiles -----------------------------------------------------------

// /** Identifier of a provider covered on the page. */
// export type ProviderId = "chatgpt" | "claude" | "gemini";

// /** Everything the page says about one free plan. */
// export interface FreePlanProfile {
//   readonly id: ProviderId;
//   readonly product: string;
//   readonly includes: readonly string[];
//   readonly notIncluded: readonly string[];
//   readonly stops: readonly string[];
//   readonly ads: {
//     readonly hasAds: boolean;
//     readonly headline: string;
//     readonly details: readonly string[];
//   };
//   readonly sources: readonly SourceLink[];
// }

// export const FREE_PLAN_PROFILES: readonly FreePlanProfile[] = [
//   {
//     id: "chatgpt",
//     product: "ChatGPT",
//     includes: [
//       "Everyday text chat on GPT-5.6 Luna, the lightest model in OpenAI's GPT-5.6 line.",
//       "Reported: from Oct 8, 2026 Free and Go chat is moving to GPT-6 Luna. OpenAI's help-page copies still name GPT-5.6 Luna, so the model you see may differ. (Secondary report.)",
//       "Web search and data analysis.",
//       "Uploading images and files to a chat.",
//       "Image creation, and voice, each with its own limit.",
//       "Discovering and using GPTs.",
//       "A Library with 500 MB of storage.",
//     ],
//     notIncluded: [
//       "GPT-5.6 Sol, the larger model, which is not offered on Free or Go.",
//       "Audio file uploads, which need a paid plan.",
//       "GPT-6 Sol, the chat model on Plus and above since Oct 7, 2026. GPT-6 Pro in chat is not part of Free, Go or Plus. (Secondary report.)",
//       "Creating new GPTs, which is not available on personal accounts, Free included.",
//     ],
//     stops: [
//       "Text chat has no message cap on everyday chats, subject to abuse-prevention safeguards.",
//       "OpenAI's own help-page copies have disagreed on this: one says Free text is uncapped, another says Free model usage is limited. The notice inside ChatGPT is the final word.",
//       "File uploads are limited to 3 a day on Free, and OpenAI may lower that at peak hours. Text and document files can hold up to 2 million tokens each.",
//       "Image creation, voice and data analysis have separate limits. OpenAI does not publish those numbers.",
//       "When you reach a tool's limit, that tool pauses until it resets. ChatGPT shows the reset time in the app.",
//       "Free allows 5 files per project. (Secondary report.)",
//       "ChatGPT Work and Codex are limited and desktop-only on Free, and those meters reset on rolling five-hour windows rather than daily. (Secondary report.)",
//       "The next step, ChatGPT Go, is reported at roughly 10 times Free's messages, uploads and images, and it may still show ads. Plus is the first ad-free plan. See Plans for prices. (Secondary report.)",
//     ],
//     ads: {
//       hasAds: true,
//       headline: "Ads on Free and Go",
//       details: [
//         "Ads can appear for adults on the Free and Go plans. Plus, Pro, Business, Enterprise and Education plans are ad-free.",
//         "Each ad is labelled as sponsored and sits below the answer. OpenAI says ads do not influence the answers.",
//         "Ads began in the US on Feb 9, 2026. They have since reached other markets, including the UK, Mexico, Brazil, Japan, South Korea and Europe, and OpenAI announced them for India on Aug 27, 2026. The rollout is gradual, so some free users still see none.",
//         "Free users can choose an ad-free option in return for lower usage limits and fewer features. OpenAI does not say how much lower.",
//         "During the test, ads are matched to the topic of your conversation, your past chats and your past interactions with ads. Advertisers get aggregated results, not your chats. (Secondary report.)",
//         "Under-18s see no ads, and ads are kept away from sensitive topics such as health, mental health and politics. (Secondary report.)",
//       ],
//     },
//     sources: [
//       OPENAI_FREE_FAQ,
//       OPENAI_MODELS,
//       OPENAI_UPLOADS,
//       PCWORLD_TEXT_CAP,
//       NOTEBOOKCHECK_ADS,
//       MLQ_ADS,
//       TECHCRUNCH_INDIA_ADS,
//       DECODER_ADS,
//       AICAREERLAB_CHATGPT_PLANS,
//       MCKELVEY_CHATGPT_LIMITS,
//     ],
//   },
//   {
//     id: "claude",
//     product: "Claude",
//     includes: [
//       "Chat with the Sonnet and Haiku models. (Secondary report.)",
//       "Web search, file uploads and memory across chats. (Secondary report.)",
//       "Up to five Projects. (Secondary report.)",
//       "Claude Design, Docs and Slides, so making a document or deck does not need a paid plan. (Secondary report.)",
//       "A 200K-token context window. (Secondary report.)",
//     ],
//     notIncluded: [
//       "Opus models and Claude Code, which come with paid plans. (Secondary report.)",
//       "Dashboards, Motion and monthly API credits, which Free excludes. (Secondary report.)",
//     ],
//     stops: [
//       "One session-based limit that resets every five hours.",
//       "How many messages fit varies with demand, and Anthropic may add other limits to keep access fair.",
//       "Claude tells you when you reach the limit, or when a prompt is longer than the available context window. The context window can also vary with demand.",
//       "Anthropic publishes no message count. Its paid Pro plan gives at least five times Free's usage per session at peak hours.",
//       "Anthropic describes its Pro limits as depending on conversation length, the number of messages, and the model or feature used. Free uses the same five-hour session design, so expect long chats and heavy features to use the allowance faster.",
//       "On Free there is no weekly limit on top of the five-hour session. Paid plans add weekly limits. (Secondary report of Anthropic's pricing page.)",
//       "Starting a new chat does not refill the allowance, because it belongs to your account. (Secondary report.)",
//       "Anthropic occasionally offers a \"Reset for free\" button in Settings > Usage. Its documentation does not list Free-plan eligibility, so do not plan around it. (Secondary report.)",
//     ],
//     ads: {
//       hasAds: false,
//       headline: "No ads",
//       details: [
//         "Anthropic says Claude will stay ad-free. It rules out ads that sit beside the conversation as well as ads that change answers.",
//         "The commitment was published on Feb 4, 2026. It is a policy, not a technical guarantee, so we re-check it each month.",
//       ],
//     },
//     sources: [
//       CLAUDE_FREE_USAGE,
//       CLAUDE_INCREASE_LIMITS,
//       CLAUDE_PRO_USAGE,
//       ANTHROPIC_AD_FREE,
//       BAKEDWITH_CLAUDE_FREE,
//       OMID_CLAUDE_FREE,
//       DATASTUDIOS_CLAUDE,
//       SSDNODES_CLAUDE,
//     ],
//   },
//   {
//     id: "gemini",
//     product: "Gemini",
//     includes: [
//       "Everyday chat on Gemini Flash-Lite, the lightest model. Since Oct 9, 2026 it is the only model on the free plan for personal accounts. (Secondary reports of Google's help page.)",
//       "Heavier features such as image, video and music generation, Deep Research and extended thinking count more against your allowance. Which of them a free account can open depends on region and account, so check in the app.",
//     ],
//     notIncluded: [
//       "Higher limits: Google AI Plus, Pro and Ultra raise them. See the Plans page for prices.",
//       "The Flash and Pro models. Since Oct 9, 2026 Flash needs Google AI Plus, and Pro and Deep Think need AI Pro or Ultra. (Secondary reports.)",
//       "Video generation, which is reported as paid-only. (Secondary report.)",
//     ],
//     stops: [
//       "A compute-based allowance that refreshes every five hours until you reach a weekly limit.",
//       "Your usage depends on the complexity of the prompt, the features you use and the length of the chat.",
//       "Media generation, Deep Research and extended thinking use more of the allowance. The Pro model and Deep Think use more still, but they are paid-only since Oct 9, 2026.",
//       "Accounts without a Google AI plan get the standard limits. AI Plus is 2x that, AI Pro 4x, and AI Ultra 5x or 20x the Pro limit. Google publishes no baseline number.",
//       "Google's Josh Woodward said in May 2026 that Flash-Lite prompts and failed requests do not count against your quota. (Secondary report.)",
//       "Google says the May 2026 change did not apply to accounts under 18.",
//       "Free accounts have a 32K-token context window, against 128K on AI Plus and 1M on AI Pro and Ultra. (Secondary report of Google's table.)",
//     ],
//     ads: {
//       hasAds: false,
//       headline: "No ads in the Gemini app",
//       details: [
//         "On Dec 8, 2025 Google said there are no ads in the Gemini app and no current plans to change that. (Secondary report of Google's statement.)",
//         "Google does show ads in other AI features: AI Overviews in Search, and tests in AI Mode. Those are not the Gemini app.",
//         "No current plans can change, so we re-check on every update.",
//       ],
//     },
//     sources: [
//       GEMINI_LIMITS,
//       GOOGLE_NO_ADS_REPORT,
//       THURROTT_GEMINI_QUOTA,
//       FELLO_GEMINI_FREE,
//       MLQ_GEMINI_FLASH_LITE,
//       AITOOLBOX_GEMINI_LIMITS,
//     ],
//   },
// ];

// // ---- At-a-glance table ---------------------------------------------------------

// export const COMPARISON_COLUMN_HEADERS: readonly string[] = [
//   "ChatGPT Free",
//   "Claude Free",
//   "Gemini Free",
// ];

// export const COMPARISON_ROWS: readonly TableRow[] = [
//   {
//     label: "Everyday text chat",
//     cells: [
//       "No message cap, subject to abuse-prevention safeguards",
//       "Usage-based limit; how many messages fit varies with demand",
//       "Compute-based limit; depends on prompt, features and chat length",
//     ],
//   },
//   {
//     label: "How the limit resets",
//     cells: [
//       "Each tool resets on its own timer; the app shows the time",
//       "Every five hours (session window)",
//       "Every five hours, inside a weekly limit",
//     ],
//   },
//   {
//     label: "Numbers published",
//     cells: [
//       "3 file uploads a day; other tool limits not published",
//       "No message count",
//       "Multipliers only (Plus 2x, Pro 4x); no baseline number",
//     ],
//   },
//   {
//     label: "What uses your allowance fastest",
//     cells: [
//       "Files, images, voice and data analysis, each capped separately",
//       "Long chats, many messages, heavier models and features",
//       "Media generation, Deep Research, extended thinking",
//     ],
//   },
//   {
//     label: "Models on the free plan",
//     cells: [
//       "GPT-5.6 Luna, moving to GPT-6 Luna from Oct 8 (not Sol)",
//       "Sonnet and Haiku (not Opus)",
//       "Flash-Lite only since Oct 9 (no Flash or Pro)",
//     ],
//   },
//   {
//     label: "Context window",
//     cells: [
//       "Not confirmed; files can hold up to 2 million tokens each",
//       "200K tokens (secondary report)",
//       "32K tokens (secondary report)",
//     ],
//   },
//   {
//     label: "Weekly limit on top",
//     cells: [
//       "No; separate meters on tools instead",
//       "No on Free; paid plans add one (secondary report)",
//       "Yes; Google publishes no size",
//     ],
//   },
//   {
//     label: "What else is included",
//     cells: [
//       "Image creation (capped), search, data analysis, GPTs to use but not create",
//       "Design, Docs and Slides, up to five Projects (secondary report)",
//       "Canvas, Gems, voice, Deep Research and images with caps (secondary report)",
//     ],
//   },
//   {
//     label: "Ads",
//     cells: [
//       "Yes, in a growing list of countries",
//       "No (Anthropic's stated policy)",
//       "No ads in the Gemini app (Google's statement, Dec 2025)",
//     ],
//   },
//   {
//     label: "Step up to paid",
//     cells: [
//       "Go: about 10x Free (reported), may show ads; Plus adds Sol and no ads. See Plans",
//       "Pro: at least 5x Free per session at peak hours",
//       "AI Plus 2x and Flash, AI Pro 4x and Pro, AI Ultra 5x or 20x of Pro",
//     ],
//   },
//   {
//     label: "Where to see your usage",
//     cells: [
//       "A notice in ChatGPT with the reset time",
//       "A notice in Claude when you reach the limit",
//       "The usage limits page in Gemini's settings",
//     ],
//   },
// ];

// // ---- Explainers ------------------------------------------------------------------

// export interface ExplainerBlock {
//   readonly title: string;
//   readonly text: string;
// }

// export const HOW_LIMITS_WORK: readonly ExplainerBlock[] = [
//   {
//     title: "Message counts are being replaced by usage",
//     text: "Early free plans said things like 10 messages every 5 hours. Claude and Gemini now measure how much work your chats cost rather than how many messages you send, and ChatGPT stopped counting text messages on its free plan in August 2026.",
//   },
//   {
//     title: "A usage window refills on a timer",
//     text: "Claude and Gemini give you an allowance that refills every five hours. A short question uses very little. A long chat, a large attachment or a research task uses much more, because longer conversations cost more to process.",
//   },
//   {
//     title: "Gemini adds a weekly ceiling",
//     text: "Google says Gemini's allowance refreshes every five hours until you reach a weekly limit. Once the weekly limit is used up, waiting five hours is not enough.",
//   },
//   {
//     title: "ChatGPT caps tools, not text",
//     text: "OpenAI keeps everyday text chat open and sets separate limits on file uploads, image creation, voice and data analysis. Only the file upload limit, 3 a day on Free, is published.",
//   },
//   {
//     title: "Limits move with demand",
//     text: "Anthropic says the number of messages varies with demand. OpenAI says it may lower upload limits at peak hours. The limit you get today can differ from the one you got last week.",
//   },
//   {
//     title: "The model can change under you",
//     text: "Limits are only half of what free gets you. On Oct 9, 2026 Google cut Gemini's free plan to its lightest model, Flash-Lite, and ChatGPT's free chat began moving to GPT-6 Luna the day before. A plan can stay free and still get weaker or stronger.",
//   },
//   {
//     title: "Old numbers are still everywhere",
//     text: "Gemini's \"5 prompts a day\", ChatGPT's \"10 messages every 5 hours\" and Claude's \"daily limit that resets every morning\" were all real once. All three have been replaced, but guides that quote them are still ranking in search.",
//   },
// ];

// export const STRETCH_TIPS: readonly ExplainerBlock[] = [
//   {
//     title: "Keep one job per chat",
//     text: "Anthropic and Google both say chat length counts toward your limit. Start a new chat when the topic changes.",
//   },
//   {
//     title: "Ask clearly the first time",
//     text: "One well-written request costs less than five rounds of corrections. The five-part prompt formula in the prompting guide helps.",
//   },
//   {
//     title: "Save heavy features for when they matter",
//     text: "Images, video, deep research, and the Pro or thinking modes draw down your allowance faster than plain chat.",
//   },
//   {
//     title: "Use the lighter model for easy tasks",
//     text: "Quick rewrites, definitions and brainstorming rarely need the biggest model. Reported May 2026: Gemini Flash-Lite prompts do not count against your quota, and since Oct 9, 2026 Flash-Lite is the only model on Gemini Free.",
//   },
//   {
//     title: "Spread work across the day",
//     text: "Claude and Gemini refill every five hours. A morning session and an afternoon session get two allowances.",
//   },
//   {
//     title: "Have a second tool ready",
//     text: "The three plans limit different things. If one runs out, another may not. Keep private data out of any tool you have not checked on the Privacy page.",
//   },
//   {
//     title: "Upload a file once",
//     text: "Ask every question about a document in the same chat. Re-uploading uses up ChatGPT's 3 uploads a day and adds to the cost of the chat on Claude and Gemini.",
//   },
//   {
//     title: "Turn off tools you do not need",
//     text: "Web search, deep research and media generation all draw more from your allowance than plain chat. Switch them on for the task that needs them.",
//   },
// ];

// // ---- Which plan fits --------------------------------------------------------------

// export const WHICH_FITS_COLUMN_HEADERS: readonly string[] = ["Start with", "Why"];

// export const WHICH_FITS_ROWS: readonly TableRow[] = [
//   {
//     label: "You ask lots of quick questions",
//     cells: [
//       "ChatGPT Free",
//       "Text chat has no message cap, so quick questions rarely run out. Check the ads and privacy settings first.",
//     ],
//   },
//   {
//     label: "You work through long documents or drafts",
//     cells: [
//       "Claude Free or Gemini Free",
//       "Both give one allowance that refills every five hours. Long chats and attachments use it fastest, so split big jobs into sessions.",
//     ],
//   },
//   {
//     label: "You already live in Google apps",
//     cells: [
//       "Gemini Free",
//       "It signs in with your Google account and has its own usage limits page.",
//     ],
//   },
//   {
//     label: "You do not want ads",
//     cells: [
//       "Claude Free or Gemini Free",
//       "Neither shows ads in its app today. ChatGPT Free can show ads, or you can choose its ad-free option with lower limits.",
//     ],
//   },
//   {
//     label: "You handle private, school or client data",
//     cells: [
//       "Read the Privacy page first",
//       "Free plans differ on training and retention settings. Check them before pasting anything sensitive.",
//     ],
//   },
//   {
//     label: "You want the strongest model you can get free",
//     cells: [
//       "Claude Free",
//       "Claude Free reaches Sonnet. ChatGPT Free runs the Luna model and Gemini Free runs Flash-Lite, both lighter. Claude's allowance is small, so expect waits.",
//     ],
//   },
//   {
//     label: "You upload files every day",
//     cells: [
//       "Claude Free or Gemini Free",
//       "Neither publishes a daily upload count. ChatGPT Free stops at 3 uploads a day. Large files still shorten a session.",
//     ],
//   },
//   {
//     label: "You want documents, slides or designs",
//     cells: [
//       "Claude Free",
//       "Design, Docs and Slides are reported as included on Free. They share the same allowance as chat.",
//     ],
//   },
// ];

// // ---- Recent changes ------------------------------------------------------------------

// export interface FreeLimitsChange {
//   /** Used for ordering; the exact day is not always published. */
//   readonly sortDate: string;
//   readonly dateLabel: string;
//   readonly text: string;
//   readonly source: SourceLink;
// }

// export const RECENT_CHANGES: readonly FreeLimitsChange[] = [
//   {
//     sortDate: "2026-02-04",
//     dateLabel: "Feb 4, 2026",
//     text: "Anthropic says Claude will stay ad-free.",
//     source: ANTHROPIC_AD_FREE,
//   },
//   {
//     sortDate: "2026-02-09",
//     dateLabel: "Feb 9, 2026",
//     text: "OpenAI starts testing ads on ChatGPT Free and Go in the US.",
//     source: NOTEBOOKCHECK_ADS,
//   },
//   {
//     sortDate: "2026-05-17",
//     dateLabel: "May 17, 2026",
//     text: "Gemini moves from daily prompt counts to compute-based limits that refresh every five hours inside a weekly limit.",
//     source: GEMINI_LIMITS,
//   },
//   {
//     sortDate: "2026-08-06",
//     dateLabel: "Aug 2026",
//     text: "OpenAI removes the text-message cap for ChatGPT Free and Go. GPT-5.6 Luna becomes the default model. File uploads, images, voice and data analysis keep their own limits.",
//     source: OPENAI_FREE_FAQ,
//   },
//   {
//     sortDate: "2026-08-11",
//     dateLabel: "Aug 11, 2026",
//     text: "ChatGPT ads launch in the UK, Mexico, Brazil, Japan and South Korea. Europe and India follow later in the month.",
//     source: MLQ_ADS,
//   },
//   {
//     sortDate: "2026-10-08",
//     dateLabel: "Oct 8, 2026",
//     text: "OpenAI begins moving ChatGPT Free and Go chat to GPT-6 Luna. Plus and above moved to GPT-6 Sol on Oct 7.",
//     source: AICAREERLAB_CHATGPT_PLANS,
//   },
//   {
//     sortDate: "2026-10-09",
//     dateLabel: "Oct 9, 2026",
//     text: "Gemini's free plan is limited to Flash-Lite for personal accounts. Flash moves to Google AI Plus, and Pro and Deep Think to AI Pro and Ultra.",
//     source: MLQ_GEMINI_FLASH_LITE,
//   },
// ];

// // ---- Questions ---------------------------------------------------------------------------

// export interface FaqEntry {
//   readonly question: string;
//   readonly answer: string;
// }

// export const FREE_LIMITS_FAQ: readonly FaqEntry[] = [
//   {
//     question: "Will the free plans stay free?",
//     answer:
//       "We found no announced end date for any of the three. But OpenAI says the default model and limits can change over time, and all three providers have changed their free limits this year. Check this page's verified-on date.",
//   },
//   {
//     question: "Why can't I find an exact number of messages?",
//     answer:
//       "Claude and Gemini measure usage, not messages, and neither publishes a message count. Blog posts that quote one are estimates, and many are out of date.",
//   },
//   {
//     question: "What should I do when I hit a limit in the middle of a task?",
//     answer:
//       "Save your work. Each app tells you when you have reached a limit. Wait for the reset, move to a paid plan, or carry on in another tool. Before pasting private material into a tool you have not used, read the Privacy page.",
//   },
//   {
//     question: "Is a free chat plan the same as the API?",
//     answer:
//       "No. Chat apps and the API are separate products with separate billing. The API charges per token, and any free API tier has its own limits. See the API costs page.",
//   },
//   {
//     question: "Do the limits depend on my age or country?",
//     answer:
//       "Sometimes. Google says its May 2026 Gemini limits change did not apply to under-18 accounts. ChatGPT ads depend on country. Anthropic says you must be in a supported location to use Claude.",
//   },
//   {
//     question: "Do free plans use my chats for training?",
//     answer:
//       "It depends on the provider and your settings. See the Privacy page for training, retention and deletion settings.",
//   },
//   {
//     question: "Which free plan has the best model?",
//     answer:
//       "Claude Free reaches Sonnet. ChatGPT Free runs Luna and Gemini Free runs Flash-Lite since Oct 9, 2026, both lighter models. The best model is not always the best free plan, because Claude's allowance is also the one people say runs out soonest.",
//   },
//   {
//     question: "Can I turn off ChatGPT ads without paying?",
//     answer:
//       "OpenAI says Free users can choose an ad-free option in return for lower usage limits and fewer features. It does not say how much lower. Plus and above are ad-free, and Go may still show ads.",
//   },
//   {
//     question: "Why do older articles quote different numbers?",
//     answer:
//       "Because the rules changed. Gemini's 5 prompts a day, ChatGPT's 10 messages every 5 hours and Claude's daily reset were all replaced in 2026. Trust the verified-on date on this page and the notice inside each app.",
//   },
// ];

// /** Things that can make this page wrong, shown in the "What can go wrong" box. */
// export const FREE_LIMITS_RISKS: readonly string[] = [
//   "Limits change without notice. Check the verified-on date.",
//   "Numbers on blogs, such as 30 messages every 3 hours, are often estimates or out of date.",
//   "The model on a free plan changes. The one you get today may differ from the one named here.",
//   "Ads are labelled, but they appear near answers. Do not treat a sponsored card as advice.",
//   "A free chat plan does not include API access.",
//   "Items marked as secondary reports come from trackers and news, not the provider's own page, and are due to be replaced.",
//   "OpenAI's help pages have disagreed on whether Free text chat is capped. The notice inside ChatGPT is the final word.",
//   "Model names change fast. GPT-6 Luna and Gemini Flash-Lite are what reports describe today. Confirm in the app.",
// ];

// /** Pages a reader may want next. */
// export const FREE_LIMITS_RELATED_LINKS: readonly LinkItem[] = [
//   { label: "Consumer plans", href: "/prices/plans", description: "Prices for the paid plans that raise these limits." },
//   { label: "Feature matrix", href: "/prices/features", description: "Voice, images, video, file upload, search, agents and memory." },
//   { label: "Privacy matrix", href: "/prices/privacy", description: "Training, retention and deletion settings." },
//   { label: "Free vs paid AI", href: "/learn/foundations/free-vs-paid-ai", description: "A plain-English guide to what you actually get." },
// ];

// /** Every source cited on the page, each URL once. */
// export const FREE_LIMITS_SOURCES: readonly SourceLink[] = collectUniqueSources([
//   ...FREE_PLAN_PROFILES.map((profile) => profile.sources),
//   RECENT_CHANGES.map((change) => change.source),
// ]);








import { collectUniqueSources } from "@/lib/shared/sources";
import type { LinkItem, SourceLink, TableRow } from "@/types";

// ---- Constants ---------------------------------------------------------------

/** Day the free-plan facts were last checked. The page and the freshness check both read this. */
export const FREE_LIMITS_CHECKED_ISO = "2026-10-21";

/** The free-limits table is reviewed monthly (Blueprint 6.5), so 31 days is the longest it may go. */
export const REVIEW_INTERVAL_DAYS = 31;

/** Shortest search text that is matched against out-of-date claims. */
export const MIN_QUERY_LENGTH = 2;

/** Day every fact on the free-limits page was last checked against its source. */
export const FREE_LIMITS_VERIFIED_ON = FREE_LIMITS_CHECKED_ISO;

/** Page metadata for /prices/free-limits. */
export const FREE_LIMITS_PAGE = {
  title: "Free-plan limits",
  route: "/prices/free-limits",
  description:
    "What the free versions of ChatGPT, Claude and Gemini include, where each one stops, and which ones show ads.",
} as const;

// ---- Date helpers ------------------------------------------------------------

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MS_PER_DAY = 86_400_000;
const DAYS_PER_WEEK = 7;
const DAYS_PER_MONTH = 30;
/** Below this many days, "N days ago" reads better than weeks. */
const DAYS_BEFORE_WEEKS = 14;
/** Below this many days, "N weeks ago" reads better than months. */
const DAYS_BEFORE_MONTHS = 60;

/**
 * Turns a YYYY-MM-DD string into a UTC timestamp at midnight.
 *
 * @throws RangeError when the value is not a real calendar date.
 */
export function parseIsoDate(isoDate: string): number {
  const timestamp = Date.parse(`${isoDate}T00:00:00Z`);
  if (!ISO_DATE_PATTERN.test(isoDate) || Number.isNaN(timestamp)) {
    throw new RangeError(`Invalid ISO date: ${isoDate}`);
  }
  return timestamp;
}

/**
 * Whole calendar days from an ISO date to `now`, counted in UTC.
 * Returns 0 on the same day and a negative number for a future date.
 */
export function daysSince(isoDate: string, now: Date): number {
  const startOfToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor((startOfToday - parseIsoDate(isoDate)) / MS_PER_DAY);
}

/** Short reader-facing phrase for a day count, for example "3 days ago". */
export function describeDaysAgo(days: number): string {
  if (days < 0) return "in the future";
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < DAYS_BEFORE_WEEKS) return `${days} days ago`;
  if (days < DAYS_BEFORE_MONTHS) return `${Math.floor(days / DAYS_PER_WEEK)} weeks ago`;
  return `${Math.floor(days / DAYS_PER_MONTH)} months ago`;
}

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
const MLQ_GEMINI_FLASH_LITE: SourceLink = {
  label: "Google limits free Gemini users to Flash-Lite starting October 9",
  publisher: "MLQ.ai, Oct 2026",
  url: "https://mlq.ai/news/google-limits-free-gemini-users-to-flash-lite-starting-october-9/",
  kind: "secondary",
};
const AITOOLBOX_GEMINI_LIMITS: SourceLink = {
  label: "Gemini usage limits 2026: Free, Plus, Pro and Ultra",
  publisher: "AI Toolbox, Oct 2026",
  url: "https://www.ai-toolbox.co/gemini-management-and-productivity/gemini-usage-limits-2026",
  kind: "secondary",
};
const AICAREERLAB_CHATGPT_PLANS: SourceLink = {
  label: "ChatGPT Go vs Plus vs Pro (Oct 2026)",
  publisher: "The AI Career Lab, Oct 2026",
  url: "https://theaicareerlab.com/blog/chatgpt-pricing-plans-explained",
  kind: "secondary",
};
const MCKELVEY_CHATGPT_LIMITS: SourceLink = {
  label: "ChatGPT usage limits (2026): what Plus, Pro and Business actually get",
  publisher: "Justin McKelvey, Oct 2026",
  url: "https://justinmckelvey.com/blog/chatgpt-usage-limits",
  kind: "secondary",
};
const DECODER_ADS: SourceLink = {
  label: "ChatGPT now shows ads to free and Go users, with opt-out cutting daily message limits",
  publisher: "The Decoder",
  url: "https://the-decoder.com/chatgpt-now-shows-ads-to-free-and-go-users-with-opt-out-cutting-daily-message-limits/",
  kind: "secondary",
};
const OMID_CLAUDE_FREE: SourceLink = {
  label: "Is Claude free? Claude pricing and limits (2026)",
  publisher: "Omid Saffari, Oct 2026",
  url: "https://omidsaffari.com/blog/is-claude-free",
  kind: "secondary",
};
const DATASTUDIOS_CLAUDE: SourceLink = {
  label: "Claude Free limits in 2026",
  publisher: "Data Studios",
  url: "https://www.datastudios.org/post/claude-free-limits-updated-usage-restrictions-message-caps-and-file-upload-rules",
  kind: "secondary",
};
const SSDNODES_CLAUDE: SourceLink = {
  label: "Claude free tier: what the limits actually are",
  publisher: "SSD Nodes, Oct 2026",
  url: "https://www.ssdnodes.com/learn/claude-free-tier-limits",
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
      "Reported: from Oct 8, 2026 Free and Go chat is moving to GPT-6 Luna. OpenAI's help-page copies still name GPT-5.6 Luna, so the model you see may differ. (Secondary report.)",
      "Web search and data analysis.",
      "Uploading images and files to a chat.",
      "Image creation, and voice, each with its own limit.",
      "Discovering and using GPTs.",
      "A Library with 500 MB of storage.",
    ],
    notIncluded: [
      "GPT-5.6 Sol, the larger model, which is not offered on Free or Go.",
      "Audio file uploads, which need a paid plan.",
      "GPT-6 Sol, the chat model on Plus and above since Oct 7, 2026. GPT-6 Pro in chat is not part of Free, Go or Plus. (Secondary report.)",
      "Creating new GPTs, which is not available on personal accounts, Free included.",
    ],
    stops: [
      "Text chat has no message cap on everyday chats, subject to abuse-prevention safeguards.",
      "OpenAI's own help-page copies have disagreed on this: one says Free text is uncapped, another says Free model usage is limited. The notice inside ChatGPT is the final word.",
      "File uploads are limited to 3 a day on Free, and OpenAI may lower that at peak hours. Text and document files can hold up to 2 million tokens each.",
      "Image creation, voice and data analysis have separate limits. OpenAI does not publish those numbers.",
      "When you reach a tool's limit, that tool pauses until it resets. ChatGPT shows the reset time in the app.",
      "Free allows 5 files per project. (Secondary report.)",
      "ChatGPT Work and Codex are limited and desktop-only on Free, and those meters reset on rolling five-hour windows rather than daily. (Secondary report.)",
      "The next step, ChatGPT Go, is reported at roughly 10 times Free's messages, uploads and images, and it may still show ads. Plus is the first ad-free plan. See Plans for prices. (Secondary report.)",
    ],
    ads: {
      hasAds: true,
      headline: "Ads on Free and Go",
      details: [
        "Ads can appear for adults on the Free and Go plans. Plus, Pro, Business, Enterprise and Education plans are ad-free.",
        "Each ad is labelled as sponsored and sits below the answer. OpenAI says ads do not influence the answers.",
        "Ads began in the US on Feb 9, 2026. They have since reached other markets, including the UK, Mexico, Brazil, Japan, South Korea and Europe, and OpenAI announced them for India on Aug 27, 2026. The rollout is gradual, so some free users still see none.",
        "Free users can choose an ad-free option in return for lower usage limits and fewer features. OpenAI does not say how much lower.",
        "During the test, ads are matched to the topic of your conversation, your past chats and your past interactions with ads. Advertisers get aggregated results, not your chats. (Secondary report.)",
        "Under-18s see no ads, and ads are kept away from sensitive topics such as health, mental health and politics. (Secondary report.)",
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
      DECODER_ADS,
      AICAREERLAB_CHATGPT_PLANS,
      MCKELVEY_CHATGPT_LIMITS,
    ],
  },
  {
    id: "claude",
    product: "Claude",
    includes: [
      "Chat with the Sonnet and Haiku models. (Secondary report.)",
      "Web search, file uploads and memory across chats. (Secondary report.)",
      "Up to five Projects. (Secondary report.)",
      "Claude Design, Docs and Slides, so making a document or deck does not need a paid plan. (Secondary report.)",
      "A 200K-token context window. (Secondary report.)",
    ],
    notIncluded: [
      "Opus models and Claude Code, which come with paid plans. (Secondary report.)",
      "Dashboards, Motion and monthly API credits, which Free excludes. (Secondary report.)",
    ],
    stops: [
      "One session-based limit that resets every five hours.",
      "How many messages fit varies with demand, and Anthropic may add other limits to keep access fair.",
      "Claude tells you when you reach the limit, or when a prompt is longer than the available context window. The context window can also vary with demand.",
      "Anthropic publishes no message count. Its paid Pro plan gives at least five times Free's usage per session at peak hours.",
      "Anthropic describes its Pro limits as depending on conversation length, the number of messages, and the model or feature used. Free uses the same five-hour session design, so expect long chats and heavy features to use the allowance faster.",
      "On Free there is no weekly limit on top of the five-hour session. Paid plans add weekly limits. (Secondary report of Anthropic's pricing page.)",
      "Starting a new chat does not refill the allowance, because it belongs to your account. (Secondary report.)",
      "Anthropic occasionally offers a \"Reset for free\" button in Settings > Usage. Its documentation does not list Free-plan eligibility, so do not plan around it. (Secondary report.)",
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
      OMID_CLAUDE_FREE,
      DATASTUDIOS_CLAUDE,
      SSDNODES_CLAUDE,
    ],
  },
  {
    id: "gemini",
    product: "Gemini",
    includes: [
      "Everyday chat on Gemini Flash-Lite, the lightest model. Since Oct 9, 2026 it is the only model on the free plan for personal accounts. (Secondary reports of Google's help page.)",
      "Heavier features such as image, video and music generation, Deep Research and extended thinking count more against your allowance. Which of them a free account can open depends on region and account, so check in the app.",
    ],
    notIncluded: [
      "Higher limits: Google AI Plus, Pro and Ultra raise them. See the Plans page for prices.",
      "The Flash and Pro models. Since Oct 9, 2026 Flash needs Google AI Plus, and Pro and Deep Think need AI Pro or Ultra. (Secondary reports.)",
      "Video generation, which is reported as paid-only. (Secondary report.)",
    ],
    stops: [
      "A compute-based allowance that refreshes every five hours until you reach a weekly limit.",
      "Your usage depends on the complexity of the prompt, the features you use and the length of the chat.",
      "Media generation, Deep Research and extended thinking use more of the allowance. The Pro model and Deep Think use more still, but they are paid-only since Oct 9, 2026.",
      "Accounts without a Google AI plan get the standard limits. AI Plus is 2x that, AI Pro 4x, and AI Ultra 5x or 20x the Pro limit. Google publishes no baseline number.",
      "Google's Josh Woodward said in May 2026 that Flash-Lite prompts and failed requests do not count against your quota. (Secondary report.)",
      "Google says the May 2026 change did not apply to accounts under 18.",
      "Free accounts have a 32K-token context window, against 128K on AI Plus and 1M on AI Pro and Ultra. (Secondary report of Google's table.)",
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
      MLQ_GEMINI_FLASH_LITE,
      AITOOLBOX_GEMINI_LIMITS,
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
      "Media generation, Deep Research, extended thinking",
    ],
  },
  {
    label: "Models on the free plan",
    cells: [
      "GPT-5.6 Luna, moving to GPT-6 Luna from Oct 8 (not Sol)",
      "Sonnet and Haiku (not Opus)",
      "Flash-Lite only since Oct 9 (no Flash or Pro)",
    ],
  },
  {
    label: "Context window",
    cells: [
      "Not confirmed; files can hold up to 2 million tokens each",
      "200K tokens (secondary report)",
      "32K tokens (secondary report)",
    ],
  },
  {
    label: "Weekly limit on top",
    cells: [
      "No; separate meters on tools instead",
      "No on Free; paid plans add one (secondary report)",
      "Yes; Google publishes no size",
    ],
  },
  {
    label: "What else is included",
    cells: [
      "Image creation (capped), search, data analysis, GPTs to use but not create",
      "Design, Docs and Slides, up to five Projects (secondary report)",
      "Canvas, Gems, voice, Deep Research and images with caps (secondary report)",
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
      "Go: about 10x Free (reported), may show ads; Plus adds Sol and no ads. See Plans",
      "Pro: at least 5x Free per session at peak hours",
      "AI Plus 2x and Flash, AI Pro 4x and Pro, AI Ultra 5x or 20x of Pro",
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
  {
    title: "The model can change under you",
    text: "Limits are only half of what free gets you. On Oct 9, 2026 Google cut Gemini's free plan to its lightest model, Flash-Lite, and ChatGPT's free chat began moving to GPT-6 Luna the day before. A plan can stay free and still get weaker or stronger.",
  },
  {
    title: "Old numbers are still everywhere",
    text: "Gemini's \"5 prompts a day\", ChatGPT's \"10 messages every 5 hours\" and Claude's \"daily limit that resets every morning\" were all real once. All three have been replaced, but guides that quote them are still ranking in search.",
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
    text: "Quick rewrites, definitions and brainstorming rarely need the biggest model. Reported May 2026: Gemini Flash-Lite prompts do not count against your quota, and since Oct 9, 2026 Flash-Lite is the only model on Gemini Free.",
  },
  {
    title: "Spread work across the day",
    text: "Claude and Gemini refill every five hours. A morning session and an afternoon session get two allowances.",
  },
  {
    title: "Have a second tool ready",
    text: "The three plans limit different things. If one runs out, another may not. Keep private data out of any tool you have not checked on the Privacy page.",
  },
  {
    title: "Upload a file once",
    text: "Ask every question about a document in the same chat. Re-uploading uses up ChatGPT's 3 uploads a day and adds to the cost of the chat on Claude and Gemini.",
  },
  {
    title: "Turn off tools you do not need",
    text: "Web search, deep research and media generation all draw more from your allowance than plain chat. Switch them on for the task that needs them.",
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
  {
    label: "You want the strongest model you can get free",
    cells: [
      "Claude Free",
      "Claude Free reaches Sonnet. ChatGPT Free runs the Luna model and Gemini Free runs Flash-Lite, both lighter. Claude's allowance is small, so expect waits.",
    ],
  },
  {
    label: "You upload files every day",
    cells: [
      "Claude Free or Gemini Free",
      "Neither publishes a daily upload count. ChatGPT Free stops at 3 uploads a day. Large files still shorten a session.",
    ],
  },
  {
    label: "You want documents, slides or designs",
    cells: [
      "Claude Free",
      "Design, Docs and Slides are reported as included on Free. They share the same allowance as chat.",
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
  {
    sortDate: "2026-10-08",
    dateLabel: "Oct 8, 2026",
    text: "OpenAI begins moving ChatGPT Free and Go chat to GPT-6 Luna. Plus and above moved to GPT-6 Sol on Oct 7.",
    source: AICAREERLAB_CHATGPT_PLANS,
  },
  {
    sortDate: "2026-10-09",
    dateLabel: "Oct 9, 2026",
    text: "Gemini's free plan is limited to Flash-Lite for personal accounts. Flash moves to Google AI Plus, and Pro and Deep Think to AI Pro and Ultra.",
    source: MLQ_GEMINI_FLASH_LITE,
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
  {
    question: "Which free plan has the best model?",
    answer:
      "Claude Free reaches Sonnet. ChatGPT Free runs Luna and Gemini Free runs Flash-Lite since Oct 9, 2026, both lighter models. The best model is not always the best free plan, because Claude's allowance is also the one people say runs out soonest.",
  },
  {
    question: "Can I turn off ChatGPT ads without paying?",
    answer:
      "OpenAI says Free users can choose an ad-free option in return for lower usage limits and fewer features. It does not say how much lower. Plus and above are ad-free, and Go may still show ads.",
  },
  {
    question: "Why do older articles quote different numbers?",
    answer:
      "Because the rules changed. Gemini's 5 prompts a day, ChatGPT's 10 messages every 5 hours and Claude's daily reset were all replaced in 2026. Trust the verified-on date on this page and the notice inside each app.",
  },
];

/** Things that can make this page wrong, shown in the "What can go wrong" box. */
export const FREE_LIMITS_RISKS: readonly string[] = [
  "Limits change without notice. Check the verified-on date.",
  "Numbers on blogs, such as 30 messages every 3 hours, are often estimates or out of date.",
  "The model on a free plan changes. The one you get today may differ from the one named here.",
  "Ads are labelled, but they appear near answers. Do not treat a sponsored card as advice.",
  "A free chat plan does not include API access.",
  "Items marked as secondary reports come from trackers and news, not the provider's own page, and are due to be replaced.",
  "OpenAI's help pages have disagreed on whether Free text chat is capped. The notice inside ChatGPT is the final word.",
  "Model names change fast. GPT-6 Luna and Gemini Flash-Lite are what reports describe today. Confirm in the app.",
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

// ---- Structured view of the comparison table ---------------------------------
// The page shows COMPARISON_ROWS as text. These exports let code ask for one
// cell, count how well backed the table is, or find a gap, without parsing text.

/** How well a table cell is backed: a provider page, a secondary report, or unresolved. */
export type Confidence = "published" | "reported" | "unclear";

/** Identifier of one row of the comparison table. */
export type DimensionId =
  | "text-chat"
  | "reset"
  | "numbers"
  | "heavy-use"
  | "models"
  | "context"
  | "weekly-limit"
  | "extras"
  | "ads"
  | "step-up"
  | "check-usage";

/** One free plan, shown as a column of the comparison table. */
export interface FreeProvider {
  readonly id: ProviderId;
  /** Column header, for example "ChatGPT Free". */
  readonly name: string;
  readonly product: string;
  readonly maker: string;
}

/** One row of the comparison table. */
export interface Dimension {
  readonly id: DimensionId;
  /** Must match the row label in COMPARISON_ROWS. */
  readonly label: string;
}

/** One cell of the comparison table. */
export interface LimitCell {
  readonly providerId: ProviderId;
  readonly dimensionId: DimensionId;
  readonly value: string;
  readonly confidence: Confidence;
}

const MAKER_BY_PROVIDER: Readonly<Record<ProviderId, string>> = {
  chatgpt: "OpenAI",
  claude: "Anthropic",
  gemini: "Google",
};

/** The free plans, in table-column order. */
export const PROVIDERS: readonly FreeProvider[] = FREE_PLAN_PROFILES.map((profile) => ({
  id: profile.id,
  name: `${profile.product} Free`,
  product: profile.product,
  maker: MAKER_BY_PROVIDER[profile.id],
}));

/** The table rows, in order. */
export const DIMENSIONS: readonly Dimension[] = [
  { id: "text-chat", label: "Everyday text chat" },
  { id: "reset", label: "How the limit resets" },
  { id: "numbers", label: "Numbers published" },
  { id: "heavy-use", label: "What uses your allowance fastest" },
  { id: "models", label: "Models on the free plan" },
  { id: "context", label: "Context window" },
  { id: "weekly-limit", label: "Weekly limit on top" },
  { id: "extras", label: "What else is included" },
  { id: "ads", label: "Ads" },
  { id: "step-up", label: "Step up to paid" },
  { id: "check-usage", label: "Where to see your usage" },
];

/**
 * How well each cell is backed today. "published" means a provider page says it,
 * "reported" means only a secondary report does, "unclear" means sources disagree
 * or none was found. Raise a cell to "published" when you replace its source.
 */
const CELL_CONFIDENCE: Readonly<Record<DimensionId, Readonly<Record<ProviderId, Confidence>>>> = {
  "text-chat": { chatgpt: "unclear", claude: "published", gemini: "published" },
  reset: { chatgpt: "published", claude: "published", gemini: "published" },
  numbers: { chatgpt: "published", claude: "published", gemini: "published" },
  "heavy-use": { chatgpt: "published", claude: "reported", gemini: "published" },
  models: { chatgpt: "reported", claude: "reported", gemini: "reported" },
  context: { chatgpt: "unclear", claude: "unclear", gemini: "reported" },
  "weekly-limit": { chatgpt: "reported", claude: "reported", gemini: "published" },
  extras: { chatgpt: "published", claude: "reported", gemini: "reported" },
  ads: { chatgpt: "reported", claude: "published", gemini: "reported" },
  "step-up": { chatgpt: "reported", claude: "published", gemini: "published" },
  "check-usage": { chatgpt: "published", claude: "published", gemini: "published" },
};

function buildLimitCells(): LimitCell[] {
  const cells: LimitCell[] = [];
  for (const dimension of DIMENSIONS) {
    const row = COMPARISON_ROWS.find((entry) => entry.label === dimension.label);
    if (!row) {
      throw new Error(`No comparison row labelled "${dimension.label}"`);
    }
    PROVIDERS.forEach((provider, columnIndex) => {
      const value = row.cells[columnIndex];
      if (value === undefined) {
        throw new Error(`Row "${dimension.label}" has no cell for ${provider.name}`);
      }
      cells.push({
        providerId: provider.id,
        dimensionId: dimension.id,
        value,
        confidence: CELL_CONFIDENCE[dimension.id][provider.id],
      });
    });
  }
  return cells;
}

/** Every cell of the comparison table: one per provider and row. */
export const LIMIT_CELLS: readonly LimitCell[] = buildLimitCells();

// ---- Situations and out-of-date claims ---------------------------------------------

/** A reader situation with the free plan to start with, and an optional backup. */
export interface Situation {
  readonly id: string;
  readonly label: string;
  readonly primary: ProviderId;
  readonly backup: ProviderId | null;
  /** Why, copied from the matching row of the "Which free plan fits you?" table. */
  readonly reason: string;
}

interface SituationSpec {
  readonly id: string;
  /** Must match a row label in WHICH_FITS_ROWS. */
  readonly label: string;
  readonly primary: ProviderId;
  readonly backup: ProviderId | null;
}

const SITUATION_SPECS: readonly SituationSpec[] = [
  { id: "quick-questions", label: "You ask lots of quick questions", primary: "chatgpt", backup: null },
  { id: "long-documents", label: "You work through long documents or drafts", primary: "claude", backup: "gemini" },
  { id: "google-apps", label: "You already live in Google apps", primary: "gemini", backup: null },
  { id: "no-ads", label: "You do not want ads", primary: "claude", backup: "gemini" },
  { id: "strongest-model", label: "You want the strongest model you can get free", primary: "claude", backup: null },
  { id: "daily-uploads", label: "You upload files every day", primary: "claude", backup: "gemini" },
  { id: "documents-slides-designs", label: "You want documents, slides or designs", primary: "claude", backup: null },
];

function findReason(label: string): string {
  const row = WHICH_FITS_ROWS.find((entry) => entry.label === label);
  const reason = row?.cells[1];
  if (reason === undefined) {
    throw new Error(`No "Which free plan fits you?" row labelled "${label}"`);
  }
  return reason;
}

export const SITUATIONS: readonly Situation[] = SITUATION_SPECS.map((spec) => ({
  ...spec,
  reason: findReason(spec.label),
}));

/** Whether we confirmed the old number was replaced, or never found it on a provider page. */
export type StaleClaimStatus = "replaced" | "unverified";

/** An old limit that is still quoted online. */
export interface StaleClaim {
  readonly id: string;
  readonly claim: string;
  readonly provider: ProviderId;
  readonly origin: string;
  readonly status: StaleClaimStatus;
  readonly replacedBy: string;
}

export const STALE_CLAIMS: readonly StaleClaim[] = [
  {
    id: "gemini-5-prompts",
    claim: "5 prompts a day",
    provider: "gemini",
    origin: "Reported for the Gemini free tier in Sep 2025.",
    status: "replaced",
    replacedBy:
      "A compute-based allowance that refreshes every five hours inside a weekly limit, since May 17, 2026.",
  },
  {
    id: "chatgpt-10-per-5-hours",
    claim: "10 messages every 5 hours",
    provider: "chatgpt",
    origin: "Reported at the GPT-5 launch in Aug 2025.",
    status: "replaced",
    replacedBy:
      "No text-message cap on Free and Go since Aug 2026. Tools such as uploads and images keep their own limits.",
  },
  {
    id: "claude-daily-reset",
    claim: "A daily limit that resets every morning",
    provider: "claude",
    origin: "Older guides to the Claude free plan.",
    status: "replaced",
    replacedBy: "A rolling five-hour session window, as Anthropic's Help Center now describes it.",
  },
  {
    id: "claude-30-per-3-hours",
    claim: "30 messages every 3 hours",
    provider: "claude",
    origin: "Quoted on blogs. We found no provider page that states it.",
    status: "unverified",
    replacedBy: "Anthropic publishes no message count.",
  },
];