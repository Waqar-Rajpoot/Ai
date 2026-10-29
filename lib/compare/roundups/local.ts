import type { BestForRoundup } from "../types";
import { DIRECTORY_LINK } from "../links";

export const localRoundup: BestForRoundup = {
  slug: "local",
  label: "Local",
  level: "Levels 2-3",
  question: "Which model can I run on my own computer?",
  description:
    "Models that fit on a single graphics card, with the memory each one needs and what you gain in privacy.",
  metaTitle: "Best AI models to run locally",
  metaDescription:
    "AI models you can run on your own computer: memory needs, quantised file sizes, privacy gains and a setup outline. Ranked list follows our test run.",
  quickAnswer:
    "The directory lists the 27B version of Qwen3.8 as the best single-GPU local model, and it is free to self-host. Reported figures put the common 4-bit build at a single 16.5 GB file, which leaves room for a 32K context on a 24 GB graphics card. Bigger local options exist for larger machines, but most of the strongest open models are too large for home use. Running locally keeps your text on your machine, at the cost of the hosted flagship's size and speed.",
  whoItIsFor: [
    "People who cannot send documents or code to an outside service.",
    "Hobbyists with a gaming graphics card or a Mac with lots of memory.",
    "Anyone who wants to avoid per-token bills for light use.",
  ],
  startingPointIds: ["qwen3-8-max-27b"],
  startingPointsNote:
    "The 27B version is listed as the best single-GPU local model in the directory, and it is free to self-host. A starting point, not a final ranking.",
  modelRoleNotes: {
    "qwen3-8-max-27b":
      "Use the 27B version for local work. The score and API price in the directory are for Qwen3.8 Max, and the 27B has a 262K context, Apache 2.0 licence and about 16.5 GB 4-bit file.",
  },
  candidates: [
    {
      name: "Qwen3-Coder-Next",
      maker: "Alibaba",
      role: "Fast local coder for a 64 GB machine (not in the directory yet)",
      reportedFacts: [
        "80B total parameters but only 3B active per token, Apache 2.0, 262K context (third-party roundup).",
        "Official 4-bit build is about 48 GB, which suits a 64 GB Mac or CPU offload.",
      ],
      watchOut: "Quicker than a dense 27B, but weaker on hard single tasks in vendor figures.",
    },
    {
      name: "Laguna S 2.1",
      maker: "Poolside",
      role: "Local agent model for a 96 to 128 GB machine (not in the directory yet)",
      reportedFacts: [
        "118B parameters with 8B active, 1M context, OpenMDW-1.1 licence (vendor and third-party roundup).",
        "Roughly 60 to 70 GB at 4-bit before context memory.",
      ],
      watchOut: "A 24 GB graphics card cannot hold it. Thinking mode produces long outputs.",
    },
  ],
  candidatesNote:
    "Other local options from third-party coverage. They are not in the directory, so no BenchLM score is shown.",
  decisionGuide: [
    {
      situation: "You have one 24 GB graphics card.",
      advice: "Run Qwen3.8 27B at 4-bit. Keep context near 32K to stay inside memory.",
    },
    {
      situation: "You have a 64 GB laptop with unified memory.",
      advice: "Look at Qwen3-Coder-Next. Its small active size keeps it fast.",
    },
    {
      situation: "You have 96 to 128 GB of memory.",
      advice: "Laguna S 2.1 is a candidate, and it has a 1M context.",
    },
    {
      situation: "You only have 8 to 16 GB.",
      advice: "Choose a much smaller model. The ones above will not fit, and quality drops with size.",
    },
    {
      situation: "Privacy is the only reason to go local.",
      advice: "Check that your tool does not send telemetry or prompts elsewhere. Local software can still phone home.",
    },
  ],
  reportedFigures: [
    { subject: "Qwen3.8-27B", measure: "4-bit file size (UD-Q4_K_M)", value: "16.5 GB", label: "Third-party roundup", source: "DataCamp, citing Unsloth's GGUF", asOf: "Sep 25, 2026" },
    { subject: "Qwen3.8-27B", measure: "Native context", value: "262,144 tokens", label: "Vendor-reported", source: "Alibaba model card, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Qwen3.8-27B", measure: "Terminal-Bench 2.1", value: "73.0%", label: "Vendor-reported", source: "Alibaba model card, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Qwen3.8-27B", measure: "LiveCodeBench v6", value: "90.3%", label: "Vendor-reported", source: "Alibaba model card, via DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Qwen3-Coder-Next", measure: "4-bit file size", value: "About 48 GB", label: "Third-party roundup", source: "DataCamp", asOf: "Sep 25, 2026" },
    { subject: "Laguna S 2.1", measure: "Memory at 4-bit (weights only)", value: "About 60 to 70 GB", label: "Third-party roundup", source: "DataCamp", asOf: "Sep 25, 2026" },
  ],
  glossary: [
    {
      term: "Quantisation (4-bit)",
      meaning: "Storing a model's numbers with fewer bits so it fits in less memory.",
      caution: "It saves memory and costs a little quality. Lower bit counts cost more.",
    },
    {
      term: "GGUF",
      meaning: "A common file format for running models locally with tools such as llama.cpp, Ollama and LM Studio.",
      caution: "Download from a source you trust and check the file name matches the model.",
    },
    {
      term: "VRAM",
      meaning: "The memory on your graphics card. A model's weights must fit here for fast speed.",
      caution: "The file size is a floor. You also need room for the context (the conversation so far).",
    },
    {
      term: "Dense versus mixture of experts",
      meaning: "A dense model uses all its parts for every word. A mixture-of-experts model uses only a few.",
      caution: "Mixture-of-experts models run faster but still need memory for all weights.",
    },
  ],
  howWeWillRank: [
    "Memory needed at common settings, checked against real graphics cards.",
    "Speed in tokens per second on a single consumer card.",
    "Quality compared with the same family's hosted model.",
    "Setup effort for a first-time user.",
  ],
  selfTest: [
    { title: "Find your memory number", detail: "Check your graphics card memory, or the unified memory on a Mac." },
    { title: "Size the model", detail: "Use our local model memory estimator to check weights plus context." },
    { title: "Download a 4-bit build", detail: "Take it from a trusted publisher and note the file size." },
    { title: "Serve it and test", detail: "Run it with a tool such as llama.cpp, Ollama or LM Studio and try five of your real tasks." },
    { title: "Compare with a hosted model", detail: "Run the same tasks on a hosted mid-priced model to decide whether local is good enough." },
  ],
  tips: [
    "Keep context short. Memory use grows with it.",
    "Close other programs that use graphics memory before you load a model.",
    "Start with a smaller model to confirm your setup works.",
  ],
  commonMistakes: [
    "Downloading a model whose file already fills your memory, leaving none for context.",
    "Using the hosted model's score for the small local version.",
    "Assuming local means private without checking your tools.",
  ],
  keepInMind: [
    "Running locally keeps your text on your machine, but you give up the hosted model's size and speed.",
    "The directory's score and price are for Qwen3.8 Max. The 27B version has a 262K context.",
    "A local 27B model is weaker than the frontier models, and it will retry more on long tasks.",
  ],
  faq: [
    { question: "Can I run a local model on a laptop?", answer: "Yes, if it has enough memory. A 64 GB unified-memory Mac suits mixture-of-experts models. Small laptops need much smaller models." },
    { question: "Is local always more private?", answer: "The model runs on your machine, so prompts need not leave it. Check the software you use for telemetry and cloud features." },
    { question: "Does it cost anything to run?", answer: "The weights can be free, but you pay for hardware and electricity." },
    { question: "Why only one model in the starting points?", answer: "The directory lists one as the best single-GPU local model. Others in third-party coverage are shown under tools to test." },
  ],
  sources: [
    { name: "Model directory", url: "/compare/models", note: "Local label for Qwen3.8 27B, as of Oct 17, 2026." },
    { name: "DataCamp: Best LLM for Coding in 2026", url: "https://www.datacamp.com/blog/best-llm-for-coding", note: "Third-party roundup dated Sep 25, 2026. Used for file sizes, hardware notes and licences." },
  ],
  related: [
    { href: "/tools/local-model-memory", label: "Local model memory estimator" },
    { href: "/compare/best/open-weights", label: "Best open-weight models" },
    { href: "/compare/open-vs-closed", label: "Open vs closed models" },
    DIRECTORY_LINK,
  ],
};