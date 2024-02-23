import { List } from "../types/list";
import { addIfBelow, isInRange, toInteger } from "../utils/math";

export class ArrayList<T> implements List<T> {
  /**
   * The stored values.
   * @internal
   */
  protected vals: T[];

  /**
   * Creates a new list.
   */
  constructor();
  /**
   * Creates a new list from the given values.
   *
   * @param values - the initial values
   */
  constructor(values: Iterable<T>);
  constructor(values?: null | Iterable<T>) {
    this.vals = Array.from((values ?? []) as Iterable<T>);
  }

  get size(): number {
    return this.vals.length;
  }

  get [Symbol.toStringTag](): string {
    return ArrayList.name;
  }

  at(index: number): T | undefined {
    const size = this.vals.length;

    // Sanitize input
    index = addIfBelow(toInteger(index, -Infinity), size);
    if (!isInRange(index, 0, size)) {
      return undefined;
    }

    return this.vals.at(index);
  }

  clear(): void {
    this.vals.length = 0;
  }

  copyWithin(target: number, start: number, end?: number): this {
    this.vals.copyWithin(target, start, end);
    return this;
  }

  delete(index: number): boolean {
    const size = this.vals.length;

    // Sanitize input
    index = addIfBelow(toInteger(index, -Infinity), size);
    if (!isInRange(index, 0, size)) {
      return false;
    }

    // Delete value
    this.vals.splice(index, 1);

    return true;
  }

  entries(): IterableIterator<[number, T]> {
    return this.vals.entries();
  }

  fill(value: T, start?: number, end?: number): this {
    this.vals.fill(value, start, end);
    return this;
  }

  first(): T | undefined {
    return this.vals.length > 0 ? this.vals[0] : undefined;
  }

  forEach(
    callbackfn: (value: T, index: number, collection: this) => void,
    thisArg?: unknown
  ): void {
    this.vals.forEach((v, i) => callbackfn.call(thisArg, v, i, this));
  }

  has(value: T): boolean {
    return this.vals.includes(value);
  }

  keys(): IterableIterator<number> {
    return this.vals.keys();
  }

  last(): T | undefined {
    const size = this.vals.length;
    return size > 0 ? this.vals[size - 1] : undefined;
  }

  pop(): T | undefined {
    return this.vals.pop();
  }

  push(...elems: T[]): number {
    return this.vals.push(...elems);
  }

  set(index: number, value: T): T | undefined {
    // Check index
    const size = this.vals.length;
    index = addIfBelow(toInteger(index, -Infinity), size);
    if (!isInRange(index, 0, size)) {
      return undefined;
    }

    // Update node
    const prevValue = this.vals[index];
    this.vals[index] = value;

    // Return previous value
    return prevValue;
  }

  shift(): T | undefined {
    return this.vals.shift();
  }

  slice(start?: number, end?: number): ArrayList<T> {
    return new ArrayList(this.vals.slice(start, end));
  }

  splice(start: number, deleteCount?: number, ...values: T[]): ArrayList<T> {
    return new ArrayList(this.vals.splice(start, deleteCount!, ...values));
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  unshift(...elems: T[]): number {
    return this.vals.unshift(...elems);
  }

  values(): IterableIterator<T> {
    return this.vals.values();
  }
}
