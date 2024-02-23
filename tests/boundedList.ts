import { describe, expect, it, test, vi } from "vitest";

import { Bounded } from "../src/types/bounded";
import { BoundedEvent } from "../src/types/boundedEvent";
import { Constructor } from "../src/types/constructor";
import { List } from "../src/types/list";

type BoundedList<T> = List<T> & Bounded<T>;

export function testBoundedList(cls: Constructor<BoundedList<unknown>>) {
  describe(`${cls.name} | BoundedList`, () => {
    describe("constructor()", () => {
      it("sets capacity to 0 if 0 element given", () => {
        const list = new cls([]);
        expect(list.capacity).toBe(0);
      });

      it("sets capacity to 1 if 1 element given", () => {
        const list = new cls([1]);
        expect(list.capacity).toBe(1);
      });

      it("sets capacity to elements.length", () => {
        const list = new cls([1, 2, 3]);
        expect(list.capacity).toBe(3);
      });

      it("sets capacity to iterable length", () => {
        const list = new cls(new Set([1, 2, 3, 4, 5]));
        expect(list.capacity).toBe(5);
      });
    });

    describe("capacity", () => {
      // Capacity increase

      it("growth retains element order", () => {
        const list = new cls([1, 2, 3]);
        list.capacity = 5;
        expect(list.capacity).toBe(5);
        expect(list.size).toBe(3);
        expect(Array.from(list.values())).toEqual([1, 2, 3]);
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

                // Create initial list
                const list = new cls(ordered);

                // Rotate
                for (let i = 0; i < rot; ++i) {
                  ordered.shift();
                  ordered.push(i + startCap);
                  list.push(i + startCap);
                }

                // Shift
                for (let i = 0; i < pop; ++i) {
                  ordered.shift();
                  list.shift();
                }

                // Update capacity
                list.capacity = endCap;
                expect(Array.from(list.values())).toEqual(ordered);
              }
            }
          }
        }
      });

      // Capacity decrease

      it("handles shrink to zero capacity", () => {
        const list = new cls([1, 2, 3]);
        list.capacity = 0;
        expect(list.capacity).toBe(0);
        expect(list.size).toBe(0);
        expect(Array.from(list.values())).toEqual([]);
      });

      it("shrink retains element order", () => {
        const list = new cls(10);
        list.push(1, 2, 3);
        list.capacity = 5;
        expect(list.capacity).toBe(5);
        expect(list.size).toBe(3);
        expect(Array.from(list.values())).toEqual([1, 2, 3]);
      });

      it("discards elements when shrinking to a smaller capacity than size", () => {
        const list = new cls([1, 2, 3, 4, 5]);
        list.capacity = 3;
        expect(list.capacity).toBe(3);
        expect(Array.from(list.values())).toEqual([3, 4, 5]);
      });

      it("correctly repopulates after shrink to zero capacity", () => {
        const list = new cls([1, 2, 3, 4, 5]);
        list.capacity = 0;
        list.capacity = 3;
        list.push(6);
        expect(list.capacity).toBe(3);
        expect(list.size).toBe(1);
        expect(Array.from(list.values())).toEqual([6]);
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

                // Create initial list
                const list = new cls(ordered);

                // Rotate
                for (let i = 0; i < rot; ++i) {
                  ordered.shift();
                  ordered.push(i + startCap);
                  list.push(i + startCap);
                }

                // Shift
                for (let i = 0; i < pop; ++i) {
                  ordered.shift();
                  list.shift();
                }

                // Update capacity
                list.capacity = endCap;
                ordered = ordered.slice(Math.max(0, ordered.length - endCap));
                expect(Array.from(list.values())).toEqual(ordered);
              }
            }
          }
        }
      });
    });

    describe("at()", () => {
      test("accesses elements correctly after adding elements beyond initial capacity", () => {
        const list = new cls(3);
        list.push(1, 2, 3);
        list.push(4, 5);
        expect(list.at(0)).toBe(3);
        expect(list.at(1)).toBe(4);
        expect(list.at(2)).toBe(5);
      });

      test("returns undefined for removed elements", () => {
        const list = new cls([1, 2, 3, 4]);
        list.delete(1); // Remove the element at index 1
        expect(list.at(0)).toBe(1);
        expect(list.at(1)).toBe(3);
        expect(list.at(2)).toBe(4);
        expect(list.at(3)).toBeUndefined();
      });

      test("returns undefined after clearing the list", () => {
        const list = new cls([1, 2, 3]);
        list.clear();
        expect(list.at(0)).toBeUndefined();
        expect(list.at(1)).toBeUndefined();
        expect(list.at(2)).toBeUndefined();
      });

      test("accesses elements correctly after manually increasing capacity", () => {
        const list = new cls(2);
        list.push(1, 2);
        list.capacity = 4;
        list.push(3, 4);
        expect(list.at(3)).toBe(4);
      });

      test("behaves correctly after decreasing capacity", () => {
        const list = new cls([1, 2, 3, 4]);
        list.capacity = 2;
        expect(list.at(0)).toBe(3);
        expect(list.at(1)).toBe(4);
        expect(list.at(2)).toBeUndefined();
      });
    });

    describe("delete()", () => {
      test("deletes elements after resizing the list to a larger capacity", () => {
        const list = new cls(2);
        list.push(1, 2);
        list.capacity = 4;
        list.push(3, 4);
        expect(list.delete(3)).toBe(true);
        expect(Array.from(list)).toEqual([1, 2, 3]);
        expect(list.size).toBe(3);
        expect(list.at(3)).toBeUndefined();
      });

      test("deletes elements after resizing the list to a smaller capacity", () => {
        const list = new cls([1, 2, 3, 4, 5]);
        list.capacity = 3;
        expect(list.delete(1)).toBe(true);
        expect(Array.from(list)).toEqual([3, 5]);
        expect(list.size).toBe(2);
        expect(list.at(1)).toBe(5);
      });

      test("handles wraparound before deletion", () => {
        const list = new cls(4);
        list.push(1, 2, 3, 4);
        list.push(5);
        list.delete(1);
        expect(list.size).toBe(3);
        expect(Array.from(list)).toEqual([2, 4, 5]);
      });

      test("handles wraparound after deletion", () => {
        const list = new cls(4);
        list.push(1, 2, 3, 4);
        list.delete(0);
        list.push(5);
        expect(list.size).toBe(4);
        expect(Array.from(list)).toEqual([2, 3, 4, 5]);
      });
    });

    describe("entries()", () => {
      it("returns correct entries after overflow", () => {
        const list = new cls(3);
        list.push(1, 2, 3);
        list.push(4);
        expect(Array.from(list.entries())).toEqual([
          [0, 2],
          [1, 3],
          [2, 4],
        ]);
        list.push(5);
        expect(Array.from(list.entries())).toEqual([
          [0, 3],
          [1, 4],
          [2, 5],
        ]);
        list.push(6);
        expect(Array.from(list.entries())).toEqual([
          [0, 4],
          [1, 5],
          [2, 6],
        ]);
        list.push(7);
        expect(Array.from(list.entries())).toEqual([
          [0, 5],
          [1, 6],
          [2, 7],
        ]);
      });

      it("returns correct entries after capacity increase", () => {
        const list = new cls(3);
        list.push(1, 2, 3);
        list.capacity = 5;
        expect(Array.from(list.entries())).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
        list.push(4, 5);
        expect(Array.from(list.entries())).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 5],
        ]);
        list.push(6, 7);
        expect(Array.from(list.entries())).toEqual([
          [0, 3],
          [1, 4],
          [2, 5],
          [3, 6],
          [4, 7],
        ]);
      });

      it("returns correct entries after capacity decrease", () => {
        const list = new cls(5);
        list.push(1, 2, 3, 4, 5);
        list.capacity = 3;
        expect(Array.from(list.entries())).toEqual([
          [0, 3],
          [1, 4],
          [2, 5],
        ]);
        list.push(6, 7);
        expect(Array.from(list.entries())).toEqual([
          [0, 5],
          [1, 6],
          [2, 7],
        ]);
      });
    });

    describe("fill()", () => {
      test("does not fill an empty list", () => {
        const list = new cls();
        list.capacity = 10;
        list.fill(9);
        expect(Array.from(list)).toEqual([]);
      });

      test("fills correctly when list has wrapped around", () => {
        const list = new cls(5);
        list.push(1, 2, 3, 4, 5, 6, 7);
        list.fill(9, 1, 4);
        expect(Array.from(list)).toEqual([3, 9, 9, 9, 7]);
      });

      test("works correctly after increasing capacity", () => {
        const list = new cls([1, 2, 3]);
        list.capacity = 6;
        list.fill(9, 3, 6);
        expect(Array.from(list)).toEqual([1, 2, 3]);
        list.fill(9, 1, 2);
        expect(Array.from(list)).toEqual([1, 9, 3]);
      });

      test("works corrctly after reducing capacity", () => {
        const list = new cls([1, 2, 3, 4, 5]);
        list.capacity = 3;
        list.fill(9, 1, 2);
        expect(Array.from(list)).toEqual([3, 9, 5]);
      });

      test("works correctly after clear", () => {
        const list = new cls([1, 2, 3]);
        list.clear();
        list.fill(9);
        expect(Array.from(list)).toEqual([]);
      });
    });

    describe("has()", () => {
      it("reflects changes after overflow", () => {
        const list = new cls([1, 2, 3]);
        list.push(4, 5);
        expect(list.has(1)).toBe(false);
        expect(list.has(2)).toBe(false);
        expect(list.has(3)).toBe(true);
        expect(list.has(4)).toBe(true);
        expect(list.has(5)).toBe(true);
      });
    });

    describe("keys()", () => {
      it("returns keys correctly after overflow", () => {
        const list = new cls(3);
        list.push(1, 2, 3);
        list.push(4);
        list.push(5);
        const keys = Array.from(list.keys());
        expect(keys).toEqual([0, 1, 2]);
      });
    });

    describe("pop()", () => {
      test("pops elements after adding elements to the list", () => {
        const list = new cls([1, 2, 3]);
        list.push(4, 5);
        expect(list.pop()).toBe(5);
        expect(Array.from(list)).toEqual([3, 4]);
      });

      it("works correctly after overflow", () => {
        const list = new cls(3);
        list.push(1, 2, 3); // [1, 2, 3]
        list.push(4); // [4, 2, 3]
        expect(list.pop()).toBe(4); // [_, 2, 3]
        expect(list.pop()).toBe(3); // [_, 2, _]
        expect(list.size).toBe(1);
      });

      it("correctly pops after increasing capacity", () => {
        const list = new cls(2);
        list.push(1, 2);
        list.capacity = 10;
        list.push(3, 4);
        expect(list.pop()).toBe(4);
        expect(list.pop()).toBe(3);
        expect(list.size).toBe(2);
        expect(Array.from(list)).toEqual([1, 2]);
      });

      it("correctly pops after decreasing capacity", () => {
        const list = new cls(5);
        list.push(1, 2, 3, 4, 5, 6, 7);
        list.capacity = 3;
        expect(list.pop()).toBe(7);
        expect(list.pop()).toBe(6);
        expect(list.pop()).toBe(5);
        expect(list.pop()).toBeUndefined();
      });
    });

    describe("push()", () => {
      it("correctly handles adding elements when at capacity", () => {
        const list = new cls(5);
        expect(list.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(list.push(6)).toEqual(5);
        expect(list.size).toBe(5);
        expect(Array.from(list.values())).toEqual([2, 3, 4, 5, 6]);
      });

      it("maintains capacity when overflowing", () => {
        const list = new cls(5);
        expect(list.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(list.push(6, 7, 8)).toEqual(5);
        expect(list.size).toBe(5);
        expect(Array.from(list.values())).toEqual([4, 5, 6, 7, 8]);
      });

      it("removes the leftmost elements when overflowing", () => {
        const list = new cls(5);
        expect(list.push(1, 2, 3, 4, 5)).toEqual(5);
        expect(list.push(6, 7)).toEqual(5);
        expect(list.size).toBe(5);
        expect(Array.from(list.values())).toEqual([3, 4, 5, 6, 7]);
      });

      it("handles pushing elements when capacity is 0", () => {
        const list = new cls(0);
        expect(list.push(1)).toBe(0);
        expect(list.size).toBe(0);
        expect(Array.from(list.values())).toEqual([]);
        expect(list.push(2, 3, 4)).toBe(0);
        expect(list.size).toBe(0);
        expect(Array.from(list.values())).toEqual([]);
      });

      it("handles pushing elements when capacity is 1", () => {
        const list = new cls(1);
        expect(list.push(1)).toBe(1);
        expect(list.size).toBe(1);
        expect(Array.from(list.values())).toEqual([1]);
        expect(list.push(2, 3, 4)).toBe(1);
        expect(list.size).toBe(1);
        expect(Array.from(list.values())).toEqual([4]);
      });

      it("correctly pushes elements after decreasing capacity", () => {
        const list = new cls(5);
        list.capacity = 3;
        expect(list.push(1, 2, 3, 4)).toBe(3);
        expect(list.size).toBe(3);
        expect(Array.from(list.values())).toEqual([2, 3, 4]);
      });

      it("correctly pushes elements after increasing capacity", () => {
        const list = new cls(2);
        list.capacity = 5;
        expect(list.push(1, 2, 3, 4)).toBe(4);
        expect(list.size).toBe(4);
        expect(Array.from(list.values())).toEqual([1, 2, 3, 4]);
      });

      it("does not discard items when adding within capacity", async () => {
        const list = new cls(3);
        const onItemEvicted = vi.fn();

        list.on(BoundedEvent.Overflow, onItemEvicted);
        list.push(1, 2);
        list.push(3);

        await new Promise<void>(done => {
          setImmediate(() => {
            expect(onItemEvicted).not.toHaveBeenCalled();
            done();
          });
        });
      });

      it(`emits '${BoundedEvent.Overflow}' event with discarded element when capacity is exceeded`, async () => {
        const list = new cls(3);
        const onItemEvicted = vi.fn();

        list.on(BoundedEvent.Overflow, onItemEvicted);
        list.push(1, 2, 3); // Fill the list to its capacity
        list.push(4); // Should trigger the eviction of 1

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
        const list = new cls(3);
        const evicted: number[] = [];
        const onItemEvicted = vi.fn(items => evicted.push(...items));

        list.on(BoundedEvent.Overflow, onItemEvicted);
        list.push(1, 2, 3); // Fill the list to its capacity
        list.push(4, 5, 6); // Pushing 3 items, should trigger eviction of 1, 2, 3

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
        const list = new cls(3);
        const evicted: number[] = [];
        const onItemEvicted = vi.fn(items => evicted.push(...items));

        list.on(BoundedEvent.Overflow, onItemEvicted);
        list.push(1, 2, 3); // Fill the list to its capacity
        list.push(4, 5, 6); // Pushing 3 items, should trigger eviction of 1, 2, 3

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
      it("handles shift operations in a full list correctly", () => {
        const list = new cls(3);
        list.push(1, 2, 3);
        list.shift(); // [2, 3]
        list.push(4); // [2, 3, 4]
        expect(list.shift()).toBe(2);
        expect(list.size).toBe(2);
        expect(list.shift()).toBe(3);
        expect(list.size).toBe(1);
      });

      it("works correctly after overflow", () => {
        const list = new cls(3);
        list.push(1, 2, 3); // [1, 2, 3]
        list.push(4); // [4, 2, 3]
        expect(list.shift()).toBe(2); // [4, _, 3]
        expect(list.shift()).toBe(3); // [4, _, _]
        expect(list.shift()).toBe(4); // [_, _, _]
        expect(list.size).toBe(0);
      });

      it("works correctly after changing capacity", () => {
        const list = new cls(2);
        list.push(1, 2); // [1, 2]
        list.capacity = 4; // [1, 2, _, _]
        list.push(3, 4); // [1, 2, 3, 4]
        list.shift(); // [_, 2, 3, 4]
        expect(list.shift()).toBe(2); // [_, _, 3, 4]
        expect(list.size).toBe(2);
      });
    });

    describe("values()", () => {
      it("returns correct values for a list that has wrapped around", () => {
        const list = new cls(3);
        list.push(1, 2, 3);
        list.push(4); // [2, 3, 4]
        list.push(5); // [3, 4, 5]
        const values = Array.from(list.values());
        expect(values).toEqual([3, 4, 5]);
      });

      it("iterates through values correctly even after increasing capacity", () => {
        const list = new cls(2);
        list.push(1, 2);
        list.capacity = 4;
        expect(Array.from(list.values())).toEqual([1, 2]);
        list.push(3, 4);
        expect(Array.from(list.values())).toEqual([1, 2, 3, 4]);
      });

      it("iterates through values correctly even after decreasing capacity", () => {
        const list = new cls(5);
        list.push(1, 2, 3, 4, 5);
        list.capacity = 3;
        expect(Array.from(list.values())).toEqual([3, 4, 5]);
        list.push(6, 7);
        expect(Array.from(list.values())).toEqual([5, 6, 7]);
      });
    });

    describe("[Symbol.iterator]()", () => {
      it("returns correct values for a list that has wrapped around", () => {
        const list = new cls(3);
        list.push(1, 2, 3);
        list.push(4); // [2, 3, 4]
        list.push(5); // [3, 4, 5]
        const values = Array.from(list);
        expect(values).toEqual([3, 4, 5]);
      });

      it("iterates through values correctly even after increasing capacity", () => {
        const list = new cls(2);
        list.push(1, 2);
        list.capacity = 4;
        expect(Array.from(list)).toEqual([1, 2]);
        list.push(3, 4);
        expect(Array.from(list)).toEqual([1, 2, 3, 4]);
      });

      it("iterates through values correctly even after decreasing capacity", () => {
        const list = new cls(5);
        list.push(1, 2, 3, 4, 5);
        list.capacity = 3;
        expect(Array.from(list)).toEqual([3, 4, 5]);
        list.push(6, 7);
        expect(Array.from(list)).toEqual([5, 6, 7]);
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
