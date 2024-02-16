import { Collection } from "./collection";

/**
 * Represents a stack collection of elements. A stack allows elements to be
 * added and removed from the end of the collection only, following the
 * LIFO (Last In, First Out) principle. This interface extends the `Collection`
 * interface and specifies additional stack-specific operations.
 *
 * Stacks are commonly used in scenarios where you need to temporarily store and
 * retrieve elements in a reverse order of their addition, such as in
 * undo mechanisms, parsing algorithms, and temporary buffers.
 */
export interface Stack<V> extends Collection<number, V> {
  /**
   * Determines whether an element exists within the stack.
   *
   * @param value - The value to locate.
   * @returns - `true` if the value exists, 'false' otherwise.
   */
  has(value: V): boolean;

  /**
   * Retrieves the last element added to the stack without removing it.
   *
   * @returns - The last element of the stack,
   * or `undefined` if the stack is empty.
   */
  last(): V | undefined;

  /**
   * Removes the last element added to the stack and returns it.
   *
   * @returns - The last element of the stack,
   * or `undefined` if the stack is empty.
   */
  pop(): V | undefined;

  /**
   * Adds one or more elements to the end of the stack
   * and returns the stack's new length.
   *
   * @param values - The elements to add.
   * @returns - The new length of the stack.
   */
  push(...values: V[]): number;

  /**
   * Returns the default iterator through the stack's elements.
   */
  [Symbol.iterator](): IterableIterator<V>;

  /**
   * Retrieves the element at the top of the stack without removing it.
   *
   * This method provides semantic clarity in contexts where the term "top" is
   * preferred over "last" to describe the most recently added element.
   *
   * @returns - The element at the top of the stack,
   * or `undefined` if the stack is empty.
   */
  top(): V | undefined;
}
