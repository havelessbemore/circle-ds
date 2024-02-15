import { Collection } from "../types/collection";
import { ARGS_MAX_LENGTH } from "../utils/constants";
import { isNumber } from "../utils/is";
import { chunk } from "../utils/iterable";
import { clamp, toInteger } from "../utils/math";

export interface Node<T> {
  next: Node<T>;
  prev: Node<T>;
  value: T;
}

export class LinkedList<T> implements Collection<number, T> {
  protected root!: Node<T>;
  protected _size!: number;

  constructor();
  constructor(values: Iterable<T>);
  constructor(values?: Iterable<T>) {
    this.clear();
    for (const array of chunk(values ?? [], ARGS_MAX_LENGTH)) {
      this.push(...array);
    }
  }

  get size(): number {
    return this._size;
  }

  get [Symbol.toStringTag](): string {
    return LinkedList.name;
  }

  at(index: number): T | undefined {
    const i = this.tryIndex(index);
    return i == undefined ? undefined : this.getNode(i).value;
  }

  clear(): void {
    this._size = 0;
    this.root = { value: undefined } as Node<T>;
    this.root.next = this.root;
    this.root.prev = this.root;
  }

  delete(index: number): boolean {
    index = this.tryIndex(index)!;
    if (index == undefined) {
      return false;
    }
    this.remove(this.getNode(index));
    return true;
  }

  *entries(): IterableIterator<[number, T]> {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield [i, node.value];
    }
  }

  fill(value: T, start?: number, end?: number): this {
    // Sanitize start
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;

    // Sanitize end
    end = toInteger(end, size);
    end = clamp(end, -size, size);
    end += end >= 0 ? 0 : size;

    // Update values
    for (let node = this.getNode(start); start < end; ++start) {
      node.value = value;
      node = node.next;
    }

    return this;
  }

  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: unknown
  ): void {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  has(value: T): boolean {
    const N = this._size;
    let node = this.root;
    for (let i = 0; i < N; ++i) {
      node = node.next;
      if (node.value === value) {
        return true;
      }
    }
    return false;
  }

  *keys(): IterableIterator<number> {
    for (let i = 0; i < this._size; ++i) {
      yield i;
    }
  }

  pop(): T | undefined {
    if (this._size < 1) {
      return undefined;
    }
    const node = this.root.prev;
    this.remove(node);
    return node.value;
  }

  push(...values: T[]): number {
    const N = values.length;
    let prev = this.root.prev;
    for (let i = 0; i < N; ++i) {
      prev = this.insert(values[i], prev);
    }
    return this._size;
  }

  set(index: number, value: T): T | undefined {
    const i = this.tryIndex(index);
    if (i == undefined) {
      return undefined;
    }
    const node = this.getNode(i);
    const prevValue = node.value;
    node.value = value;
    return prevValue;
  }

  shift(): T | undefined {
    if (this._size < 1) {
      return undefined;
    }
    const node = this.root.next;
    this.remove(node);
    return node.value;
  }

  slice(start?: number, end?: number): LinkedList<T> {
    // Sanitize start
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;

    // Sanitize end
    end = toInteger(end, size);
    end = clamp(end, -size, size);
    end += end >= 0 ? 0 : size;

    const out = new LinkedList<T>();
    for (let prev = this.getNode(start - 1); start < end; ++start) {
      out.push(prev.next.value);
      prev = prev.next;
    }

    return out;
  }

  splice(start: number, deleteCount?: number, ...items: T[]): LinkedList<T> {
    // Sanitize start
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;

    // Sanitize deleteCount
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, size - start);

    // Delete values
    const out = new LinkedList<T>();
    let prev = this.getNode(start - 1);
    for (let i = 0; i < deleteCount; ++i) {
      out.push(prev.next.value);
      this.remove(prev.next);
    }

    // Add new values
    const N = items.length;
    for (let i = 0; i < N; ++i) {
      prev = this.insert(items[i], prev);
    }

    return out;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  unshift(...values: T[]): number {
    let prev = this.root;
    const N = values.length;
    for (let i = 0; i < N; ++i) {
      prev = this.insert(values[i], prev);
    }
    return this._size;
  }

  *values(): IterableIterator<T> {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield node.value;
    }
  }

  protected getNode(index: number): Node<T> {
    let node = this.root;
    const half = this._size / 2;
    if (index <= half) {
      for (let i = -1; i < index; ++i) {
        node = node.next;
      }
    } else {
      for (let i = this._size; i > index; --i) {
        node = node.prev;
      }
    }
    return node;
  }

  protected insert(value: T, prev: Node<T>): Node<T> {
    const node = { value } as Node<T>;
    node.prev = prev;
    node.next = prev.next;
    prev.next.prev = node;
    prev.next = node;
    ++this._size;
    return node;
  }

  protected remove(node: Node<T>): void {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    --this._size;
  }

  protected tryIndex(index: number): number | undefined {
    // Conver to number
    index = +index;

    // Check if an integer
    const size = this._size;
    if (!Number.isInteger(index) || index >= size || index < -size) {
      return undefined;
    }

    // If negative, treat as index + size
    return index < 0 ? index + size : index;
  }
}
