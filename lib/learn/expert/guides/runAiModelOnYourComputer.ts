import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { EXPERT_SOURCES as SOURCES } from "../expertSources";

export const runAiModelOnYourComputer: GuideRecord = {
  slug: "run-ai-on-your-own-computer",
  number: 26,
  level: "expert",
  kind: "guide",
  title: "Run an AI model on your own computer",
  metaDescription:
    "How to run an open AI model on your own computer: what you need, how to estimate memory from model size and quantization, which tools to use, and what to check.",
  cardSummary: "What a local model needs, how to estimate memory, which tools run one, and what to check first.",
  summaryPoints: [
    "Running a model locally means the model file sits on your computer and your computer does the work. You choose the model and where your text goes.",
    "Memory is the main limit. A rough size for the model file is parameters times bits per weight, divided by 8, and you need extra room on top.",
    "Quantization shrinks a model by storing each weight in fewer bits, usually at some cost in quality. Test it on your own tasks.",
    "Download models and installers only from sources you trust, and read the model's licence before you use it for work.",
  ],
  sections: [
    {
      id: "why-local",
      heading: "Why run a model locally",
      paragraphs: [
        "People run models on their own machines for three main reasons. One is control: you choose the model and it does not change underneath you. Another is privacy: when the model runs on your computer, the text you give it is processed there. A third is working offline or avoiding charges for each request.",
        "The trade-offs are real. A model small enough for your computer is usually smaller than the largest hosted models, so it may do some tasks less well. You also take on the setup, the updates and the electricity. Treat a local model as a tool to test against your own tasks, not as a free replacement for a hosted one.",
        "Check that the model you start really runs on your machine. Some tools can also connect to hosted models, and text sent to those leaves your computer.",
      ],
    },
    {
      id: "what-you-need",
      heading: "What you need: memory first",
      paragraphs: [
        "A model is a very large set of numbers called weights. To generate text, a computer has to hold those weights in fast memory, so the size of the file is the first thing that decides whether a model will run. Models are described by the number of parameters, which is the same as the number of weights. A 7-billion-parameter model is often called 7B.",
        "The Hugging Face documentation for the GGUF format, which many local tools use, lists how many bits each quantization type stores per weight. For example, it lists Q4_K at about 4.5 bits per weight, Q6_K at about 6.56 and Q2_K at 2.625. That gives a simple estimate of the weights alone.",
      ],
      bullets: [
        "Weights in bytes = parameters × bits per weight ÷ 8.",
        "7 billion parameters at about 4.5 bits per weight: 7 × 4.5 ÷ 8 comes to about 3.9 GB.",
        "7 billion parameters at about 6.56 bits per weight: about 5.7 GB.",
        "70 billion parameters at about 4.5 bits per weight: about 39 GB.",
      ],
      sourceIds: [SOURCES.huggingFaceGguf.id],
    },
    {
      id: "headroom",
      heading: "Leave headroom",
      paragraphs: [
        "The weights are not the whole bill. The model also needs memory for the text it is working on, which grows as the context gets longer, and the app and your operating system need memory too. The size of that extra depends on the tool, the model and the context length, so we do not give a single figure. Use the local model memory estimator for a fuller estimate and leave a comfortable margin.",
        "Where the memory sits also matters. A graphics card has its own memory, and a model that fits there usually runs faster than one that has to spill into ordinary system memory. If the model does not fit, pick a smaller model or a more compressed version.",
      ],
    },
    {
      id: "quantization",
      heading: "Quantization: smaller files, some trade-offs",
      paragraphs: [
        "Quantization stores each weight in fewer bits, so the file is smaller. The Hugging Face page lists formats from 32-bit numbers down to 2-bit and even 1-bit and ternary types. Fewer bits mean a smaller file and less memory. In general the more a model is compressed, the more its answers can change, so the lowest setting is not automatically the best choice.",
        "How much quality you lose differs by model and by task. We have not measured it, and published scores for a model usually describe its original form, not a compressed copy. Test the version you actually plan to run, as in our guide on building a personal test set.",
      ],
      sourceIds: [SOURCES.huggingFaceGguf.id],
    },
    {
      id: "tools",
      heading: "Tools that run models for you",
      paragraphs: [
        "You do not need to write code. Ollama's README describes it as a way to get started with open models and says it provides a REST API for running and managing them, with llama.cpp listed as a supported backend. You install it from the official download page for your system, then run a model by name, for example with the command ollama run followed by the model name. The Hugging Face page lists llama.cpp, LM Studio, GPT4All and Ollama as tools that work with the GGUF format.",
        "Tools and model names change quickly, so follow the current instructions on each project's own page. Some install guides ask you to paste a command that downloads and runs a script. That runs code on your computer, so prefer the official installer download, and only run a script from the project's own page after you have read it.",
      ],
      sourceIds: [SOURCES.ollamaReadme.id, SOURCES.huggingFaceGguf.id],
    },
    {
      id: "setup-routine",
      heading: "A routine for your first local model",
      steps: [
        {
          title: "Check your hardware",
          detail: "Note how much memory your computer has, and whether you have a graphics card and how much memory it has. Your operating system's system information screen shows both.",
        },
        {
          title: "Pick a size that fits with room to spare",
          detail: "Work out the weight size with the formula above, add a margin, and start with a smaller model than you think you can fit.",
        },
        {
          title: "Install a tool from its official page",
          detail: "Download from the project's own site or repository, not from a link in an advert or a forum post.",
        },
        {
          title: "Read the model's licence",
          detail: "Licences differ. Some limit commercial use or set other conditions. Check before you use the model for work or build it into a product.",
        },
        {
          title: "Run your personal test set",
          detail: "Run the same ten tasks you use for hosted models. Compare scores, speed and how often it needs a retry.",
        },
        {
          title: "Decide where it fits",
          detail: "A local model may suit private or high-volume work, while a hosted model may suit hard tasks. Keep the split under review.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "pick-model-size",
      title: "Work out which model size fits",
      whenToUse: "After you have noted your computer's memory.",
      text: "My computer has [amount] of system memory and a graphics card with [amount] of memory, or none. I want to run a local language model for [kind of task]. Using this formula: weights in GB = parameters in billions × bits per weight ÷ 8, show the file size for a 3B, 7B and 14B model at 4.5 bits per weight and tell me which are likely to fit with a safe margin. Explain what you assumed.",
    },
    {
      id: "licence-check",
      title: "Understand a model licence",
      whenToUse: "Before you use a downloaded model for work.",
      text: "Here is the licence text of a model I want to use: [paste licence text]. In plain language, list what I am allowed to do, what is restricted, and anything I must include or credit. Say clearly where you are unsure and I should ask a lawyer.",
    },
    {
      id: "local-vs-hosted",
      title: "Decide what to run locally",
      whenToUse: "When you have a list of tasks and want to split them.",
      text: "Here are tasks I do with AI: [list, no private details]. For each, say whether it involves private material, how hard it is, and how often I run it. Then suggest whether it is a good candidate for a local model or better kept on a hosted model, with one reason each.",
    },
  ],
  whatCanGoWrong: [
    "Choosing a model that only just fits, so the computer slows down or the tool fails once the context grows.",
    "Downloading a model or installer from an unofficial source, which can run harmful code or give you something other than you expected.",
    "Assuming everything stays on your computer when the tool is set up to use a hosted model.",
    "Using a model for work without reading its licence.",
    "Trusting published scores for a heavily compressed copy that was not the version tested.",
  ],
  limitsNote:
    "Tools, model names and memory needs change quickly. This guide explains the method and uses a formula for the weights only. Check each project's own page for current instructions.",
  showPriceNotice: false,
  sources: [SOURCES.huggingFaceGguf, SOURCES.ollamaReadme],
  relatedSlugs: ["open-vs-closed", "build-your-own-ai-test-set", "context-windows-tokens-memory", "never-share-with-ai-chatbot"],
  relatedLinks: [LINKED_PAGES.localModelMemory, LINKED_PAGES.openVsClosed, LINKED_PAGES.modelDirectory, LINKED_PAGES.expertHub],
  lastReviewed: "2026-10-27",
  published: true,
};
