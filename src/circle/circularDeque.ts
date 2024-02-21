import { BoundedEvent } from "../types/boundedEvent";
import { Bounded } from "../types/bounded";
import { Deque } from "..";
import { CircularArrayList } from "./circularArrayList";

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
export class CircularDeque<T> implements Bounded<T>, Deque<T> {
  /**
   * @internal
   */
  protected list: CircularArrayList<T>;

  /**
   * Creates a new deque. Default `capacity` is `Infinity`.
   */
  constructor();
  /**
   * Creates a new deque with the given capacity.
   *
   * @param capacity - the deque's capacity.
   */
  constructor(capacity?: number | null);
  /**
   * Creates a new deque from the given items. `capacity` will equal the number of items.
   *
   * @param items - the initial values in the deque.
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
    return CircularDeque.name;
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

  last(): T | undefined {
    return this.list.last();
  }

  pop(): T | undefined {
    return this.list.pop();
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

  top(): T | undefined {
    return this.list.last();
  }

  unshift(...elems: T[]): number {
    return this.list.unshift(...elems);
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
