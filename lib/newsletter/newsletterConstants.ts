/** Milliseconds in one day. */
export const MS_PER_DAY = 86_400_000;

/** A deadline this many days away or fewer is shown as urgent. */
export const URGENT_WITHIN_DAYS = 3;

/** A deadline this many days away or fewer is shown as coming soon. */
export const SOON_WITHIN_DAYS = 14;

/** Id of the "show everything" option in filter chips. */
export const ALL_FILTER_ID = "all";
export type AllFilterId = typeof ALL_FILTER_ID;

/** Marks a section as "current" once it crosses the upper part of the screen. */
export const NAV_ACTIVE_ROOT_MARGIN = "-25% 0px -65% 0px";