import type { Metadata } from "next";
import { PlansView } from "@/components/prices/PlansView";
import { PLANS_VERIFIED_ON } from "@/lib/prices/planRecords";

export const metadata: Metadata = {
  title: "AI consumer plans and prices (US)",
  description:
    "Compare free and paid AI chatbot plans side by side: monthly price, annual billing, usage level and included extras, each linked to the provider's own pricing page.",
  alternates: { canonical: "/prices/plans" },
  // Keep unverified prices out of search results until every row has a verified-on date.
  robots: PLANS_VERIFIED_ON ? undefined : { index: false, follow: false },
};

export default function PlansPage() {
  return <PlansView />;
}