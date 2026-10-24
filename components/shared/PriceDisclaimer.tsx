import styles from "./PriceDisclaimer.module.css";

/** Standard line for pages that mention prices, plans or limits (Blueprint 5.0). */
export function PriceDisclaimer() {
  return (
    <p className={styles.note}>
      Prices and features change. Confirm on the provider&apos;s website before buying.
    </p>
  );
}