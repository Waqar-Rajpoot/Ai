import type { FaqEntry, GuideLink, StepEntry, TermEntry, TipEntry } from "@/lib/shared/contentTypes";

export interface PressAudience {
  id: string;
  title: string;
  points: readonly string[];
  links: readonly GuideLink[];
}

export const RESPONSE_NOTE =
  "We read every message. Error reports come first, because a wrong number can cost you money. We cannot promise a personal reply to every message.";

export const BEFORE_YOU_WRITE: readonly TipEntry[] = [
  { title: "Search the site", detail: "Your answer may already be in a guide, a review or the glossary.", link: { href: "/search", label: "Open search" } },
  { title: "Check the verified-on date", detail: "A price or fact with an old date may already be out of date. The provider's own page has the final word.", link: { href: "/prices", label: "Prices hub" } },
  { title: "See if it is already fixed", detail: "Known errors and their fixes are listed with the dates reported and fixed.", link: { href: "/about/corrections", label: "Corrections log" } },
  { title: "See what changed lately", detail: "The changelog lists every update, and notes where sources disagreed.", link: { href: "/news/changelog", label: "Changelog" } },
  { title: "Not sure which AI to pick?", detail: "Three questions give you a shortlist and the plans to compare.", link: { href: "/tools/which-ai-fits-me", label: "Which AI fits me?" } },
  { title: "Read the common questions", detail: "The answers below cover how this page works and what we can help with.", link: { href: "#faq", label: "Jump to the FAQ" } },
];

export const ERROR_REPORT_STEPS: readonly StepEntry[] = [
  { title: "Copy the page address", detail: "Use the address bar, so we go straight to the right page." },
  { title: "Quote what it says", detail: "Copy the exact figure or sentence. A screenshot or a paraphrase is harder to match." },
  { title: "Say what it should say", detail: "Give the correct figure or wording, and the plan, model or country it applies to." },
  { title: "Link the proof", detail: "The provider's own pricing, model or documentation page is our first choice of source." },
  { title: "Add the date you saw it", detail: "Prices change often. The date helps us tell an old figure from a current one." },
  { title: "Send it", detail: "We check the claim against the source, fix a confirmed error and log it." },
];

export const WHAT_HAPPENS_NEXT: readonly StepEntry[] = [
  { title: "We read it", detail: "Every message is read. Error reports are looked at first." },
  { title: "We check the source", detail: "For an error, we compare your report with the provider's own page, then with independent sources." },
  { title: "We fix and log it", detail: "A confirmed error is fixed and logged with the date reported, the date fixed and what changed." },
  { title: "We may reply", detail: "We reply where we can. If sources disagree, we note it in the changelog." },
];

export const PRESS_AUDIENCES: readonly PressAudience[] = [
  {
    id: "journalists",
    title: "Journalists and researchers",
    points: [
      "Ask about our method: the seven-point scorecard, the source hierarchy and the result labels.",
      "Ask which page a number comes from, and the date it was checked.",
      "Tell us your deadline so we can tell you what we can do in time.",
    ],
    links: [{ href: "/about/how-we-test", label: "How we test" }, { href: "/about/source-policy", label: "Source policy" }],
  },
  {
    id: "sponsors",
    title: "Sponsors and partners",
    points: [
      "The weekly newsletter has one labelled sponsor slot.",
      "Sponsored content is labelled Sponsored and kept apart from reviews.",
      "Payment never changes a score or verdict, and sponsors get no pre-publication access.",
    ],
    links: [{ href: "/sponsored", label: "Sponsored content" }, { href: "/newsletter", label: "Newsletter" }, { href: "/about/independence", label: "Independence and disclosure" }],
  },
  {
    id: "makers",
    title: "Model makers and providers",
    points: [
      "Makers get no pre-publication access to reviews.",
      "If we have a fact wrong about your model, use Report an error and link your own page. It is our first-choice source.",
      "Vendor-reported numbers are labelled as such and never share a column with independent ones.",
    ],
    links: [{ href: "/about/source-policy", label: "Source policy" }, { href: "/about/corrections", label: "Corrections log" }],
  },
];

export const CAN_HELP: readonly string[] = [
  "Explain how a page, a tool or our method works.",
  "Fix a wrong price, date, fact or link.",
  "Consider a topic or a head-to-head matchup you would like to see.",
  "Answer questions from the press and researchers about how we test.",
  "Explain our independence and disclosure rules.",
];

export const CANNOT_HELP: readonly string[] = [
  "Give personal medical, legal or financial advice. Our pages are general information.",
  "Pick a plan or model for you. Use the quiz and calculators, then test on your own tasks.",
  "Fix a problem with an AI product or your account. Contact that provider's own support.",
  "Review a model before it is public, or change a score for payment.",
];

export const NEVER_SEND: readonly TermEntry[] = [
  { term: "Passwords and access codes", meaning: "Email is not a safe place for a secret, and we never need one to answer you." },
  { term: "ID numbers", meaning: "Passport, tax, bank and national ID numbers can be misused if a message leaks." },
  { term: "Health and money details", meaning: "Diagnoses, balances and statements are not needed for any question we answer." },
  { term: "Client or customer data", meaning: "Someone trusted you with it. Describe the situation without the data." },
];

export const WHAT_CAN_GO_WRONG: readonly string[] = [
  "Nothing is sent from this page. It opens your email app or copies text, and your message reaches us only when you send it from there.",
  "Email is not a secure channel. Leave out anything sensitive.",
  "Some email apps cut off long messages. If yours does, use Copy message and paste it into your email.",
  "We cannot reply to every message, and we cannot give personal advice.",
  "Use only the address shown on this page. If a message that claims to be from this site asks for a password or a payment, do not reply.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Does this page send my message?", answer: "No. The site is fully static, so it has no server to receive a form. The page builds your message and opens it in your own email app. You send it from there." },
  { question: "What if I do not have an email app?", answer: "Use Copy message and paste it into your webmail. Copy address gives you the address on its own." },
  { question: "What is the fastest way to get a wrong price fixed?", answer: "Choose Report an error and include the page address and a link to the provider's own page. That lets us check it against the first-choice source." },
  { question: "Will you reply?", answer: "We read every message, and error reports come first. We cannot promise a personal reply to every message." },
  { question: "Can I pay to be reviewed, ranked or featured?", answer: "No. Payment never changes a score or verdict. Sponsorship exists, but it is labelled and kept apart from reviews. See the independence page." },
  { question: "Can you recommend a plan or model for me?", answer: "We cannot give personal advice. The Which AI fits me? quiz and the cost calculators help you narrow it down, and a short trial on your own tasks decides it." },
  { question: "I have a problem with my ChatGPT, Claude or Gemini account.", answer: "We do not run those products. Contact the provider's own support." },
  { question: "How do I ask to change my newsletter address?", answer: "Choose the privacy or newsletter request, include the address you signed up with, and say what you want. The privacy policy explains your choices." },
  { question: "Is it safe to email sensitive details?", answer: "No. Leave out passwords, ID numbers, health and money details and client data. We never need them." },
  { question: "Can I suggest a comparison?", answer: "Yes. Choose Suggest a topic or comparison, or request a matchup on the head-to-head hub." },
];

export const QUICK_LINKS: readonly GuideLink[] = [
  { href: "/about", label: "About us" },
  { href: "/about/corrections", label: "Corrections log" },
  { href: "/news/changelog", label: "Changelog" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of use" },
  { href: "/sitemap", label: "Sitemap" },
];