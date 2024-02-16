import { List } from "../types/list";
import { ARGS_MAX_LENGTH } from "../utils/constants";
import { isArrayLength, isIterable, isNumber } from "../utils/is";
import { chunk } from "../utils/iterable";
import { clamp, log, toInteger } from "../utils/math";

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

export class SkipList<T> implements List<T> {
  protected _levels!: number;
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

  get levels(): number {
    return this._levels;
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
    if (!isArrayLength(maxLevel) || maxLevel < 1) {
      throw new RangeError("Invalid maxLevel");
    }

    // Update
    this._maxLevel = maxLevel;

    // Remove excess levels
    if (maxLevel < this._levels) {
      this.shrink(maxLevel);
    }
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
    const i = this.tryIndex(index);
    return i == undefined ? undefined : this.getNode(i).value;
  }

  clear(): void {
    this._size = 0;
    this._levels = 1;
    this.root = this.initNode(1, undefined as T);
    this.root.next[0] = this.root;
    this.root.prev[0] = this.root;
    this.root.width[0] = 1;
  }

  delete(index: number): boolean {
    const i = this.tryIndex(index);
    if (i == undefined) {
      return false;
    }
    this.remove(this.stackTo(this.getRootStack(), i - 1));
    return true;
  }

  *entries(): IterableIterator<[number, T]> {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next[0];
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
      node = node.next[0];
    }

    return this;
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
    if (this._size < 1) {
      return undefined;
    }
    const node = this.root.prev[0];
    const stack = this.getTailStack();
    this.stackPrev(stack);
    this.stackPrev(stack);
    this.remove(stack);
    return node.value;
  }

  push(...values: T[]): number {
    if (values.length < 1) {
      return this._size;
    }

    const stack = this.getTailStack();
    this.stackPrev(stack);

    const N = values.length;
    for (let i = 0; i < N; ++i) {
      this.insert(values[i], stack);
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
    const node = this.root.next[0];
    this.remove(this.getRootStack());
    return node.value;
  }

  slice(start?: number, end?: number): SkipList<T> {
    // Sanitize start
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;

    // Sanitize end
    end = toInteger(end, size);
    end = clamp(end, -size, size);
    end += end >= 0 ? 0 : size;

    const out = new SkipList<T>({ maxLevel: this._maxLevel, p: this._p });
    for (let prev = this.getNode(start - 1); start < end; ++start) {
      out.push(prev.next[0].value);
      prev = prev.next[0];
    }

    return out;
  }

  splice(start: number, deleteCount?: number, ...items: T[]): SkipList<T> {
    // Sanitize start
    start = +start;
    start = isNumber(start) ? Math.trunc(start) : 0;
    start = Math.max(-this._size, Math.min(this._size, start));
    if (start < 0) {
      start += this._size;
    }

    // Sanitize deleteCount
    deleteCount = +deleteCount!;
    deleteCount = isNumber(deleteCount) ? Math.trunc(deleteCount) : 0;
    deleteCount = Math.max(0, Math.min(this._size - start, deleteCount));

    // Create output list
    const out = new SkipList<T>({ maxLevel: this._maxLevel, p: this._p });

    // Delete values
    const stack = this.stackTo(this.getRootStack(), start - 1);
    for (let i = 0; i < deleteCount; ++i) {
      out.push(stack[0][1].next[0].value);
      this.remove(stack);
    }

    // Add new values
    const N = items.length;
    for (let i = 0; i < N; ++i) {
      this.insert(items[i], stack);
    }

    return out;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  unshift(...values: T[]): number {
    if (values.length < 1) {
      return this._size;
    }

    const stack = this.getRootStack();

    const N = values.length;
    for (let i = 0; i < N; ++i) {
      this.insert(values[i], stack);
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

  protected expand(level: number): void {
    const root = this.root;
    const curLevel = this._levels;
    root.next.length = level;
    root.next.fill(root, curLevel, level);
    root.prev.length = level;
    root.prev.fill(root, curLevel, level);
    root.width.length = level;
    root.width.fill(this._size + 1, curLevel, level);
    this._levels = level;
  }

  protected getNode(index: number): SkipListNode<T> {
    let i = -1;
    let node = this.root;
    let lvl = this._levels - 1;

    while (i < index) {
      if (i + node.width[lvl] > index) {
        --lvl;
      } else {
        i += node.width[lvl];
        node = node.next[lvl];
      }
    }

    return node;
  }

  protected getRootStack(): [number, SkipListNode<T>][] {
    return new Array(this._levels).fill([-1, this.root]);
  }

  protected stackTo(
    stack: [number, SkipListNode<T>][],
    index: number
  ): [number, SkipListNode<T>][] {
    let i = stack[0][0];

    if (i == index) {
      return stack;
    }
    if (i > index) {
      throw new Error("Invalid input");
    }

    let lvl = this._levels;
    let node: SkipListNode<T>;
    do {
      [i, node] = stack[--lvl];
    } while (lvl > 0 && i + node.width[lvl] > index);

    while (i < index) {
      if (i + node.width[lvl] > index) {
        stack[lvl--] = [i, node];
      } else {
        i += node.width[lvl];
        node = node.next[lvl];
      }
    }

    stack.fill([i, node], 0, lvl + 1);
    return stack;
  }

  protected getTailStack(): [number, SkipListNode<T>][] {
    return new Array(this._levels).fill([this._size, this.root]);
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

    if (this._levels < nodeLvl) {
      stack.length = nodeLvl;
      stack.fill([-1, root], this._levels, nodeLvl);
      this.expand(nodeLvl);
    }

    for (let lvl = 0; lvl < nodeLvl; ++lvl) {
      const [prevIndex, prev] = stack[lvl];
      const next = prev.next[lvl];
      const diff = index - prevIndex;
      node.next[lvl] = next;
      node.prev[lvl] = prev;
      node.width[lvl] = prev.width[lvl] - diff + 1;
      prev.width[lvl] = diff;
      prev.next[lvl] = node;
      next.prev[lvl] = node;
      stack[lvl] = [index, node];
    }

    const levels = this._levels;
    for (let lvl = nodeLvl; lvl < levels; ++lvl) {
      ++stack[lvl][1].width[lvl];
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

  protected remove(stack: [number, SkipListNode<T>][]): void {
    const node = stack[0][1].next[0];
    const N = node.next.length;

    for (let lvl = 0; lvl < N; ++lvl) {
      const prev = node.prev[lvl];
      const next = node.next[lvl];
      prev.next[lvl] = next;
      if (prev === next && lvl > 0) {
        this.shrink(lvl);
        --this._size;
        return;
      }
      next.prev[lvl] = prev;
      prev.width[lvl] += node.width[lvl] - 1;
    }

    const levels = this._levels;
    for (let lvl = N; lvl < levels; ++lvl) {
      --stack[lvl][1].width[lvl];
    }

    --this._size;
  }

  protected shrink(level: number): void {
    const root = this.root;
    let node = root;
    do {
      const next = node.next[level];
      node.next.length = level;
      node.prev.length = level;
      node.width.length = level;
      node = next;
    } while (node !== root);
    this._levels = level;
  }

  protected stackPrev(stack: [number, SkipListNode<T>][]): void {
    const [index, node] = stack[0];
    const N = node.next.length;
    for (let lvl = 0; lvl < N; ++lvl) {
      const prev = node.prev[lvl];
      stack[lvl] = [index - prev.width[lvl], prev];
    }
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
