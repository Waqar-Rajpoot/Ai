"use client";

import { BADGE_CLASS } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import { NEW_BADGE_DAYS, REVIEW_INTERVAL_DAYS } from "@/lib/news/explainerConstants";
import { ageInDays, describeRelative, formatDateLabel } from "@/lib/news/explainerLogic";

interface ExplainerDatesProps {
  publishedIso: string;
  updatedIso: string;
  eventLabel: string;
}

/** Published, updated and event dates, with "N days ago" and review badges once the browser knows today's date. */
export function ExplainerDates({ publishedIso, updatedIso, eventLabel }: ExplainerDatesProps) {
  const today = useToday();
  const updatedAgo = today ? ` · ${describeRelative(updatedIso, today)}` : "";
  const isNew = today ? ageInDays(publishedIso, today) <= NEW_BADGE_DAYS : false;
  const reviewDue = today ? ageInDays(updatedIso, today) > REVIEW_INTERVAL_DAYS : false;

  return (
    <p className="relative m-0 mt-4 flex flex-wrap gap-2 text-sm">
      {isNew && <span className={`${BADGE_CLASS} border-emerald-500 text-emerald-700 dark:text-emerald-400`}>New</span>}
      <span className={BADGE_CLASS}>Published {formatDateLabel(publishedIso)}</span>
      <span className={BADGE_CLASS}>Updated {formatDateLabel(updatedIso)}{updatedAgo}</span>
      <span className={BADGE_CLASS}>{eventLabel}</span>
      {reviewDue && <span className={`${BADGE_CLASS} border-amber-500 text-amber-600 dark:text-amber-400`}>Review overdue</span>}
    </p>
  );
}