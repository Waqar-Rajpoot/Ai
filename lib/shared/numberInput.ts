/** Turns text from a number box into a number. Blank or invalid text becomes NaN so callers can report it. */
export function parseNumberField(text: string): number {
  const cleaned = text.trim().replace(/,/g, "");
  if (cleaned === "") return Number.NaN;
  return Number(cleaned);
}

/** Formats a count with thousands separators, rounded to a whole number. */
export function formatWholeNumber(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}