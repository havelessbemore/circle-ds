import { CircularBase } from "./circularBase";
import { BoundedEvent } from "../types/boundedEvent";
import { Queue } from "../types/queue";
import { isArrayLength, isInfinity, isNumber } from "../utils/is";
import { Bounded } from "../types/bounded";
import { ARRAY_MAX_LENGTH } from "../utils/constants";

/**
 * A circular queue is similar to a traditional queue, but uses a fixed-size,
 * circular buffer. When the queue reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class CircularQueue<T>
  extends CircularBase<T>
  implements Bounded<T>, Queue<T>
{
  /**
   * The maximum number of elements that can be stored in the collection.
   * @internal
   */
  protected _capacity: number;

  /**
   * The index representing the first element.
   * @internal
   */
  protected head: number;

  /**
   * Whether capacity is finite (true) or infinite (false).
   */
  protected isFinite: boolean;

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
   * Creates a new queue. Default `capacity` is `Infinity`.
   */
  constructor();
  /**
   * Creates a new queue with the given capacity.
   *
   * @param capacity - the queue's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a new queue from the given items. `capacity` will equal the number of items.
   *
   * @param items - the initial values in the queue.
   */
  constructor(items: Iterable<T>);
  constructor(capacity?: number | null | Iterable<T>) {
    super();

    // Initialize class variables
    this._capacity = ARRAY_MAX_LENGTH;
    this.head = 0;
    this.isFinite = false;
    this._size = 0;
    this.next = 0;
    this.vals = [];

    // If capacity is null, undefined, or Infinity
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }

    // If capacity is a number
    if (isNumber(capacity)) {
      // If capacity is invalid
      if (!isArrayLength(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      // If capacity is valid
      this._capacity = capacity;
      this.isFinite = true;
      return;
    }

    // If capacity is an iterable
    for (const value of capacity as Iterable<T>) {
      this.vals.push(value);
    }
    this._capacity = this.vals.length;
    this.isFinite = true;
    this._size = this._capacity;
  }

  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity(): number {
    return this.isFinite ? this._capacity : Infinity;
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
    return CircularQueue.name;
  }

  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(capacity: number) {
    // Convert capacity to a number
    capacity = +capacity;

    // Check capacity
    if (isInfinity(capacity)) {
      // If capacity is Infinity
      capacity = ARRAY_MAX_LENGTH;
      this.isFinite = false;
    } else if (isArrayLength(capacity)) {
      // If capacity is valid
      this.isFinite = true;
    } else {
      // If capacity is invalid
      throw new RangeError("Invalid capacity");
    }

    // Update collection
    if (this._size < 1) {
      // If collection is empty
      this._capacity = capacity;
      this.clear();
    } else if (capacity < this._capacity) {
      // If capacity is decreasing
      this.shrink(capacity);
    } else if (capacity > this._capacity) {
      // If capacity is increasing
      this.grow(capacity);
    }
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
   * Get the first element in the queue.
   *
   * Alias for {@link front | front()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first(): T | undefined {
    return this.vals[this.head];
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
   * Get the element at the front of the queue.
   *
   * Alias for {@link first | first()}.
   *
   * @returns the front element, or `undefined` if empty.
   */
  front(): T | undefined {
    return this.vals[this.head];
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
   * Inserts new elements at the end of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the queue.
   */
  push(...elems: T[]): number {
    // Case 1: Zero inputs
    const N = elems.length;
    if (N < 1) {
      return this._size;
    }

    // Case 2: Zero capacity
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emit(elems);
      return this._size;
    }

    // Case 3: Enough free space
    const free = capacity - this._size;
    if (free >= N) {
      this._push(elems, N);
      return this._size;
    }

    // Case 4: "Infinite" capacity but out of space
    if (!this.isFinite) {
      this._push(elems, free);
      throw new Error("Out of memory");
    }

    // Remove old values
    const diff = N - capacity;
    this.evict(this.size + diff);
    if (diff > 0) {
      this.emit(elems.splice(0, diff));
    }

    // Add new values
    else if (diff < 0) {
      this._push(elems, N);
      return this._size;
    }
    this.vals = elems;
    this._size = capacity;
    return this._size;
  }

  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift(): T | undefined {
    if (this._size <= 0) {
      return undefined;
    }

    --this._size;
    const value = this.vals[this.head];
    this.vals[this.head] = undefined as T;
    if (++this.head >= this._capacity) {
      this.head = 0;
      this.vals.length = this.next;
    }
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
   * Emit an event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  protected emit(evicted: T[]): void {
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }

  /**
   * Removes a given number of elements from the queue.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   *
   * @param count - The number of elements to evict.
   */
  protected evict(count: number): void {
    if (count <= 0) {
      return;
    }

    const len = this._capacity - this.head;
    const isNonsequential = !this.isSequential();

    if (isNonsequential && len > count) {
      this.emit(this.vals.slice(this.head, this.head + count));
      this.vals.fill(undefined as T, this.head, this.head + count);
      this.head += count;
      this._size -= count;
      return;
    }

    if (isNonsequential) {
      this.emit(this.vals.slice(this.head, this.head + len));
      this.vals.length = this.next;
      this.head = 0;
      this._size -= len;
      if (count <= len) {
        return;
      }
      count -= len;
    }

    if (count >= this._size) {
      this.emit(this.vals.slice(this.head, this.head + this._size));
      this.clear();
      return;
    }

    this.emit(this.vals.slice(this.head, this.head + count));
    this.vals.fill(undefined as T, this.head, this.head + count);
    this.head += count;
    this._size -= count;
  }

  /**
   * Grow capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  protected grow(capacity: number): void {
    // Check if queue is sequential: [    H123456T    ]
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }

    // Queue is not sequential: [456T    H123]

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
   * Returns whether the queue is stored sequentially in memory.
   *
   * @returns `true` if the queue is sequential in memory, `false` otherwise.
   */
  protected isSequential(): boolean {
    return this.head < this.next || this.next < 1;
  }

  /**
   * Append new elements to the collection.
   *
   * @param elems - The elements to append.
   * @param max - The number of elements to append.
   */
  protected _push(elems: T[], max: number): void {
    const capacity = this._capacity;
    const vals = this.vals;

    let tail = this.next;
    for (let i = 0; i < max; ++i) {
      vals[tail] = elems[i];
      if (++tail >= capacity) {
        tail = 0;
      }
    }

    this.next = tail;
    this._size += max;
  }

  /**
   * Adjusts the queue to fit within the given capacity.
   *
   * Assumes the queue is A) sequential in memory and B) size \<= capacity.
   *
   * @param capacity - The new capacity.
   *
   * @returns `true` if the queue was reset, `false` otherwise.
   */
  protected sequentialReset(capacity: number): boolean {
    const tail = this.head + this._size;

    // If queue fits in current location: [    H------T    ]
    if (tail <= capacity) {
      this.vals.length = tail;
      this.next = this.vals.length % capacity;

      // If queue must be fully moved: [H------T    ]
    } else if (this.head >= capacity) {
      this.vals.copyWithin(0, this.head, tail);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size % capacity;

      // If queue must be partially moved: [--T  H----]
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
  protected shrink(capacity: number): void {
    // Handle overflow
    this.evict(this._size - capacity);

    // Check if queue is sequential: [    H123456T    ]
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }

    // Shift 1st half of queue: [456T....H123] -> [456T..H123]
    const diff = this._capacity - capacity;
    this.vals.copyWithin(this.head - diff, this.head, this._capacity);
    this.vals.length = capacity;
    this.head -= diff;
    this._capacity = capacity;
  }
}
