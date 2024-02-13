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
class CircularDeque extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
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
   *  @returns the number of elements in the collection.
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
   *
   * @returns `true` if the deque is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this.head < this.next || this.next < 1;
  }
  /**
   * Append new elements to the collection.
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
class CircularLinkedDeque extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    __publicField(this, "_capacity");
    /**
     * The root of the collection.
     * @internal
     */
    __publicField(this, "root");
    /**
     * The number of elements in the collection.
     * @internal
     */
    __publicField(this, "_size");
    this._capacity = Infinity;
    this.root = { value: void 0 };
    this.root.next = this.root;
    this.root.prev = this.root;
    this._size = 0;
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
    let tail = this.root.prev;
    for (const value of capacity) {
      tail.next = { next: this.root, prev: tail, value };
      tail = tail.next;
      this.root.prev = tail;
      ++this._size;
    }
    this._capacity = this._size;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return CircularLinkedDeque.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
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
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this._size = 0;
    this.root = { value: void 0 };
    this.root.next = this.root;
    this.root.prev = this.root;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield [i, node.value];
    }
  }
  /**
   * Get the first element in the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first() {
    return this.root.next.value;
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
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }
  /**
   * Get the element at the front of the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  front() {
    return this.root.next.value;
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
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      if (node.value === value) {
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
    for (let i = 0; i < this._size; ++i) {
      yield i;
    }
  }
  /**
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last() {
    return this.root.prev.value;
  }
  /**
   * Removes the top element from the stack and returns it.
   *
   * @returns the top element, or `undefined` if empty.
   */
  pop() {
    if (this._size < 1) {
      return void 0;
    }
    const node = this.root.prev;
    this.root.prev = node.prev;
    node.prev.next = this.root;
    --this._size;
    return node.value;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...elems) {
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emitter.emit(BoundedEvent.Overflow, elems);
      return this._size;
    }
    const N = elems.length;
    const root = this.root;
    const evicted = [];
    let tail = root.prev;
    for (let i = 0; i < N; ++i) {
      tail.next = { next: root, prev: tail, value: elems[i] };
      tail = tail.next;
      if (this._size < capacity) {
        ++this._size;
      } else {
        evicted.push(root.next.value);
        root.next = root.next.next;
      }
    }
    root.prev = tail;
    root.next.prev = root;
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }
    return this._size;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size < 1) {
      return void 0;
    }
    const head = this.root.next.next;
    const value = head.prev.value;
    this.root.next = head;
    head.prev = this.root;
    --this._size;
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
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top() {
    return this.root.prev.value;
  }
  /**
   * Inserts new elements at the front of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  unshift(...elems) {
    const capacity = this._capacity;
    if (capacity < 1) {
      this.emitter.emit(BoundedEvent.Overflow, elems);
      return this._size;
    }
    const root = this.root;
    const evicted = [];
    let head = root.next;
    for (let i = elems.length - 1; i >= 0; --i) {
      head = { next: head, prev: root, value: elems[i] };
      head.next.prev = head;
      if (this._size < capacity) {
        ++this._size;
      } else {
        evicted.push(root.prev.value);
        root.prev = root.prev.prev;
      }
    }
    root.next = head;
    root.prev.next = root;
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted.reverse());
    }
    return this._size;
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values() {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield node.value;
    }
  }
}
class CircularLinkedQueue extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    __publicField(this, "_capacity");
    /**
     * The root of the collection.
     * @internal
     */
    __publicField(this, "root");
    /**
     * The number of elements in the collection.
     * @internal
     */
    __publicField(this, "_size");
    /**
     * The tail of the collection.
     * @internal
     */
    __publicField(this, "tail");
    this._capacity = Infinity;
    this.root = { value: void 0 };
    this.root.next = this.root;
    this._size = 0;
    this.tail = this.root;
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
      tail.next = { next: this.root, value };
      tail = tail.next;
      ++this._size;
    }
    this.tail = tail;
    tail.next = this.root;
    this._capacity = this._size;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return CircularLinkedQueue.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
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
    this.tail = this._size > 0 ? this.tail : this.root;
    this._capacity = capacity;
    this.emitter.emit(BoundedEvent.Overflow, items);
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this._size = 0;
    this.root = { value: void 0 };
    this.root.next = this.root;
    this.tail = this.root;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield [i, node.value];
    }
  }
  /**
   * Get the first element in the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first() {
    return this.root.next.value;
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
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }
  /**
   * Get the element at the front of the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  front() {
    return this.root.next.value;
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
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      if (node.value === value) {
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
    for (let i = 0; i < this._size; ++i) {
      yield i;
    }
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...elems) {
    const capacity = this._capacity;
    if (capacity < 1) {
      return this._size;
    }
    const N = elems.length;
    const root = this.root;
    const evicted = [];
    for (let i = 0; i < N; ++i) {
      this.tail.next = { next: root, value: elems[i] };
      this.tail = this.tail.next;
      if (this._size < capacity) {
        ++this._size;
      } else {
        evicted.push(root.next.value);
        root.next = root.next.next;
      }
    }
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }
    return this._size;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size < 1) {
      return void 0;
    }
    const head = this.root.next;
    this.root.next = head.next;
    if (--this._size < 1) {
      this.tail = this.root;
    }
    return head.value;
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
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield node.value;
    }
  }
}
class CircularLinkedStack extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    __publicField(this, "_capacity");
    /**
     * The root of the collection.
     * @internal
     */
    __publicField(this, "root");
    /**
     * The number of elements in the collection.
     * @internal
     */
    __publicField(this, "_size");
    this._capacity = Infinity;
    this.root = { value: void 0 };
    this.root.next = this.root;
    this.root.prev = this.root;
    this._size = 0;
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
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return CircularLinkedStack.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
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
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this._size = 0;
    this.root = { value: void 0 };
    this.root.next = this.root;
    this.root.prev = this.root;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield [i, node.value];
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
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
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
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      if (node.value === value) {
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
    for (let i = 0; i < this._size; ++i) {
      yield i;
    }
  }
  /**
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last() {
    return this.root.prev.value;
  }
  /**
   * Removes the top element from the stack and returns it.
   *
   * @returns the top element, or `undefined` if empty.
   */
  pop() {
    if (this._size < 1) {
      return void 0;
    }
    const node = this.root.prev;
    this.root.prev = node.prev;
    node.prev.next = this.root;
    --this._size;
    return node.value;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...elems) {
    const capacity = this._capacity;
    if (capacity < 1) {
      return this._size;
    }
    const N = elems.length;
    const root = this.root;
    const evicted = [];
    let tail = root.prev;
    for (let i = 0; i < N; ++i) {
      tail.next = { next: root, prev: tail, value: elems[i] };
      tail = tail.next;
      if (this._size < capacity) {
        ++this._size;
      } else {
        evicted.push(root.next.value);
        root.next = root.next.next;
      }
    }
    root.prev = tail;
    root.next.prev = root;
    if (evicted.length > 0) {
      this.emitter.emit(BoundedEvent.Overflow, evicted);
    }
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
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top() {
    return this.root.prev.value;
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values() {
    let node = this.root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      yield node.value;
    }
  }
}
class CircularMap extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
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
    for (const [key, value] of capacity) {
      this.map.set(key, value);
    }
    this._capacity = this.map.size;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of values in the map.
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
   *  @returns the number of elements in the collection.
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
   *
   * @returns `true` if the queue is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this.head < this.next || this.next < 1;
  }
  /**
   * Append new elements to the collection.
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
    for (const value of capacity) {
      this.set.add(value);
    }
    this._capacity = this.set.size;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of values in the set.
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
   *  @returns the number of elements in the collection.
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
   *
   * @param evicted - The items evicted from the collection.
   */
  emit(evicted) {
    this.emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * Removes a given number of elements from the stack.
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
   *
   * @returns `true` if the stack is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this.head < this.next || this.next < 1;
  }
  /**
   * Append new elements to the collection.
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
export {
  BoundedEvent,
  CircularDeque,
  CircularLinkedDeque,
  CircularLinkedQueue,
  CircularLinkedStack,
  CircularMap,
  CircularQueue,
  CircularSet,
  CircularStack
};
//# sourceMappingURL=circle-ds.mjs.map
