import { describe, expect, it, vi } from "vitest";

import { Bounded } from "../types/bounded";
import { BoundedEvent } from "../types/boundedEvent";
import { Constructor } from "../types/constructor";

type BoundedSet<T> = Set<T> & Bounded<T>;

export function test(cls: Constructor<BoundedSet<unknown>>) {
  describe(cls.name, () => {
    describe("constructor()", () => {
      it("accepts an element", () => {
        const set = new cls([1]);
        expect(set.capacity).toBe(1);
        expect(set.size).toBe(1);
        expect(Array.from(set.values())).toEqual([1]);
      });

      it("does not directly use input array", () => {
        const arr = [1];
        const set = new cls(arr);
        arr[0] = 2;
        arr.push(3);
        expect(set.size).toEqual(1);
        expect(set.capacity).toEqual(1);
        expect(Array.from(set.values())).toEqual([1]);
      });

      it("accepts multiple elements", () => {
        const set = new cls([1, 2, 3]);
        expect(set.capacity).toBe(3);
        expect(set.size).toBe(3);
        expect(Array.from(set.values())).toEqual([1, 2, 3]);
      });

      it("accepts repeated values", () => {
        const set = new cls([1, 1, 1, 1, 1]);
        expect(set.capacity).toBe(1);
        expect(set.size).toBe(1);
        expect(Array.from(set.values())).toEqual([1]);
      });

      it("handles complex data types", () => {
        const set = new cls([{ a: 1 }, { b: 2 }]);
        expect(set.size).toBe(2);
        expect(set.capacity).toBe(2);
        expect(Array.from(set.values())).toEqual([{ a: 1 }, { b: 2 }]);
      });

      it("handles uniqueness of complex data types", () => {
        const obj1 = { a: 1 };
        const obj2 = { a: 1 };
        const set = new cls([obj1, obj2]);
        expect(set.size).toBe(2);
        expect(set.capacity).toBe(2);
        expect(Array.from(set.values())).toEqual([obj1, obj2]);
      });

      it("accepts an iterable", () => {
        const set = new cls(new Set([1, 2, 3]));
        expect(set.size).toBe(3);
        expect(set.capacity).toBe(3);
        expect(Array.from(set.values())).toEqual([1, 2, 3]);
      });
    });

    describe("capacity", () => {
      // Capacity increase

      it("growth retains element order", () => {
        const set = new cls([1, 2, 3]);
        set.capacity = 5;
        expect(set.capacity).toBe(5);
        expect(set.size).toBe(3);
        expect(Array.from(set.values())).toEqual([1, 2, 3]);
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

                // Create initial set
                const set = new cls(ordered);

                // Rotate
                for (let i = 0; i < rot; ++i) {
                  ordered.shift();
                  ordered.push(i + startCap);
                  set.add(i + startCap);
                }

                // Remove
                for (let i = 0; i < pop; ++i) {
                  set.delete(ordered.shift());
                }

                // Update capacity
                set.capacity = endCap;
                expect(Array.from(set.values())).toEqual(ordered);
              }
            }
          }
        }
      });

      // Capacity decrease

      it("handles shrink to zero capacity", () => {
        const set = new cls([1, 2, 3]);
        set.capacity = 0;
        expect(set.capacity).toBe(0);
        expect(set.size).toBe(0);
        expect(Array.from(set.values())).toEqual([]);
      });

      it("shrink retains element order", () => {
        const set = new cls(10);
        set.add(1).add(2).add(3);
        set.capacity = 5;
        expect(set.capacity).toBe(5);
        expect(set.size).toBe(3);
        expect(Array.from(set.values())).toEqual([1, 2, 3]);
      });

      it("discards elements when shrinking to a smaller capacity than size", () => {
        const set = new cls([1, 2, 3, 4, 5]);
        set.capacity = 3;
        expect(set.capacity).toBe(3);
        expect(Array.from(set.values())).toEqual([3, 4, 5]);
      });

      it("correctly repopulates after shrink to zero capacity", () => {
        const set = new cls([1, 2, 3, 4, 5]);
        set.capacity = 0;
        set.capacity = 3;
        set.add(6);
        expect(set.capacity).toBe(3);
        expect(set.size).toBe(1);
        expect(Array.from(set.values())).toEqual([6]);
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

                // Create initial set
                const set = new cls(ordered);

                // Rotate
                for (let i = 0; i < rot; ++i) {
                  ordered.shift();
                  ordered.push(i + startCap);
                  set.add(i + startCap);
                }

                // Shift
                for (let i = 0; i < pop; ++i) {
                  set.delete(ordered.shift());
                }

                // Update capacity
                set.capacity = endCap;
                ordered = ordered.slice(Math.max(0, ordered.length - endCap));
                expect(Array.from(set.values())).toEqual(ordered);
              }
            }
          }
        }
      });
    });

    describe("add()", () => {
      it("should add a unique value to the set", () => {
        const set = new cls();
        set.add(1);
        expect(set.has(1)).toBe(true);
        expect(set.size).toBe(1);
        expect(Array.from(set)).toEqual([1]);
      });

      it("should not add a duplicate value", () => {
        const set = new cls();
        set.add(1);
        set.add(1); // Attempt to add a duplicate
        expect(set.has(1)).toBe(true);
        expect(set.size).toBe(1);
        expect(Array.from(set)).toEqual([1]);
      });

      it("should replace the oldest value when at capacity", () => {
        const set = new cls(2);
        set.add(1);
        set.add(2);
        set.add(3); // This should remove 1 and add 3
        expect(set.has(1)).toBe(false);
        expect(set.has(2)).toBe(true);
        expect(set.has(3)).toBe(true);
        expect(set.size).toBe(2);
        expect(Array.from(set)).toEqual([2, 3]);
      });

      it("should do nothing when adding a value and capacity is 0", () => {
        const set = new cls(0);
        set.add(1);
        expect(set.size).toBe(0);
        expect(Array.from(set)).toEqual([]);
      });

      it("handles pushing elements into a set of capacity 1", () => {
        const smallset = new cls(1);
        smallset.add(1);
        expect(smallset.size).toBe(1);
        expect(Array.from(smallset.values())).toEqual([1]);
        smallset.add(2);
        expect(smallset.size).toBe(1);
        expect(Array.from(smallset.values())).toEqual([2]);
      });

      it("should handle adding values when initialized with an iterable", () => {
        const set = new cls([1, 2, 3]);
        set.add(4);
        expect(set.has(4)).toBe(true);
        expect(set.size).toBe(3);
        expect(Array.from(set)).toEqual([2, 3, 4]);
      });

      it("should not add a value if the set is at capacity and the value already exists", () => {
        const set = new cls(2);
        set.add(1);
        set.add(2);
        set.add(1);
        expect(set.size).toBe(2);
        expect(Array.from(set.values())).toEqual([2, 1]);
      });

      it("should handle adding different types of values", () => {
        const set = new cls();
        set.add(1);
        set.add("string");
        set.add({ key: "value" });
        set.add(null);
        set.add(undefined);
        expect(set.has(1)).toBe(true);
        expect(set.has("string")).toBe(true);
        expect(set.has({ key: "value" })).toBe(false);
        expect(set.has(null)).toBe(true);
        expect(set.has(undefined)).toBe(true);
        expect(set.size).toBe(5);
      });

      it("should maintain correct order of values when at capacity", () => {
        const set = new cls(3);
        set.add(1); // [1]
        set.add(2); // [1, 2]
        set.add(3); // [1, 2, 3]
        set.add(4); // [2, 3, 4]
        const values = Array.from(set.values());
        expect(values).toEqual([2, 3, 4]);
      });

      it("correctly updates the set when pushing elements after decreasing capacity", () => {
        const set = new cls(5);
        set.capacity = 3;
        set.add(1).add(2).add(3).add(4);
        expect(set.size).toBe(3);
        expect(Array.from(set.values())).toEqual([2, 3, 4]);
      });

      it("correctly updates the set when pushing elements after increasing capacity", () => {
        const set = new cls(2);
        set.capacity = 5;
        set.add(1).add(2).add(3).add(4);
        expect(set.size).toBe(4);
        expect(Array.from(set.values())).toEqual([1, 2, 3, 4]);
      });

      it("should adjust capacity and remove excess values if necessary", () => {
        const set = new cls(5);
        set.add(1);
        set.add(2);
        set.add(3);
        set.capacity = 2;
        expect(set.size).toBe(2);
        expect(set.has(1)).toBe(false);
        expect(set.has(2)).toBe(true);
        expect(set.has(3)).toBe(true);
      });

      it(`adding a value should not emit '${BoundedEvent.Overflow}' if the set is not at capacity`, async () => {
        const set = new cls(2);
        const mockFn = vi.fn();
        set.on(BoundedEvent.Overflow, mockFn);
        set.add(1);
        await new Promise<void>(done => {
          setImmediate(() => {
            expect(mockFn).not.toHaveBeenCalled();
            done();
          });
        });
      });

      it(`emits '${BoundedEvent.Overflow}' event with the discarded item when capacity is exceeded`, async () => {
        const set = new cls(3);
        const onItemEvicted = vi.fn();

        set.on(BoundedEvent.Overflow, onItemEvicted);
        set.add(1).add(2).add(3);
        set.add(4);

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
        const set = new cls(3);
        const evicted: number[] = [];
        const onItemEvicted = vi.fn(items => evicted.push(...items));

        set.on(BoundedEvent.Overflow, onItemEvicted);
        set.add(1).add(2).add(3);
        set.add(4).add(5).add(6);

        await new Promise<void>((done, reject) => {
          setImmediate(() => {
            try {
              expect(onItemEvicted).toHaveBeenCalledTimes(3);
              expect(evicted).toEqual([1, 2, 3]);
              done();
            } catch (error) {
              reject(error);
            }
          });
        });
      });

      it("should not remove any value if adding an existing value when at capacity", async () => {
        const mockFn = vi.fn();
        const set = new cls(2);
        set.on(BoundedEvent.Overflow, mockFn);
        set.add(1);
        set.add(2);
        set.add(1);
        expect(set.size).toBe(2);
        expect(Array.from(set)).toEqual(expect.arrayContaining([1, 2]));
        await new Promise<void>(done => {
          setImmediate(() => {
            expect(mockFn).not.toHaveBeenCalled();
            done();
          });
        });
      });

      it("should correctly determine uniqueness for complex objects", () => {
        const set = new cls();
        const obj1 = { key: "value" };
        const obj2 = { key: "value" };
        set.add(obj1);
        set.add(obj2);
        expect(set.size).toBe(2);
      });
    });

    describe("clear()", () => {
      it("clears a default set correctly", () => {
        const set = new cls();
        set.clear();
        expect(set.size).toBe(0);
        expect(set.capacity).toBe(Infinity);
        expect([...set]).toEqual([]);
      });

      it("clears a zero capacity set correctly", () => {
        const set = new cls(0);
        set.clear();
        expect(set.size).toBe(0);
        expect(set.capacity).toBe(0);
        expect([...set]).toEqual([]);
      });

      it("clears an unused set correctly", () => {
        const set = new cls(10);
        set.clear();
        expect(set.size).toBe(0);
        expect(set.capacity).toBe(10);
        expect([...set]).toEqual([]);
      });

      it("clears a filled set correctly", () => {
        const set = new cls([1, 2, 3, 4, 5]);
        expect(set.size).toBe(5);
        set.clear();
        expect(set.size).toBe(0);
        expect(set.capacity).toBe(5);
        expect([...set]).toEqual([]);
      });

      it("allows adding elements after clearing", () => {
        const set = new cls([1, 2, 3]);
        set.clear();
        expect(set.size).toBe(0);
        expect(set.capacity).toBe(3);
        expect(Array.from(set.values())).toEqual([]);
        set.add(4);
        expect(set.size).toBe(1);
        expect(Array.from(set.values())).toEqual([4]);
      });

      it("allows adding elements after clearing 2", () => {
        const set = new cls([1, 2, 3]);
        set.add(4).add(5);
        set.clear();
        expect(set.size).toBe(0);
        expect(set.capacity).toBe(3);
        expect(Array.from(set.values())).toEqual([]);
        set.add(6);
        expect(set.size).toBe(1);
        expect(Array.from(set.values())).toEqual([6]);
        set.add(7).add(8);
        expect(set.size).toBe(3);
        expect(Array.from(set.values())).toEqual([6, 7, 8]);
      });

      it("Can be called repeatedly", () => {
        const set = new cls([1, 2, 3, 4, 5]);
        expect(set.size).toBe(5);
        set.clear();
        expect(set.size).toBe(0);
        set.clear();
        expect(set.size).toBe(0);
        set.clear();
        expect(set.size).toBe(0);
        expect(set.capacity).toBe(5);
        expect(Array.from(set.values())).toEqual([]);
      });
    });

    describe("delete()", () => {
      it("should remove an existing value from the set", () => {
        const set = new cls();
        set.add(1);
        expect(set.delete(1)).toBe(true);
        expect(set.has(1)).toBe(false);
        expect(set.size).toBe(0);
      });

      it("should return false when deleting a non-existing value", () => {
        const set = new cls();
        set.add(1);
        expect(set.delete(2)).toBe(false);
        expect(set.size).toBe(1);
      });

      it("should handle deletion in a set with multiple values", () => {
        const set = new cls();
        set.add("a");
        set.add("b");
        set.add("c");
        set.delete("b");
        expect(set.has("a")).toBe(true);
        expect(set.has("b")).toBe(false);
        expect(set.has("c")).toBe(true);
        expect(set.size).toBe(2);
      });

      it("should not affect the set size when deleting a non-existing value", () => {
        const set = new cls();
        set.add(1);
        set.delete(2);
        expect(set.size).toBe(1);
      });

      it("should correctly manage capacity after deletion", () => {
        const set = new cls(3);
        set.add(1);
        set.add(2);
        set.delete(1);
        expect(set.capacity).toBe(3);
        expect(set.size).toBe(1);
        expect(set.has(2)).toBe(true);
      });

      it("should maintain the correct order of elements after deletion", () => {
        const set = new cls();
        set.add(1);
        set.add(2);
        set.add(3);
        set.delete(2);
        const values = Array.from(set.values());
        expect(values).toEqual([1, 3]);
      });
    });

    describe("entries()", () => {
      it("returns no entries for an empty set", () => {
        const set = new cls();
        const entries = Array.from(set.entries());
        expect(entries.length).toBe(0);
      });

      it("returns correct entries for a partially filled set", () => {
        const set = new cls(5);
        set.add(1).add(2).add(3);
        const entries = Array.from(set.entries());
        expect(entries).toEqual([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
      });

      it("returns correct entries for a full set", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        const entries = Array.from(set.entries());
        expect(entries).toEqual([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
      });

      it("returns correct entries after removing an element", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        set.delete(2);
        expect(Array.from(set.entries())).toEqual([
          [1, 1],
          [3, 3],
        ]);
      });

      it("returns correct entries for a set that has wrapped around", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3).add(4);
        expect(Array.from(set.entries())).toEqual([
          [2, 2],
          [3, 3],
          [4, 4],
        ]);
        set.add(5);
        expect(Array.from(set.entries())).toEqual([
          [3, 3],
          [4, 4],
          [5, 5],
        ]);
        set.add(6);
        expect(Array.from(set.entries())).toEqual([
          [4, 4],
          [5, 5],
          [6, 6],
        ]);
        set.add(7);
        expect(Array.from(set.entries())).toEqual([
          [5, 5],
          [6, 6],
          [7, 7],
        ]);
      });

      it("returns correct entries after capacity increase", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        set.capacity = 5;
        expect(Array.from(set.entries())).toEqual([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
        set.add(4).add(5);
        expect(Array.from(set.entries())).toEqual([
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5],
        ]);
        set.add(6).add(7);
        expect(Array.from(set.entries())).toEqual([
          [3, 3],
          [4, 4],
          [5, 5],
          [6, 6],
          [7, 7],
        ]);
      });

      it("returns correct entries after capacity decrease", () => {
        const set = new cls(5);
        set.add(1).add(2).add(3).add(4).add(5);
        set.capacity = 3;
        expect(Array.from(set.entries())).toEqual([
          [3, 3],
          [4, 4],
          [5, 5],
        ]);
        set.add(6).add(7);
        expect(Array.from(set.entries())).toEqual([
          [5, 5],
          [6, 6],
          [7, 7],
        ]);
      });
    });

    describe("forEach()", () => {
      it("does not call the callback for an empty set", () => {
        const set = new cls();
        const mockCallback = vi.fn();
        set.forEach(mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
      });

      it("calls the callback for each element in a partially filled set", () => {
        const set = new cls(5); // Assuming a capacity of 5
        set.add(1).add(2).add(3);
        const mockCallback = vi.fn();
        set.forEach(mockCallback);
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 1, set);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 2, set);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 3, set);
      });

      it("uses the provided thisArg for the callback", () => {
        const set = new cls([1, 2, 3]);
        const context = { multiplier: 2 };
        const mockCallback = vi.fn(function (this: typeof context, value) {
          return value * this.multiplier;
        });
        set.forEach(mockCallback, context);
        expect(mockCallback.mock.instances[0]).toBe(context);
      });

      it("correctly handles callback logic for a full set", () => {
        const set = new cls([1, 2, 3]) as BoundedSet<number>;
        const results: number[] = [];
        set.forEach(value => {
          results.push(value * 2);
        });
        expect(results).toEqual([2, 4, 6]);
      });

      it("works correctly after removing and adding elements", () => {
        const set = new cls([1, 2, 3]) as BoundedSet<number>;
        set.delete(2);
        set.add(4);
        const results: number[] = [];
        set.forEach(value => results.push(value + 1));
        expect(results).toEqual([2, 4, 5]);
      });

      it("maintains the correct order of elements", () => {
        const set = new cls(3) as BoundedSet<number>;
        set.add(3).add(2).add(1);
        set.delete(3);
        set.add(4);
        const results: number[] = [];
        set.forEach(value => results.push(value));
        expect(results).toEqual([2, 1, 4]);
      });

      it("provides the correct index and set reference to the callback", () => {
        const set = new cls(3);
        set.add(10).add(20).add(30);
        const mockCallback = vi.fn();
        set.forEach(mockCallback);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 10, 10, set);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 20, 20, set);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 30, 30, set);
      });
    });

    describe("has()", () => {
      it("returns false for any element when the set is empty", () => {
        const set = new cls(3);
        expect(set.has(1)).toBe(false);
      });

      it("returns true for an element present in the set", () => {
        const set = new cls([1, 2, 3]);
        expect(set.has(2)).toBe(true);
      });

      it("returns false for an element not present in the set", () => {
        const set = new cls([1, 2, 3]);
        expect(set.has(4)).toBe(false);
      });

      it("handles primitive data types correctly", () => {
        const obj = { id: 1 };
        const fn = () => {};
        const sym = Symbol("");
        const set = new cls([1, "b", 3n, true, false, obj, fn, sym]);
        expect(set.size).toBe(8);
        expect(set.has(1)).toBe(true);
        expect(set.has("b")).toBe(true);
        expect(set.has(3n)).toBe(true);
        expect(set.has(true)).toBe(true);
        expect(set.has(false)).toBe(true);
        expect(set.has(obj)).toBe(true);
        expect(set.has(fn)).toBe(true);
        expect(set.has(sym)).toBe(true);
      });

      it("should return false for deleted values", () => {
        const set = new cls();
        set.add(3);
        set.delete(3);
        expect(set.has(3)).toBe(false);
      });

      it("should return true for null and undefined if they were explicitly added", () => {
        const set = new cls();
        set.add(null);
        set.add(undefined);
        expect(set.size).toBe(2);
        expect(set.has(null)).toBe(true);
        expect(set.has(undefined)).toBe(true);
      });

      it("accurately identifies repeated and similar values", () => {
        const set = new cls([1, 2, 2, 3, 1]);
        expect(set.has(2)).toBe(true);
        expect(set.has(4)).toBe(false);
      });

      it("returns false for any element after clearing the set", () => {
        const set = new cls([1, 2, 3]);
        set.clear();
        expect(set.has(1)).toBe(false);
        expect(set.has(2)).toBe(false);
        expect(set.has(3)).toBe(false);
      });

      it("handles non-primitive data types correctly", () => {
        const value = { key: "value" };
        const set = new cls([3, value]);
        expect(set.has(value)).toBe(true);
        expect(set.has({ key: "value" })).toBe(false);
      });

      it("reflects changes after additions and removals", () => {
        const set = new cls(3);
        set.add(1).add(2);
        expect(set.has(1)).toBe(true);
        set.delete(1);
        expect(set.has(1)).toBe(false);
      });

      it("reflects changes after overflow", () => {
        const set = new cls([1, 2, 3]);
        set.add(4).add(5);
        expect(set.has(1)).toBe(false);
        expect(set.has(2)).toBe(false);
        expect(set.has(3)).toBe(true);
        expect(set.has(4)).toBe(true);
        expect(set.has(5)).toBe(true);
      });
    });

    describe("keys()", () => {
      it("returns an empty iterator for an empty set", () => {
        const set = new cls();
        const keys = Array.from(set.keys());
        expect(keys).toEqual([]);
      });

      it("returns correct keys for a partially filled set", () => {
        const set = new cls(5);
        set.add(1).add(2).add(3);
        const keys = Array.from(set.keys());
        expect(keys).toEqual([1, 2, 3]);
      });

      it("returns correct keys for a full set", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        const keys = Array.from(set.keys());
        expect(keys).toEqual([1, 2, 3]);
      });

      it("returns no keys after clearing the set", () => {
        const set = new cls([1, 2, 3]);
        set.clear();
        expect(Array.from(set.keys())).toEqual([]);
      });

      it("returns sequential keys for a set that has wrapped around", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        set.add(4).add(5);
        const keys = Array.from(set.keys());
        expect(keys).toEqual([3, 4, 5]);
      });

      it("updates keys correctly after removing elements", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        set.delete(2);
        set.add(4);
        const keys = Array.from(set.keys());
        expect(keys).toEqual([1, 3, 4]);
      });

      it("updates keys correctly after removing all elements", () => {
        const set = new cls(2);
        set.add(1).add(2);
        set.delete(1);
        set.delete(2);
        expect(Array.from(set.keys())).toEqual([]);
        set.delete(1);
        expect(Array.from(set.keys())).toEqual([]);
      });

      it("returns correct keys after the set has been cleared and refilled", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        set.clear();
        set.add(4).add(5);
        const keys = Array.from(set.keys());
        expect(keys).toEqual([4, 5]);
      });

      it("should return a new iterator each time", () => {
        const map = new cls();
        map.add(1);
        const iterator1 = map.keys();
        const iterator2 = map.keys();
        iterator1.next();
        expect(iterator2.next().value).toBe(1);
      });
    });

    describe("values()", () => {
      it("returns an empty iterator for an empty set", () => {
        const set = new cls();
        const values = Array.from(set.values());
        expect(values).toEqual([]);
      });

      it("returns correct values for a partially filled set", () => {
        const set = new cls(5);
        set.add(1).add(2).add(3);
        const values = Array.from(set.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for a full set", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        const values = Array.from(set.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns no values after clearing the set", () => {
        const set = new cls([1, 2, 3]);
        set.clear();
        expect(Array.from(set.values())).toEqual([]);
      });

      it("maintains correct order of values after multiple deletions", () => {
        const set = new cls(5);
        set.add(1).add(2).add(3).add(4).add(5);
        set.delete(2);
        set.delete(4);
        const values = Array.from(set.values());
        expect(values).toEqual([1, 3, 5]);
      });

      it("returns correct values for a set that has wrapped around", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        set.add(4).add(5);
        const values = Array.from(set.values());
        expect(values).toEqual([3, 4, 5]);
      });

      it("returns correct values after the set has been cleared and refilled", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        set.clear();
        set.add(4).add(5);
        const values = Array.from(set.values());
        expect(values).toEqual([4, 5]);
      });

      it("iterates through values correctly even after increasing capacity", () => {
        const set = new cls(2);
        set.add(1).add(2);
        set.capacity = 4;
        expect(Array.from(set.values())).toEqual([1, 2]);
        set.add(3).add(4);
        expect(Array.from(set.values())).toEqual([1, 2, 3, 4]);
      });

      it("iterates through values correctly even after decreasing capacity", () => {
        const set = new cls(5);
        set.add(1).add(2).add(3).add(4).add(5);
        set.capacity = 3;
        expect(Array.from(set.values())).toEqual([3, 4, 5]);
        set.add(6).add(7);
        expect(Array.from(set.values())).toEqual([5, 6, 7]);
      });
    });

    describe("[Symbol.iterator]()", () => {
      it("returns an empty iterator for an empty set", () => {
        const set = new cls();
        const values = Array.from(set);
        expect(values).toEqual([]);
      });

      it("returns correct values for a partially filled set", () => {
        const set = new cls(5);
        set.add(1).add(2).add(3);
        const values = Array.from(set);
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for a full set", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        const values = Array.from(set);
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns no values after clearing the set", () => {
        const set = new cls([1, 2, 3]);
        set.clear();
        const values = Array.from(set);
        expect(values).toEqual([]);
      });

      it("maintains correct order of values after multiple deletions", () => {
        const set = new cls(5);
        set.add(1).add(2).add(3).add(4).add(5);
        set.delete(2);
        set.delete(4);
        const values = Array.from(set);
        expect(values).toEqual([1, 3, 5]);
      });

      it("returns correct values for a set that has wrapped around", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        set.add(4).add(5);
        const values = Array.from(set);
        expect(values).toEqual([3, 4, 5]);
      });

      it("returns correct values after the set has been cleared and refilled", () => {
        const set = new cls(3);
        set.add(1).add(2).add(3);
        set.clear();
        set.add(4).add(5);
        const values = Array.from(set);
        expect(values).toEqual([4, 5]);
      });

      it("iterates through values correctly even after increasing capacity", () => {
        const set = new cls(2);
        set.add(1).add(2);
        set.capacity = 4;
        expect(Array.from(set)).toEqual([1, 2]);
        set.add(3).add(4);
        expect(Array.from(set)).toEqual([1, 2, 3, 4]);
      });

      it("iterates through values correctly even after decreasing capacity", () => {
        const set = new cls(5);
        set.add(1).add(2).add(3).add(4).add(5);
        set.capacity = 3;
        expect(Array.from(set)).toEqual([3, 4, 5]);
        set.add(6).add(7);
        expect(Array.from(set)).toEqual([5, 6, 7]);
      });
    });
  });
}
