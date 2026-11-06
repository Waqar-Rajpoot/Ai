import type { HubConfig } from "../hubTypes";

export const ABOUT_HUB: HubConfig = {
  id: "about",
  label: "About",
  href: "/about",
  title: "About this site",
  intro: "How we research, test and fund our coverage, and what to do if you spot a mistake.",
  startHere: {
    intro: "These three pages explain how to judge what you read here.",
    hrefs: ["/about/editorial-standards", "/about/source-policy", "/about/corrections"],
  },
  related: ["society", "news", "learn"],
  // This hub lists the policy pages itself, so the shared footer and newsletter band would only add noise.
  footerLinks: [],
  showNewsletter: false,
  groups: [
    {
      id: "how-we-work",
      title: "How we work",
      intro: "The standards behind every page.",
      topics: [
        {
          title: "Editorial standards",
          kind: "Policy",
          description: "What we publish and how we write it.",
          href: "/about/editorial-standards",
          points: ["What we cover and what we leave out", "How pages are written and reviewed", "How we label opinion and fact"],
        },
        { title: "How we test", kind: "Method", description: "How we run hands-on tests and score results.", href: "/about/how-we-test" },
        { title: "Source policy", kind: "Policy", description: "Which sources we trust, and how we label them.", href: "/about/source-policy" },
      ],
    },
    {
      id: "accountability",
      title: "Accountability",
      intro: "Who pays for this, and what happens when we are wrong.",
      topics: [
        { title: "Independence", kind: "Disclosure", description: "How we are funded and what we disclose.", href: "/about/independence" },
        { title: "Corrections", kind: "Policy", description: "How to report an error and how we fix it.", href: "/about/corrections" },
      ],
    },
  ],
};