import { describe, expect, it } from "vitest";
import { formatDisplayDate } from "@/lib/shared/format";
import {
  FEATURE_CHANGES,
  FEATURE_MATRIX_VERIFIED_ON,
  FEATURE_SECTIONS,
  FEATURE_SOURCES,
  FREE_PLAN_ROWS,
  NEED_COLUMN_HEADERS,
  NEED_ROWS,
  PAID_PLAN_ROWS,
  PROVIDER_COLUMN_HEADERS,
} from "./featureMatrix";

describe("feature-matrix data", () => {
  it("has a valid verified-on date", () => {
    expect(() => formatDisplayDate(FEATURE_MATRIX_VERIFIED_ON)).not.toThrow();
  });

  it("covers the seven blueprint features plus deep research, with unique ids", () => {
    const ids = FEATURE_SECTIONS.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual([
      "voice",
      "images",
      "video",
      "file-upload",
      "web-search",
      "agents",
      "memory",
      "deep-research",
    ]);
  });

  it("gives every section one cell per provider in every row", () => {
    for (const section of FEATURE_SECTIONS) {
      expect(section.rows.length).toBeGreaterThan(0);
      for (const row of section.rows) {
        expect(row.cells).toHaveLength(PROVIDER_COLUMN_HEADERS.length);
      }
    }
  });

  it("keeps the summary tables in the same order as the sections", () => {
    const titles = FEATURE_SECTIONS.map((section) => section.title);
    expect(FREE_PLAN_ROWS.map((row) => row.label)).toEqual(titles);
    expect(PAID_PLAN_ROWS.map((row) => row.label)).toEqual(titles);
    for (const row of [...FREE_PLAN_ROWS, ...PAID_PLAN_ROWS]) {
      expect(row.cells).toHaveLength(PROVIDER_COLUMN_HEADERS.length);
    }
  });

  it("gives every need row one cell per column", () => {
    for (const row of NEED_ROWS) {
      expect(row.cells).toHaveLength(NEED_COLUMN_HEADERS.length);
    }
  });

  it("uses https and lists each source once", () => {
    const urls = FEATURE_SOURCES.map((source) => source.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith("https://"))).toBe(true);
  });

  it("has at least one provider page among the sources", () => {
    expect(FEATURE_SOURCES.some((source) => source.kind === "provider")).toBe(true);
  });

  it("lists changes oldest first", () => {
    const dates = FEATURE_CHANGES.map((change) => change.sortDate);
    expect(dates).toEqual([...dates].sort());
  });
});
