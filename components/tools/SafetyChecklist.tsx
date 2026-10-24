"use client";

import { useEffect, useMemo, useState } from "react";
import { BADGE_CLASS, BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  calculateProgress,
  filterGroups,
  getAllItems,
  getReadiness,
  type ChecklistProgress,
} from "@/lib/tools/checklists";
import { ProgressBar } from "./ProgressBar";
import { AUDIENCES, DEFAULT_AUDIENCE, type AudienceId } from "@/lib/tools/safetyChecklistData";
import { SAFETY_CHECKLIST_REVIEWED_ON } from "@/lib/tools/safetyChecklistConstants";
import { READINESS_COPY } from "@/lib/tools/safetyGuideContent";
import { useCheckedIds } from "./useCheckedIds";

type PrintScope = "active" | "all";

const VALID_IDS: ReadonlySet<string> = new Set(
  AUDIENCES.flatMap((audience) => getAllItems(audience.groups).map((item) => item.id)),
);

/** Three tickable checklists with progress, essentials filter, saving in this browser and print. */
export function SafetyChecklist() {
  const { checkedIds, isLoaded, toggle, clear } = useCheckedIds(VALID_IDS);
  const [activeId, setActiveId] = useState<AudienceId>(DEFAULT_AUDIENCE);
  const [essentialsOnly, setEssentialsOnly] = useState(false);
  const [printScope, setPrintScope] = useState<PrintScope | null>(null);

  useEffect(() => {
    const requested = window.location.hash.slice(1);
    const match = AUDIENCES.find((audience) => audience.id === requested);
    if (match) setActiveId(match.id);
  }, []);

  // Print after the chosen panels have rendered, then restore the normal view.
  useEffect(() => {
    if (printScope === null) return;
    const reset = () => setPrintScope(null);
    window.addEventListener("afterprint", reset);
    window.print();
    return () => window.removeEventListener("afterprint", reset);
  }, [printScope]);

  const progressById = useMemo(() => {
    const entries = AUDIENCES.map((audience) => [audience.id, calculateProgress(getAllItems(audience.groups), checkedIds)] as const);
    return Object.fromEntries(entries) as Record<AudienceId, ChecklistProgress>;
  }, [checkedIds]);

  const active = AUDIENCES.find((audience) => audience.id === activeId) ?? AUDIENCES[0];
  const activeProgress = progressById[active.id];
  const readiness = READINESS_COPY[getReadiness(activeProgress)];

  function selectAudience(id: AudienceId) {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  function resetActiveList() {
    const confirmed = window.confirm(`Clear every tick on the "${active.label}" checklist?`);
    if (confirmed) clear(getAllItems(active.groups).map((item) => item.id));
  }

  return (
    <div>
      <div className="hidden print:block">
        <h1 className="m-0 text-2xl">AI safety checklist</h1>
        <p className="mb-4 mt-1 text-sm">Reviewed {SAFETY_CHECKLIST_REVIEWED_ON}. Prices, features and rules change. This is general guidance, not legal advice.</p>
      </div>

      <div role="group" aria-label="Choose your checklist" className="grid gap-3 sm:grid-cols-3 print:hidden">
        {AUDIENCES.map((audience) => {
          const progress = progressById[audience.id];
          const isActive = audience.id === activeId;
          return (
            <button
              key={audience.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectAudience(audience.id)}
              className={`${CARD_CLASS} text-left transition motion-reduce:transition-none ${FOCUS_RING} ${isActive ? "border-[var(--color-accent)]" : "hover:border-[var(--color-accent)]"}`}
            >
              <span className="block font-bold">{audience.label}</span>
              <span className="mb-3 mt-1 block text-sm text-[var(--color-muted)]">{audience.whoFor}</span>
              <ProgressBar progress={progress} label={`${audience.label} progress`} />
              <span className="mt-2 block text-xs tabular-nums text-[var(--color-muted)]">
                {progress.done} of {progress.total} ticked
              </span>
            </button>
          );
        })}
      </div>

      <div className={`${CARD_CLASS} mt-4 print:hidden`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">{active.label}</p>
            <p className="mb-1 mt-1 text-lg font-extrabold">{readiness.label}</p>
            <p className="m-0 max-w-xl text-sm text-[var(--color-muted)]" role="status" aria-live="polite">
              {activeProgress.essentialDone} of {activeProgress.essentialTotal} essentials done. {readiness.advice}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setPrintScope("active")} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Print this list</button>
            <button type="button" onClick={() => setPrintScope("all")} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Print all three</button>
            <button type="button" onClick={resetActiveList} className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold ${FOCUS_RING}`}>Clear ticks</button>
          </div>
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={essentialsOnly}
            onChange={(event) => setEssentialsOnly(event.target.checked)}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          Show essential items only
        </label>
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
          {isLoaded ? "Your ticks are saved in this browser only. Nothing is sent to us." : "Loading your saved ticks…"}
        </p>
      </div>

      {AUDIENCES.map((audience) => {
        const isShown = audience.id === activeId || printScope === "all";
        const groups = filterGroups(audience.groups, essentialsOnly);
        return (
          <section
            key={audience.id}
            id={`panel-${audience.id}`}
            aria-labelledby={`panel-title-${audience.id}`}
            className={`mt-6 ${isShown ? "" : "hidden"}`}
          >
            <h3 id={`panel-title-${audience.id}`} className="mt-0">{audience.label}</h3>
            <div className="grid gap-4">
              {groups.map((group) => {
                const groupProgress = calculateProgress(group.items, checkedIds);
                return (
                  <article key={group.id} className={`${CARD_CLASS} break-inside-avoid`}>
                    <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="m-0 text-base">{group.title}</h4>
                      <span className="text-xs tabular-nums text-[var(--color-muted)]">{groupProgress.done} of {groupProgress.total}</span>
                    </header>
                    <p className="mb-2 mt-0 text-sm text-[var(--color-muted)]">{group.summary}</p>
                    <ul className="m-0 list-none p-0">
                      {group.items.map((item) => {
                        const isChecked = checkedIds.has(item.id);
                        return (
                          <li key={item.id} className="border-t border-[var(--color-border)] py-3 first:border-t-0">
                            <label className="flex cursor-pointer items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggle(item.id)}
                                className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
                              />
                              <span className="text-sm">
                                <span className={isChecked ? "opacity-70" : "font-semibold"}>{item.text}</span>{" "}
                                <span className={`${BADGE_CLASS} align-middle ${item.priority === "essential" ? "border-[var(--color-accent)]" : ""}`}>
                                  {item.priority === "essential" ? "Essential" : "Recommended"}
                                </span>
                              </span>
                            </label>
                            <details className="ml-8 mt-1 text-sm print:hidden">
                              <summary className={`cursor-pointer text-[var(--color-muted)] ${FOCUS_RING}`}>Why and how</summary>
                              <p className="mb-0 mt-2"><strong>Why:</strong> {item.why}</p>
                              {item.how && <p className="mb-0 mt-1"><strong>How:</strong> {item.how}</p>}
                              {item.guide && (
                                <p className="mb-0 mt-1"><a href={item.guide.href}>{item.guide.label}</a></p>
                              )}
                            </details>
                            <p className="ml-8 mt-1 hidden text-xs print:block">{item.why}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}