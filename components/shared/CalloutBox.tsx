import type { ReactNode } from "react";
import styles from "./CalloutBox.module.css";

interface CalloutBoxProps {
  title: string;
  /** "summary" for the answer box at the top, "warning" for "What can go wrong". */
  variant?: "summary" | "warning";
  children: ReactNode;
}

/** Boxed note with a title. Replaces the separate summary and warning boxes. */
export function CalloutBox({ title, variant = "summary", children }: CalloutBoxProps) {
  return (
    <aside className={styles.box} data-variant={variant} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </aside>
  );
}