import type { Metadata } from "next";
import BestForPage from "@/components/compare/BestForPage";
import { getBestForMetadata } from "@/lib/compare/bestFor";

export const metadata: Metadata = getBestForMetadata("cheap-and-fast");

export default function BestForCheapAndFastPage() {
  return <BestForPage slug="cheap-and-fast" />;
}
