const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const DISPLAY_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  // Dates are calendar days, so format in UTC to avoid off-by-one shifts.
  timeZone: "UTC",
});

/**
 * Formats a calendar date for readers, for example "2026-10-21" becomes "Oct 21, 2026".
 *
 * @param isoDate - A date in YYYY-MM-DD form.
 * @throws RangeError when the value is not a real calendar date.
 */
export function formatDisplayDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (!ISO_DATE_PATTERN.test(isoDate) || Number.isNaN(date.getTime())) {
    throw new RangeError(`Invalid ISO date: ${isoDate}`);
  }
  return DISPLAY_DATE_FORMAT.format(date);
}