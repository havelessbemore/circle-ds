import { DoublyLinkedNode } from "../types/doublyLinkedNode";

import { get as singlyGet, cut as singlyCut } from "./linkedNode";

/**
 * Removes and returns a segment of a linked list as a new list.
 *
 * This operation modifies the original list by removing the specified
 * range of nodes and returning the new list's head and tail as a tuple.
 * If `count` \<= zero, the function returns [undefined, undefined].
 * If `count` \> len(prev), a `TypeError` is thrown.
 *
 * @param prev - The node preceding the start of the section to be cut.
 * @param count - The number of nodes to include in the cut.
 *
 * @returns A tuple containing the head and tail of the removed segment,
 * or [undefined, undefined] if `count` \<= zero.
 *
 * @throws - {@link TypeError}
 * thrown if `count` \> `len(prev)`
 */
export function cut<N extends DoublyLinkedNode<unknown>>(
  root: N,
  count: number
): [N, N] | [undefined, undefined] {
  if (count <= 0) {
    return [undefined, undefined];
  }
  const [head, tail] = singlyCut(root, count) as [N, N];
  head.prev = undefined;
  if (root.next != null) {
    root.next.prev = root;
  }
  return [head, tail];
}

/**
 * Retrieves the node at the specified distance from the given node.
 *
 * This function iterates through the linked list starting from the `node`
 * node, moving `index` nodes away in the list.
 *
 * @param node - The node from which to start.
 * @param index - The forward distance of the node to retrieve.
 *
 * @returns The node at the specified index,
 * or `undefined` if `index` does not exist.
 */
export function get<N extends DoublyLinkedNode<unknown>>(
  node: N | undefined,
  index: number
): N | undefined {
  if (index >= 0) {
    return singlyGet(node, index);
  }
  for (let i = 0; node != null && i > index; --i) {
    node = node.prev;
  }
  return node;
}

/**
 * Converts an iterable collection of values into a linked list and returns
 * the head, tail and size of the list.
 *
 * If the iterable is empty, the function returns a triple containing
 * `[undefined, undefined, 0]` to indicate that no list was created.
 *
 * @param values - The iterable collection of elements.
 *
 * @returns A triple containing the head, tail and size of the list.
 * Returns `[undefined, undefined, 0]` if the iterable is empty.
 */
export function toList<T>(
  values: Iterable<T>
):
  | [DoublyLinkedNode<T>, DoublyLinkedNode<T>, number]
  | [undefined, undefined, 0] {
  const root = {} as DoublyLinkedNode<T>;

  let count = 0;
  let tail = root;
  for (const value of values) {
    tail.next = { prev: tail, value } as DoublyLinkedNode<T>;
    tail = tail.next;
    ++count;
  }

  if (count <= 0) {
    return [undefined, undefined, 0];
  }

  root.next!.prev = undefined;
  return [root.next!, tail, count];
}
