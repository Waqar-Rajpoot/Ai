import type { StaticPageDefinition } from "@/types";

/**
 * Outlines of the Part A trust, legal and utility pages (Blueprint 5.1).
 * Headings come from the blueprint; the body text is written by hand later.
 */
export const STATIC_PAGES = {
  about: {
    title: "About us",
    route: "/about",
    badge: "trust",
    description: "Who runs the site, what it covers and how it stays current.",
    sections: [
      { heading: "Who runs the site", subheadings: ["Author and editor", "Why the site exists"] },
      { heading: "What we cover", subheadings: ["Learn", "Compare", "Stay current"] },
      { heading: "How we stay current", subheadings: ["Update cadence", "Changelog"] },
      { heading: "Contact" },
    ],
  },
  editorialStandards: {
    title: "Editorial standards",
    route: "/about/editorial-standards",
    badge: "trust",
    description:
      "How topics are chosen, how pages are written and checked, and how AI tools are used for drafting.",
    sections: [
      { heading: "How topics are chosen", subheadings: ["Reader questions", "Search demand", "News triggers"] },
      { heading: "How pages are written and checked", subheadings: ["Writer", "Reviewer", "Stale-review rule"] },
      { heading: "AI tools used for drafting", subheadings: ["Which models", "What they did", "Human edit"] },
      { heading: "Levels and badges" },
    ],
  },
  howWeTest: {
    title: "How we test",
    route: "/about/how-we-test",
    badge: "trust",
    description:
      "The test battery, scorecard weights, settings and result labels behind every review.",
    sections: [
      {
        heading: "The test battery",
        subheadings: [
          "Accuracy",
          "Reasoning and maths",
          "Writing and instruction following",
          "Coding and tool use",
          "Long documents",
          "Cost per task",
          "Privacy and limits",
        ],
      },
      { heading: "Scorecard weights", subheadings: ["Weight per point", "Why"] },
      { heading: "Settings and test dates", subheadings: ["Model version", "Effort setting", "Test day"] },
      { heading: "Result labels", subheadings: ["Tested by us", "Independent third party", "Vendor-reported"] },
    ],
  },
  sourcePolicy: {
    title: "Source policy",
    route: "/about/source-policy",
    badge: "trust",
    description:
      "Which sources we use first, how vendor numbers are labelled and how conflicts are resolved.",
    sections: [
      {
        heading: "Source hierarchy",
        subheadings: ["Provider page", "Independent evaluators", "Our tests", "Secondary blogs"],
      },
      { heading: "Vendor-reported numbers", subheadings: ["Labelling", "Separate tables"] },
      { heading: "Resolving conflicts", subheadings: ["Provider-level resolution", "Changelog note"] },
    ],
  },
  independence: {
    title: "Independence and disclosure",
    route: "/about/independence",
    badge: "trust",
    description:
      "How affiliate links and sponsors are disclosed, and why payment never changes a score.",
    sections: [
      { heading: "Affiliate relationships", subheadings: ["Where they appear", "How disclosed"] },
      { heading: "Sponsors", subheadings: ["Newsletter slot", "Sponsored content labels"] },
      {
        heading: "Conflict-of-interest rule",
        subheadings: ["Models that also draft content", "No pre-publication access for makers"],
      },
      { heading: "Promise", subheadings: ["Payment never changes a score or verdict"] },
    ],
  },
  corrections: {
    title: "Corrections policy and log",
    route: "/about/corrections",
    badge: "trust",
    description:
      "How to report an error, how fast we respond and a log of every correction.",
    sections: [
      { heading: "How to report an error" },
      { heading: "Our response time" },
      { heading: "Corrections log", subheadings: ["Date reported", "Date fixed", "What changed"] },
    ],
  },
  contact: {
    title: "Contact",
    route: "/contact",
    badge: "utility",
    description: "General questions, error reports, press and partnerships.",
    showContactEmail: true,
    sections: [
      { heading: "General questions" },
      { heading: "Report an error" },
      { heading: "Press and partnerships" },
    ],
  },
  privacyPolicy: {
    title: "Privacy policy",
    route: "/privacy-policy",
    badge: "legal",
    description: "What we collect, how we use it and the choices you have.",
    sections: [
      { heading: "What we collect", subheadings: ["Newsletter email", "Analytics", "Cookies"] },
      { heading: "How we use it" },
      { heading: "Your choices" },
      { heading: "Contact" },
    ],
  },
  terms: {
    title: "Terms of use",
    route: "/terms",
    badge: "legal",
    description: "The terms for using this site.",
    sections: [
      { heading: "Using the site" },
      { heading: "Not professional or legal advice" },
      { heading: "Affiliate and sponsor notice" },
      { heading: "Changes to terms" },
    ],
  },
} satisfies Record<string, StaticPageDefinition>;

/** Routes that exist after Phase 1; each later phase appends its own. */
export const PART_A_ROUTES: readonly string[] = [
  "/",
  "/search",
  "/sitemap",
  ...Object.values(STATIC_PAGES).map((page) => page.route),
];
