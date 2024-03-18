# Circle DS

A suite of circular data structures, including deques, lists, maps, queues, sets and stacks.

[![Version](https://img.shields.io/npm/v/circle-ds.svg)](https://www.npmjs.com/package/circle-ds)
[![Maintenance](https://img.shields.io/maintenance/yes/2024.svg)](https://github.com/havelessbemore/circle-ds/graphs/commit-activity)
[![License](https://img.shields.io/github/license/havelessbemore/circle-ds.svg)](https://github.com/havelessbemore/circle-ds/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/havelessbemore/circle-ds/graph/badge.svg?token=F362G7C9U0)](https://codecov.io/gh/havelessbemore/circle-ds)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/circle-ds)

## Features

circle-ds is a modern, flexible library offering a unique collection of circular data structures tailored for efficient data management and manipulation. A standout feature of this library is its capacity management.

By default, each data structure is unbounded, ensuring they can accommodate incoming data with the performance and behavior expected from standard implementations.

When given a capacity, they transform into bounded containers, limiting their size to the predefined capacity. When necessary, older values are emitted to make room for the new, adhering to its circular nature. 

This feature is useful for applications requiring fixed-size collections, such as caching mechanisms, real-time data processing, and streaming analytics, where the most recent data is prioritized, and older data is systematically discarded. With circle-ds, developers can seamlessly toggle between unbounded and bounded behaviors, offering flexibility in managing collection sizes and data lifecycles, while also preserving the expected functionality of classic data structures.

## Install

Using npm:

```bash
npm install circle-ds
```

Using yarn:

```bash
yarn install circle-ds
```

## API

### Common

The following is common across all collections. See the [Collection](./docs/interfaces/Collection.md) interface for more details.

#### Properties

- `capacity: number`: A positive integer that represents the maximum size of the collection. Can be updated to grow or shrink the collection. Can also be set to `Infinity`, representing an unbounded collection.

- `get size(): number`: The number of items in the collection.

- `get [Symbol.toStringTag](): string`: A string that represents the type of the object. See [Symbol.toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) for more details.

#### Events

- [`BoundedEvent.Overflow`](./src/types/boundedEvent.ts): Triggered when existing elements are discarded from the collection. This happens when the collection's capacity is reduced below its size or when new values are added while at capacity.

#### Methods

- `clear(): void`: Remove all items from the collection.

- `entries(): IterableIterator<K, V>`: Returns an iterator of `[key/index, value]` pairs through the collection.

- `forEach(callbackFn: (value: V, index: K, collection: Collection<K, V>) => void, thisArg?: unknown): void`: Executes the provided `callbackFn` function once for each element.

- `keys(): IterableIterator<K>`: Returns an iterator for the keys / indices in the collection.

- `values(): IterableIterator<V>`: Returns an iterator for the values in the collection.

- `[Symbol.iterator](): IterableIterator`: Returns an iterator of the values in the collection. If the collection is a map, returns an iterator of [key, value] pairs in the collection.

### [Deque](./docs/interfaces/Deque.md)

`Deque` is a double-ended queue that combines the features of stacks and queues, allowing insertion and removal at both ends.

#### Implementations

- [CircularDeque](./docs/classes/CircularDeque.md)
- [CircularLinkedDeque](./docs/classes/CircularLinkedDeque.md)

#### Constructor

- `new ()`: Initialize an empty deque of infinite capacity.
- `new (capacity: number)`: Initialize an empty deque with the given capacity.
- `new (items: Iterable<T>)`: Initialize a full deque with the given items.

#### Methods

- `first(): T | undefined`: Returns the first item without removing it, or `undefined` if the collection is empty. Alias for front().

- `front(): T | undefined`: Returns the item at the front without removing it, or `undefined` if the collection is empty. Alias for first().

- `has(value: T): boolean`: Checks if the collection contains a specific value.

- `last(): T | undefined`: Returns the last item without removing it, or `undefined` if the collection is empty. Alias for top().

- `pop(): T | undefined`: Removes and returns the last item, or `undefined` if the collection is empty.

- `push(...items: T[]): number`: Appends items to the collection and returns the new size. If at capacity, items at the front are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

- `shift(): T | undefined`: Removes and returns the first item, or `undefined` if the collection is empty.

- `top(): T | undefined`: Returns the item at the top without removing it, or `undefined` if the collection is empty. Alias for last().

- `unshift(...items: T[]): number`: Prepends items to the collection and returns the new size. If capacity is surpassed, items at the end are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

### [List](./docs/interfaces/List.md)

A `List` is a sequence of elements allowing for indexed access, modification, and iteration.

#### Implementations

- [CircularArrayList](./docs/classes/CircularArrayList.md)
- [CircularDoublyLinkedList](./docs/classes/CircularDoublyLinkedList.md)
- [CircularLinkedList](./docs/classes/CircularLinkedList.md)
- [CircularSkipList](./docs/classes/CircularSkipList.md)

#### Constructor

- `new ()`: Initialize an empty list of infinite capacity.
- `new (capacity: number)`: Initialize an empty list with the given capacity.
- `new (items: Iterable<T>)`: Initialize a full list with the given items.

#### Methods

- `at(index: number): V | undefined`: Retrieves the element at the specified index in the list.

- `delete(index: number): boolean`: Deletes the element at the specified index.

- `fill(value: V, start?: number, end?: number): this`: Fills the list with the specified value from start index (inclusive) to end index (exclusive).

- `has(value: T): boolean`: Checks if the collection contains a specific value.

- `pop(): T | undefined`: Removes and returns the last item, or `undefined` if the collection is empty.

- `push(...items: T[]): number`: Appends items to the collection and returns the new size. If at capacity, items at the front are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

- `set(index: number, value: V): V | undefined`: Replaces the element at the specified index with a new value. Returns the previous value if it succeeds, otherwise `undefined`.

- `shift(): T | undefined`: Removes and returns the first item, or `undefined` if the collection is empty.

- `slice(start?: number, end?: number): CircularLinkedList<V>`: Creates a shallow copy of the list from start index (inclusive) to end index (exclusive) into a new list. Does not modify the existing list.

- `splice(start: number, deleteCount?: number, ...items: V[]): CircularLinkedList<V>`: Changes the contents of the list by removing existing elements and/or adding new elements at a given index.

- `unshift(...items: T[]): number`: Prepends items to the collection and returns the new size. If capacity is surpassed, items at the end are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

### Map

#### Implementations

- [CircularMap](./docs/classes/CircularMap.md)

#### Constructor

- `new ()`: Initialize an empty map of infinite capacity.
- `new (capacity: number)`: Initialize an empty map with the given capacity.
- `new (items: Iterable<[K, V]>)`: Initialize a full map with the given items. Capacity will be the number of unique keys given.

#### Methods

- `delete(key: K): boolean`: Deletes the value from the collection. Returns `true` if the value exists and was removed successfully, or `false` otherwise.

- `has(key: K): boolean`: Checks if the collection contains a specific value.

- `set(key: K, value: V): this`: Sets the key to the given value in the collection. If at capacity, the oldest key-value pair is overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event. If an existing key is added again, then it will be treated as new.

### [Queue](./docs/interfaces/Queue.md)

A `Queue` is a FIFO (First In, First Out) data structure.

#### Implementations

- [CircularQueue](./docs/classes/CircularQueue.md)
- [CircularLinkedQueue](./docs/classes/CircularLinkedQueue.md)

#### Constructor

- `new ()`: Initialize an empty queue of infinite capacity.
- `new (capacity: number)`: Initialize an empty queue with the given capacity.
- `new (items: Iterable<T>)`: Initialize a full queue with the given items.

#### Methods

- `first(): T | undefined`: Returns the first item without removing it, or `undefined` if the collection is empty. Alias for front().

- `front(): T | undefined`: Returns the item at the front without removing it, or `undefined` if the collection is empty. Alias for first().

- `has(value: T): boolean`: Checks if the collection contains a specific value.

- `push(...items: T[]): number`: Appends items to the collection and returns the new size. If at capacity, items at the front are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

- `shift(): T | undefined`: Removes and returns the first item, or `undefined` if the collection is empty.

### Set

#### Implementations

- [CircularSet](./docs/classes/CircularSet.md)

#### Constructor

- `new ()`: Initialize an empty set of infinite capacity.
- `new (capacity: number)`: Initialize an empty set with the given capacity.
- `new (items: Iterable<T>)`: Initialize a full set with the given items. Capacity will be the number of unique items given.

#### Methods

- `add(value: T): this`: Adds the value to the collection. If at capacity, the oldest values are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event. If an existing value is added again, then it will be treated as new.

- `delete(value: T): boolean`: Deletes the value from the collection. Returns `true` if the value exists and was removed successfully, or `false` otherwise.

- `has(value: T): boolean`: Checks if the collection contains a specific value.

### [Stack](./docs/interfaces/Stack.md)

A `Stack` is a LIFO (Last In, First Out) data structure.

#### Implementations

- [CircularStack](./docs/classes/CircularStack.md)
- [CircularLinkedStack](./docs/classes/CircularLinkedStack.md)

#### Constructor

- `new ()`: Initialize an empty stack of infinite capacity.
- `new (capacity: number)`: Initialize an empty stack with the given capacity.
- `new (items: Iterable<T>)`: Initialize a full stack with the given items.

#### Methods

- `has(value: T): boolean`: Checks if the collection contains a specific value.

- `last(): T | undefined`: Returns the last item without removing it, or `undefined` if the collection is empty. Alias for top().

- `pop(): T | undefined`: Removes and returns the last item, or `undefined` if the collection is empty.

- `push(...items: T[]): number`: Appends items to the collection and returns the new size. If at capacity, items at the front are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

- `top(): T | undefined`: Returns the item at the top without removing it, or `undefined` if the collection is empty. Alias for last().

## Build

First clone the project from github:

```bash
git clone git@github.com:havelessbemore/circle-ds.git
cd circle-ds
```

Install the project dependencies:

```bash
npm install
```

Then, the project can be build by executing the build script via npm:

```bash
npm run build
```

This will build ESM and CommonJS outputs from the source files and put them in the dist/ folder.

## Test

To execute tests for the library, install the project dependencies once:

```bash
npm install
```

Then, the tests can be executed:

```bash
npm test
```

You can separately run the code linter:

```bash
npm run lint
```

To automatically fix linting issue, run:

```bash
npm run format
```

To test code coverage of the tests:

```bash
npm run test:coverage
```

To see the coverage results, open the generated report in your browser:

    ./coverage/index.html

---

Made with ❤️ by [Michael Rojas](https://github.com/havelessbemore)
