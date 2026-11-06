/** A page linked from a hub. */
export interface HubTopic {
  title: string;
  /** One or two plain sentences on what the reader will find. */
  description: string;
  href: string;
  /** Short content type shown on the card, e.g. "Guide", "Calculator", "Data". */
  kind?: string;
  /** Highlights shown only when the topic is featured in "Start here". */
  points?: readonly string[];
}

/** A themed set of topics. The `id` doubles as the section's anchor (e.g. `/news#releases`). */
export interface HubGroup {
  id: string;
  title: string;
  intro: string;
  /** A group with no topics is not rendered. */
  topics: readonly HubTopic[];
}

/** A plain link, used for buttons and footer links. */
export interface HubLink {
  label: string;
  href: string;
}

/** A button that scrolls to a group on the same page. Hidden when that group has no topics. */
export interface HubJumpAction {
  label: string;
  groupId: string;
}

/** The "Start here" block: hrefs of topics in this hub. The first is featured. */
export interface HubStartHere {
  intro: string;
  hrefs: readonly string[];
}

/** Everything a hub page needs. Pass one of these to `HubView`. */
export interface HubConfig {
  id: string;
  /** Short name used in the breadcrumb and "Keep exploring" cards. */
  label: string;
  href: string;
  title: string;
  intro: string;
  primaryAction?: HubLink;
  jumpAction?: HubJumpAction;
  startHere?: HubStartHere;
  groups: readonly HubGroup[];
  /** Ids of other hubs to link under "Keep exploring". */
  related?: readonly string[];
  /** Set to false to hide the newsletter band. Defaults to shown. */
  showNewsletter?: boolean;
  /** Overrides the shared footer links. Use an empty array for none. */
  footerLinks?: readonly HubLink[];
}