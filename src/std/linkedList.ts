import { LinkedNode as Node } from "../types/linkedNode";
import { List } from "../types/list";
import {
  cut,
  entries,
  get,
  has,
  insert,
  keys,
  toList,
  values,
} from "../utils/linkedNode";
import { addIfBelow, clamp, isInRange, toInteger } from "../utils/math";

export class LinkedList<T> implements List<T> {
  /**
   * The root of the linked list
   * @internal
   */
  protected root: Node<T>;

  /**
   * The current size of the list (0 \<= size \<= capacity)
   * @internal
   */
  protected _size!: number;

  /**
   * The last node in the linked list.
   * @internal
   */
  protected tail!: Node<T>;

  /**
   * Creates a linked list.
   */
  constructor();
  /**
   * Creates a linked list with the given values.
   *
   * @param values - the values to store in the list.
   */
  constructor(values: Iterable<T>);
  constructor(values?: null | Iterable<T>) {
    // Initialize class variables
    this.root = { value: undefined } as Node<T>;
    this.clear();

    // No values given
    if (values == null) {
      return;
    }

    // Add values
    const [head, tail, size] = toList(values as Iterable<T>);
    if (size > 0) {
      this.root.next = head;
      this.tail = tail!;
      this._size = size;
    }
  }

  get size(): number {
    return this._size;
  }

  get [Symbol.toStringTag](): string {
    return LinkedList.name;
  }

  at(index?: number): T | undefined {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // If tail
    if (++index == this._size) {
      return this.tail.value;
    }

    // Return value
    return get(this.root, index)!.value;
  }

  clear(): void {
    this._size = 0;
    this.root.next = undefined;
    this.tail = this.root;
  }

  delete(index: number): boolean {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }

    // Delete value
    const prev = get(this.root, index)!;
    prev.next = prev.next!.next;
    --this._size;

    // Update tail, if needed
    if (index == this._size) {
      this.tail = prev;
    }

    return true;
  }

  entries(): IterableIterator<[number, T]> {
    return entries(this.root.next);
  }

  fill(value: T, start?: number, end?: number): this {
    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize end
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);

    // Update values
    let node = get(this.root, start + 1);
    while (start < end) {
      node!.value = value;
      node = node!.next;
      ++start;
    }

    return this;
  }

  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: unknown
  ): void {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next!;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }

  has(value: T): boolean {
    return has(this.root.next, value);
  }

  keys(): IterableIterator<number> {
    return keys(this.root.next);
  }

  pop(): T | undefined {
    // Check if empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove and update tail
    const value = this.tail.value;
    this.tail = get(this.root, --this._size)!;
    this.tail.next = undefined;

    // Return value
    return value;
  }

  push(...values: T[]): number {
    // Add values
    this.tail = insert(this.tail, values);
    this._size += values.length;

    // Return size
    return this._size;
  }

  set(index: number, value: T): T | undefined {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Update node
    const node = get(this.root, index + 1)!;
    const prevValue = node.value;
    node.value = value;

    // Return previous value
    return prevValue;
  }

  shift(): T | undefined {
    // Check if empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove head
    const head = this.root.next!;
    this.root.next = head.next;
    --this._size;

    // Update tail, if needed
    if (this._size <= 0) {
      this.tail = this.root;
    }

    // Return value
    return head.value;
  }

  slice(start?: number, end?: number): LinkedList<T> {
    const out = new LinkedList<T>();

    // Check if empty
    if (this._size <= 0) {
      return out;
    }

    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize end
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);

    // Add values to output
    let node = get(this.root, start)!;
    while (start < end) {
      node = node.next!;
      out.push(node.value);
      ++start;
    }

    // Return new list
    return out;
  }

  splice(start: number, deleteCount?: number, ...values: T[]): LinkedList<T> {
    const out = new LinkedList<T>();

    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize deleteCount
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, this._size - start);

    // Get prev node
    let prev = get(this.root, start)!;

    // Delete values
    if (deleteCount > 0) {
      const [head, tail] = cut(prev, deleteCount);
      this._size -= deleteCount;
      out.root.next = head;
      out.tail = tail!;
      out._size = deleteCount;
    }

    // Add values
    prev = insert(prev, values);
    this._size += values.length;

    // Update tail, if needed
    if (prev.next == null) {
      this.tail = prev;
    }

    return out;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return values(this.root.next);
  }

  unshift(...values: T[]): number {
    // Add values
    const tail = insert(this.root, values);
    this._size += values.length;

    // Update tail, if needed
    if (tail.next == null) {
      this.tail = tail;
    }

    // Return new size
    return this._size;
  }

  values(): IterableIterator<T> {
    return values(this.root.next);
  }
}
