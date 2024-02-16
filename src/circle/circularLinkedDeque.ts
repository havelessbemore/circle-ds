import { BoundedEvent } from "../types/boundedEvent";
import { Bounded } from "../types/bounded";
import { CircularLinkedList, Deque } from "..";

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
export class CircularLinkedDeque<T> implements Bounded<T>, Deque<T> {
  protected list: CircularLinkedList<T>;

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
    this.list = new CircularLinkedList(capacity as number);
  }

  get capacity(): number {
    return this.list.capacity;
  }

  get size(): number {
    return this.list.size;
  }

  get [Symbol.toStringTag](): string {
    return CircularLinkedDeque.name;
  }

  set capacity(capacity: number) {
    this.list.capacity = capacity;
  }

  first(): T | undefined {
    return this.list.at(0);
  }

  front(): T | undefined {
    return this.list.at(0);
  }

  clear(): void {
    this.list.clear();
  }

  entries(): IterableIterator<[number, T]> {
    return this.list.entries();
  }

  forEach(
    callbackfn: (value: T, index: number, collection: this) => void,
    thisArg?: unknown
  ): void {
    this.list.forEach((v, i) => callbackfn.call(thisArg, v, i, this), thisArg);
  }

  has(value: T): boolean {
    return this.list.has(value);
  }

  keys(): IterableIterator<number> {
    return this.list.keys();
  }

  last(): T | undefined {
    return this.list.at(-1);
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
    return this.values();
  }

  top(): T | undefined {
    return this.list.at(-1);
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
