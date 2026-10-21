import { PRICE_DISCLAIMER } from "@/lib/config/disclaimers";

/** The standard price disclaimer. Place it on every page that shows prices. */
export function PriceDisclaimer() {
  return (
    <p role="note" className="m-0 rounded-xl border border-amber-500/60 bg-amber-500/10 px-4 py-3 text-sm font-semibold">
      {PRICE_DISCLAIMER}
    </p>
  );
}