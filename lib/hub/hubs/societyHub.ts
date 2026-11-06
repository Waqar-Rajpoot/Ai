import type { HubConfig } from "../hubTypes";

export const SOCIETY_HUB: HubConfig = {
  id: "society",
  label: "AI & Society",
  href: "/society",
  title: "How AI is changing daily life, work and the world",
  intro: "Balanced, dated and sourced. Each page weighs benefits and risks together, and every figure names its source and date.",
  primaryAction: { label: "Start with Ten places you meet AI", href: "/society/ten-places-you-meet-ai" },
  jumpAction: { label: "Try the interactive features", groupId: "interactive-features" },
  startHere: {
    intro: "Three pages that give a fair picture, in reading order.",
    hrefs: ["/society/ten-places-you-meet-ai", "/society/ai-adoption-data", "/society/pros-and-cons-of-ai"],
  },
  related: ["learn", "news", "about"],
  groups: [
    {
      id: "everyday-life",
      title: "Everyday life and the numbers",
      intro: "Where AI shows up today, and how widely it is used.",
      topics: [
        {
          title: "Ten places you meet AI",
          kind: "Guide",
          description: "Everyday situations where AI is already at work, from search to customer service.",
          href: "/society/ten-places-you-meet-ai",
          points: ["Everyday settings where AI already operates", "Plain examples, not jargon", "Where to read more on each"],
        },
        { title: "AI adoption data", kind: "Data", description: "How many people and organisations use AI, from named surveys and trackers.", href: "/society/ai-adoption-data" },
      ],
    },
    {
      id: "money-and-energy",
      title: "Money and energy",
      intro: "What AI does in finance, and what it costs to run.",
      topics: [
        { title: "AI in banking and finance", kind: "Guide", description: "How banks use AI for fraud checks, credit decisions and customer service.", href: "/society/ai-in-banking-and-finance" },
        { title: "AI power use", kind: "Data", description: "How much electricity AI needs and why data centres are part of the story.", href: "/society/ai-power-use" },
      ],
    },
    {
      id: "work-and-industry",
      title: "Work and industry",
      intro: "What the evidence says about jobs and which sectors are changing.",
      topics: [
        { title: "Is AI taking jobs?", kind: "Explainer", description: "What the evidence says about AI and employment.", href: "/society/is-ai-taking-jobs" },
        { title: "Industries changing most", kind: "Explainer", description: "Which sectors are changing fastest, and how.", href: "/society/industries-changing-most" },
      ],
    },
    {
      id: "big-picture",
      title: "The big picture",
      intro: "Benefits and risks weighed together, what comes next, and claims checked.",
      topics: [
        { title: "Pros and cons of AI", kind: "Explainer", description: "The benefits and the risks, side by side.", href: "/society/pros-and-cons-of-ai" },
        { title: "The future of AI", kind: "Outlook", description: "Six forces to watch through 2030.", href: "/society/future-of-ai" },
        { title: "AI myths and facts", kind: "Fact check", description: "Common claims about AI checked against the evidence.", href: "/society/ai-myths-and-facts" },
      ],
    },
    {
      // Hidden until entries are added; the hero jump button hides with it.
      id: "interactive-features",
      title: "Interactive features",
      intro: "Explore the data yourself.",
      topics: [],
    },
  ],
};