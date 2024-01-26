import { describe, expect, it } from "vitest";
import { Deque } from "./deque";
import { Constructor } from "../utils/mixins";

import { tests as collectionTests } from "./collectionTests";
import { tests as queueTests } from "./queueTests";
import { tests as stackTests } from "./stackTests";

export const tests: {
  [key: string]: (ctor: Constructor<Deque<unknown>>) => void;
} = Object.assign({}, collectionTests, queueTests, stackTests, {
  deque: test,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function test(ctor: Constructor<Deque<any>>): void {
  function gen<T>(...args: unknown[]): Deque<T> {
    return new ctor(...args);
  }

  describe(ctor.name, () => {
    describe("back()", () => {
      it("returns the last element in a non-empty deque", () => {
        const deque = gen<number>(1, 2, 3);
        expect(deque.back()).toBe(3);
      });

      it("returns undefined for an empty deque", () => {
        const deque = gen<number>(3);
        expect(deque.back()).toBeUndefined();
      });

      it("does not modify the deque", () => {
        const deque = gen<number>(1, 2, 3);
        const initialSize = deque.size;
        deque.back();
        expect(deque.size).toBe(initialSize);
        expect([...deque.values()]).toEqual([1, 2, 3]);
      });

      it("reflects the correct back element after modifications", () => {
        const deque = gen<number>(3);
        deque.push(1);
        expect(deque.back()).toBe(1);
        deque.push(2);
        expect(deque.back()).toBe(2);
        deque.pop();
        expect(deque.back()).toBe(1);
      });
    });

    describe("bottom()", () => {
      it("returns the earliest inserted element in a non-empty deque", () => {
        const deque = gen<number>(1, 2, 3);
        expect(deque.bottom()).toBe(1);
      });

      it("returns undefined for an empty deque", () => {
        const deque = gen<number>(3);
        expect(deque.bottom()).toBeUndefined();
      });

      it("does not modify the deque", () => {
        const deque = gen<number>(1, 2, 3);
        const initialSize = deque.size;
        deque.bottom();
        expect(deque.size).toBe(initialSize);
        expect([...deque.values()]).toEqual([1, 2, 3]);
      });

      it("reflects the correct element after modifications", () => {
        const deque = gen<number>(3);
        deque.push(1);
        expect(deque.bottom()).toBe(1);
        deque.push(2);
        expect(deque.bottom()).toBe(1);
        deque.shift();
        expect(deque.bottom()).toBe(2);
      });
    });

    describe("unshift()", () => {
      it("Adds element to an empty deque", () => {
        const deque = gen<number>(4);
        deque.unshift(1);
        expect([...deque.values()]).toEqual([1]);
      });

      it("Adds multiple elements in the correct order to an empty deque", () => {
        const deque = gen<number>(4);
        deque.unshift(1, 2, 3);
        expect([...deque.values()]).toEqual([1, 2, 3]);
      });

      it("Adds element to a non-empty deque", () => {
        const deque = gen<number>(4);
        deque.push(2, 3);
        deque.unshift(1);
        expect([...deque.values()]).toEqual([1, 2, 3]);
      });

      it("Adds multiple elements in the correct order to a non-empty deque", () => {
        const deque = gen<number>(4);
        deque.push(4);
        deque.unshift(1, 2, 3);
        expect([...deque.values()]).toEqual([1, 2, 3, 4]);
      });

      it("Adds elements to a non-full deque without overwriting", () => {
        const deque = gen<number>(5);
        deque.push(4, 5);
        let overwritten = deque.unshift(3);
        expect(overwritten).toEqual([]);
        expect([...deque.values()]).toEqual([3, 4, 5]);

        overwritten = deque.unshift(2);
        expect(overwritten).toEqual([]);
        expect([...deque.values()]).toEqual([2, 3, 4, 5]);

        overwritten = deque.unshift(1);
        expect(overwritten).toEqual([]);
        expect([...deque.values()]).toEqual([1, 2, 3, 4, 5]);
      });

      it("Adds elements to a full deque and returns overwritten elements", () => {
        const deque = gen<number>(1, 2, 3, 4, 5);
        const overwritten = deque.unshift(-2, -1, 0);
        expect(overwritten).toEqual([3, 4, 5]);
        expect([...deque.values()]).toEqual([-2, -1, 0, 1, 2]);
      });

      it("Adds elements to deque of length 0", () => {
        const deque = gen<number>();
        const overwritten = deque.unshift(1, 2, 3);
        expect(overwritten).toEqual([1, 2, 3]);
        expect([...deque.values()]).toEqual([]);
      });

      it("Adds correct elements when given more than capacity", () => {
        const deque = gen<number>(3);
        const overwritten = deque.unshift(1, 2, 3, 4, 5, 6);
        expect(overwritten).toEqual([4, 5, 6]);
        expect([...deque.values()]).toEqual([1, 2, 3]);
      });
    });
  });
}
