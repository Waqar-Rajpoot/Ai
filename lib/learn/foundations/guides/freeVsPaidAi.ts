import type { GuideRecord } from "../../guideTypes";
import { FOUNDATIONS_SOURCES as SOURCES } from "../foundationsSources";

export const freeVsPaidAi: GuideRecord = {
  slug: "free-vs-paid-ai",
  number: 4,
  level: "foundations",
  kind: "guide",
  title: "Free vs paid AI: what you actually get",
  metaDescription:
    "What free and paid AI plans usually differ on, what providers say about ads and privacy, how to test a free plan first, and how to avoid surprise renewals.",
  cardSummary: "What free plans give, who should upgrade, ads, and avoiding surprise renewals.",
  summaryPoints: [
    "Free plans usually mean lower limits and fewer features. Paid plans raise limits and add features. Neither guarantees correct answers.",
    "Ads and privacy depend on the provider and your settings, not only on whether you pay.",
    "Decide by how often you hit limits. Current prices are in our plan table, not in this article.",
  ],
  sections: [
    {
      id: "what-differs",
      heading: "What usually differs",
      paragraphs: [
        "Providers change their plans often, so this table describes the pattern and not a specific plan. For today's limits and prices, use the plan tables linked at the end.",
      ],
      table: {
        caption: "How free and paid plans commonly differ",
        columns: ["Topic", "Free plans", "Paid plans"],
        rows: [
          ["Usage limits", "Lower caps on messages, files and images", "Higher caps. Tiers within a provider rise with price"],
          ["Features", "Core chat. Some tools are limited or missing", "Often more tools, files or memory, depending on the plan"],
          ["Ads", "Some providers show ads on free tiers", "Depends on the provider and plan"],
          ["Privacy", "Controlled by your settings", "Not decided by price. Check the setting"],
          ["Accuracy", "Can be wrong", "Can be wrong"],
        ],
      },
    },
    {
      id: "ads",
      heading: "Ads: what the providers say",
      bullets: [
        "OpenAI says ads may appear for ChatGPT Free and Go users in regions where they are available, and that Plus, Pro, Business, Enterprise and Edu accounts do not have ads. Its help page says Free users can choose an ad-free option with lower message limits.",
        "OpenAI also says ads are labelled, kept separate from answers, and do not influence the answers ChatGPT gives.",
        "Anthropic announced in February 2026 that Claude will stay ad-free.",
      ],
      paragraphs: [
        "These are company statements, not independent tests, and policies change. For any other service, look for its own ads policy before assuming either way.",
      ],
      sourceIds: [
        SOURCES.openaiAdsHelp.id,
        SOURCES.openaiAdsAnnouncement.id,
        SOURCES.anthropicAdFree.id,
      ],
    },
    {
      id: "privacy-is-a-setting",
      heading: "Privacy is a setting, not a price tier",
      paragraphs: [
        "On OpenAI's individual plans (Free, Plus and Pro), the help page says content may be used to train models unless you opt out, using the Improve the model for everyone setting. Anthropic's privacy page describes a similar Help improve Claude switch for its Free, Pro and Max plans.",
        "So paying does not automatically make a chat more private. Work and school plans have their own terms. The guide on what never to share explains where to find each switch.",
      ],
      sourceIds: [SOURCES.openaiDataUse.id, SOURCES.anthropicPrivacySetting.id],
    },
    {
      id: "stay-free-if",
      heading: "Stay on a free plan if",
      bullets: [
        "You ask a few questions a week.",
        "You rarely upload files or create images.",
        "Hitting a limit is a small annoyance, not a blocker.",
      ],
    },
    {
      id: "consider-paying-if",
      heading: "Consider paying if",
      bullets: [
        "You use AI most days for work or study.",
        "You often hit a limit in the middle of a task.",
        "You need a feature the free plan lacks. Check the feature table, not the marketing page.",
        "You want to avoid ads on a free tier that shows them.",
      ],
    },
    {
      id: "try-before-you-pay",
      heading: "Try before you pay",
      steps: [
        {
          title: "Use the free plan on real tasks for two weeks",
          detail: "Write down each time you hit a limit or miss a feature, and what you were trying to do.",
        },
        {
          title: "Add up the cost",
          detail: "Use the subscription cost calculator, with current prices from the plan table and the provider's own pricing page.",
        },
        {
          title: "Subscribe in one place and note the renewal date",
          detail: "Check whether you chose monthly or yearly billing, and set a calendar reminder before the renewal.",
        },
        {
          title: "Cancel where you subscribed",
          detail: "Cancel from the provider's billing page, or from your app-store account if you subscribed there.",
        },
        {
          title: "Review after one month",
          detail: "If you barely used it, downgrade. Paying for unused features is the most common waste.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "decide-whether-to-upgrade",
      title: "Decide whether to upgrade",
      whenToUse: "After using a free plan for a couple of weeks. Use general descriptions only.",
      text: "I use an AI chatbot for [tasks]. In the last two weeks I hit the free limit [number] times and wanted these features: [features]. Ask me up to five questions, then help me decide whether upgrading is likely to be worth it. Do not recommend a specific product. Tell me what to check on each provider's official pricing page.",
    },
    {
      id: "renewal-reminder",
      title: "Write a renewal check-in",
      whenToUse: "When you start any paid plan.",
      text: "Write a short calendar reminder for [number] days after I start a paid AI plan. Include three questions I should ask myself: how often I used it, which feature I could not do without, and whether the free plan would have been enough.",
    },
  ],
  whatCanGoWrong: [
    "Paying for features you never use, then forgetting to cancel. Set the reminder on the day you subscribe.",
    "Assuming paid means more private or more accurate. Check the data setting, and verify important answers either way.",
    "Using an out-of-date price or limit from an article, a video or a chatbot. Confirm on the provider's website.",
    "Trusting a comparison without checking whether it discloses affiliate links or sponsors.",
  ],
  limitsNote:
    "This is general information, not financial advice. Your own usage and budget decide what is worth paying for.",
  showPriceNotice: true,
  sources: [
    SOURCES.openaiAdsHelp,
    SOURCES.openaiAdsAnnouncement,
    SOURCES.anthropicAdFree,
    SOURCES.openaiDataUse,
    SOURCES.anthropicPrivacySetting,
  ],
  relatedSlugs: ["never-share-with-ai-chatbot", "what-is-ai"],
  relatedLinks: [
    { label: "Consumer plan table", href: "/prices/plans" },
    { label: "Free-plan limits", href: "/prices/free-limits" },
    { label: "Subscription cost calculator", href: "/tools/subscription-cost-calculator" },
    { label: "Privacy matrix", href: "/prices/privacy" },
  ],
  lastReviewed: "2026-10-26",
  published: true,
};
