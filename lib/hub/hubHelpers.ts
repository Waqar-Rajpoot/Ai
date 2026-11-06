import { DEFAULT_HUB_FOOTER_LINKS } from "./hubConfig";
import type { HubConfig, HubGroup, HubLink, HubTopic } from "./hubTypes";

/** Groups that have at least one topic. Empty groups are skipped so a hub never shows a blank section. */
export function getVisibleGroups(hub: HubConfig): readonly HubGroup[] {
  return hub.groups.filter((group) => group.topics.length > 0);
}

/** Total number of pages across visible groups. */
export function getTopicCount(hub: HubConfig): number {
  return getVisibleGroups(hub).reduce((total, group) => total + group.topics.length, 0);
}

/** Finds a topic by its href, or `undefined` when the hub does not list it. */
export function findTopic(hub: HubConfig, href: string): HubTopic | undefined {
  return hub.groups.flatMap((group) => group.topics).find((topic) => topic.href === href);
}

/** Topics for the "Start here" block, in order. Unknown hrefs are dropped. */
export function getStartHereTopics(hub: HubConfig): readonly HubTopic[] {
  if (!hub.startHere) return [];
  return hub.startHere.hrefs.flatMap((href) => {
    const topic = findTopic(hub, href);
    return topic ? [topic] : [];
  });
}

/** Hubs named in `hub.related`, in order. Unknown ids and the hub itself are dropped. */
export function getRelatedHubs(hub: HubConfig, allHubs: readonly HubConfig[]): readonly HubConfig[] {
  return (hub.related ?? []).flatMap((id) => {
    const related = allHubs.find((candidate) => candidate.id === id && candidate.id !== hub.id);
    return related ? [related] : [];
  });
}

/** The jump button, or `null` when its target group is missing or empty. */
export function getJumpAction(hub: HubConfig): HubLink | null {
  if (!hub.jumpAction) return null;
  const { label, groupId } = hub.jumpAction;
  const isTargetVisible = getVisibleGroups(hub).some((group) => group.id === groupId);
  return isTargetVisible ? { label, href: `#${groupId}` } : null;
}

/** Footer links for a hub, falling back to the shared policy links. */
export function getFooterLinks(hub: HubConfig): readonly HubLink[] {
  return hub.footerLinks ?? DEFAULT_HUB_FOOTER_LINKS;
}