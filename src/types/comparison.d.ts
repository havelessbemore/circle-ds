/**
 * Defines a comparison function type used to compare two values of type `T`.
 *
 * The function should return a negative number if the first argument `a` is less than
 * the second argument `b`, zero if they're equal, and a positive number if `a` is greater
 * than `b`. This convention is aligned with the comparator functions used by
 * Array.prototype.sort() in JavaScript.
 *
 * This type is commonly used to provide custom comparison logic in sorting algorithms,
 * priority queues, sorted collections, and other data structures that require an
 * ordering of elements.
 *
 * @param a - The first element to compare.
 * @param b - The second element to compare.
 * @returns A number indicating the relative order of the two arguments:
 * - A negative number if `a` should come before `b`.
 * - Zero if `a` and `b` are considered equal in terms of ordering.
 * - A positive number if `a` should come after `b`.
 */
export type CompareFn<T> = (a: T, b: T) => number;
