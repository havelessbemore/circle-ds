import { Collection } from "./collection";

/**
 * Represents a queue collection of elements. A queue allows elements to be
 * added to the end and removed from the front, adhering to the FIFO
 * (First In, First Out) principle. This interface extends the `Collection` interface
 * and specifies additional queue-specific operations.
 *
 * Queues are commonly used in scenarios where you need to process elements in the order
 * they were added, such as task scheduling, buffering data streams, and breadth-first
 * graph traversal.
 */
export interface Queue<V> extends Collection<number, V> {
  /**
   * Retrieves the first element added to the queue without removing it.
   *
   * @returns - The first element of the queue,
   * or `undefined` if the queue is empty.
   */
  first(): V | undefined;

  /**
   * Retrieves the element at the front of the queue without removing it.
   *
   * This method provides semantic clarity in contexts where the term "front" is
   * preferred over "first" to describe the element that was added earliest and will
   * be processed next.
   *
   * @returns - The element at the front of the queue,
   * or `undefined` if the queue is empty.
   */
  front(): V | undefined;

  /**
   * Determines whether a specific element exists within the queue.
   *
   * @param value - The value to locate.
   * @returns - `true` if the value exists, `false` otherwise.
   */
  has(value: V): boolean;

  /**
   * Adds one or more elements to the end of the queue
   * and returns the queue's new length.
   *
   * @param values - The elements to add.
   * @returns - The new length of the queue.
   */
  push(...values: V[]): number;

  /**
   * Removes and returns the first element of the queue.
   *
   * @returns - The first element of the queue,
   * or `undefined` if the queue is empty.
   */
  shift(): V | undefined;

  /**
   * Returns an iterable iterator that allows iteration
   * through the queue's elements.
   */
  [Symbol.iterator](): IterableIterator<V>;
}
