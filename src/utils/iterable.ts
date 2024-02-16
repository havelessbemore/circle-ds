/**
 * Generates an iterable that yields chunks (arrays) of elements from the input iterable,
 * with each chunk containing up to a specified maximum number of elements. This function
 * is useful for processing or handling large collections of items in smaller, more
 * manageable segments.
 *
 * `chunkSize` is truncated to an integer to ensure expected behavior.
 * If `chunkSize` is less than 1, an empty iterable is generated.
 *
 * Example usage:
 * ```typescript
 * const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * for (const chunk of chunk(nums, 3)) {
 *   console.log(chunk); // Outputs: [1, 2, 3], [4, 5, 6], [7, 8, 9]
 * }
 * ```
 *
 * @param source - The original iterable to be chunked. Can be any iterable object (e.g., Array, Set, or a custom iterable).
 * @param chunkSize - The maximum size of each chunk. Must be a positive integer; non-integer values are truncated.
 *
 * @returns An iterable iterator that yields each chunk as an array of elements.
 */
export function* chunk<T>(
  source: Iterable<T>,
  chunkSize: number
): IterableIterator<T[]> {
  if (chunkSize < 1) {
    return;
  }
  let chunk: T[] = [];
  chunkSize = Math.trunc(chunkSize);
  for (const value of source) {
    if (chunk.push(value) >= chunkSize) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length > 0) {
    yield chunk;
  }
}
