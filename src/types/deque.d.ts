import { Queue } from "./queue";
import { Stack } from "./stack";

/**
 * Represents a double-ended queue (deque) that supports queue and stack operations,
 * allowing elements to be added or removed from both the front and back of the collection.
 * This interface extends both the `Queue` and `Stack` interfaces to inherit
 * standard queue and stack behaviors, respectively, and introduces additional
 * functionality specific to deques.
 */
export interface Deque<V> extends Queue<V>, Stack<V> {
  /**
   * Adds one or more elements to the front of the deque and returns the new length.
   *
   * This method allows for efficient front-end insertion, complementing the `push`
   * method inherited from the `Stack` interface for back-end insertion.
   *
   * @param values - The elements to add to the front of the deque.
   * @returns {number} - The new length of the deque after the elements are added.
   */
  unshift(...values: V[]): number;
}
