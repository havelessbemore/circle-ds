import { BoundedEvent } from "../../types/boundedEvent";
import { Bounded } from "../../types/bounded";
import { Deque } from "../..";
import { CircularArrayList } from "../list/circularArrayList";

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
  protected _list: CircularArrayList<T>;

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
    this._list = new CircularArrayList(capacity as number);
  }

  get capacity(): number {
    return this._list.capacity;
  }

  get size(): number {
    return this._list.size;
  }

  get [Symbol.toStringTag](): string {
    return CircularDeque.name;
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
    return this._list.first();
  }

  forEach(
    callbackfn: (value: T, index: number, collection: this) => void,
    thisArg?: unknown
  ): void {
    return this._list.forEach((v, i) => callbackfn.call(thisArg, v, i, this));
  }

  front(): T | undefined {
    return this._list.first();
  }

  has(value: T): boolean {
    return this._list.has(value);
  }

  keys(): IterableIterator<number> {
    return this._list.keys();
  }

  last(): T | undefined {
    return this._list.last();
  }

  pop(): T | undefined {
    return this._list.pop();
  }

  push(...elems: T[]): number {
    return this._list.push(...elems);
  }

  shift(): T | undefined {
    return this._list.shift();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this._list.values();
  }

  top(): T | undefined {
    return this._list.last();
  }

  unshift(...elems: T[]): number {
    return this._list.unshift(...elems);
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
