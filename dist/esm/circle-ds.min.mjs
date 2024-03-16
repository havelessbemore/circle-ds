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
var lt = (n, s, t) => s in n ? ot(n, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[s] = t;
var f = (n, s, t) => (lt(n, typeof s != "symbol" ? s + "" : s, t), t);
const z = {
  Overflow: "overflow"
}, _t = {};
class N {
  constructor(s = new _t()) {
    /**
     * The event emitter.
     * @internal
     */
    f(this, "_emitter");
    this._emitter = s;
  }
  addListener(s, t) {
    return this._emitter.addListener(s, t), this;
  }
  on(s, t) {
    return this._emitter.on(s, t), this;
  }
  prependListener(s, t) {
    return this._emitter.prependListener(s, t), this;
  }
  removeListener(s, t) {
    return this._emitter.removeListener(s, t), this;
  }
}
const V = 16383, T = 4294967295, M = Number.MAX_SAFE_INTEGER;
function W(n) {
  return Number.isInteger(n) && n >= 0 && n <= T;
}
function x(n) {
  return n === Number.POSITIVE_INFINITY;
}
function ut(n) {
  return typeof (n == null ? void 0 : n[Symbol.iterator]) == "function";
}
function at(n) {
  return Number.isInteger(n) && n >= 0 && n <= M;
}
function b(n) {
  return typeof n == "number";
}
function d(n) {
  return Number.isSafeInteger(n) && n >= 0;
}
function c(n, s, t = 0) {
  return n >= t ? n : n + s;
}
function p(n, s, t) {
  if (s > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return n <= s ? s : n <= t ? n : t;
}
function g(n, s, t) {
  return n >= s && n < t;
}
function ft(n, s) {
  return n >= 0 && s > 0 ? Math.log(n) / Math.log(s) : NaN;
}
function ct(n = 0.5, s = 0, t = 1 / 0, i = Math.random) {
  for (; s < t && i() < n; )
    ++s;
  return s;
}
function a(n, s = 0) {
  return n = +n, isNaN(n) ? s : Math.trunc(n);
}
class S extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    f(this, "_capacity");
    /**
     * @internal
     * The index representing the first element.
     */
    f(this, "_head");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    f(this, "_isFinite");
    /**
     * @internal
     * The index one more than the last element.
     */
    f(this, "_next");
    /**
     * @internal
     * The number of elements.
     */
    f(this, "_size");
    /**
     * @internal
     * The stored values.
     */
    f(this, "_vals");
    if (this._capacity = T, this._head = 0, this._isFinite = !1, this._size = 0, this._next = 0, this._vals = [], !(t == null || x(t))) {
      if (b(t)) {
        if (!W(t))
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
    return S.name;
  }
  set capacity(t) {
    if (t = +t, x(t))
      t = T, this._isFinite = !1;
    else if (W(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size <= 0 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  at(t) {
    if (t = c(a(t, -1 / 0), this._size), !!g(t, 0, this._size))
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
  _copyWithin(t, i, e) {
    if (t == i || i >= e)
      return;
    const r = this._capacity - 1, h = this._vals, o = this.toRanges(i, e);
    if (t <= i || e <= t) {
      t = this.toIndex(t);
      for (const [_, l] of o)
        for (let u = _; u < l; ++u)
          h[t] = h[u], t = t < r ? t + 1 : 0;
    } else {
      t = this.toIndex(t + (e - i));
      for (const [_, l] of o.reverse())
        for (let u = l - 1; u >= _; --u)
          t = t > 0 ? t - 1 : r, h[t] = h[u];
    }
  }
  delete(t) {
    return t = c(a(t, -1 / 0), this._size), g(t, 0, this._size) ? (this._delete(t, 1), !0) : !1;
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
  fill(t, i, e) {
    const r = this._size;
    return i = p(c(a(i, 0), r), 0, r), e = p(c(a(e, r), r), i, r), this._fill(t, i, e), this;
  }
  /**
   * @internal
   */
  _fill(t, i, e) {
    for (const [r, h] of this.toRanges(i, e))
      this._vals.fill(t, r, h);
  }
  first() {
    return this._size > 0 ? this._vals[this._head] : void 0;
  }
  forEach(t, i) {
    const e = this._size;
    for (let r = 0; r < e && r < this._size; ++r) {
      const h = this._vals[this.toIndex(r)];
      t.call(i, h, r, this);
    }
  }
  has(t) {
    const i = this._vals;
    for (const [e, r] of this.toRanges(0, this._size))
      for (let h = e; h < r; ++h)
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
    if (t = c(a(t, -1 / 0), this._size), !g(t, 0, this._size))
      return;
    t = this.toIndex(t);
    const e = this._vals[t];
    return this._vals[t] = i, e;
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
    const e = this._size;
    return t = p(c(a(t, 0), e), 0, e), i = p(c(a(i, e), e), t, e), this.toList(this._slice(t, i));
  }
  /**
   * @internal
   */
  _slice(t, i) {
    const e = this._vals, r = new Array(i - t);
    let h = 0;
    for ([t, i] of this.toRanges(t, i))
      for (let o = t; o < i; ++o)
        r[h++] = e[o];
    return r;
  }
  splice(t, i, ...e) {
    const r = this._size;
    t = p(c(a(t, 0), r), 0, r), i = p(a(i, 0), 0, r - t);
    const h = this.toList(this._slice(t, t + i));
    return this._splice(t, i, e), h;
  }
  /**
   * @internal
   */
  _splice(t, i, e = []) {
    const r = e.length, h = Math.min(i, r), o = this._vals;
    let _ = 0;
    for (const [l, u] of this.toRanges(t, t + h))
      for (let v = l; v < u; ++v)
        o[v] = e[_++];
    i != r && (t += h, i < r ? this._insert(t, e, h) : this._delete(t, i - r));
  }
  /**
   * @internal
   */
  _insert(t, i, e = 0, r = i.length) {
    const h = r - e;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safeInsert(t, i, e, r);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, i, e, e + o), new Error("Out of memory");
    if (t > 0) {
      const l = Math.min(t, h - o);
      this._overflow(this._slice(0, l)), this._shift(l), t -= l, o += l;
    }
    if (o >= h) {
      this._safeInsert(t, i, e, r);
      return;
    }
    const _ = r - o;
    this._overflow(i.slice(e, _)), this._safePresert(0, i, _, r);
  }
  /**
   * @internal
   */
  _safeInsert(t, i, e = 0, r = i.length) {
    const h = r - e, o = this._vals;
    this._copyWithin(t + h, t, this._size);
    for (const [_, l] of this.toRanges(t, t + h))
      for (let u = _; u < l; ++u)
        o[u] = i[e++];
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
  _presert(t, i, e = 0, r = i.length) {
    const h = r - e;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safePresert(t, i, e, r);
      return;
    }
    if (!this._isFinite)
      throw this._safePresert(t, i, r - o, r), new Error("Out of memory");
    if (t < this._size) {
      const l = Math.min(this._size - t, h - o);
      this._overflow(this._slice(this._size - l, this._size)), this._pop(l), o += l;
    }
    if (o >= h) {
      this._safePresert(t, i, e, r);
      return;
    }
    const _ = e + o;
    this._overflow(i.slice(_, r)), this._safeInsert(this._size, i, e, _);
  }
  /**
   * @internal
   */
  _safePresert(t, i, e = 0, r = i.length) {
    const h = this._capacity, o = r - e, _ = this._vals, l = h - o;
    this._copyWithin(l, 0, t), t += l;
    for (const [u, v] of this.toRanges(t, t + o))
      for (let y = u; y < v; ++y)
        _[y] = i[e++];
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
    this._emitter.emit(z.Overflow, t);
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
      const e = Math.max(i, this._next - i);
      this._vals.fill(void 0, e, this._next), this._next -= i;
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
      const e = this._size - t;
      this._overflow(this._slice(0, e)), this._shift(e);
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
    const i = new S(0);
    return i._vals = t, i._size = t.length, i._capacity = t.length, i;
  }
  /**
   * @internal
   */
  toRanges(t, i) {
    const e = this._head, r = this._capacity - e;
    return i <= r ? [[e + t, e + i]] : t >= r ? [[t - r, i - r]] : [
      [e + t, this._capacity],
      [0, i - r]
    ];
  }
}
class j {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "_list");
    this._list = new S(s);
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
  set capacity(s) {
    this._list.capacity = s;
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
  forEach(s, t) {
    return this._list.forEach((i, e) => s.call(t, i, e, this));
  }
  front() {
    return this._list.first();
  }
  has(s) {
    return this._list.has(s);
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
  push(...s) {
    return this._list.push(...s);
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
  unshift(...s) {
    return this._list.unshift(...s);
  }
  values() {
    return this._list.values();
  }
  addListener(s, t) {
    return this._list.addListener(s, t), this;
  }
  on(s, t) {
    return this._list.on(s, t), this;
  }
  prependListener(s, t) {
    return this._list.prependListener(s, t), this;
  }
  removeListener(s, t) {
    return this._list.removeListener(s, t), this;
  }
}
function q(n, s) {
  if (s <= 0)
    return [void 0, void 0];
  const t = n.next, i = m(t, s - 1);
  return n.next = i.next, i.next = void 0, [t, i];
}
function* K(n, s) {
  for (let t = 0; n != s; ++t)
    yield [t, n.value], n = n.next;
}
function m(n, s) {
  if (!(s < 0)) {
    for (let t = 0; n != null && t < s; ++t)
      n = n.next;
    return n;
  }
}
function J(n, s, t) {
  for (; n != t; ) {
    if (n.value === s)
      return !0;
    n = n.next;
  }
  return !1;
}
function* Q(n, s) {
  for (let t = 0; n != s; ++t)
    yield t, n = n.next;
}
function P(n, s) {
  const t = [];
  for (; n != s; )
    t.push(n.value), n = n.next;
  return t;
}
function X(n) {
  const s = {};
  let t = 0, i = s;
  for (const e of n)
    i.next = { value: e }, i = i.next, ++t;
  return s.next === void 0 ? [void 0, void 0, 0] : [s.next, i, t];
}
function* F(n, s) {
  for (let t = 0; n != s; ++t)
    yield n.value, n = n.next;
}
function H(n, s) {
  if (s <= 0)
    return [void 0, void 0];
  const [t, i] = q(n, s);
  return t.prev = void 0, n.next != null && (n.next.prev = n), [t, i];
}
function vt(n, s) {
  if (s >= 0)
    return m(n, s);
  for (let t = 0; n != null && t > s; --t)
    n = n.prev;
  return n;
}
function pt(n) {
  const s = {};
  let t = 0, i = s;
  for (const e of n)
    i.next = { prev: i, value: e }, i = i.next, ++t;
  return t <= 0 ? [void 0, void 0, 0] : (s.next.prev = void 0, [s.next, i, t]);
}
class E extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    f(this, "_capacity");
    /**
     * @internal
     * The root of the linked list
     */
    f(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    f(this, "_size");
    if (this._capacity = 1 / 0, this._root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, x(t))
      return;
    if (b(t)) {
      if (!d(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    const [i, e, r] = pt(t);
    this._capacity = r, r > 0 && (this._root.next = i, this._root.prev = e, i.prev = this._root, e.next = this._root, this._size = r);
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return E.name;
  }
  set capacity(t) {
    if (t = +t, !x(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [e, r] = H(this._root, i);
    this._size -= i, this._emitter.emit(z.Overflow, P(e, r.next));
  }
  at(t) {
    if (t = c(a(t, -1 / 0), this._size), !!g(t, 0, this._size))
      return this.get(t).value;
  }
  clear() {
    this._size = 0, this._root.next = this._root, this._root.prev = this._root;
  }
  delete(t) {
    if (t = c(a(t, -1 / 0), this._size), !g(t, 0, this._size))
      return !1;
    const i = this.get(t);
    return i.prev.next = i.next, i.next.prev = i.prev, --this._size, !0;
  }
  entries() {
    return K(this._root.next, this._root);
  }
  fill(t, i, e) {
    i = a(i, 0), i = p(c(i, this._size), 0, this._size), e = a(e, this._size), e = p(c(e, this._size), 0, this._size);
    let r = this.get(i);
    for (; i < e; )
      r.value = t, r = r.next, ++i;
    return this;
  }
  forEach(t, i) {
    let e = this._root;
    for (let r = 0; r < this._size; ++r)
      e = e.next, t.call(i, e.value, r, this);
  }
  has(t) {
    return J(this._root.next, t, this._root);
  }
  keys() {
    return Q(this._root.next, this._root);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this._root.prev;
    return t.prev.next = t.next, t.next.prev = t.prev, --this._size, t.value;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._emitter.emit(z.Overflow, t), this._size) : (this.append(this._root.prev, t), this._size);
  }
  set(t, i) {
    if (t = c(a(t, -1 / 0), this._size), !g(t, 0, this._size))
      return;
    const e = this.get(t), r = e.value;
    return e.value = i, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this._root.next;
    return t.prev.next = t.next, t.next.prev = t.prev, --this._size, t.value;
  }
  slice(t, i) {
    const e = new E();
    if (this._size <= 0)
      return e;
    t = a(t, 0), t = p(c(t, this._size), 0, this._size), i = a(i, this._size), i = p(c(i, this._size), 0, this._size);
    let r = this.get(t - 1);
    for (; t < i; )
      r = r.next, e.push(r.value), ++t;
    return e;
  }
  splice(t, i, ...e) {
    const r = new E();
    t = a(t, 0), t = p(c(t, this._size), 0, this._size), i = a(i, 0), i = p(i, 0, this._size - t);
    const h = this.get(t - 1);
    if (i > 0) {
      const [o, _] = H(h, i);
      this._size -= i, o.prev = r._root, _.next = r._root, r._root.next = o, r._root.prev = _, r._size = i;
    }
    return this.append(h, e), r;
  }
  [Symbol.iterator]() {
    return F(this._root.next, this._root);
  }
  unshift(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._emitter.emit(z.Overflow, t), this._size) : (this.prepend(this._root.next, t), this._size);
  }
  values() {
    return F(this._root.next, this._root);
  }
  /**
   * @internal
   */
  append(t, i) {
    const e = this._root, r = t.next, h = [], o = this._capacity;
    let _ = this._size;
    const l = i.length;
    for (let u = 0; u < l; ++u) {
      const v = { prev: t, value: i[u] };
      t.next = v, t = v, _ < o ? ++_ : (h.push(e.next.value), e.next = e.next.next);
    }
    return t.next = r, r.prev = t, e.next.prev = e, h.length > 0 && this._emitter.emit(z.Overflow, h), this._size = _, t;
  }
  /**
   * @internal
   */
  get(t) {
    return t -= t <= this._size / 2 ? -1 : this._size, vt(this._root, t);
  }
  /**
   * @internal
   */
  prepend(t, i) {
    const e = this._root, r = t.prev, h = [], o = this._capacity;
    let _ = this._size;
    for (let l = i.length - 1; l >= 0; --l) {
      const u = { next: t, value: i[l] };
      t.prev = u, t = u, _ < o ? ++_ : (h.push(e.prev.value), e.prev = e.prev.prev);
    }
    return t.prev = r, r.next = t, e.prev.next = e, h.length > 0 && this._emitter.emit(z.Overflow, h.reverse()), this._size = _, t;
  }
}
class U {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "_list");
    this._list = new E(s);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return U.name;
  }
  set capacity(s) {
    this._list.capacity = s;
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
  forEach(s, t) {
    this._list.forEach((i, e) => s.call(t, i, e, this), t);
  }
  has(s) {
    return this._list.has(s);
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
  push(...s) {
    return this._list.push(...s);
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
  unshift(...s) {
    return this._list.unshift(...s);
  }
  values() {
    return this._list.values();
  }
  addListener(s, t) {
    return this._list.addListener(s, t), this;
  }
  on(s, t) {
    return this._list.on(s, t), this;
  }
  prependListener(s, t) {
    return this._list.prependListener(s, t), this;
  }
  removeListener(s, t) {
    return this._list.removeListener(s, t), this;
  }
}
class R extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    f(this, "_capacity");
    /**
     * @internal
     * The root of the linked list
     */
    f(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    f(this, "_size");
    /**
     * @internal
     * The last node in the linked list.
     */
    f(this, "_tail");
    if (this._capacity = 1 / 0, this._root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, x(t))
      return;
    if (b(t)) {
      if (!d(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    const [i, e, r] = X(t);
    this._capacity = r, r > 0 && (this._root.next = i, this._tail = e, this._size = r);
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return R.name;
  }
  set capacity(t) {
    if (t = +t, !x(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [e] = q(this._root, i);
    this._size -= i, this._size <= 0 && (this._tail = this._root), this._emitter.emit(z.Overflow, P(e));
  }
  at(t) {
    if (t = c(a(t, -1 / 0), this._size), !!g(t, 0, this._size))
      return ++t == this._size ? this._tail.value : m(this._root, t).value;
  }
  clear() {
    this._size = 0, this._root.next = void 0, this._tail = this._root;
  }
  delete(t) {
    if (t = c(a(t, -1 / 0), this._size), !g(t, 0, this._size))
      return !1;
    const i = m(this._root, t);
    return i.next = i.next.next, --this._size, t == this._size && (this._tail = i), !0;
  }
  entries() {
    return K(this._root.next);
  }
  fill(t, i, e) {
    i = a(i, 0), i = p(c(i, this._size), 0, this._size), e = a(e, this._size), e = p(c(e, this._size), 0, this._size);
    let r = m(this._root, i + 1);
    for (; i < e; )
      r.value = t, r = r.next, ++i;
    return this;
  }
  forEach(t, i) {
    let e = this._root;
    for (let r = 0; r < this._size; ++r)
      e = e.next, t.call(i, e.value, r, this);
  }
  has(t) {
    return J(this._root.next, t);
  }
  keys() {
    return Q(this._root.next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this._tail.value;
    return this._tail = m(this._root, --this._size), this._tail.next = void 0, t;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._emitter.emit(z.Overflow, t), this._size) : (this._tail = this._append(this._tail, t), this._size);
  }
  set(t, i) {
    if (t = c(a(t, -1 / 0), this._size), !g(t, 0, this._size))
      return;
    const e = m(this._root, t + 1), r = e.value;
    return e.value = i, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this._root.next;
    return this._root.next = t.next, --this._size, this._size <= 0 && (this._tail = this._root), t.value;
  }
  slice(t, i) {
    const e = new R();
    if (this._size <= 0)
      return e;
    t = a(t, 0), t = p(c(t, this._size), 0, this._size), i = a(i, this._size), i = p(c(i, this._size), 0, this._size);
    let r = m(this._root, t);
    for (; t < i; )
      r = r.next, e.push(r.value), ++t;
    return e;
  }
  splice(t, i, ...e) {
    const r = new R();
    t = a(t, 0), t = p(c(t, this._size), 0, this._size), i = a(i, 0), i = p(i, 0, this._size - t);
    let h = m(this._root, t);
    if (i > 0) {
      const [o, _] = q(h, i);
      this._size -= i, r._root.next = o, r._tail = _, r._size = i;
    }
    return h = this._append(h, e), h.next == null && (this._tail = h), r;
  }
  [Symbol.iterator]() {
    return F(this._root.next);
  }
  unshift(...t) {
    let i = t.length;
    if (i <= 0)
      return this._size;
    const e = this._capacity;
    if (e <= 0)
      return this._emitter.emit(z.Overflow, t), this._size;
    const r = i <= e ? 0 : i - e;
    if (i -= r, this._size + i > e) {
      this._size = e - i;
      const _ = m(this._root, this._size);
      this._emitter.emit(z.Overflow, P(_.next)), _.next = void 0, this._tail = _;
    }
    r > 0 && (this._emitter.emit(z.Overflow, t.slice(i)), t.length = i);
    const [h, o] = X(t);
    return o.next = this._root.next, this._root.next = h, this._size <= 0 && (this._tail = o), this._size += i, this._size;
  }
  values() {
    return F(this._root.next);
  }
  /**
   * @internal
   */
  _append(t, i, e = 0) {
    const r = this._root, h = t.next, o = [], _ = this._capacity;
    let l = this._size;
    const u = i.length;
    for (let v = e; v < u; ++v) {
      const y = { value: i[v] };
      t.next = y, t = y, l < _ ? ++l : (o.push(r.next.value), r.next = r.next.next);
    }
    return t.next = h, o.length > 0 && this._emitter.emit(z.Overflow, o), this._size = l, t;
  }
}
class Z {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "_list");
    this._list = new R(s);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return Z.name;
  }
  set capacity(s) {
    this._list.capacity = s;
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
  forEach(s, t) {
    this._list.forEach((i, e) => s.call(t, i, e, this), t);
  }
  front() {
    return this._list.at(0);
  }
  has(s) {
    return this._list.has(s);
  }
  keys() {
    return this._list.keys();
  }
  push(...s) {
    return this._list.push(...s);
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
  addListener(s, t) {
    return this._list.addListener(s, t), this;
  }
  on(s, t) {
    return this._list.on(s, t), this;
  }
  prependListener(s, t) {
    return this._list.prependListener(s, t), this;
  }
  removeListener(s, t) {
    return this._list.removeListener(s, t), this;
  }
}
class $ {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "_list");
    this._list = new E(s);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return $.name;
  }
  set capacity(s) {
    this._list.capacity = s;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  forEach(s, t) {
    this._list.forEach((i, e) => s.call(t, i, e, this), t);
  }
  has(s) {
    return this._list.has(s);
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
  push(...s) {
    return this._list.push(...s);
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
  addListener(s, t) {
    return this._list.addListener(s, t), this;
  }
  on(s, t) {
    return this._list.on(s, t), this;
  }
  prependListener(s, t) {
    return this._list.prependListener(s, t), this;
  }
  removeListener(s, t) {
    return this._list.removeListener(s, t), this;
  }
}
class C extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    f(this, "_capacity");
    /**
     * @internal
     * The internal map.
     */
    f(this, "_map");
    if (this._capacity = 1 / 0, this._map = /* @__PURE__ */ new Map(), t = t ?? 1 / 0, !x(t)) {
      if (b(t)) {
        if (!d(t))
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
    if (t = +t, !x(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this._map);
      this.clear(), this._emitter.emit(z.Overflow, r);
      return;
    }
    const i = [], e = this._map.entries();
    for (let r = this.size - t; r > 0; --r) {
      const h = e.next().value;
      this._map.delete(h[0]), i.push(h);
    }
    this._emitter.emit(z.Overflow, i);
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
    for (const [e, r] of this._map.entries())
      t.call(i, r, e, this);
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
      return this._emitter.emit(z.Overflow, [[t, i]]), this;
    const e = [];
    if (!this._map.delete(t) && this.size >= this.capacity) {
      const r = this._map.entries().next().value;
      this._map.delete(r[0]), e.push(r);
    }
    return this._map.set(t, i), e.length > 0 && this._emitter.emit(z.Overflow, e), this;
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
  constructor(s) {
    /**
     * @internal
     */
    f(this, "list");
    this.list = new S(s);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return tt.name;
  }
  set capacity(s) {
    this.list.capacity = s;
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
  forEach(s, t) {
    return this.list.forEach((i, e) => s.call(t, i, e, this));
  }
  front() {
    return this.list.first();
  }
  has(s) {
    return this.list.has(s);
  }
  keys() {
    return this.list.keys();
  }
  push(...s) {
    return this.list.push(...s);
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
  addListener(s, t) {
    return this.list.addListener(s, t), this;
  }
  on(s, t) {
    return this.list.on(s, t), this;
  }
  prependListener(s, t) {
    return this.list.prependListener(s, t), this;
  }
  removeListener(s, t) {
    return this.list.removeListener(s, t), this;
  }
}
class it extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    f(this, "_capacity");
    /**
     * @internal
     * The internal set.
     */
    f(this, "set");
    if (this._capacity = 1 / 0, this.set = /* @__PURE__ */ new Set(), t = t ?? 1 / 0, !x(t)) {
      if (b(t)) {
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
    if (t = +t, !x(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this.set);
      this.clear(), this._emitter.emit(z.Overflow, r);
      return;
    }
    const i = [], e = this.set.values();
    for (let r = this.size - t; r > 0; --r) {
      const h = e.next().value;
      this.set.delete(h), i.push(h);
    }
    this._emitter.emit(z.Overflow, i);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this._emitter.emit(z.Overflow, [t]), this;
    const i = [];
    if (!this.set.delete(t) && this.size >= this.capacity) {
      const e = this.set.values().next().value;
      this.set.delete(e), i.push(e);
    }
    return this.set.add(t), i.length > 0 && this._emitter.emit(z.Overflow, i), this;
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
    for (const e of this.set.keys())
      t.call(i, e, e, this);
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
function* B(n, s) {
  if (s < 1)
    return;
  let t = [];
  s = Math.trunc(s);
  for (const i of n)
    t.push(i) >= s && (yield t, t = []);
  t.length > 0 && (yield t);
}
function D(n, s) {
  return n <= 0 || s <= 1 ? 1 : n >= 1 ? 1 / 0 : Math.ceil(ft(s, 1 / n));
}
function zt(n, s, t) {
  let i = n.levels.length;
  const e = L(void 0, i);
  if (t <= 0)
    return { root: e, size: 0, tails: [e] };
  const r = new Array(i).fill(e), h = new Array(i).fill(-1);
  let o = st(n, s)[0];
  o = o.levels[0].next, i = 1;
  let _ = 0, l = 0;
  for (; o != null && _ < t; ) {
    const u = o.levels.length;
    i = i >= u ? i : u;
    const v = L(o.value, u);
    for (let w = 0; w < u; ++w)
      r[w].levels[w] = { next: v, span: l - h[w] }, r[w] = v, h[w] = l;
    const { next: y, span: I } = o.levels[0];
    l += I, o = y, ++_;
  }
  r.length = i, e.levels.length = i, l = h[0] + 1;
  for (let u = 0; u < i; ++u)
    r[u].levels[u] = { next: void 0, span: l - h[u] };
  return { root: e, size: _, tails: r };
}
function* yt(n) {
  for (let s = 0; n != null; ++s)
    yield [s, n.value], n = n.levels[0].next;
}
function L(n, s = 1, t = 1, i) {
  const e = new Array(s);
  for (let r = 0; r < s; ++r)
    e[r] = { next: i, span: t };
  return { value: n, levels: e };
}
function k(n, s) {
  return [n, s] = st(n, s), s === 0 ? n : void 0;
}
function st(n, s) {
  if (s <= 0)
    return [n, s];
  let t = n.levels.length - 1;
  for (; ; ) {
    const { next: i, span: e } = n.levels[t];
    if (!(e <= s && i != null)) {
      if (--t < 0)
        return [n, s];
      continue;
    }
    if (e == s)
      return [i, 0];
    s -= e, n = i;
  }
}
function gt(n, s) {
  for (; n != null; ) {
    if (n.value === s)
      return !0;
    n = n.levels[0].next;
  }
  return !1;
}
function* xt(n) {
  for (let s = 0; n != null; ++s)
    yield s, n = n.levels[0].next;
}
function mt(n, s) {
  let t = -1 / 0;
  const i = Math.min(n.length, s.length);
  for (let h = 0; h < i; ++h)
    t < n[h] && (t = n[h]);
  if (t <= 0 || i <= 0) {
    const h = L(void 0);
    return { root: h, size: 0, tails: [h] };
  }
  const e = L(void 0, t, i + 1), r = new Array(t).fill(e);
  for (let h = 0; h < i; ++h) {
    const o = i - h, _ = n[h], l = L(s[h], _, o);
    for (let u = 0; u < _; ++u) {
      const v = r[u].levels;
      v[u] = { next: l, span: v[u].span - o }, r[u] = l;
    }
  }
  return { root: e, size: i, tails: r };
}
function wt(n, s) {
  if (n == null || n.levels.length <= s)
    return;
  let t = n;
  for (; t != null; ) {
    const i = t.levels[s].next;
    t.levels.length = s, t = i;
  }
}
function* O(n) {
  for (; n != null; )
    yield n.value, n = n.levels[0].next;
}
function dt(n) {
  const s = n.length, t = new Array(s);
  for (let i = 0; i < s; ++i) {
    const { index: e, node: r } = n[i];
    t[i] = { index: e, node: r };
  }
  return t;
}
function It(n, s, t) {
  const i = L(void 0), e = { root: i, size: 0, tails: [i] };
  if (t <= 0)
    return e;
  const r = Y(et(n.root, -1), s), h = Y(dt(r), t), o = h[0].index + h[0].node.levels[0].span;
  let _ = n.root.levels.length;
  s = r[0].index + r[0].node.levels[0].span, t = o - s;
  let l;
  for (l = 0; l < _; ++l) {
    const u = r[l], v = h[l];
    if (u.index >= v.index)
      break;
    let y = u.node.levels[l], I = u.index + y.span - s;
    i.levels[l] = { next: y.next, span: I }, y = v.node.levels[l], I = v.index - u.index + (y.span - t), u.node.levels[l] = { next: y.next, span: I }, v.node.levels[l] = { next: void 0, span: o - v.index }, e.tails[l] = v.node;
  }
  if (l < _)
    for (; l < _; ) {
      const u = r[l], { next: v, span: y } = u.node.levels[l];
      u.node.levels[l] = { next: v, span: y - t }, ++l;
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
  return n.size -= t, e.size = t, e;
}
function et(n, s = 0) {
  const t = n.levels.length, i = new Array(t);
  for (let e = 0; e < t; ++e)
    i[e] = { index: s, node: n };
  return i;
}
function Y(n, s) {
  if (s <= 0 || n.length <= 0)
    return n;
  let t = n.length - 1, i = n[t];
  const e = n[0].index + s;
  for (; ; ) {
    const { next: r, span: h } = i.node.levels[t], o = i.index + h;
    if (!(o <= e && r != null)) {
      if (--t < 0)
        break;
      i = n[t];
      continue;
    }
    if (i = { index: o, node: r }, n[t] = i, o == e)
      break;
  }
  for (let r = 0; r < t; ++r)
    n[r] = { index: i.index, node: i.node };
  return n;
}
function Lt(n, s, t) {
  if (t.size <= 0)
    return;
  const i = t.tails.length;
  for (let h = n.tails.length; h < i; ++h)
    n.root.levels[h] = { next: void 0, span: n.size + 1 }, n.tails[h] = n.root;
  const e = Y(et(n.root, -1), s);
  for (let h = 0; h < i; ++h) {
    const o = e[h].node, _ = e[h].index, l = o.levels[h], u = t.tails[h], v = u.levels[h], I = _ + l.span - s, w = v.span;
    u.levels[h] = { next: l.next, span: I + w };
    const G = t.root.levels[h], nt = G.span - 1, ht = s - _;
    o.levels[h] = { next: G.next, span: ht + nt };
  }
  const r = n.tails.length;
  for (let h = i; h < r; ++h) {
    const o = e[h].node.levels, { next: _, span: l } = o[h];
    o[h] = { next: _, span: l + t.size };
  }
  s === n.size && (n.tails = t.tails), n.size += t.size;
}
class A extends N {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    f(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    f(this, "_isFinite");
    /**
     * @internal
     * The maximum number of levels in the skip list.
     */
    f(this, "_maxLevel");
    /**
     * @internal
     * The probability factor used to randomly determine the levels
     * of new nodes. Should be a value between 0 and 1, where a lower
     * value results in fewer levels on average.
     */
    f(this, "_p");
    /**
     * @internal
     * The root of the skip list
     */
    f(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    f(this, "_size");
    /**
     * @internal
     * The last nodes in the skip list at each level.
     */
    f(this, "_tails");
    if (this._capacity = M, this._isFinite = !1, this._p = 0.5, this._maxLevel = D(this._p, M), this._root = L(void 0), this._size = 0, this._tails = [this._root], t != null) {
      if (b(t)) {
        this.capacity = t;
        return;
      }
      if (!ut(t)) {
        this.capacity = t.capacity ?? this._capacity, this.p = t.p ?? this._p;
        const i = t.expectedSize ?? this._capacity;
        this.maxLevel = t.maxLevel ?? D(this._p, i);
        return;
      }
      for (const i of B(t, V))
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
    return A.name;
  }
  set capacity(t) {
    if (t = +t, x(t))
      t = M, this._isFinite = !1;
    else if (at(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const { root: i } = this._cut(0, this._size - t);
    this._overflow(O(i.levels[0].next));
  }
  set maxLevel(t) {
    if (t = +t, !W(t) || t <= 0)
      throw new RangeError("Invalid maxLevel");
    this._maxLevel = t, t < this.levels && wt(this._root, t);
  }
  set p(t) {
    if (t = +t, isNaN(t) || t < 0 || t > 1)
      throw new RangeError("Invalid p");
    this._p = t;
  }
  at(t) {
    if (t = c(a(t, -1 / 0), this._size), !!g(t, 0, this._size))
      return k(this._root, t + 1).value;
  }
  clear() {
    this._size = 0, this._tails = [this._root], this._root.levels.length = 1, this._root.levels[0] = { next: void 0, span: 1 };
  }
  delete(t) {
    return t = c(a(t, -1 / 0), this._size), g(t, 0, this._size) ? (this._cut(t, 1), !0) : !1;
  }
  entries() {
    return yt(this._root.levels[0].next);
  }
  fill(t, i, e) {
    const r = this._size;
    if (i = p(c(a(i, 0), r), 0, r), e = p(c(a(e, r), r), i, r), i >= e)
      return this;
    let h = k(this._root, i + 1);
    for (let o = i; o < e; ++o)
      h.value = t, h = h.levels[0].next;
    return this;
  }
  forEach(t, i) {
    let e = this._root;
    for (let r = 0; r < this._size; ++r)
      e = e.levels[0].next, t.call(i, e.value, r, this);
  }
  has(t) {
    return gt(this._root.levels[0].next, t);
  }
  keys() {
    return xt(this._root.levels[0].next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(this._size - 1, 1);
    return t.levels[0].next.value;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._insert(this._size, t), this._size);
  }
  set(t, i) {
    if (t = c(a(t, -1 / 0), this._size), !g(t, 0, this._size))
      return;
    const e = k(this._root, t + 1), r = e.value;
    return e.value = i, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.levels[0].next.value;
  }
  slice(t, i) {
    const e = this._size;
    t = p(c(a(t, 0), e), 0, e), i = p(c(a(i, e), e), t, e);
    const r = zt(this._root, t, i - t), h = new A({
      capacity: r.size,
      p: this._p,
      maxLevel: this._maxLevel
    });
    return h._root = r.root, h._tails = r.tails, h._size = r.size, h;
  }
  splice(t, i, ...e) {
    const r = this._size;
    t = p(c(a(t, 0), r), 0, r), i = p(a(i, 0), 0, r - t);
    const h = this._cut(t, i);
    this._insert(t, e);
    const o = new A({
      capacity: i,
      p: this._p,
      maxLevel: this._maxLevel
    });
    return o._root = h.root, o._tails = h.tails, o._size = h.size, o;
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._presert(0, t), this._size);
  }
  values() {
    return O(this._root.levels[0].next);
  }
  /**
   * @internal
   */
  _cut(t, i) {
    const e = { root: this._root, size: this._size, tails: this._tails }, r = It(e, t, i);
    return this._size = e.size, this._tails = e.tails, r;
  }
  /**
   * @internal
   */
  _insert(t, i) {
    const e = i.length;
    let r = this._capacity - this._size;
    if (r >= e) {
      this._safeInsert(t, i);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, i.slice(0, r)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, e - r), { root: _ } = this._cut(0, o);
      this._overflow(O(_.levels[0].next)), t -= o, r += o;
    }
    if (r >= e) {
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
      this._emitter.emit(z.Overflow, t);
    else
      for (const i of B(t, V))
        this._emitter.emit(z.Overflow, i);
  }
  /**
   * @internal
   */
  _presert(t, i) {
    const e = i.length;
    let r = this._capacity - this._size;
    if (r >= e) {
      this._safeInsert(t, i);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, i.slice(i.length - r)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, e - r), { root: o } = this._cut(this._size - h, h);
      this._overflow(O(o.levels[0].next)), r += h;
    }
    if (r >= e) {
      this._safeInsert(t, i);
      return;
    }
    this._overflow(i.slice(r)), this._safeInsert(this._size, i.slice(0, r));
  }
  /**
   * @internal
   */
  _safeInsert(t, i) {
    const e = i.length, r = new Array(e);
    for (let _ = 0; _ < e; ++_)
      r[_] = ct(this._p, 1, this._maxLevel);
    const h = mt(r, i), o = { root: this._root, size: this._size, tails: this._tails };
    Lt(o, t, h), this._size = o.size, this._tails = o.tails;
  }
}
class rt {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "list");
    this.list = new S(s);
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
  set capacity(s) {
    this.list.capacity = s;
  }
  clear() {
    this.list.clear();
  }
  entries() {
    return this.list.entries();
  }
  forEach(s, t) {
    return this.list.forEach((i, e) => s.call(t, i, e, this));
  }
  has(s) {
    return this.list.has(s);
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
  push(...s) {
    return this.list.push(...s);
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
  addListener(s, t) {
    return this.list.addListener(s, t), this;
  }
  on(s, t) {
    return this.list.on(s, t), this;
  }
  prependListener(s, t) {
    return this.list.prependListener(s, t), this;
  }
  removeListener(s, t) {
    return this.list.removeListener(s, t), this;
  }
}
export {
  z as BoundedEvent,
  S as CircularArrayList,
  j as CircularDeque,
  E as CircularDoublyLinkedList,
  U as CircularLinkedDeque,
  R as CircularLinkedList,
  Z as CircularLinkedQueue,
  $ as CircularLinkedStack,
  C as CircularMap,
  tt as CircularQueue,
  it as CircularSet,
  A as CircularSkipList,
  rt as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
