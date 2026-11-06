import Link from "next/link";
import type { HubConfig } from "@/lib/hub/hubTypes";
import { HUB_CARD_FOCUS, HUB_STRETCHED_LINK } from "./hubStyles";

/** Links to other hubs that readers of this one often need next. */
export function HubRelated({ hubs }: { hubs: readonly HubConfig[] }) {
  return (
    <section aria-labelledby="keep-exploring-title" className="border-t border-[var(--color-border)] py-10">
      <h2 id="keep-exploring-title" className="m-0 text-2xl">
        Keep exploring
      </h2>
      <ul className="m-0 mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((hub) => (
          <li key={hub.id} className={`group relative rounded-xl bg-[var(--color-surface)] p-5 ${HUB_CARD_FOCUS}`}>
            <h3 className="m-0 text-lg">
              <Link href={hub.href} className={HUB_STRETCHED_LINK}>
                {hub.label}
              </Link>
            </h3>
            <p className="mb-0 mt-2 text-sm text-[var(--color-muted)]">{hub.intro}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}