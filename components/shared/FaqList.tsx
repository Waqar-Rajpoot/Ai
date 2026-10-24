import styles from "./FaqList.module.css";

interface FaqEntry {
  readonly question: string;
  readonly answer: string;
}

interface FaqListProps {
  entries: readonly FaqEntry[];
}

/** Questions that open to show their answers. Works without JavaScript. */
export function FaqList({ entries }: FaqListProps) {
  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <details key={entry.question} className={styles.item}>
          <summary className={styles.question}>{entry.question}</summary>
          <p className={styles.answer}>{entry.answer}</p>
        </details>
      ))}
    </div>
  );
}