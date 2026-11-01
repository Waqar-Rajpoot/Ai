import { getSourceNumber, type SourceId } from "@/lib/society/aiInEducation";
import styles from "./AiInEducationView.module.css";

interface SourceCitationProps {
  /** Ids of the sources that support the nearby claim. */
  readonly sourceIds: readonly SourceId[];
}

/** Renders superscript [n] links that jump to the matching entry in "Sources". */
export default function SourceCitation({ sourceIds }: SourceCitationProps) {
  if (sourceIds.length === 0) {
    return null;
  }
  return (
    <sup className={styles.citation}>
      {sourceIds.map((sourceId) => (
        <a key={sourceId} href={`#source-${sourceId}`} aria-label={`Source ${getSourceNumber(sourceId)}`}>
          [{getSourceNumber(sourceId)}]
        </a>
      ))}
    </sup>
  );
}