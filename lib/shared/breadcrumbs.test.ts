import { describe, expect, it } from "vitest";
import { buildBreadcrumbs, humanizeSlug } from "./breadcrumbs";

describe("humanizeSlug", () => {
  it("replaces hyphens and capitalizes the first letter", () => {
    expect(humanizeSlug("how-we-test")).toBe("How we test");
  });
});

describe("buildBreadcrumbs", () => {
  const labels = { "/about": "About", "/about/how-we-test": "How we test" };

  it("returns only Home for the root", () => {
    expect(buildBreadcrumbs("/", labels)).toEqual([{ label: "Home", href: "/" }]);
  });

  it("uses known labels and builds cumulative hrefs", () => {
    expect(buildBreadcrumbs("/about/how-we-test", labels)).toEqual([
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "How we test", href: "/about/how-we-test" },
    ]);
  });

  it("falls back to a humanized slug and ignores a trailing slash", () => {
    expect(buildBreadcrumbs("/learn/what-is-ai/", {})).toEqual([
      { label: "Home", href: "/" },
      { label: "Learn", href: "/learn" },
      { label: "What is ai", href: "/learn/what-is-ai" },
    ]);
  });
});
