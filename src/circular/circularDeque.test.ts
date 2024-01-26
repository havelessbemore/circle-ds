import { describe, expect, it } from "vitest";

import { tests } from "../types/dequeTests";
import { CircularDeque } from "./circularDeque";

for (const name of Object.keys(tests)) {
  tests[name](CircularDeque);
}

describe(CircularDeque.name, () => {
  describe("static from()", () => {
    it("creates a queue correctly from an array", () => {
      const array = [1, 2, 3];
      const queue = CircularDeque.from(array);
      expect(queue.size).toBe(array.length);
      expect([...queue.values()]).toEqual(array);
    });

    it("creates a queue from other iterable types", () => {
      const set = new Set([1, 2, 3]);
      const queue = CircularDeque.from(set);
      expect(queue.size).toBe(set.size);
      expect([...queue.values()]).toEqual([...set]);
    });

    it("creates an empty queue from an empty iterable", () => {
      const queue = CircularDeque.from([]);
      expect(queue.size).toBe(0);
      expect([...queue.values()]).toEqual([]);
    });
  });

  describe("static of()", () => {
    it("creates a queue correctly with multiple elements", () => {
      const elements = [1, 2, 3];
      const queue = CircularDeque.of(...elements);
      expect(queue.size).toBe(elements.length);
      expect([...queue.values()]).toEqual(elements);
    });

    it("creates an empty queue when no arguments are provided", () => {
      const queue = CircularDeque.of();
      expect(queue.size).toBe(0);
      expect([...queue.values()]).toEqual([]);
    });

    it("creates a queue correctly with a single element", () => {
      const queue = CircularDeque.of(1);
      expect(queue.size).toBe(1);
      expect([...queue.values()]).toEqual([1]);
    });
  });
});
