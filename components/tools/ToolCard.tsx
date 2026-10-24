import Link from "next/link";
import { BADGE_CLASS, BUTTON_PRIMARY, CARD_CLASS } from "@/components/shared/pageStyles";
import { CATEGORY_LABELS, TOOLS, type ToolEntry } from "@/lib/tools/toolCatalog";
import { getToolsByIds } from "@/lib/tools/toolCatalogLogic";
import { ToolLevelBadges } from "./ToolLevelBadges";
import { ToolNameLink } from "./ToolNameLink";

interface ToolCardProps {
  tool: ToolEntry;
}

/** One tool: level, group, what you enter and get, the guides that explain it, and a way in. */
export function ToolCard({ tool }: ToolCardProps) {
  const isLive = tool.status === "live";
  const pairs = getToolsByIds(TOOLS, tool.pairsWith);

  return (
    <article className={`${CARD_CLASS} flex h-full flex-col`}>
      <p className="m-0 flex flex-wrap items-center gap-2 text-xs text-[var(--color-muted)]">
        <ToolLevelBadges levels={tool.levels} />
        <span>{CATEGORY_LABELS[tool.category]}</span>
      </p>
      <h3 className="mb-1 mt-3">{isLive ? <Link href={tool.route}>{tool.name}</Link> : tool.name}</h3>
      <p className="m-0 text-sm text-[var(--color-muted)]">{tool.summary}</p>

      <dl className="mb-0 mt-4 grid gap-3 text-sm">
        <div>
          <dt className="font-semibold">You enter</dt>
          <dd className="m-0 text-[var(--color-muted)]">{tool.youEnter}</dd>
        </div>
        <div>
          <dt className="font-semibold">You get</dt>
          <dd className="m-0 text-[var(--color-muted)]">{tool.youGet}</dd>
        </div>
        <div>
          <dt className="font-semibold">Built on</dt>
          <dd className="m-0 text-[var(--color-muted)]">{tool.builtOn}</dd>
        </div>
        <div>
          <dt className="font-semibold">Time to use</dt>
          <dd className="m-0 text-[var(--color-muted)]">{tool.timeToUse}</dd>
        </div>
      </dl>

      <div className="mt-4 text-sm">
        <p className="m-0 font-semibold">Guides that explain the result</p>
        <ul className="m-0 mt-1 grid gap-1 pl-5">
          {tool.guides.map((guide) => (
            <li key={guide.href}>
              <Link href={guide.href}>{guide.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {pairs.length > 0 && (
        <p className="mb-0 mt-3 text-sm">
          <span className="font-semibold">Pairs well with:</span>{" "}
          {pairs.map((pair, index) => (
            <span key={pair.id}>
              {index > 0 ? ", " : ""}
              <ToolNameLink tool={pair} />
            </span>
          ))}
        </p>
      )}

      <div className="mt-auto pt-5">
        {isLive ? (
          <Link href={tool.route} className={BUTTON_PRIMARY}>
            Open tool<span className="sr-only">: {tool.name}</span>
          </Link>
        ) : (
          <span className={BADGE_CLASS}>Coming soon</span>
        )}
      </div>
    </article>
  );
}