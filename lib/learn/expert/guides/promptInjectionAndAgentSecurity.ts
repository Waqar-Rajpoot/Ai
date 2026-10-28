import { LINKED_PAGES } from "../../guideConfig";
import type { GuideRecord } from "../../guideTypes";
import { POWER_USER_SOURCES } from "../../power-user/powerUserSources";
import { EXPERT_SOURCES as SOURCES } from "../expertSources";

export const promptInjectionAndAgentSecurity: GuideRecord = {
  slug: "prompt-injection-and-agent-security",
  number: 28,
  level: "expert",
  kind: "safety",
  title: "Prompt injection and agent security for everyday teams",
  metaDescription:
    "What prompt injection is, why it cannot simply be fixed, and practical rules for small teams that let AI read email, files or web pages and take actions.",
  cardSummary: "Why prompt injection cannot simply be fixed, and the rules that limit the damage.",
  summaryPoints: [
    "Prompt injection is when text an AI reads changes what it does. It can sit in a web page, an email or a file, and people may not see it.",
    "The UK National Cyber Security Centre says it may never be totally mitigated, because language models do not separate data from instructions.",
    "So the goal is to limit the damage: give AI the least access it needs, keep untrusted content away from powerful tools and require a person to approve risky actions.",
    "A team that writes these rules down, and logs what its AI tools do, is much better placed than one that relies on a filter.",
  ],
  sections: [
    {
      id: "what-it-is",
      heading: "What prompt injection is",
      paragraphs: [
        "OWASP, the security community's project on risks in AI applications, defines prompt injection as inputs that change a model's behaviour in unintended ways. In direct injection, a user's own prompt changes the behaviour. In indirect injection, the model takes in external content, such as a website or a file, that contains instructions. OWASP notes the inputs can be invisible to people as long as the model reads them.",
        "A simple example: a team lets an assistant summarise incoming email. A message contains hidden text that says to forward the most recent invoices to an outside address. If the assistant can send email, it might try. Nobody typed that instruction into the assistant, and the sender was not trusted, but the model read the text as if it were part of its task.",
      ],
      sourceIds: [POWER_USER_SOURCES.owaspPromptInjection.id],
    },
    {
      id: "why-hard",
      heading: "Why it is hard to fix",
      paragraphs: [
        "The UK's National Cyber Security Centre explains why this differs from the older problem of SQL injection. SQL injection can be properly mitigated, because queries can be built so that data is never run as instructions. Language models have no such separation: they only predict the next token, so instructions and data arrive in one stream. The NCSC says it is very possible that prompt injection attacks may never be totally mitigated.",
        "Its advice is to reduce the likelihood and the impact, and to accept that a system which cannot tolerate the leftover risk may be a poor place to use a language model. It also warns against relying on deny-lists of known bad phrases, because attackers can reword them, and suggests being wary of products that claim to stop prompt injection.",
      ],
      sourceIds: [SOURCES.ncscPromptInjection.id],
    },
    {
      id: "risky-combination",
      heading: "The combination to watch for",
      paragraphs: [
        "The NCSC frames the risk as a confused deputy problem: the AI holds your permissions but can be steered by someone else. Its design advice is direct. Use safeguards that do not depend on the model to constrain actions, especially tool and API use, and limit privileges. An LLM processing content from an untrusted party should not have access to privileged tools.",
        "In everyday terms, ask of every AI tool you give to your team whether it combines three things. Does it read content from people you do not control? Can it see private information? Can it act outside the chat, such as sending, sharing, deleting or paying? The more of these a single tool can do, the more a hidden instruction can cost you.",
      ],
      sourceIds: [SOURCES.ncscPromptInjection.id],
    },
    {
      id: "rules-table",
      heading: "Rules for everyday teams",
      table: {
        caption: "Rules, why they help, and what to do",
        columns: ["Rule", "Why", "In practice"],
        rows: [
          ["Least privilege", "OWASP lists limiting a model's access to the minimum its job needs as a mitigation", "Connect read-only first, one service at a time, with a limited account"],
          ["Human approval for risky actions", "OWASP recommends human approval for privileged or high-risk actions", "No sending, sharing, deleting or paying without a person clicking approve"],
          ["Separate untrusted content", "OWASP suggests labelling external content so it has less influence. The NCSC lists marking data separately as a way to make attacks harder, not to stop them", "Keep external content apart from your instructions, and do not rely on that alone"],
          ["Do not trust filters on their own", "The NCSC advises against deny-lists and warns about claims to stop injection", "Treat filters as one layer, not the plan"],
          ["Limit what untrusted content can reach", "The NCSC says untrusted content should not reach privileged tools", "Use a separate, restricted assistant for reading email, web pages and uploads"],
          ["Log and review", "The NCSC recommends logging inputs, outputs, tool use and API calls. Failed tool calls may signal an attack", "Keep activity logs, and look at failed or unusual actions"],
        ],
      },
      sourceIds: [POWER_USER_SOURCES.owaspPromptInjection.id, SOURCES.ncscPromptInjection.id],
    },
    {
      id: "agents-and-connectors",
      heading: "Agents and connectors raise the stakes",
      paragraphs: [
        "A chatbot that only writes text can mislead you. An agent that can browse, open files and act can do things. Anthropic's engineering team notes that an agent's autonomy brings higher costs and the potential for compounding errors, and recommends testing in sandboxed environments with guardrails and stopping conditions. The Model Context Protocol project's own security guidance warns that a local server runs with your privileges and recommends the narrowest permissions that work.",
        "Our Level 3 guides on agents and on connectors cover those setups in detail. For teams, the main point is to treat every new tool or connection as a change that needs a quick review, in the same way you would a new software account.",
      ],
      sourceIds: [POWER_USER_SOURCES.anthropicBuildingAgents.id, POWER_USER_SOURCES.mcpSecurity.id],
    },
    {
      id: "team-routine",
      heading: "A one-page routine for your team",
      steps: [
        {
          title: "List the AI tools in use",
          detail: "Include browser assistants, meeting tools and connectors people turned on themselves.",
        },
        {
          title: "For each, answer three questions",
          detail: "Does it read untrusted content? Can it see private data? Can it act outside the chat? Mark any that say yes to all three.",
        },
        {
          title: "Cut the access that is not needed",
          detail: "Remove write, send and delete permissions that the job does not use, and switch to limited accounts.",
        },
        {
          title: "Add a human step to risky actions",
          detail: "Make sure approval is the default for sending, sharing, deleting and paying.",
        },
        {
          title: "Turn on logging",
          detail: "Keep records of tool use and review them regularly, including failed actions.",
        },
        {
          title: "Plan for when it goes wrong",
          detail: "Decide who disconnects the tool, which passwords and keys get changed, and who is told.",
        },
      ],
    },
  ],
  prompts: [
    {
      id: "risk-review",
      title: "Review a tool for the three risks",
      whenToUse: "Before a team turns on a new AI tool or connection.",
      text: "We want to use [tool] for [purpose]. It can access [list of data and services] and can do [list of actions]. Answer: 1) Does it read content from people we do not control? 2) Can it see private information? 3) Can it act outside the chat? Then suggest the smallest set of permissions that still lets us do the job, and which actions should need a person's approval.",
    },
    {
      id: "team-policy",
      title: "Draft a short team rule",
      whenToUse: "To turn the routine into something people will read.",
      text: "Write a one-page plain-English policy for our team of [number] people on using AI tools that can read email, files or web pages, or take actions. Include: what is allowed, what needs approval, what must never be connected, how to report something strange, and who owns the list of approved tools. Keep it under 300 words.",
    },
    {
      id: "incident-checklist",
      title: "Prepare an incident checklist",
      whenToUse: "Before something goes wrong.",
      text: "Make a checklist for what our team should do within the first hour if we think an AI tool followed a hidden instruction, for example by sending or sharing something it should not have. Cover disconnecting the tool, checking logs, changing passwords or keys, who to tell and what to record. Keep it to ten steps.",
    },
  ],
  whatCanGoWrong: [
    "Relying on a filter or a 'safe' label instead of limiting what the AI can do.",
    "Letting one assistant read outside content, see private data and take actions with no human step.",
    "Connecting tools with wide permissions because it is quicker to set up.",
    "Hidden instructions in an email, document or web page that nobody can see.",
    "No logs, so nobody can tell afterwards what the tool did.",
  ],
  limitsNote:
    "This guide gives general good practice, not a security audit. For work systems and sensitive data, follow your organisation's policy and ask a qualified security professional.",
  showPriceNotice: false,
  sources: [SOURCES.ncscPromptInjection, POWER_USER_SOURCES.owaspPromptInjection, POWER_USER_SOURCES.anthropicBuildingAgents, POWER_USER_SOURCES.mcpSecurity],
  relatedSlugs: ["ai-agents-explained", "mcp-and-connectors", "never-share-with-ai-chatbot", "ai-scams-and-deepfakes"],
  relatedLinks: [LINKED_PAGES.safetyChecklist, LINKED_PAGES.privacyMatrix, LINKED_PAGES.expertHub],
  lastReviewed: "2026-10-27",
  published: true,
};
