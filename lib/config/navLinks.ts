import type { FooterGroup, NavLink } from "@/types";

/** Header navigation: 8 top-level items (Blueprint 2.1). */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Learn",
    href: "/learn",
    children: [
      { label: "Foundations", href: "/learn/foundations" },
      { label: "Practitioner", href: "/learn/practitioner" },
      { label: "Power user", href: "/learn/power-user" },
      { label: "Expert", href: "/learn/expert" },
      { label: "Glossary", href: "/learn/glossary" },
    ],
  },
  {
    label: "Compare",
    href: "/compare",
    children: [
      { label: "Model directory", href: "/compare/models" },
      { label: "Reviews", href: "/compare/reviews" },
      { label: "Best for", href: "/compare/best" },
      { label: "Head-to-head", href: "/compare/vs" },
      { label: "Apps", href: "/compare/apps" },
      { label: "Open vs closed", href: "/compare/open-vs-closed" },
      { label: "Alternatives", href: "/compare/alternatives" },
    ],
  },
  {
    label: "Prices",
    href: "/prices",
    children: [
      { label: "Plans", href: "/prices/plans" },
      { label: "API costs", href: "/prices/api" },
      { label: "Free limits", href: "/prices/free-limits" },
      { label: "Features", href: "/prices/features" },
      { label: "Privacy", href: "/prices/privacy" },
      { label: "Retirements", href: "/prices/retirements" },
      { label: "Benchmarks", href: "/prices/benchmarks" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "Prompt library", href: "/tools/prompt-library" },
      { label: "Which AI fits me?", href: "/tools/which-ai-fits-me" },
      { label: "Subscription cost calculator", href: "/tools/subscription-cost-calculator" },
      { label: "API cost calculator", href: "/tools/api-cost-calculator" },
      { label: "Token and context estimator", href: "/tools/token-estimator" },
      { label: "Local model memory estimator", href: "/tools/local-model-memory" },
      { label: "Benchmark reading checklist", href: "/tools/benchmark-checklist" },
      { label: "AI safety checklist", href: "/tools/ai-safety-checklist" },
      { label: "Cheat sheets and templates", href: "/tools/cheat-sheets" },
    ],
  },
  {
    label: "AI & Society",
    href: "/society",
    children: [
      { label: "Role in life", href: "/society/role-of-ai-in-our-lives" },
      { label: "Pros and cons", href: "/society/pros-and-cons-of-ai" },
      { label: "Jobs", href: "/society/is-ai-taking-jobs" },
      { label: "Industries", href: "/society/industries-changing-most" },
      { label: "Future", href: "/society/future-of-ai" },
      { label: "Myths", href: "/society/ai-myths-and-facts" },
      { label: "Interactive features", href: "/society#interactive-features" },
    ],
  },
  {
    label: "News",
    href: "/news",
    children: [
      { label: "Weekly roundup", href: "/news/weekly" },
      { label: "Release posts", href: "/news#releases" },
      { label: "Explainers", href: "/news#explainers" },
      { label: "Changelog", href: "/news/changelog" },
      { label: "EU AI Act", href: "/news/eu-ai-act" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Editorial standards", href: "/about/editorial-standards" },
      { label: "How we test", href: "/about/how-we-test" },
      { label: "Source policy", href: "/about/source-policy" },
      { label: "Independence", href: "/about/independence" },
      { label: "Corrections", href: "/about/corrections" },
    ],
  },
];

const LEGAL_LINKS: readonly NavLink[] = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of use", href: "/terms" },
];

/** Footer link groups (Blueprint 2.2). */
export const FOOTER_GROUPS: readonly FooterGroup[] = [
  {
    title: "Company",
    links: [...LEGAL_LINKS, { label: "Sitemap", href: "/sitemap" }],
  },
  {
    title: "Money pages",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Shop", href: "/shop" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Sponsored content", href: "/sponsored" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "How we test", href: "/about/how-we-test" },
      { label: "Independence and disclosure", href: "/about/independence" },
      { label: "Corrections log", href: "/about/corrections" },
    ],
  },
];

/** HTML sitemap sections: every nav group, with legal pages joined to About. */
export const SITEMAP_SECTIONS: readonly NavLink[] = NAV_LINKS.filter(
  (link) => link.href !== "/",
).map((link) =>
  link.href === "/about"
    ? {
        label: "About and legal",
        href: link.href,
        children: [...(link.children ?? []), ...LEGAL_LINKS],
      }
    : link,
);

/** Breadcrumb labels keyed by route. Anchor links are skipped. */
export const NAV_LABELS_BY_HREF: Readonly<Record<string, string>> = (() => {
  const labels: Record<string, string> = {};
  const allLinks = [
    ...NAV_LINKS.flatMap((link) => [link, ...(link.children ?? [])]),
    ...FOOTER_GROUPS.flatMap((group) => group.links),
  ];
  for (const link of allLinks) {
    if (link.href !== "/" && !link.href.includes("#")) {
      labels[link.href] ??= link.label;
    }
  }
  return labels;
})();
