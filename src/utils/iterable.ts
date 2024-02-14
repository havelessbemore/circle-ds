/**
 * Divide an iterable into chunks of a given size.
 *
 * @param source - The original iterable
 * @param chunkSize - The maximum size of a chunk
 *
 * @returns the chunked iterable
 */
export function* chunk<T>(
  source: Iterable<T>,
  chunkSize: number
): IterableIterator<T[]> {
  let chunk: T[] = [];
  for (const value of source) {
    if (chunk.push(value) >= chunkSize) {
      chunk.length = chunkSize;
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length > 0) {
    yield chunk;
  }
}
