import type { ReactNode } from "react";
import { CARD_CLASS } from "@/components/shared/pageStyles";

export interface PolicyTableColumn<Row> {
  id: string;
  header: string;
  render: (row: Row) => ReactNode;
  /** Makes the cell a row header, so screen readers announce it with each value. */
  isRowHeader?: boolean;
}

interface PolicyTableProps<Row> {
  caption: string;
  columns: readonly PolicyTableColumn<Row>[];
  rows: readonly Row[];
  getRowKey: (row: Row) => string;
  /** Table width at which it starts to scroll sideways. */
  minWidthRem?: number;
}

/** A scrollable table with a hidden caption, for the policy's data lists. */
export function PolicyTable<Row>({ caption, columns, rows, getRowKey, minWidthRem = 44 }: PolicyTableProps<Row>) {
  return (
    <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
      <table className="w-full border-collapse text-left text-sm" style={{ minWidth: `${minWidthRem}rem` }}>
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
          <tr>
            {columns.map((column) => (
              <th key={column.id} scope="col" className="p-3">{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="border-t border-[var(--color-border)]">
              {columns.map((column) =>
                column.isRowHeader ? (
                  <th key={column.id} scope="row" className="p-3 text-left align-top font-semibold">{column.render(row)}</th>
                ) : (
                  <td key={column.id} className="p-3 align-top text-[var(--color-muted)]">{column.render(row)}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}