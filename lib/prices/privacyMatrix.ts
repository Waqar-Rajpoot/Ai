import type { VerificationLevel } from "./apiCostTable";

export type Audience = "personal" | "work" | "api";
export type AudienceFilter = "all" | Audience;
export type PrivacyTopic = "training" | "retention" | "deletion" | "location";

/**
 * "trains-by-default": content can be used to improve models unless you opt out.
 * "your-choice": a setting decides, and you choose at sign-up or can change it.
 * "no-training": not used for training by default.
 * "unclear": sources conflict or do not say.
 */
export type TrainingLevel = "trains-by-default" | "your-choice" | "no-training" | "unclear";

export interface SourceLink {
  label: string;
  href: string;
}

export interface PrivacyRow {
  id: string;
  name: string;
  maker: string;
  audience: Audience;
  /** Plans or products the row covers. */
  plans: string;
  training: { level: TrainingLevel; summary: string };
  retention: string;
  deletion: string;
  location: string;
  /** Ordered steps to stop training or sharing. Empty when there is no switch to flip. */
  turnOffSteps: readonly string[];
  turnOffNote: string;
  /** Direct link to the settings page, when one exists. */
  settingsUrl: string | null;
  watchFor: readonly string[];
  /** "provider" means every key claim was read on the provider's own pages. */
  verification: VerificationLevel;
  sources: readonly SourceLink[];
}

export const AUDIENCE_LABELS: Record<Audience, string> = {
  personal: "Personal apps",
  work: "Work plans",
  api: "Developer APIs",
};

export const TOPIC_LABELS: Record<PrivacyTopic, string> = {
  training: "Training",
  retention: "Retention",
  deletion: "Deletion",
  location: "Data location",
};

export const TRAINING_LABELS: Record<TrainingLevel, string> = {
  "trains-by-default": "Trains by default",
  "your-choice": "Your choice",
  "no-training": "No training by default",
  unclear: "Unclear",
};

const NO_LOCATION_CHOICE = "No data-region choice is published on the pages we checked.";

export const PRIVACY_ROWS: readonly PrivacyRow[] = [
  {
    id: "chatgpt-personal",
    name: "ChatGPT personal plans",
    maker: "OpenAI",
    audience: "personal",
    plans: "Free, Go, Plus and Pro",
    training: {
      level: "trains-by-default",
      summary:
        "Chats can be used to improve OpenAI models unless you turn off \"Improve the model for everyone\". The switch covers new conversations only and does not delete or hide saved chats.",
    },
    retention:
      "Regular and archived chats stay until you delete them. Temporary Chats do not appear in your history, but OpenAI may keep a copy for up to 30 days for safety.",
    deletion:
      "A deleted chat leaves your account at once and is scheduled for permanent deletion within 30 days, unless it was already de-identified or must be kept for legal or security reasons. Files saved to your Library are separate, so delete them too.",
    location: NO_LOCATION_CHOICE,
    turnOffSteps: [
      "Open Settings and choose Data controls.",
      "Turn off \"Improve the model for everyone\", then select Done.",
      "For one-off sensitive questions, start a Temporary Chat.",
      "Optional: open the ads controls and turn off ad personalization (Free and Go tiers).",
    ],
    turnOffNote: "Memory and training are separate settings. Check both.",
    settingsUrl: null,
    watchFor: [
      "OpenAI says some retention can be affected by legal developments, so deletion windows are not a guarantee.",
      "Ads: OpenAI says advertisers cannot see your chats. With personalization off you still see ads based on the current chat. Temporary Chats show no ads.",
      "Saving a Temporary Chat turns it into a regular chat with regular retention.",
    ],
    verification: "provider",
    sources: [
      { label: "OpenAI: Data controls in ChatGPT", href: "https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" },
      { label: "OpenAI: Chat and file retention", href: "https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt" },
      { label: "OpenAI: Ads in ChatGPT", href: "https://help.openai.com/en/articles/20001047-ads-in-chatgpt" },
    ],
  },
  {
    id: "chatgpt-business",
    name: "ChatGPT Business, Enterprise and Edu",
    maker: "OpenAI",
    audience: "work",
    plans: "Business (Team), Enterprise, Edu",
    training: {
      level: "no-training",
      summary: "OpenAI says it does not train on business-product data by default.",
    },
    retention:
      "Chats stay until deleted or until a workspace retention policy removes them. Files uploaded to a conversation expire on their own schedule.",
    deletion:
      "The same 30-day deletion schedule applies to deleted chats. Backups of files can keep a copy for up to 30 more days.",
    location: "Data residency and configurable retention are offered on some plans. Ask OpenAI which regions apply to yours.",
    turnOffSteps: [],
    turnOffNote: "Nothing to switch off. Your workspace admin controls retention and which legacy models appear.",
    settingsUrl: null,
    watchFor: [
      "Workspace admins and compliance tools can access workspace content. It is your employer's data, not private to you.",
      "Do not move personal chats into a work account, or work files into a personal one.",
    ],
    verification: "secondary",
    sources: [
      { label: "OpenAI: Chat and file retention", href: "https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt" },
      { label: "Softkraft: OpenAI data security (secondary)", href: "https://www.softkraft.co/openai-data-security/" },
    ],
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    maker: "OpenAI",
    audience: "api",
    plans: "API platform",
    training: {
      level: "no-training",
      summary: "API data is not used to train OpenAI models unless you explicitly opt in.",
    },
    retention:
      "Abuse-monitoring logs, which can include prompts and responses, are kept up to 30 days by default. Some stateful features keep data until you delete it. Zero data retention or modified abuse monitoring is available by approval.",
    deletion:
      "Stored objects such as threads and vector stores are removed about 30 days after you delete them.",
    location:
      "Data residency is set per project. Regions outside the US need approval for abuse-monitoring controls and a modified retention amendment.",
    turnOffSteps: [],
    turnOffNote: "Nothing to turn off, because sharing is opt-in. Apply for zero data retention if you cannot accept 30-day logs.",
    settingsUrl: null,
    watchFor: [
      "The ChatGPT consumer privacy policy does not cover API content, so read the API terms and your agreement instead.",
      "Retention differs by endpoint. Check the page for each feature you use.",
    ],
    verification: "secondary",
    sources: [
      { label: "Developers Digest: OpenAI data retention (secondary)", href: "https://www.developersdigest.tech/models/data-retention/openai" },
      { label: "Softkraft: OpenAI data security (secondary)", href: "https://www.softkraft.co/openai-data-security/" },
    ],
  },
  {
    id: "claude-consumer",
    name: "Claude consumer plans",
    maker: "Anthropic",
    audience: "personal",
    plans: "Free, Pro and Max (including Claude Code on those accounts)",
    training: {
      level: "your-choice",
      summary:
        "Anthropic trains new models on these accounts when the \"Help improve Claude\" setting is on. New users choose at sign-up. Check yours: a 2025 policy change moved existing users to opt-out.",
    },
    retention:
      "30 days if you do not allow training. If you allow it, new or resumed chats can be kept in de-identified form for up to 5 years in training pipelines. Feedback you send is kept for 5 years. Incognito chats are not used for training.",
    deletion:
      "A deleted chat leaves your history at once and is deleted from back-end storage within 30 days. It will not be used in future training, but data already in training runs or trained models stays.",
    location: NO_LOCATION_CHOICE,
    turnOffSteps: [
      "Open your name menu, then Settings, then Privacy.",
      "Under \"Help improve Claude\", switch the toggle off.",
      "On mobile, open Privacy and switch the same toggle off.",
      "Optional: switch off \"Location metadata\" in the same Privacy page.",
      "For one-off sensitive chats, use Incognito.",
    ],
    turnOffNote: "Opting out stops future training use of new and past chats, but not runs already in progress or models already trained.",
    settingsUrl: "https://claude.ai/settings/data-privacy-controls",
    watchFor: [
      "Thumbs up or down and bug reports keep the related data for 5 years.",
      "One guide notes that opting out does not exempt flagged content from safety review.",
    ],
    verification: "provider",
    sources: [
      { label: "Anthropic: How long do you store my data?", href: "https://privacy.claude.com/en/articles/10023548" },
      { label: "Anthropic: Change model improvement settings", href: "https://privacy.claude.com/en/articles/12109829" },
      { label: "Fast Company: AI privacy cheat sheet (secondary)", href: "https://www.fastcompany.com/91379336" },
    ],
  },
  {
    id: "claude-work",
    name: "Claude for Work",
    maker: "Anthropic",
    audience: "work",
    plans: "Team and Enterprise",
    training: {
      level: "no-training",
      summary: "Commercial plans are not used to train Claude models.",
    },
    retention:
      "Chats and coding sessions are kept in the product so you can continue them. Feedback data is kept for 5 years. Where a contract allows, Anthropic may anonymize data for research and keep that longer.",
    deletion:
      "Deleted chats leave history at once and are deleted from back-end storage within 30 days.",
    location: "No region choice is published on the pages we checked. Enterprise contracts may differ.",
    turnOffSteps: [],
    turnOffNote: "Nothing to switch off. Ask your admin about retention and exports.",
    settingsUrl: null,
    watchFor: [
      "Admins control workspace data. Treat work chats as your employer's records.",
    ],
    verification: "secondary",
    sources: [
      { label: "Anthropic: How long do you store my organization's data?", href: "https://privacy.claude.com/en/articles/7996866" },
      { label: "DeleteMe: Claude privacy settings guide (secondary)", href: "https://joindeleteme.com/ai-privacy-settings/claude-privacy-settings-guide/" },
    ],
  },
  {
    id: "anthropic-api",
    name: "Anthropic API",
    maker: "Anthropic",
    audience: "api",
    plans: "Claude API and Console",
    training: {
      level: "no-training",
      summary: "API data is not used to train Claude models by default.",
    },
    retention:
      "Inputs and outputs are deleted from Anthropic's back end within 30 days, unless you agreed otherwise (for example zero data retention), Anthropic must keep them to enforce its usage policy, or the law requires it. Some features, such as the Files API, have their own rules.",
    deletion: "Automatic after 30 days under the standard terms. Feedback you submit is kept for 5 years.",
    location: NO_LOCATION_CHOICE,
    turnOffSteps: [],
    turnOffNote: "Nothing to turn off. Ask about zero data retention if you need it.",
    settingsUrl: null,
    watchFor: [
      "One tracker reports that the newest top-tier models, including Claude Fable 5.1, require 30-day retention and are not available under zero data retention unless Anthropic authorizes it. Confirm before you plan around ZDR.",
      "Cloud partners such as Bedrock and Vertex set their own terms.",
    ],
    verification: "provider",
    sources: [
      { label: "Anthropic: How long do you store my organization's data?", href: "https://privacy.claude.com/en/articles/7996866" },
      { label: "Deepak Gupta: model sunsets and data terms (secondary)", href: "https://guptadeepak.com/ai-model-sunsets-new-patch-tuesday/" },
    ],
  },
  {
    id: "gemini-app",
    name: "Gemini app (personal Google account)",
    maker: "Google",
    audience: "personal",
    plans: "Free, Google AI Plus, Pro and Ultra",
    training: {
      level: "trains-by-default",
      summary:
        "With Keep Activity on, which is the default for adults, your activity helps improve Google services including its AI models. A subset of chats can be read by human reviewers.",
    },
    retention:
      "With Keep Activity on, activity older than 18 months is auto-deleted by default (you can pick 3 or 36 months, or off). With it off, chats are still saved for up to 72 hours to run the service and handle feedback.",
    deletion:
      "Delete by day, range or all time in Gemini Apps Activity. Chats already selected for human review are not deleted with it and can be kept up to 3 years, disconnected from your account.",
    location: NO_LOCATION_CHOICE,
    turnOffSteps: [
      "Open Gemini Apps Activity (My Activity) and sign in.",
      "Choose Turn off, or Turn off and delete activity.",
      "Optional: shorten auto-delete to 3 months.",
      "Open the Apps page and switch off Gemini's access to services you do not want it to use.",
    ],
    turnOffNote: "Work or school accounts cannot manage this activity setting. Their admin decides.",
    settingsUrl: "https://myactivity.google.com",
    watchFor: [
      "Turning activity off does not delete your history. Use Turn off and delete activity, or delete it separately.",
      "The 72-hour copy and human-review exception both survive the off switch.",
    ],
    verification: "secondary",
    sources: [
      { label: "Google: Manage Gemini Apps activity", href: "https://support.google.com/gemini/answer/13278892" },
      { label: "Which?: Gemini is accessing your data (secondary)", href: "https://www.which.co.uk/news/article/google-gemini-is-accessing-your-data-how-to-disable-it-abbZE6X0pNJA" },
      { label: "Terms.Law: Gemini privacy watchdog (secondary)", href: "https://www.terms.law/Privacy-Watchdog/ai-services/gemini/" },
    ],
  },
  {
    id: "gemini-api-paid",
    name: "Gemini API (paid services)",
    maker: "Google",
    audience: "api",
    plans: "Paid quota in the Gemini API and Google AI Studio",
    training: {
      level: "no-training",
      summary: "Google says paid-service prompts and responses are not used to improve its products.",
    },
    retention:
      "Prompts and responses are logged for abuse detection and legal disclosures, and kept for about 55 days. The logs are not used for model training.",
    deletion: "Abuse logs expire on their own after the retention period. We found no user-facing delete option or zero-retention program.",
    location: NO_LOCATION_CHOICE,
    turnOffSteps: [],
    turnOffNote: "Nothing to turn off on the paid tier. The risk is accidentally staying on the free tier.",
    settingsUrl: null,
    watchFor: [
      "The abuse-log window comes from Google's 2024 notice and a tracker. Confirm the current figure in Google's terms.",
    ],
    verification: "secondary",
    sources: [
      { label: "Gemini API Additional Terms of Service", href: "https://ai.google.dev/gemini-api/terms" },
      { label: "Simon Willison: Gemini terms preview (secondary)", href: "https://simonwillison.net/2024/Nov/19/preview-gemini/" },
      { label: "Developers Digest: Google data retention (secondary)", href: "https://www.developersdigest.tech/models/data-retention/google" },
    ],
  },
  {
    id: "gemini-api-unpaid",
    name: "Gemini API free tier and AI Studio free use",
    maker: "Google",
    audience: "api",
    plans: "Unpaid quota in the Gemini API and Google AI Studio",
    training: {
      level: "trains-by-default",
      summary:
        "Google uses what you submit and the responses to provide, improve and develop its products, and human reviewers may read them.",
    },
    retention: "No fixed window is stated on the terms page we read.",
    deletion: "No user-facing delete option found.",
    location: NO_LOCATION_CHOICE,
    turnOffSteps: [
      "There is no training opt-out on free usage.",
      "To keep prompts out of product improvement, use paid services by enabling billing for your project.",
      "Never send personal, client or confidential data through the free tier.",
    ],
    turnOffNote: "The only switch is moving to paid services.",
    settingsUrl: null,
    watchFor: [
      "Free access is not private access: this is the clearest case of paying with your data.",
    ],
    verification: "provider",
    sources: [
      { label: "Gemini API Additional Terms of Service", href: "https://ai.google.dev/gemini-api/terms" },
    ],
  },
  {
    id: "grok-consumer",
    name: "Grok (grok.com, apps and Grok on X)",
    maker: "xAI",
    audience: "personal",
    plans: "Free and paid consumer plans",
    training: {
      level: "trains-by-default",
      summary:
        "Conversations can be used to train and fine-tune Grok unless you opt out. The opt-out applies to future conversations only. Private Chat is excluded from training.",
    },
    retention:
      "Saved conversations stay until you delete them. Private Chats and deleted conversations are removed within 30 days, unless kept for security or legal reasons.",
    deletion:
      "Delete one chat or your whole history. xAI says removal takes up to 30 days. Deleting your history is not needed to opt out of training.",
    location: NO_LOCATION_CHOICE,
    turnOffSteps: [
      "On X: open Settings and privacy, then Privacy and safety, then Grok & Third-party Collaborators.",
      "Untick the option that allows your interactions, inputs and results to be used for training and fine-tuning.",
      "On grok.com or the app: turn off \"Improve the Model\" in settings.",
      "Use Private Chat for anything sensitive. Do not use the thumbs up or down buttons.",
    ],
    turnOffNote: "X says feedback buttons let it use that conversation for training even after you opt out.",
    settingsUrl: null,
    watchFor: [
      "Rules differ between Grok on X and the standalone Grok apps. Check the one you use.",
      "xAI asks users not to share personal or confidential information with Grok.",
    ],
    verification: "secondary",
    sources: [
      { label: "X Help: About Grok", href: "https://help.x.com/en/using-x/about-grok" },
      { label: "Private Internet Access: Is Grok safe? (secondary)", href: "https://www.privateinternetaccess.com/blog/is-grok-safe/" },
      { label: "Redact: Stop Grok training (secondary)", href: "https://redact.dev/blog/x-twitter-ai-opt-out-guide" },
    ],
  },
  {
    id: "deepseek-consumer",
    name: "DeepSeek app and web chat",
    maker: "DeepSeek",
    audience: "personal",
    plans: "Free app and chat.deepseek.com",
    training: {
      level: "unclear",
      summary:
        "Chats are used for training by default. Sources disagree on opt-out: one security guide shows a training toggle, while another assessment says only users in the EEA, UK and Switzerland can opt out.",
    },
    retention:
      "The privacy policy gives no time limit: data is kept for as long as DeepSeek considers necessary.",
    deletion:
      "Removing a chat from the sidebar only removes it from your account and does not guarantee deletion from DeepSeek's servers. One guide says deleting data already used for training needs an email request to DeepSeek's privacy address.",
    location: "Stored on servers in the People's Republic of China, according to DeepSeek's privacy policy.",
    turnOffSteps: [
      "Open the left sidebar and open Settings from the three-dot menu next to your name.",
      "Look for the option that lets DeepSeek use your data to improve its models and switch it off. Web and mobile menus differ.",
      "If you cannot find it, assume your chats are used for training.",
    ],
    turnOffNote: "Do not rely on the switch for sensitive data. Consider a local open-weight model instead.",
    settingsUrl: null,
    watchFor: [
      "Data is stored in China and is subject to Chinese law.",
      "Security researchers reported that some data reached servers belonging to a Chinese mobile carrier.",
      "The open-weight DeepSeek models are different: run on your own computer, nothing is sent to DeepSeek.",
    ],
    verification: "secondary",
    sources: [
      { label: "Kaspersky: DeepSeek privacy and security", href: "https://www.kaspersky.com/blog/deepseek-privacy-and-security/54643/" },
      { label: "BGR: DeepSeek sends data to China (secondary)", href: "https://bgr.com/tech/deepseek-ai-collects-tons-of-data-about-you-and-sends-it-all-to-china/" },
      { label: "Aona: DeepSeek assessment (secondary)", href: "https://aona.ai/ai-tools/deepseek/" },
    ],
  },
];

/** Rows for one audience, or all rows. Order is kept. */
export function filterPrivacyRows(rows: readonly PrivacyRow[], audience: AudienceFilter): PrivacyRow[] {
  return audience === "all" ? [...rows] : rows.filter((row) => row.audience === audience);
}

/** The text shown in the matrix for one topic. */
export function getTopicText(row: PrivacyRow, topic: PrivacyTopic): string {
  return topic === "training" ? row.training.summary : row[topic];
}

/** How many rows fall in each training level. */
export function countTrainingLevels(rows: readonly PrivacyRow[]): Record<TrainingLevel, number> {
  const counts: Record<TrainingLevel, number> = {
    "trains-by-default": 0,
    "your-choice": 0,
    "no-training": 0,
    unclear: 0,
  };
  for (const row of rows) counts[row.training.level] += 1;
  return counts;
}

/** Rows that have a switch to flip, for the settings guide. */
export function listSettingsGuideRows(rows: readonly PrivacyRow[]): PrivacyRow[] {
  return rows.filter((row) => row.turnOffSteps.length > 0);
}