import { BADGE_CLASS, CARD_CLASS } from "@/components/shared/pageStyles";

export interface LedgerTableRow {
  id: string;
  number: string;
  meaning: string;
  base: string;
  period: string;
  reportSection: string;
  /** Shown only when showSource is true. */
  source?: string;
  kind: string;
  status: string;
}

interface LedgerTableProps {
  rows: readonly LedgerTableRow[];
  kindLabels: Record<string, string>;
  caption: string;
  showSource?: boolean;
}

/** Table of every number on a page with its base, period, section, kind and check status. */
export function LedgerTable({ rows, kindLabels, caption, showSource = false }: LedgerTableProps) {
  return (
    <div className={`${CARD_CLASS} overflow-x-auto p-0`}>
      <table className={`w-full ${showSource ? "min-w-[76rem]" : "min-w-[64rem]"} border-collapse text-left text-sm`}>
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-[var(--color-bg)] text-xs uppercase tracking-wide text-[var(--color-muted)]">
          <tr>
            <th scope="col" className="p-3">Number</th>
            <th scope="col" className="p-3">What it is</th>
            <th scope="col" className="p-3">Share of / covers</th>
            <th scope="col" className="p-3">Period</th>
            <th scope="col" className="p-3">Section</th>
            {showSource && <th scope="col" className="p-3">Source</th>}
            <th scope="col" className="p-3">Kind</th>
            <th scope="col" className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-[var(--color-border)]">
              <th scope="row" className="p-3 text-left align-top font-semibold tabular-nums">{row.number}</th>
              <td className="p-3 align-top">{row.meaning}</td>
              <td className="p-3 align-top text-[var(--color-muted)]">{row.base}</td>
              <td className="p-3 align-top">{row.period}</td>
              <td className="p-3 align-top tabular-nums">{row.reportSection}</td>
              {showSource && <td className="p-3 align-top text-xs">{row.source}</td>}
              <td className="p-3 align-top"><span className={BADGE_CLASS}>{kindLabels[row.kind] ?? row.kind}</span></td>
              <td className="p-3 align-top text-xs text-[var(--color-muted)]">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}