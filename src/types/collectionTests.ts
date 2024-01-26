import { describe, expect, it, vi } from "vitest";
import { Constructor } from "../utils/mixins";
import { Collection } from "./collection";

export const tests: {
  [key: string]: (ctor: Constructor<Collection<unknown, unknown>>) => void;
} = Object.assign({
  collection: test,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function test(ctor: Constructor<Collection<any, any>>): void {
  function gen<V, K = V>(...args: unknown[]): Collection<V, K> {
    return new ctor(...args);
  }

  describe(ctor.name, () => {
    describe("constructor()", () => {
      it("accepts no parameters", () => {
        expect(() => gen<number>()).not.toThrow();
        const obj = gen();
        expect(obj.capacity).toEqual(0);
        expect(obj.size).toEqual(0);
        expect([...obj.keys()]).toEqual([]);
        expect([...obj.values()]).toEqual([]);
      });

      it("accepts valid capacity", () => {
        const obj = gen(10);
        expect(obj.capacity).toEqual(10);
        expect(obj.size).toEqual(0);
        expect([...obj.keys()]).toEqual([]);
        expect([...obj.values()]).toEqual([]);
      });

      it("accepts zero capacity", () => {
        const obj = gen<number>(0);
        expect(obj.size).toBe(0);
        expect(obj.capacity).toBe(0);
        expect([...obj.values()]).toEqual([]);
      });

      it("throws error with negative capacity", () => {
        expect(() => gen<number>(-1)).toThrow(RangeError);
      });

      it("throws error with decimal capacity", () => {
        expect(() => gen<number>(2.5)).toThrow(RangeError);
      });

      it("throws error with too large capacity", () => {
        expect(() => gen<number>(Number.MAX_VALUE)).toThrow(RangeError);
        expect(() => gen<number>(Number.MAX_SAFE_INTEGER + 1)).toThrow(
          RangeError
        );
      });

      it("accepts an element", () => {
        let obj!: Collection<unknown, unknown>;
        expect(() => (obj = gen(BigInt(12)))).not.toThrow();
        expect(obj.capacity).toEqual(1);
        expect([...obj.values()]).toEqual([BigInt(12)]);
        expect(() => (obj = gen(null))).not.toThrow();
        expect(obj.capacity).toEqual(1);
        expect([...obj.values()]).toEqual([null]);
        expect(() => (obj = gen(false))).not.toThrow();
        expect(obj.capacity).toEqual(1);
        expect([...obj.values()]).toEqual([false]);
        expect(() => (obj = gen(true))).not.toThrow();
        expect(obj.capacity).toEqual(1);
        expect([...obj.values()]).toEqual([true]);
        expect(() => (obj = gen(undefined))).not.toThrow();
        expect(obj.capacity).toEqual(1);
        expect([...obj.values()]).toEqual([undefined]);
        expect(() => (obj = gen({}))).not.toThrow();
        expect(obj.capacity).toEqual(1);
        expect([...obj.values()]).toEqual([{}]);
      });

      it("accepts multiple elements", () => {
        const obj = gen<number>(1, 2, 3);
        expect(obj.size).toBe(3);
        expect(obj.capacity).toBe(3);
        expect([...obj.values()]).toEqual([1, 2, 3]);
      });

      it("initializes correctly with repeated values", () => {
        const obj = gen<number>(1, 1, 1, 1, 1);
        expect(obj.size).toBe(5);
        expect(obj.capacity).toBe(5);
        expect([...obj.values()]).toEqual([1, 1, 1, 1, 1]);
      });

      it("handles complex data types", () => {
        const obj = gen<object>({ a: 1 }, { b: 2 });
        expect(obj.size).toBe(2);
        expect(obj.capacity).toBe(2);
        expect([...obj.values()]).toEqual([{ a: 1 }, { b: 2 }]);
      });

      it("accepts an empty array", () => {
        const obj = gen([]);
        expect(obj.size).toEqual(0);
        expect(obj.capacity).toEqual(0);
        expect([...obj.values()]).toEqual([]);
      });

      it("accepts an array", () => {
        const obj = gen<number>([1, 2, 3]);
        expect(obj.size).toBe(3);
        expect(obj.capacity).toBe(3);
        expect([...obj.values()]).toEqual([1, 2, 3]);
      });

      it("accepts an iterable", () => {
        const obj = gen<number>(new Set([1, 2, 3]));
        expect(obj.size).toBe(3);
        expect(obj.capacity).toBe(3);
        expect([...obj.values()]).toEqual([1, 2, 3]);
      });
    });

    describe("capacity", () => {
      // Input checks

      it("accepts valid capacities", () => {
        const queue = gen<number>(1, 2, 3);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        expect(() => (queue.capacity = null as any)).not.toThrow();
        expect(queue.capacity).toEqual(0);
        expect(() => (queue.capacity = false as any)).not.toThrow();
        expect(queue.capacity).toEqual(0);
        expect(() => (queue.capacity = true as any)).not.toThrow();
        expect(queue.capacity).toEqual(1);
        expect(() => (queue.capacity = [] as any)).not.toThrow();
        expect(queue.capacity).toEqual(0);
        expect(() => (queue.capacity = [10] as any)).not.toThrow();
        expect(queue.capacity).toEqual(10);
        /* eslint-enable @typescript-eslint/no-explicit-any */
      });

      it("throws an error when given a decimal capacity", () => {
        const queue = gen<number>(1, 2, 3);
        expect(() => (queue.capacity = 2.5)).toThrow(RangeError);
      });

      it("throws an error when given a negative capacity", () => {
        const queue = gen<number>(1, 2, 3);
        expect(() => (queue.capacity = -1)).toThrow(RangeError);
      });

      it("throws an error when given an invalid capacity", () => {
        const queue = gen<number>(1, 2, 3);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        expect(() => (queue.capacity = BigInt(12) as any)).toThrow(TypeError);
        expect(() => (queue.capacity = undefined as any)).toThrow(RangeError);
        expect(() => (queue.capacity = [1, 2] as any)).toThrow(RangeError);
        expect(() => (queue.capacity = {} as any)).toThrow(RangeError);
        /* eslint-enable @typescript-eslint/no-explicit-any */
      });

      // Capacity increase

      it("grows to a larger capacity and retains elements order", () => {
        const queue = gen<number>(1, 2, 3);
        queue.capacity = 5;
        expect(queue.capacity).toBe(5);
        expect(queue.size).toBe(3);
        expect([...queue.values()]).toEqual([1, 2, 3]);
      });

      it("handles growth for an empty queue", () => {
        const queue = gen<number>();
        queue.capacity = 5;
        expect(queue.capacity).toBe(5);
        expect(queue.size).toBe(0);
        expect([...queue.values()]).toEqual([]);
      });

      // Capacity decrease

      it("discards elements when shrinking to a smaller capacity than size", () => {
        const queue = gen<number>(1, 2, 3, 4, 5);
        queue.capacity = 3;
        expect(queue.capacity).toBe(3);
        expect([...queue.values()]).toEqual([1, 2, 3]);
      });

      it("handles capacity shrink for an empty queue", () => {
        const queue = gen<number>(3);
        queue.capacity = 1;
        expect(queue.capacity).toBe(1);
        expect([...queue.values()]).toEqual([]);
      });
    });

    describe("clear()", () => {
      it("maintains capacity when clearing an empty collection", () => {
        const obj = gen<number>(3);
        obj.clear();
        expect(obj.size).toBe(0);
        expect(obj.capacity).toBe(3);
        expect([...obj.values()]).toEqual([]);
      });

      it("removes all elements from a non-empty collection", () => {
        const obj = gen<number>(1, 2, 3);
        obj.clear();
        expect(obj.size).toBe(0);
        expect(obj.capacity).toBe(3);
        expect([...obj.values()]).toEqual([]);
      });

      it("invalidates iterators after clearing", () => {
        const stack = gen<number>(1, 2, 3);
        const iterator = stack.values();
        stack.clear();
        expect([...iterator]).toEqual([]);
      });

      it("maintains state after repeated clears", () => {
        const stack = gen<number>(1, 2, 3);
        stack.clear();
        stack.clear();
        expect(stack.size).toBe(0);
        expect([...stack.values()]).toEqual([]);
      });
    });

    describe("forEach()", () => {
      it("iterates over each element in a non-empty queue", () => {
        const queue = gen<number>(1, 2, 3);
        const mockCallback = vi.fn();
        queue.forEach(mockCallback);
        expect(mockCallback.mock.calls.length).toBe(3);
      });

      it("does not invoke callback for an empty queue", () => {
        const queue = gen<number>(3);
        const mockCallback = vi.fn();
        queue.forEach(mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
      });

      it("should use the provided thisArg for the callback", () => {
        const queue = gen<number>(1, 2, 3);
        const context = { multiplier: 2 };
        const mockCallback = vi.fn(function (this: typeof context, value) {
          return value * this.multiplier;
        });
        queue.forEach(mockCallback, context);
        expect(mockCallback.mock.instances[0]).toBe(context);
      });
    });

    describe("has()", () => {
      it("returns false for any element when the queue is empty", () => {
        const queue = gen<number>(3);
        expect(queue.has(1)).toBe(false);
      });

      it("returns true for an element present in the queue", () => {
        const queue = gen<number>(1, 2, 3);
        expect(queue.has(2)).toBe(true);
      });

      it("returns false for an element not present in the queue", () => {
        const queue = gen<number>(1, 2, 3);
        expect(queue.has(4)).toBe(false);
      });

      it("handles primitive data types correctly", () => {
        const queue = gen<unknown>(1, "b", 3n, true, false);
        expect(queue.has(1)).toBe(true);
        expect(queue.has("b")).toBe(true);
        expect(queue.has(3n)).toBe(true);
        expect(queue.has(true)).toBe(true);
        expect(queue.has(false)).toBe(true);
      });

      it("accurately identifies repeated and similar values", () => {
        const queue = gen<number>(1, 2, 2, 3, 1);
        expect(queue.has(2)).toBe(true);
        expect(queue.has(4)).toBe(false);
      });

      it("returns false for any element after clearing the queue", () => {
        const queue = gen<number>(1, 2, 3);
        queue.clear();
        expect(queue.has(1)).toBe(false);
        expect(queue.has(2)).toBe(false);
        expect(queue.has(3)).toBe(false);
      });

      it("handles non-primitive data types correctly", () => {
        const obj = { key: "value" };
        const queue = gen<unknown>(3, obj);
        expect(queue.has(obj)).toBe(true);
        expect(queue.has({ key: "value" })).toBe(false);
      });
    });

    describe("values()", () => {
      it("returns an empty iterable for an empty queue", () => {
        const queue = gen<number>(3);
        expect([...queue.values()]).toEqual([]);
      });

      it("returns all values for a non-empty queue", () => {
        const queue = gen<number>(1, 2, 3);
        expect([...queue.values()]).toEqual([1, 2, 3]);
      });

      it("returns no values after clearing the queue", () => {
        const queue = gen<number>(1, 2, 3);
        queue.clear();
        expect([...queue.values()]).toEqual([]);
      });
    });

    describe("[Symbol.iterator]()", () => {
      it("returns an empty iterable for an empty queue", () => {
        const queue = gen<number>(3);
        expect([...queue]).toEqual([]);
      });

      it("returns all values for a non-empty queue", () => {
        const queue = gen<number>(1, 2, 3);
        expect([...queue]).toEqual([1, 2, 3]);
      });

      it("returns no values after clearing the queue", () => {
        const queue = gen<number>(1, 2, 3);
        queue.clear();
        expect([...queue]).toEqual([]);
      });
    });
  });
}
