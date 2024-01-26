import { CircularView } from "./circularView";
import { CircularQueue } from "./circularQueue";
import { CircularStack } from "./circularStack";
import { Deque } from "../types/deque";
import { applyMixins } from "../utils/mixins";

/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

/**
 * A circular deque is similar to a traditional deque, but uses a fixed-size,
 * circular buffer. When the deque reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class CircularDeque<T> extends CircularView<T> implements Deque<T> {
  /**
   * Get the element at the back of the queue.
   *
   * @returns the last inserted element, or `undefined` if empty.
   */
  back(): T | undefined {
    return this._size <= 0 ? undefined : this.vals[this.toInt(this._size - 1)];
  }
  /**
   * Get the element at the bottom of the stack.
   *
   * @returns the earliest inserted element, or `undefined` if empty.
   */
  bottom(): T | undefined {
    return this._size <= 0 ? undefined : this.vals[this.head];
  }
  /**
   * Inserts new elements at the start of the collection.
   *
   * @param elems - Elements to insert
   *
   * @returns The overwritten elements
   */
  unshift(...elems: T[]): T[] {
    const length = this.vals.length;
    if (length < 1) {
      return Array.from(elems);
    }

    const out: T[] = [];
    for (let i = elems.length - 1; i >= 0; --i) {
      this.head = (this.head - 1 + length) % length;
      const prev = this.vals[this.head]!;
      this.vals[this.head] = elems[i];
      if (this._size < length) {
        ++this._size;
      } else {
        this.tail = this.head;
        out.push(prev);
      }
    }

    return out.reverse();
  }
}

export interface CircularDeque<T> extends CircularQueue<T>, CircularStack<T> {}
applyMixins(CircularDeque, [CircularQueue, CircularStack]);
