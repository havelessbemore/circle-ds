import { describe, expect, test } from "vitest";

import { clamp, log } from "./math";

describe("clamp()", () => {
  test("returns min if value is below the minimum", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(-100, -50, 50)).toBe(-50);
  });

  test("returns max if value is above the maximum", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(100, -50, 50)).toBe(50);
  });

  test("returns the value if it is within the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, -50, 50)).toBe(0);
    expect(clamp(25, 0, 50)).toBe(25);
  });

  test("handles cases where min and max are the same", () => {
    expect(clamp(10, 5, 5)).toBe(5);
    expect(clamp(5, 5, 5)).toBe(5);
    expect(clamp(0, 5, 5)).toBe(5);
  });

  test("handles negative ranges correctly", () => {
    expect(clamp(-25, -50, -20)).toBe(-25);
    expect(clamp(-55, -50, -20)).toBe(-50);
    expect(clamp(-15, -50, -20)).toBe(-20);
  });

  test("works with zero as min, max, or value", () => {
    expect(clamp(0, 0, 0)).toBe(0);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });

  test("works with floating point numbers", () => {
    expect(clamp(5.5, 0, 10)).toBe(5.5);
    expect(clamp(2.5, 3, 4)).toBe(3);
    expect(clamp(4.5, 3, 4)).toBe(4);
  });

  test("throws an error if min is greater than max", () => {
    expect(() => clamp(5, 10, 0)).toThrow();
  });
});

describe("log()", () => {
  test("calculates the logarithm of a number with a given base", () => {
    expect(log(8, 2)).toBeCloseTo(3);
    expect(log(27, 3)).toBeCloseTo(3);
    expect(log(100, 10)).toBeCloseTo(2);
  });

  test("handles base e (natural logarithm)", () => {
    expect(log(Math.E, Math.E)).toBeCloseTo(1);
    expect(log(Math.exp(5), Math.E)).toBeCloseTo(5);
  });

  test("returns NaN for negative values", () => {
    expect(log(-1, 2)).toBeNaN();
  });

  test("returns -Infinity for zero", () => {
    expect(log(0, 10)).toBe(-Infinity);
  });

  test("returns NaN for zero with base <= 0", () => {
    expect(log(0, -1)).toBeNaN();
    expect(log(0, 0)).toBeNaN();
  });

  test("returns NaN for negative base values", () => {
    expect(log(10, -2)).toBeNaN();
    expect(log(4, -1)).toBeNaN();
  });

  test("handles base 1 correctly", () => {
    expect(log(10, 1)).toBe(Infinity);
  });

  test("returns 0 for log of 1 with any positive base", () => {
    expect(log(1, 2)).toBeCloseTo(0);
    expect(log(1, 10)).toBeCloseTo(0);
    expect(log(1, Math.E)).toBeCloseTo(0);
  });

  test("returns NaN for log with base 0", () => {
    expect(log(10, 0)).toBeNaN();
  });

  test("returns Infinity for log of 0 with any base except 1 and 0", () => {
    // This case is more conceptual since log(0) is -Infinity mathematically,
    // but handling might vary depending on function implementation specifics.
    // Depending on implementation, this might return -Infinity or similar behavior, so adjust as needed.
    expect(log(0, 2)).toBe(-Infinity);
  });
});
