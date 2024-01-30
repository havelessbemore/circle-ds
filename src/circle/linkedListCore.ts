import { IndexedCollection } from "../types/indexedCollection";
import { isIterable } from "../utils/is";

interface Node<T> {
  next: Node<T>;
  prev: Node<T>;
  value: T;
}

/**
 * A fixed-size, iterable-only, circular linked list used to store elements.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class LinkedListCore<T> implements IndexedCollection<T> {
  /**
   * The maximum number of elements that can be stored.
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
   * Capacity defaults to zero and should be updated via {@link CircleCollection.capacity}.
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
    const obj = { value: undefined as T } as Node<T>;
    obj.prev = obj.next = obj;
    this._capacity = 0;
    this.root = obj;
    this._size = 0;

    const numArgs = arguments.length;
    if (numArgs < 1) {
      return;
    }

    if (numArgs === 1 && typeof capacity === "number") {
      if (!Number.isSafeInteger(capacity) || capacity < 0) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
    } else if (numArgs === 1 && isIterable(capacity)) {
      this.concat(capacity);
    } else {
      this.concat([capacity as T]);
      this.concat(items);
    }
  }

  /**
   * Creates a collection from an iterable object.
   *
   * @param iterable - an iterable object to convert to a collection.
   */
  static from<T, I extends typeof LinkedListCore<T>>(
    this: I,
    iterable: Iterable<T> | ArrayLike<T>
  ): InstanceType<I> {
    if (!isIterable(iterable)) {
      iterable = Array.from(iterable) as Iterable<T>;
    }
    const obj = new this(0) as InstanceType<I>;
    obj.concat(iterable);
    return obj;
  }

  /**
   * Creates a collection from a variable number of arguments.
   *
   * @param elements - the elements to be inserted into the collection.
   */
  static of<T, I extends typeof LinkedListCore<T>>(
    this: I,
    ...elements: T[]
  ): InstanceType<I> {
    const obj = new this(0) as InstanceType<I>;
    obj.concat(elements);
    return obj;
  }

  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   * Sets the maximum number of elements that can be stored.
   *
   * @param newCapacity - The new capacity.
   */
  set capacity(newCapacity: number) {
    // Sanitize input
    newCapacity = +newCapacity;
    if (!Number.isSafeInteger(newCapacity) || newCapacity < 0) {
      throw new RangeError("Invalid capacity");
    }

    if (newCapacity === 0) {
      this.root.next = this.root;
      this.root.prev = this.root;
      this._size = 0;
      this._capacity = 0;
      return;
    }

    if (this._size > newCapacity) {
      let head = this.root.next;
      do {
        head = head.next;
      } while (--this._size > newCapacity);
      this.root.next = head;
      head.prev = this.root;
    }

    this._capacity = newCapacity;
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
    this._size = 0;
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
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield node.value;
    }
  }

  /**
   * @internal
   *
   * @param items - The items to concatenate
   */
  private concat(items: Iterable<T>): void {
    const root = this.root;

    let length = 0;
    let tail = root.prev;
    for (const value of items) {
      tail.next = { next: root, prev: tail, value };
      tail = tail.next;
      ++length;
    }

    root.prev = tail;
    this._capacity += length;
    this._size += length;
  }
}
