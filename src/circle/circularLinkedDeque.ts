import { CircularBase } from "./circularBase";
import { BoundedEvent } from "../types/boundedEvent";
import { Deque } from "../types/deque";
import { isInfinity, isNumber, isSafeCount } from "../utils/is";
import { Bounded } from "../types/bounded";

interface Node<T> {
  next: Node<T>;
  prev: Node<T>;
  value: T;
}

/**
 * A circular stack is similar to a traditional stack, but uses a fixed-size,
 * circular buffer. When the stack reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class CircularLinkedDeque<T>
  extends CircularBase<T>
  implements Bounded<T>, Deque<T>
{
  /**
   * The maximum number of elements that can be stored in the collection.
   * @internal
   */
  protected _capacity: number;

  /**
   * The root of the collection.
   * @internal
   */
  protected root: Node<T>;

  /**
   * The number of elements in the collection.
   * @internal
   */
  protected _size: number;

  /**
   * Creates a new stack with `capacity` defaulted to `Infinity`.
   */
  constructor();
  /**
   * Creates a new stack with the given capacity.
   *
   * @param capacity - the stack's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a new stack. Initial capacity is the number of items given.
   *
   * @param items - the values to store in the stack.
   */
  constructor(items: Iterable<T>);
  constructor(capacity?: number | null | Iterable<T>) {
    super();

    // Initialize class variables
    this._capacity = Infinity;
    this.root = { value: undefined } as Node<T>;
    this.root.next = this.root;
    this.root.prev = this.root;
    this._size = 0;

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
    let tail = this.root.prev;
    for (const value of capacity as Iterable<T>) {
      tail.next = { next: this.root, prev: tail, value };
      tail = tail.next;
      this.root.prev = tail;
      ++this._size;
    }
    this._capacity = this._size;
  }

  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   *  @returns the number of elements in the collection.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag](): string {
    return CircularLinkedDeque.name;
  }

  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(capacity: number) {
    // Convert input to a number
    capacity = +capacity;

    // If input is NaN, below zero, or a non-integer
    if (!isInfinity(capacity) && !isSafeCount(capacity)) {
      throw new RangeError("Invalid capacity");
    }

    // If current size fits within new capacity
    if (this._size <= capacity) {
      this._capacity = capacity;
      return;
    }

    // Shrink stack
    const items: T[] = [];
    let head = this.root.next;
    do {
      items.push(head.value);
      head = head.next;
    } while (--this._size > capacity);
    this.root.next = head;
    head.prev = this.root;

    // Update capacity
    this._capacity = capacity;

    // Emit discarded items
    this.emitter.emit(BoundedEvent.Overflow, items);
  }

  /**
   * Remove all elements and resets the collection.
   */
  clear(): void {
    this._size = 0;
    this.root = { value: undefined } as Node<T>;
    this.root.next = this.root;
    this.root.prev = this.root;
  }

  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries(): IterableIterator<[number, T]> {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield [i, node.value];
    }
  }

  /**
   * Get the first element in the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first(): T | undefined {
    return this.root.next.value;
  }

  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(
    callbackfn: (value: T, index: number, collection: this) => void,
    thisArg?: unknown
  ): void {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  /**
   * Get the element at the front of the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  front(): T | undefined {
    return this.root.next.value;
  }

  /**
   * Determines whether a given element is in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param value - The element to search for
   *
   * @returns a boolean indicating if `value` was found or not
   */
  has(value: T): boolean {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      if (node.value === value) {
        return true;
      }
    }
    return false;
  }

  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys(): IterableIterator<number> {
    for (let i = 0; i < this._size; ++i) {
      yield i;
    }
  }

  /**
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last(): T | undefined {
    return this.root.prev.value;
  }

  /**
   * Removes the top element from the stack and returns it.
   *
   * @returns the top element, or `undefined` if empty.
   */
  pop(): T | undefined {
    if (this._size < 1) {
      return undefined;
    }
    const node = this.root.prev;
    this.root.prev = node.prev;
    node.prev.next = this.root;
    --this._size;
    return node.value;
  }

  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...elems: T[]): number {
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emitter.emit(BoundedEvent.Overflow, elems);
      return this._size;
    }

    const N = elems.length;
    const root = this.root;
    const evicted: T[] = [];

    let tail = root.prev;
    for (let i = 0; i < N; ++i) {
      tail.next = { next: root, prev: tail, value: elems[i] };
      tail = tail.next;
      if (this._size < capacity) {
        ++this._size;
      } else {
        evicted.push(root.next.value);
        root.next = root.next.next;
      }
    }
    root.prev = tail;
    root.next.prev = root;

    // Emit evicted items
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }

    return this._size;
  }

  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift(): T | undefined {
    if (this._size < 1) {
      return undefined;
    }
    const head = this.root.next.next;
    const value = head.prev.value;
    this.root.next = head;
    head.prev = this.root;
    --this._size;
    return value;
  }

  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  /**
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top(): T | undefined {
    return this.root.prev.value;
  }

  /**
   * Inserts new elements at the front of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  unshift(...elems: T[]): number {
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emitter.emit(BoundedEvent.Overflow, elems);
      return this._size;
    }

    const root = this.root;
    const evicted: T[] = [];

    let head = root.next;
    for (let i = elems.length - 1; i >= 0; --i) {
      head = { next: head, prev: root, value: elems[i] };
      head.next.prev = head;
      if (this._size < capacity) {
        ++this._size;
      } else {
        evicted.push(root.prev.value);
        root.prev = root.prev.prev;
      }
    }
    root.next = head;
    root.prev.next = root;

    // Emit evicted items
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted.reverse());
    }

    return this._size;
  }

  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values(): IterableIterator<T> {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield node.value;
    }
  }
}
