export interface TermEntry {
  term: string;
  meaning: string;
}

export interface BehaviourEntry {
  label: string;
  who: string;
  whatHappens: string;
  risk: string;
}

export interface NoticeRow {
  provider: string;
  minimumNotice: string;
  note: string;
}

export interface ClockRow {
  model: string;
  providerApi: string;
  cloud: string;
  takeaway: string;
}

export interface ReaderPath {
  id: string;
  title: string;
  who: string;
  points: readonly string[];
  link: { href: string; label: string };
}

export interface BuilderStep {
  title: string;
  detail: string;
}

export interface DirectoryStatus {
  model: string;
  maker: string;
  finding: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface RetirementSource {
  publisher: string;
  title: string;
  href: string;
  kind: "Provider page" | "Tracker (secondary)";
}

export const LIFECYCLE_TERMS: readonly TermEntry[] = [
  { term: "Active", meaning: "The model works normally and no end date has been announced." },
  { term: "Deprecated or legacy", meaning: "Still works, but the maker has told customers to move. Some makers use these words for \"retirement is scheduled\", others for \"retirement is only likely\"." },
  { term: "Retired", meaning: "The date has passed. Depending on the platform, requests fail, or the old name quietly serves a different model." },
  { term: "Not sooner than", meaning: "A floor on an active model. It is the earliest a retirement could happen, not an announcement. The real date arrives later with notice." },
  { term: "Earliest possible date", meaning: "Google's wording for its listed shutdown dates: the model may be switched off on or after that day." },
  { term: "Successor", meaning: "The model the maker recommends instead. It is a starting point, not an equal: re-test your prompts on it." },
];

export const ON_THE_DAY_BEHAVIOURS: readonly BehaviourEntry[] = [
  { label: "The request fails", who: "OpenAI, Anthropic, Google (Gemini API and Vertex AI), Amazon Bedrock", whatHappens: "Calls to the retired ID return an error.", risk: "Loud but safe: monitoring catches it. The danger is a forgotten job that nobody owns." },
  { label: "Not found or gone (404 or 410)", who: "Mistral returns 404. Microsoft Foundry returns 410 for retired models.", whatHappens: "The platform says the model no longer exists.", risk: "Same as a failure, with a different error code to handle." },
  { label: "The old name redirects", who: "xAI, and DeepSeek before its cut-off", whatHappens: "The old name keeps answering, but a different model writes the reply, sometimes at a different price.", risk: "Quiet: your error rate stays flat while quality, style and safety behaviour change." },
  { label: "Automatic upgrade", who: "Microsoft Foundry Standard deployments, and some Gemini API aliases", whatHappens: "The deployment or alias moves to the replacement without a code change.", risk: "Quiet: a model change you did not review. Set the upgrade option on purpose." },
];

export const NOTICE_POLICIES: readonly NoticeRow[] = [
  { provider: "Anthropic", minimumNotice: "At least 60 days for publicly released models", note: "Stated on Anthropic's deprecations page. Dates apply to Anthropic-run platforms; Bedrock and Google Cloud set their own." },
  { provider: "OpenAI", minimumNotice: "At least 6 months for generally available models", note: "Previews and some specialised variants get far less. In 2026 we saw 3 months for GPT-4o and GPT-4.1, and 20 days for one cyber model." },
  { provider: "Google (Gemini API)", minimumNotice: "At least 2 weeks for previews", note: "Listed dates are the earliest possible. Check the page and your email." },
  { provider: "Google (Vertex AI)", minimumNotice: "12 months or more for long-term models; 45 days or more for short-term ones", note: "Vertex says listed dates may be extended but not moved earlier." },
  { provider: "Microsoft Foundry", minimumNotice: "At least 60 days for generally available models; 30 days for previews", note: "Foundry fixes a retirement date at launch, so its dates can be earlier than the maker's own." },
  { provider: "Amazon Bedrock", minimumNotice: "At least 6 months in the Legacy stage for older models", note: "Legacy access can lapse after 15 days of inactivity, and extended access may cost more." },
  { provider: "xAI and DeepSeek", minimumNotice: "No general policy found", note: "xAI's November 2 guide states 60 days. DeepSeek gave three months for its 2026 cut-off." },
];

export const PLATFORM_CLOCKS: readonly ClockRow[] = [
  { model: "Claude Sonnet 4.5", providerApi: "Claude API: Nov 30, 2026", cloud: "Foundry: Nov 30, 2026. Bedrock: Apr 8, 2027", takeaway: "A later cloud date is a buffer, not a plan." },
  { model: "Claude Opus 4.1", providerApi: "Claude API: retired Aug 5, 2026", cloud: "Bedrock: Jan 8, 2027 (three US Regions)", takeaway: "Still callable on Bedrock, with extended-access pricing." },
  { model: "GPT-4o (Aug and Nov 2024 snapshots)", providerApi: "OpenAI API: Jan 14, 2027", cloud: "Foundry: Apr 14, 2027", takeaway: "If you fail over between the two, the earlier date is your deadline." },
  { model: "Gemini 2.5 Pro and Flash", providerApi: "Gemini API: no date announced", cloud: "Vertex AI: Oct 20, 2026", takeaway: "Same model name, two Google surfaces, two answers." },
  { model: "OpenAI Whisper and TTS", providerApi: "OpenAI API: Jan 6 and Feb 26, 2027", cloud: "Foundry: Dec 15, 2026", takeaway: "Here the cloud date comes first." },
  { model: "Claude Opus 4.6, Sonnet 4.6, Opus 4.7", providerApi: "Claude API: not sooner than Feb 5, Feb 17 and Apr 16, 2027", cloud: "Foundry: Feb 2, Feb 10 and Apr 6, 2027", takeaway: "A floor on one page is a hard date on another. Take the earlier one." },
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "app-users",
    title: "I only use the chat apps",
    who: "ChatGPT, Claude or Gemini in a browser or phone app",
    points: [
      "A retired model disappears from the model picker. Your saved chats stay.",
      "OpenAI says GPTs that used a retired model move to the closest current one on their own.",
      "If you liked a model's tone, write it into your custom instructions and test a few old prompts on the new model.",
      "Business and education admins can sometimes switch on a temporary legacy-model option. Ask your admin.",
      "Leaving an app does not mean leaving the API. GPT-4o left ChatGPT on Feb 13, 2026 while API snapshots ran on.",
    ],
    link: { href: "/prices/plans", label: "See consumer plans" },
  },
  {
    id: "builders",
    title: "I build with an API",
    who: "Developers, analysts and anyone with a model ID in code or an automation",
    points: [
      "List every model ID you call, including IDs stored in settings, databases and no-code tools.",
      "Find the date for the platform you actually use. Use the checker below.",
      "Test the named successor and one alternative on your own tasks before the date, not after.",
      "Pin dated snapshot IDs in production and keep a rollback in config.",
      "Check the replacement's price: it changes your cost per task.",
    ],
    link: { href: "/prices/api", label: "Compare API prices" },
  },
  {
    id: "managers",
    title: "I manage a team or a business",
    who: "Team leads, IT, compliance and small business owners",
    points: [
      "Ask each tool owner which models their workflow depends on, and who owns the date.",
      "Send provider deprecation emails to a shared mailbox, not one person.",
      "Treat a model swap as a change to your risk records: data terms, retention and safety testing can differ on the replacement.",
      "Plan for the shortest notice you have seen, not the policy minimum.",
    ],
    link: { href: "/compare/models", label: "Open the model directory" },
  },
];

export const BUILDER_STEPS: readonly BuilderStep[] = [
  { title: "Inventory", detail: "Search code, config, environment variables and automation tools for model IDs. Then check provider usage exports, because a search misses IDs stored elsewhere." },
  { title: "Match each ID to a platform", detail: "The same model can retire on different days on the provider's API, Bedrock, Foundry and Vertex. One row per model and platform." },
  { title: "Read the date type", detail: "A firm date needs a plan. A floor or earliest date needs a reminder and a watch on the provider's page." },
  { title: "Test the successor and one alternative", detail: "Run ten real tasks through the old model, the named replacement and one other. Compare quality, speed and cost per task." },
  { title: "Move behind config", detail: "Keep the model ID in settings, ship to a slice of traffic first, and keep the old model available until the date for rollback." },
  { title: "Watch the model that answers", detail: "Log the model name each response reports, and alert when it differs from what you asked for. This is how you catch quiet redirects and auto-upgrades." },
  { title: "Re-check weekly", detail: "Dates keep arriving, sometimes with a few weeks' notice. Review provider pages and this tracker once a week." },
];

export const SUPERSEDED_RULES: readonly string[] = [
  "When a model or plan is replaced, the old entry is labelled Superseded and links to its successor instead of being deleted.",
  "Reviews and best-for pages show a Superseded label on any model listed here as retired or retiring, and name the replacement.",
  "Retired entries stay on this page, dimmed, so old links and searches still land somewhere useful.",
  "Every entry shows whether the date is firm, earliest or a floor, and whether we read it on the provider's page or through a tracker.",
  "Where two sources disagree, we use the provider's page, note the conflict in the entry and record it in the changelog.",
];

export const DIRECTORY_STATUS: readonly DirectoryStatus[] = [
  { model: "Claude Opus 5.5", maker: "Anthropic", finding: "No Claude API date found. Foundry lists its fast variant retiring Jan 15, 2027." },
  { model: "GPT-6.1 Sol", maker: "OpenAI", finding: "No retirement date found. OpenAI's pages name Sol-tier models as replacements for many retiring ones." },
  { model: "GPT-6 Astra", maker: "OpenAI", finding: "No retirement date found." },
  { model: "Claude Fable 5.1", maker: "Anthropic", finding: "No retirement date found." },
  { model: "Claude Sonnet 5.5", maker: "Anthropic", finding: "No retirement date found. It is the named replacement for Claude Sonnet 4.5." },
  { model: "Gemini 4 Argon", maker: "Google", finding: "No retirement date found. Its introductory price ends Nov 30, 2026, which is a price change, not a retirement." },
  { model: "Gemini 3.8 Flash", maker: "Google", finding: "No retirement date found. Named as a replacement for retiring Gemini 2.5 models." },
  { model: "Claude Haiku 5.5", maker: "Anthropic", finding: "No retirement date found." },
  { model: "GPT-6 Luna", maker: "OpenAI", finding: "No retirement date found. Named as a replacement for several small OpenAI models." },
  { model: "Grok 4.7", maker: "xAI", finding: "No retirement date found." },
  { model: "MiMo-V2.6-Pro", maker: "Xiaomi", finding: "No retirement date found. It replaces the MiMo V2.5 models retiring Oct 21, 2026." },
  { model: "Kimi K3", maker: "Moonshot AI", finding: "No retirement date found." },
  { model: "Qwen3.8 Max / 27B", maker: "Alibaba", finding: "No retirement date found." },
  { model: "DeepSeek V4.1 Flash", maker: "DeepSeek", finding: "No retirement date found. Requests to the older V4 Pro name are already routed to it." },
];

export const FAQ: readonly FaqEntry[] = [
  { question: "If a model leaves ChatGPT, is it gone from the API too?", answer: "Not necessarily. Apps and APIs retire on separate schedules. GPT-4o left ChatGPT in February 2026, while API snapshots stay until their own dates." },
  { question: "What is the difference between deprecated and retired?", answer: "Deprecated means the maker has told people to move but the model still works. Retired means the date has passed. Some platforms use \"legacy\" for a stage in between." },
  { question: "What does \"not sooner than\" mean?", answer: "It is a floor on an active model: the earliest a retirement could happen. It is not an announcement. Plan only once a firm date and notice appear." },
  { question: "Is my model safe if it is not listed here?", answer: "Not necessarily. The list covers models we track and may miss yours. Check your provider's own deprecations page, and your email." },
  { question: "Will my old chats stop working?", answer: "In the apps, no: saved chats stay. Anything built on an API that calls a retired model will break or change." },
  { question: "What should I move to?", answer: "Start with the maker's named successor, test it against one alternative on your own tasks, and compare cost per task. Our best-for pages show current picks." },
  { question: "Why do cloud platforms show different dates?", answer: "Each platform runs its own policy. Amazon Bedrock often runs later than the maker, and Microsoft Foundry sometimes sets earlier fixed dates. Use the date for the platform you call." },
  { question: "How often is this page updated?", answer: "Weekly, and sooner when a major retirement is announced. The verified-on date at the top shows the last check." },
];

export const PROVIDER_SOURCES: readonly RetirementSource[] = [
  { publisher: "Anthropic", title: "Model deprecations", href: "https://platform.claude.com/docs/en/about-claude/model-deprecations", kind: "Provider page" },
  { publisher: "OpenAI", title: "API deprecations", href: "https://developers.openai.com/api/docs/deprecations", kind: "Provider page" },
  { publisher: "OpenAI", title: "Retiring GPT-4o and other ChatGPT models", href: "https://help.openai.com/en/articles/20001051", kind: "Provider page" },
  { publisher: "OpenAI", title: "ChatGPT model release notes", href: "https://help.openai.com/en/articles/9624314-model-release-notes", kind: "Provider page" },
  { publisher: "Google", title: "Gemini API deprecations", href: "https://ai.google.dev/gemini-api/docs/deprecations", kind: "Provider page" },
  { publisher: "Google Cloud", title: "Vertex AI model versions and lifecycle", href: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-versions", kind: "Provider page" },
  { publisher: "Microsoft", title: "Foundry model retirement schedule", href: "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirement-schedule", kind: "Provider page" },
  { publisher: "Amazon Web Services", title: "Bedrock model lifecycle (Legacy)", href: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle-legacy.html", kind: "Provider page" },
  { publisher: "xAI", title: "May 15 retirement guide", href: "https://docs.x.ai/developers/migration/may-15-retirement", kind: "Provider page" },
  { publisher: "xAI", title: "grok-imagine-image-quality migration", href: "https://docs.x.ai/developers/migration/imagine-image-quality-nov-2", kind: "Provider page" },
  { publisher: "DeepSeek", title: "API changelog", href: "https://api-docs.deepseek.com/updates/", kind: "Provider page" },
];

export const TRACKER_SOURCES: readonly RetirementSource[] = [
  { publisher: "Developers Digest", title: "AI model shutdown dates 2026 to 2027 (Oct 18)", href: "https://www.developersdigest.tech/blog/ai-model-shutdowns-2026-2027", kind: "Tracker (secondary)" },
  { publisher: "Developers Digest", title: "OpenAI deprecations table (read Oct 17)", href: "https://www.developersdigest.tech/deprecations/openai", kind: "Tracker (secondary)" },
  { publisher: "Deepak Gupta", title: "Model sunsets are the new Patch Tuesday (Oct 12)", href: "https://guptadeepak.com/ai-model-sunsets-new-patch-tuesday/", kind: "Tracker (secondary)" },
  { publisher: "Ecorpit", title: "OpenAI model shutdowns on July 23, 2026", href: "https://ecorpit.com/openai-model-shutdowns-23-july-2026-migration-map/", kind: "Tracker (secondary)" },
  { publisher: "Kingy AI", title: "MiMo-V2.6-Pro pricing and setup", href: "https://kingy.ai/blog/mimo-v2-6-pro-free-access-pricing-setup/", kind: "Tracker (secondary)" },
];