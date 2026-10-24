import type { TableRow } from "@/types";
import styles from "./DataTable.module.css";

interface DataTableProps {
  /** Describes the table for screen readers and as a visible heading. */
  caption: string;
  /** Header of the first column, which holds each row's label. */
  rowHeaderLabel: string;
  columnHeaders: readonly string[];
  rows: readonly TableRow[];
}

/** Accessible table that scrolls sideways inside its own box on narrow screens. */
export function DataTable({ caption, rowHeaderLabel, columnHeaders, rows }: DataTableProps) {
  return (
    <div className={styles.scroll} role="region" aria-label={caption} tabIndex={0}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{rowHeaderLabel}</th>
            {columnHeaders.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, index) => (
                <td key={`${row.label}-${columnHeaders[index] ?? index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}