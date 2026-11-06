import Link from "next/link";
import { BUTTON_PRIMARY } from "@/components/learn/learnStyles";
import { HUB_NEWSLETTER } from "@/lib/hub/hubConfig";

/** Closing call to action shared by all hubs. */
export function HubNewsletter() {
  return (
    <section aria-labelledby="hub-newsletter-title" className="flex flex-wrap items-center justify-between gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
      <div className="max-w-xl">
        <h2 id="hub-newsletter-title" className="m-0 text-xl">
          {HUB_NEWSLETTER.heading}
        </h2>
        <p className="mb-0 mt-1 text-[var(--color-muted)]">{HUB_NEWSLETTER.text}</p>
      </div>
      <Link href={HUB_NEWSLETTER.href} className={BUTTON_PRIMARY}>
        {HUB_NEWSLETTER.label}
      </Link>
    </section>
  );
}