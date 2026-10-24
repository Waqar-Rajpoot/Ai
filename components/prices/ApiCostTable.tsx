import { API_PRICE_ROWS, API_PRICES_CHECKED_ON, buildPriceNotes, formatPricePerMillion, type ApiPriceRow } from "@/lib/prices/apiCostTable";

const HEADERS = ["Model", "Maker", "Type", "Input", "Output", "Context", "Price notes", "Source"] as const;

/** List prices per million tokens, with a note column and a link to each provider's own page. */
export function ApiCostTable({ rows = API_PRICE_ROWS }: { rows?: readonly ApiPriceRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
      <table className="w-full min-w-[60rem] border-collapse text-left text-sm">
        <caption className="sr-only">API list prices per million tokens, checked {API_PRICES_CHECKED_ON}</caption>
        <thead className="bg-[var(--color-surface)]">
          <tr>
            {HEADERS.map((header) => (
              <th key={header} scope="col" className="p-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[var(--color-border)]">
              <th scope="row" className="p-3 align-top">{row.model}</th>
              <td className="p-3 align-top text-[var(--color-muted)]">{row.maker}</td>
              <td className="p-3 align-top text-[var(--color-muted)]">{row.access === "open-weight" ? "Open weights" : "Closed"}</td>
              <td className="p-3 align-top">{formatPricePerMillion(row.rate.inputPricePerMillion)}</td>
              <td className="p-3 align-top">{formatPricePerMillion(row.rate.outputPricePerMillion)}</td>
              <td className="p-3 align-top text-[var(--color-muted)]">{row.contextWindow}</td>
              <td className="p-3 align-top text-xs text-[var(--color-muted)]">
                <ul className="m-0 grid list-none gap-1 p-0">
                  {buildPriceNotes(row).map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </td>
              <td className="p-3 align-top">
                <a href={row.sourceHref} target="_blank" rel="noopener noreferrer">
                  {row.sourceName}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}