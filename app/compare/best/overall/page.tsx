import type { Metadata } from "next";
import BestForPage from "@/components/compare/BestForPage";
import { getBestForMetadata } from "@/lib/compare/bestFor";

export const metadata: Metadata = getBestForMetadata("overall");

export default function BestForOverallPage() {
  return <BestForPage slug="overall" />;
}
