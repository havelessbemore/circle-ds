/// <reference types="node" />

import { Bounded } from './types/bounded';
import { Bounded as Bounded_2 } from '../types/bounded';
import { Collection } from './types/collection';
import { Collection as Collection_2 } from '../types/collection';
import { Deque } from './types/deque';
import { Deque as Deque_2 } from '../types/deque';
import { DoublyLinkedNode } from '../types/doublyLinkedNode';
import EventEmitter from 'events';
import { LinkedNode } from '../types/linkedNode';
import { List } from './types/list';
import { List as List_2 } from '../types/list';
import { Queue } from './types/queue';
import { Queue as Queue_2 } from '../types/queue';
import { Stack } from './types/stack';
import { Stack as Stack_2 } from '../types/stack';

export { Bounded }

/**
 * An enumeration of event types supported by {@link Bounded} collections.
 *
 * This object defines a set of constants representing event names that can
 * be emitted by instances of collections implementing the {@link Bounded} interface.
 * These events signify specific actions or changes in the state of the collection.
 *
 * Defined events include:
 * - `Overflow`: Indicates that the collection has reached its capacity, and
 *   as a result, one or more elements have been removed to accommodate new elements.
 *   This event is triggered during operations that add elements to the collection when
 *   it exceeds its capacity, or when capacity is updated below the collection's current
 *   size. Listeners attached to this event will receive an array of elements that were
 *   removed due to the overflow. Removed elements may be sent across 1 or more event
 *   instances.
 *
 * This object is marked as `const` to ensure that its properties are read-only,
 * preventing modification of event names which could lead to inconsistencies in
 * event handling across the application.
 */
export declare const BoundedEvent: {
    readonly Overflow: "overflow";
};

declare class CircularBase<T> {
    /* Excluded from this release type: emitter */
    constructor(emitter?: EventEmitter);
    /**
     * Appends the listener function to the listeners array for the
     * {@link BoundedEvent.Overflow} event.
     *
     * * No checks are made to see if the listener has already been added.
     * Multiple calls with the same of event + listener combination will
     * result in the listener being added and called multiple times.
     *
     * * By default, event listeners are invoked in the order they are added.
     * The `prependListener()` method can be used as an alternative to add
     * the event listener to the beginning of the listeners array.
     *
     * @param event - The name of the event.
     * @param listener - The callback function. It will
     * receive an array of elements that have been removed due to overflow.
     * This can happen when elements are added while the collection is at
     * capacity, or when capacity is reduced below the current size.
     *
     * @returns the collection.
     */
    addListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    /**
     * Appends the listener function to the listeners array for the
     * {@link BoundedEvent.Overflow} event.
     *
     * * No checks are made to see if the listener has already been added.
     * Multiple calls with the same of event + listener combination will
     * result in the listener being added and called multiple times.
     *
     * * By default, event listeners are invoked in the order they are added.
     * The `prependListener()` method can be used as an alternative to add
     * the event listener to the beginning of the listeners array.
     *
     * @param event - The name of the event.
     * @param listener - The callback function. It will
     * receive an array of elements that have been removed due to overflow.
     * This can happen when elements are added while the collection is at
     * capacity, or when capacity is reduced below the current size.
     *
     * @returns the collection.
     */
    on(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    /**
     * Adds the listener function to the beginning of the listeners array for
     * the {@link BoundedEvent.Overflow} event.
     *
     * * No checks are made to see if the listener has already been added.
     * Multiple calls with the same of event + listener combination will
     * result in the listener being added and called multiple times.
     *
     * * Alternatively, the `addListener()` method can be used to add
     * the event listener to the end of the listeners array.
     *
     * @param event - The name of the event.
     * @param listener - The callback function. It will
     * receive an array of elements that have been removed due to overflow.
     * This can happen when elements are added while the collection is at
     * capacity, or when capacity is reduced below the current size.
     *
     * @returns the collection.
     */
    prependListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    /**
     * Removes the specified listener from the listener array for the event.
     *
     * At most once instance of a listener will be removed. If a listener
     * has been added multiple times for the same event, this method should
     * be called once per instance.
     *
     * @param event - The name of the event.
     * @param listener - The callback function.
     *
     * @returns the collection.
     */
    removeListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
}

/**
 * A circular deque is similar to a traditional deque, but uses a fixed-size,
 * circular buffer. When the deque reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularDeque<T> extends CircularBase<T> implements Bounded_2<T>, Deque<T> {
    /* Excluded from this release type: _capacity */
    /* Excluded from this release type: head */
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    protected isFinite: boolean;
    /* Excluded from this release type: next */
    /* Excluded from this release type: _size */
    /* Excluded from this release type: vals */
    /**
     * Creates a new deque. Default `capacity` is `Infinity`.
     */
    constructor();
    /**
     * Creates a new deque with the given capacity.
     *
     * @param capacity - the deque's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a new deque from the given items. `capacity` will equal the number of items.
     *
     * @param items - the initial values in the deque.
     */
    constructor(items: Iterable<T>);
    /**
     * @returns the maximum number of elements that can be stored.
     */
    get capacity(): number;
    /**
     * @returns the number of elements in the collection.
     */
    get size(): number;
    /**
     * Return the type of the object.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Sets the maximum number of elements that can be stored.
     */
    set capacity(capacity: number);
    /**
     * Remove all elements and resets the collection.
     */
    clear(): void;
    /**
     * Iterate through the collection's entries.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of [key, value] pairs for every entry.
     */
    entries(): IterableIterator<[number, T]>;
    /**
     * Get the first element in the deque.
     *
     * Alias for {@link front | front()}.
     *
     * @returns the first element, or `undefined` if empty.
     */
    first(): T | undefined;
    /**
     * Performs the specified action for each element in the collection.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
     * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
     */
    forEach(callbackfn: (value: T, index: number, collection: this) => void, thisArg?: unknown): void;
    /**
     * Get the element at the front of the deque.
     *
     * Alias for {@link first | first()}.
     *
     * @returns the front element, or `undefined` if empty.
     */
    front(): T | undefined;
    /**
     * Determines whether a given element is in the collection.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @param value - The element to search for
     *
     * @returns a boolean indicating if `value` was found or not
     */
    has(value: T): boolean;
    /**
     * Iterate through the collection's keys.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of keys.
     */
    keys(): IterableIterator<number>;
    /**
     * Get the last element in the deque.
     *
     * Alias for {@link top | top()}.
     *
     * @returns the last element, or `undefined` if empty.
     */
    last(): T | undefined;
    /**
     * Removes the last element from the deque.
     *
     * @returns the last element, or `undefined` if empty.
     */
    pop(): T | undefined;
    /**
     * Inserts new elements at the end of the deque.
     *
     * @param elems - Elements to insert.
     *
     * @returns The new size of the deque.
     */
    push(...elems: T[]): number;
    /**
     * Removes the element at the front of the deque.
     *
     * @returns the front element, or `undefined` if empty.
     */
    shift(): T | undefined;
    /**
     * Iterate through the collection's values.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of values.
     */
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * Inserts new elements at the end of the deque.
     *
     * @param elems - Elements to insert.
     *
     * @returns The new size of the deque.
     */
    unshift(...elems: T[]): number;
    /**
     * Get the last element in the deque.
     *
     * Alias for {@link last | last()}.
     *
     * @returns the last element, or `undefined` if empty.
     */
    top(): T | undefined;
    /**
     * Iterate through the collection's values.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of values.
     */
    values(): IterableIterator<T>;
    /**
     * Emit an event containing the items evicted from the collection.
     *
     * @param evicted - The items evicted from the collection.
     */
    protected emit(evicted: T[]): void;
    /**
     * Removes a given number of elements from the deque.
     * If elements are removed, the {@link BoundedEvent.Overflow} event
     * is emitted one or more times.
     *
     * @param count - The number of elements to evict.
     */
    protected evictHead(count: number): void;
    /**
     * Removes a given number of elements from the deque.
     * If elements are removed, the {@link BoundedEvent.Overflow} event
     * is emitted one or more times.
     *
     * @param count - The number of elements to evict.
     */
    protected evictTail(count: number): void;
    /* Excluded from this release type: grow */
    /* Excluded from this release type: isSequential */
    /* Excluded from this release type: _push */
    /* Excluded from this release type: sequentialReset */
    /* Excluded from this release type: shrink */
    /* Excluded from this release type: _unshift */
}

export declare class CircularDoublyLinkedList<T> extends CircularBase<T> implements Bounded<T>, List_2<T> {
    /* Excluded from this release type: _capacity */
    /* Excluded from this release type: root */
    /* Excluded from this release type: _size */
    /**
     * Creates a standard linked list (no capacity restriction).
     */
    constructor();
    /**
     * Creates a linked list with the given capacity.
     *
     * @param capacity - the list's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a linked list with the given items. Capacity is set to the number of items.
     *
     * @param items - the values to store in the list.
     */
    constructor(items: Iterable<T>);
    get capacity(): number;
    get size(): number;
    get [Symbol.toStringTag](): string;
    set capacity(capacity: number);
    at(index: number): T | undefined;
    clear(): void;
    delete(index: number): boolean;
    entries(): IterableIterator<[number, T]>;
    fill(value: T, start?: number, end?: number): this;
    forEach(callbackfn: (value: T, index: number, list: this) => void, thisArg?: unknown): void;
    has(value: T): boolean;
    keys(): IterableIterator<number>;
    pop(): T | undefined;
    push(...values: T[]): number;
    set(index: number, value: T): T | undefined;
    shift(): T | undefined;
    slice(start?: number, end?: number): CircularDoublyLinkedList<T>;
    splice(start: number, deleteCount?: number, ...items: T[]): CircularDoublyLinkedList<T>;
    [Symbol.iterator](): IterableIterator<T>;
    unshift(...values: T[]): number;
    values(): IterableIterator<T>;
    /* Excluded from this release type: append */
    /* Excluded from this release type: get */
    /* Excluded from this release type: prepend */
}

/**
 * A circular deque is similar to a traditional deque, but uses a fixed-size,
 * circular buffer. When the deque reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularLinkedDeque<T> implements Bounded_2<T>, Deque_2<T> {
    /* Excluded from this release type: list */
    /**
     * Creates a new stack with `capacity` defaulted to `Infinity`.
     */
    constructor();
    /**
     * Creates a new stack with the given capacity.
     *
     * @param capacity - the stack's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a new stack. Initial capacity is the number of items given.
     *
     * @param items - the values to store in the stack.
     */
    constructor(items: Iterable<T>);
    get capacity(): number;
    get size(): number;
    get [Symbol.toStringTag](): string;
    set capacity(capacity: number);
    first(): T | undefined;
    front(): T | undefined;
    clear(): void;
    entries(): IterableIterator<[number, T]>;
    forEach(callbackfn: (value: T, index: number, collection: this) => void, thisArg?: unknown): void;
    has(value: T): boolean;
    keys(): IterableIterator<number>;
    last(): T | undefined;
    pop(): T | undefined;
    push(...elems: T[]): number;
    shift(): T | undefined;
    [Symbol.iterator](): IterableIterator<T>;
    top(): T | undefined;
    unshift(...elems: T[]): number;
    values(): IterableIterator<T>;
    addListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    on(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    prependListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    removeListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
}

export declare class CircularLinkedList<T> extends CircularBase<T> implements Bounded<T>, List_2<T> {
    /* Excluded from this release type: _capacity */
    /* Excluded from this release type: root */
    /* Excluded from this release type: _size */
    /* Excluded from this release type: tail */
    /**
     * Creates a standard linked list (no capacity restriction).
     */
    constructor();
    /**
     * Creates a linked list with the given capacity.
     *
     * @param capacity - the list's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a linked list with the given items. Capacity is set to the number of items.
     *
     * @param items - the values to store in the list.
     */
    constructor(items: Iterable<T>);
    get capacity(): number;
    get size(): number;
    get [Symbol.toStringTag](): string;
    set capacity(capacity: number);
    at(index?: number): T | undefined;
    clear(): void;
    delete(index: number): boolean;
    entries(): IterableIterator<[number, T]>;
    fill(value: T, start?: number, end?: number): this;
    forEach(callbackfn: (value: T, index: number, list: this) => void, thisArg?: unknown): void;
    has(value: T): boolean;
    keys(): IterableIterator<number>;
    pop(): T | undefined;
    push(...values: T[]): number;
    set(index: number, value: T): T | undefined;
    shift(): T | undefined;
    slice(start?: number, end?: number): CircularLinkedList<T>;
    splice(start: number, deleteCount?: number, ...items: T[]): CircularLinkedList<T>;
    [Symbol.iterator](): IterableIterator<T>;
    unshift(...values: T[]): number;
    values(): IterableIterator<T>;
    /* Excluded from this release type: append */
}

/**
 * A circular queue is similar to a traditional queue, but uses a fixed-size,
 * circular buffer. When the queue reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularLinkedQueue<T> implements Bounded_2<T>, Queue_2<T> {
    /* Excluded from this release type: list */
    /**
     * Creates a new stack with `capacity` defaulted to `Infinity`.
     */
    constructor();
    /**
     * Creates a new stack with the given capacity.
     *
     * @param capacity - the stack's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a new stack. Initial capacity is the number of items given.
     *
     * @param items - the values to store in the stack.
     */
    constructor(items: Iterable<T>);
    get capacity(): number;
    get size(): number;
    get [Symbol.toStringTag](): string;
    set capacity(capacity: number);
    clear(): void;
    entries(): IterableIterator<[number, T]>;
    first(): T | undefined;
    forEach(callbackfn: (value: T, index: number, collection: this) => void, thisArg?: unknown): void;
    front(): T | undefined;
    has(value: T): boolean;
    keys(): IterableIterator<number>;
    push(...elems: T[]): number;
    shift(): T | undefined;
    [Symbol.iterator](): IterableIterator<T>;
    values(): IterableIterator<T>;
    addListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    on(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    prependListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    removeListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
}

/**
 * A circular stack is similar to a traditional stack, but uses a fixed-size,
 * circular buffer. When the stack reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularLinkedStack<T> implements Bounded_2<T>, Stack_2<T> {
    /* Excluded from this release type: list */
    /**
     * Creates a new stack with `capacity` defaulted to `Infinity`.
     */
    constructor();
    /**
     * Creates a new stack with the given capacity.
     *
     * @param capacity - the stack's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a new stack. Initial capacity is the number of items given.
     *
     * @param items - the values to store in the stack.
     */
    constructor(items: Iterable<T>);
    get capacity(): number;
    get size(): number;
    get [Symbol.toStringTag](): string;
    set capacity(capacity: number);
    clear(): void;
    entries(): IterableIterator<[number, T]>;
    forEach(callbackfn: (value: T, index: number, collection: this) => void, thisArg?: unknown): void;
    has(value: T): boolean;
    keys(): IterableIterator<number>;
    last(): T | undefined;
    pop(): T | undefined;
    push(...elems: T[]): number;
    [Symbol.iterator](): IterableIterator<T>;
    top(): T | undefined;
    values(): IterableIterator<T>;
    addListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    on(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    prependListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
    removeListener(event: typeof BoundedEvent.Overflow, listener: (elems: T[]) => void): this;
}

/**
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularMap<K, V> extends CircularBase<[K, V]> implements Bounded_2<[K, V]>, Map<K, V>, Collection_2<K, V> {
    /* Excluded from this release type: _capacity */
    /* Excluded from this release type: map */
    /**
     * Creates a new map with `capacity` defaulted to `Infinity`.
     */
    constructor();
    /**
     * Creates a new map with the given capacity.
     *
     * @param capacity - the map's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a new map. Initial capacity is the number of unique items given.
     *
     * @param items - the values to store in the map.
     */
    constructor(items: Iterable<[K, V]>);
    /**
     * @returns the maximum number of elements that can be stored.
     */
    get capacity(): number;
    /**
     * @returns the number of values in the map.
     */
    get size(): number;
    /**
     * Return the type of the object.
     */
    get [Symbol.toStringTag](): string;
    /**
     * The maximum number of elements that can be stored in the map.
     */
    set capacity(capacity: number);
    /**
     * Removes all elements from the map.
     */
    clear(): void;
    /**
     * Deletes a specified value from the map.
     *
     * @returns `true` if the value existed in the map and has been removed, or `false` otherwise.
     */
    delete(key: K): boolean;
    /**
     * Iterate through the map's entries.
     *
     * **Note:** Modifying the map during iteration may cause unexpected behavior.
     *
     * @returns an iterable of [key, value] pairs for every entry.
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * Performs the specified action for each value in the map.
     *
     * **Note:** Modifying the map during iteration may cause unexpected behavior.
     *
     * @param callbackfn - A function that accepts up to three arguments. It is called once per value.
     * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`.
     */
    forEach(callbackfn: (value: V, key: K, map: this) => void, thisArg?: unknown): void;
    /**
     * Returns the associated value of the given key from the map.
     *
     * If the associated value is an object, then you will get a reference to that object; any change made to the object will effectively modify it inside the map.
     *
     * @returns the value associated with the specified key, or `undefined` if no value is associated.
     */
    get(key: K): V | undefined;
    /**
     * Determines whether a given value is in the map.
     *
     * @param key - The key to search for.
     *
     * @returns `true` if the value was found, `false` otherwise.
     */
    has(key: K): boolean;
    /**
     * Iterate through the map's keys.
     *
     * **Note:** Modifying the map during iteration may cause unexpected behavior.
     *
     * @returns an iterable of the map's keys.
     */
    keys(): IterableIterator<K>;
    /**
     * Sets the specified key-value pair in the map.
     *
     * @param key - the key to add
     * @param value - the key's value.
     */
    set(key: K, value: V): this;
    /**
     * Iterate through the map's values.
     *
     * **Note:** Modifying the map during iteration may cause unexpected behavior.
     *
     * @returns an iterable of values.
     */
    [Symbol.iterator](): IterableIterator<[K, V]>;
    /**
     * Iterate through the map's values.
     *
     * **Note:** Modifying the map during iteration may cause unexpected behavior.
     *
     * @returns an iterable of the map's values.
     */
    values(): IterableIterator<V>;
}

/**
 * A circular queue is similar to a traditional queue, but uses a fixed-size,
 * circular buffer. When the queue reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularQueue<T> extends CircularBase<T> implements Bounded_2<T>, Queue_2<T> {
    /* Excluded from this release type: _capacity */
    /* Excluded from this release type: head */
    /* Excluded from this release type: isFinite */
    /* Excluded from this release type: next */
    /* Excluded from this release type: _size */
    /* Excluded from this release type: vals */
    /**
     * Creates a new queue. Default `capacity` is `Infinity`.
     */
    constructor();
    /**
     * Creates a new queue with the given capacity.
     *
     * @param capacity - the queue's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a new queue from the given items. `capacity` will equal the number of items.
     *
     * @param items - the initial values in the queue.
     */
    constructor(items: Iterable<T>);
    /**
     * @returns the maximum number of elements that can be stored.
     */
    get capacity(): number;
    /**
     * @returns the number of elements in the collection.
     */
    get size(): number;
    /**
     * Return the type of the object.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Sets the maximum number of elements that can be stored.
     */
    set capacity(capacity: number);
    /**
     * Remove all elements and resets the collection.
     */
    clear(): void;
    /**
     * Iterate through the collection's entries.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of [key, value] pairs for every entry.
     */
    entries(): IterableIterator<[number, T]>;
    /**
     * Get the first element in the queue.
     *
     * Alias for {@link front | front()}.
     *
     * @returns the first element, or `undefined` if empty.
     */
    first(): T | undefined;
    /**
     * Performs the specified action for each element in the collection.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
     * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
     */
    forEach(callbackfn: (value: T, index: number, collection: this) => void, thisArg?: unknown): void;
    /**
     * Get the element at the front of the queue.
     *
     * Alias for {@link first | first()}.
     *
     * @returns the front element, or `undefined` if empty.
     */
    front(): T | undefined;
    /**
     * Determines whether a given element is in the collection.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @param value - The element to search for
     *
     * @returns a boolean indicating if `value` was found or not
     */
    has(value: T): boolean;
    /**
     * Iterate through the collection's keys.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of keys.
     */
    keys(): IterableIterator<number>;
    /**
     * Inserts new elements at the end of the queue.
     *
     * @param elems - Elements to insert.
     *
     * @returns The new size of the queue.
     */
    push(...elems: T[]): number;
    /**
     * Removes the element at the front of the queue.
     *
     * @returns the front element, or `undefined` if empty.
     */
    shift(): T | undefined;
    /**
     * Iterate through the collection's values.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of values.
     */
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * Iterate through the collection's values.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of values.
     */
    values(): IterableIterator<T>;
    /* Excluded from this release type: emit */
    /* Excluded from this release type: evict */
    /* Excluded from this release type: grow */
    /* Excluded from this release type: isSequential */
    /* Excluded from this release type: _push */
    /* Excluded from this release type: sequentialReset */
    /* Excluded from this release type: shrink */
}

/**
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularSet<T> extends CircularBase<T> implements Bounded_2<T>, Set<T>, Collection_2<T, T> {
    /* Excluded from this release type: _capacity */
    /* Excluded from this release type: set */
    /**
     * Creates a new set with `capacity` defaulted to `Infinity`.
     */
    constructor();
    /**
     * Creates a new set with the given capacity.
     *
     * @param capacity - the set's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a new set. Initial capacity is the number of unique items given.
     *
     * @param items - the values to store in the set.
     */
    constructor(items: Iterable<T>);
    /**
     * @returns the maximum number of elements that can be stored.
     */
    get capacity(): number;
    /**
     * @returns the number of values in the set.
     */
    get size(): number;
    /**
     * Return the type of the object.
     */
    get [Symbol.toStringTag](): string;
    /**
     * The maximum number of elements that can be stored in the set.
     */
    set capacity(capacity: number);
    /**
     * Adds the specified value to the set.
     *
     * @param value - the value to add.
     */
    add(value: T): this;
    /**
     * Removes all elements from the set.
     */
    clear(): void;
    /**
     * Deletes a specified value from the set.
     *
     * @returns `true` if the value existed in the set and has been removed, or `false` otherwise.
     */
    delete(value: T): boolean;
    /**
     * Iterate through the set's entries.
     *
     * **Note:** Modifying the set during iteration may cause unexpected behavior.
     *
     * @returns an iterable of [key, value] pairs for every entry.
     */
    entries(): IterableIterator<[T, T]>;
    /**
     * Performs the specified action for each value in the set.
     *
     * **Note:** Modifying the set during iteration may cause unexpected behavior.
     *
     * @param callbackfn - A function that accepts up to three arguments. It is called once per value.
     * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. Defaults to `undefined`.
     */
    forEach(callbackfn: (value: T, key: T, set: this) => void, thisArg?: unknown): void;
    /**
     * Determines whether a given value is in the set.
     *
     * @param value - The value to search for.
     *
     * @returns `true` if the value was found, `false` otherwise.
     */
    has(value: T): boolean;
    /**
     * Iterate through the set's keys.
     *
     * **Note:** Modifying the set during iteration may cause unexpected behavior.
     *
     * @returns an iterable of the set's keys.
     */
    keys(): IterableIterator<T>;
    /**
     * Iterate through the set's values.
     *
     * **Note:** Modifying the set during iteration may cause unexpected behavior.
     *
     * @returns an iterable of the set's values.
     */
    values(): IterableIterator<T>;
    /**
     * Iterate through the set's values.
     *
     * **Note:** Modifying the set during iteration may cause unexpected behavior.
     *
     * @returns an iterable of values.
     */
    [Symbol.iterator](): IterableIterator<T>;
}

/**
 * A circular stack is similar to a traditional stack, but uses a fixed-size,
 * circular buffer. When the stack reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularStack<T> extends CircularBase<T> implements Bounded_2<T>, Stack_2<T> {
    /* Excluded from this release type: _capacity */
    /* Excluded from this release type: head */
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    protected isFinite: boolean;
    /* Excluded from this release type: next */
    /* Excluded from this release type: _size */
    /* Excluded from this release type: vals */
    /**
     * Creates a new stack. Default `capacity` is `Infinity`.
     */
    constructor();
    /**
     * Creates a new stack with the given capacity.
     *
     * @param capacity - the stack's capacity.
     */
    constructor(capacity?: number | null);
    /**
     * Creates a new stack from the given items. `capacity` will equal the number of items.
     *
     * @param items - the initial values in the stack.
     */
    constructor(items: Iterable<T>);
    /**
     * @returns the maximum number of elements that can be stored.
     */
    get capacity(): number;
    /**
     * @returns the number of elements in the collection.
     */
    get size(): number;
    /**
     * Return the type of the object.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Sets the maximum number of elements that can be stored.
     */
    set capacity(capacity: number);
    /**
     * Remove all elements from the collection.
     */
    clear(): void;
    /**
     * Iterate through the collection's entries.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of [key, value] pairs for every entry.
     */
    entries(): IterableIterator<[number, T]>;
    /**
     * Performs the specified action for each element in the collection.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @param callbackfn - A function that accepts up to three arguments. It is called once per element.
     * @param thisArg - An object to which the `this` keyword refers to in the `callbackfn` function. If omitted, `undefined` is used.
     */
    forEach(callbackfn: (value: T, index: number, collection: this) => void, thisArg?: unknown): void;
    /**
     * Determines whether a given element is in the collection.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @param value - The element to search for
     *
     * @returns a boolean indicating if `value` was found or not
     */
    has(value: T): boolean;
    /**
     * Iterate through the collection's keys.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of keys.
     */
    keys(): IterableIterator<number>;
    /**
     * Get the last element in the stack.
     *
     * Alias for {@link top | top()}.
     *
     * @returns the last element, or `undefined` if empty.
     */
    last(): T | undefined;
    /**
     * Removes the element at the top of the stack.
     *
     * @returns the top element, or `undefined` if empty.
     */
    pop(): T | undefined;
    /**
     * Inserts new elements at the end of the stack.
     *
     * @param elems - Elements to insert.
     *
     * @returns The new size of the stack.
     */
    push(...elems: T[]): number;
    /**
     * Iterate through the collection's values.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of values.
     */
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * Get the last element in the stack.
     *
     * Alias for {@link last | last()}.
     *
     * @returns the last element, or `undefined` if empty.
     */
    top(): T | undefined;
    /**
     * Iterate through the collection's values.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of values.
     */
    values(): IterableIterator<T>;
    /* Excluded from this release type: emit */
    /* Excluded from this release type: evict */
    /* Excluded from this release type: grow */
    /* Excluded from this release type: isSequential */
    /* Excluded from this release type: _push */
    /* Excluded from this release type: sequentialReset */
    /* Excluded from this release type: shrink */
}

export { Collection }

export { Deque }

export { List }

export { Queue }

export { Stack }

export { }
