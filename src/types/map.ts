import { Collection } from "..";

export interface Map<K, V> extends Collection<V, K> {
  get(key: K): V | undefined;
  set(key: K, value: V): this;
  delete(key: K): boolean;
}
