import { describe, expect, it, vi } from "vitest";

import { Stack } from "../types/stack";
import { Constructor } from "../utils/mixins";
import { tests as collectionTests } from "./indexedCollectionTests";

export const tests: {
  [key: string]: (ctor: Constructor<Stack<unknown>>) => void;
} = Object.assign({}, collectionTests, {
  stack: test,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function test(ctor: Constructor<Stack<any>>): void {
  function gen<T>(...args: unknown[]): Stack<T> {
    return new ctor(...args);
  }

  describe(ctor.name, () => {
    describe("capacity", () => {
      // Capacity increase

      it("grows and maintains element order", () => {
        const stack = gen<number>(1, 2);
        stack.capacity = 4;
        stack.push(3);
        expect([...stack.values()]).toEqual([1, 2, 3]);
      });

      it("maintains element order when full, rotated and greatly grown", () => {
        const stack = gen<number>(1, 2, 3);
        stack.push(4, 5);
        stack.capacity = 10;
        stack.push(6);
        expect([...stack.values()]).toEqual([3, 4, 5, 6]);
      });

      it("maintains element order when full, rotated and slightly grown", () => {
        const stack = gen<number>(1, 2, 3, 4, 5);
        stack.push(6, 7);
        stack.capacity = 6;
        stack.push(8);
        expect([...stack.values()]).toEqual([3, 4, 5, 6, 7, 8]);
      });

      it("maintains element order when not full, rotated and greatly grown", () => {
        const stack = gen<number>(1, 2, 3);
        stack.push(4, 5);
        stack.pop();
        stack.capacity = 10;
        stack.push(6);
        expect([...stack.values()]).toEqual([3, 4, 6]);
      });

      it("maintains element order when not full, rotated and slightly grown", () => {
        const stack = gen<number>(1, 2, 3, 4, 5);
        stack.push(6, 7, 8);
        stack.pop();
        stack.pop();
        stack.capacity = 6;
        stack.push(9);
        expect([...stack.values()]).toEqual([4, 5, 6, 9]);
      });

      // Capacity decrease

      it("shrinks to a smaller capacity and retains elements", () => {
        const stack = gen<number>(1, 2, 3);
        stack.push(1, 2, 3);
        stack.capacity = 4;
        expect(stack.capacity).toBe(4);
        expect([...stack.values()]).toEqual([1, 2, 3]);
      });

      it("shrink to zero capacity", () => {
        const stack = gen<number>(5);
        stack.push(1, 2, 3);
        stack.capacity = 0;
        expect(stack.capacity).toBe(0);
        expect(stack.size).toBe(0);
        expect([...stack.values()]).toEqual([]);
      });

      it("repopulate after shrink to zero capacity", () => {
        const stack = gen<number>(3);
        stack.push(1, 2, 3, 4, 5);
        stack.capacity = 0;
        stack.capacity = 3;
        stack.push(6);
        expect(stack.capacity).toBe(3);
        expect(stack.size).toBe(1);
        expect([...stack.values()]).toEqual([6]);
      });

      it("shrink correctly when slightly rotated", () => {
        const stack = gen<number>(1, 2, 3, 4, 5);
        stack.push(6);
        stack.capacity = 3;
        expect(stack.capacity).toBe(3);
        expect(stack.size).toBe(3);
        expect([...stack.values()]).toEqual([4, 5, 6]);
        stack.push(10);
        expect(stack.capacity).toBe(3);
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
        const stack = gen<number>(1, 2, 3);
        stack.clear();
        expect(stack.size).toBe(0);
        expect(stack.capacity).toBe(3);
        expect([...stack.values()]).toEqual([]);
        stack.push(4);
        expect(stack.size).toBe(1);
        expect([...stack.values()]).toEqual([4]);
      });
    });

    describe("entries()", () => {
      it("returns an empty iterable for an empty stack", () => {
        const stack = gen<number>(3);
        expect([...stack.entries()]).toEqual([]);
      });

      it("returns all key-value pairs for a non-empty stack", () => {
        const stack = gen<number>(1, 2, 3);
        expect([...stack.entries()]).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("maintains correct order of entries", () => {
        const stack = gen<number>(1, 2, 3);
        stack.push(4);
        expect([...stack.entries()]).toEqual([
          [0, 2],
          [1, 3],
          [2, 4],
        ]);
      });

      it("should skip empty indices", () => {
        const stack = gen<number>(10);
        stack.push(1, 2, 3);
        expect([...stack.entries()]).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("reflects changes after modifications", () => {
        const stack = gen<number>(1, 2, 3);
        stack.pop();
        stack.push(4);
        expect([...stack.entries()]).toEqual([
          [0, 1],
          [1, 2],
          [2, 4],
        ]);
      });

      it("validates key-value pairs", () => {
        const stack = gen<number>(1, 2, 3);
        for (const [key, value] of stack.entries()) {
          expect(key + 1).toBe(value);
        }
      });
    });

    describe("forEach()", () => {
      it("provides correct arguments to the callback function", () => {
        const stack = gen<number>(1, 2, 3);
        const mockCallback = vi.fn();
        stack.forEach(mockCallback);
        expect(mockCallback.mock.calls[0][0]).toBe(1); // First element's value
        expect(mockCallback.mock.calls[0][1]).toBe(0); // First element's index
        expect(mockCallback.mock.calls[0][2]).toBe(stack); // stack reference
      });

      it("should execute the callback for each element", () => {
        const stack = gen<number>(1, 2, 3);
        const mockCallback = vi.fn();
        stack.forEach(mockCallback);
        expect(mockCallback.mock.calls.length).toBe(3);
        expect(mockCallback.mock.calls[0][0]).toBe(1); // First element's value
        expect(mockCallback.mock.calls[1][0]).toBe(2); // Second element's value
        expect(mockCallback.mock.calls[2][0]).toBe(3); // Third element's value
      });

      it("handles removals to stack during iteration", () => {
        const stack = gen<number>(20);
        stack.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        const mockCallback = vi.fn((_value, _index, stack) => {
          stack.pop();
        });
        stack.forEach(mockCallback);
        // Check if the callback was called expected number of times
        expect(mockCallback.mock.calls.length).toBe(5);
        // Check if the stack was modified correctly
        expect(stack.size).toBe(5);
      });
    });

    describe("has()", () => {
      it("reflects changes after additions and removals", () => {
        const stack = gen<number>(3);
        stack.push(1, 2);
        expect(stack.has(2)).toBe(true);
        stack.pop();
        expect(stack.has(2)).toBe(false);
      });

      it("reflects changes after overriding", () => {
        const stack = gen<number>(1, 2, 3);
        stack.push(4, 5);
        expect(stack.has(1)).toBe(false);
        expect(stack.has(4)).toBe(true);
      });

      it("correctly identifies boundary elements", () => {
        const stack = gen<number>(1, 2, 3);
        stack.push(4);
        expect(stack.has(2)).toBe(true);
        expect(stack.has(4)).toBe(true);
      });
    });

    describe("keys()", () => {
      it("returns an empty iterable for an empty stack", () => {
        const stack = gen<number>(3);
        expect([...stack.keys()]).toEqual([]);
      });

      it("returns all indices for a non-empty stack", () => {
        const stack = gen<number>(1, 2, 3);
        expect([...stack.keys()]).toEqual([0, 1, 2]);
      });

      it("maintains correct order of keys", () => {
        const stack = gen<number>(1, 2, 3);
        stack.push(4);
        expect([...stack.keys()]).toEqual([0, 1, 2]);
      });

      it("should skip empty indices", () => {
        const stack = gen<number>(10);
        stack.push(1, 2, 3);
        expect([...stack.keys()]).toEqual([0, 1, 2]);
      });

      it("reflects changes in keys after modifications", () => {
        const stack = gen<number>(3);
        stack.push(1);
        stack.push(2);
        stack.pop();
        stack.push(3);
        expect([...stack.keys()]).toEqual([0, 1]);
      });

      it("returns no keys after clearing the stack", () => {
        const stack = gen<number>(1, 2, 3);
        stack.clear();
        expect([...stack.keys()]).toEqual([]);
      });

      it("maintains consistent keys after sequential operations", () => {
        const stack = gen<number>(5);
        stack.push(1, 2);
        stack.pop();
        stack.push(3, 4);
        stack.pop();
        expect([...stack.keys()]).toEqual([0, 1]);
      });
    });

    describe("last()", () => {
      it("returns the last element in a non-empty stack", () => {
        const stack = gen<number>(1, 2, 3);
        expect(stack.last()).toBe(3);
      });

      it("returns undefined for an empty stack", () => {
        const stack = gen<number>(3);
        expect(stack.last()).toBeUndefined();
      });

      it("does not modify the stack", () => {
        const stack = gen<number>(1, 2, 3);
        const initialSize = stack.size;
        stack.last();
        expect(stack.size).toBe(initialSize);
        expect([...stack.values()]).toEqual([1, 2, 3]);
      });

      it("reflects the correct last element after modifications", () => {
        const stack = gen<number>(3);
        stack.push(1);
        expect(stack.last()).toBe(1);
        stack.push(2);
        expect(stack.last()).toBe(2);
        stack.pop();
        expect(stack.last()).toBe(1);
      });
    });

    describe("pop()", () => {
      it("removes and returns the last element", () => {
        const stack = gen<number>(1, 2, 3);
        expect(stack.pop()).toBe(3);
        expect([...stack.values()]).toEqual([1, 2]);
      });

      it("returns undefined for an empty stack", () => {
        const stack = gen<number>(3);
        expect(stack.pop()).toBeUndefined();
      });

      it("updates size after pop", () => {
        const stack = gen<number>(1, 2, 3);
        stack.pop();
        expect(stack.size).toBe(2);
      });

      it("pops elements in the correct order", () => {
        const stack = gen<number>(1, 2, 3);
        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBeUndefined();
      });

      it("handles multiple pops correctly", () => {
        const stack = gen<number>(1, 2, 3);
        stack.pop();
        stack.pop();
        stack.pop();
        expect(stack.size).toBe(0);
        expect([...stack.values()]).toEqual([]);
      });
    });

    describe("push()", () => {
      it("should push elements into an empty stack", () => {
        const stack = gen<number>(3);
        stack.push(1, 2);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
        expect(stack.pop()).toBeUndefined();
      });

      it("should push elements into a non-full stack and return an empty stack", () => {
        const stack = gen<number>(5);
        stack.push(1, 2, 3);
        const overwritten = stack.push(4);
        expect(overwritten).toEqual([]);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBe(3);
        expect(stack.pop()).toBe(2);
        expect(stack.pop()).toBe(1);
      });

      it("should push elements into a full stack and return overwritten elements", () => {
        const stack = gen<number>(3);
        stack.push(1, 2, 3);
        const overwritten = stack.push(4, 5);
        expect(overwritten).toEqual([1, 2]);
        expect(stack.pop()).toBe(5);
        expect(stack.pop()).toBe(4);
        expect(stack.pop()).toBe(3);
      });

      it("should handle pushing more elements than the size of the stack", () => {
        const stack = gen<number>(3);
        const overwritten = stack.push(1, 2, 3, 4, 5, 6);
        expect(overwritten).toEqual([1, 2, 3]);
        expect(stack.pop()).toBe(6);
        expect(stack.pop()).toBe(5);
        expect(stack.pop()).toBe(4);
      });

      it("should return the pushed elements when stack size is zero", () => {
        const stack = gen<number>(0);
        const pushedElems = stack.push(1, 2, 3);
        expect(pushedElems).toEqual([1, 2, 3]);
      });
    });

    describe("top()", () => {
      it("returns the last element in a non-empty stack", () => {
        const stack = gen<number>(1, 2, 3);
        expect(stack.top()).toBe(3);
      });

      it("returns undefined for an empty stack", () => {
        const stack = gen<number>(3);
        expect(stack.top()).toBeUndefined();
      });

      it("does not modify the stack", () => {
        const stack = gen<number>(1, 2, 3);
        const initialSize = stack.size;
        stack.top();
        expect(stack.size).toBe(initialSize);
        expect([...stack.values()]).toEqual([1, 2, 3]);
      });

      it("reflects the correct top element after modifications", () => {
        const stack = gen<number>(3);
        stack.push(1);
        expect(stack.top()).toBe(1);
        stack.push(2);
        expect(stack.top()).toBe(2);
        stack.pop();
        expect(stack.top()).toBe(1);
      });
    });

    describe("values()", () => {
      it("maintains correct order of values", () => {
        const stack = gen<number>(1, 2, 3);
        stack.push(4);
        expect([...stack.values()]).toEqual([2, 3, 4]);
      });

      it("should skip empty indices", () => {
        const stack = gen<number>(10);
        stack.push(1, 2, 3);
        expect([...stack.values()]).toEqual([1, 2, 3]);
      });

      it("reflects changes in values after modifications", () => {
        const stack = gen<number>(3);
        stack.push(1);
        stack.push(2);
        stack.pop();
        stack.push(3);
        expect([...stack.values()]).toEqual([1, 3]);
      });

      it("maintains consistent values after sequential operations", () => {
        const stack = gen<number>(5);
        stack.push(1, 2);
        stack.pop();
        stack.push(3, 4);
        stack.pop();
        expect([...stack.values()]).toEqual([1, 3]);
      });
    });

    describe("[Symbol.iterator]()", () => {
      it("maintains correct order of values", () => {
        const stack = gen<number>(1, 2, 3);
        stack.push(4);
        expect([...stack]).toEqual([2, 3, 4]);
      });

      it("should skip empty indices", () => {
        const stack = gen<number>(10);
        stack.push(1, 2, 3);
        expect([...stack]).toEqual([1, 2, 3]);
      });

      it("reflects changes in values after modifications", () => {
        const stack = gen<number>(3);
        stack.push(1);
        stack.push(2);
        stack.pop();
        stack.push(3);
        expect([...stack]).toEqual([1, 3]);
      });

      it("maintains consistent values after sequential operations", () => {
        const stack = gen<number>(5);
        stack.push(1, 2);
        stack.pop();
        stack.push(3, 4);
        stack.pop();
        expect([...stack]).toEqual([1, 3]);
      });
    });
  });
}
