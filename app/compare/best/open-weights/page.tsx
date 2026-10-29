import type { Metadata } from "next";
import BestForPage from "@/components/compare/BestForPage";
import { getBestForMetadata } from "@/lib/compare/bestFor";

export const metadata: Metadata = getBestForMetadata("open-weights");

export default function BestForOpenWeightsPage() {
  return <BestForPage slug="open-weights" />;
}
