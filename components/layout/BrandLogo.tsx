import { BrandMark } from "@/components/layout/BrandMark";
import { BRAND_NAME_ACCENT, BRAND_NAME_LEAD } from "@/lib/config/brand";

/**
 * Mark plus wordmark. Render it inside a link or element that has the
 * Tailwind `group` class so the mark tilts on hover.
 */
export function BrandLogo() {
  return (
    <>
      <BrandMark className="shrink-0 rounded-[25%] ring-1 ring-[var(--color-border)] transition-transform group-hover:-rotate-[8deg] group-hover:scale-110 motion-reduce:transition-none" />
      <span className="max-w-36 truncate font-serif text-xl font-medium tracking-tight sm:max-w-64">
        {BRAND_NAME_LEAD}
        <span className="font-normal italic text-[var(--color-accent)]">{BRAND_NAME_ACCENT}</span>
      </span>
    </>
  );
}