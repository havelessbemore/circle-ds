import { beforeEach, describe, expect, it, vi } from "vitest";

import { Constructor } from "../src/types/constructor";
import { SkipList, SkipListConfig } from "../src/std/skipList";
import { ARRAY_MAX_LENGTH } from "../src/utils/constants";

export function test(cls: Constructor<SkipList<unknown>>) {
  describe(cls.name, () => {
    let list: SkipList<number>;

    beforeEach(() => {
      list = new cls({ maxLevel: 4 }) as SkipList<number>;
      for (let i = 0; i < 10; ++i) {
        list.push(i);
      }
    });

    describe("constructor()", () => {
      it("accepts no parameters", () => {
        const obj = new cls();
        expect(obj.size).toEqual(0);
      });

      it("accepts an empty array", () => {
        const obj = new cls([]);
        expect(obj.size).toEqual(0);
        expect([...obj.values()]).toEqual([]);
      });

      it("accepts an element", () => {
        const list = new cls([1]);
        expect(list.size).toBe(1);
        expect(Array.from(list.values())).toEqual([1]);
      });

      it("does not directly use input array", () => {
        const arr = [1];
        const list = new cls(arr);
        arr[0] = 2;
        arr.push(3);
        expect(list.size).toEqual(1);
        expect(Array.from(list.values())).toEqual([1]);
      });

      it("accepts multiple elements", () => {
        const list = new cls([1, 2, 3]);
        expect(list.size).toBe(3);
        expect(Array.from(list.values())).toEqual([1, 2, 3]);
      });

      it("accepts repeated values", () => {
        const list = new cls([1, 1, 1, 1, 1]);
        expect(list.size).toBe(5);
        expect(Array.from(list.values())).toEqual([1, 1, 1, 1, 1]);
      });

      it("handles complex data types", () => {
        const list = new cls([{ a: 1 }, { b: 2 }]);
        expect(list.size).toBe(2);
        expect(Array.from(list.values())).toEqual([{ a: 1 }, { b: 2 }]);
      });

      it("accepts an iterable", () => {
        const list = new cls(new Set([1, 2, 3]));
        expect(list.size).toBe(3);
        expect(Array.from(list.values())).toEqual([1, 2, 3]);
      });

      it("accepts an empty config object", () => {
        const config: SkipListConfig = {};
        const list = new cls(config);
        expect(list.size).toBe(0);
      });

      it("accepts a custom maxLevel in the config object", () => {
        const config: SkipListConfig = { maxLevel: 2 };
        const list = new cls(config);
        expect(list.size).toBe(0);
        expect(list.maxLevel).toBe(2);
      });

      it("accepts a custom probability in the config object", () => {
        const config: SkipListConfig = { p: 0.2 };
        const list = new cls(config);
        expect(list.size).toBe(0);
        expect(list.p).toBe(0.2);
      });

      it("accepts an iterable and a config object", () => {
        const config: SkipListConfig = { maxLevel: 1, p: 0.2 };
        const list = new cls([1, 2, 3], config);
        expect(list.size).toBe(3);
        expect(list.maxLevel).toBe(1);
        expect(list.p).toBe(0.2);
      });
    });

    describe(".maxLevel", () => {
      let skipList: SkipList<unknown>;

      beforeEach(() => {
        skipList = new cls({ maxLevel: 4, p: 0.75 });
      });

      it("initial maxLevel is respected", () => {
        expect(skipList.maxLevel).toBe(4);
      });

      it("rejects values too low", () => {
        expect(() => (skipList.maxLevel = -1)).toThrow(RangeError);
        expect(() => (skipList.maxLevel = 0)).toThrow(RangeError);
      });

      it("rejects values too large", () => {
        expect(() => (skipList.maxLevel = ARRAY_MAX_LENGTH + 1)).toThrow(
          RangeError
        );
      });

      it("rejects fractional values", () => {
        expect(() => (skipList.maxLevel = 2.5)).toThrow(RangeError);
        expect(() => (skipList.maxLevel = 10.0001)).toThrow(RangeError);
      });

      it("accepts valid values", () => {
        expect(() => (skipList.maxLevel = 1)).not.toThrow();
        expect(() => (skipList.maxLevel = 100)).not.toThrow();
        expect(() => (skipList.maxLevel = ARRAY_MAX_LENGTH)).not.toThrow();
      });

      it("inserted nodes do not exceed initial maxLevel", () => {
        for (let i = 0; i < 100; ++i) {
          skipList.push(i);
        }
        expect(skipList.levels).toBeLessThanOrEqual(4);
      });

      it("changing maxLevel affects structure", () => {
        skipList.maxLevel = 6;
        expect(skipList.maxLevel).toBe(6);
        for (let i = 100; i < 200; ++i) {
          skipList.push(i);
        }
        expect(skipList.levels).toBeLessThanOrEqual(6);
      });

      it("reducing maxLevel removes excessive levels", () => {
        for (let i = 0; i < 100; ++i) {
          skipList.push(i);
        }
        skipList.maxLevel = 2;
        expect(skipList.maxLevel).toBe(2);
        expect(skipList.levels).toBeLessThanOrEqual(2);
      });
    });

    describe(".p", () => {
      let skipList: SkipList<unknown>;

      beforeEach(() => {
        skipList = new cls({ maxLevel: 4, p: 0.75 });
      });

      it("initial p is respected", () => {
        expect(skipList.p).toBe(0.75);
      });

      it("rejects values too low", () => {
        expect(() => (skipList.p = -1)).toThrow(RangeError);
        expect(() => (skipList.p = -0.1)).toThrow(RangeError);
        expect(() => (skipList.p = -0.001)).toThrow(RangeError);
      });

      it("rejects values too large", () => {
        expect(() => (skipList.p = 1.001)).toThrow(RangeError);
        expect(() => (skipList.p = 2)).toThrow(RangeError);
      });

      it("accepts valid values", () => {
        expect(() => (skipList.p = 0)).not.toThrow();
        expect(() => (skipList.p = 0.001)).not.toThrow();
        expect(() => (skipList.p = 0.5)).not.toThrow();
        expect(() => (skipList.p = 0.999)).not.toThrow();
        expect(() => (skipList.p = 1)).not.toThrow();
      });
    });

    describe("at()", () => {
      it("returns undefined if list is empty", () => {
        const list = new cls();
        expect(list.at(0)).toBeUndefined();
        expect(list.at(1)).toBeUndefined();
        expect(list.at(2)).toBeUndefined();
      });

      it("should return the correct element for valid positive indices", () => {
        expect(list.at(0)).toBe(0);
        expect(list.at(4)).toBe(4);
        expect(list.at(9)).toBe(9);
      });

      it("should return undefined for out-of-bounds positive indices", () => {
        expect(list.at(10)).toBeUndefined();
        expect(list.at(999)).toBeUndefined();
      });

      it("should return the correct element for valid negative indices", () => {
        expect(list.at(-1)).toBe(9);
        expect(list.at(-10)).toBe(0);
      });

      it("should return undefined for out-of-bounds negative indices", () => {
        expect(list.at(-11)).toBeUndefined();
        expect(list.at(-100)).toBeUndefined();
      });

      it("should handle non-integer indices by returning undefined", () => {
        expect(list.at(2.5)).toBeUndefined();
        expect(list.at(-2.5)).toBeUndefined();
      });

      it("should handle coercible non-numeric indices", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(list.at(null as any)).toBe(0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(list.at("5" as any)).toBe(5);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(list.at("-1" as any)).toBe(9);
      });

      it("should return undefined for non-numeric indices", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(list.at(undefined as any)).toBeUndefined();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(list.at("invalid" as any)).toBeUndefined();
      });

      it("should return the first element when index is 0", () => {
        expect(list.at(0)).toBe(0);
      });

      it("should return the last element when index is size - 1", () => {
        expect(list.at(list.size - 1)).toBe(9);
      });
    });

    describe("clear()", () => {
      it("clears an empty list correctly", () => {
        const list = new cls();
        expect(() => list.clear()).not.toThrow();
        expect(list.size).toBe(0);
        expect(Array.from(list)).toEqual([]);
      });

      it("should empty the skip list", () => {
        list.clear();
        expect(list.size).toBe(0);
        expect(Array.from(list)).toEqual([]);
      });

      it("after clear, at() should return undefined for any index", () => {
        list.clear();
        expect(list.at(0)).toBeUndefined();
        expect(list.at(-1)).toBeUndefined();
        expect(list.at(9)).toBeUndefined();
      });

      it("should not prevent adding new elements after clearing", () => {
        list.clear();
        list.push(100);
        expect(list.size).toBe(1);
        expect(list.at(0)).toBe(100);
        expect(Array.from(list)).toEqual([100]);
      });

      it("after clear, the skip list should be able to be repopulated", () => {
        list.clear();

        for (let i = 10; i < 20; i++) {
          list.push(i);
        }

        expect(list.size).toBe(10);
        for (let i = 0; i < 10; i++) {
          expect(list.at(i)).toBe(i + 10);
        }
        expect(Array.from(list)).toEqual([
          10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        ]);
      });

      it("Can be called repeatedly", () => {
        list.clear();
        expect(list.size).toBe(0);
        list.clear();
        expect(list.size).toBe(0);
        expect(Array.from(list.values())).toEqual([]);
        list.clear();
        expect(list.size).toBe(0);
        expect(Array.from(list.values())).toEqual([]);
        list.push(4);
        expect(list.size).toBe(1);
        expect(Array.from(list.values())).toEqual([4]);
      });
    });

    describe("delete()", () => {
      let skipList: SkipList<unknown>;

      beforeEach(() => {
        skipList = new cls({ maxLevel: 4 });
        skipList.push(1, 2, 3, 4, 5);
      });

      it("removes the element at a specific index", () => {
        expect(skipList.delete(2)).toBe(true);
        expect(skipList.size).toBe(4);
        expect(skipList.has(3)).toBe(false);
        expect(Array.from(skipList)).toEqual([1, 2, 4, 5]);
      });

      it("does not update the size when failed", () => {
        const size = skipList.size;
        skipList.delete(10);
        expect(skipList.size).toBe(size);
      });

      it("updates size when succeeded", () => {
        const size = skipList.size;
        skipList.delete(1);
        expect(skipList.size).toBe(size - 1);
      });

      it("removes the first element", () => {
        expect(skipList.delete(0)).toBe(true);
        expect(skipList.size).toBe(4);
        expect(Array.from(skipList)).toEqual([2, 3, 4, 5]);
      });

      it("removes last element", () => {
        expect(skipList.delete(skipList.size - 1)).toBe(true);
        expect(skipList.size).toBe(4);
        expect(Array.from(skipList)).toEqual([1, 2, 3, 4]);
      });

      it("returns false for index < -size", () => {
        expect(skipList.delete(-6)).toBe(false);
        expect(skipList.delete(-10)).toBe(false);
      });

      it("returns false for index >= size", () => {
        expect(skipList.delete(5)).toBe(false);
        expect(skipList.delete(10)).toBe(false);
      });

      it("wraps around for negative indices", () => {
        expect(skipList.delete(-1)).toBe(true);
        expect(skipList.has(5)).toBe(false);
        expect(skipList.delete(-4)).toBe(true);
        expect(skipList.has(1)).toBe(false);
      });

      it("maintains the skip list order", () => {
        skipList.delete(2);
        expect(Array.from(skipList)).toEqual([1, 2, 4, 5]);
      });

      it("sequential deletes reduce the skip list size correctly", () => {
        skipList.delete(1);
        expect(skipList.size).toBe(4);
        expect(skipList.has(2)).toBe(false);

        skipList.delete(1);
        expect(skipList.size).toBe(3);
        expect(skipList.has(3)).toBe(false);

        expect(Array.from(skipList)).toEqual([1, 4, 5]);
      });

      it("should remove empty levels as items are deleted", () => {
        skipList = new cls({ maxLevel: 5, p: 0.75 });
        const firsts = new Array(6).fill(0);

        let maxLevel = 0;
        for (let i = 0; i < 10; ++i) {
          skipList.push(i);
          if (skipList.levels > maxLevel) {
            firsts.fill(i, maxLevel + 1, skipList.levels);
            maxLevel = skipList.levels;
          }
        }

        for (let i = firsts[maxLevel]; i < 10; ++i) {
          skipList.delete(-1);
        }

        expect(skipList.levels).toBeLessThan(maxLevel);
      });
    });

    describe("entries()", () => {
      let list5: SkipList<number>;

      beforeEach(() => {
        list5 = new cls({ maxLevel: 4 }) as SkipList<number>;
        for (let i = 0; i < 5; i++) {
          list5.push(i);
        }
      });

      it("returns no entries for an empty list", () => {
        const list = new cls();
        const entries = Array.from(list.entries());
        expect(entries).toEqual([]);
      });

      it("should return an iterator of all key-value pairs in order", () => {
        const entries = Array.from(list5.entries());
        expect(entries).toEqual([
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
        ]);
      });

      it("entries() should support iteration with for...of", () => {
        const expectedEntries = [
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
        ];
        let index = 0;
        for (const entry of list5.entries()) {
          expect(entry).toEqual(expectedEntries[index]);
          index++;
        }
        expect(index).toBe(expectedEntries.length);
      });

      it("should reflect changes to the skip list", () => {
        list5.push(5);
        const entriesAfterInsertion = Array.from(list5.entries());
        expect(entriesAfterInsertion).toContainEqual([5, 5]);

        list5.clear();
        list5.push(10);
        const entriesAfterClearAndInsert = Array.from(list5.entries());
        expect(entriesAfterClearAndInsert).toEqual([[0, 10]]);
      });

      it("should reflect changes after shift", () => {
        list5.shift();
        expect(Array.from(list5.entries())).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
        ]);
      });

      it("should reflect changes after pop", () => {
        list5.pop();
        expect(Array.from(list5.entries())).toEqual([
          [0, 0],
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
      });
    });

    describe("fill()", () => {
      let list: SkipList<unknown>;

      beforeEach(() => {
        list = new cls();
        list.push(1, 2, 3, 4, 5);
      });

      it("updates all values when start and end are undefined", () => {
        list.fill(0);
        expect(Array.from(list)).toEqual([0, 0, 0, 0, 0]);
      });

      it("updates values in a specified range", () => {
        list.fill(1, 1, 3);
        expect(Array.from(list)).toEqual([1, 1, 1, 4, 5]);
      });

      it("handles negative start and end indices", () => {
        list.fill(2, -4, -2);
        expect(Array.from(list)).toEqual([1, 2, 2, 4, 5]);
      });

      it("adjusts start and end indices beyond list bounds to valid range", () => {
        list.fill(3, -10, 10);
        expect(Array.from(list)).toEqual([3, 3, 3, 3, 3]);
      });

      it("does nothing if start equals end", () => {
        const original = Array.from(list);
        list.fill(4, 2, 2);
        expect(Array.from(list)).toEqual(original);
      });

      it("does nothing if start is greater than end", () => {
        const original = Array.from(list);
        list.fill(4, 3, 2);
        expect(Array.from(list)).toEqual(original);
      });

      it("works correctly when end is undefined", () => {
        list.fill(5, 3);
        expect(Array.from(list)).toEqual([1, 2, 3, 5, 5]);
      });

      it("fills the entire list when start is negative and exceeds list size", () => {
        list.fill(6, -6);
        expect(Array.from(list)).toEqual([6, 6, 6, 6, 6]);
      });

      it("maintains the list size", () => {
        const originalSize = list.size;
        list.fill(7, 1, 4);
        expect(list.size).toBe(originalSize);
      });
    });

    describe("forEach()", () => {
      let list5: SkipList<number>;

      beforeEach(() => {
        list5 = new cls({ maxLevel: 4 }) as SkipList<number>;
        for (let i = 0; i < 5; i++) {
          list5.push(i);
        }
      });

      it("does not call the callback for an empty list", () => {
        const list = new cls();
        const mockCallback = vi.fn();
        list.forEach(mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
      });

      it("should execute the callback for each element", () => {
        const mockCallback = vi.fn();
        list5.forEach(mockCallback);

        expect(mockCallback.mock.calls.length).toBe(5);
        for (let i = 0; i < 5; ++i) {
          expect(mockCallback.mock.calls[i][0]).toBe(i); // Check the value
          expect(mockCallback.mock.calls[i][1]).toBe(i); // Check the index
          expect(mockCallback.mock.calls[i][2]).toBe(list5); // Check the reference
        }
      });

      it("should bind the correct thisArg", () => {
        const context = { multiplier: 2 };
        const mockCallback = vi.fn(function (this: typeof context, value) {
          return value * this.multiplier;
        });
        list.forEach(mockCallback, context);
        for (let i = 0; i < 5; i++) {
          expect(mockCallback.mock.instances[i]).toBe(context);
        }
      });

      it("forEach should execute the callback in ascending order", () => {
        const values: number[] = [];
        const indices: number[] = [];
        list5.forEach((value, index) => {
          values.push(value);
          indices.push(index);
        });
        expect(values).toEqual([0, 1, 2, 3, 4]);
        expect(indices).toEqual([0, 1, 2, 3, 4]);
      });

      it("works correctly after removing and adding elements", () => {
        const list = new cls() as SkipList<number>;
        list.push(1, 2, 3);
        list.shift();
        list.push(4);
        const results: number[] = [];
        list.forEach(value => results.push(value + 1));
        expect(results).toEqual([3, 4, 5]);
      });

      it("maintains the correct order of elements", () => {
        const list = new cls() as SkipList<number>;
        list.push(3, 2, 1);
        list.shift();
        list.push(4);
        const results: number[] = [];
        list.forEach(value => results.push(value));
        expect(results).toEqual([2, 1, 4]);
      });
    });

    describe("has()", () => {
      let skipList: SkipList<number>;

      beforeEach(() => {
        skipList = new cls({ maxLevel: 4 }) as SkipList<number>;
        skipList.push(2, 3, 5, 7, 11, 13, 17);
      });

      it("returns false for any element when the list is empty", () => {
        const list = new cls();
        expect(list.has(1)).toBe(false);
      });

      it("returns true for existing values", () => {
        expect(skipList.has(3)).toBe(true);
        expect(skipList.has(7)).toBe(true);
        expect(skipList.has(13)).toBe(true);
      });

      it("returns false for non-existing values", () => {
        expect(skipList.has(4)).toBe(false);
        expect(skipList.has(6)).toBe(false);
        expect(skipList.has(0)).toBe(false);
      });

      it("handles values added after initial population", () => {
        expect(skipList.has(19)).toBe(false);
        skipList.push(19);
        expect(skipList.has(19)).toBe(true);
      });

      it("has() remains accurate after values are removed", () => {
        skipList.push(23);
        expect(skipList.has(23)).toBe(true);
        skipList.pop();
        expect(skipList.has(23)).toBe(false);
      });

      it("has() works correctly at the boundaries of the skip list", () => {
        expect(skipList.has(2)).toBe(true);
        expect(skipList.has(17)).toBe(true);
      });

      it("has() correctly identifies the presence of multiple consecutive values", () => {
        const primes = [19, 23, 29, 31];
        skipList.push(...primes);
        primes.forEach(n => {
          expect(skipList.has(n)).toBe(true);
        });
      });

      it("handles primitive data types correctly", () => {
        const list = new cls([1, "b", 3n, true, false]);
        expect(list.has(1)).toBe(true);
        expect(list.has("b")).toBe(true);
        expect(list.has(3n)).toBe(true);
        expect(list.has(true)).toBe(true);
        expect(list.has(false)).toBe(true);
      });

      it("accurately identifies repeated values", () => {
        const list = new cls([1, 2, 2, 3, 1]);
        expect(list.has(2)).toBe(true);
        expect(list.has(4)).toBe(false);
      });

      it("returns false for any element after clearing the list", () => {
        const list = new cls([1, 2, 3]);
        list.clear();
        expect(list.has(1)).toBe(false);
        expect(list.has(2)).toBe(false);
        expect(list.has(3)).toBe(false);
      });

      it("handles non-primitive data types correctly", () => {
        const value = { key: "value" };
        const list = new cls([3, value]);
        expect(list.has(value)).toBe(true);
        expect(list.has({ key: "value" })).toBe(false);
      });

      it("reflects changes after additions and removals", () => {
        const list = new cls();
        list.push(1, 2);
        expect(list.has(1)).toBe(true);
        list.shift();
        expect(list.has(1)).toBe(false);
      });
    });

    describe("keys()", () => {
      let skipList: SkipList<number>;

      beforeEach(() => {
        skipList = new cls({ maxLevel: 4 }) as SkipList<number>;
        skipList.push(10, 20, 30, 40, 50);
      });

      it("returns an empty iterator for an empty list", () => {
        const list = new cls();
        const keys = Array.from(list.keys());
        expect(keys).toEqual([]);
      });

      it("returns an iterator of all indices in order", () => {
        const keys = Array.from(skipList.keys());
        expect(keys).toEqual([0, 1, 2, 3, 4]);
      });

      it("returns no keys after clearing the list", () => {
        skipList.clear();
        expect(Array.from(skipList.keys())).toEqual([]);
      });

      it("should reflect changes to the skip list", () => {
        skipList.push(60);
        const keysAfterInsertion = Array.from(skipList.keys());
        expect(keysAfterInsertion).toEqual([0, 1, 2, 3, 4, 5]);

        skipList.clear();
        skipList.push(70);
        const keysAfterClearAndInsert = Array.from(skipList.keys());
        expect(keysAfterClearAndInsert).toEqual([0]);
      });

      it("should support iteration with for...of", () => {
        const expectedKeys = [0, 1, 2, 3, 4];
        let index = 0;
        for (const key of skipList.keys()) {
          expect(key).toBe(expectedKeys[index]);
          index++;
        }
        expect(index).toBe(expectedKeys.length);
      });

      it("updates keys correctly after shift", () => {
        const list = new cls();
        list.push(1, 2, 3);
        list.shift();
        list.push(4);
        const keys = Array.from(list.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("update keys after pops", () => {
        skipList.pop();
        skipList.pop();
        const keysAfterRemovals = Array.from(skipList.keys());
        expect(keysAfterRemovals).toEqual([0, 1, 2]);
      });

      it("updates keys correctly after removing all elements", () => {
        const list = new cls();
        list.push(1, 2);
        list.shift();
        list.shift();
        expect(Array.from(list.keys())).toEqual([]);
        list.pop();
        expect(Array.from(list.keys())).toEqual([]);
      });

      it("returns correct keys after the list has been cleared and refilled", () => {
        const list = new cls();
        list.push(1, 2, 3);
        list.clear();
        list.push(4, 5);
        const keys = Array.from(list.keys());
        expect(keys).toEqual([0, 1]);
      });
    });

    describe("pop()", () => {
      let skipList: SkipList<number>;

      beforeEach(() => {
        skipList = new cls({ maxLevel: 4 }) as SkipList<number>;
        skipList.push(5, 10, 15, 20, 25);
      });

      it("returns undefined for an empty list", () => {
        const list = new cls();
        expect(list.pop()).toBeUndefined();
        expect(list.size).toBe(0);
        expect(Array.from(list.values())).toEqual([]);
      });

      it("removes and returns the last element", () => {
        expect(skipList.pop()).toBe(25);
        expect(skipList.size).toBe(4);
      });

      it("updates the skip list correctly after multiple pops", () => {
        for (let i = 5; i > 0; --i) {
          expect(skipList.pop()).toBe(5 * i);
          expect(skipList.size).toBe(i - 1);
        }
        expect(skipList.pop()).toBeUndefined();
      });
    });

    describe("push()", () => {
      it("accepts zero elements", () => {
        const list = new cls();
        expect(list.push()).toEqual(0);
        expect(list.size).toEqual(0);
        expect(Array.from(list)).toEqual([]);
      });

      it("adds an element to an empty list", () => {
        const list = new cls();
        expect(list.push(1)).toEqual(1);
        expect(list.size).toBe(1);
        expect(Array.from(list.values())).toEqual([1]);
      });

      it("correctly updates the skip list size", () => {
        const list = new cls();
        list.push(5);
        list.push(10);
        expect(list.size).toBe(2);
      });

      it("adds multiple elements to an empty list", () => {
        const list = new cls();
        expect(list.push(1, 2, 3)).toEqual(3);
        expect(list.size).toBe(3);
        expect(Array.from(list.values())).toEqual([1, 2, 3]);
      });

      it("allows adding duplicate values", () => {
        const list = new cls();
        list.push(10);
        list.push(10);
        expect(Array.from(list)).toEqual([10, 10]);
        expect(list.size).toBe(2);
      });

      it("works with multiple data types", () => {
        const list = new cls();
        list.push(10);
        list.push("20");
        list.push({ foo: "bar" });
        expect(Array.from(list)).toEqual([10, "20", { foo: "bar" }]);
        expect(list.size).toBe(3);
      });

      it("sequential push() calls increase size linearly", () => {
        const list = new cls();
        for (let i = 1; i <= 5; i++) {
          list.push(i * 10);
          expect(list.size).toBe(i);
        }
      });
    });

    describe("set()", () => {
      let list: SkipList<unknown>;

      beforeEach(() => {
        list = new cls({ maxLevel: 4 });
        list.push(1, 2, 3, 4, 5);
      });

      it("updates the value at a specific index", () => {
        expect(list.set(2, 99)).toBe(3);
        expect(list.at(2)).toBe(99);
      });

      it("returns undefined for index < -size", () => {
        expect(list.set(-6, 100)).toBe(undefined);
        expect(list.set(-10, 100)).toBe(undefined);
      });

      it("returns undefined for index >= size", () => {
        expect(list.set(5, 100)).toBe(undefined);
        expect(list.set(10, 100)).toBe(undefined);
      });

      it("wraps around for negative indices", () => {
        expect(list.set(-1, 99)).toBe(5);
        expect(list.at(-1)).toBe(99);
        expect(list.set(-5, 101)).toBe(1);
        expect(list.at(-5)).toBe(101);
      });

      it("does not change the size of the skip list", () => {
        const initialSize = list.size;
        list.set(1, 98);
        expect(list.size).toBe(initialSize);
      });

      it("allows updating the first and last elements", () => {
        expect(list.set(0, 101)).toBe(1);
        expect(list.set(list.size - 1, 105)).toBe(5);
        expect(list.at(0)).toBe(101);
        expect(list.at(list.size - 1)).toBe(105);
      });

      it("maintains the skip list order", () => {
        list.set(2, 50);
        expect(Array.from(list)).toEqual([1, 2, 50, 4, 5]);
      });
    });

    describe("shift()", () => {
      let skipList: SkipList<number>;

      beforeEach(() => {
        skipList = new cls({ maxLevel: 4 }) as SkipList<number>;
        skipList.push(5, 10, 15, 20, 25);
      });

      it("returns undefined from an empty list", () => {
        const list = new cls();
        expect(list.shift()).toBeUndefined();
        expect(list.shift()).toBeUndefined();
        expect(list.size).toBe(0);
      });

      it("removes and returns the first element", () => {
        const firstElement = skipList.shift();
        expect(firstElement).toBe(5);
        expect(skipList.size).toBe(4);
      });

      it("updates the skip list correctly after multiple shifts", () => {
        for (let i = 1; i <= 5; ++i) {
          expect(skipList.shift()).toBe(5 * i);
          expect(skipList.size).toBe(5 - i);
        }
        expect(skipList.shift()).toBeUndefined();
        expect(skipList.size).toBe(0);
      });

      it("returns undefined after clear", () => {
        skipList.clear();
        expect(skipList.shift()).toBeUndefined();
        expect(skipList.size).toBe(0);
      });
    });

    describe("slice()", () => {
      let list: SkipList<unknown>;

      beforeEach(() => {
        list = new cls();
        list.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      });

      it("on an empty list returns an empty list", () => {
        const list = new cls();
        const sliced = list.slice(0, 1);
        expect(Array.from(sliced)).toEqual([]);
      });

      it("does not modify the original list", () => {
        list.slice(2, 5);
        expect(list.size).toEqual(10);
      });

      it("extracts the correct segment", () => {
        const sliced = list.slice(3, 7);
        expect(Array.from(sliced)).toEqual([3, 4, 5, 6]);
      });

      it("extracts full list if no parameters", () => {
        const list = new cls();
        const sliced = list.slice();
        expect(Array.from(sliced)).toEqual(Array.from(list));
      });

      it("with no end parameter extracts until the end of the list", () => {
        const sliced = list.slice(5);
        expect(Array.from(sliced)).toEqual([5, 6, 7, 8, 9]);
      });

      it("with negative start and end extracts the correct segment", () => {
        const sliced = list.slice(-7, -3);
        expect(Array.from(sliced)).toEqual([3, 4, 5, 6]);
      });

      it("with start greater than end returns an empty list", () => {
        const sliced = list.slice(7, 3);
        expect(Array.from(sliced)).toEqual([]);
      });

      it("with start equal to end returns an empty list", () => {
        const sliced = list.slice(5, 5);
        expect(Array.from(sliced)).toEqual([]);
      });

      it("with out-of-bounds start or end adjusts to valid range", () => {
        let sliced = list.slice(-15, 3);
        expect(Array.from(sliced)).toEqual([0, 1, 2]);
        sliced = list.slice(7, 15);
        expect(Array.from(sliced)).toEqual([7, 8, 9]);
      });
    });

    describe("splice()", () => {
      let list: SkipList<unknown>;

      beforeEach(() => {
        list = new cls({ maxLevel: 4 });
        list.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
      });

      it("on an empty list returns an empty array", () => {
        const list = new cls();
        const removed = list.splice(0, 1);
        expect(Array.from(removed)).toEqual([]);
        expect(list.size).toBe(0);
      });

      it("removes the correct elements and returns them", () => {
        const removed = list.splice(3, 2);
        expect(Array.from(removed)).toEqual([4, 5]);
        expect(Array.from(list)).toEqual([1, 2, 3, 6, 7, 8, 9, 10]);
      });

      it("with deleteCount greater than elements remaining removes only available elements", () => {
        const removed = list.splice(8, 5);
        expect(Array.from(removed)).toEqual([9, 10]);
        expect(Array.from(list)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
      });

      it("with no deleteCount removes no elements", () => {
        const removed = list.splice(5);
        expect(Array.from(removed)).toEqual([]);
        expect(Array.from(list)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });

      it("with zero deleteCount removes no elements", () => {
        const removed = list.splice(5, 0);
        expect(Array.from(removed)).toEqual([]);
        expect(Array.from(list)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });

      it("returns an empty list if start is out of bounds", () => {
        const removed = list.splice(15, 1);
        expect(Array.from(removed)).toEqual([]);
        expect(Array.from(list)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      });

      it("sequential calls remove elements correctly", () => {
        list.splice(1, 1);
        list.splice(2, 2);
        expect(list.size).toBe(7);
        expect(Array.from(list)).toEqual([1, 3, 6, 7, 8, 9, 10]);
      });

      it("inserts multiple items without specifying deleteCount", () => {
        list.splice(3, undefined, 20, 21);
        expect(Array.from(list)).toEqual([
          1, 2, 3, 20, 21, 4, 5, 6, 7, 8, 9, 10,
        ]);
        expect(list.size).toBe(12);
      });

      it("inserts new items at the specified start index without deletion", () => {
        list.splice(2, 0, 6, 7);
        expect(Array.from(list)).toEqual([1, 2, 6, 7, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(list.size).toBe(12);
      });

      it("inserts new items at the start of the list", () => {
        list.splice(0, 0, 8, 9);
        expect(Array.from(list)).toEqual([8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(list.size).toBe(12);
      });

      it("inserts new items at the end of the list", () => {
        list.splice(list.size, 0, 11, 12);
        expect(Array.from(list)).toEqual([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        ]);
        expect(list.size).toBe(12);
      });

      it("handles negative start index for insertion", () => {
        list.splice(-3, 0, 11, 12);
        expect(Array.from(list)).toEqual([
          1, 2, 3, 4, 5, 6, 7, 11, 12, 8, 9, 10,
        ]);
        expect(list.size).toBe(12);
      });

      it("adjusts start index beyond list size to list end for insertion", () => {
        list.splice(10, 0, 14, 15);
        expect(Array.from(list)).toEqual([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15,
        ]);
        expect(list.size).toBe(12);
      });

      it("inserts items when start index is negative and beyond list size", () => {
        list.splice(-10, 0, 14, 15);
        expect(Array.from(list)).toEqual([
          14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        ]);
        expect(list.size).toBe(12);
      });

      it("maintains list integrity with simultaneous deletion and insertion", () => {
        list.splice(2, 2, 18, 19);
        expect(Array.from(list)).toEqual([1, 2, 18, 19, 5, 6, 7, 8, 9, 10]);
        expect(list.size).toBe(10);
      });

      it("maintains list integrity with more deletions than insertion", () => {
        list.splice(2, 5, 18, 19);
        expect(Array.from(list)).toEqual([1, 2, 18, 19, 8, 9, 10]);
        expect(list.size).toBe(7);
      });

      it("maintains list integrity with less deletions than insertion", () => {
        list.splice(2, 2, 18, 19, 20, 21);
        expect(Array.from(list)).toEqual([
          1, 2, 18, 19, 20, 21, 5, 6, 7, 8, 9, 10,
        ]);
        expect(list.size).toBe(12);
      });

      it("can insert items when deleting until end of list", () => {
        list.splice(4, 100, 11, 12);
        expect(Array.from(list)).toEqual([1, 2, 3, 4, 11, 12]);
        expect(list.size).toBe(6);
      });

      it("can insert items when deleting entire list", () => {
        list.splice(0, 100, 3, 2, 1);
        expect(Array.from(list)).toEqual([3, 2, 1]);
        expect(list.size).toBe(3);
      });
    });

    describe("unshift()", () => {
      let skipList: SkipList<number>;

      beforeEach(() => {
        skipList = new cls({ maxLevel: 4 }) as SkipList<number>;
      });

      it("accepts zero elements", () => {
        expect(skipList.unshift()).toEqual(0);
        expect(skipList.size).toEqual(0);
        expect(Array.from(skipList)).toEqual([]);
      });

      it("prepends an element to an empty list", () => {
        expect(skipList.unshift(1)).toEqual(1);
        expect(skipList.size).toBe(1);
        expect(Array.from(skipList.values())).toEqual([1]);
      });

      it("should return the new size of the list", () => {
        expect(skipList.unshift(1, 2, 3)).toBe(3);
      });

      it("correctly updates the size", () => {
        skipList.unshift(40);
        skipList.unshift(50);
        expect(skipList.size).toBe(2);
      });

      it("allows adding duplicate values", () => {
        skipList.unshift(60);
        skipList.unshift(60);
        const values = Array.from(skipList);
        expect(values).toEqual([60, 60]);
        expect(skipList.size).toBe(2);
      });

      it("sequential calls increase size linearly", () => {
        const values = [5, 15, 25, 35, 45];
        values.forEach((value, idx) => {
          skipList.unshift(value);
          expect(skipList.size).toBe(idx + 1);
        });
        expect(Array.from(skipList)).toEqual(values.reverse());
      });

      it("prepends multiple elements to an empty list", () => {
        expect(skipList.unshift(1, 2, 3)).toEqual(3);
        expect(skipList.size).toBe(3);
        expect(Array.from(skipList.values())).toEqual([1, 2, 3]);
      });

      it("prepends elements to a filled list", () => {
        skipList.push(1, 2);
        expect(skipList.unshift(3, 4)).toEqual(4);
        expect(skipList.size).toBe(4);
        expect(Array.from(skipList.values())).toEqual([3, 4, 1, 2]);
      });
    });

    describe("values()", () => {
      it("returns an empty iterator for an empty list", () => {
        const list = new cls();
        const values = Array.from(list.values());
        expect(values).toEqual([]);
      });

      it("returns correct values for a filled list", () => {
        const list = new cls([1, 2, 3]);
        const values = Array.from(list.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for pushed values", () => {
        const list = new cls();
        list.push(1, 2, 3);
        const values = Array.from(list.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for unshifted values", () => {
        const list = new cls();
        list.unshift(1, 2, 3);
        const values = Array.from(list.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values after pop", () => {
        const list = new cls([1, 2, 3]);
        list.pop();
        const values = Array.from(list.values());
        expect(values).toEqual([1, 2]);
      });

      it("returns correct values after shift", () => {
        const list = new cls([1, 2, 3]);
        list.shift();
        const values = Array.from(list.values());
        expect(values).toEqual([2, 3]);
      });

      it("returns no values after clearing the list", () => {
        const list = new cls([1, 2, 3]);
        list.clear();
        expect(Array.from(list.values())).toEqual([]);
      });

      it("returns correct values after the list has been cleared and refilled", () => {
        const list = new cls();
        list.push(1, 2, 3);
        list.clear();
        list.push(4, 5);
        const values = Array.from(list.values());
        expect(values).toEqual([4, 5]);
      });
    });

    describe("[Symbol.iterator]()", () => {
      it("returns an empty iterator for an empty list", () => {
        const list = new cls();
        const values = Array.from(list.values());
        expect(values).toEqual([]);
      });

      it("returns correct values for a filled list", () => {
        const list = new cls([1, 2, 3]);
        const values = Array.from(list.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for pushed values", () => {
        const list = new cls();
        list.push(1, 2, 3);
        const values = Array.from(list.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values for unshifted values", () => {
        const list = new cls();
        list.unshift(1, 2, 3);
        const values = Array.from(list.values());
        expect(values).toEqual([1, 2, 3]);
      });

      it("returns correct values after pop", () => {
        const list = new cls([1, 2, 3]);
        list.pop();
        const values = Array.from(list.values());
        expect(values).toEqual([1, 2]);
      });

      it("returns correct values after shift", () => {
        const list = new cls([1, 2, 3]);
        list.shift();
        const values = Array.from(list.values());
        expect(values).toEqual([2, 3]);
      });

      it("returns no values after clearing the list", () => {
        const list = new cls([1, 2, 3]);
        list.clear();
        expect(Array.from(list.values())).toEqual([]);
      });

      it("returns correct values after the list has been cleared and refilled", () => {
        const list = new cls();
        list.push(1, 2, 3);
        list.clear();
        list.push(4, 5);
        const values = Array.from(list.values());
        expect(values).toEqual([4, 5]);
      });
    });
  });
}
