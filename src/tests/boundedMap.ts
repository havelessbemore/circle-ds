import { describe, expect, it, vi } from "vitest";

import { Bounded } from "../types/bounded";
import { BoundedEvent } from "../types/boundedEvent";
import { Constructor } from "../types/constructor";

type BoundedMap<K, V> = Map<K, V> & Bounded<[K, V]>;

export function test(cls: Constructor<BoundedMap<unknown, unknown>>) {
  describe(cls.name, () => {
    describe("constructor()", () => {
      it("accepts an entry", () => {
        const entries = [["key", "value"]];
        const queue = new cls(entries);
        expect(queue.capacity).toBe(1);
        expect(queue.size).toBe(1);
        expect(Array.from(queue)).toEqual(entries);
      });

      it("does not directly use input", () => {
        const entries = [["key", "value"]];
        const dupe = [["key", "value"]];
        const queue = new cls(dupe);
        dupe[0][1] = "foo";
        dupe.push(["key2, value2"]);
        expect(queue.size).toEqual(1);
        expect(queue.capacity).toEqual(1);
        expect(Array.from(queue)).toEqual(entries);
      });

      it("accepts multiple entries", () => {
        const entries = [
          ["1", 1],
          ["2", 2],
          ["3", 3],
        ];
        const queue = new cls(entries);
        expect(queue.capacity).toBe(3);
        expect(queue.size).toBe(3);
        expect(Array.from(queue)).toEqual(entries);
      });

      it("accepts repeated entries", () => {
        const entries = [
          ["1", 1],
          ["1", 1],
          ["1", 1],
        ];
        const queue = new cls(entries);
        expect(queue.capacity).toBe(1);
        expect(queue.size).toBe(1);
        expect(Array.from(queue)).toEqual([["1", 1]]);
      });

      it("uses final value of repeated key", () => {
        const entries = [
          ["1", 1],
          ["1", 2],
          ["1", 3],
        ];
        const queue = new cls(entries);
        expect(queue.capacity).toBe(1);
        expect(queue.size).toBe(1);
        expect(Array.from(queue)).toEqual([["1", 3]]);
      });

      it("handles complex data types as values", () => {
        const entries = [
          ["a", { a: 1 }],
          ["b", { b: 2 }],
        ];
        const queue = new cls(entries);
        expect(queue.size).toBe(2);
        expect(queue.capacity).toBe(2);
        expect(Array.from(queue)).toEqual(entries);
      });

      it("handles complex data types as keys", () => {
        const entries = [
          [{ a: 1 }, "a"],
          [{ b: 2 }, "b"],
        ];
        const queue = new cls(entries);
        expect(queue.size).toBe(2);
        expect(queue.capacity).toBe(2);
        expect(Array.from(queue)).toEqual(entries);
      });

      it("accepts an iterable", () => {
        const entries = [
          [1, 1],
          [2, 2],
          [3, 3],
        ];
        const queue = new cls(new Set(entries));
        expect(queue.size).toBe(3);
        expect(queue.capacity).toBe(3);
        expect(Array.from(queue)).toEqual(entries);
      });
    });

    describe("capacity", () => {
      // Capacity increase

      it("growth retains element order", () => {
        const set = new cls([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
        set.capacity = 5;
        expect(set.capacity).toBe(5);
        expect(set.size).toBe(3);
        expect(Array.from(set.entries())).toEqual([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
      });

      // Capacity decrease

      it("handles shrink to zero capacity", () => {
        const set = new cls([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
        set.capacity = 0;
        expect(set.capacity).toBe(0);
        expect(set.size).toBe(0);
        expect(Array.from(set.entries())).toEqual([]);
      });

      it("shrink retains element order", () => {
        const set = new cls(10);
        set.set(1, 1).set(2, 2).set(3, 3);
        set.capacity = 5;
        expect(set.capacity).toBe(5);
        expect(set.size).toBe(3);
        expect(Array.from(set.entries())).toEqual([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
      });

      it("discards elements when shrinking to a smaller capacity than size", () => {
        const set = new cls([
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5],
        ]);
        set.capacity = 3;
        expect(set.capacity).toBe(3);
        expect(Array.from(set.entries())).toEqual([
          [3, 3],
          [4, 4],
          [5, 5],
        ]);
      });

      it("correctly repopulates after shrink to zero capacity", () => {
        const set = new cls([
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5],
        ]);
        set.capacity = 0;
        set.capacity = 3;
        set.set(6, 6);
        expect(set.capacity).toBe(3);
        expect(set.size).toBe(1);
        expect(Array.from(set.entries())).toEqual([[6, 6]]);
      });
    });

    describe("clear()", () => {
      it("should clear an empty map without error", () => {
        const map = new cls();
        expect(() => map.clear()).not.toThrow();
        expect(map.size).toBe(0);
        expect(map.capacity).toBe(Infinity);
        expect(Array.from(map)).toEqual([]);
      });

      it("clears a zero capacity map correctly", () => {
        const map = new cls(0);
        map.clear();
        expect(map.size).toBe(0);
        expect(map.capacity).toBe(0);
        expect(Array.from(map)).toEqual([]);
      });

      it("clears an unused queue correctly", () => {
        const map = new cls(10);
        map.clear();
        expect(map.size).toBe(0);
        expect(map.capacity).toBe(10);
        expect(Array.from(map)).toEqual([]);
      });

      it("clears a filled queue correctly", () => {
        const map = new cls(2);
        map.set("key1", "value1");
        map.set("key2", "value2");
        map.clear();
        expect(map.size).toBe(0);
        expect(map.capacity).toBe(2);
        expect(map.has("key1")).toBe(false);
        expect(map.has("key2")).toBe(false);
      });

      it("should reset the map to its initial state", () => {
        const map = new cls();
        map.set("key", "value");
        map.clear();
        map.set("newKey", "newValue");
        expect(map.size).toBe(1);
        expect(map.get("newKey")).toBe("newValue");
      });

      it("should not affect the capacity of the map", () => {
        const initialCapacity = 10;
        const map = new cls(initialCapacity);
        map.set("key", "value");
        map.clear();

        expect(map.capacity).toBe(initialCapacity);
        expect(map.size).toBe(0);
      });

      it("should handle clearing a map initialized with items", () => {
        const items = [
          ["key1", "value1"],
          ["key2", "value2"],
        ];
        const map = new cls(items);
        map.clear();

        expect(map.size).toBe(0);
        items.forEach(([key]) => expect(map.has(key)).toBe(false));
      });

      it("should be repeatedly callable", () => {
        const items = [
          ["key1", "value1"],
          ["key2", "value2"],
        ];
        const map = new cls(items);
        map.clear();
        map.clear();
        map.clear();
        expect(map.size).toBe(0);
        items.forEach(([key]) => expect(map.has(key)).toBe(false));
      });
    });

    describe("delete()", () => {
      it("should delete an existing key-value pair", () => {
        const map = new cls();
        map.set("key1", "value1");
        expect(map.delete("key1")).toBe(true);
        expect(map.size).toBe(0);
        expect(map.has("key1")).toBe(false);
      });

      it("should return false when deleting a non-existing key", () => {
        const map = new cls();
        map.set("key1", "value1");
        expect(map.delete("key2")).toBe(false);
      });

      it("should not affect the set size when deleting a non-existing value", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.delete("key2");
        expect(map.size).toBe(1);
      });

      it("should not affect the map’s capacity when deleting an existing value", () => {
        const map = new cls(10);
        map.set("key1", "value1");
        map.delete("key1");
        expect(map.capacity).toBe(10);
      });

      it("should not affect the map’s capacity when deleting a non-existing value", () => {
        const map = new cls(10);
        map.set("key1", "value1");
        map.delete("key2");
        expect(map.capacity).toBe(10);
      });

      it("should handle deletion in a map with multiple keys", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");
        map.set("key3", "value3");
        map.delete("key2");
        expect(map.size).toBe(2);
        expect(map.has("key1")).toBe(true);
        expect(map.has("key2")).toBe(false);
        expect(map.has("key3")).toBe(true);
      });

      it("should correctly handle the deletion of multiple keys", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");
        map.delete("key1");
        map.delete("key2");
        expect(map.size).toBe(0);
        expect(map.has("key1")).toBe(false);
        expect(map.has("key2")).toBe(false);
      });

      it("should maintain correct order of elements after deletion", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");
        map.set("key3", "value3");
        map.delete("key2");
        const values = Array.from(map.values());
        expect(values).toEqual(["value1", "value3"]);
      });

      it("deleting from a full map should correctly manage capacity", () => {
        const capacity = 5;
        const map = new cls(capacity);
        for (let i = 0; i < capacity; i++) {
          map.set(`key${i}`, `value${i}`);
        }

        map.delete("key0");
        expect(map.size).toBe(capacity - 1);
        map.set("newKey", "newValue");
        expect(map.size).toBe(capacity);
      });

      it("should handle deletion in a map initialized with items", () => {
        const items = [
          ["key1", "value1"],
          ["key2", "value2"],
        ];
        const map = new cls(items);
        map.delete("key1");

        expect(map.size).toBe(1);
        expect(map.has("key1")).toBe(false);
        expect(map.has("key2")).toBe(true);
      });
    });

    describe("entries()", () => {
      it("should return an empty iterator for an empty map", () => {
        const map = new cls();
        const iterator = map.entries();
        const firstEntry = iterator.next();
        expect(firstEntry.done).toBe(true);
      });

      it("should iterate over all entries in the map in insertion order", () => {
        const map = new cls(5);
        const entries = [
          ["key1", "value1"],
          ["key2", "value2"],
          ["key3", "value3"],
        ];
        entries.forEach(([key, value]) => map.set(key, value));
        expect(Array.from(map.entries())).toEqual(entries);
      });

      it("should reflect updates to the map", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");
        map.delete("key1");
        map.set("key3", "value3");
        const entries = [
          ["key2", "value2"],
          ["key3", "value3"],
        ];
        expect(Array.from(map.entries())).toEqual(entries);
      });

      it("returns correct entries for a set that has wrapped around", () => {
        const map = new cls(3);
        map.set(1, 1).set(2, 2).set(3, 3).set(4, 4);
        expect(Array.from(map.entries())).toEqual([
          [2, 2],
          [3, 3],
          [4, 4],
        ]);
        map.set(5, 5);
        expect(Array.from(map.entries())).toEqual([
          [3, 3],
          [4, 4],
          [5, 5],
        ]);
        map.set(6, 6);
        expect(Array.from(map.entries())).toEqual([
          [4, 4],
          [5, 5],
          [6, 6],
        ]);
        map.set(7, 7);
        expect(Array.from(map.entries())).toEqual([
          [5, 5],
          [6, 6],
          [7, 7],
        ]);
      });

      it("returns correct entries after capacity increase", () => {
        const map = new cls(3);
        map.set(1, 1).set(2, 2).set(3, 3);
        map.capacity = 5;
        expect(Array.from(map.entries())).toEqual([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
        map.set(4, 4).set(5, 5);
        expect(Array.from(map.entries())).toEqual([
          [1, 1],
          [2, 2],
          [3, 3],
          [4, 4],
          [5, 5],
        ]);
        map.set(6, 6).set(7, 7);
        expect(Array.from(map.entries())).toEqual([
          [3, 3],
          [4, 4],
          [5, 5],
          [6, 6],
          [7, 7],
        ]);
      });

      it("returns correct entries after capacity decrease", () => {
        const map = new cls(5);
        map.set(1, 1).set(2, 2).set(3, 3).set(4, 4).set(5, 5);
        map.capacity = 3;
        expect(Array.from(map.entries())).toEqual([
          [3, 3],
          [4, 4],
          [5, 5],
        ]);
        map.set(6, 6).set(7, 7);
        expect(Array.from(map.entries())).toEqual([
          [5, 5],
          [6, 6],
          [7, 7],
        ]);
      });
    });

    describe("forEach()", () => {
      it("should not call the callback for an empty map", () => {
        const map = new cls();
        const mockCallback = vi.fn();
        map.forEach(mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
      });

      it("calls the callback for each element in a partially filled set", () => {
        const map = new cls(5);
        map.set(1, 1).set(2, 2).set(3, 3);
        const mockCallback = vi.fn();
        map.forEach(mockCallback);
        expect(mockCallback).toHaveBeenCalledTimes(3);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 1, map);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 2, map);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 3, map);
      });

      it("uses the provided thisArg for the callback", () => {
        const map = new cls([
          ["1", 1],
          ["2", 2],
          ["3", 3],
        ]);
        const context = { multiplier: 2 };
        const mockCallback = vi.fn(function (this: typeof context, value) {
          return value * this.multiplier;
        });
        map.forEach(mockCallback, context);
        expect(mockCallback.mock.instances[0]).toBe(context);
      });

      it("correctly handles callback logic for a full map", () => {
        const map = new cls([
          [1, 1],
          [2, 2],
          [3, 3],
        ]) as BoundedMap<number, number>;
        const results: number[] = [];
        map.forEach(value => {
          results.push(value * 2);
        });
        expect(results).toEqual([2, 4, 6]);
      });

      it("works correctly after removing and adding elements", () => {
        const map = new cls([
          [1, 1],
          [2, 2],
          [3, 3],
        ]) as BoundedMap<number, number>;
        map.delete(2);
        map.set(4, 4);
        const results: number[] = [];
        map.forEach(value => results.push(value + 1));
        expect(results).toEqual([2, 4, 5]);
      });

      it("maintains the correct order of elements", () => {
        const map = new cls(3) as BoundedMap<number, number>;
        map.set(3, 3).set(2, 2).set(1, 1);
        map.delete(3);
        map.set(4, 4);
        const results: number[] = [];
        map.forEach(value => results.push(value));
        expect(results).toEqual([2, 1, 4]);
      });

      it("provides the correct index and map reference to the callback", () => {
        const map = new cls(3);
        map.set("10", 10).set("20", 20).set("30", 30);
        const mockCallback = vi.fn();
        map.forEach(mockCallback);
        expect(mockCallback).toHaveBeenNthCalledWith(1, 10, "10", map);
        expect(mockCallback).toHaveBeenNthCalledWith(2, 20, "20", map);
        expect(mockCallback).toHaveBeenNthCalledWith(3, 30, "30", map);
      });

      it("should correctly handle map modifications during iteration", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");

        const newEntries = [
          ["key3", "value3"],
          ["key4", "value4"],
        ];
        map.forEach((_value, key) => {
          if (key === "key1") {
            newEntries.forEach(([newKey, newValue]) =>
              map.set(newKey, newValue)
            );
          }
        });

        expect(map.size).toBe(4);
        const keys = Array.from(map.keys());
        expect(keys.includes("key3")).toBe(true);
        expect(keys.includes("key4")).toBe(true);
      });

      it("should complete iteration even if elements are deleted during the process", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");

        const mockCallback = vi.fn();
        map.forEach((value, key, map) => {
          mockCallback(value, key);
          map.delete(key);
        });

        expect(mockCallback.mock.calls.length).toBe(2);
        expect(map.size).toBe(0);
      });
    });

    describe("get()", () => {
      it("should return the correct value for an existing key", () => {
        const map = new cls();
        map.set("key1", "value1");
        const value = map.get("key1");

        expect(value).toBe("value1");
      });

      it("should return undefined for a non-existing key", () => {
        const map = new cls();
        map.set("key1", "value1");
        const value = map.get("nonExistingKey");

        expect(value).toBeUndefined();
      });

      it("should return the latest value for a key that has been updated", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key1", "updatedValue");
        const value = map.get("key1");

        expect(value).toBe("updatedValue");
      });

      it("should handle retrieving values for keys of different data types", () => {
        const keyObj = { id: 1 };
        const keyFunc = () => {};
        const keySymbol = Symbol("key");
        const map = new cls();
        map.set(keyObj, "objectValue");
        map.set(keyFunc, "functionValue");
        map.set(keySymbol, "symbolValue");

        expect(map.get(keyObj)).toBe("objectValue");
        expect(map.get(keyFunc)).toBe("functionValue");
        expect(map.get(keySymbol)).toBe("symbolValue");
      });

      it("should return undefined when trying to get a value from an empty map", () => {
        const map = new cls();
        const value = map.get("key1");
        expect(value).toBeUndefined();
      });

      it("should return undefined for null and undefined keys if they were not explicitly set", () => {
        const map = new cls();
        const valueForNullKey = map.get(null);
        const valueForUndefinedKey = map.get(undefined);

        expect(valueForNullKey).toBeUndefined();
        expect(valueForUndefinedKey).toBeUndefined();
      });

      it("should correctly retrieve values for explicitly set null and undefined keys", () => {
        const map = new cls();
        map.set(null, "nullValue");
        map.set(undefined, "undefinedValue");

        expect(map.get(null)).toBe("nullValue");
        expect(map.get(undefined)).toBe("undefinedValue");
      });

      it("should be case-sensitive when retrieving string keys", () => {
        const map = new cls();
        map.set("Key", "value1");
        map.set("key", "value2");

        expect(map.get("Key")).toBe("value1");
        expect(map.get("key")).toBe("value2");
      });

      it("should treat different instances of objects as distinct keys", () => {
        const keyObj1 = { id: 1 };
        const keyObj2 = { id: 1 };
        const map = new cls();
        map.set(keyObj1, "value1");
        map.set(keyObj2, "value2");

        expect(map.get(keyObj1)).toBe("value1");
        expect(map.get(keyObj2)).toBe("value2");
        expect(map.get({ id: 1 })).toBeUndefined();
      });
    });

    describe("has()", () => {
      it("should return false for any key when map is empty", () => {
        const map = new cls();
        expect(map.has("key1")).toBe(false);
      });

      it("should return true for an existing key", () => {
        const map = new cls();
        map.set("key1", "value1");
        expect(map.has("key1")).toBe(true);
      });

      it("should return false for a non-existing key", () => {
        const map = new cls();
        map.set("key1", "value1");
        expect(map.has("nonExistingKey")).toBe(false);
      });

      it("should handle different data types as keys", () => {
        const keyObj = { id: 1 };
        const keyFunc = () => {};
        const keySymbol = Symbol("key");
        const map = new cls();
        map.set(1, 1);
        map.set("b", 2);
        map.set(3n, 3);
        map.set(true, 4);
        map.set(false, 5);
        map.set(keyObj, "objectValue");
        map.set(keyFunc, "functionValue");
        map.set(keySymbol, "symbolValue");
        expect(map.size).toBe(8);
        expect(map.has(1)).toBe(true);
        expect(map.has("b")).toBe(true);
        expect(map.has(3n)).toBe(true);
        expect(map.has(true)).toBe(true);
        expect(map.has(false)).toBe(true);
        expect(map.has(keyObj)).toBe(true);
        expect(map.has(keyFunc)).toBe(true);
        expect(map.has(keySymbol)).toBe(true);
      });

      it("should return false for deleted keys", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.delete("key1");
        expect(map.has("key1")).toBe(false);
      });

      it("should return true for null and undefined keys if they were explicitly set", () => {
        const map = new cls();
        map.set(null, "nullValue");
        map.set(undefined, "undefinedValue");
        expect(map.size).toBe(2);
        expect(map.has(null)).toBe(true);
        expect(map.has(undefined)).toBe(true);
      });

      it("should be case-sensitive when checking for string keys", () => {
        const map = new cls();
        map.set("Key", "value1");
        expect(map.has("Key")).toBe(true);
        expect(map.has("key")).toBe(false);
      });

      it("should treat different instances of objects as distinct keys", () => {
        const keyObj1 = { id: 1 };
        const keyObj2 = { id: 1 };
        const map = new cls();
        map.set(keyObj1, "value1");
        expect(map.has(keyObj1)).toBe(true);
        expect(map.has(keyObj2)).toBe(false);
      });

      it("should correctly report the presence of keys added after initialization with iterable", () => {
        const initialEntries = [
          ["key1", "value1"],
          ["key2", "value2"],
        ];
        const map = new cls(initialEntries);
        map.set("key3", "value3");
        expect(map.has("key3")).toBe(true);
      });

      it("should return true for keys in the map that have been overwritten", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key1", "newValue1");
        expect(map.has("key1")).toBe(true);
      });

      it("returns false for any element after clearing the set", () => {
        const map = new cls([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
        map.clear();
        expect(map.has(1)).toBe(false);
        expect(map.has(2)).toBe(false);
        expect(map.has(3)).toBe(false);
      });

      it("reflects changes after overflow", () => {
        const map = new cls([
          [1, 1],
          [2, 2],
          [3, 3],
        ]);
        map.set(4, 4).set(5, 5);
        expect(map.has(1)).toBe(false);
        expect(map.has(2)).toBe(false);
        expect(map.has(3)).toBe(true);
        expect(map.has(4)).toBe(true);
        expect(map.has(5)).toBe(true);
      });
    });

    describe("keys()", () => {
      it("should return an empty iterator for an empty map", () => {
        const map = new cls();
        const keysIterator = map.keys();
        expect(keysIterator.next().done).toBe(true);
      });

      it("should iterate over all keys in the map in their insertion order", () => {
        const keys = ["key1", "key2", "key3"];
        const map = new cls();
        keys.forEach(key => map.set(key, `value-${key}`));
        const keysIterator = map.keys();
        keys.forEach((_, index) => {
          const iteratorResult = keysIterator.next();
          expect(iteratorResult.done).toBe(false);
          expect(iteratorResult.value).toBe(keys[index]);
        });
        expect(keysIterator.next().done).toBe(true);
      });

      it("should reflect updates to the map", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.delete("key1");
        map.set("key2", "value2");

        const keysIterator = map.keys();
        const firstKey = keysIterator.next();
        expect(firstKey.value).toBe("key2");
        expect(firstKey.done).toBe(false);
        expect(keysIterator.next().done).toBe(true);
      });

      it("should not include deleted keys", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");
        map.delete("key1");

        const keysIterator = map.keys();
        const firstKey = keysIterator.next();
        expect(firstKey.value).toBe("key2");
        expect(firstKey.done).toBe(false);
        expect(keysIterator.next().done).toBe(true);
      });

      it("should handle keys of various data types", () => {
        const keyObj = { id: 1 };
        const keyFunc = () => {};
        const keySymbol = Symbol("key");

        const map = new cls();
        map.set(keyObj, "objectValue");
        map.set(keyFunc, "functionValue");
        map.set(keySymbol, "symbolValue");

        const expectedKeys = [keyObj, keyFunc, keySymbol];
        const keysIterator = map.keys();
        expectedKeys.forEach(expectedKey => {
          const { value, done } = keysIterator.next();
          expect(done).toBe(false);
          expect(value).toBe(expectedKey);
        });

        expect(keysIterator.next().done).toBe(true);
      });

      it("should return a new iterator each time", () => {
        const map = new cls();
        map.set("key1", "value1");
        const iterator1 = map.keys();
        const iterator2 = map.keys();
        iterator1.next();
        expect(iterator2.next().value).toBe("key1");
      });
    });

    describe("set()", () => {
      it("should add a new key-value pair", () => {
        const map = new cls();
        map.set("key1", "value1");
        expect(map.has("key1")).toBe(true);
        expect(map.get("key1")).toBe("value1");
      });

      it("should update an existing key with a new value", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key1", "updatedValue");
        expect(map.get("key1")).toBe("updatedValue");
      });

      it("should not exceed the specified capacity", () => {
        const capacity = 2;
        const map = new cls(capacity);
        map.set("key1", "value1");
        map.set("key2", "value2");
        map.set("key3", "value3");

        expect(map.has("key1")).toBe(false);
        expect(map.has("key2")).toBe(true);
        expect(map.has("key3")).toBe(true);
      });

      it("should emit an overflow event when capacity is 0", async () => {
        const mockCallback = vi.fn();
        const map = new cls(0);
        map.on(BoundedEvent.Overflow, mockCallback);
        map.set("key1", "value1");

        await new Promise<void>((done, reject) =>
          setImmediate(() => {
            try {
              expect(mockCallback).toHaveBeenCalledTimes(1);
              const evicted = mockCallback.mock.calls[0][0];
              expect(evicted).toEqual([["key1", "value1"]]);
              done();
            } catch (error) {
              reject(error);
            }
          })
        );
      });

      it("should emit an overflow event when the capacity is exceeded", async () => {
        const capacity = 1;
        const mockCallback = vi.fn();
        const map = new cls(capacity);

        map.on(BoundedEvent.Overflow, mockCallback);
        map.set("key1", "value1");
        map.set("key2", "value2");

        await new Promise<void>((done, reject) =>
          setImmediate(() => {
            try {
              expect(mockCallback).toHaveBeenCalledTimes(1);
              const evicted = mockCallback.mock.calls[0][0];
              expect(evicted).toEqual([["key1", "value1"]]);
              done();
            } catch (error) {
              reject(error);
            }
          })
        );
      });

      it("should handle keys of various data types", () => {
        const keyObj = { id: 1 };
        const keyFunc = () => {};
        const keySymbol = Symbol("key");
        const map = new cls();
        map.set(keyObj, "objectValue");
        map.set(keyFunc, "functionValue");
        map.set(keySymbol, "symbolValue");

        expect(map.get(keyObj)).toBe("objectValue");
        expect(map.get(keyFunc)).toBe("functionValue");
        expect(map.get(keySymbol)).toBe("symbolValue");
      });

      it("should return the CircularMap instance to allow method chaining", () => {
        const map = new cls();
        const result = map.set("key1", "value1").set("key2", "value2");
        expect(result).toBe(map);
        expect(map.has("key1")).toBe(true);
        expect(map.has("key2")).toBe(true);
      });

      it("should correctly set null and undefined as keys", () => {
        const map = new cls();
        map.set(null, "nullValue");
        map.set(undefined, "undefinedValue");
        expect(map.get(null)).toBe("nullValue");
        expect(map.get(undefined)).toBe("undefinedValue");
      });

      it("should not affect the map’s capacity when replacing the value for an existing key", () => {
        const capacity = 2;
        const map = new cls(capacity);
        map.set("key1", "value1");
        map.set("key1", "updatedValue");
        map.set("key2", "value2");

        expect(map.size).toBe(2);
        expect(map.get("key1")).toBe("updatedValue");
      });
    });

    describe("values()", () => {
      it("should return an empty iterator for an empty map", () => {
        const map = new cls();
        const valuesIterator = map.values();
        expect(valuesIterator.next().done).toBe(true);
      });

      it("should iterate over all values in the map in their insertion order", () => {
        const values = ["value1", "value2", "value3"];
        const map = new cls();
        values.forEach((value, index) => map.set(`key${index + 1}`, value));

        const valuesIterator = map.values();
        values.forEach((_value, index) => {
          const iteratorResult = valuesIterator.next();
          expect(iteratorResult.done).toBe(false);
          expect(iteratorResult.value).toBe(values[index]);
        });
        expect(valuesIterator.next().done).toBe(true);
      });

      it("should reflect updates to the map", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.delete("key1");
        map.set("key2", "value2");

        const valuesIterator = map.values();
        const firstValue = valuesIterator.next();
        expect(firstValue.value).toBe("value2");
        expect(firstValue.done).toBe(false);
        expect(valuesIterator.next().done).toBe(true);
      });

      it("should not include deleted values", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");
        map.delete("key1");

        const valuesIterator = map.values();
        const firstValue = valuesIterator.next();
        expect(firstValue.value).toBe("value2");
        expect(firstValue.done).toBe(false);
        expect(valuesIterator.next().done).toBe(true);
      });

      it("should handle values of various data types", () => {
        const objectValue = { id: 1 };
        const functionValue = () => {};
        const symbolValue = Symbol("value");

        const map = new cls();
        map.set("keyObj", objectValue);
        map.set("keyFunc", functionValue);
        map.set("keySymbol", symbolValue);

        const valuesIterator = map.values();
        const extractedValues = [
          valuesIterator.next().value,
          valuesIterator.next().value,
          valuesIterator.next().value,
        ];

        expect(extractedValues).toContain(objectValue);
        expect(extractedValues).toContain(functionValue);
        expect(extractedValues).toContain(symbolValue);
      });

      it("should return a new iterator each time", () => {
        const map = new cls();
        map.set("key1", "value1");
        const iterator1 = map.values();
        const iterator2 = map.values();
        iterator1.next();
        expect(iterator2.next().value).toBe("value1");
      });

      it("should not fail or skip when the map is cleared during iteration", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");
        const valuesIterator = map.values();
        expect(valuesIterator.next().value).toBe("value1");
        map.clear();
        expect(valuesIterator.next().done).toBe(true);
      });
    });

    describe("[Symbol.iterator]()", () => {
      it("should return an empty iterator for an empty map", () => {
        const map = new cls();
        const valuesIterator = map.values();
        expect(valuesIterator.next().done).toBe(true);
      });

      it("should iterate over all values in the map in their insertion order", () => {
        const values = ["value1", "value2", "value3"];
        const map = new cls();
        values.forEach((value, index) => map.set(`key${index + 1}`, value));

        const valuesIterator = map.values();
        values.forEach((_value, index) => {
          const iteratorResult = valuesIterator.next();
          expect(iteratorResult.done).toBe(false);
          expect(iteratorResult.value).toBe(values[index]);
        });
        expect(valuesIterator.next().done).toBe(true);
      });

      it("should reflect updates to the map", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.delete("key1");
        map.set("key2", "value2");
        const valuesIterator = map.values();
        const firstValue = valuesIterator.next();
        expect(firstValue.value).toBe("value2");
        expect(firstValue.done).toBe(false);
        expect(valuesIterator.next().done).toBe(true);
      });

      it("should not include deleted values", () => {
        const map = new cls();
        map.set("key1", "value1");
        map.set("key2", "value2");
        map.delete("key1");
        const valuesIterator = map.values();
        const firstValue = valuesIterator.next();
        expect(firstValue.value).toBe("value2");
        expect(firstValue.done).toBe(false);
        expect(valuesIterator.next().done).toBe(true);
      });

      it("should handle values of various data types", () => {
        const objectValue = { id: 1 };
        const functionValue = () => {};
        const symbolValue = Symbol("value");

        const map = new cls();
        map.set("keyObj", objectValue);
        map.set("keyFunc", functionValue);
        map.set("keySymbol", symbolValue);

        const valuesIterator = map.values();
        const extractedValues = [
          valuesIterator.next().value,
          valuesIterator.next().value,
          valuesIterator.next().value,
        ];

        expect(extractedValues).toContain(objectValue);
        expect(extractedValues).toContain(functionValue);
        expect(extractedValues).toContain(symbolValue);
      });

      it("should return a new iterator each time", () => {
        const map = new cls();
        map.set("key1", "value1");
        const iterator1 = map.values();
        const iterator2 = map.values();
        iterator1.next();
        expect(iterator2.next().value).toBe("value1");
      });
    });
  });
}
