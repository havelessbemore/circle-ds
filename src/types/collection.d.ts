export interface CollectionConstructor<K, V> {
  new (): Collection<K, V>;
}

export interface Collection<K, V> {
  get size(): number;
  get [Symbol.toStringTag](): string;
  clear(): void;
  entries(): IterableIterator<[K, V]>;
  forEach(
    callbackfn: (value: V, key: K, collection: this) => void,
    thisArg?: unknown
  ): void;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
}
