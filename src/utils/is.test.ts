import { describe, expect, it, test } from "vitest";

import {
  isArrayLength,
  isFunction,
  isInfinity,
  isIterable,
  isLinkedLength,
  isNumber,
  isSafeCount,
  isSymbol,
} from "./is";
import { ARRAY_MAX_LENGTH, LINKED_MAX_LENGTH } from "./constants";

describe(`${isArrayLength.name}()`, () => {
  test("returns true for zero", () => {
    expect(isArrayLength(0)).toBe(true);
  });

  test("returns true for valid integer within array length range", () => {
    expect(isArrayLength(100)).toBe(true);
  });

  test("returns false for negative integers", () => {
    expect(isArrayLength(-1)).toBe(false);
  });

  test("returns false for integers greater than ARRAY_MAX_LENGTH", () => {
    expect(isArrayLength(ARRAY_MAX_LENGTH + 1)).toBe(false);
  });

  test("returns false for non-integer numbers", () => {
    expect(isArrayLength(10.5)).toBe(false);
  });

  test("returns false for -Infinity", () => {
    expect(isArrayLength(-Infinity)).toBe(false);
  });

  test("returns false for +Infinity", () => {
    expect(isArrayLength(Infinity)).toBe(false);
  });

  test("returns false for non-number types", () => {
    expect(isArrayLength("100")).toBe(false);
    expect(isArrayLength(true)).toBe(false);
    expect(isArrayLength(false)).toBe(false);
    expect(isArrayLength([])).toBe(false);
    expect(isArrayLength({})).toBe(false);
    expect(isArrayLength(null)).toBe(false);
    expect(isArrayLength(undefined)).toBe(false);
  });
});

describe(`${isFunction.name}()`, () => {
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

describe(`${isInfinity.name}()`, () => {
  test("returns true for positive infinity", () => {
    expect(isInfinity(Number.POSITIVE_INFINITY)).toBe(true);
  });

  test("returns false for negative infinity", () => {
    expect(isInfinity(Number.NEGATIVE_INFINITY)).toBe(false);
  });

  test("returns false for finite numbers", () => {
    expect(isInfinity(0)).toBe(false);
    expect(isInfinity(100)).toBe(false);
    expect(isInfinity(-100)).toBe(false);
  });

  test("returns false for non-number types", () => {
    expect(isInfinity("Infinity")).toBe(false);
    expect(isInfinity(true)).toBe(false);
    expect(isInfinity([])).toBe(false);
    expect(isInfinity({})).toBe(false);
    expect(isInfinity(null)).toBe(false);
    expect(isInfinity(undefined)).toBe(false);
  });

  test("returns false for NaN", () => {
    expect(isInfinity(NaN)).toBe(false);
  });
});

describe(`${isIterable.name}()`, () => {
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

describe(`${isLinkedLength.name}()`, () => {
  test("returns true for zero", () => {
    expect(isLinkedLength(0)).toBe(true);
  });

  test("returns true for valid integer within array length range", () => {
    expect(isLinkedLength(100)).toBe(true);
  });

  test("returns false for negative integers", () => {
    expect(isLinkedLength(-1)).toBe(false);
  });

  test("returns false for integers greater than LINKED_MAX_LENGTH", () => {
    expect(isLinkedLength(LINKED_MAX_LENGTH + 1)).toBe(false);
  });

  test("returns false for non-integer numbers", () => {
    expect(isLinkedLength(10.5)).toBe(false);
  });

  test("returns false for -Infinity", () => {
    expect(isLinkedLength(-Infinity)).toBe(false);
  });

  test("returns false for +Infinity", () => {
    expect(isLinkedLength(Infinity)).toBe(false);
  });

  test("returns false for non-number types", () => {
    expect(isLinkedLength("100")).toBe(false);
    expect(isLinkedLength(true)).toBe(false);
    expect(isLinkedLength(false)).toBe(false);
    expect(isLinkedLength([])).toBe(false);
    expect(isLinkedLength({})).toBe(false);
    expect(isLinkedLength(null)).toBe(false);
    expect(isLinkedLength(undefined)).toBe(false);
  });
});

describe(`${isNumber.name}()`, () => {
  test("returns true for integers", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(0)).toBe(true);
  });

  test("returns true for floating point numbers", () => {
    expect(isNumber(1.1)).toBe(true);
    expect(isNumber(-1.1)).toBe(true);
    expect(isNumber(0.0)).toBe(true); // Though 0.0 is strictly equal to 0
  });

  test("returns true for NaN", () => {
    expect(isNumber(NaN)).toBe(true);
  });

  test("returns true for Infinity", () => {
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
  });

  test("returns false for string representations of numbers", () => {
    expect(isNumber("1")).toBe(false);
    expect(isNumber("1.1")).toBe(false);
    expect(isNumber("NaN")).toBe(false);
    expect(isNumber("Infinity")).toBe(false);
  });

  test("returns false for non-number types", () => {
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(() => {})).toBe(false);
    expect(isNumber(Symbol())).toBe(false);
  });
});

describe(`${isSafeCount.name}()`, () => {
  test("returns true for safe, non-negative integers", () => {
    expect(isSafeCount(0)).toBe(true);
    expect(isSafeCount(1)).toBe(true);
    expect(isSafeCount(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  test("returns false for negative integers", () => {
    expect(isSafeCount(-1)).toBe(false);
    expect(isSafeCount(-100)).toBe(false);
  });

  test("returns false for non-integer numbers", () => {
    expect(isSafeCount(1.5)).toBe(false);
    expect(isSafeCount(-1.5)).toBe(false);
    expect(isSafeCount(Number.MIN_VALUE)).toBe(false);
  });

  test("returns false for integers not safe in JavaScript", () => {
    expect(isSafeCount(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    expect(isSafeCount(Number.MIN_SAFE_INTEGER - 1)).toBe(false);
  });

  test("returns false for non-number types", () => {
    expect(isSafeCount("10")).toBe(false);
    expect(isSafeCount(true)).toBe(false);
    expect(isSafeCount(null)).toBe(false);
    expect(isSafeCount(undefined)).toBe(false);
    expect(isSafeCount([])).toBe(false);
    expect(isSafeCount({})).toBe(false);
    expect(isSafeCount(() => {})).toBe(false);
    expect(isSafeCount(Symbol("symbol"))).toBe(false);
  });

  test("returns false for NaN and Infinity", () => {
    expect(isSafeCount(NaN)).toBe(false);
    expect(isSafeCount(Infinity)).toBe(false);
    expect(isSafeCount(-Infinity)).toBe(false);
  });
});

describe(`${isSymbol.name}()`, () => {
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
