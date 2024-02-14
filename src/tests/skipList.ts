import { describe, expect, it, vi } from "vitest";

import { Constructor } from "../types/constructor";
import { SkipList, SkipListConfig } from "../standard/skipList";

export function test(cls: Constructor<SkipList<unknown>>) {
  describe(cls.name, () => {
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

    describe("at()", () => {
      it("returns undefined if list is empty", () => {
        const list = new cls();
        expect(list.at(0)).toBeUndefined();
        expect(list.at(1)).toBeUndefined();
        expect(list.at(2)).toBeUndefined();
      });

      it("returns undefined if accessing beyond list", () => {
        const list = new cls([1, 2, 3]);
        expect(list.at(3)).toBeUndefined();
        expect(list.at(4)).toBeUndefined();
      });

      it("returns correct first value", () => {
        const list = new cls([1, 2, 3]);
        expect(list.at(0)).toBe(1);
      });

      it("returns correct last value", () => {
        const list = new cls([1, 2, 3]);
        expect(list.at(2)).toBe(3);
      });

      it("Wraps around for negative inputs", () => {
        const list = new cls([1, 2, 3]);
        expect(list.at(-1)).toBe(3);
        expect(list.at(-2)).toBe(2);
        expect(list.at(-3)).toBe(1);
      });

      it("returns undefined if negative input too small", () => {
        const list = new cls([1, 2, 3]);
        expect(list.at(-4)).toBeUndefined();
        expect(list.at(-5)).toBeUndefined();
      });
    });

    describe("clear()", () => {
      it("clears an empty list correctly", () => {
        const list = new cls();
        expect(() => list.clear()).not.toThrow();
        expect(list.size).toBe(0);
        expect(Array.from(list)).toEqual([]);
      });

      it("clears a filled list correctly", () => {
        const list = new cls([1, 2, 3, 4, 5]);
        expect(list.size).toBe(5);
        list.clear();
        expect(list.size).toBe(0);
        expect(Array.from(list)).toEqual([]);
      });

      it("allows adding elements after clearing", () => {
        const list = new cls([1, 2, 3]);
        list.clear();
        expect(list.size).toBe(0);
        expect(Array.from(list.values())).toEqual([]);
        list.push(4);
        expect(list.size).toBe(1);
        expect(Array.from(list.values())).toEqual([4]);
      });

      it("Can be called repeatedly", () => {
        const list = new cls([1, 2, 3, 4, 5]);
        expect(list.size).toBe(5);
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

    describe("entries()", () => {
      it("returns no entries for an empty list", () => {
        const list = new cls();
        const entries = Array.from(list.entries());
        expect(entries.length).toBe(0);
      });

      it("returns correct entries for a partially filled list", () => {
        const list = new cls();
        list.push(1, 2, 3);
        const entries = Array.from(list.entries());
        expect(entries).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("returns correct entries for a full list", () => {
        const list = new cls();
        list.push(1, 2, 3);
        const entries = Array.from(list.entries());
        expect(entries).toEqual([
          [0, 1],
          [1, 2],
          [2, 3],
        ]);
      });

      it("returns correct entries after removing an element", () => {
        const list = new cls();
        list.push(1, 2, 3);
        list.shift();
        expect(Array.from(list.entries())).toEqual([
          [0, 2],
          [1, 3],
        ]);
      });
    });

    describe("forEach()", () => {
      it("does not call the callback for an empty list", () => {
        const list = new cls();
        const mockCallback = vi.fn();
        list.forEach(mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
      });

      it("calls the callback for each element in a list", () => {
        const list = new cls();
        list.push(1, 2, 3);
        const mockCallback = vi.fn();
        list.forEach(mockCallback);
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, list);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, list);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 2, list);
      });

      it("uses the provided thisArg for the callback", () => {
        const list = new cls([1, 2, 3]);
        const context = { multiplier: 2 };
        const mockCallback = vi.fn(function (this: typeof context, value) {
          return value * this.multiplier;
        });
        list.forEach(mockCallback, context);
        expect(mockCallback.mock.instances[0]).toBe(context);
      });

      it("correctly handles callback logic for a full list", () => {
        const list = new cls() as SkipList<number>;
        list.push(1, 2, 3);
        const results: number[] = [];
        list.forEach(value => {
          results.push(value * 2);
        });
        expect(results).toEqual([2, 4, 6]);
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

      it("provides the correct index and list reference to the callback", () => {
        const list = new cls();
        list.push(10, 20, 30);
        const mockCallback = vi.fn();
        list.forEach(mockCallback);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 10, 0, list);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 20, 1, list);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 30, 2, list);
      });
    });

    describe("has()", () => {
      it("returns false for any element when the list is empty", () => {
        const list = new cls();
        expect(list.has(1)).toBe(false);
      });

      it("returns true for an element present in the list", () => {
        const list = new cls([1, 2, 3]);
        expect(list.has(2)).toBe(true);
      });

      it("returns false for an element not present in the list", () => {
        const list = new cls([1, 2, 3]);
        expect(list.has(4)).toBe(false);
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
      it("returns an empty iterator for an empty list", () => {
        const list = new cls();
        const keys = Array.from(list.keys());
        expect(keys).toEqual([]);
      });

      it("returns correct keys for a filled list", () => {
        const list = new cls();
        list.push(1, 2, 3);
        const keys = Array.from(list.keys());
        expect(keys).toEqual([0, 1, 2]);
      });

      it("returns no keys after clearing the list", () => {
        const list = new cls([1, 2, 3]);
        list.clear();
        expect(Array.from(list.keys())).toEqual([]);
      });

      it("updates keys correctly after removing elements", () => {
        const list = new cls();
        list.push(1, 2, 3);
        list.shift();
        list.push(4);
        const keys = Array.from(list.keys());
        expect(keys).toEqual([0, 1, 2]);
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

    describe("push()", () => {
      it("accepts zero elements", () => {
        const inst = new cls();
        expect(inst.push()).toEqual(0);
        expect(inst.size).toEqual(0);
        expect(Array.from(inst)).toEqual([]);
      });

      it("adds an element to an empty list", () => {
        const list = new cls();
        expect(list.push(1)).toEqual(1);
        expect(list.size).toBe(1);
        expect(Array.from(list.values())).toEqual([1]);
      });

      it("adds multiple elements to an empty list", () => {
        const list = new cls();
        expect(list.push(1, 2, 3)).toEqual(3);
        expect(list.size).toBe(3);
        expect(Array.from(list.values())).toEqual([1, 2, 3]);
      });

      it("adds multiple elements to a filled list", () => {
        const list = new cls();
        expect(list.push(1, 2)).toEqual(2);
        expect(list.size).toBe(2);
        expect(Array.from(list.values())).toEqual([1, 2]);
        expect(list.push(3, 4)).toEqual(4);
        expect(list.size).toBe(4);
        expect(Array.from(list.values())).toEqual([1, 2, 3, 4]);
      });
    });

    describe("shift()", () => {
      it("returns undefined from an empty list", () => {
        const list = new cls();
        expect(list.shift()).toBeUndefined();
      });

      it("removes and returns the first element a filled list", () => {
        const list = new cls();
        list.push(1, 2, 3);
        expect(list.shift()).toBe(1);
        expect(list.size).toBe(2);
      });

      it("maintains correct order after multiple shifts", () => {
        const list = new cls();
        list.push(1, 2, 3, 4, 5);
        expect(list.shift()).toBe(1);
        expect(list.shift()).toBe(2);
        expect(list.shift()).toBe(3);
        expect(list.size).toBe(2);
      });

      it("returns undefined after shifting all elements", () => {
        const list = new cls();
        list.push(1, 2);
        list.shift();
        list.shift();
        expect(list.shift()).toBeUndefined();
        expect(list.shift()).toBeUndefined();
        expect(list.size).toBe(0);
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

    describe("unshift()", () => {
      it("accepts zero elements", () => {
        const list = new cls();
        expect(list.unshift()).toEqual(0);
        expect(list.size).toEqual(0);
        expect(Array.from(list)).toEqual([]);
        list.push(1, 2, 3);
        expect(list.unshift()).toBe(3);
        expect(list.size).toBe(3);
      });

      it("prepends an element to an empty list", () => {
        const list = new cls();
        expect(list.unshift(1)).toEqual(1);
        expect(list.size).toBe(1);
        expect(Array.from(list.values())).toEqual([1]);
      });

      it("prepends multiple elements to an empty list", () => {
        const list = new cls();
        expect(list.unshift(1, 2, 3)).toEqual(3);
        expect(list.size).toBe(3);
        expect(Array.from(list.values())).toEqual([1, 2, 3]);
      });

      it("should return the new size of the list after unshifting", () => {
        const list = new cls();
        expect(list.unshift(1, 2, 3)).toBe(3);
      });

      it("prepends multiple elements to a partially filled list", () => {
        const list = new cls();
        list.push(1, 2);
        expect(list.unshift(3, 4)).toEqual(4);
        expect(list.size).toBe(4);
        expect(Array.from(list.values())).toEqual([3, 4, 1, 2]);
      });
    });
  });
}
