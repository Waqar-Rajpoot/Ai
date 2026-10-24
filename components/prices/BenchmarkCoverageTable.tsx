import { buildCoverage } from "@/lib/prices/benchmarkLogic";
import { DIRECTORY_MODELS } from "@/lib/prices/benchmarkPageContent";
import { INDEPENDENT_SCORES, INDEPENDENT_SOURCES } from "@/lib/prices/benchmarkRecords";
import type { CoverageStatus } from "@/lib/prices/benchmarkTypes";

const COVERAGE_ROWS = buildCoverage(DIRECTORY_MODELS, INDEPENDENT_SOURCES, INDEPENDENT_SCORES);

const STATUS_LABELS: Record<CoverageStatus, string> = {
  scored: "Scored",
  "not-ranked": "Listed, no score",
  "not-captured": "Not captured",
};

/** Which of the 14 directory models each independent source covers. Text labels, so colour is never the only signal. */
export function BenchmarkCoverageTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <caption className="sr-only">Coverage of directory models by independent source</caption>
        <thead className="bg-[var(--color-surface)]">
          <tr>
            <th scope="col" className="p-3">Model</th>
            {INDEPENDENT_SOURCES.map((source) => <th key={source.id} scope="col" className="p-3">{source.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {COVERAGE_ROWS.map((coverage) => (
            <tr key={coverage.modelName} className="border-t border-[var(--color-border)]">
              <th scope="row" className="p-3 align-top">{coverage.modelName}</th>
              {coverage.cells.map((cell) => (
                <td key={cell.sourceId} className={`p-3 align-top ${cell.status === "scored" ? "font-semibold" : "text-[var(--color-muted)]"}`}>
                  {STATUS_LABELS[cell.status]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}