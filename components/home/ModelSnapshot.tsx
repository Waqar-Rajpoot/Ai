import Link from "next/link";
import { BADGE_CLASS, BUTTON_PRIMARY, CARD_CLASS, FOCUS_RING } from "@/components/shared/pageStyles";
import { BEST_FOR_LINKS, HOME_TOP_MODEL_COUNT } from "@/lib/home/homeContent";
import { getTopModels } from "@/lib/home/homeLogic";
import { API_PRICES_CHECKED_ON, formatRate } from "@/lib/prices/apiCostTable";
import { getSourceById } from "@/lib/prices/benchmarkDigest";
import { formatIsoDate } from "@/lib/prices/formatPrice";

/** The top models by BenchLM score, with price, context and a review link. */
export function ModelSnapshot() {
  const rows = getTopModels(HOME_TOP_MODEL_COUNT);
  const source = getSourceById("benchlm");

  return (
    <div>
      <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
        <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
          <caption className="sr-only">Top AI models by BenchLM score, with API price and context window</caption>
          <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
            <tr>
              <th scope="col" className="p-3">#</th>
              <th scope="col" className="p-3">Model</th>
              <th scope="col" className="p-3">BenchLM score</th>
              <th scope="col" className="p-3">API price (in / out per million tokens)</th>
              <th scope="col" className="p-3">Context</th>
              <th scope="col" className="p-3">Best for</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ score, price }, index) => (
              <tr key={score.model} className="border-t border-[var(--color-border)]">
                <td className="p-3 align-top tabular-nums text-[var(--color-muted)]">{index + 1}</td>
                <th scope="row" className="p-3 text-left align-top font-semibold">
                  {price ? <Link href={`/compare/reviews/${price.id}`} className={FOCUS_RING}>{score.model}</Link> : score.model}
                  <span className="block text-xs font-normal text-[var(--color-muted)]">{price?.maker ?? ""}</span>
                </th>
                <td className="p-3 align-top font-semibold tabular-nums">{score.display}</td>
                <td className="p-3 align-top tabular-nums">{price ? formatRate(price.rate) : "—"}</td>
                <td className="p-3 align-top tabular-nums">{price?.contextWindow ?? "—"}</td>
                <td className="p-3 align-top text-[var(--color-muted)]">{price?.bestFor ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mb-0 mt-3 text-sm text-[var(--color-muted)]">
        BenchLM scores as of {source ? formatIsoDate(source.asOf) : "the date shown on the benchmarks page"}. Prices verified on {API_PRICES_CHECKED_ON}. A score is a shortlist, not a verdict. See the{" "}
        <Link href="/prices/benchmarks">benchmark digest</Link> for independent and vendor-reported scores, kept apart.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link href="/compare/models" className={BUTTON_PRIMARY}>Open the model directory</Link>
        <span className="text-sm text-[var(--color-muted)]">or jump to a best-for list:</span>
      </div>
      <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
        {BEST_FOR_LINKS.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={`${BADGE_CLASS} text-[var(--color-text)] no-underline hover:border-[var(--color-accent)] ${FOCUS_RING}`}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}