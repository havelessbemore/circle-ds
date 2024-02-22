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
    this.head = 0;
    this.isFinite = false;
    this._size = 0;
    this.next = 0;
    this.vals = [];

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
      this.isFinite = true;
      return;
    }

    // If capacity is an iterable
    this.vals = Array.from(capacity as Iterable<T>);
    this._capacity = this.vals.length;
    this.isFinite = true;
    this._size = this._capacity;
  }

  get capacity(): number {
    return this.isFinite ? this._capacity : Infinity;
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
      this.isFinite = false;
    } else if (isArrayLength(capacity)) {
      // If capacity is valid
      this.isFinite = true;
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
    // Check input index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Return value
    return this.vals[this.toIndex(index)];
  }

  clear(): void {
    this._size = 0;
    this.head = 0;
    this.next = 0;
    this.vals.length = 0;
  }

  copyWithin(target: number, start?: number, end?: number): this {
    // Sanitize inputs
    const size = this._size;
    target = clamp(addIfBelow(toInteger(target, 0), size), 0, size);
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = addIfBelow(toInteger(end, size), size);
    end = clamp(end, start, size - Math.min(0, target - start));
    if (target >= size || start >= end) {
      return this;
    }

    // Copy within
    this._copyWithin(target, start, end);
    return this;
  }

  /**
   * @internal
   */
  protected _copyWithin(target: number, start: number, end: number): void {
    if (target == start || start >= end) {
      return;
    }

    const isFwd = target <= start || end <= target;
    const max = this._capacity - 1;
    const vals = this.vals;

    let targetEnd = this.toIndex(target + (end - start));
    end = this.toIndex(end);
    start = this.toIndex(start);
    target = this.toIndex(target);

    if (isFwd) {
      while (start != end) {
        vals[target] = vals[start];
        start = start < max ? start + 1 : 0;
        target = target < max ? target + 1 : 0;
      }
    } else {
      while (start != end) {
        end = end > 0 ? end - 1 : max;
        targetEnd = targetEnd > 0 ? targetEnd - 1 : max;
        vals[targetEnd] = vals[end];
      }
    }
  }

  delete(index: number): boolean {
    // Check input index
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
    const vals = this.vals;
    for (let ext = 0; ext < this._size; ++ext) {
      yield [ext, vals[this.toIndex(ext)]];
    }
  }

  fill(value: T, start?: number, end?: number): this {
    const size = this._size;

    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, size), 0, size);

    // Sanitize end
    end = toInteger(end, size);
    end = clamp(addIfBelow(end, size), start, size);

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
      this.vals.fill(value, min, max);
    }
  }

  first(): T | undefined {
    return this._size <= 0 ? undefined : this.vals[this.head];
  }

  forEach(
    callbackfn: (value: T, index: number, collection: this) => void,
    thisArg?: unknown
  ): void {
    const N = this._size;
    const vals = this.vals;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      const value = vals[this.toIndex(ext)];
      callbackfn.call(thisArg, value, ext, this);
    }
  }

  has(value: T): boolean {
    const N = this._size;
    const vals = this.vals;
    for (let ext = 0; ext < N; ++ext) {
      if (value === vals[this.toIndex(ext)]) {
        return true;
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
    // Check if empty
    if (this._size <= 0) {
      return undefined;
    }

    // Return value
    const tail = this.next > 0 ? this.next - 1 : this._capacity - 1;
    return this.vals[tail];
  }

  pop(): T | undefined {
    return this._size > 0 ? this._pop(1)[0] : undefined;
  }

  /**
   * @internal
   */
  protected _pop(N: number): T[] {
    const capacity = this._capacity;
    const evicted: T[] = [];
    const vals = this.vals;

    // Remove values
    let tail = this.next;
    for (let i = 0; i < N; ++i) {
      tail = tail > 0 ? tail - 1 : capacity - 1;
      evicted.push(vals[tail]);
      vals[tail] = undefined as T;
    }

    // Update state
    this.next = tail;
    this._size -= N;
    if (this._size <= 0) {
      this.clear();
    }

    return evicted;
  }

  push(...values: T[]): number {
    // If no values
    if (values.length <= 0) {
      return this._size;
    }

    // If no capacity
    if (this._capacity <= 0) {
      this._overflow(values);
      return this._size;
    }

    // Push values
    this._insert(this._size, values);
    return this._size;
  }

  set(index: number, value: T): T | undefined {
    // Check input index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Update value
    index = this.toIndex(index);
    const prevValue = this.vals[index];
    this.vals[index] = value;

    // Return previous value
    return prevValue;
  }

  shift(): T | undefined {
    return this._size > 0 ? this._shift(1)[0] : undefined;
  }

  /**
   * @internal
   */
  protected _shift(N: number): T[] {
    const capacity = this._capacity;
    const evicted: T[] = [];
    const vals = this.vals;

    let head = this.head;
    for (let i = 0; i < N; ++i) {
      evicted.push(vals[head]);
      vals[head] = undefined as T;
      --this._size;
      if (++head >= capacity) {
        head = 0;
        vals.length = this.next;
      }
    }

    this.head = head;
    return evicted;
  }

  slice(start?: number, end?: number): CircularArrayList<T> {
    const out = new CircularArrayList<T>(0);

    // Check if empty
    const size = this._size;
    if (size <= 0) {
      return out;
    }

    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, size), 0, size);

    // Sanitize end
    end = toInteger(end, size);
    end = clamp(addIfBelow(end, size), start, size);

    // Return slice
    return this.toList(this._slice(start, end));
  }

  /**
   * @internal
   */
  protected _slice(start: number, end: number): T[] {
    const from = this.vals;
    const to = new Array<T>(end - start);

    let target = 0;
    for ([start, end] of this.toRanges(start, end)) {
      for (let i = start; i < end; ++i) {
        to[target++] = from[i];
      }
    }
    return to;
  }

  splice(
    start: number,
    deleteCount?: number,
    ...items: T[]
  ): CircularArrayList<T> {
    // Sanitize start
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, size), 0, size);

    // Sanitize deleteCount
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, size - start);

    // Create output
    const out = this.toList(this._slice(start, start + deleteCount));

    // Update list
    this._splice(start, deleteCount, items);

    // Add values
    return out;
  }

  /**
   * @internal
   */
  protected _splice(start: number, deleteCount: number, items: T[] = []): void {
    const addCount = items.length;
    const capacity = this._capacity;
    const replaceCount = Math.min(deleteCount, addCount);
    const vals = this.vals;

    // Replace values
    let index = this.toIndex(start);
    for (let i = 0; i < replaceCount; ++i) {
      vals[index++] = items[i];
      index = index < capacity ? index : 0;
    }

    // If done
    if (deleteCount == addCount) {
      return;
    }

    // Insert or delete values
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
    if (!this.isFinite) {
      this._safeInsert(start, items, min, min + free);
      throw new Error("Out of memory");
    }

    // Remove from head
    const shifted = Math.min(start, N);
    this._overflow(this._shift(shifted));
    start -= shifted;
    free += shifted;

    // Check free space
    if (free >= N) {
      this._safeInsert(start, items, min, max);
      return;
    }

    // Remove items and insert remaining
    const mid = max - free;
    this._overflow(items.slice(min, mid));
    this._safeUnshift(items, mid, max);
  }

  /**
   * @internal
   */
  protected _safeInsert(
    start: number,
    items: T[],
    min = 0,
    max = items.length
  ): void {
    const capacity = this._capacity;
    const N = max - min;
    const vals = this.vals;

    // Make space
    this._copyWithin(start + N, start, this._size);

    // Insert into space
    let index = this.toIndex(start);
    for (let i = min; i < max; ++i) {
      vals[index++] = items[i];
      index = index < capacity ? index : 0;
    }

    // Update state
    this._size += N;
    this.next = this.toIndex(this._size);
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  unshift(...values: T[]): number {
    // If no values
    if (values.length <= 0) {
      return this._size;
    }

    // If no capacity
    if (this._capacity <= 0) {
      this._overflow(values);
      return this._size;
    }

    this._unshift(values);
    return this._size;
  }

  /**
   * @internal
   */
  protected _unshift(elems: T[]): void {
    const capacity = this._capacity;
    const vals = this.vals;
    const evicted: T[] = [];

    let head = this.head;
    for (let i = elems.length - 1; i >= 0; --i) {
      head = head > 0 ? head - 1 : capacity - 1;
      if (this._size < capacity) {
        ++this._size;
      } else if (!this.isFinite) {
        throw new Error("Out of memory");
      } else {
        evicted.push(vals[head]);
        this.next = head;
      }
      vals[head] = elems[i];
      this.head = head;
    }

    if (evicted.length > 0) {
      this._overflow(evicted.reverse());
    }
  }

  /**
   * @internal
   */
  protected _safeUnshift(elems: T[], min = 0, max = elems.length): void {
    const capacity = this._capacity;
    const vals = this.vals;

    let head = this.head;
    for (let i = max - 1; i >= min; --i) {
      head = head > 0 ? head - 1 : capacity - 1;
      vals[head] = elems[i];
    }

    this.head = head;
    this._size += max - min;
  }

  *values(): IterableIterator<T> {
    const vals = this.vals;
    for (let ext = 0; ext < this._size; ++ext) {
      yield vals[this.toIndex(ext)];
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
   * @internal
   *
   * Returns whether the list is stored sequentially in memory.
   *
   * @returns `true` if the list is sequential in memory, `false` otherwise.
   */
  protected isSequential(): boolean {
    return this.head < this.next || this.next <= 0;
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
    const tail = this.head + this._size;

    // If list fits in current location: [    H------T    ]
    if (tail <= capacity) {
      this.vals.length = tail;
      this.next = this.vals.length % capacity;

      // If list must be fully moved: [H------T    ]
    } else if (this.head >= capacity) {
      this.vals.copyWithin(0, this.head, tail);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size % capacity;

      // If list must be partially moved: [--T  H----]
    } else {
      this.vals.copyWithin(0, capacity, tail);
      this.vals.length = capacity;
      this.next = tail - capacity;
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
    this._overflow(this._shift(this._size - capacity));

    // Check if list is sequential: [    H123456T    ]
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }

    // Shift 1st half of list: [456T....H123] -> [456T..H123]
    const diff = this._capacity - capacity;
    this.vals.copyWithin(this.head - diff, this.head, this._capacity);
    this.vals.length = capacity;
    this.head -= diff;
    this._capacity = capacity;
  }

  /**
   * @internal
   */
  protected toIndex(externalIndex: number): number {
    return (this.head + externalIndex) % this._capacity;
  }

  /**
   * @internal
   */
  protected toList(values: T[]): CircularArrayList<T> {
    const out = new CircularArrayList<T>(0);
    out.vals = values;
    out._size = values.length;
    out._capacity = values.length;
    return out;
  }

  /**
   * @internal
   */
  protected toRanges(min: number, max: number): [number, number][] {
    const head = this.head;
    const mid = this._capacity - this.head;
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
