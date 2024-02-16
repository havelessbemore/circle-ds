export interface CollectionConstructor<K, V> {
  new (): Collection<K, V>;
}

/**
 * Represents a generic collection of key-value pairs with various utility methods
 * to manipulate and interact with the collection. This interface abstracts common
 * functionality found in data structures like deques, lists, maps, queues, etc.
 */
export interface Collection<K, V> {
  /**
   * Gets the number of elements contained in the `Collection`.
   */
  get size(): number;

  /**
   * A string tag for the `Collection` class that is used in `Object.prototype.toString`.
   */
  get [Symbol.toStringTag](): string;

  /**
   * Removes all elements from the `Collection`, effectively resetting it.
   */
  clear(): void;

  /**
   * Returns a new iterator object that contains an array of `[key, value]`
   * pairs for each element in the `Collection`.
   *
   * @returns An iterable iterator for the entries of the collection.
   */
  entries(): IterableIterator<[K, V]>;

  /**
   * Executes a provided function once for each key-value pair in the `Collection`.
   *
   * @param callbackfn - A function to execute for each element, receiving the value,
   * key, and collection instance as arguments.
   * @param thisArg - An optional value to use as `this` when executing `callbackfn`.
   */
  forEach(
    callbackfn: (value: V, key: K, collection: this) => void,
    thisArg?: unknown
  ): void;

  /**
   * Returns a new iterator that contains the keys for each element
   * in the `Collection`.
   *
   * @returns An iterable iterator for the keys of the collection.
   */
  keys(): IterableIterator<K>;

  /**
   * Returns a new iterator that contains the values for each element
   * in the `Collection`.
   *
   * @returns An iterable iterator for the values of the collection.
   */
  values(): IterableIterator<V>;
}
