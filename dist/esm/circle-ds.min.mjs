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
var ot = Object.defineProperty;
var lt = (n, e, t) => e in n ? ot(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var a = (n, e, t) => (lt(n, typeof e != "symbol" ? e + "" : e, t), t);
const y = {
  Overflow: "overflow"
}, _t = {};
class N {
  constructor(e = new _t()) {
    /**
     * @internal
     * The event emitter.
     *
     */
    a(this, "_emitter");
    this._emitter = e;
  }
  addListener(e, t) {
    return this._emitter.addListener(e, t), this;
  }
  on(e, t) {
    return this._emitter.on(e, t), this;
  }
  prependListener(e, t) {
    return this._emitter.prependListener(e, t), this;
  }
  removeListener(e, t) {
    return this._emitter.removeListener(e, t), this;
  }
}
const F = 16383, $ = 4294967295, I = Number.MAX_SAFE_INTEGER;
function B(n) {
  return Number.isInteger(n) && n >= 0 && n <= $;
}
function d(n) {
  return n === Number.POSITIVE_INFINITY;
}
function ut(n) {
  return typeof (n == null ? void 0 : n[Symbol.iterator]) == "function";
}
function q(n) {
  return Number.isInteger(n) && n >= 0 && n <= I;
}
function M(n) {
  return typeof n == "number";
}
function A(n) {
  return Number.isSafeInteger(n) && n >= 0;
}
function c(n, e, t = 0) {
  return n >= t ? n : n + e;
}
function v(n, e, t) {
  if (e > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return n <= e ? e : n <= t ? n : t;
}
function g(n, e, t) {
  return n >= e && n < t;
}
function ft(n, e) {
  return n >= 0 && e > 0 ? Math.log(n) / Math.log(e) : NaN;
}
function at(n, e = 1 / 0, t = Math.random) {
  let s = 0;
  for (; s < e && t() < n; )
    ++s;
  return s;
}
function f(n, e = 0) {
  return n = +n, isNaN(n) ? e : Math.trunc(n);
}
function* b(n, e) {
  if (e < 1)
    return;
  let t = [];
  e = Math.trunc(e);
  for (const s of n)
    t.push(s) >= e && (yield t, t = []);
  t.length > 0 && (yield t);
}
class R extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    a(this, "_capacity");
    /**
     * @internal
     * The index representing the first element.
     */
    a(this, "_head");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    a(this, "_isFinite");
    /**
     * @internal
     * The index one more than the last element.
     */
    a(this, "_next");
    /**
     * @internal
     * The number of elements.
     */
    a(this, "_size");
    /**
     * @internal
     * The stored values.
     */
    a(this, "_vals");
    if (this._capacity = $, this._head = 0, this._isFinite = !1, this._size = 0, this._next = 0, this._vals = [], t != null) {
      if (M(t)) {
        this.capacity = t;
        return;
      }
      for (const s of b(t, F))
        this._insert(this._size, s);
      this._capacity = this._size, this._isFinite = !0;
    }
  }
  get capacity() {
    return this._isFinite ? this._capacity : 1 / 0;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return R.name;
  }
  set capacity(t) {
    if (t = +t, d(t))
      t = $, this._isFinite = !1;
    else if (B(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size <= 0 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  at(t) {
    if (t = c(f(t, -1 / 0), this._size), !!g(t, 0, this._size))
      return this._vals[this.toIndex(t)];
  }
  clear() {
    this._size = 0, this._head = 0, this._next = 0, this._vals.length = 0;
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
  _copyWithin(t, s, i) {
    if (t == s || s >= i)
      return;
    const r = this._capacity - 1, h = this._vals, o = this.toRanges(s, i);
    if (t <= s || i <= t) {
      t = this.toIndex(t);
      for (const [_, l] of o)
        for (let u = _; u < l; ++u)
          h[t] = h[u], t = t < r ? t + 1 : 0;
    } else {
      t = this.toIndex(t + (i - s));
      for (const [_, l] of o.reverse())
        for (let u = l - 1; u >= _; --u)
          t = t > 0 ? t - 1 : r, h[t] = h[u];
    }
  }
  delete(t) {
    return t = c(f(t, -1 / 0), this._size), g(t, 0, this._size) ? (this._delete(t, 1), !0) : !1;
  }
  /**
   * @internal
   */
  _delete(t, s) {
    this._copyWithin(t, t + s, this._size), this._pop(s);
  }
  *entries() {
    for (let t = 0; t < this._size; ++t)
      yield [t, this._vals[this.toIndex(t)]];
  }
  fill(t, s, i) {
    const r = this._size;
    return s = v(c(f(s, 0), r), 0, r), i = v(c(f(i, r), r), s, r), this._fill(t, s, i), this;
  }
  /**
   * @internal
   */
  _fill(t, s, i) {
    for (const [r, h] of this.toRanges(s, i))
      this._vals.fill(t, r, h);
  }
  first() {
    return this._size > 0 ? this._vals[this._head] : void 0;
  }
  forEach(t, s) {
    const i = this._size;
    for (let r = 0; r < i && r < this._size; ++r) {
      const h = this._vals[this.toIndex(r)];
      t.call(s, h, r, this);
    }
  }
  has(t) {
    const s = this._vals;
    for (const [i, r] of this.toRanges(0, this._size))
      for (let h = i; h < r; ++h)
        if (t === s[h])
          return !0;
    return !1;
  }
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
  }
  last() {
    return this._size > 0 ? this._vals[this.toIndex(this._size - 1)] : void 0;
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this._vals[this.toIndex(this._size - 1)];
    return this._pop(1), t;
  }
  /**
   * @internal
   */
  _pop(t) {
    const s = this._size - t;
    this._fill(void 0, s, this._size), this._next = this.toIndex(s), this._size = s;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._insert(this._size, t), this._size);
  }
  set(t, s) {
    if (t = c(f(t, -1 / 0), this._size), !g(t, 0, this._size))
      return;
    t = this.toIndex(t);
    const i = this._vals[t];
    return this._vals[t] = s, i;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this._vals[this._head];
    return this._shift(1), t;
  }
  /**
   * @internal
   */
  _shift(t) {
    this._fill(void 0, 0, t), this._head = this.toIndex(t), this._size -= t;
  }
  slice(t, s) {
    const i = this._size;
    return t = v(c(f(t, 0), i), 0, i), s = v(c(f(s, i), i), t, i), this.toList(this._slice(t, s));
  }
  /**
   * @internal
   */
  _slice(t, s) {
    const i = this._vals, r = new Array(s - t);
    let h = 0;
    for ([t, s] of this.toRanges(t, s))
      for (let o = t; o < s; ++o)
        r[h++] = i[o];
    return r;
  }
  splice(t, s, ...i) {
    const r = this._size;
    t = v(c(f(t, 0), r), 0, r), s = v(f(s, 0), 0, r - t);
    const h = this.toList(this._slice(t, t + s));
    return this._splice(t, s, i), h;
  }
  /**
   * @internal
   */
  _splice(t, s, i = []) {
    const r = i.length, h = Math.min(s, r), o = this._vals;
    let _ = 0;
    for (const [l, u] of this.toRanges(t, t + h))
      for (let p = l; p < u; ++p)
        o[p] = i[_++];
    s != r && (t += h, s < r ? this._insert(t, i, h) : this._delete(t, s - r));
  }
  /**
   * @internal
   */
  _insert(t, s, i = 0, r = s.length) {
    const h = r - i;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safeInsert(t, s, i, r);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s, i, i + o), new Error("Out of memory");
    if (t > 0) {
      const l = Math.min(t, h - o);
      this._overflow(this._slice(0, l)), this._shift(l), t -= l, o += l;
    }
    if (o >= h) {
      this._safeInsert(t, s, i, r);
      return;
    }
    const _ = r - o;
    this._overflow(s.slice(i, _)), this._safePresert(0, s, _, r);
  }
  /**
   * @internal
   */
  _safeInsert(t, s, i = 0, r = s.length) {
    const h = r - i, o = this._vals;
    this._copyWithin(t + h, t, this._size);
    for (const [_, l] of this.toRanges(t, t + h))
      for (let u = _; u < l; ++u)
        o[u] = s[i++];
    this._size += h, this._next = this.toIndex(this._size);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._presert(0, t), this._size);
  }
  /**
   * @internal
   */
  _presert(t, s, i = 0, r = s.length) {
    const h = r - i;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safePresert(t, s, i, r);
      return;
    }
    if (!this._isFinite)
      throw this._safePresert(t, s, r - o, r), new Error("Out of memory");
    if (t < this._size) {
      const l = Math.min(this._size - t, h - o);
      this._overflow(this._slice(this._size - l, this._size)), this._pop(l), o += l;
    }
    if (o >= h) {
      this._safePresert(t, s, i, r);
      return;
    }
    const _ = i + o;
    this._overflow(s.slice(_, r)), this._safeInsert(this._size, s, i, _);
  }
  /**
   * @internal
   */
  _safePresert(t, s, i = 0, r = s.length) {
    const h = this._capacity, o = r - i, _ = this._vals, l = h - o;
    this._copyWithin(l, 0, t), t += l;
    for (const [u, p] of this.toRanges(t, t + o))
      for (let z = u; z < p; ++z)
        _[z] = s[i++];
    this._size += o, this._head = this.toIndex(l);
  }
  *values() {
    for (let t = 0; t < this._size; ++t)
      yield this._vals[this.toIndex(t)];
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(t) {
    this._emitter.emit(y.Overflow, t);
  }
  /**
   * @internal
   *
   * Grow capacity.
   *
   * @param capacity - the new capacity
   */
  grow(t) {
    if (this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    if (this._size <= this._head) {
      const s = this._size - this._next;
      this._vals.copyWithin(s, 0, this._next), this._vals.copyWithin(0, this._head, this._head + s), this._vals.length = this._size, this._head = 0, this._next = this._size;
    } else if (this._head + this._size <= t)
      this._vals.length = this._head + this._size, this._vals.copyWithin(this._capacity, 0, this._next), this._vals.fill(void 0, 0, this._next), this._next = (this._head + this._size) % t;
    else {
      const s = t - this._capacity;
      this._vals.length = t, this._vals.copyWithin(this._capacity, 0, s), this._vals.copyWithin(0, s, this._next);
      const i = Math.max(s, this._next - s);
      this._vals.fill(void 0, i, this._next), this._next -= s;
    }
    this._capacity = t;
  }
  /**
   * @internal
   *
   * Returns whether the list is stored sequentially in memory.
   *
   * @returns `true` if the list is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this._head < this._next || this._next <= 0;
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
  sequentialReset(t) {
    const s = this._head + this._size;
    return s <= t ? (this._vals.length = s, this._next = this._vals.length % t) : this._head >= t ? (this._vals.copyWithin(0, this._head, s), this._vals.length = this._size, this._head = 0, this._next = this._size % t) : (this._vals.copyWithin(0, t, s), this._vals.length = t, this._next = s - t), this._capacity = t, !0;
  }
  /**
   * @internal
   *
   * Shrink capacity.
   *
   * @param capacity - the new capacity
   */
  shrink(t) {
    if (this._size > t) {
      const i = this._size - t;
      this._overflow(this._slice(0, i)), this._shift(i);
    }
    if (this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    const s = this._capacity - t;
    this._vals.copyWithin(this._head - s, this._head, this._capacity), this._vals.length = t, this._head -= s, this._capacity = t;
  }
  /**
   * @internal
   */
  toIndex(t) {
    return (this._head + t) % this._capacity;
  }
  /**
   * @internal
   */
  toList(t) {
    const s = new R(0);
    return s._vals = t, s._size = t.length, s._capacity = t.length, s;
  }
  /**
   * @internal
   */
  toRanges(t, s) {
    const i = this._head, r = this._capacity - i;
    return s <= r ? [[i + t, i + s]] : t >= r ? [[t - r, s - r]] : [
      [i + t, this._capacity],
      [0, s - r]
    ];
  }
}
class j {
  constructor(e) {
    /**
     * @internal
     */
    a(this, "_list");
    this._list = new R(e);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return j.name;
  }
  set capacity(e) {
    this._list.capacity = e;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  first() {
    return this._list.first();
  }
  forEach(e, t) {
    return this._list.forEach((s, i) => e.call(t, s, i, this));
  }
  front() {
    return this._list.first();
  }
  has(e) {
    return this._list.has(e);
  }
  keys() {
    return this._list.keys();
  }
  last() {
    return this._list.last();
  }
  pop() {
    return this._list.pop();
  }
  push(...e) {
    return this._list.push(...e);
  }
  shift() {
    return this._list.shift();
  }
  [Symbol.iterator]() {
    return this._list.values();
  }
  top() {
    return this._list.last();
  }
  unshift(...e) {
    return this._list.unshift(...e);
  }
  values() {
    return this._list.values();
  }
  addListener(e, t) {
    return this._list.addListener(e, t), this;
  }
  on(e, t) {
    return this._list.on(e, t), this;
  }
  prependListener(e, t) {
    return this._list.prependListener(e, t), this;
  }
  removeListener(e, t) {
    return this._list.removeListener(e, t), this;
  }
}
function ct(n, e) {
  const t = { value: void 0 };
  let s = 0, i = t;
  for (; n != null && s < e; ) {
    const r = { value: n.value };
    i.next = r, i = r, ++s, n = n.next;
  }
  return i.next = void 0, { root: t, size: s, tail: i };
}
function k(n, e) {
  const t = { value: void 0 };
  if (n == null || e <= 0)
    return { root: t, size: 0, tail: t };
  const s = n.next, i = P(s, e - 1);
  return n.next = i.next, i.next = void 0, t.next = s, { root: t, size: e, tail: i };
}
function* D(n) {
  for (let e = 0; n != null; ++e)
    yield [e, n.value], n = n.next;
}
function P(n, e) {
  if (!(e < 0)) {
    for (let t = 0; n != null && t < e; ++t)
      n = n.next;
    return n;
  }
}
function K(n, e) {
  for (; n != null; ) {
    if (n.value === e)
      return !0;
    n = n.next;
  }
  return !1;
}
function* J(n) {
  for (let e = 0; n != null; ++e)
    yield e, n = n.next;
}
function vt(n) {
  const e = { value: void 0 };
  let t = 0, s = e;
  for (const i of n)
    s.next = { value: i }, s = s.next, ++t;
  return s.next = void 0, { root: e, size: t, tail: s };
}
function* m(n) {
  for (; n != null; )
    yield n.value, n = n.next;
}
function pt(n, e) {
  const t = { value: void 0 };
  if (n == null || e <= 0)
    return { root: t, size: 0, tail: t };
  let s = 0, i = t;
  for (; n != null && s < e; ) {
    const r = { value: n.value };
    i.next = r, r.prev = i, i = r, ++s, n = n.next;
  }
  return t.prev = void 0, i.next = void 0, { root: t, size: s, tail: i };
}
function G(n, e) {
  const t = k(n, e);
  if (t.size <= 0)
    return t;
  t.root.next.prev = t.root;
  const s = n.next;
  return s != null && (s.prev = n), t;
}
function V(n, e) {
  if (e >= 0)
    return P(n, e);
  for (let t = 0; n != null && t > e; --t)
    n = n.prev;
  return n;
}
function zt(n) {
  const e = { value: void 0 };
  let t = 0, s = e;
  for (const i of n)
    s.next = { prev: s, value: i }, s = s.next, ++t;
  return e.prev = void 0, s.next = void 0, { root: e, size: t, tail: s };
}
class x extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    a(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    a(this, "_isFinite");
    /**
     * @internal
     * The root of the linked list
     */
    a(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    a(this, "_size");
    /**
     * @internal
     * The last node in the linked list.
     */
    a(this, "_tail");
    if (this._capacity = I, this._isFinite = !1, this._root = { value: void 0 }, this._size = 0, this._tail = this._root, t != null) {
      if (M(t)) {
        this.capacity = t;
        return;
      }
      for (const s of b(t, F))
        this._insert(this._size, s);
      this._capacity = this._size, this._isFinite = !0;
    }
  }
  get capacity() {
    return this._isFinite ? this._capacity : 1 / 0;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return x.name;
  }
  set capacity(t) {
    if (t = +t, t = +t, d(t))
      t = I, this._isFinite = !1;
    else if (q(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const s = this._size - t, { root: i } = G(this._root, s);
    this._size -= s, this._size <= 0 && (this._tail = this._root);
    for (const r of b(m(i.next), F))
      this._overflow(r);
  }
  at(t) {
    if (t = c(f(t, -1 / 0), this._size), !!g(t, 0, this._size))
      return this._get(t).value;
  }
  clear() {
    this._size = 0, this._tail = this._root, this._root.next = void 0;
  }
  delete(t) {
    if (t = c(f(t, -1 / 0), this._size), !g(t, 0, this._size))
      return !1;
    const s = this._get(t);
    return s.prev.next = s.next, s.next != null && (s.next.prev = s.prev), --this._size, !0;
  }
  entries() {
    return D(this._root.next);
  }
  fill(t, s, i) {
    s = f(s, 0), s = v(c(s, this._size), 0, this._size), i = f(i, this._size), i = v(c(i, this._size), 0, this._size);
    let r = this._get(s);
    for (; s < i; )
      r.value = t, r = r.next, ++s;
    return this;
  }
  forEach(t, s) {
    let i = this._root;
    for (let r = 0; r < this._size; ++r)
      i = i.next, t.call(s, i.value, r, this);
  }
  has(t) {
    return K(this._root.next, t);
  }
  keys() {
    return J(this._root.next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(this._size - 1, 1);
    return t.next.value;
  }
  push(...t) {
    return this._insert(this._size, t), this._size;
  }
  set(t, s) {
    if (t = c(f(t, -1 / 0), this._size), !g(t, 0, this._size))
      return;
    const i = this._get(t), r = i.value;
    return i.value = s, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.next.value;
  }
  slice(t, s) {
    const i = this._size;
    if (t = v(c(f(t, 0), i), 0, i), s = v(c(f(s, i), i), t, i), t >= s)
      return new x(0);
    const r = this._get(t), h = pt(r, s - t), o = new x(h.size);
    return o._root = h.root, o._size = h.size, o._tail = h.tail, o;
  }
  splice(t, s, ...i) {
    const r = this._size;
    t = v(c(f(t, 0), r), 0, r), s = v(f(s, 0), 0, r - t);
    let h;
    if (s <= 0)
      h = new x(0);
    else {
      const { root: o, size: _, tail: l } = this._cut(t, s);
      h = new x(_), h._root = o, h._size = _, h._tail = l;
    }
    return this._insert(t, i), h;
  }
  [Symbol.iterator]() {
    return m(this._root.next);
  }
  unshift(...t) {
    return this._presert(0, t), this._size;
  }
  values() {
    return m(this._root.next);
  }
  /**
   * @internal
   */
  _cut(t, s) {
    const i = this._get(t - 1), r = G(i, s);
    return this._size -= s, t >= this._size && (this._tail = i), r;
  }
  /**
   * @internal
   */
  _get(t) {
    const s = this._size / 2;
    return ++t <= s ? V(this._root, t) : V(this._tail, t - this._size);
  }
  /**
   * @internal
   */
  _insert(t, s) {
    const i = s.length;
    if (i <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s.slice(0, r)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, i - r), { root: _ } = this._cut(0, o);
      this._overflow(m(_.next)), t -= o, r += o;
    }
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    const h = s.length - r;
    this._overflow(s.slice(0, h)), this._safeInsert(0, s.slice(h));
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(t) {
    Array.isArray(t) || (t = Array.from(t)), this._emitter.emit(y.Overflow, t);
  }
  /**
   * @internal
   */
  _presert(t, s) {
    const i = s.length;
    if (i <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, s.slice(s.length - r)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, i - r), { root: o } = this._cut(this._size - h, h);
      this._overflow(m(o.next)), r += h;
    }
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    this._overflow(s.slice(r)), this._safeInsert(this._size, s.slice(0, r));
  }
  /**
   * @internal
   */
  _safeInsert(t, s) {
    if (s.length <= 0)
      return;
    const { root: i, size: r, tail: h } = zt(s), o = i.next, _ = this._get(t - 1), l = _.next;
    o.prev = _, h.next = l, _.next = o, l != null && (l.prev = h), this._tail = t < this._size ? this._tail : h, this._size += r;
  }
}
class Q {
  constructor(e) {
    /**
     * @internal
     */
    a(this, "_list");
    this._list = new x(e);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return Q.name;
  }
  set capacity(e) {
    this._list.capacity = e;
  }
  first() {
    return this._list.at(0);
  }
  front() {
    return this._list.at(0);
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  forEach(e, t) {
    this._list.forEach((s, i) => e.call(t, s, i, this), t);
  }
  has(e) {
    return this._list.has(e);
  }
  keys() {
    return this._list.keys();
  }
  last() {
    return this._list.at(-1);
  }
  pop() {
    return this._list.pop();
  }
  push(...e) {
    return this._list.push(...e);
  }
  shift() {
    return this._list.shift();
  }
  [Symbol.iterator]() {
    return this.values();
  }
  top() {
    return this._list.at(-1);
  }
  unshift(...e) {
    return this._list.unshift(...e);
  }
  values() {
    return this._list.values();
  }
  addListener(e, t) {
    return this._list.addListener(e, t), this;
  }
  on(e, t) {
    return this._list.on(e, t), this;
  }
  prependListener(e, t) {
    return this._list.prependListener(e, t), this;
  }
  removeListener(e, t) {
    return this._list.removeListener(e, t), this;
  }
}
class L extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    a(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    a(this, "_isFinite");
    /**
     * @internal
     * The root of the linked list
     */
    a(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    a(this, "_size");
    /**
     * @internal
     * The last node in the linked list.
     */
    a(this, "_tail");
    if (this._capacity = I, this._isFinite = !1, this._root = { value: void 0 }, this._size = 0, this._tail = this._root, t != null) {
      if (M(t)) {
        this.capacity = t;
        return;
      }
      for (const s of b(t, F))
        this._insert(this._size, s);
      this._capacity = this._size, this._isFinite = !0;
    }
  }
  get capacity() {
    return this._isFinite ? this._capacity : 1 / 0;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return L.name;
  }
  set capacity(t) {
    if (t = +t, d(t))
      t = I, this._isFinite = !1;
    else if (q(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const s = this._size - t, { root: i } = k(this._root, s);
    this._size -= s, this._size <= 0 && (this._tail = this._root), this._overflow(i.next);
  }
  at(t) {
    if (t = c(f(t, -1 / 0), this._size), !!g(t, 0, this._size))
      return this._get(t).value;
  }
  clear() {
    this._size = 0, this._tail = this._root, this._root.next = void 0;
  }
  delete(t) {
    return t = c(f(t, -1 / 0), this._size), g(t, 0, this._size) ? (this._cut(t, 1), !0) : !1;
  }
  entries() {
    return D(this._root.next);
  }
  fill(t, s, i) {
    const r = this._size;
    if (s = v(c(f(s, 0), r), 0, r), i = v(c(f(i, r), r), s, r), s >= i)
      return this;
    let h = this._get(s);
    for (let o = s; o < i; ++o)
      h.value = t, h = h.next;
    return this;
  }
  forEach(t, s) {
    let i = this._root;
    for (let r = 0; r < this._size; ++r)
      i = i.next, t.call(s, i.value, r, this);
  }
  has(t) {
    return K(this._root.next, t);
  }
  keys() {
    return J(this._root.next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(this._size - 1, 1);
    return t.next.value;
  }
  push(...t) {
    return this._insert(this._size, t), this._size;
  }
  set(t, s) {
    if (t = c(f(t, -1 / 0), this._size), !g(t, 0, this._size))
      return;
    const i = this._get(t), r = i.value;
    return i.value = s, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.next.value;
  }
  slice(t, s) {
    const i = this._size;
    if (t = v(c(f(t, 0), i), 0, i), s = v(c(f(s, i), i), t, i), t >= s)
      return new L(0);
    const r = this._get(t), h = ct(r, s - t), o = new L(h.size);
    return o._root = h.root, o._size = h.size, o._tail = h.tail, o;
  }
  splice(t, s, ...i) {
    const r = this._size;
    t = v(c(f(t, 0), r), 0, r), s = v(f(s, 0), 0, r - t);
    let h;
    if (s <= 0)
      h = new L(0);
    else {
      const { root: o, size: _, tail: l } = this._cut(t, s);
      h = new L(s), h._root = o, h._size = _, h._tail = l;
    }
    return this._insert(t, i), h;
  }
  [Symbol.iterator]() {
    return m(this._root.next);
  }
  unshift(...t) {
    return this._presert(0, t), this._size;
  }
  values() {
    return m(this._root.next);
  }
  /**
   * @internal
   */
  _cut(t, s) {
    const i = this._get(t - 1), r = k(i, s);
    return this._size -= s, t >= this._size && (this._tail = i), r;
  }
  /**
   * @internal
   */
  _get(t) {
    return ++t == this._size ? this._tail : P(this._root, t);
  }
  /**
   * @internal
   */
  _insert(t, s) {
    const i = s.length;
    if (i <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s.slice(0, r)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, i - r), { root: _ } = this._cut(0, o);
      this._overflow(_.next), t -= o, r += o;
    }
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    const h = s.length - r;
    this._overflow(s.slice(0, h)), this._safeInsert(0, s.slice(h));
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(t) {
    if (t != null) {
      if (Array.isArray(t)) {
        this._emitter.emit(y.Overflow, t);
        return;
      }
      for (const s of b(m(t), F))
        this._emitter.emit(y.Overflow, s);
    }
  }
  /**
   * @internal
   */
  _presert(t, s) {
    const i = s.length;
    if (i <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, s.slice(s.length - r)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, i - r), { root: o } = this._cut(this._size - h, h);
      this._overflow(o.next), r += h;
    }
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    this._overflow(s.slice(r)), this._safeInsert(this._size, s.slice(0, r));
  }
  /**
   * @internal
   */
  _safeInsert(t, s) {
    if (s.length <= 0)
      return;
    const { root: i, size: r, tail: h } = vt(s), o = this._get(t - 1);
    h.next = o.next, o.next = i.next, this._tail = t < this._size ? this._tail : h, this._size += r;
  }
}
function X(n, e) {
  return n <= 0 || e <= 1 ? 1 : n >= 1 ? 1 / 0 : Math.ceil(ft(e, 1 / n));
}
function yt(n, e, t) {
  let s = n.levels.length;
  const i = S(void 0, s);
  if (t <= 0)
    return { root: i, size: 0, tails: [i] };
  const r = new Array(s).fill(i), h = new Array(s).fill(-1);
  let o = U(n, e)[0];
  o = o.levels[0].next, s = 1;
  let _ = 0, l = 0;
  for (; o != null && l < t; ) {
    const u = o.levels.length;
    s = s >= u ? s : u;
    const p = S(o.value, u);
    for (let w = 0; w < u; ++w)
      r[w].levels[w] = { next: p, span: l - h[w] }, r[w] = p, h[w] = l;
    const { next: z, span: E } = o.levels[0];
    l += E, o = z, ++_;
  }
  r.length = s, i.levels.length = s, l = h[0] + 1;
  for (let u = 0; u < s; ++u)
    r[u].levels[u] = { next: void 0, span: l - h[u] };
  return { root: i, size: _, tails: r };
}
function* gt(n) {
  for (let e = 0; n != null; ++e)
    yield [e, n.value], n = n.levels[0].next;
}
function S(n, e = 1, t = 1, s) {
  const i = new Array(e);
  for (let r = 0; r < e; ++r)
    i[r] = { next: s, span: t };
  return { value: n, levels: i };
}
function T(n, e) {
  return [n, e] = U(n, e), e === 0 ? n : void 0;
}
function U(n, e) {
  if (e <= 0)
    return [n, e];
  let t = n.levels.length - 1;
  for (; ; ) {
    const { next: s, span: i } = n.levels[t];
    if (!(i <= e && s != null)) {
      if (--t < 0)
        return [n, e];
      continue;
    }
    if (i == e)
      return [s, 0];
    e -= i, n = s;
  }
}
function wt(n, e) {
  for (; n != null; ) {
    if (n.value === e)
      return !0;
    n = n.levels[0].next;
  }
  return !1;
}
function* mt(n) {
  for (let e = 0; n != null; ++e)
    yield e, n = n.levels[0].next;
}
function xt(n, e) {
  let t = -1 / 0;
  const s = Math.min(n.length, e.length);
  for (let h = 0; h < s; ++h)
    t < n[h] && (t = n[h]);
  if (t <= 0 || s <= 0) {
    const h = S(void 0);
    return { root: h, size: 0, tails: [h] };
  }
  const i = S(void 0, t, s + 1), r = new Array(t).fill(i);
  for (let h = 0; h < s; ++h) {
    const o = s - h, _ = n[h], l = S(e[h], _, o);
    for (let u = 0; u < _; ++u) {
      const p = r[u].levels;
      p[u] = { next: l, span: p[u].span - o }, r[u] = l;
    }
  }
  return { root: i, size: s, tails: r };
}
function It(n, e) {
  if (n == null || n.levels.length <= e)
    return;
  let t = n;
  for (; t != null; ) {
    const s = t.levels[e].next;
    t.levels.length = e, t = s;
  }
}
function* H(n) {
  for (; n != null; )
    yield n.value, n = n.levels[0].next;
}
function dt(n) {
  const e = n.length, t = new Array(e);
  for (let s = 0; s < e; ++s) {
    const { index: i, node: r } = n[s];
    t[s] = { index: i, node: r };
  }
  return t;
}
function Et(n, e, t) {
  const s = S(void 0), i = { root: s, size: 0, tails: [s] };
  if (t <= 0)
    return i;
  const r = W(Z(n.root, -1), e), h = W(dt(r), t), o = h[0].index + h[0].node.levels[0].span;
  let _ = n.root.levels.length;
  e = r[0].index + r[0].node.levels[0].span, t = o - e;
  let l;
  for (l = 0; l < _; ++l) {
    const u = r[l], p = h[l];
    if (u.index >= p.index)
      break;
    let z = u.node.levels[l], E = u.index + z.span - e;
    s.levels[l] = { next: z.next, span: E }, z = p.node.levels[l], E = p.index - u.index + (z.span - t), u.node.levels[l] = { next: z.next, span: E }, p.node.levels[l] = { next: void 0, span: o - p.index }, i.tails[l] = p.node;
  }
  if (l < _)
    for (; l < _; ) {
      const u = r[l], { next: p, span: z } = u.node.levels[l];
      u.node.levels[l] = { next: p, span: z - t }, ++l;
    }
  else {
    const u = n.root.levels;
    for (; l > 1 && u[l - 1].next == null; )
      --l;
    _ = l, u.length = _, n.tails.length = _;
  }
  if (o >= n.size)
    for (l = 0; l < _; ++l)
      n.tails[l] = r[l].node;
  return n.size -= t, i.size = t, i;
}
function Z(n, e = 0) {
  const t = n.levels.length, s = new Array(t);
  for (let i = 0; i < t; ++i)
    s[i] = { index: e, node: n };
  return s;
}
function W(n, e) {
  if (e <= 0 || n.length <= 0)
    return n;
  let t = n.length - 1, s = n[t];
  const i = n[0].index + e;
  for (; ; ) {
    const { next: r, span: h } = s.node.levels[t], o = s.index + h;
    if (!(o <= i && r != null)) {
      if (--t < 0)
        break;
      s = n[t];
      continue;
    }
    if (s = { index: o, node: r }, n[t] = s, o == i)
      break;
  }
  for (let r = 0; r < t; ++r)
    n[r] = { index: s.index, node: s.node };
  return n;
}
function Lt(n, e, t) {
  if (t.size <= 0)
    return;
  const s = t.tails.length;
  for (let h = n.tails.length; h < s; ++h)
    n.root.levels[h] = { next: void 0, span: n.size + 1 }, n.tails[h] = n.root;
  const i = W(Z(n.root, -1), e);
  for (let h = 0; h < s; ++h) {
    const o = i[h].node, _ = i[h].index, l = o.levels[h], u = t.tails[h], p = u.levels[h], E = _ + l.span - e, w = p.span;
    u.levels[h] = { next: l.next, span: E + w };
    const Y = t.root.levels[h], nt = Y.span - 1, ht = e - _;
    o.levels[h] = { next: Y.next, span: ht + nt };
  }
  const r = n.tails.length;
  for (let h = s; h < r; ++h) {
    const o = i[h].node.levels, { next: _, span: l } = o[h];
    o[h] = { next: _, span: l + t.size };
  }
  if (e === n.size)
    for (let h = 0; h < s; ++h)
      n.tails[h] = t.tails[h];
  n.size += t.size;
}
class O extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    a(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    a(this, "_isFinite");
    /**
     * @internal
     * The maximum number of levels in the skip list.
     */
    a(this, "_maxLevel");
    /**
     * @internal
     * The probability factor used to randomly determine the levels
     * of new nodes. Should be a value between 0 and 1, where a lower
     * value results in fewer levels on average.
     */
    a(this, "_p");
    /**
     * @internal
     * The root of the skip list
     */
    a(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    a(this, "_size");
    /**
     * @internal
     * The last nodes in the skip list at each level.
     */
    a(this, "_tails");
    if (this._capacity = I, this._isFinite = !1, this._p = 0.5, this._maxLevel = X(this._p, I), this._root = S(void 0), this._size = 0, this._tails = [this._root], t != null) {
      if (M(t)) {
        this.capacity = t;
        return;
      }
      if (!ut(t)) {
        this.capacity = t.capacity ?? this._capacity, this.p = t.p ?? this._p;
        const s = t.expectedSize ?? this._capacity;
        this.maxLevel = t.maxLevel ?? X(this._p, s);
        return;
      }
      for (const s of b(t, F))
        this._insert(this._size, s);
      this._capacity = this._size, this._isFinite = !0;
    }
  }
  get capacity() {
    return this._isFinite ? this._capacity : 1 / 0;
  }
  get levels() {
    return this._root.levels.length;
  }
  get maxLevel() {
    return this._maxLevel;
  }
  get p() {
    return this._p;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return O.name;
  }
  set capacity(t) {
    if (t = +t, d(t))
      t = I, this._isFinite = !1;
    else if (q(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const { root: s } = this._cut(0, this._size - t);
    this._overflow(s.levels[0].next);
  }
  set maxLevel(t) {
    if (t = +t, !B(t) || t <= 0)
      throw new RangeError("Invalid maxLevel");
    this._maxLevel = t, t < this.levels && It(this._root, t);
  }
  set p(t) {
    if (t = +t, isNaN(t) || t < 0 || t > 1)
      throw new RangeError("Invalid p");
    this._p = t;
  }
  at(t) {
    if (t = c(f(t, -1 / 0), this._size), !!g(t, 0, this._size))
      return T(this._root, t + 1).value;
  }
  clear() {
    this._size = 0, this._tails = [this._root], this._root.levels.length = 1, this._root.levels[0] = { next: void 0, span: 1 };
  }
  delete(t) {
    return t = c(f(t, -1 / 0), this._size), g(t, 0, this._size) ? (this._cut(t, 1), !0) : !1;
  }
  entries() {
    return gt(this._root.levels[0].next);
  }
  fill(t, s, i) {
    const r = this._size;
    if (s = v(c(f(s, 0), r), 0, r), i = v(c(f(i, r), r), s, r), s >= i)
      return this;
    let h = T(this._root, s + 1);
    for (let o = s; o < i; ++o)
      h.value = t, h = h.levels[0].next;
    return this;
  }
  forEach(t, s) {
    let i = this._root;
    for (let r = 0; r < this._size; ++r)
      i = i.levels[0].next, t.call(s, i.value, r, this);
  }
  has(t) {
    return wt(this._root.levels[0].next, t);
  }
  keys() {
    return mt(this._root.levels[0].next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(this._size - 1, 1);
    return t.levels[0].next.value;
  }
  push(...t) {
    return this._insert(this._size, t), this._size;
  }
  set(t, s) {
    if (t = c(f(t, -1 / 0), this._size), !g(t, 0, this._size))
      return;
    const i = T(this._root, t + 1), r = i.value;
    return i.value = s, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.levels[0].next.value;
  }
  slice(t, s) {
    const i = this._size;
    t = v(c(f(t, 0), i), 0, i), s = v(c(f(s, i), i), t, i);
    const r = {
      capacity: 0,
      p: this._p,
      maxLevel: this._maxLevel
    };
    if (t >= s)
      return new O(r);
    const h = yt(this._root, t, s - t);
    r.capacity = h.size;
    const o = new O(r);
    return o._root = h.root, o._tails = h.tails, o._size = h.size, o;
  }
  splice(t, s, ...i) {
    const r = this._size;
    t = v(c(f(t, 0), r), 0, r), s = v(f(s, 0), 0, r - t);
    const h = this._cut(t, s);
    this._insert(t, i);
    const o = new O({
      capacity: s,
      p: this._p,
      maxLevel: this._maxLevel
    });
    return o._root = h.root, o._tails = h.tails, o._size = h.size, o;
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...t) {
    return this._presert(0, t), this._size;
  }
  values() {
    return H(this._root.levels[0].next);
  }
  /**
   * @internal
   */
  _cut(t, s) {
    const i = { root: this._root, size: this._size, tails: this._tails }, r = Et(i, t, s);
    return this._size = i.size, this._tails = i.tails, r;
  }
  /**
   * @internal
   */
  _genLevels(t) {
    const s = new Array(t), i = this._maxLevel - 1;
    for (let r = 0; r < t; ++r)
      s[r] = 1 + at(this._p, i);
    return s;
  }
  /**
   * @internal
   */
  _insert(t, s) {
    const i = s.length;
    if (i <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s.slice(0, r)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, i - r), { root: _ } = this._cut(0, o);
      this._overflow(_.levels[0].next), t -= o, r += o;
    }
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    const h = s.length - r;
    this._overflow(s.slice(0, h)), this._safeInsert(0, s.slice(h));
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(t) {
    if (t != null) {
      if (Array.isArray(t)) {
        this._emitter.emit(y.Overflow, t);
        return;
      }
      for (const s of b(H(t), F))
        this._emitter.emit(y.Overflow, s);
    }
  }
  /**
   * @internal
   */
  _presert(t, s) {
    const i = s.length;
    if (i <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, s.slice(s.length - r)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, i - r), { root: o } = this._cut(this._size - h, h);
      this._overflow(o.levels[0].next), r += h;
    }
    if (r >= i) {
      this._safeInsert(t, s);
      return;
    }
    this._overflow(s.slice(r)), this._safeInsert(this._size, s.slice(0, r));
  }
  /**
   * @internal
   */
  _safeInsert(t, s) {
    const i = this._genLevels(s.length), r = xt(i, s), h = { root: this._root, size: this._size, tails: this._tails };
    Lt(h, t, r), this._size = h.size, this._tails = h.tails;
  }
}
class C extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    a(this, "_capacity");
    /**
     * @internal
     * The internal map.
     */
    a(this, "_map");
    if (this._capacity = 1 / 0, this._map = /* @__PURE__ */ new Map(), t = t ?? 1 / 0, !d(t)) {
      if (M(t)) {
        if (!A(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t;
        return;
      }
      this._map = new Map(t), this._capacity = this._map.size;
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
    return this._map.size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return C.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(t) {
    if (t = +t, !d(t) && !A(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this._map);
      this.clear(), this._emitter.emit(y.Overflow, r);
      return;
    }
    const s = [], i = this._map.entries();
    for (let r = this.size - t; r > 0; --r) {
      const h = i.next().value;
      this._map.delete(h[0]), s.push(h);
    }
    this._emitter.emit(y.Overflow, s);
  }
  /**
   * Removes all elements from the map.
   */
  clear() {
    this._map.clear();
  }
  /**
   * Deletes a specified value from the map.
   *
   * @returns `true` if the value existed in the map and has been removed, or `false` otherwise.
   */
  delete(t) {
    return this._map.delete(t);
  }
  /**
   * Iterate through the map's entries.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  entries() {
    return this._map.entries();
  }
  /**
   * Performs the specified action for each value in the map.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per value.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`.
   */
  forEach(t, s) {
    for (const [i, r] of this._map.entries())
      t.call(s, r, i, this);
  }
  /**
   * Returns the associated value of the given key from the map.
   *
   * If the associated value is an object, then you will get a reference to that object; any change made to the object will effectively modify it inside the map.
   *
   * @returns the value associated with the specified key, or `undefined` if no value is associated.
   */
  get(t) {
    return this._map.get(t);
  }
  /**
   * Determines whether a given value is in the map.
   *
   * @param key - The key to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(t) {
    return this._map.has(t);
  }
  /**
   * Iterate through the map's keys.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the map's keys.
   */
  keys() {
    return this._map.keys();
  }
  /**
   * Sets the specified key-value pair in the map.
   *
   * @param key - the key to add
   * @param value - the key's value.
   */
  set(t, s) {
    if (this.capacity < 1)
      return this._emitter.emit(y.Overflow, [[t, s]]), this;
    const i = [];
    if (!this._map.delete(t) && this.size >= this.capacity) {
      const r = this._map.entries().next().value;
      this._map.delete(r[0]), i.push(r);
    }
    return this._map.set(t, s), i.length > 0 && this._emitter.emit(y.Overflow, i), this;
  }
  /**
   * Iterate through the map's values.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator]() {
    return this._map.entries();
  }
  /**
   * Iterate through the map's values.
   *
   * **Note:** Modifying the map during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the map's values.
   */
  values() {
    return this._map.values();
  }
}
class tt {
  constructor(e) {
    /**
     * @internal
     */
    a(this, "_list");
    this._list = new L(e);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return tt.name;
  }
  set capacity(e) {
    this._list.capacity = e;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  first() {
    return this._list.at(0);
  }
  forEach(e, t) {
    this._list.forEach((s, i) => e.call(t, s, i, this), t);
  }
  front() {
    return this._list.at(0);
  }
  has(e) {
    return this._list.has(e);
  }
  keys() {
    return this._list.keys();
  }
  push(...e) {
    return this._list.push(...e);
  }
  shift() {
    return this._list.shift();
  }
  [Symbol.iterator]() {
    return this.values();
  }
  values() {
    return this._list.values();
  }
  addListener(e, t) {
    return this._list.addListener(e, t), this;
  }
  on(e, t) {
    return this._list.on(e, t), this;
  }
  prependListener(e, t) {
    return this._list.prependListener(e, t), this;
  }
  removeListener(e, t) {
    return this._list.removeListener(e, t), this;
  }
}
class st {
  constructor(e) {
    /**
     * @internal
     */
    a(this, "list");
    this.list = new R(e);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return st.name;
  }
  set capacity(e) {
    this.list.capacity = e;
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
  forEach(e, t) {
    return this.list.forEach((s, i) => e.call(t, s, i, this));
  }
  front() {
    return this.list.first();
  }
  has(e) {
    return this.list.has(e);
  }
  keys() {
    return this.list.keys();
  }
  push(...e) {
    return this.list.push(...e);
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
  addListener(e, t) {
    return this.list.addListener(e, t), this;
  }
  on(e, t) {
    return this.list.on(e, t), this;
  }
  prependListener(e, t) {
    return this.list.prependListener(e, t), this;
  }
  removeListener(e, t) {
    return this.list.removeListener(e, t), this;
  }
}
class it extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    a(this, "_capacity");
    /**
     * @internal
     * The internal set.
     */
    a(this, "set");
    if (this._capacity = 1 / 0, this.set = /* @__PURE__ */ new Set(), t = t ?? 1 / 0, !d(t)) {
      if (M(t)) {
        if (!A(t))
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
    return it.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(t) {
    if (t = +t, !d(t) && !A(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this.set);
      this.clear(), this._emitter.emit(y.Overflow, r);
      return;
    }
    const s = [], i = this.set.values();
    for (let r = this.size - t; r > 0; --r) {
      const h = i.next().value;
      this.set.delete(h), s.push(h);
    }
    this._emitter.emit(y.Overflow, s);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this._emitter.emit(y.Overflow, [t]), this;
    const s = [];
    if (!this.set.delete(t) && this.size >= this.capacity) {
      const i = this.set.values().next().value;
      this.set.delete(i), s.push(i);
    }
    return this.set.add(t), s.length > 0 && this._emitter.emit(y.Overflow, s), this;
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
  forEach(t, s) {
    for (const i of this.set.keys())
      t.call(s, i, i, this);
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
class et {
  constructor(e) {
    /**
     * @internal
     */
    a(this, "_list");
    this._list = new x(e);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return et.name;
  }
  set capacity(e) {
    this._list.capacity = e;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  forEach(e, t) {
    this._list.forEach((s, i) => e.call(t, s, i, this), t);
  }
  has(e) {
    return this._list.has(e);
  }
  keys() {
    return this._list.keys();
  }
  last() {
    return this._list.at(-1);
  }
  pop() {
    return this._list.pop();
  }
  push(...e) {
    return this._list.push(...e);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  top() {
    return this._list.at(-1);
  }
  values() {
    return this._list.values();
  }
  addListener(e, t) {
    return this._list.addListener(e, t), this;
  }
  on(e, t) {
    return this._list.on(e, t), this;
  }
  prependListener(e, t) {
    return this._list.prependListener(e, t), this;
  }
  removeListener(e, t) {
    return this._list.removeListener(e, t), this;
  }
}
class rt {
  constructor(e) {
    /**
     * @internal
     */
    a(this, "list");
    this.list = new R(e);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return rt.name;
  }
  set capacity(e) {
    this.list.capacity = e;
  }
  clear() {
    this.list.clear();
  }
  entries() {
    return this.list.entries();
  }
  forEach(e, t) {
    return this.list.forEach((s, i) => e.call(t, s, i, this));
  }
  has(e) {
    return this.list.has(e);
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
  push(...e) {
    return this.list.push(...e);
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
  addListener(e, t) {
    return this.list.addListener(e, t), this;
  }
  on(e, t) {
    return this.list.on(e, t), this;
  }
  prependListener(e, t) {
    return this.list.prependListener(e, t), this;
  }
  removeListener(e, t) {
    return this.list.removeListener(e, t), this;
  }
}
export {
  y as BoundedEvent,
  R as CircularArrayList,
  j as CircularDeque,
  x as CircularDoublyLinkedList,
  Q as CircularLinkedDeque,
  L as CircularLinkedList,
  tt as CircularLinkedQueue,
  et as CircularLinkedStack,
  C as CircularMap,
  st as CircularQueue,
  it as CircularSet,
  O as CircularSkipList,
  rt as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
