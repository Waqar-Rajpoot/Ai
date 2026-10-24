"use client";

import { useEffect, useState } from "react";
import { getScrollBehavior, shouldShowBackToTop } from "@/lib/layout/backToTop";
import styles from "./BackToTop.module.css";

/** Floating button that returns the visitor to the top of a long page. */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let pendingFrame = 0;

    function updateVisibility() {
      pendingFrame = 0;
      setIsVisible(shouldShowBackToTop(window.scrollY));
    }

    function scheduleUpdate() {
      if (pendingFrame === 0) pendingFrame = window.requestAnimationFrame(updateVisibility);
    }

    updateVisibility();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      if (pendingFrame !== 0) window.cancelAnimationFrame(pendingFrame);
    };
  }, []);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: getScrollBehavior(prefersReducedMotion) });
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}