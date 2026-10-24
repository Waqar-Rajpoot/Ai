import { partitionSources } from "@/lib/shared/sources";
import type { SourceLink } from "@/types";
import styles from "./SourceList.module.css";

interface SourceListProps {
  sources: readonly SourceLink[];
}

function SourceGroup({ title, sources }: { title: string; sources: readonly SourceLink[] }) {
  if (sources.length === 0) {
    return null;
  }
  return (
    <>
      <h3>{title}</h3>
      <ul className={styles.list}>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.label}
            </a>
            <span className={styles.publisher}>{source.publisher}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Source links grouped by where they sit in the source hierarchy. */
export function SourceList({ sources }: SourceListProps) {
  const { provider, secondary } = partitionSources(sources);
  return (
    <>
      <SourceGroup title="Provider pages" sources={provider} />
      <SourceGroup title="Secondary reports (leads only)" sources={secondary} />
    </>
  );
}