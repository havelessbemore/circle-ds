import { Bounded } from "../types/bounded";
import { BoundedEvent } from "../types/boundedEvent";
import { Collection } from "../types/collection";
import { isInfinity, isNumber, isSafeCount } from "../utils/is";

import { CircularBase } from "./circularBase";

/**
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class CircularMap<K, V>
  extends CircularBase<[K, V]>
  implements Bounded<[K, V]>, Map<K, V>, Collection<K, V>
{
  /**
   * The maximum number of elements that can be stored in the collection.
   */
  protected _capacity: number;

  /**
   * The internal map.
   * @internal
   */
  protected map: Map<K, V>;

  /**
   * Creates a new map with `capacity` defaulted to `Infinity`.
   */
  constructor();
  /**
   * Creates a new map with the given capacity.
   *
   * @param capacity - the map's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a new map. Initial capacity is the number of unique items given.
   *
   * @param items - the values to store in the map.
   */
  constructor(items: Iterable<[K, V]>);
  constructor(capacity?: number | null | Iterable<[K, V]>) {
    super();

    // Initialize class variables
    this._capacity = Infinity;
    this.map = new Map();

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
    for (const [key, value] of capacity as Iterable<[K, V]>) {
      this.map.set(key, value);
    }
    this._capacity = this.map.size;
  }

  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   *  @returns the number of values in the map.
   */
  get size(): number {
    return this.map.size;
  }

  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return CircularMap.name;
  }

  /**
   * The maximum number of elements that can be stored in the map.
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

    // Check if size is within capacity
    if (this.size <= capacity) {
      return;
    }

    // Check if new capacity is zero
    if (capacity === 0) {
      const evicted = Array.from(this.map);
      this.clear();
      this.emitter.emit(BoundedEvent.Overflow, evicted);
      return;
    }

    // Shrink down map.
    const evicted: [K, V][] = [];
    const iter = this.map.entries();
    for (let n = this.size - capacity; n > 0; --n) {
      const entry = iter.next().value;
      this.map.delete(entry[0]);
      evicted.push(entry);
    }
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }

  /**
   * Removes all elements from the map.
   */
  clear(): void {
    this.map.clear();
  }

  /**
   * Deletes a specified value from the map.
   *
   * @returns `true` if the value existed in the map and has been removed, or `false` otherwise.
   */
  delete(key: K): boolean {
    return this.map.delete(key);
  }

  /**
   * Iterate through the map's entries.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  /**
   * Performs the specified action for each value in the map.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per value.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`.
   */
  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: unknown
  ): void {
    for (const [key, value] of this.map.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  /**
   * Returns the associated value of the given key from the map.
   *
   * If the associated value is an object, then you will get a reference to that object; any change made to the object will effectively modify it inside the map.
   *
   * @returns the value associated with the specified key, or `undefined` if no value is associated.
   */
  get(key: K): V | undefined {
    return this.map.get(key);
  }

  /**
   * Determines whether a given value is in the map.
   *
   * @param key - The key to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(key: K): boolean {
    return this.map.has(key);
  }

  /**
   * Iterate through the map's keys.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the map's keys.
   */
  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  /**
   * Sets the specified key-value pair in the map.
   *
   * @param key - the key to add
   * @param value - the key's value.
   */
  set(key: K, value: V): this {
    // Base case: map has no capacity.
    if (this.capacity < 1) {
      this.emitter.emit(BoundedEvent.Overflow, [[key, value]]);
      return this;
    }

    // Evict excess items
    const evicted: [K, V][] = [];
    if (!this.map.delete(key) && this.size >= this.capacity) {
      const entry = this.map.entries().next().value;
      this.map.delete(entry[0]);
      evicted.push(entry);
    }

    // Add value
    this.map.set(key, value);

    // Emit evicted
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }

    return this;
  }

  /**
   * Iterate through the map's values.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  /**
   * Iterate through the map's values.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the map's values.
   */
  values(): IterableIterator<V> {
    return this.map.values();
  }
}
