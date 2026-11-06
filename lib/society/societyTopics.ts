/** Base route for every page in the AI & Society section. */
export const SOCIETY_BASE_PATH = "/society";

/** Element id the "Interactive features" nav link and hero button scroll to. */
export const INTERACTIVE_FEATURES_ANCHOR = "interactive-features";

/** A single article page in the AI & Society section. */
export interface SocietyTopic {
  /** Last segment of the route, e.g. `ai-power-use`. */
  slug: string;
  title: string;
  /** One plain sentence on what the reader will learn. */
  description: string;
}

/** A themed set of topics shown together on the hub. */
export interface SocietyTopicGroup {
  id: string;
  title: string;
  intro: string;
  topics: SocietyTopic[];
}

/** An interactive tool or explorer linked from the hub. */
export interface InteractiveFeature {
  title: string;
  description: string;
  href: string;
}

/** Topic groups in reading order. Slugs match the "AI & Society" navigation links. */
export const SOCIETY_TOPIC_GROUPS: readonly SocietyTopicGroup[] = [
  {
    id: "everyday-life",
    title: "Everyday life and the numbers",
    intro: "Where AI shows up today, and how widely it is used.",
    topics: [
      {
        slug: "ten-places-you-meet-ai",
        title: "Ten places you meet AI",
        description: "Everyday situations where AI is already at work, from search to customer service.",
      },
      {
        slug: "ai-adoption-data",
        title: "AI adoption data",
        description: "How many people and organisations use AI, from named surveys and trackers.",
      },
    ],
  },
  {
    id: "money-and-energy",
    title: "Money and energy",
    intro: "What AI does in finance, and what it costs to run.",
    topics: [
      {
        slug: "ai-in-banking-and-finance",
        title: "AI in banking and finance",
        description: "How banks use AI for fraud checks, credit decisions and customer service.",
      },
      {
        slug: "ai-power-use",
        title: "AI power use",
        description: "How much electricity AI needs and why data centres are part of the story.",
      },
    ],
  },
  {
    id: "work-and-industry",
    title: "Work and industry",
    intro: "What the evidence says about jobs and which sectors are changing.",
    topics: [
      {
        slug: "is-ai-taking-jobs",
        title: "Is AI taking jobs?",
        description: "What the evidence says about AI and employment.",
      },
      {
        slug: "industries-changing-most",
        title: "Industries changing most",
        description: "Which sectors are changing fastest, and how.",
      },
    ],
  },
  {
    id: "big-picture",
    title: "The big picture",
    intro: "Benefits and risks weighed together, what comes next, and claims checked.",
    topics: [
      {
        slug: "pros-and-cons-of-ai",
        title: "Pros and cons of AI",
        description: "The benefits and the risks, side by side.",
      },
      {
        slug: "future-of-ai",
        title: "The future of AI",
        description: "Six forces to watch through 2030.",
      },
      {
        slug: "ai-myths-and-facts",
        title: "AI myths and facts",
        description: "Common claims about AI checked against the evidence.",
      },
    ],
  },
];

/**
 * Interactive features listed on the hub.
 * TODO: add entries; the section and its hero button stay hidden while this is empty.
 */
export const SOCIETY_INTERACTIVE_FEATURES: readonly InteractiveFeature[] = [];

/** Policy pages linked from the hub footer. */
export const SOCIETY_TRUST_LINKS: readonly { label: string; href: string }[] = [
  { label: "Source policy", href: "/about/source-policy" },
  { label: "How we test", href: "/about/how-we-test" },
  { label: "Report an error", href: "/about/corrections" },
];

/** Builds the route for a topic page. */
export function getTopicHref(topic: SocietyTopic): string {
  return `${SOCIETY_BASE_PATH}/${topic.slug}`;
}

/** The first topic in reading order, used as the hub's main call to action. */
export function getFirstTopic(): SocietyTopic {
  return SOCIETY_TOPIC_GROUPS[0].topics[0];
}