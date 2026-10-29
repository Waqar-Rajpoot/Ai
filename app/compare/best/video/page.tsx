import type { Metadata } from "next";
import BestForPage from "@/components/compare/BestForPage";
import { getBestForMetadata } from "@/lib/compare/bestFor";

export const metadata: Metadata = getBestForMetadata("video");

export default function BestForVideoPage() {
  return <BestForPage slug="video" />;
}
