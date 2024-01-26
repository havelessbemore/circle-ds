import { CircularView } from "./circularView";
import { Queue } from "../types/queue";

/**
 * A circular queue is similar to a traditional queue, but uses a fixed-size,
 * circular buffer. When the queue reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class CircularQueue<T> extends CircularView<T> implements Queue<T> {
  /**
   * Get the element at the front of the queue.
   *
   * @returns the earliest inserted element, or `undefined` if empty.
   */
  front(): T | undefined {
    return this._size <= 0 ? undefined : this.vals[this.head];
  }

  /**
   * Inserts new elements at the end of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...elems: T[]): T[] {
    const cap = this.capacity;
    if (cap < 1) {
      return Array.from(elems);
    }

    const N = elems.length;
    const out: T[] = [];

    for (let i = 0; i < N; ++i) {
      const prev = this.vals[this.tail]!;
      this.vals[this.tail] = elems[i];
      this.tail = this.toInt(this._size + 1);
      if (this._size < cap) {
        ++this._size;
      } else {
        this.head = this.tail;
        out.push(prev);
      }
    }

    return out;
  }

  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift(): T | undefined {
    if (this._size < 1) {
      return undefined;
    }
    const value = this.vals[this.head];
    this.vals[this.head] = undefined;
    this.head = (this.head + 1) % this.vals.length;
    --this._size;
    return value;
  }
}
