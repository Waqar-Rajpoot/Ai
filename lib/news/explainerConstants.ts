import type { ExplainerLevel, ExplainerTopic } from "./explainerTypes";

export const LEVEL_LABELS: Record<ExplainerLevel, string> = {
  1: "Foundations",
  2: "Practitioner",
  3: "Power user",
  4: "Expert",
};

export const LEVEL_BLURBS: Record<ExplainerLevel, string> = {
  1: "You use AI but do not build with it.",
  2: "You use AI regularly for work or study.",
  3: "You use APIs, automations or several tools.",
  4: "You build, deploy or govern AI.",
};

export const TOPIC_LABELS: Record<ExplainerTopic, string> = {
  safety: "Safety",
  privacy: "Privacy",
  policy: "Policy",
};

/** An explainer not updated within this many days is flagged for review. */
export const REVIEW_INTERVAL_DAYS = 30;

/** An explainer published within this many days carries a "New" badge. */
export const NEW_BADGE_DAYS = 7;

/** Blueprint 6.5 target: policy explainers go live within this many days of the event. */
export const PUBLISH_WITHIN_DAYS = 3;

/** Most "more explainers" cards shown at the bottom of a page. */
export const MORE_EXPLAINERS_LIMIT = 3;

export const MAX_QUICK_TAKE = 4;