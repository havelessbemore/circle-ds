export interface CollectionConstructor<K, V> {
  new (): Collection<K, V>;
  new (capacity: number): Collection<K, V>;
}

export interface Collection<K, V> {
  capacity: number;
  clear(): void;
  entries(): IterableIterator<[K, V]>;
  forEach(
    callbackfn: (value: V, key: K, collection: this) => void,
    thisArg?: unknown
  ): void;
  keys(): IterableIterator<K>;
  size: Readonly<number>;
  values(): IterableIterator<V>;
}
