import { describe, expect, test } from "vitest";

import { gen as genNode, levels, toList, values } from "./skipNode";
import { clone, cut, gen, getClosest, insert } from "./skipStack";
import { SkipNode } from "../types/skipList";

function toNodesArray<T>(node?: SkipNode<T>): SkipNode<T>[] {
  const nodes: SkipNode<T>[] = [];
  while (node != null) {
    nodes.push(node);
    node = node.levels[0].next;
  }
  return nodes;
}

describe(`${clone.name}()`, () => {
  test("clones an empty skip stack correctly", () => {
    const originalStack = [];
    const clonedStack = clone(originalStack);
    expect(clonedStack).toEqual(originalStack);
    expect(clonedStack).not.toBe(originalStack);
  });

  test("clones a single element skip stack correctly", () => {
    const originalStack = [{ index: 1, node: genNode("A", 1) }];
    const clonedStack = clone(originalStack);
    expect(clonedStack).toEqual(originalStack);
    expect(clonedStack).not.toBe(originalStack);
  });

  test("clones a skip stack correctly", () => {
    const nodes = [genNode("A", 1), genNode("B", 1), genNode("C", 1)];
    const originalStack = [
      { index: 2, node: nodes[2] },
      { index: 1, node: nodes[1] },
      { index: 0, node: nodes[0] },
    ];
    const clonedStack = clone(originalStack);

    expect(clonedStack).toEqual(originalStack);
    expect(clonedStack).not.toBe(originalStack);
    expect(clonedStack[0].node).toBe(originalStack[0].node);
  });
});

describe(`${cut.name}()`, () => {
  test("returns an empty list when distance is negative", () => {
    const core = toList([1, 2], ["a", "b"]);
    const seg = cut(core, 1, -1);

    expect(seg.size).toBe(0);
    expect(seg.tails.length).toBe(1);
    expect(seg.tails[0]).toBe(seg.root);
    expect(Array.from(values(seg.root))).toEqual([undefined]);
  });

  test("returns an empty list when distance is 0", () => {
    const core = toList([1, 2], ["a", "b"]);
    const seg = cut(core, 1, 0);

    expect(seg.size).toBe(0);
    expect(seg.tails.length).toBe(1);
    expect(seg.tails[0]).toBe(seg.root);
    expect(Array.from(values(seg.root))).toEqual([undefined]);
  });

  test("cuts a segment from the middle of the skip list", () => {
    const originalItems = ["a", "b", "c", "d", "e"];
    const core = toList([1, 2, 3, 2, 1], originalItems);
    const start = 1; // Starting at 'b'
    const distance = 3; // Cutting 'b', 'c', 'd'

    const segment = cut(core, start, distance);

    // Check if the segment has the correct items
    const segmentLevels = Array.from(levels(segment.root));
    expect(segmentLevels).toEqual([3, 2, 3, 2]);
    const segmentValues = Array.from(values(segment.root));
    expect(segmentValues).toEqual([undefined, "b", "c", "d"]);

    // Verify original list is updated correctly
    const remainingLevels = Array.from(levels(core.root));
    expect(remainingLevels).toEqual([1, 1, 1]);
    const remainingValues = Array.from(values(core.root));
    expect(remainingValues).toEqual([undefined, "a", "e"]);
  });

  test("cuts the entire list when start is 0 and distance equals list size", () => {
    const core = toList([2, 3, 1], ["a", "b", "c"]);
    const segment = cut(core, 0, 3);

    // Check if the segment has the correct items
    const segmentLevels = Array.from(levels(segment.root));
    expect(segmentLevels).toEqual([3, 2, 3, 1]);
    const segmentValues = Array.from(values(segment.root));
    expect(segmentValues).toEqual([undefined, "a", "b", "c"]);

    // Verify original list is updated correctly
    const remainingLevels = Array.from(levels(core.root));
    expect(remainingLevels).toEqual([1]);
    const remainingValues = Array.from(values(core.root));
    expect(remainingValues).toEqual([undefined]);
  });

  test("handles cuts beyond the list size gracefully", () => {
    const core = toList([2, 1], ["a", "b"]);
    const segment = cut(core, 1, 5); // Attempting to cut more items than exist from position 1

    expect(segment.size).toBe(1); // Only 'b' is cut

    // Check if the segment has the correct items
    const segmentLevels = Array.from(levels(segment.root));
    expect(segmentLevels).toEqual([1, 1]);
    const segmentValues = Array.from(values(segment.root));
    expect(segmentValues).toEqual([undefined, "b"]);

    // Verify original list is updated correctly
    const remainingLevels = Array.from(levels(core.root));
    expect(remainingLevels).toEqual([2, 2]);
    const remainingValues = Array.from(values(core.root));
    expect(remainingValues).toEqual([undefined, "a"]);
  });

  test("Adjusts levels correctly when removing highest level(s)", () => {
    const core = toList([4, 1, 5, 2], ["a", "b", "c", "d"]);
    const segment = cut(core, 1, 2);

    // Check if the segment has the correct items
    const segmentLevels = Array.from(levels(segment.root));
    expect(segmentLevels).toEqual([5, 1, 5]);

    // Verify original list is updated correctly
    const remainingLevels = Array.from(levels(core.root));
    expect(remainingLevels).toEqual([4, 4, 2]);
  });

  test("Adjusts levels correctly when not removing highest level(s)", () => {
    const core = toList([5, 1, 2, 3], ["a", "b", "c", "d"]);
    const segment = cut(core, 1, 2);

    // Check if the segment has the correct items
    const segmentLevels = Array.from(levels(segment.root));
    expect(segmentLevels).toEqual([2, 1, 2]);

    // Verify original list is updated correctly
    const remainingLevels = Array.from(levels(core.root));
    expect(remainingLevels).toEqual([5, 5, 3]);
  });
});

describe(`${gen.name}()`, () => {
  test("handles nodes with zero levels", () => {
    const node = genNode("zero", 0);
    const stack = gen(node, 0);
    expect(stack).toEqual([]);
  });

  test("generates a stack with pointers all pointing to the same node and index", () => {
    const node = genNode("three", 3);
    const stack = gen(node, 5);

    expect(stack.length).toBe(3);
    for (let i = 0; i < 3; ++i) {
      expect(stack[i].node).toBe(node);
      expect(stack[i].index).toBe(5);
    }
  });

  test("defaults index to 0 if not specified", () => {
    const node = genNode("two", 2);
    const stack = gen(node);

    expect(stack.length).toBe(2);
    for (let i = 0; i < 2; ++i) {
      expect(stack[i].node).toBe(node);
      expect(stack[i].index).toBe(0);
    }
  });
});

describe(`${getClosest.name}()`, () => {
  test("returns the input stack for empty stack", () => {
    const stack = [];
    const result = getClosest(stack, 100);

    expect(result).toBe(stack);
    expect(result).toEqual([]);
  });

  test("returns the stack for zero distance", () => {
    const node = genNode("A", 2);
    const stack = [{ index: 0, node }];
    const result = getClosest(stack, 0);

    expect(result).toBe(stack);
    expect(result).toEqual([{ index: 0, node }]);
  });

  test("returns a cloned stack for negative distance", () => {
    const node = genNode("A", 2);
    const stack = [{ index: 0, node }];
    const result = getClosest(stack, -1);

    expect(result).toBe(stack);
    expect(result).toEqual([{ index: 0, node }]);
  });

  test("finds closest nodes within bounds for distance = 1", () => {
    const target = 1;
    const { root } = toList([1, 2, 1, 4, 1], ["a", "b", "c", "d", "e"]);
    const stack = gen(root, -1);
    const nodes = toNodesArray(stack[0].node);
    const result = getClosest(stack, target + 1);
    const Y = stack.length;

    expect(result).toBe(stack);
    expect(result.length).toBe(Y);
    for (let y = 0; y < Y; ++y) {
      const { index, node } = result[y];
      expect(node).toBe(nodes[index + 1]);
      expect(index).toBeLessThanOrEqual(target);
      expect(index + node.levels[y].span).toBeGreaterThan(target);
    }
  });

  test("finds closest nodes within bounds for positive distance", () => {
    const target = 2;
    const { root } = toList([1, 2, 1, 4, 1], ["a", "b", "c", "d", "e"]);

    const stack = gen(root, -1);
    const Y = stack.length;
    const nodes = toNodesArray(stack[0].node);
    const result = getClosest(stack, target + 1);

    expect(result).toBe(stack);
    expect(result.length).toBe(Y);
    for (let y = 0; y < Y; ++y) {
      const { index, node } = result[y];
      expect(node).toBe(nodes[index + 1]);
      expect(index).toBeLessThanOrEqual(target);
      expect(index + node.levels[y].span).toBeGreaterThan(target);
    }
  });

  test("finds closest nodes within bounds for last node", () => {
    const target = 4;
    const { root } = toList([1, 2, 1, 4, 1], ["a", "b", "c", "d", "e"]);
    const stack = gen(root, -1);
    const Y = stack.length;
    const nodes = toNodesArray(stack[0].node);
    const result = getClosest(stack, target + 1);

    expect(result).toBe(stack);
    expect(result.length).toBe(Y);
    for (let y = 0; y < Y; ++y) {
      const { index, node } = result[y];
      expect(node).toBe(nodes[index + 1]);
      expect(index).toBeLessThanOrEqual(target);
      expect(index + node.levels[y].span).toBeGreaterThan(target);
    }
  });

  test("finds closest nodes for distance exceeding bounds", () => {
    const target = 99;
    const { root, size } = toList([1, 2, 1, 4, 1], ["a", "b", "c", "d", "e"]);
    const stack = gen(root, -1);
    const Y = stack.length;
    const nodes = toNodesArray(stack[0].node);
    const result = getClosest(stack, target + 1);

    expect(result).toBe(stack);
    expect(result.length).toBe(Y);
    for (let y = 0; y < Y; ++y) {
      const { index, node } = result[y];
      expect(node).toBe(nodes[index + 1]);
      expect(index + node.levels[y].span).toBe(size);
    }
  });
});

describe(`${insert.name}()`, () => {
  test("Insert empty src into dest should not change dest", () => {
    const destLevels = [2, 2, 1];
    const destValues = ["a", "b", "c"];
    const dest = toList(destLevels, destValues);

    const src = toList([], []); // Empty src skip list

    insert(dest, 1, src);

    expect(dest.size).toBe(3);
    expect(dest.tails.length).toBe(2);
    expect(Array.from(levels(dest.root))).toEqual([2, 2, 2, 1]);
    expect(Array.from(values(dest.root))).toEqual([undefined, "a", "b", "c"]);
  });

  test("Insert src into empty dest", () => {
    const srcLevels = [1, 1];
    const srcValues = ["x", "y"];
    const src = toList(srcLevels, srcValues);

    const dest = toList([], []); // Empty dest skip list

    insert(dest, 0, src);

    expect(dest.size).toBe(2);
    expect(dest.tails.length).toBe(1);
    expect(Array.from(levels(dest.root))).toEqual([1, 1, 1]);
    expect(Array.from(values(dest.root))).toEqual([undefined, "x", "y"]);
  });

  test("Insert at start of the dest", () => {
    const destLevels = [1, 1, 1];
    const destValues = ["a", "b", "c"];
    const dest = toList(destLevels, destValues);

    const srcLevels = [2, 1];
    const srcValues = ["x", "y"];
    const src = toList(srcLevels, srcValues);

    insert(dest, 0, src);

    expect(dest.size).toBe(5);
    expect(dest.tails.length).toBe(2);
    expect(Array.from(levels(dest.root))).toEqual([2, 2, 1, 1, 1, 1]);
    expect(Array.from(values(dest.root))).toEqual([
      undefined,
      "x",
      "y",
      "a",
      "b",
      "c",
    ]);
  });

  test("Insert at end of the dest", () => {
    const dest = toList([1, 1, 1], ["a", "b", "c"]);
    const src = toList([2, 1], ["x", "y"]);

    insert(dest, 3, src); // Inserting at the end

    expect(dest.size).toBe(5);
    expect(dest.tails.length).toBe(2);
    expect(Array.from(levels(dest.root))).toEqual([2, 1, 1, 1, 2, 1]);
    expect(Array.from(values(dest.root))).toEqual([
      undefined,
      "a",
      "b",
      "c",
      "x",
      "y",
    ]);
  });

  test("Insert src with more levels than dest", () => {
    const dest = toList([1, 1], ["a", "b"]);
    const src = toList([3, 2], ["x", "y"]); // Src has more levels

    insert(dest, 1, src);

    expect(dest.size).toBe(4);
    expect(dest.tails.length).toBe(3);
    expect(Array.from(levels(dest.root))).toEqual([3, 1, 3, 2, 1]);
    expect(Array.from(values(dest.root))).toEqual([
      undefined,
      "a",
      "x",
      "y",
      "b",
    ]);
  });
});
