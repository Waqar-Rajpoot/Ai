import Link from "next/link";
import type { LinkItem } from "@/types";
import styles from "./LevelRow.module.css";

interface LevelRowProps {
  /** The four levels in learning order. */
  steps: readonly (LinkItem & { readonly level: number })[];
}

/** The four learning levels drawn as rising steps, because they are a sequence. */
export function LevelRow({ steps }: LevelRowProps) {
  return (
    <section>
      <h2>Start here by level</h2>
      <ol className={styles.steps}>
        {steps.map((step) => (
          <li key={step.href} className={styles.step} data-level={step.level}>
            <Link href={step.href} className={styles.link}>
              <span className={styles.number}>Level {step.level}</span>
              <span className={styles.name}>{step.label}</span>
              {step.description && <span className={styles.reader}>{step.description}</span>}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
