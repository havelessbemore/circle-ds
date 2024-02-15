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
