import { describe, expect, it } from "vitest";
import { formatDisplayDate } from "./format";

describe("formatDisplayDate", () => {
  it("formats an ISO date for readers", () => {
    expect(formatDisplayDate("2026-10-21")).toBe("Oct 21, 2026");
    expect(formatDisplayDate("2026-02-04")).toBe("Feb 4, 2026");
  });

  it("rejects malformed and impossible dates", () => {
    expect(() => formatDisplayDate("21/10/2026")).toThrow(RangeError);
    expect(() => formatDisplayDate("2026-02-30")).toThrow(RangeError);
  });
});