"use client";

import { useMemo, useState } from "react";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import {
  DEFAULT_DISCLOSURE_INPUT,
  DISCLOSURE_EXAMPLES,
  DISCLOSURE_PAGE_TYPES,
  findDisclosurePageType,
  getDisclosureRequirements,
  type DisclosureInput,
  type DisclosurePageTypeId,
  type RequirementKind,
} from "@/lib/shared/disclosure";

const KIND_BORDERS: Record<RequirementKind, string> = {
  required: "border-l-4 border-l-emerald-500",
  "not-allowed": "border-l-4 border-l-red-500",
};

const KIND_LABELS: Record<RequirementKind, string> = {
  required: "\u2713 Required",
  "not-allowed": "\u2715 Not allowed",
};

interface ToggleOption {
  key: Exclude<keyof DisclosureInput, "pageTypeId">;
  label: string;
}

const TOGGLES: readonly ToggleOption[] = [
  { key: "hasAffiliateLinks", label: "The page has affiliate links" },
  { key: "hasDisplayAds", label: "The page shows display ads" },
  { key: "hasSponsorSlot", label: "The page has a sponsor slot" },
  { key: "hasMakerAccess", label: "A maker gave us free or early access, credits or hardware" },
  { key: "aiModelIsSubject", label: "An AI model that helped draft the page is also what it reviews or compares" },
];

/** Shows which labels a page must carry. The rules live in lib/shared/disclosure.ts. Nothing is saved or sent. */
export function DisclosureFinder() {
  const [input, setInput] = useState<DisclosureInput>(DEFAULT_DISCLOSURE_INPUT);
  const requirements = useMemo(() => getDisclosureRequirements(input), [input]);
  const pageType = findDisclosurePageType(input.pageTypeId);

  function updateToggle(key: ToggleOption["key"], value: boolean) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[24rem_1fr]">
      <div className={`${CARD_CLASS} grid gap-5 self-start`}>
        <div className="grid gap-1">
          <label htmlFor="finder-page-type" className="text-sm font-semibold">What kind of page is it?</label>
          <select
            id="finder-page-type"
            value={input.pageTypeId}
            onChange={(event) => setInput((current) => ({ ...current, pageTypeId: event.target.value as DisclosurePageTypeId }))}
            aria-describedby="finder-page-type-hint"
            className={INPUT_CLASS}
          >
            {DISCLOSURE_PAGE_TYPES.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
          <p id="finder-page-type-hint" className="m-0 text-xs text-[var(--color-muted)]">{pageType.description}</p>
        </div>

        <fieldset className="m-0 grid gap-2 border-0 p-0">
          <legend className="mb-1 p-0 text-sm font-semibold">What does it contain?</legend>
          {TOGGLES.map((toggle) => (
            <label key={toggle.key} className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={input[toggle.key]}
                onChange={(event) => updateToggle(toggle.key, event.target.checked)}
                className="mt-1"
              />
              <span>{toggle.label}</span>
            </label>
          ))}
        </fieldset>

        <div>
          <p className="m-0 mb-2 text-sm font-semibold">Try an example</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Examples">
            {DISCLOSURE_EXAMPLES.map((example) => (
              <button
                key={example.id}
                type="button"
                onClick={() => setInput({ ...example.input })}
                className={`rounded-full border border-[var(--color-border)] px-3 py-1 text-sm font-semibold hover:border-[var(--color-accent)] ${FOCUS_RING}`}
              >
                {example.title}
              </button>
            ))}
          </div>
        </div>

        <button type="button" onClick={() => setInput(DEFAULT_DISCLOSURE_INPUT)} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>Reset</button>
        <p className="m-0 text-xs text-[var(--color-muted)]">Runs in your browser. Nothing is sent or saved.</p>
      </div>

      <div aria-live="polite" className="grid gap-4 self-start">
        {requirements.length === 0 ? (
          <section className={CARD_CLASS}>
            <h3 className="m-0">No special label needed</h3>
            <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
              This combination carries no paid material, so it needs no extra label. The independence promise still applies to every page.
            </p>
          </section>
        ) : (
          requirements.map((requirement) => (
            <section key={requirement.id} className={`${CARD_CLASS} ${KIND_BORDERS[requirement.kind]}`}>
              <p className="m-0 text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">{KIND_LABELS[requirement.kind]}</p>
              <h3 className="mb-1 mt-1">{requirement.title}</h3>
              <p className="m-0 text-sm"><strong>Where:</strong> {requirement.where}</p>
              {requirement.text && (
                <p className="mb-0 mt-2 rounded-lg bg-[var(--color-bg)] p-3 text-sm">{requirement.text}</p>
              )}
              <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]"><strong>Why:</strong> {requirement.reason}</p>
            </section>
          ))
        )}
        <p className="m-0 text-xs text-[var(--color-muted)]">
          A simplified guide to our rules, not a ruling. Where it and the policy above differ, the policy wins.
        </p>
      </div>
    </div>
  );
}