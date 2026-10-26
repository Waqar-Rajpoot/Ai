export interface ReaderPath {
  id: string;
  title: string;
  who: string;
  points: readonly string[];
  link: { href: string; label: string };
}

export interface ScorePoint {
  point: string;
  detail: string;
}

export interface RevenueStream {
  stream: string;
  whatItIs: string;
  whereItAppears: string;
  label: string;
  neverDoes: string;
}

export interface StepEntry {
  title: string;
  detail: string;
}

export interface Relationship {
  name: string;
  kind: "affiliate" | "sponsor" | "maker-access";
  since: string;
  appearsOn: string;
  note: string;
}

export interface TermEntry {
  term: string;
  meaning: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface LinkEntry {
  title: string;
  href: string;
  note: string;
}

export const SHORT_ANSWER: readonly string[] = [
  "Payment never changes a score, a verdict or which source we use. That is the rule everything else on this page supports.",
  "We may earn money from affiliate links, one labelled sponsor slot in the newsletter, sponsored content, display ads once traffic is steady, and our own digital products and courses. Each is labelled where it appears.",
  "Scores come from our test battery and independent evaluators. Whether a model has an affiliate program, or whether its maker is a sponsor, is never an input.",
  "Sponsored content is labelled \"Sponsored\" and kept apart from reviews.",
  "Makers see no review before it is published, and an AI model that helps us draft is never used to review itself.",
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "money",
    title: "I want to know how this site makes money",
    who: "Any reader",
    points: [
      "See the table of every way money can reach the site, with its label and its limits.",
      "Check the current list of relationships at the end of this page.",
      "Look for the labels on each page: affiliate disclosure, Sponsored, Sponsor and Advertisement.",
      "Use the disclosure finder to see what a page of any type must show.",
    ],
    link: { href: "#revenue", label: "Jump to how we earn money" },
  },
  {
    id: "maker",
    title: "I represent a maker, advertiser or sponsor",
    who: "Labs, vendors, agencies and sponsors",
    points: [
      "You can buy a labelled placement. You cannot buy a review, a score or a verdict.",
      "You will not see a review before it is published.",
      "After publication you can send a factual correction, and we check it against your own page and our test log.",
      "We may decline a sponsor or a claim.",
    ],
    link: { href: "/contact", label: "Press and partnerships" },
  },
  {
    id: "trust",
    title: "I want to trust, cite or teach from this site",
    who: "Students, writers, teachers and analysts",
    points: [
      "Read the scoring firewall: what a score is built from, and what never touches it.",
      "Check each page's labels and source lines.",
      "Report an undisclosed link or a missing label. We treat it as an error and log it.",
      "Read the source policy for how numbers are chosen.",
    ],
    link: { href: "/about/source-policy", label: "Read the source policy" },
  },
];

export const SCORE_INPUTS: readonly ScorePoint[] = [
  { point: "Accuracy", detail: "Factual questions, with sources checked by hand." },
  { point: "Reasoning and maths", detail: "A fixed set of problems." },
  { point: "Writing and instruction following", detail: "Drafts with strict format limits." },
  { point: "Coding and tool use", detail: "A small repository task, with each model's recommended settings." },
  { point: "Long documents", detail: "A PDF summary and a question about a distant page." },
  { point: "Cost per task", detail: "What a task costs, not only the price per token." },
  { point: "Privacy and limits", detail: "Training settings, data retention and free-plan caps." },
];

export const NEVER_INPUTS: readonly string[] = [
  "Whether a model or plan has an affiliate program, or how much it pays.",
  "Whether a maker is a sponsor, an advertiser or a customer of ours.",
  "Any payment, gift or other consideration.",
  "How often readers click a model's links.",
  "Contact or relationships with a maker's staff.",
  "Whether we sell a product that competes with the one reviewed.",
];

export const REVENUE_STREAMS: readonly RevenueStream[] = [
  {
    stream: "Affiliate links",
    whatItIs: "A link that may earn us a commission if you buy through it.",
    whereItAppears: "Pages that recommend or compare products, such as reviews, best-for roundups, comparisons and plan tables.",
    label: "A short disclosure near the first affiliate link, the full disclosure at the end of the page, and rel=\"sponsored\" on the link.",
    neverDoes: "Change a score, a ranking or a verdict, or decide which models we cover.",
  },
  {
    stream: "Display ads",
    whatItIs: "Paid advertisements, added only once traffic is steady.",
    whereItAppears: "Pages with enough readers to support them.",
    label: "Marked \"Advertisement\".",
    neverDoes: "Pass for our content, or sit inside a summary box, scorecard, verdict or ranking.",
  },
  {
    stream: "Newsletter sponsor slot",
    whatItIs: "One paid placement in the weekly roundup and newsletter.",
    whereItAppears: "The weekly roundup page and the newsletter, set apart from the editorial content.",
    label: "Marked \"Sponsor\", and limited to one slot.",
    neverDoes: "Be presented as our recommendation, or change what the roundup says.",
  },
  {
    stream: "Sponsored content",
    whatItIs: "Content paid for by a sponsor.",
    whereItAppears: "Its own section, kept apart from reviews.",
    label: "Marked \"Sponsored\" at the top and in every listing.",
    neverDoes: "Appear in reviews, rankings or the model directory, or carry a score or verdict.",
  },
  {
    stream: "Our own digital products and courses",
    whatItIs: "Prompt packs, templates, checklists and, later, courses. Checkout is on an external page.",
    whereItAppears: "The shop and courses pages, and links from guides where they help.",
    label: "Marked as our own product.",
    neverDoes: "Be ranked against other products, or change a review.",
  },
];

export const AFFILIATE_WHERE: readonly string[] = [
  "Pages that recommend or compare products: reviews, best-for roundups, head-to-head comparisons and plan tables.",
  "Guides, only where a specific product is named.",
  "Never on a link that cites a source. Source links are plain, because they are evidence, not promotion.",
];

export const AFFILIATE_HOW: readonly string[] = [
  "A short disclosure sits near the first affiliate link, visible without scrolling or clicking.",
  "The full disclosure appears at the end of the page, in the standard page wrapper.",
  "Every affiliate link carries rel=\"sponsored\" in its code.",
  "The wording is the same everywhere. It lives in one place, so a page cannot drift from it.",
];

export const AFFILIATE_NEVER: readonly string[] = [
  "Affiliate status does not change a score, a ranking order or a verdict.",
  "Models and plans without an affiliate program are tested and covered in the same way.",
  "We do not hide that a link is affiliate, or disguise it as a source link.",
];

export const SPONSOR_SLOT_RULES: readonly string[] = [
  "There is one sponsor slot per issue, labelled \"Sponsor\".",
  "It is set apart from the editorial content, so it cannot be mistaken for a recommendation.",
  "A sponsor does not see or approve the roundup before it is published.",
  "The slot is a paid placement, not an endorsement.",
];

export const SPONSORED_CONTENT_RULES: readonly string[] = [
  "Sponsored content is labelled \"Sponsored\" at the top of the page and in every listing.",
  "It names the sponsor.",
  "It is kept apart from reviews: it never appears in a review, a ranking or the model directory.",
  "It carries no scores, verdicts or rankings.",
  "Payment buys a placement, not coverage. We can decline a sponsor or a claim.",
];

export const SPONSOR_CAN: readonly string[] = [
  "A clearly labelled placement.",
  "A link to its own site.",
  "Its own copy, marked as sponsored.",
];

export const SPONSOR_CANNOT: readonly string[] = [
  "Change a score, a verdict or a ranking.",
  "See or approve a review before it is published.",
  "Delay or remove a correction.",
  "Buy a review, or buy a different outcome in one.",
];

export const DRAFTING_RULES: readonly string[] = [
  "We use AI models to help draft some pages. Editorial standards names which models, what they did and how a person edited the result.",
  "A review of a model is not drafted by that model. Another tool, or a person, drafts it.",
  "Scores come from recorded tests, never from a model's description of itself or another model's opinion.",
  "An AI draft is never a source. Facts are checked against the source, as the source policy requires.",
  "A person edits every published page and is responsible for it.",
];

export const MAKER_ACCESS_RULES: readonly string[] = [
  "Makers and their agents do not see reviews, scores or verdicts before publication.",
  "We may agree when a page is published. We never agree what it says.",
  "After publication, a maker can send a factual correction. We check it against their own page and our test log, and record it in the corrections log.",
  "If a maker gives us free or early access, credits or hardware, the page says so, and it does not affect the score.",
  "We do not accept payment or any other consideration in exchange for a score, a verdict or a placement.",
];

export const OTHER_INTEREST_RULES: readonly string[] = [
  "If an author or editor works for, holds shares in or advises a company covered on a page, the page says so.",
  "Our own products are marked as ours and are never ranked against other products.",
  "If a relationship begins or ends, we update the list below and the changelog.",
];

export const PROCESS_STEPS: readonly StepEntry[] = [
  { title: "Test and score", detail: "Scores come from the test battery and are recorded with the date, model version and effort setting before any link is considered." },
  { title: "Write the verdict", detail: "The verdict follows the scores and the evidence. Nothing about money enters it." },
  { title: "Add links and slots", detail: "Affiliate links, ads and sponsor slots are placed afterwards, and only where the page type allows them." },
  { title: "Label", detail: "The required labels are added, using the shared wording on this page." },
  { title: "Log changes", detail: "Corrections, new relationships and label fixes go in the corrections log and the changelog." },
];

export const WONT_DO: readonly string[] = [
  "Sell scores, rankings or placement in a review.",
  "Take payment to soften, delay or remove a verdict.",
  "Let a maker or sponsor preview or approve a review.",
  "Hide that a link is an affiliate link.",
  "Style an ad or sponsored content to look like editorial content.",
  "Accept payment to delay a correction.",
  "Let a model draft its own review.",
  "Rank our own products against other people's.",
];

/**
 * Every affiliate program, sponsor and maker-provided access that is active now.
 * An empty list is a public statement that there are none. Keep it true.
 */
export const CURRENT_RELATIONSHIPS: readonly Relationship[] = [];

export const RELATIONSHIP_KIND_LABELS: Record<Relationship["kind"], string> = {
  affiliate: "Affiliate program",
  sponsor: "Sponsor",
  "maker-access": "Maker-provided access",
};

export const REGULATOR_LINKS: readonly LinkEntry[] = [
  {
    title: "US Federal Trade Commission: Endorsement Guides, what people are asking",
    href: "https://www.ftc.gov/tips-advice/business-center/guidance/ftcs-endorsement-guides-what-people-are-asking",
    note: "The regulator's own questions and answers on disclosing paid relationships.",
  },
];

export const GOTCHAS: readonly string[] = [
  "Independence is a promise we make and a process we follow. It is not a guarantee, so judge us by the evidence on each page.",
  "Disclosure rules differ by country. This page describes our policy and is not legal advice.",
  "Pages we link to are not ours. They may carry their own affiliate links or ads.",
  "A new affiliate program or sponsor can appear. The list below and the changelog show changes. Tell us if a label is missing.",
  "Honest reviewers can still be biased without knowing it. That is why scores come from tests with a published method.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "Do you earn money when I click a link?", answer: "Some links may earn a commission if you buy. Each page that has them says so near the first link and again at the end." },
  { question: "Does an affiliate link mean you recommend the product?", answer: "No. A model can be rated highly with no affiliate link, and one with a link can be rated poorly. Scores come from tests." },
  { question: "Do models without an affiliate program rank lower?", answer: "No. Affiliate status is never an input to a score or a ranking." },
  { question: "Can a company pay to be reviewed or to be reviewed well?", answer: "No. A sponsor can buy a labelled placement. It cannot buy a review, a score or a verdict." },
  { question: "Do makers see reviews before publication?", answer: "No. They can send a factual correction after publication, and we check it against their own page and our test log." },
  { question: "Is it a conflict that AI models help you draft pages?", answer: "It can be, so we set limits: a model never drafts a review of itself, scores come from recorded tests, an AI draft is never a source, and a person edits every page." },
  { question: "How do I know a page is sponsored?", answer: "It carries a \"Sponsored\" label at the top and in listings, and it sits apart from reviews." },
  { question: "Why are there ads on some pages?", answer: "Display ads are added only once traffic is steady. They are marked \"Advertisement\" and never sit inside a score, summary or verdict." },
  { question: "Will you change a review if a maker complains?", answer: "Only for a verified factual error. The change is recorded in the corrections log." },
  { question: "What should I do if I spot an undisclosed link?", answer: "Tell us on the corrections page. A missing or unclear label is treated as an error and fixed." },
];

export const GLOSSARY: readonly TermEntry[] = [
  { term: "Affiliate link", meaning: "A link that earns a commission for the site if you buy through it." },
  { term: "Commission", meaning: "A payment to the site for a sale it helped bring about." },
  { term: "Sponsor", meaning: "A company that pays for a labelled placement." },
  { term: "Sponsored content", meaning: "Content paid for by a sponsor and marked as such." },
  { term: "Display ad", meaning: "A paid advertisement shown on a page." },
  { term: "Editorial independence", meaning: "Editorial decisions are made without influence from payment." },
  { term: "Conflict of interest", meaning: "A situation where a financial or personal interest could affect a judgement." },
  { term: "Embargo", meaning: "An agreement on when a story may be published. We agree timing, never content." },
  { term: "Material connection", meaning: "A relationship, such as payment, that could affect how a reader weighs a recommendation." },
  { term: "Disclosure", meaning: "A plain statement of a paid or personal relationship." },
  { term: "Paid placement", meaning: "A position on a page or in an email that a company paid for." },
];

export const METHOD_NOTES: readonly string[] = [
  "This policy applies to every page. A page that departs from it says so.",
  "The wording of each label is kept in one shared place, so pages cannot drift from it.",
  "The disclosure finder applies the same rules the site uses, in a simplified form. It is a guide, not a ruling.",
  "Nothing you choose in the disclosure finder is sent or saved.",
  "Changes to this policy and to the list of relationships are recorded in the changelog.",
];

export const RELATED_LINKS: readonly LinkEntry[] = [
  { title: "About us", href: "/about", note: "Who runs the site and why." },
  { title: "Editorial standards", href: "/about/editorial-standards", note: "How pages are written, checked and drafted." },
  { title: "How we test", href: "/about/how-we-test", note: "The test battery and result labels." },
  { title: "Source policy", href: "/about/source-policy", note: "How we choose sources and resolve conflicts." },
  { title: "Corrections policy and log", href: "/about/corrections", note: "Report an error, including a missing label." },
  { title: "Sponsored content", href: "/sponsored", note: "Paid content, kept apart from reviews." },
  { title: "Newsletter", href: "/newsletter", note: "The weekly roundup and its sponsor slot." },
  { title: "Terms of use", href: "/terms", note: "Includes the affiliate and sponsor notice." },
  { title: "Contact", href: "/contact", note: "General questions, errors, press and partnerships." },
];