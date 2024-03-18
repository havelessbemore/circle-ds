import { describe, expect, test } from "vitest";

import { LinkedNode } from "../types/linkedNode";

import {
  copy,
  cut,
  entries,
  get,
  has,
  insert,
  keys,
  toList,
  values,
} from "./linkedNode";

export function toArray<T>(node?: LinkedNode<T>): T[] {
  return Array.from(values(node));
}

describe(`${copy.name}()`, () => {
  test("returns undefineds when input node is undefined", () => {
    const core = copy(undefined, 2);

    expect(core.size).toBe(0);
    expect(core.root).toBeDefined();
    expect(core.root.next).toBeUndefined();
    expect(core.tail).toBe(core.root);
    expect(core.tail.next).toBeUndefined();
  });

  test("returns undefineds when count is negative", () => {
    const src = toList(["A", "B", "C"]);
    const core = copy(src.root.next, -1);

    expect(core.size).toBe(0);
    expect(core.root).toBeDefined();
    expect(core.root.next).toBeUndefined();
    expect(core.tail).toBe(core.root);
    expect(core.tail.next).toBeUndefined();
  });

  test("returns undefineds when count is zero", () => {
    const src = toList(["A", "B", "C"]);
    const core = copy(src.root.next, 0);

    expect(core.size).toBe(0);
    expect(core.root).toBeDefined();
    expect(core.root.next).toBeUndefined();
    expect(core.tail).toBe(core.root);
    expect(core.tail.next).toBeUndefined();
  });

  test("copies the specified number of nodes from the list", () => {
    const src = toList(["A", "B", "C", "D"]);
    const { root, size, tail } = copy(src.root.next, 2);

    expect(size).toBe(2);
    expect(root.next!.value).toBe("A");
    expect(tail!.value).toBe("B");
    expect(tail!.next).toBeUndefined();
    expect(Array.from(values(root.next))).toEqual(["A", "B"]);
  });

  test("handles copying more nodes than available", () => {
    const src = toList(["A", "B", "C"]);
    const { root, size, tail } = copy(src.root.next, 5);

    expect(size).toBe(3);
    expect(root.next!.value).toBe("A");
    expect(tail!.value).toBe("C");
    expect(tail!.next).toBeUndefined();
    expect(Array.from(values(root.next))).toEqual(["A", "B", "C"]);
  });
});

describe(`${cut.name}()`, () => {
  test("returns an empty core for a negative count", () => {
    const list = { value: 1, next: { value: 2 } };
    const core = cut(list, -1);
    expect(core.size).toBe(0);
    expect(core.root).toBeDefined();
    expect(core.root.next).toBeUndefined();
    expect(core.tail).toBe(core.root);
    expect(core.tail.next).toBeUndefined();
  });

  test("returns an empty core for a zero count", () => {
    const list = { value: 1, next: { value: 2 } };
    const core = cut(list, 0);
    expect(core.size).toBe(0);
    expect(core.root).toBeDefined();
    expect(core.root.next).toBeUndefined();
    expect(core.tail).toBe(core.root);
    expect(core.tail.next).toBeUndefined();
  });

  test("throws TypeError if count is larger than list size", () => {
    const list = { value: 0, next: { value: 1 } };
    expect(() => cut(list, 5)).toThrow(TypeError);
  });

  test("cuts the correct segment from a list", () => {
    const list = {
      value: 0,
      next: { value: 1, next: { value: 2, next: { value: 3 } } },
    };
    const { root, tail } = cut(list, 2);

    expect(root.next!.value).toBe(1);
    expect(tail.value).toBe(2);
    expect(list.next?.value).toBe(3); // Original list should now start at 3
    expect(tail.next).toBeUndefined(); // Ensure the tail's next is cut off
  });

  test("maintains list integrity when cutting the entire list", () => {
    const list = { value: 0, next: { value: 1, next: { value: 2 } } };
    const { root, tail } = cut(list, 2);

    expect(root.next!.value).toBe(1);
    expect(tail.value).toBe(2);
    expect(list.next).toBeUndefined(); // The original list should be empty
  });
});

describe(`${entries.name}()`, () => {
  test("yields correct [index, value] pairs for a list", () => {
    // 0 -> 1 -> 2 -> 3
    const list = {
      value: 0,
      next: { value: 1, next: { value: 2, next: { value: 3 } } },
    };

    const result = Array.from(entries(list));
    expect(result).toEqual([
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
    ]);
  });

  test("handles empty lists correctly", () => {
    const result = Array.from(entries());
    expect(result).toEqual([]);
  });

  test("handles single-element lists correctly", () => {
    const list = { value: 42 };
    const result = Array.from(entries(list));
    expect(result).toEqual([[0, 42]]);
  });
});

describe(`${get.name}()`, () => {
  test("retrieves the correct node at a given index", () => {
    const { root } = toList([1, 2, 3, 4, 5]);
    const node = get(root.next, 2);
    expect(node?.value).toBe(3);
  });

  test("returns undefined for negative indices", () => {
    const { root } = toList([1, 2, 3]);
    const node = get(root.next, -1);
    expect(node).toBeUndefined();
  });

  test("handles empty lists correctly", () => {
    const { root } = toList([]);
    const node = get(root.next, 0);
    expect(node).toBe(root.next);
  });

  test("handles single-element lists correctly", () => {
    const { root } = toList([42]);
    const node = get(root.next, 0);
    expect(node).toBe(root.next);
  });

  test("returns the head node when index is 0", () => {
    const { root } = toList([1, 2, 3]);
    const node = get(root.next, 0);
    expect(node).toBe(root.next);
  });

  test("returns the tail node when index equals length - 1", () => {
    const { root } = toList([1, 2, 3]);
    const node = get(root.next, 2);
    expect(node?.value).toBe(3);
  });

  test("returns undefined when index equals length", () => {
    const { root } = toList([1, 2, 3]);
    const node = get(root.next, 3);
    expect(node).toBe(undefined);
  });

  test("returns undefined when index greater than length", () => {
    const { root } = toList([1, 2, 3]);
    const node = get(root.next, 5);
    expect(node).toBe(undefined);
  });
});

describe(`${has.name}()`, () => {
  test("returns false when head is undefined", () => {
    expect(has(undefined, 1)).toBe(false);
  });

  test("returns true for a value present in the list", () => {
    const { root } = toList([1, 2, 3, 4, 5]);
    expect(has(root.next, 3)).toBe(true);
  });

  test("returns false for a value not present in the list", () => {
    const { root } = toList([1, 2, 3, 4, 5]);
    expect(has(root.next, 6)).toBe(false);
  });

  test("handles single-element lists correctly", () => {
    const { root } = toList([42]);
    expect(has(root.next, 42)).toBe(true);
    expect(has(root.next, 1)).toBe(false);
  });

  test("returns false for an empty list", () => {
    const { root } = toList([]);
    expect(has(root.next, 1)).toBe(false);
  });
});

describe(`${insert.name}()`, () => {
  test("inserts values into an empty list", () => {
    const { tail } = toList([0]);
    const values = [1, 2, 3];
    const lastNode = insert(tail, values);
    expect(toArray(tail)).toEqual([0, 1, 2, 3]);
    expect(lastNode.value).toEqual(3);
  });

  test("inserts values with an empty array", () => {
    const { tail } = toList([0]);
    const values: number[] = [];
    const lastNode = insert(tail, values);
    expect(toArray(tail)).toEqual([0]);
    expect(lastNode.value).toEqual(0);
  });

  test("inserts values at the beginning of a list", () => {
    const { root } = toList([-1, 0]);
    const values = [1, 2, 3];
    insert(root.next!, values);
    expect(toArray(root.next)).toEqual([-1, 1, 2, 3, 0]);
  });

  test("inserts values in the middle of a list", () => {
    const { root } = toList([0, 1, 4, 5]);
    const values = [2, 3];
    insert(root.next!.next!, values);
    expect(toArray(root.next)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  test("inserts values at the end of a list", () => {
    const { root, tail } = toList([0, 1, 2]);
    const values = [3, 4];
    insert(tail, values);
    expect(toArray(root.next)).toEqual([0, 1, 2, 3, 4]);
  });

  test("inserts iterable other than an array", () => {
    const { root } = toList([0, 1]);
    const values = new Set([2, 3, 4]);
    insert(root.next!, values);
    expect(toArray(root.next)).toEqual([0, 2, 3, 4, 1]);
  });
});

describe(`${keys.name}()`, () => {
  test("yields correct keys for a list", () => {
    // 0 -> 1 -> 2 -> 3
    const list = {
      value: 3,
      next: { value: 2, next: { value: 1, next: { value: 0 } } },
    };

    const result = Array.from(keys(list));
    expect(result).toEqual([0, 1, 2, 3]);
  });

  test("handles empty lists correctly", () => {
    const result = Array.from(keys());
    expect(result).toEqual([]);
  });

  test("handles single-element lists correctly", () => {
    const list = { value: 42 };
    const result = Array.from(keys(list));
    expect(result).toEqual([0]);
  });
});

describe(`${toList.name}()`, () => {
  test("returns an empty core for an empty iterable", () => {
    const core = toList([]);
    expect(core.size).toBe(0);
    expect(core.root).toBeDefined();
    expect(core.root.next).toBeUndefined();
    expect(core.tail).toBe(core.root);
  });

  test("correctly converts a single-element iterable to a list", () => {
    const values = [42];
    const { root, size, tail } = toList(values);

    expect(size).toBe(1);
    expect(root.next).toEqual({ value: 42, next: undefined });
    expect(tail).toEqual({ value: 42, next: undefined });
    expect(root.next).toBe(tail);
  });

  test("correctly converts a multi-element iterable to a list", () => {
    const values = [1, 2, 3];
    const { root, size, tail } = toList(values);

    expect(size).toBe(3);
    expect(root.next?.value).toBe(1);
    expect(tail?.value).toBe(3);
    expect(root.next?.next?.next).toBe(tail);
  });

  test("handles iterables with various types", () => {
    const values = ["a", "b", "c"];
    const { root, size, tail } = toList(values);

    expect(size).toBe(3);
    expect(root.next?.value).toBe("a");
    expect(tail?.value).toBe("c");
    expect(root.next?.next?.next).toBe(tail);
  });

  test("verifies the linked list integrity", () => {
    const values = [1, 2, 3, 4, 5];
    const { root, size, tail } = toList(values);

    expect(size).toBe(values.length);
    expect(root.next?.value).toBe(1);
    expect(tail?.value).toBe(5);

    let current = root.next;
    let currentValue = 1;
    while (current?.next) {
      expect(current.value).toBe(currentValue);
      current = current.next;
      currentValue++;
    }
    expect(currentValue).toBe(values.length);
  });
});

describe(`${values.name}()`, () => {
  test("yields correct values for a list", () => {
    // 0 -> 1 -> 2 -> 3
    const list = {
      value: 3,
      next: { value: 2, next: { value: 1, next: { value: 0 } } },
    };

    const result = Array.from(values(list));
    expect(result).toEqual([3, 2, 1, 0]);
  });

  test("handles empty lists correctly", () => {
    const result = Array.from(values());
    expect(result).toEqual([]);
  });

  test("handles single-element lists correctly", () => {
    const list = { value: 42 };
    const result = Array.from(values(list));
    expect(result).toEqual([42]);
  });
});
