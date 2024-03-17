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
    const [head, tail, size] = copy(undefined, 2);

    expect(size).toBe(0);
    expect(head).toBeUndefined();
    expect(tail).toBeUndefined();
  });

  test("returns undefineds when count is negative", () => {
    const [src] = toList(["A", "B", "C"]);
    const [head, tail, size] = copy(src, -1);

    expect(size).toBe(0);
    expect(head).toBeUndefined();
    expect(tail).toBeUndefined();
  });

  test("returns undefineds when count is zero", () => {
    const [src] = toList(["A", "B", "C"]);
    const [head, tail, size] = copy(src, 0);

    expect(size).toBe(0);
    expect(head).toBeUndefined();
    expect(tail).toBeUndefined();
  });

  test("copies the specified number of nodes from the list", () => {
    const [src] = toList(["A", "B", "C", "D"]);
    const [head, tail, size] = copy(src, 2);

    expect(size).toBe(2);
    expect(head!.value).toBe("A");
    expect(tail!.value).toBe("B");
    expect(tail!.next).toBeUndefined();
    expect(Array.from(values(head))).toEqual(["A", "B"]);
  });

  test("handles copying more nodes than available", () => {
    const [src] = toList(["A", "B", "C"]);
    const [head, tail, size] = copy(src, 5);

    expect(size).toBe(3);
    expect(head!.value).toBe("A");
    expect(tail!.value).toBe("C");
    expect(tail!.next).toBeUndefined();
    expect(Array.from(values(head))).toEqual(["A", "B", "C"]);
  });
});

describe(`${cut.name}()`, () => {
  test("returns [undefined, undefined] for non-positive count", () => {
    const list = { value: 1, next: { value: 2 } };
    expect(cut(list, 0)).toEqual([undefined, undefined]);
    expect(cut(list, -1)).toEqual([undefined, undefined]);
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
    const [head, tail] = cut(list, 2);

    expect(head?.value).toBe(1);
    expect(tail?.value).toBe(2);
    expect(list.next?.value).toBe(3); // Original list should now start at 3
    expect(tail?.next).toBeUndefined(); // Ensure the tail's next is cut off
  });

  test("maintains list integrity when cutting the entire list", () => {
    const list = { value: 0, next: { value: 1, next: { value: 2 } } };
    const [head, tail] = cut(list, 2);

    expect(head?.value).toBe(1);
    expect(tail?.value).toBe(2);
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

  test("stops iteration at the specified end node", () => {
    // 0 -> 1 -> [2] -> 3
    const end = { value: 2, next: { value: 3 } };
    const list = { value: 0, next: { value: 1, next: end } };

    const result = Array.from(entries(list, end));
    expect(result).toEqual([
      [0, 0],
      [1, 1],
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

  test("returns no entries when head is the same as end", () => {
    const node = { value: 0, next: { value: 1, next: { value: 2 } } };
    const result = Array.from(entries(node, node));
    expect(result).toEqual([]);
  });
});

describe(`${get.name}()`, () => {
  test("retrieves the correct node at a given index", () => {
    const [head] = toList([1, 2, 3, 4, 5]);
    const node = get(head, 2);
    expect(node?.value).toBe(3);
  });

  test("returns undefined for negative indices", () => {
    const [head] = toList([1, 2, 3]);
    const node = get(head, -1);
    expect(node).toBeUndefined();
  });

  test("handles empty lists correctly", () => {
    const [head] = toList([]);
    const node = get(head, 0);
    expect(node).toBe(head);
  });

  test("handles single-element lists correctly", () => {
    const [head] = toList([42]);
    const node = get(head, 0);
    expect(node).toBe(head);
  });

  test("returns the head node when index is 0", () => {
    const [head] = toList([1, 2, 3]);
    const node = get(head, 0);
    expect(node).toBe(head);
  });

  test("returns the tail node when index equals length - 1", () => {
    const [head] = toList([1, 2, 3]);
    const node = get(head, 2);
    expect(node?.value).toBe(3);
  });

  test("returns undefined when index equals length", () => {
    const [head] = toList([1, 2, 3]);
    const node = get(head, 3);
    expect(node).toBe(undefined);
  });

  test("returns undefined when index greater than length", () => {
    const [head] = toList([1, 2, 3]);
    const node = get(head, 5);
    expect(node).toBe(undefined);
  });
});

describe(`${has.name}()`, () => {
  test("returns false when head is undefined", () => {
    expect(has(undefined, 1)).toBe(false);
  });

  test("returns true for a value present in the list", () => {
    const [head] = toList([1, 2, 3, 4, 5]);
    expect(has(head, 3)).toBe(true);
  });

  test("returns false for a value not present in the list", () => {
    const [head] = toList([1, 2, 3, 4, 5]);
    expect(has(head, 6)).toBe(false);
  });

  test("handles single-element lists correctly", () => {
    const [head] = toList([42]);
    expect(has(head, 42)).toBe(true);
    expect(has(head, 1)).toBe(false);
  });

  test("returns false for an empty list", () => {
    const [head] = toList([]);
    expect(has(head, 1)).toBe(false);
  });

  test("stops searching at the specified end node", () => {
    const [head] = toList([1, 2, 3, 4, 5]);
    const end = head!.next!.next!.next; // End node at value 3
    expect(has(head, 4, end)).toBe(false); // Should not find value 4
    expect(has(head, 3, end)).toBe(true); // Should find value 3
  });
});

describe(`${insert.name}()`, () => {
  test("inserts values into an empty list", () => {
    const [, prev] = toList([0]);
    const values = [1, 2, 3];
    const lastNode = insert(prev!, values);
    expect(toArray(prev)).toEqual([0, 1, 2, 3]);
    expect(lastNode.value).toEqual(3);
  });

  test("inserts values with an empty array", () => {
    const [, prev] = toList([0]);
    const values: number[] = [];
    const lastNode = insert(prev!, values);
    expect(toArray(prev!)).toEqual([0]);
    expect(lastNode.value).toEqual(0);
  });

  test("inserts values at the beginning of a list", () => {
    const [prev] = toList([-1, 0]);
    const values = [1, 2, 3];
    insert(prev!, values);
    expect(toArray(prev)).toEqual([-1, 1, 2, 3, 0]);
  });

  test("inserts values in the middle of a list", () => {
    const [prev] = toList([0, 1, 4, 5]);
    const values = [2, 3];
    insert(prev!.next!, values);
    expect(toArray(prev)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  test("inserts values at the end of a list", () => {
    const [head, prev] = toList([0, 1, 2]);
    const values = [3, 4];
    insert(prev!, values);
    expect(toArray(head)).toEqual([0, 1, 2, 3, 4]);
  });

  test("inserts iterable other than an array", () => {
    const [prev] = toList([0, 1]);
    const values = new Set([2, 3, 4]);
    insert(prev!, values);
    expect(toArray(prev)).toEqual([0, 2, 3, 4, 1]);
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

  test("stops iteration at the specified end node", () => {
    // 0 -> 1 -> [2] -> 3
    const end = { value: 1, next: { value: 0 } };
    const list = { value: 3, next: { value: 2, next: end } };

    const result = Array.from(keys(list, end));
    expect(result).toEqual([0, 1]);
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

  test("returns no keys when head is the same as end", () => {
    const node = { value: 0, next: { value: 1, next: { value: 2 } } };
    const result = Array.from(keys(node, node));
    expect(result).toEqual([]);
  });
});

describe(`${toList.name}()`, () => {
  test("returns [undefined, undefined, 0] for an empty iterable", () => {
    const result = toList([]);
    expect(result).toEqual([undefined, undefined, 0]);
  });

  test("correctly converts a single-element iterable to a list", () => {
    const values = [42];
    const [head, tail, count] = toList(values);

    expect(count).toBe(1);
    expect(head).toEqual({ value: 42, next: undefined });
    expect(tail).toEqual({ value: 42, next: undefined });
    expect(head).toBe(tail);
  });

  test("correctly converts a multi-element iterable to a list", () => {
    const values = [1, 2, 3];
    const [head, tail, count] = toList(values);

    expect(count).toBe(3);
    expect(head?.value).toBe(1);
    expect(tail?.value).toBe(3);
    expect(head?.next?.next).toBe(tail);
  });

  test("handles iterables with various types", () => {
    const values = ["a", "b", "c"];
    const [head, tail, count] = toList(values);

    expect(count).toBe(3);
    expect(head?.value).toBe("a");
    expect(tail?.value).toBe("c");
    expect(head?.next?.next).toBe(tail);
  });

  test("verifies the linked list integrity", () => {
    const values = [1, 2, 3, 4, 5];
    const [head, tail, count] = toList(values);

    expect(count).toBe(values.length);
    expect(head?.value).toBe(1);
    expect(tail?.value).toBe(5);

    let current = head;
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

  test("stops iteration at the specified end node", () => {
    // 0 -> 1 -> [2] -> 3
    const end = { value: 1, next: { value: 0 } };
    const list = { value: 3, next: { value: 2, next: end } };

    const result = Array.from(values(list, end));
    expect(result).toEqual([3, 2]);
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

  test("returns no values when head is the same as end", () => {
    const node = { value: 0, next: { value: 1, next: { value: 2 } } };
    const result = Array.from(values(node, node));
    expect(result).toEqual([]);
  });
});
