import { SkipLevel, SkipNode } from "../types/skipList";
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
 * Climbs up the skip list from the given node to find and return the first
 * node at or above the specified level.
 *
 * @param node - The starting {@link SkipNode} from which the climb begins.
 * @param level - The target level to reach.
 *
 * @returns The first {@link SkipNode} encountered at or above the specified level, or `undefined` if no such node
 *          exists in the portion of the list being traversed.
 */
export function climb<T>(
  node: SkipNode<T> | undefined,
  level: number
): SkipNode<T> | undefined {
  while (node != null && node.levels.length <= level) {
    node = node.levels[node.levels.length - 1].next;
  }
  return node;
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
  root: SkipNode<T>,
  start: number,
  count: number
): [SkipNode<T>, SkipNode<T>[], number] {
  // Create new root
  let levels = root.levels.length;
  const segRoot = gen(undefined as T, levels);

  // Check count
  if (count <= 0) {
    return [segRoot, [segRoot], 0];
  }

  // Initialize new list
  const tails = new Array<SkipNode<T>>(levels).fill(segRoot);
  const indexes = new Array<number>(levels).fill(-1);

  // Get initial node
  let node: SkipNode<T> | undefined = getClosest(root, start)[0];
  node = node.levels[0].next;

  // For each node
  levels = 1;
  let size = 0;
  let index = 0;
  while (node != null && size < count) {
    // Update maximum level
    const L = node.levels.length;
    levels = levels >= L ? levels : L;

    // Create the duplicate node
    const dupe = gen(node.value, L);

    // Attach the duplicate at each level
    for (let lvl = 0; lvl < L; ++lvl) {
      tails[lvl].levels[lvl] = { next: dupe, span: index - indexes[lvl] };
      tails[lvl] = dupe;
      indexes[lvl] = index;
    }

    // Move to the next node
    const { next, span } = node.levels[0];
    index += span;
    node = next;
    ++size;
  }

  // Truncate the output list to the maximum level
  tails.length = levels;
  segRoot.levels.length = levels;

  // Update the tail pointers
  index = indexes[0] + 1;
  for (let i = 0; i < levels; ++i) {
    tails[i].levels[i] = { next: undefined, span: index - indexes[i] };
  }

  // Return the copy
  return [segRoot, tails, size];
}

/**
 * Iterates through a skip list, yielding each node's index
 * (position in the list) and value as a tuple.
 *
 * Iteration starts from the `node` node and continues until either the end
 * of the list, or the `end` node if provided.
 *
 * This generator function provides a convenient way to enumerate all nodes in
 * a skip list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param node - The node at which to start iterating.
 * @param end - An optional node at which to end (exclusive).
 * If not provided, iteration continues until the end of the list.
 */
export function* entries<T>(
  node?: SkipNode<T>,
  end?: SkipNode<T>
): Generator<[number, T]> {
  for (let i = 0; node != null && node != end; ++i) {
    yield [i, node.value];
    node = node.levels[0].next;
  }
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
export function gen<T>(
  value: T,
  levels = 1,
  span = 1,
  next?: SkipNode<T>
): SkipNode<T> {
  const array = new Array<SkipLevel<T>>(levels);
  for (let i = 0; i < levels; ++i) {
    array[i] = { next, span };
  }
  return { value, levels: array };
}

/**
 * Retrieves the node at the specified distance from the given node.
 *
 * @param node - The node from which to start.
 * @param distance - The forward distance of the node to retrieve.
 *
 * @returns The node at the specified index, or `undefined` if not found.
 */
export function get<T>(
  node: SkipNode<T>,
  distance: number
): SkipNode<T> | undefined {
  [node, distance] = getClosest(node, distance);
  return distance === 0 ? node : undefined;
}

/**
 * Retrieves the node at the specified distance from the given node, or the
 * closest node within the intended distance.
 *
 * @param node - The node from which to start.
 * @param distance - The forward distance of the node to retrieve.
 *
 * @returns A tuple of the resulting node and any remaining distance. If the
 * intended node was found, the tuple would be `[intended node, 0]`.
 * Otherwise, the tuple would be `[closest node, distance remaining]`.
 */
export function getClosest<T>(
  node: SkipNode<T>,
  distance: number
): [SkipNode<T>, number] {
  // Check distance
  if (distance <= 0) {
    return [node, distance];
  }

  // Find node
  let lvl = node.levels.length - 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { next, span } = node.levels[lvl];
    if (span <= distance && next != null) {
      // Do nothing
    } else if (--lvl < 0) {
      return [node, distance];
    } else {
      continue;
    }

    if (span == distance) {
      return [next, 0];
    }

    distance -= span;
    node = next;
  }
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
export function* getNodes<T>(
  node?: SkipNode<T>,
  end?: SkipNode<T>,
  level = 0
): Generator<SkipNode<T>> {
  if (node == null || level < 0 || node.levels.length <= level) {
    return;
  }
  while (node != null && node != end) {
    yield node;
    node = node.levels[level].next;
  }
}

/**
 * Determines whether a skip list contains a node with a specified value.
 *
 * Iteration starts from the `node` node and continues until either the end
 * of the list, or the `end` node if provided.
 *
 * @param node - The node from which to start searching.
 * @param value - The value to search for.
 * @param end - An optional node at which to end the search (exclusive).
 * If not provided, the search continues until the end of the list.
 *
 * @returns `true` if the specified value is found, `false` otherwise.
 *
 * @throws - {@link TypeError}
 * thrown if an `end` node is provided but not encountered before the end of the list.
 *
 */
export function has<T>(
  node: SkipNode<T> | undefined,
  value: T,
  end?: SkipNode<T>
): boolean {
  while (node != end) {
    if (node!.value === value) {
      return true;
    }
    node = node!.levels[0].next;
  }
  return false;
}

/**
 * Iterates through a skip list, yielding each node's index
 * (position in the list).
 *
 * Iteration starts from the `node` node and continues until either the end
 * of the list, or the `end` node if provided.
 *
 * This generator function provides a convenient way to enumerate all nodes in
 * a skip list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param node - The node at which to start iterating.
 * @param end - An optional node at which to end (exclusive).
 * If not provided, iteration continues until the end of the list.
 *
 * @throws - {@link TypeError}
 * thrown if an `end` node is provided but not encountered before the end of the list.
 */
export function* keys<T>(
  node?: SkipNode<T>,
  end?: SkipNode<T>
): Generator<number> {
  for (let i = 0; node != end; ++i) {
    yield i;
    node = node!.levels[0].next;
  }
}

/**
 * Converts a skip list into an array of values.
 *
 * The conversion starts from the `node` node and includes all nodes up to the
 * end of the list, or the `end` node if provided.
 *
 * @param node - The node at which to start converting.
 * @param end - An optional node at which to end (exclusive).
 * If not provided, conversion continues until the end of the list.
 * @param level - The level at which to traverse the skip list. Defaults to `0`
 * (the base level). If negative, or if `node` does not reach this level, an
 * empty array is returned.
 *
 * @returns An array with the values of the list from `node` to `end` at the given level.
 */
export function toArray<T>(
  node?: SkipNode<T>,
  end?: SkipNode<T>,
  level = 0
): T[] {
  if (level < 0 || (node != null && node.levels.length <= level)) {
    return [];
  }

  const array: T[] = [];
  while (node != null && node != end) {
    array.push(node.value);
    node = node.levels[level].next;
  }

  return array;
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
export function toList<T>(
  levels: number[],
  values: T[]
): [SkipNode<T>, SkipNode<T>[], number] {
  // Get # of values (X) and max level (Y)
  let Y = -Infinity;
  const X = Math.min(levels.length, values.length);
  for (let x = 0; x < X; ++x) {
    if (Y < levels[x]) {
      Y = levels[x];
    }
  }

  // Check inputs
  if (Y <= 0 || X <= 0) {
    const root = gen(undefined as T);
    return [root, [root], 0];
  }

  // Create root node and tails array
  const root: SkipNode<T> = gen(undefined as T, Y, X + 1);
  const tails = new Array(Y).fill(root);

  // For each value
  for (let x = 0; x < X; ++x) {
    // Create node
    const span = X - x;
    const nextY = levels[x];
    const next = gen(values[x], nextY, span);

    // Add node to list
    for (let y = 0; y < nextY; ++y) {
      const levels = tails[y].levels;
      levels[y] = { next, span: levels[y].span - span };
      tails[y] = next;
    }
  }

  // Return root, tails and list length
  return [root, tails, X];
}

/**
 * Truncates the levels of nodes in a skip list.
 *
 * Adjusts the `levels` array of each affected node by truncating it to the
 * specified level, reducing the height of the list for the segment.
 *
 * @param node - The node of the skip list from which level adjustment begins.
 *             This node will be the first node to have its level adjusted.
 * @param level - The target level to which the nodes' levels should be
 *              decreased if it's greater than this value.
 */
export function truncateLevels<T>(
  node: SkipNode<T> | undefined,
  level: number
): void {
  // Get first node at given level.
  node = climb(node, level);

  // Truncate nodes
  while (node != null) {
    const next = node!.levels[level].next;
    node.levels.length = level;
    node = next;
  }
}

/**
 * Iterates through a skip list, yielding each node's value.
 *
 * Iteration starts from the `node` node and continues until either the end
 * of the list, or the `end` node if provided.
 *
 * This generator function provides a convenient way to enumerate all nodes in
 * a skip list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param node - The node at which to start iterating.
 * @param end - An optional node at which to end (exclusive).
 * If not provided, iteration continues until the end of the list.
 *
 * @throws - {@link TypeError}
 * thrown if an `end` node is provided but not encountered before the end of the list.
 */
export function* values<T>(
  node?: SkipNode<T>,
  end?: SkipNode<T>
): Generator<T> {
  while (node != null && node != end) {
    yield node.value;
    node = node.levels[0].next;
  }
}
