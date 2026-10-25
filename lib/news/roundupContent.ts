import type { FaqEntry, GlossaryEntry, PointEntry, RelatedLink } from "@/lib/society/societyContentTypes";

export const READ_GUIDE: readonly PointEntry[] = [
  { headline: "Start with the summary.", detail: "It tells you in a few lines whether anything this week affects you." },
  { headline: "If you pay for AI, read the price part.", detail: "Look for your provider, the old and new figure, and the date it takes effect." },
  { headline: "If you build with an API, read Next week.", detail: "A retirement or rate change that lands in the next seven days is the one that can cost you." },
  { headline: "Check the label on each claim.", detail: "Tested by us, independent, or vendor-reported. A maker's own claim is weaker evidence." },
];

export const EMPTY_COPY = {
  releases: "No notable model releases this week. A quiet week is normal, and the part stays here so every roundup has the same shape.",
  priceChanges: "No price, plan or limit changes confirmed this week. Current prices are always on the plans and API pages.",
  policyItems: "No safety, privacy or policy news that we judged worth a note this week.",
  nextWeek: "No retirements or price dates fall in the next seven days in our data. Check the retirements tracker for later ones.",
  corrections: "No corrections have been made to this roundup.",
  sponsor: "This roundup has no sponsor.",
} as const;

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "A roundup is accurate as of its verified-on date. Prices, plans and dates can change afterwards, so confirm on the provider's own page.",
  "Release notes often come from the maker. We label them vendor-reported until we test or an independent source confirms them.",
  "Next-week dates were read when the roundup was published. They may have moved since, so check the retirements tracker.",
  "This roundup is general information, not legal, financial or investment advice.",
];

export const SOURCE_LINE =
  "Each claim is labelled: tested by us, independent third party or vendor-reported. Vendor numbers never share a column with independent ones. Provider pages come first in our source hierarchy.";

export const FAQ: readonly FaqEntry[] = [
  { question: "Why does a roundup have empty parts?", answer: "Every roundup has the same six parts so you always know where to look. If nothing happened in a part, it says so." },
  { question: "Can a published roundup change?", answer: "We keep the original text and add a dated correction note at the bottom if something was wrong. Corrections also go in the corrections log and the changelog." },
  { question: "Why is a release marked vendor-reported?", answer: "Because the claim came from the maker's own announcement. It changes to tested or independent only after we run our test or find a published independent result." },
  { question: "Are the prices in an old roundup still right?", answer: "Treat them as correct for that roundup's verified-on date only. Use the plans and API pages for today's prices." },
  { question: "What is the sponsor message?", answer: "At most one labelled message that an advertiser paid for. It is kept apart from the editorial parts and never changes a score or a verdict." },
  { question: "Is this the same as the newsletter?", answer: "Yes. The email is the same roundup, sent on the same weekday." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Verified on", meaning: "The date we checked the facts on the provider's own page." },
  { term: "Vendor-reported", meaning: "A claim that comes from the maker's own announcement." },
  { term: "Introductory rate", meaning: "A lower price for a limited time, which can change when the period ends." },
  { term: "Retirement", meaning: "The date a model or feature stops working, or the old name starts serving a different model." },
  { term: "Directory row", meaning: "A model's entry in our model directory, with price, context and score." },
  { term: "Sponsor slot", meaning: "A labelled, paid message kept apart from editorial content." },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/news/weekly", label: "All weekly roundups", note: "The archive, by date" },
  { href: "/news", label: "News hub", note: "Release posts, price-change notes and upcoming dates" },
  { href: "/prices/retirements", label: "Retirements tracker", note: "Models and features being retired, with a model ID checker" },
  { href: "/prices/api", label: "API costs", note: "Price per million tokens and cost per task" },
  { href: "/compare/models", label: "Model directory", note: "Prices, context and scores" },
  { href: "/about/independence", label: "Independence and disclosure", note: "Payment never changes a score" },
];