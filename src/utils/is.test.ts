import { describe, expect, it, test } from "vitest";

import { isFunction, isIterable, isSymbol } from "./is";

describe("isFunction", () => {
  test("should return true for a function", () => {
    expect(isFunction(() => {})).toBe(true);
  });

  test("should return false for a number", () => {
    expect(isFunction(123)).toBe(false);
  });

  test("should return false for a string", () => {
    expect(isFunction("hello")).toBe(false);
  });

  test("should return false for an object", () => {
    expect(isFunction({})).toBe(false);
  });

  test("should return false for an array", () => {
    expect(isFunction([])).toBe(false);
  });

  test("should return false for null", () => {
    expect(isFunction(null)).toBe(false);
  });

  test("should return false for undefined", () => {
    expect(isFunction(undefined)).toBe(false);
  });

  test("should return false for a boolean", () => {
    expect(isFunction(true)).toBe(false);
    expect(isFunction(false)).toBe(false);
  });

  test("should return false for a BigInt", () => {
    expect(isFunction(123n)).toBe(false);
  });

  test("should return false for a symbol", () => {
    expect(isFunction(Symbol("sym"))).toBe(false);
  });

  test("should return true for an async function", () => {
    const asyncFunc = async () => {
      await Promise.resolve(1);
    };
    expect(isFunction(asyncFunc)).toBe(true);
  });

  test("should return true for a generator function", () => {
    function* generatorFunc() {
      yield 1;
    }
    expect(isFunction(generatorFunc)).toBe(true);
  });
});

describe("isIterable", () => {
  it("returns true for an array", () => {
    expect(isIterable([1, 2, 3])).toBe(true);
  });

  it("returns true for a string", () => {
    expect(isIterable("hello")).toBe(true);
  });

  it("returns true for a Map", () => {
    expect(isIterable(new Map())).toBe(true);
  });

  it("returns true for a Set", () => {
    expect(isIterable(new Set())).toBe(true);
  });

  it("returns false for an object", () => {
    expect(isIterable({})).toBe(false);
    expect(isIterable({ a: 1, b: 2 })).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isIterable(123)).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isIterable(() => {})).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isIterable(undefined)).toBe(false);
  });

  it("returns false for null", () => {
    expect(isIterable(null)).toBe(false);
  });

  test("should return false for a boolean", () => {
    expect(isIterable(true)).toBe(false);
    expect(isIterable(false)).toBe(false);
  });
});

describe("isSymbol", () => {
  test("returns true for a symbol", () => {
    expect(isSymbol(Symbol())).toBe(true);
  });

  test("returns false for non-symbol types", () => {
    expect(isSymbol(123)).toBe(false);
    expect(isSymbol("string")).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol([])).toBe(false);
    expect(isSymbol(() => {})).toBe(false);
    expect(isSymbol(true)).toBe(false);
  });

  test("returns false for null and undefined", () => {
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
  });
});
