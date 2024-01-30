import { Collection, CollectionConstructor } from "./collection";

export interface IndexedCollectionConstructor<V>
  extends CollectionConstructor<number, V> {
  new (items: Iterable<V>): IndexedCollection<V>;
  new (...items: V[]): IndexedCollection<V>;
}

export interface IndexedCollection<V> extends Collection<number, V> {
  has(value: V): boolean;
  [Symbol.iterator](): IterableIterator<V>;
}
