/**
 * Pinned rule shown above the plan tables and on the Prices hub
 * (Blueprint 5.4: "Subscription is not an API").
 */
export const SUBSCRIPTION_VS_API_RULE =
  "A chat subscription is not an API plan. A monthly plan for a chat app does not include API access, and API use is billed separately by the token.";

/** Note about what the price tables leave out. Shown in the footer under the price disclaimer. */
export const PRICES_LIMITS_NOTE =
  "Prices on this site are US list prices in US dollars. They leave out tax, regional pricing, promotions, student or education discounts, and offers bundled with a phone or internet plan. Check your own checkout for the price you will pay.";

/** Your original hub content, kept as given so nothing that already imports it breaks. */
export const PRICE_HUB_CONTENT = {
  title: "AI Model Pricing Directory",
  description: "Compare current pricing, rate limits, and feature access across leading LLM providers.",
  sections: [
    {
      id: "plans",
      title: "Subscription Plans",
      description: "Standard monthly consumer and enterprise subscription levels.",
    },
    {
      id: "api",
      title: "API Tokens",
      description: "Pay-as-you-go developer rates calculated per million input/output tokens.",
    },
  ],
};