import type {
  FaqEntry,
  GlossaryEntry,
  PointEntry,
  RelatedLink,
} from "@/lib/society/societyContentTypes";

export interface QuickAnswer {
  question: string;
  answer: string;
  clauseId: string;
}

export interface ResponsibilityRow {
  topic: string;
  you: string;
  us: string;
}

export const DRAFT_BANNER =
  "Draft: these terms have not been reviewed by a lawyer, and the operator details and effective date are not published yet. Treat this page as a working draft until this notice is gone.";

export const SUMMARY_POINTS: readonly PointEntry[] = [
  { headline: "Free to use, no account.", detail: "Read the pages, use the tools, print the checklists and subscribe if you like." },
  { headline: "General information only.", detail: "Nothing here is legal, medical, financial, investment or career advice." },
  { headline: "Money is disclosed.", detail: "Affiliate links, ads and sponsors are labelled, and payment never changes a score or a verdict." },
  { headline: "Terms can change, in the open.", detail: "Each version has a number, a date and a line in the history." },
];

export const QUICK_ANSWERS: readonly QuickAnswer[] = [
  { question: "Can I use the tools for work?", answer: "Yes, for your own or your team's internal use. Keep private and client data out of them.", clauseId: "using-the-site" },
  { question: "Can I print a checklist or cheat sheet?", answer: "Yes. Printing or saving a page for your own use is fine.", clauseId: "using-the-site" },
  { question: "Can I quote you?", answer: "Short quotations with credit and a link, yes. Republishing whole pages, no, without asking.", clauseId: "content-and-copyright" },
  { question: "Can I rely on a review to decide what to buy?", answer: "Use it as a starting point, then confirm prices and terms on the provider's page and test on your own tasks.", clauseId: "not-advice" },
  { question: "Do affiliate links change what you recommend?", answer: "No. They are always disclosed, and they are never a scoring input.", clauseId: "affiliate-sponsor" },
  { question: "What happens to what I type into a tool?", answer: "It stays in your browser. We do not receive it.", clauseId: "tools-and-data" },
  { question: "What if a page is wrong?", answer: "Tell us. We log the correction and the fix.", clauseId: "accuracy-availability" },
  { question: "What if the terms change?", answer: "The version and date at the top change, and the history table records it.", clauseId: "changes" },
];

export const RESPONSIBILITIES: readonly ResponsibilityRow[] = [
  { topic: "Accuracy", you: "Check facts and prices on the provider's page before you act.", us: "Date every page, cite sources and fix reported errors." },
  { topic: "Advice", you: "Ask a qualified professional about your own situation.", us: "Say plainly that the site is general information." },
  { topic: "Private data", you: "Keep passwords, IDs, card details and client data out of tools and chats.", us: "Run tools in your browser and explain what we do collect." },
  { topic: "Money", you: "Read the disclosure where a link or ad appears.", us: "Label affiliate links, ads and sponsors, and keep them out of scores." },
  { topic: "Use of the site", you: "Use it fairly and lawfully.", us: "Keep it open without an account." },
  { topic: "Changes", you: "Check the version and date if you rely on these terms.", us: "Version every change and keep a public history." },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Do I need an account?", answer: "No. The site has no accounts. If you subscribe to the newsletter, your address is handled by our email provider." },
  { question: "Is this a legal contract?", answer: "It sets out the terms on which you may use the site. It is a draft until a lawyer has reviewed it and the operator details are published." },
  { question: "Are your reviews advice?", answer: "No. They are general information with the method, dates and settings stated, and they should not be your only basis for a purchase or a decision." },
  { question: "Can a company pay for a better score?", answer: "No. Payment, affiliate status and sponsorship never change a score, a ranking or a verdict." },
  { question: "Can I copy a table or a tool?", answer: "Not to publish elsewhere without asking. Short quotations with credit and a link are welcome." },
  { question: "Where do I report misuse or an error?", answer: "On the contact page for misuse, and on the corrections page for a wrong figure or claim." },
  { question: "How will I know the terms changed?", answer: "The version and effective date at the top of this page change, and the history table lists the change." },
  { question: "Which law applies?", answer: "That will be named in the governing-law clause once the operator details are published. Your local consumer rights are not affected." },
];

export const GLOSSARY: readonly GlossaryEntry[] = [
  { term: "Terms of use", meaning: "The rules for using the site." },
  { term: "Operator", meaning: "The person or company that runs the site." },
  { term: "Affiliate link", meaning: "A link that may pay us a commission if you buy. It is always disclosed." },
  { term: "Sponsored content", meaning: "Content paid for by an advertiser. It is labelled and kept apart from editorial content." },
  { term: "Effective date", meaning: "The day a version of the terms starts to apply." },
  { term: "Governing law", meaning: "The country whose law decides how the terms are read." },
  { term: "As is", meaning: "Provided without a promise that it is complete, current or error-free." },
  { term: "Local storage", meaning: "A small space in your browser where a page can save your choices on your own device." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "This is a working draft. It has not been reviewed by a lawyer, and some clauses cannot be relied on until it has.",
  "The operator's legal name, country, governing law and effective date are not published yet.",
  "Laws on consumer rights, data and advertising differ by country, and some of these clauses may not apply where you live.",
  "Reading a summary is not a substitute for reading the full wording of a clause.",
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/privacy-policy", label: "Privacy policy", note: "What we collect and why" },
  { href: "/about/independence", label: "Independence and disclosure", note: "Affiliates, sponsors and the promise" },
  { href: "/about/corrections", label: "Corrections policy and log", note: "Report a wrong figure or claim" },
  { href: "/contact", label: "Contact", note: "Questions about these terms" },
  { href: "/about", label: "About us", note: "Who runs the site and how it is funded" },
  { href: "/sitemap", label: "Sitemap", note: "Every page in one list" },
];