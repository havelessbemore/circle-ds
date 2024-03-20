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
var ut = Object.defineProperty;
var at = (n, r, t) => r in n ? ut(n, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[r] = t;
var v = (n, r, t) => (at(n, typeof r != "symbol" ? r + "" : r, t), t);
const x = {
  Overflow: "overflow"
};
function ct(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var U = { exports: {} };
(function(n) {
  var r = Object.prototype.hasOwnProperty, t = "~";
  function s() {
  }
  Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (t = !1));
  function i(_, l, f) {
    this.fn = _, this.context = l, this.once = f || !1;
  }
  function e(_, l, f, u, y) {
    if (typeof f != "function")
      throw new TypeError("The listener must be a function");
    var w = new i(f, u || _, y), g = t ? t + l : l;
    return _._events[g] ? _._events[g].fn ? _._events[g] = [_._events[g], w] : _._events[g].push(w) : (_._events[g] = w, _._eventsCount++), _;
  }
  function h(_, l) {
    --_._eventsCount === 0 ? _._events = new s() : delete _._events[l];
  }
  function o() {
    this._events = new s(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var l = [], f, u;
    if (this._eventsCount === 0)
      return l;
    for (u in f = this._events)
      r.call(f, u) && l.push(t ? u.slice(1) : u);
    return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(f)) : l;
  }, o.prototype.listeners = function(l) {
    var f = t ? t + l : l, u = this._events[f];
    if (!u)
      return [];
    if (u.fn)
      return [u.fn];
    for (var y = 0, w = u.length, g = new Array(w); y < w; y++)
      g[y] = u[y].fn;
    return g;
  }, o.prototype.listenerCount = function(l) {
    var f = t ? t + l : l, u = this._events[f];
    return u ? u.fn ? 1 : u.length : 0;
  }, o.prototype.emit = function(l, f, u, y, w, g) {
    var d = t ? t + l : l;
    if (!this._events[d])
      return !1;
    var a = this._events[d], E = arguments.length, O, m;
    if (a.fn) {
      switch (a.once && this.removeListener(l, a.fn, void 0, !0), E) {
        case 1:
          return a.fn.call(a.context), !0;
        case 2:
          return a.fn.call(a.context, f), !0;
        case 3:
          return a.fn.call(a.context, f, u), !0;
        case 4:
          return a.fn.call(a.context, f, u, y), !0;
        case 5:
          return a.fn.call(a.context, f, u, y, w), !0;
        case 6:
          return a.fn.call(a.context, f, u, y, w, g), !0;
      }
      for (m = 1, O = new Array(E - 1); m < E; m++)
        O[m - 1] = arguments[m];
      a.fn.apply(a.context, O);
    } else {
      var ft = a.length, $;
      for (m = 0; m < ft; m++)
        switch (a[m].once && this.removeListener(l, a[m].fn, void 0, !0), E) {
          case 1:
            a[m].fn.call(a[m].context);
            break;
          case 2:
            a[m].fn.call(a[m].context, f);
            break;
          case 3:
            a[m].fn.call(a[m].context, f, u);
            break;
          case 4:
            a[m].fn.call(a[m].context, f, u, y);
            break;
          default:
            if (!O)
              for ($ = 1, O = new Array(E - 1); $ < E; $++)
                O[$ - 1] = arguments[$];
            a[m].fn.apply(a[m].context, O);
        }
    }
    return !0;
  }, o.prototype.on = function(l, f, u) {
    return e(this, l, f, u, !1);
  }, o.prototype.once = function(l, f, u) {
    return e(this, l, f, u, !0);
  }, o.prototype.removeListener = function(l, f, u, y) {
    var w = t ? t + l : l;
    if (!this._events[w])
      return this;
    if (!f)
      return h(this, w), this;
    var g = this._events[w];
    if (g.fn)
      g.fn === f && (!y || g.once) && (!u || g.context === u) && h(this, w);
    else {
      for (var d = 0, a = [], E = g.length; d < E; d++)
        (g[d].fn !== f || y && !g[d].once || u && g[d].context !== u) && a.push(g[d]);
      a.length ? this._events[w] = a.length === 1 ? a[0] : a : h(this, w);
    }
    return this;
  }, o.prototype.removeAllListeners = function(l) {
    var f;
    return l ? (f = t ? t + l : l, this._events[f] && h(this, f)) : (this._events = new s(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, n.exports = o;
})(U);
var vt = U.exports;
const pt = /* @__PURE__ */ ct(vt);
class k {
  constructor(r = new pt()) {
    /**
     * @internal
     * The event emitter.
     *
     */
    v(this, "_emitter");
    this._emitter = r;
  }
  addListener(r, t) {
    return this._emitter.addListener(r, t), this;
  }
  on(r, t) {
    return this._emitter.on(r, t), this;
  }
  removeListener(r, t) {
    return this._emitter.removeListener(r, t), this;
  }
}
const A = 16383, q = 4294967295, b = Number.MAX_SAFE_INTEGER;
function Z(n) {
  return Number.isInteger(n) && n >= 0 && n <= q;
}
function F(n) {
  return n === Number.POSITIVE_INFINITY;
}
function zt(n) {
  return typeof (n == null ? void 0 : n[Symbol.iterator]) == "function";
}
function H(n) {
  return Number.isInteger(n) && n >= 0 && n <= b;
}
function W(n) {
  return typeof n == "number";
}
function j(n) {
  return Number.isSafeInteger(n) && n >= 0;
}
function p(n, r, t = 0) {
  return n >= t ? n : n + r;
}
function z(n, r, t) {
  if (r > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return n <= r ? r : n <= t ? n : t;
}
function I(n, r, t) {
  return n >= r && n < t;
}
function yt(n, r) {
  return n >= 0 && r > 0 ? Math.log(n) / Math.log(r) : NaN;
}
function gt(n, r = 1 / 0, t = Math.random) {
  let s = 0;
  for (; s < r && t() < n; )
    ++s;
  return s;
}
function c(n, r = 0) {
  return n = +n, isNaN(n) ? r : Math.trunc(n);
}
function* M(n, r) {
  if (r < 1)
    return;
  let t = [];
  r = Math.trunc(r);
  for (const s of n)
    t.push(s) >= r && (yield t, t = []);
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
    if (this._capacity = q, this._head = 0, this._isFinite = !1, this._size = 0, this._next = 0, this._vals = [], t != null) {
      if (W(t)) {
        this.capacity = t;
        return;
      }
      for (const s of M(t, A))
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
    return T.name;
  }
  set capacity(t) {
    if (t = +t, F(t))
      t = q, this._isFinite = !1;
    else if (Z(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size <= 0 ? (this._capacity = t, this.clear()) : t < this._capacity ? this._shrink(t) : t > this._capacity && this._grow(t);
  }
  at(t) {
    if (t = p(c(t, -1 / 0), this._size), !!I(t, 0, this._size))
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
  _copyWithin(t, s, i) {
    if (t == s || s >= i)
      return;
    const e = this._capacity - 1, h = this._vals, o = this._toRanges(s, i);
    if (t <= s || i <= t) {
      t = this._toIndex(t);
      for (const [_, l] of o)
        for (let f = _; f < l; ++f)
          h[t] = h[f], t = t < e ? t + 1 : 0;
    } else {
      t = this._toIndex(t + (i - s));
      for (const [_, l] of o.reverse())
        for (let f = l - 1; f >= _; --f)
          t = t > 0 ? t - 1 : e, h[t] = h[f];
    }
  }
  delete(t) {
    return t = p(c(t, -1 / 0), this._size), I(t, 0, this._size) ? (this._delete(t, 1), !0) : !1;
  }
  /**
   * @internal
   */
  _delete(t, s) {
    this._copyWithin(t, t + s, this._size), this._pop(s);
  }
  *entries() {
    for (let t = 0; t < this._size; ++t)
      yield [t, this._vals[this._toIndex(t)]];
  }
  fill(t, s, i) {
    const e = this._size;
    return s = z(p(c(s, 0), e), 0, e), i = z(p(c(i, e), e), s, e), this._fill(t, s, i), this;
  }
  /**
   * @internal
   */
  _fill(t, s, i) {
    for (const [e, h] of this._toRanges(s, i))
      this._vals.fill(t, e, h);
  }
  first() {
    return this._size > 0 ? this._vals[this._head] : void 0;
  }
  forEach(t, s) {
    const i = this._size;
    for (let e = 0; e < i && e < this._size; ++e) {
      const h = this._vals[this._toIndex(e)];
      t.call(s, h, e, this);
    }
  }
  has(t) {
    const s = this._vals;
    for (const [i, e] of this._toRanges(0, this._size))
      for (let h = i; h < e; ++h)
        if (t === s[h])
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
    const s = this._size - t;
    this._fill(void 0, s, this._size), this._next = this._toIndex(s), this._size = s;
  }
  push(...t) {
    return t.length <= 0 ? this._size : this._capacity <= 0 ? (this._overflow(t), this._size) : (this._insert(this._size, t), this._size);
  }
  set(t, s) {
    if (t = p(c(t, -1 / 0), this._size), !I(t, 0, this._size))
      return;
    t = this._toIndex(t);
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
    this._fill(void 0, 0, t), this._head = this._toIndex(t), this._size -= t;
  }
  slice(t, s) {
    const i = this._size;
    return t = z(p(c(t, 0), i), 0, i), s = z(p(c(s, i), i), t, i), this._toList(this._slice(t, s));
  }
  /**
   * @internal
   */
  _slice(t, s) {
    const i = this._vals, e = new Array(s - t);
    let h = 0;
    for ([t, s] of this._toRanges(t, s))
      for (let o = t; o < s; ++o)
        e[h++] = i[o];
    return e;
  }
  splice(t, s, ...i) {
    const e = this._size;
    t = z(p(c(t, 0), e), 0, e), s = z(c(s, 0), 0, e - t);
    const h = this._toList(this._slice(t, t + s));
    return this._splice(t, s, i), h;
  }
  /**
   * @internal
   */
  _splice(t, s, i = []) {
    const e = i.length, h = Math.min(s, e), o = this._vals;
    let _ = 0;
    for (const [l, f] of this._toRanges(t, t + h))
      for (let u = l; u < f; ++u)
        o[u] = i[_++];
    s != e && (t += h, s < e ? this._insert(t, i, h) : this._delete(t, s - e));
  }
  /**
   * @internal
   */
  _insert(t, s, i = 0, e = s.length) {
    const h = e - i;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safeInsert(t, s, i, e);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s, i, i + o), new Error("Out of memory");
    if (t > 0) {
      const l = Math.min(t, h - o);
      this._overflow(this._slice(0, l)), this._shift(l), t -= l, o += l;
    }
    if (o >= h) {
      this._safeInsert(t, s, i, e);
      return;
    }
    const _ = e - o;
    this._overflow(s.slice(i, _)), this._safePresert(0, s, _, e);
  }
  /**
   * @internal
   */
  _safeInsert(t, s, i = 0, e = s.length) {
    const h = e - i, o = this._vals;
    this._copyWithin(t + h, t, this._size);
    for (const [_, l] of this._toRanges(t, t + h))
      for (let f = _; f < l; ++f)
        o[f] = s[i++];
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
  _presert(t, s, i = 0, e = s.length) {
    const h = e - i;
    let o = this._capacity - this._size;
    if (o >= h) {
      this._safePresert(t, s, i, e);
      return;
    }
    if (!this._isFinite)
      throw this._safePresert(t, s, e - o, e), new Error("Out of memory");
    if (t < this._size) {
      const l = Math.min(this._size - t, h - o);
      this._overflow(this._slice(this._size - l, this._size)), this._pop(l), o += l;
    }
    if (o >= h) {
      this._safePresert(t, s, i, e);
      return;
    }
    const _ = i + o;
    this._overflow(s.slice(_, e)), this._safeInsert(this._size, s, i, _);
  }
  /**
   * @internal
   */
  _safePresert(t, s, i = 0, e = s.length) {
    const h = this._capacity, o = e - i, _ = this._vals, l = h - o;
    this._copyWithin(l, 0, t), t += l;
    for (const [f, u] of this._toRanges(t, t + o))
      for (let y = f; y < u; ++y)
        _[y] = s[i++];
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
  _shrink(t) {
    if (this._size > t) {
      const i = this._size - t;
      this._overflow(this._slice(0, i)), this._shift(i);
    }
    if (this._isSequential()) {
      this._sequentialReset(t);
      return;
    }
    const s = this._capacity - t;
    this._vals.copyWithin(this._head - s, this._head, this._capacity), this._vals.length = t, this._head -= s, this._capacity = t;
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
    const s = new T(0);
    return s._vals = t, s._size = t.length, s._capacity = t.length, s;
  }
  /**
   * @internal
   */
  _toRanges(t, s) {
    const i = this._head, e = this._capacity - i;
    return s <= e ? [[i + t, i + s]] : t >= e ? [[t - e, s - e]] : [
      [i + t, this._capacity],
      [0, s - e]
    ];
  }
}
class D {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new T(r);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return D.name;
  }
  set capacity(r) {
    this._list.capacity = r;
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
  forEach(r, t) {
    return this._list.forEach((s, i) => r.call(t, s, i, this));
  }
  front() {
    return this._list.first();
  }
  has(r) {
    return this._list.has(r);
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
  push(...r) {
    return this._list.push(...r);
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
  unshift(...r) {
    return this._list.unshift(...r);
  }
  values() {
    return this._list.values();
  }
  addListener(r, t) {
    return this._list.addListener(r, t), this;
  }
  on(r, t) {
    return this._list.on(r, t), this;
  }
  removeListener(r, t) {
    return this._list.removeListener(r, t), this;
  }
}
function wt(n, r) {
  const t = { value: void 0 };
  let s = 0, i = t;
  for (; n != null && s < r; ) {
    const e = { value: n.value };
    i.next = e, i = e, ++s, n = n.next;
  }
  return i.next = void 0, { root: t, size: s, tail: i };
}
function G(n, r) {
  const t = { value: void 0 };
  if (n == null || r <= 0)
    return { root: t, size: 0, tail: t };
  const s = n.next, i = X(s, r - 1);
  return n.next = i.next, i.next = void 0, t.next = s, { root: t, size: r, tail: i };
}
function* C(n) {
  for (let r = 0; n != null; ++r)
    yield [r, n.value], n = n.next;
}
function X(n, r) {
  if (!(r < 0)) {
    for (let t = 0; n != null && t < r; ++t)
      n = n.next;
    return n;
  }
}
function tt(n, r) {
  for (; n != null; ) {
    if (n.value === r)
      return !0;
    n = n.next;
  }
  return !1;
}
function* st(n) {
  for (let r = 0; n != null; ++r)
    yield r, n = n.next;
}
function mt(n) {
  const r = { value: void 0 };
  let t = 0, s = r;
  for (const i of n)
    s.next = { value: i }, s = s.next, ++t;
  return s.next = void 0, { root: r, size: t, tail: s };
}
function* S(n) {
  for (; n != null; )
    yield n.value, n = n.next;
}
function xt(n, r) {
  const t = { value: void 0 };
  if (n == null || r <= 0)
    return { root: t, size: 0, tail: t };
  let s = 0, i = t;
  for (; n != null && s < r; ) {
    const e = { value: n.value };
    i.next = e, e.prev = i, i = e, ++s, n = n.next;
  }
  return t.prev = void 0, i.next = void 0, { root: t, size: s, tail: i };
}
function B(n, r) {
  const t = G(n, r);
  if (t.size <= 0)
    return t;
  t.root.next.prev = t.root;
  const s = n.next;
  return s != null && (s.prev = n), t;
}
function K(n, r) {
  if (r >= 0)
    return X(n, r);
  for (let t = 0; n != null && t > r; --t)
    n = n.prev;
  return n;
}
function It(n) {
  const r = { value: void 0 };
  let t = 0, s = r;
  for (const i of n)
    s.next = { prev: s, value: i }, s = s.next, ++t;
  return r.prev = void 0, s.next = void 0, { root: r, size: t, tail: s };
}
class L extends k {
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
    if (this._capacity = b, this._isFinite = !1, this._root = { value: void 0 }, this._size = 0, this._tail = this._root, t != null) {
      if (W(t)) {
        this.capacity = t;
        return;
      }
      for (const s of M(t, A))
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
    if (t = +t, t = +t, F(t))
      t = b, this._isFinite = !1;
    else if (H(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const s = this._size - t, { root: i } = B(this._root, s);
    this._size -= s, this._size <= 0 && (this._tail = this._root);
    for (const e of M(S(i.next), A))
      this._overflow(e);
  }
  at(t) {
    if (t = p(c(t, -1 / 0), this._size), !!I(t, 0, this._size))
      return this._get(t).value;
  }
  clear() {
    this._size = 0, this._tail = this._root, this._root.next = void 0;
  }
  delete(t) {
    if (t = p(c(t, -1 / 0), this._size), !I(t, 0, this._size))
      return !1;
    const s = this._get(t);
    return s.prev.next = s.next, s.next != null && (s.next.prev = s.prev), --this._size, !0;
  }
  entries() {
    return C(this._root.next);
  }
  fill(t, s, i) {
    s = c(s, 0), s = z(p(s, this._size), 0, this._size), i = c(i, this._size), i = z(p(i, this._size), 0, this._size);
    let e = this._get(s);
    for (; s < i; )
      e.value = t, e = e.next, ++s;
    return this;
  }
  forEach(t, s) {
    let i = this._root;
    for (let e = 0; e < this._size; ++e)
      i = i.next, t.call(s, i.value, e, this);
  }
  has(t) {
    return tt(this._root.next, t);
  }
  keys() {
    return st(this._root.next);
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
    if (t = p(c(t, -1 / 0), this._size), !I(t, 0, this._size))
      return;
    const i = this._get(t), e = i.value;
    return i.value = s, e;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.next.value;
  }
  slice(t, s) {
    const i = this._size;
    if (t = z(p(c(t, 0), i), 0, i), s = z(p(c(s, i), i), t, i), t >= s)
      return new L(0);
    const e = this._get(t), h = xt(e, s - t), o = new L(h.size);
    return o._root = h.root, o._size = h.size, o._tail = h.tail, o;
  }
  splice(t, s, ...i) {
    const e = this._size;
    t = z(p(c(t, 0), e), 0, e), s = z(c(s, 0), 0, e - t);
    let h;
    if (s <= 0)
      h = new L(0);
    else {
      const { root: o, size: _, tail: l } = this._cut(t, s);
      h = new L(_), h._root = o, h._size = _, h._tail = l;
    }
    return this._insert(t, i), h;
  }
  [Symbol.iterator]() {
    return S(this._root.next);
  }
  unshift(...t) {
    return this._presert(0, t), this._size;
  }
  values() {
    return S(this._root.next);
  }
  /**
   * @internal
   */
  _cut(t, s) {
    const i = this._get(t - 1), e = B(i, s);
    return this._size -= s, t >= this._size && (this._tail = i), e;
  }
  /**
   * @internal
   */
  _get(t) {
    const s = this._size / 2;
    return ++t <= s ? K(this._root, t) : K(this._tail, t - this._size);
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
    let e = this._capacity - this._size;
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s.slice(0, e)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, i - e), { root: _ } = this._cut(0, o);
      this._overflow(S(_.next)), t -= o, e += o;
    }
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    const h = s.length - e;
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
    Array.isArray(t) || (t = Array.from(t)), this._emitter.emit(x.Overflow, t);
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
    let e = this._capacity - this._size;
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, s.slice(s.length - e)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, i - e), { root: o } = this._cut(this._size - h, h);
      this._overflow(S(o.next)), e += h;
    }
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    this._overflow(s.slice(e)), this._safeInsert(this._size, s.slice(0, e));
  }
  /**
   * @internal
   */
  _safeInsert(t, s) {
    if (s.length <= 0)
      return;
    const { root: i, size: e, tail: h } = It(s), o = i.next, _ = this._get(t - 1), l = _.next;
    o.prev = _, h.next = l, _.next = o, l != null && (l.prev = h), this._tail = t < this._size ? this._tail : h, this._size += e;
  }
}
class it {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new L(r);
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
  set capacity(r) {
    this._list.capacity = r;
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
  forEach(r, t) {
    this._list.forEach((s, i) => r.call(t, s, i, this), t);
  }
  has(r) {
    return this._list.has(r);
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
  push(...r) {
    return this._list.push(...r);
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
  unshift(...r) {
    return this._list.unshift(...r);
  }
  values() {
    return this._list.values();
  }
  addListener(r, t) {
    return this._list.addListener(r, t), this;
  }
  on(r, t) {
    return this._list.on(r, t), this;
  }
  removeListener(r, t) {
    return this._list.removeListener(r, t), this;
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
    if (this._capacity = b, this._isFinite = !1, this._root = { value: void 0 }, this._size = 0, this._tail = this._root, t != null) {
      if (W(t)) {
        this.capacity = t;
        return;
      }
      for (const s of M(t, A))
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
    return N.name;
  }
  set capacity(t) {
    if (t = +t, F(t))
      t = b, this._isFinite = !1;
    else if (H(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const s = this._size - t, { root: i } = G(this._root, s);
    this._size -= s, this._size <= 0 && (this._tail = this._root), this._overflow(i.next);
  }
  at(t) {
    if (t = p(c(t, -1 / 0), this._size), !!I(t, 0, this._size))
      return this._get(t).value;
  }
  clear() {
    this._size = 0, this._tail = this._root, this._root.next = void 0;
  }
  delete(t) {
    return t = p(c(t, -1 / 0), this._size), I(t, 0, this._size) ? (this._cut(t, 1), !0) : !1;
  }
  entries() {
    return C(this._root.next);
  }
  fill(t, s, i) {
    const e = this._size;
    if (s = z(p(c(s, 0), e), 0, e), i = z(p(c(i, e), e), s, e), s >= i)
      return this;
    let h = this._get(s);
    for (let o = s; o < i; ++o)
      h.value = t, h = h.next;
    return this;
  }
  forEach(t, s) {
    let i = this._root;
    for (let e = 0; e < this._size; ++e)
      i = i.next, t.call(s, i.value, e, this);
  }
  has(t) {
    return tt(this._root.next, t);
  }
  keys() {
    return st(this._root.next);
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
    if (t = p(c(t, -1 / 0), this._size), !I(t, 0, this._size))
      return;
    const i = this._get(t), e = i.value;
    return i.value = s, e;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.next.value;
  }
  slice(t, s) {
    const i = this._size;
    if (t = z(p(c(t, 0), i), 0, i), s = z(p(c(s, i), i), t, i), t >= s)
      return new N(0);
    const e = this._get(t), h = wt(e, s - t), o = new N(h.size);
    return o._root = h.root, o._size = h.size, o._tail = h.tail, o;
  }
  splice(t, s, ...i) {
    const e = this._size;
    t = z(p(c(t, 0), e), 0, e), s = z(c(s, 0), 0, e - t);
    let h;
    if (s <= 0)
      h = new N(0);
    else {
      const { root: o, size: _, tail: l } = this._cut(t, s);
      h = new N(s), h._root = o, h._size = _, h._tail = l;
    }
    return this._insert(t, i), h;
  }
  [Symbol.iterator]() {
    return S(this._root.next);
  }
  unshift(...t) {
    return this._presert(0, t), this._size;
  }
  values() {
    return S(this._root.next);
  }
  /**
   * @internal
   */
  _cut(t, s) {
    const i = this._get(t - 1), e = G(i, s);
    return this._size -= s, t >= this._size && (this._tail = i), e;
  }
  /**
   * @internal
   */
  _get(t) {
    return ++t == this._size ? this._tail : X(this._root, t);
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
    let e = this._capacity - this._size;
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s.slice(0, e)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, i - e), { root: _ } = this._cut(0, o);
      this._overflow(_.next), t -= o, e += o;
    }
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    const h = s.length - e;
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
        this._emitter.emit(x.Overflow, t);
        return;
      }
      for (const s of M(S(t), A))
        this._emitter.emit(x.Overflow, s);
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
    let e = this._capacity - this._size;
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, s.slice(s.length - e)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, i - e), { root: o } = this._cut(this._size - h, h);
      this._overflow(o.next), e += h;
    }
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    this._overflow(s.slice(e)), this._safeInsert(this._size, s.slice(0, e));
  }
  /**
   * @internal
   */
  _safeInsert(t, s) {
    if (s.length <= 0)
      return;
    const { root: i, size: e, tail: h } = mt(s), o = this._get(t - 1);
    h.next = o.next, o.next = i.next, this._tail = t < this._size ? this._tail : h, this._size += e;
  }
}
function et(n, r, t = 0) {
  const s = n.length;
  for (let i = t >= 0 ? t : 0; i < s; ++i) {
    const e = n[i].node.levels, { next: h, span: o } = e[i];
    e[i] = { next: h, span: o + r };
  }
}
function J(n, r) {
  return n <= 0 || r <= 1 ? 1 : n >= 1 ? 1 / 0 : Math.ceil(yt(r, 1 / n));
}
function dt(n, r) {
  let t = 0;
  const s = R(void 0), i = [s];
  if (n == null || r <= 0)
    return { root: s, size: t, tails: i };
  let e = 1;
  const h = [-1];
  for (; n != null && t < r; ) {
    const o = n.levels.length;
    for (; e < o; )
      i[e] = s, h[e] = -1, ++e;
    const _ = R(n.value, o);
    for (let u = 0; u < o; ++u)
      i[u].levels[u] = { next: _, span: t - h[u] };
    i.fill(_, 0, o), h.fill(t, 0, o);
    const { next: l, span: f } = n.levels[0];
    n = l, t += f;
  }
  for (let o = 0; o < e; ++o)
    i[o].levels[o] = { next: void 0, span: r - h[o] };
  return { root: s, size: t, tails: i };
}
function Et(n, r, t) {
  const s = R(void 0), i = { root: s, size: 0, tails: [s] };
  if (r >= t || t <= 0 || r >= n.size)
    return i;
  const e = V(n, r - 1), h = V(n, t - 1, Array.from(e));
  let o = e[0].index + e[0].node.levels[0].span;
  if (r = z(r, e[0].index, o), o = h[0].index + h[0].node.levels[0].span, t = z(t, h[0].index, o), r >= t)
    return i;
  const _ = t - r;
  i.size = _;
  let l, f = e.length;
  for (l = 0; l < f; ++l) {
    const u = e[l], y = h[l];
    if (u.index >= y.index)
      break;
    let w = u.node.levels[l], g = u.index + w.span - r;
    s.levels[l] = { next: w.next, span: g }, w = y.node.levels[l], g = y.index - u.index + (w.span - _), u.node.levels[l] = { next: w.next, span: g }, y.node.levels[l] = { next: void 0, span: t - y.index }, i.tails[l] = y.node;
  }
  if (et(e, -_, l), l >= f) {
    const u = n.root.levels;
    for (; l > 1 && u[l - 1].next == null; )
      --l;
    f = l, u.length = f, n.tails.length = f;
  }
  if (n.size -= _, r >= n.size)
    for (l = 0; l < f; ++l)
      n.tails[l] = e[l].node;
  return i;
}
function* St(n) {
  let r = 0;
  for (; n != null; ) {
    yield [r, n.value];
    const { next: t, span: s } = n.levels[0];
    n = t, r += s;
  }
}
function Y(n, r) {
  if (r < 0)
    return { index: -1, node: n.root };
  const t = n.tails;
  let s = n.size - t[0].levels[0].span;
  if (r >= s)
    return { index: s, node: t[0] };
  s = -1;
  let i, e = n.root;
  for (i = e.levels.length - 1; i >= 0 && s < r; --i) {
    const h = n.size - t[i].levels[i].span;
    if (h > r)
      break;
    s = h, e = t[i];
  }
  for (; i >= 0 && s < r; ) {
    const { next: h, span: o } = e.levels[i];
    s + o > r || h == null ? --i : (s += o, e = h);
  }
  return { index: s, node: e };
}
function V(n, r, t = Rt(n.root, -1)) {
  const s = t.length;
  if (s <= 0 || r <= t[0].index)
    return t;
  const i = n.size, e = n.tails;
  if (r >= i - e[0].levels[0].span) {
    for (let o = 0; o < s; ++o) {
      const _ = i - e[o].levels[o].span;
      t[o] = { index: _, node: e[o] };
    }
    return t;
  }
  let h;
  for (h = s - 1; h >= 0 && t[h].index < r; --h) {
    const o = i - e[h].levels[h].span;
    if (o > r)
      break;
    t[h] = { index: o, node: e[h] };
  }
  for (; h >= 0 && t[h].index < r; ) {
    const { index: o, node: _ } = t[h], { next: l, span: f } = _.levels[h];
    o + f <= r && l != null ? t[h] = { index: o + f, node: l } : --h;
  }
  if (h > 0) {
    const { index: o, node: _ } = t[h];
    for (let l = 0; l < h; ++l)
      t[l] = { index: o, node: _ };
  }
  return t;
}
function Lt(n, r) {
  for (; n != null; ) {
    if (n.value === r)
      return !0;
    n = n.levels[0].next;
  }
  return !1;
}
function bt(n, r) {
  const { root: t, size: s, tails: i } = n;
  for (let e = i.length; e < r; ++e)
    t.levels[e] = { next: void 0, span: s + 1 }, i[e] = t;
}
function Ft(n, r, t) {
  if (t.size <= 0)
    return;
  const s = t.tails.length;
  bt(n, s);
  const i = V(n, r - 1);
  for (let e = 0; e < s; ++e) {
    const h = i[e].node, o = t.tails[e], _ = h.levels[e], l = o.levels[e];
    let f = i[e].index - r + _.span + l.span;
    o.levels[e] = { next: _.next, span: f };
    const u = t.root.levels[e];
    f = r - i[e].index + (u.span - 1), h.levels[e] = { next: u.next, span: f };
  }
  if (et(i, t.size, s), r === n.size)
    for (let e = 0; e < s; ++e)
      n.tails[e] = t.tails[e];
  n.size += t.size;
}
function* Ot(n) {
  let r = 0;
  for (; n != null; ) {
    yield r;
    const { next: t, span: s } = n.levels[0];
    n = t, r += s;
  }
}
function Nt(n, r) {
  let t = -1 / 0;
  const s = Math.min(n.length, r.length);
  for (let h = 0; h < s; ++h)
    t = t >= n[h] ? t : n[h];
  if (t <= 0 || s <= 0) {
    const h = R(void 0);
    return { root: h, size: 0, tails: [h] };
  }
  const i = R(void 0, t, s + 1), e = new Array(t).fill(i);
  for (let h = 0; h < s; ++h) {
    t = n[h];
    const o = s - h, _ = R(r[h], t, o);
    for (let l = 0; l < t; ++l) {
      const f = e[l].levels;
      f[l] = { next: _, span: f[l].span - o }, e[l] = _;
    }
  }
  return { root: i, size: s, tails: e };
}
function R(n, r = 1, t = 1, s) {
  const i = new Array(r);
  for (let e = 0; e < r; ++e)
    i[e] = { next: s, span: t };
  return { value: n, levels: i };
}
function Rt(n, r = 0) {
  const t = n.levels.length, s = new Array(t);
  for (let i = 0; i < t; ++i)
    s[i] = { index: r, node: n };
  return s;
}
function At(n, r) {
  if (!(n == null || n.levels.length <= r))
    for (; n != null; ) {
      const t = n.levels[r].next;
      n.levels.length = r, n = t;
    }
}
function* Q(n) {
  for (; n != null; )
    yield n.value, n = n.levels[0].next;
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
    if (this._capacity = b, this._isFinite = !1, this._p = 0.5, this._maxLevel = J(this._p, b), this._root = R(void 0), this._size = 0, this._tails = [this._root], t != null) {
      if (W(t)) {
        this.capacity = t;
        return;
      }
      if (!zt(t)) {
        this.capacity = t.capacity ?? this._capacity, this.p = t.p ?? this._p;
        const s = t.expectedSize ?? this._capacity;
        this.maxLevel = t.maxLevel ?? J(this._p, s);
        return;
      }
      for (const s of M(t, A))
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
    return P.name;
  }
  set capacity(t) {
    if (t = +t, F(t))
      t = b, this._isFinite = !1;
    else if (H(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const { root: s } = this._cut(0, this._size - t);
    this._overflow(s.levels[0].next);
  }
  set maxLevel(t) {
    if (t = +t, !Z(t) || t <= 0)
      throw new RangeError("Invalid maxLevel");
    this._maxLevel = t, t < this.levels && At(this._root, t);
  }
  set p(t) {
    if (t = +t, isNaN(t) || t < 0 || t > 1)
      throw new RangeError("Invalid p");
    this._p = t;
  }
  at(t) {
    if (t = p(c(t, -1 / 0), this._size), !I(t, 0, this._size))
      return;
    const s = { root: this._root, size: this._size, tails: this._tails };
    return Y(s, t).node.value;
  }
  clear() {
    this._size = 0, this._tails = [this._root], this._root.levels.length = 1, this._root.levels[0] = { next: void 0, span: 1 };
  }
  delete(t) {
    return t = p(c(t, -1 / 0), this._size), I(t, 0, this._size) ? (this._cut(t, 1), !0) : !1;
  }
  entries() {
    return St(this._root.levels[0].next);
  }
  fill(t, s, i) {
    const e = this._size;
    if (s = z(p(c(s, 0), e), 0, e), i = z(p(c(i, e), e), s, e), s >= i)
      return this;
    const h = { root: this._root, size: this._size, tails: this._tails };
    let { node: o } = Y(h, s);
    for (let _ = s; _ < i; ++_)
      o.value = t, o = o.levels[0].next;
    return this;
  }
  forEach(t, s) {
    let i = this._root;
    for (let e = 0; e < this._size; ++e)
      i = i.levels[0].next, t.call(s, i.value, e, this);
  }
  has(t) {
    return Lt(this._root.levels[0].next, t);
  }
  keys() {
    return Ot(this._root.levels[0].next);
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
    if (t = p(c(t, -1 / 0), this._size), !I(t, 0, this._size))
      return;
    const i = { root: this._root, size: this._size, tails: this._tails }, { node: e } = Y(i, t), h = e.value;
    return e.value = s, h;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.levels[0].next.value;
  }
  slice(t, s) {
    const i = this._size;
    t = z(p(c(t, 0), i), 0, i), s = z(p(c(s, i), i), t, i);
    const e = {
      capacity: 0,
      p: this._p,
      maxLevel: this._maxLevel
    };
    if (t >= s)
      return new P(e);
    const h = { root: this._root, size: this._size, tails: this._tails }, o = dt(Y(h, t).node, s - t);
    e.capacity = o.size;
    const _ = new P(e);
    return _._root = o.root, _._tails = o.tails, _._size = o.size, _;
  }
  splice(t, s, ...i) {
    const e = this._size;
    t = z(p(c(t, 0), e), 0, e), s = z(c(s, 0), 0, e - t);
    const h = this._cut(t, s);
    this._insert(t, i);
    const o = new P({
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
    return Q(this._root.levels[0].next);
  }
  /**
   * @internal
   */
  _cut(t, s) {
    const i = { root: this._root, size: this._size, tails: this._tails }, e = Et(i, t, t + s);
    return this._size = i.size, this._tails = i.tails, e;
  }
  /**
   * @internal
   */
  _genLevels(t) {
    const s = new Array(t), i = this._maxLevel - 1;
    for (let e = 0; e < t; ++e)
      s[e] = 1 + gt(this._p, i - 1);
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
    let e = this._capacity - this._size;
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s.slice(0, e)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, i - e), { root: _ } = this._cut(0, o);
      this._overflow(_.levels[0].next), t -= o, e += o;
    }
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    const h = s.length - e;
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
        this._emitter.emit(x.Overflow, t);
        return;
      }
      for (const s of M(Q(t), A))
        this._emitter.emit(x.Overflow, s);
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
    let e = this._capacity - this._size;
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, s.slice(s.length - e)), new Error("Out of memory");
    if (t < this._size) {
      const h = Math.min(this._size - t, i - e), { root: o } = this._cut(this._size - h, h);
      this._overflow(o.levels[0].next), e += h;
    }
    if (e >= i) {
      this._safeInsert(t, s);
      return;
    }
    this._overflow(s.slice(e)), this._safeInsert(this._size, s.slice(0, e));
  }
  /**
   * @internal
   */
  _safeInsert(t, s) {
    const i = this._genLevels(s.length), e = Nt(i, s), h = { root: this._root, size: this._size, tails: this._tails };
    Ft(h, t, e), this._size = h.size, this._tails = h.tails;
  }
}
class rt extends k {
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
      if (W(t)) {
        if (!j(t))
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
    return rt.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(t) {
    if (t = +t, !F(t) && !j(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const e = Array.from(this._map);
      this.clear(), this._emitter.emit(x.Overflow, e);
      return;
    }
    const s = [], i = this._map.entries();
    for (let e = this.size - t; e > 0; --e) {
      const h = i.next().value;
      this._map.delete(h[0]), s.push(h);
    }
    this._emitter.emit(x.Overflow, s);
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
    for (const [i, e] of this._map.entries())
      t.call(s, e, i, this);
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
      return this._emitter.emit(x.Overflow, [[t, s]]), this;
    const i = [];
    if (!this._map.delete(t) && this.size >= this.capacity) {
      const e = this._map.entries().next().value;
      this._map.delete(e[0]), i.push(e);
    }
    return this._map.set(t, s), i.length > 0 && this._emitter.emit(x.Overflow, i), this;
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
class nt {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new N(r);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return nt.name;
  }
  set capacity(r) {
    this._list.capacity = r;
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
  forEach(r, t) {
    this._list.forEach((s, i) => r.call(t, s, i, this), t);
  }
  front() {
    return this._list.at(0);
  }
  has(r) {
    return this._list.has(r);
  }
  keys() {
    return this._list.keys();
  }
  push(...r) {
    return this._list.push(...r);
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
  addListener(r, t) {
    return this._list.addListener(r, t), this;
  }
  on(r, t) {
    return this._list.on(r, t), this;
  }
  removeListener(r, t) {
    return this._list.removeListener(r, t), this;
  }
}
class ht {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new T(r);
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
  set capacity(r) {
    this._list.capacity = r;
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
  forEach(r, t) {
    return this._list.forEach((s, i) => r.call(t, s, i, this));
  }
  front() {
    return this._list.first();
  }
  has(r) {
    return this._list.has(r);
  }
  keys() {
    return this._list.keys();
  }
  push(...r) {
    return this._list.push(...r);
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
  addListener(r, t) {
    return this._list.addListener(r, t), this;
  }
  on(r, t) {
    return this._list.on(r, t), this;
  }
  removeListener(r, t) {
    return this._list.removeListener(r, t), this;
  }
}
class ot extends k {
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
      if (W(t)) {
        if (!j(t))
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
    return ot.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(t) {
    if (t = +t, !F(t) && !j(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const e = Array.from(this._set);
      this.clear(), this._emitter.emit(x.Overflow, e);
      return;
    }
    const s = [], i = this._set.values();
    for (let e = this.size - t; e > 0; --e) {
      const h = i.next().value;
      this._set.delete(h), s.push(h);
    }
    this._emitter.emit(x.Overflow, s);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this._emitter.emit(x.Overflow, [t]), this;
    const s = [];
    if (!this._set.delete(t) && this.size >= this.capacity) {
      const i = this._set.values().next().value;
      this._set.delete(i), s.push(i);
    }
    return this._set.add(t), s.length > 0 && this._emitter.emit(x.Overflow, s), this;
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
  forEach(t, s) {
    for (const i of this._set.keys())
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
class lt {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new L(r);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return lt.name;
  }
  set capacity(r) {
    this._list.capacity = r;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  forEach(r, t) {
    this._list.forEach((s, i) => r.call(t, s, i, this), t);
  }
  has(r) {
    return this._list.has(r);
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
  push(...r) {
    return this._list.push(...r);
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
  addListener(r, t) {
    return this._list.addListener(r, t), this;
  }
  on(r, t) {
    return this._list.on(r, t), this;
  }
  removeListener(r, t) {
    return this._list.removeListener(r, t), this;
  }
}
class _t {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new T(r);
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
  set capacity(r) {
    this._list.capacity = r;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  forEach(r, t) {
    return this._list.forEach((s, i) => r.call(t, s, i, this));
  }
  has(r) {
    return this._list.has(r);
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
  push(...r) {
    return this._list.push(...r);
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
  addListener(r, t) {
    return this._list.addListener(r, t), this;
  }
  on(r, t) {
    return this._list.on(r, t), this;
  }
  removeListener(r, t) {
    return this._list.removeListener(r, t), this;
  }
}
export {
  x as BoundedEvent,
  T as CircularArrayList,
  D as CircularDeque,
  L as CircularDoublyLinkedList,
  it as CircularLinkedDeque,
  N as CircularLinkedList,
  nt as CircularLinkedQueue,
  lt as CircularLinkedStack,
  rt as CircularMap,
  ht as CircularQueue,
  ot as CircularSet,
  P as CircularSkipList,
  _t as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
