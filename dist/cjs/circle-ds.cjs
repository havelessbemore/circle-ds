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
"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const BoundedEvent = {
  Overflow: "overflow"
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var eventemitter3 = { exports: {} };
(function(module2) {
  var has2 = Object.prototype.hasOwnProperty, prefix = "~";
  function Events() {
  }
  if (Object.create) {
    Events.prototype = /* @__PURE__ */ Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events();
    else
      delete emitter._events[evt];
  }
  function EventEmitter2() {
    this._events = new Events();
    this._eventsCount = 0;
  }
  EventEmitter2.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has2.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter2.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter2.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, void 0, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0; i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, void 0, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter2.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter2.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
  EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
  EventEmitter2.prefixed = prefix;
  EventEmitter2.EventEmitter = EventEmitter2;
  {
    module2.exports = EventEmitter2;
  }
})(eventemitter3);
var eventemitter3Exports = eventemitter3.exports;
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
class CircularBase {
  constructor(emitter = new EventEmitter()) {
    /**
     * @internal
     * The event emitter.
     *
     */
    __publicField(this, "_emitter");
    this._emitter = emitter;
  }
  addListener(event, listener) {
    this._emitter.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this._emitter.on(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this._emitter.removeListener(event, listener);
    return this;
  }
}
const ARGS_MAX_LENGTH = 16383;
const ARRAY_MAX_LENGTH = 4294967295;
const LINKED_MAX_LENGTH = Number.MAX_SAFE_INTEGER;
function isArrayLength(value) {
  return Number.isInteger(value) && value >= 0 && value <= ARRAY_MAX_LENGTH;
}
function isInfinity(value) {
  return value === Number.POSITIVE_INFINITY;
}
function isIterable(value) {
  return typeof (value == null ? void 0 : value[Symbol.iterator]) === "function";
}
function isLinkedLength(value) {
  return Number.isInteger(value) && value >= 0 && value <= LINKED_MAX_LENGTH;
}
function isNumber(value) {
  return typeof value === "number";
}
function isSafeCount(value) {
  return Number.isSafeInteger(value) && value >= 0;
}
function addIfBelow(value, addend, target = 0) {
  return value >= target ? value : value + addend;
}
function clamp(value, min, max) {
  if (min > max) {
    throw new RangeError("Invalid clamp range; min must be <= max");
  }
  if (value <= min) {
    return min;
  }
  return value <= max ? value : max;
}
function isInRange(value, min, max) {
  return value >= min && value < max;
}
function log(value, base) {
  return value >= 0 && base > 0 ? Math.log(value) / Math.log(base) : NaN;
}
function simulateWinStreak(probability, max = Infinity, randomFn = Math.random) {
  let count = 0;
  while (count < max && randomFn() < probability) {
    ++count;
  }
  return count;
}
function toInteger(value, defaultValue = 0) {
  value = +value;
  return isNaN(value) ? defaultValue : Math.trunc(value);
}
function* chunk(source, chunkSize) {
  if (chunkSize < 1) {
    return;
  }
  let chunk2 = [];
  chunkSize = Math.trunc(chunkSize);
  for (const value of source) {
    if (chunk2.push(value) >= chunkSize) {
      yield chunk2;
      chunk2 = [];
    }
  }
  if (chunk2.length > 0) {
    yield chunk2;
  }
}
class CircularArrayList extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    __publicField(this, "_capacity");
    /**
     * @internal
     * The index representing the first element.
     */
    __publicField(this, "_head");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    __publicField(this, "_isFinite");
    /**
     * @internal
     * The index one more than the last element.
     */
    __publicField(this, "_next");
    /**
     * @internal
     * The number of elements.
     */
    __publicField(this, "_size");
    /**
     * @internal
     * The stored values.
     */
    __publicField(this, "_vals");
    this._capacity = ARRAY_MAX_LENGTH;
    this._head = 0;
    this._isFinite = false;
    this._size = 0;
    this._next = 0;
    this._vals = [];
    if (capacity == null) {
      return;
    }
    if (isNumber(capacity)) {
      this.capacity = capacity;
      return;
    }
    for (const vals of chunk(capacity, ARGS_MAX_LENGTH)) {
      this._insert(this._size, vals);
    }
    this._capacity = this._size;
    this._isFinite = true;
  }
  get capacity() {
    return this._isFinite ? this._capacity : Infinity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return CircularArrayList.name;
  }
  set capacity(capacity) {
    capacity = +capacity;
    if (isInfinity(capacity)) {
      capacity = ARRAY_MAX_LENGTH;
      this._isFinite = false;
    } else if (isArrayLength(capacity)) {
      this._isFinite = true;
    } else {
      throw new RangeError("Invalid capacity");
    }
    if (this._size <= 0) {
      this._capacity = capacity;
      this.clear();
    } else if (capacity < this._capacity) {
      this._shrink(capacity);
    } else if (capacity > this._capacity) {
      this._grow(capacity);
    }
  }
  at(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    return this._vals[this._toIndex(index)];
  }
  clear() {
    this._size = 0;
    this._head = 0;
    this._next = 0;
    this._vals.length = 0;
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
  _copyWithin(target, start, end) {
    if (target == start || start >= end) {
      return;
    }
    const capacity = this._capacity - 1;
    const vals = this._vals;
    const ranges = this._toRanges(start, end);
    if (target <= start || end <= target) {
      target = this._toIndex(target);
      for (const [min, max] of ranges) {
        for (let i = min; i < max; ++i) {
          vals[target] = vals[i];
          target = target < capacity ? target + 1 : 0;
        }
      }
    } else {
      target = this._toIndex(target + (end - start));
      for (const [min, max] of ranges.reverse()) {
        for (let i = max - 1; i >= min; --i) {
          target = target > 0 ? target - 1 : capacity;
          vals[target] = vals[i];
        }
      }
    }
  }
  delete(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }
    this._delete(index, 1);
    return true;
  }
  /**
   * @internal
   */
  _delete(index, deleteCount) {
    this._copyWithin(index, index + deleteCount, this._size);
    this._pop(deleteCount);
  }
  *entries() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield [ext, this._vals[this._toIndex(ext)]];
    }
  }
  fill(value, start, end) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    this._fill(value, start, end);
    return this;
  }
  /**
   * @internal
   */
  _fill(value, start, end) {
    for (const [min, max] of this._toRanges(start, end)) {
      this._vals.fill(value, min, max);
    }
  }
  first() {
    return this._size > 0 ? this._vals[this._head] : void 0;
  }
  forEach(callbackfn, thisArg) {
    const N = this._size;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      const value = this._vals[this._toIndex(ext)];
      callbackfn.call(thisArg, value, ext, this);
    }
  }
  has(value) {
    const vals = this._vals;
    for (const [min, max] of this._toRanges(0, this._size)) {
      for (let i = min; i < max; ++i) {
        if (value === vals[i]) {
          return true;
        }
      }
    }
    return false;
  }
  *keys() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield ext;
    }
  }
  last() {
    return this._size > 0 ? this._vals[this._toIndex(this._size - 1)] : void 0;
  }
  pop() {
    if (this._size <= 0) {
      return void 0;
    }
    const value = this._vals[this._toIndex(this._size - 1)];
    this._pop(1);
    return value;
  }
  /**
   * @internal
   */
  _pop(N) {
    const newSize = this._size - N;
    this._fill(void 0, newSize, this._size);
    this._next = this._toIndex(newSize);
    this._size = newSize;
  }
  push(...items) {
    if (items.length <= 0) {
      return this._size;
    }
    if (this._capacity <= 0) {
      this._overflow(items);
      return this._size;
    }
    this._insert(this._size, items);
    return this._size;
  }
  set(index, value) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    index = this._toIndex(index);
    const prevValue = this._vals[index];
    this._vals[index] = value;
    return prevValue;
  }
  shift() {
    if (this._size <= 0) {
      return void 0;
    }
    const value = this._vals[this._head];
    this._shift(1);
    return value;
  }
  /**
   * @internal
   */
  _shift(N) {
    this._fill(void 0, 0, N);
    this._head = this._toIndex(N);
    this._size -= N;
  }
  slice(start, end) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    return this._toList(this._slice(start, end));
  }
  /**
   * @internal
   */
  _slice(start, end) {
    const from = this._vals;
    const to = new Array(end - start);
    let j = 0;
    for ([start, end] of this._toRanges(start, end)) {
      for (let i = start; i < end; ++i) {
        to[j++] = from[i];
      }
    }
    return to;
  }
  splice(start, deleteCount, ...items) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    deleteCount = clamp(toInteger(deleteCount, 0), 0, size - start);
    const out = this._toList(this._slice(start, start + deleteCount));
    this._splice(start, deleteCount, items);
    return out;
  }
  /**
   * @internal
   */
  _splice(start, deleteCount, items = []) {
    const addCount = items.length;
    const replaceCount = Math.min(deleteCount, addCount);
    const vals = this._vals;
    let j = 0;
    for (const [a, b] of this._toRanges(start, start + replaceCount)) {
      for (let i = a; i < b; ++i) {
        vals[i] = items[j++];
      }
    }
    if (deleteCount == addCount) {
      return;
    }
    start += replaceCount;
    deleteCount < addCount ? this._insert(start, items, replaceCount) : this._delete(start, deleteCount - addCount);
  }
  /**
   * @internal
   */
  _insert(start, items, min = 0, max = items.length) {
    const N = max - min;
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(start, items, min, max);
      return;
    }
    if (!this._isFinite) {
      this._safeInsert(start, items, min, min + free);
      throw new Error("Out of memory");
    }
    if (start > 0) {
      const shifted = Math.min(start, N - free);
      this._overflow(this._slice(0, shifted));
      this._shift(shifted);
      start -= shifted;
      free += shifted;
    }
    if (free >= N) {
      this._safeInsert(start, items, min, max);
      return;
    }
    const mid = max - free;
    this._overflow(items.slice(min, mid));
    this._safePresert(0, items, mid, max);
  }
  /**
   * @internal
   */
  _safeInsert(vIndex, items, min = 0, max = items.length) {
    const N = max - min;
    const vals = this._vals;
    this._copyWithin(vIndex + N, vIndex, this._size);
    for (const [start, end] of this._toRanges(vIndex, vIndex + N)) {
      for (let i = start; i < end; ++i) {
        vals[i] = items[min++];
      }
    }
    this._size += N;
    this._next = this._toIndex(this._size);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...items) {
    if (items.length <= 0) {
      return this._size;
    }
    if (this._capacity <= 0) {
      this._overflow(items);
      return this._size;
    }
    this._presert(0, items);
    return this._size;
  }
  /**
   * @internal
   */
  _presert(end, items, min = 0, max = items.length) {
    const N = max - min;
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safePresert(end, items, min, max);
      return;
    }
    if (!this._isFinite) {
      this._safePresert(end, items, max - free, max);
      throw new Error("Out of memory");
    }
    if (end < this._size) {
      const popped = Math.min(this._size - end, N - free);
      this._overflow(this._slice(this._size - popped, this._size));
      this._pop(popped);
      free += popped;
    }
    if (free >= N) {
      this._safePresert(end, items, min, max);
      return;
    }
    const mid = min + free;
    this._overflow(items.slice(mid, max));
    this._safeInsert(this._size, items, min, mid);
  }
  /**
   * @internal
   */
  _safePresert(vIndex, items, min = 0, max = items.length) {
    const capacity = this._capacity;
    const N = max - min;
    const vals = this._vals;
    const newHead = capacity - N;
    this._copyWithin(newHead, 0, vIndex);
    vIndex += newHead;
    for (const [start, end] of this._toRanges(vIndex, vIndex + N)) {
      for (let i = start; i < end; ++i) {
        vals[i] = items[min++];
      }
    }
    this._size += N;
    this._head = this._toIndex(newHead);
  }
  *values() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield this._vals[this._toIndex(ext)];
    }
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(evicted) {
    this._emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * @internal
   *
   * Grow capacity.
   *
   * @param capacity - the new capacity
   */
  _grow(capacity) {
    if (this._isSequential()) {
      this._sequentialReset(capacity);
      return;
    }
    if (this._size <= this._head) {
      const temp = this._size - this._next;
      this._vals.copyWithin(temp, 0, this._next);
      this._vals.copyWithin(0, this._head, this._head + temp);
      this._vals.length = this._size;
      this._head = 0;
      this._next = this._size;
    } else if (this._head + this._size <= capacity) {
      this._vals.length = this._head + this._size;
      this._vals.copyWithin(this._capacity, 0, this._next);
      this._vals.fill(void 0, 0, this._next);
      this._next = (this._head + this._size) % capacity;
    } else {
      const diff = capacity - this._capacity;
      this._vals.length = capacity;
      this._vals.copyWithin(this._capacity, 0, diff);
      this._vals.copyWithin(0, diff, this._next);
      const temp = Math.max(diff, this._next - diff);
      this._vals.fill(void 0, temp, this._next);
      this._next -= diff;
    }
    this._capacity = capacity;
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
  _sequentialReset(capacity) {
    const tail = this._head + this._size;
    if (tail <= capacity) {
      this._vals.length = tail;
      this._next = this._vals.length % capacity;
    } else if (this._head >= capacity) {
      this._vals.copyWithin(0, this._head, tail);
      this._vals.length = this._size;
      this._head = 0;
      this._next = this._size % capacity;
    } else {
      this._vals.copyWithin(0, capacity, tail);
      this._vals.length = capacity;
      this._next = tail - capacity;
    }
    this._capacity = capacity;
    return true;
  }
  /**
   * @internal
   *
   * Shrink capacity.
   *
   * @param capacity - the new capacity
   */
  _shrink(capacity) {
    if (this._size > capacity) {
      const shifted = this._size - capacity;
      this._overflow(this._slice(0, shifted));
      this._shift(shifted);
    }
    if (this._isSequential()) {
      this._sequentialReset(capacity);
      return;
    }
    const diff = this._capacity - capacity;
    this._vals.copyWithin(this._head - diff, this._head, this._capacity);
    this._vals.length = capacity;
    this._head -= diff;
    this._capacity = capacity;
  }
  /**
   * @internal
   */
  _toIndex(externalIndex) {
    return (this._head + externalIndex) % this._capacity;
  }
  /**
   * @internal
   */
  _toList(items) {
    const out = new CircularArrayList(0);
    out._vals = items;
    out._size = items.length;
    out._capacity = items.length;
    return out;
  }
  /**
   * @internal
   */
  _toRanges(min, max) {
    const head = this._head;
    const mid = this._capacity - head;
    if (max <= mid) {
      return [[head + min, head + max]];
    }
    if (min >= mid) {
      return [[min - mid, max - mid]];
    }
    return [
      [head + min, this._capacity],
      [0, max - mid]
    ];
  }
}
class CircularDeque {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "_list");
    this._list = new CircularArrayList(capacity);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularDeque.name;
  }
  set capacity(capacity) {
    this._list.capacity = capacity;
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
  forEach(callbackfn, thisArg) {
    return this._list.forEach((v, i) => callbackfn.call(thisArg, v, i, this));
  }
  front() {
    return this._list.first();
  }
  has(value) {
    return this._list.has(value);
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
  push(...elems) {
    return this._list.push(...elems);
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
  unshift(...elems) {
    return this._list.unshift(...elems);
  }
  values() {
    return this._list.values();
  }
  addListener(event, listener) {
    this._list.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this._list.on(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this._list.removeListener(event, listener);
    return this;
  }
}
function copy$2(node, distance) {
  const root = { value: void 0 };
  let size = 0;
  let tail = root;
  while (node != null && size < distance) {
    const dupe = { value: node.value };
    tail.next = dupe;
    tail = dupe;
    ++size;
    node = node.next;
  }
  tail.next = void 0;
  return { root, size, tail };
}
function cut$2(prev, count) {
  const root = { value: void 0 };
  if (prev == null || count <= 0) {
    return { root, size: 0, tail: root };
  }
  const head = prev.next;
  const tail = get$1(head, count - 1);
  prev.next = tail.next;
  tail.next = void 0;
  root.next = head;
  return { root, size: count, tail };
}
function* entries$1(node) {
  for (let i = 0; node != null; ++i) {
    yield [i, node.value];
    node = node.next;
  }
}
function get$1(node, index) {
  if (index < 0) {
    return void 0;
  }
  for (let i = 0; node != null && i < index; ++i) {
    node = node.next;
  }
  return node;
}
function has$1(node, value) {
  while (node != null) {
    if (node.value === value) {
      return true;
    }
    node = node.next;
  }
  return false;
}
function* keys$1(node) {
  for (let i = 0; node != null; ++i) {
    yield i;
    node = node.next;
  }
}
function toList$2(values2) {
  const root = { value: void 0 };
  let size = 0;
  let tail = root;
  for (const value of values2) {
    tail.next = { value };
    tail = tail.next;
    ++size;
  }
  tail.next = void 0;
  return { root, size, tail };
}
function* values$1(node) {
  while (node != null) {
    yield node.value;
    node = node.next;
  }
}
function copy$1(node, distance) {
  const root = { value: void 0 };
  if (node == null || distance <= 0) {
    return { root, size: 0, tail: root };
  }
  let size = 0;
  let tail = root;
  while (node != null && size < distance) {
    const dupe = { value: node.value };
    tail.next = dupe;
    dupe.prev = tail;
    tail = dupe;
    ++size;
    node = node.next;
  }
  root.prev = void 0;
  tail.next = void 0;
  return { root, size, tail };
}
function cut$1(node, count) {
  const seg = cut$2(node, count);
  if (seg.size <= 0) {
    return seg;
  }
  seg.root.next.prev = seg.root;
  const next = node.next;
  if (next != null) {
    next.prev = node;
  }
  return seg;
}
function get(node, index) {
  if (index >= 0) {
    return get$1(node, index);
  }
  for (let i = 0; node != null && i > index; --i) {
    node = node.prev;
  }
  return node;
}
function toList$1(values2) {
  const root = { value: void 0 };
  let size = 0;
  let tail = root;
  for (const value of values2) {
    tail.next = { prev: tail, value };
    tail = tail.next;
    ++size;
  }
  root.prev = void 0;
  tail.next = void 0;
  return { root, size, tail };
}
class CircularDoublyLinkedList extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    __publicField(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    __publicField(this, "_isFinite");
    /**
     * @internal
     * The root of the linked list
     */
    __publicField(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    __publicField(this, "_size");
    /**
     * @internal
     * The last node in the linked list.
     */
    __publicField(this, "_tail");
    this._capacity = LINKED_MAX_LENGTH;
    this._isFinite = false;
    this._root = { value: void 0 };
    this._size = 0;
    this._tail = this._root;
    if (capacity == null) {
      return;
    }
    if (isNumber(capacity)) {
      this.capacity = capacity;
      return;
    }
    for (const vals of chunk(capacity, ARGS_MAX_LENGTH)) {
      this._insert(this._size, vals);
    }
    this._capacity = this._size;
    this._isFinite = true;
  }
  get capacity() {
    return this._isFinite ? this._capacity : Infinity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return CircularDoublyLinkedList.name;
  }
  set capacity(capacity) {
    capacity = +capacity;
    capacity = +capacity;
    if (isInfinity(capacity)) {
      capacity = LINKED_MAX_LENGTH;
      this._isFinite = false;
    } else if (isLinkedLength(capacity)) {
      this._isFinite = true;
    } else {
      throw new RangeError("Invalid capacity");
    }
    this._capacity = capacity;
    if (this._size <= capacity) {
      return;
    }
    const diff = this._size - capacity;
    const { root } = cut$1(this._root, diff);
    this._size -= diff;
    if (this._size <= 0) {
      this._tail = this._root;
    }
    for (const array of chunk(values$1(root.next), ARGS_MAX_LENGTH)) {
      this._overflow(array);
    }
  }
  at(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    return this._get(index).value;
  }
  clear() {
    this._size = 0;
    this._tail = this._root;
    this._root.next = void 0;
  }
  delete(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }
    const node = this._get(index);
    node.prev.next = node.next;
    if (node.next != null) {
      node.next.prev = node.prev;
    }
    --this._size;
    return true;
  }
  entries() {
    return entries$1(this._root.next);
  }
  fill(value, start, end) {
    start = toInteger(start, 0);
    start = clamp(addIfBelow(start, this._size), 0, this._size);
    end = toInteger(end, this._size);
    end = clamp(addIfBelow(end, this._size), 0, this._size);
    let node = this._get(start);
    while (start < end) {
      node.value = value;
      node = node.next;
      ++start;
    }
    return this;
  }
  forEach(callbackfn, thisArg) {
    let node = this._root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }
  has(value) {
    return has$1(this._root.next, value);
  }
  keys() {
    return keys$1(this._root.next);
  }
  pop() {
    if (this._size <= 0) {
      return void 0;
    }
    const { root } = this._cut(this._size - 1, 1);
    return root.next.value;
  }
  push(...values2) {
    this._insert(this._size, values2);
    return this._size;
  }
  set(index, value) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    const node = this._get(index);
    const prevValue = node.value;
    node.value = value;
    return prevValue;
  }
  shift() {
    if (this._size <= 0) {
      return void 0;
    }
    const { root } = this._cut(0, 1);
    return root.next.value;
  }
  slice(start, end) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    if (start >= end) {
      return new CircularDoublyLinkedList(0);
    }
    const node = this._get(start);
    const core = copy$1(node, end - start);
    const list = new CircularDoublyLinkedList(core.size);
    list._root = core.root;
    list._size = core.size;
    list._tail = core.tail;
    return list;
  }
  splice(start, deleteCount, ...items) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    deleteCount = clamp(toInteger(deleteCount, 0), 0, size - start);
    let list;
    if (deleteCount <= 0) {
      list = new CircularDoublyLinkedList(0);
    } else {
      const { root, size: size2, tail } = this._cut(start, deleteCount);
      list = new CircularDoublyLinkedList(size2);
      list._root = root;
      list._size = size2;
      list._tail = tail;
    }
    this._insert(start, items);
    return list;
  }
  [Symbol.iterator]() {
    return values$1(this._root.next);
  }
  unshift(...values2) {
    this._presert(0, values2);
    return this._size;
  }
  values() {
    return values$1(this._root.next);
  }
  /**
   * @internal
   */
  _cut(start, count) {
    const prev = this._get(start - 1);
    const seg = cut$1(prev, count);
    this._size -= count;
    if (start >= this._size) {
      this._tail = prev;
    }
    return seg;
  }
  /**
   * @internal
   */
  _get(index) {
    const mid = this._size / 2;
    return ++index <= mid ? get(this._root, index) : get(this._tail, index - this._size);
  }
  /**
   * @internal
   */
  _insert(index, values2) {
    const N = values2.length;
    if (N <= 0) {
      return;
    }
    if (this._capacity <= 0) {
      this._overflow(values2);
      return;
    }
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    if (!this._isFinite) {
      this._safeInsert(index, values2.slice(0, free));
      throw new Error("Out of memory");
    }
    if (index > 0) {
      const shifted = Math.min(index, N - free);
      const { root } = this._cut(0, shifted);
      this._overflow(values$1(root.next));
      index -= shifted;
      free += shifted;
    }
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    const mid = values2.length - free;
    this._overflow(values2.slice(0, mid));
    this._safeInsert(0, values2.slice(mid));
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(evicted) {
    if (!Array.isArray(evicted)) {
      evicted = Array.from(evicted);
    }
    this._emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * @internal
   */
  _presert(index, values2) {
    const N = values2.length;
    if (N <= 0) {
      return;
    }
    if (this._capacity <= 0) {
      this._overflow(values2);
      return;
    }
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    if (!this._isFinite) {
      this._safeInsert(0, values2.slice(values2.length - free));
      throw new Error("Out of memory");
    }
    if (index < this._size) {
      const popped = Math.min(this._size - index, N - free);
      const { root } = this._cut(this._size - popped, popped);
      this._overflow(values$1(root.next));
      free += popped;
    }
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    this._overflow(values2.slice(free));
    this._safeInsert(this._size, values2.slice(0, free));
  }
  /**
   * @internal
   */
  _safeInsert(index, values2) {
    if (values2.length <= 0) {
      return;
    }
    const { root, size, tail } = toList$1(values2);
    const head = root.next;
    const prev = this._get(index - 1);
    const next = prev.next;
    head.prev = prev;
    tail.next = next;
    prev.next = head;
    if (next != null) {
      next.prev = tail;
    }
    this._tail = index < this._size ? this._tail : tail;
    this._size += size;
  }
}
class CircularLinkedDeque {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "_list");
    this._list = new CircularDoublyLinkedList(capacity);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularLinkedDeque.name;
  }
  set capacity(capacity) {
    this._list.capacity = capacity;
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
  forEach(callbackfn, thisArg) {
    this._list.forEach((v, i) => callbackfn.call(thisArg, v, i, this), thisArg);
  }
  has(value) {
    return this._list.has(value);
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
  push(...elems) {
    return this._list.push(...elems);
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
  unshift(...elems) {
    return this._list.unshift(...elems);
  }
  values() {
    return this._list.values();
  }
  addListener(event, listener) {
    this._list.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this._list.on(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this._list.removeListener(event, listener);
    return this;
  }
}
class CircularLinkedList extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    __publicField(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    __publicField(this, "_isFinite");
    /**
     * @internal
     * The root of the linked list
     */
    __publicField(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    __publicField(this, "_size");
    /**
     * @internal
     * The last node in the linked list.
     */
    __publicField(this, "_tail");
    this._capacity = LINKED_MAX_LENGTH;
    this._isFinite = false;
    this._root = { value: void 0 };
    this._size = 0;
    this._tail = this._root;
    if (capacity == null) {
      return;
    }
    if (isNumber(capacity)) {
      this.capacity = capacity;
      return;
    }
    for (const vals of chunk(capacity, ARGS_MAX_LENGTH)) {
      this._insert(this._size, vals);
    }
    this._capacity = this._size;
    this._isFinite = true;
  }
  get capacity() {
    return this._isFinite ? this._capacity : Infinity;
  }
  get size() {
    return this._size;
  }
  get [Symbol.toStringTag]() {
    return CircularLinkedList.name;
  }
  set capacity(capacity) {
    capacity = +capacity;
    if (isInfinity(capacity)) {
      capacity = LINKED_MAX_LENGTH;
      this._isFinite = false;
    } else if (isLinkedLength(capacity)) {
      this._isFinite = true;
    } else {
      throw new RangeError("Invalid capacity");
    }
    this._capacity = capacity;
    if (this._size <= capacity) {
      return;
    }
    const diff = this._size - capacity;
    const { root } = cut$2(this._root, diff);
    this._size -= diff;
    if (this._size <= 0) {
      this._tail = this._root;
    }
    this._overflow(root.next);
  }
  at(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    return this._get(index).value;
  }
  clear() {
    this._size = 0;
    this._tail = this._root;
    this._root.next = void 0;
  }
  delete(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }
    this._cut(index, 1);
    return true;
  }
  entries() {
    return entries$1(this._root.next);
  }
  fill(value, start, end) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    if (start >= end) {
      return this;
    }
    let node = this._get(start);
    for (let i = start; i < end; ++i) {
      node.value = value;
      node = node.next;
    }
    return this;
  }
  forEach(callbackfn, thisArg) {
    let node = this._root;
    for (let i = 0; i < this._size; ++i) {
      node = node.next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }
  has(value) {
    return has$1(this._root.next, value);
  }
  keys() {
    return keys$1(this._root.next);
  }
  pop() {
    if (this._size <= 0) {
      return void 0;
    }
    const { root } = this._cut(this._size - 1, 1);
    return root.next.value;
  }
  push(...values2) {
    this._insert(this._size, values2);
    return this._size;
  }
  set(index, value) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    const node = this._get(index);
    const prevValue = node.value;
    node.value = value;
    return prevValue;
  }
  shift() {
    if (this._size <= 0) {
      return void 0;
    }
    const { root } = this._cut(0, 1);
    return root.next.value;
  }
  slice(start, end) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    if (start >= end) {
      return new CircularLinkedList(0);
    }
    const node = this._get(start);
    const core = copy$2(node, end - start);
    const list = new CircularLinkedList(core.size);
    list._root = core.root;
    list._size = core.size;
    list._tail = core.tail;
    return list;
  }
  splice(start, deleteCount, ...items) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    deleteCount = clamp(toInteger(deleteCount, 0), 0, size - start);
    let list;
    if (deleteCount <= 0) {
      list = new CircularLinkedList(0);
    } else {
      const { root, size: size2, tail } = this._cut(start, deleteCount);
      list = new CircularLinkedList(deleteCount);
      list._root = root;
      list._size = size2;
      list._tail = tail;
    }
    this._insert(start, items);
    return list;
  }
  [Symbol.iterator]() {
    return values$1(this._root.next);
  }
  unshift(...values2) {
    this._presert(0, values2);
    return this._size;
  }
  values() {
    return values$1(this._root.next);
  }
  /**
   * @internal
   */
  _cut(start, count) {
    const prev = this._get(start - 1);
    const core = cut$2(prev, count);
    this._size -= count;
    if (start >= this._size) {
      this._tail = prev;
    }
    return core;
  }
  /**
   * @internal
   */
  _get(index) {
    return ++index == this._size ? this._tail : get$1(this._root, index);
  }
  /**
   * @internal
   */
  _insert(index, values2) {
    const N = values2.length;
    if (N <= 0) {
      return;
    }
    if (this._capacity <= 0) {
      this._overflow(values2);
      return;
    }
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    if (!this._isFinite) {
      this._safeInsert(index, values2.slice(0, free));
      throw new Error("Out of memory");
    }
    if (index > 0) {
      const shifted = Math.min(index, N - free);
      const { root } = this._cut(0, shifted);
      this._overflow(root.next);
      index -= shifted;
      free += shifted;
    }
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    const mid = values2.length - free;
    this._overflow(values2.slice(0, mid));
    this._safeInsert(0, values2.slice(mid));
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(evicted) {
    if (evicted == null) {
      return;
    }
    if (Array.isArray(evicted)) {
      this._emitter.emit(BoundedEvent.Overflow, evicted);
      return;
    }
    for (const array of chunk(values$1(evicted), ARGS_MAX_LENGTH)) {
      this._emitter.emit(BoundedEvent.Overflow, array);
    }
  }
  /**
   * @internal
   */
  _presert(index, values2) {
    const N = values2.length;
    if (N <= 0) {
      return;
    }
    if (this._capacity <= 0) {
      this._overflow(values2);
      return;
    }
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    if (!this._isFinite) {
      this._safeInsert(0, values2.slice(values2.length - free));
      throw new Error("Out of memory");
    }
    if (index < this._size) {
      const popped = Math.min(this._size - index, N - free);
      const { root } = this._cut(this._size - popped, popped);
      this._overflow(root.next);
      free += popped;
    }
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    this._overflow(values2.slice(free));
    this._safeInsert(this._size, values2.slice(0, free));
  }
  /**
   * @internal
   */
  _safeInsert(index, values2) {
    if (values2.length <= 0) {
      return;
    }
    const { root, size, tail } = toList$2(values2);
    const prev = this._get(index - 1);
    tail.next = prev.next;
    prev.next = root.next;
    this._tail = index < this._size ? this._tail : tail;
    this._size += size;
  }
}
function adjustSpan(stack, diff, min = 0) {
  const Y = stack.length;
  for (let y = min >= 0 ? min : 0; y < Y; ++y) {
    const levels2 = stack[y].node.levels;
    const { next, span } = levels2[y];
    levels2[y] = { next, span: span + diff };
  }
}
function calcMaxLevel(probability, expectedSize) {
  if (probability <= 0 || expectedSize <= 1) {
    return 1;
  }
  if (probability >= 1) {
    return Infinity;
  }
  return Math.ceil(log(expectedSize, 1 / probability));
}
function copy(node, distance) {
  let size = 0;
  const root = toNode(void 0);
  const tails = [root];
  if (node == null || distance <= 0) {
    return { root, size, tails };
  }
  let maxY = 1;
  const indexes = [-1];
  while (node != null && size < distance) {
    const Y = node.levels.length;
    while (maxY < Y) {
      tails[maxY] = root;
      indexes[maxY] = -1;
      ++maxY;
    }
    const dupe = toNode(node.value, Y);
    for (let y = 0; y < Y; ++y) {
      tails[y].levels[y] = { next: dupe, span: size - indexes[y] };
    }
    tails.fill(dupe, 0, Y);
    indexes.fill(size, 0, Y);
    const { next, span } = node.levels[0];
    node = next;
    size += span;
  }
  for (let y = 0; y < maxY; ++y) {
    tails[y].levels[y] = { next: void 0, span: distance - indexes[y] };
  }
  return { root, size, tails };
}
function cut(core, start, end) {
  const segRoot = toNode(void 0);
  const seg = { root: segRoot, size: 0, tails: [segRoot] };
  if (start >= end || end <= 0 || start >= core.size) {
    return seg;
  }
  const prevStack = getStack(core, start - 1);
  const tailStack = getStack(core, end - 1, Array.from(prevStack));
  let nextI = prevStack[0].index + prevStack[0].node.levels[0].span;
  start = clamp(start, prevStack[0].index, nextI);
  nextI = tailStack[0].index + tailStack[0].node.levels[0].span;
  end = clamp(end, tailStack[0].index, nextI);
  if (start >= end) {
    return seg;
  }
  const size = end - start;
  seg.size = size;
  let y;
  let Y = prevStack.length;
  for (y = 0; y < Y; ++y) {
    const prev = prevStack[y];
    const tail = tailStack[y];
    if (prev.index >= tail.index) {
      break;
    }
    let edge = prev.node.levels[y];
    let span = prev.index + edge.span - start;
    segRoot.levels[y] = { next: edge.next, span };
    edge = tail.node.levels[y];
    span = tail.index - prev.index + (edge.span - size);
    prev.node.levels[y] = { next: edge.next, span };
    tail.node.levels[y] = { next: void 0, span: end - tail.index };
    seg.tails[y] = tail.node;
  }
  adjustSpan(prevStack, -size, y);
  if (y >= Y) {
    const levels2 = core.root.levels;
    while (y > 1 && levels2[y - 1].next == null) {
      --y;
    }
    Y = y;
    levels2.length = Y;
    core.tails.length = Y;
  }
  core.size -= size;
  if (start >= core.size) {
    for (y = 0; y < Y; ++y) {
      core.tails[y] = prevStack[y].node;
    }
  }
  return seg;
}
function* entries(node) {
  let i = 0;
  while (node != null) {
    yield [i, node.value];
    const { next, span } = node.levels[0];
    node = next;
    i += span;
  }
}
function getEntry(core, target) {
  if (target < 0) {
    return { index: -1, node: core.root };
  }
  const tails = core.tails;
  let index = core.size - tails[0].levels[0].span;
  if (target >= index) {
    return { index, node: tails[0] };
  }
  index = -1;
  let y;
  let node = core.root;
  for (y = node.levels.length - 1; y >= 0 && index < target; --y) {
    const i = core.size - tails[y].levels[y].span;
    if (i > target) {
      break;
    }
    index = i;
    node = tails[y];
  }
  while (y >= 0 && index < target) {
    const { next, span } = node.levels[y];
    if (index + span > target || next == null) {
      --y;
    } else {
      index += span;
      node = next;
    }
  }
  return { index, node };
}
function getStack(core, target, stack = toStack(core.root, -1)) {
  const Y = stack.length;
  if (Y <= 0 || target <= stack[0].index) {
    return stack;
  }
  const size = core.size;
  const tails = core.tails;
  if (target >= size - tails[0].levels[0].span) {
    for (let y2 = 0; y2 < Y; ++y2) {
      const index = size - tails[y2].levels[y2].span;
      stack[y2] = { index, node: tails[y2] };
    }
    return stack;
  }
  let y;
  for (y = Y - 1; y >= 0 && stack[y].index < target; --y) {
    const i = size - tails[y].levels[y].span;
    if (i > target) {
      break;
    }
    stack[y] = { index: i, node: tails[y] };
  }
  while (y >= 0 && stack[y].index < target) {
    const { index, node } = stack[y];
    const { next, span } = node.levels[y];
    if (index + span <= target && next != null) {
      stack[y] = { index: index + span, node: next };
    } else {
      --y;
    }
  }
  if (y > 0) {
    const { index, node } = stack[y];
    for (let i = 0; i < y; ++i) {
      stack[i] = { index, node };
    }
  }
  return stack;
}
function has(node, value) {
  while (node != null) {
    if (node.value === value) {
      return true;
    }
    node = node.levels[0].next;
  }
  return false;
}
function increaseLevels(core, levels2) {
  const { root, size, tails } = core;
  for (let y = tails.length; y < levels2; ++y) {
    root.levels[y] = { next: void 0, span: size + 1 };
    tails[y] = root;
  }
}
function insert(dest, index, src) {
  if (src.size <= 0) {
    return;
  }
  const minY = src.tails.length;
  increaseLevels(dest, minY);
  const prevs = getStack(dest, index - 1);
  for (let y = 0; y < minY; ++y) {
    const prev = prevs[y].node;
    const tail = src.tails[y];
    const prevEdge = prev.levels[y];
    const tailEdge = tail.levels[y];
    let span = prevs[y].index - index + prevEdge.span + tailEdge.span;
    tail.levels[y] = { next: prevEdge.next, span };
    const rootEdge = src.root.levels[y];
    span = index - prevs[y].index + (rootEdge.span - 1);
    prev.levels[y] = { next: rootEdge.next, span };
  }
  adjustSpan(prevs, src.size, minY);
  if (index === dest.size) {
    for (let y = 0; y < minY; ++y) {
      dest.tails[y] = src.tails[y];
    }
  }
  dest.size += src.size;
}
function* keys(node) {
  let i = 0;
  while (node != null) {
    yield i;
    const { next, span } = node.levels[0];
    node = next;
    i += span;
  }
}
function toList(levels2, values2) {
  let Y = -Infinity;
  const size = Math.min(levels2.length, values2.length);
  for (let y = 0; y < size; ++y) {
    Y = Y >= levels2[y] ? Y : levels2[y];
  }
  if (Y <= 0 || size <= 0) {
    const root2 = toNode(void 0);
    return { root: root2, size: 0, tails: [root2] };
  }
  const root = toNode(void 0, Y, size + 1);
  const tails = new Array(Y).fill(root);
  for (let i = 0; i < size; ++i) {
    Y = levels2[i];
    const span = size - i;
    const next = toNode(values2[i], Y, span);
    for (let y = 0; y < Y; ++y) {
      const levels3 = tails[y].levels;
      levels3[y] = { next, span: levels3[y].span - span };
      tails[y] = next;
    }
  }
  return { root, size, tails };
}
function toNode(value, levels2 = 1, span = 1, next) {
  const array = new Array(levels2);
  for (let i = 0; i < levels2; ++i) {
    array[i] = { next, span };
  }
  return { value, levels: array };
}
function toStack(node, index = 0) {
  const N = node.levels.length;
  const stack = new Array(N);
  for (let i = 0; i < N; ++i) {
    stack[i] = { index, node };
  }
  return stack;
}
function truncateLevels(node, level) {
  if (node == null || node.levels.length <= level) {
    return;
  }
  while (node != null) {
    const next = node.levels[level].next;
    node.levels.length = level;
    node = next;
  }
}
function* values(node) {
  while (node != null) {
    yield node.value;
    node = node.levels[0].next;
  }
}
class CircularSkipList extends CircularBase {
  constructor(config) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    __publicField(this, "_capacity");
    /**
     * @internal
     * Whether capacity is finite (true) or infinite (false).
     */
    __publicField(this, "_isFinite");
    /**
     * @internal
     * The maximum number of levels in the skip list.
     */
    __publicField(this, "_maxLevel");
    /**
     * @internal
     * The probability factor used to randomly determine the levels
     * of new nodes. Should be a value between 0 and 1, where a lower
     * value results in fewer levels on average.
     */
    __publicField(this, "_p");
    /**
     * @internal
     * The root of the skip list
     */
    __publicField(this, "_root");
    /**
     * @internal
     * The current size of the list (0 \<= size \<= capacity)
     */
    __publicField(this, "_size");
    /**
     * @internal
     * The last nodes in the skip list at each level.
     */
    __publicField(this, "_tails");
    this._capacity = LINKED_MAX_LENGTH;
    this._isFinite = false;
    this._p = 0.5;
    this._maxLevel = calcMaxLevel(this._p, LINKED_MAX_LENGTH);
    this._root = toNode(void 0);
    this._size = 0;
    this._tails = [this._root];
    if (config == null) {
      return;
    }
    if (isNumber(config)) {
      this.capacity = config;
      return;
    }
    if (!isIterable(config)) {
      this.capacity = config.capacity ?? this._capacity;
      this.p = config.p ?? this._p;
      const size = config.expectedSize ?? this._capacity;
      this.maxLevel = config.maxLevel ?? calcMaxLevel(this._p, size);
      return;
    }
    for (const vals of chunk(config, ARGS_MAX_LENGTH)) {
      this._insert(this._size, vals);
    }
    this._capacity = this._size;
    this._isFinite = true;
  }
  get capacity() {
    return this._isFinite ? this._capacity : Infinity;
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
    return CircularSkipList.name;
  }
  set capacity(capacity) {
    capacity = +capacity;
    if (isInfinity(capacity)) {
      capacity = LINKED_MAX_LENGTH;
      this._isFinite = false;
    } else if (isLinkedLength(capacity)) {
      this._isFinite = true;
    } else {
      throw new RangeError("Invalid capacity");
    }
    this._capacity = capacity;
    if (this._size <= capacity) {
      return;
    }
    const { root } = this._cut(0, this._size - capacity);
    this._overflow(root.levels[0].next);
  }
  set maxLevel(maxLevel) {
    maxLevel = +maxLevel;
    if (!isArrayLength(maxLevel) || maxLevel <= 0) {
      throw new RangeError("Invalid maxLevel");
    }
    this._maxLevel = maxLevel;
    if (maxLevel < this.levels) {
      truncateLevels(this._root, maxLevel);
    }
  }
  set p(p) {
    p = +p;
    if (isNaN(p) || p < 0 || p > 1) {
      throw new RangeError("Invalid p");
    }
    this._p = p;
  }
  at(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    const core = { root: this._root, size: this._size, tails: this._tails };
    return getEntry(core, index).node.value;
  }
  clear() {
    this._size = 0;
    this._tails = [this._root];
    this._root.levels.length = 1;
    this._root.levels[0] = { next: void 0, span: 1 };
  }
  delete(index) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return false;
    }
    this._cut(index, 1);
    return true;
  }
  entries() {
    return entries(this._root.levels[0].next);
  }
  fill(value, start, end) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    if (start >= end) {
      return this;
    }
    const core = { root: this._root, size: this._size, tails: this._tails };
    let { node } = getEntry(core, start);
    for (let i = start; i < end; ++i) {
      node.value = value;
      node = node.levels[0].next;
    }
    return this;
  }
  forEach(callbackfn, thisArg) {
    let node = this._root;
    for (let i = 0; i < this._size; ++i) {
      node = node.levels[0].next;
      callbackfn.call(thisArg, node.value, i, this);
    }
  }
  has(value) {
    return has(this._root.levels[0].next, value);
  }
  keys() {
    return keys(this._root.levels[0].next);
  }
  pop() {
    if (this._size <= 0) {
      return void 0;
    }
    const { root } = this._cut(this._size - 1, 1);
    return root.levels[0].next.value;
  }
  push(...values2) {
    this._insert(this._size, values2);
    return this._size;
  }
  set(index, value) {
    index = addIfBelow(toInteger(index, -Infinity), this._size);
    if (!isInRange(index, 0, this._size)) {
      return void 0;
    }
    const core = { root: this._root, size: this._size, tails: this._tails };
    const { node } = getEntry(core, index);
    const prevValue = node.value;
    node.value = value;
    return prevValue;
  }
  shift() {
    if (this._size <= 0) {
      return void 0;
    }
    const { root } = this._cut(0, 1);
    return root.levels[0].next.value;
  }
  slice(start, end) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    end = clamp(addIfBelow(toInteger(end, size), size), start, size);
    const config = {
      capacity: 0,
      p: this._p,
      maxLevel: this._maxLevel
    };
    if (start >= end) {
      return new CircularSkipList(config);
    }
    const core = { root: this._root, size: this._size, tails: this._tails };
    const seg = copy(getEntry(core, start).node, end - start);
    config.capacity = seg.size;
    const list = new CircularSkipList(config);
    list._root = seg.root;
    list._tails = seg.tails;
    list._size = seg.size;
    return list;
  }
  splice(start, deleteCount, ...items) {
    const size = this._size;
    start = clamp(addIfBelow(toInteger(start, 0), size), 0, size);
    deleteCount = clamp(toInteger(deleteCount, 0), 0, size - start);
    const core = this._cut(start, deleteCount);
    this._insert(start, items);
    const list = new CircularSkipList({
      capacity: deleteCount,
      p: this._p,
      maxLevel: this._maxLevel
    });
    list._root = core.root;
    list._tails = core.tails;
    list._size = core.size;
    return list;
  }
  [Symbol.iterator]() {
    return this.values();
  }
  unshift(...values2) {
    this._presert(0, values2);
    return this._size;
  }
  values() {
    return values(this._root.levels[0].next);
  }
  /**
   * @internal
   */
  _cut(start, count) {
    const core = { root: this._root, size: this._size, tails: this._tails };
    const seg = cut(core, start, start + count);
    this._size = core.size;
    this._tails = core.tails;
    return seg;
  }
  /**
   * @internal
   */
  _genLevels(N) {
    const levels = new Array(N);
    const maxLevel = this._maxLevel - 1;
    for (let i = 0; i < N; ++i) {
      levels[i] = 1 + simulateWinStreak(this._p, maxLevel - 1);
    }
    return levels;
  }
  /**
   * @internal
   */
  _insert(index, values2) {
    const N = values2.length;
    if (N <= 0) {
      return;
    }
    if (this._capacity <= 0) {
      this._overflow(values2);
      return;
    }
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    if (!this._isFinite) {
      this._safeInsert(index, values2.slice(0, free));
      throw new Error("Out of memory");
    }
    if (index > 0) {
      const shifted = Math.min(index, N - free);
      const { root } = this._cut(0, shifted);
      this._overflow(root.levels[0].next);
      index -= shifted;
      free += shifted;
    }
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    const mid = values2.length - free;
    this._overflow(values2.slice(0, mid));
    this._safeInsert(0, values2.slice(mid));
  }
  /**
   * @internal
   *
   * Emit an overflow event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  _overflow(evicted) {
    if (evicted == null) {
      return;
    }
    if (Array.isArray(evicted)) {
      this._emitter.emit(BoundedEvent.Overflow, evicted);
      return;
    }
    for (const array of chunk(values(evicted), ARGS_MAX_LENGTH)) {
      this._emitter.emit(BoundedEvent.Overflow, array);
    }
  }
  /**
   * @internal
   */
  _presert(index, values2) {
    const N = values2.length;
    if (N <= 0) {
      return;
    }
    if (this._capacity <= 0) {
      this._overflow(values2);
      return;
    }
    let free = this._capacity - this._size;
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    if (!this._isFinite) {
      this._safeInsert(0, values2.slice(values2.length - free));
      throw new Error("Out of memory");
    }
    if (index < this._size) {
      const popped = Math.min(this._size - index, N - free);
      const { root } = this._cut(this._size - popped, popped);
      this._overflow(root.levels[0].next);
      free += popped;
    }
    if (free >= N) {
      this._safeInsert(index, values2);
      return;
    }
    this._overflow(values2.slice(free));
    this._safeInsert(this._size, values2.slice(0, free));
  }
  /**
   * @internal
   */
  _safeInsert(index, values2) {
    const levels = this._genLevels(values2.length);
    const seg = toList(levels, values2);
    const core = { root: this._root, size: this._size, tails: this._tails };
    insert(core, index, seg);
    this._size = core.size;
    this._tails = core.tails;
  }
}
class CircularMap extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    __publicField(this, "_capacity");
    /**
     * @internal
     * The internal map.
     */
    __publicField(this, "_map");
    this._capacity = Infinity;
    this._map = /* @__PURE__ */ new Map();
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }
    if (isNumber(capacity)) {
      if (!isSafeCount(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      return;
    }
    this._map = new Map(capacity);
    this._capacity = this._map.size;
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
    return CircularMap.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(capacity) {
    capacity = +capacity;
    if (!isInfinity(capacity) && !isSafeCount(capacity)) {
      throw new RangeError("Invalid capacity");
    }
    if (capacity === this._capacity) {
      return;
    }
    this._capacity = capacity;
    if (this.size <= capacity) {
      return;
    }
    if (capacity === 0) {
      const evicted2 = Array.from(this._map);
      this.clear();
      this._emitter.emit(BoundedEvent.Overflow, evicted2);
      return;
    }
    const evicted = [];
    const iter = this._map.entries();
    for (let n = this.size - capacity; n > 0; --n) {
      const entry = iter.next().value;
      this._map.delete(entry[0]);
      evicted.push(entry);
    }
    this._emitter.emit(BoundedEvent.Overflow, evicted);
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
  delete(key) {
    return this._map.delete(key);
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
  forEach(callbackfn, thisArg) {
    for (const [key, value] of this._map.entries()) {
      callbackfn.call(thisArg, value, key, this);
    }
  }
  /**
   * Returns the associated value of the given key from the map.
   *
   * If the associated value is an object, then you will get a reference to that object; any change made to the object will effectively modify it inside the map.
   *
   * @returns the value associated with the specified key, or `undefined` if no value is associated.
   */
  get(key) {
    return this._map.get(key);
  }
  /**
   * Determines whether a given value is in the map.
   *
   * @param key - The key to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(key) {
    return this._map.has(key);
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
  set(key, value) {
    if (this.capacity < 1) {
      this._emitter.emit(BoundedEvent.Overflow, [[key, value]]);
      return this;
    }
    const evicted = [];
    if (!this._map.delete(key) && this.size >= this.capacity) {
      const entry = this._map.entries().next().value;
      this._map.delete(entry[0]);
      evicted.push(entry);
    }
    this._map.set(key, value);
    if (evicted.length > 0) {
      this._emitter.emit(BoundedEvent.Overflow, evicted);
    }
    return this;
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
class CircularLinkedQueue {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "_list");
    this._list = new CircularLinkedList(capacity);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularLinkedQueue.name;
  }
  set capacity(capacity) {
    this._list.capacity = capacity;
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
  forEach(callbackfn, thisArg) {
    this._list.forEach((v, i) => callbackfn.call(thisArg, v, i, this), thisArg);
  }
  front() {
    return this._list.at(0);
  }
  has(value) {
    return this._list.has(value);
  }
  keys() {
    return this._list.keys();
  }
  push(...elems) {
    return this._list.push(...elems);
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
  addListener(event, listener) {
    this._list.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this._list.on(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this._list.removeListener(event, listener);
    return this;
  }
}
class CircularQueue {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "_list");
    this._list = new CircularArrayList(capacity);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularQueue.name;
  }
  set capacity(capacity) {
    this._list.capacity = capacity;
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
  forEach(callbackfn, thisArg) {
    return this._list.forEach((v, i) => callbackfn.call(thisArg, v, i, this));
  }
  front() {
    return this._list.first();
  }
  has(value) {
    return this._list.has(value);
  }
  keys() {
    return this._list.keys();
  }
  push(...elems) {
    return this._list.push(...elems);
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
  addListener(event, listener) {
    this._list.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this._list.on(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this._list.removeListener(event, listener);
    return this;
  }
}
class CircularSet extends CircularBase {
  constructor(capacity) {
    super();
    /**
     * @internal
     * The maximum number of elements that can be stored in the collection.
     */
    __publicField(this, "_capacity");
    /**
     * @internal
     * The internal set.
     */
    __publicField(this, "_set");
    this._capacity = Infinity;
    this._set = /* @__PURE__ */ new Set();
    capacity = capacity ?? Infinity;
    if (isInfinity(capacity)) {
      return;
    }
    if (isNumber(capacity)) {
      if (!isSafeCount(capacity)) {
        throw new RangeError("Invalid capacity");
      }
      this._capacity = capacity;
      return;
    }
    this._set = new Set(capacity);
    this._capacity = this._set.size;
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
    return CircularSet.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(capacity) {
    capacity = +capacity;
    if (!isInfinity(capacity) && !isSafeCount(capacity)) {
      throw new RangeError("Invalid capacity");
    }
    if (capacity === this._capacity) {
      return;
    }
    this._capacity = capacity;
    if (this.size <= capacity) {
      return;
    }
    if (capacity === 0) {
      const evicted2 = Array.from(this._set);
      this.clear();
      this._emitter.emit(BoundedEvent.Overflow, evicted2);
      return;
    }
    const evicted = [];
    const iter = this._set.values();
    for (let n = this.size - capacity; n > 0; --n) {
      const value = iter.next().value;
      this._set.delete(value);
      evicted.push(value);
    }
    this._emitter.emit(BoundedEvent.Overflow, evicted);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(value) {
    if (this.capacity < 1) {
      this._emitter.emit(BoundedEvent.Overflow, [value]);
      return this;
    }
    const evicted = [];
    if (!this._set.delete(value) && this.size >= this.capacity) {
      const out = this._set.values().next().value;
      this._set.delete(out);
      evicted.push(out);
    }
    this._set.add(value);
    if (evicted.length > 0) {
      this._emitter.emit(BoundedEvent.Overflow, evicted);
    }
    return this;
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
  delete(value) {
    return this._set.delete(value);
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
  forEach(callbackfn, thisArg) {
    for (const key of this._set.keys()) {
      callbackfn.call(thisArg, key, key, this);
    }
  }
  /**
   * Determines whether a given value is in the set.
   *
   * @param value - The value to search for.
   *
   * @returns `true` if the value was found, `false` otherwise.
   */
  has(value) {
    return this._set.has(value);
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
class CircularLinkedStack {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "_list");
    this._list = new CircularDoublyLinkedList(capacity);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularLinkedStack.name;
  }
  set capacity(capacity) {
    this._list.capacity = capacity;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  forEach(callbackfn, thisArg) {
    this._list.forEach((v, i) => callbackfn.call(thisArg, v, i, this), thisArg);
  }
  has(value) {
    return this._list.has(value);
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
  push(...elems) {
    return this._list.push(...elems);
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
  addListener(event, listener) {
    this._list.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this._list.on(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this._list.removeListener(event, listener);
    return this;
  }
}
class CircularStack {
  constructor(capacity) {
    /**
     * @internal
     */
    __publicField(this, "_list");
    this._list = new CircularArrayList(capacity);
  }
  get capacity() {
    return this._list.capacity;
  }
  get size() {
    return this._list.size;
  }
  get [Symbol.toStringTag]() {
    return CircularStack.name;
  }
  set capacity(capacity) {
    this._list.capacity = capacity;
  }
  clear() {
    this._list.clear();
  }
  entries() {
    return this._list.entries();
  }
  forEach(callbackfn, thisArg) {
    return this._list.forEach((v, i) => callbackfn.call(thisArg, v, i, this));
  }
  has(value) {
    return this._list.has(value);
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
  push(...elems) {
    return this._list.push(...elems);
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
  addListener(event, listener) {
    this._list.addListener(event, listener);
    return this;
  }
  on(event, listener) {
    this._list.on(event, listener);
    return this;
  }
  removeListener(event, listener) {
    this._list.removeListener(event, listener);
    return this;
  }
}
exports.BoundedEvent = BoundedEvent;
exports.CircularArrayList = CircularArrayList;
exports.CircularDeque = CircularDeque;
exports.CircularDoublyLinkedList = CircularDoublyLinkedList;
exports.CircularLinkedDeque = CircularLinkedDeque;
exports.CircularLinkedList = CircularLinkedList;
exports.CircularLinkedQueue = CircularLinkedQueue;
exports.CircularLinkedStack = CircularLinkedStack;
exports.CircularMap = CircularMap;
exports.CircularQueue = CircularQueue;
exports.CircularSet = CircularSet;
exports.CircularSkipList = CircularSkipList;
exports.CircularStack = CircularStack;
//# sourceMappingURL=circle-ds.cjs.map
