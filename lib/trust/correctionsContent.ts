import { ACKNOWLEDGE_WITHIN_BUSINESS_DAYS, FIX_TARGET_DAYS_HIGH, FIX_TARGET_DAYS_MINOR, FIX_TARGET_DAYS_STANDARD } from "./correctionsConstants";

/** Where "Report an error" leads. The Contact page has a section with this id (Blueprint 5.1). */
export const REPORT_ERROR_PATH = "/contact#report-an-error";

export interface PointEntry {
  lead: string;
  text: string;
}

export interface ReportStep {
  title: string;
  text: string;
}

export interface CorrectionKind {
  id: string;
  name: string;
  when: string;
  whatReadersSee: string;
  logged: string;
}

export interface CompareRow {
  term: string;
  meaning: string;
  example: string;
  where: string;
}

export interface FreshnessLabelEntry {
  label: string;
  meaning: string;
  ifItLooksWrong: string;
}

export interface ReaderPath {
  id: string;
  title: string;
  who: string;
  points: readonly string[];
  link: { href: string; label: string };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface RelatedLink {
  href: string;
  title: string;
  why: string;
}

export interface LogFieldEntry {
  column: string;
  meaning: string;
}

export const SHORT_ANSWER: readonly PointEntry[] = [
  { lead: "If you spot a mistake, tell us.", text: "Use the Contact page and choose Report an error. Send the page, what it says, what you think is right and a source. A template is below." },
  { lead: `We reply within ${ACKNOWLEDGE_WITHIN_BUSINESS_DAYS} business days.`, text: "Even if the reply is \"we need more detail\" or \"we checked and we disagree, and here is why\"." },
  { lead: "Fix times depend on how much harm a mistake could do.", text: `We aim for ${FIX_TARGET_DAYS_HIGH} day for errors that could cost money or harm, ${FIX_TARGET_DAYS_STANDARD} days for wrong facts and numbers, and ${FIX_TARGET_DAYS_MINOR} days for minor problems.` },
  { lead: "We say what we changed.", text: "Corrections that change a fact, number, label, score or recommendation get a dated note on the page and a row in the public log below." },
  { lead: "Nobody can pay to change a verdict.", text: "A company named on the site can report an error like anyone else, with evidence. Payment never changes a score or verdict." },
];

export const WHAT_COUNTS: readonly string[] = [
  "A number, date, price, limit or name that does not match its source",
  "A figure shown with the wrong label, such as vendor-reported presented as independent",
  "A model, plan or forecast shown as current after a newer one replaced it",
  "A claim that is not supported by the source we link",
  "A test result you cannot reproduce with the same prompt and settings",
  "A link that is broken or goes to the wrong place",
  "Wording that is confusing or likely to mislead",
  "A page that is hard or impossible to use with a screen reader, keyboard or phone",
];

export const WHAT_DOES_NOT_COUNT: readonly PointEntry[] = [
  { lead: "A price that changed after the verified-on date.", text: "That is an update, not a mistake, but please tell us anyway. Price and plan changes are updated within 24 hours of being found." },
  { lead: "A disagreement about a judgement.", text: "Whether a model is \"best\" for a job is a judgement based on our scorecard. We will read your view and explain ours, and we change a verdict only when evidence shows the scoring was wrong." },
  { lead: "Two sources that disagree.", text: "Forecasts and company figures often differ. We show both with labels and dates. If you find a newer release from either source, send it." },
  { lead: "A request for new coverage.", text: "Use the Contact page for suggestions. We treat them as topic ideas, not corrections." },
  { lead: "Personal data or legal requests.", text: "Say so on the Contact page. Those follow the privacy policy and terms, not this page." },
];

export const REPORT_STEPS: readonly ReportStep[] = [
  { title: "Find the exact claim", text: "Copy the sentence, number or table cell that looks wrong, and note the page address and the date you saw it." },
  { title: "Say what you think is right", text: "One short sentence is enough. If you are not sure, say so. A reasonable doubt is still worth reporting." },
  { title: "Give a source", text: "The best source is the provider's own page, opened on the day. Next best is an independent evaluator that publishes its method. Blogs and social posts are leads only, but send them if that is all you have." },
  { title: "Send it from the Contact page", text: "Choose Report an error and paste your details. You do not need an account." },
  { title: "Wait for our reply", text: `We reply within ${ACKNOWLEDGE_WITHIN_BUSINESS_DAYS} business days. We may ask a question, fix the page, or explain why we think it is right.` },
];

export const REPORT_TEMPLATE = [
  "Page: [address or title of the page]",
  "What it says now: [copy the exact sentence, number or cell]",
  "What I think is correct: [your version, or \"not sure\"]",
  "Source: [link to the provider's page or other evidence]",
  "Date I saw it: [today's date]",
  "How serious: [could cost money or cause harm / wrong fact / minor]",
  "Credit me: [yes, use this name / no, keep me anonymous]",
].join("\n");

export const PROCESS_STEPS: readonly ReportStep[] = [
  { title: "Received", text: "Your report is logged internally with the date it arrived. That is the \"date reported\" in the public log." },
  { title: "Acknowledged", text: `We reply within ${ACKNOWLEDGE_WITHIN_BUSINESS_DAYS} business days to confirm we have it and which severity we gave it.` },
  { title: "Checked at the source", text: "We open the provider's page or the original document, never a summary. If we cannot reproduce a test result, we re-run it with the same settings." },
  { title: "Fixed, or declined with reasons", text: "If you are right, we fix it. If we think the page is right, we tell you why and show the evidence." },
  { title: "Logged and closed", text: "Substantive fixes get a dated note on the page and a row in the log. We tell you when it is done." },
];

export const CORRECTION_KINDS: readonly CorrectionKind[] = [
  {
    id: "quiet-fix",
    name: "Quiet fix",
    when: "A typo, a broken link, a formatting problem or a clearer sentence where no fact changes.",
    whatReadersSee: "The corrected page, with no note.",
    logged: "Not logged individually.",
  },
  {
    id: "correction-note",
    name: "Correction note",
    when: "We changed a fact, number, date, label, score, verdict or recommendation.",
    whatReadersSee: "A dated note near the top of the page saying what was wrong and what changed.",
    logged: "Yes. One row in the log.",
  },
  {
    id: "superseded",
    name: "Superseded",
    when: "Nothing was wrong when we wrote it, but a model, plan or forecast has since been replaced.",
    whatReadersSee: "A Superseded label and a link to the newer page. The old page stays up.",
    logged: "In the changelog, not the corrections log.",
  },
  {
    id: "withdrawn",
    name: "Withdrawn",
    when: "A page cannot be fixed because its main claim was wrong or its source disappeared.",
    whatReadersSee: "The address stays live with a notice that explains why the page was withdrawn.",
    logged: "Yes. One row in the log.",
  },
];

export const CORRECTION_VS_UPDATE: readonly CompareRow[] = [
  { term: "Correction", meaning: "We were wrong at the time we published.", example: "A price copied from a blog that did not match the provider's page.", where: "Corrections log (this page)" },
  { term: "Update", meaning: "We were right, and then the world changed.", example: "A provider raised a plan's price after our verified-on date.", where: "Changelog" },
  { term: "Superseded", meaning: "The thing we described has been replaced by something newer.", example: "A model that has a successor.", where: "Label on the page, and the changelog" },
];

export const FRESHNESS_LABELS: readonly FreshnessLabelEntry[] = [
  { label: "Verified on", meaning: "The date we checked the prices and facts on the page.", ifItLooksWrong: "Check the provider's page. If it differs, report it." },
  { label: "Tested on", meaning: "The date of our own test run, with the model version and effort setting.", ifItLooksWrong: "Re-run with the same settings. If your result differs, send us the prompt and answer." },
  { label: "Vendor-reported", meaning: "The number comes from the maker's own announcement.", ifItLooksWrong: "We cannot check it ourselves, but we can check that we copied it correctly." },
  { label: "Superseded", meaning: "The model or plan has been replaced. The page links to its successor.", ifItLooksWrong: "If a successor exists and we have not marked it, report that." },
];

export const SPECIAL_CASES: readonly PointEntry[] = [
  { lead: "Prices, plans and limits.", text: "The provider's own page wins over our table and over any article. If they disagree, we correct ours. We treat this as high severity because it can cost readers money." },
  { lead: "Test results.", text: "Send the prompt, the settings and the answer you got. We re-run the test with the same model version and effort setting and publish the new run with its date." },
  { lead: "Forecasts and statistics.", text: "When sources disagree we show each with its label, source and date and do not blend them. If a source publishes a revised figure, we mark the old one Superseded." },
  { lead: "Text drafted with AI.", text: "Some pages are drafted with AI tools and then edited by a person. The Editorial standards page says which tools and what they did. A mistake from an AI draft is corrected and logged exactly like any other." },
  { lead: "Safety and privacy advice.", text: "Mistakes in pages such as the AI safety checklist or scams guide are high severity, because readers may act on them straight away." },
  { lead: "Companies we cover.", text: "A company named on the site can report an error the same way as anyone, and is held to the same standard of evidence. Companies get no pre-publication access and cannot change a score or verdict by paying." },
  { lead: "Accessibility problems.", text: "If part of a page cannot be read or used with a screen reader, keyboard or small screen, report it. We treat that as an error." },
  { lead: "When two sources conflict.", text: "We go to the provider's own page, use it, and leave a note in the changelog explaining the conflict." },
];

export const PROMISES: readonly PointEntry[] = [
  { lead: "We do not silently change facts.", text: "Anything that changes what a page claims gets a dated note and a log row." },
  { lead: "We do not delete embarrassing pages.", text: "We fix, supersede or withdraw with a notice, so links and readers are not left guessing." },
  { lead: "We tell you what we decided.", text: "You get a reply whether we agree or not." },
  { lead: "We protect reporters.", text: "We use your email only to reply to you. We name you only if you ask us to." },
  { lead: "We show our own record.", text: "The log shows how fast we fix things and how often we miss our own targets." },
];

export const LOG_FIELD_GUIDE: readonly LogFieldEntry[] = [
  { column: "Date reported", meaning: "The day we received the report, or found the error ourselves." },
  { column: "Date fixed", meaning: "The day the page was corrected. Blank while open or when we declined." },
  { column: "Page", meaning: "The page title and address that was corrected." },
  { column: "What was wrong", meaning: "What the page said, in plain words." },
  { column: "What changed", meaning: "What we did, or why we declined." },
  { column: "Severity", meaning: "High, Standard or Minor. It sets our fix target." },
  { column: "Found by", meaning: "A reader, our own review, or a company named on the site. Names are not published." },
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "found-mistake",
    title: "I found a mistake",
    who: "You are reading a page and something looks wrong",
    points: [
      "Copy the exact claim and the page address.",
      "Find the provider's own page, if it is a price, limit or feature.",
      "Fill in the template and send it from the Contact page.",
    ],
    link: { href: REPORT_ERROR_PATH, label: "Report an error" },
  },
  {
    id: "company",
    title: "I work for a company we cover",
    who: "You think a page about your product is wrong",
    points: [
      "Report it the same way as anyone, with a link to your own documentation or pricing page.",
      "We check the evidence, not who is asking.",
      "We do not share drafts before publication, and payment never changes a score or verdict.",
    ],
    link: { href: "/about/independence", label: "Read: independence and disclosure" },
  },
  {
    id: "trust-check",
    title: "I want to know if I can trust a page",
    who: "You are deciding whether to rely on a number or a recommendation",
    points: [
      "Look at the verified-on date and the label next to each number.",
      "Open the source we link, and check the log below for past mistakes.",
      "Read how we rank sources when they conflict.",
    ],
    link: { href: "/about/source-policy", label: "Read: source policy" },
  },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Do I need an account to report an error?", answer: "No. Use the Contact page and choose Report an error." },
  { question: "What if I am wrong?", answer: "Then we say so and show the evidence. A report that turns out to be mistaken is still welcome. It often shows where a page is confusing." },
  { question: "Will you credit me?", answer: "Only if you ask. Tell us the name to use. We do not publish names or email addresses otherwise." },
  { question: "How long until it is fixed?", answer: `We aim for ${FIX_TARGET_DAYS_HIGH} day for high severity, ${FIX_TARGET_DAYS_STANDARD} days for standard and ${FIX_TARGET_DAYS_MINOR} days for minor. The log shows how often we meet those targets.` },
  { question: "Do you change pages without saying so?", answer: "Only for typos, broken links and formatting, where no fact changes. Anything that changes a fact, number, label, score or recommendation gets a dated note and a log row." },
  { question: "Will you delete a page that is wrong?", answer: "No. We fix it, mark it Superseded, or withdraw it with a notice that explains why. The address stays live." },
  { question: "What is the difference between a correction and an update?", answer: "A correction means we were wrong when we published. An update means we were right and the world changed, for example a price rise. Updates go in the changelog." },
  { question: "Our table disagrees with the provider's page. Which is right?", answer: "The provider's page, opened on the day. Report the difference and we will fix ours within a day." },
  { question: "Can a company ask you to change a score?", answer: "It can report an error with evidence. It cannot change a score or verdict by paying or by asking. Payment never changes a score or verdict." },
  { question: "Does an empty log mean the site has no errors?", answer: "No. It means none have been reported and confirmed. Please report what you find." },
];

export const RELATED_LINKS: readonly RelatedLink[] = [
  { href: "/about/editorial-standards", title: "Editorial standards", why: "How pages are written, checked and when a review counts as stale." },
  { href: "/about/source-policy", title: "Source policy", why: "Which sources we trust first and how conflicts are resolved." },
  { href: "/about/how-we-test", title: "How we test", why: "The test battery and what the labels mean." },
  { href: "/about/independence", title: "Independence and disclosure", why: "Affiliate links, sponsors and the promise that payment never changes a verdict." },
  { href: "/news/changelog", title: "Changelog", why: "Updates and source conflicts, as distinct from corrections." },
];

export const POLICY_LIMITS: readonly string[] = [
  "Fix times are targets, not guarantees. The log shows where we missed them.",
  "We cannot verify claims that rest on private information. Send what you can show.",
  "We cannot correct other websites, even when they quote us.",
  "Some questions are judgement calls. We will explain our reasoning but may not change the page.",
];