import { BADGE_CLASS } from "@/components/shared/pageStyles";
import { describeDaysLeft } from "@/lib/prices/retirementLogic";
import { STATUS_LABELS, type RetirementStatus } from "@/lib/prices/retirements";

const STATUS_STYLES: Record<RetirementStatus, string> = {
  retired: "opacity-70",
  "this-week": "border-red-500 text-red-600 dark:text-red-400",
  "this-month": "border-amber-500 text-amber-600 dark:text-amber-400",
  "next-90-days": "border-sky-500 text-sky-600 dark:text-sky-400",
  later: "",
  "floor-only": "border-dashed",
};

interface RetirementStatusBadgeProps {
  /** Null until the browser knows today's date. */
  status: RetirementStatus | null;
  daysLeft: number | null;
}

/** Colour-coded status with a "in N days" hint. Colour is never the only signal: the label is always shown. */
export function RetirementStatusBadge({ status, daysLeft }: RetirementStatusBadgeProps) {
  if (status === null || daysLeft === null) return <span className={BADGE_CLASS}>—</span>;
  const showDays = status !== "floor-only";
  return (
    <span className={`${BADGE_CLASS} ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
      {showDays ? ` · ${describeDaysLeft(daysLeft)}` : ""}
    </span>
  );
}