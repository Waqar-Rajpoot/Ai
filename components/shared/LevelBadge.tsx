import { getBadgeLabel } from "@/lib/shared/levels";
import type { PageBadge } from "@/types";
import styles from "./LevelBadge.module.css";

interface LevelBadgeProps {
  /** A learning level (1 to 4) or a page-kind label. */
  badge: PageBadge;
}

/** Badge telling readers whether a page is for them. */
export function LevelBadge({ badge }: LevelBadgeProps) {
  return (
    <span className={styles.badge} data-badge={badge}>
      {getBadgeLabel(badge)}
    </span>
  );
}
