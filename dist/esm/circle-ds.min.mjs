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
var ft = Object.defineProperty;
var ut = (h, r, t) => r in h ? ft(h, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[r] = t;
var v = (h, r, t) => (ut(h, typeof r != "symbol" ? r + "" : r, t), t);
const x = {
  Overflow: "overflow"
};
function at(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
var Q = { exports: {} };
(function(h) {
  var r = Object.prototype.hasOwnProperty, t = "~";
  function s() {
  }
  Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (t = !1));
  function e(_, l, f) {
    this.fn = _, this.context = l, this.once = f || !1;
  }
  function i(_, l, f, u, z) {
    if (typeof f != "function")
      throw new TypeError("The listener must be a function");
    var y = new e(f, u || _, z), w = t ? t + l : l;
    return _._events[w] ? _._events[w].fn ? _._events[w] = [_._events[w], y] : _._events[w].push(y) : (_._events[w] = y, _._eventsCount++), _;
  }
  function n(_, l) {
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
    for (var z = 0, y = u.length, w = new Array(y); z < y; z++)
      w[z] = u[z].fn;
    return w;
  }, o.prototype.listenerCount = function(l) {
    var f = t ? t + l : l, u = this._events[f];
    return u ? u.fn ? 1 : u.length : 0;
  }, o.prototype.emit = function(l, f, u, z, y, w) {
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
          return a.fn.call(a.context, f, u, z), !0;
        case 5:
          return a.fn.call(a.context, f, u, z, y), !0;
        case 6:
          return a.fn.call(a.context, f, u, z, y, w), !0;
      }
      for (m = 1, O = new Array(E - 1); m < E; m++)
        O[m - 1] = arguments[m];
      a.fn.apply(a.context, O);
    } else {
      var _t = a.length, $;
      for (m = 0; m < _t; m++)
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
            a[m].fn.call(a[m].context, f, u, z);
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
    return i(this, l, f, u, !1);
  }, o.prototype.once = function(l, f, u) {
    return i(this, l, f, u, !0);
  }, o.prototype.removeListener = function(l, f, u, z) {
    var y = t ? t + l : l;
    if (!this._events[y])
      return this;
    if (!f)
      return n(this, y), this;
    var w = this._events[y];
    if (w.fn)
      w.fn === f && (!z || w.once) && (!u || w.context === u) && n(this, y);
    else {
      for (var d = 0, a = [], E = w.length; d < E; d++)
        (w[d].fn !== f || z && !w[d].once || u && w[d].context !== u) && a.push(w[d]);
      a.length ? this._events[y] = a.length === 1 ? a[0] : a : n(this, y);
    }
    return this;
  }, o.prototype.removeAllListeners = function(l) {
    var f;
    return l ? (f = t ? t + l : l, this._events[f] && n(this, f)) : (this._events = new s(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, h.exports = o;
})(Q);
var ct = Q.exports;
const vt = /* @__PURE__ */ at(ct);
class T {
  constructor(r = new vt()) {
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
const A = 16383, j = 4294967295, L = Number.MAX_SAFE_INTEGER;
function U(h) {
  return Number.isInteger(h) && h >= 0 && h <= j;
}
function F(h) {
  return h === Number.POSITIVE_INFINITY;
}
function pt(h) {
  return typeof (h == null ? void 0 : h[Symbol.iterator]) == "function";
}
function V(h) {
  return Number.isInteger(h) && h >= 0 && h <= L;
}
function W(h) {
  return typeof h == "number";
}
function q(h) {
  return Number.isSafeInteger(h) && h >= 0;
}
function p(h, r, t = 0) {
  return h >= t ? h : h + r;
}
function g(h, r, t) {
  if (r > t)
    throw new RangeError("Invalid clamp range; min must be <= max");
  return h <= r ? r : h <= t ? h : t;
}
function I(h, r, t) {
  return h >= r && h < t;
}
function zt(h, r) {
  return h >= 0 && r > 0 ? Math.log(h) / Math.log(r) : NaN;
}
function yt(h, r = 1 / 0, t = Math.random) {
  let s = 0;
  for (; s < r && t() < h; )
    ++s;
  return s;
}
function c(h, r = 0) {
  return h = +h, isNaN(h) ? r : Math.trunc(h);
}
function* M(h, r) {
  if (r < 1)
    return;
  let t = [];
  r = Math.trunc(r);
  for (const s of h)
    t.push(s) >= r && (yield t, t = []);
  t.length > 0 && (yield t);
}
class k extends T {
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
    return k.name;
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
  _copyWithin(t, s, e) {
    if (t == s || s >= e)
      return;
    const i = this._capacity - 1, n = this._vals, o = this._toRanges(s, e);
    if (t <= s || e <= t) {
      t = this._toIndex(t);
      for (const [_, l] of o)
        for (let f = _; f < l; ++f)
          n[t] = n[f], t = t < i ? t + 1 : 0;
    } else {
      t = this._toIndex(t + (e - s));
      for (const [_, l] of o.reverse())
        for (let f = l - 1; f >= _; --f)
          t = t > 0 ? t - 1 : i, n[t] = n[f];
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
  fill(t, s, e) {
    const i = this._size;
    return s = g(p(c(s, 0), i), 0, i), e = g(p(c(e, i), i), s, i), this._fill(t, s, e), this;
  }
  /**
   * @internal
   */
  _fill(t, s, e) {
    for (const [i, n] of this._toRanges(s, e))
      this._vals.fill(t, i, n);
  }
  first() {
    return this._size > 0 ? this._vals[this._head] : void 0;
  }
  forEach(t, s) {
    const e = this._size;
    for (let i = 0; i < e && i < this._size; ++i) {
      const n = this._vals[this._toIndex(i)];
      t.call(s, n, i, this);
    }
  }
  has(t) {
    const s = this._vals;
    for (const [e, i] of this._toRanges(0, this._size))
      for (let n = e; n < i; ++n)
        if (t === s[n])
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
    const e = this._vals[t];
    return this._vals[t] = s, e;
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
    const e = this._size;
    return t = g(p(c(t, 0), e), 0, e), s = g(p(c(s, e), e), t, e), this._toList(this._slice(t, s));
  }
  /**
   * @internal
   */
  _slice(t, s) {
    const e = this._vals, i = new Array(s - t);
    let n = 0;
    for ([t, s] of this._toRanges(t, s))
      for (let o = t; o < s; ++o)
        i[n++] = e[o];
    return i;
  }
  splice(t, s, ...e) {
    const i = this._size;
    t = g(p(c(t, 0), i), 0, i), s = g(c(s, 0), 0, i - t);
    const n = this._toList(this._slice(t, t + s));
    return this._splice(t, s, e), n;
  }
  /**
   * @internal
   */
  _splice(t, s, e = []) {
    const i = e.length, n = Math.min(s, i), o = this._vals;
    let _ = 0;
    for (const [l, f] of this._toRanges(t, t + n))
      for (let u = l; u < f; ++u)
        o[u] = e[_++];
    s != i && (t += n, s < i ? this._insert(t, e, n) : this._delete(t, s - i));
  }
  /**
   * @internal
   */
  _insert(t, s, e = 0, i = s.length) {
    const n = i - e;
    let o = this._capacity - this._size;
    if (o >= n) {
      this._safeInsert(t, s, e, i);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s, e, e + o), new Error("Out of memory");
    if (t > 0) {
      const l = Math.min(t, n - o);
      this._overflow(this._slice(0, l)), this._shift(l), t -= l, o += l;
    }
    if (o >= n) {
      this._safeInsert(t, s, e, i);
      return;
    }
    const _ = i - o;
    this._overflow(s.slice(e, _)), this._safePresert(0, s, _, i);
  }
  /**
   * @internal
   */
  _safeInsert(t, s, e = 0, i = s.length) {
    const n = i - e, o = this._vals;
    this._copyWithin(t + n, t, this._size);
    for (const [_, l] of this._toRanges(t, t + n))
      for (let f = _; f < l; ++f)
        o[f] = s[e++];
    this._size += n, this._next = this._toIndex(this._size);
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
  _presert(t, s, e = 0, i = s.length) {
    const n = i - e;
    let o = this._capacity - this._size;
    if (o >= n) {
      this._safePresert(t, s, e, i);
      return;
    }
    if (!this._isFinite)
      throw this._safePresert(t, s, i - o, i), new Error("Out of memory");
    if (t < this._size) {
      const l = Math.min(this._size - t, n - o);
      this._overflow(this._slice(this._size - l, this._size)), this._pop(l), o += l;
    }
    if (o >= n) {
      this._safePresert(t, s, e, i);
      return;
    }
    const _ = e + o;
    this._overflow(s.slice(_, i)), this._safeInsert(this._size, s, e, _);
  }
  /**
   * @internal
   */
  _safePresert(t, s, e = 0, i = s.length) {
    const n = this._capacity, o = i - e, _ = this._vals, l = n - o;
    this._copyWithin(l, 0, t), t += l;
    for (const [f, u] of this._toRanges(t, t + o))
      for (let z = f; z < u; ++z)
        _[z] = s[e++];
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
      const e = Math.max(s, this._next - s);
      this._vals.fill(void 0, e, this._next), this._next -= s;
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
      const e = this._size - t;
      this._overflow(this._slice(0, e)), this._shift(e);
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
    const s = new k(0);
    return s._vals = t, s._size = t.length, s._capacity = t.length, s;
  }
  /**
   * @internal
   */
  _toRanges(t, s) {
    const e = this._head, i = this._capacity - e;
    return s <= i ? [[e + t, e + s]] : t >= i ? [[t - i, s - i]] : [
      [e + t, this._capacity],
      [0, s - i]
    ];
  }
}
class Z {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new k(r);
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
    return this._list.forEach((s, e) => r.call(t, s, e, this));
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
function gt(h, r) {
  const t = { value: void 0 };
  let s = 0, e = t;
  for (; h != null && s < r; ) {
    const i = { value: h.value };
    e.next = i, e = i, ++s, h = h.next;
  }
  return e.next = void 0, { root: t, size: s, tail: e };
}
function G(h, r) {
  const t = { value: void 0 };
  if (h == null || r <= 0)
    return { root: t, size: 0, tail: t };
  const s = h.next, e = H(s, r - 1);
  return h.next = e.next, e.next = void 0, t.next = s, { root: t, size: r, tail: e };
}
function* D(h) {
  for (let r = 0; h != null; ++r)
    yield [r, h.value], h = h.next;
}
function H(h, r) {
  if (!(r < 0)) {
    for (let t = 0; h != null && t < r; ++t)
      h = h.next;
    return h;
  }
}
function C(h, r) {
  for (; h != null; ) {
    if (h.value === r)
      return !0;
    h = h.next;
  }
  return !1;
}
function* tt(h) {
  for (let r = 0; h != null; ++r)
    yield r, h = h.next;
}
function wt(h) {
  const r = { value: void 0 };
  let t = 0, s = r;
  for (const e of h)
    s.next = { value: e }, s = s.next, ++t;
  return s.next = void 0, { root: r, size: t, tail: s };
}
function* S(h) {
  for (; h != null; )
    yield h.value, h = h.next;
}
function mt(h, r) {
  const t = { value: void 0 };
  if (h == null || r <= 0)
    return { root: t, size: 0, tail: t };
  let s = 0, e = t;
  for (; h != null && s < r; ) {
    const i = { value: h.value };
    e.next = i, i.prev = e, e = i, ++s, h = h.next;
  }
  return t.prev = void 0, e.next = void 0, { root: t, size: s, tail: e };
}
function X(h, r) {
  const t = G(h, r);
  if (t.size <= 0)
    return t;
  t.root.next.prev = t.root;
  const s = h.next;
  return s != null && (s.prev = h), t;
}
function B(h, r) {
  if (r >= 0)
    return H(h, r);
  for (let t = 0; h != null && t > r; --t)
    h = h.prev;
  return h;
}
function xt(h) {
  const r = { value: void 0 };
  let t = 0, s = r;
  for (const e of h)
    s.next = { prev: s, value: e }, s = s.next, ++t;
  return r.prev = void 0, s.next = void 0, { root: r, size: t, tail: s };
}
class b extends T {
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
    return b.name;
  }
  set capacity(t) {
    if (t = +t, t = +t, F(t))
      t = L, this._isFinite = !1;
    else if (V(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const s = this._size - t, { root: e } = X(this._root, s);
    this._size -= s, this._size <= 0 && (this._tail = this._root);
    for (const i of M(S(e.next), A))
      this._overflow(i);
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
    return D(this._root.next);
  }
  fill(t, s, e) {
    s = c(s, 0), s = g(p(s, this._size), 0, this._size), e = c(e, this._size), e = g(p(e, this._size), 0, this._size);
    let i = this._get(s);
    for (; s < e; )
      i.value = t, i = i.next, ++s;
    return this;
  }
  forEach(t, s) {
    let e = this._root;
    for (let i = 0; i < this._size; ++i)
      e = e.next, t.call(s, e.value, i, this);
  }
  has(t) {
    return C(this._root.next, t);
  }
  keys() {
    return tt(this._root.next);
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
    const e = this._get(t), i = e.value;
    return e.value = s, i;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.next.value;
  }
  slice(t, s) {
    const e = this._size;
    if (t = g(p(c(t, 0), e), 0, e), s = g(p(c(s, e), e), t, e), t >= s)
      return new b(0);
    const i = this._get(t), n = mt(i, s - t), o = new b(n.size);
    return o._root = n.root, o._size = n.size, o._tail = n.tail, o;
  }
  splice(t, s, ...e) {
    const i = this._size;
    t = g(p(c(t, 0), i), 0, i), s = g(c(s, 0), 0, i - t);
    let n;
    if (s <= 0)
      n = new b(0);
    else {
      const { root: o, size: _, tail: l } = this._cut(t, s);
      n = new b(_), n._root = o, n._size = _, n._tail = l;
    }
    return this._insert(t, e), n;
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
    const e = this._get(t - 1), i = X(e, s);
    return this._size -= s, t >= this._size && (this._tail = e), i;
  }
  /**
   * @internal
   */
  _get(t) {
    const s = this._size / 2;
    return ++t <= s ? B(this._root, t) : B(this._tail, t - this._size);
  }
  /**
   * @internal
   */
  _insert(t, s) {
    const e = s.length;
    if (e <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let i = this._capacity - this._size;
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s.slice(0, i)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, e - i), { root: _ } = this._cut(0, o);
      this._overflow(S(_.next)), t -= o, i += o;
    }
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    const n = s.length - i;
    this._overflow(s.slice(0, n)), this._safeInsert(0, s.slice(n));
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
    const e = s.length;
    if (e <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let i = this._capacity - this._size;
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, s.slice(s.length - i)), new Error("Out of memory");
    if (t < this._size) {
      const n = Math.min(this._size - t, e - i), { root: o } = this._cut(this._size - n, n);
      this._overflow(S(o.next)), i += n;
    }
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    this._overflow(s.slice(i)), this._safeInsert(this._size, s.slice(0, i));
  }
  /**
   * @internal
   */
  _safeInsert(t, s) {
    if (s.length <= 0)
      return;
    const { root: e, size: i, tail: n } = xt(s), o = e.next, _ = this._get(t - 1), l = _.next;
    o.prev = _, n.next = l, _.next = o, l != null && (l.prev = n), this._tail = t < this._size ? this._tail : n, this._size += i;
  }
}
class st {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new b(r);
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
    this._list.forEach((s, e) => r.call(t, s, e, this), t);
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
class N extends T {
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
      t = L, this._isFinite = !1;
    else if (V(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const s = this._size - t, { root: e } = G(this._root, s);
    this._size -= s, this._size <= 0 && (this._tail = this._root), this._overflow(e.next);
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
    return D(this._root.next);
  }
  fill(t, s, e) {
    const i = this._size;
    if (s = g(p(c(s, 0), i), 0, i), e = g(p(c(e, i), i), s, i), s >= e)
      return this;
    let n = this._get(s);
    for (let o = s; o < e; ++o)
      n.value = t, n = n.next;
    return this;
  }
  forEach(t, s) {
    let e = this._root;
    for (let i = 0; i < this._size; ++i)
      e = e.next, t.call(s, e.value, i, this);
  }
  has(t) {
    return C(this._root.next, t);
  }
  keys() {
    return tt(this._root.next);
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
    const e = this._get(t), i = e.value;
    return e.value = s, i;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.next.value;
  }
  slice(t, s) {
    const e = this._size;
    if (t = g(p(c(t, 0), e), 0, e), s = g(p(c(s, e), e), t, e), t >= s)
      return new N(0);
    const i = this._get(t), n = gt(i, s - t), o = new N(n.size);
    return o._root = n.root, o._size = n.size, o._tail = n.tail, o;
  }
  splice(t, s, ...e) {
    const i = this._size;
    t = g(p(c(t, 0), i), 0, i), s = g(c(s, 0), 0, i - t);
    let n;
    if (s <= 0)
      n = new N(0);
    else {
      const { root: o, size: _, tail: l } = this._cut(t, s);
      n = new N(s), n._root = o, n._size = _, n._tail = l;
    }
    return this._insert(t, e), n;
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
    const e = this._get(t - 1), i = G(e, s);
    return this._size -= s, t >= this._size && (this._tail = e), i;
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
  _insert(t, s) {
    const e = s.length;
    if (e <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let i = this._capacity - this._size;
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s.slice(0, i)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, e - i), { root: _ } = this._cut(0, o);
      this._overflow(_.next), t -= o, i += o;
    }
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    const n = s.length - i;
    this._overflow(s.slice(0, n)), this._safeInsert(0, s.slice(n));
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
    const e = s.length;
    if (e <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let i = this._capacity - this._size;
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, s.slice(s.length - i)), new Error("Out of memory");
    if (t < this._size) {
      const n = Math.min(this._size - t, e - i), { root: o } = this._cut(this._size - n, n);
      this._overflow(o.next), i += n;
    }
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    this._overflow(s.slice(i)), this._safeInsert(this._size, s.slice(0, i));
  }
  /**
   * @internal
   */
  _safeInsert(t, s) {
    if (s.length <= 0)
      return;
    const { root: e, size: i, tail: n } = wt(s), o = this._get(t - 1);
    n.next = o.next, o.next = e.next, this._tail = t < this._size ? this._tail : n, this._size += i;
  }
}
function K(h, r) {
  return h <= 0 || r <= 1 ? 1 : h >= 1 ? 1 / 0 : Math.ceil(zt(r, 1 / h));
}
function It(h, r, t) {
  let s = 0;
  const e = R(void 0), i = [e], n = [-1];
  if (t <= 0)
    return { root: e, size: s, tails: i };
  let o = Y(h, r - 1).node;
  o = o.levels[0].next;
  let _ = 1;
  for (; o != null && s < t; ) {
    const l = o.levels.length;
    for (; _ < l; )
      i[_] = e, n[_] = -1, ++_;
    const f = R(o.value, l);
    for (let y = 0; y < l; ++y)
      i[y].levels[y] = { next: f, span: s - n[y] }, i[y] = f, n[y] = s;
    const { next: u, span: z } = o.levels[0];
    s += z, o = u;
  }
  s = n[0] + 1;
  for (let l = 0; l < _; ++l)
    i[l].levels[l] = { next: void 0, span: s - n[l] };
  return { root: e, size: s, tails: i };
}
function dt(h, r, t) {
  const s = R(void 0), e = { root: s, size: 0, tails: [s] };
  if (t <= 0)
    return e;
  const i = et(h, r - 1), n = Ft(Array.from(i), t), o = n[0].index + n[0].node.levels[0].span;
  let _ = h.root.levels.length;
  r = i[0].index + i[0].node.levels[0].span, t = o - r;
  let l;
  for (l = 0; l < _; ++l) {
    const f = i[l], u = n[l];
    if (f.index >= u.index)
      break;
    let z = f.node.levels[l], y = f.index + z.span - r;
    s.levels[l] = { next: z.next, span: y }, z = u.node.levels[l], y = u.index - f.index + (z.span - t), f.node.levels[l] = { next: z.next, span: y }, u.node.levels[l] = { next: void 0, span: o - u.index }, e.tails[l] = u.node;
  }
  if (l < _)
    for (; l < _; ) {
      const f = i[l], { next: u, span: z } = f.node.levels[l];
      f.node.levels[l] = { next: u, span: z - t }, ++l;
    }
  else {
    const f = h.root.levels;
    for (; l > 1 && f[l - 1].next == null; )
      --l;
    _ = l, f.length = _, h.tails.length = _;
  }
  if (o >= h.size)
    for (l = 0; l < _; ++l)
      h.tails[l] = i[l].node;
  return h.size -= t, e.size = t, e;
}
function* Et(h) {
  let r = 0;
  for (; h != null; ) {
    yield [r, h.value];
    const { next: t, span: s } = h.levels[0];
    h = t, r += s;
  }
}
function Y(h, r) {
  if (r < 0)
    return { index: -1, node: h.root };
  const t = h.tails;
  if (r >= h.size - t[0].levels[0].span)
    return { index: h.size - t[0].levels[0].span, node: t[0] };
  let s, e = -1, i = h.root;
  for (s = i.levels.length - 1; s >= 0 && e < r; --s) {
    const n = h.size - t[s].levels[s].span;
    if (n > r)
      break;
    e = n, i = t[s];
  }
  for (; s >= 0 && e < r; ) {
    const { next: n, span: o } = i.levels[s];
    e + o > r || n == null ? --s : (e += o, i = n);
  }
  return { index: e, node: i };
}
function et(h, r) {
  const t = Nt(h.root, -1);
  if (r < 0)
    return t;
  const s = t.length, e = h.tails;
  if (r >= h.size - e[0].levels[0].span) {
    for (let n = 0; n < s; ++n) {
      const o = h.size - e[n].levels[n].span;
      t[n] = { index: o, node: e[n] };
    }
    return t;
  }
  let i;
  for (i = s - 1; i >= 0 && t[i].index < r; --i) {
    const n = h.size - e[i].levels[i].span;
    if (n > r)
      break;
    t[i] = { index: n, node: e[i] };
  }
  for (; i >= 0 && t[i].index < r; ) {
    const { index: n, node: o } = t[i], { next: _, span: l } = o.levels[i];
    n + l > r || _ == null ? --i : t[i] = { index: n + l, node: _ };
  }
  if (i > 0) {
    const { index: n, node: o } = t[i];
    for (let _ = 0; _ < i; ++_)
      t[_] = { index: n, node: o };
  }
  return t;
}
function St(h, r) {
  for (; h != null; ) {
    if (h.value === r)
      return !0;
    h = h.levels[0].next;
  }
  return !1;
}
function bt(h, r, t) {
  if (t.size <= 0)
    return;
  const s = t.tails.length;
  for (let n = h.tails.length; n < s; ++n)
    h.root.levels[n] = { next: void 0, span: h.size + 1 }, h.tails[n] = h.root;
  const e = et(h, r - 1);
  for (let n = 0; n < s; ++n) {
    const o = e[n].node, _ = t.tails[n], l = o.levels[n], f = _.levels[n];
    let u = e[n].index - r + l.span + f.span;
    _.levels[n] = { next: l.next, span: u };
    const z = t.root.levels[n];
    u = r - e[n].index + (z.span - 1), o.levels[n] = { next: z.next, span: u };
  }
  const i = h.tails.length;
  for (let n = s; n < i; ++n) {
    const o = e[n].node.levels, { next: _, span: l } = o[n];
    o[n] = { next: _, span: l + t.size };
  }
  if (r === h.size)
    for (let n = 0; n < s; ++n)
      h.tails[n] = t.tails[n];
  h.size += t.size;
}
function* Lt(h) {
  let r = 0;
  for (; h != null; ) {
    yield r;
    const { next: t, span: s } = h.levels[0];
    h = t, r += s;
  }
}
function Ft(h, r) {
  if (r <= 0 || h.length <= 0)
    return h;
  let t = h.length - 1;
  const s = h[0].index + r;
  for (; t >= 0 && h[t].index < s; ) {
    const { index: e, node: i } = h[t], { next: n, span: o } = i.levels[t];
    e + o > s || n == null ? --t : h[t] = { index: e + o, node: n };
  }
  if (t > 0) {
    const { index: e, node: i } = h[t];
    for (let n = 0; n < t; ++n)
      h[n] = { index: e, node: i };
  }
  return h;
}
function Ot(h, r) {
  let t = -1 / 0;
  const s = Math.min(h.length, r.length);
  for (let n = 0; n < s; ++n)
    t < h[n] && (t = h[n]);
  if (t <= 0 || s <= 0) {
    const n = R(void 0);
    return { root: n, size: 0, tails: [n] };
  }
  const e = R(void 0, t, s + 1), i = new Array(t).fill(e);
  for (let n = 0; n < s; ++n) {
    t = h[n];
    const o = s - n, _ = R(r[n], t, o);
    for (let l = 0; l < t; ++l) {
      const f = i[l].levels;
      f[l] = { next: _, span: f[l].span - o }, i[l] = _;
    }
  }
  return { root: e, size: s, tails: i };
}
function R(h, r = 1, t = 1, s) {
  const e = new Array(r);
  for (let i = 0; i < r; ++i)
    e[i] = { next: s, span: t };
  return { value: h, levels: e };
}
function Nt(h, r = 0) {
  const t = h.levels.length, s = new Array(t);
  for (let e = 0; e < t; ++e)
    s[e] = { index: r, node: h };
  return s;
}
function Rt(h, r) {
  if (!(h == null || h.levels.length <= r))
    for (; h != null; ) {
      const t = h.levels[r].next;
      h.levels.length = r, h = t;
    }
}
function* J(h) {
  for (; h != null; )
    yield h.value, h = h.levels[0].next;
}
class P extends T {
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
      if (W(t)) {
        this.capacity = t;
        return;
      }
      if (!pt(t)) {
        this.capacity = t.capacity ?? this._capacity, this.p = t.p ?? this._p;
        const s = t.expectedSize ?? this._capacity;
        this.maxLevel = t.maxLevel ?? K(this._p, s);
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
      t = L, this._isFinite = !1;
    else if (V(t))
      this._isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    if (this._capacity = t, this._size <= t)
      return;
    const { root: s } = this._cut(0, this._size - t);
    this._overflow(s.levels[0].next);
  }
  set maxLevel(t) {
    if (t = +t, !U(t) || t <= 0)
      throw new RangeError("Invalid maxLevel");
    this._maxLevel = t, t < this.levels && Rt(this._root, t);
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
    return Et(this._root.levels[0].next);
  }
  fill(t, s, e) {
    const i = this._size;
    if (s = g(p(c(s, 0), i), 0, i), e = g(p(c(e, i), i), s, i), s >= e)
      return this;
    const n = { root: this._root, size: this._size, tails: this._tails };
    let { node: o } = Y(n, s);
    for (let _ = s; _ < e; ++_)
      o.value = t, o = o.levels[0].next;
    return this;
  }
  forEach(t, s) {
    let e = this._root;
    for (let i = 0; i < this._size; ++i)
      e = e.levels[0].next, t.call(s, e.value, i, this);
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
  set(t, s) {
    if (t = p(c(t, -1 / 0), this._size), !I(t, 0, this._size))
      return;
    const e = { root: this._root, size: this._size, tails: this._tails }, { node: i } = Y(e, t), n = i.value;
    return i.value = s, n;
  }
  shift() {
    if (this._size <= 0)
      return;
    const { root: t } = this._cut(0, 1);
    return t.levels[0].next.value;
  }
  slice(t, s) {
    const e = this._size;
    t = g(p(c(t, 0), e), 0, e), s = g(p(c(s, e), e), t, e);
    const i = {
      capacity: 0,
      p: this._p,
      maxLevel: this._maxLevel
    };
    if (t >= s)
      return new P(i);
    const n = { root: this._root, size: this._size, tails: this._tails }, o = It(n, t, s - t);
    i.capacity = o.size;
    const _ = new P(i);
    return _._root = o.root, _._tails = o.tails, _._size = o.size, _;
  }
  splice(t, s, ...e) {
    const i = this._size;
    t = g(p(c(t, 0), i), 0, i), s = g(c(s, 0), 0, i - t);
    const n = this._cut(t, s);
    this._insert(t, e);
    const o = new P({
      capacity: s,
      p: this._p,
      maxLevel: this._maxLevel
    });
    return o._root = n.root, o._tails = n.tails, o._size = n.size, o;
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
  _cut(t, s) {
    const e = { root: this._root, size: this._size, tails: this._tails }, i = dt(e, t, s);
    return this._size = e.size, this._tails = e.tails, i;
  }
  /**
   * @internal
   */
  _genLevels(t) {
    const s = new Array(t), e = this._maxLevel - 1;
    for (let i = 0; i < t; ++i)
      s[i] = 1 + yt(this._p, e);
    return s;
  }
  /**
   * @internal
   */
  _insert(t, s) {
    const e = s.length;
    if (e <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let i = this._capacity - this._size;
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(t, s.slice(0, i)), new Error("Out of memory");
    if (t > 0) {
      const o = Math.min(t, e - i), { root: _ } = this._cut(0, o);
      this._overflow(_.levels[0].next), t -= o, i += o;
    }
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    const n = s.length - i;
    this._overflow(s.slice(0, n)), this._safeInsert(0, s.slice(n));
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
      for (const s of M(J(t), A))
        this._emitter.emit(x.Overflow, s);
    }
  }
  /**
   * @internal
   */
  _presert(t, s) {
    const e = s.length;
    if (e <= 0)
      return;
    if (this._capacity <= 0) {
      this._overflow(s);
      return;
    }
    let i = this._capacity - this._size;
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    if (!this._isFinite)
      throw this._safeInsert(0, s.slice(s.length - i)), new Error("Out of memory");
    if (t < this._size) {
      const n = Math.min(this._size - t, e - i), { root: o } = this._cut(this._size - n, n);
      this._overflow(o.levels[0].next), i += n;
    }
    if (i >= e) {
      this._safeInsert(t, s);
      return;
    }
    this._overflow(s.slice(i)), this._safeInsert(this._size, s.slice(0, i));
  }
  /**
   * @internal
   */
  _safeInsert(t, s) {
    const e = this._genLevels(s.length), i = Ot(e, s), n = { root: this._root, size: this._size, tails: this._tails };
    bt(n, t, i), this._size = n.size, this._tails = n.tails;
  }
}
class it extends T {
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
    return it.name;
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
      const i = Array.from(this._map);
      this.clear(), this._emitter.emit(x.Overflow, i);
      return;
    }
    const s = [], e = this._map.entries();
    for (let i = this.size - t; i > 0; --i) {
      const n = e.next().value;
      this._map.delete(n[0]), s.push(n);
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
    for (const [e, i] of this._map.entries())
      t.call(s, i, e, this);
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
    const e = [];
    if (!this._map.delete(t) && this.size >= this.capacity) {
      const i = this._map.entries().next().value;
      this._map.delete(i[0]), e.push(i);
    }
    return this._map.set(t, s), e.length > 0 && this._emitter.emit(x.Overflow, e), this;
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
class rt {
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
    return rt.name;
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
    this._list.forEach((s, e) => r.call(t, s, e, this), t);
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
class nt {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new k(r);
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
    return this._list.first();
  }
  forEach(r, t) {
    return this._list.forEach((s, e) => r.call(t, s, e, this));
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
class ht extends T {
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
    return ht.name;
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
      const i = Array.from(this._set);
      this.clear(), this._emitter.emit(x.Overflow, i);
      return;
    }
    const s = [], e = this._set.values();
    for (let i = this.size - t; i > 0; --i) {
      const n = e.next().value;
      this._set.delete(n), s.push(n);
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
      const e = this._set.values().next().value;
      this._set.delete(e), s.push(e);
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
    for (const e of this._set.keys())
      t.call(s, e, e, this);
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
class ot {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new b(r);
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
    this._list.forEach((s, e) => r.call(t, s, e, this), t);
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
class lt {
  constructor(r) {
    /**
     * @internal
     */
    v(this, "_list");
    this._list = new k(r);
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
    return this._list.forEach((s, e) => r.call(t, s, e, this));
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
  k as CircularArrayList,
  Z as CircularDeque,
  b as CircularDoublyLinkedList,
  st as CircularLinkedDeque,
  N as CircularLinkedList,
  rt as CircularLinkedQueue,
  ot as CircularLinkedStack,
  it as CircularMap,
  nt as CircularQueue,
  ht as CircularSet,
  P as CircularSkipList,
  lt as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
