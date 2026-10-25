import type {
  FaqEntry,
  GlossaryEntry,
  PointEntry,
  RelatedLink,
  SourceEntry,
} from "@/lib/society/societyContentTypes";

export interface SectionGuideRow {
  section: string;
  covers: string;
  bestFor: string;
  goDeeper: readonly { href: string; label: string }[];
}

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "One calm post a week.", detail: "The roundup pulls the week's releases, price changes and safety and policy news into a single read." },
  { headline: "Same shape every time.", detail: "Six parts in the same order, so you can skip to the one you need." },
  { headline: "Dated and sourced.", detail: "Each roundup says when its facts were checked, and each number says who reported it." },
  { headline: "It is also the newsletter.", detail: "The email is the same roundup, sent on a fixed weekday." },
];

export const SECTION_GUIDE: readonly SectionGuideRow[] = [
  { section: "Summary", covers: "The week in a few lines, so you can stop here if you are short on time.", bestFor: "Everyone", goDeeper: [{ href: "/news", label: "News hub" }] },
  { section: "New models and releases", covers: "Models released that week and whether they matter. Each links to a release post and a row in the model directory.", bestFor: "Anyone choosing a model or plan", goDeeper: [{ href: "/compare/models", label: "Model directory" }, { href: "/compare/reviews", label: "Reviews" }] },
  { section: "Price and plan changes", covers: "Changes to prices, plans and limits, with the old and new figure and the date it takes effect.", bestFor: "Anyone paying for AI, or building with an API", goDeeper: [{ href: "/prices/plans", label: "Consumer plans" }, { href: "/prices/api", label: "API costs" }] },
  { section: "Safety, privacy and policy", covers: "Short plain-English items on safety, privacy and rules, each linked to the guide that explains the background.", bestFor: "Parents, teachers, small businesses, compliance leads", goDeeper: [{ href: "/news/eu-ai-act", label: "EU AI Act timeline" }, { href: "/tools/ai-safety-checklist", label: "AI safety checklist" }] },
  { section: "Next week", covers: "Dates coming up: models being retired and introductory prices that end.", bestFor: "Builders and anyone with a renewal due", goDeeper: [{ href: "/prices/retirements", label: "Retirements tracker" }, { href: "/news#coming-up", label: "Coming up" }] },
  { section: "Sponsor slot (labelled)", covers: "At most one clearly labelled sponsor message, kept apart from the editorial content.", bestFor: "Anyone who wants to know how the site is funded", goDeeper: [{ href: "/about/independence", label: "Independence and disclosure" }] },
];

export const READ_IN_FIVE: readonly PointEntry[] = [
  { headline: "Read the summary.", detail: "It tells you whether anything this week affects you." },
  { headline: "Check the price section if you pay.", detail: "Look for your provider and the date a change takes effect." },
  { headline: "Check Next week for dates.", detail: "A retirement or rate change that ends next week is the one that can cost you." },
  { headline: "Open one link.", detail: "Pick the release post or explainer that matters to you, and skip the rest." },
  { headline: "Look at the label on every number.", detail: "Our test, independent or reported by the maker. Vendor claims are weaker evidence." },
];

export const WEEKLY_ROUTINE: readonly PointEntry[] = [
  { headline: "Check the release feed.", detail: "Add any new model to the directory." },
  { headline: "Re-check prices.", detail: "Open each provider's pricing page, and update the plan and API tables and the changelog." },
  { headline: "Check introductory rates.", detail: "Look for rates that end in the next 30 days." },
  { headline: "Re-read the best-for pages.", detail: "Mark any model that a new release has superseded." },
  { headline: "Review the retirements tracker.", detail: "Add new dates and update changed ones." },
  { headline: "Publish and send.", detail: "Post the roundup, then send the newsletter." },
  { headline: "Log corrections.", detail: "Record any error reported to us, with the date it was fixed." },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Why is the archive empty?", answer: "It fills as roundups are published. We would rather show an empty archive than invent news. The coverage panel and the list update on their own once the first roundup goes live." },
  { question: "How often is a roundup published?", answer: "Once a week, on a fixed weekday. That is our target, not a guarantee, and the coverage panel shows any week we missed." },
  { question: "Is the roundup the same as the newsletter?", answer: "Yes. The email is the same roundup, sent on the same weekday. Subscribe below to get it." },
  { question: "Do you change a roundup after it is published?", answer: "We keep the original and add a dated correction note when something was wrong. Corrections are also recorded in the corrections log and the changelog." },
  { question: "How far back does the archive go?", answer: "To our first roundup. Older roundups stay available, because prices and rules in them show what was true on that date." },
  { question: "Can I trust the prices in an old roundup?", answer: "Treat them as correct for the verified-on date on that post only. For today's prices, use the plans and API pages." },
  { question: "Is there an RSS feed?", answer: "Not at the moment. Use the email, or bookmark this page." },
  { question: "Do sponsors affect what goes into a roundup?", answer: "No. The sponsor slot is labelled and kept apart, and payment never changes a score or a verdict." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Roundup", meaning: "The weekly post that gathers releases, price changes and policy news in one place." },
  { term: "Archive", meaning: "The list of all past roundups, newest first." },
  { term: "Verified on", meaning: "The date we checked the facts on the provider's own page." },
  { term: "Vendor-reported", meaning: "A number that comes from the maker's own announcement." },
  { term: "Introductory rate", meaning: "A lower price for a limited time, which can change when the period ends." },
  { term: "Retirement", meaning: "The date a model or feature stops working, or the old name starts serving a different model." },
  { term: "Superseded", meaning: "Replaced by a newer model or plan. Kept on the site with a link to the successor." },
  { term: "Sponsor slot", meaning: "A labelled message paid for by an advertiser, kept apart from editorial content." },
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "Provider pages", title: "Pricing, model and documentation pages, opened on the day of publication", href: null, use: "First in our source hierarchy" },
  { publisher: "Our retirements tracker", title: "Models and features being retired", href: "/prices/retirements", use: "Source of the retirement dates in each roundup" },
  { publisher: "Our price data", title: "Plan and API price tables", href: "/prices/api", use: "Source of price figures in each roundup" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/news", label: "News hub", note: "Latest posts, price-change notes and upcoming dates" },
  { href: "/prices/retirements", label: "Retirements tracker", note: "Models and features being retired, with a model ID checker" },
  { href: "/prices/api", label: "API costs", note: "Price per million tokens and cost per task" },
  { href: "/compare/models", label: "Model directory", note: "Prices, context and scores" },
  { href: "/about/source-policy", label: "Source policy", note: "How we choose and label sources" },
  { href: "/about/independence", label: "Independence and disclosure", note: "Payment never changes a score" },
];