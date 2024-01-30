import { KeyedCollection } from "./keyedCollection";

export interface Set<V> extends KeyedCollection<V, V> {
  add(value: V): V | undefined;
  delete(value: V): boolean;
}
