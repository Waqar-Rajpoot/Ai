import { DataTable } from "@/components/shared/DataTable";
import { COMPARISON_COLUMN_HEADERS, COMPARISON_ROWS } from "@/lib/prices/freeLimits";

/** The three free plans side by side. */
export function FreeLimitsTable() {
  return (
    <DataTable
      caption="Free plans side by side"
      rowHeaderLabel="What to compare"
      columnHeaders={COMPARISON_COLUMN_HEADERS}
      rows={COMPARISON_ROWS}
    />
  );
}