"use client";

import { BADGE_CLASS } from "@/components/shared/pageStyles";
import { useToday } from "@/components/shared/useToday";
import { daysSince, describeDaysAgo } from "@/lib/shared/dates";
import { CENSUS_WAVE_END_LABEL, INDUSTRIES_VERIFIED_ISO, INDUSTRIES_VERIFIED_ON } from "@/lib/society/industriesConstants";
import { isReviewDue } from "@/lib/society/industriesLogic";

/** "Verified N days ago" strip. Shows plain dates until the browser knows today's date. */
export function IndustriesFreshness() {
  const today = useToday();
  const ago = today ? ` · ${describeDaysAgo(daysSince(INDUSTRIES_VERIFIED_ISO, today))}` : "";

  return (
    <p className="relative m-0 mt-4 flex flex-wrap gap-2 text-sm">
      <span className={BADGE_CLASS}>Verified on {INDUSTRIES_VERIFIED_ON}{ago}</span>
      <span className={BADGE_CLASS}>Census data to {CENSUS_WAVE_END_LABEL}</span>
      {today && isReviewDue(today) && (
        <span className={`${BADGE_CLASS} border-amber-500 text-amber-600 dark:text-amber-400`}>Review overdue</span>
      )}
    </p>
  );
}