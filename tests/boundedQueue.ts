import { describe, expect, it, vi } from "vitest";

import { Bounded } from "../src/types/bounded";
import { BoundedEvent } from "../src/types/boundedEvent";
import { Constructor } from "../src/types/constructor";
import { Queue } from "../src/types/queue";

type BoundedQueue<T> = Queue<T> & Bounded<T>;

export function test(cls: Constructor<BoundedQueue<unknown>>) {
  describe(cls.name, () => {
    describe("constructor()", () => {
      it("accepts an element", () => {
        const queue = new cls([1]);
        expect(queue.capacity).toBe(1);
        expect(queue.size).toBe(1);
        expect(Array.from(queue.values())).toEqual([1]);
      });

      it("does not directly use input array", () => {
        const arr = [1];
        const queue = new cls(arr);
        arr[0] = 2;
        arr.push(3);
        expect(queue.size).toEqual(1);
        expect(queue.capacity).toEqual(1);
        expect(Array.from(queue.values())).toEqual([1]);
      });

      it("accepts multiple elements", () => {
        const queue = new cls([1, 2, 3]);
        expect(queue.capacity).toBe(3);
        expect(queue.size).toBe(3);
        expect(Array.from(queue.values())).toEqual([1, 2, 3]);
      });

      it("accepts repeated values", () => {
        const queue = new cls([1, 1, 1, 1, 1]);
        expect(queue.capacity).toBe(5);
        expect(queue.size).toBe(5);
        expect(Array.from(queue.values())).toEqual([1, 1, 1, 1, 1]);
      });

      it("handles complex data types", () => {
        const queue = new cls([{ a: 1 }, { b: 2 }]);
        expect(queue.size).toBe(2);
        expect(queue.capacity).toBe(2);
        expect(Array.from(queue.values())).toEqual([{ a: 1 }, { b: 2 }]);
      });

      it("accepts an iterable", () => {
        const queue = new cls(new Set([1, 2, 3]));
        expect(queue.size).toBe(3);
        expect(queue.capacity).toBe(3);
        expect(Array.from(queue.values())).toEqual([1, 2, 3]);
      });
    });

    describe("capacity", () => {
      // Capacity increase

      it("growth retains element order", () => {
        const queue = new cls([1, 2, 3]);
        queue.capacity = 5;
        expect(queue.capacity).toBe(5);
        expect(queue.size).toBe(3);
        expect(Array.from(queue.values())).toEqual([1, 2, 3]);
      });

      it("growth retains element order, exhaustive", () => {
        const minCapacity = 0;
        const maxCapacity = 25;
        for (let startCap = minCapacity; startCap <= maxCapacity; ++startCap) {
          for (let endCap = startCap; endCap <= maxCapacity; ++endCap) {
            for (let rot = 0; rot <= startCap; ++rot) {
              for (let pop = 0; pop <= startCap; ++pop) {
                // Create initial array
                const ordered = new Array(startCap);
                for (let i = 0; i < startCap; ++i) {
                  ordered[i] = i;
                }

                // Create initial queue
                const queue = new cls(ordered);

                // Rotate
                for (let i = 0; i < rot; ++i) {
                  ordered.shift();
                  ordered.push(i + startCap);
                  queue.push(i + startCap);
                }

                // Shift
                for (let i = 0; i < pop; ++i) {
                  ordered.shift();
                  queue.shift();
                }

                // Update capacity
                queue.capacity = endCap;
                expect(Array.from(queue.values())).toEqual(ordered);
              }
            }
          }
        }
      });

      // Capacity decrease

      it("handles shrink to zero capacity", () => {
        const queue = new cls([1, 2, 3]);
        queue.capacity = 0;
        expect(queue.capacity).toBe(0);
        expect(queue.size).toBe(0);
        expect(Array.from(queue.values())).toEqual([]);
      });

      it("shrink retains element order", () => {
        const queue = new cls(10);
        queue.push(1, 2, 3);
        queue.capacity = 5;
        expect(queue.capacity).toBe(5);
        expect(queue.size).toBe(3);
        expect(Array.from(queue.values())).toEqual([1, 2, 3]);
      });

      it("discards elements when shrinking to a smaller capacity than size", () => {
        const queue = new cls([1, 2, 3, 4, 5]);
        queue.capacity = 3;
        expect(queue.capacity).toBe(3);
        expect(Array.from(queue.values())).toEqual([3, 4, 5]);
      });

      it("correctly repopulates after shrink to zero capacity", () => {
        const queue = new cls([1, 2, 3, 4, 5]);
        queue.capacity = 0;
        queue.capacity = 3;
        queue.push(6);
        expect(queue.capacity).toBe(3);
        expect(queue.size).toBe(1);
        expect(Array.from(queue.values())).toEqual([6]);
      });

      it("shrink retains element order, exhaustive", () => {
        const minCapacity = 0;
        const maxCapacity = 25;
        for (let startCap = minCapacity; startCap <= maxCapacity; ++startCap) {
          for (let endCap = 0; endCap <= startCap; ++endCap) {
            for (let rot = 0; rot <= startCap; ++rot) {
              for (let pop = 0; pop <= startCap; ++pop) {
                // Create initial array
                let ordered = new Array(startCap);
                for (let i = 0; i < startCap; ++i) {
                  ordered[i] = i;
                }

                // Create initial queue
                const queue = new cls(ordered);

                // Rotate
                for (let i = 0; i < rot; ++i) {
                  ordered.shift();
                  ordered.push(i + startCap);
                  queue.push(i + startCap);
                }

                // Shift
                for (let i = 0; i < pop; ++i) {
                  ordered.shift();
                  queue.shift();
                }

                // Update capacity
                queue.capacity = endCap;
                ordered = ordered.slice(Math.max(0, ordered.length - endCap));
                expect(Array.from(queue.values())).toEqual(ordered);
              }
            }
          }
        }
      });
    });

    describe("clear()", () => {
      it("clears a default queue correctly", () => {
        const queue = new cls();
        expect(() => queue.clear()).not.toThrow();
        expect(queue.size).toBe(0);
        expect(queue.capacity).toBe(Infinity);
        expect(Array.from(queue)).toEqual([]);
      });

      it("clears a zero capacity queue correctly", () => {
        const queue = new cls(0);
        queue.clear();
        expect(queue.size).toBe(0);
        expect(queue.capacity).toBe(0);
        expect(Array.from(queue)).toEqual([]);
      });

      it("clears an unused queue correctly", () => {
        const queue = new cls(10);
        queue.clear();
        expect(queue.size).toBe(0);
        expect(queue.capacity).toBe(10);
        expect(Array.from(queue)).toEqual([]);
      });

      it("clears a filled queue correctly", () => {
        const queue = new cls([1, 2, 3, 4, 5]);
        expect(queue.size).toBe(5);
        queue.clear();
        expect(queue.size).toBe(0);
        expect(queue.capacity).toBe(5);
        expect(Array.from(queue)).toEqual([]);
      });

      it("allows adding elements after clearing", () => {
        const queue = new cls([1, 2, 3]);
        queue.clear();
        expect(queue.size).toBe(0);
        expect(queue.capacity).toBe(3);
        expect(Array.from(queue.values())).toEqual([]);
        queue.push(4);
        expect(queue.size).toBe(1);
        expect(Array.from(queue.values())).toEqual([4]);
      });

      it("allows adding elements after clearing 2", () => {
        const queue = new cls([1, 2, 3]);
        queue.push(4, 5);
        queue.clear();
        expect(queue.size).toBe(0);
        expect(queue.capacity).toBe(3);
        expect(Array.from(queue.values())).toEqual([]);
        queue.push(6);
        expect(queue.size).toBe(1);
        expect(Array.from(queue.values())).toEqual([6]);
        queue.push(7, 8);
        expect(queue.size).toBe(3);
        expect(Array.from(queue.values())).toEqual([6, 7, 8]);
      });

      it("Can be called repeatedly", () => {
        const queue = new cls([1, 2, 3, 4, 5]);
        expect(queue.size).toBe(5);
        queue.clear();
        expect(queue.size).toBe(0);
        queue.clear();
        expect(queue.size).toBe(0);
        queue.clear();
        expect(queue.size).toBe(0);
        expect(queue.capacity).toBe(5);
        expect(Array.from(queue.values())).toEqual([]);
      });
    });

    describe("entries()", () => {
      it("returns no entries for an empty queue", () => {
        const queue = new cls();
        const entries = Array.from(queue.entries());
        expect(entries.length).toBe(0);
      });

      it("returns correct entries for a partially filled queue", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3);
        const entries = Array.from(queue.entries());
        expect(entries).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("returns correct entries for a full queue", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        const entries = Array.from(queue.entries());
        expect(entries).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("returns correct entries after removing an element", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.shift();
        expect(Array.from(queue.entries())).toEqual([
          [0, 2],
          [1, 3],
        ]);
      });

      it("returns correct entries for a queue that has wrapped around", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.push(4);
        expect(Array.from(queue.entries())).toEqual([
          [0, 2],
          [1, 3],
          [2, 4],
        ]);
        queue.push(5);
        expect(Array.from(queue.entries())).toEqual([
          [0, 3],
          [1, 4],
          [2, 5],
        ]);
        queue.push(6);
        expect(Array.from(queue.entries())).toEqual([
          [0, 4],
          [1, 5],
          [2, 6],
        ]);
        queue.push(7);
        expect(Array.from(queue.entries())).toEqual([
          [0, 5],
          [1, 6],
          [2, 7],
        ]);
      });

      it("returns correct entries after capacity increase", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.capacity = 5;
        expect(Array.from(queue.entries())).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
        queue.push(4, 5);
        expect(Array.from(queue.entries())).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 5],
        ]);
        queue.push(6, 7);
        expect(Array.from(queue.entries())).toEqual([
          [0, 3],
          [1, 4],
          [2, 5],
          [3, 6],
          [4, 7],
        ]);
      });

      it("returns correct entries after capacity decrease", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3, 4, 5);
        queue.capacity = 3;
        expect(Array.from(queue.entries())).toEqual([
          [0, 3],
          [1, 4],
          [2, 5],
        ]);
        queue.push(6, 7);
        expect(Array.from(queue.entries())).toEqual([
          [0, 5],
          [1, 6],
          [2, 7],
        ]);
      });
    });

    describe("first()", () => {
      it("returns undefined for an empty queue", () => {
        const queue = new cls();
        expect(queue.first()).toBeUndefined();
      });

      it("returns the first element for a partially filled queue", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3);
        expect(queue.first()).toBe(1);
      });

      it("returns the first element for a full queue", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        expect(queue.first()).toBe(1);
      });

      it("maintains the first element after removing and adding elements", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.shift();
        expect(queue.first()).toBe(2);
        queue.push(4);
        expect(queue.first()).toBe(2);
      });

      it("updates the first element correctly after multiple shifts", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        expect(queue.first()).toBe(1);
        queue.shift();
        expect(queue.first()).toBe(2);
        queue.shift();
        expect(queue.first()).toBe(3);
        queue.shift();
        expect(queue.first()).toBeUndefined();
      });

      it("returns the correct first element for a queue that has wrapped around", () => {
        const queue = new cls(4);
        queue.push(1, 2, 3); // [1, 2, 3, _]
        expect(queue.first()).toBe(1);
        queue.push(4); // [1, 2, 3, 4]
        expect(queue.first()).toBe(1);
        queue.push(5); // [2, 3, 4, 5]
        expect(queue.first()).toBe(2);
        queue.push(6); // [3, 4, 5, 6]
        expect(queue.first()).toBe(3);
        queue.push(7); // [4, 5, 6, 7]
        expect(queue.first()).toBe(4);
      });

      it("returns undefined after clearing the queue", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.clear();
        expect(queue.first()).toBeUndefined();
      });

      it("returns the correct first element after increasing capacity", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.capacity = 5;
        expect(queue.first()).toBe(1);
      });

      it("returns the correct first element after decreasing capacity", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3, 4, 5);
        queue.capacity = 3;
        expect(queue.first()).toBe(3);
      });
    });

    describe("forEach()", () => {
      it("does not call the callback for an empty queue", () => {
        const queue = new cls();
        const mockCallback = vi.fn();
        queue.forEach(mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
      });

      it("calls the callback for each element in a partially filled queue", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3);
        const mockCallback = vi.fn();
        queue.forEach(mockCallback);
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, queue);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, queue);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 2, queue);
      });

      it("uses the provided thisArg for the callback", () => {
        const queue = new cls([1, 2, 3]);
        const context = { multiplier: 2 };
        const mockCallback = vi.fn(function (this: typeof context, value) {
          return value * this.multiplier;
        });
        queue.forEach(mockCallback, context);
        expect(mockCallback.mock.instances[0]).toBe(context);
      });

      it("correctly handles callback logic for a full queue", () => {
        const queue = new cls(3) as BoundedQueue<number>;
        queue.push(1, 2, 3);
        const results: number[] = [];
        queue.forEach(value => {
          results.push(value * 2);
        });
        expect(results).toEqual([2, 4, 6]);
      });

      it("works correctly after removing and adding elements", () => {
        const queue = new cls(3) as BoundedQueue<number>;
        queue.push(1, 2, 3);
        queue.shift();
        queue.push(4);
        const results: number[] = [];
        queue.forEach(value => results.push(value + 1));
        expect(results).toEqual([3, 4, 5]);
      });

      it("maintains the correct order of elements", () => {
        const queue = new cls(3) as BoundedQueue<number>;
        queue.push(3, 2, 1);
        queue.shift();
        queue.push(4);
        const results: number[] = [];
        queue.forEach(value => results.push(value));
        expect(results).toEqual([2, 1, 4]);
      });

      it("provides the correct index and queue reference to the callback", () => {
        const queue = new cls(3);
        queue.push(10, 20, 30);
        const mockCallback = vi.fn();
        queue.forEach(mockCallback);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 10, 0, queue);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 20, 1, queue);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 30, 2, queue);
      });
    });

    describe("front()", () => {
      it("returns undefined for an empty queue", () => {
        const queue = new cls();
        expect(queue.front()).toBeUndefined();
      });

      it("returns the first element for a partially filled queue", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3);
        expect(queue.front()).toBe(1);
      });

      it("returns the first element for a full queue", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        expect(queue.front()).toBe(1);
      });

      it("maintains the first element after removing and adding elements", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.shift();
        expect(queue.front()).toBe(2);
        queue.push(4);
        expect(queue.front()).toBe(2);
      });

      it("updates the first element correctly after multiple shifts", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        expect(queue.front()).toBe(1);
        queue.shift();
        expect(queue.front()).toBe(2);
        queue.shift();
        expect(queue.front()).toBe(3);
        queue.shift();
        expect(queue.front()).toBeUndefined();
      });

      it("returns the correct first element for a queue that has wrapped around", () => {
        const queue = new cls(4);
        queue.push(1, 2, 3); // [1, 2, 3, _]
        expect(queue.front()).toBe(1);
        queue.push(4); // [1, 2, 3, 4]
        expect(queue.front()).toBe(1);
        queue.push(5); // [2, 3, 4, 5]
        expect(queue.front()).toBe(2);
        queue.push(6); // [3, 4, 5, 6]
        expect(queue.front()).toBe(3);
        queue.push(7); // [4, 5, 6, 7]
        expect(queue.front()).toBe(4);
      });

      it("returns undefined after clearing the queue", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.clear();
        expect(queue.front()).toBeUndefined();
      });

      it("returns the correct first element after increasing capacity", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.capacity = 5;
        expect(queue.front()).toBe(1);
      });

      it("returns the correct first element after decreasing capacity", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3, 4, 5);
        queue.capacity = 3;
        expect(queue.front()).toBe(3);
      });
    });

    describe("has()", () => {
      it("returns false for any element when the queue is empty", () => {
        const queue = new cls(3);
        expect(queue.has(1)).toBe(false);
      });

      it("returns true for an element present in the queue", () => {
        const queue = new cls([1, 2, 3]);
        expect(queue.has(2)).toBe(true);
      });

      it("returns false for an element not present in the queue", () => {
        const queue = new cls([1, 2, 3]);
        expect(queue.has(4)).toBe(false);
      });

      it("handles primitive data types correctly", () => {
        const queue = new cls([1, "b", 3n, true, false]);
        expect(queue.has(1)).toBe(true);
        expect(queue.has("b")).toBe(true);
        expect(queue.has(3n)).toBe(true);
        expect(queue.has(true)).toBe(true);
        expect(queue.has(false)).toBe(true);
      });

      it("accurately identifies repeated and similar values", () => {
        const queue = new cls([1, 2, 2, 3, 1]);
        expect(queue.has(2)).toBe(true);
        expect(queue.has(4)).toBe(false);
      });

      it("returns false for any element after clearing the queue", () => {
        const queue = new cls([1, 2, 3]);
        queue.clear();
        expect(queue.has(1)).toBe(false);
        expect(queue.has(2)).toBe(false);
        expect(queue.has(3)).toBe(false);
      });

      it("handles non-primitive data types correctly", () => {
        const value = { key: "value" };
        const queue = new cls([3, value]);
        expect(queue.has(value)).toBe(true);
        expect(queue.has({ key: "value" })).toBe(false);
      });

      it("reflects changes after additions and removals", () => {
        const queue = new cls(3);
        queue.push(1, 2);
        expect(queue.has(1)).toBe(true);
        queue.shift();
        expect(queue.has(1)).toBe(false);
      });

      it("reflects changes after overflow", () => {
        const queue = new cls([1, 2, 3]);
        queue.push(4, 5);
        expect(queue.has(1)).toBe(false);
        expect(queue.has(2)).toBe(false);
        expect(queue.has(3)).toBe(true);
        expect(queue.has(4)).toBe(true);
        expect(queue.has(5)).toBe(true);
      });
    });

    describe("keys()", () => {
      it("returns an empty iterator for an empty queue", () => {
        const queue = new cls();
        const keys = Array.from(queue.keys());
        expect(keys).toEqual([]);
      });

      it("returns correct keys for a partially filled queue", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3);
        const keys = Array.from(queue.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("returns correct keys for a full queue", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        const keys = Array.from(queue.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("returns no keys after clearing the queue", () => {
        const queue = new cls([1, 2, 3]);
        queue.clear();
        expect(Array.from(queue.keys())).toEqual([]);
      });

      it("returns sequential keys for a queue that has wrapped around", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.shift();
        queue.push(4);
        queue.push(5);
        const keys = Array.from(queue.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("updates keys correctly after removing elements", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.shift();
        queue.push(4);
        const keys = Array.from(queue.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("updates keys correctly after removing all elements", () => {
        const queue = new cls(2);
        queue.push(1, 2);
        queue.shift();
        queue.shift();
        expect(Array.from(queue.keys())).toEqual([]);
        queue.shift();
        expect(Array.from(queue.keys())).toEqual([]);
      });

      it("returns correct keys after the queue has been cleared and refilled", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.clear();
        queue.push(4, 5);
        const keys = Array.from(queue.keys());
        expect(keys).toEqual([0, 1]);
      });
    });

    describe("push()", () => {
      it("accepts zero elements", () => {
        const inst = new cls(5);
        expect(inst.push()).toEqual(0);
        expect(inst.size).toEqual(0);
        expect(inst.capacity).toEqual(5);
        expect(Array.from(inst)).toEqual([]);
      });

      it("adds an element to an empty queue", () => {
        const queue = new cls(5);
        expect(queue.push(1)).toEqual(1);
        expect(queue.size).toBe(1);
        expect(queue.capacity).toBe(5);
        expect(Array.from(queue.values())).toEqual([1]);
      });

      it("adds multiple elements to an empty queue", () => {
        const queue = new cls(5);
        expect(queue.push(1, 2, 3)).toEqual(3);
        expect(queue.size).toBe(3);
        expect(queue.capacity).toBe(5);
        expect(Array.from(queue.values())).toEqual([1, 2, 3]);
      });

      it("adds multiple elements to a partially filled queue", () => {
        const queue = new cls(5);
        expect(queue.push(1, 2)).toEqual(2);
        expect(queue.size).toBe(2);
        expect(Array.from(queue.values())).toEqual([1, 2]);
        expect(queue.push(3, 4)).toEqual(4);
        expect(queue.size).toBe(4);
        expect(Array.from(queue.values())).toEqual([1, 2, 3, 4]);
      });

      it("maintains capacity when adding more elements than capacity", () => {
        const queue = new cls(5);
        expect(queue.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(queue.size).toBe(5);
        expect(Array.from(queue.values())).toEqual([1, 2, 3, 4, 5]);
        expect(queue.push(6)).toEqual(5);
        expect(queue.size).toBe(5);
        expect(Array.from(queue.values())).toEqual([2, 3, 4, 5, 6]);
      });

      it("removes the oldest elements when exceeding capacity", () => {
        const queue = new cls(5);
        expect(queue.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(queue.push(6, 7)).toEqual(5);
        expect(queue.size).toBe(5);
        expect(Array.from(queue.values())).toEqual([3, 4, 5, 6, 7]);
      });

      it("correctly handles adding elements when queue is full", () => {
        const queue = new cls(5);
        expect(queue.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(queue.push(6, 7, 8)).toEqual(5);
        expect(queue.size).toBe(5);
        expect(Array.from(queue.values())).toEqual([4, 5, 6, 7, 8]);
      });

      it("correctly handles adding more elements than capacity", () => {
        const queue = new cls(2);
        expect(queue.push(1, 2, 3)).toEqual(2);
        expect(queue.size).toBe(2);
        expect(Array.from(queue.values())).toEqual([2, 3]);
        queue.clear();
        expect(queue.push(1, 2, 3, 4, 5, 6, 7, 8, 9)).toEqual(2);
        expect(queue.size).toBe(2);
        expect(Array.from(queue.values())).toEqual([8, 9]);
      });

      it("handles pushing elements into a queue of capacity 0", () => {
        const queue = new cls(0);
        expect(queue.push(1)).toBe(0);
        expect(queue.size).toBe(0);
        expect(Array.from(queue.values())).toEqual([]);
        expect(queue.push(2)).toBe(0);
        expect(queue.size).toBe(0);
        expect(Array.from(queue.values())).toEqual([]);
      });

      it("handles pushing elements into a queue of capacity 1", () => {
        const queue = new cls(1);
        expect(queue.push(1)).toBe(1);
        expect(queue.size).toBe(1);
        expect(Array.from(queue.values())).toEqual([1]);
        expect(queue.push(2)).toBe(1);
        expect(queue.size).toBe(1);
        expect(Array.from(queue.values())).toEqual([2]);
      });

      it("correctly updates the queue when pushing elements after decreasing capacity", () => {
        const queue = new cls(5);
        queue.capacity = 3;
        expect(queue.push(1, 2, 3, 4)).toBe(3);
        expect(queue.size).toBe(3);
        expect(Array.from(queue.values())).toEqual([2, 3, 4]);
      });

      it("correctly updates the queue when pushing elements after increasing capacity", () => {
        const queue = new cls(2);
        queue.capacity = 5;
        expect(queue.push(1, 2, 3, 4)).toBe(4);
        expect(queue.size).toBe(4);
        expect(Array.from(queue.values())).toEqual([1, 2, 3, 4]);
      });

      it("does not discard items when adding within capacity", async () => {
        const queue = new cls(3);
        const onItemEvicted = vi.fn();

        queue.on(BoundedEvent.Overflow, onItemEvicted);
        queue.push(1, 2);
        queue.push(3);

        await new Promise<void>(done => {
          setImmediate(() => {
            expect(onItemEvicted).not.toHaveBeenCalled();
            done();
          });
        });
      });

      it(`emits '${BoundedEvent.Overflow}' event with the discarded item when capacity is exceeded`, async () => {
        const queue = new cls(3);
        const onItemEvicted = vi.fn();

        queue.on(BoundedEvent.Overflow, onItemEvicted);
        queue.push(1, 2, 3); // Fill the queue to its capacity
        queue.push(4); // Should trigger the eviction of 1

        await new Promise<void>((done, reject) => {
          setImmediate(() => {
            try {
              expect(onItemEvicted.mock.calls.length).toBe(1);
              expect(onItemEvicted).toHaveBeenCalledWith([1]);
              done();
            } catch (error) {
              reject(error);
            }
          });
        });
      });

      it(`emits '${BoundedEvent.Overflow}' event(s) with multiple items when multiple items are discarded`, async () => {
        const queue = new cls(3);
        const evicted: number[] = [];
        const onItemEvicted = vi.fn(items => evicted.push(...items));

        queue.on(BoundedEvent.Overflow, onItemEvicted);
        queue.push(1, 2, 3); // Fill the queue to its capacity
        queue.push(4, 5, 6); // Pushing 3 items, should trigger eviction of 1, 2, 3

        await new Promise<void>((done, reject) => {
          setImmediate(() => {
            try {
              expect(onItemEvicted.mock.calls.length).toBeGreaterThan(0);
              expect(evicted).toEqual([1, 2, 3]);
              done();
            } catch (error) {
              reject(error);
            }
          });
        });
      });

      it(`emits '${BoundedEvent.Overflow}' event(s) with multiple items in order when discarded`, async () => {
        const queue = new cls(3);
        const evicted: number[] = [];
        const onItemEvicted = vi.fn(items => evicted.push(...items));

        queue.on(BoundedEvent.Overflow, onItemEvicted);
        queue.push(1, 2, 3); // Fill the queue to its capacity
        queue.push(4, 5, 6); // Pushing 3 items, should trigger eviction of 1, 2, 3

        await new Promise<void>((done, reject) => {
          setImmediate(() => {
            try {
              expect(onItemEvicted.mock.calls.length).toBeGreaterThan(0);
              expect(evicted).toEqual([1, 2, 3]);
              done();
            } catch (error) {
              reject(error);
            }
          });
        });
      });
    });

    describe("shift()", () => {
      it("returns undefined from an empty queue", () => {
        const queue = new cls();
        expect(queue.shift()).toBeUndefined();
      });

      it("removes and returns the first element from a partially filled queue", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3);
        expect(queue.shift()).toBe(1);
        expect(queue.size).toBe(2);
      });

      it("correctly updates the head after shifting", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.shift();
        expect(queue.shift()).toBe(2);
        expect(queue.size).toBe(1);
      });

      it("maintains correct order after multiple shifts", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3, 4, 5);
        queue.shift(); // [2, 3, 4, 5]
        queue.shift(); // [3, 4, 5]
        expect(queue.shift()).toBe(3);
        expect(queue.size).toBe(2);
      });

      it("handles shift operations in a full queue correctly", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.shift(); // [2, 3]
        queue.push(4); // [2, 3, 4]
        expect(queue.shift()).toBe(2);
        expect(queue.size).toBe(2);
        expect(queue.shift()).toBe(3);
        expect(queue.size).toBe(1);
      });

      it("returns undefined after shifting all elements", () => {
        const queue = new cls(3);
        queue.push(1, 2); // [1, 2]
        queue.shift(); // [2]
        queue.shift(); // []
        expect(queue.shift()).toBeUndefined();
        expect(queue.size).toBe(0);
      });

      it("maintains circular behavior after wrapping around", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3); // [1, 2, 3]
        queue.shift(); // [_, 2, 3]
        queue.push(4); // [4, 2, 3]
        queue.shift(); // [4, _, 3]
        expect(queue.shift()).toBe(3); // [4, _, _]
        expect(queue.size).toBe(1);
      });

      it("correctly shifts elements in a queue that has been resized", () => {
        const queue = new cls(2);
        queue.push(1, 2); // [1, 2]
        queue.capacity = 4; // [1, 2, _, _]
        queue.push(3, 4); // [1, 2, 3, 4]
        queue.shift(); // [_, 2, 3, 4]
        expect(queue.shift()).toBe(2); // [_, _, 3, 4]
        expect(queue.size).toBe(2);
      });
    });

    describe("values()", () => {
      it("returns an empty iterator for an empty queue", () => {
        const queue = new cls();
        const values = Array.from(queue.values());
        expect(values).toEqual([]);
      });

      it("returns correct values for a partially filled queue", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3);
        const values = Array.from(queue.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for a full queue", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        const values = Array.from(queue.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns no values after clearing the queue", () => {
        const queue = new cls([1, 2, 3]);
        queue.clear();
        expect(Array.from(queue.values())).toEqual([]);
      });

      it("maintains correct order of values after multiple shifts", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3, 4, 5);
        queue.shift(); // [2, 3, 4, 5]
        queue.shift(); // [3, 4, 5]
        const values = Array.from(queue.values());
        expect(values).toEqual([3, 4, 5]);
      });

      it("returns correct values for a queue that has wrapped around", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.push(4); // [2, 3, 4]
        queue.push(5); // [3, 4, 5]
        const values = Array.from(queue.values());
        expect(values).toEqual([3, 4, 5]);
      });

      it("returns correct values after the queue has been cleared and refilled", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.clear();
        queue.push(4, 5); // [4, 5]
        const values = Array.from(queue.values());
        expect(values).toEqual([4, 5]);
      });

      it("iterates through values correctly even after increasing capacity", () => {
        const queue = new cls(2);
        queue.push(1, 2);
        queue.capacity = 4;
        expect(Array.from(queue.values())).toEqual([1, 2]);
        queue.push(3, 4);
        expect(Array.from(queue.values())).toEqual([1, 2, 3, 4]);
      });

      it("iterates through values correctly even after decreasing capacity", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3, 4, 5);
        queue.capacity = 3;
        expect(Array.from(queue.values())).toEqual([3, 4, 5]);
        queue.push(6, 7);
        expect(Array.from(queue.values())).toEqual([5, 6, 7]);
      });
    });

    describe("[Symbol.iterator]()", () => {
      it("returns an empty iterator for an empty queue", () => {
        const queue = new cls();
        const values = Array.from(queue);
        expect(values).toEqual([]);
      });

      it("returns correct values for a partially filled queue", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3);
        const values = Array.from(queue);
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for a full queue", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        const values = Array.from(queue);
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns no values after clearing the queue", () => {
        const queue = new cls([1, 2, 3]);
        queue.clear();
        const values = Array.from(queue);
        expect(values).toEqual([]);
      });

      it("maintains correct order of values after multiple shifts", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3, 4, 5);
        queue.shift(); // [2, 3, 4, 5]
        queue.shift(); // [3, 4, 5]
        const values = Array.from(queue);
        expect(values).toEqual([3, 4, 5]);
      });

      it("returns correct values for a queue that has wrapped around", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.push(4); // [2, 3, 4]
        queue.push(5); // [3, 4, 5]
        const values = Array.from(queue);
        expect(values).toEqual([3, 4, 5]);
      });

      it("returns correct values after the queue has been cleared and refilled", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.clear();
        queue.push(4, 5); // [4, 5]
        const values = Array.from(queue);
        expect(values).toEqual([4, 5]);
      });

      it("iterates through values correctly even after increasing capacity", () => {
        const queue = new cls(2);
        queue.push(1, 2);
        queue.capacity = 4;
        expect(Array.from(queue)).toEqual([1, 2]);
        queue.push(3, 4);
        expect(Array.from(queue)).toEqual([1, 2, 3, 4]);
      });

      it("iterates through values correctly even after decreasing capacity", () => {
        const queue = new cls(5);
        queue.push(1, 2, 3, 4, 5);
        queue.capacity = 3;
        expect(Array.from(queue)).toEqual([3, 4, 5]);
        queue.push(6, 7);
        expect(Array.from(queue)).toEqual([5, 6, 7]);
      });
    });
  });
}
