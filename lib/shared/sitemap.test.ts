import { describe, expect, it } from "vitest";
import { buildSitemapEntries } from "./sitemap";

describe("buildSitemapEntries", () => {
  const modified = new Date("2026-10-19T00:00:00Z");
  const entries = buildSitemapEntries("https://example.com/", ["/", "/about"], modified);

  it("joins the origin and route without double slashes", () => {
    expect(entries.map((entry) => entry.url)).toEqual([
      "https://example.com/",
      "https://example.com/about",
    ]);
  });

  it("gives the home page the highest priority", () => {
    expect(entries[0]?.priority).toBeGreaterThan(entries[1]?.priority ?? 1);
  });
});
