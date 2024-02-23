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
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
function addIfBelow(value, addend, target = 0) {
  return value >= target ? value : value + addend;
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
function isInRange(value, min, max) {
  return value >= min && value < max;
}
function toInteger(value, defaultValue = 0) {
  value = +value;
  return isNaN(value) ? defaultValue : Math.trunc(value);
}
class CircularArrayList extends CircularBase {
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
    if (capacity == null || isInfinity(capacity)) {
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
    this.vals = Array.from(capacity);
    this._capacity = this.vals.length;
    this.isFinite = true;
    this._size = this._capacity;
  }
  get capacity() {
    return this.isFinite ? this._capacity : Infinity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return CircularArrayList.name;
  }
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
    if (this._size <= 0) {
      this._capacity = capacity;
      this.clear();
    } else if (capacity < this._capacity) {
      this.shrink(capacity);
    } else if (capacity > this._capacity) {
      this.grow(capacity);
    }
  }
  at(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    return this.vals[this.toIndex(index)];
  }
  clear() {
    this._size = 0;
    this.head = 0;
    this.next = 0;
    this.vals.length = 0;
  }
  /*
    copyWithin(target: number, start: number, end?: number): this {
      const size = this._size;
  
      // Sanitize inputs
      target = clamp(addIfBelow(toInteger(target, 0), size), 0, size);
      start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
      const temp = target > start ? target - start : 0;
      end = clamp(addIfBelow(toInteger(end, size), size), start, size - temp);
  
      // Copy within
      this._copyWithin(target, start, end);
  
      // Return list
      return this;
    }
    */
  /**
   * @internal
   */
  _copyWithin(target, start, end) {
    if (target == start || start >= end) {
      return;
    }
    const capacity = this._capacity - 1;
    const vals = this.vals;
    const ranges = this.toRanges(start, end);
    if (target <= start || end <= target) {
      target = this.toIndex(target);
      for (const [min, max] of ranges) {
        for (let i = min; i < max; ++i) {
          vals[target] = vals[i];
          target = target < capacity ? target + 1 : 0;
        }
      }
    } else {
      target = this.toIndex(target + (end - start));
      for (const [min, max] of ranges.reverse()) {
        for (let i = max - 1; i >= min; --i) {
          target = target > 0 ? target - 1 : capacity;
          vals[target] = vals[i];
        }
      }
    }
  }
  delete(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }
    this._delete(index, 1);
    return true;
  }
  /**
   * @internal
   */
  _delete(index, deleteCount) {
    this._copyWithin(index, index + deleteCount, this._size);
    this._pop(deleteCount);
  }
  *entries() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield [ext, this.vals[this.toIndex(ext)]];
    }
  }
  fill(value, start, end) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    this._fill(value, start, end);
    return this;
  }
  /**
   * @internal
   */
  _fill(value, start, end) {
    for (const [min, max] of this.toRanges(start, end)) {
      this.vals.fill(value, min, max);
    }
  }
  first() {
    return this._size > 0 ? this.vals[this.head] : void 0;
  }
  forEach(callbackfn, thisArg) {
    const N = this._size;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      const value = this.vals[this.toIndex(ext)];
      callbackfn.call(thisArg, value, ext, this);
    }
  }
  has(value) {
    const vals = this.vals;
    for (const [min, max] of this.toRanges(0, this._size)) {
      for (let i = min; i < max; ++i) {
        if (value === vals[i]) {
          return true;
        }
      }
    }
    return false;
  }
  *keys() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield ext;
    }
  }
  last() {
    return this._size > 0 ? this.vals[this.toIndex(this._size - 1)] : void 0;
  }
  pop() {
    if (this._size <= 0) {
      return void 0;
    }
    const value = this.vals[this.toIndex(this._size - 1)];
    this._pop(1);
    return value;
  }
  /**
   * @internal
   */
  _pop(N) {
    const newSize = this._size - N;
    this._fill(void 0, newSize, this._size);
    this.next = this.toIndex(newSize);
    this._size = newSize;
  }
  push(...values2) {
    if (values2.length <= 0) {
      return this._size;
    }
    if (this._capacity <= 0) {
      this._overflow(values2);
      return this._size;
    }
    this._insert(this._size, values2);
    return this._size;
  }
  set(index, value) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    index = this.toIndex(index);
    const prevValue = this.vals[index];
    this.vals[index] = value;
    return prevValue;
  }
  shift() {
    if (this._size <= 0) {
      return void 0;
    }
    const value = this.vals[this.head];
    this._shift(1);
    return value;
  }
  /**
   * @internal
   */
  _shift(N) {
    this._fill(void 0, 0, N);
    this.head = this.toIndex(N);
    this._size -= N;
  }
  slice(start, end) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    return this.toList(this._slice(start, end));
  }
  /**
   * @internal
   */
  _slice(start, end) {
    const from = this.vals;
    const to = new Array(end - start);
    let j = 0;
    for ([start, end] of this.toRanges(start, end)) {
      for (let i = start; i < end; ++i) {
        to[j++] = from[i];
      }
    }
    return to;
  }
  splice(start, deleteCount, ...items) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    deleteCount = clamp(toInteger(deleteCount, 0), 0, size - start);
    const out = this.toList(this._slice(start, start + deleteCount));
    this._splice(start, deleteCount, items);
    return out;
  }
  /**
   * @internal
   */
  _splice(start, deleteCount, items = []) {
    const addCount = items.length;
    const replaceCount = Math.min(deleteCount, addCount);
    const vals = this.vals;
    let j = 0;
    for (const [a, b] of this.toRanges(start, start + replaceCount)) {
      for (let i = a; i < b; ++i) {
        vals[i] = items[j++];
      }
    }
    if (deleteCount == addCount) {
      return;
    }
    start += replaceCount;
    deleteCount < addCount ? this._insert(start, items, replaceCount) : this._delete(start, deleteCount - addCount);
  }
  /**
   * @internal
   */
  _insert(start, items, min = 0, max = items.length) {
    const N = max - min;
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(start, items, min, max);
      return;
    }
    if (!this.isFinite) {
      this._safeInsert(start, items, min, min + free);
      throw new Error("Out of memory");
    }
    if (start > 0) {
      const shifted = Math.min(start, N - free);
      this._overflow(this._slice(0, shifted));
      this._shift(shifted);
      start -= shifted;
      free += shifted;
    }
    if (free >= N) {
      this._safeInsert(start, items, min, max);
      return;
    }
    const mid = max - free;
    this._overflow(items.slice(min, mid));
    this._safePresert(0, items, mid, max);
  }
  /**
   * @internal
   */
  _safeInsert(vIndex, items, min = 0, max = items.length) {
    const N = max - min;
    const vals = this.vals;
    this._copyWithin(vIndex + N, vIndex, this._size);
    for (const [start, end] of this.toRanges(vIndex, vIndex + N)) {
      for (let i = start; i < end; ++i) {
        vals[i] = items[min++];
      }
    }
    this._size += N;
    this.next = this.toIndex(this._size);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...values2) {
    if (values2.length <= 0) {
      return this._size;
    }
    if (this._capacity <= 0) {
      this._overflow(values2);
      return this._size;
    }
    this._presert(0, values2);
    return this._size;
  }
  /**
   * @internal
   */
  _presert(end, items, min = 0, max = items.length) {
    const N = max - min;
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safePresert(end, items, min, max);
      return;
    }
    if (!this.isFinite) {
      this._safePresert(end, items, max - free, max);
      throw new Error("Out of memory");
    }
    if (end < this._size) {
      const popped = Math.min(this._size - end, N - free);
      this._overflow(this._slice(this._size - popped, this._size));
      this._pop(popped);
      free += popped;
    }
    if (free >= N) {
      this._safePresert(end, items, min, max);
      return;
    }
    const mid = min + free;
    this._overflow(items.slice(mid, max));
    this._safeInsert(this._size, items, min, mid);
  }
  /**
   * @internal
   */
  _safePresert(vIndex, items, min = 0, max = items.length) {
    const capacity = this._capacity;
    const N = max - min;
    const vals = this.vals;
    const newHead = capacity - N;
    this._copyWithin(newHead, 0, vIndex);
    vIndex += newHead;
    for (const [start, end] of this.toRanges(vIndex, vIndex + N)) {
      for (let i = start; i < end; ++i) {
        vals[i] = items[min++];
      }
    }
    this._size += N;
    this.head = this.toIndex(newHead);
  }
  *values() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield this.vals[this.toIndex(ext)];
    }
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(evicted) {
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * @internal
   *
   * Grow capacity.
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
   * @internal
   *
   * Returns whether the list is stored sequentially in memory.
   *
   * @returns `true` if the list is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this.head < this.next || this.next <= 0;
  }
  /**
   * @internal
   *
   * Adjusts the list to fit within the given capacity.
   *
   * Assumes the list:
   * - is sequential in memory.
   * - fits in the given capacity (size \<= capacity).
   *
   * @param capacity - The new capacity.
   *
   * @returns `true` if the list was reset, `false` otherwise.
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
   * @internal
   *
   * Shrink capacity.
   *
   * @param capacity - the new capacity
   */
  shrink(capacity) {
    if (this._size > capacity) {
      const shifted = this._size - capacity;
      this._overflow(this._slice(0, shifted));
      this._shift(shifted);
    }
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
   * @internal
   */
  toIndex(externalIndex) {
    return (this.head + externalIndex) % this._capacity;
  }
  /**
   * @internal
   */
  toList(values2) {
    const out = new CircularArrayList(0);
    out.vals = values2;
    out._size = values2.length;
    out._capacity = values2.length;
    return out;
  }
  /**
   * @internal
   */
  toRanges(min, max) {
    const head = this.head;
    const mid = this._capacity - head;
    if (max <= mid) {
      return [[head + min, head + max]];
    }
    if (min >= mid) {
      return [[min - mid, max - mid]];
    }
    return [
      [head + min, this._capacity],
      [0, max - mid]
    ];
  }
}
class CircularDeque {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "list");
    this.list = new CircularArrayList(capacity);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularDeque.name;
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
    return this.list.first();
  }
  forEach(callbackfn, thisArg) {
    return this.list.forEach((v, i) => callbackfn.call(thisArg, v, i, this));
  }
  front() {
    return this.list.first();
  }
  has(value) {
    return this.list.has(value);
  }
  keys() {
    return this.list.keys();
  }
  last() {
    return this.list.last();
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
    return this.list.values();
  }
  top() {
    return this.list.last();
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
function cut$1(prev, count) {
  if (count <= 0) {
    return [void 0, void 0];
  }
  const head = prev.next;
  const tail = get$1(head, count - 1);
  prev.next = tail.next;
  tail.next = void 0;
  return [head, tail];
}
function* entries(node, end) {
  for (let i = 0; node != end; ++i) {
    yield [i, node.value];
    node = node.next;
  }
}
function get$1(node, index) {
  if (index < 0) {
    return void 0;
  }
  for (let i = 0; node != null && i < index; ++i) {
    node = node.next;
  }
  return node;
}
function has(node, value, end) {
  while (node != end) {
    if (node.value === value) {
      return true;
    }
    node = node.next;
  }
  return false;
}
function* keys(node, end) {
  for (let i = 0; node != end; ++i) {
    yield i;
    node = node.next;
  }
}
function toArray(node, end) {
  const array = [];
  while (node != end) {
    array.push(node.value);
    node = node.next;
  }
  return array;
}
function toList$1(values2) {
  const root = {};
  let count = 0;
  let tail = root;
  for (const value of values2) {
    tail.next = { value };
    tail = tail.next;
    ++count;
  }
  return root.next === void 0 ? [void 0, void 0, 0] : [root.next, tail, count];
}
function* values(head, end) {
  for (let i = 0; head != end; ++i) {
    yield head.value;
    head = head.next;
  }
}
function cut(root, count) {
  if (count <= 0) {
    return [void 0, void 0];
  }
  const [head, tail] = cut$1(root, count);
  head.prev = void 0;
  if (root.next != null) {
    root.next.prev = root;
  }
  return [head, tail];
}
function get(node, index) {
  if (index >= 0) {
    return get$1(node, index);
  }
  for (let i = 0; node != null && i > index; --i) {
    node = node.prev;
  }
  return node;
}
function toList(values2) {
  const root = {};
  let count = 0;
  let tail = root;
  for (const value of values2) {
    tail.next = { prev: tail, value };
    tail = tail.next;
    ++count;
  }
  if (count <= 0) {
    return [void 0, void 0, 0];
  }
  root.next.prev = void 0;
  return [root.next, tail, count];
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
     * The root of the linked list
     * @internal
     */
    __publicField(this, "root");
    /**
     * The current size of the list (0 \<= size \<= capacity)
     * @internal
     */
    __publicField(this, "_size");
    this._capacity = Infinity;
    this.root = { value: void 0 };
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
    this._capacity = size;
    if (size > 0) {
      this.root.next = head;
      this.root.prev = tail;
      head.prev = this.root;
      tail.next = this.root;
      this._size = size;
    }
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
    this._capacity = capacity;
    if (this._size <= capacity) {
      return;
    }
    const diff = this._size - capacity;
    const [head, tail] = cut(this.root, diff);
    this._size -= diff;
    this.emitter.emit(BoundedEvent.Overflow, toArray(head, tail.next));
  }
  at(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    return this.get(index).value;
  }
  clear() {
    this._size = 0;
    this.root.next = this.root;
    this.root.prev = this.root;
  }
  delete(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }
    const node = this.get(index);
    node.prev.next = node.next;
    node.next.prev = node.prev;
    --this._size;
    return true;
  }
  entries() {
    return entries(this.root.next, this.root);
  }
  fill(value, start, end) {
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);
    let node = this.get(start);
    while (start < end) {
      node.value = value;
      node = node.next;
      ++start;
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
    return has(this.root.next, value, this.root);
  }
  keys() {
    return keys(this.root.next, this.root);
  }
  pop() {
    if (this._size <= 0) {
      return void 0;
    }
    const node = this.root.prev;
    node.prev.next = node.next;
    node.next.prev = node.prev;
    --this._size;
    return node.value;
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
    this.append(this.root.prev, values2);
    return this._size;
  }
  set(index, value) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    const node = this.get(index);
    const prevValue = node.value;
    node.value = value;
    return prevValue;
  }
  shift() {
    if (this._size <= 0) {
      return void 0;
    }
    const head = this.root.next;
    head.prev.next = head.next;
    head.next.prev = head.prev;
    --this._size;
    return head.value;
  }
  slice(start, end) {
    const out = new CircularDoublyLinkedList();
    if (this._size <= 0) {
      return out;
    }
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);
    let prev = this.get(start - 1);
    while (start < end) {
      prev = prev.next;
      out.push(prev.value);
      ++start;
    }
    return out;
  }
  splice(start, deleteCount, ...items) {
    const out = new CircularDoublyLinkedList();
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, this._size - start);
    const prev = this.get(start - 1);
    if (deleteCount > 0) {
      const [head, tail] = cut(prev, deleteCount);
      this._size -= deleteCount;
      head.prev = out.root;
      tail.next = out.root;
      out.root.next = head;
      out.root.prev = tail;
      out._size = deleteCount;
    }
    this.append(prev, items);
    return out;
  }
  [Symbol.iterator]() {
    return values(this.root.next, this.root);
  }
  unshift(...values2) {
    const N = values2.length;
    if (N <= 0) {
      return this._size;
    }
    const capacity = this._capacity;
    if (capacity <= 0) {
      this.emitter.emit(BoundedEvent.Overflow, values2);
      return this._size;
    }
    this.prepend(this.root.next, values2);
    return this._size;
  }
  values() {
    return values(this.root.next, this.root);
  }
  /**
   * @internal
   */
  append(tail, values2) {
    const root = this.root;
    const next = tail.next;
    const evicted = [];
    const capacity = this._capacity;
    let size = this._size;
    const N = values2.length;
    for (let i = 0; i < N; ++i) {
      const curr = { prev: tail, value: values2[i] };
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
    next.prev = tail;
    root.next.prev = root;
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }
    this._size = size;
    return tail;
  }
  /**
   * @internal
   */
  get(index) {
    index -= index <= this._size / 2 ? -1 : this._size;
    return get(this.root, index);
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
class CircularLinkedList extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    __publicField(this, "_capacity");
    /**
     * The root of the linked list
     * @internal
     */
    __publicField(this, "root");
    /**
     * The current size of the list (0 \<= size \<= capacity)
     * @internal
     */
    __publicField(this, "_size");
    /**
     * The last node in the linked list.
     * @internal
     */
    __publicField(this, "tail");
    this._capacity = Infinity;
    this.root = { value: void 0 };
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
    const [head, tail, size] = toList$1(capacity);
    this._capacity = size;
    if (size > 0) {
      this.root.next = head;
      this.tail = tail;
      this._size = size;
    }
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
    this._capacity = capacity;
    if (this._size <= capacity) {
      return;
    }
    const diff = this._size - capacity;
    const [head] = cut$1(this.root, diff);
    this._size -= diff;
    if (this._size <= 0) {
      this.tail = this.root;
    }
    this.emitter.emit(BoundedEvent.Overflow, toArray(head));
  }
  at(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    if (++index == this._size) {
      return this.tail.value;
    }
    return get$1(this.root, index).value;
  }
  clear() {
    this._size = 0;
    this.root.next = void 0;
    this.tail = this.root;
  }
  delete(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }
    const prev = get$1(this.root, index);
    prev.next = prev.next.next;
    --this._size;
    if (index == this._size) {
      this.tail = prev;
    }
    return true;
  }
  entries() {
    return entries(this.root.next);
  }
  fill(value, start, end) {
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);
    let node = get$1(this.root, start + 1);
    while (start < end) {
      node.value = value;
      node = node.next;
      ++start;
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
    this.tail = get$1(this.root, --this._size);
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
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    const node = get$1(this.root, index + 1);
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
    --this._size;
    if (this._size <= 0) {
      this.tail = this.root;
    }
    return head.value;
  }
  slice(start, end) {
    const out = new CircularLinkedList();
    if (this._size <= 0) {
      return out;
    }
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);
    let node = get$1(this.root, start);
    while (start < end) {
      node = node.next;
      out.push(node.value);
      ++start;
    }
    return out;
  }
  splice(start, deleteCount, ...items) {
    const out = new CircularLinkedList();
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);
    deleteCount = toInteger(deleteCount, 0);
    deleteCount = clamp(deleteCount, 0, this._size - start);
    let prev = get$1(this.root, start);
    if (deleteCount > 0) {
      const [head, tail] = cut$1(prev, deleteCount);
      this._size -= deleteCount;
      out.root.next = head;
      out.tail = tail;
      out._size = deleteCount;
    }
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
      const prev = get$1(this.root, this._size);
      this.emitter.emit(BoundedEvent.Overflow, toArray(prev.next));
      prev.next = void 0;
      this.tail = prev;
    }
    if (diff > 0) {
      this.emitter.emit(BoundedEvent.Overflow, values2.slice(N));
      values2.length = N;
    }
    const [head, tail] = toList$1(values2);
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
class CircularQueue {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "list");
    this.list = new CircularArrayList(capacity);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularQueue.name;
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
    return this.list.first();
  }
  forEach(callbackfn, thisArg) {
    return this.list.forEach((v, i) => callbackfn.call(thisArg, v, i, this));
  }
  front() {
    return this.list.first();
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
    return this.list.values();
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
class CircularStack {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "list");
    this.list = new CircularArrayList(capacity);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularStack.name;
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
    return this.list.forEach((v, i) => callbackfn.call(thisArg, v, i, this));
  }
  has(value) {
    return this.list.has(value);
  }
  keys() {
    return this.list.keys();
  }
  last() {
    return this.list.last();
  }
  pop() {
    return this.list.pop();
  }
  push(...elems) {
    return this.list.push(...elems);
  }
  [Symbol.iterator]() {
    return this.list.values();
  }
  top() {
    return this.list.last();
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
export {
  BoundedEvent,
  CircularArrayList,
  CircularDeque,
  CircularDoublyLinkedList,
  CircularLinkedDeque,
  CircularLinkedList,
  CircularLinkedQueue,
  CircularLinkedStack,
  CircularMap,
  CircularQueue,
  CircularSet,
  CircularStack
};
//# sourceMappingURL=circle-ds.mjs.map
