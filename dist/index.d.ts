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
export declare class CircleDeque<T> extends CircleView<T> implements Deque<T> {
    /**
     * Get the element at the back of the queue.
     *
     * @returns the last inserted element, or `undefined` if empty.
     */
    back(): T | undefined;
    /**
     * Get the element at the bottom of the stack.
     *
     * @returns the earliest inserted element, or `undefined` if empty.
     */
    bottom(): T | undefined;
    /**
     * Inserts new elements at the start of the collection.
     *
     * @param elems - Elements to insert
     *
     * @returns The overwritten elements
     */
    unshift(...elems: T[]): T[];
}

export declare interface CircleDeque<T> extends CircleQueue<T>, CircleStack<T> {
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
export declare class CircleQueue<T> extends CircleView<T> implements Queue<T> {
    /**
     * Get the element at the front of the queue.
     *
     * @returns the earliest inserted element, or `undefined` if empty.
     */
    front(): T | undefined;
    /**
     * Inserts new elements at the end of the queue.
     *
     * @param elems - Elements to insert.
     *
     * @returns The overwritten elements, if any.
     */
    push(...elems: T[]): T[];
    /**
     * Removes the element at the front of the queue.
     *
     * @returns the front element, or `undefined` if empty.
     */
    shift(): T | undefined;
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
export declare class CircleStack<T> extends CircleView<T> implements Stack<T> {
    /**
     * Removes the last element from the stack and returns it.
     *
     * @returns the last element in the stack, or `undefined` if empty.
     */
    pop(): T | undefined;
    /**
     * Inserts new elements at the end of the stack.
     *
     * @param elems - Elements to insert.
     *
     * @returns The overwritten elements, if any.
     */
    push(...elems: T[]): T[];
    /**
     * Get the element at the top of the stack.
     *
     * @returns the last inserted element, or `undefined` if empty.
     */
    top(): T | undefined;
}

/**
 * A circular view is a fixed-size, read-only, circular array used to
 * store elements.
 *
 * @see {@link https://en.wikipedia.org/wiki/Circular_buffer | Wikipedia}
 */
export declare class CircleView<T> implements Collection<T, number> {
    /* Excluded from this release type: head */
    /* Excluded from this release type: _size */
    /* Excluded from this release type: tail */
    /* Excluded from this release type: vals */
    /**
     * Capacity defaults to zero and should be updated via {@link CircleView.capacity}.
     */
    constructor();
    /**
     * @param capacity - the maximum capacity.
     */
    constructor(capacity: number);
    /**
     * @param items - the items to store in the collection.
     */
    constructor(items: Iterable<T>);
    /**
     * @param items - the items to store in the collection.
     */
    constructor(...items: T[]);
    /**
     * Creates a collection from an iterable object.
     *
     * @param iterable - an iterable object to convert to a collection.
     */
    static from<T, I extends typeof CircleView<T>>(this: I, iterable: Iterable<T> | ArrayLike<T>): InstanceType<I>;
    /**
     * Creates a collection from a variable number of arguments.
     *
     * @param elements - the elements to be inserted into the collection.
     */
    static of<T, I extends typeof CircleView<T>>(this: I, ...elements: T[]): InstanceType<I>;
    /**
     * @returns the maximum number of elements that can be stored.
     */
    get capacity(): number;
    /**
     * Sets the maximum number of elements that can be stored.
     */
    set capacity(newCapacity: number);
    /**
     *  @returns the number of elements in the collection.
     */
    get size(): number;
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
    /* Excluded from this release type: toInt */
    /* Excluded from this release type: grow */
    /* Excluded from this release type: shrink */
}

export declare interface Collection<V, K> {
    clear(): void;
    entries(): IterableIterator<[K, V]>;
    forEach(callbackfn: (value: V, key: number, collection: this) => void, thisArg?: unknown): void;
    has(value: V): boolean;
    keys(): IterableIterator<K>;
    capacity: number;
    size: Readonly<number>;
    values(): IterableIterator<V>;
    [Symbol.iterator](): IterableIterator<V>;
}

export declare interface Deque<V> extends Queue<V>, Stack<V> {
    back(): V | undefined;
    bottom(): V | undefined;
    unshift(...values: V[]): void;
}

export declare interface Queue<V> extends Collection<V, number> {
    front(): V | undefined;
    push(...values: V[]): void;
    shift(): V | undefined;
}

export declare interface Stack<V> extends Collection<V, number> {
    pop(): V | undefined;
    push(...values: V[]): void;
    top(): V | undefined;
}

export { }
