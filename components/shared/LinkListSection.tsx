import Link from "next/link";
import type { LinkItem } from "@/types";
import styles from "./LinkListSection.module.css";

interface LinkListSectionProps {
  heading: string;
  items: readonly LinkItem[];
}

/** An H2 heading above a ruled grid of links, each with an optional description. */
export function LinkListSection({ heading, items }: LinkListSectionProps) {
  return (
    <section>
      <h2>{heading}</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href} className={styles.item}>
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
            {item.description && <p className={styles.description}>{item.description}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
