import { describe, expect, it, vi } from "vitest";

import { Queue } from "../types/queue";
import { Constructor } from "../utils/mixins";
import { tests as collectionTests } from "./indexedCollectionTests";

export const tests: {
  [key: string]: (ctor: Constructor<Queue<unknown>>) => void;
} = Object.assign({}, collectionTests, {
  queue: test,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function test(ctor: Constructor<Queue<any>>): void {
  function gen<T>(...args: unknown[]): Queue<T> {
    return new ctor(...args);
  }

  describe(ctor.name, () => {
    describe("capacity", () => {
      // Capacity increase

      it("grows and maintains element order", () => {
        const queue = gen<number>(1, 2);
        queue.capacity = 4;
        queue.push(3);
        expect([...queue.values()]).toEqual([1, 2, 3]);
      });

      it("maintains element order when full, rotated and greatly grown", () => {
        const queue = gen<number>(1, 2, 3);
        queue.push(4, 5);
        queue.capacity = 10;
        queue.push(6);
        expect([...queue.values()]).toEqual([3, 4, 5, 6]);
      });

      it("maintains element order when full, rotated and slightly grown", () => {
        const queue = gen<number>(1, 2, 3, 4, 5);
        queue.push(6, 7);
        queue.capacity = 6;
        queue.push(8);
        expect([...queue.values()]).toEqual([3, 4, 5, 6, 7, 8]);
      });

      it("maintains element order when not full, rotated and greatly grown", () => {
        const queue = gen<number>(1, 2, 3);
        queue.push(4, 5);
        queue.shift();
        queue.capacity = 10;
        queue.push(6);
        expect([...queue.values()]).toEqual([4, 5, 6]);
      });

      it("maintains element order when not full, rotated and slightly grown", () => {
        const queue = gen<number>(1, 2, 3, 4, 5);
        queue.push(6, 7, 8);
        queue.shift();
        queue.shift();
        queue.capacity = 6;
        queue.push(9);
        expect([...queue.values()]).toEqual([6, 7, 8, 9]);
      });

      // Capacity decrease

      it("shrinks to a smaller capacity and retains elements", () => {
        const queue = gen<number>(1, 2, 3);
        queue.push(1, 2, 3);
        queue.capacity = 4;
        expect(queue.capacity).toBe(4);
        expect([...queue.values()]).toEqual([1, 2, 3]);
      });

      it("shrink to zero capacity", () => {
        const queue = gen<number>(5);
        queue.push(1, 2, 3);
        queue.capacity = 0;
        expect(queue.capacity).toBe(0);
        expect(queue.size).toBe(0);
        expect([...queue.values()]).toEqual([]);
      });

      it("repopulate after shrink to zero capacity", () => {
        const queue = gen<number>(3);
        queue.push(1, 2, 3, 4, 5);
        queue.capacity = 0;
        queue.capacity = 3;
        queue.push(6);
        expect(queue.capacity).toBe(3);
        expect(queue.size).toBe(1);
        expect([...queue.values()]).toEqual([6]);
      });

      it("shrink correctly when slightly rotated", () => {
        const stack = gen<number>(1, 2, 3, 4, 5);
        stack.push(6);
        stack.capacity = 3;
        stack.push(10);
        expect(stack.capacity).toBe(3);
        expect(stack.size).toBe(3);
        expect([...stack.values()]).toEqual([5, 6, 10]);
      });

      it("shrink correctly when greatly rotated", () => {
        const stack = gen<number>(1, 2, 3, 4, 5);
        stack.push(6, 7, 8, 9);
        stack.capacity = 3;
        stack.push(10);
        expect(stack.capacity).toBe(3);
        expect(stack.size).toBe(3);
        expect([...stack.values()]).toEqual([8, 9, 10]);
      });
    });

    describe("clear()", () => {
      it("allows adding elements after clearing", () => {
        const queue = gen<number>(1, 2, 3);
        queue.clear();
        queue.push(4);
        expect(queue.size).toBe(1);
        expect([...queue.values()]).toEqual([4]);
      });
    });

    describe("entries()", () => {
      it("returns an empty iterable for an empty queue", () => {
        const queue = gen<number>(3);
        expect([...queue.entries()]).toEqual([]);
      });

      it("returns all key-value pairs for a non-empty queue", () => {
        const queue = gen<number>(1, 2, 3);
        expect([...queue.entries()]).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("maintains correct order of entries", () => {
        const queue = gen<number>(1, 2, 3);
        queue.push(4);
        expect([...queue.entries()]).toEqual([
          [0, 2],
          [1, 3],
          [2, 4],
        ]);
      });

      it("should skip empty indices", () => {
        const queue = gen<number>(10);
        queue.push(1, 2, 3);
        expect([...queue.entries()]).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("reflects changes after modifications", () => {
        const queue = gen<number>(1, 2, 3);
        queue.shift();
        queue.push(4);
        expect([...queue.entries()]).toEqual([
          [0, 2],
          [1, 3],
          [2, 4],
        ]);
      });

      it("validates key-value pairs", () => {
        const queue = gen<number>(1, 2, 3);
        for (const [key, value] of queue.entries()) {
          expect(key + 1).toBe(value);
        }
      });
    });

    describe("first()", () => {
      it("returns the first element in a non-empty queue", () => {
        const queue = gen<number>(1, 2, 3);
        expect(queue.first()).toBe(1);
      });

      it("returns undefined for an empty queue", () => {
        const queue = gen<number>(3);
        expect(queue.first()).toBeUndefined();
      });

      it("does not modify the queue", () => {
        const queue = gen<number>(1, 2, 3);
        const initialSize = queue.size;
        queue.first();
        expect(queue.size).toBe(initialSize);
        expect([...queue.values()]).toEqual([1, 2, 3]);
      });

      it("reflects the correct first element after modifications", () => {
        const queue = gen<number>(3);
        queue.push(1);
        expect(queue.first()).toBe(1);
        queue.push(2);
        expect(queue.first()).toBe(1);
        queue.shift();
        expect(queue.first()).toBe(2);
      });
    });

    describe("forEach()", () => {
      it("provides correct arguments to the callback function", () => {
        const queue = gen<number>(1, 2, 3);
        const mockCallback = vi.fn();
        queue.forEach(mockCallback);
        expect(mockCallback.mock.calls[0][0]).toBe(1); // First element's value
        expect(mockCallback.mock.calls[0][1]).toBe(0); // First element's index
        expect(mockCallback.mock.calls[0][2]).toBe(queue); // queue reference
      });

      it("should execute the callback for each element", () => {
        const queue = gen<number>(1, 2, 3);
        const mockCallback = vi.fn();
        queue.forEach(mockCallback);
        expect(mockCallback.mock.calls.length).toBe(3);
        expect(mockCallback.mock.calls[0][0]).toBe(1); // First element's value
        expect(mockCallback.mock.calls[1][0]).toBe(2); // Second element's value
        expect(mockCallback.mock.calls[2][0]).toBe(3); // Third element's value
      });

      it("handles removals to queue during iteration", () => {
        const queue = gen<number>(20);
        queue.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        const mockCallback = vi.fn((_value, _index, queue) => {
          queue.shift();
        });
        queue.forEach(mockCallback);
        // Check if the callback was called expected number of times
        expect(mockCallback.mock.calls.length).toBe(5);
        // Check if the queue was modified correctly
        expect(queue.size).toBe(5);
      });
    });

    describe("front()", () => {
      it("returns the first element in a non-empty queue", () => {
        const queue = gen<number>(1, 2, 3);
        expect(queue.front()).toBe(1);
      });

      it("returns undefined for an empty queue", () => {
        const queue = gen<number>(3);
        expect(queue.front()).toBeUndefined();
      });

      it("does not modify the queue", () => {
        const queue = gen<number>(1, 2, 3);
        const initialSize = queue.size;
        queue.front();
        expect(queue.size).toBe(initialSize);
        expect([...queue.values()]).toEqual([1, 2, 3]);
      });

      it("reflects the correct front element after modifications", () => {
        const queue = gen<number>(3);
        queue.push(1);
        expect(queue.front()).toBe(1);
        queue.push(2);
        expect(queue.front()).toBe(1);
        queue.shift();
        expect(queue.front()).toBe(2);
      });
    });

    describe("has()", () => {
      it("correctly identifies boundary elements", () => {
        const queue = gen<number>(1, 2, 3);
        queue.push(4);
        expect(queue.has(2)).toBe(true);
        expect(queue.has(4)).toBe(true);
      });
    });

    describe("keys()", () => {
      it("returns an empty iterable for an empty queue", () => {
        const queue = gen<number>(3);
        expect([...queue.keys()]).toEqual([]);
      });

      it("returns all indices for a non-empty queue", () => {
        const queue = gen<number>(1, 2, 3);
        expect([...queue.keys()]).toEqual([0, 1, 2]);
      });

      it("maintains correct order of keys", () => {
        const queue = gen<number>(1, 2, 3);
        queue.push(4);
        expect([...queue.keys()]).toEqual([0, 1, 2]);
      });

      it("should skip empty indices", () => {
        const queue = gen<number>(10);
        queue.push(1, 2, 3);
        expect([...queue.keys()]).toEqual([0, 1, 2]);
      });

      it("reflects changes in keys after modifications", () => {
        const queue = gen<number>(3);
        queue.push(1);
        queue.push(2);
        queue.shift();
        queue.push(3);
        expect([...queue.keys()]).toEqual([0, 1]);
      });

      it("returns no keys after clearing the queue", () => {
        const queue = gen<number>(1, 2, 3);
        queue.clear();
        expect([...queue.keys()]).toEqual([]);
      });

      it("maintains consistent keys after sequential operations", () => {
        const queue = gen<number>(5);
        queue.push(1, 2);
        queue.shift();
        queue.push(3, 4);
        queue.shift();
        expect([...queue.keys()]).toEqual([0, 1]);
      });
    });

    describe("push()", () => {
      it("should push elements into an empty queue", () => {
        const queue = gen<number>(3);
        queue.push(1, 2);
        expect(queue.shift()).toBe(1);
        expect(queue.shift()).toBe(2);
        expect(queue.shift()).toBeUndefined();
      });

      it("should push elements into a non-full queue and return an empty queue", () => {
        const queue = gen<number>(5);
        queue.push(1, 2, 3);
        const overwritten = queue.push(4);
        expect(overwritten).toEqual([]);
        expect(queue.shift()).toBe(1);
        expect(queue.shift()).toBe(2);
        expect(queue.shift()).toBe(3);
        expect(queue.shift()).toBe(4);
      });

      it("should push elements into a full queue and return overwritten elements", () => {
        const queue = gen<number>(3);
        queue.push(1, 2, 3);
        const overwritten = queue.push(4, 5);
        expect(overwritten).toEqual([1, 2]);
        expect(queue.shift()).toBe(3);
        expect(queue.shift()).toBe(4);
        expect(queue.shift()).toBe(5);
      });

      it("should handle pushing more elements than the size of the queue", () => {
        const queue = gen<number>(3);
        const overwritten = queue.push(1, 2, 3, 4, 5, 6);
        expect(overwritten).toEqual([1, 2, 3]);
        expect(queue.shift()).toBe(4);
        expect(queue.shift()).toBe(5);
        expect(queue.shift()).toBe(6);
      });

      it("should return the pushed elements when queue size is zero", () => {
        const queue = gen<number>(0);
        const pushedElems = queue.push(1, 2, 3);
        expect(pushedElems).toEqual([1, 2, 3]);
      });
    });

    describe("shift()", () => {
      it("removes and returns the first element", () => {
        const queue = gen<number>(1, 2, 3);
        expect(queue.shift()).toBe(1);
        expect([...queue.values()]).toEqual([2, 3]);
      });

      it("returns undefined for an empty queue", () => {
        const queue = gen<number>(3);
        expect(queue.shift()).toBeUndefined();
      });

      it("updates size after pop", () => {
        const queue = gen<number>(1, 2, 3);
        queue.shift();
        expect(queue.size).toBe(2);
      });

      it("pops elements in the correct order", () => {
        const queue = gen<number>(1, 2, 3);
        expect(queue.shift()).toBe(1);
        expect(queue.shift()).toBe(2);
        expect(queue.shift()).toBe(3);
        expect(queue.shift()).toBeUndefined();
      });

      it("handles multiple pops and pushes correctly", () => {
        const queue = gen<number>(1, 2, 3);
        expect(queue.shift()).toBe(1);
        queue.push(4);
        expect(queue.shift()).toBe(2);
        queue.push(5);
        expect(queue.shift()).toBe(3);
        expect(queue.shift()).toBe(4);
        expect(queue.shift()).toBe(5);
        expect(queue.shift()).toBeUndefined();
      });
    });

    describe("values()", () => {
      it("maintains correct order of values", () => {
        const queue = gen<number>(1, 2, 3);
        queue.push(4);
        expect([...queue.values()]).toEqual([2, 3, 4]);
      });

      it("should skip empty indices", () => {
        const queue = gen<number>(10);
        queue.push(1, 2, 3);
        expect([...queue.values()]).toEqual([1, 2, 3]);
      });

      it("reflects changes in values after modifications", () => {
        const queue = gen<number>(3);
        queue.push(1);
        queue.push(2);
        queue.shift();
        queue.push(3);
        expect([...queue.values()]).toEqual([2, 3]);
      });

      it("maintains consistent values after sequential operations", () => {
        const queue = gen<number>(5);
        queue.push(1, 2);
        queue.shift();
        queue.push(3, 4);
        queue.shift();
        expect([...queue.values()]).toEqual([3, 4]);
      });
    });

    describe("[Symbol.iterator]()", () => {
      it("maintains correct order of values", () => {
        const queue = gen<number>(1, 2, 3);
        queue.push(4);
        expect([...queue]).toEqual([2, 3, 4]);
      });

      it("should skip empty indices", () => {
        const queue = gen<number>(10);
        queue.push(1, 2, 3);
        expect([...queue]).toEqual([1, 2, 3]);
      });

      it("reflects changes in values after modifications", () => {
        const queue = gen<number>(3);
        queue.push(1);
        queue.push(2);
        queue.shift();
        queue.push(3);
        expect([...queue]).toEqual([2, 3]);
      });

      it("maintains consistent values after sequential operations", () => {
        const queue = gen<number>(5);
        queue.push(1, 2);
        queue.shift();
        queue.push(3, 4);
        queue.shift();
        expect([...queue]).toEqual([3, 4]);
      });
    });
  });
}
