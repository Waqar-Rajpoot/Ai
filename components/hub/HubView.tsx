import Link from "next/link";
import type { ReactNode } from "react";
import { ALL_HUBS } from "@/lib/hub/hubRegistry";
import { getFooterLinks, getRelatedHubs, getStartHereTopics, getVisibleGroups } from "@/lib/hub/hubHelpers";
import type { HubConfig } from "@/lib/hub/hubTypes";
import { HubGroupSection } from "./HubGroupSection";
import { HubHero } from "./HubHero";
import { HubNewsletter } from "./HubNewsletter";
import { HubRelated } from "./HubRelated";
import { HubStartHere } from "./HubStartHere";
import { HUB_CONTAINER } from "./hubStyles";

interface HubViewProps {
  hub: HubConfig;
  /** Optional extra sections (for example a live post list) rendered after the groups. */
  children?: ReactNode;
}

/** Shared layout for every section hub. Pages pass in a `HubConfig` and nothing else. */
export function HubView({ hub, children }: HubViewProps) {
  const startHereTopics = getStartHereTopics(hub);
  const relatedHubs = getRelatedHubs(hub, ALL_HUBS);
  const footerLinks = getFooterLinks(hub);

  return (
    <>
      <HubHero hub={hub} />

      <div className={`${HUB_CONTAINER} pb-16`}>
        {hub.startHere && startHereTopics.length > 0 && (
          <HubStartHere intro={hub.startHere.intro} topics={startHereTopics} />
        )}

        {getVisibleGroups(hub).map((group) => (
          <HubGroupSection key={group.id} group={group} />
        ))}

        {children}

        {relatedHubs.length > 0 && <HubRelated hubs={relatedHubs} />}
        {hub.showNewsletter !== false && <HubNewsletter />}

        {footerLinks.length > 0 && (
          <footer className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-6 text-sm">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </footer>
        )}
      </div>
    </>
  );
}