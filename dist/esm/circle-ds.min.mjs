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
var P = Object.defineProperty;
var X = (r, h, t) => h in r ? P(r, h, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[h] = t;
var a = (r, h, t) => (X(r, typeof h != "symbol" ? h + "" : h, t), t);
const u = {
  Overflow: "overflow"
}, j = {};
class y {
  constructor(h = new j()) {
    /**
     * The event emitter.
     * @internal
     */
    a(this, "emitter");
    this.emitter = h;
  }
  addListener(h, t) {
    return this.emitter.addListener(h, t), this;
  }
  on(h, t) {
    return this.emitter.on(h, t), this;
  }
  prependListener(h, t) {
    return this.emitter.prependListener(h, t), this;
  }
  removeListener(h, t) {
    return this.emitter.removeListener(h, t), this;
  }
}
const m = 4294967295;
function E(r) {
  return Number.isInteger(r) && r >= 0 && r <= m;
}
function c(r) {
  return r === Number.POSITIVE_INFINITY;
}
function w(r) {
  return typeof r == "number";
}
function g(r) {
  return Number.isSafeInteger(r) && r >= 0;
}
class k extends y {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    a(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    a(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    a(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    a(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    a(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    a(this, "vals");
    if (this._capacity = m, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], t = t ?? 1 / 0, !c(t)) {
      if (w(t)) {
        if (!E(t))
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
   * @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return k.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, c(t))
      t = m, this.isFinite = !1;
    else if (E(t))
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
      const n = this.vals[(this.head + e) % this._capacity];
      t.call(i, n, e, this);
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
    const n = i - s;
    if (this.evictHead(this.size + n), n > 0)
      this.emit(t.splice(0, n));
    else if (n < 0)
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
    const n = i - s;
    if (this.evictTail(this.size + n), n > 0)
      this.emit(t.splice(i - n, n));
    else if (n < 0)
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
    this.emitter.emit(u.Overflow, t);
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
    let n = this.next;
    for (let l = 0; l < i; ++l)
      e[n] = t[l], ++n >= s && (n = 0);
    this.next = n, this._size += i;
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
    let n = this.head;
    const l = t.length - i;
    for (let o = t.length - 1; o >= l; --o)
      --n < 0 && (n += s), e[n] = t[o];
    this.head = n, this._size += i;
  }
}
function q(r, h) {
  if (h <= 0)
    return [void 0, void 0];
  const t = r.next, i = x(t, h - 1);
  return r.next = i.next, i.next = void 0, [t, i];
}
function* L(r, h) {
  for (let t = 0; r != h; ++t)
    yield [t, r.value], r = r.next;
}
function x(r, h) {
  if (!(h < 0)) {
    for (let t = 0; r != null && t < h; ++t)
      r = r.next;
    return r;
  }
}
function T(r, h, t) {
  for (; r != t; ) {
    if (r.value === h)
      return !0;
    r = r.next;
  }
  return !1;
}
function* M(r, h) {
  for (let t = 0; r != h; ++t)
    yield t, r = r.next;
}
function F(r, h) {
  const t = [];
  for (; r != h; )
    t.push(r.value), r = r.next;
  return t;
}
function b(r) {
  const h = {};
  let t = 0, i = h;
  for (const s of r)
    i.next = { value: s }, i = i.next, ++t;
  return h.next === void 0 ? [void 0, void 0, 0] : [h.next, i, t];
}
function* R(r, h) {
  for (let t = 0; r != h; ++t)
    yield r.value, r = r.next;
}
function J(r, h) {
  if (h <= 0)
    return [void 0, void 0];
  const [t, i] = q(r, h);
  return t.prev = void 0, r.next != null && (r.next.prev = r), [t, i];
}
function W(r, h) {
  if (h >= 0)
    return x(r, h);
  for (let t = 0; r != null && t > h; --t)
    r = r.prev;
  return r;
}
function K(r) {
  const h = {};
  let t = 0, i = h;
  for (const s of r)
    i.next = { prev: i, value: s }, i = i.next, ++t;
  return t <= 0 ? [void 0, void 0, 0] : (h.next.prev = void 0, [h.next, i, t]);
}
function v(r, h, t = 0) {
  return r >= t ? r : r + h;
}
function z(r, h, t) {
  if (h > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return r <= h ? h : r <= t ? r : t;
}
function S(r, h, t) {
  return r >= h && r < t;
}
function _(r, h = 0) {
  return r = +r, isNaN(r) ? h : Math.trunc(r);
}
class I extends y {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    a(this, "_capacity");
    /**
     * The root of the linked list
     * @internal
     */
    a(this, "root");
    /**
     * The current size of the list (0 \<= size \<= capacity)
     * @internal
     */
    a(this, "_size");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, c(t))
      return;
    if (w(t)) {
      if (!g(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    const [i, s, e] = K(t);
    this._capacity = e, e > 0 && (this.root.next = i, this.root.prev = s, i.prev = this.root, s.next = this.root, this._size = e);
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
    if (t = +t, !c(t) && !g(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [s, e] = J(this.root, i);
    this._size -= i, this.emitter.emit(u.Overflow, F(s, e.next));
  }
  at(t) {
    if (t = v(_(t, -1 / 0), this._size), !!S(t, 0, this._size))
      return this.get(t).value;
  }
  clear() {
    this._size = 0, this.root.next = this.root, this.root.prev = this.root;
  }
  delete(t) {
    if (t = v(_(t, -1 / 0), this._size), !S(t, 0, this._size))
      return !1;
    const i = this.get(t);
    return i.prev.next = i.next, i.next.prev = i.prev, --this._size, !0;
  }
  entries() {
    return L(this.root.next, this.root);
  }
  fill(t, i, s) {
    i = _(i, 0), i = z(v(i, this._size), 0, this._size), s = _(s, this._size), s = z(v(s, this._size), 0, this._size);
    let e = this.get(i);
    for (; i < s; )
      e.value = t, e = e.next, ++i;
    return this;
  }
  forEach(t, i) {
    let s = this.root;
    for (let e = 0; e < this._size; ++e)
      s = s.next, t.call(i, s.value, e, this);
  }
  has(t) {
    return T(this.root.next, t, this.root);
  }
  keys() {
    return M(this.root.next, this.root);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this.root.prev;
    return t.prev.next = t.next, t.next.prev = t.prev, --this._size, t.value;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this.emitter.emit(u.Overflow, t), this._size) : (this.append(this.root.prev, t), this._size);
  }
  set(t, i) {
    if (t = v(_(t, -1 / 0), this._size), !S(t, 0, this._size))
      return;
    const s = this.get(t), e = s.value;
    return s.value = i, e;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this.root.next;
    return t.prev.next = t.next, t.next.prev = t.prev, --this._size, t.value;
  }
  slice(t, i) {
    const s = new I();
    if (this._size <= 0)
      return s;
    t = _(t, 0), t = z(v(t, this._size), 0, this._size), i = _(i, this._size), i = z(v(i, this._size), 0, this._size);
    let e = this.get(t - 1);
    for (; t < i; )
      e = e.next, s.push(e.value), ++t;
    return s;
  }
  splice(t, i, ...s) {
    const e = new I();
    if (this._size <= 0)
      return e;
    t = _(t, 0), t = z(v(t, this._size), 0, this._size), i = _(i, 0), i = z(i, 0, this._size - t);
    const n = s.length;
    let l = this.get(t - 1);
    const o = Math.min(i, n);
    for (let d = 0; d < o; ++d)
      l = l.next, e.push(l.value), l.value = s[d];
    if (i <= o)
      return this.append(l, s, o), e;
    let f = e.root.prev;
    l.next.prev = f, f.next = l.next;
    const p = i - o;
    return f = W(l, p), l.next = f.next, l.next.prev = l, this._size -= p, f.next = e.root, e.root.prev = f, e._size += p, e;
  }
  [Symbol.iterator]() {
    return R(this.root.next, this.root);
  }
  unshift(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this.emitter.emit(u.Overflow, t), this._size) : (this.prepend(this.root.next, t), this._size);
  }
  values() {
    return R(this.root.next, this.root);
  }
  /**
   * @internal
   */
  append(t, i, s = 0) {
    const e = this.root, n = t.next, l = [], o = this._capacity;
    let f = this._size;
    const p = i.length;
    for (let d = s; d < p; ++d) {
      const N = { prev: t, value: i[d] };
      t.next = N, t = N, f < o ? ++f : (l.push(e.next.value), e.next = e.next.next);
    }
    return t.next = n, n.prev = t, e.next.prev = e, l.length > 0 && this.emitter.emit(u.Overflow, l), this._size = f, t;
  }
  /**
   * @internal
   */
  get(t) {
    return t -= t <= this._size / 2 ? -1 : this._size, W(this.root, t);
  }
  /**
   * @internal
   */
  prepend(t, i) {
    const s = this.root, e = t.prev, n = [], l = this._capacity;
    let o = this._size;
    for (let f = i.length - 1; f >= 0; --f) {
      const p = { next: t, value: i[f] };
      t.prev = p, t = p, o < l ? ++o : (n.push(s.prev.value), s.prev = s.prev.prev);
    }
    return t.prev = e, e.next = t, s.prev.next = s, n.length > 0 && this.emitter.emit(u.Overflow, n.reverse()), this._size = o, t;
  }
}
class A {
  constructor(h) {
    /**
     * @internal
     */
    a(this, "list");
    this.list = new I(h);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return A.name;
  }
  set capacity(h) {
    this.list.capacity = h;
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
  forEach(h, t) {
    this.list.forEach((i, s) => h.call(t, i, s, this), t);
  }
  has(h) {
    return this.list.has(h);
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
  push(...h) {
    return this.list.push(...h);
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
  unshift(...h) {
    return this.list.unshift(...h);
  }
  values() {
    return this.list.values();
  }
  addListener(h, t) {
    return this.list.addListener(h, t), this;
  }
  on(h, t) {
    return this.list.on(h, t), this;
  }
  prependListener(h, t) {
    return this.list.prependListener(h, t), this;
  }
  removeListener(h, t) {
    return this.list.removeListener(h, t), this;
  }
}
class O extends y {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    a(this, "_capacity");
    /**
     * The root of the linked list
     * @internal
     */
    a(this, "root");
    /**
     * The current size of the list (0 \<= size \<= capacity)
     * @internal
     */
    a(this, "_size");
    /**
     * The last node in the linked list.
     * @internal
     */
    a(this, "tail");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, c(t))
      return;
    if (w(t)) {
      if (!g(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    const [i, s, e] = b(t);
    this._capacity = e, e > 0 && (this.root.next = i, this.tail = s, this._size = e);
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return O.name;
  }
  set capacity(t) {
    if (t = +t, !c(t) && !g(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [s] = q(this.root, i);
    this._size -= i, this._size <= 0 && (this.tail = this.root), this.emitter.emit(u.Overflow, F(s));
  }
  at(t) {
    if (t = v(_(t, -1 / 0), this._size), !!S(t, 0, this._size))
      return ++t == this._size ? this.tail.value : x(this.root, t).value;
  }
  clear() {
    this._size = 0, this.root.next = void 0, this.tail = this.root;
  }
  delete(t) {
    if (t = v(_(t, -1 / 0), this._size), !S(t, 0, this._size))
      return !1;
    const i = x(this.root, t);
    return i.next = i.next.next, --this._size, t == this._size && (this.tail = i), !0;
  }
  entries() {
    return L(this.root.next);
  }
  fill(t, i, s) {
    i = _(i, 0), i = z(v(i, this._size), 0, this._size), s = _(s, this._size), s = z(v(s, this._size), 0, this._size);
    let e = x(this.root, i + 1);
    for (; i < s; )
      e.value = t, e = e.next, ++i;
    return this;
  }
  forEach(t, i) {
    let s = this.root;
    for (let e = 0; e < this._size; ++e)
      s = s.next, t.call(i, s.value, e, this);
  }
  has(t) {
    return T(this.root.next, t);
  }
  keys() {
    return M(this.root.next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this.tail.value;
    return this.tail = x(this.root, --this._size), this.tail.next = void 0, t;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this.emitter.emit(u.Overflow, t), this._size) : (this.tail = this.append(this.tail, t), this._size);
  }
  set(t, i) {
    if (t = v(_(t, -1 / 0), this._size), !S(t, 0, this._size))
      return;
    const s = x(this.root, t + 1), e = s.value;
    return s.value = i, e;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this.root.next;
    return this.root.next = t.next, --this._size, this._size <= 0 && (this.tail = this.root), t.value;
  }
  slice(t, i) {
    const s = new O();
    if (this._size <= 0)
      return s;
    t = _(t, 0), t = z(v(t, this._size), 0, this._size), i = _(i, this._size), i = z(v(i, this._size), 0, this._size);
    let e = x(this.root, t);
    for (; t < i; )
      e = e.next, s.push(e.value), ++t;
    return s;
  }
  splice(t, i, ...s) {
    const e = new O();
    if (this._size <= 0)
      return e;
    t = _(t, 0), t = z(v(t, this._size), 0, this._size), i = _(i, 0), i = z(i, 0, this._size - t);
    let n = x(this.root, t);
    const [l, o] = q(n, i);
    return this._size -= i, e.root.next = l, e.tail = o ?? e.root, e._size = i, n = this.append(n, s), n.next == null && (this.tail = n), e;
  }
  [Symbol.iterator]() {
    return R(this.root.next);
  }
  unshift(...t) {
    let i = t.length;
    if (i <= 0)
      return this._size;
    const s = this._capacity;
    if (s <= 0)
      return this.emitter.emit(u.Overflow, t), this._size;
    const e = i <= s ? 0 : i - s;
    if (i -= e, this._size + i > s) {
      this._size = s - i;
      const o = x(this.root, this._size);
      this.emitter.emit(u.Overflow, F(o.next)), o.next = void 0, this.tail = o;
    }
    e > 0 && (this.emitter.emit(u.Overflow, t.slice(i)), t.length = i);
    const [n, l] = b(t);
    return l.next = this.root.next, this.root.next = n, this._size <= 0 && (this.tail = l), this._size += i, this._size;
  }
  values() {
    return R(this.root.next);
  }
  /**
   * @internal
   */
  append(t, i, s = 0) {
    const e = this.root, n = t.next, l = [], o = this._capacity;
    let f = this._size;
    const p = i.length;
    for (let d = s; d < p; ++d) {
      const N = { value: i[d] };
      t.next = N, t = N, f < o ? ++f : (l.push(e.next.value), e.next = e.next.next);
    }
    return t.next = n, l.length > 0 && this.emitter.emit(u.Overflow, l), this._size = f, t;
  }
}
class H {
  constructor(h) {
    /**
     * @internal
     */
    a(this, "list");
    this.list = new O(h);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return H.name;
  }
  set capacity(h) {
    this.list.capacity = h;
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
  forEach(h, t) {
    this.list.forEach((i, s) => h.call(t, i, s, this), t);
  }
  front() {
    return this.list.at(0);
  }
  has(h) {
    return this.list.has(h);
  }
  keys() {
    return this.list.keys();
  }
  push(...h) {
    return this.list.push(...h);
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
  addListener(h, t) {
    return this.list.addListener(h, t), this;
  }
  on(h, t) {
    return this.list.on(h, t), this;
  }
  prependListener(h, t) {
    return this.list.prependListener(h, t), this;
  }
  removeListener(h, t) {
    return this.list.removeListener(h, t), this;
  }
}
class B {
  constructor(h) {
    /**
     * @internal
     */
    a(this, "list");
    this.list = new I(h);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return B.name;
  }
  set capacity(h) {
    this.list.capacity = h;
  }
  clear() {
    this.list.clear();
  }
  entries() {
    return this.list.entries();
  }
  forEach(h, t) {
    this.list.forEach((i, s) => h.call(t, i, s, this), t);
  }
  has(h) {
    return this.list.has(h);
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
  push(...h) {
    return this.list.push(...h);
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
  addListener(h, t) {
    return this.list.addListener(h, t), this;
  }
  on(h, t) {
    return this.list.on(h, t), this;
  }
  prependListener(h, t) {
    return this.list.prependListener(h, t), this;
  }
  removeListener(h, t) {
    return this.list.removeListener(h, t), this;
  }
}
class V extends y {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    a(this, "_capacity");
    /**
     * The internal map.
     * @internal
     */
    a(this, "map");
    if (this._capacity = 1 / 0, this.map = /* @__PURE__ */ new Map(), t = t ?? 1 / 0, !c(t)) {
      if (w(t)) {
        if (!g(t))
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
   * @returns the number of values in the map.
   */
  get size() {
    return this.map.size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return V.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(t) {
    if (t = +t, !c(t) && !g(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const e = Array.from(this.map);
      this.clear(), this.emitter.emit(u.Overflow, e);
      return;
    }
    const i = [], s = this.map.entries();
    for (let e = this.size - t; e > 0; --e) {
      const n = s.next().value;
      this.map.delete(n[0]), i.push(n);
    }
    this.emitter.emit(u.Overflow, i);
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
      return this.emitter.emit(u.Overflow, [[t, i]]), this;
    const s = [];
    if (!this.map.delete(t) && this.size >= this.capacity) {
      const e = this.map.entries().next().value;
      this.map.delete(e[0]), s.push(e);
    }
    return this.map.set(t, i), s.length > 0 && this.emitter.emit(u.Overflow, s), this;
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
class $ extends y {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    a(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    a(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     * @internal
     */
    a(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    a(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    a(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    a(this, "vals");
    if (this._capacity = m, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], t = t ?? 1 / 0, !c(t)) {
      if (w(t)) {
        if (!E(t))
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
   * @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return $.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, c(t))
      t = m, this.isFinite = !1;
    else if (E(t))
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
      const n = this.vals[(this.head + e) % this._capacity];
      t.call(i, n, e, this);
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
    const n = i - s;
    if (this.evict(this.size + n), n > 0)
      this.emit(t.splice(0, n));
    else if (n < 0)
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
    this.emitter.emit(u.Overflow, t);
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
    let n = this.next;
    for (let l = 0; l < i; ++l)
      e[n] = t[l], ++n >= s && (n = 0);
    this.next = n, this._size += i;
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
class Y extends y {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    a(this, "_capacity");
    /**
     * The internal set.
     * @internal
     */
    a(this, "set");
    if (this._capacity = 1 / 0, this.set = /* @__PURE__ */ new Set(), t = t ?? 1 / 0, !c(t)) {
      if (w(t)) {
        if (!g(t))
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
   * @returns the number of values in the set.
   */
  get size() {
    return this.set.size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return Y.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(t) {
    if (t = +t, !c(t) && !g(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const e = Array.from(this.set);
      this.clear(), this.emitter.emit(u.Overflow, e);
      return;
    }
    const i = [], s = this.set.values();
    for (let e = this.size - t; e > 0; --e) {
      const n = s.next().value;
      this.set.delete(n), i.push(n);
    }
    this.emitter.emit(u.Overflow, i);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this.emitter.emit(u.Overflow, [t]), this;
    const i = [];
    if (!this.set.delete(t) && this.size >= this.capacity) {
      const s = this.set.values().next().value;
      this.set.delete(s), i.push(s);
    }
    return this.set.add(t), i.length > 0 && this.emitter.emit(u.Overflow, i), this;
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
class G extends y {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    a(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    a(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    a(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    a(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    a(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    a(this, "vals");
    if (this._capacity = m, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], t = t ?? 1 / 0, !c(t)) {
      if (w(t)) {
        if (!E(t))
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
   * @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return G.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, c(t))
      t = m, this.isFinite = !1;
    else if (E(t))
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
      const n = this.vals[(this.head + e) % this._capacity];
      t.call(i, n, e, this);
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
    const n = i - s;
    if (this.evict(this.size + n), n > 0)
      this.emit(t.splice(0, n));
    else if (n < 0)
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
    this.emitter.emit(u.Overflow, t);
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
    let n = this.next;
    for (let l = 0; l < i; ++l)
      e[n] = t[l], ++n >= s && (n = 0);
    this.next = n, this._size += i;
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
  u as BoundedEvent,
  k as CircularDeque,
  I as CircularDoublyLinkedList,
  A as CircularLinkedDeque,
  O as CircularLinkedList,
  H as CircularLinkedQueue,
  B as CircularLinkedStack,
  V as CircularMap,
  $ as CircularQueue,
  Y as CircularSet,
  G as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
