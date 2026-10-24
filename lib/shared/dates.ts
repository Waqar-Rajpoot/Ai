const MS_PER_DAY = 86_400_000;

export function calendarDaysUntil(isoDate: string, now: Date): number {
  const startOfToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const target = Date.parse(`${isoDate}T00:00:00Z`);
  return Math.round((target - startOfToday) / MS_PER_DAY);
}