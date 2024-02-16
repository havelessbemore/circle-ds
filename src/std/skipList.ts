import { List } from "../types/list";
import { isArrayLength, isIterable } from "../utils/is";
import { clamp, log, randomRun, toInteger } from "../utils/math";

/**
 * Configuration options for creating a SkipList instance.
 */
export interface SkipListConfig {
  /**
   * The maximum number of levels in the skip list.
   *
   * Optional. If not provided, a default value is calculated
   * based on the probability factor `p` and `size`
   */
  maxLevel?: number;

  /**
   * The probability factor used to randomly determine the levels
   * of new nodes. Should be a value between 0 and 1, where a lower
   * value results in fewer levels on average.
   *
   * Optional; If not specified, a default value is used (e.g. 0.5).
   */
  p?: number;

  /**
   * The size used to calculate the optimal max level. Ignored
   * if `maxLevel` is specified.
   *
   * Optional. If not provided, a default value is used (e.g. the
   * implementation's maximum supported size).
   */
  size?: number;
}

/**
 * @internal
 * Represents a node within a SkipList.
 *
 * This internal interface defines the structure of nodes in the skip list,
 * including forward and backward pointers, the node's value, and the span
 * (width) between node levels. Each node may participate in multiple levels
 * of the list, facilitating fast searches, insertions, and deletions.
 */
export interface SkipListNode<T> {
  levels: {
    /**
     * Pointer to the next node at this level.
     */
    next: SkipListNode<T>;
    /**
     * Pointer to the previous node at this level.
     */
    prev: SkipListNode<T>;
    /**
     * The distance to the next node at this level.
     */
    width: number;
  }[];

  /**
   * The value stored in the node.
   */
  value: T;
}

/**
 * @internal
 */
export type SkipStack<T> = {
  index: number;
  node: SkipListNode<T>;
}[];

/**
 * Implements a skip list data structure.
 *
 * A skip list is a probabilistic alternative to balanced trees, using multiple
 * layers of linked lists to achieve logarithmic time complexity for its operations.
 *
 * This class implements the `List<T>` interface, providing compatibility with list-based
 * operations and expectations.
 */
export class SkipList<T> implements List<T> {
  /**
   * @internal
   */
  protected _levels!: number;
  /**
   * @internal
   */
  protected _maxLevel!: number;
  /**
   * @internal
   */
  protected _p!: number;
  /**
   * @internal
   */
  protected root!: SkipListNode<T>;
  /**
   * @internal
   */
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
    const size = config.size ?? Number.MAX_SAFE_INTEGER;
    this.maxLevel = config.maxLevel ?? Math.ceil(log(size, 1 / this._p));

    // Insert values, if any
    const finger = this.getRootStack();
    for (const value of values) {
      this.insert(value, finger);
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
    this.root.levels[0] = { next: this.root, prev: this.root, width: 1 };
  }

  delete(index: number): boolean {
    const i = this.tryIndex(index);
    if (i == undefined) {
      return false;
    }
    this.remove(this.stackNext(this.getRootStack(), i - 1));
    return true;
  }

  *entries(): IterableIterator<[number, T]> {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.levels[0].next;
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
      node = node.levels[0].next;
    }

    return this;
  }

  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: unknown
  ): void {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.levels[0].next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  has(value: T): boolean {
    const N = this._size;
    let node = this.root;
    for (let i = 0; i < N; ++i) {
      node = node.levels[0].next;
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
    const node = this.root.levels[0].prev;
    const finger = this.getTailStack();
    this.stackPrev(finger);
    this.stackPrev(finger);
    this.remove(finger);
    return node.value;
  }

  push(...values: T[]): number {
    if (values.length < 1) {
      return this._size;
    }

    const finger = this.getTailStack();
    this.stackPrev(finger);

    const N = values.length;
    for (let i = 0; i < N; ++i) {
      this.insert(values[i], finger);
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
    const node = this.root.levels[0].next;
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
      const curr = prev.levels[0].next;
      out.push(curr.value);
      prev = curr;
    }

    return out;
  }

  splice(start: number, deleteCount?: number, ...items: T[]): SkipList<T> {
    // Sanitize start
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;

    // Sanitize deleteCount
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, size - start);

    // Create output list
    const out = new SkipList<T>({ maxLevel: this._maxLevel, p: this._p });

    // Replace values
    const itemCount = items.length;
    const replaceCount = Math.min(deleteCount, itemCount);
    const stack = this.stackNext(this.getRootStack(), start - 1);
    let prev = stack[0].node;
    for (let i = 0; i < replaceCount; ++i) {
      prev = prev.levels[0].next;
      out.push(prev.value);
      prev.value = items[i];
    }
    this.stackNext(stack, start - 1 + replaceCount);

    // Delete values
    for (let i = replaceCount; i < deleteCount; ++i) {
      out.push(stack[0].node.levels[0].next.value);
      this.remove(stack);
    }

    // Add new values
    for (let i = replaceCount; i < itemCount; ++i) {
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

    const finger = this.getRootStack();

    const N = values.length;
    for (let i = 0; i < N; ++i) {
      this.insert(values[i], finger);
    }

    return this._size;
  }

  *values(): IterableIterator<T> {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.levels[0].next;
      yield node.value;
    }
  }

  /**
   * @internal
   */
  protected expand(level: number): void {
    const root = this.root;
    const width = this._size + 1;
    for (let lvl = this._levels; lvl < level; ++lvl) {
      root.levels[lvl] = { next: root, prev: root, width };
    }
    this._levels = level;
  }

  /**
   * @internal
   */
  protected getNode(index: number): SkipListNode<T> {
    let i = -1;
    let node = this.root;
    let lvl = this._levels - 1;

    while (i < index) {
      const { next, width } = node.levels[lvl];
      if (i + width > index) {
        --lvl;
      } else {
        i += width;
        node = next;
      }
    }

    return node;
  }

  /**
   * @internal
   */
  protected getRootStack(): SkipStack<T> {
    return new Array(this._levels).fill({ index: -1, node: this.root });
  }

  /**
   * @internal
   */
  protected stackNext(stack: SkipStack<T>, target: number): SkipStack<T> {
    let index = stack[0].index;

    if (index == target) {
      return stack;
    }
    if (index > target) {
      throw new Error("Invalid input");
    }

    let lvl = this._levels;
    let node: SkipListNode<T>;
    do {
      --lvl;
      index = stack[lvl].index;
      node = stack[lvl].node;
    } while (lvl > 0 && index + node.levels[lvl].width > target);

    while (index < target) {
      const { next, width } = node.levels[lvl];
      if (index + width > target) {
        stack[lvl] = { index, node };
        --lvl;
      } else {
        index += width;
        node = next;
      }
    }

    stack.fill({ index, node }, 0, lvl + 1);
    return stack;
  }

  /**
   * @internal
   */
  protected getTailStack(): SkipStack<T> {
    return new Array(this._levels).fill({ index: this._size, node: this.root });
  }

  /**
   * @internal
   */
  protected initNode(levels: number, value: T): SkipListNode<T> {
    return {
      levels: new Array(levels),
      value,
    };
  }

  /**
   * @internal
   */
  protected insert(value: T, stack: SkipStack<T>): void {
    const root = this.root;
    const index = stack[0].index + 1;
    const nodeLvl = randomRun(this._p, this._maxLevel, 1);
    const node = this.initNode(nodeLvl, value);

    if (this._levels < nodeLvl) {
      stack.length = nodeLvl;
      stack.fill({ index: -1, node: root }, this._levels, nodeLvl);
      this.expand(nodeLvl);
    }

    for (let lvl = 0; lvl < nodeLvl; ++lvl) {
      const prev = stack[lvl].node;
      const prevLvl = prev.levels[lvl];
      const next = prevLvl.next;
      const diff = index - stack[lvl].index;
      node.levels[lvl] = { next, prev, width: prevLvl.width - diff + 1 };
      prevLvl.width = diff;
      prevLvl.next = node;
      next.levels[lvl].prev = node;
      stack[lvl] = { index, node };
    }

    const levels = this._levels;
    for (let lvl = nodeLvl; lvl < levels; ++lvl) {
      ++stack[lvl].node.levels[lvl].width;
    }

    ++this._size;
  }

  /**
   * @internal
   */
  protected remove(stack: SkipStack<T>): void {
    const node = stack[0].node.levels[0].next;
    const N = node.levels.length;

    for (let lvl = 0; lvl < N; ++lvl) {
      const { next, prev, width } = node.levels[lvl];
      prev.levels[lvl].next = next;
      if (prev === next && lvl > 0) {
        this.shrink(lvl);
        --this._size;
        return;
      }
      next.levels[lvl].prev = prev;
      prev.levels[lvl].width += width - 1;
    }

    const levels = this._levels;
    for (let lvl = N; lvl < levels; ++lvl) {
      --stack[lvl].node.levels[lvl].width;
    }

    --this._size;
  }

  /**
   * @internal
   */
  protected shrink(level: number): void {
    const root = this.root;
    let node = root;
    do {
      const next = node.levels[level].next;
      node.levels.length = level;
      node = next;
    } while (node !== root);
    this._levels = level;
  }

  /**
   * @internal
   */
  protected stackPrev(stack: SkipStack<T>): void {
    const { index, node } = stack[0];
    const N = node.levels.length;
    for (let lvl = 0; lvl < N; ++lvl) {
      const prev = node.levels[lvl].prev;
      stack[lvl] = {
        index: index - prev.levels[lvl].width,
        node: prev,
      };
    }
  }

  /**
   * @internal
   */
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
