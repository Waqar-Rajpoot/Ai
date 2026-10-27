import type { GuideRecord } from "../../guideTypes";
import { FOUNDATIONS_SOURCES as SOURCES } from "../foundationsSources";

export const aiScamsAndDeepfakes: GuideRecord = {
  slug: "ai-scams-and-deepfakes",
  number: 6,
  level: "foundations",
  kind: "safety",
  title: "AI scams and deepfakes: how to spot them",
  metaDescription:
    "How criminals use cloned voices, fake videos, fake images and fluent messages, why spotting fakes is unreliable, and a simple verify habit from the FBI and FTC.",
  cardSummary: "Cloned voices, fake videos, phishing and how to verify before you act.",
  summaryPoints: [
    "The FBI warns that criminals use generative AI to make fraud more believable: cloned voices, fake videos, fake images and polished messages.",
    "You cannot reliably tell by looking or listening. The dependable defence is a habit: pause, do not trust the voice, and confirm through a number or channel you already know.",
    "Never send cash, gift cards, cryptocurrency or money transfers because of an urgent call or message.",
  ],
  sections: [
    {
      id: "what-changed",
      heading: "What AI changes about scams",
      paragraphs: [
        "The FBI says generative AI reduces the time and effort criminals need to deceive people, and can correct the human errors that used to act as warning signs. Making synthetic content is not illegal in itself, but it can be used for fraud and extortion.",
        "Family-emergency scams are not new. The FTC describes the pattern: the caller lies, tries to scare you, and rushes you to pay before you can check. AI makes the voice on the line more convincing.",
      ],
      sourceIds: [SOURCES.fbiGenerativeAiFraud.id, SOURCES.ftcFamilyEmergency.id],
    },
    {
      id: "four-kinds",
      heading: "Four kinds to know",
      bullets: [
        "Cloned voices: short audio clips of a loved one's voice used to pose as a relative in a crisis and ask for urgent money or a ransom. The FBI also reports AI-generated audio being used to try to get into bank accounts.",
        "Fake videos: believable videos of public figures, real-time video chats with supposed executives, police or other authority figures, and promotional clips for investment schemes.",
        "Fake images and profiles: realistic profile photos, fake identity documents, celebrity endorsements of counterfeit goods, and invented disaster images used to raise donations for fraudulent charities.",
        "AI-written messages: large numbers of fake social media profiles, translated messages with fewer spelling mistakes, and chatbots on fake websites that push you to click harmful links.",
      ],
      sourceIds: [SOURCES.fbiGenerativeAiFraud.id],
    },
    {
      id: "spotting-fakes",
      heading: "Why spotting fakes is not enough",
      paragraphs: [
        "The FBI lists clues to look for, such as distorted hands, unrealistic teeth or eyes, odd shadows, lag and unnatural movement. It also says it can be difficult to tell when content is AI-generated.",
        "Clues can help, but a clean-looking video or a natural-sounding voice proves nothing. Poor spelling is also no longer a reliable sign. That is why the habit below does not depend on spotting anything.",
      ],
      sourceIds: [SOURCES.fbiGenerativeAiFraud.id],
    },
    {
      id: "verify-habit",
      heading: "The verify habit",
      steps: [
        {
          title: "Pause",
          detail: "The FTC advises resisting the urge to act immediately, however dramatic the story is. Urgency is how these scams work.",
        },
        {
          title: "Do not trust the voice or video",
          detail: "The FTC says not to trust a voice on the line, even if it sounds like a family member or friend.",
        },
        {
          title: "Hang up and call back on a number you know",
          detail: "Use a number you already have, not one the caller gives you. For a bank or organisation, look up its official contact details and call those.",
        },
        {
          title: "Check with someone else",
          detail: "Call another relative or friend, even if the caller told you to keep it secret.",
        },
        {
          title: "Agree a family code word",
          detail: "The FBI recommends a secret word or phrase to verify identity. Choose something people could not guess or find online, and do not post it or put it in a group chat.",
        },
        {
          title: "Do not pay in the ways scammers ask",
          detail: "Do not send cash, gift cards, cryptocurrency or money transfers to people you do not know or have met only online or by phone. Once it is sent, you are unlikely to get it back.",
        },
      ],
      sourceIds: [SOURCES.ftcFamilyEmergency.id, SOURCES.fbiGenerativeAiFraud.id],
    },
    {
      id: "red-flags",
      heading: "Red flags that matter more than glitches",
      bullets: [
        "Urgency: you are pushed to act immediately.",
        "Secrecy: do not tell anyone, especially family.",
        "Unusual payment: gift cards, cryptocurrency or a transfer to a stranger.",
        "A request for sensitive information from someone you know only online or by phone.",
        "A famous person promoting an investment, or a contact who sends a video “to prove” they are real.",
      ],
      sourceIds: [SOURCES.ftcFamilyEmergency.id, SOURCES.fbiGenerativeAiFraud.id],
    },
    {
      id: "limit-copies",
      heading: "Reduce what can be copied",
      paragraphs: [
        "Because a short clip can be enough to copy a voice, the FBI suggests limiting how much of your image and voice is public, making social media accounts private, and limiting followers to people you know. This reduces what a scammer can copy. It does not remove the need to verify.",
      ],
      sourceIds: [SOURCES.fbiGenerativeAiFraud.id],
    },
    {
      id: "if-it-happened",
      heading: "If you think you have been scammed",
      steps: [
        {
          title: "Stop contact and keep records",
          detail: "Save messages, numbers, payment details and the date and time of each contact.",
        },
        {
          title: "Call your bank or payment provider now",
          detail: "Use the number on your card or its official site, and tell them what happened.",
        },
        {
          title: "Report it",
          detail: "In the United States, report to the FTC at ReportFraud.ftc.gov and the FBI's Internet Crime Complaint Center at ic3.gov. Elsewhere, contact your national consumer protection body or the police.",
        },
      ],
      sourceIds: [SOURCES.ftcFamilyEmergency.id, SOURCES.fbiGenerativeAiFraud.id],
    },
  ],
  prompts: [
    {
      id: "family-verification-plan",
      title: "Draft a family verification plan",
      whenToUse: "To start a conversation with relatives. Do not include real names or phone numbers.",
      text: "Write a one-page plan my family can agree on for emergency calls. Include how to choose and use a code word, who to call to double-check, and what to say if someone pressures us to send money. Keep it under [number] words and use plain language.",
    },
    {
      id: "check-a-message-safely",
      title: "Check a suspicious message without pasting it",
      whenToUse: "When a message claims to be from a bank, delivery service or government office.",
      text: "I received a message that claims to be from [type of organisation] and asks me to [action]. Without me pasting the message, list the questions I should ask and the steps for checking it through the organisation's official website or phone number.",
    },
    {
      id: "warning-signs-for-relatives",
      title: "Explain the warning signs to a relative",
      whenToUse: "For parents, grandparents or anyone who gets urgent calls.",
      text: "Explain in plain language, for a [age] year old with no technical background, how voice-cloning scams work and the three things to do if a relative calls asking for urgent money. Use short sentences and no jargon.",
    },
  ],
  whatCanGoWrong: [
    "Trusting a familiar voice or video. The FBI notes that AI audio can imitate loved ones, and that real-time video can imitate authority figures.",
    "Using a number, link or contact supplied by the caller. Always use your own source.",
    "Relying on spotting glitches. A convincing fake can look and sound normal.",
    "Paying first and checking later. Payments by gift card, cryptocurrency or transfer are hard to reverse.",
    "Posting your family code word online or sharing it in a group chat.",
  ],
  limitsNote:
    "This is general safety information, not legal advice. If you have lost money, contact your bank and the authorities in your country.",
  sources: [SOURCES.fbiGenerativeAiFraud, SOURCES.ftcFamilyEmergency],
  relatedSlugs: ["never-share-with-ai-chatbot", "what-is-ai"],
  relatedLinks: [{ label: "AI safety checklist", href: "/tools/ai-safety-checklist" }],
  lastReviewed: "2026-10-26",
  published: true,
};
