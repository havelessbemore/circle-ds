import { LinkedNode } from "../types/linkedNode";

/**
 * Removes and returns a segment of a linked list as a new list.
 *
 * This operation modifies the original list by removing the specified
 * range of nodes, returning the new list's head and tail as a tuple.
 * If `count` \<= zero, the function returns [undefined, undefined].
 * If `count` \> len(root), a `TypeError` is thrown.
 *
 * @param root - The node preceding the start of the section to be cut.
 * @param count - The number of nodes to include in the cut.
 *
 * @returns A tuple containing the head and tail of the removed segment,
 * or [undefined, undefined] if `count` \<= zero.
 *
 * @throws - {@link TypeError}
 * thrown if `count` \> `len(root)`
 */
export function cut<T>(
  root: LinkedNode<T>,
  count: number
): [LinkedNode<T>, LinkedNode<T>] | [undefined, undefined] {
  if (count <= 0) {
    return [undefined, undefined];
  }
  const head = root.next!;
  const tail = get(head, count - 1)!;
  root.next = tail.next;
  tail.next = undefined;
  return [head, tail];
}

/**
 * Iterates through a linked list, yielding each node's index
 * (position in the list) and value as a tuple.
 *
 * This generator function provides a convenient way to enumerate all nodes in
 * a linked list, similar to how `Array.prototype.entries()` works for arrays.
 *
 * @param head - The head node of the linked list to iterate over.
 */
export function* entries<T>(
  head?: LinkedNode<T>,
  end?: LinkedNode<T>
): Generator<[number, T]> {
  for (let i = 0; head != end; ++i) {
    yield [i, head!.value];
    head = head!.next;
  }
}

/**
 * Retrieves the node at the specified index in a linked list.
 *
 * This function iterates through the linked list starting from the `head`
 * node, moving forward `index` nodes in the sequence. The caller is
 * responsible for ensuring that the list contains a sufficient number
 * of nodes to prevent accessing `undefined` properties. `index` values that
 * exceed the list's length will result in a `TypeError`.
 *
 * @param head - The node from which to start.
 * @param index - The zero-based index of the node to retrieve.
 *
 * @returns The node at the specified index, or `undefined` if `index` equals `len(head)`.
 *
 * @throws - {@link TypeError}
 * thrown if `index` \> `len(head)`
 */
export function get<T>(
  head: LinkedNode<T> | undefined,
  index: number
): LinkedNode<T> | undefined {
  if (index < 0) {
    return undefined;
  }
  for (let i = 0; i < index; ++i) {
    head = head!.next;
  }
  return head;
}

export function has<T>(
  head: LinkedNode<T> | undefined,
  value: T,
  end?: LinkedNode<T>
): boolean {
  while (head != end) {
    if (head!.value === value) {
      return true;
    }
    head = head!.next;
  }
  return false;
}

export function* keys<T>(
  head?: LinkedNode<T>,
  end?: LinkedNode<T>
): Generator<number> {
  for (let i = 0; head != end; ++i) {
    yield i;
    head = head!.next;
  }
}

/**
 * Calculates the length of the linked list.
 *
 * This function iterates through the linked list starting from the `head`
 * node, counting each node until it reaches the end of the list (i.e. the next
 * node is `null` or `undefined`).
 *
 * @param head - The node from which to start counting.
 *
 * @returns The number of nodes in the linked list.
 */
export function len<T>(head?: LinkedNode<T>, end?: LinkedNode<T>): number {
  let count = 0;
  while (head != end) {
    head = head!.next;
    ++count;
  }
  return count;
}

export function toArray<T>(head?: LinkedNode<T>, end?: LinkedNode<T>): T[] {
  const array: T[] = [];

  while (head != end) {
    array.push(head!.value);
    head = head!.next;
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

  return root.next == null
    ? [undefined, undefined, 0]
    : [root.next, tail, count];
}

export function* values<T>(
  head?: LinkedNode<T>,
  end?: LinkedNode<T>
): Generator<T> {
  for (let i = 0; head != end; ++i) {
    yield head!.value;
    head = head!.next;
  }
}
