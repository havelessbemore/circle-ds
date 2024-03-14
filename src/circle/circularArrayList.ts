import { CircularBase } from "./circularBase";
import { BoundedEvent } from "../types/boundedEvent";
import { isArrayLength, isInfinity, isNumber } from "../utils/is";
import { Bounded } from "../types/bounded";
import { ARRAY_MAX_LENGTH } from "../utils/constants";
import { List } from "../types/list";
import { addIfBelow, clamp, isInRange, toInteger } from "../utils/math";

export class CircularArrayList<T>
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
   * The index representing the first element.
   */
  protected _head: number;

  /**
   * @internal
   * Whether capacity is finite (true) or infinite (false).
   */
  protected _isFinite: boolean;

  /**
   * @internal
   * The index one more than the last element.
   */
  protected _next: number;

  /**
   * @internal
   * The number of elements.
   */
  protected _size: number;

  /**
   * @internal
   * The stored values.
   */
  protected _vals: T[];

  /**
   * Creates a new list. Default `capacity` is `Infinity`.
   */
  constructor();
  /**
   * Creates a new list with the given capacity.
   *
   * @param capacity - the list's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a new list from the given items. `capacity` will equal the number of items.
   *
   * @param items - the initial values in the list.
   */
  constructor(items: Iterable<T>);
  constructor(capacity?: number | null | Iterable<T>) {
    super();

    // Initialize class variables
    this._capacity = ARRAY_MAX_LENGTH;
    this._head = 0;
    this._isFinite = false;
    this._size = 0;
    this._next = 0;
    this._vals = [];

    // If capacity is null, undefined, or Infinity
    if (capacity == null || isInfinity(capacity)) {
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
      this._isFinite = true;
      return;
    }

    // If capacity is an iterable
    this._vals = Array.from(capacity as Iterable<T>);
    this._capacity = this._vals.length;
    this._isFinite = true;
    this._size = this._capacity;
  }

  get capacity(): number {
    return this._isFinite ? this._capacity : Infinity;
  }

  get size(): number {
    return this._size;
  }

  get [Symbol.toStringTag](): string {
    return CircularArrayList.name;
  }

  set capacity(capacity: number) {
    // Convert capacity to a number
    capacity = +capacity;

    // Check capacity
    if (isInfinity(capacity)) {
      // If capacity is Infinity
      capacity = ARRAY_MAX_LENGTH;
      this._isFinite = false;
    } else if (isArrayLength(capacity)) {
      // If capacity is valid
      this._isFinite = true;
    } else {
      // If capacity is invalid
      throw new RangeError("Invalid capacity");
    }

    // Update collection
    if (this._size <= 0) {
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

  at(index?: number): T | undefined {
    // Sanitize input
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Return value
    return this._vals[this.toIndex(index)];
  }

  clear(): void {
    this._size = 0;
    this._head = 0;
    this._next = 0;
    this._vals.length = 0;
  }

  /*
  copyWithin(target: number, start: number, end?: number): this {
    const size = this._size;

    // Sanitize inputs
    target = clamp(addIfBelow(toInteger(target, 0), size), 0, size);
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    const temp = target > start ? target - start : 0;
    end = clamp(addIfBelow(toInteger(end, size), size), start, size - temp);

    // Copy within
    this._copyWithin(target, start, end);

    // Return list
    return this;
  }
  */

  /**
   * @internal
   */
  protected _copyWithin(target: number, start: number, end: number): void {
    // If copying in-place or nothing to copy
    if (target == start || start >= end) {
      return;
    }

    // Get source data segments
    const capacity = this._capacity - 1;
    const vals = this._vals;
    const ranges = this.toRanges(start, end);

    if (target <= start || end <= target) {
      // Copy from left to right
      target = this.toIndex(target);
      for (const [min, max] of ranges) {
        for (let i = min; i < max; ++i) {
          vals[target] = vals[i];
          target = target < capacity ? target + 1 : 0;
        }
      }
    } else {
      // Copy from right to left
      target = this.toIndex(target + (end - start));
      for (const [min, max] of ranges.reverse()) {
        for (let i = max - 1; i >= min; --i) {
          target = target > 0 ? target - 1 : capacity;
          vals[target] = vals[i];
        }
      }
    }
  }

  delete(index: number): boolean {
    // Sanitize input
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }

    // Delete value
    this._delete(index, 1);

    // Return success
    return true;
  }

  /**
   * @internal
   */
  protected _delete(index: number, deleteCount: number): void {
    this._copyWithin(index, index + deleteCount, this._size);
    this._pop(deleteCount);
  }

  *entries(): IterableIterator<[number, T]> {
    for (let ext = 0; ext < this._size; ++ext) {
      yield [ext, this._vals[this.toIndex(ext)]];
    }
  }

  fill(value: T, start?: number, end?: number): this {
    const size = this._size;

    // Sanitize inputs
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);

    // Fill values
    this._fill(value, start, end);

    // Return list
    return this;
  }

  /**
   * @internal
   */
  protected _fill(value: T, start: number, end: number): void {
    for (const [min, max] of this.toRanges(start, end)) {
      this._vals.fill(value, min, max);
    }
  }

  first(): T | undefined {
    return this._size > 0 ? this._vals[this._head] : undefined;
  }

  forEach(
    callbackfn: (value: T, index: number, collection: this) => void,
    thisArg?: unknown
  ): void {
    const N = this._size;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      const value = this._vals[this.toIndex(ext)];
      callbackfn.call(thisArg, value, ext, this);
    }
  }

  has(value: T): boolean {
    const vals = this._vals;
    for (const [min, max] of this.toRanges(0, this._size)) {
      for (let i = min; i < max; ++i) {
        if (value === vals[i]) {
          return true;
        }
      }
    }
    return false;
  }

  *keys(): IterableIterator<number> {
    for (let ext = 0; ext < this._size; ++ext) {
      yield ext;
    }
  }

  last(): T | undefined {
    return this._size > 0
      ? this._vals[this.toIndex(this._size - 1)]
      : undefined;
  }

  pop(): T | undefined {
    // If list is empty
    if (this._size <= 0) {
      return undefined;
    }

    // Get and remove first value
    const value = this._vals[this.toIndex(this._size - 1)];
    this._pop(1);

    // Return value
    return value;
  }

  /**
   * @internal
   */
  protected _pop(N: number): void {
    // Remove values
    const newSize = this._size - N;
    this._fill(undefined as T, newSize, this._size);

    // Update state
    this._next = this.toIndex(newSize);
    this._size = newSize;
  }

  push(...items: T[]): number {
    // If no items
    if (items.length <= 0) {
      return this._size;
    }

    // If no capacity
    if (this._capacity <= 0) {
      this._overflow(items);
      return this._size;
    }

    // Push items
    this._insert(this._size, items);

    // Return new size
    return this._size;
  }

  set(index: number, value: T): T | undefined {
    // Sanitize input
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Update value
    index = this.toIndex(index);
    const prevValue = this._vals[index];
    this._vals[index] = value;

    // Return previous value
    return prevValue;
  }

  shift(): T | undefined {
    // If list is empty
    if (this._size <= 0) {
      return undefined;
    }

    // Get and remove first value
    const value = this._vals[this._head];
    this._shift(1);

    // Return value
    return value;
  }

  /**
   * @internal
   */
  protected _shift(N: number): void {
    // Remove items
    this._fill(undefined as T, 0, N);

    // Update state
    this._head = this.toIndex(N);
    this._size -= N;
  }

  slice(start?: number, end?: number): CircularArrayList<T> {
    const size = this._size;

    // Sanitize inputs
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);

    // Return slice
    return this.toList(this._slice(start, end));
  }

  /**
   * @internal
   */
  protected _slice(start: number, end: number): T[] {
    const from = this._vals;
    const to = new Array<T>(end - start);

    let j = 0;
    for ([start, end] of this.toRanges(start, end)) {
      for (let i = start; i < end; ++i) {
        to[j++] = from[i];
      }
    }

    return to;
  }

  splice(
    start: number,
    deleteCount?: number,
    ...items: T[]
  ): CircularArrayList<T> {
    const size = this._size;

    // Sanitize inputs
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    deleteCount = clamp(toInteger(deleteCount, 0), 0, size - start);

    // Create output
    const out = this.toList(this._slice(start, start + deleteCount));

    // Update list
    this._splice(start, deleteCount, items);

    // Return output
    return out;
  }

  /**
   * @internal
   */
  protected _splice(start: number, deleteCount: number, items: T[] = []): void {
    const addCount = items.length;
    const replaceCount = Math.min(deleteCount, addCount);
    const vals = this._vals;

    // Replace values
    let j = 0;
    for (const [a, b] of this.toRanges(start, start + replaceCount)) {
      for (let i = a; i < b; ++i) {
        vals[i] = items[j++];
      }
    }

    // If done
    if (deleteCount == addCount) {
      return;
    }

    // Insert remaining values or finish deletions
    start += replaceCount;
    deleteCount < addCount
      ? this._insert(start, items, replaceCount)
      : this._delete(start, deleteCount - addCount);
  }

  /**
   * @internal
   */
  protected _insert(
    start: number,
    items: T[],
    min = 0,
    max = items.length
  ): void {
    const N = max - min;

    // Check free space
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(start, items, min, max);
      return;
    }

    // Check if "infinite" capacity yet not enough space
    if (!this._isFinite) {
      this._safeInsert(start, items, min, min + free);
      throw new Error("Out of memory");
    }

    // Remove from head
    if (start > 0) {
      const shifted = Math.min(start, N - free);
      this._overflow(this._slice(0, shifted));
      this._shift(shifted);
      start -= shifted;
      free += shifted;
    }

    // Check free space
    if (free >= N) {
      this._safeInsert(start, items, min, max);
      return;
    }

    // Remove from items and insert remaining
    const mid = max - free;
    this._overflow(items.slice(min, mid));
    this._safePresert(0, items, mid, max);
  }

  /**
   * @internal
   */
  protected _safeInsert(
    vIndex: number,
    items: T[],
    min = 0,
    max = items.length
  ): void {
    const N = max - min;
    const vals = this._vals;

    // Make space
    this._copyWithin(vIndex + N, vIndex, this._size);

    // Insert into space
    for (const [start, end] of this.toRanges(vIndex, vIndex + N)) {
      for (let i = start; i < end; ++i) {
        vals[i] = items[min++];
      }
    }

    // Update state
    this._size += N;
    this._next = this.toIndex(this._size);
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  unshift(...items: T[]): number {
    // If no items
    if (items.length <= 0) {
      return this._size;
    }

    // If no capacity
    if (this._capacity <= 0) {
      this._overflow(items);
      return this._size;
    }

    // Presert items
    this._presert(0, items);

    // Return new size
    return this._size;
  }

  /**
   * @internal
   */
  protected _presert(
    end: number,
    items: T[],
    min = 0,
    max = items.length
  ): void {
    const N = max - min;

    // Check free space
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safePresert(end, items, min, max);
      return;
    }

    // Check if "infinite" capacity yet not enough space
    if (!this._isFinite) {
      this._safePresert(end, items, max - free, max);
      throw new Error("Out of memory");
    }

    // Remove from tail
    if (end < this._size) {
      const popped = Math.min(this._size - end, N - free);
      this._overflow(this._slice(this._size - popped, this._size));
      this._pop(popped);
      free += popped;
    }

    // Check free space
    if (free >= N) {
      this._safePresert(end, items, min, max);
      return;
    }

    // Remove from items and insert remaining
    const mid = min + free;
    this._overflow(items.slice(mid, max));
    this._safeInsert(this._size, items, min, mid);
  }

  /**
   * @internal
   */
  protected _safePresert(
    vIndex: number,
    items: T[],
    min = 0,
    max = items.length
  ): void {
    const capacity = this._capacity;
    const N = max - min;
    const vals = this._vals;

    // Make space
    const newHead = capacity - N;
    this._copyWithin(newHead, 0, vIndex);

    // Insert into space
    vIndex += newHead;
    for (const [start, end] of this.toRanges(vIndex, vIndex + N)) {
      for (let i = start; i < end; ++i) {
        vals[i] = items[min++];
      }
    }

    // Update state
    this._size += N;
    this._head = this.toIndex(newHead);
  }

  *values(): IterableIterator<T> {
    for (let ext = 0; ext < this._size; ++ext) {
      yield this._vals[this.toIndex(ext)];
    }
  }

  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  protected _overflow(evicted: T[]): void {
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }

  /**
   * @internal
   *
   * Grow capacity.
   *
   * @param capacity - the new capacity
   */
  protected grow(capacity: number): void {
    // Check if list is sequential: [    H123456T    ]
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }

    // Queue is not sequential: [456T    H123]
    if (this._size <= this._head) {
      // [H123456T] = A + B = N
      const temp = this._size - this._next;
      this._vals.copyWithin(temp, 0, this._next);
      this._vals.copyWithin(0, this._head, this._head + temp);
      this._vals.length = this._size;
      this._head = 0;
      this._next = this._size;
    } else if (this._head + this._size <= capacity) {
      // [        H123456T] = 2B < 2N
      this._vals.length = this._head + this._size;
      this._vals.copyWithin(this._capacity, 0, this._next);
      this._vals.fill(undefined as T, 0, this._next);
      this._next = (this._head + this._size) % capacity;
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
      this._vals.length = capacity;
      this._vals.copyWithin(this._capacity, 0, diff);
      this._vals.copyWithin(0, diff, this._next);
      const temp = Math.max(diff, this._next - diff);
      this._vals.fill(undefined as T, temp, this._next);
      this._next -= diff;
    }

    // Update capacity
    this._capacity = capacity;
  }

  /**
   * @internal
   *
   * Returns whether the list is stored sequentially in memory.
   *
   * @returns `true` if the list is sequential in memory, `false` otherwise.
   */
  protected isSequential(): boolean {
    return this._head < this._next || this._next <= 0;
  }

  /**
   * @internal
   *
   * Adjusts the list to fit within the given capacity.
   *
   * Assumes the list:
   * - is sequential in memory.
   * - fits in the given capacity (size \<= capacity).
   *
   * @param capacity - The new capacity.
   *
   * @returns `true` if the list was reset, `false` otherwise.
   */
  protected sequentialReset(capacity: number): boolean {
    const tail = this._head + this._size;

    // If list fits in current location: [    H------T    ]
    if (tail <= capacity) {
      this._vals.length = tail;
      this._next = this._vals.length % capacity;

      // If list must be fully moved: [H------T    ]
    } else if (this._head >= capacity) {
      this._vals.copyWithin(0, this._head, tail);
      this._vals.length = this._size;
      this._head = 0;
      this._next = this._size % capacity;

      // If list must be partially moved: [--T  H----]
    } else {
      this._vals.copyWithin(0, capacity, tail);
      this._vals.length = capacity;
      this._next = tail - capacity;
    }

    this._capacity = capacity;
    return true;
  }

  /**
   * @internal
   *
   * Shrink capacity.
   *
   * @param capacity - the new capacity
   */
  protected shrink(capacity: number): void {
    // Handle overflow
    if (this._size > capacity) {
      const shifted = this._size - capacity;
      this._overflow(this._slice(0, shifted));
      this._shift(shifted);
    }

    // Check if list is sequential: [    H123456T    ]
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }

    // Shift 1st half of list: [456T....H123] -> [456T..H123]
    const diff = this._capacity - capacity;
    this._vals.copyWithin(this._head - diff, this._head, this._capacity);
    this._vals.length = capacity;
    this._head -= diff;
    this._capacity = capacity;
  }

  /**
   * @internal
   */
  protected toIndex(externalIndex: number): number {
    return (this._head + externalIndex) % this._capacity;
  }

  /**
   * @internal
   */
  protected toList(items: T[]): CircularArrayList<T> {
    const out = new CircularArrayList<T>(0);
    out._vals = items;
    out._size = items.length;
    out._capacity = items.length;
    return out;
  }

  /**
   * @internal
   */
  protected toRanges(min: number, max: number): [number, number][] {
    const head = this._head;
    const mid = this._capacity - head;
    if (max <= mid) {
      return [[head + min, head + max]];
    }
    if (min >= mid) {
      return [[min - mid, max - mid]];
    }
    return [
      [head + min, this._capacity],
      [0, max - mid],
    ];
  }
}
