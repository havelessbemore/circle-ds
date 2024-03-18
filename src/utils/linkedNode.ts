import { LinkedCore, LinkedNode } from "../types/linkedNode";

/**
 * Creates a copy of a segment from a linked list.
 *
 * @param node - The first {@link LinkedNode} of the original list from which
 *               the copy operation begins.
 * @param count - The number of nodes to copy. If the count exceeds the number
 *                of nodes available, only the available nodes are copied.
 *
 * @returns A tuple containing:
 *          - The head {@link LinkedNode} of the new list.
 *          - The tail {@link LinkedNode} of the new list.
 *          - An integer representing the total number of nodes copied.
 */
export function copy<T>(
  node: LinkedNode<T> | undefined,
  distance: number
): LinkedCore<T> {
  // Create new root
  const root: LinkedNode<T> = { value: undefined as T };

  // For each node
  let size = 0;
  let tail = root;
  while (node != null && size < distance) {
    // Create a duplicate
    const dupe: LinkedNode<T> = { value: node.value };

    // Attach the duplicate
    tail.next = dupe;
    tail = dupe;

    // Update size
    ++size;

    // Move to the next node
    node = node.next;
  }

  // Return copy
  tail.next = undefined;
  return { root, size, tail };
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
export function cut<T>(
  prev: LinkedNode<T> | undefined,
  count: number
): LinkedCore<T> {
  // Create new root
  const root: LinkedNode<T> = { value: undefined as T };

  // Check inputs
  if (prev == null || count <= 0) {
    return { root, size: 0, tail: root };
  }

  // Cut segment
  const head = prev.next!;
  const tail = get(head, count - 1)!;
  prev.next = tail.next;
  tail.next = undefined;

  // Return cut segment
  root.next = head;
  return { root, size: count, tail };
}

/**
 * Iterates through a linked list, yielding each node's index
 * (position in the list) and value as a tuple.
 *
 * Iteration starts from the `node` node and continues until either the end
 * of the list, or the `end` node if provided.
 *
 * This generator function provides a convenient way to enumerate all nodes in
 * a linked list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param node - The node at which to start iterating.
 * @param end - An optional node at which to end (exclusive).
 * If not provided, iteration continues until the end of the list.
 *
 * @throws - {@link TypeError}
 * thrown if an `end` node is provided but not encountered before the end of the list.
 */
export function* entries<T>(node?: LinkedNode<T>): Generator<[number, T]> {
  for (let i = 0; node != null; ++i) {
    yield [i, node!.value];
    node = node!.next;
  }
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
export function get<N extends LinkedNode<unknown>>(
  node: N | undefined,
  index: number
): N | undefined {
  if (index < 0) {
    return undefined;
  }
  for (let i = 0; node != null && i < index; ++i) {
    node = node.next;
  }
  return node;
}

/**
 * Determines whether a linked list contains a node with a specified value.
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
export function has<T>(node: LinkedNode<T> | undefined, value: T): boolean {
  while (node != null) {
    if (node!.value === value) {
      return true;
    }
    node = node!.next;
  }
  return false;
}

/**
 * Inserts a new sequence of values into a linked list right after a specified node.
 *
 * @param prev - The node in the linked list after which the new values will be inserted.
 * @param values - An iterable of values to be inserted.
 * @returns The last node that was inserted into the list, or `prev` if no values were inserted.
 */
export function insert<T>(
  prev: LinkedNode<T>,
  values: Iterable<T>
): LinkedNode<T> {
  // Convert values to list
  const { root, size, tail } = toList(values);

  // If no values
  if (size <= 0) {
    return prev;
  }

  // Add values
  tail!.next = prev.next;
  prev.next = root.next;

  return tail!;
}

/**
 * Iterates through a linked list, yielding each node's index
 * (position in the list).
 *
 * Iteration starts from the `node` node and continues until either the end
 * of the list, or the `end` node if provided.
 *
 * This generator function provides a convenient way to enumerate all nodes in
 * a linked list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param node - The node at which to start iterating.
 * @param end - An optional node at which to end (exclusive).
 * If not provided, iteration continues until the end of the list.
 *
 * @throws - {@link TypeError}
 * thrown if an `end` node is provided but not encountered before the end of the list.
 */
export function* keys<T>(node?: LinkedNode<T>): Generator<number> {
  for (let i = 0; node != null; ++i) {
    yield i;
    node = node!.next;
  }
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
export function toList<T>(values: Iterable<T>): LinkedCore<T> {
  const root: LinkedNode<T> = { value: undefined as T };

  let size = 0;
  let tail = root;
  for (const value of values) {
    tail.next = { value };
    tail = tail.next;
    ++size;
  }
  tail.next = undefined;

  return { root, size, tail };
}

/**
 * Iterates through a linked list, yielding each node's value.
 *
 * Iteration starts from the `node` node and continues until either the end
 * of the list, or the `end` node if provided.
 *
 * This generator function provides a convenient way to enumerate all nodes in
 * a linked list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param node - The node at which to start iterating.
 * @param end - An optional node at which to end (exclusive).
 * If not provided, iteration continues until the end of the list.
 *
 * @throws - {@link TypeError}
 * thrown if an `end` node is provided but not encountered before the end of the list.
 */
export function* values<T>(node?: LinkedNode<T>): Generator<T> {
  while (node != null) {
    yield node!.value;
    node = node!.next;
  }
}
