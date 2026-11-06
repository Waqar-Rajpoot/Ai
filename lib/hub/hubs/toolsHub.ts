import type { HubConfig } from "../hubTypes";

export const TOOLS_HUB: HubConfig = {
  id: "tools",
  label: "Tools",
  href: "/tools",
  title: "Tools and calculators",
  intro: "Calculators, checklists and templates that help you choose, price and use AI tools with more confidence.",
  primaryAction: { label: "Find which AI fits you", href: "/tools/which-ai-fits-me" },
  startHere: {
    intro: "Pick a tool by what you need to decide.",
    hrefs: ["/tools/which-ai-fits-me", "/tools/prompt-library", "/tools/api-cost-calculator"],
  },
  related: ["prices", "compare", "learn"],
  groups: [
    {
      id: "prompt-and-plan",
      title: "Prompt and plan",
      intro: "Get a good starting point.",
      topics: [
        {
          title: "Which AI fits me?",
          kind: "Tool",
          description: "Answer a few questions to narrow down your options.",
          href: "/tools/which-ai-fits-me",
          points: ["A few questions about your needs", "A short list of options to compare", "Links to the full comparison pages"],
        },
        { title: "Prompt library", kind: "Library", description: "Tested prompts you can copy and adapt.", href: "/tools/prompt-library" },
        { title: "Cheat sheets and templates", kind: "Templates", description: "Printable references and ready-made templates.", href: "/tools/cheat-sheets" },
      ],
    },
    {
      id: "estimate",
      title: "Estimate cost and size",
      intro: "Work out what a choice will cost or need.",
      topics: [
        { title: "Subscription cost calculator", kind: "Calculator", description: "Total your monthly and yearly AI subscriptions.", href: "/tools/subscription-cost-calculator" },
        { title: "API cost calculator", kind: "Calculator", description: "Estimate API spend from your expected usage.", href: "/tools/api-cost-calculator" },
        { title: "Token and context estimator", kind: "Calculator", description: "Check how much text fits in a model's context window.", href: "/tools/token-estimator" },
        { title: "Local model memory estimator", kind: "Calculator", description: "Estimate the memory a model needs to run on your own machine.", href: "/tools/local-model-memory" },
      ],
    },
    {
      id: "check-before-you-trust",
      title: "Check before you trust",
      intro: "Questions to ask before relying on a claim or a tool.",
      topics: [
        { title: "Benchmark reading checklist", kind: "Checklist", description: "What to look for when a vendor quotes a benchmark.", href: "/tools/benchmark-checklist" },
        { title: "AI safety checklist", kind: "Checklist", description: "Steps for using AI responsibly with sensitive work.", href: "/tools/ai-safety-checklist" },
      ],
    },
  ],
};