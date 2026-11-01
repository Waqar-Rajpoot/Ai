"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ALL_FILTER_ID } from "@/lib/newsletter/newsletterConstants";
import type { Deadline } from "@/lib/newsletter/newsletterContent";
import {
  daysUntil,
  describeCountdown,
  filterDeadlines,
  formatDisplayDate,
  getUrgency,
  listProviders,
} from "@/lib/newsletter/roundupFilters";
import FilterChips, { type ChipOption } from "./FilterChips";
import styles from "./DeadlineTracker.module.css";

interface DeadlineTrackerProps {
  readonly deadlines: readonly Deadline[];
  readonly verifiedOn: string;
  readonly trackerHref: string;
  readonly trackerLabel: string;
}

/** Upcoming retirement dates with a countdown that is calculated in the browser. */
export default function DeadlineTracker({ deadlines, verifiedOn, trackerHref, trackerLabel }: DeadlineTrackerProps) {
  const [provider, setProvider] = useState<string>(ALL_FILTER_ID);
  // Null until mounted, so the server and first browser render match.
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    setNowMs(Date.now());
  }, []);

  const options: readonly ChipOption[] = useMemo(
    () => [
      { id: ALL_FILTER_ID, label: "All providers" },
      ...listProviders(deadlines).map((name) => ({ id: name, label: name })),
    ],
    [deadlines],
  );

  const visible = filterDeadlines(deadlines, provider);

  return (
    <div>
      <FilterChips label="Filter by provider" options={options} selectedId={provider} onSelect={setProvider} />
      <ol className={styles.timeline}>
        {visible.map((deadline) => {
          const days = nowMs === null ? null : daysUntil(deadline.isoDate, nowMs);
          const urgency = days === null ? "later" : getUrgency(days);
          return (
            <li key={deadline.id} className={`${styles.item} ${styles[urgency]}`}>
              <div className={styles.header}>
                <time dateTime={deadline.isoDate} className={styles.date}>
                  {formatDisplayDate(deadline.isoDate)}
                </time>
                {days !== null ? <span className={styles.badge}>{describeCountdown(days)}</span> : null}
                <span className={styles.provider}>{deadline.provider}</span>
              </div>
              <p className={styles.what}>{deadline.what}</p>
              <p className={styles.replacement}>
                {deadline.replacement ? `Replacement: ${deadline.replacement}` : "No replacement named."}
              </p>
            </li>
          );
        })}
      </ol>
      <p className={styles.footer}>
        Listed on the retirements tracker, checked {verifiedOn}. Providers can change dates, so confirm with them before
        acting. <Link href={trackerHref}>{trackerLabel}</Link>
      </p>
    </div>
  );
}