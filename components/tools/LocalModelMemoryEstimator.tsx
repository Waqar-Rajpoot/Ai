"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BUTTON_OUTLINE, CARD_CLASS, FOCUS_RING, INPUT_CLASS } from "@/components/shared/pageStyles";
import {
  CONTEXT_OPTIONS,
  CUSTOM_HARDWARE_ID,
  CUSTOM_PRECISION_ID,
  HARDWARE_KIND_LABELS,
  HARDWARE_PRESETS,
  KV_PRECISIONS,
  NO_HARDWARE_ID,
  PRECISIONS,
  PRECISION_GROUP_LABELS,
  SIZE_PRESETS,
  type HardwareKind,
  type PrecisionGroup,
} from "@/lib/tools/localModelData";
import {
  DEFAULT_FORM_VALUES,
  buildSummaryText,
  describeContextLength,
  runEstimator,
  type EstimatorFormValues,
} from "@/lib/tools/memoryEstimate";
import { COPY_FEEDBACK_MILLISECONDS } from "@/lib/tools/memoryEstimateConstants";
import { LocalModelMemoryResult } from "./LocalModelMemoryResult";

type CopyState = "idle" | "copied" | "failed";

const PRECISION_GROUPS: readonly PrecisionGroup[] = ["full", "eight-bit", "quantized"];
const HARDWARE_KINDS: readonly HardwareKind[] = ["gpu", "unified", "cpu"];

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}

function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      {hint && <p id={`${id}-hint`} className="m-0 text-xs text-[var(--color-muted)]">{hint}</p>}
      {children}
    </div>
  );
}

/** The estimator form. All maths lives in lib/tools/memoryEstimate.ts. Runs in the browser and saves nothing. */
export function LocalModelMemoryEstimator() {
  const [values, setValues] = useState<EstimatorFormValues>(DEFAULT_FORM_VALUES);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const outcome = useMemo(() => runEstimator(values), [values]);

  useEffect(() => {
    if (copyState === "idle") return undefined;
    const timer = window.setTimeout(() => setCopyState("idle"), COPY_FEEDBACK_MILLISECONDS);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  function updateValue<Key extends keyof EstimatorFormValues>(key: Key, value: EstimatorFormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function copyResult() {
    if (!outcome.ok) return;
    try {
      await navigator.clipboard.writeText(buildSummaryText(outcome.result));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  const selectedPrecision = PRECISIONS.find((option) => option.id === values.precisionId);
  const isCustomPrecision = values.precisionId === CUSTOM_PRECISION_ID;
  const isCustomHardware = values.hardwareId === CUSTOM_HARDWARE_ID;

  return (
    <div className="grid gap-6 lg:grid-cols-[24rem_1fr]">
      <div className={`${CARD_CLASS} grid gap-5 self-start`}>
        <Field id="parameters-input" label="Model size (billions of parameters)" hint="From the model name: 27B means 27 billion.">
          <input
            id="parameters-input"
            type="text"
            inputMode="decimal"
            value={values.parametersText}
            onChange={(event) => updateValue("parametersText", event.target.value)}
            aria-describedby="parameters-input-hint"
            className={INPUT_CLASS}
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Common model sizes">
            {SIZE_PRESETS.map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={values.parametersText === String(size)}
                onClick={() => updateValue("parametersText", String(size))}
                className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
                  values.parametersText === String(size)
                    ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                    : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
                }`}
              >
                {size}B
              </button>
            ))}
          </div>
        </Field>

        <Field id="precision-select" label="Precision (bits per weight)" hint="Fewer bits mean a smaller file and some loss of quality. 4-bit is the usual choice.">
          <select
            id="precision-select"
            value={values.precisionId}
            onChange={(event) => updateValue("precisionId", event.target.value)}
            aria-describedby="precision-select-hint"
            className={INPUT_CLASS}
          >
            {PRECISION_GROUPS.map((group) => (
              <optgroup key={group} label={PRECISION_GROUP_LABELS[group]}>
                {PRECISIONS.filter((option) => option.group === group).map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}, about {option.bitsPerWeight} bits
                  </option>
                ))}
              </optgroup>
            ))}
            <option value={CUSTOM_PRECISION_ID}>Custom bytes per parameter</option>
          </select>
          {selectedPrecision && <p className="m-0 text-xs text-[var(--color-muted)]">{selectedPrecision.quality}</p>}
          {isCustomPrecision && (
            <input
              type="text"
              inputMode="decimal"
              aria-label="Bytes per parameter"
              value={values.customBytesText}
              onChange={(event) => updateValue("customBytesText", event.target.value)}
              placeholder="for example 0.5"
              className={INPUT_CLASS}
            />
          )}
        </Field>

        <div className="grid gap-2">
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.isMixtureOfExperts}
              onChange={(event) => updateValue("isMixtureOfExperts", event.target.checked)}
              className="mt-1"
            />
            <span>Mixture-of-experts model (the name often shows two sizes, like 30B-A3B)</span>
          </label>
          {values.isMixtureOfExperts && (
            <Field id="active-input" label="Active parameters (billions)" hint="Only affects the speed ceiling. Memory uses the total size.">
              <input
                id="active-input"
                type="text"
                inputMode="decimal"
                value={values.activeParametersText}
                onChange={(event) => updateValue("activeParametersText", event.target.value)}
                aria-describedby="active-input-hint"
                placeholder="for example 3"
                className={INPUT_CLASS}
              />
            </Field>
          )}
        </div>

        <Field id="context-select" label="Context length" hint="How much text the model holds at once. Longer contexts need a bigger cache.">
          <select
            id="context-select"
            value={values.contextTokens}
            onChange={(event) => updateValue("contextTokens", Number(event.target.value))}
            aria-describedby="context-select-hint"
            className={INPUT_CLASS}
          >
            {CONTEXT_OPTIONS.map((tokens) => (
              <option key={tokens} value={tokens}>{describeContextLength(tokens)}</option>
            ))}
          </select>
        </Field>

        <Field id="kv-select" label="Context cache precision">
          <select
            id="kv-select"
            value={values.kvPrecisionId}
            onChange={(event) => updateValue("kvPrecisionId", event.target.value)}
            className={INPUT_CLASS}
          >
            {KV_PRECISIONS.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
          <p className="m-0 text-xs text-[var(--color-muted)]">
            {KV_PRECISIONS.find((option) => option.id === values.kvPrecisionId)?.note}
          </p>
        </Field>

        <details className="rounded-xl border border-[var(--color-border)] p-3">
          <summary className={`cursor-pointer text-sm font-semibold ${FOCUS_RING}`}>Advanced: model layout (affects the context cache)</summary>
          <div className="mt-3 grid gap-3">
            <p className="m-0 text-xs text-[var(--color-muted)]">
              {outcome.ok
                ? `Using the ${outcome.result.architectureLabel}: ${outcome.result.architecture.layers} layers, ${outcome.result.architecture.kvHeads} KV heads, head size ${outcome.result.architecture.headDimension}.`
                : "Fix the highlighted inputs to see the layout in use."}
            </p>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={values.useCustomArchitecture}
                onChange={(event) => updateValue("useCustomArchitecture", event.target.checked)}
                className="mt-1"
              />
              <span>Enter my model&apos;s own numbers (from its model card)</span>
            </label>
            {values.useCustomArchitecture && (
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <Field id="layers-input" label="Layers">
                  <input id="layers-input" type="text" inputMode="numeric" value={values.layersText} onChange={(event) => updateValue("layersText", event.target.value)} className={INPUT_CLASS} />
                </Field>
                <Field id="kv-heads-input" label="KV heads">
                  <input id="kv-heads-input" type="text" inputMode="numeric" value={values.kvHeadsText} onChange={(event) => updateValue("kvHeadsText", event.target.value)} className={INPUT_CLASS} />
                </Field>
                <Field id="head-size-input" label="Head size">
                  <input id="head-size-input" type="text" inputMode="numeric" value={values.headDimensionText} onChange={(event) => updateValue("headDimensionText", event.target.value)} className={INPUT_CLASS} />
                </Field>
              </div>
            )}
          </div>
        </details>

        <Field id="hardware-select" label="Your device (optional)" hint="Choose one to check the fit and get a speed ceiling.">
          <select
            id="hardware-select"
            value={values.hardwareId}
            onChange={(event) => updateValue("hardwareId", event.target.value)}
            aria-describedby="hardware-select-hint"
            className={INPUT_CLASS}
          >
            <option value={NO_HARDWARE_ID}>No device, just show the memory</option>
            {HARDWARE_KINDS.map((kind) => (
              <optgroup key={kind} label={HARDWARE_KIND_LABELS[kind]}>
                {HARDWARE_PRESETS.filter((preset) => preset.kind === kind).map((preset) => (
                  <option key={preset.id} value={preset.id}>{preset.label}</option>
                ))}
              </optgroup>
            ))}
            <option value={CUSTOM_HARDWARE_ID}>My own numbers</option>
          </select>
          {isCustomHardware && (
            <div className="grid gap-3">
              <select
                aria-label="Type of memory"
                value={values.customKind}
                onChange={(event) => updateValue("customKind", event.target.value as HardwareKind)}
                className={INPUT_CLASS}
              >
                {HARDWARE_KINDS.map((kind) => (
                  <option key={kind} value={kind}>{HARDWARE_KIND_LABELS[kind]}</option>
                ))}
              </select>
              <input
                type="text"
                inputMode="decimal"
                aria-label="Memory in GB"
                placeholder="Memory in GB"
                value={values.customMemoryText}
                onChange={(event) => updateValue("customMemoryText", event.target.value)}
                className={INPUT_CLASS}
              />
              <input
                type="text"
                inputMode="decimal"
                aria-label="Memory bandwidth in GB per second (optional)"
                placeholder="Bandwidth in GB per second (optional)"
                value={values.customBandwidthText}
                onChange={(event) => updateValue("customBandwidthText", event.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          )}
        </Field>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setValues(DEFAULT_FORM_VALUES)} className={`${BUTTON_OUTLINE} !px-4 !py-1.5 text-sm`}>
            Reset
          </button>
          <button
            type="button"
            onClick={copyResult}
            disabled={!outcome.ok}
            className={`rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold disabled:opacity-50 ${FOCUS_RING}`}
          >
            Copy result
          </button>
          <span role="status" aria-live="polite" className="self-center text-sm text-[var(--color-muted)]">
            {copyState === "copied" && "Copied."}
            {copyState === "failed" && "Could not copy."}
          </span>
        </div>
        <p className="m-0 text-xs text-[var(--color-muted)]">Your numbers stay in your browser. Nothing is sent or saved.</p>
      </div>

      <div aria-live="polite">
        {outcome.ok ? (
          <LocalModelMemoryResult result={outcome.result} />
        ) : (
          <div role="alert" className={`${CARD_CLASS} border-red-500`}>
            <h3 className="m-0">Check these inputs</h3>
            <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
              {outcome.errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}