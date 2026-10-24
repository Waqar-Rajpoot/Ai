import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SearchBox } from "./SearchBox";

/** Search page shell. Results are wired in once the content index exists. */
export function SearchView() {
  return (
    <div className="page">
      <PageHeader title="Search" badge="utility" />
      <SearchBox />
      <h2>No results help</h2>
      <p>
        Try fewer words, or browse the <Link href="/learn">Learn hub</Link>, the{" "}
        <Link href="/learn/glossary">glossary</Link> or the{" "}
        <Link href="/compare/models">model directory</Link>.
      </p>
    </div>
  );
}
