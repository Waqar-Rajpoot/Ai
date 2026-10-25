/** Date the hub copy was last reviewed (Blueprint 6.2). Bump on every edit. */
export const NEWS_REVIEWED_ON = "October 25, 2026";

/** Name of the email field expected by the external signup form. Check your provider's form. */
export const NEWSLETTER_EMAIL_FIELD_NAME = "email";

export const LATEST_POSTS_VISIBLE = 9;
export const WEEKLY_PREVIEW_COUNT = 3;

export interface WatchHorizon {
  days: number;
  label: string;
}

/** Choices for how far ahead the "Coming up" list looks. */
export const WATCH_HORIZONS: readonly WatchHorizon[] = [
  { days: 30, label: "Next 30 days" },
  { days: 90, label: "Next 90 days" },
  { days: 365, label: "Next 12 months" },
];

export const DEFAULT_WATCH_HORIZON_DAYS = 30;