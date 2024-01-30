import { isIterable } from "../utils/is";

interface Node<T> {
  next: Node<T>;
  prev: Node<T>;
  value: T;
}

/**
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class LRUSet<T> implements Set<T> {
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
   * @internal
   */
  protected map: Map<T, Node<T>>;

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
    this.map = new Map();

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
   *  @returns the number of elements in the collection.
   */
  get size(): number {
    return this.map.size;
  }

  /**
   * Appends a new element with a specified value to the end of the Set.
   *
   * @param value - the value to add.
   */
  add(value: T): this {
    if (this._capacity < 1) {
      return this;
    }

    // Detach if already exists
    const root = this.root;
    let node = this.map.get(value);
    if (node != null) {
      node.next.prev = node.prev;
      node.prev.next = node.next;

      // Remove head if at capacity
    } else if (this.size >= this._capacity) {
      const head = this.root.next;
      this.root.next = head.next;
      head.next.prev = this.root;
      this.map.delete(head.value);
    }

    // Append
    node = { next: root, prev: root.prev, value };
    root.prev.next = node;
    root.prev = node;
    this.map.set(value, node);

    return this;
  }

  /**
   * Remove all elements and resets the collection.
   */
  clear(): void {
    this.root.next = this.root;
    this.root.prev = this.root;
    this.map = new Map();
  }

  /**
   * Deletes a specified value from the Set.
   *
   * @returns `true` if an element in the Set existed and has been removed, or `false` if the element does not exist.
   */
  delete(value: T): boolean {
    const node = this.map.get(value);
    if (node == null) {
      return false;
    }
    node.next.prev = node.prev;
    node.prev.next = node.next;
    this.map.delete(value);
    return true;
  }

  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries(): IterableIterator<[T, T]> {
    for (const key of this.map.keys()) {
      yield [key, key];
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
    callbackfn: (value: T, key: T, collection: this) => void,
    thisArg?: unknown
  ): void {
    for (const key of this.map.keys()) {
      callbackfn.call(thisArg, key, key, this);
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
    return this.map.has(value);
  }

  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  keys(): IterableIterator<T> {
    return this.map.keys();
  }

  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  values(): IterableIterator<T> {
    return this.map.keys();
  }

  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator](): IterableIterator<T> {
    return this.map.keys();
  }

  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return `[object ${LRUSet.name}]`;
  }

  /**
   * Concatenate all values.
   * @internal
   *
   * @param values - the values to concatenate.
   */
  private concat(values: Iterable<T>): void {
    const root = this.root;

    // For every value
    for (const value of values) {
      // Detach if already exists
      let node = this.map.get(value);
      if (node != null) {
        node.next.prev = node.prev;
        node.prev.next = node.next;
      }

      // Append
      node = { next: root, prev: root.prev, value: value };
      root.prev.next = node;
      root.prev = node;
      this.map.set(value, node);
    }
  }
}
