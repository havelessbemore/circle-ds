import { describe, expect, test } from "vitest";

import {
  calcMaxLevel,
  copy,
  entries,
  getEntry,
  has,
  insert,
  keys,
  levels,
  nodes,
  nodes as getNodes,
  toList,
  toNode,
  toStack,
  truncateLevels,
  values,
  cut,
} from "./skipList";
import { SkipNode } from "../types/skipList";

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
    const src = toList([1, 1, 1], ["A", "B", "C"]);
    const core = copy(src, 1, 0);

    expect(core.size).toBe(0);
    expect(core.root.levels.length).toBe(1);
    expect(core.tails[0]).toBe(core.root);
    expect(core.tails[0].levels[0].next).toBeUndefined();
  });

  test("copies the specified number of nodes from the list starting at the given position", () => {
    const src = toList([2, 2, 2, 2], ["A", "B", "C", "D"]);
    const core = copy(src, 1, 2); // Copy from node 'B' to 'C'

    expect(core.size).toBe(2);
    expect(core.tails.length).toBe(2);
    expect(core.root.levels[0].next?.value).toBe("B");
    expect(core.tails[0].value).toBe("C");
    expect(core.tails[0].levels[0].next).toBeUndefined();
  });

  test("handles copying more nodes than available from the start position", () => {
    const src = toList([1, 1, 1], ["A", "B", "C"]);
    const core = copy(src, 1, 5);

    expect(core.size).toBe(2);
    expect(core.tails[0].value).toBe("C");
    expect(core.tails[0].levels[0].next).toBeUndefined();
  });

  test("correctly updates span values in the copied segment", () => {
    const src = toList([1, 2, 1, 1], ["A", "B", "C", "D"]);
    const core = copy(src, 0, 3);

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

describe(`${cut.name}()`, () => {
  test("returns an empty list when end is negative", () => {
    const core = toList([1, 2], ["a", "b"]);
    const seg = cut(core, 1, -1);

    expect(seg.size).toBe(0);
    expect(seg.tails.length).toBe(1);
    expect(seg.tails[0]).toBe(seg.root);
    expect(Array.from(values(seg.root))).toEqual([undefined]);
  });

  test("returns an empty list when end is 0", () => {
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
    const end = 4; // Cutting 'b', 'c', 'd'

    const segment = cut(core, start, end);

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
    const segment = cut(core, 1, 6); // Attempting to cut more items than exist from position 1

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
    const segment = cut(core, 1, 3);

    // Check if the segment has the correct items
    const segmentLevels = Array.from(levels(segment.root));
    expect(segmentLevels).toEqual([5, 1, 5]);

    // Verify original list is updated correctly
    const remainingLevels = Array.from(levels(core.root));
    expect(remainingLevels).toEqual([4, 4, 2]);
  });

  test("Adjusts levels correctly when not removing highest level(s)", () => {
    const core = toList([5, 1, 2, 3], ["a", "b", "c", "d"]);
    const segment = cut(core, 1, 3);

    // Check if the segment has the correct items
    const segmentLevels = Array.from(levels(segment.root));
    expect(segmentLevels).toEqual([2, 1, 2]);

    // Verify original list is updated correctly
    const remainingLevels = Array.from(levels(core.root));
    expect(remainingLevels).toEqual([5, 5, 3]);
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
    const node = toNode("A", 4);
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

describe(`${getEntry.name}()`, () => {
  test("returns the same node and zero distance if distance is 0", () => {
    const core = toList([1], ["A"]);
    const nodes = Array.from(getNodes(core.root));
    const { index, node } = getEntry(core, 0);
    expect(node).toBe(nodes[1]);
    expect(index).toBe(0);
  });

  test("returns the root node and -1 distance if distance is negative", () => {
    const core = toList([1], ["A"]);
    const { index, node } = getEntry(core, -5);
    expect(node).toBe(core.root);
    expect(index).toBe(-1);
  });

  test("returns the next node and zero distance if distance matches the span", () => {
    const core = toList([1, 2], ["A", "B"]);
    const nodes = Array.from(getNodes(core.root));
    nodes[1].levels[0].span += 4;
    core.size += 4;

    const { index, node } = getEntry(core, 5);
    expect(node).toBe(nodes[2]);
    expect(index).toBe(5);
  });

  test("traverses multiple nodes if needed and returns exact match", () => {
    const core = toList([1, 1, 1, 1, 1], ["A", "B", "C", "D", "E"]);
    const nodes = Array.from(getNodes(core.root));

    const { index, node } = getEntry(core, 4);
    expect(node).toBe(nodes[5]);
    expect(index).toBe(4);
  });

  test("handles traversing when spans are uneven", () => {
    const array = ["A", "B", "C", "D", "E"]; // A -1-> B -2-> C -3-> D -4-> E
    const core = toList([1, 1, 1, 1, 1], array);
    const nodes = Array.from(getNodes(core.root));
    for (let i = 1; i < array.length; ++i) {
      nodes[i].levels[0].span = i;
      core.size += i - 1;
    }
    const { index, node } = getEntry(core, 9);
    expect(node).toBe(nodes[4]);
    expect(index).toBe(6);
  });

  test("returns the closest node and index if distance is below total span", () => {
    const core = toList([1, 1, 1, 1, 1], ["A", "B", "C", "D", "E"]);
    const nodes = Array.from(getNodes(core.root));
    nodes[3].levels[0].span += 99;
    core.size += 99;

    const { index, node } = getEntry(core, 24);
    expect(node).toBe(nodes[3]);
    expect(index).toBe(2);
  });

  test("returns the last node and index if distance exceeds total span", () => {
    const core = toList([5, 3, 1, 4, 2], ["a", "b", "c", "d", "e"]);
    const nodes = Array.from(getNodes(core.root));
    const { index, node } = getEntry(core, 100);
    expect(node).toBe(nodes[5]);
    expect(index).toBe(4);
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

describe(`${keys.name}()`, () => {
  test("yields nothing if no node given", () => {
    expect(Array.from(keys())).toEqual([]);
  });

  test("yields nothing if the start node is undefined", () => {
    expect(Array.from(keys(undefined))).toEqual([]);
  });

  test("yields correctly for a single-node list", () => {
    const node = toNode("A", 4);
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
    const node = toNode("A", 4);
    expect(Array.from(levels(node))).toEqual([4]);
  });

  test("yields correct heights for each node in the list", () => {
    const { root } = toList([1, 3, 2], ["a", "b", "c"]);
    expect(Array.from(levels(root))).toEqual([3, 1, 3, 2]);
  });
});

describe(`${nodes.name}()`, () => {
  test("yields no nodes if no arguments given", () => {
    const result = Array.from(nodes());
    expect(result).toEqual([]);
  });

  test("yields no nodes if start node is undefined", () => {
    expect(Array.from(nodes(undefined))).toEqual([]);
  });

  test("continues iteration until the end of the list when end node is undefined", () => {
    const arr = [toNode("A"), toNode("B")];
    for (let i = 1; i < arr.length; ++i) {
      arr[i - 1].levels[0] = { next: arr[i], span: 1 };
    }

    const result = Array.from(nodes(arr[0]));
    expect(result).toEqual(arr);
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

describe(`${toNode.name}()`, () => {
  test("generates a node with default levels and span when only value is provided", () => {
    const value = "test";
    const node = toNode(value);

    expect(node.value).toBe(value);
    expect(node.levels.length).toBe(1);
    expect(node.levels[0].span).toBe(1);
    expect(node.levels[0].next).toBeUndefined();
  });

  test("generates a node with specified levels and default span", () => {
    const value = "test";
    const levels = 3;
    const node = toNode(value, levels);

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
    const node = toNode(value, levels, span);

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
    const next = toNode(nextValue);
    const node = toNode(value, levels, span, next);

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
    const nextNode = toNode(nextValue);
    const node = toNode(value, levels, span, nextNode);

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
    const node = toNode(value, levels);

    expect(node.levels.length).toBe(0);
  });
});

describe(`${toStack.name}()`, () => {
  test("handles nodes with zero levels", () => {
    const node = toNode("zero", 0);
    const stack = toStack(node, 0);
    expect(stack).toEqual([]);
  });

  test("generates a stack with pointers all pointing to the same node and index", () => {
    const node = toNode("three", 3);
    const stack = toStack(node, 5);

    expect(stack.length).toBe(3);
    for (let i = 0; i < 3; ++i) {
      expect(stack[i].node).toBe(node);
      expect(stack[i].index).toBe(5);
    }
  });

  test("defaults index to 0 if not specified", () => {
    const node = toNode("two", 2);
    const stack = toStack(node);

    expect(stack.length).toBe(2);
    for (let i = 0; i < 2; ++i) {
      expect(stack[i].node).toBe(node);
      expect(stack[i].index).toBe(0);
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
    const node = toNode("A", 4);
    expect(Array.from(values(node))).toEqual(["A"]);
  });

  test("yields correctly for each node in the list", () => {
    const { root } = toList([1, 3, 2], ["a", "b", "c"]);
    expect(Array.from(values(root))).toEqual([undefined, "a", "b", "c"]);
  });
});
