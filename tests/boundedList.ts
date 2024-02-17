import { describe, expect, it, vi } from "vitest";

import { Bounded } from "../src/types/bounded";
import { BoundedEvent } from "../src/types/boundedEvent";
import { Constructor } from "../src/types/constructor";
import { List } from "../src/types/list";

type BoundedList<T> = List<T> & Bounded<T>;

export function test(cls: Constructor<BoundedList<unknown>>) {
  describe(`${cls.name} | BoundedList`, () => {
    describe("constructor()", () => {
      it("sets capacity to 0 if 0 element given", () => {
        const queue = new cls([]);
        expect(queue.capacity).toBe(0);
      });

      it("sets capacity to 1 if 1 element given", () => {
        const queue = new cls([1]);
        expect(queue.capacity).toBe(1);
      });

      it("sets capacity to elements.length", () => {
        const queue = new cls([1, 2, 3]);
        expect(queue.capacity).toBe(3);
      });

      it("sets capacity to iterable length", () => {
        const queue = new cls(new Set([1, 2, 3, 4, 5]));
        expect(queue.capacity).toBe(5);
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

    describe("entries()", () => {
      it("returns correct entries after overflow", () => {
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

    describe("has()", () => {
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
      it("returns keys correctly after overflow", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.push(4);
        queue.push(5);
        const keys = Array.from(queue.keys());
        expect(keys).toEqual([0, 1, 2]);
      });
    });

    describe("pop()", () => {
      it("works correctly after overflow", () => {
        const stack = new cls(3);
        stack.push(1, 2, 3); // [1, 2, 3]
        stack.push(4); // [4, 2, 3]
        expect(stack.pop()).toBe(4); // [_, 2, 3]
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
      it("correctly handles adding elements when at capacity", () => {
        const queue = new cls(5);
        expect(queue.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(queue.push(6)).toEqual(5);
        expect(queue.size).toBe(5);
        expect(Array.from(queue.values())).toEqual([2, 3, 4, 5, 6]);
      });

      it("maintains capacity when overflowing", () => {
        const queue = new cls(5);
        expect(queue.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(queue.push(6, 7, 8)).toEqual(5);
        expect(queue.size).toBe(5);
        expect(Array.from(queue.values())).toEqual([4, 5, 6, 7, 8]);
      });

      it("removes the leftmost elements when overflowing", () => {
        const queue = new cls(5);
        expect(queue.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(queue.push(6, 7)).toEqual(5);
        expect(queue.size).toBe(5);
        expect(Array.from(queue.values())).toEqual([3, 4, 5, 6, 7]);
      });

      it("handles pushing elements when capacity is 0", () => {
        const queue = new cls(0);
        expect(queue.push(1)).toBe(0);
        expect(queue.size).toBe(0);
        expect(Array.from(queue.values())).toEqual([]);
        expect(queue.push(2, 3, 4)).toBe(0);
        expect(queue.size).toBe(0);
        expect(Array.from(queue.values())).toEqual([]);
      });

      it("handles pushing elements when capacity is 1", () => {
        const queue = new cls(1);
        expect(queue.push(1)).toBe(1);
        expect(queue.size).toBe(1);
        expect(Array.from(queue.values())).toEqual([1]);
        expect(queue.push(2, 3, 4)).toBe(1);
        expect(queue.size).toBe(1);
        expect(Array.from(queue.values())).toEqual([4]);
      });

      it("correctly pushes elements after decreasing capacity", () => {
        const queue = new cls(5);
        queue.capacity = 3;
        expect(queue.push(1, 2, 3, 4)).toBe(3);
        expect(queue.size).toBe(3);
        expect(Array.from(queue.values())).toEqual([2, 3, 4]);
      });

      it("correctly pushes elements after increasing capacity", () => {
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

      it(`emits '${BoundedEvent.Overflow}' event with discarded element when capacity is exceeded`, async () => {
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

      it(`emits '${BoundedEvent.Overflow}' event(s) with multiple elements when multiple are discarded`, async () => {
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

      it(`emits '${BoundedEvent.Overflow}' event(s) with multiple items in expected order when discarded`, async () => {
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

      it("works correctly after overflow", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3); // [1, 2, 3]
        queue.push(4); // [4, 2, 3]
        expect(queue.shift()).toBe(2); // [4, _, 3]
        expect(queue.shift()).toBe(3); // [4, _, _]
        expect(queue.shift()).toBe(4); // [_, _, _]
        expect(queue.size).toBe(0);
      });

      it("works correctly after changing capacity", () => {
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
      it("returns correct values for a queue that has wrapped around", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.push(4); // [2, 3, 4]
        queue.push(5); // [3, 4, 5]
        const values = Array.from(queue.values());
        expect(values).toEqual([3, 4, 5]);
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
      it("returns correct values for a queue that has wrapped around", () => {
        const queue = new cls(3);
        queue.push(1, 2, 3);
        queue.push(4); // [2, 3, 4]
        queue.push(5); // [3, 4, 5]
        const values = Array.from(queue);
        expect(values).toEqual([3, 4, 5]);
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

  describe("unshift()", () => {
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
      expect(deque.at(0)).toBeUndefined();
      expect(deque.at(-1)).toBeUndefined();
      expect(Array.from(deque.values())).toEqual([]);
      expect(deque.unshift(2)).toBe(0);
      expect(deque.size).toBe(0);
      expect(deque.at(0)).toBeUndefined();
      expect(deque.at(-1)).toBeUndefined();
      expect(Array.from(deque.values())).toEqual([]);
    });

    it("handles prepending elements when capacity is 1", () => {
      const deque = new cls(1);
      expect(deque.unshift(1)).toBe(1);
      expect(deque.size).toBe(1);
      expect(deque.at(0)).toBe(1);
      expect(deque.at(-1)).toBe(1);
      expect(Array.from(deque.values())).toEqual([1]);
      expect(deque.unshift(2)).toBe(1);
      expect(deque.size).toBe(1);
      expect(deque.at(0)).toBe(2);
      expect(deque.at(-1)).toBe(2);
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

    it("correctly updates after overflow", () => {
      const deque = new cls(5);
      deque.push(1, 2, 3, 4, 5);
      deque.push(6, 7, 8);
      expect(deque.unshift(9)).toBe(5);
      expect(deque.size).toBe(5);
      expect(Array.from(deque.values())).toEqual([9, 4, 5, 6, 7]);
    });

    it("correctly updates after overflow 2", () => {
      const deque = new cls(5);
      deque.push(1, 2, 3, 4, 5);
      deque.push(6, 7);
      expect(deque.size).toBe(5);
      expect(deque.unshift(8, 9)).toBe(5);
      expect(deque.size).toBe(5);
      expect(Array.from(deque.values())).toEqual([8, 9, 3, 4, 5]);
    });

    it("correctly updates after overflow 3", () => {
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

    it(`emits '${BoundedEvent.Overflow}' event(s) with multiple items in expected order when discarded`, async () => {
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
}
