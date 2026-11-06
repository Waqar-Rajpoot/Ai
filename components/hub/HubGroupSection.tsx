import Link from "next/link";
import type { HubGroup, HubTopic } from "@/lib/hub/hubTypes";
import { HUB_CARD_FOCUS, HUB_STRETCHED_LINK } from "./hubStyles";

function TopicCard({ topic }: { topic: HubTopic }) {
  return (
    <li className={`group relative flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${HUB_CARD_FOCUS}`}>
      {topic.kind && (
        <span className="mb-3 w-fit rounded-md bg-[var(--color-surface)] px-2 py-0.5 text-xs font-medium text-[var(--color-muted)]">
          {topic.kind}
        </span>
      )}
      <h3 className="m-0 text-lg">
        <Link href={topic.href} className={HUB_STRETCHED_LINK}>
          {topic.title}
        </Link>
      </h3>
      <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{topic.description}</p>
    </li>
  );
}

/** One themed section of a hub. Its `id` is the anchor used by nav links and the index panel. */
export function HubGroupSection({ group }: { group: HubGroup }) {
  const titleId = `${group.id}-title`;

  return (
    <section id={group.id} aria-labelledby={titleId} className="scroll-mt-24 border-t border-[var(--color-border)] py-10">
      <h2 id={titleId} className="m-0 text-2xl">
        {group.title}
      </h2>
      <p className="mb-0 mt-2 max-w-2xl text-[var(--color-muted)]">{group.intro}</p>
      <ul className="m-0 mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {group.topics.map((topic) => (
          <TopicCard key={topic.href} topic={topic} />
        ))}
      </ul>
    </section>
  );
}