import type { HubConfig } from "../hubTypes";

export const LEARN_HUB: HubConfig = {
  id: "learn",
  label: "Learn",
  href: "/learn",
  title: "Learn AI at your level",
  intro: "Four levels take you from first steps to expert detail. Use the glossary whenever a term is unfamiliar.",
  primaryAction: { label: "Start with Foundations", href: "/learn/foundations" },
  startHere: {
    intro: "New to AI? Begin with Foundations, then move up a level when the basics feel comfortable.",
    hrefs: ["/learn/foundations", "/learn/practitioner", "/learn/glossary"],
  },
  related: ["tools", "compare", "society"],
  groups: [
    {
      id: "levels",
      title: "Pick your level",
      intro: "Each level builds on the one before it.",
      topics: [
        {
          title: "Foundations",
          kind: "Level 1",
          description: "What AI is, how chatbots work and how to use them safely.",
          href: "/learn/foundations",
          points: ["What AI models can and cannot do", "How to write a clear first prompt", "How to keep private information safe"],
        },
        { title: "Practitioner", kind: "Level 2", description: "Practical techniques for using AI in everyday work.", href: "/learn/practitioner" },
        { title: "Power user", kind: "Level 3", description: "Workflows and settings for getting more out of AI tools.", href: "/learn/power-user" },
        { title: "Expert", kind: "Level 4", description: "Technical depth for people building with or evaluating AI.", href: "/learn/expert" },
      ],
    },
    {
      id: "reference",
      title: "Reference",
      intro: "Look things up as you go.",
      topics: [{ title: "Glossary", kind: "Reference", description: "Plain-language definitions of AI terms, from tokens to fine-tuning.", href: "/learn/glossary" }],
    },
  ],
};