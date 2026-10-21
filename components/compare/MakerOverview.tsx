import Link from "next/link";
import { formatBenchLm, getReviewHref, MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import { getPriceTier, PRICE_TIER_LABELS } from "@/lib/compare/modelFilters";
import { getMakerSummaries } from "@/lib/compare/modelStats";
import { CARD_CLASS, FOCUS_RING } from "../learn/learnStyles";

/** Every maker with its models, best score first. */
export function MakerOverview() {
  const summaries = getMakerSummaries(MODEL_DIRECTORY_ROWS);

  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {summaries.map((summary) => (
        <li key={summary.maker}>
          <div className={`${CARD_CLASS} h-full`}>
            <h3 className="m-0 text-lg">{summary.maker}</h3>
            <p className="mb-0 mt-1 text-sm text-[var(--color-muted)]">
              {summary.models.length} {summary.models.length === 1 ? "model" : "models"}
            </p>
            <ul className="mb-0 mt-3 grid list-none gap-2 p-0 text-sm">
              {summary.models.map((row) => (
                <li key={row.id} className="flex flex-wrap items-baseline justify-between gap-x-3">
                  {row.isReviewPublished ? (
                    <Link href={getReviewHref(row)} className={FOCUS_RING}>{row.name}</Link>
                  ) : (
                    <span>{row.name}</span>
                  )}
                  <span className="text-xs text-[var(--color-muted)]">
                    {PRICE_TIER_LABELS[getPriceTier(row)]} · {formatBenchLm(row.benchLm)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}