export interface TermEntry {
  term: string;
  meaning: string;
}

export interface ReaderPath {
  id: string;
  title: string;
  who: string;
  points: readonly string[];
  link: { href: string; label: string };
}

export interface StepEntry {
  title: string;
  detail: string;
}

export interface DeviceGuide {
  title: string;
  summary: string;
  goodFor: string;
  watchOut: string;
}

export interface FindMemoryEntry {
  system: string;
  steps: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  parametersBillions: number;
  precisionId: string;
  contextTokens: number;
  story: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface LinkEntry {
  title: string;
  href: string;
  note: string;
}

export const SHORT_ANSWER: readonly string[] = [
  "Rule of thumb: memory in GB is about the model's size in billions of parameters times the bytes each one takes. A 27B model at 4 bits (half a byte) has 13.5 GB of weights. Add about 20% for the runtime and you get roughly 16 GB.",
  "Context costs extra. The longer the conversation or document, the bigger the model's working memory (the context cache). Short chats add little. A book-length prompt can add as much as the model itself.",
  "Total size sets memory, active size sets speed. A mixture-of-experts model must hold every expert in memory, even though only some work on each token.",
  "Fit comes first, speed second. If the model does not fit in fast memory (graphics-card memory, or a Mac's unified memory), it will not load or will run far slower.",
  "This is an estimate. Real files and apps differ by a gigabyte or more. Leave headroom.",
];

export const READER_PATHS: readonly ReaderPath[] = [
  {
    id: "beginners",
    title: "I just want to try a local chatbot",
    who: "No technical background, a normal laptop or desktop",
    points: [
      "Find your memory first (see the next section). Use the larger of your graphics-card memory or your total RAM.",
      "Start with a 3B to 8B model at 4-bit (Q4_K_M). That is the safest first try on most computers.",
      "Pick a result marked \"fits comfortably\". Tight fits tend to fail once other apps are open.",
      "Free apps such as Ollama and LM Studio download and run models for you.",
      "Expect local models to be less capable than the biggest hosted ones. Our local roundup shows which ones are worth it.",
    ],
    link: { href: "/compare/best/local", label: "See the best local models" },
  },
  {
    id: "builders",
    title: "I am planning a build or a purchase",
    who: "Power users, developers and small teams choosing hardware",
    points: [
      "Enter the context length you will really use, not the model's maximum.",
      "Memory capacity decides what runs. Memory bandwidth decides how fast. Check both.",
      "Each simultaneous chat has its own context cache, so a shared server needs more.",
      "For mixture-of-experts models, plan memory for the total size and speed for the active size.",
      "Test on your own tasks before you buy hardware around a model.",
    ],
    link: { href: "/learn/expert/run-ai-on-your-own-computer", label: "Read the full guide to running AI on your computer" },
  },
  {
    id: "privacy",
    title: "I care about privacy or licences",
    who: "Privacy-minded readers, IT leads and compliance teams",
    points: [
      "A local model keeps your prompts on your machine by default. Check the app's settings for telemetry and any cloud features.",
      "Open weights are not the same as open source. Read the licence before commercial use.",
      "Local does not mean unsafe-proof: downloaded model files and tools should come from sources you trust.",
      "Hosted and local models can be compared on cost and privacy in one place.",
    ],
    link: { href: "/compare/open-vs-closed", label: "Compare open-weight and closed models" },
  },
];

export const FIND_MEMORY: readonly FindMemoryEntry[] = [
  { system: "Windows", steps: "Press Ctrl+Shift+Esc to open Task Manager. Under Performance, GPU shows \"Dedicated GPU memory\" and Memory shows your RAM." },
  { system: "Mac", steps: "Open the Apple menu, choose About This Mac, and read Memory. On Apple Silicon that one number is shared by the CPU and GPU." },
  { system: "Linux", steps: "Run nvidia-smi to see NVIDIA graphics-card memory, and free -h to see RAM." },
];

export const FORMULA_STEPS: readonly StepEntry[] = [
  { title: "Weights", detail: "Parameters are the numbers a model learned in training. Each is stored with some precision. Memory for weights is parameters times bytes per parameter. In billions that equals GB directly: 8B at 2 bytes is 16 GB." },
  { title: "Safety margin", detail: "The software needs scratch space for calculations, buffers and drivers. We add 20% of the weights. Real overhead varies by app, so treat this as a sensible default, not a measurement." },
  { title: "Context cache (KV cache)", detail: "While answering, the model keeps keys and values for every earlier token so it does not recompute them. Per token that is 2 x layers x KV heads x head size x bytes per value. Multiply by the number of tokens in the context." },
  { title: "Compare with usable memory", detail: "Not all memory counts. A graphics card keeps some for the display, a PC for the operating system, and a Mac limits how much the GPU may use by default. We subtract these before judging the fit." },
  { title: "Speed ceiling", detail: "Each new token reads all the active weights once, so speed cannot exceed memory bandwidth divided by the active weights in GB. Real speeds are lower because of other work and software overhead." },
];

export const DEVICE_GUIDES: readonly DeviceGuide[] = [
  {
    title: "Graphics card (VRAM)",
    summary: "Fast memory on the card itself. The model and its cache must fit there for full speed.",
    goodFor: "The best speed per pound or dollar for models that fit.",
    watchOut: "VRAM is fixed and often 8 to 24 GB. If the model does not fit, apps can spill layers into system RAM, which runs but is much slower.",
  },
  {
    title: "Apple Silicon (unified memory)",
    summary: "The CPU and GPU share one pool, so a Mac with lots of memory can hold models a graphics card cannot.",
    goodFor: "Large models in a quiet, low-power machine.",
    watchOut: "macOS limits the GPU's share by default, and memory cannot be added later. Bandwidth differs a lot between chips.",
  },
  {
    title: "PC memory (RAM, CPU only)",
    summary: "The cheapest memory to add. The processor runs the model without a graphics card.",
    goodFor: "Trying small models with no special hardware, and privacy-first use.",
    watchOut: "Typical desktop memory is several times slower than a graphics card, so larger models feel sluggish.",
  },
];

export const MIXTURE_OF_EXPERTS_POINTS: readonly string[] = [
  "A mixture-of-experts model splits its layers into many \"experts\" and uses only a few of them for each token.",
  "Names often show both sizes, such as 30B-A3B: 30 billion parameters in total, about 3 billion active per token.",
  "Memory follows the total (30B), because any expert may be needed next.",
  "Speed follows the active size (3B), so these models can feel fast for their size once they fit.",
  "In the estimator, tick the mixture-of-experts box and enter the active size to get the right speed ceiling.",
];

export const WORKED_EXAMPLES: readonly WorkedExample[] = [
  { id: "small", title: "A small everyday assistant", parametersBillions: 8, precisionId: "q4_k_m", contextTokens: 8_192, story: "A common first choice for laptops and mid-range graphics cards." },
  { id: "rule", title: "The 27B rule-of-thumb example", parametersBillions: 27, precisionId: "q4_ideal", contextTokens: 8_192, story: "13.5 GB of weights plus a 20% margin gives about 16 GB before any context. This is the simple half-a-byte rule." },
  { id: "real-file", title: "The same 27B as a real 4-bit file", parametersBillions: 27, precisionId: "q4_k_m", contextTokens: 8_192, story: "Real 4-bit files store extra scale values, so they are larger than the half-byte rule suggests." },
  { id: "long-context", title: "A small model with a very long context", parametersBillions: 8, precisionId: "q4_k_m", contextTokens: 131_072, story: "Same model as the first row, but the context cache now outweighs the weights." },
  { id: "big", title: "A large model for a workstation", parametersBillions: 70, precisionId: "q4_k_m", contextTokens: 8_192, story: "Beyond almost every single graphics card, but within reach of a Mac with plenty of memory." },
];

export const GOTCHAS: readonly string[] = [
  "The file size on the download page is the best guide to the weights. Use it to check this estimate.",
  "The app's default context may be smaller than the model's maximum. Raising it raises memory use.",
  "Other apps use memory too. Browsers and games can take several GB.",
  "Vision models carry an extra image encoder, and images count against the context.",
  "Several chats at once each need their own context cache.",
  "Memory labels use GB loosely. We use 1 GB as one billion bytes, and the safety margin covers the small gap.",
  "Spilling into disk swap is extremely slow. Treat \"too big\" as a real limit.",
  "Quantization quality differs by model and task. Test on your own tasks before you commit.",
];

export const FAQ: readonly FaqEntry[] = [
  { question: "How much memory do I need for an 8B model?", answer: "Roughly 6 to 7 GB at 4-bit with an 8K context. At 16-bit it is nearer 20 GB. The tables above show the weights for each precision." },
  { question: "Can I run a model bigger than my graphics-card memory?", answer: "Yes. Apps can keep some layers in system RAM, but every token then waits on the slower memory, so speeds drop a lot." },
  { question: "What matters more, memory size or speed?", answer: "Size decides whether a model runs at all. Bandwidth decides how fast it answers. Buy capacity first, then bandwidth." },
  { question: "Does quantization make the model worse?", answer: "Usually only a little at 5 to 8 bits, slightly more at 4 bits, and clearly more at 2 to 3 bits. Smaller models lose more than larger ones. Test on your own tasks." },
  { question: "Why is my real memory use different?", answer: "Software, context length, cache precision, vision encoders and parallel chats all change it. Use this as a plan, then check the app's own readout." },
  { question: "Does this cover training or fine-tuning?", answer: "No. Training needs far more memory than running. Full fine-tuning with common optimizers is often quoted at around 16 bytes per parameter, while methods such as LoRA and QLoRA need much less." },
  { question: "Do I need a graphics card?", answer: "No. Small models run on a modern CPU. A graphics card or a Mac with lots of memory makes larger models practical." },
  { question: "Are local models as good as hosted ones?", answer: "It depends on the task and the model. Open-weight models have closed part of the gap, but check our reviews and test on your own work." },
  { question: "Is a local model private?", answer: "Prompts stay on your machine by default. Check the app's telemetry and cloud settings, and only download models from sources you trust." },
  { question: "Why does the page show two 4-bit options?", answer: "The half-byte rule is a simple ideal. Real 4-bit files are about 20% larger because they store scale values. Use the real-file option for planning." },
];

export const GLOSSARY: readonly TermEntry[] = [
  { term: "Parameter", meaning: "One learned number inside a model. \"27B\" means 27 billion of them." },
  { term: "Weights", meaning: "All the parameters stored in memory. This is the biggest part of a model's footprint." },
  { term: "Precision", meaning: "How many bits are used to store each weight. Fewer bits mean a smaller model and some loss of accuracy." },
  { term: "Quantization", meaning: "Compressing weights to fewer bits, for example from 16 to 4, so a model fits in less memory." },
  { term: "Context window", meaning: "How much text the model can consider at once, counted in tokens." },
  { term: "KV cache", meaning: "The model's working memory of the conversation so far. It grows with every token." },
  { term: "VRAM", meaning: "The fast memory on a graphics card." },
  { term: "Unified memory", meaning: "One memory pool shared by the CPU and GPU, as on Apple Silicon." },
  { term: "Memory bandwidth", meaning: "How fast data moves between memory and the processor, in GB per second. It caps generation speed." },
  { term: "Mixture-of-experts (MoE)", meaning: "A design that uses only some of its parameters for each token. Memory follows the total, speed follows the active part." },
  { term: "Offloading", meaning: "Keeping part of a model in slower memory because it does not fit in the fast memory." },
  { term: "Open weights", meaning: "The trained weights can be downloaded and run. Not always the same as open source, so read the licence." },
];

export const METHOD_NOTES: readonly string[] = [
  "Calculated, not measured. Nothing on this page was benchmarked on hardware.",
  "Bits per weight for quantized files are approximate figures for common llama.cpp-style formats and vary slightly by model.",
  "Layer layouts come from the public model cards of widely used open models of each size. Your model may differ, and the advanced option lets you enter its real numbers.",
  "The 20% safety margin, the 1 GB and 4 GB system reservations and the Mac GPU share are planning defaults, not guarantees.",
  "Device memory sizes and bandwidths are published peak figures. Real bandwidth is lower.",
  "Where this page and your model's own download page disagree, trust the download page.",
];

export const SOFTWARE_LINKS: readonly LinkEntry[] = [
  { title: "Ollama", href: "https://ollama.com", note: "Download and run models from a simple app or command line." },
  { title: "LM Studio", href: "https://lmstudio.ai", note: "A desktop app with a model browser and chat window." },
  { title: "llama.cpp", href: "https://github.com/ggml-org/llama.cpp", note: "The open-source engine behind many local apps and the Q4_K_M style formats." },
  { title: "Hugging Face models", href: "https://huggingface.co/models", note: "Model cards list sizes, layers and licences." },
];