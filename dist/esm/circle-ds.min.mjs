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
var G = Object.defineProperty;
var X = (h, s, t) => s in h ? G(h, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[s] = t;
var c = (h, s, t) => (X(h, typeof s != "symbol" ? s + "" : s, t), t);
const p = {
  Overflow: "overflow"
}, J = {};
class L {
  constructor(s = new J()) {
    /**
     * The event emitter.
     * @internal
     */
    c(this, "emitter");
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
const R = 4294967295;
function k(h) {
  return Number.isInteger(h) && h >= 0 && h <= R;
}
function g(h) {
  return h === Number.POSITIVE_INFINITY;
}
function E(h) {
  return typeof h == "number";
}
function d(h) {
  return Number.isSafeInteger(h) && h >= 0;
}
function _(h, s, t = 0) {
  return h >= t ? h : h + s;
}
function v(h, s, t) {
  if (s > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return h <= s ? s : h <= t ? h : t;
}
function m(h, s, t) {
  return h >= s && h < t;
}
function a(h, s = 0) {
  return h = +h, isNaN(h) ? s : Math.trunc(h);
}
class I extends L {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    c(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    c(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    c(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    c(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    c(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    c(this, "vals");
    if (this._capacity = R, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], !(t == null || g(t))) {
      if (E(t)) {
        if (!k(t))
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
    return I.name;
  }
  set capacity(t) {
    if (t = +t, g(t))
      t = R, this.isFinite = !1;
    else if (k(t))
      this.isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size <= 0 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  at(t) {
    if (t = _(a(t, -1 / 0), this._size), !!m(t, 0, this._size))
      return this.vals[this.toIndex(t)];
  }
  clear() {
    this._size = 0, this.head = 0, this.next = 0, this.vals.length = 0;
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
    const r = this._capacity - 1, n = this.vals, o = this.toRanges(i, e);
    if (t <= i || e <= t) {
      t = this.toIndex(t);
      for (const [l, u] of o)
        for (let f = l; f < u; ++f)
          n[t] = n[f], t = t < r ? t + 1 : 0;
    } else {
      t = this.toIndex(t + (e - i));
      for (const [l, u] of o.reverse())
        for (let f = u - 1; f >= l; --f)
          t = t > 0 ? t - 1 : r, n[t] = n[f];
    }
  }
  delete(t) {
    return t = _(a(t, -1 / 0), this._size), m(t, 0, this._size) ? (this._delete(t, 1), !0) : !1;
  }
  /**
   * @internal
   */
  _delete(t, i) {
    this._copyWithin(t, t + i, this._size), this._pop(i);
  }
  *entries() {
    for (let t = 0; t < this._size; ++t)
      yield [t, this.vals[this.toIndex(t)]];
  }
  fill(t, i, e) {
    const r = this._size;
    return i = v(_(a(i, 0), r), 0, r), e = v(_(a(e, r), r), i, r), this._fill(t, i, e), this;
  }
  /**
   * @internal
   */
  _fill(t, i, e) {
    for (const [r, n] of this.toRanges(i, e))
      this.vals.fill(t, r, n);
  }
  first() {
    return this._size > 0 ? this.vals[this.head] : void 0;
  }
  forEach(t, i) {
    const e = this._size;
    for (let r = 0; r < e && r < this._size; ++r) {
      const n = this.vals[this.toIndex(r)];
      t.call(i, n, r, this);
    }
  }
  has(t) {
    const i = this.vals;
    for (const [e, r] of this.toRanges(0, this._size))
      for (let n = e; n < r; ++n)
        if (t === i[n])
          return !0;
    return !1;
  }
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
  }
  last() {
    return this._size > 0 ? this.vals[this.toIndex(this._size - 1)] : void 0;
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this.vals[this.toIndex(this._size - 1)];
    return this._pop(1), t;
  }
  /**
   * @internal
   */
  _pop(t) {
    const i = this._size - t;
    this._fill(void 0, i, this._size), this.next = this.toIndex(i), this._size = i;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._insert(this._size, t), this._size);
  }
  set(t, i) {
    if (t = _(a(t, -1 / 0), this._size), !m(t, 0, this._size))
      return;
    t = this.toIndex(t);
    const e = this.vals[t];
    return this.vals[t] = i, e;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this.vals[this.head];
    return this._shift(1), t;
  }
  /**
   * @internal
   */
  _shift(t) {
    this._fill(void 0, 0, t), this.head = this.toIndex(t), this._size -= t;
  }
  slice(t, i) {
    const e = this._size;
    return t = v(_(a(t, 0), e), 0, e), i = v(_(a(i, e), e), t, e), this.toList(this._slice(t, i));
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
    t = v(_(a(t, 0), r), 0, r), i = v(a(i, 0), 0, r - t);
    const n = this.toList(this._slice(t, t + i));
    return this._splice(t, i, e), n;
  }
  /**
   * @internal
   */
  _splice(t, i, e = []) {
    const r = e.length, n = Math.min(i, r), o = this.vals;
    let l = 0;
    for (const [u, f] of this.toRanges(t, t + n))
      for (let z = u; z < f; ++z)
        o[z] = e[l++];
    i != r && (t += n, i < r ? this._insert(t, e, n) : this._delete(t, i - r));
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
    if (t > 0) {
      const u = Math.min(t, n - o);
      this._overflow(this._slice(0, u)), this._shift(u), t -= u, o += u;
    }
    if (o >= n) {
      this._safeInsert(t, i, e, r);
      return;
    }
    const l = r - o;
    this._overflow(i.slice(e, l)), this._safePresert(0, i, l, r);
  }
  /**
   * @internal
   */
  _safeInsert(t, i, e = 0, r = i.length) {
    const n = r - e, o = this.vals;
    this._copyWithin(t + n, t, this._size);
    for (const [l, u] of this.toRanges(t, t + n))
      for (let f = l; f < u; ++f)
        o[f] = i[e++];
    this._size += n, this.next = this.toIndex(this._size);
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
    const n = r - e;
    let o = this._capacity - this._size;
    if (o >= n) {
      this._safePresert(t, i, e, r);
      return;
    }
    if (!this.isFinite)
      throw this._safePresert(t, i, r - o, r), new Error("Out of memory");
    if (t < this._size) {
      const u = Math.min(this._size - t, n - o);
      this._overflow(this._slice(this._size - u, this._size)), this._pop(u), o += u;
    }
    if (o >= n) {
      this._safePresert(t, i, e, r);
      return;
    }
    const l = e + o;
    this._overflow(i.slice(l, r)), this._safeInsert(this._size, i, e, l);
  }
  /**
   * @internal
   */
  _safePresert(t, i, e = 0, r = i.length) {
    const n = this._capacity, o = r - e, l = this.vals, u = n - o;
    this._copyWithin(u, 0, t), t += u;
    for (const [f, z] of this.toRanges(t, t + o))
      for (let w = f; w < z; ++w)
        l[w] = i[e++];
    this._size += o, this.head = this.toIndex(u);
  }
  *values() {
    for (let t = 0; t < this._size; ++t)
      yield this.vals[this.toIndex(t)];
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(t) {
    this.emitter.emit(p.Overflow, t);
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
    if (this._size > t) {
      const e = this._size - t;
      this._overflow(this._slice(0, e)), this._shift(e);
    }
    if (this.isSequential()) {
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
    const i = new I(0);
    return i.vals = t, i._size = t.length, i._capacity = t.length, i;
  }
  /**
   * @internal
   */
  toRanges(t, i) {
    const e = this.head, r = this._capacity - e;
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
    c(this, "list");
    this.list = new I(s);
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
  const t = h.next, i = y(t, s - 1);
  return h.next = i.next, i.next = void 0, [t, i];
}
function* M(h, s) {
  for (let t = 0; h != s; ++t)
    yield [t, h.value], h = h.next;
}
function y(h, s) {
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
function* P(h, s) {
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
function* b(h, s) {
  for (let t = 0; h != s; ++t)
    yield h.value, h = h.next;
}
function W(h, s) {
  if (s <= 0)
    return [void 0, void 0];
  const [t, i] = O(h, s);
  return t.prev = void 0, h.next != null && (h.next.prev = h), [t, i];
}
function K(h, s) {
  if (s >= 0)
    return y(h, s);
  for (let t = 0; h != null && t > s; --t)
    h = h.prev;
  return h;
}
function Q(h) {
  const s = {};
  let t = 0, i = s;
  for (const e of h)
    i.next = { prev: i, value: e }, i = i.next, ++t;
  return t <= 0 ? [void 0, void 0, 0] : (s.next.prev = void 0, [s.next, i, t]);
}
class x extends L {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    c(this, "_capacity");
    /**
     * The root of the linked list
     * @internal
     */
    c(this, "root");
    /**
     * The current size of the list (0 \<= size \<= capacity)
     * @internal
     */
    c(this, "_size");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, g(t))
      return;
    if (E(t)) {
      if (!d(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    const [i, e, r] = Q(t);
    this._capacity = r, r > 0 && (this.root.next = i, this.root.prev = e, i.prev = this.root, e.next = this.root, this._size = r);
  }
  get capacity() {
    return this._capacity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return x.name;
  }
  set capacity(t) {
    if (t = +t, !g(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [e, r] = W(this.root, i);
    this._size -= i, this.emitter.emit(p.Overflow, N(e, r.next));
  }
  at(t) {
    if (t = _(a(t, -1 / 0), this._size), !!m(t, 0, this._size))
      return this.get(t).value;
  }
  clear() {
    this._size = 0, this.root.next = this.root, this.root.prev = this.root;
  }
  delete(t) {
    if (t = _(a(t, -1 / 0), this._size), !m(t, 0, this._size))
      return !1;
    const i = this.get(t);
    return i.prev.next = i.next, i.next.prev = i.prev, --this._size, !0;
  }
  entries() {
    return M(this.root.next, this.root);
  }
  fill(t, i, e) {
    i = a(i, 0), i = v(_(i, this._size), 0, this._size), e = a(e, this._size), e = v(_(e, this._size), 0, this._size);
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
    return P(this.root.next, this.root);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this.root.prev;
    return t.prev.next = t.next, t.next.prev = t.prev, --this._size, t.value;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this.emitter.emit(p.Overflow, t), this._size) : (this.append(this.root.prev, t), this._size);
  }
  set(t, i) {
    if (t = _(a(t, -1 / 0), this._size), !m(t, 0, this._size))
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
    const e = new x();
    if (this._size <= 0)
      return e;
    t = a(t, 0), t = v(_(t, this._size), 0, this._size), i = a(i, this._size), i = v(_(i, this._size), 0, this._size);
    let r = this.get(t - 1);
    for (; t < i; )
      r = r.next, e.push(r.value), ++t;
    return e;
  }
  splice(t, i, ...e) {
    const r = new x();
    t = a(t, 0), t = v(_(t, this._size), 0, this._size), i = a(i, 0), i = v(i, 0, this._size - t);
    const n = this.get(t - 1);
    if (i > 0) {
      const [o, l] = W(n, i);
      this._size -= i, o.prev = r.root, l.next = r.root, r.root.next = o, r.root.prev = l, r._size = i;
    }
    return this.append(n, e), r;
  }
  [Symbol.iterator]() {
    return b(this.root.next, this.root);
  }
  unshift(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this.emitter.emit(p.Overflow, t), this._size) : (this.prepend(this.root.next, t), this._size);
  }
  values() {
    return b(this.root.next, this.root);
  }
  /**
   * @internal
   */
  append(t, i) {
    const e = this.root, r = t.next, n = [], o = this._capacity;
    let l = this._size;
    const u = i.length;
    for (let f = 0; f < u; ++f) {
      const z = { prev: t, value: i[f] };
      t.next = z, t = z, l < o ? ++l : (n.push(e.next.value), e.next = e.next.next);
    }
    return t.next = r, r.prev = t, e.next.prev = e, n.length > 0 && this.emitter.emit(p.Overflow, n), this._size = l, t;
  }
  /**
   * @internal
   */
  get(t) {
    return t -= t <= this._size / 2 ? -1 : this._size, K(this.root, t);
  }
  /**
   * @internal
   */
  prepend(t, i) {
    const e = this.root, r = t.prev, n = [], o = this._capacity;
    let l = this._size;
    for (let u = i.length - 1; u >= 0; --u) {
      const f = { next: t, value: i[u] };
      t.prev = f, t = f, l < o ? ++l : (n.push(e.prev.value), e.prev = e.prev.prev);
    }
    return t.prev = r, r.next = t, e.prev.next = e, n.length > 0 && this.emitter.emit(p.Overflow, n.reverse()), this._size = l, t;
  }
}
class A {
  constructor(s) {
    /**
     * @internal
     */
    c(this, "list");
    this.list = new x(s);
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
class S extends L {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    c(this, "_capacity");
    /**
     * The root of the linked list
     * @internal
     */
    c(this, "root");
    /**
     * The current size of the list (0 \<= size \<= capacity)
     * @internal
     */
    c(this, "_size");
    /**
     * The last node in the linked list.
     * @internal
     */
    c(this, "tail");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.clear(), t = t ?? 1 / 0, g(t))
      return;
    if (E(t)) {
      if (!d(t))
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
    return S.name;
  }
  set capacity(t) {
    if (t = +t, !g(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const i = this._size - t, [e] = O(this.root, i);
    this._size -= i, this._size <= 0 && (this.tail = this.root), this.emitter.emit(p.Overflow, N(e));
  }
  at(t) {
    if (t = _(a(t, -1 / 0), this._size), !!m(t, 0, this._size))
      return ++t == this._size ? this.tail.value : y(this.root, t).value;
  }
  clear() {
    this._size = 0, this.root.next = void 0, this.tail = this.root;
  }
  delete(t) {
    if (t = _(a(t, -1 / 0), this._size), !m(t, 0, this._size))
      return !1;
    const i = y(this.root, t);
    return i.next = i.next.next, --this._size, t == this._size && (this.tail = i), !0;
  }
  entries() {
    return M(this.root.next);
  }
  fill(t, i, e) {
    i = a(i, 0), i = v(_(i, this._size), 0, this._size), e = a(e, this._size), e = v(_(e, this._size), 0, this._size);
    let r = y(this.root, i + 1);
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
    return P(this.root.next);
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this.tail.value;
    return this.tail = y(this.root, --this._size), this.tail.next = void 0, t;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this.emitter.emit(p.Overflow, t), this._size) : (this.tail = this.append(this.tail, t), this._size);
  }
  set(t, i) {
    if (t = _(a(t, -1 / 0), this._size), !m(t, 0, this._size))
      return;
    const e = y(this.root, t + 1), r = e.value;
    return e.value = i, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const t = this.root.next;
    return this.root.next = t.next, --this._size, this._size <= 0 && (this.tail = this.root), t.value;
  }
  slice(t, i) {
    const e = new S();
    if (this._size <= 0)
      return e;
    t = a(t, 0), t = v(_(t, this._size), 0, this._size), i = a(i, this._size), i = v(_(i, this._size), 0, this._size);
    let r = y(this.root, t);
    for (; t < i; )
      r = r.next, e.push(r.value), ++t;
    return e;
  }
  splice(t, i, ...e) {
    const r = new S();
    t = a(t, 0), t = v(_(t, this._size), 0, this._size), i = a(i, 0), i = v(i, 0, this._size - t);
    let n = y(this.root, t);
    if (i > 0) {
      const [o, l] = O(n, i);
      this._size -= i, r.root.next = o, r.tail = l, r._size = i;
    }
    return n = this.append(n, e), n.next == null && (this.tail = n), r;
  }
  [Symbol.iterator]() {
    return b(this.root.next);
  }
  unshift(...t) {
    let i = t.length;
    if (i <= 0)
      return this._size;
    const e = this._capacity;
    if (e <= 0)
      return this.emitter.emit(p.Overflow, t), this._size;
    const r = i <= e ? 0 : i - e;
    if (i -= r, this._size + i > e) {
      this._size = e - i;
      const l = y(this.root, this._size);
      this.emitter.emit(p.Overflow, N(l.next)), l.next = void 0, this.tail = l;
    }
    r > 0 && (this.emitter.emit(p.Overflow, t.slice(i)), t.length = i);
    const [n, o] = T(t);
    return o.next = this.root.next, this.root.next = n, this._size <= 0 && (this.tail = o), this._size += i, this._size;
  }
  values() {
    return b(this.root.next);
  }
  /**
   * @internal
   */
  append(t, i, e = 0) {
    const r = this.root, n = t.next, o = [], l = this._capacity;
    let u = this._size;
    const f = i.length;
    for (let z = e; z < f; ++z) {
      const w = { value: i[z] };
      t.next = w, t = w, u < l ? ++u : (o.push(r.next.value), r.next = r.next.next);
    }
    return t.next = n, o.length > 0 && this.emitter.emit(p.Overflow, o), this._size = u, t;
  }
}
class V {
  constructor(s) {
    /**
     * @internal
     */
    c(this, "list");
    this.list = new S(s);
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
class B {
  constructor(s) {
    /**
     * @internal
     */
    c(this, "list");
    this.list = new x(s);
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
class $ extends L {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    c(this, "_capacity");
    /**
     * The internal map.
     * @internal
     */
    c(this, "map");
    if (this._capacity = 1 / 0, this.map = /* @__PURE__ */ new Map(), t = t ?? 1 / 0, !g(t)) {
      if (E(t)) {
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
   * @returns the number of values in the map.
   */
  get size() {
    return this.map.size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return $.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(t) {
    if (t = +t, !g(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this.map);
      this.clear(), this.emitter.emit(p.Overflow, r);
      return;
    }
    const i = [], e = this.map.entries();
    for (let r = this.size - t; r > 0; --r) {
      const n = e.next().value;
      this.map.delete(n[0]), i.push(n);
    }
    this.emitter.emit(p.Overflow, i);
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
      return this.emitter.emit(p.Overflow, [[t, i]]), this;
    const e = [];
    if (!this.map.delete(t) && this.size >= this.capacity) {
      const r = this.map.entries().next().value;
      this.map.delete(r[0]), e.push(r);
    }
    return this.map.set(t, i), e.length > 0 && this.emitter.emit(p.Overflow, e), this;
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
class j {
  constructor(s) {
    /**
     * @internal
     */
    c(this, "list");
    this.list = new I(s);
  }
  get capacity() {
    return this.list.capacity;
  }
  get size() {
    return this.list.size;
  }
  get [Symbol.toStringTag]() {
    return j.name;
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
class H extends L {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     * @internal
     */
    c(this, "_capacity");
    /**
     * The internal set.
     * @internal
     */
    c(this, "set");
    if (this._capacity = 1 / 0, this.set = /* @__PURE__ */ new Set(), t = t ?? 1 / 0, !g(t)) {
      if (E(t)) {
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
    return H.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(t) {
    if (t = +t, !g(t) && !d(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this.set);
      this.clear(), this.emitter.emit(p.Overflow, r);
      return;
    }
    const i = [], e = this.set.values();
    for (let r = this.size - t; r > 0; --r) {
      const n = e.next().value;
      this.set.delete(n), i.push(n);
    }
    this.emitter.emit(p.Overflow, i);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this.emitter.emit(p.Overflow, [t]), this;
    const i = [];
    if (!this.set.delete(t) && this.size >= this.capacity) {
      const e = this.set.values().next().value;
      this.set.delete(e), i.push(e);
    }
    return this.set.add(t), i.length > 0 && this.emitter.emit(p.Overflow, i), this;
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
class Y {
  constructor(s) {
    /**
     * @internal
     */
    c(this, "list");
    this.list = new I(s);
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
  p as BoundedEvent,
  I as CircularArrayList,
  F as CircularDeque,
  x as CircularDoublyLinkedList,
  A as CircularLinkedDeque,
  S as CircularLinkedList,
  V as CircularLinkedQueue,
  B as CircularLinkedStack,
  $ as CircularMap,
  j as CircularQueue,
  H as CircularSet,
  Y as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
