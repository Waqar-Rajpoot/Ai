import type { Explainer } from "../explainerTypes";

/** Privacy explainer: ads on ChatGPT Free and Go, and what that means for your chats. */
export const CHATGPT_ADS_FREE_GO: Explainer = {
  slug: "chatgpt-ads-free-and-go-what-to-know",
  title: "ChatGPT now shows ads on Free and Go: what is used, what is not, how to avoid them",
  description:
    "Adults on ChatGPT Free and Go can now see sponsored ads in a growing list of countries. Here is how OpenAI says they work, what stays private, and your options.",
  topic: "privacy",
  levels: [1, 2, 3],
  publishedIso: "2026-10-25",
  updatedIso: "2026-10-25",
  eventLabel: "Began Feb 9, 2026 (US); expanded Aug 2026",
  quickTake: [
    "Adults on ChatGPT Free and Go can see ads labelled as sponsored, below answers, in a growing list of countries.",
    "OpenAI says ads are matched using your conversation topic, past chats and past ad interactions, and that advertisers get aggregated results, not your chats.",
    "You can avoid ads by paying for Plus or above, or on Free by choosing an ad-free option that lowers your limits.",
  ],
  whatHappened: [
    "OpenAI began testing ads in ChatGPT for logged-in adults on the Free and Go plans in the US on Feb 9, 2026. Plus, Pro, Business, Enterprise and Education plans stay ad-free.",
    "In August 2026 the ads reached the UK, Mexico, Brazil, Japan and South Korea, with Europe following later in the month, and OpenAI announced them for India on Aug 27. The rollout is gradual, so some free users still see none.",
    "Each ad is labelled sponsored and sits below the answer, visually separate from it. OpenAI says ads do not influence what ChatGPT says.",
    "During the test, OpenAI says it chooses an ad by matching advertisers' submissions with the topic of your conversation, your past chats and your past interactions with ads. It says advertisers see aggregated performance numbers, not chat logs or personal data.",
    "Under-18s see no ads, and ads are kept away from sensitive topics such as health, mental health and politics. Free users can hide individual ads, delete their ad data and change personalisation settings, and can opt out of ads in exchange for fewer daily messages.",
  ],
  whatChanged: [
    { aspect: "Who sees ads", before: "Nobody", now: "Logged-in adults on Free and Go in the countries where ads have rolled out" },
    { aspect: "What can shape the ad you see", before: "Not applicable", now: "Your conversation topic, past chats and past interactions with ads (as OpenAI describes it)" },
    { aspect: "Where ads appear", before: "Nowhere", now: "Below the answer, labelled sponsored" },
    { aspect: "How to avoid ads", before: "Not needed", now: "Pay for Plus or above, or on Free choose an ad-free option with lower limits" },
  ],
  timeline: [
    { isoDate: "2026-02-09", label: "Feb 9, 2026", text: "OpenAI starts testing ads on Free and Go for adults in the US." },
    { isoDate: "2026-08-11", label: "Aug 11, 2026", text: "Ads reach the UK, Mexico, Brazil, Japan and South Korea." },
    { isoDate: "2026-08-27", label: "Aug 27, 2026", text: "OpenAI announces ads on Free and Go in India." },
  ],
  impacts: [
    {
      level: 1,
      headline: "Treat the ad as an advert, and keep personal details out of free chats.",
      points: [
        "A sponsored card is paid placement, not a recommendation. Do not make health or money decisions from an ad without checking it elsewhere.",
        "Your chat topics can help choose which ad appears, so avoid putting health, money or identity details into a free chat. Our guide on what never to share with a chatbot has the list.",
        "If you would rather not see ads, you can pay for Plus. Reports say Claude and the Gemini app do not show ads, but check their current terms.",
      ],
    },
    {
      level: 2,
      headline: "If you use free ChatGPT for work, move work chats to a plan without ads.",
      points: [
        "Because conversation topics can feed ad matching, free-plan chats are a poor place for client or company material. Business and Enterprise plans are ad-free.",
        "Open the settings and look for ad personalisation and ad data controls. Reports say you can hide ads, delete ad data and adjust personalisation.",
        "The privacy matrix compares what each plan does with your chats for training and retention.",
      ],
    },
    {
      level: 3,
      headline: "The ad-free Free option is a trade: fewer messages for no ads.",
      points: [
        "OpenAI does not say how much lower the limits are when you opt out, so test it before relying on it. Our free-limits page tracks what is known.",
        "Go may still show ads, so it is not an ad-free upgrade. Plus is the first plan where ads are off by default.",
        "If you automate or use the API, ads do not apply there. Chat plans and the API are separate products.",
      ],
    },
  ],
  actions: [
    { id: "treat-ad-as-ad", text: "Treat sponsored cards as advertising, not advice.", level: 1 },
    { id: "keep-details-out", text: "Keep health, money and identity details out of free-plan chats.", level: 1 },
    { id: "check-ad-settings", text: "Open ChatGPT settings and review ad personalisation and ad data controls.", level: 2 },
    { id: "move-work-chats", text: "Move work chats to a plan without ads and with clear data terms.", level: 2 },
    { id: "compare-ad-free-options", text: "If ads bother you, compare paying for Plus with Free's ad-free option and its lower limits.", level: 3 },
  ],
  misreadings: [
    { claim: "Ads change ChatGPT's answers.", fact: "OpenAI says the answer is generated separately and the ad sits below it. That is OpenAI's claim, and we cannot test it independently." },
    { claim: "Advertisers can read my chats.", fact: "OpenAI says advertisers get aggregated performance numbers and no access to chat logs or personal data." },
    { claim: "Paying for Go removes ads.", fact: "Go may still show ads. Plus and above are ad-free." },
    { claim: "Everyone sees ads now.", fact: "Ads are limited to logged-in adults on Free and Go in the countries where they have launched, and the rollout is gradual." },
  ],
  unknowns: [
    "We read OpenAI's ad policy through press reports, not through OpenAI's own help page.",
    "OpenAI has not said how much lower the limits are for Free users who opt out of ads.",
    "It is unclear whether Go users can opt out of ads.",
    "We do not know which countries have ads switched on for every user. Some users in rollout countries still see none.",
  ],
  related: [
    { label: "What you should never share with an AI chatbot", href: "/learn/foundations/never-share-with-ai-chatbot", description: "The short list of things to keep out of any chat.", level: 1 },
    { label: "Privacy matrix", href: "/prices/privacy", description: "Training, retention and deletion settings by plan.", level: 2 },
    { label: "Free-plan limits", href: "/prices/free-limits", description: "What each free plan includes and where it stops.", level: 3 },
  ],
  faq: [
    { question: "Can I turn ads off without paying?", answer: "OpenAI says Free users can choose an ad-free option in return for lower usage limits. It does not say how much lower." },
    { question: "Do other chatbots show ads?", answer: "Reports say neither the Gemini app nor Claude shows ads. Both are policies that can change, so check each provider's current terms." },
    { question: "Do ads mean my chats are sold?", answer: "OpenAI says advertisers do not get your chats or personal data, only aggregated results. Your conversations are still used to choose which ad to show." },
  ],
  sources: [
    { label: "ChatGPT ads: where they run now and how to switch them off", publisher: "Notebookcheck", url: "https://www.notebookcheck.net/ChatGPT-ads-where-they-run-now-and-how-to-switch-them-off.1361301.0.html", kind: "secondary" },
    { label: "OpenAI expands ChatGPT ad test to five more countries", publisher: "MLQ.ai, Aug 2026", url: "https://mlq.ai/news/openai-expands-chatgpt-ad-test-to-five-more-countries/", kind: "secondary" },
    { label: "OpenAI to start showing ads on ChatGPT's free and Go tiers in India", publisher: "TechCrunch, Aug 27, 2026", url: "https://techcrunch.com/2026/08/27/openai-to-start-showing-ads-on-chatgpts-free-and-go-tiers-in-india/", kind: "secondary" },
    { label: "ChatGPT now shows ads to free and Go users, with opt-out cutting daily message limits", publisher: "The Decoder", url: "https://the-decoder.com/chatgpt-now-shows-ads-to-free-and-go-users-with-opt-out-cutting-daily-message-limits/", kind: "secondary" },
    { label: "'ChatGPT is done': OpenAI is rolling out ads to free and paying users", publisher: "TechRadar", url: "https://www.techradar.com/ai-platforms-assistants/chatgpt-is-done-openai-is-rolling-out-ads-to-free-and-paying-users-and-not-everyone-is-happy", kind: "secondary" },
    { label: "Google says there are 'no plans' to put ads in the Gemini app", publisher: "9to5Google, Dec 8, 2025", url: "https://9to5google.com/2025/12/08/google-gemini-no-ads/", kind: "secondary" },
  ],
};