export type PermissionRisk = "low" | "medium" | "high";

export interface AgentPermission {
  id: string;
  label: string;
  risk: PermissionRisk;
  safeguard: string;
}

export interface AgentPermissionAssessment {
  highestRisk: PermissionRisk;
  title: string;
  summary: string;
  /** Selected permissions, most risky first. */
  permissions: AgentPermission[];
}

export const AGENT_PERMISSIONS: readonly AgentPermission[] = [
  { id: "read-files", label: "Read my files or notes", risk: "low", safeguard: "Limit it to one folder, not your whole drive." },
  { id: "search-web", label: "Search the web", risk: "medium", safeguard: "Treat what it reads on web pages as untrusted. Pages can hide instructions meant for the AI." },
  { id: "read-email", label: "Read my email or calendar", risk: "medium", safeguard: "Use a read-only connection and leave out sensitive folders." },
  { id: "write-files", label: "Create or edit files", risk: "medium", safeguard: "Let it work on copies, and keep backups or version history." },
  { id: "send", label: "Send emails or messages for me", risk: "high", safeguard: "Require your approval for every message before it goes." },
  { id: "delete", label: "Delete or overwrite things", risk: "high", safeguard: "Do not allow it, or require approval for every deletion." },
  { id: "spend", label: "Spend money or make purchases", risk: "high", safeguard: "Do not give it payment details. If you must, set a strict spending limit." },
  { id: "run-code", label: "Run code or commands on my computer", risk: "high", safeguard: "Run it in a sandbox or a separate user account, not your main one." },
  { id: "login", label: "Log in to my accounts", risk: "high", safeguard: "Never hand over passwords. Use a connection that limits what it can access." },
];

const RISK_RANK: Record<PermissionRisk, number> = { high: 0, medium: 1, low: 2 };

const RISK_SUMMARIES: Record<PermissionRisk, { title: string; summary: string }> = {
  low: { title: "Low risk", summary: "Reading only. This is a sensible place to start." },
  medium: { title: "Medium risk", summary: "It can read private data or change things. Add the limits below." },
  high: { title: "High risk", summary: "It can act in ways that are hard to undo. Require approval for each action, or do not allow it." },
};

/** Returns the overall risk and safeguards for the ticked permissions, or null when none are ticked. */
export function assessAgentPermissions(selectedIds: readonly string[]): AgentPermissionAssessment | null {
  const permissions = AGENT_PERMISSIONS.filter((permission) => selectedIds.includes(permission.id)).sort(
    (first, second) => RISK_RANK[first.risk] - RISK_RANK[second.risk],
  );
  if (permissions.length === 0) return null;

  const highestRisk = permissions[0].risk;
  return { highestRisk, ...RISK_SUMMARIES[highestRisk], permissions };
}