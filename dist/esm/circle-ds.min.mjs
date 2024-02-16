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
var W = Object.defineProperty;
var k = (v, o, t) => o in v ? W(v, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : v[o] = t;
var n = (v, o, t) => (k(v, typeof o != "symbol" ? o + "" : o, t), t);
const a = {
  Overflow: "overflow"
}, T = {};
class c {
  constructor(o = new T()) {
    /**
     * The event emitter.
     * @internal
     */
    n(this, "emitter");
    this.emitter = o;
  }
  addListener(o, t) {
    return this.emitter.addListener(o, t), this;
  }
  on(o, t) {
    return this.emitter.on(o, t), this;
  }
  prependListener(o, t) {
    return this.emitter.prependListener(o, t), this;
  }
  removeListener(o, t) {
    return this.emitter.removeListener(o, t), this;
  }
}
const x = 4294967295;
function w(v) {
  return Number.isInteger(v) && v >= 0 && v <= x;
}
function f(v) {
  return v === Number.POSITIVE_INFINITY;
}
function z(v) {
  return typeof v == "number";
}
function d(v) {
  return Number.isSafeInteger(v) && v >= 0;
}
class S extends c {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    n(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    n(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    n(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    n(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    n(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    n(this, "vals");
    if (this._capacity = x, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], t = t ?? 1 / 0, !f(t)) {
      if (z(t)) {
        if (!w(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t, this.isFinite = !0;
        return;
      }
      for (const i of t)
        this.vals.push(i);
      this._capacity = this.vals.length, this.isFinite = !0, this._size = this._capacity;
    }
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this.isFinite ? this._capacity : 1 / 0;
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
    return S.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, f(t))
      t = x, this.isFinite = !1;
    else if (w(t))
      this.isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size < 1 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this.head = 0, this._size = 0, this.next = 0, this.vals.length = 0;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    for (let t = 0; t < this._size; ++t)
      yield [t, this.vals[(this.head + t) % this._capacity]];
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
  forEach(t, i) {
    const s = this._size;
    for (let e = 0; e < s && e < this._size; ++e) {
      const h = this.vals[(this.head + e) % this._capacity];
      t.call(i, h, e, this);
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
  has(t) {
    const i = this._size;
    for (let s = 0; s < i; ++s)
      if (t === this.vals[(this.head + s) % this._capacity])
        return !0;
    return !1;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
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
    if (this._size <= 0)
      return;
    const t = this.next > 0 ? this.next - 1 : this.head + this._size - 1;
    --this._size, this.next = t;
    const i = this.vals[t];
    return this.vals[t] = void 0, i;
  }
  /**
   * Inserts new elements at the end of the deque.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the deque.
   */
  push(...t) {
    const i = t.length;
    if (i < 1)
      return this._size;
    const s = this._capacity;
    if (s < 1)
      return this.emit(t), this._size;
    const e = s - this._size;
    if (e >= i)
      return this._push(t, i), this._size;
    if (!this.isFinite)
      throw this._push(t, e), new Error("Out of memory");
    const h = i - s;
    if (this.evictHead(this.size + h), h > 0)
      this.emit(t.splice(0, h));
    else if (h < 0)
      return this._push(t, i), this._size;
    return this.vals = t, this._size = s, this._size;
  }
  /**
   * Removes the element at the front of the deque.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size <= 0)
      return;
    --this._size;
    const t = this.vals[this.head];
    return this.vals[this.head] = void 0, ++this.head >= this._capacity && (this.head = 0, this.vals.length = this.next), t;
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
  unshift(...t) {
    const i = t.length;
    if (i < 1)
      return this._size;
    const s = this._capacity;
    if (s < 1)
      return this.emit(t), this._size;
    const e = s - this._size;
    if (e >= i)
      return this._unshift(t, i), this._size;
    if (!this.isFinite)
      throw this._unshift(t, e), new Error("Out of memory");
    const h = i - s;
    if (this.evictTail(this.size + h), h > 0)
      this.emit(t.splice(i - h, h));
    else if (h < 0)
      return this._unshift(t, i), this._size;
    return this.vals = t, this._size = s, this._size;
  }
  /**
   * Get the last element in the deque.
   *
   * Alias for {@link last | last()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top() {
    if (!(this._size < 1))
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
    for (let t = 0; t < this._size; ++t)
      yield this.vals[(this.head + t) % this._capacity];
  }
  /**
   * Emit an event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  emit(t) {
    this.emitter.emit(a.Overflow, t);
  }
  /**
   * Removes a given number of elements from the deque.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   *
   * @param count - The number of elements to evict.
   */
  evictHead(t) {
    if (t <= 0)
      return;
    const i = this._capacity - this.head, s = !this.isSequential();
    if (s && i > t) {
      this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
      return;
    }
    if (s) {
      if (this.emit(this.vals.slice(this.head, this.head + i)), this.vals.length = this.next, this.head = 0, this._size -= i, t <= i)
        return;
      t -= i;
    }
    if (t >= this._size) {
      this.emit(this.vals.slice(this.head, this.head + this._size)), this.clear();
      return;
    }
    this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
  }
  /**
   * Removes a given number of elements from the deque.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   *
   * @param count - The number of elements to evict.
   */
  evictTail(t) {
    if (t <= 0)
      return;
    const i = !this.isSequential();
    if (i && this.next > t) {
      this.emit(this.vals.slice(this.next - t, this.next)), this.vals.fill(void 0, this.next - t, this.next), this.next -= t, this._size -= t;
      return;
    }
    if (i && (this.emit(this.vals.slice(0, this.next)), this.vals.fill(void 0, 0, this.next), this._size -= this.next, t -= this.next, this.next = 0, t <= 0))
      return;
    const s = this.head + this._size;
    if (t >= this._size) {
      this.emit(this.vals.slice(this.head, s)), this.clear();
      return;
    }
    this.emit(this.vals.slice(s - t, s)), this.next = s - t, this.vals.length = this.next, this._size -= t;
  }
  /**
   * Grow capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  grow(t) {
    if (this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    if (this._size <= this.head) {
      const i = this._size - this.next;
      this.vals.copyWithin(i, 0, this.next), this.vals.copyWithin(0, this.head, this.head + i), this.vals.length = this._size, this.head = 0, this.next = this._size;
    } else if (this.head + this._size <= t)
      this.vals.length = this.head + this._size, this.vals.copyWithin(this._capacity, 0, this.next), this.vals.fill(void 0, 0, this.next), this.next = (this.head + this._size) % t;
    else {
      const i = t - this._capacity;
      this.vals.length = t, this.vals.copyWithin(this._capacity, 0, i), this.vals.copyWithin(0, i, this.next);
      const s = Math.max(i, this.next - i);
      this.vals.fill(void 0, s, this.next), this.next -= i;
    }
    this._capacity = t;
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
  _push(t, i) {
    const s = this._capacity, e = this.vals;
    let h = this.next;
    for (let r = 0; r < i; ++r)
      e[h] = t[r], ++h >= s && (h = 0);
    this.next = h, this._size += i;
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
  sequentialReset(t) {
    const i = this.head + this._size;
    return i <= t ? (this.vals.length = i, this.next = this.vals.length % t) : this.head >= t ? (this.vals.copyWithin(0, this.head, i), this.vals.length = this._size, this.head = 0, this.next = this._size % t) : (this.vals.copyWithin(0, t, i), this.vals.length = t, this.next = i - t), this._capacity = t, !0;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  shrink(t) {
    if (this.evictHead(this._size - t), this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    const i = this._capacity - t;
    this.vals.copyWithin(this.head - i, this.head, this._capacity), this.vals.length = t, this.head -= i, this._capacity = t;
  }
  /**
   * Append new elements to the collection.
   * @internal
   *
   * @param elems - The elements to append.
   * @param num - The number of elements to append.
   */
  _unshift(t, i) {
    const s = this._capacity, e = this.vals;
    let h = this.head;
    const r = t.length - i;
    for (let l = t.length - 1; l >= r; --l)
      --h < 0 && (h += s), e[h] = t[l];
    this.head = h, this._size += i;
  }
}
class N extends c {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    n(this, "_capacity");
    /**
     * The root of the collection.
     * @internal
     */
    n(this, "root");
    /**
     * The number of elements in the collection.
     * @internal
     */
    n(this, "_size");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.root.next = this.root, this.root.prev = this.root, this._size = 0, t = t ?? 1 / 0, f(t))
      return;
    if (z(t)) {
      if (!d(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    let i = this.root.prev;
    for (const s of t)
      i.next = { next: this.root, prev: i, value: s }, i = i.next, this.root.prev = i, ++this._size;
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
    return N.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, !f(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (this._size <= t) {
      this._capacity = t;
      return;
    }
    const i = [];
    let s = this.root.next;
    do
      i.push(s.value), s = s.next;
    while (--this._size > t);
    this.root.next = s, s.prev = this.root, this._capacity = t, this.emitter.emit(a.Overflow, i);
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this._size = 0, this.root = { value: void 0 }, this.root.next = this.root, this.root.prev = this.root;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield [i, t.value];
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
  forEach(t, i) {
    let s = this.root;
    for (let e = 0; e < this._size; ++e)
      s = s.next, t.call(i, s.value, e, this);
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
  has(t) {
    let i = this.root;
    for (let s = 0; s < this._size; ++s)
      if (i = i.next, i.value === t)
        return !0;
    return !1;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
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
    if (this._size < 1)
      return;
    const t = this.root.prev;
    return this.root.prev = t.prev, t.prev.next = this.root, --this._size, t.value;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...t) {
    const i = this._capacity;
    if (i < 1)
      return this.emitter.emit(a.Overflow, t), this._size;
    const s = t.length, e = this.root, h = [];
    let r = e.prev;
    for (let l = 0; l < s; ++l)
      r.next = { next: e, prev: r, value: t[l] }, r = r.next, this._size < i ? ++this._size : (h.push(e.next.value), e.next = e.next.next);
    return e.prev = r, e.next.prev = e, h.length > 0 && this.emitter.emit(a.Overflow, h), this._size;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size < 1)
      return;
    const t = this.root.next.next, i = t.prev.value;
    return this.root.next = t, t.prev = this.root, --this._size, i;
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
  unshift(...t) {
    if (t.length < 1)
      return this._size;
    const s = this._capacity;
    if (s < 1)
      return this.emitter.emit(a.Overflow, t), this._size;
    const e = this.root, h = [];
    let r = e.next;
    for (let l = t.length - 1; l >= 0; --l)
      r = { next: r, prev: e, value: t[l] }, r.next.prev = r, this._size < s ? ++this._size : (h.push(e.prev.value), e.prev = e.prev.prev);
    return e.next = r, e.prev.next = e, h.length > 0 && this.emitter.emit(a.Overflow, h.reverse()), this._size;
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield t.value;
  }
}
function m(v, o, t) {
  if (o > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return v <= o ? o : v <= t ? v : t;
}
function y(v, o = 0) {
  return v = +v, isNaN(v) ? o : Math.trunc(v);
}
class I extends c {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    n(this, "_capacity");
    /**
     * @internal
     */
    n(this, "root");
    /**
     * @internal
     */
    n(this, "_size");
    if (this._capacity = 1 / 0, this.clear(), t = t ?? 1 / 0, f(t))
      return;
    if (z(t)) {
      if (!d(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    let i = this.root;
    for (const s of t)
      i.next = { prev: i, value: s }, i = i.next, ++this._size;
    i.next = this.root, this.root.prev = i, this._capacity = this._size;
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return I.name;
  }
  set capacity(t) {
    if (t = +t, !f(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (this._size <= t) {
      this._capacity = t;
      return;
    }
    const i = [];
    let s = this.root.next;
    do
      i.push(s.value), s = s.next;
    while (--this._size > t);
    this.root.next = s, s.prev = this.root, this._capacity = t, this.emitter.emit(a.Overflow, i);
  }
  at(t) {
    const i = this.tryIndex(t);
    return i == null ? void 0 : this.getNode(i).value;
  }
  clear() {
    this._size = 0, this.root = { value: void 0 }, this.root.next = this.root, this.root.prev = this.root;
  }
  delete(t) {
    return t = this.tryIndex(t), t == null ? !1 : (this.remove(this.getNode(t)), !0);
  }
  *entries() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield [i, t.value];
  }
  fill(t, i, s) {
    const e = this._size;
    i = y(i, 0), i = m(i, -e, e), i += i >= 0 ? 0 : e, s = y(s, e), s = m(s, -e, e), s += s >= 0 ? 0 : e;
    for (let h = this.getNode(i); i < s; ++i)
      h.value = t, h = h.next;
    return this;
  }
  forEach(t, i) {
    let s = this.root;
    for (let e = 0; e < this._size; ++e)
      s = s.next, t.call(i, s.value, e, this);
  }
  has(t) {
    const i = this._size;
    let s = this.root;
    for (let e = 0; e < i; ++e)
      if (s = s.next, s.value === t)
        return !0;
    return !1;
  }
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
  }
  pop() {
    if (this._size < 1)
      return;
    const t = this.root.prev;
    return this.remove(t), t.value;
  }
  push(...t) {
    return t.length < 1 ? this._size : this._capacity < 1 ? (this.emitter.emit(a.Overflow, t), this._size) : (this.append(this.root.prev, t), this._size);
  }
  set(t, i) {
    const s = this.tryIndex(t);
    if (s == null)
      return;
    const e = this.getNode(s), h = e.value;
    return e.value = i, h;
  }
  shift() {
    if (this._size < 1)
      return;
    const t = this.root.next;
    return this.remove(t), t.value;
  }
  slice(t, i) {
    const s = this._size;
    t = y(t, 0), t = m(t, -s, s), t += t >= 0 ? 0 : s, i = y(i, s), i = m(i, -s, s), i += i >= 0 ? 0 : s;
    const e = new I();
    for (let h = this.getNode(t - 1); t < i; ++t)
      e.push(h.next.value), h = h.next;
    return e;
  }
  splice(t, i, ...s) {
    const e = this._size;
    t = y(t, 0), t = m(t, -e, e), t += t >= 0 ? 0 : e, i = y(i, 0), i = m(i, 0, e - t);
    const h = new I(), r = s.length;
    let l = this.getNode(t - 1);
    const u = Math.min(i, r);
    for (let g = 0; g < u; ++g)
      l = l.next, h.push(l.value), l.value = s[g];
    if (i <= u)
      return this.append(l, s, u), h;
    let _ = h.root.prev;
    l.next.prev = _, _.next = l.next;
    const p = i - u;
    return _ = this.moveRight(l, p), l.next = _.next, _.next.prev = l, this._size -= p, _.next = h.root, h.root.prev = _, h._size += p, h;
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...t) {
    return t.length < 1 ? this._size : this._capacity < 1 ? (this.emitter.emit(a.Overflow, t), this._size) : (this.prepend(this.root.next, t), this._size);
  }
  *values() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield t.value;
  }
  /**
   * @internal
   */
  append(t, i, s = 0) {
    const e = this.root, h = t.next, r = [], l = this._capacity;
    let u = this._size;
    const _ = i.length;
    for (let p = s; p < _; ++p) {
      const g = { prev: t, value: i[p] };
      t.next = g, t = g, u < l ? ++u : (r.push(e.next.value), e.next = e.next.next);
    }
    return t.next = h, h.prev = t, e.next.prev = e, r.length > 0 && this.emitter.emit(a.Overflow, r), this._size = u, t;
  }
  /**
   * @internal
   */
  getNode(t) {
    const i = this.root, s = this._size / 2;
    return t <= s ? this.moveRight(i, t + 1) : this.moveLeft(i, this._size - t);
  }
  /**
   * @internal
   */
  moveLeft(t, i) {
    for (let s = 0; s < i; ++s)
      t = t.prev;
    return t;
  }
  /**
   * @internal
   */
  moveRight(t, i) {
    for (let s = 0; s < i; ++s)
      t = t.next;
    return t;
  }
  /**
   * @internal
   */
  prepend(t, i) {
    const s = this.root, e = t.prev, h = [], r = this._capacity;
    let l = this._size;
    for (let u = i.length - 1; u >= 0; --u) {
      const _ = { next: t, value: i[u] };
      t.prev = _, t = _, l < r ? ++l : (h.push(s.prev.value), s.prev = s.prev.prev);
    }
    return t.prev = e, e.next = t, s.prev.next = s, h.length > 0 && this.emitter.emit(a.Overflow, h.reverse()), this._size = l, t;
  }
  /**
   * @internal
   */
  remove(t) {
    t.prev.next = t.next, t.next.prev = t.prev, --this._size;
  }
  /**
   * @internal
   */
  tryIndex(t) {
    t = +t;
    const i = this._size;
    if (!(!Number.isInteger(t) || t >= i || t < -i))
      return t < 0 ? t + i : t;
  }
}
class E extends c {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    n(this, "_capacity");
    /**
     * The root of the collection.
     * @internal
     */
    n(this, "root");
    /**
     * The number of elements in the collection.
     * @internal
     */
    n(this, "_size");
    /**
     * The tail of the collection.
     * @internal
     */
    n(this, "tail");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.root.next = this.root, this._size = 0, this.tail = this.root, t = t ?? 1 / 0, f(t))
      return;
    if (z(t)) {
      if (!d(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    let i = this.root;
    for (const s of t)
      i.next = { next: this.root, value: s }, i = i.next, ++this._size;
    this.tail = i, i.next = this.root, this._capacity = this._size;
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
    return E.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, !f(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (this._size <= t) {
      this._capacity = t;
      return;
    }
    const i = [];
    let s = this.root.next;
    do
      i.push(s.value), s = s.next;
    while (--this._size > t);
    this.root.next = s, this.tail = this._size > 0 ? this.tail : this.root, this._capacity = t, this.emitter.emit(a.Overflow, i);
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this._size = 0, this.root = { value: void 0 }, this.root.next = this.root, this.tail = this.root;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield [i, t.value];
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
  forEach(t, i) {
    let s = this.root;
    for (let e = 0; e < this._size; ++e)
      s = s.next, t.call(i, s.value, e, this);
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
  has(t) {
    let i = this.root;
    for (let s = 0; s < this._size; ++s)
      if (i = i.next, i.value === t)
        return !0;
    return !1;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...t) {
    const i = this._capacity;
    if (i < 1)
      return this.emitter.emit(a.Overflow, t), this._size;
    const s = t.length, e = this.root, h = [];
    for (let r = 0; r < s; ++r)
      this.tail.next = { next: e, value: t[r] }, this.tail = this.tail.next, this._size < i ? ++this._size : (h.push(e.next.value), e.next = e.next.next);
    return h.length > 0 && this.emitter.emit(a.Overflow, h), this._size;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size < 1)
      return;
    const t = this.root.next;
    return this.root.next = t.next, --this._size < 1 && (this.tail = this.root), t.value;
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
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield t.value;
  }
}
class O extends c {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    n(this, "_capacity");
    /**
     * The root of the collection.
     * @internal
     */
    n(this, "root");
    /**
     * The number of elements in the collection.
     * @internal
     */
    n(this, "_size");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.root.next = this.root, this.root.prev = this.root, this._size = 0, t = t ?? 1 / 0, f(t))
      return;
    if (z(t)) {
      if (!d(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    let i = this.root;
    for (const s of t)
      i.next = { prev: i, value: s }, i = i.next, ++this._size;
    i.next = this.root, this.root.prev = i, this._capacity = this._size;
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
    return O.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, !f(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (this._size <= t) {
      this._capacity = t;
      return;
    }
    const i = [];
    let s = this.root.next;
    do
      i.push(s.value), s = s.next;
    while (--this._size > t);
    this.root.next = s, s.prev = this.root, this._capacity = t, this.emitter.emit(a.Overflow, i);
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this._size = 0, this.root = { value: void 0 }, this.root.next = this.root, this.root.prev = this.root;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield [i, t.value];
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(t, i) {
    let s = this.root;
    for (let e = 0; e < this._size; ++e)
      s = s.next, t.call(i, s.value, e, this);
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
  has(t) {
    let i = this.root;
    for (let s = 0; s < this._size; ++s)
      if (i = i.next, i.value === t)
        return !0;
    return !1;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
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
    if (this._size < 1)
      return;
    const t = this.root.prev;
    return this.root.prev = t.prev, t.prev.next = this.root, --this._size, t.value;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...t) {
    const i = t.length;
    if (i < 1)
      return this._size;
    const s = this._capacity;
    if (s < 1)
      return this.emitter.emit(a.Overflow, t), this._size;
    const e = this.root, h = [];
    let r = e.prev;
    for (let l = 0; l < i; ++l)
      r.next = { next: e, prev: r, value: t[l] }, r = r.next, this._size < s ? ++this._size : (h.push(e.next.value), e.next = e.next.next);
    return e.prev = r, e.next.prev = e, h.length > 0 && this.emitter.emit(a.Overflow, h), this._size;
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
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield t.value;
  }
}
class R extends c {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    n(this, "_capacity");
    /**
     * The internal map.
     * @internal
     */
    n(this, "map");
    if (this._capacity = 1 / 0, this.map = /* @__PURE__ */ new Map(), t = t ?? 1 / 0, !f(t)) {
      if (z(t)) {
        if (!d(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t;
        return;
      }
      this.map = new Map(t), this._capacity = this.map.size;
    }
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
    return R.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(t) {
    if (t = +t, !f(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const e = Array.from(this.map);
      this.clear(), this.emitter.emit(a.Overflow, e);
      return;
    }
    const i = [], s = this.map.entries();
    for (let e = this.size - t; e > 0; --e) {
      const h = s.next().value;
      this.map.delete(h[0]), i.push(h);
    }
    this.emitter.emit(a.Overflow, i);
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
  delete(t) {
    return this.map.delete(t);
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
  forEach(t, i) {
    for (const [s, e] of this.map.entries())
      t.call(i, e, s, this);
  }
  /**
   * Returns the associated value of the given key from the map.
   *
   * If the associated value is an object, then you will get a reference to that object; any change made to the object will effectively modify it inside the map.
   *
   * @returns the value associated with the specified key, or `undefined` if no value is associated.
   */
  get(t) {
    return this.map.get(t);
  }
  /**
   * Determines whether a given value is in the map.
   *
   * @param key - The key to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(t) {
    return this.map.has(t);
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
  set(t, i) {
    if (this.capacity < 1)
      return this.emitter.emit(a.Overflow, [[t, i]]), this;
    const s = [];
    if (!this.map.delete(t) && this.size >= this.capacity) {
      const e = this.map.entries().next().value;
      this.map.delete(e[0]), s.push(e);
    }
    return this.map.set(t, i), s.length > 0 && this.emitter.emit(a.Overflow, s), this;
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
class q extends c {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    n(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    n(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     * @internal
     */
    n(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    n(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    n(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    n(this, "vals");
    if (this._capacity = x, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], t = t ?? 1 / 0, !f(t)) {
      if (z(t)) {
        if (!w(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t, this.isFinite = !0;
        return;
      }
      for (const i of t)
        this.vals.push(i);
      this._capacity = this.vals.length, this.isFinite = !0, this._size = this._capacity;
    }
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this.isFinite ? this._capacity : 1 / 0;
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
    return q.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, f(t))
      t = x, this.isFinite = !1;
    else if (w(t))
      this.isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size < 1 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this.head = 0, this._size = 0, this.next = 0, this.vals.length = 0;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    for (let t = 0; t < this._size; ++t)
      yield [t, this.vals[(this.head + t) % this._capacity]];
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
  forEach(t, i) {
    const s = this._size;
    for (let e = 0; e < s && e < this._size; ++e) {
      const h = this.vals[(this.head + e) % this._capacity];
      t.call(i, h, e, this);
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
  has(t) {
    const i = this._size;
    for (let s = 0; s < i; ++s)
      if (t === this.vals[(this.head + s) % this._capacity])
        return !0;
    return !1;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
  }
  /**
   * Inserts new elements at the end of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the queue.
   */
  push(...t) {
    const i = t.length;
    if (i < 1)
      return this._size;
    const s = this._capacity;
    if (s < 1)
      return this.emit(t), this._size;
    const e = s - this._size;
    if (e >= i)
      return this._push(t, i), this._size;
    if (!this.isFinite)
      throw this._push(t, e), new Error("Out of memory");
    const h = i - s;
    if (this.evict(this.size + h), h > 0)
      this.emit(t.splice(0, h));
    else if (h < 0)
      return this._push(t, i), this._size;
    return this.vals = t, this._size = s, this._size;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size <= 0)
      return;
    --this._size;
    const t = this.vals[this.head];
    return this.vals[this.head] = void 0, ++this.head >= this._capacity && (this.head = 0, this.vals.length = this.next), t;
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
    for (let t = 0; t < this._size; ++t)
      yield this.vals[(this.head + t) % this._capacity];
  }
  /**
   * Emit an event containing the items evicted from the collection.
   * @internal
   *
   * @param evicted - The items evicted from the collection.
   */
  emit(t) {
    this.emitter.emit(a.Overflow, t);
  }
  /**
   * Removes a given number of elements from the queue.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   * @internal
   *
   * @param count - The number of elements to evict.
   */
  evict(t) {
    if (t <= 0)
      return;
    const i = this._capacity - this.head, s = !this.isSequential();
    if (s && i > t) {
      this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
      return;
    }
    if (s) {
      if (this.emit(this.vals.slice(this.head, this.head + i)), this.vals.length = this.next, this.head = 0, this._size -= i, t <= i)
        return;
      t -= i;
    }
    if (t >= this._size) {
      this.emit(this.vals.slice(this.head, this.head + this._size)), this.clear();
      return;
    }
    this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
  }
  /**
   * Grow capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  grow(t) {
    if (this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    if (this._size <= this.head) {
      const i = this._size - this.next;
      this.vals.copyWithin(i, 0, this.next), this.vals.copyWithin(0, this.head, this.head + i), this.vals.length = this._size, this.head = 0, this.next = this._size;
    } else if (this.head + this._size <= t)
      this.vals.length = this.head + this._size, this.vals.copyWithin(this._capacity, 0, this.next), this.vals.fill(void 0, 0, this.next), this.next = (this.head + this._size) % t;
    else {
      const i = t - this._capacity;
      this.vals.length = t, this.vals.copyWithin(this._capacity, 0, i), this.vals.copyWithin(0, i, this.next);
      const s = Math.max(i, this.next - i);
      this.vals.fill(void 0, s, this.next), this.next -= i;
    }
    this._capacity = t;
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
  _push(t, i) {
    const s = this._capacity, e = this.vals;
    let h = this.next;
    for (let r = 0; r < i; ++r)
      e[h] = t[r], ++h >= s && (h = 0);
    this.next = h, this._size += i;
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
  sequentialReset(t) {
    const i = this.head + this._size;
    return i <= t ? (this.vals.length = i, this.next = this.vals.length % t) : this.head >= t ? (this.vals.copyWithin(0, this.head, i), this.vals.length = this._size, this.head = 0, this.next = this._size % t) : (this.vals.copyWithin(0, t, i), this.vals.length = t, this.next = i - t), this._capacity = t, !0;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  shrink(t) {
    if (this.evict(this._size - t), this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    const i = this._capacity - t;
    this.vals.copyWithin(this.head - i, this.head, this._capacity), this.vals.length = t, this.head -= i, this._capacity = t;
  }
}
class F extends c {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    n(this, "_capacity");
    /**
     * The internal set.
     * @internal
     */
    n(this, "set");
    if (this._capacity = 1 / 0, this.set = /* @__PURE__ */ new Set(), t = t ?? 1 / 0, !f(t)) {
      if (z(t)) {
        if (!d(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t;
        return;
      }
      this.set = new Set(t), this._capacity = this.set.size;
    }
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
    return F.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(t) {
    if (t = +t, !f(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const e = Array.from(this.set);
      this.clear(), this.emitter.emit(a.Overflow, e);
      return;
    }
    const i = [], s = this.set.values();
    for (let e = this.size - t; e > 0; --e) {
      const h = s.next().value;
      this.set.delete(h), i.push(h);
    }
    this.emitter.emit(a.Overflow, i);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this.emitter.emit(a.Overflow, [t]), this;
    const i = [];
    if (!this.set.delete(t) && this.size >= this.capacity) {
      const s = this.set.values().next().value;
      this.set.delete(s), i.push(s);
    }
    return this.set.add(t), i.length > 0 && this.emitter.emit(a.Overflow, i), this;
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
  delete(t) {
    return this.set.delete(t);
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
  forEach(t, i) {
    for (const s of this.set.keys())
      t.call(i, s, s, this);
  }
  /**
   * Determines whether a given value is in the set.
   *
   * @param value - The value to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(t) {
    return this.set.has(t);
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
class b extends c {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    n(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    n(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    n(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    n(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    n(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    n(this, "vals");
    if (this._capacity = x, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], t = t ?? 1 / 0, !f(t)) {
      if (z(t)) {
        if (!w(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t, this.isFinite = !0;
        return;
      }
      for (const i of t)
        this.vals.push(i);
      this._capacity = this.vals.length, this.isFinite = !0, this._size = this._capacity;
    }
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this.isFinite ? this._capacity : 1 / 0;
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
    return b.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, f(t))
      t = x, this.isFinite = !1;
    else if (w(t))
      this.isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size < 1 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  /**
   * Remove all elements from the collection.
   */
  clear() {
    this.head = 0, this._size = 0, this.next = 0, this.vals.length = 0;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    for (let t = 0; t < this._size; ++t)
      yield [t, this.vals[(this.head + t) % this._capacity]];
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(t, i) {
    const s = this._size;
    for (let e = 0; e < s && e < this._size; ++e) {
      const h = this.vals[(this.head + e) % this._capacity];
      t.call(i, h, e, this);
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
  has(t) {
    const i = this._size;
    for (let s = 0; s < i; ++s)
      if (t === this.vals[(this.head + s) % this._capacity])
        return !0;
    return !1;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
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
    if (this._size <= 0)
      return;
    const t = this.next > 0 ? this.next - 1 : this.head + this._size - 1;
    --this._size, this.next = t;
    const i = this.vals[t];
    return this.vals[t] = void 0, i;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the stack.
   */
  push(...t) {
    const i = t.length;
    if (i < 1)
      return this._size;
    const s = this._capacity;
    if (s < 1)
      return this.emit(t), this._size;
    const e = s - this._size;
    if (e >= i)
      return this._push(t, i), this._size;
    if (!this.isFinite)
      throw this._push(t, e), new Error("Out of memory");
    const h = i - s;
    if (this.evict(this.size + h), h > 0)
      this.emit(t.splice(0, h));
    else if (h < 0)
      return this._push(t, i), this._size;
    return this.vals = t, this._size = s, this._size;
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
    if (!(this._size < 1))
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
    for (let t = 0; t < this._size; ++t)
      yield this.vals[(this.head + t) % this._capacity];
  }
  /**
   * Emit an event containing the items evicted from the collection.
   * @internal
   *
   * @param evicted - The items evicted from the collection.
   */
  emit(t) {
    this.emitter.emit(a.Overflow, t);
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
  evict(t) {
    if (t <= 0)
      return;
    const i = this._capacity - this.head, s = !this.isSequential();
    if (s && i > t) {
      this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
      return;
    }
    if (s) {
      if (this.emit(this.vals.slice(this.head, this.head + i)), this.vals.length = this.next, this.head = 0, this._size -= i, t <= i)
        return;
      t -= i;
    }
    if (t >= this._size) {
      this.emit(this.vals.slice(this.head, this.head + this._size)), this.clear();
      return;
    }
    this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
  }
  /**
   * Grow capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  grow(t) {
    if (this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    if (this._size <= this.head) {
      const i = this._size - this.next;
      this.vals.copyWithin(i, 0, this.next), this.vals.copyWithin(0, this.head, this.head + i), this.vals.length = this._size, this.head = 0, this.next = this._size;
    } else if (this.head + this._size <= t)
      this.vals.length = this.head + this._size, this.vals.copyWithin(this._capacity, 0, this.next), this.vals.fill(void 0, 0, this.next), this.next = (this.head + this._size) % t;
    else {
      const i = t - this._capacity;
      this.vals.length = t, this.vals.copyWithin(this._capacity, 0, i), this.vals.copyWithin(0, i, this.next);
      const s = Math.max(i, this.next - i);
      this.vals.fill(void 0, s, this.next), this.next -= i;
    }
    this._capacity = t;
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
  _push(t, i) {
    const s = this._capacity, e = this.vals;
    let h = this.next;
    for (let r = 0; r < i; ++r)
      e[h] = t[r], ++h >= s && (h = 0);
    this.next = h, this._size += i;
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
  sequentialReset(t) {
    const i = this.head + this._size;
    return i <= t ? (this.vals.length = i, this.next = this.vals.length % t) : this.head >= t ? (this.vals.copyWithin(0, this.head, i), this.vals.length = this._size, this.head = 0, this.next = this._size % t) : (this.vals.copyWithin(0, t, i), this.vals.length = t, this.next = i - t), this._capacity = t, !0;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  shrink(t) {
    if (this.evict(this._size - t), this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    const i = this._capacity - t;
    this.vals.copyWithin(this.head - i, this.head, this._capacity), this.vals.length = t, this.head -= i, this._capacity = t;
  }
}
export {
  a as BoundedEvent,
  S as CircularDeque,
  N as CircularLinkedDeque,
  I as CircularLinkedList,
  E as CircularLinkedQueue,
  O as CircularLinkedStack,
  R as CircularMap,
  q as CircularQueue,
  F as CircularSet,
  b as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
