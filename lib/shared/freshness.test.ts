import { describe, expect, it } from "vitest";
import { formatFreshness } from "./freshness";

describe("formatFreshness", () => {
  it("adds the date to dated labels", () => {
    expect(formatFreshness({ label: "verified-on", isoDate: "2026-10-21" })).toBe(
      "Verified on Oct 21, 2026",
    );
    expect(formatFreshness({ label: "tested-on", isoDate: "2026-10-17" })).toBe(
      "Tested on Oct 17, 2026",
    );
  });

  it("leaves undated labels as plain text", () => {
    expect(formatFreshness({ label: "vendor-reported" })).toBe("Vendor-reported");
    expect(formatFreshness({ label: "superseded" })).toBe("Superseded");
  });
});