import { Collection } from "..";

export interface List<V> extends Collection<number, V> {
  at(index: number): V | undefined;
  delete(index: number): boolean;
  fill(value: V, start?: number, end?: number): this;
  has(value: V): boolean;
  pop(): V | undefined;
  push(...values: V[]): number;
  set(index: number, value: V): V | undefined;
  shift(): V | undefined;
  slice(start?: number, end?: number): List<V>;
  splice(start: number, deleteCount?: number, ...items: V[]): List<V>;
  unshift(...values: V[]): number;
  [Symbol.iterator](): IterableIterator<V>;
}
