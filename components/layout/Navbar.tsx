"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/config/navLinks";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import type { NavLink } from "@/types";

const SEARCH_ROUTE = "/search";
const SCROLLED_THRESHOLD_PX = 8;

const PILL_BASE =
  "inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.95rem] font-semibold leading-tight transition-colors motion-reduce:transition-none";
const PILL_IDLE =
  "text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)]";
const PILL_ACTIVE =
  "bg-[image:var(--gradient-accent)] text-white shadow-[0_4px_14px_rgba(124,58,237,0.4)] hover:brightness-110";
const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

/** True when the page is the link's target or inside it. "/" matches only itself. */
function isPathActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** True when the page is the item itself or any of its dropdown pages. */
function isSectionActive(pathname: string, item: NavLink): boolean {
  return (
    isPathActive(pathname, item.href) ||
    (item.children ?? []).some((child) => isPathActive(pathname, child.href))
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ isOpen }: { isOpen?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      className={`transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Site header: logo, desktop nav with dropdowns, search pill and mobile menu. */
export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  // Non-Mac label first so the static HTML and first client render match.
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl K");

  // Scroll shadow and reading-progress line, updated at most once per frame.
  useEffect(() => {
    let pendingFrame = 0;

    function update() {
      pendingFrame = 0;
      const root = document.documentElement;
      const scrollable = root.scrollHeight - root.clientHeight;
      setIsScrolled(window.scrollY > SCROLLED_THRESHOLD_PX);
      setScrollProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    }

    function schedule() {
      if (pendingFrame === 0) pendingFrame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (pendingFrame !== 0) window.cancelAnimationFrame(pendingFrame);
    };
  }, []);

  // Cmd/Ctrl+K opens search; Escape closes the mobile menu.
  useEffect(() => {
    setShortcutLabel(/mac|iphone|ipad/i.test(navigator.platform) ? "⌘K" : "Ctrl K");

    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        router.push(SEARCH_ROUTE);
      } else if (event.key === "Escape") {
        setIsMobileOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setIsMobileOpen(false);
    setOpenMobileGroup(null);
  }, [pathname]);

  // Stop the page behind the open mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md backdrop-saturate-150 transition-[border-color,box-shadow] motion-reduce:transition-none bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)] ${
        isScrolled
          ? "border-[var(--color-border)] shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex w-[min(100%-2.5rem,var(--site-width))] items-center justify-between gap-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          className={`group inline-flex min-w-0 items-center gap-2.5 font-bold text-[var(--color-text)] no-underline ${FOCUS_RING}`}
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.6rem] bg-[image:var(--gradient-accent)] text-[0.8rem] font-extrabold text-white transition-transform group-hover:-rotate-[8deg] group-hover:scale-110 motion-reduce:transition-none"
          >
            AI
          </span>
          <span className="max-w-36 truncate sm:max-w-64">{SITE_CONFIG.name}</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="m-0 flex list-none items-center justify-center gap-1 p-0">
            {NAV_LINKS.map((item) => {
              const isActive = isSectionActive(pathname, item);
              const pillClass = `${PILL_BASE} ${isActive ? PILL_ACTIVE : PILL_IDLE} ${FOCUS_RING}`;

              return (
                <li key={item.href} className="group relative flex items-center">
                  <Link
                    href={item.href}
                    className={`${pillClass} no-underline`}
                    aria-current={isPathActive(pathname, item.href) ? "page" : undefined}
                  >
                    {item.label}
                    {item.children && (
                      <span className="-mr-1 ml-1 opacity-70">
                        <ChevronIcon />
                      </span>
                    )}
                  </Link>

                  {item.children && (
                    <div className="invisible absolute left-0 top-full z-50 min-w-56 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 motion-reduce:transition-none">
                      <ul className="m-0 list-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
                        {item.children.map((child) => {
                          const isChildActive = isPathActive(pathname, child.href);
                          return (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                aria-current={isChildActive ? "page" : undefined}
                                className={`block rounded-lg px-3 py-2 text-sm no-underline transition-colors motion-reduce:transition-none ${FOCUS_RING} ${
                                  isChildActive
                                    ? "bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] font-semibold text-[var(--color-accent)]"
                                    : "text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions: search pill and mobile menu button */}
        <div className="flex items-center gap-2">
          <Link
            href={SEARCH_ROUTE}
            aria-label="Search the site"
            className={`inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[var(--color-text)] no-underline transition-[border-color,box-shadow] hover:border-[var(--color-accent)] hover:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] motion-reduce:transition-none ${FOCUS_RING}`}
          >
            <SearchIcon />
            <span className="hidden text-sm sm:inline">Search</span>
            <kbd className="hidden rounded-md border border-[var(--color-border)] px-1.5 py-0.5 font-sans text-xs opacity-70 sm:inline">
              {shortcutLabel}
            </kbd>
          </Link>

          <button
            type="button"
            className={`inline-grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] lg:hidden ${FOCUS_RING}`}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d={isMobileOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden"
        >
          <ul className="mx-auto m-0 w-[min(100%-2.5rem,var(--site-width))] list-none space-y-1 py-3 p-0">
            {NAV_LINKS.map((item) => {
              const isActive = isSectionActive(pathname, item);
              const isGroupOpen = openMobileGroup === item.href;

              return (
                <li key={item.href}>
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.href}
                      aria-current={isPathActive(pathname, item.href) ? "page" : undefined}
                      className={`${PILL_BASE} flex-1 py-2.5 no-underline ${
                        isActive ? PILL_ACTIVE : PILL_IDLE
                      } ${FOCUS_RING}`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`${isGroupOpen ? "Hide" : "Show"} ${item.label} pages`}
                        aria-expanded={isGroupOpen}
                        onClick={() => setOpenMobileGroup(isGroupOpen ? null : item.href)}
                        className={`grid h-10 w-10 place-items-center rounded-full text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] ${FOCUS_RING}`}
                      >
                        <ChevronIcon isOpen={isGroupOpen} />
                      </button>
                    )}
                  </div>

                  {item.children && isGroupOpen && (
                    <ul className="m-0 mb-2 ml-4 mt-1 list-none border-l border-[var(--color-border)] p-0 pl-3">
                      {item.children.map((child) => {
                        const isChildActive = isPathActive(pathname, child.href);
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={isChildActive ? "page" : undefined}
                              className={`block rounded-lg px-3 py-2 text-sm no-underline ${FOCUS_RING} ${
                                isChildActive
                                  ? "font-semibold text-[var(--color-accent)]"
                                  : "text-[var(--color-text)] hover:bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Reading-progress line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5">
        <div
          className="h-full origin-left bg-[image:var(--gradient-accent)] transition-transform duration-100 ease-linear motion-reduce:transition-none"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </header>
  );
}