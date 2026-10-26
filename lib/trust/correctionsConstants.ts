/** Date this policy was last reviewed. Update it whenever a number or rule below changes. */
export const CORRECTIONS_POLICY_REVIEWED_ON = "October 25, 2026";

/** We reply to every report within this many business days, even when the answer is "we need more detail". */
export const ACKNOWLEDGE_WITHIN_BUSINESS_DAYS = 2;

/**
 * Days from "reported" to "fixed" that we aim for, by severity. They follow the update cadence in Blueprint 6.4:
 * 24 hours for price, plan and limit changes, 3 days for safety, privacy and policy news, and the weekly
 * maintenance pass for everything else.
 */
export const FIX_TARGET_DAYS_HIGH = 1;
export const FIX_TARGET_DAYS_STANDARD = 3;
export const FIX_TARGET_DAYS_MINOR = 7;

export const MILLISECONDS_PER_DAY = 86_400_000;

/** Matches a calendar date written as YYYY-MM-DD. The log stores dates this way so time zones cannot shift them. */
export const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;