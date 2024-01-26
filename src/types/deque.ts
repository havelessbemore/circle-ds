import { Queue } from "./queue";
import { Stack } from "./stack";

export interface Deque<V> extends Queue<V>, Stack<V> {
  back(): V | undefined;
  bottom(): V | undefined;
  unshift(...values: V[]): void;
}
