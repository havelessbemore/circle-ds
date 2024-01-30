import { IndexedCollection } from "./indexedCollection";

/*
export interface List<V> extends Deque<V> {
  at(key: number): V | undefined;
  every(
    predicate: (value: V, index: number, collection: List<V>) => unknown,
    thisArg?: any
  ): boolean;
  get(key: number): V | undefined;
  includes(value: V, fromKey?: number): boolean;
  indexOf(value: V, fromKey?: number): number;
  lastIndexOf(value: V, fromKey?: number): number;
  shift(): V | undefined;
  some(
    predicate: (value: V, key: number, collection: List<V>) => unknown,
    thisArg?: any
  ): boolean;
  unshift(...values: V[]): V[];
}
*/

export interface Queue<V> extends IndexedCollection<V> {
  first(): V | undefined;
  front(): V | undefined;
  push(...values: V[]): void;
  shift(): V | undefined;
}
