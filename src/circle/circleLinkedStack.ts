import { Stack } from "../types/stack";
import { LinkedListCore } from "./linkedListCore";

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
export class CircleLinkedStack<T>
  extends LinkedListCore<T>
  implements Stack<T>
{
  /**
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last(): T | undefined {
    return this.root.prev.value;
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
    const node = this.root.prev;
    this.root.prev = node.prev;
    node.prev.next = this.root;
    --this._size;
    return node.value;
  }

  /**
   * Inserts new elements at the end of the stack.
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
   * Get the element at the top of the stack.
   *
   * Alias for {@link last | last()}
   *
   * @returns the top element, or `undefined` if empty.
   */
  top(): T | undefined {
    return this.root.prev.value;
  }
}
