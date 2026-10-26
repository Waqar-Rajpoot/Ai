import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchFallback } from "@/components/search/SearchFallback";
import { SearchView } from "@/components/search/SearchView";

export const metadata: Metadata = {
  title: "Search",
  description: "Search guides, glossary terms, model reviews, tools, prices and news.",
  alternates: { canonical: "/search" },
  // Search result pages are not worth indexing, but links on them should still be followed.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchView />
    </Suspense>
  );
}