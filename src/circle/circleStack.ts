import { Stack } from "../types/stack";
import { ArrayCore } from "./arrayCore";

/**
 * A circular stack is similar to a traditional stack, but uses a fixed-size,
 * circular buffer. When the stack reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export class CircleStack<T> extends ArrayCore<T> implements Stack<T> {
  /**
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last(): T | undefined {
    return this._size <= 0 ? undefined : this.vals[this.toInt(this._size - 1)];
  }

  /**
   * Removes the top element from the stack and returns it.
   *
   * @returns the top element, or `undefined` if empty.
   */
  pop(): T | undefined {
    if (this._size < 1) {
      return undefined;
    }
    this.tail = this.toInt(this._size - 1);
    const value = this.vals[this.tail];
    this.vals[this.tail] = undefined;
    --this._size;
    return value;
  }

  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...elems: T[]): T[] {
    const cap = this.capacity;
    if (cap < 1) {
      return elems;
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
   * Get the element at the top of the stack.
   *
   * Alias for {@link last | last()}
   *
   * @returns the top element, or `undefined` if empty.
   */
  top(): T | undefined {
    return this._size <= 0 ? undefined : this.vals[this.toInt(this._size - 1)];
  }
}
