/**
 * Defines a comparison function type used to compare two values.
 *
 * The function should return a negative number if input `a` is
 * less than input `b`, zero if they're equal, and a positive number
 * if `a` is greater than `b`. This convention is aligned with comparator
 * functions used by Array.prototype.sort() in JavaScript.
 *
 * This type is commonly used to provide custom comparison logic in
 * sorting algorithms and sorted collections that require the ordering
 * of elements.
 *
 * @param a - The first element to compare.
 * @param b - The second element to compare.
 *
 * @returns A number indicating the relative order of the two arguments:
 * - A negative number if `a` is less than `b`.
 * - Zero if `a` and `b` are considered equal in terms of ordering.
 * - A positive number if `a` is greater than `b`.
 */
export type CompareFn<T> = (a: T, b: T) => number;

/**
 * Defines a comparator object that encapsulates comparison logic.
 */
export interface Comparator<T> {
  /**
   * A {@link CompareFn} that compares two elements and
   * returns a number indicating their relative order.
   */
  compare: CompareFn<T>;
}

/**
 * Defines an interface that maintains its elements in a
 * specific order according to a specific comparison logic.
 *
 * The `Sorted` interface should be implemented by collections that require
 * elements to be kept in sorted order determined by a {@link Comparator}.
 * Implementing this interface allows for consistent application of sorting
 * logic across different data structures.
 */
export interface Sorted<T> {
  /**
   * A {@link Comparator} that compares two elements and
   * returns a number indicating their relative order.
   */
  comparator: Comparator<T>;
}

/**
 * Defines the context required to initialize or configure
 * a {@link Sorted} collection.
 */
export interface SortedConfig<T> {
  /**
   * A {@link Comparator} that compares two elements and
   * returns a number indicating their relative order.
   */
  comparator: Comparator<T>;
}
