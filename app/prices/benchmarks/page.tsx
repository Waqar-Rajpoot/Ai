import type { Metadata } from "next";
import { BenchmarksView } from "@/components/prices/BenchmarksView";
import { BENCHMARKS_VERIFIED_ON } from "@/lib/prices/benchmarkRecords";

export const metadata: Metadata = {
  title: "AI benchmark digest: independent and vendor-reported scores",
  description:
    "Independent AI benchmark scores and vendor-reported scores, kept in separate tables, with dates, margins and a tool to check whether a gap between two scores is real.",
  alternates: { canonical: "/prices/benchmarks" },
  // Keep unverified numbers out of search results until every record has a verified-on date.
  robots: BENCHMARKS_VERIFIED_ON ? undefined : { index: false, follow: false },
};

export default function BenchmarksPage() {
  return <BenchmarksView />;
}