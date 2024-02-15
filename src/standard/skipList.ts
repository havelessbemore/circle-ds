import { Collection } from "..";
import { ARGS_MAX_LENGTH } from "../utils/constants";
import { isArrayLength, isIterable } from "../utils/is";
import { chunk } from "../utils/iterable";
import { log } from "../utils/math";

export interface SkipListNode<T> {
  next: SkipListNode<T>[];
  prev: SkipListNode<T>[];
  value: T;
  width: number[];
}

export interface SkipListConfig {
  maxLevel?: number;
  p?: number;
}

export class SkipList<T> implements Collection<number, T> {
  protected level!: number;
  protected _maxLevel!: number;
  protected _p!: number;
  protected root!: SkipListNode<T>;
  protected _size!: number;

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
      config.maxLevel ?? Math.ceil(log(Number.MAX_SAFE_INTEGER, 1 / this._p));
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

  set maxLevel(maxLevel: number) {
    // Convert input to number
    maxLevel = +maxLevel;

    // If input is invalid
    if (!isArrayLength(maxLevel)) {
      throw new RangeError("Invalid maxLevel");
    }

    // Update
    this._maxLevel = maxLevel;

    // Remove any excess levels
    this.shrink(maxLevel);
  }

  set p(p: number) {
    // Convert input to number
    p = +p;

    // If input is invalid
    if (isNaN(p) || p < 0 || p > 1) {
      throw new RangeError("Invalid p");
    }

    // Update
    this._p = p;
  }

  at(index: number): T | undefined {
    // Conver to number
    index = +index;

    // Check if an integer
    if (!Number.isInteger(index)) {
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
    let node = this.root;
    let lvl = this.level - 1;
    do {
      if (i + node.width[lvl] > index) {
        --lvl;
      } else {
        i += node.width[lvl];
        node = node.next[lvl];
      }
    } while (i < index);

    // Return value
    return node.value;
  }

  clear(): void {
    this._size = 0;
    this.level = 1;
    this.root = this.initNode(1, undefined as T);
    this.root.next[0] = this.root;
    this.root.prev[0] = this.root;
    this.root.width[0] = 1;
  }

  *entries(): IterableIterator<[number, T]> {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next[0];
      yield [i, node.value];
    }
  }

  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: unknown
  ): void {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next[0];
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  has(value: T): boolean {
    const N = this._size;
    let node = this.root;
    for (let i = 0; i < N; ++i) {
      node = node.next[0];
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
    // Check if list is empty
    if (this._size < 1) {
      return undefined;
    }

    // Remove value
    const root = this.root;
    const node = root.prev[0];
    const N = node.next.length;
    for (let i = 0; i < N; ++i) {
      const prev = node.prev[i];
      const next = node.next[i];
      prev.next[i] = next;
      if (prev === next) {
        this.shrink(i);
        break;
      }
      next.prev[i] = prev;
      prev.width[i] += node.width[i] - 1;
    }

    // Update remaining widths
    for (let i = N; i < this.level; ++i) {
      --root.prev[i].width[i];
    }

    // Update size and return value
    --this._size;
    return node.value;
  }

  push(...values: T[]): number {
    if (values.length > 0) {
      const N = values.length;
      const stack = this.getTailStack();
      for (let i = 0; i < N; ++i) {
        this.insert(values[i], stack);
      }
    }
    return this._size;
  }

  shift(): T | undefined {
    // Check if list is empty
    if (this._size < 1) {
      return undefined;
    }

    // Remove value
    const root = this.root;
    const node = root.next[0];
    const N = node.next.length;
    for (let i = 0; i < N; ++i) {
      const next = node.next[i];
      root.next[i] = next;
      if (root === next) {
        this.shrink(i);
        break;
      }
      next.prev[i] = root;
      root.width[i] += node.width[i] - 1;
    }

    // Update remaining widths
    for (let i = N; i < this.level; ++i) {
      --root.width[i];
    }

    // Update size and return value
    --this._size;
    return node.value;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  unshift(...values: T[]): number {
    if (values.length > 0) {
      const N = values.length;
      const stack = this.getHeadStack();
      for (let i = 0; i < N; ++i) {
        this.insert(values[i], stack);
      }
    }
    return this._size;
  }

  *values(): IterableIterator<T> {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next[0];
      yield node.value;
    }
  }

  protected getHeadStack(): [number, SkipListNode<T>][] {
    return new Array(this.level).fill([-1, this.root]);
  }

  protected getTailStack(): [number, SkipListNode<T>][] {
    const N = this.level;
    const root = this.root;
    const size = this._size;
    const stack: [number, SkipListNode<T>][] = new Array(N);
    for (let i = 0; i < N; ++i) {
      const prev = root.prev[i];
      stack[i] = [size - prev.width[i], prev];
    }
    return stack;
  }

  protected initNode(level: number, value: T): SkipListNode<T> {
    return {
      next: new Array(level),
      prev: new Array(level),
      value,
      width: new Array(level),
    };
  }

  protected insert(value: T, stack: [number, SkipListNode<T>][]): void {
    const root = this.root;
    const index = stack[0][0] + 1;
    const nodeLvl = this.randomLevel();
    const node = this.initNode(nodeLvl, value);

    let listLvl = this.level;
    if (listLvl < nodeLvl) {
      root.next.length = nodeLvl;
      root.next.fill(root, listLvl, nodeLvl);
      root.prev.length = nodeLvl;
      root.prev.fill(root, listLvl, nodeLvl);
      root.width.length = nodeLvl;
      root.width.fill(this._size + 1, listLvl, nodeLvl);
      stack.length = nodeLvl;
      stack.fill([-1, root], listLvl, nodeLvl);
      listLvl = nodeLvl;
      this.level = listLvl;
    }

    for (let i = 0; i < nodeLvl; ++i) {
      const [prevIndex, prev] = stack[i];
      const next = prev.next[i];
      const diff = index - prevIndex;
      node.next[i] = next;
      node.prev[i] = prev;
      node.width[i] = prev.width[i] - diff + 1;
      prev.width[i] = diff;
      prev.next[i] = node;
      next.prev[i] = node;
      stack[i] = [index, node];
    }

    for (let i = nodeLvl; i < listLvl; ++i) {
      ++stack[i][1].width[i];
    }

    ++this._size;
  }

  protected randomLevel(): number {
    let level = 1;
    while (Math.random() < this._p && level < this._maxLevel) {
      ++level;
    }
    return level;
  }

  protected shrink(level: number): boolean {
    if (level < 1 || level >= this.level) {
      return false;
    }
    const root = this.root;
    let node = root;
    do {
      const next = root.next[level];
      root.next.length = level;
      root.prev.length = level;
      root.width.length = level;
      node = next;
    } while (node !== root);
    this.level = level;
    return true;
  }
}
