import { Queue } from "./queue";
import { Stack } from "./stack";

export interface Deque<V> extends Queue<V>, Stack<V> {
  unshift(...values: V[]): number;
}
