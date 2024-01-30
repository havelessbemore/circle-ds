import { describe, expect, it } from "vitest";

import { tests } from "../tests/stackTests";
import { CircleLinkedStack } from "./circleLinkedStack";

for (const name of Object.keys(tests)) {
  tests[name](CircleLinkedStack);
}

describe(CircleLinkedStack.name, () => {
  describe("static from()", () => {
    it("creates a stack correctly from an array", () => {
      const array = [1, 2, 3];
      const stack = CircleLinkedStack.from(array);
      expect(stack.size).toBe(array.length);
      expect([...stack.values()]).toEqual(array);
    });

    it("creates a stack from other iterable types", () => {
      const set = new Set([1, 2, 3]);
      const stack = CircleLinkedStack.from(set);
      expect(stack.size).toBe(set.size);
      expect([...stack.values()]).toEqual([...set]);
    });

    it("creates an empty stack from an empty iterable", () => {
      const stack = CircleLinkedStack.from([] as unknown[]);
      expect(stack.size).toBe(0);
      expect([...stack.values()]).toEqual([]);
    });
  });

  describe("static of()", () => {
    it("creates a stack correctly with multiple elements", () => {
      const elements = [1, 2, 3];
      const stack = CircleLinkedStack.of(...elements);
      expect(stack.size).toBe(elements.length);
      expect([...stack.values()]).toEqual(elements);
    });

    it("creates an empty stack when no arguments are provided", () => {
      const stack = CircleLinkedStack.of();
      expect(stack.size).toBe(0);
      expect([...stack.values()]).toEqual([]);
    });

    it("creates a stack correctly with a single element", () => {
      const stack = CircleLinkedStack.of(1);
      expect(stack.size).toBe(1);
      expect([...stack.values()]).toEqual([1]);
    });
  });
});
