"use client";

import { useMemo, useState } from "react";
import { BADGE_CLASS, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import {
  describeEstimate,
  estimateAnnualTwh,
  resolveCalculatorOptions,
} from "@/lib/society/aiPowerUse";
import { HEAVY_TASK_MULTIPLIER } from "@/lib/society/aiPowerUseConstants";
import {
  DEFAULT_HEAVY_SHARE,
  DEFAULT_PRESET_ID,
  DEFAULT_VOLUME_ID,
  HEAVY_SHARE_OPTIONS,
} from "@/lib/society/aiPowerUseData";
import { formatNumber, formatValue } from "@/lib/society/figureRegistry";
import { PERCENT_SCALE } from "@/lib/society/societyConstants";
import { ValueBar } from "./ValueBar";

const OPTIONS = resolveCalculatorOptions();

function SegmentedChoice<T extends string | number>({
  legend,
  choices,
  activeValue,
  onChoose,
}: {
  legend: string;
  choices: readonly { value: T; label: string }[];
  activeValue: T;
  onChoose: (value: T) => void;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {choices.map((choice) => (
          <button
            key={String(choice.value)}
            type="button"
            aria-pressed={activeValue === choice.value}
            onClick={() => onChoose(choice.value)}
            className={`rounded-full border px-3 py-1 text-sm font-semibold transition motion-reduce:transition-none ${FOCUS_RING} ${
              activeValue === choice.value
                ? "border-transparent bg-[image:var(--gradient-accent)] text-white"
                : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** Turn a per-query figure into an annual total. An illustration of why mix and volume matter, not a forecast. */
export function QueryEnergyCalculator() {
  const [presetId, setPresetId] = useState(DEFAULT_PRESET_ID);
  const [volumeId, setVolumeId] = useState(DEFAULT_VOLUME_ID);
  const [heavyShare, setHeavyShare] = useState(DEFAULT_HEAVY_SHARE);

  const result = useMemo(() => {
    const preset = OPTIONS.presets.find((candidate) => candidate.id === presetId) ?? OPTIONS.presets[0];
    const volume = OPTIONS.volumes.find((candidate) => candidate.id === volumeId) ?? OPTIONS.volumes[0];
    const estimate = estimateAnnualTwh(
      { queriesPerDayBillions: volume.queriesPerDayBillions, whPerTextQuery: preset.whPerQuery, heavyShare },
      OPTIONS.dataCentreTwh,
    );
    return { estimate, ...describeEstimate(estimate, OPTIONS.dataCentreTwh) };
  }, [presetId, volumeId, heavyShare]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
      <div className="grid gap-5">
        <SegmentedChoice legend="Energy of a text query" choices={OPTIONS.presets.map((preset) => ({ value: preset.id, label: preset.label }))} activeValue={presetId} onChoose={setPresetId} />
        <SegmentedChoice legend="Queries a day" choices={OPTIONS.volumes.map((volume) => ({ value: volume.id, label: volume.label }))} activeValue={volumeId} onChoose={setVolumeId} />
        <SegmentedChoice
          legend={`Share of queries that are heavy (each ${HEAVY_TASK_MULTIPLIER} times a text query)`}
          choices={HEAVY_SHARE_OPTIONS.map((share) => ({ value: share, label: `${formatNumber(Math.round(share * PERCENT_SCALE))}%` }))}
          activeValue={heavyShare}
          onChoose={setHeavyShare}
        />
        <p className="m-0 text-xs text-[var(--color-muted)]">
          The first two settings use reported figures. The heavy-task setting is our choice: the IEA says heavy tasks can use hundreds or thousands of times more, and we use the low end. Not every query is heavy, so this shows why the mix matters, not what the mix is.
        </p>
      </div>

      <aside className={`${CARD_CLASS} self-start border-[var(--color-accent)]`} aria-live="polite">
        <p className="m-0 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">Your illustration</p>
        <p className="mb-1 mt-1 text-4xl font-extrabold tabular-nums">{result.twhText}</p>
        <p className="m-0 text-sm text-[var(--color-muted)]">a year, about {formatValue(Math.round(result.estimate.blendedWhPerQuery * PERCENT_SCALE) / PERCENT_SCALE, "wh")} per query on average</p>
        <div className="my-3"><ValueBar value={result.estimate.annualTwh} max={OPTIONS.dataCentreTwh} /></div>
        <p className="m-0 text-sm">That is {result.shareText}.</p>
        <p className="mb-0 mt-3"><span className={BADGE_CLASS}>Illustration, not data</span></p>
        <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">
          Covers inference only. It leaves out training and the IEA’s point that most planned capacity may be for other workloads. The default settings reproduce the IEA’s own illustration of roughly 3.6 TWh.
        </p>
      </aside>
    </div>
  );
}