import styles from "./AiInEducationView.module.css";

interface DataTableProps {
  /** Describes the table for screen readers. */
  readonly caption: string;
  readonly columns: readonly string[];
  /** Each row has one cell per column; the first cell must be unique within the table. */
  readonly rows: readonly (readonly string[])[];
}

/** A responsive, accessible table that scrolls sideways on narrow screens. */
export default function DataTable({ caption, columns, rows }: DataTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table>
        <caption className={styles.visuallyHidden}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, cellIndex) => (
                <td key={`${row[0]}-${columns[cellIndex]}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}