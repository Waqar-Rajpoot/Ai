import type { ComparisonTableContent } from "@/lib/learn/expertContent";

/** Responsive table. The first cell of each row is the row heading. */
export function ComparisonTable({ caption, headers, rows }: ComparisonTableContent) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[var(--color-surface)]">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="p-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-[var(--color-border)]">
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th key={`${row[0]}-${cellIndex}`} scope="row" className="p-3 align-top">
                    {cell}
                  </th>
                ) : (
                  <td key={`${row[0]}-${cellIndex}`} className="p-3 align-top text-[var(--color-muted)]">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}