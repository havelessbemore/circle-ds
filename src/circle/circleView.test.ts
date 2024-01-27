import { tests } from "../types/collectionTests";
import { CircleView } from "./circleView";
import { describe, expect, it, vi } from "vitest";

for (const name of Object.keys(tests)) {
  tests[name](CircleView);
}

describe(CircleView.name, () => {
  describe("static from()", () => {
    it("creates a queue correctly from an array", () => {
      const array = [1, 2, 3];
      const queue = CircleView.from(array);
      expect(queue.size).toBe(array.length);
      expect([...queue.values()]).toEqual(array);
    });

    it("creates a queue from other iterable types", () => {
      const set = new Set([1, 2, 3]);
      const queue = CircleView.from(set);
      expect(queue.size).toBe(set.size);
      expect([...queue.values()]).toEqual([...set]);
    });

    it("creates an empty queue from an empty iterable", () => {
      const queue = CircleView.from([] as unknown[]);
      expect(queue.size).toBe(0);
      expect([...queue.values()]).toEqual([]);
    });
  });

  describe("static of()", () => {
    it("creates a queue correctly with multiple elements", () => {
      const elements = [1, 2, 3];
      const queue = CircleView.of(...elements);
      expect(queue.size).toBe(elements.length);
      expect([...queue.values()]).toEqual(elements);
    });

    it("creates an empty queue when no arguments are provided", () => {
      const queue = CircleView.of();
      expect(queue.size).toBe(0);
      expect([...queue.values()]).toEqual([]);
    });

    it("creates a queue correctly with a single element", () => {
      const queue = CircleView.of(1);
      expect(queue.size).toBe(1);
      expect([...queue.values()]).toEqual([1]);
    });
  });

  describe("entries()", () => {
    it("returns an empty iterable for an empty queue", () => {
      const queue = new CircleView<number>(3);
      expect([...queue.entries()]).toEqual([]);
    });

    it("returns all key-value pairs for a non-empty queue", () => {
      const queue = new CircleView<number>(1, 2, 3);
      expect([...queue.entries()]).toEqual([
        [0, 1],
        [1, 2],
        [2, 3],
      ]);
    });
  });

  describe("forEach()", () => {
    it("provides correct arguments to the callback function", () => {
      const queue = new CircleView<number>(1, 2, 3);
      const mockCallback = vi.fn();
      queue.forEach(mockCallback);
      expect(mockCallback.mock.calls[0][0]).toBe(1); // First element's value
      expect(mockCallback.mock.calls[0][1]).toBe(0); // First element's index
      expect(mockCallback.mock.calls[0][2]).toBe(queue); // queue reference
    });

    it("should execute the callback for each element", () => {
      const queue = new CircleView<number>(1, 2, 3);
      const mockCallback = vi.fn();
      queue.forEach(mockCallback);
      expect(mockCallback.mock.calls.length).toBe(3);
      expect(mockCallback.mock.calls[0][0]).toBe(1); // First element's value
      expect(mockCallback.mock.calls[1][0]).toBe(2); // Second element's value
      expect(mockCallback.mock.calls[2][0]).toBe(3); // Third element's value
    });
  });
});
