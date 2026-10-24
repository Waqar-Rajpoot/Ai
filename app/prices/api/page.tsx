import type { Metadata } from "next";
import { ApiPricesView } from "@/components/prices/ApiPricesView";

export const metadata: Metadata = {
  title: "AI API prices: cost per token and per task",
  description:
    "Compare API prices for 14 AI models, see what a finished task costs, and estimate your own bill. Dated, sourced and updated monthly.",
  alternates: { canonical: "/prices/api" },
};

export default function ApiPricesPage() {
  return <ApiPricesView />;
}