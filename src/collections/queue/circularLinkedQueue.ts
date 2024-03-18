import { Queue } from "../../types/queue";
import { Bounded } from "../../types/bounded";

import { CircularLinkedList } from "../list/circularLinkedList";
import { BoundedEvent } from "../..";

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
export class CircularLinkedQueue<T> implements Bounded<T>, Queue<T> {
  /**
   * @internal
   */
  protected _list: CircularLinkedList<T>;

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
    this._list = new CircularLinkedList(capacity as number);
  }

  get capacity(): number {
    return this._list.capacity;
  }

  get size(): number {
    return this._list.size;
  }

  get [Symbol.toStringTag](): string {
    return CircularLinkedQueue.name;
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

  first(): T | undefined {
    return this._list.at(0);
  }

  forEach(
    callbackfn: (value: T, index: number, collection: this) => void,
    thisArg?: unknown
  ): void {
    this._list.forEach((v, i) => callbackfn.call(thisArg, v, i, this), thisArg);
  }

  front(): T | undefined {
    return this._list.at(0);
  }

  has(value: T): boolean {
    return this._list.has(value);
  }

  keys(): IterableIterator<number> {
    return this._list.keys();
  }

  push(...elems: T[]): number {
    return this._list.push(...elems);
  }

  shift(): T | undefined {
    return this._list.shift();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
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
