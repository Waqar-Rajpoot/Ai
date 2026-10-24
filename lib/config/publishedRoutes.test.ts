import { describe, expect, it } from "vitest";
import { PUBLISHED_ROUTES } from "./publishedRoutes";

describe("PUBLISHED_ROUTES", () => {
  it("lists each route once and starts every route with a slash", () => {
    expect(new Set(PUBLISHED_ROUTES).size).toBe(PUBLISHED_ROUTES.length);
    expect(PUBLISHED_ROUTES.every((route) => route.startsWith("/"))).toBe(true);
  });

  it("includes the free-limits page", () => {
    expect(PUBLISHED_ROUTES).toContain("/prices/free-limits");
  });
});