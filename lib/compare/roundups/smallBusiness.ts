import type { BestForRoundup } from "../types";
import { DIRECTORY_LINK, HOW_WE_TEST_LINK } from "../links";

export const smallBusinessRoundup: BestForRoundup = {
  slug: "small-business",
  label: "Small business",
  level: "Levels 2-3",
  question: "Which model suits a small team with client data to protect?",
  description:
    "Models and plans ranked for everyday office work, with privacy settings and costs per seat.",
  metaTitle: "Best AI model for small business",
  metaDescription:
    "AI plans for small teams: business versus personal accounts, training defaults, admin controls, reported seat prices and a rollout checklist. Picks follow our checks.",
  quickAnswer:
    "We are not naming a pick yet. This choice depends on plan prices and privacy settings, which we check on each provider's own pages. What matters most is the account type, not the model. OpenAI states that it does not train on ChatGPT Business workspace data by default. Third-party coverage reports the same default for Claude Team and Google Workspace business plans. Free and personal accounts may train on your chats unless you opt out, so do not put client data in them.",
  whoItIsFor: [
    "Owners and managers of teams of 2 to 50 people.",
    "Freelancers who handle client documents.",
    "Anyone who must decide what staff may paste into an AI tool.",
  ],
  startingPointIds: [],
  startingPointsNote:
    "This ranking depends on plan prices and privacy settings, which we check on the provider's own pages first. No pick is shown yet.",
  modelRoleNotes: {},
  candidates: [
    {
      name: "ChatGPT Business",
      maker: "OpenAI",
      role: "Team workspace with admin and data controls",
      reportedFacts: [
        "OpenAI's help page says it won't train on a Business workspace's data, including when Codex is used (OpenAI help page).",
        "Each user has their own chat history. Data export is not available in a Business workspace (OpenAI help page).",
        "Reported price: about $20 per user per month on annual billing, about $25 monthly, minimum 2 users (third-party roundup, Jul 2026).",
      ],
      watchOut: "Apps and connectors are reported to be on by default in Business. Review them before rollout.",
    },
    {
      name: "Claude Team",
      maker: "Anthropic",
      role: "Team plan under commercial terms",
      reportedFacts: [
        "Third-party roundups report that commercial terms prohibit training on Team conversations.",
        "Reported price: about $25 per seat per month, about $20 on annual billing, minimum 5 seats (third-party roundup, Jul 2026).",
      ],
      watchOut: "Audit logs and some governance features are reported as Enterprise-only.",
    },
    {
      name: "Google Workspace with Gemini",
      maker: "Google",
      role: "AI inside Gmail, Docs and Sheets",
      reportedFacts: [
        "Third-party roundups report that business and enterprise Workspace plans commit not to train consumer models on your data.",
        "Reported entry price: about $18 per user per month and up (third-party roundup, Jul 2026).",
      ],
      watchOut: "Admins can restrict third-party apps that request Drive or Gmail access. Set that before staff connect tools.",
    },
  ],
  candidatesNote:
    "Reported terms and prices from OpenAI's help page and third-party roundups in 2026. Prices change. We have not tested these plans. Confirm each on the provider's pricing and privacy pages.",
  decisionGuide: [
    {
      situation: "Your team handles client data.",
      advice: "Use a business plan, not personal accounts. Business plans are reported to exclude your data from training by default.",
    },
    {
      situation: "Your team already lives in Google or Microsoft apps.",
      advice: "An assistant built into those apps keeps data in one place and may need fewer new approvals.",
    },
    {
      situation: "You need audit logs, single sign-on or custom retention.",
      advice: "Check the enterprise tier. Reports say these are often reserved for it.",
    },
    {
      situation: "Staff already use personal accounts.",
      advice: "Write a short rule on what may be pasted, and use admin controls to block unapproved apps where you can.",
    },
    {
      situation: "You sell to customers in the EU.",
      advice: "Read the EU AI Act timeline. Some duties depend on how you use AI.",
    },
  ],
  reportedFigures: [
    { subject: "ChatGPT Business", measure: "Training on workspace data", value: "Not used by default", label: "Vendor-reported", source: "OpenAI help page", asOf: "Oct 28, 2026" },
    { subject: "ChatGPT Business", measure: "Price per user per month", value: "About $20 annual, $25 monthly, minimum 2 users", label: "Third-party roundup", source: "Layer3 Labs", asOf: "Jul 5, 2026" },
    { subject: "Claude Team", measure: "Price per seat per month", value: "About $25 monthly, $20 annual, minimum 5 seats", label: "Third-party roundup", source: "Layer3 Labs", asOf: "Jul 5, 2026" },
    { subject: "Google Workspace with Gemini", measure: "Entry price per user per month", value: "About $18 and up", label: "Third-party roundup", source: "Layer3 Labs", asOf: "Jul 5, 2026" },
  ],
  glossary: [
    {
      term: "Training default",
      meaning: "Whether the provider may use your chats to improve its models unless you opt out.",
      caution: "It differs by plan. Personal plans may train unless you switch it off.",
    },
    {
      term: "Retention",
      meaning: "How long chats are kept. Some plans let admins set it.",
      caution: "No training does not mean no storage. Your chats still pass through the provider's servers.",
    },
    {
      term: "SSO and SCIM",
      meaning: "Single sign-on lets staff log in with a company account. SCIM adds and removes users automatically.",
      caution: "Reported as enterprise-tier features on some plans. Check before you rely on them.",
    },
    {
      term: "Connectors",
      meaning: "Links that let an AI read your files, email or calendar.",
      caution: "A connector gives the AI the same access as the person who set it up. Review each one.",
    },
  ],
  howWeWillRank: [
    "Whether chats are used for training, and how to switch that off.",
    "Cost per seat and cost per task for common office work.",
    "Admin controls, data location and retention.",
    "How easily staff can drift onto personal accounts.",
  ],
  selfTest: [
    { title: "List what you handle", detail: "Client names, contracts, health or financial details, staff records." },
    { title: "Draw the line", detail: "Write what may never be pasted into any AI, and what is fine on a business plan." },
    { title: "Read each provider's privacy page", detail: "Check training, retention, data location and admin controls." },
    { title: "Pilot with two or three people", detail: "Run real tasks for two weeks and note time saved and errors found." },
    { title: "Decide and review", detail: "Pick one plan, turn off connectors you do not need, and review costs monthly." },
  ],
  tips: [
    "Give staff a one-page rule they can follow.",
    "Turn on admin controls before you invite the whole team.",
    "Review seats monthly. Cancel unused ones.",
  ],
  commonMistakes: [
    "Letting staff use free personal accounts for client work.",
    "Turning on every connector by default.",
    "Choosing by model score when account type matters more for privacy.",
  ],
  keepInMind: [
    "Do not put client data into a tool until you have read its privacy terms.",
    "Rules such as the EU AI Act may apply to how you use AI at work.",
    "Prices and terms here are reported by third parties and change. Confirm on the provider's page.",
  ],
  faq: [
    { question: "Does a business plan make my data fully private?", answer: "It removes training by default, but your chats still pass through the provider's servers, and your own admins can see workspace activity depending on the plan." },
    { question: "Is the best model the best choice for a small team?", answer: "Not necessarily. Admin controls, privacy terms and where the AI lives in your apps often matter more than a few score points." },
    { question: "Can I just use a free plan carefully?", answer: "For non-sensitive work, perhaps. For client data, use a business plan or keep that data out of AI tools." },
    { question: "What should I check first?", answer: "Training default, retention, who can see chats, and whether connectors are on by default." },
  ],
  sources: [
    { name: "OpenAI: Managing data in ChatGPT Business", url: "https://help.openai.com/en/articles/8798634-managing-data-in-the-chatgpt-business-workspace", note: "Vendor help page. Source for the training default and export limits." },
    { name: "Layer3 Labs: AI subscription plans for business", url: "https://www.layer3labs.io/guides/ai-subscription-plans-for-business", note: "Third-party roundup updated Jul 5, 2026. Source for reported prices and plan names." },
  ],
  related: [
    { href: "/prices/privacy", label: "Privacy matrix" },
    { href: "/prices/plans", label: "Consumer plans" },
    { href: "/learn/foundations/never-share-with-ai-chatbot", label: "What you should never share with an AI chatbot" },
    { href: "/learn/expert/eu-ai-act-for-everyday-users", label: "The EU AI Act for small businesses" },
    HOW_WE_TEST_LINK,
    DIRECTORY_LINK,
  ],
};