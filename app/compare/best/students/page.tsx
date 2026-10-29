import type { Metadata } from "next";
import BestForPage from "@/components/compare/BestForPage";
import { getBestForMetadata } from "@/lib/compare/bestFor";

export const metadata: Metadata = getBestForMetadata("students");

export default function BestForStudentsPage() {
  return <BestForPage slug="students" />;
}
