import { describe, expect, it } from "vitest";

import { Bounded } from "../src/types/bounded";
import { Collection } from "../src/types/collection";
import { Constructor } from "../src/types/constructor";

type BoundedCollection<K, V> = Collection<K, V> & Bounded<V>;

export function test(
  cls: Constructor<BoundedCollection<unknown, unknown>>,
  maxCapacity: number
) {
  describe(`${cls.name} | BoundedCollection`, () => {
    describe("constructor()", () => {
      it("accepts no parameters", () => {
        const obj = new cls();
        expect(obj.capacity).toEqual(Infinity);
        expect(obj.size).toEqual(0);
      });

      it("accepts null as capacity", () => {
        const obj = new cls(null);
        expect(obj.capacity).toEqual(Infinity);
        expect(obj.size).toEqual(0);
      });

      it("accepts undefined as capacity", () => {
        const obj = new cls(undefined);
        expect(obj.capacity).toEqual(Infinity);
        expect(obj.size).toEqual(0);
      });

      it("accepts Infinity as capacity", () => {
        const obj = new cls(Infinity);
        expect(obj.capacity).toEqual(Infinity);
        expect(obj.size).toEqual(0);
      });

      it("accepts zero as capacity", () => {
        const obj = new cls(0);
        expect(obj.size).toBe(0);
        expect(obj.capacity).toBe(0);
      });

      it("accepts positive integers capacity", () => {
        const obj = new cls(10);
        expect(obj.capacity).toEqual(10);
        expect(obj.size).toEqual(0);
      });

      it("rejects negative capacity", () => {
        expect(() => new cls(-1)).toThrow();
        expect(() => new cls(-12)).toThrow();
      });

      it("rejects decimal capacity", () => {
        expect(() => new cls(2.5)).toThrow();
        expect(() => new cls(100.001)).toThrow();
        expect(() => new cls(-50.2)).toThrow();
      });

      it("accepts an empty array", () => {
        const obj = new cls([]);
        expect(obj.size).toEqual(0);
        expect(obj.capacity).toEqual(0);
        expect([...obj.values()]).toEqual([]);
      });

      it("accepts large capacities", () => {
        expect(() => new cls(maxCapacity)).not.toThrow();
      });

      it("rejects too large capacities", () => {
        expect(() => new cls(maxCapacity + 1)).toThrow();
      });
    });

    describe("capacity", () => {
      it("accepts null as capacity", () => {
        const obj = new cls();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => (obj.capacity = null as any)).not.toThrow();
        expect(obj.capacity).toEqual(0);
        expect(obj.size).toEqual(0);
      });

      it("accepts Infinity as capacity", () => {
        const obj = new cls();
        expect(() => (obj.capacity = Infinity)).not.toThrow();
        expect(obj.capacity).toEqual(Infinity);
        expect(obj.size).toEqual(0);
      });

      it("accepts zero as capacity", () => {
        const obj = new cls();
        expect(() => (obj.capacity = 0)).not.toThrow();
        expect(obj.capacity).toEqual(0);
        expect(obj.size).toEqual(0);
      });

      it("accepts positive integers capacity", () => {
        const obj = new cls();
        expect(() => (obj.capacity = 10)).not.toThrow();
        expect(obj.capacity).toEqual(10);
        expect(obj.size).toEqual(0);
      });

      it("rejects negative capacity", () => {
        const obj = new cls();
        expect(() => (obj.capacity = -1)).toThrow(RangeError);
        expect(() => (obj.capacity = -12)).toThrow(RangeError);
      });

      it("rejects decimal capacity", () => {
        const obj = new cls();
        expect(() => (obj.capacity = 2.5)).toThrow(RangeError);
        expect(() => (obj.capacity = 100.001)).toThrow(RangeError);
        expect(() => (obj.capacity = -50.2)).toThrow(RangeError);
      });

      it("accepts coerced capacities", () => {
        const obj = new cls();
        /* eslint-disable @typescript-eslint/no-explicit-any */
        expect(() => (obj.capacity = false as any)).not.toThrow();
        expect(obj.capacity).toEqual(0);
        expect(() => (obj.capacity = true as any)).not.toThrow();
        expect(obj.capacity).toEqual(1);
        expect(() => (obj.capacity = [] as any)).not.toThrow();
        expect(obj.capacity).toEqual(0);
        expect(() => (obj.capacity = [10] as any)).not.toThrow();
        expect(obj.capacity).toEqual(10);
        /* eslint-enable @typescript-eslint/no-explicit-any */
      });

      it("throws TypeError if BigInt given for capacity", () => {
        const obj = new cls();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => (obj.capacity = BigInt(12) as any)).toThrow(TypeError);
      });

      it("throws RangeError when given an invalid capacity", () => {
        const obj = new cls();
        /* eslint-disable @typescript-eslint/no-explicit-any */
        expect(() => (obj.capacity = undefined as any)).toThrow(RangeError);
        expect(() => (obj.capacity = [1, 2] as any)).toThrow(RangeError);
        expect(() => (obj.capacity = {} as any)).toThrow(RangeError);
        /* eslint-enable @typescript-eslint/no-explicit-any */
      });

      // Capacity increase

      it("handles growth for an empty collection", () => {
        const obj = new cls();
        obj.capacity = 5;
        expect(obj.capacity).toBe(5);
        expect(obj.size).toBe(0);
        expect([...obj.values()]).toEqual([]);
      });

      // Capacity decrease

      it("handles shrink for an empty collection", () => {
        const obj = new cls(10);
        obj.capacity = 5;
        expect(obj.capacity).toBe(5);
        expect(obj.size).toBe(0);
        expect([...obj.values()]).toEqual([]);
      });

      it("accepts large capacities", () => {
        const obj = new cls();
        expect(() => (obj.capacity = maxCapacity)).not.toThrow();
        expect(obj.capacity).toEqual(maxCapacity);
        expect(obj.size).toEqual(0);
      });

      it("rejects too large capacities", () => {
        const obj = new cls();
        expect(() => (obj.capacity = maxCapacity + 1)).toThrow(RangeError);
      });
    });
  });

  describe("[Symbol.toStringTag]", () => {
    it("Object.prototype.toString returns the correct tag", () => {
      const obj = new cls();
      expect(Object.prototype.toString.call(obj)).toBe(`[object ${cls.name}]`);
    });
  });
}
