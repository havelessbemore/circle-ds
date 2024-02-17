/*! circle-ds
https://github.com/havelessbemore/circle-ds

MIT License

Copyright (C) 2024-2024 Michael Rojas <dev.michael.rojas@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const BoundedEvent = {
  Overflow: "overflow"
};
const EventEmitter = {};
class CircularBase {
  constructor(emitter = new EventEmitter()) {
    /**
     * The event emitter.
     * @internal
     */
    __publicField(this, "emitter");
    this.emitter = emitter;
  }
  addListener(event, listener) {
    this.emitter.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this.emitter.on(event, listener);
    return this;
  }
  prependListener(event, listener) {
    this.emitter.prependListener(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this.emitter.removeListener(event, listener);
    return this;
  }
}
const ARRAY_MAX_LENGTH = 4294967295;
function isArrayLength(value) {
  return Number.isInteger(value) && value >= 0 && value <= ARRAY_MAX_LENGTH;
}
function isInfinity(value) {
  return value === Number.POSITIVE_INFINITY;
}
function isNumber(value) {
  return typeof value === "number";
}
function isSafeCount(value) {
  return Number.isSafeInteger(value) && value >= 0;
}
class CircularDeque extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    __publicField(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    __publicField(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    __publicField(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    __publicField(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    __publicField(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    __publicField(this, "vals");
    this._capacity = ARRAY_MAX_LENGTH;
    this.head = 0;
    this.isFinite = false;
    this._size = 0;
    this.next = 0;
    this.vals = [];
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }
    if (isNumber(capacity)) {
      if (!isArrayLength(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      this.isFinite = true;
      return;
    }
    for (const value of capacity) {
      this.vals.push(value);
    }
    this._capacity = this.vals.length;
    this.isFinite = true;
    this._size = this._capacity;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this.isFinite ? this._capacity : Infinity;
  }
  /**
   * @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return CircularDeque.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(capacity) {
    capacity = +capacity;
    if (isInfinity(capacity)) {
      capacity = ARRAY_MAX_LENGTH;
      this.isFinite = false;
    } else if (isArrayLength(capacity)) {
      this.isFinite = true;
    } else {
      throw new RangeError("Invalid capacity");
    }
    if (this._size < 1) {
      this._capacity = capacity;
      this.clear();
    } else if (capacity < this._capacity) {
      this.shrink(capacity);
    } else if (capacity > this._capacity) {
      this.grow(capacity);
    }
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this.head = 0;
    this._size = 0;
    this.next = 0;
    this.vals.length = 0;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield [ext, this.vals[(this.head + ext) % this._capacity]];
    }
  }
  /**
   * Get the first element in the deque.
   *
   * Alias for {@link front | front()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first() {
    return this.vals[this.head];
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(callbackfn, thisArg) {
    const N = this._size;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      const value = this.vals[(this.head + ext) % this._capacity];
      callbackfn.call(thisArg, value, ext, this);
    }
  }
  /**
   * Get the element at the front of the deque.
   *
   * Alias for {@link first | first()}.
   *
   * @returns the front element, or `undefined` if empty.
   */
  front() {
    return this.vals[this.head];
  }
  /**
   * Determines whether a given element is in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param value - The element to search for
   *
   * @returns a boolean indicating if `value` was found or not
   */
  has(value) {
    const N = this._size;
    for (let ext = 0; ext < N; ++ext) {
      if (value === this.vals[(this.head + ext) % this._capacity]) {
        return true;
      }
    }
    return false;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield ext;
    }
  }
  /**
   * Get the last element in the deque.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last() {
    return this.top();
  }
  /**
   * Removes the last element from the deque.
   *
   * @returns the last element, or `undefined` if empty.
   */
  pop() {
    if (this._size <= 0) {
      return void 0;
    }
    const tail = this.next > 0 ? this.next - 1 : this.head + this._size - 1;
    --this._size;
    this.next = tail;
    const value = this.vals[tail];
    this.vals[tail] = void 0;
    return value;
  }
  /**
   * Inserts new elements at the end of the deque.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the deque.
   */
  push(...elems) {
    const N = elems.length;
    if (N < 1) {
      return this._size;
    }
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emit(elems);
      return this._size;
    }
    const free = capacity - this._size;
    if (free >= N) {
      this._push(elems, N);
      return this._size;
    }
    if (!this.isFinite) {
      this._push(elems, free);
      throw new Error("Out of memory");
    }
    const diff = N - capacity;
    this.evictHead(this.size + diff);
    if (diff > 0) {
      this.emit(elems.splice(0, diff));
    } else if (diff < 0) {
      this._push(elems, N);
      return this._size;
    }
    this.vals = elems;
    this._size = capacity;
    return this._size;
  }
  /**
   * Removes the element at the front of the deque.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size <= 0) {
      return void 0;
    }
    --this._size;
    const value = this.vals[this.head];
    this.vals[this.head] = void 0;
    if (++this.head >= this._capacity) {
      this.head = 0;
      this.vals.length = this.next;
    }
    return value;
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator]() {
    return this.values();
  }
  /**
   * Inserts new elements at the end of the deque.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the deque.
   */
  unshift(...elems) {
    const N = elems.length;
    if (N < 1) {
      return this._size;
    }
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emit(elems);
      return this._size;
    }
    const free = capacity - this._size;
    if (free >= N) {
      this._unshift(elems, N);
      return this._size;
    }
    if (!this.isFinite) {
      this._unshift(elems, free);
      throw new Error("Out of memory");
    }
    const diff = N - capacity;
    this.evictTail(this.size + diff);
    if (diff > 0) {
      this.emit(elems.splice(N - diff, diff));
    } else if (diff < 0) {
      this._unshift(elems, N);
      return this._size;
    }
    this.vals = elems;
    this._size = capacity;
    return this._size;
  }
  /**
   * Get the last element in the deque.
   *
   * Alias for {@link last | last()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top() {
    if (this._size < 1) {
      return void 0;
    }
    return this.vals[(this.head + this._size - 1) % this._capacity];
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield this.vals[(this.head + ext) % this._capacity];
    }
  }
  /**
   * Emit an event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  emit(evicted) {
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * Removes a given number of elements from the deque.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   *
   * @param count - The number of elements to evict.
   */
  evictHead(count) {
    if (count <= 0) {
      return;
    }
    const len = this._capacity - this.head;
    const isNonsequential = !this.isSequential();
    if (isNonsequential && len > count) {
      this.emit(this.vals.slice(this.head, this.head + count));
      this.vals.fill(void 0, this.head, this.head + count);
      this.head += count;
      this._size -= count;
      return;
    }
    if (isNonsequential) {
      this.emit(this.vals.slice(this.head, this.head + len));
      this.vals.length = this.next;
      this.head = 0;
      this._size -= len;
      if (count <= len) {
        return;
      }
      count -= len;
    }
    if (count >= this._size) {
      this.emit(this.vals.slice(this.head, this.head + this._size));
      this.clear();
      return;
    }
    this.emit(this.vals.slice(this.head, this.head + count));
    this.vals.fill(void 0, this.head, this.head + count);
    this.head += count;
    this._size -= count;
  }
  /**
   * Removes a given number of elements from the deque.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   *
   * @param count - The number of elements to evict.
   */
  evictTail(count) {
    if (count <= 0) {
      return;
    }
    const isNonsequential = !this.isSequential();
    if (isNonsequential && this.next > count) {
      this.emit(this.vals.slice(this.next - count, this.next));
      this.vals.fill(void 0, this.next - count, this.next);
      this.next -= count;
      this._size -= count;
      return;
    }
    if (isNonsequential) {
      this.emit(this.vals.slice(0, this.next));
      this.vals.fill(void 0, 0, this.next);
      this._size -= this.next;
      count -= this.next;
      this.next = 0;
      if (count <= 0) {
        return;
      }
    }
    const tail = this.head + this._size;
    if (count >= this._size) {
      this.emit(this.vals.slice(this.head, tail));
      this.clear();
      return;
    }
    this.emit(this.vals.slice(tail - count, tail));
    this.next = tail - count;
    this.vals.length = this.next;
    this._size -= count;
  }
  /**
   * Grow capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  grow(capacity) {
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }
    if (this._size <= this.head) {
      const temp = this._size - this.next;
      this.vals.copyWithin(temp, 0, this.next);
      this.vals.copyWithin(0, this.head, this.head + temp);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size;
    } else if (this.head + this._size <= capacity) {
      this.vals.length = this.head + this._size;
      this.vals.copyWithin(this._capacity, 0, this.next);
      this.vals.fill(void 0, 0, this.next);
      this.next = (this.head + this._size) % capacity;
    } else {
      const diff = capacity - this._capacity;
      this.vals.length = capacity;
      this.vals.copyWithin(this._capacity, 0, diff);
      this.vals.copyWithin(0, diff, this.next);
      const temp = Math.max(diff, this.next - diff);
      this.vals.fill(void 0, temp, this.next);
      this.next -= diff;
    }
    this._capacity = capacity;
  }
  /**
   * Returns whether the deque is stored sequentially in memory.
   * @internal
   *
   * @returns `true` if the deque is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this.head < this.next || this.next < 1;
  }
  /**
   * Append new elements to the collection.
   * @internal
   *
   * @param elems - The elements to append.
   * @param max - The number of elements to append.
   */
  _push(elems, max) {
    const capacity = this._capacity;
    const vals = this.vals;
    let tail = this.next;
    for (let i = 0; i < max; ++i) {
      vals[tail] = elems[i];
      if (++tail >= capacity) {
        tail = 0;
      }
    }
    this.next = tail;
    this._size += max;
  }
  /**
   * Adjusts the deque to fit within the given capacity.
   * @internal
   *
   * Assumes the deque is A) sequential in memory and B) size \<= capacity.
   *
   * @param capacity - The new capacity.
   *
   * @returns `true` if the deque was reset, `false` otherwise.
   */
  sequentialReset(capacity) {
    const tail = this.head + this._size;
    if (tail <= capacity) {
      this.vals.length = tail;
      this.next = this.vals.length % capacity;
    } else if (this.head >= capacity) {
      this.vals.copyWithin(0, this.head, tail);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size % capacity;
    } else {
      this.vals.copyWithin(0, capacity, tail);
      this.vals.length = capacity;
      this.next = tail - capacity;
    }
    this._capacity = capacity;
    return true;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  shrink(capacity) {
    this.evictHead(this._size - capacity);
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }
    const diff = this._capacity - capacity;
    this.vals.copyWithin(this.head - diff, this.head, this._capacity);
    this.vals.length = capacity;
    this.head -= diff;
    this._capacity = capacity;
  }
  /**
   * Append new elements to the collection.
   * @internal
   *
   * @param elems - The elements to append.
   * @param num - The number of elements to append.
   */
  _unshift(elems, num) {
    const capacity = this._capacity;
    const vals = this.vals;
    let head = this.head;
    const min = elems.length - num;
    for (let i = elems.length - 1; i >= min; --i) {
      if (--head < 0) {
        head += capacity;
      }
      vals[head] = elems[i];
    }
    this.head = head;
    this._size += num;
  }
}
function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError("Invalid clamp range; min must be <= max");
  }
  if (value <= min) {
    return min;
  }
  return value <= max ? value : max;
}
function toInteger(value, defaultValue = 0) {
  value = +value;
  return isNaN(value) ? defaultValue : Math.trunc(value);
}
class CircularDoublyLinkedList extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    __publicField(this, "_capacity");
    /**
     * @internal
     */
    __publicField(this, "root");
    /**
     * @internal
     */
    __publicField(this, "_size");
    this._capacity = Infinity;
    this.clear();
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }
    if (isNumber(capacity)) {
      if (!isSafeCount(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      return;
    }
    let tail = this.root;
    for (const value of capacity) {
      tail.next = { prev: tail, value };
      tail = tail.next;
      ++this._size;
    }
    tail.next = this.root;
    this.root.prev = tail;
    this._capacity = this._size;
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return CircularDoublyLinkedList.name;
  }
  set capacity(capacity) {
    capacity = +capacity;
    if (!isInfinity(capacity) && !isSafeCount(capacity)) {
      throw new RangeError("Invalid capacity");
    }
    if (this._size <= capacity) {
      this._capacity = capacity;
      return;
    }
    const items = [];
    let head = this.root.next;
    do {
      items.push(head.value);
      head = head.next;
    } while (--this._size > capacity);
    this.root.next = head;
    head.prev = this.root;
    this._capacity = capacity;
    this.emitter.emit(BoundedEvent.Overflow, items);
  }
  at(index) {
    const i = this.tryIndex(index);
    return i == void 0 ? void 0 : this.getNode(i).value;
  }
  clear() {
    this._size = 0;
    this.root = { value: void 0 };
    this.root.next = this.root;
    this.root.prev = this.root;
  }
  delete(index) {
    index = this.tryIndex(index);
    if (index == void 0) {
      return false;
    }
    this.remove(this.getNode(index));
    return true;
  }
  *entries() {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield [i, node.value];
    }
  }
  fill(value, start, end) {
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;
    end = toInteger(end, size);
    end = clamp(end, -size, size);
    end += end >= 0 ? 0 : size;
    for (let node = this.getNode(start); start < end; ++start) {
      node.value = value;
      node = node.next;
    }
    return this;
  }
  forEach(callbackfn, thisArg) {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }
  has(value) {
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
  *keys() {
    for (let i = 0; i < this._size; ++i) {
      yield i;
    }
  }
  pop() {
    if (this._size < 1) {
      return void 0;
    }
    const node = this.root.prev;
    this.remove(node);
    return node.value;
  }
  push(...values2) {
    const N = values2.length;
    if (N < 1) {
      return this._size;
    }
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emitter.emit(BoundedEvent.Overflow, values2);
      return this._size;
    }
    this.append(this.root.prev, values2);
    return this._size;
  }
  set(index, value) {
    const i = this.tryIndex(index);
    if (i == void 0) {
      return void 0;
    }
    const node = this.getNode(i);
    const prevValue = node.value;
    node.value = value;
    return prevValue;
  }
  shift() {
    if (this._size < 1) {
      return void 0;
    }
    const node = this.root.next;
    this.remove(node);
    return node.value;
  }
  slice(start, end) {
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;
    end = toInteger(end, size);
    end = clamp(end, -size, size);
    end += end >= 0 ? 0 : size;
    const out = new CircularDoublyLinkedList();
    for (let prev = this.getNode(start - 1); start < end; ++start) {
      out.push(prev.next.value);
      prev = prev.next;
    }
    return out;
  }
  splice(start, deleteCount, ...items) {
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, size - start);
    const out = new CircularDoublyLinkedList();
    const itemCount = items.length;
    let prev = this.getNode(start - 1);
    const replaceCount = Math.min(deleteCount, itemCount);
    for (let i = 0; i < replaceCount; ++i) {
      prev = prev.next;
      out.push(prev.value);
      prev.value = items[i];
    }
    if (deleteCount <= replaceCount) {
      this.append(prev, items, replaceCount);
      return out;
    }
    let tail = out.root.prev;
    prev.next.prev = tail;
    tail.next = prev.next;
    const diff = deleteCount - replaceCount;
    tail = this.moveRight(prev, diff);
    prev.next = tail.next;
    tail.next.prev = prev;
    this._size -= diff;
    tail.next = out.root;
    out.root.prev = tail;
    out._size += diff;
    return out;
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...values2) {
    const N = values2.length;
    if (N < 1) {
      return this._size;
    }
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emitter.emit(BoundedEvent.Overflow, values2);
      return this._size;
    }
    this.prepend(this.root.next, values2);
    return this._size;
  }
  *values() {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield node.value;
    }
  }
  /**
   * @internal
   */
  append(prev, values2, minIndex = 0) {
    const root = this.root;
    const next = prev.next;
    const evicted = [];
    const capacity = this._capacity;
    let size = this._size;
    const N = values2.length;
    for (let i = minIndex; i < N; ++i) {
      const curr = { prev, value: values2[i] };
      prev.next = curr;
      prev = curr;
      if (size < capacity) {
        ++size;
      } else {
        evicted.push(root.next.value);
        root.next = root.next.next;
      }
    }
    prev.next = next;
    next.prev = prev;
    root.next.prev = root;
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }
    this._size = size;
    return prev;
  }
  /**
   * @internal
   */
  getNode(index) {
    const node = this.root;
    const half = this._size / 2;
    return index <= half ? this.moveRight(node, index + 1) : this.moveLeft(node, this._size - index);
  }
  /**
   * @internal
   */
  moveLeft(node, steps) {
    for (let i = 0; i < steps; ++i) {
      node = node.prev;
    }
    return node;
  }
  /**
   * @internal
   */
  moveRight(node, steps) {
    for (let i = 0; i < steps; ++i) {
      node = node.next;
    }
    return node;
  }
  /**
   * @internal
   */
  prepend(next, values2) {
    const root = this.root;
    const prev = next.prev;
    const evicted = [];
    const capacity = this._capacity;
    let size = this._size;
    for (let i = values2.length - 1; i >= 0; --i) {
      const curr = { next, value: values2[i] };
      next.prev = curr;
      next = curr;
      if (size < capacity) {
        ++size;
      } else {
        evicted.push(root.prev.value);
        root.prev = root.prev.prev;
      }
    }
    next.prev = prev;
    prev.next = next;
    root.prev.next = root;
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted.reverse());
    }
    this._size = size;
    return next;
  }
  /**
   * @internal
   */
  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    --this._size;
  }
  /**
   * @internal
   */
  tryIndex(index) {
    index = +index;
    const size = this._size;
    if (!Number.isInteger(index) || index >= size || index < -size) {
      return void 0;
    }
    return index < 0 ? index + size : index;
  }
}
class CircularLinkedDeque {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "list");
    this.list = new CircularDoublyLinkedList(capacity);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularLinkedDeque.name;
  }
  set capacity(capacity) {
    this.list.capacity = capacity;
  }
  first() {
    return this.list.at(0);
  }
  front() {
    return this.list.at(0);
  }
  clear() {
    this.list.clear();
  }
  entries() {
    return this.list.entries();
  }
  forEach(callbackfn, thisArg) {
    this.list.forEach((v, i) => callbackfn.call(thisArg, v, i, this), thisArg);
  }
  has(value) {
    return this.list.has(value);
  }
  keys() {
    return this.list.keys();
  }
  last() {
    return this.list.at(-1);
  }
  pop() {
    return this.list.pop();
  }
  push(...elems) {
    return this.list.push(...elems);
  }
  shift() {
    return this.list.shift();
  }
  [Symbol.iterator]() {
    return this.values();
  }
  top() {
    return this.list.at(-1);
  }
  unshift(...elems) {
    return this.list.unshift(...elems);
  }
  values() {
    return this.list.values();
  }
  addListener(event, listener) {
    this.list.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this.list.on(event, listener);
    return this;
  }
  prependListener(event, listener) {
    this.list.prependListener(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this.list.removeListener(event, listener);
    return this;
  }
}
function cut(root, count) {
  if (count <= 0) {
    return [void 0, void 0];
  }
  const head = root.next;
  const tail = get(head, count - 1);
  root.next = tail.next;
  tail.next = void 0;
  return [head, tail];
}
function* entries(head, end) {
  for (let i = 0; head != end; ++i) {
    yield [i, head.value];
    head = head.next;
  }
}
function get(head, index) {
  if (index < 0) {
    return void 0;
  }
  for (let i = 0; i < index; ++i) {
    head = head.next;
  }
  return head;
}
function has(head, value, end) {
  while (head != end) {
    if (head.value === value) {
      return true;
    }
    head = head.next;
  }
  return false;
}
function* keys(head, end) {
  for (let i = 0; head != end; ++i) {
    yield i;
    head = head.next;
  }
}
function toArray(head, end) {
  const array = [];
  while (head != end) {
    array.push(head.value);
    head = head.next;
  }
  return array;
}
function toList(values2) {
  const root = {};
  let count = 0;
  let tail = root;
  for (const value of values2) {
    tail.next = { value };
    tail = tail.next;
    ++count;
  }
  return root.next == null ? [void 0, void 0, 0] : [root.next, tail, count];
}
function* values(head, end) {
  for (let i = 0; head != end; ++i) {
    yield head.value;
    head = head.next;
  }
}
class CircularLinkedList extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    __publicField(this, "_capacity");
    /**
     * @internal
     */
    __publicField(this, "root");
    /**
     * @internal
     */
    __publicField(this, "_size");
    /**
     * @internal
     */
    __publicField(this, "tail");
    this._capacity = Infinity;
    this.clear();
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }
    if (isNumber(capacity)) {
      if (!isSafeCount(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      return;
    }
    const [head, tail, size] = toList(capacity);
    this.root.next = head;
    this.tail = tail ?? this.root;
    this._capacity = size;
    this._size = size;
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return CircularLinkedList.name;
  }
  set capacity(capacity) {
    capacity = +capacity;
    if (!isInfinity(capacity) && !isSafeCount(capacity)) {
      throw new RangeError("Invalid capacity");
    }
    if (this._size <= capacity) {
      this._capacity = capacity;
      return;
    }
    const diff = this._size - capacity;
    const [head] = cut(this.root, diff);
    this._size -= diff;
    if (this._size <= 0) {
      this.tail = this.root;
    }
    this._capacity = capacity;
    this.emitter.emit(BoundedEvent.Overflow, toArray(head));
  }
  at(index) {
    const i = this.tryIndex(index);
    return i == void 0 ? void 0 : get(this.root, i + 1).value;
  }
  clear() {
    this._size = 0;
    this.root = { value: void 0 };
    this.tail = this.root;
  }
  delete(index) {
    index = this.tryIndex(index);
    if (index == void 0) {
      return false;
    }
    const prev = get(this.root, index);
    prev.next = prev.next.next;
    if (index == --this._size) {
      this.tail = prev;
    }
    return true;
  }
  entries() {
    return entries(this.root.next);
  }
  fill(value, start, end) {
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;
    end = toInteger(end, size);
    end = clamp(end, -size, size);
    end += end >= 0 ? 0 : size;
    for (let node = get(this.root, start + 1); start < end; ++start) {
      node.value = value;
      node = node.next;
    }
    return this;
  }
  forEach(callbackfn, thisArg) {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }
  has(value) {
    return has(this.root.next, value);
  }
  keys() {
    return keys(this.root.next);
  }
  pop() {
    if (this._size <= 0) {
      return void 0;
    }
    const value = this.tail.value;
    this.tail = get(this.root, --this._size);
    this.tail.next = void 0;
    return value;
  }
  push(...values2) {
    const N = values2.length;
    if (N <= 0) {
      return this._size;
    }
    const capacity = this._capacity;
    if (capacity <= 0) {
      this.emitter.emit(BoundedEvent.Overflow, values2);
      return this._size;
    }
    this.tail = this.append(this.tail, values2);
    return this._size;
  }
  set(index, value) {
    const i = this.tryIndex(index);
    if (i == void 0) {
      return void 0;
    }
    const node = get(this.root, i + 1);
    const prevValue = node.value;
    node.value = value;
    return prevValue;
  }
  shift() {
    if (this._size <= 0) {
      return void 0;
    }
    const head = this.root.next;
    this.root.next = head.next;
    if (--this._size <= 0) {
      this.tail = this.root;
    }
    return head.value;
  }
  slice(start, end) {
    const out = new CircularLinkedList();
    if (this._size <= 0) {
      return out;
    }
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;
    end = toInteger(end, size);
    end = clamp(end, -size, size);
    end += end >= 0 ? 0 : size;
    for (let node = get(this.root, start); start < end; ++start) {
      node = node.next;
      out.push(node.value);
    }
    return out;
  }
  splice(start, deleteCount, ...items) {
    const out = new CircularLinkedList();
    if (this._size <= 0) {
      return out;
    }
    const size = this._size;
    start = toInteger(start, 0);
    start = clamp(start, -size, size);
    start += start >= 0 ? 0 : size;
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, size - start);
    let prev = get(this.root, start);
    const [head, tail] = cut(prev, deleteCount);
    this._size -= deleteCount;
    out.root.next = head;
    out.tail = tail ?? out.root;
    out._size = deleteCount;
    prev = this.append(prev, items);
    if (prev.next == null) {
      this.tail = prev;
    }
    return out;
  }
  [Symbol.iterator]() {
    return values(this.root.next);
  }
  unshift(...values2) {
    let N = values2.length;
    if (N <= 0) {
      return this._size;
    }
    const capacity = this._capacity;
    if (capacity <= 0) {
      this.emitter.emit(BoundedEvent.Overflow, values2);
      return this._size;
    }
    const diff = N <= capacity ? 0 : N - capacity;
    N -= diff;
    if (this._size + N > capacity) {
      this._size = capacity - N;
      const prev = get(this.root, this._size);
      this.emitter.emit(BoundedEvent.Overflow, toArray(prev.next));
      prev.next = void 0;
      this.tail = prev;
    }
    if (diff > 0) {
      this.emitter.emit(BoundedEvent.Overflow, values2.slice(N));
      values2.length = N;
    }
    const [head, tail] = toList(values2);
    tail.next = this.root.next;
    this.root.next = head;
    if (this._size <= 0) {
      this.tail = tail;
    }
    this._size += N;
    return this._size;
  }
  values() {
    return values(this.root.next);
  }
  /**
   * @internal
   */
  append(tail, values2, minIndex = 0) {
    const root = this.root;
    const next = tail.next;
    const evicted = [];
    const capacity = this._capacity;
    let size = this._size;
    const N = values2.length;
    for (let i = minIndex; i < N; ++i) {
      const curr = { value: values2[i] };
      tail.next = curr;
      tail = curr;
      if (size < capacity) {
        ++size;
      } else {
        evicted.push(root.next.value);
        root.next = root.next.next;
      }
    }
    tail.next = next;
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }
    this._size = size;
    return tail;
  }
  /**
   * @internal
   */
  tryIndex(index) {
    index = +index;
    const size = this._size;
    if (!Number.isInteger(index) || index >= size || index < -size) {
      return void 0;
    }
    return index < 0 ? index + size : index;
  }
}
class CircularLinkedQueue {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "list");
    this.list = new CircularLinkedList(capacity);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularLinkedQueue.name;
  }
  set capacity(capacity) {
    this.list.capacity = capacity;
  }
  clear() {
    this.list.clear();
  }
  entries() {
    return this.list.entries();
  }
  first() {
    return this.list.at(0);
  }
  forEach(callbackfn, thisArg) {
    this.list.forEach((v, i) => callbackfn.call(thisArg, v, i, this), thisArg);
  }
  front() {
    return this.list.at(0);
  }
  has(value) {
    return this.list.has(value);
  }
  keys() {
    return this.list.keys();
  }
  push(...elems) {
    return this.list.push(...elems);
  }
  shift() {
    return this.list.shift();
  }
  [Symbol.iterator]() {
    return this.values();
  }
  values() {
    return this.list.values();
  }
  addListener(event, listener) {
    this.list.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this.list.on(event, listener);
    return this;
  }
  prependListener(event, listener) {
    this.list.prependListener(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this.list.removeListener(event, listener);
    return this;
  }
}
class CircularLinkedStack {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "list");
    this.list = new CircularDoublyLinkedList(capacity);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularLinkedStack.name;
  }
  set capacity(capacity) {
    this.list.capacity = capacity;
  }
  clear() {
    this.list.clear();
  }
  entries() {
    return this.list.entries();
  }
  forEach(callbackfn, thisArg) {
    this.list.forEach((v, i) => callbackfn.call(thisArg, v, i, this), thisArg);
  }
  has(value) {
    return this.list.has(value);
  }
  keys() {
    return this.list.keys();
  }
  last() {
    return this.list.at(-1);
  }
  pop() {
    return this.list.pop();
  }
  push(...elems) {
    return this.list.push(...elems);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  top() {
    return this.list.at(-1);
  }
  values() {
    return this.list.values();
  }
  addListener(event, listener) {
    this.list.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this.list.on(event, listener);
    return this;
  }
  prependListener(event, listener) {
    this.list.prependListener(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this.list.removeListener(event, listener);
    return this;
  }
}
class CircularMap extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    __publicField(this, "_capacity");
    /**
     * The internal map.
     * @internal
     */
    __publicField(this, "map");
    this._capacity = Infinity;
    this.map = /* @__PURE__ */ new Map();
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }
    if (isNumber(capacity)) {
      if (!isSafeCount(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      return;
    }
    this.map = new Map(capacity);
    this._capacity = this.map.size;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   * @returns the number of values in the map.
   */
  get size() {
    return this.map.size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return CircularMap.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(capacity) {
    capacity = +capacity;
    if (!isInfinity(capacity) && !isSafeCount(capacity)) {
      throw new RangeError("Invalid capacity");
    }
    if (capacity === this._capacity) {
      return;
    }
    this._capacity = capacity;
    if (this.size <= capacity) {
      return;
    }
    if (capacity === 0) {
      const evicted2 = Array.from(this.map);
      this.clear();
      this.emitter.emit(BoundedEvent.Overflow, evicted2);
      return;
    }
    const evicted = [];
    const iter = this.map.entries();
    for (let n = this.size - capacity; n > 0; --n) {
      const entry = iter.next().value;
      this.map.delete(entry[0]);
      evicted.push(entry);
    }
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * Removes all elements from the map.
   */
  clear() {
    this.map.clear();
  }
  /**
   * Deletes a specified value from the map.
   *
   * @returns `true` if the value existed in the map and has been removed, or `false` otherwise.
   */
  delete(key) {
    return this.map.delete(key);
  }
  /**
   * Iterate through the map's entries.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  entries() {
    return this.map.entries();
  }
  /**
   * Performs the specified action for each value in the map.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per value.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`.
   */
  forEach(callbackfn, thisArg) {
    for (const [key, value] of this.map.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }
  /**
   * Returns the associated value of the given key from the map.
   *
   * If the associated value is an object, then you will get a reference to that object; any change made to the object will effectively modify it inside the map.
   *
   * @returns the value associated with the specified key, or `undefined` if no value is associated.
   */
  get(key) {
    return this.map.get(key);
  }
  /**
   * Determines whether a given value is in the map.
   *
   * @param key - The key to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(key) {
    return this.map.has(key);
  }
  /**
   * Iterate through the map's keys.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the map's keys.
   */
  keys() {
    return this.map.keys();
  }
  /**
   * Sets the specified key-value pair in the map.
   *
   * @param key - the key to add
   * @param value - the key's value.
   */
  set(key, value) {
    if (this.capacity < 1) {
      this.emitter.emit(BoundedEvent.Overflow, [[key, value]]);
      return this;
    }
    const evicted = [];
    if (!this.map.delete(key) && this.size >= this.capacity) {
      const entry = this.map.entries().next().value;
      this.map.delete(entry[0]);
      evicted.push(entry);
    }
    this.map.set(key, value);
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }
    return this;
  }
  /**
   * Iterate through the map's values.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator]() {
    return this.map.entries();
  }
  /**
   * Iterate through the map's values.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the map's values.
   */
  values() {
    return this.map.values();
  }
}
class CircularQueue extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    __publicField(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    __publicField(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     * @internal
     */
    __publicField(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    __publicField(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    __publicField(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    __publicField(this, "vals");
    this._capacity = ARRAY_MAX_LENGTH;
    this.head = 0;
    this.isFinite = false;
    this._size = 0;
    this.next = 0;
    this.vals = [];
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }
    if (isNumber(capacity)) {
      if (!isArrayLength(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      this.isFinite = true;
      return;
    }
    for (const value of capacity) {
      this.vals.push(value);
    }
    this._capacity = this.vals.length;
    this.isFinite = true;
    this._size = this._capacity;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this.isFinite ? this._capacity : Infinity;
  }
  /**
   * @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return CircularQueue.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(capacity) {
    capacity = +capacity;
    if (isInfinity(capacity)) {
      capacity = ARRAY_MAX_LENGTH;
      this.isFinite = false;
    } else if (isArrayLength(capacity)) {
      this.isFinite = true;
    } else {
      throw new RangeError("Invalid capacity");
    }
    if (this._size < 1) {
      this._capacity = capacity;
      this.clear();
    } else if (capacity < this._capacity) {
      this.shrink(capacity);
    } else if (capacity > this._capacity) {
      this.grow(capacity);
    }
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this.head = 0;
    this._size = 0;
    this.next = 0;
    this.vals.length = 0;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield [ext, this.vals[(this.head + ext) % this._capacity]];
    }
  }
  /**
   * Get the first element in the queue.
   *
   * Alias for {@link front | front()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first() {
    return this.vals[this.head];
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(callbackfn, thisArg) {
    const N = this._size;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      const value = this.vals[(this.head + ext) % this._capacity];
      callbackfn.call(thisArg, value, ext, this);
    }
  }
  /**
   * Get the element at the front of the queue.
   *
   * Alias for {@link first | first()}.
   *
   * @returns the front element, or `undefined` if empty.
   */
  front() {
    return this.vals[this.head];
  }
  /**
   * Determines whether a given element is in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param value - The element to search for
   *
   * @returns a boolean indicating if `value` was found or not
   */
  has(value) {
    const N = this._size;
    for (let ext = 0; ext < N; ++ext) {
      if (value === this.vals[(this.head + ext) % this._capacity]) {
        return true;
      }
    }
    return false;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield ext;
    }
  }
  /**
   * Inserts new elements at the end of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the queue.
   */
  push(...elems) {
    const N = elems.length;
    if (N < 1) {
      return this._size;
    }
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emit(elems);
      return this._size;
    }
    const free = capacity - this._size;
    if (free >= N) {
      this._push(elems, N);
      return this._size;
    }
    if (!this.isFinite) {
      this._push(elems, free);
      throw new Error("Out of memory");
    }
    const diff = N - capacity;
    this.evict(this.size + diff);
    if (diff > 0) {
      this.emit(elems.splice(0, diff));
    } else if (diff < 0) {
      this._push(elems, N);
      return this._size;
    }
    this.vals = elems;
    this._size = capacity;
    return this._size;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size <= 0) {
      return void 0;
    }
    --this._size;
    const value = this.vals[this.head];
    this.vals[this.head] = void 0;
    if (++this.head >= this._capacity) {
      this.head = 0;
      this.vals.length = this.next;
    }
    return value;
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator]() {
    return this.values();
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield this.vals[(this.head + ext) % this._capacity];
    }
  }
  /**
   * Emit an event containing the items evicted from the collection.
   * @internal
   *
   * @param evicted - The items evicted from the collection.
   */
  emit(evicted) {
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * Removes a given number of elements from the queue.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   * @internal
   *
   * @param count - The number of elements to evict.
   */
  evict(count) {
    if (count <= 0) {
      return;
    }
    const len = this._capacity - this.head;
    const isNonsequential = !this.isSequential();
    if (isNonsequential && len > count) {
      this.emit(this.vals.slice(this.head, this.head + count));
      this.vals.fill(void 0, this.head, this.head + count);
      this.head += count;
      this._size -= count;
      return;
    }
    if (isNonsequential) {
      this.emit(this.vals.slice(this.head, this.head + len));
      this.vals.length = this.next;
      this.head = 0;
      this._size -= len;
      if (count <= len) {
        return;
      }
      count -= len;
    }
    if (count >= this._size) {
      this.emit(this.vals.slice(this.head, this.head + this._size));
      this.clear();
      return;
    }
    this.emit(this.vals.slice(this.head, this.head + count));
    this.vals.fill(void 0, this.head, this.head + count);
    this.head += count;
    this._size -= count;
  }
  /**
   * Grow capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  grow(capacity) {
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }
    if (this._size <= this.head) {
      const temp = this._size - this.next;
      this.vals.copyWithin(temp, 0, this.next);
      this.vals.copyWithin(0, this.head, this.head + temp);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size;
    } else if (this.head + this._size <= capacity) {
      this.vals.length = this.head + this._size;
      this.vals.copyWithin(this._capacity, 0, this.next);
      this.vals.fill(void 0, 0, this.next);
      this.next = (this.head + this._size) % capacity;
    } else {
      const diff = capacity - this._capacity;
      this.vals.length = capacity;
      this.vals.copyWithin(this._capacity, 0, diff);
      this.vals.copyWithin(0, diff, this.next);
      const temp = Math.max(diff, this.next - diff);
      this.vals.fill(void 0, temp, this.next);
      this.next -= diff;
    }
    this._capacity = capacity;
  }
  /**
   * Returns whether the queue is stored sequentially in memory.
   * @internal
   *
   * @returns `true` if the queue is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this.head < this.next || this.next < 1;
  }
  /**
   * Append new elements to the collection.
   * @internal
   *
   * @param elems - The elements to append.
   * @param max - The number of elements to append.
   */
  _push(elems, max) {
    const capacity = this._capacity;
    const vals = this.vals;
    let tail = this.next;
    for (let i = 0; i < max; ++i) {
      vals[tail] = elems[i];
      if (++tail >= capacity) {
        tail = 0;
      }
    }
    this.next = tail;
    this._size += max;
  }
  /**
   * Adjusts the queue to fit within the given capacity.
   * @internal
   *
   * Assumes the queue is A) sequential in memory and B) size \<= capacity.
   *
   * @param capacity - The new capacity.
   *
   * @returns `true` if the queue was reset, `false` otherwise.
   */
  sequentialReset(capacity) {
    const tail = this.head + this._size;
    if (tail <= capacity) {
      this.vals.length = tail;
      this.next = this.vals.length % capacity;
    } else if (this.head >= capacity) {
      this.vals.copyWithin(0, this.head, tail);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size % capacity;
    } else {
      this.vals.copyWithin(0, capacity, tail);
      this.vals.length = capacity;
      this.next = tail - capacity;
    }
    this._capacity = capacity;
    return true;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  shrink(capacity) {
    this.evict(this._size - capacity);
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }
    const diff = this._capacity - capacity;
    this.vals.copyWithin(this.head - diff, this.head, this._capacity);
    this.vals.length = capacity;
    this.head -= diff;
    this._capacity = capacity;
  }
}
class CircularSet extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    __publicField(this, "_capacity");
    /**
     * The internal set.
     * @internal
     */
    __publicField(this, "set");
    this._capacity = Infinity;
    this.set = /* @__PURE__ */ new Set();
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }
    if (isNumber(capacity)) {
      if (!isSafeCount(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      return;
    }
    this.set = new Set(capacity);
    this._capacity = this.set.size;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   * @returns the number of values in the set.
   */
  get size() {
    return this.set.size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return CircularSet.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(capacity) {
    capacity = +capacity;
    if (!isInfinity(capacity) && !isSafeCount(capacity)) {
      throw new RangeError("Invalid capacity");
    }
    if (capacity === this._capacity) {
      return;
    }
    this._capacity = capacity;
    if (this.size <= capacity) {
      return;
    }
    if (capacity === 0) {
      const evicted2 = Array.from(this.set);
      this.clear();
      this.emitter.emit(BoundedEvent.Overflow, evicted2);
      return;
    }
    const evicted = [];
    const iter = this.set.values();
    for (let n = this.size - capacity; n > 0; --n) {
      const value = iter.next().value;
      this.set.delete(value);
      evicted.push(value);
    }
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(value) {
    if (this.capacity < 1) {
      this.emitter.emit(BoundedEvent.Overflow, [value]);
      return this;
    }
    const evicted = [];
    if (!this.set.delete(value) && this.size >= this.capacity) {
      const out = this.set.values().next().value;
      this.set.delete(out);
      evicted.push(out);
    }
    this.set.add(value);
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }
    return this;
  }
  /**
   * Removes all elements from the set.
   */
  clear() {
    this.set.clear();
  }
  /**
   * Deletes a specified value from the set.
   *
   * @returns `true` if the value existed in the set and has been removed, or `false` otherwise.
   */
  delete(value) {
    return this.set.delete(value);
  }
  /**
   * Iterate through the set's entries.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  entries() {
    return this.set.entries();
  }
  /**
   * Performs the specified action for each value in the set.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per value.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`.
   */
  forEach(callbackfn, thisArg) {
    for (const key of this.set.keys()) {
      callbackfn.call(thisArg, key, key, this);
    }
  }
  /**
   * Determines whether a given value is in the set.
   *
   * @param value - The value to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(value) {
    return this.set.has(value);
  }
  /**
   * Iterate through the set's keys.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the set's keys.
   */
  keys() {
    return this.set.keys();
  }
  /**
   * Iterate through the set's values.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the set's values.
   */
  values() {
    return this.set.keys();
  }
  /**
   * Iterate through the set's values.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator]() {
    return this.set.values();
  }
}
class CircularStack extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    __publicField(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    __publicField(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    __publicField(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    __publicField(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    __publicField(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    __publicField(this, "vals");
    this._capacity = ARRAY_MAX_LENGTH;
    this.head = 0;
    this.isFinite = false;
    this._size = 0;
    this.next = 0;
    this.vals = [];
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }
    if (isNumber(capacity)) {
      if (!isArrayLength(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      this.isFinite = true;
      return;
    }
    for (const value of capacity) {
      this.vals.push(value);
    }
    this._capacity = this.vals.length;
    this.isFinite = true;
    this._size = this._capacity;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this.isFinite ? this._capacity : Infinity;
  }
  /**
   * @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return CircularStack.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(capacity) {
    capacity = +capacity;
    if (isInfinity(capacity)) {
      capacity = ARRAY_MAX_LENGTH;
      this.isFinite = false;
    } else if (isArrayLength(capacity)) {
      this.isFinite = true;
    } else {
      throw new RangeError("Invalid capacity");
    }
    if (this._size < 1) {
      this._capacity = capacity;
      this.clear();
    } else if (capacity < this._capacity) {
      this.shrink(capacity);
    } else if (capacity > this._capacity) {
      this.grow(capacity);
    }
  }
  /**
   * Remove all elements from the collection.
   */
  clear() {
    this.head = 0;
    this._size = 0;
    this.next = 0;
    this.vals.length = 0;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield [ext, this.vals[(this.head + ext) % this._capacity]];
    }
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(callbackfn, thisArg) {
    const N = this._size;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      const value = this.vals[(this.head + ext) % this._capacity];
      callbackfn.call(thisArg, value, ext, this);
    }
  }
  /**
   * Determines whether a given element is in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param value - The element to search for
   *
   * @returns a boolean indicating if `value` was found or not
   */
  has(value) {
    const N = this._size;
    for (let ext = 0; ext < N; ++ext) {
      if (value === this.vals[(this.head + ext) % this._capacity]) {
        return true;
      }
    }
    return false;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield ext;
    }
  }
  /**
   * Get the last element in the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last() {
    return this.top();
  }
  /**
   * Removes the element at the top of the stack.
   *
   * @returns the top element, or `undefined` if empty.
   */
  pop() {
    if (this._size <= 0) {
      return void 0;
    }
    const tail = this.next > 0 ? this.next - 1 : this.head + this._size - 1;
    --this._size;
    this.next = tail;
    const value = this.vals[tail];
    this.vals[tail] = void 0;
    return value;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the stack.
   */
  push(...elems) {
    const N = elems.length;
    if (N < 1) {
      return this._size;
    }
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emit(elems);
      return this._size;
    }
    const free = capacity - this._size;
    if (free >= N) {
      this._push(elems, N);
      return this._size;
    }
    if (!this.isFinite) {
      this._push(elems, free);
      throw new Error("Out of memory");
    }
    const diff = N - capacity;
    this.evict(this.size + diff);
    if (diff > 0) {
      this.emit(elems.splice(0, diff));
    } else if (diff < 0) {
      this._push(elems, N);
      return this._size;
    }
    this.vals = elems;
    this._size = capacity;
    return this._size;
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator]() {
    return this.values();
  }
  /**
   * Get the last element in the stack.
   *
   * Alias for {@link last | last()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top() {
    if (this._size < 1) {
      return void 0;
    }
    return this.vals[(this.head + this._size - 1) % this._capacity];
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield this.vals[(this.head + ext) % this._capacity];
    }
  }
  /**
   * Emit an event containing the items evicted from the collection.
   * @internal
   *
   * @param evicted - The items evicted from the collection.
   */
  emit(evicted) {
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * Removes a given number of elements from the stack.
   * @internal
   *
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   *
   * @param count - The number of elements to evict.
   */
  evict(count) {
    if (count <= 0) {
      return;
    }
    const len = this._capacity - this.head;
    const isNonsequential = !this.isSequential();
    if (isNonsequential && len > count) {
      this.emit(this.vals.slice(this.head, this.head + count));
      this.vals.fill(void 0, this.head, this.head + count);
      this.head += count;
      this._size -= count;
      return;
    }
    if (isNonsequential) {
      this.emit(this.vals.slice(this.head, this.head + len));
      this.vals.length = this.next;
      this.head = 0;
      this._size -= len;
      if (count <= len) {
        return;
      }
      count -= len;
    }
    if (count >= this._size) {
      this.emit(this.vals.slice(this.head, this.head + this._size));
      this.clear();
      return;
    }
    this.emit(this.vals.slice(this.head, this.head + count));
    this.vals.fill(void 0, this.head, this.head + count);
    this.head += count;
    this._size -= count;
  }
  /**
   * Grow capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  grow(capacity) {
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }
    if (this._size <= this.head) {
      const temp = this._size - this.next;
      this.vals.copyWithin(temp, 0, this.next);
      this.vals.copyWithin(0, this.head, this.head + temp);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size;
    } else if (this.head + this._size <= capacity) {
      this.vals.length = this.head + this._size;
      this.vals.copyWithin(this._capacity, 0, this.next);
      this.vals.fill(void 0, 0, this.next);
      this.next = (this.head + this._size) % capacity;
    } else {
      const diff = capacity - this._capacity;
      this.vals.length = capacity;
      this.vals.copyWithin(this._capacity, 0, diff);
      this.vals.copyWithin(0, diff, this.next);
      const temp = Math.max(diff, this.next - diff);
      this.vals.fill(void 0, temp, this.next);
      this.next -= diff;
    }
    this._capacity = capacity;
  }
  /**
   * Returns whether the stack is stored sequentially in memory.
   * @internal
   *
   * @returns `true` if the stack is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this.head < this.next || this.next < 1;
  }
  /**
   * Append new elements to the collection.
   * @internal
   *
   * @param elems - The elements to append.
   * @param max - The number of elements to append.
   */
  _push(elems, max) {
    const capacity = this._capacity;
    const vals = this.vals;
    let tail = this.next;
    for (let i = 0; i < max; ++i) {
      vals[tail] = elems[i];
      if (++tail >= capacity) {
        tail = 0;
      }
    }
    this.next = tail;
    this._size += max;
  }
  /**
   * Adjusts the stack to fit within the given capacity.
   * @internal
   *
   * Assumes the stack is A) sequential in memory and B) size \<= capacity.
   *
   * @param capacity - the new capacity.
   *
   * @returns `true` if the stack was reset, `false` otherwise.
   */
  sequentialReset(capacity) {
    const tail = this.head + this._size;
    if (tail <= capacity) {
      this.vals.length = tail;
      this.next = this.vals.length % capacity;
    } else if (this.head >= capacity) {
      this.vals.copyWithin(0, this.head, tail);
      this.vals.length = this._size;
      this.head = 0;
      this.next = this._size % capacity;
    } else {
      this.vals.copyWithin(0, capacity, tail);
      this.vals.length = capacity;
      this.next = tail - capacity;
    }
    this._capacity = capacity;
    return true;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  shrink(capacity) {
    this.evict(this._size - capacity);
    if (this.isSequential()) {
      this.sequentialReset(capacity);
      return;
    }
    const diff = this._capacity - capacity;
    this.vals.copyWithin(this.head - diff, this.head, this._capacity);
    this.vals.length = capacity;
    this.head -= diff;
    this._capacity = capacity;
  }
}
exports.BoundedEvent = BoundedEvent;
exports.CircularDeque = CircularDeque;
exports.CircularDoublyLinkedList = CircularDoublyLinkedList;
exports.CircularLinkedDeque = CircularLinkedDeque;
exports.CircularLinkedList = CircularLinkedList;
exports.CircularLinkedQueue = CircularLinkedQueue;
exports.CircularLinkedStack = CircularLinkedStack;
exports.CircularMap = CircularMap;
exports.CircularQueue = CircularQueue;
exports.CircularSet = CircularSet;
exports.CircularStack = CircularStack;
//# sourceMappingURL=circle-ds.cjs.map
