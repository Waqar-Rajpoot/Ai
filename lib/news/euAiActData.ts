import type { EuSource, FineTier, Milestone, RoleGuide, StaleClaim } from "./euAiActTypes";

export const EU_SOURCES: readonly EuSource[] = [
  {
    id: "actuia",
    label: "ActuIA: AI Act obligations in force and delays under omnibus 2026/1744",
    url: "https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/",
    kind: "secondary",
    note: "Most complete date table we found. Gives publication (July 24, 2026) and entry into force (July 27, 2026).",
  },
  {
    id: "verifywise",
    label: "VerifyWise: EU AI Act omnibus, the new high-risk deadlines explained",
    url: "https://verifywise.ai/blog/eu-ai-act-omnibus-what-changed",
    kind: "secondary",
    note: "Written around the May 7, 2026 provisional deal. Useful for the old and new high-risk dates.",
  },
  {
    id: "usercentrics",
    label: "Usercentrics: EU AI Act deal, Digital Omnibus now in force",
    url: "https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/",
    kind: "secondary",
    note: "Gives the adoption steps and says the December 2, 2026 grace period only covers systems already on the market. Its own text is inconsistent in places.",
  },
  {
    id: "transcend",
    label: "Transcend: the EU AI Act implementation timeline",
    url: "https://transcend.io/blog/eu-ai-act-implementation-timeline",
    kind: "secondary",
    note: "Older. Still shows August 2, 2026 as full application for high-risk AI, which the omnibus changed.",
  },
];

export const MILESTONES: readonly Milestone[] = [
  {
    id: "prohibitions-and-literacy",
    dateIso: "2025-02-02",
    core: true,
    title: "Banned practices and AI literacy",
    plainEnglish:
      "The first rules switched on. Some uses of AI became illegal in the EU, and organizations were told to help their staff understand the AI they use.",
    legalNote: "Articles 4 and 5. Eight prohibited practices.",
    whoItAffects: "Anyone who builds or uses AI in the EU, including companies outside the EU that sell into it.",
    forYou:
      "As a user, this is the date manipulative AI, social scoring and some uses of biometric identification became off limits. As an employer, you are expected to support AI understanding among staff. The 2026 omnibus softened that duty from ensuring \"a sufficient level\" to taking measures to support it.",
    sourceIds: ["actuia", "verifywise", "transcend"],
  },
  {
    id: "gpai-and-governance",
    dateIso: "2025-08-02",
    core: true,
    title: "Rules for general-purpose AI models, governance and penalties",
    plainEnglish:
      "The companies that make big, general models (the kind behind chatbots) had to start documenting how they work, respecting copyright rules and sharing training-data summaries. The national penalty system also began.",
    legalNote: "Chapters V (general-purpose AI), VII (governance) and XII (penalties).",
    whoItAffects: "Makers of general-purpose AI models first. Regulators in each EU country.",
    forYou:
      "You do not have to do anything. It is why model makers now publish more documentation, and why you may see more detail about training data and copyright from the big providers.",
    sourceIds: ["actuia", "verifywise", "transcend"],
  },
  {
    id: "transparency-and-original-general-date",
    dateIso: "2026-08-02",
    core: true,
    title: "Transparency rules start. This was meant to be the big date.",
    plainEnglish:
      "Chatbots must tell people they are talking to AI, deepfakes must be labeled, and AI-generated content must be marked. This date was first set as the day almost everything applied, including high-risk AI. The omnibus moved the high-risk part to 2027 and 2028 but kept the transparency rules.",
    legalNote: "Article 50 (transparency) and Article 101 (Commission fines for general-purpose models).",
    whoItAffects: "Anyone running a chatbot, producing synthetic images, audio or video, or publishing AI-generated content in the EU.",
    forYou:
      "Expect clearer \"you are talking to an AI\" notices and labels on synthetic media. If you publish AI-made images or video for your business, labeling is now something you should plan for. Many sources still print this as the high-risk deadline. That is out of date.",
    change: { was: "Almost all rules apply, including high-risk AI", now: "Transparency rules and Commission fines for general-purpose models. High-risk moved." },
    sourceIds: ["actuia", "usercentrics", "verifywise"],
  },
  {
    id: "watermarking-grace-and-new-bans",
    dateIso: "2026-12-02",
    core: false,
    title: "Marking grace period ends. Two new bans start.",
    plainEnglish:
      "Generative AI systems that were already on the market before August 2, 2026 get until this date to add machine-readable marking to what they produce. Two new bans also apply: AI that creates realistic intimate images of a real person without consent, and AI that creates child sexual abuse material.",
    legalNote: "Article 111(4), and new Article 5(1)(ba) and (bb).",
    whoItAffects: "Makers of generative AI that launched before August 2, 2026. Makers and users of \"nudification\" apps.",
    forYou:
      "This is the nearest date on the calendar. A tool launched after August 2, 2026 gets no grace period, so the date does not apply to every system. The new bans protect you if someone makes an intimate fake of you.",
    change: { was: "Marking required from August 2, 2026", now: "December 2, 2026, for systems already on the market before August 2, 2026" },
    sourceIds: ["actuia", "usercentrics", "verifywise"],
  },
  {
    id: "gpai-legacy-and-sandboxes",
    dateIso: "2027-08-02",
    core: false,
    title: "Older general-purpose models must catch up. Regulatory sandboxes due.",
    plainEnglish:
      "General-purpose models that were already on the market before August 2, 2025 must comply by this date. Each EU country must also have a test space (a regulatory sandbox) where companies can try AI under supervision.",
    legalNote: "Article 111(3) and Article 57.",
    whoItAffects: "Makers of older general-purpose models. National governments.",
    forYou: "Mostly background. It means models released before mid-2025 will also be covered by the documentation rules.",
    change: { was: "Sandboxes due August 2, 2026", now: "August 2, 2027" },
    sourceIds: ["actuia", "verifywise"],
  },
  {
    id: "annex-iii-high-risk",
    dateIso: "2027-12-02",
    core: true,
    title: "High-risk AI in sensitive areas (hiring, credit, education, biometrics)",
    plainEnglish:
      "AI that helps decide who gets a job, a loan or a school place, plus certain biometric systems, must meet the strict high-risk rules: risk checks, record keeping, human oversight and documentation. These rules were due on August 2, 2026 and were pushed back about sixteen months.",
    legalNote: "Annex III high-risk systems, Article 113(c)(i).",
    whoItAffects: "Employers, lenders, schools and the vendors who sell them AI systems.",
    forYou:
      "If you apply for jobs or credit in the EU, this is the date automated decision tools face the strictest checks. If you buy HR or credit software, ask the vendor what their plan is for this date.",
    change: { was: "August 2, 2026", now: "December 2, 2027" },
    sourceIds: ["actuia", "verifywise", "usercentrics"],
  },
  {
    id: "annex-i-high-risk",
    dateIso: "2028-08-02",
    core: true,
    title: "High-risk AI built into regulated products (medical devices, machinery, toys)",
    plainEnglish:
      "When AI is a safety part of a product that already has EU safety rules, such as a medical device or machine, the high-risk rules apply from this date. This was due on August 2, 2027.",
    legalNote: "Annex I products, Article 113(c)(ii).",
    whoItAffects: "Manufacturers of regulated products that contain AI, and the notified bodies that certify them.",
    forYou:
      "Most readers are not directly affected. If you work in medical devices, machinery or similar fields, this is your date, and these products have the longest runway.",
    change: { was: "August 2, 2027", now: "August 2, 2028" },
    sourceIds: ["actuia", "verifywise", "usercentrics"],
  },
  {
    id: "public-authority-legacy",
    dateIso: "2030-08-02",
    core: false,
    title: "High-risk systems used by public authorities, including ones already running",
    plainEnglish:
      "Public bodies that already use high-risk AI systems get until this date to bring them into line.",
    legalNote: "Article 111(2).",
    whoItAffects: "Government agencies and the vendors who supply them.",
    forYou: "A long way out, but it is the date by which AI used by public authorities in the EU should meet the same standard.",
    sourceIds: ["actuia"],
  },
];

export const FINE_TIERS: readonly FineTier[] = [
  { id: "prohibited", breach: "Using a banned practice", max: "Up to €35 million or 7% of worldwide yearly turnover" },
  { id: "operator", breach: "Breaking most other duties, including the transparency rules in Article 50", max: "Up to €15 million or 3%" },
  { id: "misleading", breach: "Giving regulators false or misleading information", max: "Up to €7.5 million or 1%" },
];

export const STALE_CLAIMS: readonly StaleClaim[] = [
  {
    id: "aug-2026-high-risk",
    claim: "High-risk AI rules apply from August 2, 2026.",
    seenIn: "Older timelines and compliance blogs written before the 2026 omnibus",
    today: "Moved to December 2, 2027 (hiring, credit, education, biometrics) and August 2, 2028 (products with their own safety rules).",
  },
  {
    id: "aug-2027-annex-i",
    claim: "High-risk AI in regulated products applies from August 2, 2027.",
    seenIn: "Timelines based on the original 2024 text",
    today: "Moved to August 2, 2028.",
  },
  {
    id: "dec-2026-everything",
    claim: "Every AI system must watermark its output from December 2, 2026.",
    seenIn: "Short news summaries of the omnibus",
    today: "The December 2 date is a grace period that ends for generative systems already on the market before August 2, 2026. Newer systems had to comply from August 2, 2026.",
  },
  {
    id: "act-delayed-entirely",
    claim: "The EU delayed the whole AI Act.",
    seenIn: "Headlines about the \"digital omnibus\"",
    today: "No. The banned practices (2025) and the general-purpose AI rules (2025) already apply, and the transparency rules start August 2, 2026. Only the high-risk dates and a few others moved.",
  },
];

export const ROLE_GUIDES: readonly RoleGuide[] = [
  {
    id: "everyday-user",
    label: "I mostly use chatbots and AI tools for myself",
    nowApplies: [
      "Banned practices (such as manipulative AI and social scoring) have been illegal in the EU since February 2, 2025.",
      "Chatbots and AI media tools must follow the transparency rules from August 2, 2026: tell you it is AI, label deepfakes, mark generated content.",
    ],
    comingUp: [
      { dateIso: "2026-12-02", text: "Machine-readable marking becomes required for generative tools that were already on sale before August 2, 2026. Two new bans start, covering AI nude fakes and child sexual abuse material." },
    ],
    doThisMonth: [
      "Look for the AI notice or label the next time you use a chatbot or image tool. If you do not see one in the EU, that is worth noticing.",
      "If you share AI-made images or video publicly, add a plain label saying so. It will soon be expected.",
      "If someone makes an intimate fake of you, keep the evidence and report it to the platform and local police. The new ban starts December 2, 2026.",
    ],
    watchOut: "You are not the one who has to comply. The duties fall on the companies. Do not assume a tool is safe or legal in your country just because it exists.",
  },
  {
    id: "small-business",
    label: "I run a small business that uses AI tools",
    nowApplies: [
      "The ban on prohibited practices applies to users of AI as well as makers. Check that none of your tools score people's behavior or try to read employees' emotions at work.",
      "From August 2, 2026, if you run a customer-facing chatbot or publish synthetic images, audio or video, you have to be open that it is AI.",
      "The AI literacy rule from 2025 is now softer. You are expected to take measures to support staff understanding, not to prove a set level.",
    ],
    comingUp: [
      { dateIso: "2026-12-02", text: "Generative tools you buy may add marking by this date. Ask your vendor." },
      { dateIso: "2027-12-02", text: "If you use AI in hiring, credit or education decisions, high-risk rules reach you through your vendor's obligations." },
    ],
    doThisMonth: [
      "List every AI tool your team uses and the one job each does.",
      "Add a short \"you are chatting with an AI\" line to any chatbot a customer can reach.",
      "Ask each vendor in writing which of these dates they are preparing for. Keep the reply.",
      "Run a short internal session on what staff may and may not paste into AI tools. It covers the literacy duty in practice.",
    ],
    watchOut: "Small companies have some relief on documentation and fines, but not on the bans or the transparency rules. Fines for breaking a ban go up to €35 million or 7% of turnover.",
  },
  {
    id: "employer-high-risk",
    label: "I use AI to screen candidates, score credit or make education decisions",
    nowApplies: [
      "The ban on emotion recognition in the workplace and schools already applies.",
      "The transparency rules apply from August 2, 2026 wherever your tool talks to people or produces synthetic content.",
    ],
    comingUp: [
      { dateIso: "2027-12-02", text: "The full high-risk requirements start for hiring, credit, education and similar uses: risk management, logs, human oversight and documentation." },
    ],
    doThisMonth: [
      "Write down which decisions in your process use AI, and who can overrule it.",
      "Ask each vendor for the plan and dates for their high-risk documentation.",
      "Do not wait for 2027 to set up a person who can override the tool and a record of when they did.",
    ],
    watchOut: "The extra time is for the formal rules. Discrimination law, data protection law and the ban on emotion recognition at work still apply to you today.",
  },
  {
    id: "builder",
    label: "I build or sell AI products, or ship a general-purpose model",
    nowApplies: [
      "General-purpose model duties have applied since August 2, 2025: technical documentation, copyright policy and a training data summary. Models with systemic risk have extra duties.",
      "Transparency duties for chatbots and generated content apply from August 2, 2026.",
      "Commission fines for general-purpose models become applicable on August 2, 2026.",
    ],
    comingUp: [
      { dateIso: "2026-12-02", text: "Marking deadline for generative systems already on the market before August 2, 2026, and the new nudification and child abuse material bans." },
      { dateIso: "2027-08-02", text: "Models placed on the market before August 2, 2025 must comply. National sandboxes must be ready." },
      { dateIso: "2027-12-02", text: "High-risk requirements for hiring, credit, education and biometric systems." },
      { dateIso: "2028-08-02", text: "High-risk requirements for AI inside regulated products." },
    ],
    doThisMonth: [
      "Check whether your product counts as already on the market before August 2, 2026. That decides whether you have a marking grace period.",
      "Read the Commission's Article 50 guidelines, reported as published on July 20, 2026.",
      "Add machine-readable marking to generated output before December 2, 2026.",
      "Check that nobody can use your image tool to produce intimate fakes of real people or child abuse material. The ban depends on adequate safeguards.",
    ],
    watchOut: "Do not plan around the old 2026 and 2027 high-risk dates. Plan around the new ones, and keep the paperwork for the dates that have already passed.",
  },
];