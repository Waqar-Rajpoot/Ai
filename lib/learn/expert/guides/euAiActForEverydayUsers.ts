import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { EXPERT_SOURCES as SOURCES } from "../expertSources";

export const euAiActForEverydayUsers: GuideRecord = {
  slug: "eu-ai-act-for-everyday-users",
  number: 29,
  level: "expert",
  kind: "explainer",
  title: "The EU AI Act for everyday users and small businesses",
  metaDescription:
    "The EU AI Act in plain English: who it covers, the four risk levels, the dates that apply after the Digital Omnibus, and what small businesses should check.",
  cardSummary: "Who the AI Act covers, the risk levels, the current dates and what small teams should check.",
  summaryPoints: [
    "The AI Act is the European Union's law on AI. It sorts AI systems into four risk levels and puts most duties on the companies that build or use systems in a business setting.",
    "Several parts already apply: bans on certain practices and AI literacy since 2 February 2025, general-purpose model duties since 2 August 2025, and transparency rules from 2 August 2026.",
    "After the Digital Omnibus changes, the European Commission's timeline puts high-risk rules for listed uses at 2 December 2027 and for AI built into regulated products at 2 August 2028.",
    "This is a plain-English summary, not legal advice. Dates have changed before, so check the Commission's pages.",
  ],
  sections: [
    {
      id: "what-it-is",
      heading: "What the AI Act is and who it covers",
      paragraphs: [
        "The AI Act is an EU regulation on artificial intelligence. According to the European Commission's FAQ, it covers public and private actors inside and outside the EU who place an AI system or a general-purpose AI model on the EU market, or who put an AI system into service or use it in the EU.",
        "The Act divides the people involved into roles. Providers build or place systems on the market, for example the developer of a CV-screening tool. Deployers use them, for example a bank using that tool. General-purpose AI model providers have their own duties. Some activities are exempt, including pre-market research and development and systems used only for military, defence or national security purposes.",
        "The FAQ does not address people using AI purely for personal, non-professional reasons, so we do not claim anything about that case. Most of the practical impact for individuals is likely to be in what they see, such as notices that they are talking to an AI.",
      ],
      sourceIds: [SOURCES.euAiActFaq.id],
    },
    {
      id: "risk-levels",
      heading: "The four risk levels",
      paragraphs: [
        "The Commission describes four levels of risk. The level decides what rules apply.",
      ],
      table: {
        caption: "Risk levels in the AI Act, as the Commission describes them",
        columns: ["Level", "Examples the Commission gives", "What it means"],
        rows: [
          ["Unacceptable risk", "Social scoring, certain real-time remote biometric identification for law enforcement", "Banned practices"],
          ["High risk", "Systems that could seriously affect health, safety or fundamental rights, such as in recruitment or credit scoring", "Strict obligations before the system is placed on the market"],
          ["Transparency risk", "Chatbots and deepfakes", "People must be told they are dealing with AI, or AI-generated content must be labelled"],
          ["Minimal or no risk", "Most other uses", "No specific rules under the Act"],
        ],
      },
      sourceIds: [SOURCES.euAiActOverview.id],
    },
    {
      id: "dates",
      heading: "The dates that apply now",
      paragraphs: [
        "The Commission's AI Act Service Desk publishes a timeline that takes into account the amendments introduced by the Digital Omnibus on AI. The Commission's FAQ states that the Digital Omnibus entered into force on 27 July 2026 and extended the deadlines for high-risk rules. The table follows the timeline page as we read it on 27 October 2026. Dates have already moved once, so check the page before you plan around one.",
      ],
      table: {
        caption: "AI Act dates according to the Commission's timeline",
        columns: ["Date", "What applies"],
        rows: [
          ["1 August 2024", "The Act entered into force"],
          ["2 February 2025", "General provisions, including AI literacy, and the prohibitions"],
          ["2 August 2025", "Obligations for providers of general-purpose AI models. Governance bodies and national authorities set up"],
          ["2 August 2026", "Most rules apply and enforcement starts, including the Article 50 transparency rules"],
          ["2 December 2026", "New bans on AI systems that generate non-consensual sexual deepfakes and child sexual abuse material. A transition deadline for certain providers of synthetic-content systems that were already on the market before 2 August 2026"],
          ["2 August 2027", "Each Member State should have at least one AI regulatory sandbox"],
          ["2 December 2027", "Rules for high-risk systems in the listed areas, such as biometrics, education and employment"],
          ["2 August 2028", "Rules for high-risk AI built into regulated products, such as lifts and toys"],
        ],
      },
      sourceIds: [SOURCES.euAiActTimeline.id, SOURCES.euAiActFaq.id, SOURCES.euAiActOverview.id],
    },
    {
      id: "what-you-will-notice",
      heading: "What everyday users will notice",
      bullets: [
        "Chatbots: the Commission's FAQ says providers must design systems so that people are informed they are interacting with an AI system.",
        "AI-generated content: providers must mark generative AI outputs in a machine-readable way so they can be detected as artificially generated or manipulated.",
        "Deepfakes: deployers must visibly disclose content that is artificially generated or manipulated. This also covers AI-generated text published to inform the public on matters of public interest.",
        "Exceptions exist, and a code of practice on transparency is being drafted, so the details may change.",
      ],
      sourceIds: [SOURCES.euAiActFaq.id],
    },
    {
      id: "small-business",
      heading: "What a small business should check",
      paragraphs: [
        "Most small businesses will be deployers: they use AI tools that someone else built. The Act sets obligations for both providers and deployers, so using someone else's tool does not by itself take you outside it. The Commission's FAQ notes that provisions on AI literacy have applied since 2 February 2025 and links to a repository of examples, but it does not set out in detail what a deployer must do, so read the Commission's AI literacy pages for your situation.",
        "The Commission says the Act includes help for small and medium-sized enterprises: simplified compliance routes for certain burdensome obligations such as technical documentation, regulatory sandboxes, and a rule that for small and medium-sized enterprises the lower of the two possible penalty amounts applies in each category. It also lists support initiatives such as the AI Pact. The Commission's overview says simplified requirements are being extended to small mid-cap companies under the Digital Omnibus.",
      ],
      sourceIds: [SOURCES.euAiActFaq.id, SOURCES.euAiActOverview.id],
    },
    {
      id: "checklist",
      heading: "A checklist for a small team",
      steps: [
        {
          title: "List the AI tools you use",
          detail: "Include chatbots, writing and image tools, scheduling tools and anything built into software you already pay for.",
        },
        {
          title: "Check whether you serve people in the EU",
          detail: "The Act reaches businesses outside the EU when a system is used in the EU, so location alone does not settle it.",
        },
        {
          title: "Work out which uses could be high risk",
          detail: "Recruitment, credit decisions, education and other uses that affect people's rights are the ones the Commission highlights. Ask the tool's provider what they say about it.",
        },
        {
          title: "Check your disclosure and labelling",
          detail: "If you publish AI-generated images, video or audio, or run a chatbot, find out whether the transparency rules apply to you.",
        },
        {
          title: "Look at AI literacy",
          detail: "Decide who in your team uses AI at work and what they should know. Record any training you give.",
        },
        {
          title: "Keep a record and a review date",
          detail: "Write down what you checked and when. Review it at least when a date in the timeline passes.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "tool-inventory",
      title: "Build an inventory of your AI tools",
      whenToUse: "To start your AI Act check.",
      text: "Help me build a table of the AI tools my business uses. For each tool, I will give you its name and what we use it for: [list]. Add columns for: who the provider is, whether it makes decisions about people, whether it generates images, audio, video or text we publish, whether we serve customers in the EU, and a column for questions to ask the provider.",
    },
    {
      id: "provider-questions",
      title: "Questions to send a tool provider",
      whenToUse: "When you are unsure how the Act affects a tool you use.",
      text: "Write a short, polite email to the provider of [tool]. Ask whether they consider the tool to be in a high-risk or transparency category under the EU AI Act, what they provide to customers who use it (documentation, instructions, labelling), and where I can find their statement on compliance. Keep it under 150 words.",
    },
    {
      id: "plain-english",
      title: "Explain a passage in plain English",
      whenToUse: "When you are reading an official page and want a first pass.",
      text: "Explain the following passage from an official EU AI Act page in plain English, and list any terms I should look up. Say what the passage does not cover. I understand this is not legal advice. [paste passage]",
    },
  ],
  whatCanGoWrong: [
    "Planning around a date that has since moved. The high-risk dates changed under the Digital Omnibus, so check the Commission's timeline page.",
    "Assuming that because you are outside the EU the Act does not apply to you.",
    "Assuming that using someone else's tool means you have no duties as a deployer.",
    "Treating a summary like this one, or an AI's summary, as legal advice.",
    "Publishing AI-generated media without checking whether labelling rules apply.",
  ],
  limitsNote:
    "This is a plain-English summary of the European Commission's own pages as read on 27 October 2026, not legal advice. For decisions about compliance, ask a qualified lawyer.",
  showPriceNotice: false,
  sources: [SOURCES.euAiActTimeline, SOURCES.euAiActOverview, SOURCES.euAiActFaq],
  relatedSlugs: ["ai-scams-and-deepfakes", "never-share-with-ai-chatbot", "prompt-injection-and-agent-security", "is-ai-worth-paying-for"],
  relatedLinks: [LINKED_PAGES.euAiActTimeline, LINKED_PAGES.privacyMatrix, LINKED_PAGES.safetyChecklist, LINKED_PAGES.expertHub],
  lastReviewed: "2026-10-27",
  published: true,
};
