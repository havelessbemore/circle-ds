import { Bounded, BoundedEvent } from "..";
import { LinkedNode as Node } from "../types/linkedNode";
import { List } from "../types/list";
import { isInfinity, isNumber, isSafeCount } from "../utils/is";
import {
  cut,
  entries,
  get,
  has,
  keys,
  toArray,
  toList,
  values,
} from "../utils/linkedNode";
import { addIfBelow, clamp, isInRange, toInteger } from "../utils/math";
import { CircularBase } from "./circularBase";

export class CircularLinkedList<T>
  extends CircularBase<T>
  implements Bounded<T>, List<T>
{
  /**
   * The maximum number of elements that can be stored in the collection.
   * @internal
   */
  protected _capacity: number;

  /**
   * The root of the linked list
   * @internal
   */
  protected root: Node<T>;

  /**
   * The current size of the list (0 \<= size \<= capacity)
   * @internal
   */
  protected _size!: number;

  /**
   * The last node in the linked list.
   * @internal
   */
  protected tail!: Node<T>;

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
    this._capacity = Infinity;
    this.root = { value: undefined } as Node<T>;
    this.clear();

    // Case 1: capacity is null, undefined or Infinity
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }

    // Case 2: capacity is zero or a positive safe integer
    if (isNumber(capacity)) {
      if (!isSafeCount(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      return;
    }

    // Case 3: capacity is iterable
    const [head, tail, size] = toList(capacity as Iterable<T>);
    this._capacity = size;
    if (size > 0) {
      this.root.next = head;
      this.tail = tail!;
      this._size = size;
    }
  }

  get capacity(): number {
    return this._capacity;
  }

  get size(): number {
    return this._size;
  }

  get [Symbol.toStringTag](): string {
    return CircularLinkedList.name;
  }

  set capacity(capacity: number) {
    // Convert input to a number
    capacity = +capacity;

    // If input is NaN, below zero, or a non-integer
    if (!isInfinity(capacity) && !isSafeCount(capacity)) {
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
    const [head] = cut(this.root, diff);
    this._size -= diff;

    // Update tail, if needed
    if (this._size <= 0) {
      this.tail = this.root;
    }

    // Emit discarded items
    this.emitter.emit(BoundedEvent.Overflow, toArray(head));
  }

  at(index?: number): T | undefined {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // If tail
    if (++index == this._size) {
      return this.tail.value;
    }

    // Return value
    return get(this.root, index)!.value;
  }

  clear(): void {
    this._size = 0;
    this.root.next = undefined;
    this.tail = this.root;
  }

  delete(index: number): boolean {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }

    // Delete value
    const prev = get(this.root, index)!;
    prev.next = prev.next!.next;
    --this._size;

    // Update tail, if needed
    if (index == this._size) {
      this.tail = prev;
    }

    return true;
  }

  entries(): IterableIterator<[number, T]> {
    return entries(this.root.next);
  }

  fill(value: T, start?: number, end?: number): this {
    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize end
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);

    // Update values
    let node = get(this.root, start + 1);
    while (start < end) {
      node!.value = value;
      node = node!.next;
      ++start;
    }

    return this;
  }

  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: unknown
  ): void {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next!;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  has(value: T): boolean {
    return has(this.root.next, value);
  }

  keys(): IterableIterator<number> {
    return keys(this.root.next);
  }

  pop(): T | undefined {
    // Check if empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove and update tail
    const value = this.tail.value;
    this.tail = get(this.root, --this._size)!;
    this.tail.next = undefined;

    // Return value
    return value;
  }

  push(...values: T[]): number {
    // Case 1: No values
    const N = values.length;
    if (N <= 0) {
      return this._size;
    }

    // Case 2: Zero capacity
    const capacity = this._capacity;
    if (capacity <= 0) {
      this.emitter.emit(BoundedEvent.Overflow, values);
      return this._size;
    }

    // Add values
    this.tail = this.append(this.tail, values);

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
    const node = get(this.root, index + 1)!;
    const prevValue = node.value;
    node.value = value;

    // Return previous value
    return prevValue;
  }

  shift(): T | undefined {
    // Check if empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove head
    const head = this.root.next!;
    this.root.next = head.next;
    --this._size;

    // Update tail, if needed
    if (this._size <= 0) {
      this.tail = this.root;
    }

    // Return value
    return head.value;
  }

  slice(start?: number, end?: number): CircularLinkedList<T> {
    const out = new CircularLinkedList<T>();

    // Check if empty
    if (this._size <= 0) {
      return out;
    }

    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize end
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);

    // Add values to output
    let node = get(this.root, start)!;
    while (start < end) {
      node = node.next!;
      out.push(node.value);
      ++start;
    }

    // Return new list
    return out;
  }

  splice(
    start: number,
    deleteCount?: number,
    ...items: T[]
  ): CircularLinkedList<T> {
    const out = new CircularLinkedList<T>();

    // Check if empty
    if (this._size <= 0) {
      return out;
    }

    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize deleteCount
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, this._size - start);

    // Get prev node
    let prev = get(this.root, start)!;

    // Delete values
    const [head, tail] = cut(prev, deleteCount);
    this._size -= deleteCount;
    out.root.next = head;
    out.tail = tail ?? out.root;
    out._size = deleteCount;

    // Add values
    prev = this.append(prev, items);

    // Update tail, if needed
    if (prev.next == null) {
      this.tail = prev;
    }

    return out;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return values(this.root.next);
  }

  unshift(...values: T[]): number {
    // Case 1: No values
    let N = values.length;
    if (N <= 0) {
      return this._size;
    }

    // Case 2: No capacity
    const capacity = this._capacity;
    if (capacity <= 0) {
      this.emitter.emit(BoundedEvent.Overflow, values);
      return this._size;
    }

    // Reduce input
    const diff = N <= capacity ? 0 : N - capacity;
    N -= diff;

    // Case 3: Discard list overflow
    if (this._size + N > capacity) {
      this._size = capacity - N;
      const prev = get(this.root, this._size)!;
      this.emitter.emit(BoundedEvent.Overflow, toArray(prev.next));
      prev.next = undefined;
      this.tail = prev;
    }

    // Discard input overflow
    if (diff > 0) {
      this.emitter.emit(BoundedEvent.Overflow, values.slice(N));
      values.length = N;
    }

    // Add values
    const [head, tail] = toList(values);
    tail!.next = this.root.next;
    this.root.next = head;

    // Update tail, if needed
    if (this._size <= 0) {
      this.tail = tail!;
    }

    // Update size
    this._size += N;
    return this._size;
  }

  values(): IterableIterator<T> {
    return values(this.root.next);
  }

  /**
   * @internal
   */
  protected append(tail: Node<T>, values: T[], minIndex = 0): Node<T> {
    const root = this.root;
    const next = tail.next;
    const evicted: T[] = [];
    const capacity = this._capacity;

    // Add values
    let size = this._size;
    const N = values.length;
    for (let i = minIndex; i < N; ++i) {
      const curr = { value: values[i] } as Node<T>;
      tail.next = curr;
      tail = curr;
      if (size < capacity) {
        ++size;
      } else {
        evicted.push(root.next!.value);
        root.next = root.next!.next;
      }
    }
    tail.next = next;

    // Emit evicted items
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }

    // Update size
    this._size = size;

    // Return last node
    return tail;
  }
}
