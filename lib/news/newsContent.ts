import type {
  FaqEntry,
  GlossaryEntry,
  PointEntry,
  RelatedLink,
  SourceEntry,
} from "@/lib/society/societyContentTypes";

export interface CadenceRow {
  kind: string;
  whatItIs: string;
  format: string;
  target: string;
  readers: string;
  where: string;
}

export interface LabelEntry {
  label: string;
  meaning: string;
}

export interface ReaderRoute {
  reader: string;
  start: string;
  why: string;
  href: string;
}

export interface StandingPage {
  href: string;
  title: string;
  detail: string;
}

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "Four kinds of item, each with a target.", detail: "Release posts, price-change notes, explainers and a weekly roundup, so you know what to expect and how fast." },
  { headline: "Every item is dated and sourced.", detail: "Each one says when its facts were checked and whether a number is ours, independent or reported by the maker." },
  { headline: "Short, and linked to the guide.", detail: "A news item says what changed and what it means, then points to the page that explains the background." },
  { headline: "Mistakes are corrected in public.", detail: "Fixes and source conflicts are logged in the changelog and the corrections log." },
];

export const CADENCE_ROWS: readonly CadenceRow[] = [
  { kind: "Release post", whatItIs: "“What changed and should you care?” for a new frontier or popular model, plus a row in the model directory.", format: "300 to 500 words", target: "Within 48 hours of the release", readers: "Levels 2 to 3", where: "/news/releases/[slug]" },
  { kind: "Price-change note", whatItIs: "A short note when a price, plan or limit changes, followed by updated plan and cost tables.", format: "A few lines, shown on this page", target: "Within 24 hours", readers: "Levels 1 to 3", where: "This page, and the changelog" },
  { kind: "Explainer", whatItIs: "Safety, privacy and policy news in plain English, linked to the relevant guide.", format: "Short: what happened, what it means for you", target: "Within 3 days", readers: "Levels 1 to 4", where: "/news/explainers/[slug]" },
  { kind: "Weekly roundup", whatItIs: "The week's releases, price changes and safety and policy news, plus what to watch next week. Also sent as the newsletter.", format: "One post a week", target: "A fixed weekday", readers: "All levels", where: "/news/weekly/[slug]" },
  { kind: "Changelog", whatItIs: "A dated list of every change to the site, including source conflicts we resolved.", format: "Dated list", target: "Every update", readers: "Trust page", where: "/news/changelog" },
  { kind: "EU AI Act timeline", whatItIs: "The dates that matter and a plain-English summary. Not legal advice.", format: "Dates table and summary", target: "When the official dates change", readers: "Level 4", where: "/news/eu-ai-act" },
];

export const WEEKLY_PARTS: readonly string[] = [
  "Summary of the week",
  "New models and releases",
  "Price and plan changes",
  "Safety, privacy and policy",
  "Next week",
  "One clearly labelled sponsor slot",
];

export const PRICE_NOTE_FIELDS: readonly PointEntry[] = [
  { headline: "What changed.", detail: "The provider and the plan, model or limit." },
  { headline: "Before and after.", detail: "The old and new figure, side by side." },
  { headline: "When it takes effect.", detail: "The date, so you can plan around it." },
  { headline: "Source and verified-on date.", detail: "The provider's own page, and the day we opened it." },
  { headline: "What it means.", detail: "How it may change your cost per task, with a link to the updated table." },
];

export const LABELS: readonly LabelEntry[] = [
  { label: "Verified on", meaning: "The date we checked the prices and facts on the provider's own page." },
  { label: "Tested on", meaning: "The date our own test run happened, with the model version and effort setting." },
  { label: "Vendor-reported", meaning: "The number comes from the maker's own announcement, so treat it with care." },
  { label: "Superseded", meaning: "The model or plan has been replaced. The page links to its successor and is not deleted." },
];

export const POST_TOP_PARTS: readonly string[] = [
  "Breadcrumbs and a level badge",
  "Title and author",
  "Verified-on and tested-on dates",
  "A short summary box",
];

export const POST_BOTTOM_PARTS: readonly string[] = [
  "A “What can go wrong” box",
  "A price disclaimer, where prices appear",
  "An affiliate disclosure, where there are affiliate links",
  "A source and label line",
  "Related articles",
  "A newsletter box",
];

export const SOURCE_STEPS: readonly PointEntry[] = [
  { headline: "1. The provider's own page.", detail: "Pricing, model or documentation pages, opened on the day." },
  { headline: "2. Independent evaluators.", detail: "Benchmark aggregators and human-preference arenas that publish their method." },
  { headline: "3. Our own tests.", detail: "With the date and settings recorded." },
  { headline: "4. Secondary blogs and roundups.", detail: "Leads only. Never the sole source of a number." },
];

export const READER_ROUTES: readonly ReaderRoute[] = [
  { reader: "New to AI and want to keep up", start: "The weekly roundup", why: "One calm post a week instead of daily noise.", href: "#weekly" },
  { reader: "Choosing or paying for a plan", start: "Price-change notes", why: "See what changed before you renew.", href: "#price-changes" },
  { reader: "Building with an API", start: "Coming up, and the retirements tracker", why: "A model ID in your code is a date on your calendar.", href: "#coming-up" },
  { reader: "Parent, teacher or small business owner", start: "Explainers", why: "Safety and privacy news in plain English, with the guide linked.", href: "#latest" },
  { reader: "Compliance, IT or legal lead", start: "The EU AI Act timeline", why: "The dates that matter. Not legal advice.", href: "#standing" },
  { reader: "Researcher or careful reader", start: "The changelog", why: "See what changed on the site and how source conflicts were settled.", href: "#standing" },
];

export const BEFORE_YOU_ACT: readonly PointEntry[] = [
  { headline: "Is there a date?", detail: "News goes stale quickly. Check when the facts were verified." },
  { headline: "Who says so?", detail: "Look for the label: our test, an independent source or the maker." },
  { headline: "Does it apply where you use it?", detail: "An app, a provider's API and a cloud platform can follow different rules and dates." },
  { headline: "Is there a newer entry?", detail: "Check the changelog and the latest price-change notes before you act." },
  { headline: "Does the provider's own page agree?", detail: "When in doubt, the provider's page wins. Tell us if it does not match." },
];

export const STANDING_PAGES: readonly StandingPage[] = [
  { href: "/news/changelog", title: "Changelog", detail: "Every update to the site, and how source conflicts were resolved." },
  { href: "/news/eu-ai-act", title: "EU AI Act timeline", detail: "Key dates and a plain-English summary. Not legal advice." },
  { href: "/prices/retirements", title: "Retirements tracker", detail: "Models and features being retired, by platform, with a model ID checker." },
  { href: "/about/corrections", title: "Corrections log", detail: "What we got wrong, when we fixed it and how to report an error." },
];

export const NEWSLETTER_BENEFITS: readonly string[] = [
  "The weekly roundup, in your inbox on the same fixed weekday",
  "New releases, price changes and safety and policy news, in one short read",
  "A look at next week's dates",
  "At most one clearly labelled sponsor slot",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "How often is the news section updated?", answer: "A roundup every week, a release post within 48 hours of a major model release, a price-change note within 24 hours of a confirmed change, and an explainer within 3 days of safety, privacy or policy news. These are our targets, not guarantees, and the published date on each item shows what actually happened." },
  { question: "Why is the latest posts list empty?", answer: "It fills as posts are published. We would rather show an empty list than invent news. Subscribe, or check back after the next weekly roundup." },
  { question: "Is this a live news feed?", answer: "No. The site is fully static and nothing is fetched live. Every post and figure is written by hand, dated and sourced, and the page changes only when we publish." },
  { question: "How do the “Coming up” dates work?", answer: "They come from our retirements tracker and from introductory-rate end dates in our price data. Day counts use today's date in your browser (UTC). Always confirm a date on the provider's own page before you act." },
  { question: "What is the difference between a price-change note and a release post?", answer: "A release post covers a new model. A price-change note covers a change to the price, plan or limit of something that already exists." },
  { question: "Do sponsors or affiliates influence what you cover?", answer: "No. Payment never changes a score or a verdict. Sponsor slots are labelled and kept apart from editorial content. See our independence page." },
  { question: "Can I get the weekly roundup by email?", answer: "Yes. The same roundup is sent as the newsletter. Use the subscribe box on this page." },
  { question: "I spotted a mistake. What should I do?", answer: "Tell us through the corrections page. We log what was wrong, when it was reported and when it was fixed." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Release post", meaning: "A short post on what changed in a new model and whether it matters to you." },
  { term: "Price-change note", meaning: "A short note on a change to a price, plan or limit." },
  { term: "Explainer", meaning: "A short plain-English post on safety, privacy or policy news." },
  { term: "Introductory rate", meaning: "A lower price offered for a limited time. It can change when the period ends." },
  { term: "Retirement", meaning: "The date a model or feature stops working, or the old name starts serving a different model." },
  { term: "Vendor-reported", meaning: "A number that comes from the maker's own announcement." },
  { term: "Superseded", meaning: "Replaced by a newer model or plan. Kept on the site with a link to the successor." },
  { term: "Changelog", meaning: "A dated list of changes made to the site." },
];

export const SOURCES: readonly SourceEntry[] = [
  { publisher: "Provider pages", title: "Pricing, model and documentation pages, opened on the day of publication", href: null, use: "First in our source hierarchy" },
  { publisher: "Our retirements tracker", title: "Models and features being retired", href: "/prices/retirements", use: "Source of the retirement dates in “Coming up”" },
  { publisher: "Our price data", title: "Introductory-rate end dates from the model directory snapshot", href: "/prices/api", use: "Source of the price dates in “Coming up”" },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/prices/plans", label: "Consumer plans", note: "US monthly prices, with a verified-on date" },
  { href: "/prices/api", label: "API prices and cost per task", note: "Price per million tokens" },
  { href: "/compare/models", label: "Model directory", note: "Prices, context and scores" },
  { href: "/learn/foundations/free-vs-paid-ai", label: "Free vs paid AI: what you actually get", note: "Level 1 guide" },
  { href: "/about/how-we-test", label: "How we test", note: "The seven-point scorecard" },
  { href: "/about/independence", label: "Independence and disclosure", note: "Payment never changes a score" },
];