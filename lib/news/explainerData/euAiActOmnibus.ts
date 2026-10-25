import type { Explainer } from "../explainerTypes";

/** Policy explainer: the EU's Digital Omnibus on AI (Regulation (EU) 2026/1744). */
export const EU_AI_ACT_OMNIBUS: Explainer = {
  slug: "eu-ai-act-digital-omnibus-what-changed",
  title: "EU AI Act: what the Digital Omnibus delayed, and what already applies",
  description:
    "The EU pushed back its strictest AI rules to 2027 and 2028, but the duty to tell people they are talking to an AI already applies. Here is what moved, what did not, and what to do.",
  topic: "policy",
  levels: [1, 2, 3, 4],
  publishedIso: "2026-10-25",
  updatedIso: "2026-10-25",
  eventLabel: "In force Jul 27, 2026",
  quickTake: [
    "The EU delayed its strictest rules, for AI used in hiring, education and credit, from Aug 2, 2026 to Dec 2, 2027.",
    "Rules that tell people they are talking to an AI, and that label deepfakes, were not delayed. They apply now.",
    "Machine-readable marking of AI-generated content has a grace period to Dec 2, 2026, but only for systems already on the market before Aug 2, 2026.",
  ],
  whatHappened: [
    "On July 27, 2026, Regulation (EU) 2026/1744, known as the Digital Omnibus on AI, entered into force. It was signed on July 8. It changes when parts of the EU AI Act start to apply.",
    "It moved the duties for high-risk systems. Systems used for things like hiring, education, credit scoring, biometrics and critical infrastructure now face them from Dec 2, 2027 instead of Aug 2, 2026. High-risk AI built into regulated products, such as medical devices and machinery, moves to Aug 2, 2028.",
    "It did not change Article 50, the transparency article. Since Aug 2, 2026 the duties to disclose that someone is dealing with a chatbot, and to disclose deepfakes, have applied. The one change is a grace period: generative AI systems already on the market before Aug 2, 2026 have until Dec 2, 2026 to add machine-readable marking to what they generate. Systems placed on the market on or after Aug 2, 2026 get no grace period.",
    "Two new bans start on Dec 2, 2026: AI that creates non-consensual intimate images, and AI that creates child sexual abuse material.",
    "Some dates did not move. Banned practices have applied since Feb 2, 2025, and the rules for makers of general-purpose AI models since Aug 2, 2025.",
  ],
  whatChanged: [
    { aspect: "Hiring, education and credit systems (Annex III high-risk)", before: "Aug 2, 2026", now: "Dec 2, 2027" },
    { aspect: "AI built into regulated products (Annex I high-risk)", before: "Aug 2, 2027", now: "Aug 2, 2028" },
    { aspect: "Telling people they are talking to a chatbot, and disclosing deepfakes (Article 50)", before: "Aug 2, 2026", now: "Aug 2, 2026 (unchanged)" },
    { aspect: "Machine-readable marking of AI-generated content (Article 50(2))", before: "Aug 2, 2026", now: "Aug 2, 2026, or Dec 2, 2026 for generative systems already on the market" },
    { aspect: "Generating non-consensual intimate images or child abuse material", before: "No named ban", now: "Banned from Dec 2, 2026" },
  ],
  timeline: [
    { isoDate: "2025-02-02", label: "Feb 2, 2025", text: "Banned practices apply. The AI literacy duty for organisations that use AI also starts." },
    { isoDate: "2025-08-02", label: "Aug 2, 2025", text: "Rules for makers of general-purpose AI models apply." },
    { isoDate: "2026-07-27", label: "Jul 27, 2026", text: "The Digital Omnibus enters into force." },
    { isoDate: "2026-08-02", label: "Aug 2, 2026", text: "Transparency duties apply: chatbot disclosure, deepfake disclosure and content marking for new systems." },
    { isoDate: "2026-12-02", label: "Dec 2, 2026", text: "Marking grace period ends for generative systems already on the market. Two new bans apply." },
    { isoDate: "2027-08-02", label: "Aug 2, 2027", text: "National regulatory sandboxes must be running." },
    { isoDate: "2027-12-02", label: "Dec 2, 2027", text: "High-risk duties for hiring, education, credit and similar systems apply." },
    { isoDate: "2028-08-02", label: "Aug 2, 2028", text: "High-risk duties for AI built into regulated products apply." },
  ],
  impacts: [
    {
      level: 1,
      headline: "You will see more labels. You do not have to do anything.",
      points: [
        "The duties fall on companies that build or deploy AI, not on people chatting with it. Expect more \"you are talking to an AI\" notices and labels on AI images and video from services that reach the EU.",
        "A label helps, but a missing label proves nothing. Some systems have until Dec 2, 2026 to add marking, and not every service follows the rules.",
        "Treat an unlabelled image or clip as unknown, not as real. Our guide on AI scams and deepfakes shows what else to check.",
      ],
    },
    {
      level: 2,
      headline: "If you use AI at work in the EU, ask about training and labelling.",
      points: [
        "Organisations that use AI have had an AI literacy duty since Feb 2, 2025. Ask your employer what training exists for people who use AI tools.",
        "If you create realistic AI images, audio or video of real people for publication, disclose that they are AI-generated.",
        "Keep the labels or metadata that a tool adds to its output. Stripping them can put you on the wrong side of the transparency rules.",
      ],
    },
    {
      level: 3,
      headline: "If you build with APIs and automations, check what you are shipping.",
      points: [
        "If you put a chatbot in front of customers, make sure it tells people they are talking to an AI. Which legal role you hold depends on your set-up, so get advice if you are unsure.",
        "Check whether the image, audio or video tools you use add machine-readable marking, and plan for Dec 2, 2026.",
        "Hiring, education and credit tools are not yet in scope for the high-risk rules, but Dec 2, 2027 is the date to plan for.",
      ],
    },
    {
      level: 4,
      headline: "The runway moved for high-risk systems. It did not move for transparency.",
      points: [
        "Generative systems placed on the market on or after Aug 2, 2026 get no grace period for Article 50(2) marking. Systems already on the market have until Dec 2, 2026.",
        "Annex III high-risk duties apply from Dec 2, 2027 and Annex I from Aug 2, 2028. Use the extra time for conformity work rather than treating it as a pause.",
        "General-purpose model duties have applied since Aug 2, 2025. National sandboxes must be operational by Aug 2, 2027. This is a summary, not legal advice.",
      ],
    },
  ],
  actions: [
    { id: "treat-unlabelled-unknown", text: "Treat an unlabelled image, voice or video as unknown, not real.", level: 1 },
    { id: "ask-literacy", text: "Ask your employer what AI literacy training is offered to people who use AI tools.", level: 2 },
    { id: "label-realistic-media", text: "Label any realistic AI image, audio or video of a real person that you publish.", level: 2 },
    { id: "check-chatbot-disclosure", text: "Check that any chatbot you run for customers tells people it is an AI.", level: 3 },
    { id: "check-marking-tools", text: "Check whether your image and video tools add machine-readable marking before Dec 2, 2026.", level: 3 },
    { id: "calendar-high-risk", text: "Put Dec 2, 2027 and Aug 2, 2028 in your compliance calendar if you build hiring, education, credit or regulated-product AI.", level: 4 },
  ],
  misreadings: [
    { claim: "The EU AI Act was cancelled or postponed as a whole.", fact: "Only the high-risk dates moved. Banned practices, general-purpose model rules and the transparency duties kept their dates." },
    { claim: "Chatbot labelling does not start until 2027.", fact: "Article 50 was not changed. Disclosure duties for chatbots and deepfakes have applied since Aug 2, 2026." },
    { claim: "Dec 2, 2026 is the date all AI watermarking becomes mandatory.", fact: "It is a grace-period end for generative systems already on the market before Aug 2, 2026. Newer systems had no grace period." },
    { claim: "A missing AI label means the content is real.", fact: "Marking is incomplete and uneven. A label is a clue when present and says nothing when absent." },
  ],
  unknowns: [
    "We have not read the Official Journal text. The dates come from two secondary summaries that agree with each other.",
    "One of those pages has metadata that contradicts its own body on whether the Act was formally delayed. The body text matches the other summary.",
    "The AI literacy start date of Feb 2, 2025 is not given in either summary and needs confirming against the Act.",
    "This page covers EU dates only. National enforcement, penalties and rules outside the EU are not covered.",
  ],
  notice: "Not legal advice. Dates come from secondary summaries and should be checked against Regulation (EU) 2026/1744 in the Official Journal.",
  related: [
    { label: "The EU AI Act for everyday users and small businesses", href: "/learn/expert/eu-ai-act-for-everyday-users", description: "A plain-English guide to the duties and who they apply to.", level: 4 },
    { label: "EU AI Act timeline", href: "/news/eu-ai-act", description: "Every date in one table, kept up to date.", level: 4 },
    { label: "AI scams and deepfakes: how to spot them", href: "/learn/foundations/ai-scams-and-deepfakes", description: "What to check when a clip or message looks real but may not be.", level: 1 },
  ],
  faq: [
    { question: "Does this apply to me as an individual user?", answer: "The duties fall mainly on companies that build or deploy AI. As a user you will mostly see the effects, such as disclosures and labels." },
    { question: "Where is the official text?", answer: "Regulation (EU) 2026/1744 in the Official Journal of the European Union. Our EU AI Act timeline lists the dates and is updated as they are confirmed." },
    { question: "What about the US or other countries?", answer: "This explainer covers the EU only. We have not summarised rules elsewhere." },
    { question: "Is this legal advice?", answer: "No. If a deadline affects your business, check the official text or ask a lawyer." },
  ],
  sources: [
    { label: "EU AI Act Deal: Digital Omnibus Now in Force", publisher: "Usercentrics", url: "https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/", kind: "secondary" },
    { label: "Digital Omnibus Adopted: AI Act High-Risk Delayed to 2027", publisher: "AIACTO", url: "https://www.aiacto.eu/en/blog/digital-omnibus-ai-act-report-2027", kind: "secondary" },
  ],
};