import { Collection, CollectionConstructor } from "./collection";

export interface KeyedCollectionConstructor<K, V>
  extends CollectionConstructor<K, V> {
  new (items: Iterable<[K, V]>): KeyedCollection<K, V>;
  new (...items: [K, V][]): KeyedCollection<K, V>;
}

export interface KeyedCollection<K, V> extends Collection<K, V> {
  has(value: K): boolean;
  [Symbol.iterator](): IterableIterator<[K, V]>;
}
