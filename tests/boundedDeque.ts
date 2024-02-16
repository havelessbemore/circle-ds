import { describe, expect, it, vi } from "vitest";

import { Bounded } from "../src/types/bounded";
import { BoundedEvent } from "../src/types/boundedEvent";
import { Constructor } from "../src/types/constructor";
import { Deque } from "../src/types/deque";

import { test as testQueue } from "./boundedQueue";
import { test as testStack } from "./boundedStack";

type BoundedDeque<T> = Deque<T> & Bounded<T>;

export function test(cls: Constructor<BoundedDeque<unknown>>) {
  testQueue(cls);
  testStack(cls);

  describe(cls.name, () => {
    describe("unshift()", () => {
      it("accepts zero elements", () => {
        const deque = new cls(5);
        expect(deque.unshift()).toEqual(0);
        expect(deque.size).toEqual(0);
        expect(deque.capacity).toEqual(5);
        expect(Array.from(deque)).toEqual([]);
        deque.push(1, 2, 3);
        expect(deque.unshift()).toBe(3);
        expect(deque.size).toBe(3);
      });

      it("prepends an element to an empty deque", () => {
        const deque = new cls(5);
        expect(deque.unshift(1)).toEqual(1);
        expect(deque.size).toBe(1);
        expect(deque.capacity).toBe(5);
        expect(Array.from(deque.values())).toEqual([1]);
      });

      it("prepends multiple elements to an empty deque", () => {
        const deque = new cls(5);
        expect(deque.unshift(1, 2, 3)).toEqual(3);
        expect(deque.size).toBe(3);
        expect(deque.capacity).toBe(5);
        expect(Array.from(deque.values())).toEqual([1, 2, 3]);
      });

      it("should return the new size of the deque after unshifting", () => {
        const deque = new cls(5);
        expect(deque.unshift(1, 2, 3)).toBe(3);
      });

      it("prepends multiple elements to a partially filled deque", () => {
        const deque = new cls(5);
        deque.push(1, 2);
        expect(deque.unshift(3, 4)).toEqual(4);
        expect(deque.size).toBe(4);
        expect(Array.from(deque.values())).toEqual([3, 4, 1, 2]);
      });

      it("maintain capacity when adding more elements than capacity", () => {
        const deque = new cls(5);
        deque.push(1, 2, 3, 4, 5);
        expect(deque.unshift(6)).toEqual(5);
        expect(deque.size).toBe(5);
        expect(Array.from(deque.values())).toEqual([6, 1, 2, 3, 4]);
      });

      it("removes the oldest elements when exceeding capacity", () => {
        const deque = new cls(5);
        deque.push(1, 2, 3, 4, 5);
        expect(deque.unshift(6, 7)).toEqual(5);
        expect(deque.size).toBe(5);
        expect(Array.from(deque.values())).toEqual([6, 7, 1, 2, 3]);
      });

      it("correctly handles adding more elements than capacity", () => {
        const deque = new cls(2);
        expect(deque.unshift(1, 2, 3)).toEqual(2);
        expect(deque.size).toBe(2);
        expect(Array.from(deque.values())).toEqual([1, 2]);
        deque.clear();
        expect(deque.unshift(1, 2, 3, 4, 5, 6, 7, 8, 9)).toEqual(2);
        expect(deque.size).toBe(2);
        expect(Array.from(deque.values())).toEqual([1, 2]);
      });

      it("handles prepending elements when capacity is 0", () => {
        const deque = new cls(0);
        expect(deque.unshift(1)).toBe(0);
        expect(deque.size).toBe(0);
        expect(deque.first()).toBeUndefined();
        expect(deque.last()).toBeUndefined();
        expect(Array.from(deque.values())).toEqual([]);
        expect(deque.unshift(2)).toBe(0);
        expect(deque.size).toBe(0);
        expect(deque.first()).toBeUndefined();
        expect(deque.last()).toBeUndefined();
        expect(Array.from(deque.values())).toEqual([]);
      });

      it("handles prepending elements when capacity is 1", () => {
        const deque = new cls(1);
        expect(deque.unshift(1)).toBe(1);
        expect(deque.size).toBe(1);
        expect(deque.first()).toBe(1);
        expect(deque.last()).toBe(1);
        expect(Array.from(deque.values())).toEqual([1]);
        expect(deque.unshift(2)).toBe(1);
        expect(deque.size).toBe(1);
        expect(deque.first()).toBe(2);
        expect(deque.last()).toBe(2);
        expect(Array.from(deque.values())).toEqual([2]);
      });

      it("correctly updates the deque when prepending elements after decreasing capacity", () => {
        const deque = new cls(5);
        deque.capacity = 3;
        expect(deque.unshift(1, 2, 3, 4)).toBe(3);
        expect(deque.size).toBe(3);
        expect(Array.from(deque.values())).toEqual([1, 2, 3]);
      });

      it("correctly updates the deque when prepending elements after increasing capacity", () => {
        const deque = new cls(2);
        deque.capacity = 5;
        expect(deque.unshift(1, 2, 3, 4)).toBe(4);
        expect(deque.size).toBe(4);
        expect(Array.from(deque.values())).toEqual([1, 2, 3, 4]);
      });

      it("correctly updates when rotated", () => {
        const deque = new cls(5);
        deque.push(1, 2, 3, 4, 5);
        deque.push(6, 7, 8);
        expect(deque.unshift(9)).toBe(5);
        expect(deque.size).toBe(5);
        expect(Array.from(deque.values())).toEqual([9, 4, 5, 6, 7]);
      });

      it("correctly updates when rotated 2", () => {
        const deque = new cls(5);
        deque.push(1, 2, 3, 4, 5);
        deque.push(6, 7);
        expect(deque.size).toBe(5);
        expect(deque.unshift(8, 9)).toBe(5);
        expect(deque.size).toBe(5);
        expect(Array.from(deque.values())).toEqual([8, 9, 3, 4, 5]);
      });

      it("correctly updates when rotated 3", () => {
        const deque = new cls(5);
        deque.push(1, 2, 3, 4, 5);
        deque.push(6, 7);
        expect(deque.size).toBe(5);
        expect(deque.unshift(8, 9, 10)).toBe(5);
        expect(deque.size).toBe(5);
        expect(Array.from(deque.values())).toEqual([8, 9, 10, 3, 4]);
      });

      it("does not discard items when adding within capacity", async () => {
        const deque = new cls(3);
        const onItemEvicted = vi.fn();

        deque.on(BoundedEvent.Overflow, onItemEvicted);
        deque.unshift(1, 2);
        deque.unshift(3);

        await new Promise<void>(done => {
          setImmediate(() => {
            expect(onItemEvicted).not.toHaveBeenCalled();
            done();
          });
        });
      });

      it(`emits '${BoundedEvent.Overflow}' event with the discarded item when capacity is exceeded`, async () => {
        const deque = new cls(3);
        const onItemEvicted = vi.fn();

        deque.on(BoundedEvent.Overflow, onItemEvicted);
        deque.unshift(1, 2, 3); // Fill the deque to its capacity
        deque.unshift(4); // Should trigger the eviction of 3

        await new Promise<void>((done, reject) => {
          setImmediate(() => {
            try {
              expect(onItemEvicted.mock.calls.length).toBe(1);
              expect(onItemEvicted).toHaveBeenCalledWith([3]);
              done();
            } catch (error) {
              reject(error);
            }
          });
        });
      });

      it(`emits '${BoundedEvent.Overflow}' event(s) with multiple items when multiple items are discarded`, async () => {
        const deque = new cls(3);
        const evicted: number[] = [];
        const onItemEvicted = vi.fn(items => evicted.push(...items));

        deque.on(BoundedEvent.Overflow, onItemEvicted);
        deque.unshift(1, 2, 3); // Fill the deque to its capacity
        deque.unshift(4, 5, 6); // Prepend 3 items, should trigger eviction of 1, 2, 3

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
        const deque = new cls(3);
        const evicted: number[] = [];
        const onItemEvicted = vi.fn(items => evicted.push(...items));

        deque.on(BoundedEvent.Overflow, onItemEvicted);
        deque.unshift(1, 2, 3); // Fill the deque to its capacity
        deque.unshift(4, 5, 6); // Prepend 3 items, should trigger eviction of 1, 2, 3

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
  });
}
