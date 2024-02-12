circle-ds / [Exports](modules.md)

# Circle DS

A suite of circular data structures, including deques, maps, queues, sets and stacks. Use circular buffers with ease.

[![Version](https://img.shields.io/npm/v/circle-ds.svg)](https://www.npmjs.com/package/circle-ds)
[![Maintenance](https://img.shields.io/maintenance/yes/2024.svg)](https://github.com/havelessbemore/circle-ds/graphs/commit-activity)
[![License](https://img.shields.io/github/license/havelessbemore/circle-ds.svg)](https://github.com/havelessbemore/circle-ds/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/havelessbemore/circle-ds/graph/badge.svg?token=F362G7C9U0)](https://codecov.io/gh/havelessbemore/circle-ds)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/circle-ds)

## Features

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

The following is common across all collections.

#### Constructor

- `constructor()`: Initialize an empty collection of infinite capacity.
- `constructor(capacity: number)`: Initialize an empty collection with the given capacity.

#### Properties

- `capacity: number`: A positive integer that represents the maximum size of the collection. Can be updated to grow or shrink the collection. Can also be set to `Infinity`.

- `size: Readonly<number>`: The number of items in the collection.

- `[Symbol.toStringTag]`: A string that represents the type of the object. See [Symbol.toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) for more details.

#### Events

- [`BoundedEvent.Overflow`](./src/types/boundedEvent.ts): Triggered when existing elements are discarded from the collection. This happens when the collection's capacity is reduced below its size or when new values are added while at capacity.

#### Methods

- `clear(): void`: Remove all items from the collection.

- `entries(): IterableIterator<K, V>`: Returns an iterator of `[key/index, value]` pairs through the collection.

- `forEach(callbackFn: (value: V, index: K, collection: Collection<K, V>) => void, thisArg?: unknown): void`: Executes the provided `callbackFn` function once for each element.

- `keys(): IterableIterator<K>`: Returns an iterator for the keys / indices in the collection.

- `values(): IterableIterator<V>`: Returns an iterator for the values in the collection.

- `[Symbol.iterator](): IterableIterator`: Returns an iterator for the values or key-value pairs in the collection.

### [CircularDeque](./docs/classes/CircularDeque.md) & [CircularLinkedDeque](./docs/classes/CircularLinkedDeque.md)

`CircularDeque` is a double-ended queue that combines the features of stacks and queues, allowing insertion and removal at both ends.

#### Constructor

- `CircularDeque<T>(items: Iterable<T>)`: Initialize a full deque with the given items.

#### Methods

- [`first(): T | undefined`](./docs/classes/CircularDeque.md#first): Returns the first item without removing it, or `undefined` if the collection is empty. Alias for front().

- [`front(): T | undefined`](./docs/classes/CircularDeque.md#front): Returns the item at the front without removing it, or `undefined` if the collection is empty. Alias for first().

- [`has(value: T): boolean`](./docs/classes/CircularDeque.md#has): Checks if the collection contains a specific value.

- [`last(): T | undefined`](./docs/classes/CircularDeque.md#last): Returns the last item without removing it, or `undefined` if the collection is empty. Alias for top().

- [`pop(): T | undefined`](./docs/classes/CircularDeque.md#pop): Removes and returns the last item, or `undefined` if the collection is empty.

- [`push(...items: T[]): number`](./docs/classes/CircularDeque.md#push): Appends items to the collection and returns the new size. If at capacity, items at the front are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

- [`shift(): T | undefined`](./docs/classes/CircularDeque.md#shift): Removes and returns the first item, or `undefined` if the collection is empty.

- [`top(): T | undefined`](./docs/classes/CircularDeque.md#top): Returns the item at the top without removing it, or `undefined` if the collection is empty. Alias for last().

- [`unshift(...items: T[]): number`](./docs/classes/CircularDeque.md#unshift): Prepends items to the collection and returns the new size. If capacity is surpassed, items at the end are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

- [`[Symbol.iterator](): IterableIterator<T>`](./docs/classes/CircularDeque.md#iterator): Returns an iterator for the values in the collection.

### [CircularMap](./docs/classes/CircularMap.md)

#### Constructor

- `CircularMap<K, V>(items: Iterable<[K, V]>)`: Initialize a full map with the given items. Capacity will be the number of unique keys given.

#### Methods

- [`delete(key: K): boolean`](./docs/classes/CircularMap.md#delete): Deletes the value from the collection. Returns `true` if the value exists and was removed successfully, or `false` otherwise.

- [`has(key: K): boolean`](./docs/classes/CircularMap.md#has): Checks if the collection contains a specific value.

- [`set(key: K, value: V): this`](./docs/classes/CircularMap.md#set): Sets the key to the given value in the collection. If at capacity, the oldest key-value pair is overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event. If an existing key is added again, then it will be treated as new.

- [`[Symbol.iterator](): IterableIterator<[K, V]>`](./docs/classes/CircularMap.md#iterator): Returns an iterator for the entries in the collection.

### [CircularQueue](./docs/classes/CircularQueue.md) & [CircularLinkedQueue](./docs/classes/CircularLinkedQueue.md)

`CircularQueue` is a FIFO (First In, First Out) data structure with a fixed capacity.

#### Constructor

- `CircularQueue<T>(items: Iterable<T>)`: Initialize a full queue with the given items.

#### Methods

- [`first(): T | undefined`](./docs/classes/CircularQueue.md#first): Returns the first item without removing it, or `undefined` if the collection is empty. Alias for front().

- [`front(): T | undefined`](./docs/classes/CircularQueue.md#front): Returns the item at the front without removing it, or `undefined` if the collection is empty. Alias for first().

- [`has(value: T): boolean`](./docs/classes/CircularQueue.md#has): Checks if the collection contains a specific value.

- [`push(...items: T[]): number`](./docs/classes/CircularQueue.md#push): Appends items to the collection and returns the new size. If at capacity, items at the front are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

- [`shift(): T | undefined`](./docs/classes/CircularQueue.md#shift): Removes and returns the first item, or `undefined` if the collection is empty.

- [`[Symbol.iterator](): IterableIterator<T>`](./docs/classes/CircularQueue.md#iterator): Returns an iterator for the values in the collection.

### [CircularSet](./docs/classes/CircularSet.md)

#### Constructor

- `CircularSet<T>(items: Iterable<T>)`: Initialize a full set with the given items. Capacity will be the number of unique items given.

#### Methods

- [`add(value: T): this`](./docs/classes/CircularSet.md#add): Adds the value to the collection. If at capacity, the oldest values are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event. If an existing value is added again, then it will be treated as new.

- [`delete(value: T): boolean`](./docs/classes/CircularSet.md#delete): Deletes the value from the collection. Returns `true` if the value exists and was removed successfully, or `false` otherwise.

- [`has(value: T): boolean`](./docs/classes/CircularSet.md#has): Checks if the collection contains a specific value.

- [`[Symbol.iterator](): IterableIterator<T>`](./docs/classes/CircularSet.md#iterator): Returns an iterator for the values in the collection.

### [CircularStack](./docs/classes/CircularStack.md) & [CircularLinkedStack](./docs/classes/CircularLinkedStack.md)

`CircularStack` is a LIFO (Last In, First Out) data structure with a fixed capacity.

#### Constructor

- `CircularStack<T>(items: Iterable<T>)`: Initialize a full stack with the given items.

#### Methods

- [`has(value: T): boolean`](./docs/classes/CircularStack.md#has): Checks if the collection contains a specific value.

- [`last(): T | undefined`](./docs/classes/CircularStack.md#last): Returns the last item without removing it, or `undefined` if the collection is empty. Alias for top().

- [`pop(): T | undefined`](./docs/classes/CircularStack.md#pop): Removes and returns the last item, or `undefined` if the collection is empty.

- [`push(...items: T[]): number`](./docs/classes/CircularStack.md#push): Appends items to the collection and returns the new size. If at capacity, items at the front are overwritten and emitted via the [BoundedEvent.Overflow](./src/types/boundedEvent.ts) event.

- [`top(): T | undefined`](./docs/classes/CircularStack.md#top): Returns the item at the top without removing it, or `undefined` if the collection is empty. Alias for last().

- [`[Symbol.iterator](): IterableIterator<T>`](./docs/classes/CircularStack.md#iterator): Returns an iterator for the values in the collection.

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

## License

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

---

Made with ❤️ by [Michael Rojas](https://github.com/havelessbemore)
