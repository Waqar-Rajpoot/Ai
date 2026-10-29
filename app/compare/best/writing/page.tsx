import type { Metadata } from "next";
import BestForPage from "@/components/compare/BestForPage";
import { getBestForMetadata } from "@/lib/compare/bestFor";

export const metadata: Metadata = getBestForMetadata("writing");

export default function BestForWritingPage() {
  return <BestForPage slug="writing" />;
}
