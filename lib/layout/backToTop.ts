import { BACK_TO_TOP_THRESHOLD_PX } from "./layoutConstants";

/** True once the visitor has scrolled far enough that jumping back up is useful. */
export function shouldShowBackToTop(scrollTop: number): boolean {
  return scrollTop > BACK_TO_TOP_THRESHOLD_PX;
}

/** Visitors who prefer reduced motion get an instant jump instead of a smooth scroll. */
export function getScrollBehavior(prefersReducedMotion: boolean): ScrollBehavior {
  return prefersReducedMotion ? "auto" : "smooth";
}