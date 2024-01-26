import { Collection } from "./collection";

export interface Stack<V> extends Collection<V, number> {
  pop(): V | undefined;
  push(...values: V[]): void;
  top(): V | undefined;
}
