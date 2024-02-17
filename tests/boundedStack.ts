import { describe, expect, it, vi } from "vitest";

import { Bounded } from "../src/types/bounded";
import { BoundedEvent } from "../src/types/boundedEvent";
import { Constructor } from "../src/types/constructor";
import { Stack } from "../src/types/stack";

type BoundedStack<T> = Stack<T> & Bounded<T>;

export function test(cls: Constructor<BoundedStack<unknown>>) {
  describe(`${cls.name} | BoundedStack`, () => {
    describe("constructor()", () => {
      it("accepts an element", () => {
        const stack = new cls([1]);
        expect(stack.capacity).toBe(1);
        expect(stack.size).toBe(1);
        expect(Array.from(stack.values())).toEqual([1]);
      });

      it("does not directly use input array", () => {
        const arr = [1];
        const stack = new cls(arr);
        arr[0] = 2;
        arr.push(3);
        expect(stack.size).toEqual(1);
        expect(stack.capacity).toEqual(1);
        expect(Array.from(stack.values())).toEqual([1]);
      });

      it("accepts multiple elements", () => {
        const stack = new cls([1, 2, 3]);
        expect(stack.capacity).toBe(3);
        expect(stack.size).toBe(3);
        expect(Array.from(stack.values())).toEqual([1, 2, 3]);
      });

      it("accepts repeated values", () => {
        const stack = new cls([1, 1, 1, 1, 1]);
        expect(stack.capacity).toBe(5);
        expect(stack.size).toBe(5);
        expect(Array.from(stack.values())).toEqual([1, 1, 1, 1, 1]);
      });

      it("handles complex data types", () => {
        const stack = new cls([{ a: 1 }, { b: 2 }]);
        expect(stack.size).toBe(2);
        expect(stack.capacity).toBe(2);
        expect(Array.from(stack.values())).toEqual([{ a: 1 }, { b: 2 }]);
      });

      it("accepts an iterable", () => {
        const stack = new cls(new Set([1, 2, 3]));
        expect(stack.size).toBe(3);
        expect(stack.capacity).toBe(3);
        expect(Array.from(stack.values())).toEqual([1, 2, 3]);
      });
    });

    describe("capacity", () => {
      // Capacity increase

      it("growth retains element order", () => {
        const stack = new cls([1, 2, 3]);
        stack.capacity = 5;
        expect(stack.capacity).toBe(5);
        expect(stack.size).toBe(3);
        expect(Array.from(stack.values())).toEqual([1, 2, 3]);
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

                // Create initial stack
                const stack = new cls(ordered);

                // Rotate
                for (let i = 0; i < rot; ++i) {
                  ordered.shift();
                  ordered.push(i + startCap);
                  stack.push(i + startCap);
                }

                // Pop
                for (let i = 0; i < pop; ++i) {
                  ordered.pop();
                  stack.pop();
                }

                // Update capacity
                stack.capacity = endCap;
                expect(Array.from(stack.values())).toEqual(ordered);
              }
            }
          }
        }
      });

      // Capacity decrease

      it("handles shrink to zero capacity", () => {
        const stack = new cls([1, 2, 3]);
        stack.capacity = 0;
        expect(stack.capacity).toBe(0);
        expect(stack.size).toBe(0);
        expect(Array.from(stack.values())).toEqual([]);
      });

      it("shrink retains element order", () => {
        const stack = new cls(10);
        stack.push(1, 2, 3);
        stack.capacity = 5;
        expect(stack.capacity).toBe(5);
        expect(stack.size).toBe(3);
        expect(Array.from(stack.values())).toEqual([1, 2, 3]);
      });

      it("discards elements when shrinking to a smaller capacity than size", () => {
        const stack = new cls([1, 2, 3, 4, 5]);
        stack.capacity = 3;
        expect(stack.capacity).toBe(3);
        expect(Array.from(stack.values())).toEqual([3, 4, 5]);
      });

      it("correctly repopulates after shrink to zero capacity", () => {
        const stack = new cls([1, 2, 3, 4, 5]);
        stack.capacity = 0;
        stack.capacity = 3;
        stack.push(6);
        expect(stack.capacity).toBe(3);
        expect(stack.size).toBe(1);
        expect(Array.from(stack.values())).toEqual([6]);
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

                // Create initial stack
                const stack = new cls(ordered);

                // Rotate
                for (let i = 0; i < rot; ++i) {
                  ordered.shift();
                  ordered.push(i + startCap);
                  stack.push(i + startCap);
                }

                // Pop
                for (let i = 0; i < pop; ++i) {
                  ordered.pop();
                  stack.pop();
                }

                // Update capacity
                stack.capacity = endCap;
                ordered = ordered.slice(Math.max(0, ordered.length - endCap));
                expect(Array.from(stack.values())).toEqual(ordered);
              }
            }
          }
        }
      });
    });

    describe("clear()", () => {
      it("clears a default stack correctly", () => {
        const stack = new cls();
        stack.clear();
        expect(stack.size).toBe(0);
        expect(stack.capacity).toBe(Infinity);
        expect([...stack]).toEqual([]);
      });

      it("clears a zero capacity stack correctly", () => {
        const stack = new cls(0);
        stack.clear();
        expect(stack.size).toBe(0);
        expect(stack.capacity).toBe(0);
        expect([...stack]).toEqual([]);
      });

      it("clears an unused stack correctly", () => {
        const stack = new cls(10);
        stack.clear();
        expect(stack.size).toBe(0);
        expect(stack.capacity).toBe(10);
        expect([...stack]).toEqual([]);
      });

      it("clears a filled stack correctly", () => {
        const stack = new cls([1, 2, 3, 4, 5]);
        expect(stack.size).toBe(5);
        stack.clear();
        expect(stack.size).toBe(0);
        expect(stack.capacity).toBe(5);
        expect([...stack]).toEqual([]);
      });

      it("allows adding elements after clearing", () => {
        const stack = new cls([1, 2, 3]);
        stack.clear();
        expect(stack.size).toBe(0);
        expect(stack.capacity).toBe(3);
        expect(Array.from(stack.values())).toEqual([]);
        stack.push(4);
        expect(stack.size).toBe(1);
        expect(Array.from(stack.values())).toEqual([4]);
      });

      it("allows adding elements after clearing 2", () => {
        const stack = new cls([1, 2, 3]);
        stack.push(4, 5);
        stack.clear();
        expect(stack.size).toBe(0);
        expect(stack.capacity).toBe(3);
        expect(Array.from(stack.values())).toEqual([]);
        stack.push(6);
        expect(stack.size).toBe(1);
        expect(Array.from(stack.values())).toEqual([6]);
        stack.push(7, 8);
        expect(stack.size).toBe(3);
        expect(Array.from(stack.values())).toEqual([6, 7, 8]);
      });

      it("Can be called repeatedly", () => {
        const stack = new cls([1, 2, 3, 4, 5]);
        expect(stack.size).toBe(5);
        stack.clear();
        expect(stack.size).toBe(0);
        stack.clear();
        expect(stack.size).toBe(0);
        stack.clear();
        expect(stack.size).toBe(0);
        expect(stack.capacity).toBe(5);
        expect(Array.from(stack.values())).toEqual([]);
      });
    });

    describe("entries()", () => {
      it("returns no entries for an empty stack", () => {
        const stack = new cls();
        const entries = Array.from(stack.entries());
        expect(entries.length).toBe(0);
      });

      it("returns correct entries for a partially filled stack", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3);
        const entries = Array.from(stack.entries());
        expect(entries).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("returns correct entries for a full stack", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        const entries = Array.from(stack.entries());
        expect(entries).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("returns correct entries after removing an element", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.pop();
        expect(Array.from(stack.entries())).toEqual([
          [0, 1],
          [1, 2],
        ]);
      });

      it("returns correct entries for a stack that has wrapped around", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.push(4);
        expect(Array.from(stack.entries())).toEqual([
          [0, 2],
          [1, 3],
          [2, 4],
        ]);
        stack.push(5);
        expect(Array.from(stack.entries())).toEqual([
          [0, 3],
          [1, 4],
          [2, 5],
        ]);
        stack.push(6);
        expect(Array.from(stack.entries())).toEqual([
          [0, 4],
          [1, 5],
          [2, 6],
        ]);
        stack.push(7);
        expect(Array.from(stack.entries())).toEqual([
          [0, 5],
          [1, 6],
          [2, 7],
        ]);
      });

      it("returns correct entries after capacity increase", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.capacity = 5;
        expect(Array.from(stack.entries())).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
        stack.push(4, 5);
        expect(Array.from(stack.entries())).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 5],
        ]);
        stack.push(6, 7);
        expect(Array.from(stack.entries())).toEqual([
          [0, 3],
          [1, 4],
          [2, 5],
          [3, 6],
          [4, 7],
        ]);
      });

      it("returns correct entries after capacity decrease", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3, 4, 5);
        stack.capacity = 3;
        expect(Array.from(stack.entries())).toEqual([
          [0, 3],
          [1, 4],
          [2, 5],
        ]);
        stack.push(6, 7);
        expect(Array.from(stack.entries())).toEqual([
          [0, 5],
          [1, 6],
          [2, 7],
        ]);
      });
    });

    describe("forEach()", () => {
      it("does not call the callback for an empty stack", () => {
        const stack = new cls();
        const mockCallback = vi.fn();
        stack.forEach(mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
      });

      it("calls the callback for each element in a partially filled stack", () => {
        const stack = new cls(5); // Assuming a capacity of 5
        stack.push(1, 2, 3); // Adding three elements
        const mockCallback = vi.fn();
        stack.forEach(mockCallback);
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, stack);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, stack);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 2, stack);
      });

      it("uses the provided thisArg for the callback", () => {
        const stack = new cls([1, 2, 3]);
        const context = { multiplier: 2 };
        const mockCallback = vi.fn(function (this: typeof context, value) {
          return value * this.multiplier;
        });
        stack.forEach(mockCallback, context);
        expect(mockCallback.mock.instances[0]).toBe(context);
      });

      it("correctly handles callback logic for a full stack", () => {
        const stack = new cls(3) as BoundedStack<number>;
        stack.push(1, 2, 3);
        const results: number[] = [];
        stack.forEach(value => {
          results.push(value * 2);
        });
        expect(results).toEqual([2, 4, 6]);
      });

      it("works correctly after removing and adding elements", () => {
        const stack = new cls(3) as BoundedStack<number>;
        stack.push(1, 2, 3);
        stack.pop();
        stack.push(4);
        const results: number[] = [];
        stack.forEach(value => results.push(value + 1));
        expect(results).toEqual([2, 3, 5]);
      });

      it("maintains the correct order of elements", () => {
        const stack = new cls(3) as BoundedStack<number>;
        stack.push(3, 2, 1);
        stack.pop();
        stack.push(4);
        const results: number[] = [];
        stack.forEach(value => results.push(value));
        expect(results).toEqual([3, 2, 4]);
      });

      it("provides the correct index and stack reference to the callback", () => {
        const stack = new cls(3);
        stack.push(10, 20, 30);
        const mockCallback = vi.fn();
        stack.forEach(mockCallback);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 10, 0, stack);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 20, 1, stack);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 30, 2, stack);
      });
    });

    describe("has()", () => {
      it("returns false for any element when the stack is empty", () => {
        const stack = new cls(3);
        expect(stack.has(1)).toBe(false);
      });

      it("returns true for an element present in the stack", () => {
        const stack = new cls([1, 2, 3]);
        expect(stack.has(2)).toBe(true);
      });

      it("returns false for an element not present in the stack", () => {
        const stack = new cls([1, 2, 3]);
        expect(stack.has(4)).toBe(false);
      });

      it("handles primitive data types correctly", () => {
        const stack = new cls([1, "b", 3n, true, false]);
        expect(stack.has(1)).toBe(true);
        expect(stack.has("b")).toBe(true);
        expect(stack.has(3n)).toBe(true);
        expect(stack.has(true)).toBe(true);
        expect(stack.has(false)).toBe(true);
      });

      it("accurately identifies repeated and similar values", () => {
        const stack = new cls([1, 2, 2, 3, 1]);
        expect(stack.has(2)).toBe(true);
        expect(stack.has(4)).toBe(false);
      });

      it("returns false for any element after clearing the stack", () => {
        const stack = new cls([1, 2, 3]);
        stack.clear();
        expect(stack.has(1)).toBe(false);
        expect(stack.has(2)).toBe(false);
        expect(stack.has(3)).toBe(false);
      });

      it("handles non-primitive data types correctly", () => {
        const value = { key: "value" };
        const stack = new cls([3, value]);
        expect(stack.has(value)).toBe(true);
        expect(stack.has({ key: "value" })).toBe(false);
      });

      it("reflects changes after additions and removals", () => {
        const stack = new cls(3);
        stack.push(1, 2);
        expect(stack.has(2)).toBe(true);
        stack.pop();
        expect(stack.has(2)).toBe(false);
      });

      it("reflects changes after overflow", () => {
        const stack = new cls([1, 2, 3]);
        stack.push(4, 5);
        expect(stack.has(1)).toBe(false);
        expect(stack.has(2)).toBe(false);
        expect(stack.has(3)).toBe(true);
        expect(stack.has(4)).toBe(true);
        expect(stack.has(5)).toBe(true);
      });
    });

    describe("keys()", () => {
      it("returns an empty iterator for an empty stack", () => {
        const stack = new cls();
        const keys = Array.from(stack.keys());
        expect(keys).toEqual([]);
      });

      it("returns correct keys for a partially filled stack", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3);
        const keys = Array.from(stack.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("returns correct keys for a full stack", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        const keys = Array.from(stack.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("returns no keys after clearing the stack", () => {
        const stack = new cls([1, 2, 3]);
        stack.clear();
        expect(Array.from(stack.keys())).toEqual([]);
      });

      it("returns sequential keys for a stack that has wrapped around", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.pop();
        stack.push(4);
        stack.push(5);
        const keys = Array.from(stack.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("updates keys correctly after removing elements", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.pop();
        stack.push(4);
        const keys = Array.from(stack.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("updates keys correctly after removing all elements", () => {
        const stack = new cls(2);
        stack.push(1, 2);
        stack.pop();
        stack.pop();
        expect(Array.from(stack.keys())).toEqual([]);
        stack.pop();
        expect(Array.from(stack.keys())).toEqual([]);
      });

      it("returns correct keys after the stack has been cleared and refilled", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.clear();
        stack.push(4, 5);
        const keys = Array.from(stack.keys());
        expect(keys).toEqual([0, 1]);
      });
    });

    describe("last()", () => {
      it("returns undefined for an empty stack", () => {
        const stack = new cls();
        expect(stack.last()).toBeUndefined();
      });

      it("returns the last element for a partially filled stack", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3);
        expect(stack.last()).toBe(3);
      });

      it("returns the last element for a full stack", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        expect(stack.last()).toBe(3);
      });

      it("maintains the last element after removing and adding elements", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.pop();
        expect(stack.last()).toBe(2);
        stack.push(4);
        expect(stack.last()).toBe(4);
      });

      it("updates the last element correctly after multiple pops", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        expect(stack.last()).toBe(3);
        stack.pop();
        expect(stack.last()).toBe(2);
        stack.pop();
        expect(stack.last()).toBe(1);
        stack.pop();
        expect(stack.last()).toBeUndefined();
      });

      it("returns the correct last element for a stack that has wrapped around", () => {
        const stack = new cls(4);
        stack.push(1, 2, 3); // [1, 2, 3, _]
        expect(stack.last()).toBe(3);
        stack.push(4); // [1, 2, 3, 4]
        expect(stack.last()).toBe(4);
        stack.push(5); // [2, 3, 4, 5]
        expect(stack.last()).toBe(5);
        stack.push(6); // [3, 4, 5, 6]
        expect(stack.last()).toBe(6);
        stack.push(7); // [4, 5, 6, 7]
        expect(stack.last()).toBe(7);
      });

      it("returns undefined after clearing the stack", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.clear();
        expect(stack.last()).toBeUndefined();
      });

      it("returns the correct last element after increasing capacity", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.capacity = 5;
        expect(stack.last()).toBe(3);
      });

      it("returns the correct last element after decreasing capacity", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3, 4, 5);
        stack.capacity = 3;
        expect(stack.last()).toBe(5);
      });
    });

    describe("pop()", () => {
      it("returns undefined from an empty stack", () => {
        const stack = new cls();
        expect(stack.pop()).toBeUndefined();
      });

      it("removes and returns the last element from a partially filled stack", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3);
        expect(stack.pop()).toBe(3);
        expect(stack.size).toBe(2);
      });

      it("correctly updates the tail after poping", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.pop();
        expect(stack.pop()).toBe(2);
        expect(stack.size).toBe(1);
      });

      it("maintains correct order after multiple pops", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3, 4, 5);
        stack.pop(); // [1, 2, 3, 4]
        stack.pop(); // [1, 2, 3]
        expect(stack.pop()).toBe(3);
        expect(stack.size).toBe(2);
      });

      it("handles pop operations in a full stack correctly", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.pop(); // [1, 2]
        stack.push(4); // [1, 2, 4]
        expect(stack.pop()).toBe(4);
        expect(stack.size).toBe(2);
        expect(stack.pop()).toBe(2);
        expect(stack.size).toBe(1);
      });

      it("returns undefined after poping all elements", () => {
        const stack = new cls(3);
        stack.push(1, 2); // [1, 2]
        stack.pop(); // [1]
        stack.pop(); // []
        expect(stack.pop()).toBeUndefined();
        expect(stack.size).toBe(0);
      });

      it("maintains circular behavior after wrapping around", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3); // [1, 2, 3]
        stack.push(4); // [4, 2, 3]
        stack.pop(); // [_, 2, 3]
        expect(stack.pop()).toBe(3); // [_, 2, _]
        expect(stack.size).toBe(1);
      });

      it("correctly pops elements in a stack that has been resized", () => {
        const stack = new cls(2);
        stack.push(1, 2); // [1, 2]
        stack.capacity = 4; // [1, 2, _, _]
        stack.push(3, 4); // [1, 2, 3, 4]
        expect(stack.pop()).toBe(4); // [1, 2, 3, _]
        expect(stack.pop()).toBe(3); // [1, 2, _, _]
        expect(stack.size).toBe(2);
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

      it("adds an element to an empty stack", () => {
        const stack = new cls(5);
        expect(stack.push(1)).toEqual(1);
        expect(stack.size).toBe(1);
        expect(stack.capacity).toBe(5);
        expect(Array.from(stack.values())).toEqual([1]);
      });

      it("adds multiple elements to an empty stack", () => {
        const stack = new cls(5);
        expect(stack.push(1, 2, 3)).toEqual(3);
        expect(stack.size).toBe(3);
        expect(stack.capacity).toBe(5);
        expect(Array.from(stack.values())).toEqual([1, 2, 3]);
      });

      it("adds multiple elements to a partially filled stack", () => {
        const stack = new cls(5);
        expect(stack.push(1, 2)).toEqual(2);
        expect(stack.size).toBe(2);
        expect(Array.from(stack.values())).toEqual([1, 2]);
        expect(stack.push(3, 4)).toEqual(4);
        expect(stack.size).toBe(4);
        expect(Array.from(stack.values())).toEqual([1, 2, 3, 4]);
      });

      it("maintains stack capacity when adding more elements than capacity", () => {
        const stack = new cls(5);
        expect(stack.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(stack.size).toBe(5);
        expect(Array.from(stack.values())).toEqual([1, 2, 3, 4, 5]);
        expect(stack.push(6)).toEqual(5);
        expect(stack.size).toBe(5);
        expect(Array.from(stack.values())).toEqual([2, 3, 4, 5, 6]);
      });

      it("removes the oldest elements when exceeding capacity", () => {
        const stack = new cls(5);
        expect(stack.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(stack.push(6, 7)).toEqual(5);
        expect(stack.size).toBe(5);
        expect(Array.from(stack.values())).toEqual([3, 4, 5, 6, 7]);
      });

      it("correctly handles adding elements when stack is full", () => {
        const stack = new cls(5);
        expect(stack.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(stack.push(6, 7, 8)).toEqual(5);
        expect(stack.size).toBe(5);
        expect(Array.from(stack.values())).toEqual([4, 5, 6, 7, 8]);
      });

      it("correct handles adding more elements than capacity", () => {
        const stack = new cls(2);
        expect(stack.push(1, 2, 3)).toEqual(2);
        expect(stack.size).toBe(2);
        expect(Array.from(stack.values())).toEqual([2, 3]);
        stack.clear();
        expect(stack.push(1, 2, 3, 4, 5, 6, 7, 8, 9)).toEqual(2);
        expect(stack.size).toBe(2);
        expect(Array.from(stack.values())).toEqual([8, 9]);
      });

      it("handles pushing elements into a stack of capacity 0", () => {
        const smallstack = new cls(0);
        expect(smallstack.push(1)).toBe(0);
        expect(smallstack.size).toBe(0);
        expect(Array.from(smallstack.values())).toEqual([]);
        expect(smallstack.push(2)).toBe(0);
        expect(smallstack.size).toBe(0);
        expect(Array.from(smallstack.values())).toEqual([]);
      });

      it("handles pushing elements into a stack of capacity 1", () => {
        const smallstack = new cls(1);
        expect(smallstack.push(1)).toBe(1);
        expect(smallstack.size).toBe(1);
        expect(Array.from(smallstack.values())).toEqual([1]);
        expect(smallstack.push(2)).toBe(1);
        expect(smallstack.size).toBe(1);
        expect(Array.from(smallstack.values())).toEqual([2]);
      });

      it("correctly updates the stack when pushing elements after increasing capacity", () => {
        const stack = new cls(5);
        stack.capacity = 3;
        expect(stack.push(1, 2, 3, 4)).toBe(3);
        expect(stack.size).toBe(3);
        expect(Array.from(stack.values())).toEqual([2, 3, 4]);
      });

      it("correctly updates the stack when pushing elements after decreasing capacity", () => {
        const stack = new cls(2);
        stack.capacity = 5;
        expect(stack.push(1, 2, 3, 4)).toBe(4);
        expect(stack.size).toBe(4);
        expect(Array.from(stack.values())).toEqual([1, 2, 3, 4]);
      });

      it("does not discard items when adding within capacity", async () => {
        const stack = new cls(3);
        const onItemEvicted = vi.fn();

        stack.on(BoundedEvent.Overflow, onItemEvicted);
        stack.push(1, 2);
        stack.push(3);

        await new Promise<void>(done => {
          setImmediate(() => {
            expect(onItemEvicted).not.toHaveBeenCalled();
            done();
          });
        });
      });

      it(`emits '${BoundedEvent.Overflow}' event with the discarded item when capacity is exceeded`, async () => {
        const stack = new cls(3);
        const onItemEvicted = vi.fn();

        stack.on(BoundedEvent.Overflow, onItemEvicted);
        stack.push(1, 2, 3); // Fill the stack to its capacity
        stack.push(4); // Should trigger the eviction of 1

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
        const stack = new cls(3);
        const evicted: number[] = [];
        const onItemEvicted = vi.fn(items => evicted.push(...items));

        stack.on(BoundedEvent.Overflow, onItemEvicted);
        stack.push(1, 2, 3); // Fill the stack to its capacity
        stack.push(4, 5, 6); // Pushing 3 items, should trigger eviction of 1, 2, 3

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
        const stack = new cls(3);
        const evicted: number[] = [];
        const onItemEvicted = vi.fn(items => evicted.push(...items));

        stack.on(BoundedEvent.Overflow, onItemEvicted);
        stack.push(1, 2, 3); // Fill the stack to its capacity
        stack.push(4, 5, 6); // Pushing 3 items, should trigger eviction of 1, 2, 3

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

    describe("top()", () => {
      it("returns undefined for an empty stack", () => {
        const stack = new cls();
        expect(stack.top()).toBeUndefined();
      });

      it("returns the last element for a partially filled stack", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3);
        expect(stack.top()).toBe(3);
      });

      it("returns the last element for a full stack", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        expect(stack.top()).toBe(3);
      });

      it("maintains the last element after removing and adding elements", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.pop();
        expect(stack.top()).toBe(2);
        stack.push(4);
        expect(stack.top()).toBe(4);
      });

      it("updates the last element correctly after multiple pops", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        expect(stack.top()).toBe(3);
        stack.pop();
        expect(stack.top()).toBe(2);
        stack.pop();
        expect(stack.top()).toBe(1);
        stack.pop();
        expect(stack.top()).toBeUndefined();
      });

      it("returns the correct last element for a stack that has wrapped around", () => {
        const stack = new cls(4);
        stack.push(1, 2, 3); // [1, 2, 3, _]
        expect(stack.top()).toBe(3);
        stack.push(4); // [1, 2, 3, 4]
        expect(stack.top()).toBe(4);
        stack.push(5); // [2, 3, 4, 5]
        expect(stack.top()).toBe(5);
        stack.push(6); // [3, 4, 5, 6]
        expect(stack.top()).toBe(6);
        stack.push(7); // [4, 5, 6, 7]
        expect(stack.top()).toBe(7);
      });

      it("returns undefined after clearing the stack", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.clear();
        expect(stack.top()).toBeUndefined();
      });

      it("returns the correct last element after increasing capacity", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.capacity = 5;
        expect(stack.top()).toBe(3);
      });

      it("returns the correct last element after decreasing capacity", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3, 4, 5);
        stack.capacity = 3;
        expect(stack.top()).toBe(5);
      });
    });

    describe("values()", () => {
      it("returns an empty iterator for an empty stack", () => {
        const stack = new cls();
        const values = Array.from(stack.values());
        expect(values).toEqual([]);
      });

      it("returns correct values for a partially filled stack", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3);
        const values = Array.from(stack.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for a full stack", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        const values = Array.from(stack.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns no values after clearing the stack", () => {
        const stack = new cls([1, 2, 3]);
        stack.clear();
        expect(Array.from(stack.values())).toEqual([]);
      });

      it("maintains correct order of values after multiple pops", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3, 4, 5);
        stack.pop(); // [1, 2, 3, 4]
        stack.pop(); // [1, 2, 3]
        const values = Array.from(stack.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for a stack that has wrapped around", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.push(4); // [2, 3, 4]
        stack.push(5); // [3, 4, 5]
        const values = Array.from(stack.values());
        expect(values).toEqual([3, 4, 5]);
      });

      it("returns correct values after the stack has been cleared and refilled", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.clear();
        stack.push(4, 5); // [4, 5]
        const values = Array.from(stack.values());
        expect(values).toEqual([4, 5]);
      });

      it("iterates through values correctly even after increasing capacity", () => {
        const stack = new cls(2);
        stack.push(1, 2);
        stack.capacity = 4;
        expect(Array.from(stack.values())).toEqual([1, 2]);
        stack.push(3, 4);
        expect(Array.from(stack.values())).toEqual([1, 2, 3, 4]);
      });

      it("iterates through values correctly even after decreasing capacity", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3, 4, 5);
        stack.capacity = 3;
        expect(Array.from(stack.values())).toEqual([3, 4, 5]);
        stack.push(6, 7);
        expect(Array.from(stack.values())).toEqual([5, 6, 7]);
      });
    });

    describe("[Symbol.iterator]()", () => {
      it("returns an empty iterator for an empty stack", () => {
        const stack = new cls();
        const values = Array.from(stack);
        expect(values).toEqual([]);
      });

      it("returns correct values for a partially filled stack", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3);
        const values = Array.from(stack);
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for a full stack", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        const values = Array.from(stack);
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns no values after clearing the stack", () => {
        const stack = new cls([1, 2, 3]);
        stack.clear();
        const values = Array.from(stack);
        expect(values).toEqual([]);
      });

      it("maintains correct order of values after multiple pops", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3, 4, 5);
        stack.pop(); // [1, 2, 3, 4]
        stack.pop(); // [1, 2, 3]
        const values = Array.from(stack);
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for a stack that has wrapped around", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.push(4); // [2, 3, 4]
        stack.push(5); // [3, 4, 5]
        const values = Array.from(stack);
        expect(values).toEqual([3, 4, 5]);
      });

      it("returns correct values after the stack has been cleared and refilled", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3);
        stack.clear();
        stack.push(4, 5); // [4, 5]
        const values = Array.from(stack);
        expect(values).toEqual([4, 5]);
      });

      it("iterates through values correctly even after increasing capacity", () => {
        const stack = new cls(2);
        stack.push(1, 2);
        stack.capacity = 4;
        expect(Array.from(stack)).toEqual([1, 2]);
        stack.push(3, 4);
        expect(Array.from(stack)).toEqual([1, 2, 3, 4]);
      });

      it("iterates through values correctly even after decreasing capacity", () => {
        const stack = new cls(5);
        stack.push(1, 2, 3, 4, 5);
        stack.capacity = 3;
        expect(Array.from(stack)).toEqual([3, 4, 5]);
        stack.push(6, 7);
        expect(Array.from(stack)).toEqual([5, 6, 7]);
      });
    });
  });
}
