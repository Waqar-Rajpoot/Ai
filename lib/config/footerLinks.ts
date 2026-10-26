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

export interface FooterPromise {
  id: string;
  text: string;
  link: FooterLink;
}

export const FOOTER_BRAND = {
  name: "AI Tools for Everyday People",
  tagline: "Plain-English help for using AI. Every price, score and rule is dated and sourced.",
  /** First year of the copyright line. */
  foundedYear: 2026,
} as const;

export const FOOTER_NEWSLETTER = {
  title: "Get the weekly roundup",
  text: "New models, price changes and safety news, once a week, in plain English.",
  ctaLabel: "Read about the newsletter",
  href: "/newsletter",
} as const;

export const FOOTER_PROMISES: readonly FooterPromise[] = [
  { id: "independence", text: "Payment never changes a score or verdict.", link: { label: "Independence and disclosure", href: "/about/independence" } },
  { id: "sourced", text: "Every price, score and rule is dated and linked to its source.", link: { label: "Source policy", href: "/about/source-policy" } },
  { id: "corrections", text: "Corrections are logged with the date they were fixed.", link: { label: "Corrections log", href: "/about/corrections" } },
  { id: "sponsored", text: "Sponsored content is always labelled and kept apart from reviews.", link: { label: "Sponsored content", href: "/sponsored" } },
];

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

/** Trust shortcuts, company and money pages (Blueprint 2.2). */
export const FOOTER_SITE_GROUPS: readonly FooterGroup[] = [
  {
    id: "trust",
    title: "Trust",
    links: [
      { label: "About us", href: "/about" },
      { label: "Editorial standards", href: "/about/editorial-standards" },
      { label: "How we test", href: "/about/how-we-test" },
      { label: "Source policy", href: "/about/source-policy" },
      { label: "Independence and disclosure", href: "/about/independence" },
      { label: "Corrections log", href: "/about/corrections" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of use", href: "/terms" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    id: "money",
    title: "Products and support",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Shop (digital products)", href: "/shop" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Sponsored content", href: "/sponsored" },
    ],
  },
];

export const FOOTER_REPORT_ERROR: FooterLink = { label: "Report an error", href: "/about/corrections" };

export const FOOTER_FRESHNESS = {
  text: "Every page shows when it was last verified.",
  link: { label: "See what changed", href: "/news/changelog" },
} as const;

export const FOOTER_NOT_ADVICE_NOTE =
  "Nothing on this site is professional, legal, medical or financial advice. AI is not a doctor, lawyer or financial advisor.";

export const FOOTER_AFFILIATE_NOTE =
  "Where a page contains an affiliate link, it says so on that page. Payment never changes a score or verdict.";