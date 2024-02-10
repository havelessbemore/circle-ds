import { Collection } from "./collection";

export interface Queue<V> extends Collection<number, V> {
  first(): V | undefined;
  front(): V | undefined;
  has(value: V): boolean;
  push(...values: V[]): number;
  shift(): V | undefined;
  [Symbol.iterator](): IterableIterator<V>;
}
