import type { ReviewNote } from "@/lib/compare/reviews/reviewTypes";
import styles from "./ReviewPage.module.css";

interface ReviewNoteListProps {
  notes: readonly ReviewNote[] | undefined;
  emptyText: string;
}

/** A list of notes with optional source links, or a fallback sentence. */
export function ReviewNoteList({ notes, emptyText }: ReviewNoteListProps) {
  if (!notes || notes.length === 0) {
    return <p className={styles.pending}>{emptyText}</p>;
  }
  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.text}>
          {note.text}
          {note.sourceUrl ? (
            <>
              {" "}
              <a href={note.sourceUrl} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </>
          ) : null}
        </li>
      ))}
    </ul>
  );
}