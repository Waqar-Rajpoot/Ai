"use client";

import { useId, useMemo, useState } from "react";
import { MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import {
  CUSTOM_TASK_ID,
  formatCostMultiple,
  formatTaskCost,
  getCostCaveat,
  rankByTaskCost,
  TASK_PRESETS,
} from "@/lib/compare/modelCost";
import { parseNumberField } from "@/lib/shared/numberInput";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

const FIELD_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

/** Ranks every model by what one task would cost at list price. Token counts can be edited. */
export function TaskCostTable() {
  const presetId = useId();
  const inputId = useId();
  const outputId = useId();
  const firstPreset = TASK_PRESETS[0];

  const [selectedPresetId, setSelectedPresetId] = useState<string>(firstPreset.id);
  const [inputText, setInputText] = useState(String(firstPreset.inputTokens));
  const [outputText, setOutputText] = useState(String(firstPreset.outputTokens));

  const ranked = useMemo(
    () => rankByTaskCost(MODEL_DIRECTORY_ROWS, parseNumberField(inputText), parseNumberField(outputText)),
    [inputText, outputText],
  );

  function choosePreset(nextId: string) {
    setSelectedPresetId(nextId);
    const preset = TASK_PRESETS.find((candidate) => candidate.id === nextId);
    if (preset) {
      setInputText(String(preset.inputTokens));
      setOutputText(String(preset.outputTokens));
    }
  }

  return (
    <div className="grid gap-4">
      <div className={`${CARD_CLASS} grid gap-4 md:grid-cols-3`}>
        <div>
          <label htmlFor={presetId} className="mb-1 block text-sm font-semibold">Example task</label>
          <select id={presetId} value={selectedPresetId} onChange={(event) => choosePreset(event.target.value)} className={FIELD_CLASS}>
            {TASK_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>{preset.label}</option>
            ))}
            <option value={CUSTOM_TASK_ID}>Your own numbers</option>
          </select>
        </div>
        <div>
          <label htmlFor={inputId} className="mb-1 block text-sm font-semibold">Tokens in</label>
          <input
            id={inputId}
            type="text"
            inputMode="numeric"
            value={inputText}
            onChange={(event) => {
              setInputText(event.target.value);
              setSelectedPresetId(CUSTOM_TASK_ID);
            }}
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor={outputId} className="mb-1 block text-sm font-semibold">Tokens out</label>
          <input
            id={outputId}
            type="text"
            inputMode="numeric"
            value={outputText}
            onChange={(event) => {
              setOutputText(event.target.value);
              setSelectedPresetId(CUSTOM_TASK_ID);
            }}
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div role="status" aria-live="polite">
        {ranked ? (
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <caption className="sr-only">Models ranked by the list-price cost of one task, cheapest first</caption>
              <thead className="bg-[var(--color-surface)]">
                <tr>
                  <th scope="col" className="p-3">#</th>
                  <th scope="col" className="p-3">Model</th>
                  <th scope="col" className="p-3">Maker</th>
                  <th scope="col" className="p-3">Cost for this task</th>
                  <th scope="col" className="p-3">Compared with cheapest</th>
                  <th scope="col" className="p-3">Price conditions</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((entry, index) => (
                  <tr key={entry.row.id} className="border-t border-[var(--color-border)]">
                    <td className="p-3 align-top text-[var(--color-muted)]">{index + 1}</td>
                    <th scope="row" className="p-3 align-top">{entry.row.name}</th>
                    <td className="p-3 align-top text-[var(--color-muted)]">{entry.row.maker}</td>
                    <td className="p-3 align-top font-semibold">{formatTaskCost(entry.dollars)}</td>
                    <td className="p-3 align-top">{formatCostMultiple(entry.timesCheapest)}</td>
                    <td className="p-3 align-top text-xs text-[var(--color-muted)]">{getCostCaveat(entry.row) || "None noted"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="m-0 rounded-2xl border border-dashed border-[var(--color-border)] p-5 text-[var(--color-muted)]">
            Enter whole numbers of tokens, at least one above zero. A word is usually a little more than one token.
          </p>
        )}
      </div>
    </div>
  );
}