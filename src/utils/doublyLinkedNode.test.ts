import { describe, expect, test } from "vitest";

import { cut, get, toList } from "./doublyLinkedNode";

describe(`${cut.name}()`, () => {
  test("returns [undefined, undefined] for non-positive count", () => {
    const [list] = toList([1, 2, 3]);
    expect(cut(list!, 0)).toEqual([undefined, undefined]);
    expect(cut(list!, -1)).toEqual([undefined, undefined]);
  });

  test("correctly cuts a segment from the list", () => {
    const [list] = toList([1, 2, 3, 4, 5]);
    const [head, tail] = cut(list!, 2);

    expect(head?.value).toBe(2);
    expect(tail?.value).toBe(3);
    expect(head?.prev).toBeUndefined();
    expect(tail?.next).toBeUndefined();
    expect(list?.next?.value).toBe(4);
  });

  test("maintains list integrity when cutting the entire list", () => {
    const [list] = toList([0, 1, 2]);
    const [head, tail] = cut(list!, 2);
    expect(head?.value).toBe(1);
    expect(tail?.value).toBe(2);
    expect(list!.next).toBeUndefined();
  });

  test("throws TypeError if count is larger than list size", () => {
    const [list] = toList([0, 1]);
    expect(() => cut(list!, 5)).toThrow(TypeError);
  });

  test("verifies tail.prev is updated correctly", () => {
    const [list] = toList([1, 2, 3, 4]);
    cut(list!, 2);
    expect(list!.next?.value).toBe(4);
    expect(list!.next?.prev).toBe(list);
  });
});

describe(`${get.name}()`, () => {
  test("returns undefined for empty list", () => {
    const [list] = toList([]);
    expect(get(list, 0)).toBeUndefined();
    expect(get(list, -1)).toBeUndefined();
  });

  test("successfully retrieves the first node", () => {
    const [list] = toList([1, 2, 3, 4, 5]);
    expect(get(list, 0)?.value).toBe(1);
  });

  test("successfully retrieves node at positive index", () => {
    const [list] = toList([1, 2, 3, 4, 5]);
    const node = get(list, 2);
    expect(node?.value).toBe(3);
  });

  test("successfully retrieves node at last index", () => {
    const [list] = toList([1, 2, 3, 4, 5]);
    const node = get(list, 4);
    expect(node?.value).toBe(5);
  });

  test("returns undefined for positive index out of bounds", () => {
    const [list] = toList([1, 2, 3]);
    expect(get(list, 3)).toBeUndefined();
    expect(get(list, 5)).toBeUndefined();
  });

  test("successfully retrieves node at negative index", () => {
    const [, tail] = toList([1, 2, 3, 4, 5]);
    expect(get(tail, -2)?.value).toBe(3);
  });

  test("successfully retrieves node at first index", () => {
    const [, tail] = toList([1, 2, 3, 4, 5]);
    expect(get(tail, -4)?.value).toBe(1);
  });

  test("returns undefined for negative index out of bounds", () => {
    const [, tail] = toList([1, 2, 3]);
    expect(get(tail, -3)).toBeUndefined();
    expect(get(tail, -4)).toBeUndefined();
  });

  test("handles single-element list correctly", () => {
    const [list] = toList([42]);
    expect(get(list, 0)?.value).toBe(42);
    expect(get(list, -1)?.value).toBeUndefined();
    expect(get(list, 1)).toBeUndefined();
    expect(get(list, -2)).toBeUndefined();
  });
});

describe(`${toList.name}()`, () => {
  test("returns [undefined, undefined, 0] for an empty iterable", () => {
    const result = toList([]);
    expect(result).toEqual([undefined, undefined, 0]);
  });

  test("correctly converts a single-element iterable into a list", () => {
    const [head, tail, count] = toList([42]);

    expect(count).toBe(1);
    expect(head).toEqual(expect.objectContaining({ value: 42 }));
    expect(head).toBe(tail);
    expect(head?.prev).toBeUndefined();
    expect(head?.next).toBeUndefined();
  });

  test("correctly converts a multi-element iterable into a list", () => {
    const values = [1, 2, 3, 4];
    const [head, tail, count] = toList(values);

    expect(count).toBe(values.length);

    // Verify head and tail values
    expect(head?.value).toBe(1);
    expect(tail?.value).toBe(4);

    // Verify linkage
    expect(head?.next?.next?.value).toBe(3);
    expect(tail?.prev?.prev?.value).toBe(2);

    // Verify head and tail pointers
    expect(head?.prev).toBeUndefined();
    expect(tail?.next).toBeUndefined();
  });

  test("ensures correct prev linkage in a list", () => {
    const values = [1, 2, 3];
    const [head, ,] = toList(values);

    // Verify that each node's prev property correctly points to the previous node
    let current = head?.next;
    while (current?.next) {
      expect(current.prev?.next).toBe(current);
      current = current.next;
    }
  });

  test("handles iterables with mixed types", () => {
    const mixedValues = ["a", 42, true];
    const [head, , count] = toList(mixedValues);

    expect(count).toBe(mixedValues.length);
    expect(head?.value).toBe("a");
    expect(head?.next?.value).toBe(42);
    expect(head?.next?.next?.value).toBe(true);
  });
});
