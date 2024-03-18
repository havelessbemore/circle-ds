import { Bounded } from "../../types/bounded";
import { BoundedEvent } from "../../types/boundedEvent";
import { Collection } from "../../types/collection";
import { isInfinity, isNumber, isSafeCount } from "../../utils/is";

import { CircularBase } from "../circularBase";

/**
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class CircularSet<T>
  extends CircularBase<T>
  implements Bounded<T>, Set<T>, Collection<T, T>
{
  /**
   * @internal
   * The maximum number of elements that can be stored in the collection.
   */
  protected _capacity: number;

  /**
   * @internal
   * The internal set.
   */
  protected _set: Set<T>;

  /**
   * Creates a new set with `capacity` defaulted to `Infinity`.
   */
  constructor();
  /**
   * Creates a new set with the given capacity.
   *
   * @param capacity - the set's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a new set. Initial capacity is the number of unique items given.
   *
   * @param items - the values to store in the set.
   */
  constructor(items: Iterable<T>);
  constructor(capacity?: number | null | Iterable<T>) {
    super();

    // Initialize class variables
    this._capacity = Infinity;
    this._set = new Set();

    // Case 1: capacity is null, undefined or Infinity
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }

    // Case 2: capacity is zero or a safe positive integer
    if (isNumber(capacity)) {
      if (!isSafeCount(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      return;
    }

    // Case 3: capacity is iterable
    this._set = new Set(capacity as Iterable<T>);
    this._capacity = this._set.size;
  }

  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   * @returns the number of values in the set.
   */
  get size(): number {
    return this._set.size;
  }

  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag](): string {
    return CircularSet.name;
  }

  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(capacity: number) {
    // Convert input to a number
    capacity = +capacity;

    // Check if input is valid
    if (!isInfinity(capacity) && !isSafeCount(capacity)) {
      throw new RangeError("Invalid capacity");
    }

    // Check if capacity is changing
    if (capacity === this._capacity) {
      return;
    }

    // Update capacity
    this._capacity = capacity;

    // Check if set is within capacity
    if (this.size <= capacity) {
      return;
    }

    // Check if new capacity is zero
    if (capacity === 0) {
      const evicted = Array.from(this._set);
      this.clear();
      this._emitter.emit(BoundedEvent.Overflow, evicted);
      return;
    }

    // Shrink down map.
    const evicted: T[] = [];
    const iter = this._set.values();
    for (let n = this.size - capacity; n > 0; --n) {
      const value = iter.next().value;
      this._set.delete(value);
      evicted.push(value);
    }
    this._emitter.emit(BoundedEvent.Overflow, evicted);
  }

  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(value: T): this {
    // Base case: set has no capacity.
    if (this.capacity < 1) {
      this._emitter.emit(BoundedEvent.Overflow, [value]);
      return this;
    }

    // Evict excess items
    const evicted: T[] = [];
    if (!this._set.delete(value) && this.size >= this.capacity) {
      const out = this._set.values().next().value;
      this._set.delete(out);
      evicted.push(out);
    }

    // Add value
    this._set.add(value);

    // Emit evicted
    if (evicted.length > 0) {
      this._emitter.emit(BoundedEvent.Overflow, evicted);
    }

    return this;
  }

  /**
   * Removes all elements from the set.
   */
  clear(): void {
    this._set.clear();
  }

  /**
   * Deletes a specified value from the set.
   *
   * @returns `true` if the value existed in the set and has been removed, or `false` otherwise.
   */
  delete(value: T): boolean {
    return this._set.delete(value);
  }

  /**
   * Iterate through the set's entries.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  entries(): IterableIterator<[T, T]> {
    return this._set.entries();
  }

  /**
   * Performs the specified action for each value in the set.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per value.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`.
   */
  forEach(
    callbackfn: (value: T, key: T, set: this) => void,
    thisArg?: unknown
  ): void {
    for (const key of this._set.keys()) {
      callbackfn.call(thisArg, key, key, this);
    }
  }

  /**
   * Determines whether a given value is in the set.
   *
   * @param value - The value to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(value: T): boolean {
    return this._set.has(value);
  }

  /**
   * Iterate through the set's keys.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the set's keys.
   */
  keys(): IterableIterator<T> {
    return this._set.keys();
  }

  /**
   * Iterate through the set's values.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the set's values.
   */
  values(): IterableIterator<T> {
    return this._set.keys();
  }

  /**
   * Iterate through the set's values.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator](): IterableIterator<T> {
    return this._set.values();
  }
}
