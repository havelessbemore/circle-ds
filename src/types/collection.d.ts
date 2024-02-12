export interface CollectionConstructor<K, V> {
  new (): Collection<K, V>;
}

export interface Collection<K, V> {
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
