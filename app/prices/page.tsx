import type { Metadata } from "next";
import { PricesHubView } from "@/components/prices/PricesHubView";

export const metadata: Metadata = {
  title: "AI prices and plans",
  description:
    "Plans, API costs, free-plan limits, features and privacy settings for AI tools. Every figure is dated and linked to the provider's own page.",
  alternates: { canonical: "/prices" },
};

export default function PricesPage() {
  return <PricesHubView />;
}