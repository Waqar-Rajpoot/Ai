import type { ReviewEditorial } from "./reviewTypes";

const OPUS_DOCS = "https://platform.claude.com/docs/en/models/opus-5-5/overview";

/**
 * Hand-written content per model id (the route slug). Every claim traces to
 * the BenchLM snapshot, the evidence data or the directory row.
 *
 * To publish a tested review, add a `testRun` and a `verdict` to the entry.
 * The test table fills in and the verdict replaces the interim one.
 */
export const REVIEW_EDITORIAL: Readonly<Record<string, ReviewEditorial>> = {
  "claude-opus-5-5": {
    whatItDoes:
      "Anthropic's all-round flagship, released September 22, 2026, with a 1M-token context window, 128K standard output and text and image input. It is a reasoning model, priced below Opus 5 ($5 / $25) at $4 / $20.",
    bestFor: [
      "Coding agents, browser research and computer-use work: BenchLM ranks it first of 135 in agentic and first of 156 in coding.",
      "Knowledge-heavy work: first of 179 in knowledge.",
      "Document parsing: best verified ParseBench result (78.89%).",
    ],
    caveats: [
      "Long-context graph traversal is a weak spot: 66.8% on GraphWalks BFS 256K–1M, against 96.2% for the best model.",
      "Computer use on OSWorld 2.0 is 48.7% against 79.6% for the best model, and AutomationBench is 40.0% against 62.2%.",
      "BenchLM has displayable evidence for 66 of 782 tracked benchmark slots, so some categories are unmeasured.",
    ],
    interimVerdict:
      "On independent data this is the strongest all-rounder in our directory: second of 216 on BenchLM (86.29) and first in agentic, coding and knowledge, at $4 / $20. It costs twice as much as GPT-6.1 Sol or Claude Sonnet 5.5, so use it where the extra capability shows up on your own tasks.",
    pricingExtras: {
      cachedInputPerMillion: 0.2,
      batchDiscountPercent: 50,
      maxOutputLabel: "128K standard output",
      sourceUrl: OPUS_DOCS,
      asOf: "2026-10-29",
    },
    availability: [
      { text: "Claude API, Amazon Bedrock, Google Cloud, Microsoft Foundry and Claude Platform on AWS.", sourceUrl: OPUS_DOCS },
      { text: "DeepInfra and OpenRouter list it at the same $4 / $20 rate (read October 20, 2026).", sourceUrl: "https://benchlm.ai/models/claude-opus-5-5" },
    ],
    consumerPlanNote: "Reported to be available on Claude plans from Pro through Enterprise.",
    safetyNotes: [
      { text: "Anthropic published a system card for Claude Opus 5.5.", sourceUrl: "https://www.anthropic.com/claude-opus-5-5-system-card" },
      {
        text: "Prompt injection: 1.0% attack success at 15 attempts on Gray Swan's indirect prompt-injection test. The best result is 0.0% (Gemini 4 Carbon).",
        sourceUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/",
      },
    ],
  },
  "gpt-6-1-sol": {
    whatItDoes:
      "OpenAI's value pick near the frontier: a 1.05M-token context window at $2 / $10, released in September 2026. It is reported to sit in OpenAI's Work and Codex products rather than the standard chat app.",
    bestFor: [
      "Document extraction: best verified ExtractBench result (95.31%).",
      "Hard maths: 100% on FrontierMath v2 Tier 4.",
      "Near-frontier quality at half Opus 5.5's list price: 85.27 on BenchLM at $2 / $10.",
    ],
    caveats: [
      "Behind Opus 5.5 on agent benchmarks: 73.9% vs 76.7% on Hermes Bench and 57.1% vs 63.3% on Hermes Index.",
      "ParseBench is 69.70%, 9.2 points behind the best result.",
      "Reported to be in Work and Codex rather than the main chat app, so check access before planning around it.",
    ],
    interimVerdict:
      "The best price-to-score position among the directory's top scorers: 85.27 (fourth of 216) at $2 / $10. It leads on extraction and Tier 4 maths and trails Opus 5.5 on agent tasks. OpenAI's own per-task estimate ($5.47 against $23.21 for Opus 5.5) is a vendor figure worth checking on your workload.",
    availability: [
      { text: "Reported to be available in OpenAI's Work and Codex products.", sourceUrl: "https://worldngayon.com/llm-leaderboard-2026/" },
    ],
  },
  "gpt-6-astra": {
    whatItDoes:
      "OpenAI's premium model for maths, science and research, with a 1.05M-token context window at $10 / $50.",
    bestFor: [
      "Abstract reasoning and maths: best verified ARC-AGI-2 (95%) and FrontierMath v2 Tiers 1–3 (93.7%).",
      "Hard coding and science tasks: best verified FrontierSWE v2 (65.5%) and STEMBench120.",
      "Broad suites: LiveBench has it second overall at 86.1, with 92.7 in coding and 93.7 in browser use.",
    ],
    caveats: [
      "Costs 2.5 times Opus 5.5's list price for a slightly lower BenchLM score (86.07 vs 86.29).",
      "Two of its best rows (FrontierCode 1.1 Extended, Terminal-Bench-Science) are vendor-reported, not independent.",
    ],
    interimVerdict:
      "Choose Astra when maths, science or abstract reasoning is the job: it holds several of the best verified results in BenchLM's catalog. For general work, Opus 5.5 scores slightly higher for less than half the price, so Astra needs a specific reason.",
  },
  "claude-fable-5-1": {
    whatItDoes:
      "Anthropic's premium model for the hardest agentic coding ($10 / $50, 1M context). It shares its underlying model with Anthropic's Mythos tier, with extra safeguards for biology, cybersecurity and LLM research.",
    bestFor: [
      "Broad suites: LiveBench ranked it first overall at 88.0 on October 21.",
      "Knowledge and agentic work: it led BenchLM's knowledge (86.7) and agentic (80.2) boards in September.",
      "Long, difficult agentic coding runs where cost is secondary.",
    ],
    caveats: [
      "It led BenchLM's overall table on September 4 (82.95) but is seventh on October 29 (81.08) after newer releases.",
      "Five times Sonnet 5.5's list price, while Sonnet 5.5 scores 0.76 points higher on BenchLM overall.",
    ],
    interimVerdict:
      "Fable 5.1 still tops some broad and agentic boards, but on BenchLM's latest overall table it sits seventh, behind cheaper models. The premium price makes sense only if your own agentic-coding tests show a clear gap over Opus 5.5 or Sonnet 5.5.",
    safetyNotes: [
      { text: "Same underlying model as Anthropic's Mythos 5.1, with additional safety measures for biology, cybersecurity and LLM research and development. Check Anthropic's documentation for the details." },
    ],
    limitsNotes: [
      {
        text: "Availability history: Anthropic suspended access to Claude Fable 5 and Mythos 5 on June 12, 2026 to comply with U.S. export controls, and restored it on July 1, 2026.",
        sourceUrl: "https://www.anthropic.com/news/fable-mythos-access",
      },
    ],
  },
  "claude-sonnet-5-5": {
    whatItDoes:
      "Anthropic's everyday coding and knowledge-work model, released September 28, 2026 at $2 / $10 with a 1M-token context window. Anthropic says it is more than 30% faster than Sonnet 5 at the same price.",
    bestFor: [
      "Terminal and agentic coding: 70.6% on Terminal-Bench 4.0, first of 97 models and ahead of Opus 5.5 (66.4%).",
      "IDE-style coding: 55.5% on CursorBench 4.0, second of 47.",
      "Everyday knowledge work at a mid-tier price: best verified Chartography with tools (90.2%) and HealthBench raw (69.4%).",
    ],
    caveats: [
      "GPT-6.1 Sol and Gemini 4 Argon both score higher on BenchLM overall at the same list price (85.27 and 82.28 vs 81.84).",
      "The Terminal-Bench and Chartography figures are vendor-reported.",
      "Sources disagree on the cached-input price ($0.20 vs $0.10 per million). Confirm it before planning around caching.",
    ],
    interimVerdict:
      "A strong coding-first mid-tier model: first on Terminal-Bench 4.0 and second on CursorBench 4.0 at $2 / $10, with a 13.5-point BenchLM jump over Sonnet 5 (80.49 vs 66.98 in September's comparison). On the overall score, Sol and Argon beat it at the same price, so pick Sonnet for coding workflows rather than for general value.",
    safetyNotes: [
      {
        text: "Anthropic published a system card for Claude Sonnet 5.5.",
        sourceUrl: "https://www-cdn.anthropic.com/870c8f525702625d2c62fc6dd04c857e3250bec1/Claude%20Sonnet%205.5%20System%20Card.pdf",
      },
    ],
  },
  "gemini-4-argon": {
    whatItDoes:
      "Google's complex-reasoning model, globally available from October 13, 2026, at an introductory $2 / $10 through November 30, 2026, with a 1M-token context window. It is reported to run in the Gemini app and Antigravity.",
    bestFor: [
      "Reasoning-heavy work at a mid-tier price: statistically level with GPT-6.1 Sol in gradually.ai's reasoning ranking.",
      "Teams already on Google's tools (Gemini app, Antigravity).",
      "Short-term cost: the introductory rate matches Sol's price.",
    ],
    caveats: [
      "The $2 / $10 rate is introductory and ends November 30, 2026. Plan for the standard rate.",
      "Google's newer Gemini 4 Carbon (released October 28) now leads BenchLM at 88.38.",
      "Second on BenchLeader (71.0) but fifth on BenchLM, so its rank depends on the test used.",
    ],
    interimVerdict:
      "A good mid-priced reasoning option today: fifth on BenchLM (82.28), above Sonnet 5.5 at the same price. The introductory rate expires November 30 and Google now has a higher-scoring Carbon model, so don't lock in cost assumptions yet.",
    availability: [
      { text: "Reported to run in the Gemini app and Antigravity.", sourceUrl: "https://worldngayon.com/llm-leaderboard-2026/" },
    ],
  },
  "gemini-3-8-flash": {
    whatItDoes:
      "Google's fast, low-cost multimodal model with a 1M-token context window, at an introductory $0.75 / $3.75 through December 31, 2026.",
    bestFor: [
      "High-volume multimodal work where speed and price matter.",
      "A cheaper step down from Gemini 4 Argon inside Google's stack.",
    ],
    caveats: [
      "The introductory rate ends December 31, 2026.",
      "Claude Haiku 5.5 scores slightly higher (66.42 vs 66.22) at a lower list price.",
      "BenchLM's September note about it keeping 95% of the leader's score is out of date: on October 29 it keeps about 75% (66.22 vs 88.38).",
    ],
    interimVerdict:
      "Cheap and fast, but no longer the near-frontier bargain it looked like in September: at 66.22 it keeps about 75% of the current BenchLM leader's score. Haiku 5.5 beats it on score and price, so choose Flash if you specifically want Google's multimodal stack.",
  },
  "claude-haiku-5-5": {
    whatItDoes:
      "Anthropic's high-volume, low-cost model with a 1M-token context window at $0.10 / $0.50.",
    bestFor: [
      "High-volume classification, extraction and routing, where cost per task decides.",
      "The strongest score at the lowest price in the directory: 66.42 on BenchLM at $0.50 per million output tokens.",
    ],
    caveats: [
      "BenchLM's score rests on 2 source families, against 3 for most top models.",
      "Its score is about 77% of Opus 5.5's (66.42 vs 86.29).",
    ],
    interimVerdict:
      "The standout on price-to-score: 66.42 on BenchLM at $0.10 / $0.50, ahead of Gemini 3.8 Flash, DeepSeek V4.1 Flash and GPT-6 Luna on both score and price in our directory. The evidence is thinner than for the flagships, so confirm quality on your own prompts before moving volume onto it.",
    safetyNotes: [
      {
        text: "Anthropic published a system card for Claude Haiku 5.5.",
        sourceUrl: "https://www-cdn.anthropic.com/e1080d6bf5ae2018ea3c2f414064be03232f5be5/Claude%20Haiku%205.5%20System%20Card.pdf",
      },
    ],
  },
  "gpt-6-luna": {
    whatItDoes:
      "OpenAI's cheapest bulk-work model at $0.10 / $0.50. Our directory has not confirmed its context window, although BenchLM lists 1.05M.",
    bestFor: [
      "Bulk, repetitive tasks where price is the deciding factor.",
      "Light drafting and summarising at the lowest list price in the directory (tied with Claude Haiku 5.5).",
    ],
    caveats: [
      "62.14 on BenchLM is 4.3 points behind Claude Haiku 5.5 (66.42) at the same list price.",
      "Our directory marks its context window as unconfirmed.",
    ],
    interimVerdict:
      "Priced the same as Claude Haiku 5.5 but 4.3 points lower on BenchLM (62.14 vs 66.42), so it is the weaker default for bulk work unless you need OpenAI's stack or your own tests favour it.",
  },
  "grok-4-7": {
    whatItDoes:
      "xAI's mid-priced model with live web access, a 500K-token context window and a low output price of $6 per million tokens, rising above 200K tokens.",
    bestFor: [
      "Tasks that need live web information.",
      "A lower output price than Opus 5.5 or GPT-6.1 Sol.",
    ],
    caveats: [
      "It has no ranked BenchLM entry on October 29. Its predecessor, Grok 4.6, ranks 22nd at 66.62 with a $6 output price.",
      "The price rises above 200K tokens, so long-context use costs more than the headline rate.",
      "A 500K context is half that of most models in the directory.",
    ],
    interimVerdict:
      "Without an independent ranking there is not enough evidence to prefer it over scored models at similar prices. Its predecessor Grok 4.6 ranks 22nd (66.62). Wait for BenchLM coverage or run your own tests, especially if live web access is the reason you want it.",
  },
  "mimo-v2-6-pro": {
    whatItDoes:
      "Xiaomi's open-weight model under an MIT licence, with a 1M-token context window, available by API at $0.435 / $0.87.",
    bestFor: [
      "Open-weight use where the MIT licence matters.",
      "Very low API cost with a 1M-token context.",
    ],
    caveats: [
      "BenchLM's estimated score is 56.44, far below the 73.6 (estimated) in our directory snapshot, and rests on 2 source families.",
      "It ranks 59th of 216, below Kimi K3 (17th), DeepSeek V4.1 Flash (30th) and Qwen3.8 Max (33rd).",
    ],
    interimVerdict:
      "Attractive for its MIT licence and sub-$1 output price, but the evidence is weak: an estimated 56.44 (59th) that is 17 points below the figure in our directory snapshot. Treat it as a candidate to test, not a proven choice.",
    limitsNotes: [
      { text: "Listed under an MIT licence. Read the licence text before commercial use." },
    ],
  },
  "kimi-k3": {
    whatItDoes:
      "Moonshot AI's open-weight model for coding and agents, with a 1.05M-token context window and an API price of $3 / $15.",
    bestFor: [
      "Open-weight agent and coding workloads.",
      "Repeated-attempt research tasks: on one academic benchmark it matched GPT-5.6 Sol on a single attempt and pulled ahead at ten.",
    ],
    caveats: [
      "It ranks 17th on BenchLM (69.34), well below the top six.",
      "Its $3 / $15 API price is higher than Sonnet 5.5 and GPT-6.1 Sol, which score 12.5 to 15.9 points higher.",
      "Moonshot's newer Kimi K3.1 Pro already ranks 13th (74.61, estimated).",
    ],
    interimVerdict:
      "Choose Kimi K3 when you need open weights for agent or coding work, not for price: its API rate is higher than Sonnet 5.5 and GPT-6.1 Sol, which score 12 to 16 points higher on BenchLM. Moonshot's newer K3.1 Pro already ranks higher.",
  },
  "qwen3-8-max-27b": {
    whatItDoes:
      "Alibaba's Qwen3.8 family: the Max model (1M context) is the API option at $2 / $6, and the 27B version (262K context) is a free-to-self-host model for a single GPU.",
    bestFor: [
      "Self-hosting on one capable GPU with the 27B version (BenchLM 54.26, 80th).",
      "A low-priced API route with Max (64.86, 33rd).",
    ],
    caveats: [
      "BenchLM's Max score is 64.86, 4.8 points below the 69.7 in our directory snapshot.",
      "The 27B scores 54.26, about 10.6 points below Max, so expect a clear quality step down.",
      "BenchLM lists no Max output price. Check Alibaba's pricing page.",
    ],
    interimVerdict:
      "Two products under one name: Max is a mid-tier API model (64.86, 33rd) and 27B is the local option (54.26, 80th). Both sit well behind the top models, so choose them for self-hosting or data-control reasons rather than raw quality.",
    limitsNotes: [
      { text: "The API price shown is for the Max version. The 27B version is free to self-host and needs a single capable GPU." },
    ],
  },
  "deepseek-v4-1-flash": {
    whatItDoes:
      "DeepSeek's cheapest capable API, with a 1M-token context window at $0.15 / $0.60 off-peak. BenchLM lists the 1017 update as open weight.",
    bestFor: [
      "Budget API work with a long context.",
      "Open-weight use: BenchLM lists the weights as open.",
    ],
    caveats: [
      "The $0.60 output price is off-peak. BenchLM lists $1.20, so standard pricing may be double.",
      "BenchLM counts it as open weight, while our directory does not include it among its three open-weight models.",
      "It scores 65.22 (30th), below Claude Haiku 5.5 (66.42), which is cheaper at directory prices.",
    ],
    interimVerdict:
      "A capable budget option (65.22, 30th) whose headline price depends on off-peak hours. At the $1.20 output price BenchLM lists, Claude Haiku 5.5 beats it on both score and price, so check your peak-hour usage before choosing it.",
  },
};