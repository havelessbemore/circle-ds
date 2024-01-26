/*! circle-ds
https://github.com/havelessbemore/circle-ds

Copyright (C) 2024-2024 Michael Rojas <dev.michael.rojas@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
var n = Object.defineProperty;
var c = (e, t, s) => t in e ? n(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var l = (e, t, s) => (c(e, typeof t != "symbol" ? t + "" : t, s), s);
function v(e) {
  return typeof e == "function";
}
function f(e) {
  return v(e == null ? void 0 : e[Symbol.iterator]);
}
class o {
  constructor(t, ...s) {
    /**
     * The index representing the first element in the collection.
     * @internal
     */
    l(this, "head");
    /**
     * The number of elements in the collection.
     * @internal
     */
    l(this, "_size");
    /**
     * The index one more than the last element in the collection.
     * @internal
     */
    l(this, "tail");
    /**
     * The values in the collection.
     * @internal
     */
    l(this, "vals");
    this.head = 0, this._size = 0, this.tail = 0, this.vals = [];
    const h = arguments.length;
    h < 1 || (h === 1 && typeof t == "number" ? this.vals.length = t : h === 1 && f(t) ? (this.vals = Array.from(t), this._size = this.vals.length) : (this.vals = s, this.vals.push(t), this._size = this.vals.length, this.tail = this._size - 1, this.head = this.tail));
  }
  /**
   * Creates a collection from an iterable object.
   *
   * @param iterable - an iterable object to convert to a collection.
   */
  static from(t) {
    const s = new this(0);
    return s.vals = Array.from(t), s._size = s.vals.length, s;
  }
  /**
   * Creates a collection from a variable number of arguments.
   *
   * @param elements - the elements to be inserted into the collection.
   */
  static of(...t) {
    const s = new this(0);
    return s.vals = t, s._size = t.length, s;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this.vals.length;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, !Number.isSafeInteger(t) || t < 0)
      throw new RangeError("Invalid capacity");
    const s = this.capacity;
    this._size <= 0 || t == 0 ? (this.head = 0, this.tail = 0, this._size = 0, this.vals.length = t) : t > s ? this.grow(t) : t < s && this.shrink(t);
  }
  /**
   *  @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this.head = 0, this._size = 0, this.tail = 0, this.vals = new Array(this.capacity);
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
      yield [t, this.vals[this.toInt(t)]];
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(t, s) {
    const h = this._size;
    for (let i = 0; i < h && i < this._size; ++i) {
      const r = this.vals[this.toInt(i)];
      t.call(s, r, i, this);
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
    const s = this._size;
    for (let h = 0; h < s && h < this._size; ++h)
      if (this.vals[this.toInt(h)] === t)
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
      yield this.vals[this.toInt(t)];
  }
  /**
   * Converts an external index to an internal index
   * @internal
   *
   * @param ext - The external index
   *
   * @returns The internal index
   */
  toInt(t) {
    return (this.head + t) % this.capacity;
  }
  /**
   * Grow capacity.
   * @internal
   *
   * @param newCapacity - the new capacity
   */
  grow(t) {
    const s = this.capacity, h = this.head + this._size;
    if (this.vals.length = t, h <= s) {
      this.tail = h;
      return;
    }
    const i = Math.min(this.tail, t - s);
    this.vals.copyWithin(s, 0, i), this.vals.fill(void 0, this.tail - i, i), this.vals.copyWithin(0, i, this.tail), this.vals.fill(void 0, Math.max(i, this.tail - i), this.tail), this.tail = h % t;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param newCapacity - the new capacity
   */
  shrink(t) {
    this._size = Math.min(this._size, t), this.tail = this.head + this._size, this.tail <= t ? (this.tail %= t, this.vals.length = t) : (this.tail %= this.capacity, this.vals = Array.from(this), this.tail = this._size % t, this.head = 0);
  }
}
class u extends o {
  /**
   * Get the element at the front of the queue.
   *
   * @returns the earliest inserted element, or `undefined` if empty.
   */
  front() {
    return this._size <= 0 ? void 0 : this.vals[this.head];
  }
  /**
   * Inserts new elements at the end of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...t) {
    const s = this.capacity;
    if (s < 1)
      return Array.from(t);
    const h = t.length, i = [];
    for (let r = 0; r < h; ++r) {
      const a = this.vals[this.tail];
      this.vals[this.tail] = t[r], this.tail = this.toInt(this._size + 1), this._size < s ? ++this._size : (this.head = this.tail, i.push(a));
    }
    return i;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size < 1)
      return;
    const t = this.vals[this.head];
    return this.vals[this.head] = void 0, this.head = (this.head + 1) % this.vals.length, --this._size, t;
  }
}
class z extends o {
  /**
   * Removes the last element from the stack and returns it.
   *
   * @returns the last element in the stack, or `undefined` if empty.
   */
  pop() {
    if (this._size < 1)
      return;
    this.tail = this.toInt(this._size - 1);
    const t = this.vals[this.tail];
    return this.vals[this.tail] = void 0, --this._size, t;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...t) {
    const s = this.capacity;
    if (s < 1)
      return Array.from(t);
    const h = t.length, i = [];
    for (let r = 0; r < h; ++r) {
      const a = this.vals[this.tail];
      this.vals[this.tail] = t[r], this.tail = this.toInt(this._size + 1), this._size < s ? ++this._size : (this.head = this.tail, i.push(a));
    }
    return i;
  }
  /**
   * Get the element at the top of the stack.
   *
   * @returns the last inserted element, or `undefined` if empty.
   */
  top() {
    return this._size <= 0 ? void 0 : this.vals[this.toInt(this._size - 1)];
  }
}
function d(e, t) {
  for (const s of t) {
    const h = s.prototype;
    for (const i of Object.getOwnPropertyNames(h)) {
      const r = Object.getOwnPropertyDescriptor(h, i) ?? /* @__PURE__ */ Object.create(null);
      Object.defineProperty(e.prototype, i, r);
    }
  }
}
class _ extends o {
  /**
   * Get the element at the back of the queue.
   *
   * @returns the last inserted element, or `undefined` if empty.
   */
  back() {
    return this._size <= 0 ? void 0 : this.vals[this.toInt(this._size - 1)];
  }
  /**
   * Get the element at the bottom of the stack.
   *
   * @returns the earliest inserted element, or `undefined` if empty.
   */
  bottom() {
    return this._size <= 0 ? void 0 : this.vals[this.head];
  }
  /**
   * Inserts new elements at the start of the collection.
   *
   * @param elems - Elements to insert
   *
   * @returns The overwritten elements
   */
  unshift(...t) {
    const s = this.vals.length;
    if (s < 1)
      return Array.from(t);
    const h = [];
    for (let i = t.length - 1; i >= 0; --i) {
      this.head = (this.head - 1 + s) % s;
      const r = this.vals[this.head];
      this.vals[this.head] = t[i], this._size < s ? ++this._size : (this.tail = this.head, h.push(r));
    }
    return h.reverse();
  }
}
d(_, [u, z]);
export {
  _ as CircleDeque,
  u as CircleQueue,
  z as CircleStack,
  o as CircleView
};
//# sourceMappingURL=circle-ds.min.mjs.map
