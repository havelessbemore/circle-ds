[circle-ds](../README.md) / [Exports](../modules.md) / Queue

# Interface: Queue\<V\>

Represents a queue collection of elements. A queue allows elements to be
added to the end and removed from the front, adhering to the FIFO
(First In, First Out) principle. This interface extends the `Collection` interface
and specifies additional queue-specific operations.

Queues are commonly used in scenarios where you need to process elements in the order
they were added, such as task scheduling, buffering data streams, and breadth-first
graph traversal.

## Type parameters

| Name |
| :------ |
| `V` |

## Hierarchy

- [`Collection`](Collection.md)\<`number`, `V`\>

  ↳ **`Queue`**

  ↳↳ [`Deque`](Deque.md)

## Implemented by

- [`CircularLinkedQueue`](../classes/CircularLinkedQueue.md)
- [`CircularQueue`](../classes/CircularQueue.md)

## Table of contents

### Accessors

- [[toStringTag]](Queue.md#[tostringtag])
- [size](Queue.md#size)

### Methods

- [[iterator]](Queue.md#[iterator])
- [clear](Queue.md#clear)
- [entries](Queue.md#entries)
- [first](Queue.md#first)
- [forEach](Queue.md#foreach)
- [front](Queue.md#front)
- [has](Queue.md#has)
- [keys](Queue.md#keys)
- [push](Queue.md#push)
- [shift](Queue.md#shift)
- [values](Queue.md#values)

## Accessors

### [toStringTag]

• `get` **[toStringTag]**(): `string`

A string tag for the `Collection` class that is used in `Object.prototype.toString`.

#### Returns

`string`

#### Inherited from

Collection.[toStringTag]

#### Defined in

[types/collection.d.ts:19](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L19)

___

### size

• `get` **size**(): `number`

Gets the number of elements contained in the `Collection`.

#### Returns

`number`

#### Inherited from

Collection.size

#### Defined in

[types/collection.d.ts:14](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L14)

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`\<`V`\>

Returns an iterable iterator that allows iteration
through the queue's elements.

#### Returns

`IterableIterator`\<`V`\>

#### Defined in

[types/queue.d.ts:63](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/queue.d.ts#L63)

___

### clear

▸ **clear**(): `void`

Removes all elements from the `Collection`, effectively resetting it.

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[clear](Collection.md#clear)

#### Defined in

[types/collection.d.ts:24](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L24)

___

### entries

▸ **entries**(): `IterableIterator`\<[`number`, `V`]\>

Returns a new iterator object that contains an array of `[key, value]`
pairs for each element in the `Collection`.

#### Returns

`IterableIterator`\<[`number`, `V`]\>

An iterable iterator for the entries of the collection.

#### Inherited from

[Collection](Collection.md).[entries](Collection.md#entries)

#### Defined in

[types/collection.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L32)

___

### first

▸ **first**(): `undefined` \| `V`

Retrieves the first element added to the queue without removing it.

#### Returns

`undefined` \| `V`

- The first element of the queue,
or `undefined` if the queue is empty.

#### Defined in

[types/queue.d.ts:20](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/queue.d.ts#L20)

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once for each key-value pair in the `Collection`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callbackfn` | (`value`: `V`, `key`: `number`, `collection`: `this`) => `void` | A function to execute for each element, receiving the value, key, and collection instance as arguments. |
| `thisArg?` | `unknown` | An optional value to use as `this` when executing `callbackfn`. |

#### Returns

`void`

#### Inherited from

[Collection](Collection.md).[forEach](Collection.md#foreach)

#### Defined in

[types/collection.d.ts:41](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L41)

___

### front

▸ **front**(): `undefined` \| `V`

Retrieves the element at the front of the queue without removing it.

This method provides semantic clarity in contexts where the term "front" is
preferred over "first" to describe the element that was added earliest and will
be processed next.

#### Returns

`undefined` \| `V`

- The element at the front of the queue,
or `undefined` if the queue is empty.

#### Defined in

[types/queue.d.ts:32](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/queue.d.ts#L32)

___

### has

▸ **has**(`value`): `boolean`

Determines whether a specific element exists within the queue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `V` | The value to locate. |

#### Returns

`boolean`

- `true` if the value exists, `false` otherwise.

#### Defined in

[types/queue.d.ts:40](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/queue.d.ts#L40)

___

### keys

▸ **keys**(): `IterableIterator`\<`number`\>

Returns a new iterator that contains the keys for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`number`\>

An iterable iterator for the keys of the collection.

#### Inherited from

[Collection](Collection.md).[keys](Collection.md#keys)

#### Defined in

[types/collection.d.ts:52](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L52)

___

### push

▸ **push**(`...values`): `number`

Adds one or more elements to the end of the queue
and returns the queue's new length.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `V`[] | The elements to add. |

#### Returns

`number`

- The new length of the queue.

#### Defined in

[types/queue.d.ts:49](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/queue.d.ts#L49)

___

### shift

▸ **shift**(): `undefined` \| `V`

Removes and returns the first element of the queue.

#### Returns

`undefined` \| `V`

- The first element of the queue,
or `undefined` if the queue is empty.

#### Defined in

[types/queue.d.ts:57](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/queue.d.ts#L57)

___

### values

▸ **values**(): `IterableIterator`\<`V`\>

Returns a new iterator that contains the values for each element
in the `Collection`.

#### Returns

`IterableIterator`\<`V`\>

An iterable iterator for the values of the collection.

#### Inherited from

[Collection](Collection.md).[values](Collection.md#values)

#### Defined in

[types/collection.d.ts:60](https://github.com/havelessbemore/circle-ds/blob/de49230/src/types/collection.d.ts#L60)
