import { IndexedCollection } from "./indexedCollection";

export interface Stack<V> extends IndexedCollection<V> {
  last(): V | undefined;
  pop(): V | undefined;
  push(...values: V[]): void;
  top(): V | undefined;
}
