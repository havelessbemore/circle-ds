/// <reference types="node" />

import EventEmitter from 'events';

export declare interface Bounded<T> {
    capacity: number;
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
    addListener(event: ValueOf<typeof BoundedEvent>, listener: (...args: any[]) => void): this;
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
    on(event: ValueOf<typeof BoundedEvent>, listener: (...args: any[]) => void): this;
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
    prependListener(event: ValueOf<typeof BoundedEvent>, listener: (...args: any[]) => void): this;
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
    removeListener(event: ValueOf<typeof BoundedEvent>, listener: (...args: any[]) => void): this;
}

export declare const BoundedEvent: {
    readonly Overflow: "overflow";
};

declare class CircularBase<T> {
    /* Excluded from this release type: emitter */
    constructor();
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
 * A circular stack is similar to a traditional stack, but uses a fixed-size,
 * circular buffer. When the stack reaches its maximum capacity and a new
 * element is added, the oldest is discarded, thus maintaining its size.
 *
 * This structure efficiently utilizes memory for applications where only the
 * most recent additions are of interest and older data can be discarded.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularLinkedDeque<T> extends CircularBase<T> implements Bounded<T>, Deque<T> {
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    protected _capacity: number;
    /* Excluded from this release type: root */
    /* Excluded from this release type: _size */
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
    /**
     * @returns the maximum number of elements that can be stored.
     */
    get capacity(): number;
    /**
     *  @returns the number of elements in the collection.
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
     * Alias for {@link top | top()}.
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
     * Alias for {@link top | top()}.
     *
     * @returns the first element, or `undefined` if empty.
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
     * Get the last element pushed onto the stack.
     *
     * Alias for {@link top | top()}.
     *
     * @returns the last element, or `undefined` if empty.
     */
    last(): T | undefined;
    /**
     * Removes the top element from the stack and returns it.
     *
     * @returns the top element, or `undefined` if empty.
     */
    pop(): T | undefined;
    /**
     * Inserts new elements at the end of the stack.
     *
     * @param elems - Elements to insert.
     *
     * @returns The overwritten elements, if any.
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
     * Get the last element pushed onto the stack.
     *
     * Alias for {@link top | top()}.
     *
     * @returns the last element, or `undefined` if empty.
     */
    top(): T | undefined;
    /**
     * Inserts new elements at the front of the queue.
     *
     * @param elems - Elements to insert.
     *
     * @returns The overwritten elements, if any.
     */
    unshift(...elems: T[]): number;
    /**
     * Iterate through the collection's values.
     *
     * **NOTE:** Unknown behavior may occur if the collection is modified during use.
     *
     * @returns an iterable of values.
     */
    values(): IterableIterator<T>;
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
export declare class CircularLinkedQueue<T> extends CircularBase<T> implements Bounded<T>, Queue<T> {
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    protected _capacity: number;
    /* Excluded from this release type: root */
    /* Excluded from this release type: _size */
    /* Excluded from this release type: tail */
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
    /**
     * @returns the maximum number of elements that can be stored.
     */
    get capacity(): number;
    /**
     *  @returns the number of elements in the collection.
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
     * Alias for {@link top | top()}.
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
     * Alias for {@link top | top()}.
     *
     * @returns the first element, or `undefined` if empty.
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
     * Inserts new elements at the end of the stack.
     *
     * @param elems - Elements to insert.
     *
     * @returns The overwritten elements, if any.
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
export declare class CircularLinkedStack<T> extends CircularBase<T> implements Bounded<T>, Stack<T> {
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    protected _capacity: number;
    /* Excluded from this release type: root */
    /* Excluded from this release type: _size */
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
    /**
     * @returns the maximum number of elements that can be stored.
     */
    get capacity(): number;
    /**
     *  @returns the number of elements in the collection.
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
     * Get the last element pushed onto the stack.
     *
     * Alias for {@link top | top()}.
     *
     * @returns the last element, or `undefined` if empty.
     */
    last(): T | undefined;
    /**
     * Removes the top element from the stack and returns it.
     *
     * @returns the top element, or `undefined` if empty.
     */
    pop(): T | undefined;
    /**
     * Inserts new elements at the end of the stack.
     *
     * @param elems - Elements to insert.
     *
     * @returns The overwritten elements, if any.
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
     * Get the last element pushed onto the stack.
     *
     * Alias for {@link top | top()}.
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
}

/**
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularMap<K, V> extends CircularBase<[K, V]> implements Bounded<[K, V]>, Map<K, V>, Collection<K, V> {
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    protected _capacity: number;
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
     *  @returns the number of values in the map.
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
export declare class CircularQueue<T> extends CircularBase<T> implements Bounded<T>, Queue<T> {
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    protected _capacity: number;
    /* Excluded from this release type: head */
    /**
     * Whether capacity is finite (true) or infinite (false).
     */
    protected isFinite: boolean;
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
     * Sets the maximum number of elements that can be stored.
     */
    set capacity(capacity: number);
    /**
     *  @returns the number of elements in the collection.
     */
    get size(): number;
    /**
     * Return the type of the object.
     */
    get [Symbol.toStringTag](): string;
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
    /**
     * Emit an event containing the items evicted from the collection.
     *
     * @param evicted - The items evicted from the collection.
     */
    protected emit(evicted: T[]): void;
    /**
     * Removes a given number of elements from the queue.
     * If elements are removed, the {@link BoundedEvent.Overflow} event
     * is emitted one or more times.
     *
     * @param count - The number of elements to evict.
     */
    protected evict(count: number): void;
    /* Excluded from this release type: grow */
    /**
     * Returns whether the queue is stored sequentially in memory.
     *
     * @returns `true` if the queue is sequential in memory, `false` otherwise.
     */
    protected isSequential(): boolean;
    /**
     * Append new elements to the collection.
     *
     * @param elems - The elements to append.
     * @param max - The number of elements to append.
     */
    protected _push(elems: T[], max: number): void;
    /**
     * Adjusts the queue to fit within the given capacity.
     *
     * Assumes the queue is A) sequential in memory and B) size \<= capacity.
     *
     * @param capacity - The new capacity.
     *
     * @returns `true` if the queue was reset, `false` otherwise.
     */
    protected sequentialReset(capacity: number): boolean;
    /* Excluded from this release type: shrink */
}

/**
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircularSet<T> extends CircularBase<T> implements Bounded<T>, Set<T>, Collection<T, T> {
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    protected _capacity: number;
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
     *  @returns the number of values in the set.
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
export declare class CircularStack<T> extends CircularBase<T> implements Bounded<T>, Stack<T> {
    /**
     * The maximum number of elements that can be stored in the collection.
     */
    protected _capacity: number;
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
     * Sets the maximum number of elements that can be stored.
     */
    set capacity(capacity: number);
    /**
     *  @returns the number of elements in the collection.
     */
    get size(): number;
    /**
     * Return the type of the object.
     */
    get [Symbol.toStringTag](): string;
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
    /**
     * Emit an event containing the items evicted from the collection.
     *
     * @param evicted - The items evicted from the collection.
     */
    protected emit(evicted: T[]): void;
    /**
     * Removes a given number of elements from the stack.
     * If elements are removed, the {@link BoundedEvent.Overflow} event
     * is emitted one or more times.
     *
     * @param count - The number of elements to evict.
     */
    protected evict(count: number): void;
    /* Excluded from this release type: grow */
    /**
     * Returns whether the stack is stored sequentially in memory.
     *
     * @returns `true` if the stack is sequential in memory, `false` otherwise.
     */
    protected isSequential(): boolean;
    /**
     * Append new elements to the collection.
     *
     * @param elems - The elements to append.
     * @param max - The number of elements to append.
     */
    protected _push(elems: T[], max: number): void;
    /**
     * Adjusts the stack to fit within the given capacity.
     *
     * Assumes the stack is A) sequential in memory and B) size \<= capacity.
     *
     * @param capacity - the new capacity.
     *
     * @returns `true` if the stack was reset, `false` otherwise.
     */
    protected sequentialReset(capacity: number): boolean;
    /* Excluded from this release type: shrink */
}

export declare interface Collection<K, V> {
    clear(): void;
    entries(): IterableIterator<[K, V]>;
    forEach(callbackfn: (value: V, key: K, collection: this) => void, thisArg?: unknown): void;
    keys(): IterableIterator<K>;
    size: Readonly<number>;
    values(): IterableIterator<V>;
}

export declare interface Deque<V> extends Queue<V>, Stack<V> {
    unshift(...values: V[]): number;
}

declare interface Node_2<T> {
    next: Node_2<T>;
    prev: Node_2<T>;
    value: T;
}

declare interface Node_3<T> {
    next: Node_3<T>;
    value: T;
}

declare interface Node_4<T> {
    next: Node_4<T>;
    prev: Node_4<T>;
    value: T;
}

export declare interface Queue<V> extends Collection<number, V> {
    first(): V | undefined;
    front(): V | undefined;
    has(value: V): boolean;
    push(...values: V[]): number;
    shift(): V | undefined;
    [Symbol.iterator](): IterableIterator<V>;
}

export declare interface Stack<V> extends Collection<number, V> {
    has(value: V): boolean;
    last(): V | undefined;
    pop(): V | undefined;
    push(...values: V[]): number;
    [Symbol.iterator](): IterableIterator<V>;
    top(): V | undefined;
}

declare type ValueOf<T> = T[keyof T];

export { }
