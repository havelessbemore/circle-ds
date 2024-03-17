import { SkipCore, SkipNode, SkipStack } from "../types/skipList";

import { gen as genNode } from "./skipNode";

/**
 * Creates a copy of the provided skip stack.
 *
 * @param stack - The {@link SkipStack} to be cloned.
 * @returns The copy of the input {@link SkipStack}.
 */
export function clone<T>(stack: SkipStack<T>): SkipStack<T> {
  const N = stack.length;
  const dupe: SkipStack<T> = new Array(N);
  for (let i = 0; i < N; ++i) {
    const { index, node } = stack[i];
    dupe[i] = { index, node };
  }
  return dupe;
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
  const segRoot = genNode(undefined as T);
  const seg: SkipCore<T> = { root: segRoot, size: 0, tails: [segRoot] };

  // Check inputs
  if (distance <= 0) {
    return seg;
  }

  // Initialize constants
  const prevStack = getClosest(gen(core.root, -1), start);
  const tailStack = getClosest(clone(prevStack), distance);
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
 * Generates a skip stack filled with pointers to the given node and index.
 *
 * @param node - The {@link SkipNode} to which all pointers in the generated stack will point.
 * @param index - The index in the skip list at which the node is located. Defaults to `0`.
 *
 * @returns A {@link SkipStack} array, where each level points to `node` with index `index`.
 *          The length of this array is equal to the number of levels in the input node.
 */
export function gen<T>(node: SkipNode<T>, index = 0): SkipStack<T> {
  const N = node.levels.length;
  const stack: SkipStack<T> = new Array(N);
  for (let i = 0; i < N; ++i) {
    stack[i] = { index, node };
  }
  return stack;
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
export function getClosest<T>(
  stack: SkipStack<T>,
  distance: number
): SkipStack<T> {
  // Check inputs
  if (distance <= 0 || stack.length <= 0) {
    return stack;
  }

  let lvl = stack.length - 1;
  let ptr = stack[lvl];
  const target = stack[0].index + distance;

  // Find node
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { next, span } = ptr.node.levels[lvl];
    const nextIndex = ptr.index + span;

    if (nextIndex <= target && next != null) {
      // Do nothing
    } else if (--lvl < 0) {
      break;
    } else {
      ptr = stack[lvl];
      continue;
    }

    ptr = { index: nextIndex, node: next };
    stack[lvl] = ptr;

    if (nextIndex == target) {
      break;
    }
  }

  for (let i = 0; i < lvl; ++i) {
    stack[i] = { index: ptr.index, node: ptr.node };
  }

  return stack;
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

  // Attach segment at given index
  const prevs = getClosest(gen(dest.root, -1), index);
  for (let y = 0; y < minY; ++y) {
    const prev = prevs[y].node;
    const prevI = prevs[y].index;

    const prevEdge = prev.levels[y];
    const tail = src.tails[y];
    const tailEdge = tail.levels[y];
    const nextI = prevI + prevEdge.span;
    const nextD = nextI - index;
    const tailD = tailEdge.span;
    tail.levels[y] = { next: prevEdge.next, span: nextD + tailD };

    const rootEdge = src.root.levels[y];
    const headD = rootEdge.span - 1;
    const prevD = index - prevI;
    prev.levels[y] = { next: rootEdge.next, span: prevD + headD };
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
