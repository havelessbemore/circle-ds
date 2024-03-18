import { describe, expect, test } from "vitest";

import { copy, cut, get, insert, toList } from "./doublyLinkedNode";
import { values } from "./linkedNode";
import { LinkedNode } from "../types/linkedNode";

export function toArray<T>(node?: LinkedNode<T>): T[] {
  return Array.from(values(node));
}

describe(`${copy.name}()`, () => {
  test("returns undefineds when input node is undefined", () => {
    const { root, size, tail } = copy(undefined, 2);

    expect(size).toBe(0);
    expect(root).toBeDefined();
    expect(root.prev).toBeUndefined();
    expect(root.next).toBeUndefined();
    expect(tail).toBe(root);
  });

  test("returns undefineds when count is negative", () => {
    const src = toList(["A", "B", "C"]);
    const { root, size, tail } = copy(src.root.next, -1);

    expect(size).toBe(0);
    expect(root).toBeDefined();
    expect(root.prev).toBeUndefined();
    expect(root.next).toBeUndefined();
    expect(tail).toBe(root);
  });

  test("returns undefineds when count is zero", () => {
    const src = toList(["A", "B", "C"]);
    const { root, size, tail } = copy(src.root.next, 0);

    expect(size).toBe(0);
    expect(root).toBeDefined();
    expect(root.prev).toBeUndefined();
    expect(root.next).toBeUndefined();
    expect(tail).toBe(root);
  });

  test("copies the specified number of nodes from the list", () => {
    const src = toList(["A", "B", "C", "D"]);
    const { root, size, tail } = copy(src.root.next, 2);
    const head = root.next!;

    expect(size).toBe(2);
    expect(head.value).toBe("A");
    expect(tail.value).toBe("B");
    expect(head.prev).toBe(root);
    expect(tail.next).toBeUndefined();
    expect(Array.from(values(head))).toEqual(["A", "B"]);
  });

  test("handles copying more nodes than available", () => {
    const src = toList(["A", "B", "C"]);
    const { root, size, tail } = copy(src.root.next, 5);
    const head = root.next!;

    expect(size).toBe(3);
    expect(head.value).toBe("A");
    expect(tail.value).toBe("C");
    expect(head.prev).toBe(root);
    expect(tail.next).toBeUndefined();
    expect(Array.from(values(head))).toEqual(["A", "B", "C"]);
  });
});

describe(`${cut.name}()`, () => {
  test("returns an empty core for a negative count", () => {
    const { root } = toList([1, 2, 3]);
    const core = cut(root.next!, -1);

    expect(core.size).toBe(0);
    expect(core.root).toBeDefined();
    expect(core.root.prev).toBeUndefined();
    expect(core.root.next).toBeUndefined();
    expect(core.tail).toBe(core.root);
  });

  test("returns an empty core for a zero count", () => {
    const { root } = toList([1, 2, 3]);
    const core = cut(root.next!, 0);

    expect(core.size).toBe(0);
    expect(core.root).toBeDefined();
    expect(core.root.prev).toBeUndefined();
    expect(core.root.next).toBeUndefined();
    expect(core.tail).toBe(core.root);
  });

  test("correctly cuts a segment from the list", () => {
    const { root } = toList([1, 2, 3, 4, 5]);
    const head = root.next!;
    const seg = cut(head, 2);
    const newHead = seg.root.next!;

    expect(newHead.value).toBe(2);
    expect(seg.tail.value).toBe(3);
    expect(newHead.prev).toBe(seg.root);
    expect(seg.tail.next).toBeUndefined();
    expect(head.next?.value).toBe(4);
  });

  test("maintains list integrity when cutting the entire list", () => {
    const list = toList([0, 1, 2]);
    const { root, tail } = cut(list.root.next!, 2);
    expect(root.next?.value).toBe(1);
    expect(tail?.value).toBe(2);
    expect(list.root.next!.next).toBeUndefined();
  });

  test("throws TypeError if count is larger than list size", () => {
    const list = toList([0, 1]);
    expect(() => cut(list.root.next!, 5)).toThrow(TypeError);
  });

  test("verifies tail.prev is updated correctly", () => {
    const { root } = toList([1, 2, 3, 4]);
    const head = root.next!;
    cut(head, 2);
    expect(head.next?.value).toBe(4);
    expect(head.next?.prev).toBe(head);
  });
});

describe(`${get.name}()`, () => {
  test("returns undefined for empty list", () => {
    const list = toList([]);
    const head = list.root.next!;
    expect(get(head, 0)).toBeUndefined();
    expect(get(head, -1)).toBeUndefined();
  });

  test("successfully retrieves the first node", () => {
    const list = toList([1, 2, 3, 4, 5]);
    const head = list.root.next!;
    expect(get(head, 0)?.value).toBe(1);
  });

  test("successfully retrieves node at positive index", () => {
    const list = toList([1, 2, 3, 4, 5]);
    const head = list.root.next!;
    const node = get(head, 2);
    expect(node?.value).toBe(3);
  });

  test("successfully retrieves node at last index", () => {
    const list = toList([1, 2, 3, 4, 5]);
    const head = list.root.next!;
    const node = get(head, 4);
    expect(node?.value).toBe(5);
  });

  test("returns undefined for positive index out of bounds", () => {
    const list = toList([1, 2, 3]);
    const head = list.root.next!;
    expect(get(head, 3)).toBeUndefined();
    expect(get(head, 5)).toBeUndefined();
  });

  test("successfully retrieves node at negative index", () => {
    const { tail } = toList([1, 2, 3, 4, 5]);
    expect(get(tail, -2)?.value).toBe(3);
  });

  test("successfully retrieves node at first index", () => {
    const { tail } = toList([1, 2, 3, 4, 5]);
    expect(get(tail, -4)?.value).toBe(1);
  });

  test("returns undefined for negative index out of bounds", () => {
    const { root, tail } = toList([1, 2, 3]);
    expect(get(tail, -3)).toBe(root);
    expect(get(tail, -4)).toBeUndefined();
  });

  test("handles single-element list correctly", () => {
    const { root } = toList([42]);
    const head = root.next;
    expect(get(head, 0)?.value).toBe(42);
    expect(get(head, -1)?.value).toBeUndefined();
    expect(get(head, 1)).toBeUndefined();
    expect(get(head, -2)).toBeUndefined();
  });
});

describe(`${insert.name}()`, () => {
  test("inserts values into an empty list", () => {
    const { root } = toList([0]);
    const head = root.next;
    const values = [1, 2, 3];
    insert(head!, values);
    expect(toArray(head)).toEqual([0, 1, 2, 3]);
  });

  test("inserts with an empty array of values", () => {
    const { root } = toList([0]);
    const head = root.next;
    insert(head!, []);
    expect(toArray(head!)).toEqual([0]);
  });

  test("inserts at the beginning of a list", () => {
    const { root } = toList([0, 1, 2, 3]);
    const head = root.next;
    const values = [4, 5, 6];
    insert(head!, values);
    expect(toArray(head)).toEqual([0, 4, 5, 6, 1, 2, 3]);
  });

  test("inserts in the middle of a list", () => {
    const { root } = toList([0, 3, 4]);
    const head = root.next;
    const values = [1, 2];
    insert(head!.next!, values);
    expect(toArray(head!)).toEqual([0, 3, 1, 2, 4]);
  });

  test("inserts at the end of a list", () => {
    const { root, tail } = toList([0, 1, 2]);
    const head = root.next;
    const values = [3, 4];
    insert(tail!, values);
    expect(toArray(head!)).toEqual([0, 1, 2, 3, 4]);
  });

  test("updates prev links after insertion", () => {
    const { tail } = toList([0, 1, 2]);
    const values = [3, 4];
    let newTail = insert(tail, values);
    for (let i = 4; i >= 0; --i) {
      expect(newTail.value).toEqual(i);
      newTail = newTail.prev!;
    }
  });
});

describe(`${toList.name}()`, () => {
  test("returns an empty core for an empty iterable", () => {
    const core = toList([]);
    expect(core.size).toBe(0);
    expect(core.root).toBeDefined();
    expect(core.root.prev).toBeUndefined();
    expect(core.root.next).toBeUndefined();
    expect(core.tail).toBe(core.root);
  });

  test("correctly converts a single-element iterable into a list", () => {
    const { root, size, tail } = toList([42]);
    const head = root.next;

    expect(size).toBe(1);
    expect(head).toEqual(expect.objectContaining({ value: 42 }));
    expect(head).toBe(tail);
    expect(head?.prev).toBe(root);
    expect(head?.next).toBeUndefined();
  });

  test("correctly converts a multi-element iterable into a list", () => {
    const values = [1, 2, 3, 4];
    const { root, size, tail } = toList(values);
    const head = root.next!;

    expect(size).toBe(values.length);

    // Verify head and tail values
    expect(head.value).toBe(1);
    expect(tail.value).toBe(4);

    // Verify linkage
    expect(head.next?.next?.value).toBe(3);
    expect(tail.prev?.prev?.value).toBe(2);

    // Verify head and tail pointers
    expect(head.prev).toBe(root);
    expect(tail.next).toBeUndefined();
  });

  test("ensures correct prev linkage in a list", () => {
    const values = [1, 2, 3];
    const { root } = toList(values);
    const head = root.next;

    // Verify that each node's prev property correctly points to the previous node
    let current = head?.next;
    while (current?.next) {
      expect(current.prev?.next).toBe(current);
      current = current.next;
    }
  });

  test("handles iterables with mixed types", () => {
    const mixedValues = ["a", 42, true];
    const { root, size } = toList(mixedValues);
    const head = root.next;

    expect(size).toBe(mixedValues.length);
    expect(head?.value).toBe("a");
    expect(head?.next?.value).toBe(42);
    expect(head?.next?.next?.value).toBe(true);
  });
});
