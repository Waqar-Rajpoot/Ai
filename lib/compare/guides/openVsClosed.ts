import { LINKED_PAGES } from "../../learn/guideConfig";
import type { GuideRecord } from "../../learn/guideTypes";
import { EXPERT_SOURCES as SOURCES } from "../../learn/expert/expertSources";

export const openVsClosed: GuideRecord = {
  slug: "open-vs-closed",
  number: 25,
  level: "compare",
  kind: "explainer",
  title: "Open-weight vs closed models: what you get and what you give up",
  metaDescription:
    "What open-weight and closed AI models mean, how open weights differ from open source AI, what each lets you do, and how to choose between them for your work.",
  cardSummary: "What open weights let you do, what they leave out, and how to choose between open and closed.",
  summaryPoints: [
    "An open-weight model is one whose weights you can download. A closed model is one you can only use through the provider's app or service.",
    "Open weights are not the same as open source. The Open Source Initiative's definition also requires the code and information about the training data.",
    "Open weights let you run, host and fine-tune a model yourself. Closed models take that work off you but leave control with the provider.",
    "Licences vary, so read the one that comes with any model before you use it for work.",
  ],
  sections: [
    {
      id: "definitions",
      heading: "What the words mean",
      paragraphs: [
        "A model's weights are the numbers it learned in training. An open-weight model is one whose weights are published, so anyone can download them. The Open Source Initiative describes what that allows: users can adjust behaviour, run the model locally, host it with a third party, or fine-tune it on their own data.",
        "A closed model keeps its weights private. You use it through the provider's own app or through its service, and the provider decides how it runs and when it changes.",
      ],
      sourceIds: [SOURCES.osiOpenWeights.id],
    },
    {
      id: "open-source",
      heading: "Open weights are not the same as open source",
      paragraphs: [
        "The Open Source Initiative published a definition of open source AI. It names four freedoms: to use, study, modify and share the system. To provide them, it says a system needs to provide the data information, the code and the parameters, such as weights, in the preferred form for making changes. Weights alone do not meet that bar.",
        "The Initiative's own post puts the difference plainly. Open-weight releases typically omit the training code and the training data, or a detailed account of how it was built, so you cannot fully study or modify the model or explain its outputs. That is why it says open-weight models allow some of the freedoms but not all of them. Some companies call a release open source when it provides only weights, so check what is actually included.",
      ],
      sourceIds: [SOURCES.osaid.id, SOURCES.osiOpenWeights.id],
    },
    {
      id: "comparison",
      heading: "What changes in practice",
      paragraphs: [
        "The table summarises the main differences. It is our rule of thumb. Individual models and licences differ, so treat each row as a question to check.",
      ],
      table: {
        caption: "Open-weight and closed models compared",
        columns: ["Question", "Open-weight", "Closed"],
        rows: [
          ["Where does it run?", "Your computer, your servers or a host you choose", "The provider's service"],
          ["Who controls updates?", "You, because the file you downloaded does not change", "The provider, who can change or retire a model"],
          ["Privacy", "Text can stay on your own machine if you run it there", "Text goes to the provider, so check its data terms"],
          ["Customising", "You can fine-tune and adjust it", "Limited to what the provider offers"],
          ["Effort", "You handle setup, hardware and security", "Little setup. The provider runs it"],
          ["Cost", "Hardware and time, often no per-use fee", "Plan fees or per-token fees"],
          ["Licence", "Varies, and may restrict some uses", "Terms of service"],
        ],
      },
    },
    {
      id: "licences",
      heading: "Licences: read before you use it for work",
      paragraphs: [
        "Even when the weights are free to download, the licence decides what you may do with them. Some licences are permissive. Others limit commercial use, set conditions or require credit. Publishing weights does not by itself tell you what you may do, so look for the licence file that comes with the model, and ask a lawyer if the use is important.",
        "Our guide on running a model on your own computer includes a prompt that helps you read a licence in plain language. It is a first pass, not legal advice.",
      ],
    },
    {
      id: "choosing",
      heading: "How to choose",
      steps: [
        {
          title: "Start with the job and the data",
          detail: "Private or client material may point toward a model you control. Hard, high-stakes work may point toward the strongest model available, whichever kind it is.",
        },
        {
          title: "Check what the release really includes",
          detail: "Ask whether it is weights only, or weights, code and data information. Use the Open Source Initiative's definition as a yardstick.",
        },
        {
          title: "Read the licence",
          detail: "Make sure it allows your use, including commercial use if that applies.",
        },
        {
          title: "Test on your own tasks",
          detail: "Run your personal test set on one open and one closed model, and compare scores, speed and cost, as in our guide on building a test set.",
        },
        {
          title: "Plan for change",
          detail: "A closed model can be updated or retired by its provider. An open model you have downloaded stays as it is, but you are responsible for keeping it secure. Re-test on a schedule.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "what-is-included",
      title: "Check what a release includes",
      whenToUse: "When a model is described as open source or open.",
      text: "A model is described like this: [paste the announcement text]. Using the four freedoms (use, study, modify, share) and the components of the Open Source AI Definition (data information, code, parameters), list what the announcement says is included, what it does not mention, and what I should ask or check.",
    },
    {
      id: "open-or-closed",
      title: "Decide for a specific job",
      whenToUse: "When you are choosing a model for a task.",
      text: "My task is [description]. The material is [private, client, public]. I [have / do not have] a computer or server that can run a model of [size]. List the benefits and risks of using an open-weight model I run myself versus a closed hosted model for this job, and what I should test before choosing.",
    },
    {
      id: "licence-summary",
      title: "Summarise a licence in plain language",
      whenToUse: "Before using a downloaded model for work.",
      text: "Here is the licence for a model: [paste licence]. In plain English, list what is allowed, what is restricted, what I must credit or include, and anything unusual. Mark anything you are unsure about so I can ask a lawyer.",
    },
  ],
  whatCanGoWrong: [
    "Assuming open weights means open source, and therefore free to use for anything.",
    "Skipping the licence and using a model in a way it does not allow.",
    "Assuming a self-run model is private when the tool is set up to send text elsewhere.",
    "Choosing on a headline score without testing on your own tasks.",
    "Forgetting that a model you run yourself is yours to keep secure and up to date.",
  ],
  limitsNote:
    "This page explains the terms and the trade-offs. It does not rank models, and it is not legal advice on licences.",
  showPriceNotice: false,
  sources: [SOURCES.osaid, SOURCES.osiOpenWeights],
    relatedSlugs: ["run-ai-on-your-own-computer", "build-your-own-ai-test-set", "how-to-read-ai-benchmark", "never-share-with-ai-chatbot"],
  relatedLinks: [LINKED_PAGES.localModelMemory, LINKED_PAGES.modelDirectory, LINKED_PAGES.privacyMatrix, LINKED_PAGES.expertHub],
  lastReviewed: "2026-10-27",
  published: true,
};
