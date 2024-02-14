import { Collection } from "..";
import { ARGS_MAX_LENGTH } from "../utils/constants";
import { isIterable } from "../utils/is";
import { chunk } from "../utils/iterable";

export interface SkipListNode<T> {
  down?: SkipListNode<T>;
  next: SkipListNode<T>;
  prev: SkipListNode<T>;
  value: T;
  width: number;
}

export interface SkipListConfig {
  maxLevel?: number;
  p?: number;
}

export class SkipList<T> implements Collection<number, T> {
  protected bottom!: SkipListNode<T>;
  protected level!: number;
  protected _maxLevel!: number;
  protected _p!: number;
  protected _size!: number;
  protected top!: SkipListNode<T>;

  constructor();
  constructor(values: Iterable<T>);
  constructor(config: SkipListConfig);
  constructor(values: Iterable<T>, config: SkipListConfig);
  constructor(values?: Iterable<T> | SkipListConfig, config?: SkipListConfig) {
    this.clear();
    if (!isIterable(values)) {
      config = config ?? values;
      values = [];
    }
    config = config ?? {};
    this.p = config.p ?? 0.5;
    this.maxLevel =
      config.maxLevel ??
      Math.ceil(Math.log(Number.MAX_SAFE_INTEGER) / Math.log(1 / this._p));
    for (const array of chunk(values, ARGS_MAX_LENGTH)) {
      this.push(...array);
    }
  }

  get maxLevel(): number {
    return this._maxLevel;
  }

  get p(): number {
    return this._p;
  }

  get size(): number {
    return this._size;
  }

  get [Symbol.toStringTag](): string {
    return SkipList.name;
  }

  set maxLevel(maxDepth: number) {
    // Convert to number
    maxDepth + maxDepth;

    // If input is invalid
    if (!Number.isSafeInteger(maxDepth) || (maxDepth as number) < 1) {
      throw new RangeError("Invalid maxLevel");
    }

    // Update input
    this._maxLevel = maxDepth;

    // Remove excess levels
    while (this.level > maxDepth) {
      this.top = this.top.down!;
      --this.level;
    }
  }

  set p(p: number) {
    p = +p;
    if (isNaN(p) || p < 0 || p > 1) {
      throw new RangeError("Invalid p");
    }
    this._p = p;
  }

  at(index: number): T | undefined {
    // Conver to number
    index = +index;

    // Check if an integer
    if (!Number.isSafeInteger(index)) {
      return undefined;
    }

    // If negative, treat as index + size
    if (index < 0) {
      index += this._size;
    }

    // Check if index exists
    if (index < 0 || index >= this._size) {
      return undefined;
    }

    // Find index
    let i = -1;
    let node = this.top;
    do {
      if (i + node.width <= index) {
        i += node.width;
        node = node.next;
      } else {
        node = node.down!;
      }
    } while (i < index);

    // Return value
    return node.value;
  }

  clear(): void {
    this.bottom = this._genNode();
    this.level = 1;
    this._size = 0;
    this.top = this.bottom;
  }

  *entries(): IterableIterator<[number, T]> {
    let node = this.bottom;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield [i, node.value];
    }
  }

  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: unknown
  ): void {
    let node = this.bottom;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  has(value: T): boolean {
    const N = this._size;
    let node = this.bottom;
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

    const stack = this._getTailStack();
    const value = stack[0][1].value;
    const N = stack.length;

    for (let i = 0; i < N && stack[i][1].next.value === value; ++i) {
      const node = stack[i][1];
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    --this._size;
    return value;
  }

  push(...values: T[]): number {
    for (const value of values) {
      this._insert(this._size, value, this._getTailStack());
    }
    return this._size;
  }

  shift(): T | undefined {
    if (this._size < 1) {
      return undefined;
    }

    const stack = this._getHeadStack();
    const value = stack[0][1].next.value;
    const N = stack.length;

    for (let i = 0; i < N && stack[i][1].next.value === value; ++i) {
      const prev = stack[i][1];
      prev.next = prev.next.next;
      prev.next.prev = prev;
    }

    --this._size;
    return value;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  unshift(...values: T[]): number {
    for (let i = values.length - 1; i >= 0; --i) {
      this._insert(0, values[i], this._getHeadStack());
    }
    return this._size;
  }

  *values(): IterableIterator<T> {
    let node = this.bottom;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield node.value;
    }
  }

  protected _genNode(value?: T, width = 1): SkipListNode<T> {
    const node = { value, width } as SkipListNode<T>;
    node.prev = node;
    node.next = node;
    return node;
  }

  protected _getHeadStack(): [number, SkipListNode<T>][] {
    let n = this.level;
    const stack: [number, SkipListNode<T>][] = new Array(n).fill([]);
    for (let node = this.top; --n >= 0; node = node.down!) {
      stack[n] = [-1, node];
    }
    return stack;
  }

  protected _getTailStack(): [number, SkipListNode<T>][] {
    let n = this.level;
    const stack: [number, SkipListNode<T>][] = new Array(n).fill([]);
    for (let node = this.top; --n >= 0; node = node.down!) {
      stack[n] = [this._size - node.prev.width, node.prev];
    }
    return stack;
  }

  protected _insert(
    index: number,
    value: T,
    stack: [number, SkipListNode<T>][]
  ): void {
    const randomLevel = this.randomLevel();

    for (let i = this.level; i < randomLevel; ++i) {
      const node = this._genNode(undefined, this._size + 1);
      node.down = this.top;
      stack.push([-1, node]);
      this.top = node;
      ++this.level;
    }

    let down: SkipListNode<T> | undefined = undefined;
    for (let i = 0; i < randomLevel; ++i) {
      const [prevI, prev] = stack[i];
      const next = prev.next;
      const diff = index - prevI;
      down = { value, next, prev, down } as SkipListNode<T>;
      down.width = prev.width - diff + 1;
      prev.width = diff;
      prev.next = down;
      next.prev = down;
    }

    ++this._size;
    for (let i = randomLevel; i < this.level; ++i) {
      ++stack[i][1].width;
    }
  }

  private randomLevel(): number {
    let level = 1;
    while (Math.random() < this._p && level < this._maxLevel) {
      ++level;
    }
    return level;
  }
}
