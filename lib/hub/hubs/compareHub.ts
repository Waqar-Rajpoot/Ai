import type { HubConfig } from "../hubTypes";

export const COMPARE_HUB: HubConfig = {
  id: "compare",
  label: "Compare",
  href: "/compare",
  title: "Compare AI models and apps",
  intro: "Find the right model for the job, then see how your options stack up on features, limits and trade-offs.",
  primaryAction: { label: "Browse the model directory", href: "/compare/models" },
  startHere: {
    intro: "Not sure where to look? Start with the directory, then narrow down by use case.",
    hrefs: ["/compare/models", "/compare/best", "/compare/vs"],
  },
  related: ["prices", "tools", "learn"],
  groups: [
    {
      id: "find-a-model",
      title: "Find a model",
      intro: "Start from the full list, a review or your use case.",
      topics: [
        {
          title: "Model directory",
          kind: "Directory",
          description: "Every model we track, with key facts side by side.",
          href: "/compare/models",
          points: ["Key facts for each model in one place", "Links to reviews and head-to-head pages", "A good starting point before reading a review"],
        },
        { title: "Reviews", kind: "Review", description: "Hands-on reviews of individual models.", href: "/compare/reviews" },
        { title: "Best for", kind: "Picks", description: "Top picks for specific jobs such as writing, coding and research.", href: "/compare/best" },
      ],
    },
    {
      id: "compare-options",
      title: "Compare options",
      intro: "Weigh two choices, or whole categories, against each other.",
      topics: [
        { title: "Head-to-head", kind: "Comparison", description: "Direct comparisons between two models.", href: "/compare/vs" },
        { title: "Apps", kind: "Comparison", description: "How the main AI apps differ in features and limits.", href: "/compare/apps" },
        { title: "Open vs closed", kind: "Explainer", description: "The trade-offs between open-weight and proprietary models.", href: "/compare/open-vs-closed" },
        { title: "Alternatives", kind: "Picks", description: "Other options to consider when a tool does not fit.", href: "/compare/alternatives" },
      ],
    },
  ],
};