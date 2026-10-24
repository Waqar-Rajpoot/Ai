import { CARD_CLASS } from "@/components/learn/learnStyles";
import type { VendorTable } from "@/lib/prices/benchmarkTypes";
import { formatVerifiedDate, isIsoDate } from "@/lib/prices/verification";
import { VerifiedOnLabel } from "./VerifiedOnLabel";

/** One maker's own table, clearly labelled and kept apart from independent scores. */
export function VendorScoreTable({ table }: { table: VendorTable }) {
  const isVerified = table.verifiedOn !== null && isIsoDate(table.verifiedOn);
  return (
    <section aria-labelledby={`vendor-${table.id}`} className={`${CARD_CLASS} border-amber-500/60`}>
      <p className="m-0 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Vendor-reported</p>
      <h3 id={`vendor-${table.id}`} className="mb-1 mt-1">{table.title}</h3>
      <p className="m-0 text-sm text-[var(--color-muted)]">{table.announcement}</p>

      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <caption className="sr-only">{table.title}: numbers published by {table.vendor}</caption>
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th scope="col" className="p-3">Benchmark</th>
              {table.columns.map((column) => <th key={column} scope="col" className="p-3">{column}</th>)}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((rowData) => (
              <tr key={rowData.id} className="border-t border-[var(--color-border)]">
                <th scope="row" className="p-3 align-top">
                  {rowData.benchmark}
                  <span className="block text-xs font-normal text-[var(--color-muted)]">{rowData.measures}</span>
                  <span className="block text-xs font-normal text-[var(--color-muted)]">
                    {rowData.direction === "higher" ? "Higher is better." : "Lower is better."}
                    {rowData.note ? ` ${rowData.note}` : ""}
                  </span>
                </th>
                {rowData.values.map((value, index) => (
                  <td key={table.columns[index]} className="p-3 align-top font-semibold tabular-nums">
                    {value ?? <span className="font-normal text-[var(--color-muted)]">Not stated</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mb-0 mt-3 text-sm">{table.caveat}</p>
      <p className="mb-0 mt-2 text-xs text-[var(--color-muted)]">
        {table.readThrough === "vendor-page"
          ? `Read on the maker's own page on ${formatVerifiedDate(table.retrievedOn)}.`
          : `Read through third-party reports of the maker's table on ${formatVerifiedDate(table.retrievedOn)}. The maker's page was not opened.`}{" "}
        {isVerified ? <VerifiedOnLabel verifiedOn={table.verifiedOn} /> : "Not yet verified."}{" "}
        <a href={table.sourceUrl} target="_blank" rel="noopener noreferrer">Maker page</a>
      </p>
    </section>
  );
}