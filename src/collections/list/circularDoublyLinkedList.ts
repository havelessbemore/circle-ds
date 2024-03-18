import { Bounded } from "../../types/bounded";
import { BoundedEvent } from "../../types/boundedEvent";
import {
  DoublyLinkedNode,
  DoublyLinkedNode as Node,
} from "../../types/doublyLinkedNode";
import { List } from "../../types/list";

import { ARGS_MAX_LENGTH, LINKED_MAX_LENGTH } from "../../utils/constants";
import { copy, cut, get, toList } from "../../utils/doublyLinkedNode";
import { isInfinity, isLinkedLength, isNumber } from "../../utils/is";
import { chunk } from "../../utils/iterable";
import {
  entries,
  has,
  keys,
  values as getValues,
} from "../../utils/linkedNode";
import { addIfBelow, clamp, isInRange, toInteger } from "../../utils/math";

import { CircularBase } from "../circularBase";

export class CircularDoublyLinkedList<T>
  extends CircularBase<T>
  implements Bounded<T>, List<T>
{
  /**
   * @internal
   * The maximum number of elements that can be stored in the collection.
   */
  protected _capacity: number;

  /**
   * @internal
   * Whether capacity is finite (true) or infinite (false).
   */
  protected _isFinite: boolean;

  /**
   * @internal
   * The root of the linked list
   */
  protected _root: Node<T>;

  /**
   * @internal
   * The current size of the list (0 \<= size \<= capacity)
   */
  protected _size: number;

  /**
   * @internal
   * The last node in the linked list.
   */
  protected _tail: DoublyLinkedNode<T>;

  /**
   * Creates a standard linked list (no capacity restriction).
   */
  constructor();
  /**
   * Creates a linked list with the given capacity.
   *
   * @param capacity - the list's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a linked list with the given items. Capacity is set to the number of items.
   *
   * @param items - the values to store in the list.
   */
  constructor(items: Iterable<T>);
  constructor(capacity?: number | null | Iterable<T>) {
    super();

    // Initialize class variables
    this._capacity = LINKED_MAX_LENGTH;
    this._isFinite = false;
    this._root = { value: undefined } as Node<T>;
    this._size = 0;
    this._tail = this._root;

    // Case 1: input is null or undefined
    if (capacity == null) {
      return;
    }

    // Case 2: input is capacity
    if (isNumber(capacity)) {
      this.capacity = capacity;
      return;
    }

    // Case 3: capacity is iterable
    const [head, tail, size] = toList(capacity as Iterable<T>);
    this._capacity = size;
    this._isFinite = true;
    if (size > 0) {
      head!.prev = this._root;
      this._root.next = head!;
      this._size = size;
      this._tail = tail!;
    }
  }

  get capacity(): number {
    return this._isFinite ? this._capacity : Infinity;
  }

  get size(): number {
    return this._size;
  }

  get [Symbol.toStringTag](): string {
    return CircularDoublyLinkedList.name;
  }

  set capacity(capacity: number) {
    // Convert input to a number
    capacity = +capacity;

    // Convert input to a number
    capacity = +capacity;

    // Check capacity
    if (isInfinity(capacity)) {
      // If capacity is Infinity
      capacity = LINKED_MAX_LENGTH;
      this._isFinite = false;
    } else if (isLinkedLength(capacity)) {
      // If capacity is valid
      this._isFinite = true;
    } else {
      // If capacity is invalid
      throw new RangeError("Invalid capacity");
    }

    // Update capacity
    this._capacity = capacity;

    // If current size fits within new capacity
    if (this._size <= capacity) {
      return;
    }

    // Shrink
    const diff = this._size - capacity;
    const [head] = cut(this._root, diff);
    this._size -= diff;

    // Update tail, if needed
    if (this._size <= 0) {
      this._tail = this._root;
    }

    // Emit discarded items
    for (const array of chunk(getValues(head), ARGS_MAX_LENGTH)) {
      this._overflow(array);
    }
  }

  at(index: number): T | undefined {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Return value
    return this._get(index).value;
  }

  clear(): void {
    this._size = 0;
    this._tail = this._root;
    this._root.next = undefined;
  }

  delete(index: number): boolean {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }

    // Delete value
    const node = this._get(index);
    node.prev!.next = node.next;
    if (node.next != null) {
      node.next.prev = node.prev;
    }
    --this._size;

    return true;
  }

  entries(): IterableIterator<[number, T]> {
    return entries(this._root.next);
  }

  fill(value: T, start?: number, end?: number): this {
    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize end
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);

    // Update values
    let node = this._get(start);
    while (start < end) {
      node.value = value;
      node = node.next!;
      ++start;
    }

    return this;
  }

  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: unknown
  ): void {
    let node = this._root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next!;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  has(value: T): boolean {
    return has(this._root.next, value);
  }

  keys(): IterableIterator<number> {
    return keys(this._root.next);
  }

  pop(): T | undefined {
    // If list is empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove last value
    const [head] = this._cut(this._size - 1, 1);

    // Return value
    return head!.value;
  }

  push(...values: T[]): number {
    // Add values
    this._insert(this._size, values);

    // Return size
    return this._size;
  }

  set(index: number, value: T): T | undefined {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Update node
    const node = this._get(index);
    const prevValue = node.value;
    node.value = value;

    // Return previous value
    return prevValue;
  }

  shift(): T | undefined {
    // If list is empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove first value
    const [head] = this._cut(0, 1);

    // Return value
    return head!.value;
  }

  slice(start?: number, end?: number): CircularDoublyLinkedList<T> {
    const size = this._size;

    // Sanitize inputs
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);

    // Check if empty
    if (start >= end) {
      return new CircularDoublyLinkedList<T>(0);
    }

    // Create segment copy
    const node = this._get(start);
    const [head, tail, length] = copy(node, end - start);

    // Return copied segment as a list
    const list = new CircularDoublyLinkedList<T>(length);
    head!.prev = list._root;
    list._root.next = head;
    list._size = length;
    list._tail = tail ?? list._root;

    // Return new list
    return list;
  }

  splice(
    start: number,
    deleteCount?: number,
    ...items: T[]
  ): CircularDoublyLinkedList<T> {
    const size = this._size;

    // Sanitize inputs
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    deleteCount = clamp(toInteger(deleteCount, 0), 0, size - start);

    // Remove deleted items, if any
    let list: CircularDoublyLinkedList<T>;
    if (deleteCount <= 0) {
      list = new CircularDoublyLinkedList<T>(0);
    } else {
      const [head, tail] = this._cut(start, deleteCount);
      list = new CircularDoublyLinkedList<T>(deleteCount);
      head!.prev = list._root;
      list._root.next = head;
      list._size = deleteCount;
      list._tail = tail ?? list._root;
    }

    // Add new items
    this._insert(start, items);

    // Return deleted items as a list
    return list;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return getValues(this._root.next);
  }

  unshift(...values: T[]): number {
    // Add values
    this._presert(0, values);

    // Return new size
    return this._size;
  }

  values(): IterableIterator<T> {
    return getValues(this._root.next);
  }

  /**
   * @internal
   */
  protected _cut(
    start: number,
    count: number
  ): [Node<T>, Node<T>] | [undefined, undefined] {
    // Get previous
    const prev = this._get(start - 1)!;

    // Cut and get removed segment
    const [head, tail] = cut(prev, count);

    // Update size
    this._size -= count;

    // Update tail
    if (start >= this._size) {
      this._tail = prev;
    }

    // Return cut segment
    return [head, tail] as [Node<T>, Node<T>];
  }

  /**
   * @internal
   */
  protected _get(index: number): Node<T> {
    const mid = this._size / 2;
    return ++index <= mid
      ? get(this._root, index)!
      : get(this._tail, index - this._size)!;
  }

  /**
   * @internal
   */
  protected _insert(index: number, values: T[]): void {
    // If no values
    const N = values.length;
    if (N <= 0) {
      return;
    }

    // If no capacity
    if (this._capacity <= 0) {
      this._overflow(values);
      return;
    }

    // Check free space
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values);
      return;
    }

    // Check if "infinite" capacity yet not enough space
    if (!this._isFinite) {
      this._safeInsert(index, values.slice(0, free));
      throw new Error("Out of memory");
    }

    // Remove from head
    if (index > 0) {
      const shifted = Math.min(index, N - free);
      const [head] = this._cut(0, shifted);
      this._overflow(getValues(head));
      index -= shifted;
      free += shifted;
    }

    // Check free space
    if (free >= N) {
      this._safeInsert(index, values);
      return;
    }

    // Remove from items and insert remaining
    const mid = values.length - free;
    this._overflow(values.slice(0, mid));
    this._safeInsert(0, values.slice(mid));
  }

  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  protected _overflow(evicted: Iterable<T>): void {
    if (!Array.isArray(evicted)) {
      evicted = Array.from(evicted);
    }
    this._emitter.emit(BoundedEvent.Overflow, evicted);
  }

  /**
   * @internal
   */
  protected _presert(index: number, values: T[]): void {
    // If no values
    const N = values.length;
    if (N <= 0) {
      return;
    }

    // If no capacity
    if (this._capacity <= 0) {
      this._overflow(values);
      return;
    }

    // Check free space
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values);
      return;
    }

    // Check if "infinite" capacity yet not enough space
    if (!this._isFinite) {
      this._safeInsert(0, values.slice(values.length - free));
      throw new Error("Out of memory");
    }

    // Remove from tail
    if (index < this._size) {
      const popped = Math.min(this._size - index, N - free);
      const [head] = this._cut(this._size - popped, popped);
      this._overflow(getValues(head));
      free += popped;
    }

    // Check free space
    if (free >= N) {
      this._safeInsert(index, values);
      return;
    }

    // Remove from items and insert remaining
    this._overflow(values.slice(free));
    this._safeInsert(this._size, values.slice(0, free));
  }

  /**
   * @internal
   */
  protected _safeInsert(index: number, values: T[]): void {
    // Sanitize input
    if (values.length <= 0) {
      return;
    }

    // Create segment
    const [head, tail, size] = toList(values);

    // Insert segment
    const prev = this._get(index - 1);
    const next = prev.next;
    head!.prev = prev;
    tail!.next = next;
    if (next != null) {
      next.prev = tail;
    }
    prev.next = head;

    // Update list state
    this._tail = index < this._size ? this._tail : tail!;
    this._size += size;
  }
}
