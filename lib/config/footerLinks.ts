export interface FooterLink {
  label: string;
  href: string;
  /** Set to false to hide the link until its page exists, so readers never reach a 404. Defaults to true. */
  isLive?: boolean;
}

export interface FooterGroup {
  id: string;
  title: string;
  links: readonly FooterLink[];
}


export const FOOTER_BRAND = {
  name: "AI Tools for Everyday People",
  tagline: "Plain-English help for using AI. Every price, score and rule is dated and sourced.",
  foundedYear: 2026,
} as const;

/** Columns that mirror the top navigation (Blueprint 2.1). */
export const FOOTER_EXPLORE_GROUPS: readonly FooterGroup[] = [
  {
    id: "learn",
    title: "Learn",
    links: [
      { label: "All levels", href: "/learn" },
      { label: "Level 1: Foundations", href: "/learn/foundations" },
      { label: "Level 2: Practitioner", href: "/learn/practitioner" },
      { label: "Level 3: Power user", href: "/learn/power-user" },
      { label: "Level 4: Expert", href: "/learn/expert" },
      { label: "Glossary", href: "/learn/glossary" },
    ],
  },
  {
    id: "compare",
    title: "Compare",
    links: [
      { label: "Model directory", href: "/compare/models" },
      { label: "Reviews", href: "/compare/reviews" },
      { label: "Best for", href: "/compare/best" },
      { label: "Head-to-head", href: "/compare/vs" },
      { label: "Apps compared", href: "/compare/apps" },
      { label: "Open vs closed", href: "/compare/open-vs-closed" },
      { label: "Alternatives", href: "/compare/alternatives" },
    ],
  },
  {
    id: "prices",
    title: "Prices",
    links: [
      { label: "Overview", href: "/prices" },
      { label: "Consumer plans", href: "/prices/plans" },
      { label: "API costs", href: "/prices/api" },
      { label: "Free-plan limits", href: "/prices/free-limits" },
      { label: "Feature matrix", href: "/prices/features" },
      { label: "Privacy matrix", href: "/prices/privacy" },
      { label: "Retirements", href: "/prices/retirements" },
      { label: "Benchmarks", href: "/prices/benchmarks" },
    ],
  },
  {
    id: "tools",
    title: "Free tools",
    links: [
      { label: "All tools", href: "/tools" },
      { label: "Prompt library", href: "/tools/prompt-library" },
      { label: "Which AI fits me?", href: "/tools/which-ai-fits-me" },
      { label: "Subscription cost", href: "/tools/subscription-cost-calculator" },
      { label: "API cost", href: "/tools/api-cost-calculator" },
      { label: "Token estimator", href: "/tools/token-estimator" },
      { label: "Local model memory", href: "/tools/local-model-memory" },
      { label: "Benchmark checklist", href: "/tools/benchmark-checklist" },
      { label: "AI safety checklist", href: "/tools/ai-safety-checklist" },
      { label: "Cheat sheets", href: "/tools/cheat-sheets" },
    ],
  },
  {
    id: "society",
    title: "AI & Society",
    links: [
      { label: "Overview", href: "/society" },
      { label: "Role in our lives", href: "/society/role-of-ai-in-our-lives" },
      { label: "Pros and cons", href: "/society/pros-and-cons-of-ai" },
      { label: "Jobs", href: "/society/is-ai-taking-jobs" },
      { label: "Industries", href: "/society/industries-changing-most" },
      { label: "The future", href: "/society/future-of-ai" },
      { label: "Myths and facts", href: "/society/ai-myths-and-facts" },
    ],
  },
  {
    id: "news",
    title: "News",
    links: [
      { label: "Latest posts", href: "/news" },
      { label: "Weekly roundup", href: "/news/weekly" },
      { label: "EU AI Act timeline", href: "/news/eu-ai-act" },
      { label: "Changelog", href: "/news/changelog" },
    ],
  },
];

export const FOOTER_REPORT_ERROR: FooterLink = { label: "Report an error", href: "/about/corrections" };