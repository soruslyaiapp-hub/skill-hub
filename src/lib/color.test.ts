import { describe, expect, it } from "vitest";
import { oklchToHex } from "./color";

describe("oklchToHex", () => {
  it("matches known sRGB colours", () => {
    expect(oklchToHex(1, 0, 0)).toBe("#ffffff");
    expect(oklchToHex(0, 0, 0)).toBe("#000000");
    expect(oklchToHex(0.628, 0.2577, 29.23)).toBe("#ff0000");
  });
});
