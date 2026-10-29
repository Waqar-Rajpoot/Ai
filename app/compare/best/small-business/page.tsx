import type { Metadata } from "next";
import BestForPage from "@/components/compare/BestForPage";
import { getBestForMetadata } from "@/lib/compare/bestFor";

export const metadata: Metadata = getBestForMetadata("small-business");

export default function BestForSmallBusinessPage() {
  return <BestForPage slug="small-business" />;
}
