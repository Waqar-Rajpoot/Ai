import type { HubConfig } from "../hubTypes";

export const NEWS_HUB: HubConfig = {
  id: "news",
  label: "News",
  href: "/news",
  title: "AI news and updates",
  intro: "A weekly summary of what changed, a dated changelog of this site, and explainers on the rules that affect AI.",
  primaryAction: { label: "Read the weekly roundup", href: "/news/weekly" },
  startHere: {
    intro: "Catch up on the week, then dig into regulation.",
    hrefs: ["/news/weekly", "/news/eu-ai-act", "/news/changelog"],
  },
  related: ["prices", "society", "compare"],
  groups: [
    {
      id: "latest",
      title: "Stay current",
      intro: "The regular updates.",
      topics: [
        {
          title: "Weekly roundup",
          kind: "Roundup",
          description: "The week's most important AI changes in one read.",
          href: "/news/weekly",
          points: ["The week's main model and product changes", "Policy and regulation updates", "Links to the original sources"],
        },
        { title: "Changelog", kind: "Changelog", description: "A dated record of changes to this site's data and pages.", href: "/news/changelog" },
      ],
    },
    {
      id: "regulation",
      title: "Regulation",
      intro: "Rules that affect how AI is built and used.",
      topics: [{ title: "EU AI Act", kind: "Explainer", description: "What the EU AI Act requires and when it applies.", href: "/news/eu-ai-act" }],
    },
    // `#releases` and `#explainers` are nav anchors. Add topics, or render your post lists as <HubView> children.
    { id: "releases", title: "Release posts", intro: "New models and product launches.", topics: [] },
    { id: "explainers", title: "Explainers", intro: "Background on the news, in plain language.", topics: [] },
  ],
};