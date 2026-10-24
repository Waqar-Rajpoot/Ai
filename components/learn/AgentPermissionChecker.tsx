"use client";

import { useState } from "react";
import { AGENT_PERMISSIONS, assessAgentPermissions, type PermissionRisk } from "@/lib/learn/agentPermissions";
import { CARD_CLASS, FOCUS_RING } from "./learnStyles";

const RISK_STYLES: Record<PermissionRisk, { box: string; label: string }> = {
  high: { box: "border-rose-500 bg-rose-500/10", label: "High" },
  medium: { box: "border-amber-500 bg-amber-500/10", label: "Medium" },
  low: { box: "border-emerald-500 bg-emerald-500/10", label: "Low" },
};

/** Tick what an agent could do and see the overall risk and the safeguards to add. */
export function AgentPermissionChecker() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const assessment = assessAgentPermissions(selectedIds);

  function toggle(id: string) {
    setSelectedIds((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]));
  }

  return (
    <div className={`${CARD_CLASS} grid gap-6 lg:grid-cols-2`}>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 font-semibold">The agent could…</legend>
        <div className="grid gap-2">
          {AGENT_PERMISSIONS.map((permission) => (
            <label key={permission.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-border)] px-3 py-2 transition hover:border-[var(--color-accent)] motion-reduce:transition-none">
              <input type="checkbox" checked={selectedIds.includes(permission.id)} onChange={() => toggle(permission.id)} className={`h-4 w-4 accent-[var(--color-accent)] ${FOCUS_RING}`} />
              <span>{permission.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div role="status" aria-live="polite" className="grid content-start gap-3">
        {assessment ? (
          <>
            <div className={`rounded-2xl border p-5 ${RISK_STYLES[assessment.highestRisk].box}`}>
              <p className="m-0 text-lg font-bold">{assessment.title}</p>
              <p className="mb-0 mt-1">{assessment.summary}</p>
            </div>
            <ul className="m-0 grid list-none gap-2 p-0">
              {assessment.permissions.map((permission) => (
                <li key={permission.id} className={`rounded-xl border p-3 text-sm ${RISK_STYLES[permission.risk].box}`}>
                  <strong>
                    {RISK_STYLES[permission.risk].label}: {permission.label}
                  </strong>
                  <span className="mt-1 block">{permission.safeguard}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Tick what the agent could do to see the risk. This is a thinking aid, not a security audit.
          </p>
        )}
      </div>
    </div>
  );
}