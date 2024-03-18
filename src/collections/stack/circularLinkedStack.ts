import { Stack } from "../../types/stack";
import { Bounded } from "../../types/bounded";
import { BoundedEvent, CircularDoublyLinkedList } from "../..";

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
export class CircularLinkedStack<T> implements Bounded<T>, Stack<T> {
  /**
   * @internal
   */
  protected _list: CircularDoublyLinkedList<T>;

  /**
   * Creates a new stack with `capacity` defaulted to `Infinity`.
   */
  constructor();
  /**
   * Creates a new stack with the given capacity.
   *
   * @param capacity - the stack's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a new stack. Initial capacity is the number of items given.
   *
   * @param items - the values to store in the stack.
   */
  constructor(items: Iterable<T>);
  constructor(capacity?: number | null | Iterable<T>) {
    this._list = new CircularDoublyLinkedList(capacity as number);
  }

  get capacity(): number {
    return this._list.capacity;
  }

  get size(): number {
    return this._list.size;
  }

  get [Symbol.toStringTag](): string {
    return CircularLinkedStack.name;
  }

  set capacity(capacity: number) {
    this._list.capacity = capacity;
  }

  clear(): void {
    this._list.clear();
  }

  entries(): IterableIterator<[number, T]> {
    return this._list.entries();
  }

  forEach(
    callbackfn: (value: T, index: number, collection: this) => void,
    thisArg?: unknown
  ): void {
    this._list.forEach((v, i) => callbackfn.call(thisArg, v, i, this), thisArg);
  }

  has(value: T): boolean {
    return this._list.has(value);
  }

  keys(): IterableIterator<number> {
    return this._list.keys();
  }

  last(): T | undefined {
    return this._list.at(-1);
  }

  pop(): T | undefined {
    return this._list.pop();
  }

  push(...elems: T[]): number {
    return this._list.push(...elems);
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  top(): T | undefined {
    return this._list.at(-1);
  }

  values(): IterableIterator<T> {
    return this._list.values();
  }

  addListener(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this {
    this._list.addListener(event, listener);
    return this;
  }

  on(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this {
    this._list.on(event, listener);
    return this;
  }

  removeListener(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this {
    this._list.removeListener(event, listener);
    return this;
  }
}
