import { LinkedNode } from "../types/linkedNode";

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
export function cut<N extends LinkedNode<unknown>>(
  prev: N,
  count: number
): [N, N] | [undefined, undefined] {
  if (count <= 0) {
    return [undefined, undefined];
  }
  const head = prev.next!;
  const tail = get(head, count - 1)!;
  prev.next = tail.next;
  tail.next = undefined;
  return [head, tail];
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
export function* entries<T>(
  node?: LinkedNode<T>,
  end?: LinkedNode<T>
): Generator<[number, T]> {
  for (let i = 0; node != end; ++i) {
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
export function has<T>(
  node: LinkedNode<T> | undefined,
  value: T,
  end?: LinkedNode<T>
): boolean {
  while (node != end) {
    if (node!.value === value) {
      return true;
    }
    node = node!.next;
  }
  return false;
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
export function* keys<T>(
  node?: LinkedNode<T>,
  end?: LinkedNode<T>
): Generator<number> {
  for (let i = 0; node != end; ++i) {
    yield i;
    node = node!.next;
  }
}

/**
 * Finds the tail of the linked list and the distance to it.
 *
 * This function iterates through the linked list starting from the `node`
 * node, counting each node until it reaches the tail of the list (
 * where node.next is null or undefined).
 *
 * @param node - The node from which to start counting.
 *
 * @returns a tuple with the tail and distance to it.
 */
export function getTail(node?: null): [undefined, -1];
export function getTail<N extends LinkedNode<unknown>>(node: N): [N, number];
export function getTail<N extends LinkedNode<unknown>>(
  node?: N | null
): [N, number] | [undefined, -1];
export function getTail<N extends LinkedNode<unknown>>(
  node?: N | null
): [N, number] | [undefined, -1] {
  if (node == null) {
    return [undefined, -1];
  }
  let count = 0;
  while (node.next != null) {
    node = node.next;
    ++count;
  }
  return [node, count];
}

/**
 * Converts a linked list into an array of values.
 *
 * The conversion starts from the `node` node and includes all nodes up to the
 * end of the list, or the `end` node if provided.
 *
 * @param node - The node at which to start converting.
 * @param end - An optional node at which to end (exclusive).
 * If not provided, conversion continues until the end of the list.
 *
 * @returns An array with the values of the list from `node` to `end`.
 *
 * @throws - {@link TypeError}
 * thrown if an `end` node is provided but not encountered before the end of the list.
 */
export function toArray<T>(node?: LinkedNode<T>, end?: LinkedNode<T>): T[] {
  const array: T[] = [];

  while (node != end) {
    array.push(node!.value);
    node = node!.next;
  }

  return array;
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
): [LinkedNode<T>, LinkedNode<T>, number] | [undefined, undefined, 0] {
  const root = {} as LinkedNode<T>;

  let count = 0;
  let tail = root;
  for (const value of values) {
    tail.next = { value };
    tail = tail.next;
    ++count;
  }

  return root.next === undefined
    ? [undefined, undefined, 0]
    : [root.next, tail, count];
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
export function* values<T>(
  head?: LinkedNode<T>,
  end?: LinkedNode<T>
): Generator<T> {
  for (let i = 0; head != end; ++i) {
    yield head!.value;
    head = head!.next;
  }
}
