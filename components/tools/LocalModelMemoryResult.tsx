import { BADGE_CLASS, CARD_CLASS } from "@/components/shared/pageStyles";
import {
  describeFit,
  describeUsableMemory,
  formatGb,
  formatParameters,
  formatTokensPerSecond,
  type EstimatorResult,
  type FitStatus,
} from "@/lib/tools/memoryEstimate";
import { RUNTIME_MARGIN_FRACTION } from "@/lib/tools/memoryEstimateConstants";

const MARGIN_PERCENT = Math.round(RUNTIME_MARGIN_FRACTION * 100);
const PERCENT = 100;

const FIT_HEADINGS: Record<FitStatus, string> = {
  comfortable: "Fits comfortably",
  tight: "Fits, but it is tight",
  "too-big": "Does not fit",
};

const FIT_BORDERS: Record<FitStatus, string> = {
  comfortable: "border-emerald-500",
  tight: "border-amber-500",
  "too-big": "border-red-500",
};

interface LocalModelMemoryResultProps {
  result: EstimatorResult;
}

/** The result panel: total, breakdown, device fit, speed ceiling and warnings. */
export function LocalModelMemoryResult({ result }: LocalModelMemoryResultProps) {
  const { estimate, fit, hardware } = result;
  const segments = [
    { key: "weights", label: "Model weights", valueGb: estimate.weightsGb, barClass: "bg-[var(--color-accent)]" },
    { key: "margin", label: `Safety margin (${MARGIN_PERCENT}%)`, valueGb: estimate.marginGb, barClass: "bg-sky-500" },
    { key: "cache", label: "Context cache", valueGb: estimate.kvCacheGb, barClass: "bg-amber-500" },
  ];
  const quickRuleGb = estimate.weightsGb + estimate.marginGb;
  const barDescription = segments.map((segment) => `${segment.label} ${formatGb(segment.valueGb)}`).join(", ");

  return (
    <div className="grid gap-4">
      <section className={CARD_CLASS} aria-labelledby="memory-total-heading">
        <p className="m-0 text-sm text-[var(--color-muted)]">
          {formatParameters(result.parametersBillions)} model · {result.precisionLabel}
        </p>
        <h3 id="memory-total-heading" className="mb-1 mt-1 text-3xl font-extrabold tabular-nums">
          About {formatGb(estimate.totalGb)} needed
        </h3>
        <p className="m-0 text-sm text-[var(--color-muted)]">
          Without any context, the quick rule (weights plus {MARGIN_PERCENT}%) is {formatGb(quickRuleGb)}.
        </p>

        <div
          role="img"
          aria-label={`Memory breakdown: ${barDescription}`}
          className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-[var(--color-border)]"
        >
          {segments.map((segment) => (
            <div
              key={segment.key}
              className={segment.barClass}
              style={{ width: `${(segment.valueGb / estimate.totalGb) * PERCENT}%` }}
            />
          ))}
        </div>
        <dl className="m-0 mt-3 grid gap-2 text-sm sm:grid-cols-3">
          {segments.map((segment) => (
            <div key={segment.key} className="flex items-start gap-2">
              <span aria-hidden="true" className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${segment.barClass}`} />
              <div>
                <dt className="text-[var(--color-muted)]">{segment.label}</dt>
                <dd className="m-0 font-semibold tabular-nums">{formatGb(segment.valueGb)}</dd>
              </div>
            </div>
          ))}
        </dl>
        <p className="mb-0 mt-3 text-xs text-[var(--color-muted)]">
          Context: {result.contextTokens.toLocaleString("en-US")} tokens, {result.kvPrecisionLabel.toLowerCase()}, using the {result.architectureLabel} ({result.architecture.layers} layers, {result.architecture.kvHeads} KV heads, head size {result.architecture.headDimension}).
        </p>
        {result.precisionQuality && (
          <p className="mb-0 mt-2 text-sm">
            <strong>Quality at this precision:</strong> {result.precisionQuality}
          </p>
        )}
      </section>

      {fit && hardware ? (
        <section className={`${CARD_CLASS} ${FIT_BORDERS[fit.status]}`} aria-labelledby="memory-fit-heading">
          <h3 id="memory-fit-heading" className="m-0">
            {FIT_HEADINGS[fit.status]}
          </h3>
          <p className="mb-0 mt-2 text-sm">
            <strong>{hardware.label}:</strong> {describeFit(fit)}.
          </p>
          <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">{describeUsableMemory(hardware)}</p>

          <h4 className="mb-2 mt-4 text-sm font-semibold">Largest model this device can hold (weights and margin, before context)</h4>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
              <caption className="sr-only">Largest model size by precision for the selected device</caption>
              <thead className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="py-2 pr-3">Precision</th>
                  <th scope="col" className="py-2">Up to about</th>
                </tr>
              </thead>
              <tbody>
                {result.maxSizes.map((row) => (
                  <tr key={row.precision.id} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="py-2 pr-3 font-normal">{row.precision.label}</th>
                    <td className="py-2 font-semibold tabular-nums">{formatParameters(row.maxParametersBillions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className={CARD_CLASS}>
          <h3 className="m-0">Pick a device to check the fit</h3>
          <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
            Choose a graphics card, a Mac or a PC in the form, or enter your own memory. You will also get a speed ceiling and the largest model it can hold.
          </p>
        </section>
      )}

      <section className={CARD_CLASS} aria-labelledby="memory-speed-heading">
        <h3 id="memory-speed-heading" className="m-0">Speed ceiling</h3>
        {result.speedCeilingTokensPerSecond !== null ? (
          <>
            <p className="mb-0 mt-2 text-2xl font-extrabold tabular-nums">
              Up to about {formatTokensPerSecond(result.speedCeilingTokensPerSecond)} tokens per second
            </p>
            <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
              Memory bandwidth divided by the active weights ({formatParameters(result.activeParametersBillions)} at {result.bitsPerWeight.toFixed(1)} bits). This is a ceiling, not a forecast: real speeds are lower, and longer contexts slow things further.
            </p>
          </>
        ) : (
          <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">
            Add a device with a memory bandwidth to see a speed ceiling. Many spec pages list it in GB per second.
          </p>
        )}
      </section>

      {result.warnings.length > 0 && (
        <section className={`${CARD_CLASS} border-amber-500/60`} aria-labelledby="memory-warnings-heading">
          <h3 id="memory-warnings-heading" className="m-0">Worth knowing</h3>
          <ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">
            {result.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </section>
      )}

      <p className="m-0">
        <span className={BADGE_CLASS}>Calculated estimate, not measured</span>
      </p>
    </div>
  );
}