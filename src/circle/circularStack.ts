import { CircularBase } from "./circularBase";
import { BoundedEvent } from "../types/boundedEvent";
import { Stack } from "../types/stack";
import {
  isArrayLength,
  isInfinity,
  isNull,
  isNumber,
  isUndefined,
} from "../utils/is";
import { Bounded } from "../types/bounded";

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
export class CircularStack<T>
  extends CircularBase<T>
  implements Bounded<T>, Stack<T>
{
  /**
   * The maximum number of elements that can be stored in the collection.
   */
  protected _capacity: number;

  /**
   * The index representing the first element.
   * @internal
   */
  protected head: number;

  /**
   * The index one more than the last element.
   * @internal
   */
  protected next: number;

  /**
   * The number of elements.
   * @internal
   */
  protected _size: number;

  /**
   * The stored values.
   * @internal
   */
  protected vals: T[];

  /**
   * Creates a new stack. Default `capacity` is `Infinity`.
   */
  constructor();
  /**
   * Creates a new stack with the given capacity.
   *
   * @param capacity - the stack's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a new stack from the given items. `capacity` will equal the number of items.
   *
   * @param items - the initial values in the stack.
   */
  constructor(items: Iterable<T>);
  constructor(capacity?: number | null | Iterable<T>) {
    super();

    // Initialize class variables
    this._capacity = Infinity;
    this.head = 0;
    this._size = 0;
    this.next = 0;
    this.vals = [];

    // Case 1: capacity is null, undefined or Infinity
    if (isUndefined(capacity) || isNull(capacity) || isInfinity(capacity)) {
      return;
    }

    // Case 2: capacity is zero or a safe positive integer
    if (isNumber(capacity)) {
      if (!isArrayLength(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      return;
    }

    // Case 3: capacity is iterable
    for (const value of capacity as Iterable<T>) {
      this.vals.push(value);
    }
    this._capacity = this.vals.length;
    this._size = this._capacity;
  }

  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(capacity: number) {
    // Convert input to a number
    capacity = +capacity;

    // Check if input is valid
    if (!isInfinity(capacity) && !isArrayLength(capacity)) {
      throw new RangeError("Invalid capacity");
    }

    // Check if capacity is changing
    if (capacity === this._capacity) {
      return;
    }

    // Check if stack is empty
    if (this._size < 1) {
      this._capacity = capacity;
      this.clear();
      return;
    }

    // Check if stack is shrinking or growing
    capacity < this._capacity
      ? this.emit(this.shrink(capacity)) // shrinking
      : this.grow(capacity); // growing
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
  get [Symbol.toStringTag]() {
    return CircularStack.name;
  }

  /**
   * Remove all elements and resets the collection.
   */
  clear(): void {
    this.head = 0;
    this._size = 0;
    this.next = 0;
    this.vals.length = 0;
  }

  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries(): IterableIterator<[number, T]> {
    for (let ext = 0; ext < this._size; ++ext) {
      yield [ext, this.vals[(this.head + ext) % this._capacity]];
    }
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
    const N = this._size;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      const value = this.vals[(this.head + ext) % this._capacity];
      callbackfn.call(thisArg, value, ext, this);
    }
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
    const N = this._size;
    for (let ext = 0; ext < N; ++ext) {
      if (value === this.vals[(this.head + ext) % this._capacity]) {
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
    for (let ext = 0; ext < this._size; ++ext) {
      yield ext;
    }
  }

  /**
   * Get the last element in the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last(): T | undefined {
    if (this._size < 1) {
      return undefined;
    }
    return this.vals[(this.head + this._size - 1) % this._capacity];
  }

  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  pop(): T | undefined {
    if (this._size <= 0) {
      return undefined;
    }

    let tail = this.next - 1;
    if (tail < 0) {
      tail += this.head + this._size;
    }

    --this._size;
    this.next = tail;
    const value = this.vals[tail];
    this.vals[tail] = undefined as T;
    return value;
  }

  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...elems: T[]): number {
    // Base 1: No input
    const N = elems.length;
    if (N < 1) {
      return this._size;
    }

    // Base 2: No capacity
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emit([elems]);
      return this._size;
    }

    // Get evicted items
    const diff = N - capacity;
    const evicted = this.evict(this.size + diff);
    if (diff > 0) {
      evicted.push(elems.splice(0, diff));
    }

    // Base 3: Too many inputs
    if (diff >= 0) {
      this.vals = elems;
      this._size = capacity;
      this.emit(evicted);
      return this._size;
    }

    // Add each element to the stack
    let tail = this.next;
    const vals = this.vals;
    for (let i = 0; i < N; ++i) {
      vals[tail] = elems[i];
      if (++tail >= capacity) {
        tail = 0;
      }
    }

    // Update meta and emit evicted items
    this._size += N;
    this.next = tail;
    this.emit(evicted);
    return this._size;
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
   * Get the last element in the stack.
   *
   * Alias for {@link last | last()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top(): T | undefined {
    if (this._size < 1) {
      return undefined;
    }
    return this.vals[(this.head + this._size - 1) % this._capacity];
  }

  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values(): IterableIterator<T> {
    for (let ext = 0; ext < this._size; ++ext) {
      yield this.vals[(this.head + ext) % this._capacity];
    }
  }

  /**
   * Grow capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  protected grow(capacity: number): void {
    // Check if stack is sequential: [    H123456T    ]
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }

    // stack is not sequential: [456T    H123]

    if (this._size <= this.head) {
      // [H123456T] = A + B = N
      const temp = this._size - this.next;
      this.vals.copyWithin(temp, 0, this.next);
      this.vals.copyWithin(0, this.head, this.head + temp);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size;
    } else if (this.head + this._size <= capacity) {
      // [        H123456T] = 2B < 2N
      this.vals.length = this.head + this._size;
      this.vals.copyWithin(this._capacity, 0, this.next);
      this.vals.fill(undefined as T, 0, this.next);
      this.next = (this.head + this._size) % capacity;
    } /* else if (this.next + this._size <= capacity) {
      // [    H123456T] = A + 2B = N + B < 2N
      const temp = this._capacity - this.head;
      this.vals.length = capacity;
      this.vals.copyWithin(this.next, this.head, this._capacity);
      this.vals.copyWithin(this.next + temp, 0, this.next);
      this.vals.fill(undefined as T, 0, this.next);
      this.vals.length = this.next + this._size;
      this.head = this.next;
      this.next = (this.head + this._size) % capacity;
    } */ else {
      // [6T      H12345] = B + D < 2B < 2N
      const diff = capacity - this._capacity;
      this.vals.length = capacity;
      this.vals.copyWithin(this._capacity, 0, diff);
      this.vals.copyWithin(0, diff, this.next);
      const temp = Math.max(diff, this.next - diff);
      this.vals.fill(undefined as T, temp, this.next);
      this.next -= diff;
    }

    // Update capacity
    this._capacity = capacity;
  }

  /**
   * Returns whether the stack is stored sequentially in memory.
   *
   * @returns `true` if the stack is sequential in memory, `false` otherwise.
   */
  protected isSequential(): boolean {
    return this.head < this.next || this.next < 1;
  }

  protected emit(evicted: T[][]): void {
    const N = evicted.length;
    for (let i = 0; i < N; ++i) {
      this.emitter.emit(BoundedEvent.Overflow, evicted[i]);
    }
  }

  /**
   * Removes a given number of elements from the stack.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   *
   * @param count - The number of elements to evict
   */
  protected evict(count: number): T[][] {
    if (count <= 0) {
      return [];
    }

    const evicted: T[][] = [];
    const len = this._capacity - this.head;
    const isNonsequential = !this.isSequential();

    if (isNonsequential && len > count) {
      evicted.push(this.vals.slice(this.head, this.head + count));
      this.vals.fill(undefined as T, this.head, this.head + count);
      this.head += count;
      this._size -= count;
      return evicted;
    }

    if (isNonsequential) {
      evicted.push(this.vals.slice(this.head, this.head + len));
      this.vals.length = this.next;
      this.head = 0;
      this._size -= len;
      if (count <= len) {
        return evicted;
      }
      count -= len;
    }

    if (count >= this._size) {
      evicted.push(this.vals.slice(this.head, this.head + this._size));
      this.clear();
      return evicted;
    }

    evicted.push(this.vals.slice(this.head, this.head + count));
    this.vals.fill(undefined as T, this.head, this.head + count);
    this.head += count;
    this._size -= count;
    return evicted;
  }

  /**
   * Adjusts the stack to fit within the given capacity.
   *
   * Assumes the stack is A) sequential in memory and B) size \<= capacity.
   *
   * @param capacity - the new capacity.
   *
   * @returns `true` if the stack was reset, `false` otherwise.
   */
  protected sequentialReset(capacity: number): boolean {
    const tail = this.head + this._size;

    // If stack fits in current location: [    H------T    ]
    if (tail <= capacity) {
      this.vals.length = tail;
      this.next = this.vals.length % capacity;

      // If stack must be fully moved: [H------T    ]
    } else if (this.head >= capacity) {
      this.vals.copyWithin(0, this.head, tail);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size % capacity;

      // If stack must be partially moved: [--T  H----]
    } else {
      this.vals.copyWithin(0, capacity, tail);
      this.vals.length = capacity;
      this.next = tail - capacity;
    }

    this._capacity = capacity;
    return true;
  }

  /**
   * Shrink capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  protected shrink(capacity: number): T[][] {
    // Handle overflow
    const evicted = this.evict(this._size - capacity);

    // Check if stack is sequential: [    H123456T    ]
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return evicted;
    }

    // Shift 1st half of stack: [456T....H123] -> [456T..H123]
    const diff = this._capacity - capacity;
    this.vals.copyWithin(this.head - diff, this.head, this._capacity);
    this.vals.length = capacity;
    this.head -= diff;
    this._capacity = capacity;
    return evicted;
  }
}
