import type { GuideCard, SelfCheckQuestion, TopicCard } from "./foundationsContent";
import type { Prerequisite } from "./powerUserContent";
import type { SelfCheckMessages } from "./selfCheck";

export type ExpertGuideCard = Omit<GuideCard, "kind"> & { kind: "Explainer" | "Guide" | "Safety" };

export interface ComparisonTableContent {
  caption: string;
  headers: readonly string[];
  /** The first cell of each row is the row heading. */
  rows: readonly (readonly string[])[];
}

export type ExpertSourceLabel = "Official" | "Independent third party";

export interface ExpertSource {
  publisher: string;
  title: string;
  href: string;
  label: ExpertSourceLabel;
}

export const EXPERT_SELF_CHECK_QUESTIONS: readonly SelfCheckQuestion[] = [
  {
    id: "total-vs-active",
    prompt: "A mixture-of-experts model lists 100B total and 10B active parameters. What does 'active' mean?",
    options: [
      { id: "a", label: "Parameters that were updated last week" },
      { id: "b", label: "Parameters used to process each token, while all 100B still have to be stored" },
      { id: "c", label: "Parameters you are allowed to edit" },
      { id: "d", label: "The cheapest 10B parameters in the file" },
    ],
    correctOptionId: "b",
    explanation: "Work per token follows the active count, but memory has to hold the whole model.",
  },
  {
    id: "vendor-reported",
    prompt: "A maker's launch post shows its new model beating rivals on a benchmark. How should you label that number?",
    options: [
      { id: "a", label: "Independent, because the benchmark is public" },
      { id: "b", label: "Vendor-reported, until an independent group reproduces it" },
      { id: "c", label: "Tested by us" },
      { id: "d", label: "Verified" },
    ],
    correctOptionId: "b",
    explanation: "A number from the maker's own announcement is a lead to check, not a final result.",
  },
  {
    id: "memory",
    prompt: "Roughly how much memory do the weights alone need for a 20-billion-parameter model stored at 8-bit (1 byte each)?",
    options: [
      { id: "a", label: "2 GB" },
      { id: "b", label: "10 GB" },
      { id: "c", label: "20 GB" },
      { id: "d", label: "160 GB" },
    ],
    correctOptionId: "c",
    explanation: "Parameters times bytes per parameter: 20 billion x 1 byte is about 20 GB, before working space.",
  },
  {
    id: "open-weights",
    prompt: "A model's weights are free to download, but its licence limits commercial use. Which description fits best?",
    options: [
      { id: "a", label: "Open source in the strict sense" },
      { id: "b", label: "Open weights, with licence terms you need to read" },
      { id: "c", label: "A closed model" },
      { id: "d", label: "Public domain" },
    ],
    correctOptionId: "b",
    explanation: "Open weights means you can download the parameters. The licence, and what else is shared, decide the rest.",
  },
  {
    id: "contamination",
    prompt: "Why can benchmark contamination make a score misleading?",
    options: [
      { id: "a", label: "The test questions may have leaked into the training data, so the model may have seen them" },
      { id: "b", label: "The benchmark takes too long to run" },
      { id: "c", label: "Makers are never allowed to publish scores" },
      { id: "d", label: "It makes the model slower" },
    ],
    correctOptionId: "a",
    explanation: "A model that has seen the questions can look better than it is on new problems.",
  },
  {
    id: "prompt-injection",
    prompt: "An agent summarizes a web page that has hidden text telling it to email your files to a stranger. What is this?",
    options: [
      { id: "a", label: "A hallucination" },
      { id: "b", label: "Indirect prompt injection" },
      { id: "c", label: "Quantization" },
      { id: "d", label: "Overfitting" },
    ],
    correctOptionId: "b",
    explanation: "Instructions hidden in content the AI reads are treated as commands. Limiting what the agent may do limits the damage.",
  },
];

export const EXPERT_RESULT_MESSAGES: SelfCheckMessages = {
  ready: { headline: "You are ready for the Expert guides", advice: "Skim the topics below, then open the guide that matches your work." },
  goodStart: { headline: "A solid base", advice: "Read the sections for the questions you missed, then try again." },
  startOver: { headline: "Revisit Level 3 first", advice: "Power user covers tokens, cost per task, agents and test sets. Come back when it feels familiar." },
};

export const EXPERT_PREREQUISITES: readonly Prerequisite[] = [
  { id: "training", title: "How models are trained", reason: "Architectures and fine-tuning build on pre-training and tuning.", href: "/learn/power-user#training" },
  { id: "context", title: "Context engineering", reason: "Inference cost depends on how much you put in the window.", href: "/learn/power-user#context" },
  { id: "cost-per-task", title: "Cost per task", reason: "Level 4 cost questions start from tokens in and out.", href: "/learn/power-user#api-pricing" },
  { id: "agents", title: "Agents and permissions", reason: "Security assumes you know what an agent can do.", href: "/learn/power-user#agents" },
  { id: "test-set", title: "Your own test set", reason: "Evaluation and fine-tuning both need one.", href: "/learn/power-user#test-set" },
  { id: "fact-checking", title: "Fact-checking routine", reason: "Reading evidence critically starts with checking sources.", href: "/learn/practitioner#fact-checking" },
];

export const EXPERT_ABILITIES: readonly string[] = [
  "Explain dense and mixture-of-experts models, and total versus active parameters",
  "Estimate the memory a local model needs",
  "Read a benchmark critically: source, method and margin",
  "Tell vendor-reported results from independent ones",
  "Decide when to prompt, retrieve or fine-tune",
  "Read a system card and spot what it leaves out",
  "Describe prompt injection and contain an agent",
  "Map the main EU AI Act duties to your own use, without treating it as legal advice",
];

export const EXPERT_TOPICS: readonly TopicCard[] = [
  { id: "architectures", title: "Architectures", summary: "Dense versus mixture-of-experts, and total versus active parameters." },
  { id: "inference", title: "Inference and cost", summary: "Tokens per second, caching, quantization and memory." },
  { id: "open-weights", title: "Open weight vs open source", summary: "What you can download, what the licence allows, and what hardware it needs." },
  { id: "fine-tuning", title: "Fine-tuning and adapters", summary: "When to train further, and when prompting or retrieval is enough." },
  { id: "evaluation", title: "Evaluation", summary: "Vendor-reported versus independent results, margins and contamination." },
  { id: "safety", title: "Safety and system cards", summary: "How to read a maker's safety documentation." },
  { id: "security", title: "Security", summary: "Prompt injection, data leakage and containing agents." },
  { id: "governance", title: "Governance and the EU AI Act", summary: "AI literacy, transparency and high-risk duties, in plain English." },
];

export const ARCHITECTURE_CARDS: readonly TopicCard[] = [
  { id: "transformer", title: "Transformer", summary: "The design behind most current language models. It lets the model weigh each part of the input against the others when it predicts the next token." },
  { id: "dense", title: "Dense model", summary: "Every parameter takes part in every token. Simple to run, and the work per token grows with total size." },
  { id: "moe", title: "Mixture-of-experts", summary: "The model is split into many expert blocks, and a router picks a few for each token. Only those experts do the work for that token." },
];

export const ARCHITECTURE_TABLE: ComparisonTableContent = {
  caption: "Dense compared with mixture-of-experts models",
  headers: ["What to compare", "Dense", "Mixture-of-experts"],
  rows: [
    ["Parameters doing work per token", "All of them", "Only the active ones, a fraction of the total"],
    ["Memory to load the model", "All parameters", "All parameters, not just the active ones"],
    ["Speed per token", "Slows as the model grows", "Tends to be closer to a dense model of the active size"],
    ["Numbers to look for", "Parameter count", "Total and active parameter counts"],
  ],
};

export const ARCHITECTURE_NOTE =
  "Made-up example: a model with 100B total and 10B active parameters does roughly the per-token work of a 10B model, but needs memory for all 100B. Always check which number a vendor is quoting.";

export const INFERENCE_CARDS: readonly TopicCard[] = [
  { id: "tokens-per-second", title: "Tokens per second", summary: "How quickly the reply streams. It depends on the model, the hardware and how busy the service is." },
  { id: "first-token", title: "Time to first token", summary: "How long you wait before the reply starts. Long inputs and heavy reasoning raise it." },
  { id: "caching", title: "Caching", summary: "Reusing work on input that repeats, such as a long shared instruction. Providers differ on whether they offer it and how they price it." },
  { id: "quantization", title: "Quantization", summary: "Storing weights with fewer bits, such as 8-bit or 4-bit, so the model needs less memory and often runs faster. Some quality can be lost, and how much depends on the model and method." },
];

export const INFERENCE_NOTE =
  "Hidden reasoning can use extra output tokens on some services. Check how yours counts it when you work out cost per task.";

export const OPEN_WEIGHT_CARDS: readonly TopicCard[] = [
  { id: "open-weights", title: "Open weights", summary: "The trained parameters can be downloaded and run by you. The licence may still limit use, and the training data and code may not be shared." },
  { id: "open-source", title: "Open source", summary: "Judged by the Open Source Initiative's definition for AI, you may use, study, modify and share the system, and enough is shared about data and code to make that real. Not every model called open meets it." },
  { id: "hosted", title: "Hosted", summary: "You use the model through a provider's app or API. You do not hold the weights." },
];

export const HOSTED_VS_OPEN_TABLE: ComparisonTableContent = {
  caption: "Hosted models compared with open-weight models you run yourself",
  headers: ["What to compare", "Hosted", "Open weights, run by you"],
  rows: [
    ["Cost", "A flat plan or a charge per token, with no hardware to buy", "No per-token fee, but you pay for hardware, power and your time, or for rented machines"],
    ["Privacy", "Your data goes to the provider, so check its settings and terms", "Data can stay on your machine if you run it locally. On rented machines, the host matters"],
    ["Licence", "The provider's terms of service", "The model licence. Read it, because terms differ"],
    ["Hardware", "None needed", "Enough memory for the weights. Use the estimator below"],
    ["Updates", "The provider changes and retires models", "You keep the version you choose, and you handle updates"],
  ],
};

export const OPEN_WEIGHT_NOTE =
  "Check the licence for limits on commercial use, the size of your organization or the field of use. Terms differ by model.";

export const FINE_TUNING_CARDS: readonly TopicCard[] = [
  { id: "fine-tuning", title: "Fine-tuning", summary: "Further training on your own examples so the model behaves the way you want, for example in a fixed style or format." },
  { id: "adapters", title: "Adapters and LoRA", summary: "Instead of changing every weight, you train a small add-on called an adapter. LoRA is a common method. It costs less and the adapter can be switched on or off." },
  { id: "data", title: "Your examples are the product", summary: "Poor, inconsistent or private examples carry straight into the model. Check you have the right to train on them." },
];

export const FINE_TUNING_LADDER: readonly TopicCard[] = [
  { id: "prompt", title: "Write a clearer prompt", summary: "Many problems are unclear instructions." },
  { id: "examples", title: "Add examples", summary: "Show two or three good answers inside the prompt." },
  { id: "retrieve", title: "Retrieve the facts", summary: "If the model lacks your facts, use RAG instead of training them in." },
  { id: "tune", title: "Fine-tune", summary: "Train further to change style, format or a narrow task that the steps above did not fix." },
];

export const FINE_TUNING_CHECKLIST: readonly string[] = [
  "A test set showing where the current model falls short",
  "Clean, consistent examples of the output you want",
  "Permission to use the data for training",
  "A plan to re-run your test set after training",
  "A plan for updates, since a new base model usually means training again",
];

export const EVALUATION_CARDS: readonly TopicCard[] = [
  { id: "vendor-vs-independent", title: "Vendor-reported vs independent", summary: "A maker's own numbers are a lead. Independent evaluators that publish their method are a better basis for comparison." },
  { id: "arenas", title: "Human-preference arenas", summary: "These rank models from head-to-head votes. Look at the vote counts, because a model with few votes has a shaky position." },
  { id: "margins", title: "Margins", summary: "A gap smaller than the statistical margin is a tie, not a ranking." },
  { id: "contamination", title: "Contamination", summary: "If test questions leaked into the training data, the model may have seen them, and the score overstates what it can do on new problems." },
];

export const LABELS_TABLE: ComparisonTableContent = {
  caption: "The three result labels used on this site",
  headers: ["Label", "What it means", "How to use it"],
  rows: [
    ["Tested by us", "We ran it, and we publish the model version, settings and date", "Check the date and settings. It is one test on one day"],
    ["Independent third party", "An outside group ran it and publishes its method", "Good for a shortlist. Check the method and the margin"],
    ["Vendor-reported", "The maker's own announcement", "A lead to check, never the only source. Kept apart from independent scores"],
  ],
};

export const SAFETY_CARDS: readonly TopicCard[] = [
  { id: "system-card", title: "System card", summary: "A document from the maker describing what a model can do, how it was tested and what risks were found. Names vary, for example system card or model card." },
  { id: "red-teaming", title: "Red teaming", summary: "People, or other models, deliberately try to make the system fail or misbehave, so weaknesses are found before users find them." },
  { id: "alignment", title: "Alignment", summary: "Work to make a model's behavior match what its users and makers intend." },
];

export const SYSTEM_CARD_CHECKLIST: readonly string[] = [
  "What was tested, and by whom: the maker or an outside group",
  "Known limits and failure cases",
  "Restricted areas, and what the model refuses",
  "What changed since the previous version",
  "Whether the tests match how you will use it",
  "What the card does not say",
];

export const SAFETY_NOTE =
  "A system card describes testing the maker chose to publish. Read it as vendor-reported evidence, and run your own checks on what matters to you.";

export const SECURITY_CARDS: readonly TopicCard[] = [
  { id: "direct-injection", title: "Direct prompt injection", summary: "Someone types instructions that try to override the rules the system was given." },
  { id: "indirect-injection", title: "Indirect prompt injection", summary: "Hidden instructions sit inside content the AI reads, such as a web page, email or file, and the AI treats them as commands." },
  { id: "leakage", title: "Data leakage", summary: "Private information in the prompt, files or connected tools is shown or sent somewhere it should not go." },
  { id: "permissions", title: "Excess permissions", summary: "The more an agent can do, the more damage a successful injection can cause." },
];

export const SECURITY_CONTAINMENT: readonly string[] = [
  "Give each agent the least access the job needs",
  "Require your approval before it sends, deletes, buys or publishes",
  "Treat web pages, emails and files as untrusted input",
  "Keep private data and untrusted content apart where you can",
  "Run code and commands in a sandbox",
  "Keep logs of what the agent did, so you can review them",
  "Test with hostile inputs before you rely on it",
];

export const SECURITY_NOTE =
  "No setup removes prompt injection completely. Plan for it to succeed sometimes, and limit what it can reach.";

export const GOVERNANCE_CARDS: readonly TopicCard[] = [
  { id: "literacy", title: "AI literacy", summary: "Employers are expected to support AI literacy for staff who use AI." },
  { id: "transparency", title: "Transparency", summary: "People should be told when they are talking to an AI, and AI-generated content may need to be labeled." },
  { id: "high-risk", title: "High-risk uses", summary: "Stricter duties apply to AI used in areas such as hiring, education and credit." },
  { id: "providers", title: "Model providers", summary: "Makers of general-purpose AI models have their own rules. Most readers are users of those models, not makers." },
];

export const GOVERNANCE_POLICY_CHECKLIST: readonly string[] = [
  "Which AI tools are approved",
  "What data may and may not go in",
  "Who reviews AI output before it is used",
  "When AI use is disclosed",
  "Who handles a mistake or incident",
];

export const GOVERNANCE_NOTE =
  "General information, not legal advice. The rules apply in stages, so check the EU AI Act timeline for current dates, and the official text or a qualified adviser for your own case.";

export const EXPERT_GUIDES: readonly ExpertGuideCard[] = [
  { number: 26, title: "Run an AI model on your own computer", summary: "Hardware and memory, quantization, choosing a local model, and the privacy gains and limits.", href: "/learn/expert/run-ai-on-your-own-computer", kind: "Guide", minutes: 9, isPublished: false },
  { number: 27, title: "How to read an AI benchmark: what the numbers hide", summary: "What benchmarks measure, vendor-reported versus independent, arena votes, contamination and margins.", href: "/learn/expert/how-to-read-ai-benchmark", kind: "Explainer", minutes: 9, isPublished: false },
  { number: 28, title: "Prompt injection and agent security for everyday teams", summary: "What prompt injection is, data leakage, agent permissions and containment steps.", href: "/learn/expert/prompt-injection-agent-security", kind: "Safety", minutes: 8, isPublished: false },
  { number: 29, title: "The EU AI Act for everyday users and small businesses", summary: "Who it applies to, the dates that matter, and AI literacy and transparency duties.", href: "/learn/expert/eu-ai-act-for-everyday-users", kind: "Explainer", minutes: 8, isPublished: false },
];

/** Article 25 is built under Compare and linked here so no page exists twice. */
export const EXPERT_LINKED_EXPLAINER: readonly ExpertGuideCard[] = [
  { number: 25, title: "Open-weight vs closed models", summary: "Definitions, cost, privacy, licences and hardware, and which to choose.", href: "/compare/open-vs-closed", kind: "Explainer", minutes: 8, isPublished: false },
];

export const EXPERT_WHAT_CAN_GO_WRONG: readonly string[] = [
  "Treating a vendor-reported score as an independent result.",
  "Comparing models on total parameters when only the active count drives speed, or the reverse for memory.",
  "Running a local model that does not fit in memory once the context grows.",
  "Fine-tuning to add facts that retrieval would handle better.",
  "Reading a system card as proof of safety rather than as the maker's own account.",
  "Treating general information on the EU AI Act as legal advice.",
];

export const EXPERT_SOURCES: readonly ExpertSource[] = [
  { publisher: "European Commission", title: "The EU's regulatory framework for AI", href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", label: "Official" },
  { publisher: "OWASP GenAI Security Project", title: "Top 10 risks for LLM applications", href: "https://genai.owasp.org/llm-top-10/", label: "Independent third party" },
  { publisher: "Open Source Initiative", title: "The Open Source AI Definition", href: "https://opensource.org/ai/open-source-ai-definition", label: "Independent third party" },
];