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
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function isFunction(value) {
  return typeof value === "function";
}
function isIterable(value) {
  return isFunction(value == null ? void 0 : value[Symbol.iterator]);
}
class CircularView {
  constructor(capacity, ...items) {
    /**
     * The index representing the first element in the collection.
     * @internal
     */
    __publicField(this, "head");
    /**
     * The number of elements in the collection.
     * @internal
     */
    __publicField(this, "_size");
    /**
     * The index one more than the last element in the collection.
     * @internal
     */
    __publicField(this, "tail");
    /**
     * The values in the collection.
     * @internal
     */
    __publicField(this, "vals");
    this.head = 0;
    this._size = 0;
    this.tail = 0;
    this.vals = [];
    const numArgs = arguments.length;
    if (numArgs < 1) {
      return;
    }
    if (numArgs === 1 && typeof capacity === "number") {
      this.vals.length = capacity;
    } else if (numArgs === 1 && isIterable(capacity)) {
      this.vals = Array.from(capacity);
      this._size = this.vals.length;
    } else {
      this.vals = items;
      this.vals.push(capacity);
      this._size = this.vals.length;
      this.tail = this._size - 1;
      this.head = this.tail;
    }
  }
  /**
   * Creates a collection from an iterable object.
   *
   * @param iterable - an iterable object to convert to a collection.
   */
  static from(iterable) {
    const obj = new this(0);
    obj.vals = Array.from(iterable);
    obj._size = obj.vals.length;
    return obj;
  }
  /**
   * Creates a collection from a variable number of arguments.
   *
   * @param elements - the elements to be inserted into the collection.
   */
  static of(...elements) {
    const obj = new this(0);
    obj.vals = elements;
    obj._size = elements.length;
    return obj;
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
  set capacity(newCapacity) {
    newCapacity = +newCapacity;
    if (!Number.isSafeInteger(newCapacity) || newCapacity < 0) {
      throw new RangeError("Invalid capacity");
    }
    const curCapacity = this.capacity;
    if (this._size <= 0 || newCapacity == 0) {
      this.head = 0;
      this.tail = 0;
      this._size = 0;
      this.vals.length = newCapacity;
    } else if (newCapacity > curCapacity) {
      this.grow(newCapacity);
    } else if (newCapacity < curCapacity) {
      this.shrink(newCapacity);
    }
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
    this.head = 0;
    this._size = 0;
    this.tail = 0;
    this.vals = new Array(this.capacity);
  }
  /**
   * Iterate through the collection's entries.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of [key, value] pairs for every entry.
   */
  *entries() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield [ext, this.vals[this.toInt(ext)]];
    }
  }
  /**
   * Performs the specified action for each element in the collection.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
   * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
   */
  forEach(callbackfn, thisArg) {
    const N = this._size;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      const value = this.vals[this.toInt(ext)];
      callbackfn.call(thisArg, value, ext, this);
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
  has(value) {
    const N = this._size;
    for (let ext = 0; ext < N && ext < this._size; ++ext) {
      if (this.vals[this.toInt(ext)] === value) {
        return true;
      }
    }
    return false;
  }
  /**
   * Iterate through the collection's keys.
   *
   * **NOTE:** Unknown behavior may occur if the collection is modified during use.
   *
   * @returns an iterable of keys.
   */
  *keys() {
    for (let ext = 0; ext < this._size; ++ext) {
      yield ext;
    }
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
    for (let ext = 0; ext < this._size; ++ext) {
      yield this.vals[this.toInt(ext)];
    }
  }
  /**
   * Converts an external index to an internal index
   * @internal
   *
   * @param ext - The external index
   *
   * @returns The internal index
   */
  toInt(ext) {
    return (this.head + ext) % this.capacity;
  }
  /**
   * Grow capacity.
   * @internal
   *
   * @param newCapacity - the new capacity
   */
  grow(newCapacity) {
    const curCapacity = this.capacity;
    const tail = this.head + this._size;
    this.vals.length = newCapacity;
    if (tail <= curCapacity) {
      this.tail = tail;
      return;
    }
    const diff = Math.min(this.tail, newCapacity - curCapacity);
    this.vals.copyWithin(curCapacity, 0, diff);
    this.vals.fill(void 0, this.tail - diff, diff);
    this.vals.copyWithin(0, diff, this.tail);
    this.vals.fill(void 0, Math.max(diff, this.tail - diff), this.tail);
    this.tail = tail % newCapacity;
  }
  /**
   * Shrink capacity.
   * @internal
   *
   * @param newCapacity - the new capacity
   */
  shrink(newCapacity) {
    this._size = Math.min(this._size, newCapacity);
    this.tail = this.head + this._size;
    if (this.tail <= newCapacity) {
      this.tail %= newCapacity;
      this.vals.length = newCapacity;
    } else {
      this.tail %= this.capacity;
      this.vals = Array.from(this);
      this.tail = this._size % newCapacity;
      this.head = 0;
    }
  }
}
class CircularQueue extends CircularView {
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
  push(...elems) {
    const cap = this.capacity;
    if (cap < 1) {
      return Array.from(elems);
    }
    const N = elems.length;
    const out = [];
    for (let i = 0; i < N; ++i) {
      const prev = this.vals[this.tail];
      this.vals[this.tail] = elems[i];
      this.tail = this.toInt(this._size + 1);
      if (this._size < cap) {
        ++this._size;
      } else {
        this.head = this.tail;
        out.push(prev);
      }
    }
    return out;
  }
  /**
   * Removes the element at the front of the queue.
   *
   * @returns the front element, or `undefined` if empty.
   */
  shift() {
    if (this._size < 1) {
      return void 0;
    }
    const value = this.vals[this.head];
    this.vals[this.head] = void 0;
    this.head = (this.head + 1) % this.vals.length;
    --this._size;
    return value;
  }
}
class CircularStack extends CircularView {
  /**
   * Removes the last element from the stack and returns it.
   *
   * @returns the last element in the stack, or `undefined` if empty.
   */
  pop() {
    if (this._size < 1) {
      return void 0;
    }
    this.tail = this.toInt(this._size - 1);
    const value = this.vals[this.tail];
    this.vals[this.tail] = void 0;
    --this._size;
    return value;
  }
  /**
   * Inserts new elements at the end of the stack.
   *
   * @param elems - Elements to insert.
   *
   * @returns The overwritten elements, if any.
   */
  push(...elems) {
    const cap = this.capacity;
    if (cap < 1) {
      return Array.from(elems);
    }
    const N = elems.length;
    const out = [];
    for (let i = 0; i < N; ++i) {
      const prev = this.vals[this.tail];
      this.vals[this.tail] = elems[i];
      this.tail = this.toInt(this._size + 1);
      if (this._size < cap) {
        ++this._size;
      } else {
        this.head = this.tail;
        out.push(prev);
      }
    }
    return out;
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
function applyMixins(ctor, mixins) {
  for (const mixin of mixins) {
    const proto = mixin.prototype;
    for (const name of Object.getOwnPropertyNames(proto)) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, name) ?? /* @__PURE__ */ Object.create(null);
      Object.defineProperty(ctor.prototype, name, descriptor);
    }
  }
}
class CircularDeque extends CircularView {
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
  unshift(...elems) {
    const length = this.vals.length;
    if (length < 1) {
      return Array.from(elems);
    }
    const out = [];
    for (let i = elems.length - 1; i >= 0; --i) {
      this.head = (this.head - 1 + length) % length;
      const prev = this.vals[this.head];
      this.vals[this.head] = elems[i];
      if (this._size < length) {
        ++this._size;
      } else {
        this.tail = this.head;
        out.push(prev);
      }
    }
    return out.reverse();
  }
}
applyMixins(CircularDeque, [CircularQueue, CircularStack]);
export {
  CircularDeque,
  CircularQueue,
  CircularStack,
  CircularView
};
//# sourceMappingURL=circle-ds.mjs.map
