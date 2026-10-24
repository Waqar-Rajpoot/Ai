export const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

export const CARD_CLASS = "rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5";

export const BADGE_CLASS =
  "inline-flex items-center rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs";

export const BUTTON_PRIMARY = `inline-flex items-center justify-center rounded-full bg-[image:var(--gradient-accent)] px-5 py-2.5 font-semibold text-white no-underline shadow-[0_4px_14px_rgba(124,58,237,0.35)] transition hover:brightness-110 motion-reduce:transition-none ${FOCUS_RING}`;

export const BUTTON_OUTLINE = `inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-5 py-2.5 font-semibold text-[var(--color-text)] no-underline transition hover:border-[var(--color-accent)] motion-reduce:transition-none ${FOCUS_RING}`;

export const INPUT_CLASS = `w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-[var(--color-text)] ${FOCUS_RING}`;

export const SECTION_HEADING = "mb-3 mt-0 text-2xl font-extrabold tracking-tight sm:text-3xl";

export const SECTION_INTRO = "mb-6 mt-0 max-w-3xl text-[var(--color-muted)]";