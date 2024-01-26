# Circle DS

A suite of circular data structures, including CircleStack, CircleQueue, and CircleDeque. Use circular buffers with ease and supported by a variety of operations.

[![Version](https://img.shields.io/npm/v/circle-ds.svg)](https://www.npmjs.com/package/circle-ds)
[![Downloads](https://img.shields.io/npm/dm/circle-ds.svg)](https://www.npmjs.com/package/circle-ds)
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

Try it out on [JSFiddle](https://jsfiddle.net/2hxepf9s/).

### [CircularStack](./docs/classes/CircularStack.md)

`CircularStack` is a LIFO (Last In, First Out) data structure with a fixed capacity.

#### Constructor

- `CircularStack<T>()`: Constructs an empty circular stack a capacity of zero.
- `CircularStack<T>(capacity: number)`: Constructs an empty circular stack with the specified capacity.
- `CircularStack<T>(items: Iterable<T>)`: Constructs a full circular stack with the given items.
- `CircularStack<T>(...items: T[])`: Constructs a full circular stack with the given items.

#### Properties

- `capacity: number`: The maximum size of the stack. Update to grow or shrink the stack.
- `size: Readonly<number>`: The number of items in the stack.

#### Methods

- `clear(): void`: Remove all items from the stack.
- `entries(): IterableIterator<[number, T]>`: Returns an iterator that allows iteration through `[index, value]` pairs of the stack.
- `forEach(callbackFn: (value: T, index: number, stack: CircularStack<T>) => void, thisArg?: unknown): void`: Executes the provided `callbackFn` function once for each element, in insertion order.
- `has(value: T): boolean`: Checks if the stack contains a specific value.
- `keys(): IterableIterator<number>`: Returns an iterator for the keys (indices) in the stack.
- `pop(): T | undefined`: Removes and returns the item at the top of the stack. Returns `undefined` if the stack is empty.
- `push(...items: T[]): T[]`: Adds items to the top of the stack. If the stack is full, the oldest items are overwritten and returned.
- `top(): T | undefined`: Returns the item at the top of the stack without removing it. Returns `undefined` if the stack is empty.
- `values(): IterableIterator<T>`: Returns an iterator for the values in the stack.
- `[Symbol.iterator]()](): IterableIterator<T>`: Returns the default iterator for the stack, which iterates through its values.

### [CircularQueue](./docs/classes/CircularQueue.md)

`CircularQueue` is a FIFO (First In, First Out) data structure with a fixed size.

#### Constructor

- `CircularQueue<T>()`: Constructs an empty circular queue a capacity of zero.
- `CircularQueue<T>(capacity: number)`: Constructs an empty circular queue with the specified capacity.
- `CircularQueue<T>(items: Iterable<T>)`: Constructs a full circular queue with the given items.
- `CircularQueue<T>(...items: T[])`: Constructs a full circular queue with the given items.

#### Properties

- `capacity: number`: The maximum size of the queue. Update to grow or shrink the queue.
- `size: Readonly<number>`: The number of items in the queue.

#### Methods

- `clear(): void`: Remove all items from the queue.
- `entries(): IterableIterator<[number, T]>`: Returns an iterator that allows iteration through `[index, value]` pairs of the queue.
- `forEach(callbackFn: (value: T, index: number, stack: CircularQueue<T>) => void, thisArg?: unknown): void`: Executes the provided `callbackFn` function once for each element, in insertion order.
- `front(): T | undefined`: Returns the item at the front of the queue without removing it. Returns `undefined` if the queue is empty.
- `has(value: T): boolean`: Checks if the queue contains a specific value.
- `keys(): IterableIterator<number>`: Returns an iterator for the keys (indices) in the queue.
- `push(...items: T[]): T[]`: Adds items to the back of the queue. If the queue is full, the oldest items are overwritten and returned.
- `shift(): T | undefined`: Removes and returns the item at the front of the queue. Returns `undefined` if the queue is empty.
- `values(): IterableIterator<T>`: Returns an iterator for the values in the queue.
- `[Symbol.iterator]()](): IterableIterator<T>`: Returns the default iterator for the queue, which iterates through its values.

### [CircularDeque](./docs/classes/CircularDeque.md)

`CircularDeque` is a double-ended queue that combines the features stacks and queues, allowing insertion and removal at both ends.

#### Constructor

- `CircularDeque<T>()`: Constructs an empty circular deque a capacity of zero.
- `CircularDeque<T>(capacity: number)`: Constructs an empty circular deque with the specified capacity.
- `CircularDeque<T>(items: Iterable<T>)`: Constructs a full circular deque with the given items.
- `CircularDeque<T>(...items: T[])`: Constructs a full circular deque with the given items.

#### Properties

- `capacity: number`: The maximum size of the deque. Update to grow or shrink the deque.
- `size: Readonly<number>`: The number of items in the deque.

#### Methods

- `clear(): void`: Remove all items from the deque.
- `entries(): IterableIterator<[number, T]>`: Returns an iterator that allows iteration through `[index, value]` pairs of the deque.
- `forEach(callbackFn: (value: T, index: number, stack: CircularDeque<T>) => void, thisArg?: unknown): void`: Executes the provided `callbackFn` function once for each element, in insertion order.
- `front(): T | undefined`: Returns the item at the front of the deque without removing it. Returns `undefined` if the deque is empty.
- `has(value: T): boolean`: Checks if the deque contains a specific value.
- `keys(): IterableIterator<number>`: Returns an iterator for the keys (indices) in the deque.
- `pop(): T | undefined`: Removes and returns the item at the top of the deque. Returns `undefined` if the deque is empty.
- `push(...items: T[]): T[]`: Adds items to the back of the deque. If the deque is full, items at the front are overwritten and returned.
- `shift(): T | undefined`: Removes and returns the item at the front of the deque. Returns `undefined` if the deque is empty.
- `top(): T | undefined`: Returns the item at the top of the deque without removing it. Returns `undefined` if the deque is empty.
- `unshift(...items: T[]): T[]`: Adds items to the fron of the deque. If the deque is full, items at the back are overwritten and returned.
- `values(): IterableIterator<T>`: Returns an iterator for the values in the deque.
- `[Symbol.iterator]()](): IterableIterator<T>`: Returns the default iterator for the deque, which iterates through its values.

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
