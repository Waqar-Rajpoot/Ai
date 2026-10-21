import Link from "next/link";
import { getRoundupCandidates, getRoundupHref, ROUNDUPS } from "@/lib/compare/bestFor";
import { MODEL_DIRECTORY_ROWS } from "@/lib/compare/modelDirectory";
import { FOCUS_RING } from "../learn/learnStyles";

/** One row per roundup: where to find it, which models to start with, and its status. */
export function RoundupGlanceTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)]">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <caption className="sr-only">All best-for roundups with their starting-point models and status</caption>
        <thead className="bg-[var(--color-surface)]">
          <tr>
            <th scope="col" className="p-3">Roundup</th>
            <th scope="col" className="p-3">Level</th>
            <th scope="col" className="p-3">Starting points</th>
            <th scope="col" className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {ROUNDUPS.map((roundup) => {
            const candidates = getRoundupCandidates(MODEL_DIRECTORY_ROWS, roundup.candidates);
            return (
              <tr key={roundup.id} className="border-t border-[var(--color-border)]">
                <th scope="row" className="p-3 align-top">
                  <a href={`#${roundup.id}`} className={FOCUS_RING}>{roundup.title}</a>
                </th>
                <td className="p-3 align-top text-[var(--color-muted)]">{roundup.levelLabel}</td>
                <td className="p-3 align-top text-[var(--color-muted)]">
                  {candidates.length > 0 ? candidates.map((row) => row.name).join(", ") : "After our test run"}
                </td>
                <td className="p-3 align-top">
                  {roundup.isPublished ? (
                    <Link href={getRoundupHref(roundup)} className={FOCUS_RING}>Published</Link>
                  ) : (
                    <span className="text-[var(--color-muted)]">Coming</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}