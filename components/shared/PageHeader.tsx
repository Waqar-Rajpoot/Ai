import type { PageBadge } from "@/types";
import { LevelBadge } from "./LevelBadge";

interface PageHeaderProps {
  title: string;
  badge: PageBadge;
  /** One-line description under the title. */
  intro?: string;
}

/** Badge, title and intro shown at the top of a page. */
export function PageHeader({ title, badge, intro }: PageHeaderProps) {
  return (
    <header className="page-header">
      <LevelBadge badge={badge} />
      <h1>{title}</h1>
      {intro && <p className="page-intro">{intro}</p>}
    </header>
  );
}
