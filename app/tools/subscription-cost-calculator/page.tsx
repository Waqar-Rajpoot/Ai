import type { Metadata } from "next";
import { SubscriptionCostView } from "@/components/tools/SubscriptionCostView";

export const metadata: Metadata = {
  title: "AI subscription cost calculator",
  description:
    "Add the AI plans you pay for and see what they cost per month and per year, with seats and tax. Flags overlapping plans and upcoming renewals. Runs in your browser.",
  alternates: { canonical: "/tools/subscription-cost-calculator" },
};

export default function SubscriptionCostCalculatorPage() {
  return <SubscriptionCostView />;
}