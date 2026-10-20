import Link from "next/link";
import styles from "./Hero.module.css";

interface HeroProps {
  headline: string;
  promise: string;
  compareLabel: string;
  compareHref: string;
}

/** Home page opening: headline, one-line promise and the compare button. */
export function Hero({ headline, promise, compareLabel, compareHref }: HeroProps) {
  return (
    <section className={styles.hero}>
      <h1 className={styles.headline}>{headline}</h1>
      <p className={styles.promise}>{promise}</p>
      <Link href={compareHref} className={styles.button}>
        {compareLabel}
      </Link>
    </section>
  );
}
