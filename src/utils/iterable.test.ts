import { describe, expect, test } from "vitest";

import { chunk } from "./iterable";

describe("chunk()", () => {
  test("divides an array into chunks of the specified size", () => {
    const array = [1, 2, 3, 4, 5, 6];
    const chunked = Array.from(chunk(array, 2));
    expect(chunked).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  test("handles arrays where the last chunk is smaller than the specified size", () => {
    const array = [1, 2, 3, 4, 5];
    const chunked = Array.from(chunk(array, 2));
    expect(chunked).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("returns the entire array as a single chunk when chunkSize is greater than the array size", () => {
    const array = [1, 2, 3];
    const chunked = Array.from(chunk(array, 5));
    expect(chunked).toEqual([[1, 2, 3]]);
  });

  test("handles chunkSize of 1 correctly", () => {
    const array = [1, 2, 3];
    const chunked = Array.from(chunk(array, 1));
    expect(chunked).toEqual([[1], [2], [3]]);
  });

  test("returns an empty array for an empty iterable", () => {
    const array: number[] = [];
    const chunked = Array.from(chunk(array, 2));
    expect(chunked).toEqual([]);
  });

  test("handles zero chunk size", () => {
    const array = [1, 2, 3];
    const chunked = Array.from(chunk(array, 0));
    expect(chunked).toEqual([]);
  });

  test("handles negative chunk size", () => {
    const array = [1, 2, 3];
    const chunked = Array.from(chunk(array, -1));
    expect(chunked).toEqual([]);
  });

  test("works with non-array iterables", () => {
    function* generateNumbers() {
      yield* [1, 2, 3, 4, 5, 6];
    }
    const chunked = Array.from(chunk(generateNumbers(), 3));
    expect(chunked).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  test("correctly handles the last chunk when it equals the specified chunk size", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    const chunked = Array.from(chunk(array, 4));
    expect(chunked).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);
  });
});
