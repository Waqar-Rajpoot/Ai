import { CARD_CLASS } from "@/components/shared/pageStyles";
import { findPriceRow } from "@/lib/prices/apiCostTable";
import type { CostScenario } from "@/lib/compare/bestFor";
import {
  buildCostRows,
  findCheapestPerScenario,
  formatCostUsd,
  type TokenRates,
} from "@/lib/compare/costPerTask";

interface BestForCostTableProps {
  scenarios: readonly CostScenario[];
  modelIds: readonly string[];
}

/**
 * Reads token prices from a price row. Edit this one function if your row stores rates under other names.
 * @param row A row returned by `findPriceRow`.
 */
function readTokenRates(row: any): TokenRates {
  return {
    input: row.rate.input,
    output: row.rate.output,
    cachedInput: row.rate.cachedInput ?? null,
  };
}

/** Cost of each scenario on each model, with the cheapest model per scenario marked. Prices come from the API price data. */
export function BestForCostTable({ scenarios, modelIds }: BestForCostTableProps) {
  const models = modelIds.flatMap((modelId) => {
    const row = findPriceRow(modelId);
    return row ? [{ modelId, modelName: row.model, rates: readTokenRates(row) }] : [];
  });
  const rows = buildCostRows(scenarios, models);
  const cheapest = findCheapestPerScenario(rows);

  return (
    <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <caption className="sr-only">Estimated cost in US dollars of each job on each model</caption>
        <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
          <tr>
            <th scope="col" className="p-3">Model</th>
            {scenarios.map((scenario) => (
              <th key={scenario.id} scope="col" className="p-3 text-right">
                {scenario.label}
                <span className="block text-xs font-normal normal-case tracking-normal">{scenario.description}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.modelId} className="border-t border-[var(--color-border)]">
              <th scope="row" className="p-3 font-semibold">{row.modelName}</th>
              {row.costs.map((cost, column) => (
                <td key={scenarios[column].id} className="p-3 text-right tabular-nums">
                  {formatCostUsd(cost)}
                  {cheapest[column] === rowIndex && (
                    <span className="ml-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">Lowest</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="m-0 border-t border-[var(--color-border)] p-3 text-xs text-[var(--color-muted)]">
        Estimates use list prices and your cache share. Surcharges for very long prompts are not included, and real bills depend on how many thinking tokens a model uses.
      </p>
    </div>
  );
}