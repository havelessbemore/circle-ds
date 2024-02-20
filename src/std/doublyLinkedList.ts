import { DoublyLinkedNode as Node } from "../types/doublyLinkedNode";
import { List } from "../types/list";
import { cut, get, insert, toList } from "../utils/doublyLinkedNode";
import { entries, has, keys, values } from "../utils/linkedNode";
import { addIfBelow, clamp, isInRange, toInteger } from "../utils/math";

export class DoublyLinkedList<T> implements List<T> {
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
   * Creates a standard linked list (no capacity restriction).
   */
  constructor();
  /**
   * Creates a linked list with the given items. Capacity is set to the number of items.
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
      this.root.next = head!;
      this.root.prev = tail!;
      head!.prev = this.root;
      tail!.next = this.root;
      this._size = size;
    }
  }

  get size(): number {
    return this._size;
  }

  get [Symbol.toStringTag](): string {
    return DoublyLinkedList.name;
  }

  at(index: number): T | undefined {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return undefined;
    }

    // Return value
    return this.get(index).value;
  }

  clear(): void {
    this._size = 0;
    this.root.next = this.root;
    this.root.prev = this.root;
  }

  delete(index: number): boolean {
    // Check index
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }

    // Delete value
    const node = this.get(index);
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    --this._size;

    return true;
  }

  entries(): IterableIterator<[number, T]> {
    return entries(this.root.next, this.root);
  }

  fill(value: T, start?: number, end?: number): this {
    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize end
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);

    // Update values
    let node = this.get(start);
    while (start < end) {
      node.value = value;
      node = node.next!;
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
    return has(this.root.next, value, this.root);
  }

  keys(): IterableIterator<number> {
    return keys(this.root.next, this.root);
  }

  pop(): T | undefined {
    // Check if empty
    if (this._size <= 0) {
      return undefined;
    }

    // Remove tail
    const node = this.root.prev!;
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    --this._size;

    // Return value
    return node.value;
  }

  push(...values: T[]): number {
    // Case 1: No values
    const N = values.length;
    if (N <= 0) {
      return this._size;
    }

    // Add values
    insert(this.root.prev!, values);
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
    const node = this.get(index);
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
    head.prev!.next = head.next;
    head.next!.prev = head.prev;
    --this._size;

    // Return value
    return head.value;
  }

  slice(start?: number, end?: number): DoublyLinkedList<T> {
    const out = new DoublyLinkedList<T>();

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
    let prev = this.get(start - 1);
    while (start < end) {
      prev = prev.next!;
      out.push(prev.value);
      ++start;
    }

    // Return new list
    return out;
  }

  splice(
    start: number,
    deleteCount?: number,
    ...values: T[]
  ): DoublyLinkedList<T> {
    const out = new DoublyLinkedList<T>();

    // Sanitize start
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);

    // Sanitize deleteCount
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, this._size - start);

    // Get prev node
    let prev = this.get(start - 1);

    // Delete values
    if (deleteCount > 0) {
      const [head, tail] = cut(prev, deleteCount);
      this._size -= deleteCount;
      head!.prev = out.root;
      tail!.next = out.root;
      out.root.next = head;
      out.root.prev = tail;
      out._size = deleteCount;
    }

    // Add values
    prev = insert(prev, values);
    this._size += values.length;

    return out;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return values(this.root.next, this.root);
  }

  unshift(...values: T[]): number {
    // Add values
    insert(this.root, values);
    this._size += values.length;

    // Return new size
    return this._size;
  }

  values(): IterableIterator<T> {
    return values(this.root.next, this.root);
  }

  /**
   * @internal
   */
  protected get(index: number): Node<T> {
    index -= index <= this._size / 2 ? -1 : this._size;
    return get(this.root, index)!;
  }
}
