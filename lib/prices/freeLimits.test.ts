import { describe, expect, it } from "vitest";
import { formatDisplayDate } from "@/lib/shared/format";
import {
  COMPARISON_COLUMN_HEADERS,
  COMPARISON_ROWS,
  FREE_LIMITS_SOURCES,
  FREE_LIMITS_VERIFIED_ON,
  FREE_PLAN_PROFILES,
  RECENT_CHANGES,
  WHICH_FITS_COLUMN_HEADERS,
  WHICH_FITS_ROWS,
} from "./freeLimits";

describe("free-limits data", () => {
  it("has a valid verified-on date", () => {
    expect(() => formatDisplayDate(FREE_LIMITS_VERIFIED_ON)).not.toThrow();
  });

  it("backs every plan with at least one provider page", () => {
    for (const profile of FREE_PLAN_PROFILES) {
      expect(profile.sources.some((source) => source.kind === "provider")).toBe(true);
    }
  });

  it("uses https for every source", () => {
    for (const source of FREE_LIMITS_SOURCES) {
      expect(source.url.startsWith("https://")).toBe(true);
    }
  });

  it("lists each source URL once", () => {
    const urls = FREE_LIMITS_SOURCES.map((source) => source.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("gives every table row one cell per column", () => {
    for (const row of COMPARISON_ROWS) {
      expect(row.cells).toHaveLength(COMPARISON_COLUMN_HEADERS.length);
    }
    for (const row of WHICH_FITS_ROWS) {
      expect(row.cells).toHaveLength(WHICH_FITS_COLUMN_HEADERS.length);
    }
  });

  it("covers the three providers in table-column order", () => {
    expect(FREE_PLAN_PROFILES.map((profile) => `${profile.product} Free`)).toEqual(
      COMPARISON_COLUMN_HEADERS,
    );
  });

  it("lists recent changes oldest first", () => {
    const dates = RECENT_CHANGES.map((change) => change.sortDate);
    expect(dates).toEqual([...dates].sort());
  });
});