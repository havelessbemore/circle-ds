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
var at = Object.defineProperty;
var ft = (n, e, t) => e in n ? at(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var c = (n, e, t) => (ft(n, typeof e != "symbol" ? e + "" : e, t), t);
const y = {
  Overflow: "overflow"
}, ct = {};
class N {
  constructor(e = new ct()) {
    /**
     * The event emitter.
     * @internal
     */
    c(this, "_emitter");
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
const H = 16383, q = 4294967295, A = Number.MAX_SAFE_INTEGER;
function P(n) {
  return Number.isInteger(n) && n >= 0 && n <= q;
}
function w(n) {
  return n === Number.POSITIVE_INFINITY;
}
function vt(n) {
  return typeof (n == null ? void 0 : n[Symbol.iterator]) == "function";
}
function pt(n) {
  return Number.isInteger(n) && n >= 0 && n <= A;
}
function R(n) {
  return typeof n == "number";
}
function I(n) {
  return Number.isSafeInteger(n) && n >= 0;
}
function v(n, e, t = 0) {
  return n >= t ? n : n + e;
}
function p(n, e, t) {
  if (e > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return n <= e ? e : n <= t ? n : t;
}
function m(n, e, t) {
  return n >= e && n < t;
}
function zt(n, e) {
  return n >= 0 && e > 0 ? Math.log(n) / Math.log(e) : NaN;
}
function yt(n = 0.5, e = 0, t = 1 / 0, i = Math.random) {
  for (; e < t && i() < n; )
    ++e;
  return e;
}
function f(n, e = 0) {
  return n = +n, isNaN(n) ? e : Math.trunc(n);
}
class b extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    c(this, "_capacity");
    /**
     * @internal
     * The index representing the first element.
     */
    c(this, "_head");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    c(this, "_isFinite");
    /**
     * @internal
     * The index one more than the last element.
     */
    c(this, "_next");
    /**
     * @internal
     * The number of elements.
     */
    c(this, "_size");
    /**
     * @internal
     * The stored values.
     */
    c(this, "_vals");
    if (this._capacity = q, this._head = 0, this._isFinite = !1, this._size = 0, this._next = 0, this._vals = [], !(t == null || w(t))) {
      if (R(t)) {
        if (!P(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t, this._isFinite = !0;
        return;
      }
      this._vals = Array.from(t), this._capacity = this._vals.length, this._isFinite = !0, this._size = this._capacity;
    }
  }
  get capacity() {
    return this._isFinite ? this._capacity : 1 / 0;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return b.name;
  }
  set capacity(t) {
    if (t = +t, w(t))
      t = q, this._isFinite = !1;
    else if (P(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size <= 0 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  at(t) {
    if (t = v(f(t, -1 / 0), this._size), !!m(t, 0, this._size))
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
  _copyWithin(t, i, s) {
    if (t == i || i >= s)
      return;
    const r = this._capacity - 1, h = this._vals, o = this.toRanges(i, s);
    if (t <= i || s <= t) {
      t = this.toIndex(t);
      for (const [_, u] of o)
        for (let l = _; l < u; ++l)
          h[t] = h[l], t = t < r ? t + 1 : 0;
    } else {
      t = this.toIndex(t + (s - i));
      for (const [_, u] of o.reverse())
        for (let l = u - 1; l >= _; --l)
          t = t > 0 ? t - 1 : r, h[t] = h[l];
    }
  }
  delete(t) {
    return t = v(f(t, -1 / 0), this._size), m(t, 0, this._size) ? (this._delete(t, 1), !0) : !1;
  }
  /**
   * @internal
   */
  _delete(t, i) {
    this._copyWithin(t, t + i, this._size), this._pop(i);
  }
  *entries() {
    for (let t = 0; t < this._size; ++t)
      yield [t, this._vals[this.toIndex(t)]];
  }
  fill(t, i, s) {
    const r = this._size;
    return i = p(v(f(i, 0), r), 0, r), s = p(v(f(s, r), r), i, r), this._fill(t, i, s), this;
  }
  /**
   * @internal
   */
  _fill(t, i, s) {
    for (const [r, h] of this.toRanges(i, s))
      this._vals.fill(t, r, h);
  }
  first() {
    return this._size > 0 ? this._vals[this._head] : void 0;
  }
  forEach(t, i) {
    const s = this._size;
    for (let r = 0; r < s && r < this._size; ++r) {
      const h = this._vals[this.toIndex(r)];
      t.call(i, h, r, this);
    }
  }
  has(t) {
    const i = this._vals;
    for (const [s, r] of this.toRanges(0, this._size))
      for (let h = s; h < r; ++h)
        if (t === i[h])
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
    const i = this._size - t;
    this._fill(void 0, i, this._size), this._next = this.toIndex(i), this._size = i;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._insert(this._size, t), this._size);
  }
  set(t, i) {
    if (t = v(f(t, -1 / 0), this._size), !m(t, 0, this._size))
      return;
    t = this.toIndex(t);
    const s = this._vals[t];
    return this._vals[t] = i, s;
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
  slice(t, i) {
    const s = this._size;
    return t = p(v(f(t, 0), s), 0, s), i = p(v(f(i, s), s), t, s), this.toList(this._slice(t, i));
  }
  /**
   * @internal
   */
  _slice(t, i) {
    const s = this._vals, r = new Array(i - t);
    let h = 0;
    for ([t, i] of this.toRanges(t, i))
      for (let o = t; o < i; ++o)
        r[h++] = s[o];
    return r;
  }
  splice(t, i, ...s) {
    const r = this._size;
    t = p(v(f(t, 0), r), 0, r), i = p(f(i, 0), 0, r - t);
    const h = this.toList(this._slice(t, t + i));
    return this._splice(t, i, s), h;
  }
  /**
   * @internal
   */
  _splice(t, i, s = []) {
    const r = s.length, h = Math.min(i, r), o = this._vals;
    let _ = 0;
    for (const [u, l] of this.toRanges(t, t + h))
      for (let a = u; a < l; ++a)
        o[a] = s[_++];
    i != r && (t += h, i < r ? this._insert(t, s, h) : this._delete(t, i - r));
  }
  /**
   * @internal
   */
  _insert(t, i, s = 0, r = i.length) {
    const h = r - s;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safeInsert(t, i, s, r);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, i, s, s + o), new Error("Out of memory");
    if (t > 0) {
      const u = Math.min(t, h - o);
      this._overflow(this._slice(0, u)), this._shift(u), t -= u, o += u;
    }
    if (o >= h) {
      this._safeInsert(t, i, s, r);
      return;
    }
    const _ = r - o;
    this._overflow(i.slice(s, _)), this._safePresert(0, i, _, r);
  }
  /**
   * @internal
   */
  _safeInsert(t, i, s = 0, r = i.length) {
    const h = r - s, o = this._vals;
    this._copyWithin(t + h, t, this._size);
    for (const [_, u] of this.toRanges(t, t + h))
      for (let l = _; l < u; ++l)
        o[l] = i[s++];
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
  _presert(t, i, s = 0, r = i.length) {
    const h = r - s;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safePresert(t, i, s, r);
      return;
    }
    if (!this._isFinite)
      throw this._safePresert(t, i, r - o, r), new Error("Out of memory");
    if (t < this._size) {
      const u = Math.min(this._size - t, h - o);
      this._overflow(this._slice(this._size - u, this._size)), this._pop(u), o += u;
    }
    if (o >= h) {
      this._safePresert(t, i, s, r);
      return;
    }
    const _ = s + o;
    this._overflow(i.slice(_, r)), this._safeInsert(this._size, i, s, _);
  }
  /**
   * @internal
   */
  _safePresert(t, i, s = 0, r = i.length) {
    const h = this._capacity, o = r - s, _ = this._vals, u = h - o;
    this._copyWithin(u, 0, t), t += u;
    for (const [l, a] of this.toRanges(t, t + o))
      for (let z = l; z < a; ++z)
        _[z] = i[s++];
    this._size += o, this._head = this.toIndex(u);
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
      const i = this._size - this._next;
      this._vals.copyWithin(i, 0, this._next), this._vals.copyWithin(0, this._head, this._head + i), this._vals.length = this._size, this._head = 0, this._next = this._size;
    } else if (this._head + this._size <= t)
      this._vals.length = this._head + this._size, this._vals.copyWithin(this._capacity, 0, this._next), this._vals.fill(void 0, 0, this._next), this._next = (this._head + this._size) % t;
    else {
      const i = t - this._capacity;
      this._vals.length = t, this._vals.copyWithin(this._capacity, 0, i), this._vals.copyWithin(0, i, this._next);
      const s = Math.max(i, this._next - i);
      this._vals.fill(void 0, s, this._next), this._next -= i;
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
    const i = this._head + this._size;
    return i <= t ? (this._vals.length = i, this._next = this._vals.length % t) : this._head >= t ? (this._vals.copyWithin(0, this._head, i), this._vals.length = this._size, this._head = 0, this._next = this._size % t) : (this._vals.copyWithin(0, t, i), this._vals.length = t, this._next = i - t), this._capacity = t, !0;
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
      const s = this._size - t;
      this._overflow(this._slice(0, s)), this._shift(s);
    }
    if (this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    const i = this._capacity - t;
    this._vals.copyWithin(this._head - i, this._head, this._capacity), this._vals.length = t, this._head -= i, this._capacity = t;
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
    const i = new b(0);
    return i._vals = t, i._size = t.length, i._capacity = t.length, i;
  }
  /**
   * @internal
   */
  toRanges(t, i) {
    const s = this._head, r = this._capacity - s;
    return i <= r ? [[s + t, s + i]] : t >= r ? [[t - r, i - r]] : [
      [s + t, this._capacity],
      [0, i - r]
    ];
  }
}
class Q {
  constructor(e) {
    /**
     * @internal
     */
    c(this, "_list");
    this._list = new b(e);
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
    return this._list.forEach((i, s) => e.call(t, i, s, this));
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
function Y(n, e) {
  if (e <= 0)
    return [void 0, void 0];
  const t = n.next, i = d(t, e - 1);
  return n.next = i.next, i.next = void 0, [t, i];
}
function* U(n, e) {
  for (let t = 0; n != e; ++t)
    yield [t, n.value], n = n.next;
}
function d(n, e) {
  if (!(e < 0)) {
    for (let t = 0; n != null && t < e; ++t)
      n = n.next;
    return n;
  }
}
function Z(n, e, t) {
  for (; n != t; ) {
    if (n.value === e)
      return !0;
    n = n.next;
  }
  return !1;
}
function* $(n, e) {
  for (let t = 0; n != e; ++t)
    yield t, n = n.next;
}
function G(n, e) {
  const t = [];
  for (; n != e; )
    t.push(n.value), n = n.next;
  return t;
}
function B(n) {
  const e = {};
  let t = 0, i = e;
  for (const s of n)
    i.next = { value: s }, i = i.next, ++t;
  return e.next === void 0 ? [void 0, void 0, 0] : [e.next, i, t];
}
function* T(n, e) {
  for (let t = 0; n != e; ++t)
    yield n.value, n = n.next;
}
function D(n, e) {
  if (e <= 0)
    return [void 0, void 0];
  const [t, i] = Y(n, e);
  return t.prev = void 0, n.next != null && (n.next.prev = n), [t, i];
}
function gt(n, e) {
  if (e >= 0)
    return d(n, e);
  for (let t = 0; n != null && t > e; --t)
    n = n.prev;
  return n;
}
function xt(n) {
  const e = {};
  let t = 0, i = e;
  for (const s of n)
    i.next = { prev: i, value: s }, i = i.next, ++t;
  return t <= 0 ? [void 0, void 0, 0] : (e.next.prev = void 0, [e.next, i, t]);
}
class S extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    c(this, "_capacity");
    /**
     * @internal
     * The root of the linked list
     */
    c(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    c(this, "_size");
    if (this._capacity = 1 / 0, this._root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, w(t))
      return;
    if (R(t)) {
      if (!I(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    const [i, s, r] = xt(t);
    this._capacity = r, r > 0 && (this._root.next = i, this._root.prev = s, i.prev = this._root, s.next = this._root, this._size = r);
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return S.name;
  }
  set capacity(t) {
    if (t = +t, !w(t) && !I(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [s, r] = D(this._root, i);
    this._size -= i, this._emitter.emit(y.Overflow, G(s, r.next));
  }
  at(t) {
    if (t = v(f(t, -1 / 0), this._size), !!m(t, 0, this._size))
      return this.get(t).value;
  }
  clear() {
    this._size = 0, this._root.next = this._root, this._root.prev = this._root;
  }
  delete(t) {
    if (t = v(f(t, -1 / 0), this._size), !m(t, 0, this._size))
      return !1;
    const i = this.get(t);
    return i.prev.next = i.next, i.next.prev = i.prev, --this._size, !0;
  }
  entries() {
    return U(this._root.next, this._root);
  }
  fill(t, i, s) {
    i = f(i, 0), i = p(v(i, this._size), 0, this._size), s = f(s, this._size), s = p(v(s, this._size), 0, this._size);
    let r = this.get(i);
    for (; i < s; )
      r.value = t, r = r.next, ++i;
    return this;
  }
  forEach(t, i) {
    let s = this._root;
    for (let r = 0; r < this._size; ++r)
      s = s.next, t.call(i, s.value, r, this);
  }
  has(t) {
    return Z(this._root.next, t, this._root);
  }
  keys() {
    return $(this._root.next, this._root);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this._root.prev;
    return t.prev.next = t.next, t.next.prev = t.prev, --this._size, t.value;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._emitter.emit(y.Overflow, t), this._size) : (this.append(this._root.prev, t), this._size);
  }
  set(t, i) {
    if (t = v(f(t, -1 / 0), this._size), !m(t, 0, this._size))
      return;
    const s = this.get(t), r = s.value;
    return s.value = i, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this._root.next;
    return t.prev.next = t.next, t.next.prev = t.prev, --this._size, t.value;
  }
  slice(t, i) {
    const s = new S();
    if (this._size <= 0)
      return s;
    t = f(t, 0), t = p(v(t, this._size), 0, this._size), i = f(i, this._size), i = p(v(i, this._size), 0, this._size);
    let r = this.get(t - 1);
    for (; t < i; )
      r = r.next, s.push(r.value), ++t;
    return s;
  }
  splice(t, i, ...s) {
    const r = new S();
    t = f(t, 0), t = p(v(t, this._size), 0, this._size), i = f(i, 0), i = p(i, 0, this._size - t);
    const h = this.get(t - 1);
    if (i > 0) {
      const [o, _] = D(h, i);
      this._size -= i, o.prev = r._root, _.next = r._root, r._root.next = o, r._root.prev = _, r._size = i;
    }
    return this.append(h, s), r;
  }
  [Symbol.iterator]() {
    return T(this._root.next, this._root);
  }
  unshift(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._emitter.emit(y.Overflow, t), this._size) : (this.prepend(this._root.next, t), this._size);
  }
  values() {
    return T(this._root.next, this._root);
  }
  /**
   * @internal
   */
  append(t, i) {
    const s = this._root, r = t.next, h = [], o = this._capacity;
    let _ = this._size;
    const u = i.length;
    for (let l = 0; l < u; ++l) {
      const a = { prev: t, value: i[l] };
      t.next = a, t = a, _ < o ? ++_ : (h.push(s.next.value), s.next = s.next.next);
    }
    return t.next = r, r.prev = t, s.next.prev = s, h.length > 0 && this._emitter.emit(y.Overflow, h), this._size = _, t;
  }
  /**
   * @internal
   */
  get(t) {
    return t -= t <= this._size / 2 ? -1 : this._size, gt(this._root, t);
  }
  /**
   * @internal
   */
  prepend(t, i) {
    const s = this._root, r = t.prev, h = [], o = this._capacity;
    let _ = this._size;
    for (let u = i.length - 1; u >= 0; --u) {
      const l = { next: t, value: i[u] };
      t.prev = l, t = l, _ < o ? ++_ : (h.push(s.prev.value), s.prev = s.prev.prev);
    }
    return t.prev = r, r.next = t, s.prev.next = s, h.length > 0 && this._emitter.emit(y.Overflow, h.reverse()), this._size = _, t;
  }
}
class C {
  constructor(e) {
    /**
     * @internal
     */
    c(this, "_list");
    this._list = new S(e);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return C.name;
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
    this._list.forEach((i, s) => e.call(t, i, s, this), t);
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
class O extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    c(this, "_capacity");
    /**
     * @internal
     * The root of the linked list
     */
    c(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    c(this, "_size");
    /**
     * @internal
     * The last node in the linked list.
     */
    c(this, "_tail");
    if (this._capacity = 1 / 0, this._root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, w(t))
      return;
    if (R(t)) {
      if (!I(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    const [i, s, r] = B(t);
    this._capacity = r, r > 0 && (this._root.next = i, this._tail = s, this._size = r);
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
    if (t = +t, !w(t) && !I(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [s] = Y(this._root, i);
    this._size -= i, this._size <= 0 && (this._tail = this._root), this._emitter.emit(y.Overflow, G(s));
  }
  at(t) {
    if (t = v(f(t, -1 / 0), this._size), !!m(t, 0, this._size))
      return ++t == this._size ? this._tail.value : d(this._root, t).value;
  }
  clear() {
    this._size = 0, this._root.next = void 0, this._tail = this._root;
  }
  delete(t) {
    if (t = v(f(t, -1 / 0), this._size), !m(t, 0, this._size))
      return !1;
    const i = d(this._root, t);
    return i.next = i.next.next, --this._size, t == this._size && (this._tail = i), !0;
  }
  entries() {
    return U(this._root.next);
  }
  fill(t, i, s) {
    i = f(i, 0), i = p(v(i, this._size), 0, this._size), s = f(s, this._size), s = p(v(s, this._size), 0, this._size);
    let r = d(this._root, i + 1);
    for (; i < s; )
      r.value = t, r = r.next, ++i;
    return this;
  }
  forEach(t, i) {
    let s = this._root;
    for (let r = 0; r < this._size; ++r)
      s = s.next, t.call(i, s.value, r, this);
  }
  has(t) {
    return Z(this._root.next, t);
  }
  keys() {
    return $(this._root.next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this._tail.value;
    return this._tail = d(this._root, --this._size), this._tail.next = void 0, t;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._emitter.emit(y.Overflow, t), this._size) : (this._tail = this._append(this._tail, t), this._size);
  }
  set(t, i) {
    if (t = v(f(t, -1 / 0), this._size), !m(t, 0, this._size))
      return;
    const s = d(this._root, t + 1), r = s.value;
    return s.value = i, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this._root.next;
    return this._root.next = t.next, --this._size, this._size <= 0 && (this._tail = this._root), t.value;
  }
  slice(t, i) {
    const s = new O();
    if (this._size <= 0)
      return s;
    t = f(t, 0), t = p(v(t, this._size), 0, this._size), i = f(i, this._size), i = p(v(i, this._size), 0, this._size);
    let r = d(this._root, t);
    for (; t < i; )
      r = r.next, s.push(r.value), ++t;
    return s;
  }
  splice(t, i, ...s) {
    const r = new O();
    t = f(t, 0), t = p(v(t, this._size), 0, this._size), i = f(i, 0), i = p(i, 0, this._size - t);
    let h = d(this._root, t);
    if (i > 0) {
      const [o, _] = Y(h, i);
      this._size -= i, r._root.next = o, r._tail = _, r._size = i;
    }
    return h = this._append(h, s), h.next == null && (this._tail = h), r;
  }
  [Symbol.iterator]() {
    return T(this._root.next);
  }
  unshift(...t) {
    let i = t.length;
    if (i <= 0)
      return this._size;
    const s = this._capacity;
    if (s <= 0)
      return this._emitter.emit(y.Overflow, t), this._size;
    const r = i <= s ? 0 : i - s;
    if (i -= r, this._size + i > s) {
      this._size = s - i;
      const _ = d(this._root, this._size);
      this._emitter.emit(y.Overflow, G(_.next)), _.next = void 0, this._tail = _;
    }
    r > 0 && (this._emitter.emit(y.Overflow, t.slice(i)), t.length = i);
    const [h, o] = B(t);
    return o.next = this._root.next, this._root.next = h, this._size <= 0 && (this._tail = o), this._size += i, this._size;
  }
  values() {
    return T(this._root.next);
  }
  /**
   * @internal
   */
  _append(t, i, s = 0) {
    const r = this._root, h = t.next, o = [], _ = this._capacity;
    let u = this._size;
    const l = i.length;
    for (let a = s; a < l; ++a) {
      const z = { value: i[a] };
      t.next = z, t = z, u < _ ? ++u : (o.push(r.next.value), r.next = r.next.next);
    }
    return t.next = h, o.length > 0 && this._emitter.emit(y.Overflow, o), this._size = u, t;
  }
}
class tt {
  constructor(e) {
    /**
     * @internal
     */
    c(this, "_list");
    this._list = new O(e);
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
    this._list.forEach((i, s) => e.call(t, i, s, this), t);
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
class it {
  constructor(e) {
    /**
     * @internal
     */
    c(this, "_list");
    this._list = new S(e);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return it.name;
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
    this._list.forEach((i, s) => e.call(t, i, s, this), t);
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
class et extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    c(this, "_capacity");
    /**
     * @internal
     * The internal map.
     */
    c(this, "_map");
    if (this._capacity = 1 / 0, this._map = /* @__PURE__ */ new Map(), t = t ?? 1 / 0, !w(t)) {
      if (R(t)) {
        if (!I(t))
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
    return et.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(t) {
    if (t = +t, !w(t) && !I(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this._map);
      this.clear(), this._emitter.emit(y.Overflow, r);
      return;
    }
    const i = [], s = this._map.entries();
    for (let r = this.size - t; r > 0; --r) {
      const h = s.next().value;
      this._map.delete(h[0]), i.push(h);
    }
    this._emitter.emit(y.Overflow, i);
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
  forEach(t, i) {
    for (const [s, r] of this._map.entries())
      t.call(i, r, s, this);
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
  set(t, i) {
    if (this.capacity < 1)
      return this._emitter.emit(y.Overflow, [[t, i]]), this;
    const s = [];
    if (!this._map.delete(t) && this.size >= this.capacity) {
      const r = this._map.entries().next().value;
      this._map.delete(r[0]), s.push(r);
    }
    return this._map.set(t, i), s.length > 0 && this._emitter.emit(y.Overflow, s), this;
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
class st {
  constructor(e) {
    /**
     * @internal
     */
    c(this, "list");
    this.list = new b(e);
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
    return this.list.forEach((i, s) => e.call(t, i, s, this));
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
class rt extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    c(this, "_capacity");
    /**
     * @internal
     * The internal set.
     */
    c(this, "set");
    if (this._capacity = 1 / 0, this.set = /* @__PURE__ */ new Set(), t = t ?? 1 / 0, !w(t)) {
      if (R(t)) {
        if (!I(t))
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
    return rt.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(t) {
    if (t = +t, !w(t) && !I(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this.set);
      this.clear(), this._emitter.emit(y.Overflow, r);
      return;
    }
    const i = [], s = this.set.values();
    for (let r = this.size - t; r > 0; --r) {
      const h = s.next().value;
      this.set.delete(h), i.push(h);
    }
    this._emitter.emit(y.Overflow, i);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this._emitter.emit(y.Overflow, [t]), this;
    const i = [];
    if (!this.set.delete(t) && this.size >= this.capacity) {
      const s = this.set.values().next().value;
      this.set.delete(s), i.push(s);
    }
    return this.set.add(t), i.length > 0 && this._emitter.emit(y.Overflow, i), this;
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
function* j(n, e) {
  if (e < 1)
    return;
  let t = [];
  e = Math.trunc(e);
  for (const i of n)
    t.push(i) >= e && (yield t, t = []);
  t.length > 0 && (yield t);
}
function K(n, e) {
  return n <= 0 || e <= 1 ? 1 : n >= 1 ? 1 / 0 : Math.ceil(zt(e, 1 / n));
}
function mt(n, e) {
  for (; n != null && n.levels.length <= e; )
    n = n.levels[n.levels.length - 1].next;
  return n;
}
function wt(n, e, t) {
  let i = n.levels.length;
  const s = E(void 0, i);
  if (t <= 0)
    return [s, [s], 0];
  const r = new Array(i).fill(s), h = new Array(i).fill(-1);
  let o = nt(n, e)[0];
  o = o.levels[0].next, i = 1;
  let _ = 0, u = 0;
  for (; o != null && _ < t; ) {
    const l = o.levels.length;
    i = i >= l ? i : l;
    const a = E(o.value, l);
    for (let g = 0; g < l; ++g)
      r[g].levels[g] = { next: a, span: u - h[g] }, r[g] = a, h[g] = u;
    const { next: z, span: x } = o.levels[0];
    u += x, o = z, ++_;
  }
  r.length = i, s.levels.length = i, u = h[0] + 1;
  for (let l = 0; l < i; ++l)
    r[l].levels[l] = { next: void 0, span: u - h[l] };
  return [s, r, _];
}
function* dt(n, e) {
  for (let t = 0; n != null && n != e; ++t)
    yield [t, n.value], n = n.levels[0].next;
}
function E(n, e = 1, t = 1, i) {
  const s = new Array(e);
  for (let r = 0; r < e; ++r)
    s[r] = { next: i, span: t };
  return { value: n, levels: s };
}
function k(n, e) {
  return [n, e] = nt(n, e), e === 0 ? n : void 0;
}
function nt(n, e) {
  if (e <= 0)
    return [n, e];
  let t = n.levels.length - 1;
  for (; ; ) {
    const { next: i, span: s } = n.levels[t];
    if (!(s <= e && i != null)) {
      if (--t < 0)
        return [n, e];
      continue;
    }
    if (s == e)
      return [i, 0];
    e -= s, n = i;
  }
}
function It(n, e, t) {
  for (; n != t; ) {
    if (n.value === e)
      return !0;
    n = n.levels[0].next;
  }
  return !1;
}
function* Lt(n, e) {
  for (let t = 0; n != e; ++t)
    yield t, n = n.levels[0].next;
}
function Et(n, e) {
  let t = -1 / 0;
  const i = Math.min(n.length, e.length);
  for (let h = 0; h < i; ++h)
    t < n[h] && (t = n[h]);
  if (t <= 0 || i <= 0) {
    const h = E(void 0);
    return [h, [h], 0];
  }
  const s = E(void 0, t, i + 1), r = new Array(t).fill(s);
  for (let h = 0; h < i; ++h) {
    const o = i - h, _ = n[h], u = E(e[h], _, o);
    for (let l = 0; l < _; ++l) {
      const a = r[l].levels;
      a[l] = { next: u, span: a[l].span - o }, r[l] = u;
    }
  }
  return [s, r, i];
}
function St(n, e) {
  for (n = mt(n, e); n != null; ) {
    const t = n.levels[e].next;
    n.levels.length = e, n = t;
  }
}
function* M(n, e) {
  for (; n != null && n != e; )
    yield n.value, n = n.levels[0].next;
}
function bt(n) {
  const e = n.length, t = new Array(e);
  for (let i = 0; i < e; ++i) {
    const { index: s, node: r } = n[i];
    t[i] = { index: s, node: r };
  }
  return t;
}
function J(n, e = 0) {
  const t = n.levels.length, i = new Array(t);
  for (let s = 0; s < t; ++s)
    i[s] = { index: e, node: n };
  return i;
}
function W(n, e) {
  if (e <= 0 || n.length <= 0)
    return n;
  let t = n.length - 1, i = n[t];
  const s = n[0].index + e;
  for (; ; ) {
    const { next: r, span: h } = i.node.levels[t], o = i.index + h;
    if (!(o <= s && r != null)) {
      if (--t < 0)
        break;
      i = n[t];
      continue;
    }
    if (i = { index: o, node: r }, n[t] = i, o == s)
      break;
  }
  for (let r = 0; r < t; ++r)
    n[r] = { index: i.index, node: i.node };
  return n;
}
class F extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    c(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    c(this, "_isFinite");
    /**
     * @internal
     * The maximum number of levels in the skip list.
     */
    c(this, "_maxLevel");
    /**
     * @internal
     * The probability factor used to randomly determine the levels
     * of new nodes. Should be a value between 0 and 1, where a lower
     * value results in fewer levels on average.
     */
    c(this, "_p");
    /**
     * @internal
     * The root of the skip list
     */
    c(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    c(this, "_size");
    /**
     * @internal
     * The last node in the linked list.
     */
    c(this, "_tail");
    if (this._capacity = A, this._isFinite = !1, this._p = 0.5, this._maxLevel = K(this._p, A), this._root = E(void 0), this._size = 0, this._tail = this._root, t != null) {
      if (R(t)) {
        this.capacity = t;
        return;
      }
      if (!vt(t)) {
        this.capacity = t.capacity ?? this._capacity, this.p = t.p ?? this._p;
        const i = t.expectedSize ?? this._capacity;
        this.maxLevel = t.maxLevel ?? K(this._p, i);
        return;
      }
      for (const i of j(t, H))
        this._insert(this._size, i);
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
    return F.name;
  }
  set capacity(t) {
    if (t = +t, w(t))
      t = A, this._isFinite = !1;
    else if (pt(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const [i] = this._delete(0, this._size - t);
    this._overflow(M(i.levels[0].next));
  }
  set maxLevel(t) {
    if (t = +t, !P(t) || t <= 0)
      throw new RangeError("Invalid maxLevel");
    this._maxLevel = t, t < this.levels && St(this._root, t);
  }
  set p(t) {
    if (t = +t, isNaN(t) || t < 0 || t > 1)
      throw new RangeError("Invalid p");
    this._p = t;
  }
  at(t) {
    if (t = v(f(t, -1 / 0), this._size), !!m(t, 0, this._size))
      return k(this._root, t + 1).value;
  }
  clear() {
    this._size = 0, this._tail = this._root, this._root.levels.length = 1, this._root.levels[0] = { next: void 0, span: 1 };
  }
  delete(t) {
    return t = v(f(t, -1 / 0), this._size), m(t, 0, this._size) ? (this._delete(t, 1), !0) : !1;
  }
  entries() {
    return dt(this._root.levels[0].next);
  }
  fill(t, i, s) {
    const r = this._size;
    if (i = p(v(f(i, 0), r), 0, r), s = p(v(f(s, r), r), i, r), i >= s)
      return this;
    let h = k(this._root, i + 1);
    for (let o = i; o < s; ++o)
      h.value = t, h = h.levels[0].next;
    return this;
  }
  forEach(t, i) {
    let s = this._root;
    for (let r = 0; r < this._size; ++r)
      s = s.levels[0].next, t.call(i, s.value, r, this);
  }
  has(t) {
    return It(this._root.levels[0].next, t);
  }
  keys() {
    return Lt(this._root.levels[0].next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const [t] = this._delete(this._size - 1, 1);
    return t.levels[0].next.value;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._insert(this._size, t), this._size);
  }
  set(t, i) {
    if (t = v(f(t, -1 / 0), this._size), !m(t, 0, this._size))
      return;
    const s = k(this._root, t + 1), r = s.value;
    return s.value = i, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const [t] = this._delete(0, 1);
    return t.levels[0].next.value;
  }
  slice(t, i) {
    const s = this._size;
    t = p(v(f(t, 0), s), 0, s), i = p(v(f(i, s), s), t, s);
    const [r, h, o] = wt(
      this._root,
      t,
      i - t
    ), _ = new F({
      capacity: o,
      p: this._p,
      maxLevel: this._maxLevel
    });
    return _._root = r, _._tail = h[0], _._size = o, _;
  }
  splice(t, i, ...s) {
    const r = this._size;
    t = p(v(f(t, 0), r), 0, r), i = p(f(i, 0), 0, r - t);
    const [h, o] = this._delete(t, i);
    this._insert(t, s);
    const _ = new F({
      capacity: i,
      p: this._p,
      maxLevel: this._maxLevel
    });
    return _._root = h, _._tail = o[0], _._size = i, _;
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._presert(0, t), this._size);
  }
  values() {
    return M(this._root.levels[0].next);
  }
  /**
   * @internal
   */
  _delete(t, i) {
    const s = E(void 0), r = [s];
    if (i <= 0)
      return [s, r, 0];
    const h = this._root, o = W(J(h, -1), t), _ = W(bt(o), i), u = this.levels, l = t + i;
    let a;
    for (a = 0; a < u; ++a) {
      const z = o[a], x = _[a];
      if (z.index >= x.index)
        break;
      let g = z.node.levels[a], L = z.index + g.span - t;
      s.levels[a] = { next: g.next, span: L }, g = x.node.levels[a], L = x.index - z.index + (g.span - i), z.node.levels[a] = { next: g.next, span: L }, x.node.levels[a] = { next: void 0, span: l - x.index }, r[a] = x.node;
    }
    for (; a < u; ) {
      const z = o[a], x = _[a], { next: g, span: L } = x.node.levels[a];
      if (z.index < 0 && g === void 0) {
        h.levels.length = a;
        break;
      }
      const V = x.index - z.index - i;
      z.node.levels[a] = { next: g, span: L + V }, ++a;
    }
    return l >= this._size && (this._tail = o[0].node), this._size -= i, [s, r, i];
  }
  /**
   * @internal
   */
  _genLevels(t) {
    const i = new Array(t);
    for (let s = 0; s < t; ++s)
      i[s] = yt(this._p, 1, this._maxLevel);
    return i;
  }
  /**
   * @internal
   */
  _insert(t, i) {
    const s = i.length;
    let r = this._capacity - this._size;
    if (r >= s) {
      this._safeInsert(t, i);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, i.slice(0, r)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, s - r), [_] = this._delete(0, o);
      this._overflow(M(_.levels[0].next)), t -= o, r += o;
    }
    if (r >= s) {
      this._safeInsert(t, i);
      return;
    }
    const h = i.length - r;
    this._overflow(i.slice(0, h)), this._safeInsert(0, i.slice(h));
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(t) {
    if (Array.isArray(t))
      this._emitter.emit(y.Overflow, t);
    else
      for (const i of j(t, H))
        this._emitter.emit(y.Overflow, i);
  }
  /**
   * @internal
   */
  _presert(t, i) {
    const s = i.length;
    let r = this._capacity - this._size;
    if (r >= s) {
      this._safeInsert(t, i);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, i.slice(i.length - r)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, s - r), [o] = this._delete(this._size - h, h);
      this._overflow(M(o.levels[0].next)), r += h;
    }
    if (r >= s) {
      this._safeInsert(t, i);
      return;
    }
    this._overflow(i.slice(r)), this._safeInsert(this._size, i.slice(0, r));
  }
  /**
   * @internal
   */
  _safeInsert(t, i) {
    if (i.length <= 0)
      return;
    const s = i.length, [r, h] = Et(this._genLevels(s), i), o = h.length;
    for (let l = this.levels; l < o; ++l)
      this._root.levels[l] = { next: void 0, span: this._size + 1 };
    const _ = W(J(this._root, -1), t);
    for (let l = 0; l < o; ++l) {
      const a = _[l].node, z = _[l].index, x = a.levels[l], g = h[l], L = g.levels[l], ot = z + x.span - t, lt = L.span;
      g.levels[l] = { next: x.next, span: ot + lt };
      const X = r.levels[l], _t = X.span - 1, ut = t - z;
      a.levels[l] = { next: X.next, span: ut + _t };
    }
    const u = this.levels;
    for (let l = o; l < u; ++l) {
      const a = _[l].node.levels, { next: z, span: x } = a[l];
      a[l] = { next: z, span: x + s };
    }
    t === this._size && (this._tail = h[0]), this._size += s;
  }
}
class ht {
  constructor(e) {
    /**
     * @internal
     */
    c(this, "list");
    this.list = new b(e);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return ht.name;
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
    return this.list.forEach((i, s) => e.call(t, i, s, this));
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
  b as CircularArrayList,
  Q as CircularDeque,
  S as CircularDoublyLinkedList,
  C as CircularLinkedDeque,
  O as CircularLinkedList,
  tt as CircularLinkedQueue,
  it as CircularLinkedStack,
  et as CircularMap,
  st as CircularQueue,
  rt as CircularSet,
  F as CircularSkipList,
  ht as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
