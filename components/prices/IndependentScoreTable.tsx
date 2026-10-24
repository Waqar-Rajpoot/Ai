import { formatScore, formatMargin, isScoreStale } from "@/lib/prices/benchmarkLogic";
import type { IndependentScore, IndependentSource } from "@/lib/prices/benchmarkTypes";
import { formatVerifiedDate, isIsoDate } from "@/lib/prices/verification";
import { VerifiedOnLabel } from "./VerifiedOnLabel";

interface IndependentScoreTableProps {
  source: IndependentSource;
  scores: readonly IndependentScore[];
  todayIso: string;
}

const EVIDENCE_LABELS = { supported: "Supported", estimated: "Estimated" } as const;

/** One independent source's scores. Every source uses the same columns. */
export function IndependentScoreTable({ source, scores, todayIso }: IndependentScoreTableProps) {
  return (
    <section aria-labelledby={`source-${source.id}`}>
      <div className="mb-3">
        <h3 id={`source-${source.id}`} className="m-0">{source.name}</h3>
        <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
          {source.publisher} · {source.scale}
          {source.versionNote ? ` · ${source.versionNote}` : ""}
        </p>
        <p className="mb-0 mt-2 text-sm">{source.method}</p>
        <details className="mt-2 text-sm">
          <summary className="cursor-pointer font-semibold">How to read this table</summary>
          <ul className="mb-0 mt-2 grid gap-1 pl-5 text-[var(--color-muted)]">
            {source.marginNote && <li>Margin: {source.marginNote}</li>}
            {source.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}
          </ul>
        </details>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
        <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
          <caption className="sr-only">{source.name}: independent scores, highest first unless sorted otherwise</caption>
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th scope="col" className="p-3">Model</th>
              <th scope="col" className="p-3">Maker</th>
              <th scope="col" className="p-3">{source.scoreLabel}</th>
              <th scope="col" className="p-3">Margin</th>
              <th scope="col" className="p-3">Evidence</th>
              <th scope="col" className="p-3">Snapshot</th>
              <th scope="col" className="p-3">Check</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry) => {
              const isVerified = entry.verifiedOn !== null && isIsoDate(entry.verifiedOn);
              return (
                <tr key={entry.id} className="border-t border-[var(--color-border)]">
                  <th scope="row" className="p-3 align-top">
                    {entry.modelName}
                    {entry.setting && <span className="block text-xs font-normal text-[var(--color-muted)]">{entry.setting}</span>}
                    {entry.note && <span className="block text-xs font-normal text-[var(--color-muted)]">{entry.note}</span>}
                  </th>
                  <td className="p-3 align-top">{entry.maker}</td>
                  <td className="p-3 align-top font-semibold tabular-nums">{entry.score === null ? "—" : formatScore(entry.score)}</td>
                  <td className="p-3 align-top tabular-nums text-[var(--color-muted)]">{formatMargin(entry.margin)}</td>
                  <td className="p-3 align-top text-[var(--color-muted)]">{entry.evidence ? EVIDENCE_LABELS[entry.evidence] : "—"}</td>
                  <td className="p-3 align-top">
                    {formatVerifiedDate(entry.asOf)}
                    {isScoreStale(entry.asOf, todayIso) && (
                      <span className="mt-1 block text-xs font-semibold text-amber-600 dark:text-amber-400">Older than 14 days</span>
                    )}
                  </td>
                  <td className="p-3 align-top text-xs">
                    {isVerified ? (
                      <VerifiedOnLabel verifiedOn={entry.verifiedOn} />
                    ) : (
                      <span className="text-[var(--color-muted)]">Not yet verified. Read through third-party reports.</span>
                    )}
                    <a href={source.officialUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block">Source page</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}