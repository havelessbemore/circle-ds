import { Queue } from "../types/queue";
import { LinkedListCore } from "./linkedListCore";

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
export class CircleLinkedQueue<T>
  extends LinkedListCore<T>
  implements Queue<T>
{
  /**
   * Get the first element in the queue.
   *
   * Alias for {@link front | front()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first(): T | undefined {
    return this.root.next.value;
  }

  /**
   * Get the element at the front of the queue.
   *
   * Alias for {@link first | first()}.
   *
   * @returns the front element, or `undefined` if empty.
   */
  front(): T | undefined {
    return this.root.next.value;
  }

  /**
   * Inserts new elements at the end of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...elems: T[]): T[] {
    const capacity = this._capacity;
    if (capacity < 1) {
      return elems;
    }

    const N = elems.length;
    const out: T[] = [];
    const root = this.root;

    let tail = root.prev;
    for (let i = 0; i < N; ++i) {
      tail.next = { next: root, prev: tail, value: elems[i] };
      tail = tail.next;
      if (this._size < capacity) {
        ++this._size;
      } else {
        out.push(root.next.value);
        root.next = root.next.next;
      }
    }

    root.prev = tail;
    root.next.prev = root;
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
    const head = this.root.next;
    this.root.next = head.next;
    head.next.prev = this.root;
    --this._size;
    return head.value;
  }
}
