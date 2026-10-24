import { FreeLimitsView } from "@/components/prices/FreeLimitsView";
import { FREE_LIMITS_PAGE } from "@/lib/prices/freeLimits";
import { buildPageMetadata } from "@/lib/shared/metadata";

export const metadata = buildPageMetadata(FREE_LIMITS_PAGE);

export default function FreeLimitsPage() {
  return <FreeLimitsView />;
}