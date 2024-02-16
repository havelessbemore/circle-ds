import { Collection } from "..";

/**
 * Represents a generic list collection of elements, allowing for indexed
 * access, modification, and iteration. This interface extends the
 * `Collection` interface by adding list-specific operations.
 *
 * The `List` interface supports both sequential and random access to elements,
 * making it suitable for a wide range of applications that require manipulation
 * of collections.
 */
export interface List<V> extends Collection<number, V> {
  /**
   * Retrieves the element at the specified index in the list.
   *
   * @param index - The zero-based index of the element to retrieve.
   *
   * @returns The element at the specified index, or `undefined` if the index is out of bounds.
   */
  at(index: number): V | undefined;

  /**
   * Deletes the element at the specified index.
   * Subsequent elements are shifted one position towards the start of the list.
   *
   * @param index - The zero-based index of the element to delete.
   *
   * @returns `true` if the element was successfully deleted, `false` otherwise.
   */
  delete(index: number): boolean;

  /**
   * Fills the list with the specified value from a start index (inclusive)
   * to an end index (exclusive).
   *
   * @param value - The value to fill the list with.
   * @param start - The start index. Defaults to 0.
   * @param end - The end index. Defaults to the list's length.
   *
   * @returns The instance of the list for chaining.
   */
  fill(value: V, start?: number, end?: number): this;

  /**
   * Determines whether a specific element exists within the list.
   *
   * @param value - The value to locate.
   *
   * @returns `true` if the value exists, `false` otherwise.
   */
  has(value: V): boolean;

  /**
   * Removes and returns the last element of the list.
   *
   * @returns The last element of the list, or `undefined` if the list is empty.
   */
  pop(): V | undefined;

  /**
   * Adds one or more elements to the end of the list
   * and returns the new list length.
   *
   * @param values - The elements to add.
   *
   * @returns The new length of the list.
   */
  push(...values: V[]): number;

  /**
   * Replaces the element at the specified index with a new value.
   *
   * @param index - The zero-based index of the element to replace.
   * @param value - The new value to set at the specified index.
   *
   * @returns The previous value at the index if replaced, otherwise `undefined`.
   */
  set(index: number, value: V): V | undefined;

  /**
   * Removes and returns the first element of the list.
   * Subsequent elements are shifted one position towards the start of the list.
   *
   * @returns The first element of the list, or `undefined` if the list is empty.
   */
  shift(): V | undefined;

  /**
   * Creates a shallow copy of the list from start index (inclusive)
   * to end index (exclusive) into a new list. Does not modify the existing list.
   *
   * @param start - The start index. Defaults to 0.
   * @param end - The end index. Defaults to the list's length.
   *
   * @returns A new list containing the specified elements.
   */
  slice(start?: number, end?: number): List<V>;

  /**
   * Changes the contents of the list by removing existing elements
   * and/or adding new elements at a given index.
   *
   * @param start - The zero-based index at which to start changing the list.
   * @param deleteCount - The number of elements to remove from the list. Defaults to 0.
   * @param items - The elements to add to the list beginning at start index. Defaults to [].
   *
   * @returns A new list containing the deleted elements, if any.
   */
  splice(start: number, deleteCount?: number, ...items: V[]): List<V>;

  /**
   * Adds one or more elements to the beginning of the list
   * and returns the new list length.
   *
   * @param values - The elements to add to the beginning of the list.
   *
   * @returns The new length of the list.
   */
  unshift(...values: V[]): number;

  /**
   * Returns the default iterator through the list's elements.
   */
  [Symbol.iterator](): IterableIterator<V>;
}
