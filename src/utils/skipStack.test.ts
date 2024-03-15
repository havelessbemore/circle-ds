import { describe, expect, test } from "vitest";

import { gen as genNode, toList } from "./skipNode";
import { clone, gen, getClosest } from "./skipStack";
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
    const [root] = toList([1, 2, 1, 4, 1], ["a", "b", "c", "d", "e"]);
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
    const [root] = toList([1, 2, 1, 4, 1], ["a", "b", "c", "d", "e"]);

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
    const [root] = toList([1, 2, 1, 4, 1], ["a", "b", "c", "d", "e"]);
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
    const [root, , length] = toList([1, 2, 1, 4, 1], ["a", "b", "c", "d", "e"]);
    const stack = gen(root, -1);
    const Y = stack.length;
    const nodes = toNodesArray(stack[0].node);
    const result = getClosest(stack, target + 1);

    expect(result).toBe(stack);
    expect(result.length).toBe(Y);
    for (let y = 0; y < Y; ++y) {
      const { index, node } = result[y];
      expect(node).toBe(nodes[index + 1]);
      expect(index + node.levels[y].span).toBe(length);
    }
  });
});
