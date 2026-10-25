"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ComparisonTable } from "@/components/learn/ComparisonTable";
import { CheckList } from "@/components/learn/LearnSection";
import { CARD_CLASS, FOCUS_RING } from "@/components/learn/learnStyles";
import { FORCES, SCENARIOS, type ScenarioId } from "@/lib/society/forces";

/** Three tabs, one per scenario. Arrow keys move between tabs. Scenarios are frameworks, not forecasts. */
export function ScenarioExplorer() {
  const [activeId, setActiveId] = useState<ScenarioId>(SCENARIOS[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const active = SCENARIOS.find((scenario) => scenario.id === activeId) ?? SCENARIOS[0];

  function moveTab(currentIndex: number, direction: 1 | -1) {
    const next = SCENARIOS[(currentIndex + direction + SCENARIOS.length) % SCENARIOS.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTab(index, 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTab(index, -1);
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Three scenarios" className="mb-4 flex flex-wrap gap-2">
        {SCENARIOS.map((scenario, index) => {
          const isActive = scenario.id === activeId;
          return (
            <button
              key={scenario.id}
              ref={(element) => {
                tabRefs.current[scenario.id] = element;
              }}
              id={`scenario-tab-${scenario.id}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`scenario-panel-${scenario.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(scenario.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`rounded-full border px-4 py-2 text-sm transition motion-reduce:transition-none ${FOCUS_RING} ${
                isActive ? "border-[var(--color-accent)] bg-[var(--color-surface)] font-semibold" : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              {scenario.title}
            </button>
          );
        })}
      </div>

      <div id={`scenario-panel-${active.id}`} role="tabpanel" aria-labelledby={`scenario-tab-${active.id}`} className={CARD_CLASS}>
        <h3 className="mt-0">{active.title}</h3>
        <p className="font-semibold">{active.oneLiner}</p>
        <p className="text-[var(--color-muted)]">{active.story}</p>

        <h4 className="mb-2 mt-5">How the six forces look</h4>
        <ComparisonTable
          caption={`How the six forces look in the ${active.title} scenario`}
          headers={["Force", "What it looks like"]}
          rows={FORCES.map((force) => [force.title, active.forces[force.id]])}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/50 p-4">
            <h4 className="mb-2 mt-0">Evidence today that fits</h4>
            <CheckList items={active.fits} mark="✓" />
          </div>
          <div className="rounded-xl border border-amber-500/50 p-4">
            <h4 className="mb-2 mt-0">Evidence today that does not fit</h4>
            <CheckList items={active.doesNotFit} mark="!" />
          </div>
        </div>

        <h4 className="mb-2 mt-6">Signals that would make it more likely</h4>
        <CheckList items={active.watch} mark="•" />

        <p className="mb-0 mt-5 rounded-xl bg-[var(--color-surface)] p-3 text-sm">
          <strong>A habit that helps here:</strong> {active.doNow}
        </p>
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">A framework, not a forecast. We give no probabilities, and the evidence lists change as new data arrives.</p>
      </div>
    </div>
  );
}