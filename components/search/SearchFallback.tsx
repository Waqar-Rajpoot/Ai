import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";

/** Shown while the search page loads, and to readers without JavaScript. */
export function SearchFallback() {
  return (
    <div className="page">
      <PageHeader title="Search" badge="utility" />
      <p role="status">Loading search…</p>
      <noscript>
        <p>
          Search needs JavaScript. Browse the <Link href="/sitemap">sitemap</Link>, the <Link href="/learn">Learn hub</Link>, the{" "}
          <Link href="/learn/glossary">glossary</Link> or the <Link href="/compare/models">model directory</Link> instead.
        </p>
      </noscript>
    </div>
  );
}