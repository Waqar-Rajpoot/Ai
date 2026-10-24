export const LEVEL_ORDER = [
  'foundation',
  'practitioner',
  'powerUser',
  'expert'
] as const;

export type LevelType = typeof LEVEL_ORDER[number];

export const PAGE_KIND_LABELS: Record<string, string> = {
  foundation: 'Foundations',
  practitioner: 'Practitioner',
  powerUser: 'Power User',
  expert: 'Expert'
};

export function getLevelBadgeLabel(badge: string): string {
  return PAGE_KIND_LABELS[badge] || badge;
}
