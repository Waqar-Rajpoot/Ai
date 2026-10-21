import type { ComparisonTableContent, ExpertSourceLabel } from "@/lib/learn/expertContent";
import type { TopicCard } from "@/lib/learn/foundationsContent";
import type { Prerequisite } from "@/lib/learn/powerUserContent";
import { calculateLocalModelMemory, formatGigabytes, PRECISION_OPTIONS } from "@/lib/tools/memoryEstimate";

export type RelatedLink = Prerequisite;
export type OpenVsClosedSourceLabel = ExpertSourceLabel | "Vendor-reported" | "Secondary source";

export interface OpenVsClosedSource {
  publisher: string;
  title: string;
  href: string;
  label: OpenVsClosedSourceLabel;
}

export interface SummaryPoint {
  id: string;
  label: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Date the facts and examples on this page were last checked. */
export const OPEN_VS_CLOSED_VERIFIED_ON = "October 21, 2026";
/** Placeholder byline until the author and editor are named. */
export const OPEN_VS_CLOSED_AUTHOR = "Editorial team";
export const OPEN_VS_CLOSED_READ_MINUTES = 14;
export const PRICE_DISCLAIMER = "Prices and features change. Confirm on the provider's website before buying.";

export const OPEN_VS_CLOSED_SECTIONS: readonly { id: string; label: string }[] = [
  { id: "short-answer", label: "Short answer" },
  { id: "definitions", label: "Definitions" },
  { id: "at-a-glance", label: "At a glance" },
  { id: "quality", label: "Quality" },
  { id: "cost", label: "Cost" },
  { id: "privacy", label: "Privacy" },
  { id: "licences", label: "Licences" },
  { id: "hardware", label: "Hardware" },
  { id: "beyond", label: "Beyond cost and privacy" },
  { id: "choose", label: "Which to choose" },
  { id: "myths", label: "Myths and facts" },
  { id: "faq", label: "FAQ" },
];

export const SUMMARY_POINTS: readonly SummaryPoint[] = [
  { id: "closed", label: "Closed (hosted)", text: "You rent access through an app or an API. The provider keeps the model files, runs the hardware and sets the terms. It is the easiest way to start." },
  { id: "open-weights", label: "Open weights", text: "The trained model files can be downloaded. You, or a host you choose, can run them. A licence still sets what you may do, and the training data and code are often not shared." },
  { id: "open-source", label: "Open source", text: "A stricter label. Under the Open Source Initiative's definition for AI, detailed information about the training data and the full code must be shared too. Many 'open' models fall short." },
  { id: "rule", label: "The practical rule", text: "Start hosted unless you have a clear reason: privacy control, high steady volume, customization, offline use or vendor risk. The largest open-weight models are too big to run at home." },
];

export const DEFINITION_CARDS: readonly TopicCard[] = [
  { id: "closed-hosted", title: "Closed, or hosted", summary: "You use the model through the provider's app or API. You never hold the model files. The provider decides what the model does, what it costs and when it is retired." },
  { id: "open-weights", title: "Open weights", summary: "The trained parameters, called weights, are published for download. You can run, test and often adapt them. The licence sets the rules, and training data and code may not be included." },
  { id: "open-source", title: "Open source AI", summary: "Under the Open Source Initiative's 1.0 definition, you need the parameters, the full code to train and run the system, and detailed enough information about the data that a skilled person could build a similar system." },
];

export const TERM_CARDS: readonly TopicCard[] = [
  { id: "weights", title: "Weights", summary: "The numbers a model learned in training. They are the model: the file you download is mostly weights." },
  { id: "inference", title: "Inference", summary: "Running a trained model to get an answer. This is what hardware and per-token prices pay for." },
  { id: "self-hosting", title: "Self-hosting", summary: "Running a model on machines you control: your own computer, a server or rented cloud machines." },
  { id: "host", title: "Hosting provider", summary: "A company that runs open-weight models for you and charges per use. Your prompts go to the host." },
  { id: "licence", title: "Licence", summary: "The legal terms that say what you may do with a model: use it commercially, change it, share it, or offer it as a service." },
];

export const SPECTRUM_TABLE: ComparisonTableContent = {
  caption: "What you get from each kind of model release",
  headers: ["Kind of release", "Weights to download", "Commercial use", "Modify and fine-tune", "Data information and code shared"],
  rows: [
    ["Closed, hosted", "No", "Under the provider's terms", "Only what the provider offers", "No"],
    ["Open weights, custom licence", "Yes", "Depends on the licence terms", "Usually yes, within the licence", "Usually no"],
    ["Open weights, permissive licence (such as MIT or Apache 2.0)", "Yes", "Yes, with the licence conditions", "Yes", "Often no"],
    ["Open source AI (Open Source Initiative definition)", "Yes", "Yes", "Yes", "Yes: detailed data information and the full code"],
  ],
};

export const BLURRY_CARDS: readonly TopicCard[] = [
  { id: "free", title: "Free to use is not open", summary: "A free app is still a closed model. And a free download can still come with limits on what you may do with it." },
  { id: "recipe", title: "Weights are not the whole recipe", summary: "Without the training data and code, you can use or adjust a model but not rebuild it. That gap is why many open-weight models are not open source." },
  { id: "marketing", title: "'Open' is a marketing word", summary: "Makers use it loosely. Look for the licence file and for what is actually published, not for the word on the launch page." },
];

export const AT_A_GLANCE_TABLE: ComparisonTableContent = {
  caption: "Hosted models compared with open-weight models",
  headers: ["What to compare", "Closed, hosted", "Open weights"],
  rows: [
    ["Getting started", "Sign up and type. No setup", "Needs a host, or software and hardware that you set up"],
    ["Quality on hard tasks", "The top independent scores have so far gone mostly to hosted models. Check the benchmark digest", "The gap varies by index and by task. Strong options exist at every size"],
    ["How you pay", "A subscription with limits, or per token through the API", "Per token through a host, rented machines, or hardware you own"],
    ["Privacy control", "Your data goes to the provider, so plan terms matter", "You choose where it runs. Fully local keeps data on your machine"],
    ["Customization", "What the provider offers", "Wide: fine-tune and adapt it, within the licence"],
    ["Built-in features", "Search, files, memory, voice and agents come with the app", "You get a model. You add the features, or use software that has them"],
    ["Updates and retirement", "The provider changes and retires models on its own schedule", "You keep the version you downloaded and choose when to update"],
    ["Reliability and support", "The provider runs and monitors the service", "You or your host run it"],
    ["Safety measures", "The provider can add monitoring and update protections", "Built-in safeguards can be changed by anyone who fine-tunes the model. Outsiders can also inspect and test it"],
    ["Legal terms", "The provider's terms of service", "The model licence, plus any host's terms"],
    ["Hardware", "None", "Memory for the weights, plus working space"],
  ],
};

export const QUALITY_CARDS: readonly TopicCard[] = [
  { id: "frontier-size", title: "Frontier-size open models", summary: "Hundreds of billions to trillions of parameters, often mixture-of-experts. They need data-centre hardware, so most people use them through a host." },
  { id: "mid-size", title: "Mid-size (tens of billions)", summary: "Can run on one high-memory computer or graphics card once quantized. Good for many everyday and coding tasks, with gaps on the hardest ones." },
  { id: "small", title: "Small (under about 10 billion)", summary: "Often fit on a laptop once quantized. Best for narrow, simple or private tasks." },
];

export const QUALITY_CHECKLIST: readonly string[] = [
  "Independent indexes can disagree about how big the gap is, so read more than one",
  "Total size is not quality. Look at active parameters, training and your own tasks",
  "Separate vendor-reported scores from independent ones",
  "Run your own test set before you switch (Level 3)",
];

export const COST_CARDS: readonly TopicCard[] = [
  { id: "subscription", title: "Subscription", summary: "A flat monthly fee with usage limits. Good for personal use. A subscription is not an API." },
  { id: "hosted-api", title: "Hosted API", summary: "You pay per token. Compare cost per task, not the price per million tokens on its own." },
  { id: "open-host", title: "Open-weight model through a host", summary: "You pay a hosting provider per token. Prices vary by host, so compare. There is no hardware bill." },
  { id: "rented", title: "Rented machines", summary: "You pay by the hour for graphics cards. The meter runs while the machine is on, even when it is idle." },
  { id: "owned", title: "Your own hardware", summary: "A large upfront cost, then power and upkeep. It makes sense when use is steady and high." },
];

export const SELF_HOST_HIDDEN_COSTS: readonly string[] = [
  "Your time to set up, update and fix things",
  "Hardware that sits idle between jobs",
  "Electricity and cooling",
  "Monitoring, logging and backups",
  "Security patches and access control",
  "Testing each new model version on your tasks",
  "Extra capacity for busy periods",
];

export const HOSTED_HIDDEN_COSTS: readonly string[] = [
  "Prices, plans and limits that change",
  "Introductory rates that end",
  "Models that are retired, so prompts need re-testing",
  "Long inputs and hidden reasoning that use more tokens than expected",
  "Rate limits that slow heavy use",
];

export const COST_RULE_OF_THUMB =
  "Paying per token wins when use is low or uneven, because you pay only for what you use. Owning hardware wins only when it stays busy and your own time is counted.";

export const PRIVACY_CARDS: readonly TopicCard[] = [
  { id: "open-not-private", title: "Open does not mean private", summary: "Privacy depends on where the model runs. A host that runs an open-weight model sees your prompts, just as a hosted provider would." },
  { id: "local-device", title: "Local is only as safe as your device", summary: "A model on your computer is exposed to anything that can reach your computer: shared accounts, saved logs, malware and lost laptops." },
  { id: "tools-leak", title: "Tools can leak", summary: "Plugins, search and agents that call the internet can send data out, even when the model itself runs locally." },
  { id: "who-runs-it", title: "Know who runs it", summary: "Check which company operates a service and which country's rules apply to it, whichever kind of model it serves." },
];

export const PRIVACY_TABLE: ComparisonTableContent = {
  caption: "Who can see your prompts in each setup",
  headers: ["Setup", "Who can see your prompts", "What to check"],
  rows: [
    ["Consumer chat app (hosted)", "The provider", "Training and retention settings, and how to delete chats"],
    ["Business or API plan (hosted)", "The provider, under business terms that can differ from consumer terms", "Retention, training use and any data-processing terms"],
    ["Open-weight model through a host", "The hosting company, not the model's maker", "The host's privacy terms, where it runs and what it logs"],
    ["Open-weight model on rented machines", "You, and the cloud company that operates the machines", "Who controls the machine, disk encryption and where data is stored"],
    ["Open-weight model on your own computer", "Only you, if nothing sends data out", "Telemetry and plugins, device security, shared access and saved logs"],
  ],
};

export const LICENCE_CARDS: readonly TopicCard[] = [
  { id: "permissive", title: "Permissive (MIT, Apache 2.0)", summary: "You may use, change and share the model, including commercially, if you keep the required notices. Apache 2.0 also includes a patent licence." },
  { id: "custom", title: "Custom licence with conditions", summary: "Written by the maker. Common conditions include limits for very large companies or hosting providers, required agreements, attribution and acceptable-use rules." },
  { id: "research", title: "Research or non-commercial", summary: "Open weights, but not for commercial use. Fine for study and experiments, not for a product." },
  { id: "tos", title: "Closed: terms of service", summary: "The rules of the provider's service: what you may do, who owns the outputs and what data it keeps. Read the business terms if it is for work." },
];

export const LICENCE_EXAMPLES_TABLE: ComparisonTableContent = {
  caption: "Licences of open-weight models in our directory, checked October 21, 2026",
  headers: ["Model", "Maker", "Licence", "What to notice"],
  rows: [
    ["MiMo-V2.6-Pro", "Xiaomi", "MIT", "Permissive. The weights run to hundreds of gigabytes, so most people use it through a host."],
    ["Qwen3.8-27B", "Alibaba", "Apache 2.0", "Permissive, and small enough for one high-memory machine once quantized."],
    ["Qwen3.8-Max", "Alibaba", "Custom Qwen3.8-Max license", "Same family as the 27B but different terms: extra conditions apply to high-revenue providers."],
    ["Kimi K3", "Moonshot AI", "Custom Kimi K3 License", "Weights over a terabyte. Extra conditions apply to large commercial hosting. The maker calls it open-weight, not open source."],
  ],
};

export const LICENCE_EXAMPLES_NOTE =
  "One family can ship under two licences, so check the file for the exact model and version. Licences and file sizes change with each release, and the maker's licence file is the final word.";

export const LICENCE_CHECKLIST: readonly string[] = [
  "Can you use it commercially?",
  "Are there size, revenue or user limits?",
  "Do you need a separate agreement to offer it as a service?",
  "Are there acceptable-use rules?",
  "Do fine-tuned or quantized copies keep the same terms?",
  "Must you credit the maker or pass on notices?",
  "Does it limit using outputs to train other models?",
  "Which version does the licence cover?",
];

export const EU_AI_ACT_CARDS: readonly TopicCard[] = [
  { id: "narrow", title: "A narrow exemption", summary: "Providers of some general-purpose models released under a genuinely free and open-source licence, with public weights, architecture and usage information, get lighter documentation duties." },
  { id: "largest", title: "Not for the largest models", summary: "The exemption does not apply to general-purpose models classified as posing systemic risk." },
  { id: "use", title: "Not for how you use it", summary: "Duties for high-risk uses and for transparency, such as chatbots and synthetic content, apply whatever the licence says." },
  { id: "provider", title: "You can become a provider", summary: "Substantially modifying a general-purpose model can make you its provider. Get advice before you release a modified model." },
];

export const HARDWARE_CARDS: readonly TopicCard[] = [
  { id: "memory", title: "Memory is the limit", summary: "The weights must fit in fast memory: graphics-card memory, or the shared memory of some computers. A rough rule is parameters times bytes per parameter, plus about 20% working space." },
  { id: "quantization", title: "Quantization shrinks it", summary: "Storing weights at 8-bit or 4-bit cuts memory to about half or a quarter of 16-bit. Some quality is lost, and how much varies by model and method." },
  { id: "context", title: "Context adds more", summary: "A long chat or document needs memory beyond the weights, so leave headroom." },
  { id: "moe", title: "Mixture-of-experts needs total memory", summary: "Speed follows the active parameters, but all the weights have to be loaded." },
  { id: "speed", title: "Speed depends on the setup", summary: "Tokens per second depends on memory speed, the software and the model. Small models feel fast, and big ones can crawl on weak hardware." },
  { id: "software", title: "Software matters", summary: "Common runners include llama.cpp, vLLM and SGLang, and MLX on Apple silicon. They differ in the formats they read and the speed you get." },
];

export const HARDWARE_OPTION_CARDS: readonly TopicCard[] = [
  { id: "laptop", title: "Phone or ordinary laptop", summary: "Small models, a few billion parameters, quantized." },
  { id: "workstation", title: "High-memory computer or one graphics card", summary: "Models in the tens of billions of parameters, quantized." },
  { id: "server", title: "Multi-GPU server", summary: "Large models. Usually a team or company setup." },
  { id: "rented", title: "Rented cloud GPUs, or a host", summary: "Any size, when you only need it some of the time." },
];

const MEMORY_EXAMPLE_SIZES_IN_BILLIONS = [7, 27, 70, 400, 1000] as const;

/** Builds the memory table from the same formula the estimator uses, so the two never disagree. */
function buildMemoryExampleTable(): ComparisonTableContent {
  return {
    caption: "Rough memory needed by model size and precision",
    headers: ["Model size", ...PRECISION_OPTIONS.map((option) => option.id)],
    rows: MEMORY_EXAMPLE_SIZES_IN_BILLIONS.map((size) => [
      `${size}B parameters`,
      ...PRECISION_OPTIONS.map((option) => {
        const result = calculateLocalModelMemory({ parametersInBillions: size, bytesPerParameter: option.bytesPerParameter });
        return result.ok ? formatGigabytes(result.estimatedGigabytes) : "n/a";
      }),
    ]),
  };
}

export const MEMORY_EXAMPLE_TABLE = buildMemoryExampleTable();

export const HARDWARE_NOTE =
  "Estimates use parameters times bytes times 1.2. For mixture-of-experts models, use the total parameter count. One 2.8-trillion-parameter open-weight model needs over a terabyte even at 4-bit, which is data-centre territory.";

export const BEYOND_CARDS: readonly TopicCard[] = [
  { id: "model-not-app", title: "A model is not an app", summary: "A chatbot app wraps a model with search, file upload, memory, voice and safety layers. An open-weight download is only the model, so you add the rest or use software that does." },
  { id: "support", title: "Support and reliability", summary: "A hosted provider runs and monitors the service. With open weights, that job is yours or your host's." },
  { id: "lock-in", title: "Switching and lock-in", summary: "Moving between hosted providers means re-testing prompts, and features tied to one provider are hard to leave. Open weights let you change hosts or run your own, but licence and hardware ties remain." },
  { id: "safety", title: "Safety trade-offs", summary: "Hosted providers can add monitoring and update protections. With open weights, anyone can change the built-in safeguards by fine-tuning. Open weights also let outsiders test and audit the model." },
  { id: "retirement", title: "Retirement and updates", summary: "Providers retire models on their schedule. With open weights you can keep running the version you have, but it gets no fixes unless you update it." },
  { id: "transparency", title: "Transparency", summary: "Open weights let researchers study how a model behaves. Hosted models can only be tested through the service." },
];

export const CHOOSE_TABLE: ComparisonTableContent = {
  caption: "Where to start for common situations",
  headers: ["Your situation", "Start with", "Why", "Revisit when"],
  rows: [
    ["Everyday user, student or job seeker", "A hosted app, free or paid", "No setup, strong results and built-in features", "Your plan's limits or price stop fitting"],
    ["Small business with client or staff data", "A business-grade hosted plan, or an approved tool", "Clear data terms and support", "You need data to stay in-house, or volume grows"],
    ["Developer prototyping", "A hosted API", "Fastest to build and test", "Cost per task becomes the main concern"],
    ["High, steady volume of routine tasks", "An open-weight model through a host, then maybe your own hardware", "Price per task and control matter more at scale", "You compare cost and quality on your own test set"],
    ["Sensitive or offline work", "A small open-weight model run locally on approved devices", "The data stays on your machine", "The model is not good enough for the task"],
    ["Researcher or builder who needs to customize", "Open weights with a permissive licence", "You can inspect, fine-tune and adapt it", "A hosted service offers the feature you need"],
    ["Organization with regulated uses", "Approved tools plus legal review, either type", "The rules depend on the use, not the model type", "The rules or the tools change"],
  ],
};

export const HYBRID_NOTE =
  "Many teams use both: a strong hosted model for hard or high-stakes work, and a smaller open-weight model for private or repetitive tasks. Level 3 covers routing by task.";

export const MYTHS_TABLE: ComparisonTableContent = {
  caption: "Common myths about open-weight and closed models",
  headers: ["Myth", "What is actually true"],
  rows: [
    ["Open weights means free", "The file may cost nothing, but hardware, power, hosting and time do. Some licences also limit commercial use."],
    ["Open weights means private", "Privacy depends on where the model runs. A host sees your prompts just like a hosted provider."],
    ["Open weights means open source", "Open source under the Open Source Initiative's definition also needs data information and code. Many open-weight models do not meet it."],
    ["Closed models are always better", "The top independent scores have so far gone mostly to hosted models, but the gap varies by index and task. Test on yours."],
    ["Running locally is automatically safe", "Your device, plugins and saved logs can still leak data, and local models still give wrong answers."],
    ["Open models are unsafe and closed models are safe", "Each has trade-offs. Providers can monitor and update protections. Open weights allow outside testing, but anyone can change the safeguards."],
    ["You must choose one forever", "You can mix them and switch as prices, rules and models change."],
  ],
};

export const BEFORE_OPEN_CHECKLIST: readonly string[] = [
  "I read the licence file, not just the model's page",
  "I know where my data will go: my machine, a host or rented hardware",
  "The model fits my memory with room for long inputs",
  "I tested it on my own tasks, not only on public scores",
  "I know who updates it and how I will test new versions",
  "I have a plan for security and logs",
  "I know whether any law or policy applies to my use",
];

export const BEFORE_HOSTED_CHECKLIST: readonly string[] = [
  "I checked the plan's training and retention settings",
  "I know the plan's limits and what happens when I hit them",
  "I know what a task costs, not only the price per million tokens",
  "I know when introductory prices end",
  "I know how I would move if the model is retired or the price changes",
  "I read the business terms if it is for work",
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  { question: "Which should a beginner choose?", answer: "A hosted app. Move to open weights when you have a specific reason, such as privacy control, high volume or customization." },
  { question: "Can I use open-weight models for my business?", answer: "Often yes, but it depends on the licence. Permissive licences such as MIT and Apache 2.0 allow commercial use with conditions. Custom licences can add limits, for example for very large companies or hosting providers. Read the licence file for the exact model and version." },
  { question: "Do I need a graphics card?", answer: "Not always. Small quantized models run on many ordinary computers, though slowly. Larger models need more memory, and a graphics card or a computer with a lot of fast memory helps a great deal. Use the estimator on this page." },
  { question: "Is an open-weight model cheaper?", answer: "Sometimes. Through a host, per-token prices can differ from closed models, so compare cost per task. On your own hardware it is cheaper only when the machine stays busy and your time is counted." },
  { question: "Are open-weight models less accurate?", answer: "Not by definition. Quality depends on the specific model, its size and your task. Independent indexes show different gaps, so check the benchmark digest and test your own tasks." },
  { question: "Can I fine-tune a closed model?", answer: "Some providers offer fine-tuning as a service for some models, with their own rules and prices. With open weights you can fine-tune yourself, within the licence." },
  { question: "Can I see the training data of an open-weight model?", answer: "Usually not. Open weights share the trained parameters. Training data and code are often not shared, which is the main reason many are not open source under the Open Source Initiative's definition." },
  { question: "Is the model I download the same as the one in the maker's app?", answer: "Not necessarily. Apps add system prompts, search, safety layers and other tools around a model, and the app may use a different version or setting. Expect different behavior until you add those pieces yourself." },
  { question: "What happens if a maker changes the licence?", answer: "A licence applies to the version you received, and new versions can carry different terms. Keep a copy of the licence text with each model you use, and check any update before you adopt it. For anything important, ask a qualified adviser." },
];

export const OPEN_VS_CLOSED_WHAT_CAN_GO_WRONG: readonly string[] = [
  "Assuming open weights means private, then sending sensitive data to a host you have not checked.",
  "Buying hardware for a model that no longer fits once the conversation gets long.",
  "Skipping the licence and building a product on terms that do not allow it.",
  "Comparing a self-hosting bill with a hosted price without counting your own time.",
  "Choosing by a public score instead of testing on your own tasks.",
  "Leaving a local model without updates or security patches.",
];

export const OPEN_VS_CLOSED_SOURCES: readonly OpenVsClosedSource[] = [
  { publisher: "Open Source Initiative", title: "The Open Source AI Definition 1.0", href: "https://opensource.org/ai/open-source-ai-definition", label: "Independent third party" },
  { publisher: "European Commission", title: "The EU's regulatory framework for AI", href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", label: "Official" },
  { publisher: "Freshfields", title: "EU AI Act unpacked #27: guidelines on the scope of obligations for general-purpose AI models", href: "https://technologyquotient.freshfields.com/post/102kxqo/eu-ai-act-unpacked-27-guidelines-on-the-scope-of-obligations-for-general-purpos", label: "Secondary source" },
  { publisher: "Artificial Analysis", title: "MiMo-V2.6-Pro: licence and specifications", href: "https://artificialanalysis.ai/models/mimo-v2-6-pro", label: "Independent third party" },
  { publisher: "Moonshot AI on Hugging Face", title: "Kimi K3 model card and licence", href: "https://huggingface.co/moonshotai/Kimi-K3", label: "Vendor-reported" },
  { publisher: "WhatLLM", title: "Kimi K3: open weights, licence and hardware", href: "https://whatllm.org/blog/kimi-k3", label: "Secondary source" },
  { publisher: "Qwen team on GitHub", title: "Qwen3.8 open models", href: "https://github.com/QwenLM/Qwen3.8", label: "Vendor-reported" },
  { publisher: "SQ Magazine", title: "Qwen3.8 open weights ship under two different licenses", href: "https://sqmagazine.co.uk/qwen3-8-open-weights-two-licenses/", label: "Secondary source" },
];

export const OPEN_VS_CLOSED_RELATED: readonly RelatedLink[] = [
  { id: "run-local", title: "Run an AI model on your own computer", reason: "Article 26: hardware, quantization and choosing a local model.", href: "/learn/expert/run-ai-on-your-own-computer" },
  { id: "memory-tool", title: "Local model memory estimator", reason: "Check whether a model fits your machine.", href: "/tools/local-model-memory" },
  { id: "api-pricing", title: "AI API pricing for non-engineers", reason: "Article 22: cost per task, not per token.", href: "/learn/power-user/ai-api-pricing-for-non-engineers" },
  { id: "benchmarks", title: "How to read an AI benchmark", reason: "Article 27: what the scores hide.", href: "/learn/expert/how-to-read-ai-benchmark" },
  { id: "security", title: "Prompt injection and agent security", reason: "Article 28: keep local and hosted agents contained.", href: "/learn/expert/prompt-injection-agent-security" },
  { id: "eu-ai-act", title: "The EU AI Act for everyday users", reason: "Article 29: duties in plain English.", href: "/learn/expert/eu-ai-act-for-everyday-users" },
  { id: "best-open", title: "Best open-weight models", reason: "Ranked picks by use case.", href: "/compare/best/open-weights" },
  { id: "best-local", title: "Best models to run locally", reason: "What fits on one machine.", href: "/compare/best/local" },
  { id: "privacy-matrix", title: "Privacy matrix", reason: "Training, retention and deletion by plan.", href: "/prices/privacy" },
  { id: "directory", title: "Model directory", reason: "Every model we cover, with prices and context.", href: "/compare/models" },
];