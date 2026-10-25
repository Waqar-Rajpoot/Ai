const MS_PER_DAY = 86_400_000;

export function calendarDaysUntil(isoDate: string, now: Date): number {
  const startOfToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const target = Date.parse(`${isoDate}T00:00:00Z`);
  return Math.round((target - startOfToday) / MS_PER_DAY);
}


export function localCalendarDaysUntil(isoDate: string, now: Date): number {
  const [year = Number.NaN, month = Number.NaN, day = Number.NaN] = isoDate.split("-").map(Number);
  const startOfToday = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const target = Date.UTC(year, month - 1, day);
  return Math.round((target - startOfToday) / MS_PER_DAY);
}

export function describeDaysFromToday(daysLeft: number): string {
  if (daysLeft === 0) return "today";
  const count = Math.abs(daysLeft);
  const unit = count === 1 ? "day" : "days";
  return daysLeft > 0 ? `in ${count} ${unit}` : `${count} ${unit} ago`;
}


export function daysSince(isoDate: string, now: Date): number {
  return -calendarDaysUntil(isoDate, now);
}

export function describeDaysAgo(days: number): string {
  if (days <= 0) return "today";
  return days === 1 ? "1 day ago" : `${days} days ago`;
}
