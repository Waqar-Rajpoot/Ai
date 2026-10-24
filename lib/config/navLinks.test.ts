import { describe, expect, it } from "vitest";
import { FOOTER_GROUPS, NAV_LABELS_BY_HREF, NAV_LINKS } from "./navLinks";

describe("NAV_LINKS", () => {
  it("has the 8 top-level items from the blueprint", () => {
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      "Home", "Learn", "Compare", "Prices", "Tools", "AI & Society", "News", "About",
    ]);
  });

  it("keeps every dropdown link under its parent route", () => {
    for (const link of NAV_LINKS.filter((item) => item.children)) {
      for (const child of link.children ?? []) {
        expect(child.href.startsWith(link.href)).toBe(true);
      }
    }
  });

  it("lists the 9 free tools", () => {
    const tools = NAV_LINKS.find((link) => link.href === "/tools");
    expect(tools?.children).toHaveLength(9);
  });
});

describe("link labels", () => {
  it("skips anchor links in breadcrumb labels", () => {
    expect(Object.keys(NAV_LABELS_BY_HREF).some((href) => href.includes("#"))).toBe(false);
  });

  it("has three footer groups", () => {
    expect(FOOTER_GROUPS).toHaveLength(3);
  });
});
