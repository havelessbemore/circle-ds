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

Try it out on [JSFiddle](https://jsfiddle.net/n1pefc54/1/).

### [CircleStack](./docs/classes/CircleStack.md)

`CircleStack` is a LIFO (Last In, First Out) data structure with a fixed capacity.

#### Constructor

- `CircleStack<T>()`: Constructs an empty circular stack a capacity of zero.
- `CircleStack<T>(capacity: number)`: Constructs an empty circular stack with the specified capacity.
- `CircleStack<T>(items: Iterable<T>)`: Constructs a full circular stack with the given items.
- `CircleStack<T>(...items: T[])`: Constructs a full circular stack with the given items.

#### Properties

- [`capacity: number`](./docs/classes/CircleStack.md#capacity): The maximum size of the stack. Update to grow or shrink the stack.
- [`size: Readonly<number>`](./docs/classes/CircleStack.md#size): The number of items in the stack.

#### Methods

- [`clear(): void`](./docs/classes/CircleStack.md#clear): Remove all items from the stack.
- [`entries(): IterableIterator<[number, T]>`](./docs/classes/CircleStack.md#entries): Returns an iterator that allows iteration through `[index, value]` pairs of the stack.
- [`forEach(callbackFn: (value: T, index: number, stack: CircleStack<T>) => void, thisArg?: unknown): void`](./docs/classes/CircleStack.md#foreach): Executes the provided `callbackFn` function once for each element, in insertion order.
- [`has(value: T): boolean`](./docs/classes/CircleStack.md#has): Checks if the stack contains a specific value.
- [`keys(): IterableIterator<number>`](./docs/classes/CircleStack.md#keys): Returns an iterator for the keys (indices) in the stack.
- [`pop(): T | undefined`](./docs/classes/CircleStack.md#pop): Removes and returns the item at the top of the stack. Returns `undefined` if the stack is empty.
- [`push(...items: T[]): T[]`](./docs/classes/CircleStack.md#push): Adds items to the top of the stack. If the stack is full, the oldest items are overwritten and returned.
- [`top(): T | undefined`](./docs/classes/CircleStack.md#top): Returns the item at the top of the stack without removing it. Returns `undefined` if the stack is empty.
- [`values(): IterableIterator<T>`](./docs/classes/CircleStack.md#values): Returns an iterator for the values in the stack.
- [`[Symbol.iterator](): IterableIterator<T>`](./docs/classes/CircleStack.md#iterator): Returns the default iterator for the stack, which iterates through its values.

### [CircleQueue](./docs/classes/CircleQueue.md)

`CircleQueue` is a FIFO (First In, First Out) data structure with a fixed size.

#### Constructor

- `CircleQueue<T>()`: Constructs an empty circular queue a capacity of zero.
- `CircleQueue<T>(capacity: number)`: Constructs an empty circular queue with the specified capacity.
- `CircleQueue<T>(items: Iterable<T>)`: Constructs a full circular queue with the given items.
- `CircleQueue<T>(...items: T[])`: Constructs a full circular queue with the given items.

#### Properties

- [`capacity: number`](./docs/classes/CircleQueue.md#capacity): The maximum size of the queue. Update to grow or shrink the queue.
- [`size: Readonly<number>`](./docs/classes/CircleQueue.md#size): The number of items in the queue.

#### Methods

- [`clear(): void`](./docs/classes/CircleQueue.md#clear): Remove all items from the queue.
- [`entries(): IterableIterator<[number, T]>`](./docs/classes/CircleQueue.md#entries): Returns an iterator that allows iteration through `[index, value]` pairs of the queue.
- [`forEach(callbackFn: (value: T, index: number, stack: CircleQueue<T>) => void, thisArg?: unknown): void`](./docs/classes/CircleQueue.md#foreach): Executes the provided `callbackFn` function once for each element, in insertion order.
- [`front(): T | undefined`](./docs/classes/CircleQueue.md#front): Returns the item at the front of the queue without removing it. Returns `undefined` if the queue is empty.
- [`has(value: T): boolean`](./docs/classes/CircleQueue.md#has): Checks if the queue contains a specific value.
- [`keys(): IterableIterator<number>`](./docs/classes/CircleQueue.md#keys): Returns an iterator for the keys (indices) in the queue.
- [`push(...items: T[]): T[]`](./docs/classes/CircleQueue.md#push): Adds items to the back of the queue. If the queue is full, the oldest items are overwritten and returned.
- [`shift(): T | undefined`](./docs/classes/CircleQueue.md#shift): Removes and returns the item at the front of the queue. Returns `undefined` if the queue is empty.
- [`values(): IterableIterator<T>`](./docs/classes/CircleQueue.md#values): Returns an iterator for the values in the queue.
- [`[Symbol.iterator](): IterableIterator<T>`](./docs/classes/CircleQueue.md#iterator): Returns the default iterator for the queue, which iterates through its values.

### [CircleDeque](./docs/classes/CircleDeque.md)

`CircleDeque` is a double-ended queue that combines the features stacks and queues, allowing insertion and removal at both ends.

#### Constructor

- `CircleDeque<T>()`: Constructs an empty circular deque a capacity of zero.
- `CircleDeque<T>(capacity: number)`: Constructs an empty circular deque with the specified capacity.
- `CircleDeque<T>(items: Iterable<T>)`: Constructs a full circular deque with the given items.
- `CircleDeque<T>(...items: T[])`: Constructs a full circular deque with the given items.

#### Properties

- [`capacity: number`](./docs/classes/CircleDeque.md#capacity): The maximum size of the deque. Update to grow or shrink the deque.
- [`size: Readonly<number>`](./docs/classes/CircleDeque.md#size): The number of items in the deque.

#### Methods

- [`clear(): void`](./docs/classes/CircleDeque.md#clear): Remove all items from the deque.
- [`entries(): IterableIterator<[number, T]>`](./docs/classes/CircleDeque.md#entries): Returns an iterator that allows iteration through `[index, value]` pairs of the deque.
- [`forEach(callbackFn: (value: T, index: number, stack: CircleDeque<T>) => void, thisArg?: unknown): void`](./docs/classes/CircleDeque.md#foreach): Executes the provided `callbackFn` function once for each element, in insertion order.
- [`front(): T | undefined`](./docs/classes/CircleDeque.md#front): Returns the item at the front of the deque without removing it. Returns `undefined` if the deque is empty.
- [`has(value: T): boolean`](./docs/classes/CircleDeque.md#has): Checks if the deque contains a specific value.
- [`keys(): IterableIterator<number>`](./docs/classes/CircleDeque.md#keys): Returns an iterator for the keys (indices) in the deque.
- [`pop(): T | undefined`](./docs/classes/CircleDeque.md#pop): Removes and returns the item at the top of the deque. Returns `undefined` if the deque is empty.
- [`push(...items: T[]): T[]`](./docs/classes/CircleDeque.md#push): Adds items to the back of the deque. If the deque is full, items at the front are overwritten and returned.
- [`shift(): T | undefined`](./docs/classes/CircleDeque.md#shift): Removes and returns the item at the front of the deque. Returns `undefined` if the deque is empty.
- [`top(): T | undefined`](./docs/classes/CircleDeque.md#top): Returns the item at the top of the deque without removing it. Returns `undefined` if the deque is empty.
- [`unshift(...items: T[]): T[]`](./docs/classes/CircleDeque.md#unshift): Adds items to the fron of the deque. If the deque is full, items at the back are overwritten and returned.
- [`values(): IterableIterator<T>`](./docs/classes/CircleDeque.md#values): Returns an iterator for the values in the deque.
- [`[Symbol.iterator](): IterableIterator<T>`](./docs/classes/CircleDeque.md#iterator): Returns the default iterator for the deque, which iterates through its values.

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
