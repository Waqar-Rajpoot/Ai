import { BADGE_CLASS } from "@/components/shared/pageStyles";
import type { ToolLevel } from "@/lib/tools/toolCatalog";
import { describeToolLevels, listToolLevelNames } from "@/lib/tools/toolCatalogLogic";

interface ToolLevelBadgesProps {
  levels: readonly ToolLevel[];
}

/** One badge such as "Levels 1 to 3". The level names are added for screen readers. */
export function ToolLevelBadges({ levels }: ToolLevelBadgesProps) {
  return (
    <span className={BADGE_CLASS}>
      {describeToolLevels(levels)}
      <span className="sr-only">: {listToolLevelNames(levels)}</span>
    </span>
  );
}