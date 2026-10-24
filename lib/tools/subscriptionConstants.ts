/** Date the calculator and its copy were last written or changed (Blueprint 6.2 "Verified on"). */
export const SUBSCRIPTION_CALCULATOR_UPDATED_ON = "October 23, 2026";

export const MONTHS_PER_YEAR = 12;
export const WEEKS_PER_YEAR = 52;
export const DAYS_PER_YEAR = 365;

export const MAX_SUBSCRIPTION_ROWS = 20;
export const MAX_PRICE = 100_000;
export const MAX_SEATS = 1_000;
export const MAX_TAX_PERCENT = 50;
/** Hours in a 31-day month. */
export const MAX_HOURS_SAVED_PER_MONTH = 744;
export const MAX_HOURLY_VALUE = 10_000;

/** Renewals further away than this are not flagged. */
export const RENEWAL_WINDOW_DAYS = 30;

/** Time saved must be worth at least this many times the cost to be called "clearly worth it". */
export const WORTH_CLEARLY_RATIO = 2;

export const DEFAULT_CURRENCY_SYMBOL = "$";

/** A label only. Nothing is converted. */
export const CURRENCY_OPTIONS: readonly { symbol: string; label: string }[] = [
  { symbol: "$", label: "$ (dollar)" },
  { symbol: "€", label: "€ (euro)" },
  { symbol: "£", label: "£ (pound)" },
  { symbol: "¥", label: "¥ (yen or yuan)" },
  { symbol: "₹", label: "₹ (Indian rupee)" },
  { symbol: "Rs", label: "Rs (rupee)" },
];