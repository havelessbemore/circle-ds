import { Collection } from "./collection";

export interface Stack<V> extends Collection<number, V> {
  has(value: V): boolean;
  last(): V | undefined;
  pop(): V | undefined;
  push(...values: V[]): number;
  [Symbol.iterator](): IterableIterator<V>;
  top(): V | undefined;
}
