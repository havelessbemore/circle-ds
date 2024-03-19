import {
  SkipCore,
  SkipEntry,
  SkipLink,
  SkipNode,
  SkipStack,
} from "../types/skipList";
import { log } from "./math";

/**
 * Calculates the maximum level for a skip list based on the given probability
 * factor and expected size.
 *
 * The maximum level determines how many forward pointers each element in the
 * skip list can have, which impacts the overall speed of search, insertion,
 * and deletion operations within the list.
 *
 * @param p - The probability factor used for determining the level. It should
 *          be a number between 0 and 1 (exclusive). The probability factor
 *          affects the sparsity of the skip list; a lower value results in a
 *          shorter, less dense list, while a higher value results in a
 *          taller, denser list.
 * @param expectedSize - The expected number of elements in the skip list. It
 *                     should be a positive integer. The expected size
 *                     influences the optimal maximum level for the list.
 *
 * @returns The calculated optimal maximum level for the skip list. Returns 1
 *          if the probability factor is less than or equal to 0 or the
 *          expected size is less than or equal to 1. Returns Infinity if the
 *          probability factor is 1 or more, indicating an unbounded number of
 *          levels, and likely an error in inputs.
 */
export function calcMaxLevel(p: number, expectedSize: number): number {
  if (p <= 0 || expectedSize <= 1) {
    return 1;
  }
  if (p >= 1) {
    return Infinity;
  }
  return Math.ceil(log(expectedSize, 1 / p));
}

/**
 * Creates a copy of a segment from a skip list, starting at a specified
 * position and including a specified number of nodes.
 *
 * The copied segment is initialized with its own root node and returns
 * the new list's root, tail nodes at each level, and the total number
 * of nodes copied.
 *
 * @param root - The root {@link SkipNode} of the original skip list from
 *               which the copy operation begins.
 * @param start - The zero-based position in the original list from which to
 *                start copying nodes.
 * @param count - The number of nodes to copy from the start position. If the
 *                count exceeds the number of nodes available, only the
 *                available nodes are copied.
 * @returns A tuple containing:
 *          - The root {@link SkipNode} of the newly created skip list.
 *          - An array of {@link SkipNode}s representing the tail nodes at
 *            each level of the new skip list.
 *          - An integer representing the total number of nodes copied.
 */
export function copy<T>(
  core: SkipCore<T>,
  start: number,
  distance: number
): SkipCore<T> {
  // Create new list
  let size = 0;
  const root = toNode(undefined as T);
  const tails: SkipNode<T>[] = [root];
  const sizes: number[] = [-1];

  // Check distance
  if (distance <= 0) {
    return { root, size, tails };
  }

  // Get initial node
  let node: SkipNode<T> | undefined = getEntry(core, start - 1).node;
  node = node.levels[0].next;

  // For each node
  let maxY = 1;
  while (node != null && size < distance) {
    // Update maximum level
    const Y = node.levels.length;
    while (maxY < Y) {
      tails[maxY] = root;
      sizes[maxY] = -1;
      ++maxY;
    }

    // Create the duplicate node
    const dupe = toNode(node.value, Y);

    // Attach the duplicate
    for (let y = 0; y < Y; ++y) {
      tails[y].levels[y] = { next: dupe, span: size - sizes[y] };
      tails[y] = dupe;
      sizes[y] = size;
    }

    // Move to the next node
    const { next, span } = node.levels[0];
    size += span;
    node = next;
  }

  // Update the tail pointers
  size = sizes[0] + 1;
  for (let y = 0; y < maxY; ++y) {
    tails[y].levels[y] = { next: undefined, span: size - sizes[y] };
  }

  // Return the copy
  return { root, size, tails };
}

/**
 * Cuts a segment from a given skip list.
 *
 * The cut starts at the specified position and spans the given distance. The
 * cut segment is returned as a new skip list.
 *
 * @param core - The {@link SkipCore} representing the skip list from which to cut the segment.
 *               This skip list will be modified to reflect the removal.
 * @param start - The zero-based index indicating the start position of the cut, inclusive.
 * @param distance - The number of elements to be included in the cut segment.
 *
 * @returns A new {@link SkipCore} representing the skip list segment that has been cut.
 *
 * @remarks
 * - The height (levels) of the original list may be reduced if segment removal results in empty levels.
 * - The cut segment's height (levels) may be less than the original list. It will only contain
 *   levels that include nodes within the segment.
 */
export function cut<T>(
  core: SkipCore<T>,
  start: number,
  distance: number
): SkipCore<T> {
  // Initialize output list
  const segRoot = toNode(undefined as T);
  const seg: SkipCore<T> = { root: segRoot, size: 0, tails: [segRoot] };

  // Check inputs
  if (distance <= 0) {
    return seg;
  }

  // Initialize constants
  const prevStack = getStack(core, start - 1);
  const tailStack = nextStack(Array.from(prevStack), distance);
  const end = tailStack[0].index + tailStack[0].node.levels[0].span;

  // Update inputs
  let levels = core.root.levels.length;
  start = prevStack[0].index + prevStack[0].node.levels[0].span;
  distance = end - start;

  // Detach segment from participating levels
  let lvl: number;
  for (lvl = 0; lvl < levels; ++lvl) {
    const prev = prevStack[lvl];
    const tail = tailStack[lvl];

    // Check if segment exists at this level
    if (prev.index >= tail.index) {
      break;
    }

    // Connect segment start to new root
    let edge = prev.node.levels[lvl];
    let span = prev.index + edge.span - start;
    segRoot.levels[lvl] = { next: edge.next, span };

    // Remove segment from list
    edge = tail.node.levels[lvl];
    span = tail.index - prev.index + (edge.span - distance);
    prev.node.levels[lvl] = { next: edge.next, span };

    // Detach segment end
    tail.node.levels[lvl] = { next: undefined, span: end - tail.index };
    seg.tails[lvl] = tail.node;
  }

  if (lvl < levels) {
    // Remove segment from higher levels
    while (lvl < levels) {
      const prev = prevStack[lvl];
      const { next, span } = prev.node.levels[lvl];
      prev.node.levels[lvl] = { next: next, span: span - distance };
      ++lvl;
    }
  } else {
    // Remove empty levels from the source list
    const links = core.root.levels;
    while (lvl > 1 && links[lvl - 1].next == null) {
      --lvl;
    }
    levels = lvl;
    links.length = levels;
    core.tails.length = levels;
  }

  // Update tails from source list
  if (end >= core.size) {
    for (lvl = 0; lvl < levels; ++lvl) {
      core.tails[lvl] = prevStack[lvl].node;
    }
  }

  // Update source list's size
  core.size -= distance;

  // Return removed segment
  seg.size = distance;
  return seg;
}

/**
 * Iterates through a skip list, yielding each node's index
 * (position in the list) and value as a tuple.
 *
 * Iteration starts from the given node and continues the end of the list.
 * This generator function provides a convenient way to enumerate all nodes in
 * a skip list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param node - The node at which to start iterating.
 */
export function* entries<T>(node?: SkipNode<T>): Generator<[number, T]> {
  let i = 0;
  while (node != null) {
    yield [i, node.value];
    const { next, span } = node.levels[0];
    node = next;
    i += span;
  }
}

export function getEntry<T>(core: SkipCore<T>, target: number): SkipEntry<T> {
  // Check target minimum
  if (target < 0) {
    return { index: -1, node: core.root };
  }

  // Check target maximum
  const tails = core.tails;
  if (target >= core.size - tails[0].levels[0].span) {
    return { index: core.size - tails[0].levels[0].span, node: tails[0] };
  }

  // Use tails as shortcuts
  let y: number;
  let index = -1;
  let node = core.root;
  for (y = node.levels.length - 1; y >= 0 && index < target; --y) {
    const i = core.size - tails[y].levels[y].span;
    if (i > target) {
      break;
    }
    index = i;
    node = tails[y];
  }

  // Find node
  while (y >= 0 && index < target) {
    const { next, span } = node.levels[y];
    if (index + span > target || next == null) {
      --y;
    } else {
      index += span;
      node = next;
    }
  }

  // Return index and distance
  return { index, node };
}

export function getStack<T>(core: SkipCore<T>, target: number): SkipStack<T> {
  const stack = toStack(core.root, -1);

  // Check target minimum
  if (target < 0) {
    return stack;
  }

  // Check target maximum
  const Y = stack.length;
  const tails = core.tails;
  if (target >= core.size - tails[0].levels[0].span) {
    for (let y = 0; y < Y; ++y) {
      const index = core.size - tails[y].levels[y].span;
      stack[y] = { index, node: tails[y] };
    }
    return stack;
  }

  // Use tails as shortcuts
  let y: number;
  for (y = Y - 1; y >= 0 && stack[y].index < target; --y) {
    const i = core.size - tails[y].levels[y].span;
    if (i > target) {
      break;
    }
    stack[y] = { index: i, node: tails[y] };
  }

  // Find node
  while (y >= 0 && stack[y].index < target) {
    const { index, node } = stack[y];
    const { next, span } = node.levels[y];
    if (index + span > target || next == null) {
      --y;
    } else {
      stack[y] = { index: index + span, node: next };
    }
  }

  // Finish stack update
  if (y > 0) {
    const { index, node } = stack[y];
    for (let i = 0; i < y; ++i) {
      stack[i] = { index, node };
    }
  }

  return stack;
}

/**
 * Determines whether a skip list contains a node with a specified value.
 *
 * @param node - The node from which to start searching.
 * @param value - The value to search for.
 *
 * @returns `true` if the specified value is found, `false` otherwise.
 */
export function has<T>(node: SkipNode<T> | undefined, value: T): boolean {
  while (node != null) {
    if (node.value === value) {
      return true;
    }
    node = node.levels[0].next;
  }
  return false;
}

/**
 * Inserts a skip list segment (`src`) into another skip list (`dest`) at a specified index.
 *
 * @param dest - The {@link SkipCore} representing the destination skip list into which the segment is to be
 *               inserted. This skip list will be modified to include the nodes from the source segment.
 * @param index - The zero-based position within the destination list at which the source segment is to be inserted.
 * @param src - The {@link SkipCore} representing the source skip list segment to be inserted into the destination
 *              list. This skip list's tail nodes will be modified to contain links within the destination list.
 *
 * @remarks
 * - The function may increase the height (number of levels) of the destination list if the source segment has
 *   more levels than the destination. This ensures that the merged list can accommodate the full structure of
 *   the segment being inserted.
 */
export function insert<T>(
  dest: SkipCore<T>,
  index: number,
  src: SkipCore<T>
): void {
  // Check source values
  if (src.size <= 0) {
    return;
  }

  // Increase destination's height if necessary
  const minY = src.tails.length;
  for (let y = dest.tails.length; y < minY; ++y) {
    dest.root.levels[y] = { next: undefined, span: dest.size + 1 };
    dest.tails[y] = dest.root;
  }

  // Attach segment
  const prevs = getStack(dest, index - 1);
  for (let y = 0; y < minY; ++y) {
    const prev = prevs[y].node;
    const tail = src.tails[y];

    // Attach segment tail
    const prevEdge = prev.levels[y];
    const tailEdge = tail.levels[y];
    let span = prevs[y].index - index + prevEdge.span + tailEdge.span;
    tail.levels[y] = { next: prevEdge.next, span };

    // Attach segment head
    const rootEdge = src.root.levels[y];
    span = index - prevs[y].index + (rootEdge.span - 1);
    prev.levels[y] = { next: rootEdge.next, span };
  }

  // Update higher levels
  const maxY = dest.tails.length;
  for (let y = minY; y < maxY; ++y) {
    const levels = prevs[y].node.levels;
    const { next, span } = levels[y];
    levels[y] = { next, span: span + src.size };
  }

  // Update tails
  if (index === dest.size) {
    for (let y = 0; y < minY; ++y) {
      dest.tails[y] = src.tails[y];
    }
  }

  // Update size
  dest.size += src.size;
}

/**
 * Iterates through a skip list, yielding each node's index
 * (position in the list).
 *
 * This generator function provides a convenient way to enumerate all nodes in
 * a skip list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param node - The node at which to start iterating.
 */
export function* keys<T>(node?: SkipNode<T>): Generator<number> {
  let i = 0;
  while (node != null) {
    yield i;
    const { next, span } = node.levels[0];
    node = next;
    i += span;
  }
}

/**
 * Iterates through a skip list, yielding each node's height.
 *
 * Iteration starts from the `node` node and continues until
 * the end of the list.
 *
 * @param node - The node at which to start iterating.
 */
export function* levels<T>(node?: SkipNode<T>): Generator<number> {
  while (node != null) {
    yield node.levels.length;
    node = node.levels[0].next;
  }
}

/**
 * Moves the input stack to point to the nodes closest to a specified distance.
 *
 * @param stack - The {@link SkipStack} representing the current pointers at various levels of the skip list.
 * @param distance - The forward distance to travel. The starting point is based on `stack`'s lowest level.
 *
 * @returns A {@link SkipStack} with pointers to the nodes closest to the specified distance, based
 *          on the initial positions indicated by the input stack.
 *
 * @remarks
 * - If the specified distance is 0 or negative, the stack is not modified, as no traversal is needed.
 * - If the target distance exceeds the bounds of the skip list, the result will point to the furthest possible
 *   nodes within the list.
 */
export function nextStack<T>(
  stack: SkipStack<T>,
  distance: number
): SkipStack<T> {
  // Check inputs
  if (distance <= 0 || stack.length <= 0) {
    return stack;
  }

  // Find node
  let y = stack.length - 1;
  const target = stack[0].index + distance;
  while (y >= 0 && stack[y].index < target) {
    const { index, node } = stack[y];
    const { next, span } = node.levels[y];
    if (index + span > target || next == null) {
      --y;
    } else {
      stack[y] = { index: index + span, node: next };
    }
  }

  // Finish stack update
  if (y > 0) {
    const { index, node } = stack[y];
    for (let i = 0; i < y; ++i) {
      stack[i] = { index, node };
    }
  }

  return stack;
}

/**
 * Creates a generator that yields each node in a skip list at a specified level.
 *
 * Iteration begins from a given node up to, but not including, an optional end node. Defaults to level `0`.
 *
 * @param node - The starting {@link SkipNode} from which the iteration begins. If not defined, no nodes are yielded.
 * @param end - An optional {@link SkipNode} at which to end the iteration, exclusive. If provided, the iteration
 *              will halt before yielding this node. If `end` is `undefined`, the iteration will continue until
 *              the end of the list.
 * @param level - The level at which to traverse the skip list, starting from 0 for the base level. Defaults to `0`
 *                if not specified. If a negative value is given, or if the start `node` does not reach this level,
 *                no nodes are yielded.
 */
export function* nodes<T>(node?: SkipNode<T>): Generator<SkipNode<T>> {
  while (node != null) {
    yield node;
    node = node.levels[0].next;
  }
}

/**
 * Constructs a skip list from an array of levels and an array of values.
 *
 * @param levels - An array of integers that determines the number of
 *                 levels of the corresponding value in the `values` array.
 * @param values - An array of values to be stored in the skip list. Each
 *                 value is assigned to a new node in the list.
 *
 * @returns A tuple containing three elements:
 *          - The first element is the root {@link SkipNode} of the skip list. This is a dummy node immediately
 *            prior to the first value.
 *          - The second element is an array of {@link SkipNode}s representing the tail nodes at each level.
 *          - The third element is an integer `X` representing the number of nodes successfully added to the list,
 *            not including the root node.
 *
 * @remarks
 * - If the lengths of the input arrays do not match, the function operates on the smallest length.
 * - A dummy root node is created and updated to have up to the maximum level in the `levels` array.
 */
export function toList<T>(levels: number[], values: T[]): SkipCore<T> {
  // Get # of values (X) and max level (Y)
  let Y = -Infinity;
  const size = Math.min(levels.length, values.length);
  for (let i = 0; i < size; ++i) {
    if (Y < levels[i]) {
      Y = levels[i];
    }
  }

  // Check inputs
  if (Y <= 0 || size <= 0) {
    const root = toNode(undefined as T);
    return { root, size: 0, tails: [root] };
  }

  // Create root node and tails array
  const root = toNode(undefined as T, Y, size + 1);
  const tails = new Array(Y).fill(root);

  // For each value
  for (let i = 0; i < size; ++i) {
    // Create node
    Y = levels[i];
    const span = size - i;
    const next = toNode(values[i], Y, span);

    // Append node
    for (let y = 0; y < Y; ++y) {
      const levels = tails[y].levels;
      levels[y] = { next, span: levels[y].span - span };
      tails[y] = next;
    }
  }

  // Return root, tails and list length
  return { root, size, tails };
}

/**
 * Generates a new skip list node.
 *
 * @param value - The value to be stored in the new skip list node.
 * @param levels - The number of levels the node participates in within the skip list. Defaults to `1`.
 * @param span - The uniform distance to the next node at each level. Defaults to `1`.
 * @param next - The uniform next node at each level. Defaults to `undefined`.
 *
 * @returns A {@link SkipNode} object populated with the specified value and levels array. Each
 *          level in the array is initialized with a `next` pointer and `span` distance set to
 *          the specified values.
 */
export function toNode<T>(
  value: T,
  levels = 1,
  span = 1,
  next?: SkipNode<T>
): SkipNode<T> {
  const array = new Array<SkipLink<T>>(levels);
  for (let i = 0; i < levels; ++i) {
    array[i] = { next, span };
  }
  return { value, levels: array };
}

/**
 * Generates a skip stack filled with pointers to the given node and index.
 *
 * @param node - The {@link SkipNode} to which all pointers in the generated stack will point.
 * @param index - The index in the skip list at which the node is located. Defaults to `0`.
 *
 * @returns A {@link SkipStack} array, where each level points to `node` with index `index`.
 *          The length of this array is equal to the number of levels in the input node.
 */
export function toStack<T>(node: SkipNode<T>, index = 0): SkipStack<T> {
  const N = node.levels.length;
  const stack: SkipStack<T> = new Array(N);
  for (let i = 0; i < N; ++i) {
    stack[i] = { index, node };
  }
  return stack;
}

/**
 * Reduces the height of the skip list to the specified level.
 *
 * @param node - The skip node.
 * @param level - The target level.
 */
export function truncateLevels<T>(
  node: SkipNode<T> | undefined,
  level: number
): void {
  // Check inputs
  if (node == null || node.levels.length <= level) {
    return;
  }

  // Truncate nodes
  while (node != null) {
    const next = node.levels[level].next as SkipNode<T>;
    node.levels.length = level;
    node = next!;
  }
}

/**
 * Iterates through a skip list, yielding each node's value.
 *
 * This generator function provides a convenient way to enumerate all nodes in
 * a skip list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param node - The node at which to start iterating.
 */
export function* values<T>(node?: SkipNode<T>): Generator<T> {
  while (node != null) {
    yield node.value;
    node = node.levels[0].next;
  }
}
