import { describe, expect, test } from "vitest";

import {
  calcMaxLevel,
  entries,
  gen,
  get,
  getClosest,
  has,
  keys,
  getNodes,
  toList,
  truncateLevels,
  values,
  copy,
  levels,
} from "./skipNode";
import { SkipNode } from "../types/skipList";

function testList<T>(values: T[]): SkipNode<T>[] {
  const N = values.length;
  if (N <= 0) {
    return [];
  }
  const levels = new Array(N).fill(1);
  const { root } = toList(levels, values);
  return Array.from(getNodes(root.levels[0].next));
}

describe(`${calcMaxLevel.name}()`, () => {
  function expectedLevel(p: number, size: number): number {
    return Math.ceil(Math.log(size) / Math.log(1 / p));
  }

  test("handles edge case where p is very close to 0", () => {
    const p = 0.001;
    const size = 100;
    expect(calcMaxLevel(p, size)).toBe(expectedLevel(p, size));
  });

  test("handles edge case where p is very close to 1", () => {
    const p = 0.999;
    const size = 100;
    expect(calcMaxLevel(p, size)).toBe(expectedLevel(p, size));
  });

  test("calculates correct level for given p and expectedSize", () => {
    const step = 0.05;
    const size = 1000;
    for (let p = step; p < 1; p += step) {
      expect(calcMaxLevel(p, size)).toBe(expectedLevel(p, size));
    }
  });

  test("Returns 1 for p values <= 0", () => {
    expect(calcMaxLevel(0, 100)).toBe(1);
    expect(calcMaxLevel(-1, 100)).toBe(1);
  });

  test("handles p values >= 1", () => {
    expect(calcMaxLevel(1, 100)).toBe(Infinity);
    expect(calcMaxLevel(2, 100)).toBe(Infinity);
  });

  test("handles edge case where expectedSize is very close to 1", () => {
    const p = 0.5;
    expect(calcMaxLevel(p, 2)).toBe(expectedLevel(p, 2));
    expect(calcMaxLevel(p, 1.5)).toBe(expectedLevel(p, 1.5));
    expect(calcMaxLevel(p, 1.001)).toBe(expectedLevel(p, 1.001));
  });

  test("Returns 1 for expectedSize <= 1", () => {
    expect(calcMaxLevel(0.5, 1)).toBe(1);
    expect(calcMaxLevel(0.5, 0)).toBe(1);
    expect(calcMaxLevel(0.5, -1)).toBe(1);
  });
});

describe(`${copy.name}()`, () => {
  test("returns a segment with only a root node when count is 0 or negative", () => {
    const { root } = toList([1, 1, 1], ["A", "B", "C"]);
    const core = copy(root, 1, 0);

    expect(core.size).toBe(0);
    expect(core.root.levels.length).toBe(1);
    expect(core.tails[0]).toBe(core.root);
    expect(core.tails[0].levels[0].next).toBeUndefined();
  });

  test("copies the specified number of nodes from the list starting at the given position", () => {
    const { root } = toList([2, 2, 2, 2], ["A", "B", "C", "D"]);
    const core = copy(root, 1, 2); // Copy from node 'B' to 'C'

    expect(core.size).toBe(2);
    expect(core.tails.length).toBe(2);
    expect(core.root.levels[0].next?.value).toBe("B");
    expect(core.tails[0].value).toBe("C");
    expect(core.tails[0].levels[0].next).toBeUndefined();
  });

  test("handles copying more nodes than available from the start position", () => {
    const { root } = toList([1, 1, 1], ["A", "B", "C"]);
    const core = copy(root, 1, 5);

    expect(core.size).toBe(2);
    expect(core.tails[0].value).toBe("C");
    expect(core.tails[0].levels[0].next).toBeUndefined();
  });

  test("correctly updates span values in the copied segment", () => {
    const { root } = toList([1, 2, 1, 1], ["A", "B", "C", "D"]);
    const core = copy(root, 0, 3);

    // Check span values to ensure they are correctly calculated
    let nextNode = core.root.levels[0]?.next;
    expect(nextNode?.levels[0].span).toBe(1);
    nextNode = nextNode?.levels[0]?.next;
    expect(nextNode?.levels[0].span).toBe(1);
    expect(nextNode?.levels[1].span).toBe(2);
    nextNode = nextNode?.levels[0]?.next;
    expect(nextNode?.levels[0].span).toBe(1);
  });
});

describe(`${entries.name}()`, () => {
  test("yields nothing if no node given", () => {
    expect(Array.from(entries())).toEqual([]);
  });

  test("yields nothing if the start node is undefined", () => {
    expect(Array.from(entries(undefined))).toEqual([]);
  });

  test("yields correctly for a single-node list", () => {
    const node = gen("A", 4);
    expect(Array.from(entries(node))).toEqual([[0, "A"]]);
  });

  test("yields correctly for each node in the list", () => {
    const { root } = toList([1, 3, 2], ["a", "b", "c"]);
    expect(Array.from(entries(root))).toEqual([
      [0, undefined],
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });
});

describe(`${gen.name}()`, () => {
  test("generates a node with default levels and span when only value is provided", () => {
    const value = "test";
    const node = gen(value);

    expect(node.value).toBe(value);
    expect(node.levels.length).toBe(1);
    expect(node.levels[0].span).toBe(1);
    expect(node.levels[0].next).toBeUndefined();
  });

  test("generates a node with specified levels and default span", () => {
    const value = "test";
    const levels = 3;
    const node = gen(value, levels);

    expect(node.levels.length).toBe(levels);
    for (let i = 0; i < levels; ++i) {
      expect(node.levels[i].span).toBe(1);
      expect(node.levels[i].next).toBeUndefined();
    }
  });

  test("generates a node with specified levels and span", () => {
    const value = "test";
    const levels = 3;
    const span = 3;
    const node = gen(value, levels, span);

    expect(node.levels.length).toBe(levels);
    for (let i = 0; i < levels; ++i) {
      expect(node.levels[i].span).toBe(span);
      expect(node.levels[i].next).toBeUndefined();
    }
  });

  test("applies the same next node across all levels if specified", () => {
    const value = "foo";
    const nextValue = "bar";
    const levels = 3;
    const span = 3;
    const next = gen(nextValue);
    const node = gen(value, levels, span, next);

    expect(node.levels.length).toBe(levels);
    for (let i = 0; i < levels; ++i) {
      expect(node.levels[i].span).toBe(span);
      expect(node.levels[i].next).toBe(next);
    }
  });

  test("generates a node with all specified parameters", () => {
    const value = "node1";
    const levels = 3;
    const span = 2;
    const nextValue = "node2";
    const nextNode = gen(nextValue);
    const node = gen(value, levels, span, nextNode);

    expect(node.value).toBe(value);
    expect(node.levels.length).toBe(levels);
    node.levels.forEach(level => {
      expect(level.span).toBe(span);
      expect(level.next).toBe(nextNode);
    });
  });

  test("handles zero levels", () => {
    const value = "test";
    const levels = 0;
    const node = gen(value, levels);

    expect(node.levels.length).toBe(0);
  });
});

describe(`${get.name}()`, () => {
  test("returns the same node and zero distance if distance is 0", () => {
    const array = ["A"];
    const nodes = testList(array);
    const resultNode = get(nodes[0], 0);
    expect(resultNode).toBe(nodes[0]);
  });

  test("returns undefined if distance is negative", () => {
    const array = ["A"];
    const nodes = testList(array);
    const resultNode = get(nodes[0], -5);
    expect(resultNode).toBeUndefined();
  });

  test("returns the next node and zero distance if distance matches the span", () => {
    const array = ["A", "B"];
    const nodes = testList(array);
    nodes[0].levels[0].span = 5;
    const resultNode = get(nodes[0], 5);
    expect(resultNode).toBe(nodes[1]);
  });

  test("returns undefined if no node found at given distance", () => {
    const array = ["A", "B", "C", "D", "E"]; // A -1-> B -1-> C -100-> D -1-> E
    const nodes = testList(array);
    nodes[2].levels[0].span = 100;
    const resultNode = get(nodes[0], 24);
    expect(resultNode).toBeUndefined();
  });

  test("traverses multiple nodes if needed and returns exact match", () => {
    const array = ["A", "B", "C", "D", "E"]; // A -1-> B -1-> C -1-> D -1-> E
    const nodes = testList(array);
    const resultNode = get(nodes[0], 4);
    expect(resultNode).toBe(nodes[4]);
  });

  test("handles traversing when levels are uneven", () => {
    const array = ["A", "B", "C", "D", "E"]; // A -1-> B -2-> C -3-> D -4-> E
    const nodes = testList(array);
    for (let i = 0; i < array.length; ++i) {
      nodes[i].levels[0].span = i + 1;
    }
    const resultNode = get(nodes[0], 10);
    expect(resultNode).toBe(nodes[4]);
  });
});

describe(`${getClosest.name}()`, () => {
  test("returns the same node and zero distance if distance is 0", () => {
    const array = ["A"];
    const nodes = testList(array);
    const [resultNode, remainingDistance] = getClosest(nodes[0], 0);
    expect(resultNode).toBe(nodes[0]);
    expect(remainingDistance).toBe(0);
  });

  test("returns the same node and the negative distance if distance is negative", () => {
    const array = ["A"];
    const nodes = testList(array);
    const [resultNode, remainingDistance] = getClosest(nodes[0], -5);
    expect(resultNode).toBe(nodes[0]);
    expect(remainingDistance).toBe(-5);
  });

  test("returns the next node and zero distance if distance matches the span", () => {
    const array = ["A", "B"];
    const nodes = testList(array);
    nodes[0].levels[0].span = 5;
    const [resultNode, remainingDistance] = getClosest(nodes[0], 5);
    expect(resultNode).toBe(nodes[1]);
    expect(remainingDistance).toBe(0);
  });

  test("traverses multiple nodes if needed and returns exact match", () => {
    const array = ["A", "B", "C", "D", "E"]; // A -1-> B -1-> C -1-> D -1-> E
    const nodes = testList(array);
    const [resultNode, remainingDistance] = getClosest(nodes[0], 4);
    expect(resultNode).toBe(nodes[4]);
    expect(remainingDistance).toBe(0);
  });

  test("handles traversing when levels are uneven", () => {
    const array = ["A", "B", "C", "D", "E"]; // A -1-> B -2-> C -3-> D -4-> E
    const nodes = testList(array);
    for (let i = 0; i < array.length; ++i) {
      nodes[i].levels[0].span = i + 1;
    }
    const [resultNode, remainingDistance] = getClosest(nodes[0], 9);
    expect(resultNode).toBe(nodes[3]);
    expect(remainingDistance).toBe(3);
  });

  test("returns the closest node and remaining distance if distance is below total span", () => {
    const array = ["A", "B", "C", "D", "E"]; // A -1-> B -1-> C -100-> D -1-> E
    const nodes = testList(array);
    nodes[2].levels[0].span = 100;
    const [resultNode, remainingDistance] = getClosest(nodes[0], 24);
    expect(resultNode).toBe(nodes[2]);
    expect(remainingDistance).toBe(22);
  });

  test("returns the last node and remaining distance if distance exceeds total span", () => {
    const { root } = toList([5, 3, 1, 4, 2], ["a", "b", "c", "d", "e"]);
    const nodes = Array.from(getNodes(root));
    const [resultNode, remainingDistance] = getClosest(nodes[1], 100);
    expect(resultNode).toBe(nodes[5]);
    expect(remainingDistance).toBe(96);
  });
});

describe(`${getNodes.name}()`, () => {
  test("yields no nodes if no arguments given", () => {
    const result = Array.from(getNodes());
    expect(result).toEqual([]);
  });

  test("yields no nodes if start node is undefined", () => {
    expect(Array.from(getNodes(undefined))).toEqual([]);
  });

  test("yields no nodes if the level is negative", () => {
    const nodeA = gen("A", 2);
    const result = Array.from(getNodes(nodeA, -1));
    expect(result).toEqual([]);
  });

  test("yields no nodes if the start node does not reach the specified level", () => {
    const { root } = toList([1, 3, 5, 4, 2], ["A", "B", "C", "D", "E"]);
    const head = root.levels[0].next!;
    expect(Array.from(getNodes(head, 1))).toEqual([]);
    expect(Array.from(getNodes(head, 2))).toEqual([]);
  });

  test("continues iteration until the end of the list when end node is undefined", () => {
    const nodes = [gen("A"), gen("B")];
    for (let i = 1; i < nodes.length; ++i) {
      nodes[i - 1].levels[0] = { next: nodes[i], span: 1 };
    }

    const result = Array.from(getNodes(nodes[0]));
    expect(result).toEqual(nodes);
  });

  test("yields nodes at a specified higher level", () => {
    const { root } = toList([1, 3, 5, 4, 2], ["A", "B", "C", "D", "E"]);
    let result = Array.from(getNodes(root, 4));
    expect(result).toEqual([root, get(root, 3)!]);
    result = Array.from(getNodes(root, 2));
    expect(result).toEqual([root, get(root, 2)!, get(root, 3)!, get(root, 4)!]);
  });
});

describe(`${has.name}()`, () => {
  test("returns false if the start node is undefined", () => {
    expect(has(undefined, 1)).toEqual(false);
  });

  test("returns true when value is present in the list", () => {
    const { root } = toList([1, 1, 1], ["a", "b", "c"]);
    expect(has(root, "b")).toBe(true);
  });

  test("returns false when value is not present in the list", () => {
    const { root } = toList([1, 1, 1], ["x", "y", "z"]);
    expect(has(root, "a")).toBe(false);
  });

  test("returns true when value is at the beginning of the list", () => {
    const { root } = toList([1, 1, 1], [1, 2, 3]);
    expect(has(root, 1)).toBe(true);
  });

  test("returns true when value is at the end of the list", () => {
    const { root } = toList([1, 1, 1], [1, 2, 3]);
    expect(has(root, 3)).toBe(true);
  });

  test("returns true for multiple occurrences of the value, finds first occurrence", () => {
    const { root } = toList([1, 1, 1], ["repeat", "repeat", "unique"]);
    expect(has(root, "repeat")).toBe(true);
  });
});

describe(`${keys.name}()`, () => {
  test("yields nothing if no node given", () => {
    expect(Array.from(keys())).toEqual([]);
  });

  test("yields nothing if the start node is undefined", () => {
    expect(Array.from(keys(undefined))).toEqual([]);
  });

  test("yields correctly for a single-node list", () => {
    const node = gen("A", 4);
    expect(Array.from(keys(node))).toEqual([0]);
  });

  test("yields correctly for each node in the list", () => {
    const { root } = toList([1, 3, 2], ["a", "b", "c"]);
    expect(Array.from(keys(root))).toEqual([0, 1, 2, 3]);
  });
});

describe(`${levels.name}()`, () => {
  test("yields nothing if no node given", () => {
    expect(Array.from(levels())).toEqual([]);
  });

  test("yields nothing if the start node is undefined", () => {
    expect(Array.from(levels(undefined))).toEqual([]);
  });

  test("yields heights correctly for a single-node list", () => {
    const node = gen("A", 4);
    expect(Array.from(levels(node))).toEqual([4]);
  });

  test("yields correct heights for each node in the list", () => {
    const { root } = toList([1, 3, 2], ["a", "b", "c"]);
    expect(Array.from(levels(root))).toEqual([3, 1, 3, 2]);
  });
});

describe(`${toList.name}()`, () => {
  test("creates an empty list with a dummy root node when no values are provided", () => {
    const { root, tails, size } = toList([], []);

    expect(root.value).toBeUndefined();
    expect(tails.length).toBe(1);
    expect(tails[0]).toBe(root);
    expect(size).toBe(0);
  });

  test("constructs a list correctly when levels and values arrays match in length", () => {
    const levels = [1, 2];
    const values = ["A", "B"];
    const maxLevel = Math.max(...levels);

    const { root, tails, size } = toList(levels, values);
    const nodes = Array.from(getNodes(root));

    expect(size).toBe(2);
    expect(root.levels.length).toBe(maxLevel);
    expect(root.levels[0]).toEqual({ next: nodes[1], span: 1 });
    expect(root.levels[1]).toEqual({ next: nodes[2], span: 2 });
    expect(tails.length).toBe(maxLevel);
    expect(tails[0]).toBe(nodes[2]);
    expect(tails[1]).toBe(nodes[2]);
  });

  test("handles lists with levels array and empty values array", () => {
    const { root, tails, size } = toList([1, 2, 3], []);

    expect(root.value).toBeUndefined();
    expect(tails.length).toBe(1);
    expect(tails[0]).toBe(root);
    expect(size).toBe(0);
  });

  test("handles lists where levels array is longer than values array", () => {
    const levels = [1, 2, 3];
    const values = ["A", "B"];
    const minLen = Math.min(levels.length, values.length);
    const maxLevel = Math.max(...levels.slice(0, minLen));

    const { root, tails, size } = toList(levels, values);
    const nodes = Array.from(getNodes(root));

    expect(size).toBe(minLen);
    expect(root.levels.length).toBe(maxLevel);
    for (let i = 0; i < maxLevel; ++i) {
      expect(root.levels[i]).toEqual({ next: nodes[i + 1], span: i + 1 });
      expect(tails[i]).toBe(nodes[minLen]);
    }
  });

  test("handles lists with empty levels array and values array", () => {
    const { root, tails, size } = toList([], ["A", "B", "C"]);

    expect(root.value).toBeUndefined();
    expect(tails.length).toBe(1);
    expect(tails[0]).toBe(root);
    expect(size).toBe(0);
  });

  test("handles lists where values array is longer than values array", () => {
    const levels = [1, 2];
    const values = ["A", "B", "C"];
    const minLen = Math.min(levels.length, values.length);
    const maxLevel = Math.max(...levels.slice(0, minLen));

    const { root, tails, size } = toList(levels, values);
    const nodes = Array.from(getNodes(root));

    expect(size).toBe(minLen);
    expect(root.levels.length).toBe(maxLevel);
    for (let i = 0; i < maxLevel; ++i) {
      expect(root.levels[i]).toEqual({ next: nodes[i + 1], span: i + 1 });
      expect(tails[i]).toBe(nodes[minLen]);
    }
  });

  test("creates a list with multiple levels correctly", () => {
    const levels = [1, 2, 5, 1, 3, 2, 1];
    const values = ["a", "b", "c", "d", "e", "f", "g"];
    const minLen = Math.min(levels.length, values.length);
    const maxLevel = Math.max(...levels.slice(0, minLen));

    const { root, tails, size } = toList(levels, values);
    const nodes = Array.from(getNodes(root));

    expect(size).toBe(minLen);
    expect(root.levels.length).toBe(maxLevel);
    for (let i = 0; i < maxLevel; ++i) {
      expect(tails[i].levels.length).toBeGreaterThan(i);
      expect(tails[i].levels[i].next).toBeUndefined();

      let len = 0;
      let node: SkipNode<unknown> | undefined = root;
      while (node != null) {
        expect(node).toBe(nodes[len]);
        const { next, span } = node.levels[i];
        len += span;
        node = next;
      }

      expect(len - 1).toBe(size);
    }
  });
});

describe(`${truncateLevels.name}()`, () => {
  test("does nothing if root is undefined", () => {
    expect(() => truncateLevels(undefined, 2)).not.toThrow();
  });

  test("does nothing if target level is equal to root levels length", () => {
    const { root } = toList([1, 3, 2], ["a", "b", "c"]);
    expect(() => truncateLevels(root, 3)).not.toThrow();
    expect(Array.from(levels(root))).toEqual([3, 1, 3, 2]);
  });

  test("does nothing if target level is greater than root levels length", () => {
    const { root } = toList([1, 3, 2], ["a", "b", "c"]);
    expect(() => truncateLevels(root, 5)).not.toThrow();
    expect(Array.from(levels(root))).toEqual([3, 1, 3, 2]);
  });

  test("reduces the levels of nodes higher than the specified level", () => {
    const { root } = toList([3, 6, 9], ["a", "b", "c"]);
    expect(() => truncateLevels(root, 2)).not.toThrow();
    expect(Array.from(levels(root))).toEqual([2, 2, 2, 2]);
  });

  test("truncates levels correctly for all nodes until the end of the list", () => {
    const { root } = toList(
      [5, 1, 7, 2, 1, 6, 1],
      ["a", "b", "c", "d", "e", "f", "g"]
    );
    expect(() => truncateLevels(root, 2)).not.toThrow();
    expect(Array.from(levels(root))).toEqual([2, 2, 1, 2, 2, 1, 2, 1]);
  });
});

describe(`${values.name}()`, () => {
  test("yields nothing if no node given", () => {
    expect(Array.from(values())).toEqual([]);
  });

  test("yields nothing if the start node is undefined", () => {
    expect(Array.from(values(undefined))).toEqual([]);
  });

  test("yields correctly for a single-node list", () => {
    const node = gen("A", 4);
    expect(Array.from(values(node))).toEqual(["A"]);
  });

  test("yields correctly for each node in the list", () => {
    const { root } = toList([1, 3, 2], ["a", "b", "c"]);
    expect(Array.from(values(root))).toEqual([undefined, "a", "b", "c"]);
  });
});
