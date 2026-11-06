import type { HubConfig } from "../hubTypes";

export const PRICES_HUB: HubConfig = {
  id: "prices",
  label: "Prices",
  href: "/prices",
  title: "AI prices, limits and policies",
  intro: "What AI costs, what each plan includes, how your data is handled and when models are retired.",
  primaryAction: { label: "See plans", href: "/prices/plans" },
  startHere: {
    intro: "Start with consumer plans. Developers can go straight to API costs.",
    hrefs: ["/prices/plans", "/prices/api", "/prices/free-limits"],
  },
  related: ["tools", "compare", "news"],
  groups: [
    {
      id: "what-you-pay",
      title: "What you pay",
      intro: "Subscriptions, API rates and what is free.",
      topics: [
        {
          title: "Plans",
          kind: "Data",
          description: "Consumer subscription prices and what each tier includes.",
          href: "/prices/plans",
          points: ["What each tier costs", "What each tier includes", "How plans differ between providers"],
        },
        { title: "API costs", kind: "Data", description: "Per-token prices for developers.", href: "/prices/api" },
        { title: "Free limits", kind: "Data", description: "What you get without paying, and where the caps are.", href: "/prices/free-limits" },
      ],
    },
    {
      id: "what-you-get",
      title: "What you get",
      intro: "Features, data handling and measured performance.",
      topics: [
        { title: "Features", kind: "Comparison", description: "Which features come with which plan.", href: "/prices/features" },
        { title: "Privacy", kind: "Comparison", description: "How providers handle your data and what you can switch off.", href: "/prices/privacy" },
        { title: "Benchmarks", kind: "Data", description: "Published test scores, with notes on how to read them.", href: "/prices/benchmarks" },
      ],
    },
    {
      id: "what-changes",
      title: "What changes",
      intro: "Models and plans do not last forever.",
      topics: [{ title: "Retirements", kind: "Tracker", description: "Models and plans being shut down, with dates.", href: "/prices/retirements" }],
    },
  ],
};