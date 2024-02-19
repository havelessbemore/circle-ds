import { Bounded, BoundedEvent } from "..";
import { DoublyLinkedNode as Node } from "../types/doublyLinkedNode";
import { List } from "../types/list";
import { cut, get, toList } from "../utils/doublyLinkedNode";
import { isInfinity, isNumber, isSafeCount } from "../utils/is";
import { entries, has, keys, toArray, values } from "../utils/linkedNode";
import { addIfBelow, clamp, isInRange, toInteger } from "../utils/math";
import { CircularBase } from "./circularBase";

export class CircularDoublyLinkedList<T>
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
      this.root.next = head!;
      this.root.prev = tail!;
      head!.prev = this.root;
      tail!.next = this.root;
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
    return CircularDoublyLinkedList.name;
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
    const [head, tail] = cut(this.root, diff);
    this._size -= diff;

    // Emit discarded items
    this.emitter.emit(BoundedEvent.Overflow, toArray(head, tail!.next));
  }

  at(index: number): T | undefined {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Return value
    return this.get(index).value;
  }

  clear(): void {
    this._size = 0;
    this.root.next = this.root;
    this.root.prev = this.root;
  }

  delete(index: number): boolean {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }

    // Delete value
    const node = this.get(index);
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    --this._size;

    return true;
  }

  entries(): IterableIterator<[number, T]> {
    return entries(this.root.next, this.root);
  }

  fill(value: T, start?: number, end?: number): this {
    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize end
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);

    // Update values
    let node = this.get(start);
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
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next!;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  has(value: T): boolean {
    return has(this.root.next, value, this.root);
  }

  keys(): IterableIterator<number> {
    return keys(this.root.next, this.root);
  }

  pop(): T | undefined {
    // Check if empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove tail
    const node = this.root.prev!;
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    --this._size;

    // Return value
    return node.value;
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
    this.append(this.root.prev!, values);

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
    const node = this.get(index);
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
    head.prev!.next = head.next;
    head.next!.prev = head.prev;
    --this._size;

    // Return value
    return head.value;
  }

  slice(start?: number, end?: number): CircularDoublyLinkedList<T> {
    const out = new CircularDoublyLinkedList<T>();

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
    let prev = this.get(start - 1);
    while (start < end) {
      prev = prev.next!;
      out.push(prev.value);
      ++start;
    }

    // Return new list
    return out;
  }

  splice(
    start: number,
    deleteCount?: number,
    ...items: T[]
  ): CircularDoublyLinkedList<T> {
    const out = new CircularDoublyLinkedList<T>();

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

    // Replace values
    const itemCount = items.length;
    let prev = this.get(start - 1);
    const replaceCount = Math.min(deleteCount, itemCount);
    for (let i = 0; i < replaceCount; ++i) {
      prev = prev.next!;
      out.push(prev.value);
      prev.value = items[i];
    }

    // Add values
    if (deleteCount <= replaceCount) {
      this.append(prev, items, replaceCount);
      return out;
    }

    // Attach out tail to segment head
    let tail = out.root.prev!;
    prev.next!.prev = tail;
    tail.next = prev.next;

    // Find segment tail
    const diff = deleteCount - replaceCount;
    tail = get(prev, diff)!;

    // Delete segment from list
    prev.next = tail.next!;
    prev.next.prev = prev;
    this._size -= diff;

    // Attach segment tail to out root
    tail.next = out.root;
    out.root.prev = tail;
    out._size += diff;

    return out;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return values(this.root.next, this.root);
  }

  unshift(...values: T[]): number {
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
    this.prepend(this.root.next!, values);

    // Return size
    return this._size;
  }

  values(): IterableIterator<T> {
    return values(this.root.next, this.root);
  }

  /**
   * @internal
   */
  protected append(tail: Node<T>, values: T[], minIndex = 0): Node<T> {
    const root = this.root;
    const next = tail.next!;
    const evicted: T[] = [];
    const capacity = this._capacity;

    // Add values
    let size = this._size;
    const N = values.length;
    for (let i = minIndex; i < N; ++i) {
      const curr = { prev: tail, value: values[i] } as Node<T>;
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
    next.prev = tail;
    root.next!.prev = root;

    // Emit evicted items
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }

    // Update size
    this._size = size;

    // Return last node
    return tail;
  }

  /**
   * @internal
   */
  protected get(index: number): Node<T> {
    index -= index <= this._size / 2 ? -1 : this._size;
    return get(this.root, index)!;
  }

  /**
   * @internal
   */
  protected prepend(next: Node<T>, values: T[]): Node<T> {
    const root = this.root;
    const prev = next.prev!;
    const evicted: T[] = [];
    const capacity = this._capacity;

    // Add values
    let size = this._size;
    for (let i = values.length - 1; i >= 0; --i) {
      const curr = { next, value: values[i] } as Node<T>;
      next.prev = curr;
      next = curr;
      if (size < capacity) {
        ++size;
      } else {
        evicted.push(root.prev!.value);
        root.prev = root.prev!.prev;
      }
    }
    next.prev = prev;
    prev.next = next;
    root.prev!.next = root;

    // Emit evicted items
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted.reverse());
    }

    // Update size
    this._size = size;

    // Return last node
    return next;
  }
}