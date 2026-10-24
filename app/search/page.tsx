import { SearchView } from "@/components/layout/SearchView";
import { buildPageMetadata } from "@/lib/shared/metadata";

export const metadata = buildPageMetadata({
  title: "Search",
  description: "Search guides, the glossary, reviews and tools.",
  route: "/search",
});

export default function SearchPage() {
  return <SearchView />;
}
