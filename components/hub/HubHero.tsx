import Link from "next/link";
import { BUTTON_OUTLINE, BUTTON_PRIMARY } from "@/components/learn/learnStyles";
import { getJumpAction, getTopicCount, getVisibleGroups } from "@/lib/hub/hubHelpers";
import type { HubConfig } from "@/lib/hub/hubTypes";
import { HUB_CONTAINER } from "./hubStyles";

/** Hub header: breadcrumb, title, intro, actions and an "In this section" index. */
export function HubHero({ hub }: { hub: HubConfig }) {
  const groups = getVisibleGroups(hub);
  const jumpAction = getJumpAction(hub);

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className={`${HUB_CONTAINER} grid gap-10 py-10 lg:grid-cols-[1fr_21rem] lg:items-start lg:py-14`}>
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-muted)]">
            <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{hub.label}</li>
            </ol>
          </nav>
          <h1 className="mb-0 mt-5 max-w-3xl">{hub.title}</h1>
          <p className="mb-0 mt-4 max-w-2xl text-lg text-[var(--color-muted)]">{hub.intro}</p>
          {(hub.primaryAction || jumpAction) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {hub.primaryAction && (
                <Link href={hub.primaryAction.href} className={BUTTON_PRIMARY}>
                  {hub.primaryAction.label}
                </Link>
              )}
              {jumpAction && (
                <a href={jumpAction.href} className={BUTTON_OUTLINE}>
                  {jumpAction.label}
                </a>
              )}
            </div>
          )}
        </div>

        <aside aria-labelledby="hub-index-title" className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5">
          <h2 id="hub-index-title" className="m-0 text-base">
            In this section
          </h2>
          <p className="mb-3 mt-1 text-sm text-[var(--color-muted)]">
            {getTopicCount(hub)} pages in {groups.length} topics
          </p>
          <ul className="m-0 list-none divide-y divide-[var(--color-border)] p-0 text-sm">
            {groups.map((group) => (
              <li key={group.id}>
                <a href={`#${group.id}`} className="flex items-baseline justify-between gap-3 py-2 text-[var(--color-text)] no-underline hover:underline">
                  <span>{group.title}</span>
                  <span className="text-[var(--color-muted)]">{group.topics.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </header>
  );
}