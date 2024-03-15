import { SkipNode, SkipStack } from "../types/skipList";

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
