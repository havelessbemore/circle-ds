import { describe, expect, it } from "vitest";

import { tests } from "../tests/queueTests";
import { CircleQueue } from "./circleQueue";

for (const name of Object.keys(tests)) {
  tests[name](CircleQueue);
}

describe(CircleQueue.name, () => {
  describe("static from()", () => {
    it("creates a queue correctly from an array", () => {
      const array = [1, 2, 3];
      const queue = CircleQueue.from(array);
      expect(queue.size).toBe(array.length);
      expect([...queue.values()]).toEqual(array);
    });

    it("creates a queue from other iterable types", () => {
      const set = new Set([1, 2, 3]);
      const queue = CircleQueue.from(set);
      expect(queue.size).toBe(set.size);
      expect([...queue.values()]).toEqual([...set]);
    });

    it("creates an empty queue from an empty iterable", () => {
      const queue = CircleQueue.from([] as unknown[]);
      expect(queue.size).toBe(0);
      expect([...queue.values()]).toEqual([]);
    });
  });

  describe("static of()", () => {
    it("creates a queue correctly with multiple elements", () => {
      const elements = [1, 2, 3];
      const queue = CircleQueue.of(...elements);
      expect(queue.size).toBe(elements.length);
      expect([...queue.values()]).toEqual(elements);
    });

    it("creates an empty queue when no arguments are provided", () => {
      const queue = CircleQueue.of();
      expect(queue.size).toBe(0);
      expect([...queue.values()]).toEqual([]);
    });

    it("creates a queue correctly with a single element", () => {
      const queue = CircleQueue.of(1);
      expect(queue.size).toBe(1);
      expect([...queue.values()]).toEqual([1]);
    });
  });
});
