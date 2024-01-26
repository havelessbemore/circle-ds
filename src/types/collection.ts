export interface Collection<V, K> {
  clear(): void;
  entries(): IterableIterator<[K, V]>;
  forEach(
    callbackfn: (value: V, key: number, collection: this) => void,
    thisArg?: unknown
  ): void;
  has(value: V): boolean;
  keys(): IterableIterator<K>;
  capacity: number;
  size: Readonly<number>;
  values(): IterableIterator<V>;
  [Symbol.iterator](): IterableIterator<V>;
}
