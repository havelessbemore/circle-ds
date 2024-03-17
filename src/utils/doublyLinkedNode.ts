import { DoublyLinkedNode } from "../types/doublyLinkedNode";

import { get as singlyGet, cut as singlyCut } from "./linkedNode";

/**
 * Creates a copy of a segment from a doubly linked list.
 *
 * @param node - The first {@link DoublyLinkedNode} of the original list from
 *               which the copy operation begins.
 * @param count - The number of nodes to copy. If the count exceeds the number
 *                of nodes available, only the available nodes are copied.
 *
 * @returns A tuple containing:
 *          - The head {@link DoublyLinkedNode} of the new list.
 *          - The tail {@link DoublyLinkedNode} of the new list.
 *          - An integer representing the total number of nodes copied.
 */
export function copy<N extends DoublyLinkedNode<unknown>>(
  node: N | undefined,
  distance: number
): [N, N, number] | [undefined, undefined, 0] {
  // Check distance
  if (node == null || distance <= 0) {
    return [undefined, undefined, 0];
  }

  // Initialize new list
  const root = { value: undefined } as N;
  let tail = root;

  // For each node
  let size = 0;
  while (node != null && size < distance) {
    // Create a duplicate
    const dupe = { value: node.value } as N;

    // Attach the duplicate
    tail.next = dupe;
    dupe.prev = tail;
    tail = dupe;

    // Update size
    ++size;

    // Move to the next node
    node = node.next;
  }

  // Return copy
  const head = root.next!;
  head.prev = undefined;
  tail.next = undefined;
  return [head, tail, size];
}

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
 * Inserts a new sequence of values into a linked list right after a specified node.
 *
 * @param prev - The node in the linked list after which the new values will be inserted.
 * @param values - An iterable of values to be inserted.
 *
 * @returns The last node that was inserted into the list, or `prev` if no values were inserted.
 */
export function insert<T>(
  prev: DoublyLinkedNode<T>,
  values: T[]
): DoublyLinkedNode<T> {
  // Convert values to list
  const [head, tail, size] = toList(values);

  // If no values
  if (size <= 0) {
    return prev;
  }

  // Add values
  const next = prev.next;
  prev.next = head;
  head!.prev = prev;
  tail!.next = next;
  if (next != null) {
    next.prev = tail;
  }

  return tail!;
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
