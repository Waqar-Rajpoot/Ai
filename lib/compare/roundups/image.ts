import type { BestForRoundup } from "../types";
import { HOW_WE_TEST_LINK } from "../links";

export const imageRoundup: BestForRoundup = {
  slug: "image",
  label: "Image",
  level: "Levels 2-3",
  question: "Which tool makes the best images for what I need?",
  description:
    "Image tools compared on the same prompts, with notes on licences and labelling.",
  metaTitle: "Best AI image tools",
  metaDescription:
    "AI image generators to test: what each is reported to do best, pricing notes, licence and labelling checks. Picks follow our own image tests.",
  quickAnswer:
    "We are not naming an image pick yet. The model directory covers text models, and image tools need their own tests. Third-party roundups in 2026 name several leaders and disagree on the order, so the honest answer is to test two or three on your own prompts. This page lists the tools they mention, what each is reported to be good at, and the licence and labelling questions to settle before you use an image commercially.",
  whoItIsFor: [
    "Marketers, designers and small business owners who need images fast.",
    "Students and hobbyists making art or illustrations.",
    "Anyone who must be sure an image is safe to use commercially.",
  ],
  startingPointIds: [],
  startingPointsNote:
    "The directory covers text models. Image tools need their own tests and are not in it yet, so no pick is shown.",
  modelRoleNotes: {},
  candidates: [
    {
      name: "GPT Image 2.5 (ChatGPT Images)",
      maker: "OpenAI",
      role: "Precise generation and editing inside a chat",
      reportedFacts: [
        "Reported launch on Sep 8, 2026, replacing Images 2.0 (third-party roundups).",
        "One roundup reports that DALL-E has been retired and image creation moved to ChatGPT Images.",
      ],
      watchOut: "Chats fill with variations quickly. Check plan limits.",
    },
    {
      name: "Midjourney",
      maker: "Midjourney",
      role: "Artistic style and visual polish",
      reportedFacts: [
        "Reported to have made V8.2 its default model on Jul 24, 2026 (third-party roundup).",
        "Often named as the top pick for image quality in roundups.",
      ],
      watchOut: "Check current access and plan terms. They have changed over time.",
    },
    {
      name: "Nano Banana 2 and Pro",
      maker: "Google",
      role: "Fast, low-cost generation and editing",
      reportedFacts: [
        "Nano Banana 2 reported as launched in Feb 2026 at about $0.067 per 1K image through the API (third-party roundup).",
        "Nano Banana Pro reported at about $0.14 per 2K image through the API.",
      ],
      watchOut: "Prices are per image and vary by resolution. Confirm on Google's page.",
    },
    {
      name: "Adobe Firefly",
      maker: "Adobe",
      role: "Commercial-use focus with content credentials",
      reportedFacts: [
        "Roundups position it as a safer choice for commercial work and report content-credentials metadata.",
      ],
      watchOut: "It is tied to the Creative Cloud ecosystem.",
    },
    {
      name: "FLUX, Qwen-Image 3.0 and Stable Diffusion",
      maker: "Black Forest Labs, Alibaba, Stability AI",
      role: "Open and flexible options for technical users",
      reportedFacts: [
        "Qwen-Image 3.0 was reported released Jul 21, 2026 and generally available from Aug 5, 2026.",
        "FLUX and Stable Diffusion are often reached through platforms that host them.",
      ],
      watchOut: "Licences differ by model. Read the terms before commercial use.",
    },
    {
      name: "Ideogram",
      maker: "Ideogram",
      role: "Text inside images",
      reportedFacts: [
        "Roundups name it as the tool to try when an image needs readable words.",
      ],
      watchOut: "Always proofread any text in the image.",
    },
  ],
  candidatesNote:
    "Tools to test, with facts reported by third-party roundups in 2026. Roundups disagree on the order, and we have not tested these tools yet. Treat each fact as a lead to confirm on the provider's page.",
  decisionGuide: [
    {
      situation: "You need an image with readable text, such as a poster or sign.",
      advice: "Test a tool known for text, and proofread every word.",
    },
    {
      situation: "You need a precise edit to an existing picture.",
      advice: "Try a chat-based tool that lets you say what to change, and compare how well it keeps the rest unchanged.",
    },
    {
      situation: "You will use the image in an advert or product.",
      advice: "Read the commercial licence. Prefer a tool that states its terms clearly.",
    },
    {
      situation: "You make many images and cost matters.",
      advice: "Check price per image and any free daily allowance.",
    },
    {
      situation: "You want full control and can run software.",
      advice: "Look at open models, and read each model's licence.",
    },
  ],
  reportedFigures: [],
  glossary: [
    {
      term: "Prompt adherence",
      meaning: "How closely the image matches what you asked for.",
      caution: "A beautiful image that ignores your request still fails the job.",
    },
    {
      term: "Content credentials",
      meaning: "Metadata attached to an image that says how it was made.",
      caution: "It can be stripped when an image is edited or re-saved.",
    },
    {
      term: "Commercial licence",
      meaning: "Terms that allow you to use generated images in paid work.",
      caution: "Terms vary by tool and plan, and free tiers often differ from paid ones.",
    },
    {
      term: "Credits",
      meaning: "A plan's allowance of images or generations.",
      caution: "Higher resolution and edits can use more credits.",
    },
  ],
  howWeWillRank: [
    "The same prompts for every tool, including text inside the image and people's hands.",
    "How closely the result matches the prompt on the first try.",
    "Licence terms for commercial use and any labelling rules.",
    "Cost per usable image, not per attempt.",
  ],
  selfTest: [
    { title: "Write five prompts", detail: "A portrait, a product photo, a scene with text, a simple icon and an edit of an existing picture." },
    { title: "Run each on two or three tools", detail: "Use the same words. Generate up to three tries each." },
    { title: "Score the results", detail: "Rate prompt match, realism or style, and errors such as extra fingers or garbled words." },
    { title: "Read the licence", detail: "Check whether your plan allows commercial use." },
    { title: "Work out cost per keeper", detail: "Divide spend by the images you would actually use." },
  ],
  tips: [
    "Describe subject, setting, style and lighting in one sentence each.",
    "Save the prompts that work so you can repeat results.",
    "Label AI images when you publish them.",
  ],
  commonMistakes: [
    "Using an image commercially without checking the licence.",
    "Publishing text in an image without proofreading.",
    "Making realistic images of real people without consent.",
  ],
  keepInMind: [
    "Check the tool's licence before you use an image in a product or advert.",
    "Realistic images can mislead. Label AI images when you share them.",
    "Image tools change versions quickly, so a roundup can be out of date within weeks.",
  ],
  faq: [
    { question: "Why is there no pick yet?", answer: "We rank by our own tests on the same prompts, and those have not been run. Third-party roundups disagree on the order." },
    { question: "Can I use AI images commercially?", answer: "Often, but it depends on the tool and plan. Read the licence before you publish." },
    { question: "Are AI images copyrighted?", answer: "The rules differ by country and are still changing. Ask a lawyer for important uses. This site gives no legal advice." },
    { question: "How do I spot a fake image?", answer: "Our guide on AI scams and deepfakes covers the warning signs." },
  ],
  sources: [
    { name: "Tech Insider: Best AI image generators", url: "https://tech-insider.org/best-ai-image-generators/", note: "Third-party roundup (2026). Source for release dates reported for GPT Image 2.5, Midjourney V8.2 and Qwen-Image 3.0." },
    { name: "DataNorth: Top 10 AI image generation tools 2026", url: "https://datanorth.ai/blog/top-10-best-ai-image-generation-tools-2026", note: "Third-party roundup (2026). Source for reported API prices." },
  ],
  related: [
    { href: "/learn/foundations/ai-scams-and-deepfakes", label: "AI scams and deepfakes" },
    { href: "/compare/best/video", label: "Best AI video tools" },
    HOW_WE_TEST_LINK,
  ],
};