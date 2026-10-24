import { getLevelBadgeLabel as getBadgeLabel } from "@/lib/shared/levels";
import styles from "./LevelBadge.module.css";


/** Badge telling readers whether a page is for them. */
export function LevelBadge({ badge }: any) {
  return (
    <span className={styles.badge} data-badge={badge}>
      {getBadgeLabel(badge)}
    </span>
  );
}
