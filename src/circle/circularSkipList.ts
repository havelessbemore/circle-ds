import { BoundedEvent } from "../types/boundedEvent";
import { Bounded, BoundedConfig } from "../types/bounded";
import { ARGS_MAX_LENGTH, LINKED_MAX_LENGTH } from "../utils/constants";
import { SkipList, SkipListConfig, SkipNode } from "../types/skipList";

import {
  isArrayLength,
  isInfinity,
  isIterable,
  isLinkedLength,
  isNumber,
} from "../utils/is";
import { chunk } from "../utils/iterable";
import {
  addIfBelow,
  clamp,
  isInRange,
  randomRun,
  toInteger,
} from "../utils/math";
import * as NodeUtils from "../utils/skipNode";
import * as StackUtils from "../utils/skipStack";

import { CircularBase } from "./circularBase";

export interface CircularSkipListConfig extends BoundedConfig, SkipListConfig {}

export class CircularSkipList<T>
  extends CircularBase<T>
  implements Bounded<T>, SkipList<T>
{
  /**
   * @internal
   * The maximum number of elements that can be stored in the collection.
   */
  protected _capacity: number;

  /**
   * @internal
   * Whether capacity is finite (true) or infinite (false).
   */
  protected _isFinite: boolean;

  /**
   * @internal
   * The maximum number of levels in the skip list.
   */
  protected _maxLevel: number;

  /**
   * @internal
   * The probability factor used to randomly determine the levels
   * of new nodes. Should be a value between 0 and 1, where a lower
   * value results in fewer levels on average.
   */
  protected _p: number;

  /**
   * @internal
   * The root of the skip list
   */
  protected _root: SkipNode<T>;

  /**
   * @internal
   * The current size of the list (0 \<= size \<= capacity)
   */
  protected _size: number;

  /**
   * @internal
   * The last node in the linked list.
   */
  protected _tail: SkipNode<T>;

  constructor();
  constructor(capacity?: number | null);
  constructor(config: CircularSkipListConfig);
  constructor(items: Iterable<T>);
  constructor(config?: CircularSkipListConfig | Iterable<T> | null | number) {
    super();

    // Initialize class variables
    this._capacity = LINKED_MAX_LENGTH;
    this._isFinite = false;
    this._p = 0.5;
    this._maxLevel = NodeUtils.calcMaxLevel(this._p, LINKED_MAX_LENGTH);
    this._root = NodeUtils.gen(undefined as T);
    this._size = 0;
    this._tail = this._root;

    // Case 1: input is null or undefined
    if (config == null) {
      return;
    }

    // Case 2: input is capacity
    if (isNumber(config)) {
      this.capacity = config;
      return;
    }

    // Case 3: input is config
    if (!isIterable(config)) {
      this.capacity = config.capacity ?? this._capacity;
      this.p = config.p ?? this._p;
      const size = config.expectedSize ?? this._capacity;
      this.maxLevel = config.maxLevel ?? NodeUtils.calcMaxLevel(this._p, size);
      return;
    }

    // Case 4: input is an iterable
    for (const vals of chunk(config, ARGS_MAX_LENGTH)) {
      this._insert(this._size, vals);
    }
    this._capacity = this._size;
    this._isFinite = true;
  }

  get capacity(): number {
    return this._isFinite ? this._capacity : Infinity;
  }

  get levels(): number {
    return this._root.levels.length;
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
    return CircularSkipList.name;
  }

  set capacity(capacity: number) {
    // Convert input to a number
    capacity = +capacity;

    // Check capacity
    if (isInfinity(capacity)) {
      // If capacity is Infinity
      capacity = LINKED_MAX_LENGTH;
      this._isFinite = false;
    } else if (isLinkedLength(capacity)) {
      // If capacity is valid
      this._isFinite = true;
    } else {
      // If capacity is invalid
      throw new RangeError("Invalid capacity");
    }

    // Update capacity
    this._capacity = capacity;

    // If current size fits within new capacity
    if (this._size <= capacity) {
      return;
    }

    // Shrink list and emit discarded items
    const [root] = this._delete(0, this._size - capacity);
    this._overflow(NodeUtils.values(root.levels[0].next));
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

    // Remove excess levels
    if (maxLevel < this.levels) {
      NodeUtils.truncateLevels(this._root, maxLevel);
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
    // Sanitize input
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Return value
    return NodeUtils.get(this._root, index + 1)!.value;
  }

  clear(): void {
    this._size = 0;
    this._tail = this._root;
    this._root.levels.length = 1;
    this._root.levels[0] = { next: undefined, span: 1 };
  }

  delete(index: number): boolean {
    // Sanitize input
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }

    // Delete value
    this._delete(index, 1);

    // Return success
    return true;
  }

  entries(): IterableIterator<[number, T]> {
    return NodeUtils.entries(this._root.levels[0].next);
  }

  fill(value: T, start?: number, end?: number): this {
    const size = this._size;

    // Sanitize inputs
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    if (start >= end) {
      return this;
    }

    // Fill values
    let node = NodeUtils.get(this._root, start + 1)!;
    for (let i = start; i < end; ++i) {
      node.value = value;
      node = node.levels[0].next!;
    }

    // Return list
    return this;
  }

  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: unknown
  ): void {
    let node = this._root;
    for (let i = 0; i < this._size; ++i) {
      node = node.levels[0].next!;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  has(value: T): boolean {
    return NodeUtils.has(this._root.levels[0].next, value);
  }

  keys(): IterableIterator<number> {
    return NodeUtils.keys(this._root.levels[0].next);
  }

  pop(): T | undefined {
    // If list is empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove last value
    const [root] = this._delete(this._size - 1, 1);

    // Return value
    return root.levels[0].next!.value;
  }

  push(...values: T[]): number {
    // If no values
    if (values.length <= 0) {
      return this._size;
    }

    // If no capacity
    if (this._capacity <= 0) {
      this._overflow(values);
      return this._size;
    }

    // Push values
    this._insert(this._size, values);

    // Return new size
    return this._size;
  }

  set(index: number, value: T): T | undefined {
    // Sanitize input
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Set value
    const node = NodeUtils.get(this._root, index + 1)!;
    const prevValue = node.value;
    node.value = value;

    // Return previous value
    return prevValue;
  }

  shift(): T | undefined {
    // If list is empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove first value
    const [root] = this._delete(0, 1);

    // Return value
    return root.levels[0].next!.value;
  }

  slice(start?: number, end?: number): CircularSkipList<T> {
    const size = this._size;

    // Sanitize inputs
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);

    // Return copied segment as a list
    const [root, tails, length] = NodeUtils.copy(
      this._root,
      start,
      end - start
    );
    const list = new CircularSkipList<T>({
      capacity: length,
      p: this._p,
      maxLevel: this._maxLevel,
    });
    list._root = root;
    list._tail = tails[0];
    list._size = length;

    return list;
  }

  splice(
    start: number,
    deleteCount?: number,
    ...items: T[]
  ): CircularSkipList<T> {
    const size = this._size;

    // Sanitize inputs
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    deleteCount = clamp(toInteger(deleteCount, 0), 0, size - start);

    // Remove deleted items
    const [root, tails] = this._delete(start, deleteCount);

    // Add new items
    this._insert(start, items);

    // Return deleted items as a list
    const list = new CircularSkipList<T>({
      capacity: deleteCount,
      p: this._p,
      maxLevel: this._maxLevel,
    });
    list._root = root;
    list._tail = tails[0];
    list._size = deleteCount;

    return list;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  unshift(...values: T[]): number {
    // If no values
    if (values.length <= 0) {
      return this._size;
    }

    // If no capacity
    if (this._capacity <= 0) {
      this._overflow(values);
      return this._size;
    }

    // Presert values
    this._presert(0, values);

    // Return new size
    return this._size;
  }

  values(): IterableIterator<T> {
    return NodeUtils.values(this._root.levels[0].next);
  }

  /**
   * @internal
   */
  protected _delete(
    start: number,
    count: number
  ): [SkipNode<T>, SkipNode<T>[], number] {
    // Initialize output list
    const segRoot = NodeUtils.gen(undefined as T);
    const segTails: SkipNode<T>[] = [segRoot];

    // Check count
    if (count <= 0) {
      return [segRoot, segTails, 0];
    }

    // Initialize constants
    const root = this._root;
    const prevStack = StackUtils.getClosest(StackUtils.gen(root, -1), start);
    const tailStack = StackUtils.getClosest(StackUtils.clone(prevStack), count);
    const levels = this.levels;
    const end = start + count;

    // Detach deleted segment
    let lvl: number;
    for (lvl = 0; lvl < levels; ++lvl) {
      const prev = prevStack[lvl];
      const tail = tailStack[lvl];

      // Check if segment exists at this level
      if (prev.index >= tail.index) {
        break;
      }

      // Connect segment start to new root
      let edge = prev.node.levels[lvl];
      let span = prev.index + edge.span - start;
      segRoot.levels[lvl] = { next: edge.next, span };

      // Remove segment from list
      edge = tail.node.levels[lvl];
      span = tail.index - prev.index + (edge.span - count);
      prev.node.levels[lvl] = { next: edge.next, span };

      // Detach segment end
      tail.node.levels[lvl] = { next: undefined, span: end - tail.index };
      segTails[lvl] = tail.node;
    }

    // Remove segment from remaining levels
    while (lvl < levels) {
      const prev = prevStack[lvl];
      const tail = tailStack[lvl];
      const { next, span } = tail.node.levels[lvl];

      // If level is empty, truncate list height
      if (prev.index < 0 && next === undefined) {
        root.levels.length = lvl;
        break;
      }

      const diff = tail.index - prev.index - count;
      prev.node.levels[lvl] = { next: next, span: span + diff };
      ++lvl;
    }

    // Update tail
    if (end >= this._size) {
      this._tail = prevStack[0].node;
    }

    // Update state
    this._size -= count;

    // Return removed list
    return [segRoot, segTails, count];
  }

  /**
   * @internal
   */
  protected _genLevels(N: number): number[] {
    const levels = new Array<number>(N);
    for (let i = 0; i < N; ++i) {
      levels[i] = randomRun(this._p, 1, this._maxLevel);
    }
    return levels;
  }

  /**
   * @internal
   */
  protected _insert(index: number, values: T[]): void {
    const N = values.length;

    // Check free space
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values);
      return;
    }

    // Check if "infinite" capacity yet not enough space
    if (!this._isFinite) {
      this._safeInsert(index, values.slice(0, free));
      throw new Error("Out of memory");
    }

    // Remove from head
    if (index > 0) {
      const shifted = Math.min(index, N - free);
      const [root] = this._delete(0, shifted);
      this._overflow(NodeUtils.values(root.levels[0].next));
      index -= shifted;
      free += shifted;
    }

    // Check free space
    if (free >= N) {
      this._safeInsert(index, values);
      return;
    }

    // Remove from items and insert remaining
    const mid = values.length - free;
    this._overflow(values.slice(0, mid));
    this._safeInsert(0, values.slice(mid));
  }

  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  protected _overflow(evicted: Iterable<T>): void {
    if (Array.isArray(evicted)) {
      this._emitter.emit(BoundedEvent.Overflow, evicted);
    } else {
      for (const array of chunk(evicted, ARGS_MAX_LENGTH)) {
        this._emitter.emit(BoundedEvent.Overflow, array);
      }
    }
  }

  /**
   * @internal
   */
  protected _presert(index: number, values: T[]): void {
    const N = values.length;

    // Check free space
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values);
      return;
    }

    // Check if "infinite" capacity yet not enough space
    if (!this._isFinite) {
      this._safeInsert(0, values.slice(values.length - free));
      throw new Error("Out of memory");
    }

    // Remove from tail
    if (index < this._size) {
      const popped = Math.min(this._size - index, N - free);
      const [root] = this._delete(this._size - popped, popped);
      this._overflow(NodeUtils.values(root.levels[0].next));
      free += popped;
    }

    // Check free space
    if (free >= N) {
      this._safeInsert(index, values);
      return;
    }

    // Remove from items and insert remaining
    this._overflow(values.slice(free));
    this._safeInsert(this._size, values.slice(0, free));
  }

  /**
   * @internal
   */
  protected _safeInsert(index: number, values: T[]): void {
    // Check values
    if (values.length <= 0) {
      return;
    }

    // Create inserting segment
    const N = values.length;
    const [root, tails] = NodeUtils.toList(this._genLevels(N), values);

    // Increase list level if needed
    const minY = tails.length;
    for (let y = this.levels; y < minY; ++y) {
      this._root.levels[y] = { next: undefined, span: this._size + 1 };
    }

    // Attach segment at given index
    const prevs = StackUtils.getClosest(StackUtils.gen(this._root, -1), index);
    for (let y = 0; y < minY; ++y) {
      const prev = prevs[y].node;
      const prevI = prevs[y].index;

      const prevEdge = prev.levels[y];
      const tail = tails[y];
      const tailEdge = tail.levels[y];
      const nextI = prevI + prevEdge.span;
      const nextD = nextI - index;
      const tailD = tailEdge.span;
      tail.levels[y] = { next: prevEdge.next, span: nextD + tailD };

      const rootEdge = root.levels[y];
      const headD = rootEdge.span - 1;
      const prevD = index - prevI;
      prev.levels[y] = { next: rootEdge.next, span: prevD + headD };
    }

    // Update higher levels
    const maxY = this.levels;
    for (let y = minY; y < maxY; ++y) {
      const levels = prevs[y].node.levels;
      const { next, span } = levels[y];
      levels[y] = { next, span: span + N };
    }

    // Update tail
    if (index === this._size) {
      this._tail = tails[0];
    }

    // Update size
    this._size += N;
  }
}
