/** "2026" in the launch year, then "2026–2027" and so on. A current year before the start year returns the start year. */
export function getCopyrightYears(startYear: number, currentYear: number): string {
  const isValid = Number.isInteger(startYear) && Number.isInteger(currentYear);
  if (!isValid || currentYear <= startYear) return String(startYear);
  return `${startYear}–${currentYear}`;
}