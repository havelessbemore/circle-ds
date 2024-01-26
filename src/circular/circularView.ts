import { isIterable } from "../utils/is";
import { Collection } from "../types/collection";

/**
 * A circular view is a fixed-size, read-only, circular array used to
 * store elements.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class CircularView<T> implements Collection<T, number> {
  /**
   * The index representing the first element in the collection.
   * @internal
   */
  protected head: number;

  /**
   * The number of elements in the collection.
   * @internal
   */
  protected _size: number;

  /**
   * The index one more than the last element in the collection.
   * @internal
   */
  protected tail: number;

  /**
   * The values in the collection.
   *
   * @internal
   */
  protected vals: (T | undefined)[];

  /**
   * Capacity defaults to zero and should be updated via {@link CircularView.capacity}.
   */
  constructor();
  /**
   * @param capacity - the maximum capacity.
   */
  constructor(capacity: number);
  /**
   * @param items - the items to store in the collection.
   */
  constructor(items: Iterable<T>);
  /**
   * @param items - the items to store in the collection.
   */
  constructor(...items: T[]);
  constructor(capacity?: number | T | Iterable<T>, ...items: T[]) {
    this.head = 0;
    this._size = 0;
    this.tail = 0;
    this.vals = [];

    const numArgs = arguments.length;
    if (numArgs < 1) {
      return;
    }

    if (numArgs === 1 && typeof capacity === "number") {
      this.vals.length = capacity;
    } else if (numArgs === 1 && isIterable(capacity)) {
      this.vals = Array.from(capacity);
      this._size = this.vals.length;
    } else {
      this.vals = items;
      this.vals.push(capacity as T);
      this._size = this.vals.length;
      this.tail = this._size - 1;
      this.head = this.tail;
    }
  }

  /**
   * Creates a collection from an iterable object.
   *
   * @param iterable - an iterable object to convert to a collection.
   */
  static from<T, I extends typeof CircularView>(
    this: I,
    iterable: Iterable<T> | ArrayLike<T>
  ): InstanceType<I> {
    const obj = new this(0) as InstanceType<I>;
    obj.vals = Array.from(iterable);
    obj._size = obj.vals.length;
    return obj;
  }

  /**
   * Creates a collection from a variable number of arguments.
   *
   * @param elements - the elements to be inserted into the collection.
   */
  static of<I extends typeof CircularView<T>, T = unknown>(
    this: I,
    ...elements: T[]
  ): InstanceType<I> {
    const obj = new this(0) as InstanceType<I>;
    obj.vals = elements;
    obj._size = elements.length;
    return obj;
  }

  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity(): number {
    return this.vals.length;
  }

  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(newCapacity: number) {
    // Sanitize input

    newCapacity = +newCapacity;
    if (!Number.isSafeInteger(newCapacity) || newCapacity < 0) {
      throw new RangeError("Invalid capacity");
    }

    // Update capacity
    const curCapacity = this.capacity;
    if (this._size <= 0 || newCapacity == 0) {
      this.head = 0;
      this.tail = 0;
      this._size = 0;
      this.vals.length = newCapacity;
    } else if (newCapacity > curCapacity) {
      this.grow(newCapacity);
    } else if (newCapacity < curCapacity) {
      this.shrink(newCapacity);
    }
  }

  /**
   *  @returns the number of elements in the collection.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Remove all elements and resets the collection.
   */
  clear(): void {
    this.head = 0;
    this._size = 0;
    this.tail = 0;
    this.vals = new Array(this.capacity);
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
      yield [ext, this.vals[this.toInt(ext)]!];
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
      const value = this.vals[this.toInt(ext)]!;
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
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      if (this.vals[this.toInt(ext)] === value) {
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
      yield this.vals[this.toInt(ext)]!;
    }
  }

  /**
   * Converts an external index to an internal index
   * @internal
   *
   * @param ext - The external index
   *
   * @returns The internal index
   */
  protected toInt(ext: number): number {
    return (this.head + ext) % this.capacity;
  }

  /**
   * Grow capacity.
   * @internal
   *
   * @param newCapacity - the new capacity
   */
  protected grow(newCapacity: number): void {
    const curCapacity = this.capacity;
    const tail = this.head + this._size;

    this.vals.length = newCapacity;
    if (tail <= curCapacity) {
      this.tail = tail;
      return;
    }

    const diff = Math.min(this.tail, newCapacity - curCapacity);
    this.vals.copyWithin(curCapacity, 0, diff);
    this.vals.fill(undefined, this.tail - diff, diff);
    this.vals.copyWithin(0, diff, this.tail);
    this.vals.fill(undefined, Math.max(diff, this.tail - diff), this.tail);
    this.tail = tail % newCapacity;
  }

  /**
   * Shrink capacity.
   * @internal
   *
   * @param newCapacity - the new capacity
   */
  protected shrink(newCapacity: number): void {
    this._size = Math.min(this._size, newCapacity);
    this.tail = this.head + this._size;

    if (this.tail <= newCapacity) {
      this.tail %= newCapacity;
      this.vals.length = newCapacity;
    } else {
      this.tail %= this.capacity;
      this.vals = Array.from(this);
      this.tail = this._size % newCapacity;
      this.head = 0;
    }
  }
}
