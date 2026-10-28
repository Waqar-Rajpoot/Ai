import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { POWER_USER_SOURCES as SOURCES } from "../powerUserSources";

export const aiAgentsExplained: GuideRecord = {
  slug: "ai-agents-explained",
  number: 20,
  level: "power-user",
  kind: "explainer",
  title: "AI agents explained: what they can do and how they fail",
  metaDescription:
    "What an AI agent is, how coding and computer-use agents differ, how long tasks go wrong, what prompt injection is, and what permissions to give an agent.",
  cardSummary: "Coding and computer-use agents, long-running tasks and how agents fail.",
  summaryPoints: [
    "An agent is a model that chooses its own steps and uses tools to carry them out, often with little supervision.",
    "That freedom is useful for open-ended jobs and is also where mistakes grow, because errors can compound over many steps.",
    "Pages and files an agent reads can contain hidden instructions. This is called prompt injection.",
    "Give an agent the least access the job needs, keep a human approval step for anything hard to undo, and test it somewhere safe first.",
  ],
  sections: [
    {
      id: "what-is-an-agent",
      heading: "What an agent is",
      paragraphs: [
        "Anthropic's engineering team draws a useful line. In a workflow, models and tools are run along paths written in advance. In an agent, the model directs its own process and its use of tools, keeping control over how the task gets done.",
        "The same article advises starting with the simplest approach that works. Often a single model call with some retrieved material and examples is enough, and an agent is worth considering only when the number of steps is hard to predict and a fixed path cannot be written down.",
      ],
      sourceIds: [SOURCES.anthropicBuildingAgents.id],
    },
    {
      id: "kinds",
      heading: "Three kinds you will meet",
      table: {
        caption: "Common agent types and where each one tends to go wrong",
        columns: ["Kind", "What it does", "Typical risk"],
        rows: [
          ["Coding agent", "Reads a codebase, edits files and runs tests", "Plausible changes that break something elsewhere, or tests that are changed to pass"],
          ["Computer-use agent", "Operates a browser or desktop by clicking and typing as a person would", "Clicking the wrong thing, or acting on a page that was written to mislead it"],
          ["Long-running task", "Works through many steps or hours with little oversight", "Small errors pile up, and earlier limits are forgotten"],
        ],
      },
      paragraphs: [
        "The table is a plain-English summary for orientation. Tools in each category vary a great deal, so check what a specific product asks permission for.",
      ],
    },
    {
      id: "how-agents-fail",
      heading: "How agents fail",
      paragraphs: [
        "Anthropic says that an agent's autonomy means higher costs and the potential for compounding errors, and recommends testing in sandboxed environments with guardrails. The failures below are the ones to plan for.",
      ],
      bullets: [
        "It misreads the goal and carries on with confidence.",
        "It loops, retrying the same step and using time and money. Anthropic suggests stopping conditions, such as a maximum number of steps.",
        "It takes an action that is hard to undo, such as deleting, overwriting, sending or paying.",
        "It drifts over a long task and forgets limits you set at the start.",
        "It follows instructions hidden in something it reads (see the next section).",
      ],
      sourceIds: [SOURCES.anthropicBuildingAgents.id],
    },
    {
      id: "prompt-injection",
      heading: "Prompt injection: instructions hidden in content",
      paragraphs: [
        "OWASP, the security community's project on risks in AI applications, defines prompt injection as inputs that change a model's behaviour in unintended ways. It separates two kinds. In direct injection, the user's own prompt changes the behaviour. In indirect injection, the model takes in external content, such as a web page or a file, that contains instructions. OWASP notes that such inputs can even be invisible to people as long as the model reads them.",
        "For an agent that browses or opens files, that second kind is the one to worry about. A page can contain text written to look like a command. Among the mitigations OWASP lists are limiting the model's access to the minimum its job needs, requiring human approval for high-risk actions, and keeping untrusted content clearly separated from your own instructions. Level 4 covers agent security in more depth.",
      ],
      sourceIds: [SOURCES.owaspPromptInjection.id],
    },
    {
      id: "permissions",
      heading: "What to allow an agent to do",
      paragraphs: [
        "Match the permission to the cost of a mistake. This table is our rule of thumb, not a security audit.",
      ],
      table: {
        caption: "Permissions, from lowest to highest risk",
        columns: ["Permission", "Risk", "Our suggestion"],
        rows: [
          ["Read files or notes you choose", "Low", "Allow, limited to specific folders"],
          ["Search the web", "Low to medium", "Allow, and treat what it reads as untrusted"],
          ["Read email or calendar", "Medium", "Allow only if the task needs it. Content can carry hidden instructions"],
          ["Create or edit files", "Medium", "Allow in a copy or a folder you can restore"],
          ["Run code or commands", "High", "Allow only in a sandbox or a throwaway environment"],
          ["Send messages or emails for you", "High", "Require your approval for each one"],
          ["Delete or overwrite", "High", "Do not allow without approval and a backup"],
          ["Spend money or log in to accounts", "Very high", "Do not allow for now"],
        ],
      },
      sourceIds: [SOURCES.owaspPromptInjection.id, SOURCES.anthropicBuildingAgents.id],
    },
    {
      id: "setup-routine",
      heading: "A routine for your first agent task",
      steps: [
        {
          title: "Start with a small, checkable task",
          detail: "Pick something where you can tell at a glance whether the result is right, and where a wrong result costs little.",
        },
        {
          title: "Write down the limits",
          detail: "State what the agent may touch and what it must not. Repeat the limits in long tasks.",
        },
        {
          title: "Work on a copy",
          detail: "Give it a duplicate of your files or a test account, not your only version.",
        },
        {
          title: "Add a human checkpoint",
          detail: "Anthropic notes that agents can pause for human feedback at checkpoints or when they are blocked. Use that before anything is sent, published or deleted.",
        },
        {
          title: "Review what it did, not only what it says it did",
          detail: "Check the changed files, the actions log or the sent messages, because a summary can leave things out.",
        },
      ],
      sourceIds: [SOURCES.anthropicBuildingAgents.id],
    },
  ],
  prompts: [
    {
      id: "agent-brief",
      title: "Write a clear brief with limits",
      whenToUse: "Before you start any agent task.",
      text: "Your goal: [goal]. You may: [list of allowed actions]. You must not: [list of things not allowed, for example send messages, delete files, make purchases]. Stop and ask me before any step that cannot be undone. After each major step, tell me what you did and what you will do next.",
    },
    {
      id: "plan-first",
      title: "Ask for a plan before action",
      whenToUse: "To catch a misread goal before anything happens.",
      text: "Before doing anything, write the steps you plan to take, the tools each step needs, and anything you are unsure about. Wait for my approval before you start.",
    },
    {
      id: "action-log",
      title: "Ask for an action log",
      whenToUse: "At the end of a task, to check what happened.",
      text: "List every action you took in order, including files you opened, changed or created and pages you visited. Flag any step where you were not sure what I wanted.",
    },
  ],
  whatCanGoWrong: [
    "Giving an agent more access than the job needs because it is easier than setting limits.",
    "Trusting a confident summary of work the agent did not actually finish.",
    "An agent following instructions hidden in a web page, email or file it was asked to read.",
    "Loops and long runs that use up time or allowance before anyone notices.",
    "Actions that cannot be undone, such as deleted files, sent messages or payments.",
  ],
  limitsNote:
    "This is an introduction, not a security audit. For anything involving money, personal data or work systems, follow your organisation's rules and a qualified security professional.",
  showPriceNotice: false,
  sources: [SOURCES.anthropicBuildingAgents, SOURCES.owaspPromptInjection],
  relatedSlugs: ["mcp-and-connectors", "where-ai-helps-and-fails", "never-share-with-ai-chatbot", "ai-api-pricing-for-non-engineers"],
  relatedLinks: [LINKED_PAGES.safetyChecklist, LINKED_PAGES.privacyMatrix, LINKED_PAGES.powerUserHub],
  lastReviewed: "2026-10-27",
  published: true,
};
