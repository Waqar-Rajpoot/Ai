import type { BestForRoundup } from "../types";
import { HOW_WE_TEST_LINK } from "../links";

export const videoRoundup: BestForRoundup = {
  slug: "video",
  label: "Video",
  level: "Levels 2-3",
  question: "Which tool makes the best short video clips?",
  description:
    "Video tools compared on the same prompts, with limits, costs and labelling notes.",
  metaTitle: "Best AI video tools",
  metaDescription:
    "AI video generators to test: what each is reported to do best, pricing notes, limits and labelling rules. Picks follow our own video tests.",
  quickAnswer:
    "We are not naming a video pick yet. The model directory covers text models, and video tools need their own tests. Third-party roundups in 2026 most often name Google's Veo, Runway, Kling and Seedance as leaders, and report that OpenAI shut down the standalone Sora app in April 2026. Prices are quoted per second or by credits, so cost per usable clip is the number to compare. Test two tools on your own prompts before you pay.",
  whoItIsFor: [
    "Creators making short social clips.",
    "Small businesses making simple promotional videos.",
    "Anyone comparing the cost of AI video with stock footage.",
  ],
  startingPointIds: [],
  startingPointsNote:
    "The directory covers text models. Video tools need their own tests and are not in it yet, so no pick is shown.",
  modelRoleNotes: {},
  candidates: [
    {
      name: "Veo 3.1",
      maker: "Google",
      role: "Cinematic quality with synchronised audio",
      reportedFacts: [
        "Roundups name it a top pick, with native audio and a 4K update (third-party roundups, 2026).",
        "One mid-2026 API roundup lists about $0.75 per second with audio. Access is reported to run through Google's AI plans or Vertex AI.",
      ],
      watchOut: "Credits are reported to run out quickly at the highest quality, and 4K uses more quota than 1080p.",
    },
    {
      name: "Runway Gen-4.5",
      maker: "Runway",
      role: "Creative control and editing tools",
      reportedFacts: [
        "Roundups praise its motion and reference tools and credit-based plans.",
        "One roundup says raw quality trails Veo 3.1 and Kling 3.0 on lighting and audio.",
      ],
      watchOut: "Heavy users are reported to hit credit limits quickly on lower tiers.",
    },
    {
      name: "Kling 3.0",
      maker: "Kuaishou",
      role: "Value and character consistency",
      reportedFacts: [
        "Reported launch on Feb 4, 2026 (third-party roundup).",
        "A February 2026 roundup quoted about $0.50 per 10-second 1080p clip on its Pro plan.",
      ],
      watchOut: "Prices and plans change. Check the current plan.",
    },
    {
      name: "Seedance 2.0",
      maker: "ByteDance",
      role: "Low per-second cost and quality",
      reportedFacts: [
        "Reported launch on Feb 7, 2026 (third-party roundup).",
        "An API roundup says per-second pricing for Seedance and Kling tends to undercut Veo with audio.",
      ],
      watchOut: "Access and availability differ by region.",
    },
    {
      name: "Sora",
      maker: "OpenAI",
      role: "Previously a cinematic generator",
      reportedFacts: [
        "Roundups report OpenAI shut down the standalone Sora app in April 2026.",
        "An API roundup says the Sora API was scheduled to sunset in September 2026.",
      ],
      watchOut: "Confirm its status on OpenAI's site before you plan around it.",
    },
    {
      name: "Hailuo, Luma, Pika and HeyGen",
      maker: "MiniMax, Luma AI, Pika, HeyGen",
      role: "Specialist options: image-to-video, camera motion, effects and avatars",
      reportedFacts: [
        "Roundups name Hailuo for fast image-to-video, Luma for camera motion, Pika for effects and HeyGen for spokesperson videos.",
      ],
      watchOut: "Each is a narrow fit. Test against your actual clip.",
    },
  ],
  candidatesNote:
    "Tools to test, with facts reported by third-party roundups in 2026. Reports disagree and some are months old, so we have not tested these tools yet. Confirm each on the provider's page.",
  decisionGuide: [
    {
      situation: "You need a clip with sound.",
      advice: "Test a tool with native audio, and check the extra cost of audio.",
    },
    {
      situation: "You need many variations cheaply.",
      advice: "Compare per-second or per-credit cost, and count how many tries it takes to get a usable clip.",
    },
    {
      situation: "You need to control the camera and scene.",
      advice: "Try a tool known for editing and reference controls.",
    },
    {
      situation: "You need a talking presenter.",
      advice: "Look at avatar tools rather than general video generators.",
    },
    {
      situation: "You plan to publish.",
      advice: "Label the clip as AI-made and check the licence and any platform rules.",
    },
  ],
  reportedFigures: [],
  glossary: [
    {
      term: "Text-to-video and image-to-video",
      meaning: "Making a clip from words, or animating a still image.",
      caution: "Image-to-video often keeps a subject's look better, but motion can still glitch.",
    },
    {
      term: "Credits",
      meaning: "A plan's allowance for generations, spent per second or per clip.",
      caution: "Failed or discarded clips still use credits.",
    },
    {
      term: "Native audio",
      meaning: "Sound created with the video rather than added later.",
      caution: "It may cost extra and may not suit every clip.",
    },
    {
      term: "Cost per usable clip",
      meaning: "Total spend divided by the clips you would actually publish.",
      caution: "It is usually higher than the price of one attempt.",
    },
  ],
  howWeWillRank: [
    "The same prompts for every tool, judged on motion, consistency and prompt match.",
    "Clip length, resolution and daily limits on each plan.",
    "Cost per usable clip, since some attempts will fail.",
    "Labelling rules and licence terms for publishing.",
  ],
  selfTest: [
    { title: "Write three short prompts", detail: "A simple scene, a person moving and a product shot." },
    { title: "Run each on two tools", detail: "Use the same words, and note length, resolution and any limits." },
    { title: "Watch for glitches", detail: "Check hands, faces, text and objects that change between frames." },
    { title: "Count the keepers", detail: "How many of the attempts could you publish? Divide your spend by that number." },
    { title: "Check the rules", detail: "Read the licence and the platform's AI labelling policy." },
  ],
  tips: [
    "Keep clips short. Quality and consistency usually drop as length grows.",
    "Start from a good still image if the tool supports it.",
    "Save prompts and settings that work.",
  ],
  commonMistakes: [
    "Planning around a tool that has been discontinued or changed plans.",
    "Judging a tool on one impressive demo clip.",
    "Publishing realistic AI video without a label.",
  ],
  keepInMind: [
    "Video generation can be slow and costly, so check limits before you pay.",
    "Label AI video clearly. Fake clips are a common scam tool.",
    "The field changes fast. Several tools launched or closed within six months of 2026.",
  ],
  faq: [
    { question: "Why is there no pick yet?", answer: "We rank by our own tests on the same prompts, and those have not been run. Roundups disagree and some are months old." },
    { question: "Is Sora still available?", answer: "Roundups report the standalone app was shut down in April 2026 and the API was due to sunset in September 2026. Confirm on OpenAI's site." },
    { question: "How much does AI video cost?", answer: "Quotes range from a few cents to dollars per clip depending on tool, length, resolution and audio. Compare cost per usable clip." },
    { question: "Can I use AI video in ads?", answer: "Often yes on paid plans, but read the licence and the platform's rules, and label the clip." },
  ],
  sources: [
    { name: "Dupple: The best AI video generators in 2026", url: "https://dupple.com/learn/best-ai-video-generators", note: "Third-party roundup (2026). Source for the reported Sora shutdown and tool roles." },
    { name: "Apiframe: 8 best AI video generation APIs", url: "https://apiframe.ai/blog/best-ai-video-generation-apis", note: "Third-party roundup (mid-2026). Source for reported API prices and the Sora API sunset." },
    { name: "DEV Community: Top 6 AI video generators (Feb update)", url: "https://dev.to/genra_ai/top-6-ai-video-generators-in-2026-feb-update-log", note: "Third-party roundup (Feb 2026). Source for the Kling 3.0 and Seedance 2.0 launch dates." },
  ],
  related: [
    { href: "/learn/foundations/ai-scams-and-deepfakes", label: "AI scams and deepfakes" },
    { href: "/compare/best/image", label: "Best AI image tools" },
    HOW_WE_TEST_LINK,
  ],
};