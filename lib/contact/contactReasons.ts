import type { GuideLink } from "@/lib/shared/contentTypes";

export type ContactReasonId = "general" | "error" | "suggest" | "press" | "privacy";

export type ContactFieldId =
  | "yourName"
  | "relatedPage"
  | "message"
  | "pageAddress"
  | "whatItSays"
  | "whatItShouldSay"
  | "sourceLink"
  | "dateSeen"
  | "suggestion"
  | "audience"
  | "organisation"
  | "deadline"
  | "signupAddress"
  | "extraNotes";

export type ContactValues = Partial<Record<ContactFieldId, string>>;

export interface ContactField {
  id: ContactFieldId;
  label: string;
  hint: string;
  required: boolean;
  multiline: boolean;
  type: "text" | "url" | "date";
}

export interface ContactReason {
  id: ContactReasonId;
  title: string;
  summary: string;
  subjectPrefix: string;
  /** Field whose value is added to the subject line, or null. */
  subjectFieldId: ContactFieldId | null;
  fieldIds: readonly ContactFieldId[];
  /** Shown on the page so readers know what to put in. */
  include: readonly string[];
  checkFirst: readonly GuideLink[];
}

export const CONTACT_FIELDS: Record<ContactFieldId, ContactField> = {
  yourName: { id: "yourName", label: "Your name", hint: "Optional. Used to sign your message.", required: false, multiline: false, type: "text" },
  relatedPage: { id: "relatedPage", label: "Page or tool", hint: "Which page or tool is this about? Leave it blank if it is about the site in general.", required: false, multiline: false, type: "text" },
  message: { id: "message", label: "Your message", hint: "Say what you were trying to do and what you need.", required: true, multiline: true, type: "text" },
  pageAddress: { id: "pageAddress", label: "Page address", hint: "Copy it from your browser's address bar.", required: true, multiline: false, type: "url" },
  whatItSays: { id: "whatItSays", label: "What it says now", hint: "Quote the figure or sentence exactly.", required: true, multiline: true, type: "text" },
  whatItShouldSay: { id: "whatItShouldSay", label: "What it should say", hint: "Give the correct figure or wording.", required: true, multiline: true, type: "text" },
  sourceLink: { id: "sourceLink", label: "Link to the source", hint: "Best is the provider's own page. A link lets us check quickly.", required: false, multiline: false, type: "url" },
  dateSeen: { id: "dateSeen", label: "Date you saw it", hint: "Prices change fast, so the date helps us tell old from current.", required: false, multiline: false, type: "date" },
  suggestion: { id: "suggestion", label: "What should we cover or test?", hint: "A guide, a model, or a head-to-head matchup.", required: true, multiline: true, type: "text" },
  audience: { id: "audience", label: "Who is it for?", hint: "For example students, a small business or developers.", required: false, multiline: false, type: "text" },
  organisation: { id: "organisation", label: "Your organisation", hint: "Publication, company, school or group.", required: true, multiline: false, type: "text" },
  deadline: { id: "deadline", label: "Deadline", hint: "Optional. When do you need a reply?", required: false, multiline: false, type: "text" },
  signupAddress: { id: "signupAddress", label: "Email address you signed up with", hint: "Only for newsletter requests, so we can find it.", required: false, multiline: false, type: "text" },
  extraNotes: { id: "extraNotes", label: "Anything else", hint: "Optional.", required: false, multiline: true, type: "text" },
};

export const CONTACT_REASONS: readonly ContactReason[] = [
  {
    id: "general",
    title: "A general question",
    summary: "About a page, a method, a tool, or how to use AI.",
    subjectPrefix: "Question",
    subjectFieldId: "relatedPage",
    fieldIds: ["relatedPage", "message", "yourName"],
    include: ["The page or tool you mean", "What you were trying to do", "What you expected and what happened"],
    checkFirst: [
      { href: "/search", label: "Search the site" },
      { href: "/learn/glossary", label: "Glossary" },
      { href: "/learn", label: "Learn hub" },
    ],
  },
  {
    id: "error",
    title: "Report an error",
    summary: "A wrong price, a stale date, a broken fact or a broken link.",
    subjectPrefix: "Error report",
    subjectFieldId: "pageAddress",
    fieldIds: ["pageAddress", "whatItSays", "whatItShouldSay", "sourceLink", "dateSeen", "extraNotes", "yourName"],
    include: ["The page address", "What it says now, and what it should say", "A link to the right figure, ideally on the provider's own page", "The date you saw it"],
    checkFirst: [
      { href: "/about/corrections", label: "Corrections log" },
      { href: "/news/changelog", label: "Changelog" },
    ],
  },
  {
    id: "suggest",
    title: "Suggest a topic or comparison",
    summary: "A guide you want, a model you want tested, or a matchup you want to see.",
    subjectPrefix: "Topic suggestion",
    subjectFieldId: "suggestion",
    fieldIds: ["suggestion", "audience", "extraNotes", "yourName"],
    include: ["What you want covered or tested", "Who it is for", "The question you are trying to answer"],
    checkFirst: [
      { href: "/compare/vs", label: "Head-to-head hub" },
      { href: "/learn", label: "Learn hub" },
    ],
  },
  {
    id: "press",
    title: "Press and partnerships",
    summary: "Journalists, researchers, organisations, sponsors and model makers.",
    subjectPrefix: "Press or partnership",
    subjectFieldId: "organisation",
    fieldIds: ["organisation", "deadline", "message", "yourName"],
    include: ["Your name and organisation", "What you need, and your deadline", "The page or data you mean"],
    checkFirst: [
      { href: "/about/independence", label: "Independence and disclosure" },
      { href: "/sponsored", label: "Sponsored content" },
      { href: "/about/how-we-test", label: "How we test" },
    ],
  },
  {
    id: "privacy",
    title: "A privacy or newsletter request",
    summary: "Questions about your data, or a request about your newsletter address.",
    subjectPrefix: "Privacy request",
    subjectFieldId: null,
    fieldIds: ["signupAddress", "message", "yourName"],
    include: ["What you want: a question answered, or a change to your newsletter address", "The address you signed up with", "Nothing sensitive: we never need passwords or ID numbers"],
    checkFirst: [
      { href: "/privacy-policy", label: "Privacy policy" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/terms", label: "Terms of use" },
    ],
  },
];