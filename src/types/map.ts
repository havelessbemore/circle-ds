import { KeyedCollection } from "./keyedCollection";

export interface Map<K, V> extends KeyedCollection<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): [K, V] | undefined;
  delete(key: K): boolean;
}
