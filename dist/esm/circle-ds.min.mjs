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
var O = Object.defineProperty;
var R = (l, o, t) => o in l ? O(l, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[o] = t;
var r = (l, o, t) => (R(l, typeof o != "symbol" ? o + "" : o, t), t);
const a = {
  Overflow: "overflow"
}, b = {};
class _ {
  constructor() {
    /**
     * The event emitter.
     * @internal
     */
    r(this, "emitter");
    this.emitter = new b();
  }
  addListener(o, t) {
    return this.emitter.addListener(o, t), this;
  }
  on(o, t) {
    return this.emitter.on(o, t), this;
  }
  prependListener(o, t) {
    return this.emitter.prependListener(o, t), this;
  }
  removeListener(o, t) {
    return this.emitter.removeListener(o, t), this;
  }
}
const z = 4294967295;
function p(l) {
  return Number.isInteger(l) && l >= 0 && l <= z;
}
function u(l) {
  return l === Number.POSITIVE_INFINITY;
}
function c(l) {
  return l === null;
}
function d(l) {
  return typeof l == "number";
}
function v(l) {
  return Number.isSafeInteger(l) && l >= 0;
}
function x(l) {
  return typeof l > "u";
}
class m extends _ {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    r(this, "_capacity");
    /**
     * The root of the collection.
     * @internal
     */
    r(this, "root");
    /**
     * The number of elements in the collection.
     * @internal
     */
    r(this, "_size");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.root.next = this.root, this.root.prev = this.root, this._size = 0, x(t) || c(t) || u(t))
      return;
    if (d(t)) {
      if (!v(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    let i = this.root.prev;
    for (const e of t)
      i.next = { next: this.root, prev: i, value: e }, i = i.next, this.root.prev = i, ++this._size;
    this._capacity = this._size;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return m.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, !u(t) && !v(t))
      throw new RangeError("Invalid capacity");
    if (this._size <= t) {
      this._capacity = t;
      return;
    }
    const i = [];
    let e = this.root.next;
    do
      i.push(e.value), e = e.next;
    while (--this._size > t);
    this.root.next = e, e.prev = this.root, this._capacity = t, this.emitter.emit(a.Overflow, i);
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this._size = 0, this.root = { value: void 0 }, this.root.next = this.root, this.root.prev = this.root;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield [i, t.value];
  }
  /**
   * Get the first element in the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first() {
    return this.root.next.value;
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(t, i) {
    let e = this.root;
    for (let s = 0; s < this._size; ++s)
      e = e.next, t.call(i, e.value, s, this);
  }
  /**
   * Get the element at the front of the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  front() {
    return this.root.next.value;
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
    let i = this.root;
    for (let e = 0; e < this._size; ++e)
      if (i = i.next, i.value === t)
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
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last() {
    return this.root.prev.value;
  }
  /**
   * Removes the top element from the stack and returns it.
   *
   * @returns the top element, or `undefined` if empty.
   */
  pop() {
    if (this._size < 1)
      return;
    const t = this.root.prev;
    return this.root.prev = t.prev, t.prev.next = this.root, --this._size, t.value;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...t) {
    const i = this._capacity;
    if (i < 1)
      return this.emitter.emit(a.Overflow, t), this._size;
    const e = t.length, s = this.root, h = [];
    let n = s.prev;
    for (let f = 0; f < e; ++f)
      n.next = { next: s, prev: n, value: t[f] }, n = n.next, this._size < i ? ++this._size : (h.push(s.next.value), s.next = s.next.next);
    return s.prev = n, s.next.prev = s, h.length > 0 && this.emitter.emit(a.Overflow, h), this._size;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size < 1)
      return;
    const t = this.root.next.next, i = t.prev.value;
    return this.root.next = t, t.prev = this.root, --this._size, i;
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
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top() {
    return this.root.prev.value;
  }
  /**
   * Inserts new elements at the front of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  unshift(...t) {
    const i = this._capacity;
    if (i < 1)
      return this.emitter.emit(a.Overflow, t), this._size;
    const e = this.root, s = [];
    let h = e.next;
    for (let n = t.length - 1; n >= 0; --n)
      h = { next: h, prev: e, value: t[n] }, h.next.prev = h, this._size < i ? ++this._size : (s.push(e.prev.value), e.prev = e.prev.prev);
    return e.next = h, e.prev.next = e, s.length > 0 && this.emitter.emit(a.Overflow, s.reverse()), this._size;
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield t.value;
  }
}
class g extends _ {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    r(this, "_capacity");
    /**
     * The root of the collection.
     * @internal
     */
    r(this, "root");
    /**
     * The number of elements in the collection.
     * @internal
     */
    r(this, "_size");
    /**
     * The tail of the collection.
     * @internal
     */
    r(this, "tail");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.root.next = this.root, this._size = 0, this.tail = this.root, x(t) || c(t) || u(t))
      return;
    if (d(t)) {
      if (!v(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    let i = this.root;
    for (const e of t)
      i.next = { next: this.root, value: e }, i = i.next, ++this._size;
    this.tail = i, i.next = this.root, this._capacity = this._size;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return g.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, !u(t) && !v(t))
      throw new RangeError("Invalid capacity");
    if (this._size <= t) {
      this._capacity = t;
      return;
    }
    const i = [];
    let e = this.root.next;
    do
      i.push(e.value), e = e.next;
    while (--this._size > t);
    this.root.next = e, this.tail = this._size > 0 ? this.tail : this.root, this._capacity = t, this.emitter.emit(a.Overflow, i);
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this._size = 0, this.root = { value: void 0 }, this.root.next = this.root, this.tail = this.root;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield [i, t.value];
  }
  /**
   * Get the first element in the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first() {
    return this.root.next.value;
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(t, i) {
    let e = this.root;
    for (let s = 0; s < this._size; ++s)
      e = e.next, t.call(i, e.value, s, this);
  }
  /**
   * Get the element at the front of the queue.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  front() {
    return this.root.next.value;
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
    let i = this.root;
    for (let e = 0; e < this._size; ++e)
      if (i = i.next, i.value === t)
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
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...t) {
    const i = this._capacity;
    if (i < 1)
      return this._size;
    const e = t.length, s = this.root, h = [];
    for (let n = 0; n < e; ++n)
      this.tail.next = { next: s, value: t[n] }, this.tail = this.tail.next, this._size < i ? ++this._size : (h.push(s.next.value), s.next = s.next.next);
    return h.length > 0 && this.emitter.emit(a.Overflow, h), this._size;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size < 1)
      return;
    const t = this.root.next;
    return this.root.next = t.next, --this._size < 1 && (this.tail = this.root), t.value;
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
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield t.value;
  }
}
class y extends _ {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    r(this, "_capacity");
    /**
     * The root of the collection.
     * @internal
     */
    r(this, "root");
    /**
     * The number of elements in the collection.
     * @internal
     */
    r(this, "_size");
    if (this._capacity = 1 / 0, this.root = { value: void 0 }, this.root.next = this.root, this.root.prev = this.root, this._size = 0, x(t) || c(t) || u(t))
      return;
    if (d(t)) {
      if (!v(t))
        throw new RangeError("Invalid capacity");
      this._capacity = t;
      return;
    }
    let i = this.root;
    for (const e of t)
      i.next = { prev: i, value: e }, i = i.next, ++this._size;
    i.next = this.root, this.root.prev = i, this._capacity = this._size;
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return y.name;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, !u(t) && !v(t))
      throw new RangeError("Invalid capacity");
    if (this._size <= t) {
      this._capacity = t;
      return;
    }
    const i = [];
    let e = this.root.next;
    do
      i.push(e.value), e = e.next;
    while (--this._size > t);
    this.root.next = e, e.prev = this.root, this._capacity = t, this.emitter.emit(a.Overflow, i);
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this._size = 0, this.root = { value: void 0 }, this.root.next = this.root, this.root.prev = this.root;
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield [i, t.value];
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(t, i) {
    let e = this.root;
    for (let s = 0; s < this._size; ++s)
      e = e.next, t.call(i, e.value, s, this);
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
    let i = this.root;
    for (let e = 0; e < this._size; ++e)
      if (i = i.next, i.value === t)
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
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last() {
    return this.root.prev.value;
  }
  /**
   * Removes the top element from the stack and returns it.
   *
   * @returns the top element, or `undefined` if empty.
   */
  pop() {
    if (this._size < 1)
      return;
    const t = this.root.prev;
    return this.root.prev = t.prev, t.prev.next = this.root, --this._size, t.value;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...t) {
    const i = this._capacity;
    if (i < 1)
      return this._size;
    const e = t.length, s = this.root, h = [];
    let n = s.prev;
    for (let f = 0; f < e; ++f)
      n.next = { next: s, prev: n, value: t[f] }, n = n.next, this._size < i ? ++this._size : (h.push(s.next.value), s.next = s.next.next);
    return s.prev = n, s.next.prev = s, h.length > 0 && this.emitter.emit(a.Overflow, h), this._size;
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
   * Get the last element pushed onto the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top() {
    return this.root.prev.value;
  }
  /**
   * Iterate through the collection's values.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of values.
   */
  *values() {
    let t = this.root;
    for (let i = 0; i < this._size; ++i)
      t = t.next, yield t.value;
  }
}
class w extends _ {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    r(this, "_capacity");
    /**
     * The internal map.
     * @internal
     */
    r(this, "map");
    if (this._capacity = 1 / 0, this.map = /* @__PURE__ */ new Map(), !(x(t) || c(t) || u(t))) {
      if (d(t)) {
        if (!v(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t;
        return;
      }
      for (const [i, e] of t)
        this.map.set(i, e);
      this._capacity = this.map.size;
    }
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of values in the map.
   */
  get size() {
    return this.map.size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return w.name;
  }
  /**
   * The maximum number of elements that can be stored in the map.
   */
  set capacity(t) {
    if (t = +t, !u(t) && !v(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const s = Array.from(this.map);
      this.clear(), this.emitter.emit(a.Overflow, s);
      return;
    }
    const i = [], e = this.map.entries();
    for (let s = this.size - t; s > 0; --s) {
      const h = e.next().value;
      this.map.delete(h[0]), i.push(h);
    }
    this.emitter.emit(a.Overflow, i);
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
    for (const [e, s] of this.map.entries())
      t.call(i, s, e, this);
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
      return this.emitter.emit(a.Overflow, [[t, i]]), this;
    const e = [];
    if (!this.map.delete(t) && this.size >= this.capacity) {
      const s = this.map.entries().next().value;
      this.map.delete(s[0]), e.push(s);
    }
    return this.map.set(t, i), e.length > 0 && this.emitter.emit(a.Overflow, e), this;
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
class S extends _ {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    r(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    r(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    r(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    r(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    r(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    r(this, "vals");
    if (this._capacity = z, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], t = t ?? 1 / 0, !u(t)) {
      if (d(t)) {
        if (!p(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t, this.isFinite = !0;
        return;
      }
      for (const i of t)
        this.vals.push(i);
      this._capacity = this.vals.length, this.isFinite = !0, this._size = this._capacity;
    }
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this.isFinite ? this._capacity : 1 / 0;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, u(t))
      t = z, this.isFinite = !1;
    else if (p(t))
      this.isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size < 1 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  /**
   *  @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return S.name;
  }
  /**
   * Remove all elements and resets the collection.
   */
  clear() {
    this.head = 0, this._size = 0, this.next = 0, this.vals.length = 0;
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
      yield [t, this.vals[(this.head + t) % this._capacity]];
  }
  /**
   * Get the first element in the queue.
   *
   * Alias for {@link front | front()}.
   *
   * @returns the first element, or `undefined` if empty.
   */
  first() {
    return this.vals[this.head];
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(t, i) {
    const e = this._size;
    for (let s = 0; s < e && s < this._size; ++s) {
      const h = this.vals[(this.head + s) % this._capacity];
      t.call(i, h, s, this);
    }
  }
  /**
   * Get the element at the front of the queue.
   *
   * Alias for {@link first | first()}.
   *
   * @returns the front element, or `undefined` if empty.
   */
  front() {
    return this.vals[this.head];
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
    const i = this._size;
    for (let e = 0; e < i; ++e)
      if (t === this.vals[(this.head + e) % this._capacity])
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
   * Inserts new elements at the end of the queue.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the queue.
   */
  push(...t) {
    const i = t.length;
    if (i < 1)
      return this._size;
    const e = this._capacity;
    if (e < 1)
      return this.emit(t), this._size;
    const s = e - this._size;
    if (s >= i)
      return this._push(t, i), this._size;
    if (!this.isFinite)
      throw this._push(t, s), new Error("Out of memory");
    const h = i - e;
    if (this.evict(this.size + h), h > 0)
      this.emit(t.splice(0, h));
    else if (h < 0)
      return this._push(t, i), this._size;
    return this.vals = t, this._size = e, this._size;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size <= 0)
      return;
    --this._size;
    const t = this.vals[this.head];
    return this.vals[this.head] = void 0, ++this.head >= this._capacity && (this.head = 0, this.vals.length = this.next), t;
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
      yield this.vals[(this.head + t) % this._capacity];
  }
  /**
   * Emit an event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  emit(t) {
    this.emitter.emit(a.Overflow, t);
  }
  /**
   * Removes a given number of elements from the queue.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   *
   * @param count - The number of elements to evict.
   */
  evict(t) {
    if (t <= 0)
      return;
    const i = this._capacity - this.head, e = !this.isSequential();
    if (e && i > t) {
      this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
      return;
    }
    if (e) {
      if (this.emit(this.vals.slice(this.head, this.head + i)), this.vals.length = this.next, this.head = 0, this._size -= i, t <= i)
        return;
      t -= i;
    }
    if (t >= this._size) {
      this.emit(this.vals.slice(this.head, this.head + this._size)), this.clear();
      return;
    }
    this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
  }
  /**
   * Grow capacity.
   * @internal
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
   * Returns whether the queue is stored sequentially in memory.
   *
   * @returns `true` if the queue is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this.head < this.next || this.next < 1;
  }
  /**
   * Append new elements to the collection.
   *
   * @param elems - The elements to append.
   * @param max - The number of elements to append.
   */
  _push(t, i) {
    const e = this._capacity, s = this.vals;
    let h = this.next;
    for (let n = 0; n < i; ++n)
      s[h] = t[n], ++h >= e && (h = 0);
    this.next = h, this._size += i;
  }
  /**
   * Adjusts the queue to fit within the given capacity.
   *
   * Assumes the queue is A) sequential in memory and B) size \<= capacity.
   *
   * @param capacity - The new capacity.
   *
   * @returns `true` if the queue was reset, `false` otherwise.
   */
  sequentialReset(t) {
    const i = this.head + this._size;
    return i <= t ? (this.vals.length = i, this.next = this.vals.length % t) : this.head >= t ? (this.vals.copyWithin(0, this.head, i), this.vals.length = this._size, this.head = 0, this.next = this._size % t) : (this.vals.copyWithin(0, t, i), this.vals.length = t, this.next = i - t), this._capacity = t, !0;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  shrink(t) {
    if (this.evict(this._size - t), this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    const i = this._capacity - t;
    this.vals.copyWithin(this.head - i, this.head, this._capacity), this.vals.length = t, this.head -= i, this._capacity = t;
  }
}
class I extends _ {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    r(this, "_capacity");
    /**
     * The internal set.
     * @internal
     */
    r(this, "set");
    if (this._capacity = 1 / 0, this.set = /* @__PURE__ */ new Set(), !(x(t) || c(t) || u(t))) {
      if (d(t)) {
        if (!v(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t;
        return;
      }
      for (const i of t)
        this.set.add(i);
      this._capacity = this.set.size;
    }
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   *  @returns the number of values in the set.
   */
  get size() {
    return this.set.size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return I.name;
  }
  /**
   * The maximum number of elements that can be stored in the set.
   */
  set capacity(t) {
    if (t = +t, !u(t) && !v(t))
      throw new RangeError("Invalid capacity");
    if (t === this._capacity || (this._capacity = t, this.size <= t))
      return;
    if (t === 0) {
      const s = Array.from(this.set);
      this.clear(), this.emitter.emit(a.Overflow, s);
      return;
    }
    const i = [], e = this.set.values();
    for (let s = this.size - t; s > 0; --s) {
      const h = e.next().value;
      this.set.delete(h), i.push(h);
    }
    this.emitter.emit(a.Overflow, i);
  }
  /**
   * Adds the specified value to the set.
   *
   * @param value - the value to add.
   */
  add(t) {
    if (this.capacity < 1)
      return this.emitter.emit(a.Overflow, [t]), this;
    const i = [];
    if (!this.set.delete(t) && this.size >= this.capacity) {
      const e = this.set.values().next().value;
      this.set.delete(e), i.push(e);
    }
    return this.set.add(t), i.length > 0 && this.emitter.emit(a.Overflow, i), this;
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
class E extends _ {
  constructor(t) {
    super();
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    r(this, "_capacity");
    /**
     * The index representing the first element.
     * @internal
     */
    r(this, "head");
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    r(this, "isFinite");
    /**
     * The index one more than the last element.
     * @internal
     */
    r(this, "next");
    /**
     * The number of elements.
     * @internal
     */
    r(this, "_size");
    /**
     * The stored values.
     * @internal
     */
    r(this, "vals");
    if (this._capacity = z, this.head = 0, this.isFinite = !1, this._size = 0, this.next = 0, this.vals = [], t = t ?? 1 / 0, !u(t)) {
      if (d(t)) {
        if (!p(t))
          throw new RangeError("Invalid capacity");
        this._capacity = t, this.isFinite = !0;
        return;
      }
      for (const i of t)
        this.vals.push(i);
      this._capacity = this.vals.length, this.isFinite = !0, this._size = this._capacity;
    }
  }
  /**
   * @returns the maximum number of elements that can be stored.
   */
  get capacity() {
    return this.isFinite ? this._capacity : 1 / 0;
  }
  /**
   * Sets the maximum number of elements that can be stored.
   */
  set capacity(t) {
    if (t = +t, u(t))
      t = z, this.isFinite = !1;
    else if (p(t))
      this.isFinite = !0;
    else
      throw new RangeError("Invalid capacity");
    this._size < 1 ? (this._capacity = t, this.clear()) : t < this._capacity ? this.shrink(t) : t > this._capacity && this.grow(t);
  }
  /**
   *  @returns the number of elements in the collection.
   */
  get size() {
    return this._size;
  }
  /**
   * Return the type of the object.
   */
  get [Symbol.toStringTag]() {
    return E.name;
  }
  /**
   * Remove all elements from the collection.
   */
  clear() {
    this.head = 0, this._size = 0, this.next = 0, this.vals.length = 0;
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
      yield [t, this.vals[(this.head + t) % this._capacity]];
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(t, i) {
    const e = this._size;
    for (let s = 0; s < e && s < this._size; ++s) {
      const h = this.vals[(this.head + s) % this._capacity];
      t.call(i, h, s, this);
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
    const i = this._size;
    for (let e = 0; e < i; ++e)
      if (t === this.vals[(this.head + e) % this._capacity])
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
   * Get the last element in the stack.
   *
   * Alias for {@link top | top()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  last() {
    return this.top();
  }
  /**
   * Removes the element at the top of the stack.
   *
   * @returns the top element, or `undefined` if empty.
   */
  pop() {
    if (this._size <= 0)
      return;
    const t = this.next > 0 ? this.next - 1 : this.head + this._size - 1;
    --this._size, this.next = t;
    const i = this.vals[t];
    return this.vals[t] = void 0, i;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The new size of the stack.
   */
  push(...t) {
    const i = t.length;
    if (i < 1)
      return this._size;
    const e = this._capacity;
    if (e < 1)
      return this.emit(t), this._size;
    const s = e - this._size;
    if (s >= i)
      return this._push(t, i), this._size;
    if (!this.isFinite)
      throw this._push(t, s), new Error("Out of memory");
    const h = i - e;
    if (this.evict(this.size + h), h > 0)
      this.emit(t.splice(0, h));
    else if (h < 0)
      return this._push(t, i), this._size;
    return this.vals = t, this._size = e, this._size;
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
   * Get the last element in the stack.
   *
   * Alias for {@link last | last()}.
   *
   * @returns the last element, or `undefined` if empty.
   */
  top() {
    if (!(this._size < 1))
      return this.vals[(this.head + this._size - 1) % this._capacity];
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
      yield this.vals[(this.head + t) % this._capacity];
  }
  /**
   * Emit an event containing the items evicted from the collection.
   *
   * @param evicted - The items evicted from the collection.
   */
  emit(t) {
    this.emitter.emit(a.Overflow, t);
  }
  /**
   * Removes a given number of elements from the stack.
   * If elements are removed, the {@link BoundedEvent.Overflow} event
   * is emitted one or more times.
   *
   * @param count - The number of elements to evict.
   */
  evict(t) {
    if (t <= 0)
      return;
    const i = this._capacity - this.head, e = !this.isSequential();
    if (e && i > t) {
      this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
      return;
    }
    if (e) {
      if (this.emit(this.vals.slice(this.head, this.head + i)), this.vals.length = this.next, this.head = 0, this._size -= i, t <= i)
        return;
      t -= i;
    }
    if (t >= this._size) {
      this.emit(this.vals.slice(this.head, this.head + this._size)), this.clear();
      return;
    }
    this.emit(this.vals.slice(this.head, this.head + t)), this.vals.fill(void 0, this.head, this.head + t), this.head += t, this._size -= t;
  }
  /**
   * Grow capacity.
   * @internal
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
   * Returns whether the stack is stored sequentially in memory.
   *
   * @returns `true` if the stack is sequential in memory, `false` otherwise.
   */
  isSequential() {
    return this.head < this.next || this.next < 1;
  }
  /**
   * Append new elements to the collection.
   *
   * @param elems - The elements to append.
   * @param max - The number of elements to append.
   */
  _push(t, i) {
    const e = this._capacity, s = this.vals;
    let h = this.next;
    for (let n = 0; n < i; ++n)
      s[h] = t[n], ++h >= e && (h = 0);
    this.next = h, this._size += i;
  }
  /**
   * Adjusts the stack to fit within the given capacity.
   *
   * Assumes the stack is A) sequential in memory and B) size \<= capacity.
   *
   * @param capacity - the new capacity.
   *
   * @returns `true` if the stack was reset, `false` otherwise.
   */
  sequentialReset(t) {
    const i = this.head + this._size;
    return i <= t ? (this.vals.length = i, this.next = this.vals.length % t) : this.head >= t ? (this.vals.copyWithin(0, this.head, i), this.vals.length = this._size, this.head = 0, this.next = this._size % t) : (this.vals.copyWithin(0, t, i), this.vals.length = t, this.next = i - t), this._capacity = t, !0;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param capacity - the new capacity
   */
  shrink(t) {
    if (this.evict(this._size - t), this.isSequential()) {
      this.sequentialReset(t);
      return;
    }
    const i = this._capacity - t;
    this.vals.copyWithin(this.head - i, this.head, this._capacity), this.vals.length = t, this.head -= i, this._capacity = t;
  }
}
export {
  a as BoundedEvent,
  m as CircularLinkedDeque,
  g as CircularLinkedQueue,
  y as CircularLinkedStack,
  w as CircularMap,
  S as CircularQueue,
  I as CircularSet,
  E as CircularStack
};
//# sourceMappingURL=circle-ds.min.mjs.map
