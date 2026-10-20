import { describe, expect, it } from "vitest";
import { getBadgeLabel, getLevelHref, LEVEL_DEFINITIONS, LEVEL_ORDER } from "./levels";

describe("getBadgeLabel", () => {
  it("names level badges", () => {
    expect(getBadgeLabel(1)).toBe("Level 1: Foundations");
    expect(getBadgeLabel(3)).toBe("Level 3: Power user and builder");
  });

  it("labels page kinds", () => {
    expect(getBadgeLabel("all-levels")).toBe("All levels");
    expect(getBadgeLabel("trust")).toBe("Trust");
  });
});

describe("levels", () => {
  it("builds hub routes from slugs", () => {
    expect(getLevelHref(3)).toBe("/learn/power-user");
  });

  it("gives every level a unique slug", () => {
    const slugs = LEVEL_ORDER.map((level) => LEVEL_DEFINITIONS[level].slug);
    expect(new Set(slugs).size).toBe(LEVEL_ORDER.length);
  });
});
