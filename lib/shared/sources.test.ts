import { describe, expect, it } from "vitest";
import type { SourceLink } from "@/types";
import { collectUniqueSources, partitionSources } from "./sources";

const official: SourceLink = { label: "A", publisher: "P", url: "https://a.example", kind: "provider" };
const report: SourceLink = { label: "B", publisher: "Q", url: "https://b.example", kind: "secondary" };

describe("partitionSources", () => {
  it("separates provider pages from secondary reports", () => {
    expect(partitionSources([official, report])).toEqual({
      provider: [official],
      secondary: [report],
    });
  });
});

describe("collectUniqueSources", () => {
  it("keeps each URL once, in first-seen order", () => {
    expect(collectUniqueSources([[official, report], [report, official]])).toEqual([
      official,
      report,
    ]);
  });
});