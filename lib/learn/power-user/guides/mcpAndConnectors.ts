import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { POWER_USER_SOURCES as SOURCES } from "../powerUserSources";

export const mcpAndConnectors: GuideRecord = {
  slug: "mcp-and-connectors",
  number: 21,
  level: "power-user",
  kind: "explainer",
  title: "MCP and connectors: giving AI access to your tools safely",
  metaDescription:
    "What MCP and connectors are, how tool use works, the risks of local servers and broad permissions, and a safe setup checklist for connecting AI to accounts.",
  cardSummary: "What MCP is, connectors in practice, permissions and a safe setup checklist.",
  summaryPoints: [
    "Tool use lets a model ask for an action, such as a search or a file lookup. The app carries it out and returns the result.",
    "MCP, the Model Context Protocol, is an open standard for connecting AI apps to tools and data. Connectors are ready-made connections to services such as email and calendars.",
    "Every connection widens what the AI can see or do, so the safest setup starts read-only, connects one service at a time and uses limited accounts.",
    "A local MCP server runs on your computer with your privileges. Only install ones you trust.",
  ],
  sections: [
    {
      id: "tool-use",
      heading: "Tool use: how a model acts",
      paragraphs: [
        "On its own, a model only writes text. Tool use is how it does more. The model asks for an action, such as a web search, a calculation or a file lookup. The app carries out the action and returns the result, and the model uses it in its reply. The app, not the model, decides which actions are possible.",
      ],
    },
    {
      id: "what-mcp-is",
      heading: "What MCP is",
      paragraphs: [
        "The project's own introduction describes MCP as an open-source standard for connecting AI applications to external systems. Using it, an application such as Claude or ChatGPT can connect to data sources like local files and databases, to tools like search engines and calculators, and to workflows like specialised prompts. It compares MCP to a USB-C port for AI applications: one standard way to plug things in, so each tool does not need its own custom link.",
        "The project says MCP is supported by AI assistants including Claude and ChatGPT and by development tools such as Visual Studio Code and Cursor. That is the project's claim about its own ecosystem, and support differs by app and plan, so check the app's help page.",
      ],
      sourceIds: [SOURCES.mcpIntroduction.id],
    },
    {
      id: "connectors",
      heading: "Connectors in practice",
      paragraphs: [
        "A connector is the everyday word for a ready-made connection between an AI app and a service such as email, calendar or files. Some are built on MCP and some are not. You usually turn one on by signing in to the service and approving a list of permissions.",
        "Names, availability and exactly what each connector can do differ by provider and plan. The permission screen is the most reliable guide to what you are granting, so read it.",
      ],
    },
    {
      id: "what-can-go-wrong",
      heading: "Where the risk comes from",
      paragraphs: [
        "The MCP project publishes security guidance for people who build and run MCP systems. Three points matter for everyday users.",
      ],
      bullets: [
        "Local servers run with your privileges. The guidance warns that a local MCP server can run commands on your machine with the same privileges as the app. It describes attacks where a malicious setup command copies private files or deletes data, and says clients should show the exact command and ask for approval before running it.",
        "Broad permissions enlarge the damage. The guidance on scope minimisation explains that a token with wide access lets an attacker reach unrelated data and tools if it is stolen, and recommends starting with the smallest set of permissions and adding more only when needed.",
        "Content can carry instructions. OWASP describes indirect prompt injection, where an AI reads a page or file that contains hidden instructions. A connector that reads your email or documents gives such content a path to a model that can act.",
      ],
      sourceIds: [SOURCES.mcpSecurity.id, SOURCES.owaspPromptInjection.id],
    },
    {
      id: "access-levels",
      heading: "Choosing an access level",
      table: {
        caption: "What each level lets the AI do (our rule of thumb)",
        columns: ["Level", "Example", "Suggested use"],
        rows: [
          ["Read-only, one folder or label", "Read the notes in one folder", "A good first connection"],
          ["Read-only, whole account", "Read all email or all files", "Only when the task needs it"],
          ["Create and edit", "Add calendar events, edit documents", "Use a test account or keep backups"],
          ["Send or share", "Send emails, share files", "Require your approval each time"],
          ["Delete or pay", "Remove files, make purchases", "Avoid for now"],
        ],
      },
      sourceIds: [SOURCES.mcpSecurity.id],
    },
    {
      id: "safe-setup",
      heading: "A safe setup checklist",
      steps: [
        {
          title: "Start read-only",
          detail: "Connect with the lowest access that does the job. You can raise it later, and it is harder to undo a harmful action than to add a permission.",
        },
        {
          title: "Connect one service at a time",
          detail: "Test it on a small task before adding another, so you know which connection caused a problem.",
        },
        {
          title: "Use an account with limited access",
          detail: "Where you can, connect a separate or restricted account instead of your main one.",
        },
        {
          title: "Read what the connection asks permission to do",
          detail: "Do not click through. If a connector asks for much more than the task needs, choose another way.",
        },
        {
          title: "Trust the source before installing a local server",
          detail: "Prefer servers from a publisher you recognise. Read the exact command before you approve it, and be wary of anything that asks for system access or runs unexplained commands.",
        },
        {
          title: "Remove connections you stop using",
          detail: "Review your connected apps regularly and disconnect anything inactive.",
        },
      ],
      sourceIds: [SOURCES.mcpSecurity.id],
    },
  ],
  prompts: [
    {
      id: "permission-review",
      title: "Review what a connection could do",
      whenToUse: "Before you approve a new connector or tool.",
      text: "I am about to connect [service] to an AI app. Here is the permission list it shows: [paste the permission wording, no passwords or keys]. In plain language, tell me what this would let the AI read, change and delete, and suggest a narrower setting if there is one.",
    },
    {
      id: "read-only-task",
      title: "Keep a connected task read-only",
      whenToUse: "When you use a connector for the first time.",
      text: "Use the connected [service] only to read and summarise [specific folder, label or date range]. Do not create, edit, send or delete anything. If a step would need that, stop and ask me.",
    },
    {
      id: "connection-audit",
      title: "Audit your connected apps",
      whenToUse: "Every few months.",
      text: "Help me make a checklist for reviewing the apps connected to my AI account. For each one I want to note: what it can access, when I last used it, whether I still need it, and how to disconnect it.",
    },
  ],
  whatCanGoWrong: [
    "Approving a long permission list without reading it.",
    "Installing a local server from an unknown source, which can run commands on your computer.",
    "Connecting your main email or storage account when a limited one would do.",
    "Hidden instructions in an email or document steering an AI that can also send messages or change files.",
    "Leaving old connections active long after you stopped using them.",
  ],
  limitsNote:
    "This is general guidance, not a security audit. For work accounts, follow your organisation's policy and ask the people who run its systems before you connect anything.",
  showPriceNotice: true,
  sources: [SOURCES.mcpIntroduction, SOURCES.mcpSecurity, SOURCES.owaspPromptInjection],
  relatedSlugs: ["ai-agents-explained", "never-share-with-ai-chatbot", "ai-scams-and-deepfakes", "rag-explained"],
  relatedLinks: [LINKED_PAGES.safetyChecklist, LINKED_PAGES.privacyMatrix, LINKED_PAGES.powerUserHub],
  lastReviewed: "2026-10-27",
  published: true,
};
