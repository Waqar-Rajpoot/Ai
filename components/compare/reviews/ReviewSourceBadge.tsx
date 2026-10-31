import { SOURCE_LABEL_TEXT } from "@/lib/compare/reviews/reviewConfig";
import type { SourceLabel } from "@/lib/compare/reviews/reviewTypes";
import styles from "./ReviewPage.module.css";

const BADGE_CLASS_BY_SOURCE: Readonly<Record<SourceLabel, string>> = {
  tested: styles.badgeTested,
  independent: styles.badgeIndependent,
  "vendor-reported": styles.badgeVendor,
};

interface ReviewSourceBadgeProps {
  source: SourceLabel;
}

/** Small label saying where a number came from. */
export function ReviewSourceBadge({ source }: ReviewSourceBadgeProps) {
  return (
    <span className={`${styles.badge} ${BADGE_CLASS_BY_SOURCE[source]}`}>
      {SOURCE_LABEL_TEXT[source]}
    </span>
  );
}