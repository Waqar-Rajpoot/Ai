import type { Metadata } from "next";
import BestForPage from "@/components/compare/BestForPage";
import { getBestForMetadata } from "@/lib/compare/bestFor";

export const metadata: Metadata = getBestForMetadata("agents");

export default function BestForAgentsPage() {
  return <BestForPage slug="agents" />;
}
