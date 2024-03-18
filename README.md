# Circle DS

A suite of circular data structures, including deques, lists, maps, queues, sets and stacks.

[![Version](https://img.shields.io/npm/v/circle-ds.svg)](https://www.npmjs.com/package/circle-ds)
[![Maintenance](https://img.shields.io/maintenance/yes/2024.svg)](https://github.com/havelessbemore/circle-ds/graphs/commit-activity)
[![License](https://img.shields.io/github/license/havelessbemore/circle-ds.svg)](https://github.com/havelessbemore/circle-ds/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/havelessbemore/circle-ds/graph/badge.svg?token=F362G7C9U0)](https://codecov.io/gh/havelessbemore/circle-ds)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/circle-ds)

Circle-ds is a modern, flexible library offering a unique collection of circular data structures tailored for efficient data management and manipulation. These data structures behave dynamically but can be bounded to a given capacity, allowing for flexible data storage solutions.

## Getting Started

### Install

Using npm:

```bash
npm install circle-ds
```

Using yarn:

```bash
yarn add circle-ds
```

### Usage

Here's an example using a circular queue, showcasing various capabilities:

```javascript
import { CircularQueue } from "circle-ds";

// Create a queue with capacity 4
const queue = new CircularQueue(4);

// Listen for overflow
queue.on("overflow", discarded => console.log("Discarded:", discarded));

// Add incoming values
queue.push(1, 2, 3);
console.log(queue.values()); // Output: [1, 2, 3]
queue.push(4, 5, 6); // Discards [1, 2]
console.log(queue.values()); // Output: [3, 4, 5, 6]

// Resize queue
queue.capacity = 2; // Discards [3, 4]
console.log(queue.values()); // Output: [5, 6]

// Remove bounds
queue.capacity = Infinity;
queue.push(7, 8, 9);
console.log(queue.values()); // Output: [5, 6, 7, 8, 9]
```

## Features

- **Capacity Management:** Switch seamlessly between unbounded and bounded behaviors.
- **Efficient Data Management:** Optimized for performance, even with large datasets.
- **Flexible and Reusable:** Designed for ease of use in a wide variety of applications.

By default, data structures are unbounded, ensuring they can accommodate incoming data with the performance and behavior expected from standard implementations. When given a capacity, they become bounded containers, limiting their size to the predefined capacity. When necessary, older values are emitted to make room for the new, adhering to its circular nature.

This feature is useful for applications requiring fixed-size collections, such as caching mechanisms, real-time data processing, and streaming analytics, where the most recent data is prioritized, and older data is systematically discarded. With circle-ds, developers can seamlessly toggle between unbounded and bounded behaviors, offering flexibility in managing collection sizes and data lifecycles, while also preserving the expected functionality of classic data structures.

## Compatibility

This library is compatible with modern JavaScript environments, including Node.js and browsers supporting ES6+.

## Community and Support

We welcome contributions, feedback, and bug reports. Please feel free to [submit an issue](https://github.com/havelessbemore/circle-ds/issues) or a pull request.

For support, you can reach out via [GitHub discussions](https://github.com/havelessbemore/circle-ds/discussions).

## API

### Common API Elements

All circle-ds data structures share common API elements, outlined in the [Collection](./docs/interfaces/Collection.md) interface. Here's a brief overview:

- **Capacity Control:** Manage collection size with dynamic or fixed capacities.
- **Iterable Interface:** Access keys, values, and entries directly using iterators.
- **Event-Driven:** Listen to overflow events when capacity limits are reached.

#### Properties

- `capacity: number`: A positive integer that represents the maximum size of the collection. Can be updated to grow or shrink the collection. Can be set to `Infinity` to represent an unbounded collection.

- `get size(): number`: The number of items in the collection.

- `get [Symbol.toStringTag](): string`: A string that represents the type of the object. See [Symbol.toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) for more details.

#### Events

- [`BoundedEvent.Overflow`](./src/types/boundedEvent.ts): Triggered when existing elements are discarded from the collection. Event listeners should expect an array of discarded elements. Event listeners may be called multiple times per overflow.

#### Methods

- `clear(): void`: Remove all items from the collection.

- `entries(): IterableIterator<K, V>`: Returns an iterator of `[index, value]` pairs through the collection. If the collection is a map, returns an iterator of `[key, value]` pairs.

- `forEach(callbackFn: (value: V, index: K, collection: Collection<K, V>) => void, thisArg?: unknown): void`: Executes the provided `callbackFn` function once for each element.

- `keys(): IterableIterator<K>`: Returns an iterator for the keys / indices in the collection.

- `values(): IterableIterator<V>`: Returns an iterator for the values in the collection.

- `[Symbol.iterator](): IterableIterator`: Returns an iterator of the values in the collection. If the collection is a map, returns an iterator of `[key, value]` pairs.

### [Deque](./docs/interfaces/Deque.md)

#### Implementations

- [CircularDeque](./docs/classes/CircularDeque.md)
- [CircularLinkedDeque](./docs/classes/CircularLinkedDeque.md)

#### Constructor

- `new ()`
- `new (capacity: number)`
- `new (items: Iterable<T>)`

#### Methods

- `first(): T | undefined`

- `front(): T | undefined`

- `has(value: T): boolean`

- `last(): T | undefined`

- `pop(): T | undefined`

- `push(...items: T[]): number`

- `shift(): T | undefined`

- `top(): T | undefined`

- `unshift(...items: T[]): number`

### [List](./docs/interfaces/List.md)

#### Implementations

- [CircularArrayList](./docs/classes/CircularArrayList.md)
- [CircularDoublyLinkedList](./docs/classes/CircularDoublyLinkedList.md)
- [CircularLinkedList](./docs/classes/CircularLinkedList.md)
- [CircularSkipList](./docs/classes/CircularSkipList.md)

#### Constructor

- `new ()`
- `new (capacity: number)`
- `new (items: Iterable<T>)`

#### Methods

- `at(index: number): V | undefined`

- `delete(index: number): boolean`

- `fill(value: V, start?: number, end?: number): this`

- `has(value: T): boolean`

- `pop(): T | undefined`

- `push(...items: T[]): number`

- `set(index: number, value: V): V | undefined`

- `shift(): T | undefined`

- `slice(start?: number, end?: number): CircularLinkedList<V>`

- `splice(start: number, deleteCount?: number, ...items: V[]): CircularLinkedList<V>`

- `unshift(...items: T[]): number`

### Map

#### Implementations

- [CircularMap](./docs/classes/CircularMap.md)

#### Constructor

- `new ()`
- `new (capacity: number)`
- `new (items: Iterable<[K, V]>)`

#### Methods

- `delete(key: K): boolean`

- `has(key: K): boolean`

- `set(key: K, value: V): this`

### [Queue](./docs/interfaces/Queue.md)

A `Queue` is a FIFO (First In, First Out) data structure.

#### Implementations

- [CircularQueue](./docs/classes/CircularQueue.md)
- [CircularLinkedQueue](./docs/classes/CircularLinkedQueue.md)

#### Constructor

- `new ()`
- `new (capacity: number)`
- `new (items: Iterable<T>)`

#### Methods

- `first(): T | undefined`

- `front(): T | undefined`

- `has(value: T): boolean`

- `push(...items: T[]): number`

- `shift(): T | undefined`

### Set

#### Implementations

- [CircularSet](./docs/classes/CircularSet.md)

#### Constructor

- `new ()`
- `new (capacity: number)`
- `new (items: Iterable<T>)`

#### Methods

- `add(value: T): this`

- `delete(value: T): boolean`

- `has(value: T): boolean`

### [Stack](./docs/interfaces/Stack.md)

A `Stack` is a LIFO (Last In, First Out) data structure.

#### Implementations

- [CircularStack](./docs/classes/CircularStack.md)
- [CircularLinkedStack](./docs/classes/CircularLinkedStack.md)

#### Constructor

- `new ()`
- `new (capacity: number)`
- `new (items: Iterable<T>)`

#### Methods

- `has(value: T): boolean`

- `last(): T | undefined`

- `pop(): T | undefined`

- `push(...items: T[]): number`

- `top(): T | undefined`

## Build

1. Clone the project from github

```bash
git clone git@github.com:havelessbemore/circle-ds.git
cd circle-ds
```

2. Install dependencies

```bash
npm install
```

3. Build the project

```bash
npm run build
```

This will build ESM and CommonJS outputs in the dist/ folder.

## Format

To run the code linter:

```bash
npm run lint
```

To automatically fix linting issue, run:

```bash
npm run format
```

## Test

1. Install dependencies

```bash
npm install
```

2. Execute tests

```bash
npm test
```

Test coverage can be measured via:

```bash
npm run test:coverage
```

A coverage report is generated at `./coverage/index.html`.

---

Made with ❤️ by [Michael Rojas](https://github.com/havelessbemore)
