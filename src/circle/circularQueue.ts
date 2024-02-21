import { BoundedEvent } from "../types/boundedEvent";
import { Queue } from "../types/queue";
import { Bounded } from "../types/bounded";
import { CircularArrayList } from "./circularArrayList";

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
export class CircularQueue<T> implements Bounded<T>, Queue<T> {
  /**
   * @internal
   */
  protected list: CircularArrayList<T>;

  /**
   * Creates a new queue. Default `capacity` is `Infinity`.
   */
  constructor();
  /**
   * Creates a new queue with the given capacity.
   *
   * @param capacity - the queue's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a new queue from the given items. `capacity` will equal the number of items.
   *
   * @param items - the initial values in the queue.
   */
  constructor(items: Iterable<T>);
  constructor(capacity?: number | null | Iterable<T>) {
    this.list = new CircularArrayList(capacity as number);
  }

  get capacity(): number {
    return this.list.capacity;
  }

  get size(): number {
    return this.list.size;
  }

  get [Symbol.toStringTag](): string {
    return CircularQueue.name;
  }

  set capacity(capacity: number) {
    this.list.capacity = capacity;
  }

  clear(): void {
    this.list.clear();
  }

  entries(): IterableIterator<[number, T]> {
    return this.list.entries();
  }

  first(): T | undefined {
    return this.list.first();
  }

  forEach(
    callbackfn: (value: T, index: number, collection: this) => void,
    thisArg?: unknown
  ): void {
    return this.list.forEach((v, i) => callbackfn.call(thisArg, v, i, this));
  }

  front(): T | undefined {
    return this.list.first();
  }

  has(value: T): boolean {
    return this.list.has(value);
  }

  keys(): IterableIterator<number> {
    return this.list.keys();
  }

  push(...elems: T[]): number {
    return this.list.push(...elems);
  }

  shift(): T | undefined {
    return this.list.shift();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.list.values();
  }

  values(): IterableIterator<T> {
    return this.list.values();
  }

  addListener(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this {
    this.list.addListener(event, listener);
    return this;
  }

  on(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this {
    this.list.on(event, listener);
    return this;
  }

  prependListener(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this {
    this.list.prependListener(event, listener);
    return this;
  }

  removeListener(
    event: typeof BoundedEvent.Overflow,
    listener: (elems: T[]) => void
  ): this {
    this.list.removeListener(event, listener);
    return this;
  }
}
