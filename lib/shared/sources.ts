import type { SourceLink } from "@/types";

/** Splits sources into provider pages and secondary reports (Blueprint 6.3). */
export function partitionSources(sources: readonly SourceLink[]): {
  readonly provider: readonly SourceLink[];
  readonly secondary: readonly SourceLink[];
} {
  return {
    provider: sources.filter((source) => source.kind === "provider"),
    secondary: sources.filter((source) => source.kind === "secondary"),
  };
}

/** Merges several source lists into one list with each URL once, in first-seen order. */
export function collectUniqueSources(
  sourceLists: readonly (readonly SourceLink[])[],
): SourceLink[] {
  const seenUrls = new Set<string>();
  const unique: SourceLink[] = [];
  for (const source of sourceLists.flat()) {
    if (!seenUrls.has(source.url)) {
      seenUrls.add(source.url);
      unique.push(source);
    }
  }
  return unique;
}