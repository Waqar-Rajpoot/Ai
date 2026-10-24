import { formatFreshness, type FreshnessInput } from "@/lib/shared/freshness";
import styles from "./FreshnessLabel.module.css";

/** Pill that shows when a fact was checked or tested, or that it is vendor-reported or superseded. */
export function FreshnessLabel(props: FreshnessInput) {
  return (
    <span className={styles.label} data-label={props.label}>
      {formatFreshness(props)}
    </span>
  );
}