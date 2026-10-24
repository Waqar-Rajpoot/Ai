import { CARD_CLASS } from "@/components/shared/pageStyles";
import { describeRetirementDate, groupByMonth } from "@/lib/prices/retirementLogic";
import { RETIREMENTS } from "@/lib/prices/retirements";

const MONTH_GROUPS = groupByMonth(RETIREMENTS);

/** Every entry grouped by month. Static, so it works without JavaScript. */
export function RetirementTimeline() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {MONTH_GROUPS.map((group) => (
        <section key={group.monthKey} className={CARD_CLASS} aria-labelledby={`month-${group.monthKey}`}>
          <h3 id={`month-${group.monthKey}`} className="mt-0">
            {group.label} <span className="text-sm font-normal text-[var(--color-muted)]">({group.entries.length})</span>
          </h3>
          <ul className="m-0 grid list-none gap-2 p-0 text-sm">
            {group.entries.map((entry) => (
              <li key={entry.id} className="border-t border-[var(--color-border)] pt-2 first:border-t-0 first:pt-0">
                <span className="font-semibold tabular-nums text-[var(--color-accent)]">{describeRetirementDate(entry)}</span>{" "}
                {entry.name}
                <span className="block text-xs text-[var(--color-muted)]">
                  {entry.platform}
                  {entry.replacement ? ` · replacement: ${entry.replacement}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}