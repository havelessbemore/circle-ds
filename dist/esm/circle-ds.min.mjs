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
var ct = (n, i, t) => i in n ? at(n, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[i] = t;
var v = (n, i, t) => (ct(n, typeof i != "symbol" ? i + "" : i, t), t);
const x = {
  Overflow: "overflow"
};
function vt(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Q = { exports: {} };
(function(n) {
  var i = Object.prototype.hasOwnProperty, t = "~";
  function e() {
  }
  Object.create && (e.prototype = /* @__PURE__ */ Object.create(null), new e().__proto__ || (t = !1));
  function s(u, l, _) {
    this.fn = u, this.context = l, this.once = _ || !1;
  }
  function r(u, l, _, f, y) {
    if (typeof _ != "function")
      throw new TypeError("The listener must be a function");
    var g = new s(_, f || u, y), z = t ? t + l : l;
    return u._events[z] ? u._events[z].fn ? u._events[z] = [u._events[z], g] : u._events[z].push(g) : (u._events[z] = g, u._eventsCount++), u;
  }
  function h(u, l) {
    --u._eventsCount === 0 ? u._events = new e() : delete u._events[l];
  }
  function o() {
    this._events = new e(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var l = [], _, f;
    if (this._eventsCount === 0)
      return l;
    for (f in _ = this._events)
      i.call(_, f) && l.push(t ? f.slice(1) : f);
    return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(_)) : l;
  }, o.prototype.listeners = function(l) {
    var _ = t ? t + l : l, f = this._events[_];
    if (!f)
      return [];
    if (f.fn)
      return [f.fn];
    for (var y = 0, g = f.length, z = new Array(g); y < g; y++)
      z[y] = f[y].fn;
    return z;
  }, o.prototype.listenerCount = function(l) {
    var _ = t ? t + l : l, f = this._events[_];
    return f ? f.fn ? 1 : f.length : 0;
  }, o.prototype.emit = function(l, _, f, y, g, z) {
    var I = t ? t + l : l;
    if (!this._events[I])
      return !1;
    var a = this._events[I], d = arguments.length, O, m;
    if (a.fn) {
      switch (a.once && this.removeListener(l, a.fn, void 0, !0), d) {
        case 1:
          return a.fn.call(a.context), !0;
        case 2:
          return a.fn.call(a.context, _), !0;
        case 3:
          return a.fn.call(a.context, _, f), !0;
        case 4:
          return a.fn.call(a.context, _, f, y), !0;
        case 5:
          return a.fn.call(a.context, _, f, y, g), !0;
        case 6:
          return a.fn.call(a.context, _, f, y, g, z), !0;
      }
      for (m = 1, O = new Array(d - 1); m < d; m++)
        O[m - 1] = arguments[m];
      a.fn.apply(a.context, O);
    } else {
      var ft = a.length, W;
      for (m = 0; m < ft; m++)
        switch (a[m].once && this.removeListener(l, a[m].fn, void 0, !0), d) {
          case 1:
            a[m].fn.call(a[m].context);
            break;
          case 2:
            a[m].fn.call(a[m].context, _);
            break;
          case 3:
            a[m].fn.call(a[m].context, _, f);
            break;
          case 4:
            a[m].fn.call(a[m].context, _, f, y);
            break;
          default:
            if (!O)
              for (W = 1, O = new Array(d - 1); W < d; W++)
                O[W - 1] = arguments[W];
            a[m].fn.apply(a[m].context, O);
        }
    }
    return !0;
  }, o.prototype.on = function(l, _, f) {
    return r(this, l, _, f, !1);
  }, o.prototype.once = function(l, _, f) {
    return r(this, l, _, f, !0);
  }, o.prototype.removeListener = function(l, _, f, y) {
    var g = t ? t + l : l;
    if (!this._events[g])
      return this;
    if (!_)
      return h(this, g), this;
    var z = this._events[g];
    if (z.fn)
      z.fn === _ && (!y || z.once) && (!f || z.context === f) && h(this, g);
    else {
      for (var I = 0, a = [], d = z.length; I < d; I++)
        (z[I].fn !== _ || y && !z[I].once || f && z[I].context !== f) && a.push(z[I]);
      a.length ? this._events[g] = a.length === 1 ? a[0] : a : h(this, g);
    }
    return this;
  }, o.prototype.removeAllListeners = function(l) {
    var _;
    return l ? (_ = t ? t + l : l, this._events[_] && h(this, _)) : (this._events = new e(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, n.exports = o;
})(Q);
var pt = Q.exports;
const zt = /* @__PURE__ */ vt(pt);
class k {
  constructor(i = new zt()) {
    /**
     * @internal
     * The event emitter.
     *
     */
    v(this, "_emitter");
    this._emitter = i;
  }
  addListener(i, t) {
    return this._emitter.addListener(i, t), this;
  }
  on(i, t) {
    return this._emitter.on(i, t), this;
  }
  removeListener(i, t) {
    return this._emitter.removeListener(i, t), this;
  }
}
const A = 16383, j = 4294967295, L = Number.MAX_SAFE_INTEGER;
function U(n) {
  return Number.isInteger(n) && n >= 0 && n <= j;
}
function F(n) {
  return n === Number.POSITIVE_INFINITY;
}
function yt(n) {
  return typeof (n == null ? void 0 : n[Symbol.iterator]) == "function";
}
function X(n) {
  return Number.isInteger(n) && n >= 0 && n <= L;
}
function $(n) {
  return typeof n == "number";
}
function q(n) {
  return Number.isSafeInteger(n) && n >= 0;
}
function p(n, i, t = 0) {
  return n >= t ? n : n + i;
}
function w(n, i, t) {
  if (i > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return n <= i ? i : n <= t ? n : t;
}
function E(n, i, t) {
  return n >= i && n < t;
}
function gt(n, i) {
  return n >= 0 && i > 0 ? Math.log(n) / Math.log(i) : NaN;
}
function wt(n, i = 1 / 0, t = Math.random) {
  let e = 0;
  for (; e < i && t() < n; )
    ++e;
  return e;
}
function c(n, i = 0) {
  return n = +n, isNaN(n) ? i : Math.trunc(n);
}
function* M(n, i) {
  if (i < 1)
    return;
  let t = [];
  i = Math.trunc(i);
  for (const e of n)
    t.push(e) >= i && (yield t, t = []);
  t.length > 0 && (yield t);
}
class T extends k {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    v(this, "_capacity");
    /**
     * @internal
     * The index representing the first element.
     */
    v(this, "_head");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    v(this, "_isFinite");
    /**
     * @internal
     * The index one more than the last element.
     */
    v(this, "_next");
    /**
     * @internal
     * The number of elements.
     */
    v(this, "_size");
    /**
     * @internal
     * The stored values.
     */
    v(this, "_vals");
    if (this._capacity = j, this._head = 0, this._isFinite = !1, this._size = 0, this._next = 0, this._vals = [], t != null) {
      if ($(t)) {
        this.capacity = t;
        return;
      }
      for (const e of M(t, A))
        this._insert(this._size, e);
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
    return T.name;
  }
  set capacity(t) {
    if (t = +t, F(t))
      t = j, this._isFinite = !1;
    else if (U(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size <= 0 ? (this._capacity = t, this.clear()) : t < this._capacity ? this._shrink(t) : t > this._capacity && this._grow(t);
  }
  at(t) {
    if (t = p(c(t, -1 / 0), this._size), !!E(t, 0, this._size))
      return this._vals[this._toIndex(t)];
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
  _copyWithin(t, e, s) {
    if (t == e || e >= s)
      return;
    const r = this._capacity - 1, h = this._vals, o = this._toRanges(e, s);
    if (t <= e || s <= t) {
      t = this._toIndex(t);
      for (const [u, l] of o)
        for (let _ = u; _ < l; ++_)
          h[t] = h[_], t = t < r ? t + 1 : 0;
    } else {
      t = this._toIndex(t + (s - e));
      for (const [u, l] of o.reverse())
        for (let _ = l - 1; _ >= u; --_)
          t = t > 0 ? t - 1 : r, h[t] = h[_];
    }
  }
  delete(t) {
    return t = p(c(t, -1 / 0), this._size), E(t, 0, this._size) ? (this._delete(t, 1), !0) : !1;
  }
  /**
   * @internal
   */
  _delete(t, e) {
    this._copyWithin(t, t + e, this._size), this._pop(e);
  }
  *entries() {
    for (let t = 0; t < this._size; ++t)
      yield [t, this._vals[this._toIndex(t)]];
  }
  fill(t, e, s) {
    const r = this._size;
    return e = w(p(c(e, 0), r), 0, r), s = w(p(c(s, r), r), e, r), this._fill(t, e, s), this;
  }
  /**
   * @internal
   */
  _fill(t, e, s) {
    for (const [r, h] of this._toRanges(e, s))
      this._vals.fill(t, r, h);
  }
  first() {
    return this._size > 0 ? this._vals[this._head] : void 0;
  }
  forEach(t, e) {
    const s = this._size;
    for (let r = 0; r < s && r < this._size; ++r) {
      const h = this._vals[this._toIndex(r)];
      t.call(e, h, r, this);
    }
  }
  has(t) {
    const e = this._vals;
    for (const [s, r] of this._toRanges(0, this._size))
      for (let h = s; h < r; ++h)
        if (t === e[h])
          return !0;
    return !1;
  }
  *keys() {
    for (let t = 0; t < this._size; ++t)
      yield t;
  }
  last() {
    return this._size > 0 ? this._vals[this._toIndex(this._size - 1)] : void 0;
  }
  pop() {
    if (this._size <= 0)
      return;
    const t = this._vals[this._toIndex(this._size - 1)];
    return this._pop(1), t;
  }
  /**
   * @internal
   */
  _pop(t) {
    const e = this._size - t;
    this._fill(void 0, e, this._size), this._next = this._toIndex(e), this._size = e;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._insert(this._size, t), this._size);
  }
  set(t, e) {
    if (t = p(c(t, -1 / 0), this._size), !E(t, 0, this._size))
      return;
    t = this._toIndex(t);
    const s = this._vals[t];
    return this._vals[t] = e, s;
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
    this._fill(void 0, 0, t), this._head = this._toIndex(t), this._size -= t;
  }
  slice(t, e) {
    const s = this._size;
    return t = w(p(c(t, 0), s), 0, s), e = w(p(c(e, s), s), t, s), this._toList(this._slice(t, e));
  }
  /**
   * @internal
   */
  _slice(t, e) {
    const s = this._vals, r = new Array(e - t);
    let h = 0;
    for ([t, e] of this._toRanges(t, e))
      for (let o = t; o < e; ++o)
        r[h++] = s[o];
    return r;
  }
  splice(t, e, ...s) {
    const r = this._size;
    t = w(p(c(t, 0), r), 0, r), e = w(c(e, 0), 0, r - t);
    const h = this._toList(this._slice(t, t + e));
    return this._splice(t, e, s), h;
  }
  /**
   * @internal
   */
  _splice(t, e, s = []) {
    const r = s.length, h = Math.min(e, r), o = this._vals;
    let u = 0;
    for (const [l, _] of this._toRanges(t, t + h))
      for (let f = l; f < _; ++f)
        o[f] = s[u++];
    e != r && (t += h, e < r ? this._insert(t, s, h) : this._delete(t, e - r));
  }
  /**
   * @internal
   */
  _insert(t, e, s = 0, r = e.length) {
    const h = r - s;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safeInsert(t, e, s, r);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, e, s, s + o), new Error("Out of memory");
    if (t > 0) {
      const l = Math.min(t, h - o);
      this._overflow(this._slice(0, l)), this._shift(l), t -= l, o += l;
    }
    if (o >= h) {
      this._safeInsert(t, e, s, r);
      return;
    }
    const u = r - o;
    this._overflow(e.slice(s, u)), this._safePresert(0, e, u, r);
  }
  /**
   * @internal
   */
  _safeInsert(t, e, s = 0, r = e.length) {
    const h = r - s, o = this._vals;
    this._copyWithin(t + h, t, this._size);
    for (const [u, l] of this._toRanges(t, t + h))
      for (let _ = u; _ < l; ++_)
        o[_] = e[s++];
    this._size += h, this._next = this._toIndex(this._size);
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
  _presert(t, e, s = 0, r = e.length) {
    const h = r - s;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safePresert(t, e, s, r);
      return;
    }
    if (!this._isFinite)
      throw this._safePresert(t, e, r - o, r), new Error("Out of memory");
    if (t < this._size) {
      const l = Math.min(this._size - t, h - o);
      this._overflow(this._slice(this._size - l, this._size)), this._pop(l), o += l;
    }
    if (o >= h) {
      this._safePresert(t, e, s, r);
      return;
    }
    const u = s + o;
    this._overflow(e.slice(u, r)), this._safeInsert(this._size, e, s, u);
  }
  /**
   * @internal
   */
  _safePresert(t, e, s = 0, r = e.length) {
    const h = this._capacity, o = r - s, u = this._vals, l = h - o;
    this._copyWithin(l, 0, t), t += l;
    for (const [_, f] of this._toRanges(t, t + o))
      for (let y = _; y < f; ++y)
        u[y] = e[s++];
    this._size += o, this._head = this._toIndex(l);
  }
  *values() {
    for (let t = 0; t < this._size; ++t)
      yield this._vals[this._toIndex(t)];
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(t) {
    this._emitter.emit(x.Overflow, t);
  }
  /**
   * @internal
   *
   * Grow capacity.
   *
   * @param capacity - the new capacity
   */
  _grow(t) {
    if (this._isSequential()) {
      this._sequentialReset(t);
      return;
    }
    if (this._size <= this._head) {
      const e = this._size - this._next;
      this._vals.copyWithin(e, 0, this._next), this._vals.copyWithin(0, this._head, this._head + e), this._vals.length = this._size, this._head = 0, this._next = this._size;
    } else if (this._head + this._size <= t)
      this._vals.length = this._head + this._size, this._vals.copyWithin(this._capacity, 0, this._next), this._vals.fill(void 0, 0, this._next), this._next = (this._head + this._size) % t;
    else {
      const e = t - this._capacity;
      this._vals.length = t, this._vals.copyWithin(this._capacity, 0, e), this._vals.copyWithin(0, e, this._next);
      const s = Math.max(e, this._next - e);
      this._vals.fill(void 0, s, this._next), this._next -= e;
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
  _isSequential() {
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
  _sequentialReset(t) {
    const e = this._head + this._size;
    return e <= t ? (this._vals.length = e, this._next = this._vals.length % t) : this._head >= t ? (this._vals.copyWithin(0, this._head, e), this._vals.length = this._size, this._head = 0, this._next = this._size % t) : (this._vals.copyWithin(0, t, e), this._vals.length = t, this._next = e - t), this._capacity = t, !0;
  }
  /**
   * @internal
   *
   * Shrink capacity.
   *
   * @param capacity - the new capacity
   */
  _shrink(t) {
    if (this._size > t) {
      const s = this._size - t;
      this._overflow(this._slice(0, s)), this._shift(s);
    }
    if (this._isSequential()) {
      this._sequentialReset(t);
      return;
    }
    const e = this._capacity - t;
    this._vals.copyWithin(this._head - e, this._head, this._capacity), this._vals.length = t, this._head -= e, this._capacity = t;
  }
  /**
   * @internal
   */
  _toIndex(t) {
    return (this._head + t) % this._capacity;
  }
  /**
   * @internal
   */
  _toList(t) {
    const e = new T(0);
    return e._vals = t, e._size = t.length, e._capacity = t.length, e;
  }
  /**
   * @internal
   */
  _toRanges(t, e) {
    const s = this._head, r = this._capacity - s;
    return e <= r ? [[s + t, s + e]] : t >= r ? [[t - r, e - r]] : [
      [s + t, this._capacity],
      [0, e - r]
    ];
  }
}
class Z {
  constructor(i) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new T(i);
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
  set capacity(i) {
    this._list.capacity = i;
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
  forEach(i, t) {
    return this._list.forEach((e, s) => i.call(t, e, s, this));
  }
  front() {
    return this._list.first();
  }
  has(i) {
    return this._list.has(i);
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
  push(...i) {
    return this._list.push(...i);
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
  unshift(...i) {
    return this._list.unshift(...i);
  }
  values() {
    return this._list.values();
  }
  addListener(i, t) {
    return this._list.addListener(i, t), this;
  }
  on(i, t) {
    return this._list.on(i, t), this;
  }
  removeListener(i, t) {
    return this._list.removeListener(i, t), this;
  }
}
function mt(n, i) {
  const t = { value: void 0 };
  let e = 0, s = t;
  for (; n != null && e < i; ) {
    const r = { value: n.value };
    s.next = r, s = r, ++e, n = n.next;
  }
  return s.next = void 0, { root: t, size: e, tail: s };
}
function G(n, i) {
  const t = { value: void 0 };
  if (n == null || i <= 0)
    return { root: t, size: 0, tail: t };
  const e = n.next, s = H(e, i - 1);
  return n.next = s.next, s.next = void 0, t.next = e, { root: t, size: i, tail: s };
}
function* C(n) {
  for (let i = 0; n != null; ++i)
    yield [i, n.value], n = n.next;
}
function H(n, i) {
  if (!(i < 0)) {
    for (let t = 0; n != null && t < i; ++t)
      n = n.next;
    return n;
  }
}
function tt(n, i) {
  for (; n != null; ) {
    if (n.value === i)
      return !0;
    n = n.next;
  }
  return !1;
}
function* et(n) {
  for (let i = 0; n != null; ++i)
    yield i, n = n.next;
}
function xt(n) {
  const i = { value: void 0 };
  let t = 0, e = i;
  for (const s of n)
    e.next = { value: s }, e = e.next, ++t;
  return e.next = void 0, { root: i, size: t, tail: e };
}
function* b(n) {
  for (; n != null; )
    yield n.value, n = n.next;
}
function It(n, i) {
  const t = { value: void 0 };
  if (n == null || i <= 0)
    return { root: t, size: 0, tail: t };
  let e = 0, s = t;
  for (; n != null && e < i; ) {
    const r = { value: n.value };
    s.next = r, r.prev = s, s = r, ++e, n = n.next;
  }
  return t.prev = void 0, s.next = void 0, { root: t, size: e, tail: s };
}
function B(n, i) {
  const t = G(n, i);
  if (t.size <= 0)
    return t;
  t.root.next.prev = t.root;
  const e = n.next;
  return e != null && (e.prev = n), t;
}
function D(n, i) {
  if (i >= 0)
    return H(n, i);
  for (let t = 0; n != null && t > i; --t)
    n = n.prev;
  return n;
}
function Et(n) {
  const i = { value: void 0 };
  let t = 0, e = i;
  for (const s of n)
    e.next = { prev: e, value: s }, e = e.next, ++t;
  return i.prev = void 0, e.next = void 0, { root: i, size: t, tail: e };
}
class S extends k {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    v(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    v(this, "_isFinite");
    /**
     * @internal
     * The root of the linked list
     */
    v(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    v(this, "_size");
    /**
     * @internal
     * The last node in the linked list.
     */
    v(this, "_tail");
    if (this._capacity = L, this._isFinite = !1, this._root = { value: void 0 }, this._size = 0, this._tail = this._root, t != null) {
      if ($(t)) {
        this.capacity = t;
        return;
      }
      for (const e of M(t, A))
        this._insert(this._size, e);
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
    return S.name;
  }
  set capacity(t) {
    if (t = +t, t = +t, F(t))
      t = L, this._isFinite = !1;
    else if (X(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const e = this._size - t, { root: s } = B(this._root, e);
    this._size -= e, this._size <= 0 && (this._tail = this._root);
    for (const r of M(b(s.next), A))
      this._overflow(r);
  }
  at(t) {
    if (t = p(c(t, -1 / 0), this._size), !!E(t, 0, this._size))
      return this._get(t).value;
  }
  clear() {
    this._size = 0, this._tail = this._root, this._root.next = void 0;
  }
  delete(t) {
    if (t = p(c(t, -1 / 0), this._size), !E(t, 0, this._size))
      return !1;
    const e = this._get(t);
    return e.prev.next = e.next, e.next != null && (e.next.prev = e.prev), --this._size, !0;
  }
  entries() {
    return C(this._root.next);
  }
  fill(t, e, s) {
    e = c(e, 0), e = w(p(e, this._size), 0, this._size), s = c(s, this._size), s = w(p(s, this._size), 0, this._size);
    let r = this._get(e);
    for (; e < s; )
      r.value = t, r = r.next, ++e;
    return this;
  }
  forEach(t, e) {
    let s = this._root;
    for (let r = 0; r < this._size; ++r)
      s = s.next, t.call(e, s.value, r, this);
  }
  has(t) {
    return tt(this._root.next, t);
  }
  keys() {
    return et(this._root.next);
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
  set(t, e) {
    if (t = p(c(t, -1 / 0), this._size), !E(t, 0, this._size))
      return;
    const s = this._get(t), r = s.value;
    return s.value = e, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.next.value;
  }
  slice(t, e) {
    const s = this._size;
    if (t = w(p(c(t, 0), s), 0, s), e = w(p(c(e, s), s), t, s), t >= e)
      return new S(0);
    const r = this._get(t), h = It(r, e - t), o = new S(h.size);
    return o._root = h.root, o._size = h.size, o._tail = h.tail, o;
  }
  splice(t, e, ...s) {
    const r = this._size;
    t = w(p(c(t, 0), r), 0, r), e = w(c(e, 0), 0, r - t);
    let h;
    if (e <= 0)
      h = new S(0);
    else {
      const { root: o, size: u, tail: l } = this._cut(t, e);
      h = new S(u), h._root = o, h._size = u, h._tail = l;
    }
    return this._insert(t, s), h;
  }
  [Symbol.iterator]() {
    return b(this._root.next);
  }
  unshift(...t) {
    return this._presert(0, t), this._size;
  }
  values() {
    return b(this._root.next);
  }
  /**
   * @internal
   */
  _cut(t, e) {
    const s = this._get(t - 1), r = B(s, e);
    return this._size -= e, t >= this._size && (this._tail = s), r;
  }
  /**
   * @internal
   */
  _get(t) {
    const e = this._size / 2;
    return ++t <= e ? D(this._root, t) : D(this._tail, t - this._size);
  }
  /**
   * @internal
   */
  _insert(t, e) {
    const s = e.length;
    if (s <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(e);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, e.slice(0, r)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, s - r), { root: u } = this._cut(0, o);
      this._overflow(b(u.next)), t -= o, r += o;
    }
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    const h = e.length - r;
    this._overflow(e.slice(0, h)), this._safeInsert(0, e.slice(h));
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(t) {
    Array.isArray(t) || (t = Array.from(t)), this._emitter.emit(x.Overflow, t);
  }
  /**
   * @internal
   */
  _presert(t, e) {
    const s = e.length;
    if (s <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(e);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, e.slice(e.length - r)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, s - r), { root: o } = this._cut(this._size - h, h);
      this._overflow(b(o.next)), r += h;
    }
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    this._overflow(e.slice(r)), this._safeInsert(this._size, e.slice(0, r));
  }
  /**
   * @internal
   */
  _safeInsert(t, e) {
    if (e.length <= 0)
      return;
    const { root: s, size: r, tail: h } = Et(e), o = s.next, u = this._get(t - 1), l = u.next;
    o.prev = u, h.next = l, u.next = o, l != null && (l.prev = h), this._tail = t < this._size ? this._tail : h, this._size += r;
  }
}
class st {
  constructor(i) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new S(i);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return st.name;
  }
  set capacity(i) {
    this._list.capacity = i;
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
  forEach(i, t) {
    this._list.forEach((e, s) => i.call(t, e, s, this), t);
  }
  has(i) {
    return this._list.has(i);
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
  push(...i) {
    return this._list.push(...i);
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
  unshift(...i) {
    return this._list.unshift(...i);
  }
  values() {
    return this._list.values();
  }
  addListener(i, t) {
    return this._list.addListener(i, t), this;
  }
  on(i, t) {
    return this._list.on(i, t), this;
  }
  removeListener(i, t) {
    return this._list.removeListener(i, t), this;
  }
}
class N extends k {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    v(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    v(this, "_isFinite");
    /**
     * @internal
     * The root of the linked list
     */
    v(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    v(this, "_size");
    /**
     * @internal
     * The last node in the linked list.
     */
    v(this, "_tail");
    if (this._capacity = L, this._isFinite = !1, this._root = { value: void 0 }, this._size = 0, this._tail = this._root, t != null) {
      if ($(t)) {
        this.capacity = t;
        return;
      }
      for (const e of M(t, A))
        this._insert(this._size, e);
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
    return N.name;
  }
  set capacity(t) {
    if (t = +t, F(t))
      t = L, this._isFinite = !1;
    else if (X(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const e = this._size - t, { root: s } = G(this._root, e);
    this._size -= e, this._size <= 0 && (this._tail = this._root), this._overflow(s.next);
  }
  at(t) {
    if (t = p(c(t, -1 / 0), this._size), !!E(t, 0, this._size))
      return this._get(t).value;
  }
  clear() {
    this._size = 0, this._tail = this._root, this._root.next = void 0;
  }
  delete(t) {
    return t = p(c(t, -1 / 0), this._size), E(t, 0, this._size) ? (this._cut(t, 1), !0) : !1;
  }
  entries() {
    return C(this._root.next);
  }
  fill(t, e, s) {
    const r = this._size;
    if (e = w(p(c(e, 0), r), 0, r), s = w(p(c(s, r), r), e, r), e >= s)
      return this;
    let h = this._get(e);
    for (let o = e; o < s; ++o)
      h.value = t, h = h.next;
    return this;
  }
  forEach(t, e) {
    let s = this._root;
    for (let r = 0; r < this._size; ++r)
      s = s.next, t.call(e, s.value, r, this);
  }
  has(t) {
    return tt(this._root.next, t);
  }
  keys() {
    return et(this._root.next);
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
  set(t, e) {
    if (t = p(c(t, -1 / 0), this._size), !E(t, 0, this._size))
      return;
    const s = this._get(t), r = s.value;
    return s.value = e, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.next.value;
  }
  slice(t, e) {
    const s = this._size;
    if (t = w(p(c(t, 0), s), 0, s), e = w(p(c(e, s), s), t, s), t >= e)
      return new N(0);
    const r = this._get(t), h = mt(r, e - t), o = new N(h.size);
    return o._root = h.root, o._size = h.size, o._tail = h.tail, o;
  }
  splice(t, e, ...s) {
    const r = this._size;
    t = w(p(c(t, 0), r), 0, r), e = w(c(e, 0), 0, r - t);
    let h;
    if (e <= 0)
      h = new N(0);
    else {
      const { root: o, size: u, tail: l } = this._cut(t, e);
      h = new N(e), h._root = o, h._size = u, h._tail = l;
    }
    return this._insert(t, s), h;
  }
  [Symbol.iterator]() {
    return b(this._root.next);
  }
  unshift(...t) {
    return this._presert(0, t), this._size;
  }
  values() {
    return b(this._root.next);
  }
  /**
   * @internal
   */
  _cut(t, e) {
    const s = this._get(t - 1), r = G(s, e);
    return this._size -= e, t >= this._size && (this._tail = s), r;
  }
  /**
   * @internal
   */
  _get(t) {
    return ++t == this._size ? this._tail : H(this._root, t);
  }
  /**
   * @internal
   */
  _insert(t, e) {
    const s = e.length;
    if (s <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(e);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, e.slice(0, r)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, s - r), { root: u } = this._cut(0, o);
      this._overflow(u.next), t -= o, r += o;
    }
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    const h = e.length - r;
    this._overflow(e.slice(0, h)), this._safeInsert(0, e.slice(h));
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
        this._emitter.emit(x.Overflow, t);
        return;
      }
      for (const e of M(b(t), A))
        this._emitter.emit(x.Overflow, e);
    }
  }
  /**
   * @internal
   */
  _presert(t, e) {
    const s = e.length;
    if (s <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(e);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, e.slice(e.length - r)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, s - r), { root: o } = this._cut(this._size - h, h);
      this._overflow(o.next), r += h;
    }
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    this._overflow(e.slice(r)), this._safeInsert(this._size, e.slice(0, r));
  }
  /**
   * @internal
   */
  _safeInsert(t, e) {
    if (e.length <= 0)
      return;
    const { root: s, size: r, tail: h } = xt(e), o = this._get(t - 1);
    h.next = o.next, o.next = s.next, this._tail = t < this._size ? this._tail : h, this._size += r;
  }
}
function K(n, i) {
  return n <= 0 || i <= 1 ? 1 : n >= 1 ? 1 / 0 : Math.ceil(gt(i, 1 / n));
}
function dt(n, i, t) {
  let e = n.levels.length;
  const s = R(void 0, e);
  if (t <= 0)
    return { root: s, size: 0, tails: [s] };
  const r = new Array(e).fill(s), h = new Array(e).fill(-1);
  let o = it(n, i)[0];
  o = o.levels[0].next, e = 1;
  let u = 0, l = 0;
  for (; o != null && l < t; ) {
    const _ = o.levels.length;
    e = e >= _ ? e : _;
    const f = R(o.value, _);
    for (let z = 0; z < _; ++z)
      r[z].levels[z] = { next: f, span: l - h[z] }, r[z] = f, h[z] = l;
    const { next: y, span: g } = o.levels[0];
    l += g, o = y, ++u;
  }
  r.length = e, s.levels.length = e, l = h[0] + 1;
  for (let _ = 0; _ < e; ++_)
    r[_].levels[_] = { next: void 0, span: l - h[_] };
  return { root: s, size: u, tails: r };
}
function* bt(n) {
  for (let i = 0; n != null; ++i)
    yield [i, n.value], n = n.levels[0].next;
}
function R(n, i = 1, t = 1, e) {
  const s = new Array(i);
  for (let r = 0; r < i; ++r)
    s[r] = { next: e, span: t };
  return { value: n, levels: s };
}
function Y(n, i) {
  return [n, i] = it(n, i), i === 0 ? n : void 0;
}
function it(n, i) {
  if (i <= 0)
    return [n, i];
  let t = n.levels.length - 1;
  for (; ; ) {
    const { next: e, span: s } = n.levels[t];
    if (!(s <= i && e != null)) {
      if (--t < 0)
        return [n, i];
      continue;
    }
    if (s == i)
      return [e, 0];
    i -= s, n = e;
  }
}
function St(n, i) {
  for (; n != null; ) {
    if (n.value === i)
      return !0;
    n = n.levels[0].next;
  }
  return !1;
}
function* Lt(n) {
  for (let i = 0; n != null; ++i)
    yield i, n = n.levels[0].next;
}
function Ft(n, i) {
  let t = -1 / 0;
  const e = Math.min(n.length, i.length);
  for (let h = 0; h < e; ++h)
    t < n[h] && (t = n[h]);
  if (t <= 0 || e <= 0) {
    const h = R(void 0);
    return { root: h, size: 0, tails: [h] };
  }
  const s = R(void 0, t, e + 1), r = new Array(t).fill(s);
  for (let h = 0; h < e; ++h) {
    const o = e - h, u = n[h], l = R(i[h], u, o);
    for (let _ = 0; _ < u; ++_) {
      const f = r[_].levels;
      f[_] = { next: l, span: f[_].span - o }, r[_] = l;
    }
  }
  return { root: s, size: e, tails: r };
}
function Ot(n, i) {
  if (n == null || n.levels.length <= i)
    return;
  let t = n;
  for (; t != null; ) {
    const e = t.levels[i].next;
    t.levels.length = i, t = e;
  }
}
function* J(n) {
  for (; n != null; )
    yield n.value, n = n.levels[0].next;
}
function Nt(n) {
  const i = n.length, t = new Array(i);
  for (let e = 0; e < i; ++e) {
    const { index: s, node: r } = n[e];
    t[e] = { index: s, node: r };
  }
  return t;
}
function Rt(n, i, t) {
  const e = R(void 0), s = { root: e, size: 0, tails: [e] };
  if (t <= 0)
    return s;
  const r = V(rt(n.root, -1), i), h = V(Nt(r), t), o = h[0].index + h[0].node.levels[0].span;
  let u = n.root.levels.length;
  i = r[0].index + r[0].node.levels[0].span, t = o - i;
  let l;
  for (l = 0; l < u; ++l) {
    const _ = r[l], f = h[l];
    if (_.index >= f.index)
      break;
    let y = _.node.levels[l], g = _.index + y.span - i;
    e.levels[l] = { next: y.next, span: g }, y = f.node.levels[l], g = f.index - _.index + (y.span - t), _.node.levels[l] = { next: y.next, span: g }, f.node.levels[l] = { next: void 0, span: o - f.index }, s.tails[l] = f.node;
  }
  if (l < u)
    for (; l < u; ) {
      const _ = r[l], { next: f, span: y } = _.node.levels[l];
      _.node.levels[l] = { next: f, span: y - t }, ++l;
    }
  else {
    const _ = n.root.levels;
    for (; l > 1 && _[l - 1].next == null; )
      --l;
    u = l, _.length = u, n.tails.length = u;
  }
  if (o >= n.size)
    for (l = 0; l < u; ++l)
      n.tails[l] = r[l].node;
  return n.size -= t, s.size = t, s;
}
function rt(n, i = 0) {
  const t = n.levels.length, e = new Array(t);
  for (let s = 0; s < t; ++s)
    e[s] = { index: i, node: n };
  return e;
}
function V(n, i) {
  if (i <= 0 || n.length <= 0)
    return n;
  let t = n.length - 1, e = n[t];
  const s = n[0].index + i;
  for (; ; ) {
    const { next: r, span: h } = e.node.levels[t], o = e.index + h;
    if (!(o <= s && r != null)) {
      if (--t < 0)
        break;
      e = n[t];
      continue;
    }
    if (e = { index: o, node: r }, n[t] = e, o == s)
      break;
  }
  for (let r = 0; r < t; ++r)
    n[r] = { index: e.index, node: e.node };
  return n;
}
function At(n, i, t) {
  if (t.size <= 0)
    return;
  const e = t.tails.length;
  for (let h = n.tails.length; h < e; ++h)
    n.root.levels[h] = { next: void 0, span: n.size + 1 }, n.tails[h] = n.root;
  const s = V(rt(n.root, -1), i);
  for (let h = 0; h < e; ++h) {
    const o = s[h].node, u = s[h].index, l = o.levels[h], _ = t.tails[h], f = _.levels[h], g = u + l.span - i, z = f.span;
    _.levels[h] = { next: l.next, span: g + z };
    const I = t.root.levels[h], a = I.span - 1, d = i - u;
    o.levels[h] = { next: I.next, span: d + a };
  }
  const r = n.tails.length;
  for (let h = e; h < r; ++h) {
    const o = s[h].node.levels, { next: u, span: l } = o[h];
    o[h] = { next: u, span: l + t.size };
  }
  if (i === n.size)
    for (let h = 0; h < e; ++h)
      n.tails[h] = t.tails[h];
  n.size += t.size;
}
class P extends k {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    v(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    v(this, "_isFinite");
    /**
     * @internal
     * The maximum number of levels in the skip list.
     */
    v(this, "_maxLevel");
    /**
     * @internal
     * The probability factor used to randomly determine the levels
     * of new nodes. Should be a value between 0 and 1, where a lower
     * value results in fewer levels on average.
     */
    v(this, "_p");
    /**
     * @internal
     * The root of the skip list
     */
    v(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    v(this, "_size");
    /**
     * @internal
     * The last nodes in the skip list at each level.
     */
    v(this, "_tails");
    if (this._capacity = L, this._isFinite = !1, this._p = 0.5, this._maxLevel = K(this._p, L), this._root = R(void 0), this._size = 0, this._tails = [this._root], t != null) {
      if ($(t)) {
        this.capacity = t;
        return;
      }
      if (!yt(t)) {
        this.capacity = t.capacity ?? this._capacity, this.p = t.p ?? this._p;
        const e = t.expectedSize ?? this._capacity;
        this.maxLevel = t.maxLevel ?? K(this._p, e);
        return;
      }
      for (const e of M(t, A))
        this._insert(this._size, e);
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
    return P.name;
  }
  set capacity(t) {
    if (t = +t, F(t))
      t = L, this._isFinite = !1;
    else if (X(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const { root: e } = this._cut(0, this._size - t);
    this._overflow(e.levels[0].next);
  }
  set maxLevel(t) {
    if (t = +t, !U(t) || t <= 0)
      throw new RangeError("Invalid maxLevel");
    this._maxLevel = t, t < this.levels && Ot(this._root, t);
  }
  set p(t) {
    if (t = +t, isNaN(t) || t < 0 || t > 1)
      throw new RangeError("Invalid p");
    this._p = t;
  }
  at(t) {
    if (t = p(c(t, -1 / 0), this._size), !!E(t, 0, this._size))
      return Y(this._root, t + 1).value;
  }
  clear() {
    this._size = 0, this._tails = [this._root], this._root.levels.length = 1, this._root.levels[0] = { next: void 0, span: 1 };
  }
  delete(t) {
    return t = p(c(t, -1 / 0), this._size), E(t, 0, this._size) ? (this._cut(t, 1), !0) : !1;
  }
  entries() {
    return bt(this._root.levels[0].next);
  }
  fill(t, e, s) {
    const r = this._size;
    if (e = w(p(c(e, 0), r), 0, r), s = w(p(c(s, r), r), e, r), e >= s)
      return this;
    let h = Y(this._root, e + 1);
    for (let o = e; o < s; ++o)
      h.value = t, h = h.levels[0].next;
    return this;
  }
  forEach(t, e) {
    let s = this._root;
    for (let r = 0; r < this._size; ++r)
      s = s.levels[0].next, t.call(e, s.value, r, this);
  }
  has(t) {
    return St(this._root.levels[0].next, t);
  }
  keys() {
    return Lt(this._root.levels[0].next);
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
  set(t, e) {
    if (t = p(c(t, -1 / 0), this._size), !E(t, 0, this._size))
      return;
    const s = Y(this._root, t + 1), r = s.value;
    return s.value = e, r;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.levels[0].next.value;
  }
  slice(t, e) {
    const s = this._size;
    t = w(p(c(t, 0), s), 0, s), e = w(p(c(e, s), s), t, s);
    const r = {
      capacity: 0,
      p: this._p,
      maxLevel: this._maxLevel
    };
    if (t >= e)
      return new P(r);
    const h = dt(this._root, t, e - t);
    r.capacity = h.size;
    const o = new P(r);
    return o._root = h.root, o._tails = h.tails, o._size = h.size, o;
  }
  splice(t, e, ...s) {
    const r = this._size;
    t = w(p(c(t, 0), r), 0, r), e = w(c(e, 0), 0, r - t);
    const h = this._cut(t, e);
    this._insert(t, s);
    const o = new P({
      capacity: e,
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
    return J(this._root.levels[0].next);
  }
  /**
   * @internal
   */
  _cut(t, e) {
    const s = { root: this._root, size: this._size, tails: this._tails }, r = Rt(s, t, e);
    return this._size = s.size, this._tails = s.tails, r;
  }
  /**
   * @internal
   */
  _genLevels(t) {
    const e = new Array(t), s = this._maxLevel - 1;
    for (let r = 0; r < t; ++r)
      e[r] = 1 + wt(this._p, s);
    return e;
  }
  /**
   * @internal
   */
  _insert(t, e) {
    const s = e.length;
    if (s <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(e);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, e.slice(0, r)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, s - r), { root: u } = this._cut(0, o);
      this._overflow(u.levels[0].next), t -= o, r += o;
    }
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    const h = e.length - r;
    this._overflow(e.slice(0, h)), this._safeInsert(0, e.slice(h));
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
        this._emitter.emit(x.Overflow, t);
        return;
      }
      for (const e of M(J(t), A))
        this._emitter.emit(x.Overflow, e);
    }
  }
  /**
   * @internal
   */
  _presert(t, e) {
    const s = e.length;
    if (s <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(e);
      return;
    }
    let r = this._capacity - this._size;
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, e.slice(e.length - r)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, s - r), { root: o } = this._cut(this._size - h, h);
      this._overflow(o.levels[0].next), r += h;
    }
    if (r >= s) {
      this._safeInsert(t, e);
      return;
    }
    this._overflow(e.slice(r)), this._safeInsert(this._size, e.slice(0, r));
  }
  /**
   * @internal
   */
  _safeInsert(t, e) {
    const s = this._genLevels(e.length), r = Ft(s, e), h = { root: this._root, size: this._size, tails: this._tails };
    At(h, t, r), this._size = h.size, this._tails = h.tails;
  }
}
class nt extends k {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    v(this, "_capacity");
    /**
     * @internal
     * The internal map.
     */
    v(this, "_map");
    if (this._capacity = 1 / 0, this._map = /* @__PURE__ */ new Map(), t = t ?? 1 / 0, !F(t)) {
      if ($(t)) {
        if (!q(t))
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
    return nt.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(t) {
    if (t = +t, !F(t) && !q(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this._map);
      this.clear(), this._emitter.emit(x.Overflow, r);
      return;
    }
    const e = [], s = this._map.entries();
    for (let r = this.size - t; r > 0; --r) {
      const h = s.next().value;
      this._map.delete(h[0]), e.push(h);
    }
    this._emitter.emit(x.Overflow, e);
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
  forEach(t, e) {
    for (const [s, r] of this._map.entries())
      t.call(e, r, s, this);
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
  set(t, e) {
    if (this.capacity < 1)
      return this._emitter.emit(x.Overflow, [[t, e]]), this;
    const s = [];
    if (!this._map.delete(t) && this.size >= this.capacity) {
      const r = this._map.entries().next().value;
      this._map.delete(r[0]), s.push(r);
    }
    return this._map.set(t, e), s.length > 0 && this._emitter.emit(x.Overflow, s), this;
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
class ht {
  constructor(i) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new N(i);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return ht.name;
  }
  set capacity(i) {
    this._list.capacity = i;
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
  forEach(i, t) {
    this._list.forEach((e, s) => i.call(t, e, s, this), t);
  }
  front() {
    return this._list.at(0);
  }
  has(i) {
    return this._list.has(i);
  }
  keys() {
    return this._list.keys();
  }
  push(...i) {
    return this._list.push(...i);
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
  addListener(i, t) {
    return this._list.addListener(i, t), this;
  }
  on(i, t) {
    return this._list.on(i, t), this;
  }
  removeListener(i, t) {
    return this._list.removeListener(i, t), this;
  }
}
class ot {
  constructor(i) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new T(i);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return ot.name;
  }
  set capacity(i) {
    this._list.capacity = i;
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
  forEach(i, t) {
    return this._list.forEach((e, s) => i.call(t, e, s, this));
  }
  front() {
    return this._list.first();
  }
  has(i) {
    return this._list.has(i);
  }
  keys() {
    return this._list.keys();
  }
  push(...i) {
    return this._list.push(...i);
  }
  shift() {
    return this._list.shift();
  }
  [Symbol.iterator]() {
    return this._list.values();
  }
  values() {
    return this._list.values();
  }
  addListener(i, t) {
    return this._list.addListener(i, t), this;
  }
  on(i, t) {
    return this._list.on(i, t), this;
  }
  removeListener(i, t) {
    return this._list.removeListener(i, t), this;
  }
}
class lt extends k {
  constructor(t) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    v(this, "_capacity");
    /**
     * @internal
     * The internal set.
     */
    v(this, "_set");
    if (this._capacity = 1 / 0, this._set = /* @__PURE__ */ new Set(), t = t ?? 1 / 0, !F(t)) {
      if ($(t)) {
        if (!q(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t;
        return;
      }
      this._set = new Set(t), this._capacity = this._set.size;
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
    return this._set.size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return lt.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(t) {
    if (t = +t, !F(t) && !q(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const r = Array.from(this._set);
      this.clear(), this._emitter.emit(x.Overflow, r);
      return;
    }
    const e = [], s = this._set.values();
    for (let r = this.size - t; r > 0; --r) {
      const h = s.next().value;
      this._set.delete(h), e.push(h);
    }
    this._emitter.emit(x.Overflow, e);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this._emitter.emit(x.Overflow, [t]), this;
    const e = [];
    if (!this._set.delete(t) && this.size >= this.capacity) {
      const s = this._set.values().next().value;
      this._set.delete(s), e.push(s);
    }
    return this._set.add(t), e.length > 0 && this._emitter.emit(x.Overflow, e), this;
  }
  /**
   * Removes all elements from the set.
   */
  clear() {
    this._set.clear();
  }
  /**
   * Deletes a specified value from the set.
   *
   * @returns `true` if the value existed in the set and has been removed, or `false` otherwise.
   */
  delete(t) {
    return this._set.delete(t);
  }
  /**
   * Iterate through the set's entries.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  entries() {
    return this._set.entries();
  }
  /**
   * Performs the specified action for each value in the set.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per value.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`.
   */
  forEach(t, e) {
    for (const s of this._set.keys())
      t.call(e, s, s, this);
  }
  /**
   * Determines whether a given value is in the set.
   *
   * @param value - The value to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(t) {
    return this._set.has(t);
  }
  /**
   * Iterate through the set's keys.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the set's keys.
   */
  keys() {
    return this._set.keys();
  }
  /**
   * Iterate through the set's values.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of the set's values.
   */
  values() {
    return this._set.keys();
  }
  /**
   * Iterate through the set's values.
   *
   * **Note:** Modifying the set during iteration may cause unexpected behavior.
   *
   * @returns an iterable of values.
   */
  [Symbol.iterator]() {
    return this._set.values();
  }
}
class _t {
  constructor(i) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new S(i);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return _t.name;
  }
  set capacity(i) {
    this._list.capacity = i;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  forEach(i, t) {
    this._list.forEach((e, s) => i.call(t, e, s, this), t);
  }
  has(i) {
    return this._list.has(i);
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
  push(...i) {
    return this._list.push(...i);
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
  addListener(i, t) {
    return this._list.addListener(i, t), this;
  }
  on(i, t) {
    return this._list.on(i, t), this;
  }
  removeListener(i, t) {
    return this._list.removeListener(i, t), this;
  }
}
class ut {
  constructor(i) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new T(i);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return ut.name;
  }
  set capacity(i) {
    this._list.capacity = i;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  forEach(i, t) {
    return this._list.forEach((e, s) => i.call(t, e, s, this));
  }
  has(i) {
    return this._list.has(i);
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
  push(...i) {
    return this._list.push(...i);
  }
  [Symbol.iterator]() {
    return this._list.values();
  }
  top() {
    return this._list.last();
  }
  values() {
    return this._list.values();
  }
  addListener(i, t) {
    return this._list.addListener(i, t), this;
  }
  on(i, t) {
    return this._list.on(i, t), this;
  }
  removeListener(i, t) {
    return this._list.removeListener(i, t), this;
  }
}
export {
  x as BoundedEvent,
  T as CircularArrayList,
  Z as CircularDeque,
  S as CircularDoublyLinkedList,
  st as CircularLinkedDeque,
  N as CircularLinkedList,
  ht as CircularLinkedQueue,
  _t as CircularLinkedStack,
  nt as CircularMap,
  ot as CircularQueue,
  lt as CircularSet,
  P as CircularSkipList,
  ut as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
