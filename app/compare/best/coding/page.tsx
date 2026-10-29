import type { Metadata } from "next";
import BestForPage from "@/components/compare/BestForPage";
import { getBestForMetadata } from "@/lib/compare/bestFor";

export const metadata: Metadata = getBestForMetadata("coding");

export default function BestForCodingPage() {
  return <BestForPage slug="coding" />;
}
