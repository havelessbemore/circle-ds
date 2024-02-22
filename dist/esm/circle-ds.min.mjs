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
var X = (h, s, t) => s in h ? P(h, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[s] = t;
var f = (h, s, t) => (X(h, typeof s != "symbol" ? s + "" : s, t), t);
const _ = {
  Overflow: "overflow"
}, j = {};
class S {
  constructor(s = new j()) {
    /**
     * The event emitter.
     * @internal
     */
    f(this, "emitter");
    this.emitter = s;
  }
  addListener(s, t) {
    return this.emitter.addListener(s, t), this;
  }
  on(s, t) {
    return this.emitter.on(s, t), this;
  }
  prependListener(s, t) {
    return this.emitter.prependListener(s, t), this;
  }
  removeListener(s, t) {
    return this.emitter.removeListener(s, t), this;
  }
}
const b = 4294967295;
function R(h) {
  return Number.isInteger(h) && h >= 0 && h <= b;
}
function y(h) {
  return h === Number.POSITIVE_INFINITY;
}
function L(h) {
  return typeof h == "number";
}
function g(h) {
  return Number.isSafeInteger(h) && h >= 0;
}
function a(h, s, t = 0) {
  return h >= t ? h : h + s;
}
function p(h, s, t) {
  if (s > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return h <= s ? s : h <= t ? h : t;
}
function m(h, s, t) {
  return h >= s && h < t;
}
function u(h, s = 0) {
  return h = +h, isNaN(h) ? s : Math.trunc(h);
}
class d extends S {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    f(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    f(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    f(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    f(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    f(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    f(this, "vals");
    if (this._capacity = b, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], !(t == null || y(t))) {
      if (L(t)) {
        if (!R(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t, this.isFinite = !0;
        return;
      }
      this.vals = Array.from(t), this._capacity = this.vals.length, this.isFinite = !0, this._size = this._capacity;
    }
  }
  get capacity() {
    return this.isFinite ? this._capacity : 1 / 0;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return d.name;
  }
  set capacity(t) {
    if (t = +t, y(t))
      t = b, this.isFinite = !1;
    else if (R(t))
      this.isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size <= 0 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  at(t) {
    if (t = a(u(t, -1 / 0), this._size), !!m(t, 0, this._size))
      return this.vals[this.toIndex(t)];
  }
  clear() {
    this._size = 0, this.head = 0, this.next = 0, this.vals.length = 0;
  }
  copyWithin(t, i, e) {
    const r = this._size;
    return t = p(a(u(t, 0), r), 0, r), i = p(a(u(i, 0), r), 0, r), e = a(u(e, r), r), e = p(e, i, r - Math.min(0, t - i)), t >= r || i >= e ? this : (this._copyWithin(t, i, e), this);
  }
  /**
   * @internal
   */
  _copyWithin(t, i, e) {
    if (t == i)
      return;
    const r = t <= i || e <= t, n = this._capacity - 1, o = this.vals;
    let l = this.toIndex(t + (e - i));
    if (e = this.toIndex(e), i = this.toIndex(i), t = this.toIndex(t), r)
      for (; i != e; )
        o[t] = o[i], i = i < n ? i + 1 : 0, t = t < n ? t + 1 : 0;
    else
      for (; i != e; )
        e = e > 0 ? e - 1 : n, l = l > 0 ? l - 1 : n, o[l] = o[e];
  }
  delete(t) {
    return t = a(u(t, -1 / 0), this._size), m(t, 0, this._size) ? (this._delete(t, 1), !0) : !1;
  }
  /**
   * @internal
   */
  _delete(t, i) {
    this._copyWithin(t, t + i, this._size), this._pop(i);
  }
  *entries() {
    const t = this.vals;
    for (let i = 0; i < this._size; ++i)
      yield [i, t[this.toIndex(i)]];
  }
  fill(t, i, e) {
    const r = this._size;
    return i = u(i, 0), i = p(a(i, r), 0, r), e = u(e, r), e = p(a(e, r), i, r), this._fill(t, i, e), this;
  }
  /**
   * @internal
   */
  _fill(t, i, e) {
    for (const [r, n] of this.toRanges(i, e))
      this.vals.fill(t, r, n);
  }
  first() {
    return this._size <= 0 ? void 0 : this.vals[this.head];
  }
  forEach(t, i) {
    const e = this._size, r = this.vals;
    for (let n = 0; n < e && n < this._size; ++n) {
      const o = r[this.toIndex(n)];
      t.call(i, o, n, this);
    }
  }
  has(t) {
    const i = this._size, e = this.vals;
    for (let r = 0; r < i; ++r)
      if (t === e[this.toIndex(r)])
        return !0;
    return !1;
  }
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
  }
  last() {
    if (this._size <= 0)
      return;
    const t = this.next > 0 ? this.next - 1 : this._capacity - 1;
    return this.vals[t];
  }
  pop() {
    return this._size > 0 ? this._pop(1)[0] : void 0;
  }
  /**
   * @internal
   */
  _pop(t) {
    const i = this._capacity, e = [], r = this.vals;
    let n = this.next;
    for (let o = 0; o < t; ++o)
      n = n > 0 ? n - 1 : i - 1, e.push(r[n]), r[n] = void 0;
    return this.next = n, this._size -= t, this._size <= 0 && this.clear(), e;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._push(t), this._size);
  }
  /**
   * @internal
   */
  _push(t, i = 0) {
    const e = this._capacity, r = [], n = t.length, o = this.vals;
    let l = this.next;
    for (let c = i; c < n; ++c) {
      if (l = ++l < e ? l : 0, this._size < e)
        ++this._size;
      else if (this.isFinite)
        r.push(o[this.next]), this.head = l;
      else
        throw new Error("Out of memory");
      o[this.next] = t[c], this.next = l;
    }
    r.length > 0 && this._overflow(r);
  }
  set(t, i) {
    if (t = a(u(t, -1 / 0), this._size), !m(t, 0, this._size))
      return;
    t = this.toIndex(t);
    const e = this.vals[t];
    return this.vals[t] = i, e;
  }
  shift() {
    return this._size > 0 ? this._shift(1)[0] : void 0;
  }
  /**
   * @internal
   */
  _shift(t) {
    const i = this._capacity, e = [], r = this.vals;
    for (let n = 0; n < t; ++n)
      e.push(r[this.head]), r[this.head] = void 0, --this._size, ++this.head >= i && (this.head = 0, r.length = this.next);
    return e;
  }
  slice(t, i) {
    const e = new d(0), r = this._size;
    return r <= 0 ? e : (t = u(t, 0), t = p(a(t, r), 0, r), i = u(i, r), i = p(a(i, r), t, r), this.toList(this._slice(t, i)));
  }
  /**
   * @internal
   */
  _slice(t, i) {
    const e = this.vals, r = new Array(i - t);
    let n = 0;
    for ([t, i] of this.toRanges(t, i))
      for (let o = t; o < i; ++o)
        r[n++] = e[o];
    return r;
  }
  splice(t, i, ...e) {
    const r = this._size;
    t = u(t, 0), t = p(a(t, r), 0, r), i = u(i, 0), i = p(i, 0, r - t);
    const n = this.toList(this._slice(t, t + i));
    return this._splice(t, i, e), n;
  }
  /**
   * @internal
   */
  _splice(t, i, e = []) {
    const r = e.length, n = this._capacity, o = Math.min(i, r), l = this.vals;
    let c = this.toIndex(t);
    for (let v = 0; v < o; ++v)
      l[c++] = e[v], c = c < n ? c : 0;
    i != r && (t += o, i < r ? this._insert(t, e, o) : this._delete(t, i - r));
  }
  /**
   * @internal
   */
  _insert(t, i, e = 0, r = i.length) {
    const n = r - e;
    let o = this._capacity - this._size;
    if (o >= n) {
      this._safeInsert(t, i, e, r);
      return;
    }
    if (!this.isFinite)
      throw this._safeInsert(t, i, e, e + o), new Error("Out of memory");
    const l = Math.min(t, n);
    if (this._overflow(this._shift(l)), t -= l, o += l, o >= n) {
      this._safeInsert(t, i, e, r);
      return;
    }
    const c = r - o;
    this._overflow(i.slice(e, c)), this._safeUnshift(i, c, r);
  }
  /**
   * @internal
   */
  _safeInsert(t, i, e = 0, r = i.length) {
    const n = this._capacity, o = r - e, l = this.vals;
    this._copyWithin(t + o, t, this._size);
    let c = this.toIndex(t);
    for (let v = e; v < r; ++v)
      l[c++] = i[v], c = c < n ? c : 0;
    this._size += o, this.next = this.toIndex(this.next + o);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._unshift(t), this._size);
  }
  /**
   * @internal
   */
  _unshift(t) {
    const i = this._capacity, e = this.vals, r = [];
    let n = this.head;
    for (let o = t.length - 1; o >= 0; --o) {
      if (n = n > 0 ? n - 1 : i - 1, this._size < i)
        ++this._size;
      else if (this.isFinite)
        r.push(e[n]), this.next = n;
      else
        throw new Error("Out of memory");
      e[n] = t[o], this.head = n;
    }
    r.length > 0 && this._overflow(r.reverse());
  }
  /**
   * @internal
   */
  _safeUnshift(t, i = 0, e = t.length) {
    const r = this._capacity, n = this.vals;
    let o = this.head;
    for (let l = e - 1; l >= i; --l)
      o = o > 0 ? o - 1 : r - 1, n[o] = t[l];
    this.head = o, this._size += e - i;
  }
  *values() {
    const t = this.vals;
    for (let i = 0; i < this._size; ++i)
      yield t[this.toIndex(i)];
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(t) {
    this.emitter.emit(_.Overflow, t);
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
    if (this._size <= this.head) {
      const i = this._size - this.next;
      this.vals.copyWithin(i, 0, this.next), this.vals.copyWithin(0, this.head, this.head + i), this.vals.length = this._size, this.head = 0, this.next = this._size;
    } else if (this.head + this._size <= t)
      this.vals.length = this.head + this._size, this.vals.copyWithin(this._capacity, 0, this.next), this.vals.fill(void 0, 0, this.next), this.next = (this.head + this._size) % t;
    else {
      const i = t - this._capacity;
      this.vals.length = t, this.vals.copyWithin(this._capacity, 0, i), this.vals.copyWithin(0, i, this.next);
      const e = Math.max(i, this.next - i);
      this.vals.fill(void 0, e, this.next), this.next -= i;
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
  sequentialReset(t) {
    const i = this.head + this._size;
    return i <= t ? (this.vals.length = i, this.next = this.vals.length % t) : this.head >= t ? (this.vals.copyWithin(0, this.head, i), this.vals.length = this._size, this.head = 0, this.next = this._size % t) : (this.vals.copyWithin(0, t, i), this.vals.length = t, this.next = i - t), this._capacity = t, !0;
  }
  /**
   * @internal
   *
   * Shrink capacity.
   *
   * @param capacity - the new capacity
   */
  shrink(t) {
    if (this._overflow(this._shift(this._size - t)), this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    const i = this._capacity - t;
    this.vals.copyWithin(this.head - i, this.head, this._capacity), this.vals.length = t, this.head -= i, this._capacity = t;
  }
  /**
   * @internal
   */
  toIndex(t) {
    return (this.head + t) % this._capacity;
  }
  /**
   * @internal
   */
  toList(t) {
    const i = new d(0);
    return i.vals = t, i._size = t.length, i._capacity = t.length, i;
  }
  /**
   * @internal
   */
  toRanges(t, i) {
    const e = this.head, r = this._capacity - this.head;
    return i <= r ? [[e + t, e + i]] : t >= r ? [[t - r, i - r]] : [
      [e + t, this._capacity],
      [0, i - r]
    ];
  }
}
class F {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "list");
    this.list = new d(s);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return F.name;
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
  last() {
    return this.list.last();
  }
  pop() {
    return this.list.pop();
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
  top() {
    return this.list.last();
  }
  unshift(...s) {
    return this.list.unshift(...s);
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
function O(h, s) {
  if (s <= 0)
    return [void 0, void 0];
  const t = h.next, i = z(t, s - 1);
  return h.next = i.next, i.next = void 0, [t, i];
}
function* M(h, s) {
  for (let t = 0; h != s; ++t)
    yield [t, h.value], h = h.next;
}
function z(h, s) {
  if (!(s < 0)) {
    for (let t = 0; h != null && t < s; ++t)
      h = h.next;
    return h;
  }
}
function q(h, s, t) {
  for (; h != t; ) {
    if (h.value === s)
      return !0;
    h = h.next;
  }
  return !1;
}
function* A(h, s) {
  for (let t = 0; h != s; ++t)
    yield t, h = h.next;
}
function N(h, s) {
  const t = [];
  for (; h != s; )
    t.push(h.value), h = h.next;
  return t;
}
function T(h) {
  const s = {};
  let t = 0, i = s;
  for (const e of h)
    i.next = { value: e }, i = i.next, ++t;
  return s.next === void 0 ? [void 0, void 0, 0] : [s.next, i, t];
}
function* E(h, s) {
  for (let t = 0; h != s; ++t)
    yield h.value, h = h.next;
}
function W(h, s) {
  if (s <= 0)
    return [void 0, void 0];
  const [t, i] = O(h, s);
  return t.prev = void 0, h.next != null && (h.next.prev = h), [t, i];
}
function J(h, s) {
  if (s >= 0)
    return z(h, s);
  for (let t = 0; h != null && t > s; --t)
    h = h.prev;
  return h;
}
function K(h) {
  const s = {};
  let t = 0, i = s;
  for (const e of h)
    i.next = { prev: i, value: e }, i = i.next, ++t;
  return t <= 0 ? [void 0, void 0, 0] : (s.next.prev = void 0, [s.next, i, t]);
}
class w extends S {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    f(this, "_capacity");
    /**
     * The root of the linked list
     * @internal
     */
    f(this, "root");
    /**
     * The current size of the list (0 \<= size \<= capacity)
     * @internal
     */
    f(this, "_size");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, y(t))
      return;
    if (L(t)) {
      if (!g(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    const [i, e, r] = K(t);
    this._capacity = r, r > 0 && (this.root.next = i, this.root.prev = e, i.prev = this.root, e.next = this.root, this._size = r);
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return w.name;
  }
  set capacity(t) {
    if (t = +t, !y(t) && !g(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [e, r] = W(this.root, i);
    this._size -= i, this.emitter.emit(_.Overflow, N(e, r.next));
  }
  at(t) {
    if (t = a(u(t, -1 / 0), this._size), !!m(t, 0, this._size))
      return this.get(t).value;
  }
  clear() {
    this._size = 0, this.root.next = this.root, this.root.prev = this.root;
  }
  delete(t) {
    if (t = a(u(t, -1 / 0), this._size), !m(t, 0, this._size))
      return !1;
    const i = this.get(t);
    return i.prev.next = i.next, i.next.prev = i.prev, --this._size, !0;
  }
  entries() {
    return M(this.root.next, this.root);
  }
  fill(t, i, e) {
    i = u(i, 0), i = p(a(i, this._size), 0, this._size), e = u(e, this._size), e = p(a(e, this._size), 0, this._size);
    let r = this.get(i);
    for (; i < e; )
      r.value = t, r = r.next, ++i;
    return this;
  }
  forEach(t, i) {
    let e = this.root;
    for (let r = 0; r < this._size; ++r)
      e = e.next, t.call(i, e.value, r, this);
  }
  has(t) {
    return q(this.root.next, t, this.root);
  }
  keys() {
    return A(this.root.next, this.root);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this.root.prev;
    return t.prev.next = t.next, t.next.prev = t.prev, --this._size, t.value;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this.emitter.emit(_.Overflow, t), this._size) : (this.append(this.root.prev, t), this._size);
  }
  set(t, i) {
    if (t = a(u(t, -1 / 0), this._size), !m(t, 0, this._size))
      return;
    const e = this.get(t), r = e.value;
    return e.value = i, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this.root.next;
    return t.prev.next = t.next, t.next.prev = t.prev, --this._size, t.value;
  }
  slice(t, i) {
    const e = new w();
    if (this._size <= 0)
      return e;
    t = u(t, 0), t = p(a(t, this._size), 0, this._size), i = u(i, this._size), i = p(a(i, this._size), 0, this._size);
    let r = this.get(t - 1);
    for (; t < i; )
      r = r.next, e.push(r.value), ++t;
    return e;
  }
  splice(t, i, ...e) {
    const r = new w();
    t = u(t, 0), t = p(a(t, this._size), 0, this._size), i = u(i, 0), i = p(i, 0, this._size - t);
    const n = this.get(t - 1);
    if (i > 0) {
      const [o, l] = W(n, i);
      this._size -= i, o.prev = r.root, l.next = r.root, r.root.next = o, r.root.prev = l, r._size = i;
    }
    return this.append(n, e), r;
  }
  [Symbol.iterator]() {
    return E(this.root.next, this.root);
  }
  unshift(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this.emitter.emit(_.Overflow, t), this._size) : (this.prepend(this.root.next, t), this._size);
  }
  values() {
    return E(this.root.next, this.root);
  }
  /**
   * @internal
   */
  append(t, i) {
    const e = this.root, r = t.next, n = [], o = this._capacity;
    let l = this._size;
    const c = i.length;
    for (let v = 0; v < c; ++v) {
      const x = { prev: t, value: i[v] };
      t.next = x, t = x, l < o ? ++l : (n.push(e.next.value), e.next = e.next.next);
    }
    return t.next = r, r.prev = t, e.next.prev = e, n.length > 0 && this.emitter.emit(_.Overflow, n), this._size = l, t;
  }
  /**
   * @internal
   */
  get(t) {
    return t -= t <= this._size / 2 ? -1 : this._size, J(this.root, t);
  }
  /**
   * @internal
   */
  prepend(t, i) {
    const e = this.root, r = t.prev, n = [], o = this._capacity;
    let l = this._size;
    for (let c = i.length - 1; c >= 0; --c) {
      const v = { next: t, value: i[c] };
      t.prev = v, t = v, l < o ? ++l : (n.push(e.prev.value), e.prev = e.prev.prev);
    }
    return t.prev = r, r.next = t, e.prev.next = e, n.length > 0 && this.emitter.emit(_.Overflow, n.reverse()), this._size = l, t;
  }
}
class V {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "list");
    this.list = new w(s);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return V.name;
  }
  set capacity(s) {
    this.list.capacity = s;
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
  forEach(s, t) {
    this.list.forEach((i, e) => s.call(t, i, e, this), t);
  }
  has(s) {
    return this.list.has(s);
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
  push(...s) {
    return this.list.push(...s);
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
  unshift(...s) {
    return this.list.unshift(...s);
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
class I extends S {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    f(this, "_capacity");
    /**
     * The root of the linked list
     * @internal
     */
    f(this, "root");
    /**
     * The current size of the list (0 \<= size \<= capacity)
     * @internal
     */
    f(this, "_size");
    /**
     * The last node in the linked list.
     * @internal
     */
    f(this, "tail");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, y(t))
      return;
    if (L(t)) {
      if (!g(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    const [i, e, r] = T(t);
    this._capacity = r, r > 0 && (this.root.next = i, this.tail = e, this._size = r);
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
    if (t = +t, !y(t) && !g(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [e] = O(this.root, i);
    this._size -= i, this._size <= 0 && (this.tail = this.root), this.emitter.emit(_.Overflow, N(e));
  }
  at(t) {
    if (t = a(u(t, -1 / 0), this._size), !!m(t, 0, this._size))
      return ++t == this._size ? this.tail.value : z(this.root, t).value;
  }
  clear() {
    this._size = 0, this.root.next = void 0, this.tail = this.root;
  }
  delete(t) {
    if (t = a(u(t, -1 / 0), this._size), !m(t, 0, this._size))
      return !1;
    const i = z(this.root, t);
    return i.next = i.next.next, --this._size, t == this._size && (this.tail = i), !0;
  }
  entries() {
    return M(this.root.next);
  }
  fill(t, i, e) {
    i = u(i, 0), i = p(a(i, this._size), 0, this._size), e = u(e, this._size), e = p(a(e, this._size), 0, this._size);
    let r = z(this.root, i + 1);
    for (; i < e; )
      r.value = t, r = r.next, ++i;
    return this;
  }
  forEach(t, i) {
    let e = this.root;
    for (let r = 0; r < this._size; ++r)
      e = e.next, t.call(i, e.value, r, this);
  }
  has(t) {
    return q(this.root.next, t);
  }
  keys() {
    return A(this.root.next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this.tail.value;
    return this.tail = z(this.root, --this._size), this.tail.next = void 0, t;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this.emitter.emit(_.Overflow, t), this._size) : (this.tail = this.append(this.tail, t), this._size);
  }
  set(t, i) {
    if (t = a(u(t, -1 / 0), this._size), !m(t, 0, this._size))
      return;
    const e = z(this.root, t + 1), r = e.value;
    return e.value = i, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this.root.next;
    return this.root.next = t.next, --this._size, this._size <= 0 && (this.tail = this.root), t.value;
  }
  slice(t, i) {
    const e = new I();
    if (this._size <= 0)
      return e;
    t = u(t, 0), t = p(a(t, this._size), 0, this._size), i = u(i, this._size), i = p(a(i, this._size), 0, this._size);
    let r = z(this.root, t);
    for (; t < i; )
      r = r.next, e.push(r.value), ++t;
    return e;
  }
  splice(t, i, ...e) {
    const r = new I();
    t = u(t, 0), t = p(a(t, this._size), 0, this._size), i = u(i, 0), i = p(i, 0, this._size - t);
    let n = z(this.root, t);
    if (i > 0) {
      const [o, l] = O(n, i);
      this._size -= i, r.root.next = o, r.tail = l, r._size = i;
    }
    return n = this.append(n, e), n.next == null && (this.tail = n), r;
  }
  [Symbol.iterator]() {
    return E(this.root.next);
  }
  unshift(...t) {
    let i = t.length;
    if (i <= 0)
      return this._size;
    const e = this._capacity;
    if (e <= 0)
      return this.emitter.emit(_.Overflow, t), this._size;
    const r = i <= e ? 0 : i - e;
    if (i -= r, this._size + i > e) {
      this._size = e - i;
      const l = z(this.root, this._size);
      this.emitter.emit(_.Overflow, N(l.next)), l.next = void 0, this.tail = l;
    }
    r > 0 && (this.emitter.emit(_.Overflow, t.slice(i)), t.length = i);
    const [n, o] = T(t);
    return o.next = this.root.next, this.root.next = n, this._size <= 0 && (this.tail = o), this._size += i, this._size;
  }
  values() {
    return E(this.root.next);
  }
  /**
   * @internal
   */
  append(t, i, e = 0) {
    const r = this.root, n = t.next, o = [], l = this._capacity;
    let c = this._size;
    const v = i.length;
    for (let x = e; x < v; ++x) {
      const k = { value: i[x] };
      t.next = k, t = k, c < l ? ++c : (o.push(r.next.value), r.next = r.next.next);
    }
    return t.next = n, o.length > 0 && this.emitter.emit(_.Overflow, o), this._size = c, t;
  }
}
class B {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "list");
    this.list = new I(s);
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
    return this.list.at(0);
  }
  forEach(s, t) {
    this.list.forEach((i, e) => s.call(t, i, e, this), t);
  }
  front() {
    return this.list.at(0);
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
    return this.values();
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
class $ {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "list");
    this.list = new w(s);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return $.name;
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
    this.list.forEach((i, e) => s.call(t, i, e, this), t);
  }
  has(s) {
    return this.list.has(s);
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
  push(...s) {
    return this.list.push(...s);
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
class U extends S {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    f(this, "_capacity");
    /**
     * The internal map.
     * @internal
     */
    f(this, "map");
    if (this._capacity = 1 / 0, this.map = /* @__PURE__ */ new Map(), t = t ?? 1 / 0, !y(t)) {
      if (L(t)) {
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
    return U.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(t) {
    if (t = +t, !y(t) && !g(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this.map);
      this.clear(), this.emitter.emit(_.Overflow, r);
      return;
    }
    const i = [], e = this.map.entries();
    for (let r = this.size - t; r > 0; --r) {
      const n = e.next().value;
      this.map.delete(n[0]), i.push(n);
    }
    this.emitter.emit(_.Overflow, i);
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
    for (const [e, r] of this.map.entries())
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
      return this.emitter.emit(_.Overflow, [[t, i]]), this;
    const e = [];
    if (!this.map.delete(t) && this.size >= this.capacity) {
      const r = this.map.entries().next().value;
      this.map.delete(r[0]), e.push(r);
    }
    return this.map.set(t, i), e.length > 0 && this.emitter.emit(_.Overflow, e), this;
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
class Y {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "list");
    this.list = new d(s);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return Y.name;
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
class G extends S {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    f(this, "_capacity");
    /**
     * The internal set.
     * @internal
     */
    f(this, "set");
    if (this._capacity = 1 / 0, this.set = /* @__PURE__ */ new Set(), t = t ?? 1 / 0, !y(t)) {
      if (L(t)) {
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
    return G.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(t) {
    if (t = +t, !y(t) && !g(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this.set);
      this.clear(), this.emitter.emit(_.Overflow, r);
      return;
    }
    const i = [], e = this.set.values();
    for (let r = this.size - t; r > 0; --r) {
      const n = e.next().value;
      this.set.delete(n), i.push(n);
    }
    this.emitter.emit(_.Overflow, i);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this.emitter.emit(_.Overflow, [t]), this;
    const i = [];
    if (!this.set.delete(t) && this.size >= this.capacity) {
      const e = this.set.values().next().value;
      this.set.delete(e), i.push(e);
    }
    return this.set.add(t), i.length > 0 && this.emitter.emit(_.Overflow, i), this;
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
class H {
  constructor(s) {
    /**
     * @internal
     */
    f(this, "list");
    this.list = new d(s);
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
  _ as BoundedEvent,
  d as CircularArrayList,
  F as CircularDeque,
  w as CircularDoublyLinkedList,
  V as CircularLinkedDeque,
  I as CircularLinkedList,
  B as CircularLinkedQueue,
  $ as CircularLinkedStack,
  U as CircularMap,
  Y as CircularQueue,
  G as CircularSet,
  H as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
