import type { BestForRoundup } from "../types";
import { DIRECTORY_LINK } from "../links";

export const openWeightsRoundup: BestForRoundup = {
  slug: "open-weights",
  label: "Open weights",
  level: "Levels 2-3",
  question: "Which open-weight models are worth downloading?",
  description:
    "Models whose weights you can download, with licence terms noted so you can check what you are allowed to do.",
  metaTitle: "Best open-weight AI models",
  metaDescription:
    "Open-weight AI models you can download: licences, size and hardware needs, API prices and scores. Ranked list follows our test run.",
  quickAnswer:
    "The directory lists MiMo-V2.6-Pro (MIT licence, score estimated), Kimi K3 (custom licence) and Qwen3.8 Max / 27B (the 27B is free to self-host). DeepSeek V4.1 Flash is also open-weight under an MIT licence. Open weights do not all mean small: Kimi K3 has 2.8 trillion parameters and DeepSeek V4.1 Flash is about 510 GB, so many of these are cheap to rent through an API but not realistic to run at home. Read the licence before you build a product.",
  whoItIsFor: [
    "Developers who want to host a model themselves or fine-tune it.",
    "Companies with rules about where data may go.",
    "Readers who want a cheaper API than the closed flagships.",
  ],
  startingPointIds: ["mimo-v2-6-pro", "kimi-k3", "qwen3-8-max-27b"],
  startingPointsNote:
    "Listed as open-weight in the model directory. A starting point, not a final ranking.",
  modelRoleNotes: {
    "mimo-v2-6-pro":
      "Listed as the top open-weight model under an MIT licence, the most permissive of the three. Its 73.6 score is an estimate.",
    "kimi-k3":
      "Strongest agentic claims among open models, but it uses a custom Kimi K3 licence and needs datacenter hardware.",
    "qwen3-8-max-27b":
      "The 27B version is Apache 2.0 and small enough for one 24 GB graphics card. The directory's score and API price are for Max.",
  },
  candidates: [
    {
      name: "DeepSeek V4.1 Flash",
      maker: "DeepSeek",
      role: "Open-weight model in our directory (labelled for cheap API use)",
      reportedFacts: [
        "MIT licence, 1M context, released Sep 10, 2026 (third-party roundup).",
        "About 510 GB of weights, so self-hosting needs a multi-GPU server.",
      ],
      watchOut: "Open weights, but not a laptop model. Most people will use the hosted API.",
    },
    {
      name: "Laguna S 2.1",
      maker: "Poolside",
      role: "Open model for a large workstation (not in the directory yet)",
      reportedFacts: [
        "118B parameters with 8B active, 1M context, released Jul 21, 2026 under the OpenMDW-1.1 licence (vendor and third-party roundup).",
        "Roughly 60 to 70 GB of weights at 4-bit before memory for context.",
      ],
      watchOut: "Needs a 96 to 128 GB unified-memory machine or a multi-GPU setup.",
    },
    {
      name: "Qwen3-Coder-Next",
      maker: "Alibaba",
      role: "Fast open coding model for a 64 GB laptop (not in the directory yet)",
      reportedFacts: [
        "80B parameters with only 3B active, Apache 2.0, released Feb 3, 2026 (third-party roundup).",
        "Official 4-bit build is about 48 GB.",
      ],
      watchOut: "Weaker than Qwen3.8-27B on hard repository tasks in vendor figures.",
    },
  ],
  candidatesNote:
    "Also worth checking. These are not in the model directory yet, so they have no BenchLM score here. Facts come from vendor posts and one third-party roundup, labelled as such.",
  decisionGuide: [
    {
      situation: "You want a licence you can build a product on with few limits.",
      advice: "Look at MIT and Apache 2.0 models first: MiMo-V2.6-Pro, DeepSeek V4.1 Flash and Qwen3.8 27B.",
    },
    {
      situation: "You want to run it on one graphics card.",
      advice: "Qwen3.8 27B is the realistic option. Most others need far more memory.",
    },
    {
      situation: "You want the strongest open agent model.",
      advice: "Kimi K3 is the one to test, through a hosted API. Read its custom licence with your legal team first.",
    },
    {
      situation: "You want to avoid sending data to a closed vendor.",
      advice: "Self-host a smaller model, or use a host whose terms you have checked. A hosted open model is still someone else's server.",
    },
  ],
  reportedFigures: [
    { subject: "MiMo-V2.6-Pro", measure: "BenchLM composite score", value: "73.6 (estimate)", label: "Independent", source: "BenchLM via our directory", asOf: "Oct 17, 2026" },
    { subject: "Kimi K3", measure: "BenchLM composite score", value: "69.9", label: "Independent", source: "BenchLM via our directory", asOf: "Oct 17, 2026" },
    { subject: "Qwen3.8 Max", measure: "BenchLM composite score", value: "69.7", label: "Independent", source: "BenchLM via our directory", asOf: "Oct 17, 2026" },
    { subject: "Kimi K3", measure: "Size", value: "2.8 trillion parameters, 104B active", label: "Third-party roundup", source: "DataCamp, citing the Hugging Face card", asOf: "Sep 25, 2026" },
    { subject: "Qwen3.8-27B", measure: "Terminal-Bench 2.1", value: "73.0%", label: "Vendor-reported", source: "Alibaba model card, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "DeepSeek V4.1 Flash", measure: "Terminal-Bench 2.1", value: "74.5% in Vals AI's run (90.6% vendor-reported)", label: "Independent", source: "Vals AI, via DataCamp", asOf: "Sep 25, 2026" },
  ],
  glossary: [
    {
      term: "Open weights",
      meaning: "The trained model files can be downloaded and run by you.",
      caution: "It is not the same as open source. The licence sets what you may do.",
    },
    {
      term: "MIT and Apache 2.0",
      meaning: "Permissive licences that allow commercial use with few conditions.",
      caution: "Keep the licence notice with your copy.",
    },
    {
      term: "Custom licence",
      meaning: "Terms written by the maker, such as the Kimi K3 License or OpenMDW-1.1.",
      caution: "Read it. It may limit uses, redistribution or large-scale deployment.",
    },
    {
      term: "Mixture of experts (MoE)",
      meaning: "A model with many specialist parts where only a few are active per token, so a huge model can run faster than its size suggests.",
      caution: "You still need memory for all the weights, not just the active ones.",
    },
  ],
  howWeWillRank: [
    "Licence terms read and summarised, so you know what commercial use is allowed.",
    "Quality on the same battery as closed models.",
    "The hardware needed to run each one yourself.",
    "Cost through a hosted API versus self-hosting.",
  ],
  selfTest: [
    { title: "Read the licence first", detail: "Check commercial use, redistribution and any user-count limits." },
    { title: "Try it through a hosted API", detail: "Test quality on your tasks before you buy hardware." },
    { title: "Check the file size", detail: "The weights file is a floor for memory. Add room for context." },
    { title: "Compare with a closed model", detail: "Run the same tasks on a closed mid-priced model to see whether the open one is good enough." },
  ],
  tips: [
    "Use the local memory estimator to size hardware before you download anything.",
    "Prefer 4-bit builds from a trusted source and verify the download.",
    "Keep a copy of the licence with your project.",
  ],
  commonMistakes: [
    "Assuming 'open' means 'free to use any way you like'.",
    "Downloading a huge model your hardware cannot hold.",
    "Trusting an estimated score as if it were published.",
  ],
  keepInMind: [
    "Open weights do not always mean an open licence. Read the licence before you build on a model.",
    "The MiMo score is an estimate, not a published figure.",
    "Self-hosting adds work: updates, security and hardware are your job.",
  ],
  faq: [
    { question: "Are open-weight models as good as closed ones?", answer: "On older coding tests, nearly. On the hardest agent tasks the closed frontier models still lead, and the strongest open models are very large." },
    { question: "Can I use an open model commercially?", answer: "Often yes, but check the licence. MIT and Apache 2.0 are permissive. Custom licences vary." },
    { question: "Is an open model private?", answer: "Only if you run it on your own machine. A hosted open model sends your text to the host." },
    { question: "Why does the directory list Qwen's API price?", answer: "The directory shows the Max model's API price. The 27B model is free to self-host and has a different context size." },
  ],
  sources: [
    { name: "Model directory", url: "/compare/models", note: "Open-weight labels, scores and prices as of Oct 17 and 21, 2026." },
    { name: "DataCamp: Best LLM for Coding in 2026", url: "https://www.datacamp.com/blog/best-llm-for-coding", note: "Third-party roundup dated Sep 25, 2026. Used for licences, sizes and hardware notes." },
  ],
  related: [
    { href: "/compare/open-vs-closed", label: "Open vs closed models" },
    { href: "/compare/best/local", label: "Best for local use" },
    { href: "/tools/local-model-memory", label: "Local model memory estimator" },
    DIRECTORY_LINK,
  ],
};