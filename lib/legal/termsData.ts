import { SITE_NAME } from "@/lib/about/aboutConstants";
import type { OperatorDetail, TermsClause, TermsHistoryEntry } from "./terms";
import { TERMS_EFFECTIVE_ON, TERMS_VERSION } from "./termsConstants";

/**
 * Who the terms are with. Values are null on purpose: only you know them.
 * Fill in the legal name and the country before launch.
 */
export const OPERATOR_DETAILS: readonly OperatorDetail[] = [
  { id: "site", label: "Site", value: SITE_NAME, required: true },
  { id: "operator", label: "Operated by (legal name)", value: null, required: true },
  { id: "country", label: "Based in (country)", value: null, required: true },
  { id: "contact", label: "How to reach us", value: "Through the contact page", required: true },
  { id: "version", label: "Version", value: TERMS_VERSION, required: true },
  { id: "effective", label: "In effect from", value: TERMS_EFFECTIVE_ON, required: true },
];

/**
 * The clauses, in reading order. Blueprint 5.1 sets the four core ones; the rest are standard supporting terms.
 * Wording is general and has NOT been reviewed by a lawyer. Clear `needsLegalReview` clause by clause once it has.
 */
export const TERMS_CLAUSES: readonly TermsClause[] = [
  {
    id: "using-the-site",
    title: "Using the site",
    group: "core",
    plain: "You may read the site and use its tools for your own learning, work and decisions. Please use it fairly and do not try to break it.",
    points: [
      "Reading, searching, using the free tools and subscribing to the newsletter are open to everyone, and no account is needed.",
      "You may print or save a page, a checklist or a cheat sheet for your own use.",
      "Do not scrape the site at a rate that slows it for others, try to get around its security, or misuse the newsletter form.",
      "Do not present our pages as your own, or suggest that we endorse you or your product.",
    ],
    full: [
      "You may use this site, including its pages, tools, checklists, cheat sheets and newsletter, for lawful purposes and for your own personal, educational or internal business use.",
      "You agree not to interfere with the site or its security, not to access it in a way that places an unreasonable load on it, and not to use automated means to copy it at scale without our written permission.",
      "You agree not to misrepresent the source of our content, or to imply that we sponsor, endorse or are affiliated with you or your products.",
      "You are responsible for how you use what you read here, and for keeping private information out of any third-party service you choose to use.",
    ],
    needsLegalReview: true,
  },
  {
    id: "not-advice",
    title: "Not professional or legal advice",
    group: "core",
    plain: "Everything here is general information. It is not legal, medical, financial, investment, tax or career advice, and it does not replace a qualified professional.",
    points: [
      "Our pages describe tools, prices, rules and risks in general terms and cannot know your situation.",
      "The EU AI Act and other rules are summarised in plain English. That is not legal advice.",
      "Checklists and tools are thinking aids, not guarantees of safety or compliance.",
      "AI tools can be wrong. Check anything that matters, and ask a professional for decisions about health, law, money or your job.",
    ],
    full: [
      "The content of this site is provided for general information only. It is not, and should not be treated as, legal, medical, financial, investment, tax, employment or other professional advice, and reading it does not create an adviser-client relationship.",
      "Descriptions of laws, regulations and standards are simplified summaries as of the dates shown on each page. They may be incomplete or out of date. You should obtain advice from a qualified professional about your own circumstances.",
      "Reviews, scores, comparisons and tool results reflect the method, dates and settings stated on each page. They are a starting point for your own decision, and not a recommendation that is right for every person or purpose.",
    ],
    needsLegalReview: true,
  },
  {
    id: "affiliate-sponsor",
    title: "Affiliate and sponsor notice",
    group: "core",
    plain: "Some links may pay us a commission, and some content may be sponsored. We always say so, and payment never changes a score or a verdict.",
    points: [
      "Pages with affiliate links carry a disclosure on the page.",
      "Display ads, when used, are clearly marked as advertising.",
      "A newsletter sponsor slot, and any sponsored content, is labelled and kept apart from editorial content.",
      "Affiliate or sponsor status is never a scoring input, and makers get no pre-publication access to reviews.",
    ],
    full: [
      "We may earn money from this site through affiliate links, display advertising, a labelled newsletter sponsor slot, labelled sponsored content, and sales of digital products and courses through an external checkout.",
      "Where a page contains affiliate links, we say so on that page. If you buy through such a link we may receive a commission, at no extra cost to you. Sponsored and advertising content is labelled as such and kept separate from editorial content.",
      "Payment, affiliate status and sponsorship do not change a score, a ranking or a verdict. Our independence page describes the rules in full.",
    ],
    needsLegalReview: true,
  },
  {
    id: "changes",
    title: "Changes to terms",
    group: "core",
    plain: "We may update these terms. The version and the date at the top of this page always show which one applies, and the history below lists what changed.",
    points: [
      "Every change gets a new version number, an effective date and a line in the history table.",
      "Using the site after a change takes effect means you accept the updated terms.",
      "If you disagree with a change, please stop using the site and tell us.",
    ],
    full: [
      "We may update these terms from time to time, for example when the site, our services or the law changes. The current version and its effective date are shown on this page, and earlier changes are listed in the version history.",
      "Changes apply from their effective date and do not apply to earlier use. If you continue to use the site after a change takes effect, you accept the updated terms.",
    ],
    needsLegalReview: true,
  },
  {
    id: "content-and-copyright",
    title: "Our content and copyright",
    group: "supporting",
    plain: "The pages, text, tables, tools and design are ours or used with permission. You may quote short extracts with a link back, but you may not republish whole pages.",
    points: [
      "Short quotations with credit and a link are welcome.",
      "Do not copy full articles, tables or tools to publish elsewhere without asking.",
      "Names, logos and screenshots of other companies belong to them.",
    ],
    full: [
      "Unless a page states otherwise, the content of this site, including its text, data tables, tools and design, is owned by us or our licensors and is protected by copyright and other laws. All rights are reserved except as set out here.",
      "You may quote short extracts for commentary, criticism, education or news reporting, provided you credit this site and link to the source page. You may not reproduce or republish substantial parts of the site without our written permission.",
    ],
    needsLegalReview: true,
  },
  {
    id: "tools-and-data",
    title: "Tools, checklists and your data",
    group: "supporting",
    plain: "Our free tools run in your browser on what you type. What you enter stays on your device, and what we collect is explained in the privacy policy.",
    points: [
      "Calculators, quizzes and checklists work on your own device and send nothing to us.",
      "Ticks and settings may be saved in your browser only, and clearing your browser data removes them.",
      "Do not type passwords, ID numbers, card details or client data into any tool, template or chat.",
    ],
    full: [
      "The tools on this site run in your web browser. Information you enter into them is processed on your device and is not sent to us. Some tools save your choices in your browser's local storage so they are there when you return.",
      "Our privacy policy explains what personal information we do collect, such as a newsletter email address and basic analytics, and how you can control it.",
    ],
    needsLegalReview: true,
  },
  {
    id: "links-and-names",
    title: "Other sites, products and names",
    group: "supporting",
    plain: "We link to providers and other sites, and we name AI models and products. We do not run those, we are not affiliated with them unless we say so, and their own terms apply to you.",
    points: [
      "A link is not an endorsement, and a site we link to can change or disappear.",
      "Product, model and company names belong to their owners.",
      "Prices, plans and terms on a provider's own page win over our summary.",
    ],
    full: [
      "This site links to third-party websites and services that we do not control. We are not responsible for their content, availability, prices or terms, and a link does not mean we endorse them.",
      "All product, model and company names are the property of their respective owners and are used here only to identify them. Unless we state otherwise, we are not affiliated with, sponsored by or endorsed by them.",
    ],
    needsLegalReview: true,
  },
  {
    id: "accuracy-availability",
    title: "Accuracy and availability",
    group: "supporting",
    plain: "We work hard to keep pages correct and dated, but prices, plans and rules change, and the site is provided as it is. Please confirm anything important on the provider's own page.",
    points: [
      "Each page shows when its facts were checked. After that date, they may have changed.",
      "Publishing times are targets, not promises.",
      "The site may be unavailable or change without notice.",
      "If you find an error, tell us and we will log the correction.",
    ],
    full: [
      "We aim to keep information accurate and up to date, and we show the date it was last checked. We do not guarantee that it is complete, current or error-free, and we are not obliged to update any page by a particular time.",
      "The site is provided on an “as is” and “as available” basis. We may change, suspend or remove any part of it at any time.",
    ],
    needsLegalReview: true,
  },
  {
    id: "liability",
    title: "Limits on our responsibility",
    group: "supporting",
    plain: "You use the site at your own risk. To the extent the law allows, we are not responsible for losses that come from relying on it. Nothing here limits rights that the law says cannot be limited.",
    points: [
      "Check important facts before you act, especially before you pay or share data.",
      "We are not liable for decisions you make from general information.",
      "Some countries do not allow certain limits, and those limits do not apply where the law forbids them.",
    ],
    full: [
      "To the fullest extent permitted by law, we exclude all warranties and are not liable for any loss or damage arising from your use of, or reliance on, this site or any third-party site or service linked from it.",
      "Nothing in these terms excludes or limits any liability that cannot be excluded or limited under applicable law, including liability for death or personal injury caused by negligence, or for fraud.",
    ],
    needsLegalReview: true,
  },
  {
    id: "governing-law",
    title: "Governing law",
    group: "supporting",
    plain: "The law that applies to these terms, and where disputes are heard, will be named here before launch.",
    points: [
      "The country and courts depend on where the operator is based, which is not published yet.",
      "Your rights as a consumer under the law where you live are not affected.",
    ],
    full: [
      "These terms are governed by the laws of the country named in the operator details above, and the courts of that country have jurisdiction, subject to any mandatory consumer rights you have where you live. This clause will be completed when the operator details are published.",
    ],
    needsLegalReview: true,
  },
  {
    id: "contact",
    title: "Contact",
    group: "supporting",
    plain: "Questions about these terms, or a report of misuse, go through the contact page.",
    points: [
      "General questions, error reports and press or partnership requests each have their own route.",
      "Please do not send passwords, ID numbers, card details or client data.",
    ],
    full: [
      "You can contact us about these terms through the contact page of this site. Please do not include sensitive personal information, passwords or payment details in your message.",
    ],
    needsLegalReview: false,
  },
];

/** Earlier versions of the terms, newest anywhere. Empty until the first version goes live. */
export const TERMS_HISTORY: readonly TermsHistoryEntry[] = [];